<template>
  <div class="info-container">
    <div class="head">
      <div class="title-top"><span>基本信息</span></div>
      <div class="avatar-box">
        <div class="avatar">
          <!-- <my-upload field="file"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="100"
            :height="100"
            :url="addLogo"
            :headers="headers"
            img-format="png"></my-upload> -->
          <uploadImg :show="show" @hideUpload="toggleShow" @uploadSuc="cropUploadSuccess"></uploadImg>
          <img :src="logo? imgDataUrl : defaultImg" alt="点击上传">
          <a class="btn" @click="toggleShow">
            修改头像
          </a>
        </div>
        <div class="info">
          <ul>
            <li><span>登录账号：</span>{{account}}</li>
            <li class="set ">
              <span>认证状态：</span>
              <span class="auth">
                <span :class="certify">{{certify | certifyStatus}}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>


    </div>
    <div class="list-container">
      <!--<el-row class="info-list" >-->
      <!--<el-col :span="4" class="info-title">您当前的账号安全程度</el-col>-->
      <!--<el-col  style="width: 200px;"><el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success" ></el-progress></el-col>-->
      <!--<el-col :span="2" ><div class="account-safe"><span>安全级别：<span class="high">高</span></span></div></el-col>-->
      <!--</el-row>-->
      <el-row class="info-list" >
        <el-col :span="2" class="info-title">登录密码</el-col>
        <el-col :span="18">安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。</el-col>
        <Set :setStatus="true" :setType="'loginpass'"></Set>
      </el-row>
      <el-row class="info-list" >
        <el-col :span="2" class="info-title">邮箱绑定</el-col>
        <el-col :span="18">{{email ? email :'绑定邮箱后，可以找回密码，但不能用于登录'}}</el-col>
        <Set :setStatus="email" :setType="'email'"></Set>
      </el-row>
      <el-row class="info-list" >
        <el-col :span="2" class="info-title">手机号码</el-col>
        <el-col :span="18">{{mobile ? `您已绑定了手机${mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")}` : `绑定手机后，可以找回密码，但不能用于登录。`}}</el-col>
        <Set :setStatus="mobile" :setType="'mobile'"></Set>
      </el-row>
      <el-row class="info-list" >
        <el-col :span="2" class="info-title">支付密码</el-col>
        <el-col :span="18">{{paypass ? '已设置':'未设置'}}</el-col>
        <Set :setStatus="paypass" :setType="'paypass'"></Set>
      </el-row>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Set from './Set.vue'
  import { addLogo, updateLogo } from '@/api/info'
  // import myUpload from 'vue-image-crop-upload'
  import { Message } from 'element-ui'
  import { getToken } from '@/utils/auth'
  import uploadImg from '@/components/Upload'
  export default {
    computed: {
      ...mapGetters([
        'tid',
        'email',
        'mobile',
        'name',
        'contact',
        'paypass',
        'certify',
        'account',
        'logo'
      ])
    },
    data() {
      return {
        show: false,
        defaultImg: './static/menuHead.png',
        headers: {
          authorization: `bearer ${getToken()}`
        },
        addLogo,
        imgDataUrl: process.env.IMG_API
      }
    },
    created() {
      this.$store.dispatch('GetUserDetail', this.tid).then(() => {
        this.loading = false
        this.imgDataUrl = this.imgDataUrl + this.logo
      }).catch(() => {
        this.loading = false
      })
    },
    methods: {
      toggleShow() {
        this.show = !this.show
      },
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------')
        this.imgDataUrl = imgDataUrl
      },
      cropUploadSuccess(jsonData, field) {
        console.log('-------- upload success --------')
        console.log(jsonData)
        this.imgDataUrl = process.env.IMG_API + jsonData.data.url
        this.show = !this.show
        Message.success('头像修改成功')
        console.log('field: ' + field)
        updateLogo(jsonData.data.url, this.tid).then(() => {
          this.loading = false
        }).catch(error => {
          this.loading = false
          console.log(error)
        })
      },
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------')
        console.log(status)
        Message.error('头像修改失败')
        console.log('field: ' + field)
      }
    },
    components: {
      Set,
      // 'my-upload': myUpload,
      uploadImg
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  $warnColor:#F90;
  $linkColor:#409EFF;
  $successColor:#67C23A;
  $borderColor:#eee;
  .avatar-box{
    display: flex;
    padding-top: 20px;
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
  .auth{
    span{
      font-size: 12px;
      &.uncertified{
        color: #999;
        &:after{
          content: '未认证';
        }
      }
      &.auditing{
        color: #FD872B;
        &:after{
          content: '审核中';
        }
      }
      &.failure{
        color: #E72626;
        &:after{
          content: '审核失败';
        }
      }
      &.certified{
        color: #269CE7;
        &:before{
          content: '已认证';
        }
      }
    }
  }

  .avatar {
    width: 178px;
    display: block;
    text-align: center;
  }
  .title-top{
    border-bottom: 1px solid $borderColor;
    margin-left: 15px;

    span{
      border-left: 2px solid $linkColor;
      line-height: 3;
      padding-left: 5px;
    }
  }
  .high{
    color: $warnColor;
  }

  .info-list{
    border-bottom: 1px dashed  #DCDFE6;
    padding: 20px 0;
  }
  .info-title{
    font-weight: bold;

  }
  .info-container{
    margin: 20px;
    background: #fff;
    border: 1px solid $borderColor;
  }
  .list-container{
    padding: 30px;
    margin: 20px;
    border-top: 1px solid $borderColor;
  }
  .account-safe{
    display: inline-block;
    position: relative;
    left: 20px;
  }
  .set{
    color: $successColor;
    display: inline-block;
    margin-right: 20px;
    i{
      font-style: normal;
      padding-right: 8px;
    }
  }
  .unset{
    color: $warnColor;
  }
  .change{
    color: $linkColor;
    cursor: pointer;
    display: inline-block;
    &:hover{
      text-decoration: underline;
    }

  }
  a{
    color: $linkColor;
    display: block;
  }
  .head{
    margin-top: 10px;
    display: block;
    .avatar{
      img{
        border-radius: 50%;
        width: 120px;
        height: 120px;
        margin-bottom: 10px;
      }
    }
    .info{
      ul{
        padding-top: 20px;
        li{
          display: block;
          margin-right: 20px;
          span{
            color:#909399;
          }
          padding: 10px;
        }
      }
    }
  }

</style>
