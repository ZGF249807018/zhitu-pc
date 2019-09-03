
import { threeElements } from '@/api/check'
const order = {
  state: {
    candidate: '',
    tctype: '',
    price: '',
    orderDetails: '',
    downloadZip: '',
    orderInfoTxt: '',
    idSex: '',
    idBirth: '',
    idPlace: '',
    remark: '',
    failureExcel: '',
    successNum: 0,
    failureNum: 0,
    show1: false,
    uploadCandidate: false
  },

  mutations: {
    SET_UPLOADCANDIDATE: (state, uploadCandidate) => {
      state.uploadCandidate = uploadCandidate
    },
    SET_SHOW1: (state, show1) => {
      state.show1 = show1
    },
    SET_FAILUREEXCEL: (state, failureExcel) => {
      state.failureExcel = failureExcel
    },
    SET_SUCCESSNUM: (state, successNum) => {
      state.successNum = successNum
    },
    SET_FAILURENUM: (state, failureNum) => {
      state.failureNum = failureNum
    },
    SET_ORDERINFOTXT: (state, orderInfoTxt) => {
      state.orderInfoTxt = orderInfoTxt
    },
    SET_CANDITATE: (state, candidate) => {
      state.candidate = candidate
    },
    SET_PACKAGE: (state, tctype) => {
      state.tctype = tctype
    },
    SET_PRICE: (state, price) => {
      state.price = price
    },
    SET_ORDER: (state, orderDetails) => {
      state.orderDetails = orderDetails
    },
    SET_DOWNLOAD: (state, downloadZip) => {
      state.downloadZip = downloadZip
    },
    SET_IDSEX: (state, idSex) => {
      state.idSex = idSex
    },
    SET_IDBIRTH: (state, idBirth) => {
      state.idBirth = idBirth
    },
    SET_IDPLACE: (state, idPlace) => {
      state.idPlace = idPlace
    },
    SET_REMARK: (state, remark) => {
      state.remark = remark
    }
  }
}
export default order
