<template>
  <div class="login-container register-container login-bg ">
    <top-bar></top-bar>
    <div class="login-form">
      <div class="register-box">
        <h1 class="title">忘记密码</h1>
        <div class="register-steps">
          <el-steps :active="active" finish-status="success" align-center="true">
            <el-step title="身份验证" ></el-step>
            <el-step title="设置新密码" ></el-step>
            <el-step title="完成" ></el-step>
          </el-steps>
        </div>
        <div v-if="!isNext && !completeBack">
          <el-form autoComplete="on" :model="backPassForm" :rules="backPassRules" ref="backPassForm">
            <el-form-item prop="phone">
              <el-input placeholder="请输入手机号" name="phone" v-model="backPassForm.phone" ><template slot="prepend"><i class="icon iconfont input-icon icon-shouji1"></i></template></el-input>
            </el-form-item>
            <el-form-item prop="captcha1">
              <el-input  placeholder="请输入验证码" type="number" name="captcha1" v-model="backPassForm.captcha1" class="codeInput"><template slot="prepend"><i class="icon iconfont input-icon icon-yanzhengma"></i></template></el-input>
              <ImgCode></ImgCode>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input  placeholder="请输入验证码" name="captcha" v-model="backPassForm.captcha" class="codeInput">
                <template slot="prepend"><i class="icon iconfont input-icon icon-yanzhengma"></i></template>
              </el-input>
              <captcha :captchaType="'img2'" :sendCode="backPassForm.phone" :imgCode="backPassForm.captcha1"></captcha>
            </el-form-item>
          </el-form>
          <el-button type="primary"  class="next brs"  @click.native.prevent="next">下一步</el-button>
        </div>
        <div v-if="isNext && !completeBack">
          <el-form autoComplete="on" :model="backPassForm" :rules="backPassRules" ref="backPassForm">
            <el-form-item prop="password">
              <el-input  placeholder="密码" type="password" name="password" v-model="backPassForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input placeholder="请再次输入密码" type="password" name="confirmPassword" v-model="backPassForm.confirmPassword"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="next brs"  @click.native.prevent="submitBackPassForm">下一步</el-button>
        </div>
        <div v-if="completeBack">
          <div class="tc">
            <div class="success-tip"><i class="icon iconfont icon-gougou1 di"></i><h3 class="di">密码修改成功</h3></div>
            <p>{{count}}秒后...自动为您转至登录页面 <router-link to="/login"><span class="link-txt">去登录 >> </span></router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import TopBar from '@/components//Topmenu/index'
  import Captcha from '@/components/Captcha/index'
  import ImgCode from '@/components/ImgCode/index'
  import { setLoginPwd, img_code, findLoginPwd } from '@/api/login'
  import { Message } from 'element-ui'
  import { checkInputPhone, checkInputPass, checkInputConfimPass, checkInputCaptcha, checkInputCaptchaImg } from '@/utils/check/index'
  export default {
    name: 'Backpwd',
    data() {
      const validatePhoneNum = (rule, value, callback) => {
        checkInputPhone(value, callback, '', false)
      }
      const validatePass = (rule, value, callback) => {
        checkInputPass(value, callback)
      }
      const validateConfirmPass = (rule, value, callback) => {
        checkInputConfimPass(value, callback, this.backPassForm.password)
      }
      const validateCaptcha = (rule, value, callback) => {
        checkInputCaptcha(value, callback)
      }
      const validateCaptchaImg = (rule, value, callback) => {
        checkInputCaptchaImg(value, callback)
      }
      return {
        isNext: false,
        active: 0,
        completeBack: false,
        imgCode: img_code,
        loading: false,
        loading2: false,
        codeType: {
          codeType: 'retrieve_pwd_code',
          mobile: ''
        },
        showCaptcha: true,
        count: '',
        tokenData: '',
        time: null,
        backPassForm: {
          captcha1: '',
          phone: '',
          captcha: '',
          password: '',
          confirmPassword: ''
        },
        backPassRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPass }],
          phone: [{ required: true, trigger: 'blur', validator: validatePhoneNum }],
          captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }],
          captcha1: [{ required: true, trigger: 'blur', validator: validateCaptchaImg }]
        }
      }
    },
    components: { TopBar, Captcha, ImgCode },
    methods: {
      next() {
        findLoginPwd(this.backPassForm.phone, this.backPassForm.captcha).then(response => {
          this.isNext = true
          this.tokenData = response.data
          this.active = 2
        }).catch((error) => {
          Message.success(error.msg)
          this.loading = false
        })
      },
      submitBackPassForm() {
        this.$refs.backPassForm.validate(valid => {
          if (valid) {
            console.log(valid)
            setLoginPwd(this.backPassForm.phone, this.tokenData, this.backPassForm.password).then(() => {
              this.loading = false
              this.completeBack = true
              this.active = 3
              if (this.completeBack) {
                this.getCaptcha()
              }
            }).catch((error) => {
              Message.success(error.msg)
              this.loading = false
            })
          } else {
            this.loading = false
            return false
          }
        })
      },
      getCaptcha() {
        const countTime = 3
        if (!this.time) {
          this.count = countTime
          this.time = setInterval(() => {
            if (this.count > 0 && this.count <= countTime) {
              this.count--
            } else {
              clearInterval(this.time)
              this.time = null
              this.$router.push({ path: '/' })
            }
          }, 1000)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
  .agreement{
    display: flex;
    justify-content: center;
  }
  .link{
    color: #03A9F5;
  }
  .brs{
    margin-bottom: 46px;
  }
  .ft{
    text-align: center;
    margin-bottom: 40px;
  }
  .register-container{
    .el-input{
      width: 480px;
    }
    .submitBtn{
      width: 100%;
    }
  }
  .title-s{
    color: #fff;
    font-weight: normal;
  }
  .code{
    display: flex;
    justify-content: center;
  }
  .loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  }
  .next{
    margin: 47px auto 27px auto !important;
  }
  .register-box{
    width: 980px;
    background: #fff;
    padding-bottom: 40px;
  }
  .loginWrapper .hd {
    width: 300px;
  }
  .link-txt{
    color: #03A9F5;
  }
  .loginWrapper .hd h2 {
    font-weight: 400;
    color: #20A0FF;
  }
  .loginWrapper .hd p {
    font-size: 15px;
    color: #1f2f3d;
  }
  .success-tip{
    padding-bottom: 36px;
    h3{
      padding-left: 16px;
      font-size: 26px;
    }
  }
  .loginWrapper .bd {
    width: 300px;
  }
  .loginWrapper .bd .submitBtn {
    width: 100%;
  }
  .codeInput{
    width: 370px !important;
    position: relative;
    left: -55px;
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
  .send-captcha{
    float: right;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .icon-gougou1{
    color: #03A9F5;
    font-size: 26px;
  }
</style>
