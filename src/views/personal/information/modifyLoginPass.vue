<template>

  <div class="table report-search">
    <div class="crumbs">
      <h1 class="container-title" v-show="SendCaptcha || captcha">修改密码</h1>
      <h1 class="container-title" v-show="!SendCaptcha && !captcha">发送验证码</h1>
    </div>
    <div class="container">
      <div class="register-container modify-box">

        <div class="register-container" v-show="!SendCaptcha && !captcha">
          <el-form autoComplete="on" :model="bindPassForm" :rules="bindPassRules" ref="bindPassForm">
            <el-form-item prop="phone">
              <el-input placeholder="请输入手机号码" name="phone" v-model="bindPassForm.phone" class="disabled" disabled="true" autoComplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input  placeholder="请输入验证码" name="captcha" v-model="bindPassForm.captcha" autoComplete="off">
              </el-input>
              <captcha :captchaInfo="codeType" :captchaType="'phone'" :sendCode="bindPassForm.phone"></captcha>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submitBtn" :loading="loading" @click.native.prevent="submitbindPass">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="loginPass-container" v-show="SendCaptcha || captcha">
          <el-form  autoComplete="on" :model="loginPassForm" :rules="loginPassRules" ref="loginPassForm" >
            <el-form-item prop="password">
              <el-input  placeholder="请输入旧密码" type="password" name="password" v-model="loginPassForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="newpassword">
              <el-input placeholder="请输入新密码" type="password" name="confirmPassword" v-model="loginPassForm.newpassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submitBtn" :loading="loading" @click="submitloginPassForm">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import TopBar from '@/components//Topmenu/index'
  import Captcha from '@/components/Captcha/index'
  import { modifyPassword } from '@/api/info'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import Cookies from 'js-cookie'
  import { checkInputPhone, checkInputCaptcha, checkInputModifyPass2, checkInputNewPass} from '@/utils/check/index'
  export default {
    name: 'modifyPayPass',
    computed: {
      ...mapGetters([
        'captcha',
        'uid',
        'tid',
        'usedcaptcha'
      ])
    },
    data() {
      const validatePhoneNum = (rule, value, callback) => {
        checkInputPhone(value, callback, '', false)
      }
      const validateCaptcha = (rule, value, callback) => {
        checkInputCaptcha(value, callback)
      }
      const validatePass = (rule, value, callback) => {
        checkInputModifyPass2(value, callback)
      }
      const validateNewPass = (rule, value, callback) => {
        checkInputNewPass(value, callback, this.loginPassForm.password)
      }
      return {
        loading: false,
        SendCaptcha: false,
        codeType: {
          codeType: 'code_notice'
        },
        bindPassForm: {
          phone: Cookies.get('mobile'),
          captcha: ''
        },
        bindPassRules: {
          phone: [{ required: true, trigger: 'blur', validator: validatePhoneNum }],
          captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }]
        },
        loginPassForm: {
          password: '',
          newpassword: ''
        },
        loginPassRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          newpassword: [{ required: true, trigger: 'blur', validator: validateNewPass }]
        }
      }
    },
    components: { TopBar, Captcha },
    methods: {
      submitbindPass() {
        this.$refs.bindPassForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.bindPassForm.codeType = 'code_notice'
            if (this.usedcaptcha === false) {    // 页面刷新后验证码失效
              Message.error('验证码失效，请重新获取')
              this.loading = false
              return false
            }
            this.$store.dispatch('ValidateCaptcha', this.bindPassForm).then(() => {
              this.loading = false
              if (this.captcha === true && this.usedcaptcha === true) {
                this.SendCaptcha = !this.SendCaptcha
                this.$store.commit('SET_USEDCAPTCHA', false)
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.loading = false
            return false
          }
        })
      },
      submitloginPassForm() {
        this.$refs.loginPassForm.validate(valid => {
          if (valid) {
            this.loading = true
            console.log(this.loginPassForm)
            modifyPassword(this.tid, this.uid, this.loginPassForm.password, this.loginPassForm.newpassword).then(() => {
              this.loading = false
              Message.success('登录密码修改成功')
              this.$store.commit('SET_CAPTCHA', false)
              this.$router.push({ path: '/login' })
            }).catch(error => {
              this.loading = false
              Message.error(error.msg)
            })
          } else {
            this.loading = false
            return false
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
  .loginPass-container{
    width: 400px;
    .submitBtn{
      width: 100%;
    }
  }
  .register-container{
    width: 400px;
    .submitBtn{
      width: 100%;
    }
  }
  .title-s{
    color: #fff;
    font-weight: normal;
  }
  .loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  }
  .loginWrapper .hd {
    width: 300px;
  }
  .loginWrapper .hd h2 {
    font-weight: 400;
    color: #20A0FF;
  }
  .loginWrapper .hd p {
    font-size: 15px;
    color: #1f2f3d;
  }
  .loginWrapper .bd {
    width: 300px;
  }
  .loginWrapper .bd .submitBtn {
    width: 100%;
  }
  .loginWrapper .bd .el-form-item:last-child {
    margin-bottom: 10px;
  }
  .loginWrapper .ft {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 300px;
  }
  .loginWrapper .ft a {
    font-size: 14px;
    text-decoration: none;
    color: #20A0FF;
  }
</style>
