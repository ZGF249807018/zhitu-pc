
/* 验证账户名 以英文字母开头，只能包含英文字母、数字和下划线*/
export function isvalidUsername(str) {
  const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
  return reg.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
/* 验证公司或姓名 只能是中文 */
export function validateCompany(str) {
  const reg = /^[(\u4e00-\u9fa5)]+$/
  return reg.test(str)
}
/* 密码必须包含数字加字母 */
export function validatePassword(str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
  return reg.test(str)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
/* 手机号码验证 */
export function validatePhone(str) {
  const reg = /^[1][0-9]{10}$/
  return reg.test(str)
}
/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
/* 邮箱验证*/
export function validateEmail(str) {
  const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return reg.test(str)
}

/* 6位数字密码或验证码验证 */
export function validatePayPass(str) {
  const reg = /^[0-9]+$/
  return reg.test(str)
}

/* 校验英文特殊字符 */
export function validateEnCode(str) {
  const reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
  return reg.test(str)
}

/* 校验中文特殊字符 */
export function validateCnCode(str) {
  const reg = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
  return reg.test(str)
}
/* 校验sql语句 */
export function validateSql(str) {
  const reg = /(\bDROP\b)|(\bTRUNCATE\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)/gi
  return reg.test(str)
}

/* 校验组织机构代码 */
export function validateOrgCode(str) {
  const reg = /^([0-9A-Z]){8}-[0-9|X]$/
  return reg.test(str)
}

/* 邮箱当中四个字符替换成*号 */
export function encryptionEmail(str) {
  const reg = /^([0-9A-Z]){8}-[0-9|X]$/
  return reg.test(str)
}

/* 手机当中四个字符替换成*号 */
export function encryptionPhone(str) {
  const reg = /(\d{3})\d{4}(\d{4})/
  return reg.test(str)
}

/*  日期时间的格式校验 YYYY-MM-DD HH:mm:ss  如 2018-01-01 12:00:00 */
export function validateInputTime1(str) {
  const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/
  return reg.test(str)
}
/*  日期时间的格式校验 YYYY-MM-DD  如 2018-01-01  */
export function validateInputTime2(str) {
  const reg = /^\d{4}-(0[1-9]|1[012])(-\d{2})*$/
  return reg.test(str)
}
/*  身份证号码格式校验  */
export function validateIdCardNum(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}
/* 金额格式校验 支持正整数，正整数带 1 位小数或正整数带 2 位小数 如100, 100.0, 100.00*/
export function validateMoney(str) {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return reg.test(str)
}

/*  验证座机  */
export function validatePhone3(str) {
  const reg = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^[1][3,4,5,7,8][0-9]{9}$)/
  return reg.test(str)
}
