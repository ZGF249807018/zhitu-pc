<template xmlns="http://www.w3.org/1999/html">
    <div class="send-captcha"><img :src=imgCodes alt="验证码" @click="getImgCode" ref="codeImg" id="imgCode"><div v-show="!imgCodeStatus" @click="getImgCode2" class="red">验证码失效 <br>请点击刷新</div></div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { img_code } from '@/api/login'
  export default {
    name: 'ImgCode',
    computed: {
      ...mapGetters([
        'imgCodeStatus'
      ])
    },
    data() {
      return {
        imgCodes: img_code
      }
    },
    methods: {
      getImgCode() {
        document.getElementById('imgCode').src = this.imgCodes
        this.$store.commit('SET_IMGCODESTATUS', true)
      },
      getImgCode2() {
        this.getImgCode()
        this.$store.commit('SET_IMGCODESTATUS', true)
      }
    }
  }
</script>

<style scoped>
.red{
  position: relative;
  left: 123px;
  top: -47px;
  line-height: 1.4;
  cursor: default;
}
</style>
