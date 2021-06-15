import moment from "moment";
import "moment/locale/ko";
// <아몬스 공통 코드>
//
// [목차]
// 1. [글자수제한] limitDigit
// 2. [콤마넣기] addComma
// 3. [콤마빼기] minusComma
// 4. [자리수0채우기] addZero
// 5. [그룹제한] groupLimit
// 6. [스캐너 사용용도 문자열 반환] scnKindToString
// 7. [비콘입력 콜론추가] macAddressSplitByColon
// 8. [소속사 드롭다운 리스트 만들기] makeCompanyList
// 9. [비콘 드롭다운 리스트 만들기] makeBeaconList
// 10. [노선 드롭다운 리스트 만들기] makeLocalList
// 11. [다음 API 주소 sido 변경 리턴] sidoParser
// 12. [나이 계산] calAge
// 13. [공정상태 값에 따른 문자열 반환] processStateToString
// 14. [공정상태 값에 따른 컬러 반환] processStateToColor
// 15. [오름차순 정렬] byAscending
// 16. [내림차순 정렬] byDescending
// 17. [날짜 오름차순 정렬] dateByAscending
// 18. [날짜 내림차순 정렬] dateByDescending
// 19. [굴진 퍼센트 구하기] getDigAmountPercent
// 20. [계정 타입 문자열 변환] roleStrReturn
// ==================================================
const today = new Date();
// --------------------------------------------------
// 콘솔 에러 메시지 출력 제어값
const showError = true;
// --------------------------------------------------
// [글자수제한]
// * 설명
// 1. 글자 수를 제한 합니다.
// * return : String
// --------------------------------------------------
export const limitDigit = (str, digit) => {
  if (str !== (null || undefined) && digit) {
    try {
      const _str = str.toString();
      let result = _str;
      if (_str && _str.length > digit) {
        result = _str.substring(0, digit);
      }
      return result;
    } catch (e) {
      showError && console.log("<limitDigit Error>", e);
    }
  }
};

