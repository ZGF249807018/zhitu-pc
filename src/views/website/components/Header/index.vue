<template>
  <div class="header-container">
    <!-- <baidu-map class="baidu-map" :zoom="zoom" :center="center">
    </baidu-map> -->
    <div class="header-content">
      <img src="../../img/header-logo.png" class="header-logo">
      <ul class="header-ul">
        <li v-bind:class="navPath === 'home' ? 'header-li active-header-li' :  'header-li'" @click="linkTo('/home')">首页</li>
        <li v-bind:class="navPath === 'product' ? 'header-li active-header-li' :  'header-li'" @click="linkTo('/product')">产品与服务</li>
        <li v-bind:class="navPath === 'about' ? 'header-li active-header-li' :  'header-li'" @click="linkTo('/about')">关于我们</li>
        <li v-bind:class="navPath === 'develop' ? 'header-li active-header-li' :  'header-li'" @click="linkTo('/develop')">合作与发展</li>
      </ul>
      <div class="header-phone">
        <img src="../../img/header-phone.png" class="header-phone-icon">
        <p class="header-phone-number">0571-59020021</p>
      </div>
      <div class="header-btn-list">
        <div class="header-login-btn" @click="linkTo('/login')">登录</div>
        <div class="header-register-btn"  @click="linkTo('/register')">注册</div>
      </div>
      <div class="header-language-list">
        <div class="header-language-active">中文</div>
        <span class="header-cut">|</span>
        <div class="header-language-normal">EN</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'h',
    data() {
      return {
        zoom: '20',
        center: {lng: 120.0119156216, lat: 30.2992281162}
      }
    },
    props: [
      'navPath'
    ],
    created() {
    },
    mounted() {
      console.log(this.navPath)
    },
    methods: {
      linkTo (path) {
        this.$router.push({path: path})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .header-container {
    .header-content{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 90px;
      min-width: 1200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-top: 14px;
      // background: url('../../img/header-bg.png') no-repeat;
      .header-logo{
        width: 175px;
        height: 72px;
      }
      .header-ul{
        display: flex;
        flex-direction: row;
        margin-left: 55px;
        color: #fff;
        font-size: 16px;
        .header-li{
          padding-bottom: 8px;
        }
        .header-li + .header-li{
          margin-left: 30px;
        }
        .active-header-li {
          border-bottom: 2px solid #fff;
        }
      }
      .header-phone{
        display: flex;
        flex-direction: row;
        margin-left: 100px;
        .header-phone-icon{
          width: 20px;
          height: 20px;
        }
        .header-phone-number{
          font-size: 20px;
          color: #fff;
          margin-left: 5px;
        }
      }
      .header-btn-list{
        display: flex;
        flex-direction: row;
        margin-left: 30px;
        width: 208px;
        height: 40px;
        .header-login-btn{
          width: 104px;
          height: 40px;
          line-height: 40px;
          background: #0773FF;
          font-size: 16px;
          color: #fff;
          border-radius: 20px 0 0 20px;
          text-align: center;
          cursor: pointer;
        }
        .header-register-btn{
          width: 104px;
          height: 40px;
          line-height: 40px;
          background: rgba(242, 242, 242, 1);
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          border-radius: 0 20px 20px 0;
          text-align: center;
          cursor: pointer;
        }
      }
      .header-language-list{
        display: flex;
        flex-direction: row;
        margin-left: 30px;
        .header-language-active{
          color: rgba(170, 205, 6, 1);
        }
        .header-cut{
          margin: 0 10px;
          color: #f5f5f5;
        }
        .header-language-normal{
          color: #fff;
        }
      }
    }
  }
</style>