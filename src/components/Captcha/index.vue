<template>
  <div>
    <el-button class="send-captcha" @click.native.prevent="getCaptcha" v-show="showCaptcha" type="primary" :disabled="sendCodeDisabled">获取验证码</el-button>
    <el-button class="send-captcha show-captcha" v-show="!showCaptcha"> {{count}}s后重新发送</el-button>
  </div>

</template>

<script>
  import { sendCaptcha, bindPhomeCode, emailIsExisted } from '@/api/check'
  import { validateEmail } from '@/utils/validate'
  import { sendEmail2, sendEmailCode } from '@/api/info'
  import { sendEmail } from '@/api/login'
  import { sendImgCode, sendSmsCodeWithImageCode, img_code } from '@/api/login'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'uid',
        'mobile',
        'tid',
        'sendCodeDisabled'
      ])
    },
    name: 'Captcha',
    props: ['captchaInfo', 'captchaType', 'sendCode', 'imgCode'],
    data() {
      return {
        imgCodeUrls: img_code,
        showCaptcha: true,
        count: '',
        time: null
      }
    },
    methods: {
      getCaptcha() {
        let countTime = 60
        if (!this.time) {
          const mobile = this.sendCode
          const img_code = this.imgCode
          const email = this.sendCode
          if (this.captchaType == 'img1') {
            if (mobile === '') {
              this.$message.error('请输入手机号')
              this.showCaptcha = true
              return false
            }
            if (!img_code) {
              this.$message.error('请输入图片验证码')
              this.showCaptcha = true
              return false
            }
            sendImgCode(mobile, img_code, this.captchaInfo.codeType).then(() => {
              this.$store.commit('SET_USEDCAPTCHA', true)
              this.count = countTime
              this.showCaptcha = false
              this.time = setInterval(() => {
                if (this.count > 0 && this.count <= countTime) {
                  this.count--
                } else {
                  this.showCaptcha = true
                  clearInterval(this.time)
                  this.time = null
                }
              }, 1000)
            }).catch((error) => {
              this.showCaptcha = true
              countTime = 0
              this.$store.commit('SET_IMGCODESTATUS', false)
              this.$message.error(error.msg)
            })
          } else if (this.captchaType == 'phone') {
            if (mobile === '') {
              this.$message.error('请输入手机号')
              this.showCaptcha = true
              return false
            }
            sendCaptcha(mobile, this.captchaInfo.codeType).then(() => {
              this.count = countTime
              this.showCaptcha = false
              this.time = setInterval(() => {
                if (this.count > 0 && this.count <= countTime) {
                  this.count--
                } else {
                  this.showCaptcha = true
                  clearInterval(this.time)
                  this.time = null
                }
              }, 1000)
              this.$store.commit('SET_USEDCAPTCHA', true)
            }).catch((error) => {
              this.showCaptcha = true
              countTime = 0
              this.$message.error(error.msg)
            })
          } else if (this.captchaType == 'bindPhone') {
            const bindPhone = this.sendCode
            bindPhomeCode(bindPhone, this.captchaInfo.codeType, this.tid, this.uid).then(() => {
                this.count = countTime
                this.showCaptcha = false
                this.time = setInterval(() => {
                if (this.count > 0 && this.count <= countTime) {
                  this.count--
                } else {
                  this.showCaptcha = true
                  clearInterval(this.time)
                  this.time = null
                }
              }, 1000)
              this.$store.commit('SET_USEDCAPTCHA', true)
            }).catch((error) => {
              this.showCaptcha = true
              countTime = 0
              this.$message.error(error.msg)
            })
          } else if (this.captchaType == 'email') {
            sendEmail2(email).then(response => {
              this.count = countTime
              this.showCaptcha = false
              this.time = setInterval(() => {
                if (this.count > 0 && this.count <= countTime) {
                  this.count--
                } else {
                  this.showCaptcha = true
                  clearInterval(this.time)
                  this.time = null
                }
              }, 1000)
            }).catch((error) => {
              this.showCaptcha = true
              countTime = 0
              this.$message.error(error.msg)
            })
          } else if (this.captchaType == 'modifyEmail') {
            const uid = this.sendCode
            sendEmailCode(uid).then((response) => {
            this.count = countTime
            this.showCaptcha = false
            this.time = setInterval(() => {
              if (this.count > 0 && this.count <= countTime) {
                this.count--
              } else {
                this.showCaptcha = true
                clearInterval(this.time)
                this.time = null
              }
            }, 1000)
            }).catch((error) => {
              this.showCaptcha = true
              countTime = 0
              this.$message.error(error.msg)
            })
          } else if (this.captchaType == 'img2') {
            if (!mobile) {
              this.$message.error('请输入手机号')
              this.showCaptcha = true
              return false
            }
            if (!img_code) {
              this.$message.error('请输入图片验证码')
              this.showCaptcha = true
              return false
            }
            sendSmsCodeWithImageCode(mobile, img_code).then(() => {
              this.showCaptcha = false
              this.count = countTime
              this.time = setInterval(() => {
                if (this.count > 0 && this.count <= countTime) {
                  this.count--
                } else {
                  this.showCaptcha = true
                  clearInterval(this.time)
                  this.time = null
                }
              }, 1000)
            }).catch((error) => {
              this.showCaptcha = true
              countTime = 0
              this.$store.commit('SET_IMGCODESTATUS', false)
              this.$message.error(error.msg)
            })
          } else if (this.captchaType == 'registerEmail') {
            if (email === '') {
              this.$message.error('请输入邮箱')
            } else {
              if (!validateEmail(email)) {
                this.$message.error('邮箱格式不正确')
              } else {
                emailIsExisted(email).then((response) => {
                  console.log(response)
                  if(!response.data){
                    sendEmail(email).then(() => {
                      this.showCaptcha = false
                      this.count = countTime
                      this.time = setInterval(() => {
                        if (this.count > 0 && this.count <= countTime) {
                          this.count--
                        } else {
                          this.showCaptcha = true
                          clearInterval(this.time)
                          this.time = null
                        }
                      }, 1000)
                    }).catch((error) => {
                      this.showCaptcha = true
                      countTime = 0
                      this.$message.error(error.msg)
                    })
                  }else{
                    this.$message.error('邮箱已存在')
                  }
                }).catch((error) => {
                })
              }
            }
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .send-captcha{
    float: right;
    position: absolute;
    top: 4px;
    right: 4px;
    margin: 0px;
    padding: 8px;
  }
  .show-captcha{
    background: #f8f8f8;
    color: #ccc;
    border-color: #eee;
  }
</style>