// --------------------------------------------------
// [콤마넣기]
// * 설명
// 1. 3자리마다 콤마 (,) 를 넣어줍니다.
// 2. 소수점 이하는 반점을 넣지 않습니다.
// * return : String
// --------------------------------------------------
export const addComma = (num) => {
  if (num !== (null || undefined)) {
    try {
      let _num = num.toString();
      let parts = _num.split(".");
      return (
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + // 정수 자리만 , 삽입
        (parts[1] || parts[1] === "" ? "." + parts[1] : "")
      );
    } catch (e) {
      showError && console.log("<addComma Error>", e);
    }
  }
};
// --------------------------------------------------
// [콤마빼기]
// * 설명
// 1. 콤마를 빼줍니다.
// 2. 소수점 아래는 그대로 리턴합니다.
// * return : String
// --------------------------------------------------
export const minusComma = (num) => {
  if (num !== (null || undefined)) {
    try {
      let _num = num.toString();
      _num = _num.replace(/[^0-9|^\.]/g, ""); // 입력값이 숫자가 아니면 공백
      _num = _num.replace(/,/g, ""); // , 값 공백처리
      return _num;
    } catch (e) {
      showError && console.log("<minusComma Error>", e);
    }
  }
};
// --------------------------------------------------
// 예시
// --------------------------------------------------
// if (name === "조건") {
//     let _value = value.replace(/[^0-9|^\.]/g, "");
//     let parts = _value.toString().split(".");
//     let result = "";
//     const 정수 = limitDigit(parts[0], 4);
//     const 소수 = limitDigit(parts[1], 1);
//     result = addComma(정수) + (소수 || 소수 === "" ? "." + 소수 : "");
//     setFormData({
//       ...formData,
//       scn_pos_x: result,
//     });
//   }
// --------------------------------------------------
// [자리수0채우기]
// * 설명
// 1. 지정한 자리수만큼 0으로 채웁니다.
// * return : String
// --------------------------------------------------
export const addZero = (str, digit) => {
  if (str !== (null || undefined) && digit) {
    try {
      let _str = str.toString();
      let zeros = "";
      for (let i = 0; i < digit - _str.length; i++) {
        zeros += "0";
      }
      return zeros + _str;
    } catch (e) {
      showError && console.log("<addZero Error>", e);
    }
  }
};
// --------------------------------------------------
// [그룹제한]
// * 설명
// 1. 스캐너 그룹 입력조건 제한입니다.
// 2. 2자리 수, 대문자 변환, 영문, 숫자만 입력가능합니다.
// * return : String
// --------------------------------------------------
export const groupLimit = (scn_group) => {
  if (scn_group) {
    try {
      let _scn_group = scn_group;
      _scn_group = _scn_group.toUpperCase(); // 소문자를 대문자로 치환
      _scn_group = _scn_group.replace(/[^A-Z|^0-9]*$/g, ""); // 대문자와 숫자만
      _scn_group = limitDigit(_scn_group, 2); // 2자리 제한
      return _scn_group;
    } catch (e) {
      showError && console.log("<groupLimit Error>", e);
    }
  }
};
// --------------------------------------------------
// [스캐너 사용용도 문자열 반환]
// * 설명
// 1. 스캐너 사용용도를 문자열로 반환합니다.
// * return : String
// --------------------------------------------------
export const scnKindToString = (kind) => {
  if (kind !== (null || undefined)) {
    try {
      let str = "";
      if (kind === 0) {
        str = "기타";
      }
      if (kind === 1) {
        str = "입장";
      }
      if (kind === 2) {
        str = "퇴장";
      }
      if (kind === 3) {
        str = "위치측정";
      }
      return str;
    } catch (e) {
      showError && console.log("<scnKindToString Error>", e);
    }
  }
};
// --------------------------------------------------
// [비콘입력 콜론추가]
// * 설명
// 1. 비콘 mac address 입력 시 두 자리마다 콜론(:)을 추가해줍니다.
// 2. 비콘 mac address 의 제한 크기는 12자리입니다.
// 3. 입력값을 대문자로 반환합니다.
// * return : String
// --------------------------------------------------
export const macAddressSplitByColon = (str) => {
  if (str) {
    try {
      let splitedStr = "";
      let _str = str.replace(/\:/g, ""); // 입력된 문자열에서 : 을 제거합니다.
      _str = limitDigit(_str, 12); // 입력값을 12자리로 제한합니다.
      let length = _str.length;
      let point = _str.length % 2;
      splitedStr = _str.substring(0, point);
      while (point < length) {
        if (splitedStr !== "") splitedStr += ":";
        splitedStr += _str.substring(point, point + 2);
        point += 2;
      }
      splitedStr = splitedStr.toUpperCase(); // 대문자로 변환해 반환합니다.
      return splitedStr;
    } catch (e) {
      showError && console.log("<macAddressSplitByColon Error>", e);
    }
  }
};
// --------------------------------------------------
// [소속사 드롭다운 리스트 만들기]
// * 설명
// 1. 소속사 드롭다운 리스트를 만들어 줍니다.
// 2. 두 번째 파라미터로 전체 선택 옵션을 넣어줍니다.
//(생략시 표시 안함, 아무값이나 입력되었을 때 전체 값 추가)
// * return : object
// key: index,
// text: item.co_name,
// value: item.co_index,
// * 데이터가 없으면 빈 배열을 리턴합니다.
// --------------------------------------------------
export const makeCompanyList = (companyData, addAllOption) => {
  if (companyData) {
    try {
      let companyList = [];
      if (addAllOption) {
        companyList.push({
          key: "all",
          text: "소속사 전체",
          value: null,
        });
      }
      companyData.map((item, index) => {
        companyList.push({
          key: "companyList" + index,
          text: item.co_name,
          value: item.co_index,
        });
      });
      return companyList;
    } catch (e) {
      showError && console.log("<makeCompanyList Error>", e);
    }
  }
};
// --------------------------------------------------
// [비콘 드롭다운 리스트 만들기]
// * 설명
// 1. 비콘 드롭다운 리스트를 만들어 줍니다.
//  2. 두 번째 파라미터로 전체 선택 옵션을 넣어줍니다.
//(생략시 표시 안함, 아무값이나 입력되었을 때 전체 값 추가)
// * return : object
// key: "beaconList" + index,
// text: `${addZero(item.bc_id, 3)} :
// ${macAddressSplitByColon(item.bc_address)}`,
// value: item.bc_index,
// address: item.bc_address,
// bc_id: item.bc_id,
// * 데이터가 없으면 빈 배열을 리턴합니다.
// --------------------------------------------------
export const makeBeaconList = (beaconData, addNullOption) => {
  if (beaconData) {
    try {
      let beaconList = [];
      if (addNullOption) {
        beaconList.push({
          key: "beaconListNULL",
          text: "할당 없음",
          value: null,
        });
      }
      beaconData.map((item, index) => {
        beaconList.push({
          key: "beaconList" + index,
          text: `${addZero(item.bc_id, 3)} : 
            ${macAddressSplitByColon(item.bc_address)}`,
          value: item.bc_index,
          address: item.bc_address,
          bc_id: item.bc_id,
        });
      });
      return beaconList;
    } catch (e) {
      showError && console.log("<makeBeaconList Error>", e);
    }
  }
};
// --------------------------------------------------
// [노선 드롭다운 리스트 만들기]
// * 설명
// 1. 노선의 드롭다운 리스트를 만들어 줍니다.
// 2. 사용 되지 않는 노선 (local_used === 0) 은 리스트에 넣지 않습니다.
// * return : object
// key: index,
// text: item.local_name,
// value: item.local_index,
// name: item.local_name,
// * 데이터가 없으면 빈 배열을 리턴합니다.
// --------------------------------------------------
export const makeLocalList = (localData) => {
  if (localData) {
    try {
      let localList = [];
      const data = localData.filter((el) => el.local_used !== 0);
      // 사용되지 않는 노선은 리스트에 넣지 않습니다.
      localData.map((item, index) => {
        localList.push({
          key: index,
          text: item.local_name,
          value: item.local_index,
          name: item.local_name,
        });
      });
      return localList;
    } catch (e) {
      showError && console.log("<makeLocalList Error>", e);
    }
  }
};
// --------------------------------------------------
// [다음 API 주소 sido 변경 리턴]
// * 설명
// 1. 기상청 api database에 일치하도록 sido 값을 바꿔서 리턴합니다.
// * return : string
// --------------------------------------------------
export const sidoParser = (sido) => {
  if (sido) {
    try {
      let str = "";
      switch (sido) {
        case "충남":
          str = "충청남도";
          break;
        case "충북":
          str = "충청북도";
          break;
        case "전북":
          str = "전라북도";
          break;
        case "전남":
          str = "전라남도";
          break;
        case "경북":
          str = "경상북도";
          break;
        case "경남":
          str = "경상남도";
          break;
        default:
          str = sido;
      }
      return str;
    } catch (e) {
      showError && console.log("<sidoParser Error>", e);
    }
  }
};
// --------------------------------------------------
// [나이 계산]
// * 설명
// 1. 나이값을 추출 합니다.
// 2. 파라미터(birth)로 다음 형태의 값을 받습니다.
// YYYY ...뒤에는 잘라서 계산하기 때문에 YYYY만 처음에 포함되어 있으면 됩니다.
// * return : string
// --------------------------------------------------
export const calAge = (birth) => {
  if (birth) {
    try {
      let currentYear = today.getFullYear();
      let age = currentYear - birth.substring(0, 4) + 1;
      return age;
    } catch (e) {
      showError && console.log("<calAge Error>", e);
    }
  }
};
// --------------------------------------------------
// [공정상태 값에 따른 문자열 반환]
// * 설명
// 1. 공정상태 값을 받아 매칭되는 공정상태 명을 반환합니다.
// 2. 상태 값, 상태명
// * default 값으로 미착공의 상태명을 반환합니다.
// 1.미착공
// 2.천공
// 3.장약
// 4.발파
// 5.버력처리
// 6.숏크리트
// 7.강지보
// 8.격자지보
// 9.록볼트
// 10.방수시트
// 11.라이닝
// 12.근무교대
// 13.장비점검
// 14.기타
// * return : string
// --------------------------------------------------
export const processStateToString = (pcsState) => {
  if (pcsState !== (null || undefined)) {
    try {
      let _pcsState = parseInt(pcsState);
      let str = "";
      switch (_pcsState) {
        case 0:
          str = "미착공";
          break;
        case 1:
          str = "미착공";
          break;
        case 2:
          str = "천공";
          break;
        case 3:
          str = "장약";
          break;
        case 4:
          str = "발파";
          break;
        case 5:
          str = "버력처리";
          break;
        case 6:
          str = "숏크리트";
          break;
        case 7:
          str = "강지보";
          break;
        case 8:
          str = "격자지보";
          break;
        case 9:
          str = "록볼트";
          break;
        case 10:
          str = "방수시트";
          break;
        case 11:
          str = "라이닝";
          break;
        case 12:
          str = "근무교대";
          break;
        case 13:
          str = "장비점검";
          break;
        case 14:
          str = "기타";
          break;
        default:
          str = "미착공";
      }
      return str;
    } catch (e) {
      showError && console.log("<calAge Error>", e);
    }
  }
};

