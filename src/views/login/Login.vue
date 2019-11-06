 <template>
  <div class="login-container login-bg loginBox">
      <top-bar></top-bar>
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="left">
          <img src="../../assets/images/login-bg.jpg" alt="">
        </div>
        <div class="right">
          <h3 class="title">登录</h3>
          <el-form-item prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="off"   placeholder="请输入手机号/邮箱/账号ID"><template slot="prepend"><i class="icon iconfont input-icon icon-rencai"></i></template></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password"  @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" type="password" placeholder="密码"><template slot="prepend"><i class="icon iconfont input-icon icon-ai-password"></i></template></el-input>
          </el-form-item>
          <div class="back-password">
            <div class="fl"><el-checkbox v-model="checked" ><span class="mini-text">记住密码</span></el-checkbox></div>
            <div class="back-password-btn fr"> <router-link to="/backpwd"><span class="main-text">忘记密码？</span></router-link></div>
          </div>
          <el-form-item class="login-btn">
            <el-button type="primary"  :loading="loading" @click.native.prevent="handleLogin" class="brs">
              登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <div class="tc register">
              <router-link to="/register" class="link">注册</router-link>
            </div>
          </el-form-item>
        </div>
      </el-form>
  </div>
</template>

<script>
  import TopBar from '@/components//Topmenu/index'
  import { checkInputAccount, checkInputPass } from '@/utils/check/index'
  import { mapGetters } from 'vuex'
export default {
    name: 'Login',
    computed: {
      ...mapGetters([
        'savePassword'
      ])
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        checkInputAccount(value, callback, '', false)
      }
      const validatePass = (rule, value, callback) => {
        checkInputPass(value, callback)
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    components: { TopBar },
    created() {
      const loading = document.getElementById('Loading')
      if (loading !== null) {
        document.getElementById('app').removeChild(loading)
      }
    },
    methods: {
      registerBtn() {
        this.$router.push({ path: '/register' })
      },
      handleLogin() {
        this.loading = true
        console.log(this.loginForm)
        if (this.checked) {
          this.$store.commit('SET_SAVEPASSWORD', true)
        } else {
          this.$store.commit('SET_SAVEPASSWORD', false)
        }
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = false
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.$router.push({ path: '/' })
              // location.reload()
            }).catch((error) => {
              this.$message.error(error.msg)
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

 <style rel="stylesheet/scss" lang="scss">


 </style>

