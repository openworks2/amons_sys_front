import $ from "jquery";
import { Foundation, Map } from "./foundation";

export const WebVideoCtrl = (function (e) {
	//이벤트 응답 기능 목록
	var eventHandler = {
		selectDir: function (path) {
		}
	}

	//플러그인 객체
	var pluginObject;
	//초기화 성공 기능
	var initSuccess;
	//이벤트 신호 목록
	var SignalMap = new Map();
	//마운트 창 선택한 신호
	// eslint-disable-next-line no-array-constructor
	SignalMap.put("SelectedView", new Array());
	// eslint-disable-next-line no-array-constructor
	SignalMap.put("DetectedDeviceInfo", new Array());
	// eslint-disable-next-line no-array-constructor
	SignalMap.put("PointTemper", new Array());
	//장비 정보 표
	var deviceInfoMap = new Map();
	//정보 테이블을 재생하십시오
	var playerInfoMap = new Map();
	//네트워크 프로토콜,2 세대, 3 세대
	var sProtocol;
	//비디오 정보
	var remoteFileInfor = [];
	//websocket
	var socket;
	//비동기 메서드 이벤트 목록
	var g_id = 0;
	//플러그인 컨테이너
	var g_container;
	//반환 값 지연 객체 테이블
	var defMap = {};
	//조작 정보 로그 함수
	var showOpInfo;

	var loginIp;

	//이벤트 처리 기능
	function handleEvent(message) {
		var messageObject = $.parseJSON(message);
		if (("event" in messageObject)) {
			var eventType = messageObject["event"];
			//다른 이벤트 유형에 따라 프로세스
			if ("SelectedDirectory" === eventType) {
				//분석 유형 및 경로
				var pathType = messageObject["params"]["Type"];
				var pathName = messageObject["params"]["PathName"];
				//경로를 설정하십시오
				pluginObject.SetStoragePath(pathType, pathName);
				eventHandler.selectDir(pathName);
			} else if ("SelectedView" === eventType) {
				var callBackList = SignalMap.get("SelectedView");
				//콜백 함수를 호출하십시오
				for (var i = 0; i < callBackList.length; i++) {
					callBackList[i](messageObject["params"]["nodeIndex"], messageObject["params"]["viewIndex"], messageObject["params"]["winID"]);
				}
			} else if ("DetectedDeviceInfo" === eventType) {
				var callBackList = SignalMap.get("DetectedDeviceInfo");
				//콜백 함수를 호출하십시오
				for (let i = 0; i < callBackList.length; i++) {
					callBackList[i](messageObject["params"]["deviceIP"], messageObject["params"]["svrPort"], messageObject["params"]["state"]);
				}
			} else if ("SnapManagerEvent" === eventType) {
				var szTip = "<div>" + Foundation.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + JSON.stringify(messageObject["params"]);
				szTip += "</div>";
				$("#eventMessage").html(szTip);
			} else if ("PointTemper" === eventType) {
				var szTemper = messageObject["params"]["Temper"];
				var callBackList = SignalMap.get("PointTemper");
				//콜백 함수를 호출하십시오
				for (let i = 0; i < callBackList.length; i++) {
					callBackList[i](szTemper);
				}
			} else if ("downloadLink" === eventType) {
				console.log(JSON.stringify(messageObject["params"]));
			} else if ("RealTimeVideoException" === eventType) {
				var deviceID = messageObject["params"]["deviceID"];
				var errorCode = messageObject["params"]["error"];
				if (1 === errorCode) {
					//인증 실패
					showOpInfo(getDeviceIP(deviceID), "connect disconnected", "username or password is not valid");
				} else if (2 === errorCode) {
					//연결에 실패
					showOpInfo(getDeviceIP(deviceID), "connect disconnected", "device connect failed");
				}
			}
			else {
				console.log(JSON.stringify(messageObject["params"]));
			}
		} else {
			var id = messageObject['id'];
			defMap[id].resolve(messageObject['result']);
			defMap[id] = null;
		}
	}

	/**
	*@description 플러그인이 설치되어 있는지 판단합니다
	*@return Boolean
	*/
	var checkPluginInstall = function () {
		return $.Deferred(function (def) {
			if (browser().msie) {
				try {
					// eslint-disable-next-line no-undef
					new ActiveXObject("WebActiveX.Plugin.4.0.0.0");
					def.resolve();
				}
				catch (n) {
					def.reject();
				}
			}
			else if (browser().npapi) {
				for (var r = 0, s = navigator.mimeTypes.length; s > r; r++) {
					if ("application/media-plugin-version-4.0.0.0" === navigator.mimeTypes[r].type.toLowerCase()) {
						def.resolve();
					}
				}
				def.reject();
			}
			else {
				var port = 23480;
				connect(port).done(function () {
					def.resolve();

				}).fail(function () {
					var ele = document.createElement('iframe');
					ele.src = 'CustomerWebSocketServer://' + port;
					ele.style.display = 'none';
					document.body.appendChild(ele);
					// port++;
					port =23481;
					ele.translate = false;
					setTimeout(function () {
						reconnect(port, def);
					}, 2000);
				})
			}
		})
	}

	var reconnect = function (port, def) {
		if (port > 23482) {
			disConnect();
			return def.reject();
		}

		connect(port).done(function () {

			return def.resolve();
		}).fail(function () {
			port++;
			return reconnect(port, def);
		})
	}

	var connect = function (port) {
		var _this = this;
		return $.Deferred(function (def) {
			try {
				var url = 'ws://127.0.0.1:' + port;

				window['camera001'] = socket = new WebSocket(url);
				socket.onopen = function () {
					console.log('open');
				};
				socket.onerror = function (e) { console.log('error:' + e.code) };
				socket.onmessage = function (msg) {
					if (msg.data === "websocketserver connect ok") {//올바른 웹 소프트 서비스를 나타냅니다
						def.resolve();
					}
					else {
						handleEvent(msg.data);
					}
				};
				socket.onclose = function () {
					disConnect();

					def.reject();
				};
			} catch (e) {
				def.reject();
			}
		}).promise();
	}

	var disConnect = function () {
		// WebVideoCtrl.logout("hhh4-1.iptime.org");
		logout(loginIp);

		window.socket = undefined;
		// pluginObject = undefined;
		socket = undefined;
		console.log('Websocket Closed!!!')
	}


	//브라우저 유형 가져 오기
	var browser = function () {
		var e = /(chrome)[ \/]([\w.]+)/,
			t = /(safari)[ \/]([\w.]+)/,
			n = /(opera)(?:.*version)?[ \/]([\w.]+)/,
			r = /(msie) ([\w.]+)/,
			s = /(trident.*rv:)([\w.]+)/,
			o = /(mozilla)(?:.*? rv:([\w.]+))?/,
			i = navigator.userAgent.toLowerCase(),
			a = e.exec(i) || t.exec(i) || n.exec(i) || r.exec(i) || s.exec(i) || i.indexOf("compatible") < 0 && o.exec(i) || ["unknow", "0"];
		a.length > 0 && a[1].indexOf("trident") > -1 && (a[1] = "msie");
		var c = {};
		var verArr = a[2].split('.');
		if (a[1] === 'chrome') {
			// eslint-disable-next-line no-unused-expressions
			verArr[0] - 0 < 42 ? c.npapi = true : c.websocket = true, c.type = 'chrome'
		}
		if (a[1] === 'mozilla') {
			// eslint-disable-next-line no-unused-expressions
			verArr[0] - 0 < 52 ? c.npapi = true : c.websocket = true, c.type = 'firefox'
		}
		return c[a[1]] = !0, c.version = a[2], c
	}

	/**
	*@description 삽입 삽입물
	*@param{String} sContainerID 플러그인 컨테이너 ID.
	*@param{Num}    iWidth       넓은 삽입물
	*@param{Num}    iHeight      높은 플러그인
	*@return void
	*/
	function insertPluginObject(sContainerID, iWidth, iHeight) {
		g_container = sContainerID;
		//IE 브라우저라면
		if (browser().msie) {
			var sSize = ' width=' + '\"' + iWidth.toString() + '\"' + ' height=' + '\"' + iHeight.toString() + '\"';
			var sHtmlValue = '<object classid=\"CLSID:95AF23C8-F168-4602-91F9-DB8D733BF200\"' + sSize + 'id=\"dhVideo\">' + '</object>'
			$("#" + sContainerID).html(sHtmlValue);
		} else if (browser().npapi) {
			var sSize = ' width=' + '\"' + iWidth.toString() + '\"' + ' height=' + '\"' + iHeight.toString() + '\"';
			var sHtmlValue = "<object type=\"application/media-plugin-version-4.0.0.0\"" + sSize + "id=\"dhVideo\">" + "</object>";
			$("#" + sContainerID).html(sHtmlValue);
		} else if (browser().websocket) {

		} else {

			$("#" + sContainerID).html('Do not support this browser');
		}
		return true;
	}

	/**
	*@description 이벤트 신호를 듣습니다
	*@param{String} event  이벤트 이름
	*@param{Function} cb 이벤트 콜백 기능
	*/
	function registerEvent(event, cb) {
		var callBackList = SignalMap.get(event);
		if (typeof callBackList !== "undefined") {
			callBackList.push(cb)
		}
		return true;
	}

	/**
	*@description 열린 장치 탐지
	*@param{String} ip    장치 IP.
	*@param{Num}    port  서비스 포트
	*/
	function startDevciceDetection(ip, port) {
		return pluginObject.StartDevciceDetection(ip, port);
	}

	/**
	*@description 초기화 플러그인
	*@param{String} sp    계약 유형
	*@param{Function} fnCallback 초기화 성공적인 콜백 기능
	*/
	var initPlugin = function (sp, fnCallback) {
		initSuccess = fnCallback;
		sProtocol = sp;
		checkReady();
		return true;
	}

	var MethodTable = {
		StartDevciceDetection: ['ip', 'port'],   //개방형 장치 사전 등록 정보
		CreatePluginWindow: ['browser'], //창을 만듭니다,WebSocket.
		ResizeVideo: ['left', 'top', 'width', 'height'], //창 위치 크기, WebSocket.
		ShowWindow: ['show'], //창이 표시되는지 여부에 관계없이 WebSocket 솔루션이 사용됩니다.
		SetProductType: ['type'], //제품 유형 설정
		SetSplitNum: ['num'], //부서 수를 설정하십시오
		GetLastError: ['svrName'], //오류 코드 가져 오기
		GetChannelTotal: ['deviceID'], //장비 채널 수를 얻으십시오
		GetSelectedNodeIndex: [], //현재 선택된 노드 색인을 가져옵니다
		GetSelectedViewIndex: null, //현재 선택보기 인덱스를 가져옵니다
		GetSelectedWinID: [], //현재 선택한 창 색인을 가져옵니다
		ConnectRealVideo: ['deviceID', 'nodeIndex', 'viewIndex', 'channel', 'stream', 'protocol'],//열린 비디오
		GetUserDirectory: null,//로컬 시스템에 대한 사용자 경로를 가져옵니다
		SetStoragePath: ['pathKey', 'path'],//저장소 경로를 설정합니다 pathKey: LiveRecord|LiveSnapshot|PlaybackSnapshot|PlaybackRecord|VideoClips|HeatMap
		GetStoragePath: ['pathKey'], //저장된 경로를 얻으십시오
		NoticeInitializedSignal: null, //플러그인 응용 프로그램 정보 초기화를 알립니다
		CreateMultiNodeDisplay: ['num', 'viewConfig'], //지정된 수의보기 만들기 여러 채널보기 ViewConfig 기본 에어 문자열보기
		SetFullscreen: null, //전체 화면 디스플레이
		ExitFullscreen: null, //전체 화면을 종료하십시오
		ClosePlayer: ['playerID'], //지정된 플레이어를 끕니다 playerID ConnectRealTimeVideo의 반환 값
		LoginDevice: ['ip', 'svrPort', 'userName', 'password', 'rtspPort', 'specCap', 'timeout'], // 로그인 프로토콜 프런트 엔드는 Dahua3 SVRPort 로그인 포트 SpecCap 0 : TCP 로그인 모드 2 : 능동적 인 등록 로그인 모드 3 : 멀티 캐스트 로그인 모드 4 : UDP 로그인 모드
		LogoutDevice: ['deviceID'], //로그 아웃하십시오
		SetNetProtocolType: ['protocol'], //로그인 프로토콜 설정
		PlaybackRemoteRecord: ['fileInfo', 'locateTime'], //재생 비디오(locateTime이 재생 시간을 시작합니다)
		StopPlayBack: null, //재생 중지
		PausePlayBack: null, //일시 중지 재생
		ResumePlayBack: null, //회복
		FastPlayBack: null, //표현하다
		SlowPlayBack: null, //느린
		PlayOneFrame: null, //단일 프레임
		SelectDirectory: ['type'], //로컬 경로 선택 상자 호출 로컬 경로를 선택하여 선택한 경로 이름을 가져옵니다.
		StartIntercom: ['deviceID'], //오픈 인터컴
		StopIntercom: ['deviceID'], //확대
		CrabOnePicture: ['format', 'path', 'open'], //그래픽
		ControlRecordingVideo: ['path', 'format', 'enable'], //비디오
		SetVolume: ['volume'], //볼륨 설정
		ControlAudio: ['playerID', 'enable'], //오디오 스위치
		MoveUpperLeft: ['verticalSpeed', 'levelSpeed', 'flag'], //구름 왼쪽에
		MoveUpperRight: ['verticalSpeed', 'levelSpeed', 'flag'], //Yuntai는 오른쪽으로 움직입니다
		MoveLowerLeft: ['verticalSpeed', 'levelSpeed', 'flag'], //Yuntai가 왼쪽으로 옮겼습니다
		MoveLowerRight: ['verticalSpeed', 'levelSpeed', 'flag'], //Yuntai의 올바른 운동
		MoveUpwards: ['verticalSpeed', 'flag'], //삿교리 시프트
		MoveLeft: ['levelSpeed', 'flag'], //Yuntai 왼쪽 시프트
		MoveRight: ['levelSpeed', 'flag'], //Yuntai 오른쪽 시프트
		MoveLower: ['verticalSpeed', 'flag'], //하위
		ActivePTZLocate: ['enable'], //3D 위치 결정
		ControlZoom: ['nMultiple', 'flag', 'flag1'], //제어
		ControlFocus: ['nMultiple', 'flag', 'flag1'], //컨트롤 줌
		ControlAperture: ['nMultiple', 'flag', 'flag1'], //제어 조리개
		GetPresetInfo: null, //사전 설정 정보를 얻으십시오
		GotoPreset: ['index', 'nSpeed'], //포인트를 미리 설정 한 위치
		RemovePreset: ['index'], //미리 설정된 포인트 삭제
		SetPreset: ['index', 'name'], //선호도를 설정하십시오
		StartTrafficDataQuery: ['deviceID', 'channel', 'startTime', 'endTime', 'ruleType', 'granularity', 'MinStayTime'], //열린 사람들 트래픽 통계 쿼리
		GetTrafficDataTotalCount: ['token'],  //정보 수
		QueryTrafficData: ['token', 'beginIndex', 'count'],  //검색 정보
		StopTrafficDataQuery: ['token'], //문의를 중지하십시오
		CreateVideoAnalyseContainer: [], //지능형지도 컨테이너를 만듭니다
		EnableVideoAnalyseContainer: ['containerID', 'enable'], //지능형지도 컨테이너를 활성화합니다
		CreateMainVideoAnalyseShape: ['containerID', 'eventName', 'shapeType', 'shapeName', 'data', 'param'], //주 그래프를 추가하십시오
		AddSubVideoAnalyseShape: ['containerID', 'mainShapeID', 'markedName', 'data', 'param'], //하위 그래픽을 추가하십시오
		GetVideoAnalyseShapeConfigData: ['containerID', 'shapeID'], //그래픽 데이터 가져 오기
		EnableCrowdDistriMap: ['nodeIndex', 'enable'], //해당 노드를 활성화하는 군중 프로필
		SetShowMultiScreenMode: ['mode'], //개체 추적 분할 화면 디스플레이 모드를 설정합니다
		SetIVSEnable: ['enable'], //IVS 미리보기 Enable을 설정하십시오
		StartVideoJoin: ['channel'], //많은 바느질을 열어 라
		SetLensInfo: ['leninfo'], //렌즈 매개 변수 설정 (더 많은 접합 필수)
		SubscribeEvent: ['channel', 'event'], //구독 행사
		UnSubscribeEvent: ['channel', 'event'], //구독 이벤트를 취소하십시오
		// recordtype은 녹화 유형 0입니다. 0 : 모든 녹음, 1 : 외부 알람, 2 : 연간 검사 테스트 알람, 3 : 모든 알람,
		StartRecordInfoQuerying: ['deviceID', 'channel', 'streamType', 'recordType', 'startTime', 'endTime', 'cardInfo'], //쿼리 녹음 시작 (인덱스 만 설정)
		StopRecordInfoQuerying: ['handle'], //쿼리 비디오를 중지하십시오
		FindNextRecordInfo: ['handle', 'count'], //쿼리 비디오
		QueryRecordFileBitmap: ['deviceID', 'channel', 'recordType', 'year', 'month', 'cardInfo'], //월간 비디오 마스크 쿼리
		GetWinID: ['nodeIndex', 'viewIndex'],
		OpenVoiceTalk: ['deviceID', 'sampleRate', 'depth', 'encode'], //지정된 매개 변수 오픈 인터콤
		CloseVoiceTalk: ['deviceID'], //확대
		GetDeviceConfig: ['deviceID', 'name'], //장비 구성 가져 오기
		StartTour: ['index'], //열린 크루즈
		StopTour: ['index'], //크루즈를 중지하십시오
		EnableCheck: ['bFlag'], //생산 능력
		SetSplitRowAndCol: ['row', 'col'], //분할 화면 수를 설정하십시오
		DownloadByLink: ['link', 'fileName'], //Weci 다운로드 파일
		StopDownloadByLink: ['requestID'], //다운로드를 중지하십시오
		GetDownoadProgress: ['requestID'], //다운로드 진행을하십시오
		SetOEM: ['oem'], //사용자 정의 정보를 설정하십시오
		SelectWindow: ['nodeIndex', 'viewIndex'], //창을 선택하십시오
		OpenPath: ['path'], //경로를 엽니 다
		StartTourByChannel: ['channel', 'index'] //채널로 크루즈를 켜십시오
	}

	var RegisterMethod = function () {
		$.each(MethodTable, function (method, params) {
			pluginObject[method] = function () {
				var args = arguments;
				var methodParams = {};
				methodParams['method'] = method;
				methodParams['params'] = {};
				if (g_id === Number.MAX_VALUE) {
					g_id = Number.MIN_VALUE;
				}
				methodParams['id'] = g_id;
				for (var i = 0; i < args.length; i++) {
					methodParams['params'][params[i]] = args[i];
				}
				//console.log(JSON.stringify(methodParams));
				var defer = $.Deferred();
				defMap[g_id] = defer;
				g_id++
				if (browser().websocket) {
					if (socket) {
						if (socket.readyState === 1) {
							socket.send(JSON.stringify(methodParams));
						}
					}
				} else {
					document.getElementById("dhVideo").PostMessage(JSON.stringify(methodParams));
				}
				return defer;
			};
		});
	}

	function checkReady() {
		try {
			pluginObject = {};

			RegisterMethod();
			if (browser().msie || browser().npapi) {
				//모니터 이벤트
				document.getElementById("dhVideo").AddEventListener("message", handleEvent);
			} else if (browser().websocket) {
				pluginObject.CreatePluginWindow(browser().type);
				pluginObject.ShowWindow(true);
			}
			//제품 정보를 설정하십시오
			pluginObject.SetProductType("Customer");
			//사용자 정의 유형 설정
			//pluginObject.SetOEM("SenseTime");
			//통신 프로토콜을 설정하십시오
			pluginObject.SetNetProtocolType(sProtocol);
			//종료 플러그인 초기화
			pluginObject.NoticeInitializedSignal().done(function () {
				//콜백
				initSuccess();
			});
		} catch (e) {
			setTimeout(checkReady, 500);
		}
	}

	/**
	*@description 해결 방법 오류 메시지
	*@param{String} 에러 메시지
	*@return String 오류 설명 정보
	*/
	var parseError = function (errorInfo) {
		var errorObject = $.parseJSON(errorInfo);
		if (("error" in errorObject)) {
			return errorObject["error"];
		}
	};

	/**
	*@description 비디오 창을 만듭니다
	*@param{Num}  iNum 만들기 Windows 수입니다
	*@return Boolean
	*/
	var createMultiNodeDisplay = function (iNum) {
		iNum = 37;
		if (pluginObject) {
			pluginObject.CreateMultiNodeDisplay(iNum);
		} else {
			return;
		}
	};

	/**
	*@description 창 표시 수를 설정하십시오
	*@param{Num}  iNum 디스플레이 수
	*@return Boolean
	*/
	var setSplitNum = function (iNum) {
		if(pluginObject){
			pluginObject.SetSplitNum(iNum * iNum);
		} else{
			return;
		}
	}

	/**
	*@description 플러그인의 크기 조정 (높은 버전 플러그인 만 해당)
	*@param{left}  left 플러그인 영역의 왼쪽 상단 모서리의 위치 (브라우저의 왼쪽 상단 모서리)
	*@param{top}  top 플러그인 영역의 왼쪽 상단 모서리의 위치 (브라우저의 왼쪽 상단 모서리)
	*@param{width}  width 플러그인 영역 과이드
	*@param{height}  height	높은 플러그인 영역
	*@return Boolean
	*/
	var resizeVideo = function (left, top, width, height) {
		if (pluginObject) {
			pluginObject.ResizeVideo(left, top, width, height);
		} else {
			return
		}

	}

	/**
	*@description 창 표시 수를 설정하십시오
	*@param{Num} row 행 수
	*@param{Num} col 열 번호	
	*@return Boolean
	*/
	var setSplitRowAndCol = function (row, col) {
		pluginObject.SetSplitRowAndCol(row, col);
	}

	/**응용 프로그램 오류를 가져옵니다
	*@description 응용 프로그램 오류 코드 가져 오기
	*@param{String} name 메서드 이름
	*@return 에러 코드
	*/
	var getLastError = function (name) {
		return pluginObject.GetLastError(name);
	}

	/**로그인 장치
	*@description 초기화 플러그인
	*@param{String} sIp         장치 IP.
	*@param{Num} iPort          서비스 포트
	*@param{String} sUserName   사용자 이름
	*@param{String} sPassword   암호
	*@param{Num} iRtspPort      RTSP 포트
	*@param{Num} iProtocol      계약서  
	*@param{Num} iTimeout       시간 초과
	*@param{Function} fnSuccess 성공적인 콜백 기능에 로그인 한 후에
	*@param{Function} fnFail    실패한 실패 후 콜백 함수
	*/
	var login = function (sIp, iPort, sUserName, sPassword, iRtspPort, iProtocol, iTimeout, fnSuccess, fnFail) {
		pluginObject.LoginDevice(sIp, iPort, sUserName, sPassword, iRtspPort, iProtocol, iTimeout).done(function (ret) {
			loginIp = sIp
			if (ret > 0) {
				//장치 정보를 삽입하십시오
				pluginObject.GetChannelTotal(ret).done(function (channelNum) {
					insertDeviceInfo(sIp, iPort, sUserName, sPassword, iRtspPort, iProtocol, channelNum, ret);
					fnSuccess(sIp, ret);
				});

			} else if (ret <= 0) {
				//오류 메시지가 나타납니다
				pluginObject.GetLastError("LoginDevice").done(function (err) {
					//분석 오류 설명
					fnFail(ret, parseError(err));
				});
			}
		})
	}

	/**
	*@description 장치 정보를 삽입하십시오
	*@param{Num} deviceID     장치 아이디
	*@param{String} ip        장치 IP.
	*@param{Num} port         서비스 포트
	*@param{String} userName  사용자 이름
	*@param{String} password  암호
	*@param{Num} rtspPort     RTSP 포트
	*@param{Num} channelNum   총 채널 수
	*@param{Num} deviceID     장치 아이디
	*/
	function insertDeviceInfo(ip, port, userName, password, rtspPort, protocol, channelNum, deviceID) {
		var info = {
			ip: ip,
			port: port,
			userName: userName,
			password: password,
			rtspPort: rtspPort,
			channelNum: channelNum,
			deviceID: deviceID,
			protocol: protocol
		}
		deviceInfoMap.put(ip, info);
	}

	/**
	*@description 장비 정보를 얻으십시오
	*/
	function getDeviceInfo(ip) {
		var info = deviceInfoMap.get(ip);
		if (typeof info !== 'undefined') {
			return info;
		} else {
			return
		}
	}

	function getDeviceIP(id) {
		var ip;
		deviceInfoMap.each(function (value) {
			if (value.deviceID === id) {
				ip = value.ip;
			}
		})
		return ip;
	}

	/**
	*@description 플레이어를 넣으십시오
	*@param{Num} iWinID       창 ID.
	*@param{Num} iDeviceID    장치 아이디
	*@param{Num} iPlayerID    플레이어 ID.
	*@param{string} sIP       장치 IP.
	*@param{Num} iProtocol    계약 유형
	*@param{Num} iChannle     채널 번호
	*@param{Num} iStreamType  코드 현재 유형
	*@param{Num} iPlayerType  플레이어 유형 0 : 실시간 모니터 1 : 네트워크 재생
	*/
	function insertPlayer(iWinID, iDeviceID, iPlayerID, sIP, iProtocol, iChannle, iStreamType, iPlayerType) {
		var info = {
			winID: iWinID,
			deviceID: iDeviceID,
			ip: sIP,
			channle: iChannle,
			streamType: iStreamType,
			protocol: iProtocol,
			playerID: iPlayerID,
			type: iPlayerType
		}
		playerInfoMap.put(iWinID, info);
	}


	/**
	*@description 지정된 장치의 총 채널 수를 얻으십시오.
	*@param{Num} deviceID  장치 아이디
	*/
	var getChannelNumber = function (deviceID) {
		return pluginObject.GetChannelTotal(deviceID);
	}

	/**
	*@description Lognout 장치
	*@param{String} ip  
	*@return Boolean
	*/
	var logout = function (ip) {

		var info = WebVideoCtrl.getDeviceInfo(ip);
		if (typeof info !== "undefined") {
			if(pluginObject){
				pluginObject.LogoutDevice(info.deviceID).done(function (ret) {
					//제거 장치
					deviceInfoMap.remove(ip);
					loginIp = undefined;
					return true;
				})
			} else {
				return;
			}
		}
	}

	/**
	*@description 선택한 비디오 창 재생
	*@param{String} sIP  
	*@param{Num} iChannel
	*@param{Num} iStream 
	*@param{Function} fnSuccess 
	*@param{Function} fnFail 
	*@return Num
	*/
	var connectRealVideo = function (sIP, iChannel, iStream, fnSuccess, fnFail) {
		pluginObject.GetSelectedNodeIndex().done(function (iNodeIndex) {
			pluginObject.GetSelectedViewIndex().done(function (iViewIndex) {
				var ODeviceInfo = getDeviceInfo(sIP)
				if (ODeviceInfo) {
					pluginObject.ConnectRealVideo(ODeviceInfo.deviceID, iNodeIndex, iViewIndex, iChannel - 1, iStream, ODeviceInfo.protocol).done(function (iRet) {
						if (iRet > 0) {
							//성공을하십시오
							if (typeof fnSuccess !== "undefined") {
								fnSuccess(iRet);
								pluginObject.GetSelectedWinID().done(function (iWinID) {
									insertPlayer(iWinID, ODeviceInfo.deviceID, iRet, ODeviceInfo.ip, ODeviceInfo.protocol, iChannel, iStream, 0);
								})
							};
						}
						else if (iRet <= 0) {
							if (typeof fnSuccess !== "undefined") {
								//오류 메시지가 나타납니다
								pluginObject.GetLastError("ConnectRealVideo").done(function (errorInfo) {
									//분석 오류 설명
									fnFail(iRet, parseError(errorInfo));
								});
							};
						}
					})
				} else {
					return
				}
			})
		});
	}

	/**
	*@description 지정된 비디오 창을 선택하십시오
	*@param{Num} iIndex
	*/
	var selectWindow = function (iIndex) {
		pluginObject.SelectWindow(iIndex, 0);
	}

	/**
	*@description 지정된 창 일련 번호에서 비디오를 재생합니다
	*@param{Num} iIndex
	*@param{String} sIP  
	*@param{Num} iChannel
	*@param{Num} iStream 
	*@param{Function} fnSuccess 
	*@param{Function} fnFail 
	*@return Num
	*/
	var connectRealVideoEx = function (iIndex, sIP, iChannel, iStream, fnSuccess, fnFail) {
		pluginObject.GetWinID(iIndex, 0).done(function (iWinID) {
			//장비 정보를 얻으십시오
			var ODeviceInfo = getDeviceInfo(sIP);
			pluginObject.ConnectRealVideo(ODeviceInfo.deviceID, iIndex, 0, iChannel - 1, iStream, ODeviceInfo.protocol).done(function (iRet) {
				if (iRet > 0) {
					//성공을하십시오
					if (typeof fnSuccess !== "undefined") {
						fnSuccess(iRet);
						insertPlayer(iWinID, ODeviceInfo.deviceID, iRet, ODeviceInfo.ip, ODeviceInfo.protocol, iChannel, iStream, 0);
					};
				}
				else if (iRet <= 0) {
					if (typeof fnSuccess !== "undefined") {
						//오류 메시지가 나타납니다
						var errorInfo = pluginObject.GetLastError("ConnectRealVideo");
						//분석 오류 설명
						fnFail(iRet, parseError(errorInfo));
					};
				}
			})
		})
	}

	//선택한 일련 번호보기를 선택하십시오
	var getSelectedWinIndex = function () {
		return pluginObject.GetSelectedNodeIndex();
	}

	/**
	*@description 현재 선택된 창의 플레이어를 닫습니다
	*/
	var closePlayer = function () {
		//현재 선택된 창 ID를 가져옵니다
		getSelectedWinID().done(function (iWinID) {
			//플레이어 ID를 얻으십시오
			var oInfo = playerInfoMap.get(iWinID);
			if (typeof oInfo !== "undefined") {
				pluginObject.ClosePlayer(oInfo.playerID);
				return true;
			} else {
				return true;
			}
		});

	}

	/**
	*@description 모든 플레이어를 닫습니다
	*/
	var closeAllPlayer = function () {
		//트래버스 플레이어 ID.
		playerInfoMap.each(function (info) {
			if (typeof info !== "undefined") {
				pluginObject.ClosePlayer(info.playerID);
			}
		});
	}

	/**
	*@description 플레이어 정보를 얻으십시오
	*@param{Num} iWinID 창 ID.
	*/
	function getPlayerInfo(iWinID) {
		return playerInfoMap.get(iWinID);
	}


	/**
	*@description 선택한 창에서 플레이어 ID를 가져옵니다
	*/
	function getSelectedPlayerID() {
		var iWinID = WebVideoCtrl.getSelectedWinID().done(function (iWinID) {
			var info = playerInfoMap.get(iWinID);
			if (typeof info !== "undefined") {
				return info.playerID;
			} else {
				return 0;
			}
		});
	}

	//음성 인터콤
	var startVoiceTalk = function (sIP, cb) {
		var ODeviceInfo = getDeviceInfo(sIP);
		if (typeof ODeviceInfo === "undefined") {
			return 0;
		}
		pluginObject.GetDeviceConfig(ODeviceInfo.deviceID, "Encode").done(function (ret) {
			var params = JSON.parse(ret);
			var type = params.table[0].Compression || "G.711A";
			var sampleRate = params.table[0].Frequency || 8000;
			var depth = params.table[0].Depth || 16;
			pluginObject.OpenVoiceTalk(ODeviceInfo.deviceID, sampleRate, depth, type).done(function (ret) {
				if (ret > 0) {
					cb.cbSuccess(ret);
				}
				else {
					cb.cbFailed();
				}
			});
		})
	}

	//확대
	var stopVoiceTalk = function (sIP) {
		var ODeviceInfo = getDeviceInfo(sIP);
		if (typeof ODeviceInfo === "undefined") {
			return 0;
		}
		pluginObject.StopIntercom(ODeviceInfo.deviceID);
	}

	//경로를 선택하십시오
	var selectDirectory = function (type, cb) {
		//등록 경로 선택 이벤트
		eventHandler.selectDir = cb.cbSuccess;
		pluginObject.SelectDirectory(type);
	}

	/**
	*@description 현재 창에서 비디오를 재생하는 실시간 그림을 크롤링합니다.
	*@param{Num} iFormat 이미지 형식 아카이브
	*@param{Num} sPath   스토리지 경로
	*@param{Boolean} bOpen   스토리지 경로
	*/
	var crabOnePicture = function (iFormat, sPath, bOpen) {
		return pluginObject.CrabOnePicture(iFormat, sPath, bOpen);
	}

	/**
	*@description 현재 창에서 비디오를 재생하는 비디오 기능을 켜십시오.
	*@param{Num} iFormat 비디오 형식
	*@param{Num} sPath   저장 경로의 기록
	*/
	var startRecordingVideo = function (iFormat, sPath) {
		return pluginObject.ControlRecordingVideo(sPath, iFormat, true);
	}

	//녹음을 중지하십시오
	var stopRecordingVideo = function () {
		return pluginObject.ControlRecordingVideo("", -1, false);
	}

	//볼륨 설정
	var setVolume = function (volume, cb) {
		pluginObject.SetVolume(volume)
	}

	//열린 소리
	var openSound = function (cb) {
		var playerID = getSelectedPlayerID();
		return pluginObject.ControlAudio(playerID, true);
	}

	//소리를 닫았다
	var closeSound = function (cb) {
		var playerID = getSelectedPlayerID();
		return pluginObject.ControlAudio(playerID, false);
	}

	/**
	*@description 오픈 전자 줌
	*/
	var enableEZoom = function (cb) {
		return pluginObject.ActiveLocalEnlarge(true);
	}

	/**
	*@description 전자 줌을 끄십시오
	*/
	var disableEZoom = function (cb) {
		return pluginObject.ActiveLocalEnlarge(false);
	}

	/**
	*@description 전체 화면으로 전환하십시오
	*/
	var setFullscreen = function () {
		pluginObject.SetFullscreen();
		return true;
	}

	/**
	*@description 전체 화면을 종료하십시오
	*/
	var exitFullscreen = function () {
		pluginObject.ExitFullscreen();
		return true;
	}

	//사용자 경로를 가져옵니다
	var getUserDirectory = function () {
		return pluginObject.GetUserDirectory();
	}

	//선택한 창 ID를 가져옵니다
	var getSelectedWinID = function () {
		return pluginObject.GetSelectedWinID();
	}

	/**
	*@description 플레이어의 소리를 제어하십시오
	*@param{Num} playerID    플레이어 ID.
	*@param{Boolean} enable  닫기 서명을 켜십시오
	*/
	var controlAudio = function (playerID, enable) {
		return pluginObject.ControlAudio(playerID, enable);
	}

	/**
	*@description 왼쪽으로 이동합니다
	*@param{Num} iVerticalSpeed    수직 속도
	*@param{Num} iLevelSpeed       레벨 속도
	*@param{Boolean} flag  정지 신호를 켜십시오
	*/
	var moveUpperLeft = function (iVerticalSpeed, iLevelSpeed, flag) {
		return pluginObject.MoveUpperLeft(iVerticalSpeed, iLevelSpeed, flag);
	}

	/**
	*@description 오른쪽 운동
	*@param{Num} iVerticalSpeed    수직 속도
	*@param{Num} iLevelSpeed       레벨 속도
	*@param{Boolean} flag  정지 신호를 켜십시오
	*/
	var moveUpperRight = function (iVerticalSpeed, iLevelSpeed, flag) {
		return pluginObject.MoveUpperRight(iVerticalSpeed, iLevelSpeed, flag);
	}

	/**
	*@description 왼쪽 운동
	*@param{Num} iVerticalSpeed    수직 속도
	*@param{Num} iLevelSpeed       레벨 속도
	*@param{Boolean} flag  정지 신호를 켜십시오
	*/
	var moveLowerLeft = function (iVerticalSpeed, iLevelSpeed, flag) {
		return pluginObject.MoveLowerLeft(iVerticalSpeed, iLevelSpeed, flag);
	}

	/**
	*@description 오른쪽 운동
	*@param{Num} iVerticalSpeed    수직 속도
	*@param{Num} iLevelSpeed       레벨 속도
	*@param{Boolean} flag  정지 신호를 켜십시오
	*/
	var moveLowerRight = function (iVerticalSpeed, iLevelSpeed, flag) {
		return pluginObject.MoveLowerRight(iVerticalSpeed, iLevelSpeed, flag);
	}

	/**
	*@description 움직이는
	*@param{Num} iVerticalSpeed   수직 속도
	*@param{Boolean} flag         정지 신호를 켜십시오
	*/
	var moveUpwards = function (iVerticalSpeed, flag) {
		return pluginObject.MoveUpwards(iVerticalSpeed, flag);
	}

	/**
	*@description 아래로 이동
	*@param{Num} iVerticalSpeed   수직 속도
	*@param{Boolean} flag         정지 신호를 켜십시오
	*/
	var moveLower = function (iVerticalSpeed, flag) {
		return pluginObject.MoveLower(iVerticalSpeed, flag);
	}

	/**
	*@description 왼쪽 이동
	*@param{Num} iLevelSpeed   레벨 속도
	*@param{Boolean} flag      정지 신호를 켜십시오
	*/
	var moveLeft = function (iLevelSpeed, flag) {
		return pluginObject.MoveLeft(iLevelSpeed, flag);
	}

	/**
	*@description 오른쪽 운동
	*@param{Num} iLevelSpeed   레벨 속도
	*@param{Boolean} flag      정지 신호를 켜십시오
	*/
	var moveRight = function (iLevelSpeed, flag) {
		return pluginObject.MoveRight(iLevelSpeed, flag);
	}

	/**
	*@description PTZ 위치 지정을 활성화합니다
	*/
	var enablePTZLocate = function () {
		return pluginObject.ActivePTZLocate(true);
	}

	/**
	*@description 비 가능성 PTZ 위치 결정
	*/
	var disablePTZLocate = function () {
		return pluginObject.ActivePTZLocate(false);
	}

	/**
	*@description 제어
	*@param{Num} iSpeed     배수
	*@param{Num} flag      증가 또는 감소
	*       - 0:증가하다
	*       - 1:다시 자르십시오
	*@param{Boolean} flag1      정지 신호를 켜십시오
	*/
	var controlZoom = function (iSpeed, flag, flag1) {
		return pluginObject.ControlZoom(iSpeed, flag, flag1);
	}

	/**
	*@description 컨트롤 줌
	*@param{Num} speed     배수
	*@param{Num} flag      증가 또는 감소
	*       - 0:증가하다
	*       - 1:다시 자르십시오
	*@param{Boolean} flag1      정지 신호를 켜십시오
	*/
	var controlFocus = function (speed, flag, flag1) {
		return pluginObject.ControlFocus(speed, flag, flag1);
	}

	/**
	*@description 제어 조리개
	*@param{Num} speed     배수
	*@param{Num} flag      증가 또는 감소
	*       - 0:증가하다
	*       - 1:다시 자르십시오
	*@param{Boolean} flag1      정지 신호를 켜십시오
	*/
	var controlAperture = function (speed, flag, flag1) {
		return pluginObject.ControlAperture(speed, flag, flag1);
	}

	/**
	*@description 사전 설정 정보를 얻으십시오
	*/
	var getPresets = function (cb) {
		pluginObject.GetPresetInfo().done(function (info) {
			if (info !== "") {
				// DemoUI.clearPresets();
				var dataObject = $.parseJSON(info);
				$.each(dataObject, function (i, item) {
					cb(item.Index, item.Name);
				});
			}
		});
	}

	/**
	*@description 포인트를 미리 설정 한 위치
	*@param{Num} index     사전 설정 포인트 일련 번호
	*@param{Num} speed     속도
	*/
	var gotoPreset = function (index, speed) {
		return pluginObject.GotoPreset(index, speed);
	}

	/**
	*@description 미리 설정된 포인트 삭제
	*@param{Num} index     사전 설정 포인트 일련 번호
	*/
	var removePreset = function (index) {
		return pluginObject.RemovePreset(index);
	}

	/**
	*@description 선호도를 설정하십시오
	*@param{Num} index     사전 설정 포인트 일련 번호
	*@param{Num} name      프리 세트 포인트 이름
	*/
	var setPreset = function (index, name) {
		return pluginObject.SetPreset(index, name);
	}

	/**
	*@description 열린 사람들 트래픽 통계 쿼리
	*@param{String} sIP  
	*@param{Num} iChannel
	*@param{String} sStartTime 
	*@param{String} sEndTime 
	*@param{Num} iRuleType 
	*@param{Num} iSpan 
	*@param{Num} iMinStayTime 
	*@return Num
	*/
	var startTrafficDataQuery = function (sIP, iChannel, sStartTime, sEndTime, iRuleType, iSpan, iMinStayTime) {
		//장비 정보를 얻으십시오
		var ODeviceInfo = getDeviceInfo(sIP);
		if (typeof ODeviceInfo === "undefined") {
			return 0;
		}
		return pluginObject.StartTrafficDataQuery(ODeviceInfo.deviceID, iChannel, sStartTime, sEndTime, iRuleType, iSpan, iMinStayTime);
	}

	/**
	*@description 정보 수
	*@param{Num} iHandle
	*@return Num
	*/
	var getTrafficDataTotalCount = function (iHandle) {
		return pluginObject.GetTrafficDataTotalCount(iHandle);
	}

	/**
	*@description 정보를 얻다
	*@param{Num} iHandle
	*@return Num
	*/
	var queryTrafficData = function (iHandle, iBeginIndex, iCount) {
		return pluginObject.QueryTrafficData(iHandle, iBeginIndex, iCount);
	}

	var stopTrafficDataQuery = function (iHandle) {
		return pluginObject.StopTrafficDataQuery(iHandle);
	}

	/**
	*@description 비디오 쿼리를 엽니 다
	*@param{String} szIP             장치 IP.
	*@param{Num} iChannel            채널 번호
	*@param{Num} iStreamType         코드 현재 유형
	*@param{String}  szStartTime     시작 시간    
	*@param{String}  szEndTime       끝 시간    
	*@return String
	*/
	var startRecordInfoSearch = function (szIP, iChannel, iStreamType, szStartTime, szEndTime) {
		//녹음 정보를 지우십시오
		remoteFileInfor.length = 0;
		//장비 정보를 얻으십시오
		var ODeviceInfo = getDeviceInfo(szIP);
		if (typeof ODeviceInfo === "undefined") {
			return 0;
		}
		return pluginObject.StartRecordInfoQuerying(ODeviceInfo.deviceID, iChannel - 1, iStreamType, 0, szStartTime, szEndTime, "");
	}

	/**
	*@description 문의를 중지하십시오
	*@param{Num} iHandle             쿼리 핸들
	*/
	var stopRecordInfoQuerying = function (iHandle) {
		return pluginObject.StopRecordInfoQuerying(iHandle);
	}

	/**
	*@description 비디오 쿼리를 엽니 다
	*@param{Num} iHandle             쿼리 핸들
	*@param{Num} icout               쿼리 수
	*@return String
	*/
	var findNextRecordInfo = function (iHandle, icout, cb) {
		return pluginObject.FindNextRecordInfo(iHandle, icout).done(function (info) {
			if (info.length !== 0) {
				var dataObject = $.parseJSON(info);
				remoteFileInfor.push(dataObject);
			}
			cb(info);
		});
	}

	/**
	*@description 비디오 쿼리를 엽니 다
	*@param{Num} fileInfo             파일
	*@return String
	*/
	var playRemoteFileByFile = function (fileInfo) {
		var locateTime;
		var playFile;
		var find = false;
		for (var i = 0; i < remoteFileInfor.length; i++) {
			if (("found" in remoteFileInfor[i])) {
				var length = remoteFileInfor[i]["found"];
				if (0 !== parseInt(length)) {
					//모든 노드를 탐색하고 recordinfor에 추가하십시오
					$.each(remoteFileInfor[i].infos, function (i, item) {
						var infor = item.StartTime + "--" + item.EndTime;
						if (infor === fileInfo) {
							locateTime = item.StartTime;
							playFile = item;
							find = true;
						}
					});
				}
			}
		}
		if (find) {
			var file = JSON.stringify(playFile);
			pluginObject.PlaybackRemoteRecord(file, locateTime);
		}
	}

	/**
	*@description 재생 중지
	*/
	var stopPlayBack = function stopPlayBack() {
		return pluginObject.StopPlayBack();
	}

	/**
	*@description 일시 중지 재생
	*/
	var pausePlayBack = function pausePlayBack() {
		//지정된 수의 비디오 정보를 쿼리하십시오
		return pluginObject.PausePlayBack();
	}

	/**
	*@description 회복
	*/
	var resumePlayBack = function resumePlayBack() {
		//지정된 수의 비디오 정보를 쿼리하십시오
		return pluginObject.ResumePlayBack();
	}

	/**
	*@description 단일 프레임 재생
	*/
	var playOneFrame = function playOneFrame() {
		return pluginObject.PlayOneFrame();
	}

	/**
	*@description 빨리 감기
	*/
	var fastPlayBack = function fastPlayBack() {
		//지정된 수의 비디오 정보를 쿼리하십시오
		return pluginObject.FastPlayBack();
	}

	/**
	*@description 천천히 진행
	*/
	var slowPlayBack = function slowPlayBack() {
		//지정된 수의 비디오 정보를 쿼리하십시오
		return pluginObject.SlowPlayBack();
	}

	/**
	*@description 열린 지능
	*/
	var enableIVS = function enableIVS() {
		//지정된 수의 비디오 정보를 쿼리하십시오
		return pluginObject.SetIVSEnable(true);
	}

	/**
	*@description 멈추지 마라
	*/
	var disableIVS = function disableIVS() {
		//지정된 수의 비디오 정보를 쿼리하십시오
		return pluginObject.SetIVSEnable(false);
	}

	var queryRecordFileBitmap = function (sIP, iChannel, iYear, iMonth, iRecordType) {
		//장비 정보를 얻으십시오
		var ODeviceInfo = getDeviceInfo(sIP);
		if (typeof ODeviceInfo === "undefined") {
			return "";
		}
		return pluginObject.QueryRecordFileBitmap(ODeviceInfo.deviceID, iChannel - 1, iRecordType, iYear, iMonth, "");
	}

	/**
	*@description 지정된 창의 영역을 켜십시오
	*/
	var activeFocusRegion = function () {
		return pluginObject.ActiveFocusRegion(true);
	}

	var startTour = function (index) {
		return pluginObject.StartTour(index);
	}

	var stopTour = function (index) {
		return pluginObject.StopTour(index);
	}

	var startTourByChannel = function (channel, index) {
		return pluginObject.StartTourByChannel(channel - 1, index);
	}

	var enableCheck = function (bFlag) {
		return pluginObject.EnableCheck(bFlag);
	}

	var subscribeEvent = function (channel, name) {
		pluginObject.SubscribeEvent(channel - 1, name);
	}

	var unsubscribeEvent = function (channel, name) {
		pluginObject.UnSubscribeEvent(channel - 1, name);
	}

	var downloadByLink = function (link, fileName) {
		return pluginObject.DownloadByLink(link, fileName);
	}

	var stopDownloadByLink = function (requestID) {
		return pluginObject.StopDownloadByLink(requestID);
	}

	var getDownoadProgress = function (requestID) {
		return pluginObject.getDownoadProgress(requestID);
	}


	var openPath = function (path) {
		return pluginObject.OpenPath(path);
	}

	var getPluginObject = function () {
		return pluginObject;
	}

	window.blur = function (e) {
		pluginObject.ShowWindow(false);
	}

	window.focus = function (e) {
		pluginObject.ShowWindow(true);
	}

	window.onload = function () {
		function getHiddenProp() {
			var prefixes = ['webkit', 'moz', 'ms', 'o'];

			// if 'hidden' is natively supported just return it
			if ('hidden' in document) return 'hidden';

			// otherwise loop over all the known prefixes until we find one
			for (var i = 0; i < prefixes.length; i++) {
				if ((prefixes[i] + 'Hidden') in document)
					return prefixes[i] + 'Hidden';
			}

			// otherwise it's not supported
			return null;
		}

		function getVisibilityState() {
			var prefixes = ['webkit', 'moz', 'ms', 'o'];
			if ('visibilityState' in document) return 'visibilityState';
			for (var i = 0; i < prefixes.length; i++) {
				if ((prefixes[i] + 'VisibilityState') in document)
					return prefixes[i] + 'VisibilityState';
			}
			// otherwise it's not supported
			return null;
		}

		function isHidden() {
			var prop = getHiddenProp();
			if (!prop) return false;

			return document[prop];
		}

		var visProp = getHiddenProp();
		if (visProp) {
			//바인딩 탭 디스플레이/숨겨진 상태 변경 이벤트
			var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
			document.addEventListener(evtname, function () {
				if (pluginObject) {
					pluginObject.ShowWindow(!isHidden());
				} else {
					return
				}
			}, false);
		}
	}

	var setOpInfoCallback = function (cb) {
		showOpInfo = cb;
	}

	return {
		checkPluginInstall: checkPluginInstall,
		browser: browser,
		insertPluginObject: insertPluginObject,
		createMultiNodeDisplay: createMultiNodeDisplay,
		initPlugin: initPlugin,
		setSplitNum: setSplitNum,
		setSplitRowAndCol: setSplitRowAndCol,
		login: login,
		getDeviceInfo: getDeviceInfo,
		logout: logout,
		connectRealVideo: connectRealVideo,
		getChannelNumber: getChannelNumber,
		closePlayer: closePlayer,
		closeAllPlayer: closeAllPlayer,
		getSelectedPlayerID: getSelectedPlayerID,
		getPlayerInfo: getPlayerInfo,
		getSelectedWinIndex: getSelectedWinIndex,
		startVoiceTalk: startVoiceTalk,
		stopVoiceTalk: stopVoiceTalk,
		selectDirectory: selectDirectory,
		crabOnePicture: crabOnePicture,
		startRecordingVideo: startRecordingVideo,
		stopRecordingVideo: stopRecordingVideo,
		setVolume: setVolume,
		openSound: openSound,
		closeSound: closeSound,
		enableEZoom: enableEZoom,
		disableEZoom: disableEZoom,
		setFullscreen: setFullscreen,
		exitFullscreen: exitFullscreen,
		getUserDirectory: getUserDirectory,
		getSelectedWinID: getSelectedWinID,
		registerEvent: registerEvent,
		controlAudio: controlAudio,
		moveUpperLeft: moveUpperLeft,
		moveUpperRight: moveUpperRight,
		moveLowerLeft: moveLowerLeft,
		moveLowerRight: moveLowerRight,
		moveLeft: moveLeft,
		moveRight: moveRight,
		moveUpwards: moveUpwards,
		moveLower: moveLower,
		enablePTZLocate: enablePTZLocate,
		disablePTZLocate: disablePTZLocate,
		controlZoom: controlZoom,
		controlFocus: controlFocus,
		controlAperture: controlAperture,
		getPresets: getPresets,
		gotoPreset: gotoPreset,
		removePreset: removePreset,
		setPreset: setPreset,
		startTrafficDataQuery: startTrafficDataQuery,
		getTrafficDataTotalCount: getTrafficDataTotalCount,
		queryTrafficData: queryTrafficData,
		stopTrafficDataQuery: stopTrafficDataQuery,
		startDevciceDetection: startDevciceDetection,
		connectRealVideoEx: connectRealVideoEx,
		selectWindow: selectWindow,
		startRecordInfoSearch: startRecordInfoSearch,
		findNextRecordInfo: findNextRecordInfo,
		playRemoteFileByFile: playRemoteFileByFile,
		stopPlayBack: stopPlayBack,
		pausePlayBack: pausePlayBack,
		resumePlayBack: resumePlayBack,
		fastPlayBack: fastPlayBack,
		slowPlayBack: slowPlayBack,
		stopRecordInfoQuerying: stopRecordInfoQuerying,
		enableIVS: enableIVS,
		disableIVS: disableIVS,
		queryRecordFileBitmap: queryRecordFileBitmap,
		activeFocusRegion: activeFocusRegion,
		getPluginObject: getPluginObject,
		subscribeEvent: subscribeEvent,
		unsubscribeEvent: unsubscribeEvent,
		playOneFrame: playOneFrame,
		startTour: startTour,
		stopTour: stopTour,
		enableCheck: enableCheck,
		resizeVideo: resizeVideo,
		downloadByLink: downloadByLink,
		stopDownloadByLink: stopDownloadByLink,
		getDownoadProgress: getDownoadProgress,
		setOpInfoCallback: setOpInfoCallback,
		getLastError: getLastError,
		openPath: openPath,
		startTourByChannel: startTourByChannel
	};

})(this);