// --------------------------------------------------
// [공정상태 값에 따른 컬러 반환]
// * 설명
// 1. 공정상태 값을 받아 매칭되는 색상을 반환합니다.
// 2. 상태 종류 / 컬러
// * default 컬러 값으로 미착공의 컬러값을 가집니다.
// 미착공  #286e41
// 천공 #7c3795
// 장약 #636363
// 발파 #971717
// 버력처리 #375795
// 숏크리트 #7c4c17
// 강지보 #707017
// 격자지보 #a1922b
// 록볼트 #175c59
// 방수시트 #1b2f54
// 라이닝 #3c3a3a
// 근무교대 #407d23
// 장비점검 #4c7e7c
// 기타 #351c3e
// * return : string
// --------------------------------------------------
export const processStateToColor = (pcsState) => {
  if (pcsState !== (null || undefined)) {
    try {
      let _pcsState = parseInt(pcsState);
      let colorValue = "#286e41";
      // default 컬러 값으로 미착공의 컬러값을 가집니다.
      // eslint-disable-next-line default-case
      switch (_pcsState) {
        case 1: // 미착공
          colorValue = "#286e41";
          break;
        case 2: // 천공
          colorValue = "#7c3795";
          break;
        case 3: // 장약
          colorValue = "#636363";
          break;
        case 4: // 발파
          colorValue = "#971717";
          break;
        case 5: // 버력처리
          colorValue = "#375795";
          break;
        case 6: // 숏크리트
          colorValue = "#7c4c17";
          break;
        case 7: // 강지보
          colorValue = "#707017";
          break;
        case 8: // 격자지보
          colorValue = "#a1922b";
          break;
        case 9: // 록볼트
          colorValue = "#175c59";
          break;
        case 10: // 방수시트
          colorValue = "#1b2f54";
          break;
        case 11: //라이닝
          colorValue = "#3c3a3a";
          break;
        case 12: // 근무교대
          colorValue = "#407d23";
          break;
        case 13: // 장비점검
          colorValue = "#4c7e7c";
          break;
        case 14: // 기타
          colorValue = "#351c3e";
          break;
      }
      return colorValue;
    } catch (e) {
      showError && console.log("<calAge Error>", e);
    }
  }
};
// --------------------------------------------------
// [오름차순 정렬]
// * 설명
// 1. 파라미터로 정렬할 데이터와(객체를 가진 배열), 정렬 기준값(객체 키 값)을 받습니다.
// 2. 정렬 기준 값, 즉 키 값은 byAscending(data,"key") 와 같은 형태로 입력되어야 합니다.
// 3. 낮은 순서 대로 정렬된 값을 리턴 합니다.
// * return : array
// --------------------------------------------------
export const ascByKey = (data, key) => {
  if (data && key) {
    try {
      let _data = data;
      _data.sort((a, b) => (a[key] < b[key] ? -1 : 1));
      return _data;
    } catch (e) {
      showError && console.log("<ascByKey Error>", e);
    }
  }
};
// --------------------------------------------------
// [내림차순 정렬]
// * 설명
// 1. 파라미터로 정렬할 데이터와(객체를 가진 배열), 정렬 기준값(객체 키 값)을 받습니다.
// 2. 정렬 기준 값, 즉 키 값은 byDescending(data,"key") 와 같은 형태로 입력되어야 합니다.
// 3. 높은 순서 대로 정렬된 값을 리턴 합니다.
// * return : array
// --------------------------------------------------
export const descByKey = (data, key) => {
  if (data && key) {
    try {
      let _data = data;
      _data.sort((a, b) => (a[key] < b[key] ? 1 : -1));
      return _data;
    } catch (e) {
      showError && console.log("<descByKey Error>", e);
    }
  }
};
// --------------------------------------------------
// [날짜 오름차순 정렬]
// * 설명
// 1. 파라미터로 정렬할 데이터와(객체를 가진 배열), 정렬 기준값(객체 키 값)을 받습니다.
// 2. 정렬 기준 값, 즉 키 값은 dateByAscending(data,"key") 와 같은 형태로 입력되어야 합니다.
// 3. 낮은 순서 대로 정렬된 값을 리턴 합니다.
// * return : array
// --------------------------------------------------
export const ascByDate = (data, key) => {
  if (data && key) {
    try {
      let _data = data;
      _data.sort((a, b) => {
        let dateA = new Date(a[key]).getTime();
        let dateB = new Date(b[key]).getTime();
        return dateA < dateB ? -1 : 1;
      });
      return _data;
    } catch (e) {
      showError && console.log("<ascByDate Error>", e);
    }
  }
};
// --------------------------------------------------
// [날짜 내림차순 정렬]
// * 설명
// 1. 파라미터로 정렬할 데이터와(객체를 가진 배열), 정렬 기준값(객체 키 값)을 받습니다.
// 2. 정렬 기준 값, 즉 키 값은 dateByDescending(data,"key") 와 같은 형태로 입력되어야 합니다.
// 3. 높은 순서 대로 정렬된 값을 리턴 합니다.
// * return : array.

