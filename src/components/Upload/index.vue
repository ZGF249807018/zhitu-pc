<template>
  <div class="image-upload" v-show='show'>
    <div class="vicp-wrap">
      <div class="vicp-close" @click="toggleShow">
        <i class="vicp-icon4"></i>
      </div>
      <div class="vicp-step1">
        <div class="vicp-drop-area">
          <el-upload
            class="avatar-uploader"
            drag
            :action="addLogo"
            :headers="headers"
            :show-file-list="false"
            :before-upload='beforeAvatarUpload'
            :on-success="cropUploadSuccess"
            :on-error="cropUploadFail">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过4Mb</div>
          </el-upload>
        </div>
        <div class="vicp-operate" @click="toggleShow">
          <a>取消<span class="e-ripple z-active" style="width: 100px; height: 100px; top: -47px; left: -7px; background-color: rgba(0, 0, 0, 0.15);"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addLogo } from '@/api/info'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
export default {
  props: {
    show: {
      type: String,
      default: false
    }
  },
  data () {
    return {
      addLogo,
      headers: {
        authorization: `bearer ${getToken()}`
      },
    }
  },
  methods: {
    /* 判断图片类型和限制图片大小 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt4M = file.size / 1024 / 1024 < 4

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return isLt4M && isJPG || isPNG
    },
    /* 上传图片成功 */
    cropUploadSuccess(jsonData, field) {
      this.$emit('uploadSuc', jsonData, field)
    },
    /* 上传图片失败 */
    cropUploadFail(status, field) {
      Message.error('头像修改失败')
    },
    /* 隐藏上传弹窗 */
    toggleShow () {
      this.$emit('hideUpload')
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes vicp {
    0% {
      opacity: 0;
      -webkit-transform: scale(0) translatey(-60px);
              transform: scale(0) translatey(-60px);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1) translatey(0);
              transform: scale(1) translatey(0);
    }
  }
  .image-upload{
    position: fixed;
    display: block;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    z-index: 10000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    -webkit-tap-highlight-color: transparent;
    -moz-tap-highlight-color: transparent;
    .vicp-wrap {
      -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
      position: fixed;
      display: block;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      z-index: 10000;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 600px;
      height: 330px;
      padding: 25px;
      background-color: #fff;
      border-radius: 2px;
      text-align: center;
      -webkit-animation: vicp 0.12s ease-in;
              animation: vicp 0.12s ease-in;
      .vicp-close {
        position: absolute;
        right: -30px;
        top: -30px;
        .vicp-icon4 {
          position: relative;
          display: block;
          width: 30px;
          height: 30px;
          cursor: pointer;
          -webkit-transition: -webkit-transform 0.18s;
          transition: -webkit-transform 0.18s;
          transition: transform 0.18s;
          transition: transform 0.18s, -webkit-transform 0.18s;
          -webkit-transform: rotate(0);
                  transform: rotate(0);
          &::after,&::before{
            -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
            content: '';
            position: absolute;
            top: 12px;
            left: 4px;
            width: 20px;
            height: 3px;
            -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
            background-color: #fff;
          }
          &::after{
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }
          &:hover {
            -webkit-transform: rotate(90deg);
                    transform: rotate(90deg);
          }
        }
      }
      .vicp-operate {
        position: absolute;
        right: 20px;
        bottom: 20px;
        a {
          position: relative;
          float: left;
          display: block;
          margin-left: 10px;
          width: 100px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          color: #4a7;
          border-radius: 2px;
          overflow: hidden;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
          &:hover {
            background-color: rgba(0, 0, 0, 0.03);
          }
        }
      }
    }
  }
</style>
