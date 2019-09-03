<template>
  <div class="container">

    <button
      @click="auth"
      :disabled="certify == 1 || certify == 3"
      class="authStatus"
    >
      <div class="icon iconfont icon-qiyerenzheng"></div>
      <div class="info">
        <span class="t1">企业认证</span>
        <span class="t2">（包含企业、政府、事业单位、团体、组织）</span>
        <span  :class="[ 't3-'+certify ]" >{{certify | certifyStatus}}</span>
      </div>
    </button>

  </div>

</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'certify'
      ])
    },
    data() {
      return {
      }
    },
    methods: {
      auth() {
          this.$router.push({ path : 'authForm' })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .authStatus{
    width: 490px;
    height: 210px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border: 1px solid #efefef;
    overflow: hidden;
    .iconfont{
      font-size: 100px;
      background: #2366fd;
      color: #fff;
      height: 210px;
      width: 210px;
      line-height: 193px;
      text-align: center;
    }
    .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #fff;
      height: 210px;
      width: 278px;
      padding-left: 20px;
      padding-right: 15px;
      position: relative;
      .t1{
        font-size: 30px;
        display: block;
        padding-bottom: 15px;
        font-weight: bold;
      }
      .t2{
        font-size: 17px;
        color: #999;
      }
      @mixin  t-right {
        transform: rotate(45deg);
        position: absolute;
        right: -50px;
        top: -50px;
        width: 100px;
        display: block;
        height: 100px;
        overflow: hidden;
        color: #fff;
        padding-left: 5px;
        padding-top: 76px;
      }
      .t3-3{
        background: #c2c2c2;
       @include t-right
      }
      .t3-0,.t3-1 {
        background: #ffa200;
        @include t-right
      }
      .t3-2{
        background: #ff0000;
        @include t-right
      }
    }
  }
  .container{
    width: 100%;
    button{
      margin: 30px 0 30px 100px;
    }
  }
  .t3-0, .t3-1, .t3-2, .t3-3{
    font-size: 16px;
    position: relative;
    top: 14px;
  }
  .t3-3{

  }
</style>
