// class Dahua {
//     constructor(id) {
//         console.log('Dahua Class-->',id)
//         console.log(this)
//         this._el = id;
//     }
// }

// import { WebVideoCtrl } from "./module/WebVideoCtrl";
import { Foundation } from './foundation';
import { WebVideoCtrl } from './WebVideoCtrl';

export default function Dahua(objectId) {
    /**
     * @param objectId string-영상 출력 Div 엘리먼트 id
     * @description 최초 연결  로그인 상태 x
     */
    if (objectId !== undefined) {
        if (objectId !== undefined) {
            this.objectId = objectId;
            this.camOCX = document.getElementById(objectId);
        }
    } else {
        return
    }
}

Dahua.prototype = {
    objectId: undefined,
    camOCX: undefined,
    splitNum: 1,
    count: 0,
    filePath: {
        liveRecord: undefined,
        download: undefined,
        liveSnapshot: undefined,
        playBackPicPath: undefined,
        playBackFilePath: undefined
    },
    connectInfo: {
        szIP: undefined,
        szPort: undefined,
        szUsername: undefined,
        szPassword: undefined,
        szRtspPort: undefined,
        szProtocol: undefined,
        szTitmeout: undefined
    },
    position: {
        left: 0,
        right: 0,
        width: 0,
        height: 0
    },
    ptzSpeed: 4,
    channel: 1, //채널 번호
    streamType: 1, // 현재 코드 유형
    winMode: 0, //재생 창 모드 0:현재창에서재생 / 1:재생창지정모드
    winIndex: 0, // 재생창 인덱스 2x2:0~3 3X3:0~8 4x4:0~15,
    init(obj) {
        /**
         * @description 최초 로그인 
         */
        let _this = this;
        _this.count += 1;
        WebVideoCtrl.checkPluginInstall().done(function () {
            console.log('objectId-->', _this.objectId)
            WebVideoCtrl.insertPluginObject(_this.objectId, 300, 300);
            //초기화 플러그인
            WebVideoCtrl.initPlugin("Protocol2", function () {
                WebVideoCtrl.setOpInfoCallback(_this.showOPInfo);
                let left = _this.position.left = _this.camOCX.offsetLeft;
                let top = _this.position.top = _this.camOCX.offsetTop + window.outerHeight - window.innerHeight;
                let width = _this.position.width = _this.camOCX.offsetWidth;
                let height = _this.position.height = _this.camOCX.offsetHeight;
                console.log(left,'/',top,'/',width,'/',height)

                WebVideoCtrl.resizeVideo(left, top, width, height);
                //비디오 창을 만듭니다
                WebVideoCtrl.createMultiNodeDisplay(36);
                //비디오 창의 표시를 설정하십시오
                // var num = parseInt($("#wndNum").find("option:selected").val());
                //Windows 세분화 수를 설정합니다
                WebVideoCtrl.setSplitNum(_this.splitNum);
                //등록 문제
                WebVideoCtrl.registerEvent("SelectedView", _this.responseSelectedViewSignal);
                //초기화 경로
                WebVideoCtrl.getUserDirectory().done(function (szDir) {
                    console.log('szDir->', szDir)
                    let szPath = `${szDir}\\LiveRecord"`;
                    _this.filePath.liveRecord = szPath;
                    szPath = `${szDir}\\Download"`;
                    _this.filePath.download = szPath;

                    szPath = `${szDir}\\LiveSnapshot"`;
                    _this.filePath.liveSnapshot = szPath;

                    szPath = `${szDir}\\PlaybackPicPath"`;
                    _this.filePath.playBackPicPath = szPath;

                    szPath = `${szDir}\\PlaybackFilePath"`;
                    _this.filePath.playBackFilePath = szPath;

                    console.log(_this.filePath)
                    // $("#tabs").tabs();
                    //숨겨진 창 일련 번호 선택 상자
                    // $("#winIndex").hide();
                });
            });
            // $("#tabs_ptz").tabs();
            // $("#tabs_playback").tabs();
            // $("#tabs_control").tabs();
            // $("#closePtzLocate").hide();
            // $("#openPtzLocate").show();
            _this.clickLogin(obj);
        }).fail(function () {
            alert("플러그인을 설치하지 않았고 개발 패키지 디렉토리를 두 ​​번 클릭합니다.WebPlugin.exe 패키지 설치！");
        });
    },
    clickLogin(obj) {
        console.log("clickLogin--->", obj)
        let _this = this;
        let { ip, port, username, password, rtspPort = 80, protocol = 0, timeout = 5, streamType = 1, channel = 1 } = obj;

        let szIP = ip;
        let szPort = parseInt(port - 0);
        let szUsername = username;
        let szPassword = password;
        let szRtspPort = rtspPort - 0;
        let szProtocol = protocol - 0;
        let szTimeout = timeout - 0;
        if ("" === szIP || "" === szPort) {
            return;
        }
        // var port = parseInt(port);
        //현재 장치가 이미 로그인한지 확인하십시오
        var deviceInfo = WebVideoCtrl.getDeviceInfo(szIP);
        console.log(_this.objectId, '-->01.deviceInfo-->', deviceInfo)
        if (typeof deviceInfo !== "undefined") {
            console.log("Login Success!!!")
            if (WebVideoCtrl.logout(szIP)) {
                //프롬프트를 추가하십시오
                _this.showOPInfo(szIP + " Logout Device ");
                //장치 정보를 삭제하십시오
                // DemoUI.removeDeviceInfo(szIP);
            }
        }
        console.log('00.connectInfo-->', _this.connectInfo)

        let _connectInfo = _this.connectInfo;
        _this.connectInfo = {
            ..._connectInfo,
            szIP: ip,
            szPort: port,
            szUsername: username,
            szPassword: password,
            szRtspPort: rtspPort,
            szProtocol: protocol,
            szTitmeout: timeout
        }
        _this.streamType = streamType;
        _this.channel = channel;
        console.log('11.connectInfo-->', _this.connectInfo)
        console.log('12.channel-->', _this.channel)
        WebVideoCtrl.login(szIP, szPort, szUsername, szPassword, szRtspPort, szProtocol, szTimeout,
            function (sIp, iDeviceID) {
                _this.showOPInfo(sIp + " Login Succeed ");
                //삽입 장치
                // DemoUI.addDeviceIP(sIp);
                //채널 번호를 가져옵니다
                console.log('--->', iDeviceID)
                WebVideoCtrl.getChannelNumber(iDeviceID).done(function (ret) {
                    //채널 데이터를 업데이트합니다
                    console.log('ret--->', ret)
                    // DemoUI.modifyChannelList(ret);
                    _this.clickStartRealPlay();
                });

            },
            function (iErrorCode, sError) {
                _this.showOPInfo(szIP + " Login Fail ", iErrorCode, sError);
            }
        );
        console.log('WebVideoCtrl--->', WebVideoCtrl)
    },
    clickLogout() {
        /**
         * @description 로그아웃
         */

        let _this = this;
        // 현재 로그인 된 IP 수집
        let ip = _this.connectInfo.szIP;
        console.log(ip)
        if (WebVideoCtrl.logout(ip)) {
            console.log('로그아웃!!!!!')

            _this.showOPInfo(`${ip} Logout Device`);
            _this.removeConnectionInfo();
        }

    },
    removeConnectionInfo() {
        /**
        * @description connentInfo 객체 초기화
        */
        let _this = this;
        _this.connectInfo.szIP = undefined;
        _this.connectInfo.szPort = undefined
        _this.connectInfo.szUsername = undefined
        _this.connectInfo.szPassword = undefined
        _this.connectInfo.szRtspPort = undefined
        _this.connectInfo.szProtocol = undefined
        _this.connectInfo.szTitmeout = undefined

        console.log('removeConnectionInfo--->', _this.connectInfo)
    },
    showOPInfo(szInfo, status, error) {
        var szTip = "<div>" + Foundation.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo;
        if (typeof status != "undefined") {
            szTip += "(" + status.toString() + ", " + error.toString() + ")";
        }
        szTip += "</div>";
        console.log('showOPinfo--->', szTip)
        // $("#opinfo").html(szTip + $("#opinfo").html());
    },
    responseSelectedViewSignal(iNodeIndex, iViewIndex, iWinID) {
        //플레이어에 대한 정보를 업데이트하십시오
        let playrInfo = WebVideoCtrl.getPlayerInfo(iWinID);
        //UI 정보를 업데이트하십시오
        if (typeof playrInfo != "undefined") {
            //장치 정보
            let deviceInfo = WebVideoCtrl.getDeviceInfo(playrInfo.ip);
            if (typeof deviceInfo != "undefined") {
                // DemoUI.updateDeviceInfo(playrInfo.ip);
                // DemoUI.setCurChannel(playrInfo.channle);
                // DemoUI.setCurStreamType(playrInfo.streamType);
            }
        }
    },
    clickStartRealPlay() {
        /**
         * @description 실시간 영상 재생          
         */
        let _this = this;
        //현재 선택된 장치 IP를 가져옵니다
        // var sIP = DemoUI.getCurDeviceIP();
        console.log(_this.connectInfo)
        var sIP = _this.connectInfo.szIP;
        console.log('szIP--->', sIP)
        if (sIP) {

            //채널 번호를 가져옵니다
            // var iChannel = $("#channels").val() - 0;
            var iChannel = _this.channel;
            //코드 현재 유형을 가져옵니다
            // var iStreamType = parseInt($("#streamtype").val(), 10);
            var iStreamType = parseInt(_this.streamType, 10)
            console.log('0.iStreamType->', iStreamType)
            // console.log('1.iStreamType->',$("#streamtype").val())
            //창 선택 모드
            // var iMode = parseInt($("#winMode").val(), 10);
            var iMode = parseInt(_this.winMode, 10);
            console.log('iMode->', iMode)

            if (0 == iMode) {
                WebVideoCtrl.connectRealVideo(sIP, iChannel, iStreamType, function (iPlayerID) {
                    _this.showOPInfo(sIP + " Channel:" + iChannel.toString() + " Live succeed");
                },
                    function (status, error) {
                        _this.showOPInfo(sIP + " Channel:" + iChannel.toString() + " Live Fail", status, error);
                    }
                )
            } else {
                //창 일련 번호
                // var iWinIndex = parseInt($("#winIndex").val(), 10);
                var iWinIndex = _this.winIndex;
                console.log('iWinIndex->', iWinIndex)

                WebVideoCtrl.connectRealVideoEx(iWinIndex, sIP, iChannel, iStreamType, function (iPlayerID) {
                    _this.showOPInfo(sIP + " Channel:" + iChannel.toString() + " Live succeed");
                },
                    function (status, error) {
                        _this.showOPInfo(sIP + " Channel:" + iChannel.toString() + " Live Fail", status, error);
                    }
                )
            }
        } else {
            return
        }
    },
    setClosePlayer(){
        console.log('setClosePlayer!!!')
        // WebVideoCtrl.closePlayer()
    },
    clickStopRealPlay() {
        /**
         * @description 실시간 영상 재생 중지         
         */
        WebVideoCtrl.closePlayer();
    },
    clickFullScreen() {
        /**
        * @description 전체화면         
        */
        WebVideoCtrl.setFullscreen();
    },
    setPtzSpeed(num) {
        /**
         * @param{number} 속도 값
         * @description PTZ 속도 값 셋팅
         */
        this.ptzSpeed = parseInt(num, 10);
    },
    openPtzLocate() {
        /**
        * @description PTZ 사용 시작        
        */
        let _this = this;
        if (_this.connectInfo.szIP) {
            WebVideoCtrl.enablePTZLocate()
        } else {
            return
        }
    },
    closePtzLocate() {
        /**
        * @description PTZ 사용 중지        
        */
        let _this = this;
        if (_this.connectInfo.szIP) {
            WebVideoCtrl.disablePTZLocate(false)
        } else {
            return;
        }
    },
    mouseUPLeftPTZControl(flag) {
        /**
        * @param{boolean} true-사용 false-중지
        * @description 좌상 이동        
        */
        let speed = this.ptzSpeed;
        console.log('ptzSpeed--->>', speed)

        WebVideoCtrl.moveUpperLeft(speed, speed, flag);

    },
    mouseUpPTZControl(flag) {
        /**
        * @param{boolean} true-사용 false-중지
        * @description 위로 이동        
        */
        let speed = this.ptzSpeed;
        WebVideoCtrl.moveUpwards(speed, flag);
    },
    mouseUPRightPTZControl(flag) {
        /**
        * @param{boolean} true-사용 false-중지
        * @description 우상 이동        
        */
        let speed = this.ptzSpeed;
        WebVideoCtrl.moveUpperRight(speed, speed, flag);
    },
    mouseLefPTZControl(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description 왼쪽 이동        
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.moveLeft(speed, flag);
    },
    mouseRightPTZControl(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description 오른쪽 이동        
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.moveRight(speed, flag);
    },
    mouseDownLeftPTZControl(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description 좌하 이동        
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.moveLowerLeft(speed, speed, flag);
    },
    mouseDownRightPTZControl(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description 우하 이동        
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.moveLowerRight(speed, speed, flag);
    },
    mouseDownPTZControl(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description 아래로 이동        
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.moveLower(speed, flag);
    },
    PTZZoomIn(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description ZOOM IN      
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.controlZoom(speed, 0, flag);
    },
    PTZZoomout(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description ZOOM OUT      
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.controlZoom(speed, 1, flag);
    },
    PTZFocusIn(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description FOCUS IN      
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.controlFocus(speed, 0, flag);

    },
    PTZFoucusOut(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description FOCUS OUT    
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.controlFocus(speed, 1, flag);

    },
    PTZIrisIn(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description IRIS IN (피사 조리게 조절)    
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.controlAperture(speed, 0, flag);

    },
    PTZIrisOut(flag) {
        /**
         * @param{boolean} true-사용 false-중지
         * @description IRIS OUT (피사 조리게 조절)    
         */
        let speed = this.ptzSpeed;
        WebVideoCtrl.controlAperture(speed, 1, flag);

    },
    hiddenScreen() {
        console.log('hiddenScreen')
        WebVideoCtrl.resizeVideo(0, 0, 0, 0);
    },
    showScreen() {
        const _this = this;
        let left = _this.position.left;
        let top = _this.position.top;
        let width = _this.position.width;
        let height = _this.position.height;
        WebVideoCtrl.resizeVideo(left, top, width, height);
    },
    setReposition() {
        const _this = this;
        let left = _this.position.left = _this.camOCX.offsetLeft;
        let top = _this.position.top = _this.camOCX.offsetTop + window.outerHeight - window.innerHeight;
        let width = _this.position.width = _this.camOCX.offsetWidth;
        let height = _this.position.height = _this.camOCX.offsetHeight;

        WebVideoCtrl.resizeVideo(left, top, width, height);
    },
    getPosition() {
        const _this = this;
        const _position = {
            left: _this.position.left,
            top: _this.position.top,
            width: _this.position.width,
            right: _this.position.height
        }
        return _position;
    },

}
