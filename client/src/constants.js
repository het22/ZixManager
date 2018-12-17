const constants = {
  FLASH_TIMEOUT: 3000,
  FLASH_DELAY: 1000,
  EMPTY_MEMBERTABLE_MESSAGE: '표시할 고객이 없어요',
  EMPTY_ORDERTABLE_MESSAGE: '표시할 주문이 없어요',
  MESSAGE_SUCCESS: {
    MODIFY: {
      'wallpaper_cost': '벽지비용 수정완료',
      'plate_cost': '장판비용 수정완료',
      'labor_cost': '인건비 수정완료',
      'subsidary_cost': '부자재비 수정완료'
    }
  },
  MESSAGE_FAIL: {
    MODIFY: {
      'wallpaper_cost': '벽지비용 수정실패',
      'plate_cost': '장판비용 수정실패',
      'labor_cost': '인건비 수정실패',
      'subsidary_cost': '부자재비 수정실패'
    }
  }
}

module.exports = constants;
