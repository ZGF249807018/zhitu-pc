
import { validateCnCode, validateEnCode, validateCompany, validatePassword, validatePhone, validatePhone3, validateEmail, validatePayPass, validateOrgCode, validateIdCardNum, validateInputTime2, validateMoney, validateLowerCase, validateUpperCase } from '@/utils/validate'
import { checkPhone, checkEditAccount, checkCompany, checkUsername, checkEditPhone, emailIsExisted, threeElements } from '@/api/check'
import store from '@/store/index'
function checkTip(tip, formVal, callback) {
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      formVal.then(response => {
        if (response.data == true) {
          store.commit('SET_SENDCODEDISABLED', true)
          callback(new Error(tip))
        } else {
          store.commit('SET_SENDCODEDISABLED', false)
          callback()
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }, 800)
}
function getIdInfo(formVal) {
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      formVal.then(response => {
        if (response.data) {
          store.commit('SET_IDSEX', response.data.sex)
          store.commit('SET_IDBIRTH', response.data.birthday)
          store.commit('SET_IDPLACE', response.data.nativeAddress)
        }
        resolve()
      }).catch(error => {
        this.$message.error(error.msg)
        reject(error)
      })
    })
  }, 800)
}

// 校验手机或者座机
export function checkInputPhone3(value, callback) {
  // if (value === '') {
  //   callback(new Error('请输入手机或者座机号码'))
  // } else {
  //   if (!validatePhone3(value)) {
  //     callback(new Error('手机或者座机号码不正确'))
  //   } else {
  //     callback()
  //   }
  // }
  if (value) {
    if (!validatePhone3(value)) {
      callback(new Error('手机或者座机号码不正确'))
    } else {
      callback()
    }
  }
}

// 通用校验 验证特殊字符
export function checkInputCode(value, callback) {
  if (validateEnCode(value) || validateCnCode(value)) {
    callback(new Error('不能含有特殊字符'))
  } else {
    callback()
  }
}

// 通过三要素获取候选人身份信息
export function getCandidateId(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入身份证号码'))
  } else {
    if (!validateIdCardNum(value)) {
      callback(new Error('身份证号码格式不正确'))
    } else {
      getIdInfo(threeElements(e))
      callback()
    }
  }
}

// 验证账户是否已注册
export function checkInputAccount(value, callback, e, p) {
  if (value === '') {
    callback(new Error('请输入账户名'))
  } else {
    if (validateCnCode(value) || validateEnCode(value) || validateCompany(value)) {
      callback(new Error('请输入正确的账号'))
    } else if (value < 4) {
      callback(new Error('账户名不能小于4位'))
    } else {
      if (p === true) {
        checkTip('账户名已存在', checkUsername(e), callback)
      } else {
        callback()
      }
    }
  }
}
// 验证子账号是否已注册
export function checkChildAccount(value, callback, e, uid, p) {
  if (value === '') {
    callback(new Error('请输入子账号'))
  } else {
    if (validateCnCode(value) || validateEnCode(value) || validateCompany(value)) {
      callback(new Error('请输入正确的子账号'))
    } else if (value < 4) {
      callback(new Error('子账号不能小于4位'))
    } else {
      if (p === true) {
        checkTip('子账号已存在', checkEditAccount(e, uid), callback)
      } else {
        callback()
      }
    }
  }
}
// 验证邮箱是否已注册
export function checkInputEmailIsExisted(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else {
    if (!validateEmail(value)) {
      callback(new Error('邮箱格式不正确'))
    } else {
      checkTip('邮箱已存在', emailIsExisted(e), callback)
    }
  }
}

export function checkInputCompanyName(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入公司名称'))
  } else {
    if (validateEnCode(value) || validateCnCode(value)) {
      callback(new Error('公司名称不能含有特殊字符'))
    } else if (value < 4) {
      callback(new Error('公司名称不能小于4位'))
    } else {
      checkTip('公司名称已存在', checkCompany(e), callback)
    }
  }
}

export function checkInputName(value, callback) {
  if (value === '') {
    callback(new Error('请输入姓名'))
  } else {
    if (!validateCompany(value)) {
      callback(new Error('请输入中文姓名'))
    } else if (value.length < 2) {
      callback(new Error('姓名不能小于2位'))
    } else {
      callback()
    }
  }
}
export function checkContactName(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入联系人姓名'))
  } else {
    if (validateEnCode(value) || validateCnCode(value)) {
      callback(new Error('请输入中文或英文姓名'))
    } else if (value.length < 2) {
      callback(new Error('姓名不能小于2位'))
    } else if (e === value) {
      callback(new Error('联系人姓名不能和候选人姓名相同'))
    } else {
      callback()
    }
  }
}
export function checkInputPhone(value, callback, e, p) {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else {
    if (!validatePhone(value)) {
      callback(new Error('手机号码格式不正确'))
    } else {
      if (p === true) {
        checkTip('手机号码已存在', checkPhone(e), callback)
      } else {
        callback()
      }
    }
  }
}
export function checkContacPhone(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else {
    if (!validatePhone(value)) {
      callback(new Error('手机号码格式不正确'))
    } else if (e === value) {
      callback(new Error('联系电话不能和候选人电话相同'))
    } else {
      callback()
    }
  }
}
/* 手机号 非必填 */
export function checkInputPhone2(value, callback) {
  if (!validatePhone(value) && value > 0) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

// 验证子账号 手机号
export function checkChildPhone(value, callback, e, uid, p) {
  if (value === '') {
    callback(new Error('请输入手机号码'))
  } else {
    if (!validatePhone(value)) {
      callback(new Error('手机号码格式不正确'))
    } else {
      if (p === true) {
        checkTip('手机号码已存在', checkEditPhone(e, uid), callback)
      } else {
        callback()
      }
    }
  }
}
export function checkInputPass(value, callback) {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (value.length < 6) {
      callback(new Error('密码不能小于6位'))
    } else if(value.length > 20) {
      callback(new Error('密码不能大于20位'))
    } else if (!validatePassword(value)) {
      callback(new Error('密码必须包含数字加字母'))
    } else {
      callback()
    }
  }
}

