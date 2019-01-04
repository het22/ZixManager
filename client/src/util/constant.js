const CONSTANTS = {

  COST: {},
  PRICE: {
    PLATE: {
      MIN: 280000
    }
  },
  ADMIN: {
    PASSWORD: 'zixadmin'
  },

  // --------------------------------------------------
  // 메세지 상수 -----------------------------------------
  // --------------------------------------------------
  FLASH_TIMEOUT: 3000,
  FLASH_DELAY: 1000,
  EMPTY_MEMBERTABLE_MESSAGE: '표시할 고객이 없어요',
  EMPTY_ORDERTABLE_MESSAGE: '표시할 주문이 없어요',
  MESSAGE: {
    MEMBER: {
      REGISTER: {
        START: '고객정보 등록 요청..',
        SUCCESS: '고객정보 등록 완료',
        FAIL: '고객정보 등록 실패'
      },
      MODIFY: {
        START: '고객정보 수정 요청..',
        SUCCESS: '고객정보 수정 완료',
        FAIL: '고객정보 수정 실패'
      },
      DELETE: {
        START: '고객정보 삭제 요청..',
        SUCCESS: '고객정보 삭제 완료',
        FAIL: '고객정보 삭제 실패'
      }
    },
    ORDER: {
      REGISTER: {
        START: '주문정보 등록 요청..',
        SUCCESS: '주문정보 등록 완료',
        FAIL: '주문정보 등록 실패'
      },
      MODIFY: {
        START: '주문정보 수정 요청..',
        SUCCESS: '주문정보 수정 완료',
        FAIL: '주문정보 수정 실패'
      },
      DELETE: {
        START: '주문정보 삭제 요청..',
        SUCCESS: '주문정보 삭제 완료',
        FAIL: '주문정보 삭제 실패'
      }
    },
    COST: {
      MODIFY: {
        START: '가격정보 수정 요청..',
        SUCCESS: '가격정보 수정 완료',
        FAIL: '가격정보 수정 실패'
      }
    }
  },

  // --------------------------------------------------
  // 옵션 상수 ------------------------------------------
  // --------------------------------------------------
  OPTIONS: {
    // 벽지옵션, 장판옵션 (App.vue에서 로드)
    WLP: [],
    PLT: [],
    // 공급면적, 실면적 선택범위 (현재 파일 하단에서 푸시)
    SPL_RANGE: [],
    RTL_RANGE: [],
    // 면적방식 옵션
    AREA_METHOD: [
      {name: '공급면적', value: 0},
      {name: '실면적', value: 1}
    ],
    // 방개수 옵션
    ROOM_COUNT: [
      {name: '1개', value: 1},
      {name: '2개', value: 2},
      {name: '3개', value: 3},
      {name: '4개', value: 4},
      {name: '5개', value: 5},
    ],
    // 벽지개수 옵션
    WLP_COUNT: [
      {name: '1개', value: 1},
      {name: '2개', value: 2},
      {name: '3개', value: 3}
    ],
    // 장판시공범위 옵션
    PLT_RANGE: [
      {name: '집전체', value: 0},
      {name: '방만', value: 1}
    ],
    // 걸레받이 옵션
    BASEBOARD_RANGE: [
      {name: '선택안함', value: 0},
      {name: '집전체', value: 1},
      {name: '방만', value: 2}
    ]
  }
}

// --------------------------------------------------
// 옵션 상수 로드 --------------------------------------
// --------------------------------------------------

// 공급평수 최소값, 최대값
const spl_min=15;
const spl_max=54;
for (var i=spl_min; i<=spl_max; i++) {
  CONSTANTS.OPTIONS.SPL_RANGE.push(
    {name: `${i} 평`, value: i}
  );
}
// 실평수 최소값, 최대값
const rtl_min=12;
const rtl_max=45;
for (var i=rtl_min; i<=rtl_max; i++) {
  CONSTANTS.OPTIONS.RTL_RANGE.push(
    {name: `${i} 평`, value: i}
  );
}

module.exports = CONSTANTS;
