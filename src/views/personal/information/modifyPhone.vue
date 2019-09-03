<template>
  <div class="table report-search">
    <div class="crumbs">
      <h1 class="container-title" v-if="!isNext">验证手机号</h1>
      <h1 class="container-title" v-if="isNext">修改手机号</h1>
    </div>
    <div class="container">
      <el-steps :active="active" finish-status="success">
        <el-step title="验证原手机"></el-step>
        <el-step title="输入新手机"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
      <div class="register-container modify-box">
        <div v-if="!isNext">
          <el-form autoComplete="on" :model="bindPhoneForm" :rules="bindPhoneRules" ref="bindPhoneForm" label-width="80px">
            <el-form-item prop="phone">
              <el-input placeholder="" name="phone" v-model="bindPhoneForm.phone" autoComplete="off" type="hidden"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input placeholder="请输入手机号码" v-model="oldPhone" autoComplete="off" disabled="true" class="disabled"></el-input>
            </el-form-item>
            <el-form-item prop="captcha" label="验证码">
              <el-input  placeholder="请输入验证码" name="captcha" v-model="bindPhoneForm.captcha" autoComplete="off">
              </el-input>
              <captcha :captchaInfo="codeType" :captchaType="'bindPhone'" :sendCode="bindPhoneForm.phone"></captcha>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submitBtn" :loading="loading" @click.native.prevent="submitNext">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="isNext">
          <el-form autoComplete="on" :model="bindPhoneForm" :rules="bindPhoneRules" ref="bindPhoneForm">
            <el-form-item prop="phone2">
              <el-input placeholder="请输入新手机号码" name="phone2" v-model="bindPhoneForm.phone2" autoComplete="off" ></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <el-input  placeholder="请输入验证码" name="captcha" v-model="bindPhoneForm.captcha" autoComplete="off">
              </el-input>
              <captcha :captchaInfo="codeType" :captchaType="'bindPhone'" :sendCode="bindPhoneForm.phone2"></captcha>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submitBtn" :loading="loading" @click.native.prevent="submitbindPhone">确定</el-button>
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
  import { checkInputPhone, checkInputNewPhone } from '@/utils/check/index'
  import { bindMobile, validateCode } from '@/api/info'
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  export default {
    computed: {
      ...mapGetters([
        'uid',
        'mobile'
      ])
    },
    data() {
      const validatePhoneNum = (rule, value, callback) => {
        checkInputPhone(value, callback, '', false)
      }
      const validatePhoneNum2 = (rule, value, callback) => {
        checkInputPhone(value, callback, this.bindPhoneForm.phone2, true)
      }
      const captcha = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        active: 0,
        codeType: {
          codeType: 'code_notice'
        },
        showCaptcha: true,
        isNext: false,
        count: '',
        time: null,
        oldPhone: Cookies.get('mobile').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
        bindPhoneForm: {
          phone: Cookies.get('mobile'),
          phone2: '',
          captcha: ''
        },
        bindPhoneRules: {
          phone: [{ required: true, trigger: 'blur', validator: validatePhoneNum }],
          phone2: [{ required: true, trigger: 'blur', validator: validatePhoneNum2 }],
          captcha: [{ required: true, trigger: 'blur', validator: captcha }]
        }
      }
    },
    components: { TopBar, Captcha },
    methods: {
      submitNext2() {
        if (this.active++ > 2) this.active = 0
      },
      submitNext() {
        validateCode(this.bindPhoneForm.phone, this.bindPhoneForm.captcha, this.codeType.codeType).then((response) => {
          this.loading = false
          this.bindPhoneForm.captcha = ''
          if (response.data === true) {
            this.isNext = true
            if (this.active++ > 2) this.active = 0
          } else {
            this.$message.error('验证码错误')
          }
        }).catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
      },
      submitbindPhone() {
        this.$refs.bindPhoneForm.validate(valid => {
          if (valid) {
            this.loading = true
            console.log(valid)
            console.log(this.bindPhoneForm)
            bindMobile(this.bindPhoneForm.phone2, this.bindPhoneForm.captcha, this.codeType.codeType, this.uid).then((response) => {
              console.log(response)
              this.loading = false
              this.$message.success('修改成功')
              this.$router.back(-1)
            }).catch(error => {
              console.log(error)
              this.loading = false
              this.$message.success(error.msg)
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
