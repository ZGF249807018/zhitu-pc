<template>
  <div class="login-bg">
    <top-bar></top-bar>
    <div class="loginWrapper">
      <h1 class="title-s">用户注册</h1>
      <div class="loginPass-container">
        <el-form  autoComplete="on" :model="loginPassForm" :rules="loginPassRules" ref="loginPassForm" >
          <el-form-item prop="password">
            <el-input  placeholder="密码(不能小于6位)" type="password" name="password" v-model="loginPassForm.password" autoComplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input placeholder="请再次输入密码" type="password" name="confirmPassword" v-model="loginPassForm.confirmPassword" autoComplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submitBtn" :loading="loading" @click.native.prevent="submitloginPassForm">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import TopBar from '@/components//Topmenu/index'
  import Captcha from '@/components/Captcha/index'
  import { modifyPassword } from '@/api/info'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { checkInputConfimPass, checkInputPass } from '@/utils/check/index'
  export default {
    name: 'loginPass',
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    data() {
      const validatePass = (rule, value, callback) => {
        checkInputPass(value, callback)
      }
      const validateConfirmPass = (rule, value, callback) => {
        checkInputConfimPass(value, callback, this.loginPassForm.password)
      }
      return {
        loading: false,
        codeType: {
          codeType: 'code_notice'
        },
        loginPassForm: {
          password: '',
          newpassword: ''
        },
        loginPassRules: {
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          newpassword: [{ required: true, trigger: 'blur', validator: validateConfirmPass }]
        }
      }
    },
    methods: {
      submitloginPassForm() {
        this.$refs.loginPassForm.validate(valid => {
          console.log(valid)
          if (valid) {
            this.loading = true
            console.log(this.loginPassForm)
            modifyPassword(this.uid, this.loginPassForm.password, this.loginPassForm.newpassword).then(response => {
              this.loading = false
              if (response.success === true) {
                Message.success('登录密码修改成功')
                this.$router.push({ path: '/login' })
              }
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
    components: { TopBar, Captcha }
  }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
  .loginPass-container{
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