export function checkInputConfimPass(value, callback, e) {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else {
    if (value !== e) {
      callback(new Error('两次输入密码不一致'))
    } else {
      callback()
    }
  }
}
export function checkInputCaptchaImg(value, callback) {
  if (value === '') {
    callback(new Error('请输入图片验证码'))
  } else {
    if (!validatePayPass(value)) {
      callback(new Error('请输入6位数字验证码'))
    } else {
      callback()
    }
  }
}
export function checkInputCaptcha(value, callback) {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else {
    if (!validatePayPass(value)) {
      callback(new Error('请输入数字验证码'))
    } else {
      callback()
    }
  }
}
export function checkInputPayPass(value, callback) {
  if (value === '') {
    callback(new Error('请输入支付密码'))
  } else {
    if (!validatePayPass(value)) {
      callback(new Error('请输入6位数字'))
    } else {
      callback()
    }
  }
}
export function checkInputEmail(value, callback) {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else {
    if (!validateEmail(value)) {
      callback(new Error('邮箱格式不正确'))
    } else {
      callback()
    }
  }
}

export function checkInputModifyEmail(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入新邮箱'))
  } else {
    if (value === e) {
      callback(new Error('新邮箱地址不能与原来邮箱地址相同'))
    } else {
      callback()
    }
  }
}

export function checkInputModifyPass(value, callback, e, fun) {
  if (value === '') {
    callback(new Error('请输入旧密码'))
  } else {
    if (value.length < 6) {
      callback(new Error('密码不能小于6位'))
    } else if (!validatePassword(value)) {
      callback(new Error('密码必须包含数字加字母'))
    } else {
      if (e !== '') {
        return fun
      }
      callback()
    }
  }
}
export function checkInputModifyPass2(value, callback) {
  if (value === '') {
    callback(new Error('请输入旧密码'))
  } else {
    if (value.length < 6) {
      callback(new Error('密码不能小于6位'))
    } else if (!validatePassword(value)) {
      callback(new Error('密码必须包含数字加字母'))
    } else {
      callback()
    }
  }
}
export function checkInputNewPass(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else {
    if (value.length < 6) {
      callback(new Error('密码不能小于6位'))
    } else if (!validatePassword(value)) {
      callback(new Error('密码必须包含数字加字母'))
    } else if (value === e) {
      callback(new Error('新旧密码不能相同'))
    } else {
      callback()
    }
  }
}

export function checkInputNewPhone(value, callback, e) {
  if (value === '') {
    callback(new Error('请输入新手机号码'))
  } else {
    if (!validatePhone(value)) {
      callback(new Error('手机格式不正确'))
    } else if (value === e) {
      callback(new Error('新旧手机号码不能相同'))
    } else {
      callback()
    }
  }
}

export function checkInputCreditCode(value, callback) {
  if (value === '') {
    callback(new Error('请输入社会信用代码'))
  } else {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{18}$/
    if (!reg.test(value)) {
      callback(new Error('请输入18位数字加字母统一社会信用代码'))
    } else {
      callback()
    }
  }
}

export function checkInputRegistrationNum(value, callback) {
  if (value === '') {
    callback(new Error('请输入营业执照注册号'))
  } else {
    if (value.length < 15) {
      callback(new Error('请输入15位数字'))
    } else {
      callback()
    }
  }
}

export function checkInputOrgNum(value, callback) {
  if (value === '') {
    callback(new Error('请输入组织机构代码'))
  } else {
    if (!validateOrgCode(value)) {
      callback(new Error('请输入有效的组织机构代码'))
    } else {
      callback()
    }
  }
}

export function checkInputID(value, callback) {
  if (value === '') {
    callback(new Error('请输入身份证号码'))
  } else {
    if (!validateIdCardNum(value)) {
      callback(new Error('身份证号码格式不正确'))
    } else {
      callback()
    }
  }
}

export function checkCandidate(value, callback) {
  if (value === '') {
    callback(new Error('请输入您的姓名'))
  } else {
    if (validateEnCode(value) || validateCnCode(value)) {
      callback(new Error('不能含有特殊字符'))
    } else {
      callback()
    }
  }
}

export function checkTime(value, callback) {
  if (value === '') {
    callback(new Error('请输入时间'))
  } else {
    if (!validateInputTime2(value)) {
      callback(new Error('时间格式不正确'))
    } else {
      callback()
    }
  }
}
/* 薪资 必填 */
export function checkMoney(value, callback) {
  if (value) {
    if (!validateMoney(value)) {
      callback(new Error('薪资格式不正确'))
    } else {
      callback()
    }
  }
}
/* 薪资 非必填 */
export function checkMoney2(value, callback) {
  if (!validateMoney(value) && value !== '') {
    callback(new Error('薪资格式不正确'))
  } else {
    callback()
  }
}
