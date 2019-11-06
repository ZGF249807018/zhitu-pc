<template>

  <div class="login-container  register-container login-bg ">
    <top-bar></top-bar>
    <div class="login-form">
      <div class="register-box">
        <h1 class="title">欢迎注册</h1>
        <div class="register-steps">
          <el-steps :active="active" finish-status="success" align-center="true">
            <el-step title="手机号验证" ></el-step>
            <el-step title="完善信息" ></el-step>
            <el-step title="完成注册" ></el-step>
          </el-steps>
        </div>
        <div v-if="!isNext && !completeRegister">
          <el-form  autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" >
            <el-form-item prop="phone">
              <el-input placeholder="请输入手机号" name="phone" v-model="registerForm.phone" autoComplete="on"><template slot="prepend"><i class="icon iconfont input-icon icon-shouji1"></i></template></el-input>
            </el-form-item>
            <el-form-item prop="captcha1">
              <el-input  placeholder="请输入验证码" type="number" name="captcha1" v-model="registerForm.captcha1" class="codeInput"><template slot="prepend"><i class="icon iconfont input-icon icon-yanzhengma"></i></template></el-input>
              <ImgCode></ImgCode>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input  placeholder="请输入验证码" type="number" name="captcha" v-model="registerForm.captcha" class="codeInput"><template slot="prepend"><i class="icon iconfont input-icon icon-yanzhengma"></i></template></el-input>
              <captcha :captchaInfo="codeType" :captchaType="'img1'" :sendCode="registerForm.phone" :imgCode="registerForm.captcha1"></captcha>
            </el-form-item>
          </el-form>
          <el-button type="primary"  class="next brs"  @click="next">下一步</el-button>
          <div class="ft">
            已经有账号？<router-link to="/login" class="link">马上登录</router-link>
          </div>
        </div>
        <div v-if="isNext && !completeRegister">
          <el-form autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm">
            <el-form-item prop="company">
              <el-input placeholder="公司营业执照上的工商注册名称" name="company" v-model="registerForm.company"><template slot="prepend"><i class="icon iconfont input-icon icon-gongsi"></i></template></el-input>
            </el-form-item>
            <el-form-item prop="username">
              <el-input placeholder="请输入账户名，如：zhangsan" name="username" v-model="registerForm.username"><template slot="prepend"><i class="icon iconfont input-icon icon-user"></i></template></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input  placeholder="密码由6-20位数字和英文字母组成" type="password" name="password" v-model="registerForm.password" readonly onfocus="this.removeAttribute('readonly')"><template slot="prepend"><i class="icon iconfont input-icon icon-ai-password"></i></template></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input placeholder="再次输入新密码" type="password" name="confirmPassword" v-model="registerForm.confirmPassword" readonly onfocus="this.removeAttribute('readonly')"><template slot="prepend"><i class="icon iconfont input-icon icon-ai-password"></i></template></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="邀请优惠码（非必填）"  name="inviteCode" v-model="registerForm.inviteCode"><template slot="prepend"><i class="icon iconfont input-icon icon-yaoqinghaoyou"></i></template></el-input>
            </el-form-item>
          </el-form>
          <div class="agreement"><el-checkbox v-model="checked">我已阅读并同意<router-link to="/agreement" class="link"  target="_blank">《职兔背调服务协议》</router-link></el-checkbox></div>
          <el-button type="primary"  class="next brs"  @click="submitRegisterForm">下一步</el-button>
        </div>
        <div v-if="completeRegister">
          <div class="code">
            <img src="" alt="">
            <h3>恭喜您，完成注册</h3>
          </div>
          <router-link to="/dashboard"><el-button type="primary"  class="next">返回首页</el-button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import TopBar from '@/components//Topmenu/index'
  import Captcha from '@/components/Captcha/index'
  import ImgCode from '@/components/ImgCode/index'
  import { register, img_code, registStepOne } from '@/api/login'
  import { Message } from 'element-ui'
  import { checkInputName, checkInputCompanyName, checkInputAccount, checkInputPhone, checkInputPass, checkInputConfimPass, checkInputCaptcha, checkInputCaptchaImg, checkInputEmailIsExisted } from '@/utils/check/index'
export default {
    name: 'register',
    computed: {
      ...mapGetters([
        'mobile'
      ])
    },
    data() {
      const validateCompanyName = (rule, value, callback) => {
        checkInputCompanyName(value, callback, this.registerForm.company)
      }
      const validateUsername = (rule, value, callback) => {
        checkInputAccount(value, callback, this.registerForm.username, true)
      }
      const validatePhoneNum = (rule, value, callback) => {
        checkInputPhone(value, callback, this.registerForm.phone, true)
      }
      const validatePass = (rule, value, callback) => {
        checkInputPass(value, callback)
      }
      const validateConfirmPass = (rule, value, callback) => {
        checkInputConfimPass(value, callback, this.registerForm.password)
      }
      const validateCaptcha = (rule, value, callback) => {
        checkInputCaptcha(value, callback)
      }
      const validateCaptchaImg = (rule, value, callback) => {
        checkInputCaptchaImg(value, callback)
      }
      return {
        count: '',
        timer: null,
        isNext: false,
        checked: true,
        completeRegister: false,
        imgCode: img_code,
        active: 0,
        loading: false,
        codeType: {
          codeType: 'register_code'
        },
        registerForm: {
          captcha1: '',
          confirmPassword: '',
          phone: '',
          captcha: '',
          username: '',
          password: '',
          company: ''
        },
        loginForm: {
          username: '',
          password: ''
        },
        registerRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          company: [{ required: true, trigger: 'blur', validator: validateCompanyName }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPass }],
          phone: [{ required: true, trigger: 'blur', validator: validatePhoneNum }],
          captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }],
          captcha1: [{ required: true, trigger: 'blur', validator: validateCaptchaImg }]
        }
      }
    },
    mounted() {

    },
    methods: {
      next() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            registStepOne(this.registerForm.phone, this.registerForm.captcha).then((response) => {
              this.$store.commit('SET_MOBILE', this.registerForm.phone)
              this.isNext = true
              this.registerForm.captcha = ''
              this.$refs.registerForm.resetFields()
              this.active = 2
            }).catch(error => {
              this.$message.error(error.msg)
            })
          }
        })
      },
      getImgCode() {

      },
      submitRegisterForm() {
        this.$refs.registerForm.validate(valid => {
          console.log(valid)
          if (valid) {
            if (!this.checked) {
              this.$message.warning('同意协议才能提交哦')
              return false
            }
            this.loading = true
            register(this.mobile, this.registerForm.username, this.registerForm.password, this.registerForm.company, this.registerForm.inviteCode).then(response => {
              this.loading = false
              this.completeRegister = true
              this.active = 3
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
    },
    components: { TopBar, Captcha, ImgCode }
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
  .ft{
    text-align: center;
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
</style>
