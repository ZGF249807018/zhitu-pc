<template>
  <div class="table report-search">
    <div class="crumbs">
      <h1 class="container-title">设置支付密码</h1>
    </div>
    <div class="container">
      <div class="register-container pay-pass-container">
        <el-form autoComplete="on" :model="bindPassForm" :rules="bindPassRules" ref="bindPassForm" label-width="80px">
          <el-form-item label="手机号码" v-if="payMobile">
            <el-input placeholder=""  v-model="payMobile" class="disabled" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" v-else>
            <el-input placeholder=""  v-model="bindPassForm.phone" class="disabled" disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="captcha" label="验证码">
            <el-input  placeholder="请输入验证码" name="captcha" v-model="bindPassForm.captcha" readonly onfocus="this.removeAttribute('readonly')" autoComplete="off">
            </el-input>
            <captcha :captchaInfo="codeType" :captchaType="'phone'" :sendCode="bindPassForm.phone ||payMobile"></captcha>
          </el-form-item>
          <el-form-item prop="password" label="新密码">
            <el-input placeholder="请输入新支付密码(支付密码为6位数字)" type="password" name="password" readonly onfocus="this.removeAttribute('readonly')" v-model="bindPassForm.password" maxlength="6"  autoComplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" label="再次输入">
            <el-input placeholder="" type="password" name="confirmPassword" v-model="bindPassForm.confirmPassword" maxlength="6"  autoComplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submitBtn" :loading="loading" @click.native.prevent="submitbindPass">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import TopBar from '@/components//Topmenu/index'
  import Captcha from '@/components/Captcha/index'
  import { Message } from 'element-ui'
  import { setPassword } from '@/api/info'
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  import { checkInputCaptcha, checkInputPayPass, checkInputConfimPass } from '@/utils/check/index'
  export default {
    computed: {
      ...mapGetters([
        'tid'
      ])
    },
    data() {
      const validatePass = (rule, value, callback) => {
        checkInputPayPass(value, callback)
      }
      const captcha = (rule, value, callback) => {
        checkInputCaptcha(value, callback)
      }
      const validateConfirmPass = (rule, value, callback) => {
        checkInputConfimPass(value, callback, this.bindPassForm.password)
      }
      return {
        loading: false,
        codeType: {
          codeType: 'code_notice'
        },
        showCaptcha: true,
        count: '',
        time: null,
        bindPassForm: {
          phone: Cookies.get('mobile'),
          captcha: '',
          confirmPassword: '',
          password: ''
        },
        bindPassRules: {
          captcha: [{ required: true, trigger: 'blur', validator: captcha }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPass }]
        }
      }
    },
    components: { TopBar, Captcha },
    created() {
      console.log(this.props)
    },
    props:[
      'payMobile'
    ],
    methods: {
      submitbindPass() {
        this.$refs.bindPassForm.validate(valid => {
          if (valid) {
            this.loading = true
            console.log(valid)
            console.log(this.bindPassForm)
            setPassword(this.tid, this.bindPassForm.phone, this.bindPassForm.password, this.bindPassForm.captcha).then((response) => {
              this.loading = false
              Message.success('支付密码修改成功')
              this.$router.go(-1)
              this.$emit('dialogStatus', false)
            }).catch(error => {
              this.loading = false
              console.log(error)
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
