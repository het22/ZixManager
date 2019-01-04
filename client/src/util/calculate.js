// 공급가격 구하기
const splPrice = function(order) {
  return calPrice(order, true) || '';
};

// 소비자가격 구하기
const rtlPrice = function(order) {
  return calPrice(order, false) || '';
};

// 계약금 구하기 (소비자가격의 15%)
const downPrice = function(order) {
  var down = parseInt(calPrice(order, false) * 15 / 100);
  return down || '';
};

// ** 가격계산 공식 **
const calPrice = function(order, costIsSupply) {

  // 가격상수 로드 --------------------------------------------------
  var CONSTANTS = require('./constant.js');
  var COST = CONSTANTS.COST;

  // 변수 입력 --------------------------------------------------

  var areaInput = order.ord_area; // 입력받은 면적
  if (isNaN(areaInput) || areaInput < 0) return;  // 입력값 검사
  var areaIsSupply = (order.ord_area_isspl||0) == 0; // 공급면적인지 실면적인지

  var areaSupply = 0; // 공급면적
  var areaActual = 0; // 실면적
  var areaPlate = 0; // 장판면적
  var areaTotal = 0; // 최종면적

  var op_ceilingIncluded = order.ord_opt_ceiling==1; // 천장시공 포함 여부
  var op_verandaExtended = order.ord_opt_veranda==1; // 베란다 확장 여부
  var op_whitePackage = order.ord_opt_whitepack==1; // 화이트패키지 여부

  var rollCount = 0; // 자재 소요개수
  var paperCount = order.ord_wlp_count || 1; // 벽지개수
  var laborCost = COST.lab_cost[0].spl_cost; // 인건비
  var constructRange = (order.ord_range||0) == 0; // 장판 시공범위
  var minPlateTotal = CONSTANTS.PRICE.PLATE.MIN; // 장판 최소가격

  var paper = null;  // 선택한 벽지정보
  for (i in COST.wlp_cost) {
    var p = COST.wlp_cost[i];
    if (p.wlp_id == order.wlp_id) {
      paper = p;
      break;
    }
  }
  var plate = null;  // 선택한 장판정보
  for (i in COST.plt_cost) {
    var p = COST.plt_cost[i];
    if (p.plt_id == order.plt_id) {
      plate = p;
      break;
    }
  }

  // 가격 계산 --------------------------------------------------

  var paperTotal = 0; // 벽지 최종가격
  var plateTotal = 0; // 장판 최종가격

  // 1. 공급면적, 실면적, 최종면적 구하기
  //  1-1. 천장시공 있는 경우
  if (op_ceilingIncluded) {
    if (areaIsSupply) {
      areaSupply = areaInput;
      areaTotal = areaSupply * 2.5;
      areaActual = areaTotal / 3.5;
    } else {
      areaActual = areaInput;
      areaTotal = areaActual * 3.5;
      areaSupply = areaTotal / 2.5;
    }
    //  1-2. 천장시공 없는 경우
  } else {
    if (areaIsSupply) {
      areaSupply = areaInput;
      areaTotal = areaSupply * 1.5 + 2;
      areaActual = (areaTotal - 4) / 2;
    } else {
      areaActual = areaInput;
      areaTotal = areaActual * 2 + 4;
      areaSupply = (areaTotal - 2) / 1.5;
    }
  }
  areaTotal = Math.ceil(areaTotal);

  // 2. 베란다 옵션
  if (op_verandaExtended) {
    if (areaSupply < 30) areaTotal += 3;
    else if (areaSupply < 40) areaTotal += 5;
    else areaTotal += 6;
  }

  // 3. 도배가격 구하기 (벽지선택했을 때만)
  if(paper != null) {
    rollCount = Math.ceil(areaTotal / 5);
    // 3-1. 자재비
    var wlp_cost = costIsSupply ? paper.spl_cost : paper.rtl_cost
    paperTotal += (wlp_cost * rollCount) + (paper.wlp_add_cost * (paperCount - 1));
    // 3-2. 부자재비
    var sbd_cost = costIsSupply ? paper.sbd_spl_cost : paper.sbd_rtl_cost
    paperTotal += paper.sbd_rtl_cost * areaTotal;
    // 3-3. 인건비
    var laborCount = Math.round(areaTotal / paper.wlp_labor_const);
    if (laborCount<1) laborCount=1;
    paperTotal += laborCost * laborCount;
    // 3-4. 화이트패키지 옵션
    if (op_whitePackage) paperTotal -= paper.wlp_dec_cost;
    // 3-5. 100원 단위 절삭
    paperTotal = parseInt(paperTotal/1000)*1000;
  }

  // 4. 장판가격 구하기 (장판선택했을 때만)
  if (plate != null) {
   // 4-1. 장판면적 구하기 (면적계산법 -> 베란다확장여부 -> 시공범위)
    if (areaIsSupply) {
      if (op_verandaExtended) areaPlate = constructRange ? (areaSupply - 5) : (areaSupply - 9);
      else areaPlate = constructRange ? (areaSupply - 6) : (areaSupply - 10);
    } else {
      if (op_verandaExtended) areaPlate = constructRange ? (areaActual + 2.5) : (areaActual - 2.5);
      else areaPlate = constructRange ? (areaActual + 1) : (areaActual - 3.5);
    }
    // 4-2. 장판가격 구하기
    var plt_cost = costIsSupply ? plate.spl_cost : plate.rtl_cost;
    plateTotal = plt_cost * areaPlate;
    // 4-3. 최소장판가격 검사
    if (plateTotal < minPlateTotal) plateTotal = minPlateTotal;
    // 4-4. 10000원 이하 절삭
    plateTotal = parseInt(plateTotal / 10000) * 10000;
  }

  return paperTotal + plateTotal;
};

module.exports = {
  splPrice: splPrice,
  rtlPrice: rtlPrice,
  downPrice: downPrice
}
