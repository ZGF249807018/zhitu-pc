<template>
  <div class="table report-search">
    <div class="crumbs">
      <h1 class="container-title">绑定邮箱</h1>
    </div>
    <div class="container">
      <div class="register-container bind-email">
        <el-form autoComplete="on" :model="bindEmailForm" :rules="bindEmailRules" ref="bindEmailForm">
          <el-form-item prop="phone">
            <el-input placeholder="请输入邮箱" name="email" v-model="bindEmailForm.email" autoComplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input  placeholder="请输入验证码" name="captcha" v-model="bindEmailForm.captcha" autoComplete="off">
            </el-input>
            <captcha :captchaInfo="codeType" :captchaType="'email'" :sendCode="bindEmailForm.email"></captcha>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submitBtn" :loading="loading" @click.native.prevent="submitBindEmail">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import TopBar from '@/components//Topmenu/index'
  import Captcha from '@/components/Captcha/index'
  import { bindemail } from '@/api/info'
  import { mapGetters } from 'vuex'
  import { Message } from 'element-ui'
  import { checkInputEmail, checkInputCaptcha } from '@/utils/check/index'
  export default {
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    data() {
      const emailAcoount = (rule, value, callback) => {
        checkInputEmail(value, callback)
      }
      const captcha = (rule, value, callback) => {
        checkInputCaptcha(value, callback)
      }
      return {
        loading: false,
        codeType: {
          email: ''
        },
        showCaptcha: true,
        count: '',
        time: null,
        bindEmailForm: {
          email: '',
          captcha: ''
        },
        bindEmailRules: {
          email: [{ required: true, trigger: 'blur', validator: emailAcoount }],
          captcha: [{ required: true, trigger: 'blur', validator: captcha }]
        }
      }
    },
    components: { TopBar, Captcha },
    methods: {
      submitBindEmail() {
        this.$refs.bindEmailForm.validate(valid => {
          if (valid) {
            this.loading = true
            console.log(valid)
            console.log(this.bindEmailForm)
            bindemail(this.uid, this.bindEmailForm.email, this.bindEmailForm.captcha).then((response) => {
              this.loading = false
              Message.success('绑定邮箱成功')
              this.$router.back(-1)
            }).catch(error => {
              console.log(error)
              this.loading = false
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