// --------------------------------------------------
export const descByDate = (data, key) => {
  if (data && key) {
    try {
      let _data = data;
      _data.sort((a, b) => {
        let dateA = new Date(a[key]).getTime();
        let dateB = new Date(b[key]).getTime();
        return dateA < dateB ? 1 : -1;
      });
      return _data;
    } catch (e) {
      showError && console.log("<descByDate Error>", e);
    }
  }
};
// --------------------------------------------------
// [굴진 퍼센트 구하기]
// * 설명
// 1. 소수점 아래 1자리까지 굴진 퍼센트를 구합니다.
// * return : string
// --------------------------------------------------
export const getDigAmountPercent = (plan_length, dig_length) => {
  if (plan_length && dig_length !== (null || undefined)) {
    try {
      if (dig_length === 0) {
        return "0%";
      } else {
        let _percent = ((minusComma(dig_length) / plan_length) * 100).toFixed(
          1
        );
        if (_percent > 100) {
          return "거리초과";
        } else {
          return _percent + "%";
        }
      }
    } catch (e) {
      showError && console.log("<calAge Error>", e);
    }
  }
};
// --------------------------------------------------
// [계정 타입 문자열 변환] roleStrReturn
// * 설명
// 1. 계정 타입을 문자열로 변환합니다.
// * return : string
// --------------------------------------------------
export const roleStrReturn = (role) => {
  if (role) {
    try {
      let str = "";
      if (role === 2) {
        str = "사용자";
      } else {
        str = "관리자";
      }
      return str;
    } catch (e) {
      showError && console.log("<roleStrReturn Error>", e);
    }
  }
};

