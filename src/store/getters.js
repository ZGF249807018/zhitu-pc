
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  tid: state => state.user.tid,
  uid: state => state.user.uid,
  primary: state => state.user.primary,
  account: state => state.user.account,
  logo: state => state.user.logo,
  certify: state => state.user.certify,
  company: state => state.user.company,
  register: state => state.user.register,
  coupon: state => state.user.coupon,
  balance: state => state.user.balance,
  savePassword: state => state.user.savePassword,
  captcha: state => state.code.captcha,
  drawStatus: state => state.code.drawStatus,
  drawImg: state => state.code.drawImg,
  autographUrl: state => state.code.autographUrl,
  autographTime: state => state.code.autographTime,
  usedcaptcha: state => state.code.usedcaptcha,
  imgCodeStatus: state => state.code.imgCodeStatus,
  sendCodeDisabled: state => state.code.sendCodeDisabled,
  imgCodeUrl: state => state.code.imgCodeUrl,
  email: state => state.person.email,
  mobile: state => state.person.mobile,
  name: state => state.person.name,
  contact: state => state.person.contact,
  paypass: state => state.person.paypass,
  payload: state => state.assets.payload,
  payTypes: state => state.assets.payTypes,
  candidate: state => state.order.candidate,
  tctype: state => state.order.tctype,
  orderInfoTxt: state => state.order.orderInfoTxt,
  price: state => state.order.price,
  payType: state => state.order.payType,
  orderDetails: state => state.order.orderDetails,
  downloadZip: state => state.order.downloadZip,
  idSex: state => state.order.idSex,
  idBirth: state => state.order.idBirth,
  idPlace: state => state.order.idPlace,
  remark: state => state.order.remark,
  failureExcel: state => state.order.failureExcel,
  successNum: state => state.order.successNum,
  failureNum: state => state.order.failureNum,
  show1: state => state.order.show1,
  uploadCandidate: state => state.order.uploadCandidate,
  current_salary: state => state.resume.current_salary,
  expected_salary: state => state.resume.expected_salary
}
export default getters
