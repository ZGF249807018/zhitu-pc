
import { validateCode } from '@/api/info'
import { Message } from 'element-ui'
const code = {
  state: {
    captcha: false,
    usedcaptcha: false,
    imgCodeStatus: true,
    drawStatus: false,
    drawImg: '',
    autographTime: '',
    autographUrl: '',
    sendCodeDisabled: false
  },

  mutations: {
    SET_SENDCODEDISABLED: (state, sendCodeDisabled) => {
      state.sendCodeDisabled = sendCodeDisabled
    },
    SET_AUTOGRAPHTIME: (state, autographTime) => {
      state.autographTime = autographTime
    },
    SET_AUTOGRAPHURL: (state, autographUrl) => {
      state.autographUrl = autographUrl
    },
    SET_DRAWSTATUS: (state, drawStatus) => {
      state.drawStatus = drawStatus
    },
    SET_DRAWIMG: (state, drawImg) => {
      state.drawImg = drawImg
    },
    SET_CAPTCHA: (state, captcha) => {
      state.captcha = captcha
    },
    SET_USEDCAPTCHA: (state, usedcaptcha) => {
      state.usedcaptcha = usedcaptcha
    },
    SET_IMGCODESTATUS: (state, imgCodeStatus) => {
      state.imgCodeStatus = imgCodeStatus
    }
  },

  actions: {
    // 验证填写的手机验证码是否正确
    ValidateCaptcha({ commit }, captchaInfo) {
      return new Promise((resolve, reject) => {
        const phone = captchaInfo.phone.trim()
        const captcha = captchaInfo.captcha.trim()
        validateCode(phone, captcha, captchaInfo.codeType).then((response) => {
          if (response.data === true) {
            commit('SET_CAPTCHA', true)
          } else {
            Message.error('验证码输入错误')
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}
export default code