// --------------------------------------------------
// [혈액형, 혈액형 타입 문자열 변환] bloodReturn
// * 설명
// 1. 혈액형 또는 혈액형 타입을 문자열로 변환합니다.
// * return : string
// --------------------------------------------------

export const bloodReturn = (type, group) => {
  if (type !== (null || undefined) || group !== (null || undefined)) {
    try {
      let _type = parseInt(type);
      let _group = parseInt(group);

      let typeStr = "";
      let groupStr = "";
      let result = "";
      switch (_type) {
        case 0:
          typeStr = "A";
          break;
        case 1:
          typeStr = "B";
          break;
        case 2:
          typeStr = "O";
          break;
        case 3:
          typeStr = "AB";
          break;
        default:
          typeStr = "";
      }
      switch (_group) {
        case 0:
          groupStr = "Rh+";
          break;
        case 1:
          groupStr = "Rh-";
          break;
        default:
          groupStr = "";
      }
      if (typeStr && groupStr) {
        result += typeStr + " " + groupStr;
      } else if (typeStr) {
        result += typeStr;
      } else if (groupStr) {
        result += groupStr;
      }
      return result;
    } catch (e) {
      showError && console.log("<bloodReturn Error>", e);
    }
  }
};

// --------------------------------------------------
// [시간 차이 문자열 변환] getDiffTime
// * 설명
// 1. 시간의 차이를 문자열로 반환합니다.
// 2. 파라미터로 큰 시간, 작은 시간이 순서대로 들어갑니다.
// * return : string
// --------------------------------------------------

