<template>
  <div class="container">
        <el-form label-width="150px" class="auth-form" :model="authForm" :rules="authRules" ref="authForm">
          <el-form-item label="企业名称：" prop="company">
            <el-input class="auth-input" placeholder="请填写与营业执照一致的合法公司全称" v-model="authForm.company"></el-input>
          </el-form-item>
          <el-form-item label="社会信用代码：" prop="creditCode">
            <el-input class="auth-input" placeholder="社会信用代码格式为：18位字母加数字" v-model="authForm.creditCode"  maxlength="18"></el-input>
          </el-form-item>
          <uploadImg :show="show" @hideUpload="toggleShow" @uploadSuc="cropUploadSuccess"></uploadImg>
          <el-form-item label="营业执照：" prop="businessLic">
            <a class="btn" @click="toggleShow"><img class="upload-img" :src="imgDataUrl + ''" alt="点击上传" ></a>
            <el-form-item prop="businessLic" >
              <el-input v-model="authForm.businessLic" class="businessLic" style="display: none;" ></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="企业联系人姓名：" prop="contactName">
            <el-input class="auth-input" placeholder="请填写企业联系人姓名" v-model="authForm.contactName"></el-input>
          </el-form-item>
          <el-form-item label="企业地址：" prop="address">
            <el-input class="auth-input" placeholder="请填写企业地址" v-model="authForm.address"></el-input>
          </el-form-item>
          <el-form-item label="企业邮箱：" prop="email">
            <el-input class="auth-input" placeholder="请填写企业邮箱" v-model="authForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click.native.prevent="submitAuthForm"  class="send-btn">提交</el-button>
          </el-form-item>
        </el-form>
  </div>

</template>
<script>
  import { addLogo } from '@/api/info'
  import { mapGetters } from 'vuex'
  // import myUpload from 'vue-image-crop-upload'
  import { Message } from 'element-ui'
  import { getToken } from '@/utils/auth'
  import { certificate } from '@/api/info'
  import { checkInputEmail, checkInputCreditCode, checkInputRegistrationNum, checkInputOrgNum } from '@/utils/check/index'
  import uploadImg from '@/components/Upload'
  export default {
    computed: {
      ...mapGetters([
        'tid',
        'logo'
      ])
    },
    data() {
      const validateCreditCode = (rule, value, callback) => {
        checkInputCreditCode(value, callback)
      }
      const validateRegistrationNum = (rule, value, callback) => {
        checkInputRegistrationNum(value, callback)
      }
      const validateEmail = (rule, value, callback) => {
        checkInputEmail(value, callback)
      }
      const validateOrgNum = (rule, value, callback) => {
        checkInputOrgNum(value, callback)
      }
      return {
        imageUrl: '',
        loading: false,
        show: false,
        businessLicStatus: false,
        addLogo,
        imgDataUrl: './static/upload.png',
        headers: {
          authorization: `bearer ${getToken()}`
        },
        defaultImg: './static/upload.png',
        authForm: {
          id: '',
          company: '',
          creditCode: '',
          contactName: '',
          email: '',
          address: '',
          // orgCode: '',
          businessLic: ''
          // registrationNum: ''
        },
        authRules: {
          name: [{ required: true, message: '请输入企业联系人姓名', trigger: 'blur' }],
          company: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
          contactName: [{ required: true, message: '请输入企业联系人姓名', trigger: 'blur' }],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          creditCode: [{ required: true, trigger: 'blur', validator: validateCreditCode }],
          orgCode: [{ required: true, trigger: 'blur', validator: validateOrgNum }],
          registrationNum: [{ required: true, trigger: 'blur', validator: validateRegistrationNum }],
          address: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
          businessLic: [{ required: true, message: '请上传营业执照', trigger: 'blur' }]
        }
      }
    },
    methods: {
      toggleShow() {
        this.show = !this.show
      },
      cropSuccess(imgDataUrl, field) {
        this.imgDataUrl = imgDataUrl
      },
      cropUploadSuccess(jsonData, field) {
        this.imgDataUrl = process.env.IMG_API + jsonData.data.url
        this.authForm.businessLic = jsonData.data.url
        this.show = !this.show
        Message.success('头像修改成功')
      },
      cropUploadFail(status, field) {
        Message.error('头像修改失败')
      },
      submitAuthForm() {
        this.$refs.authForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.authForm.id = this.tid
            certificate(this.authForm).then((response) => {
              this.loading = false
              Message.success('提交成功')
              this.$store.commit('SET_CERTIFY', 1)
              this.$router.back(-1)
            }).catch(error => {
              Message.error(error.msg)
              this.loading = false
            })
          } else {
            this.loading = false
            return false
          }
        })
      }
    },
    components: {
      uploadImg
      // 'my-upload': myUpload
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container{
    position: relative;
  }
  .title{
    position: absolute;
    top: 44px;
    left: 93px;
  }
  .auth-form{
    margin-top: 20px;
  }
  .auth-input{
    width: 300px;
    height: 28px;
  }
  .businessLic{
    width: 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload-img{
    max-width: 500px;
  }
</style>