export const getDiffTime = (bigTime, smallTime) => {
  if (bigTime && smallTime) {
    try {
      let _bigTime = moment(bigTime);
      let _smallTime = moment(smallTime);
      let day = moment.duration(_bigTime.diff(_smallTime)).days();
      let hour = moment.duration(_bigTime.diff(_smallTime)).hours();
      let minute = moment.duration(_bigTime.diff(_smallTime)).minutes();
      let milliseconds = moment
        .duration(_bigTime.diff(_smallTime))
        .asMilliseconds();
      let str = "";
      if (day > 0) {
        str += `${day}일 `;
      }
      if (hour > 0) {
        str += `${hour}시간 `;
      }
      if (minute > 0) {
        str += `${minute}분`;
      }
      if (day <= 0 && hour <= 0 && minute <= 0 && milliseconds > 0) {
        str += `1분 미만`;
      }
      return str;
    } catch (e) {
      showError && console.log("<getDiffTime Error>", e);
    }
  }
};

// CLAEN CODE
// 1. 객체의 생성에도 유의미한 이름을 사용하라.
// 2. 함수는 하나의 역할만 해야한다.
// 3. 명령과 조회를 분리하라 (Command와 Query의 분리)
// 4. 오류코드 보다는 예외를 활용하자.
// 5. 여러 예외가 발생하는 경우 Wrapper 클래스로 감싸자.
// 6. 테스트 코드의 작성.
// 7. 클래스의 최소화.
// 8. 클래스의 응집도(높은 응집도와 낮은 결합도)
// 9. 변경하기 쉬운 클래스
// 10. 설계 품질을 높여주는 4가지 규칙
//     10-1. 모든 테스트를 실행하라.
//     10-2. 중복을 제거하라.
//     10-3. 프로그래머의 의도를 표현하라.
//     10-4. 클래스와 메소드의 수를 최소로 줄여라.
// 11. 디미터 법칙 : 어떤 모듈이 호출하는 객체의 속사정을 몰라야 한다.
//                   그렇기에 객체는 자료를 숨기고 함수를 공개해야 한다.
// 예) final String outputDir = FileManager.getInstance().getOptions().getModule().getAbsolutePath();
// 위 코드는 아래와 같이 써야 한다.
// Options options = ctxt.getOptions();
// File scratchDir = opts.getScratchDir();
// final String outputDir = scratchDir.getAbsolutePath();
// --------------------------------------------------
