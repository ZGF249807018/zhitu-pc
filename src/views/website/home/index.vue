<template>
  <div class="home-container">
    <!-- <baidu-map class="baidu-map" :zoom="zoom" :center="center">
    </baidu-map> -->
    <Header :navPath="navPath"></Header>
    <div class="home-banner-list">
      <el-carousel>
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <img src="../img/banner-bg-one.png" class="header-banner-img" v-if="index === 0">
          <img src="../img/banner-bg-two.png" class="header-banner-img" v-else-if="index === 1">
          <img src="../img/banner-bg-three.png" class="header-banner-img" v-else>
          <p class="banner-list-title">{{item.title}}</p>
          <div class="banner-list-box">
            <div class="banner-list-register" @click="linkTo('/register')">免费注册</div>
            <div class="banner-list-login" @click="linkTo('/login')">立即体验</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-introduce">
      <p class="home-introduce-title">专业、高效的雇佣风险管理平台</p>
      <p class="home-introduce-tip">国家官方权威数据源+专业背调顾问团队</p>
      <p class="home-introduce-tip">帮助企业防范因履历防范因履历造假而导致的胜任力风险；防止企业遭受商业欺诈、法律风险；降低雇佣成本</p>
      <div class="home-introduce-content">
        <img src="../img/introduce-img-one.png" />
        <img src="../img/introduce-img-two.png" />
        <img src="../img/introduce-img-three.png" />
        <img src="../img/introduce-img-four.png" />
      </div>
    </div>
    <div class="home-advantage">
      <p class="home-advantage-title">我的优势</p>
      <img src="../img/advantage-bg.png" class="home-advantage-img" />
    </div>
    <div class="home-industry">
      <p class="home-industry-title">匹配您的行业</p>
      <img src="../img/industry-bg.png" />
    </div>
    <div class="home-partner">
      <p class="home-partner-title">部分合作伙伴</p>
      <img src="../img/partner-bg.png" />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  export default {
    name: 'home',
    components: { 
      Header,
      Footer
    },
    data() {
      return {
        zoom: '20',
        center: {lng: 120.0119156216, lat: 30.2992281162},
        bannerList: [
          {
            imgUrl: '../img/banner-bg-one.png',
            title: '职兔背调，中国领先的职业背景调查平台'
          },
          {
            imgUrl: '../img/banner-bg-two.png',
            title: '全方位背景调查   客观精准'
          },
          {
            imgUrl: '../img/banner-bg-three.png',
            title: '还原履历真像   助力企业防范雇佣风险'
          }
        ],
        navPath: 'home'
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      linkTo (path) {
        this.$router.push({path: path})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .home-container {
    background: #f5f5f5;
    min-width: 1200px;
    .baidu-map{
      width: 500px;
      height: 500px;
    }
    .home-banner-list{
      position: relative;
      .el-carousel{
        height: 760px!important;
      }
      .el-carousel__container{
        height: 760px!important;
        height: auto;
      }
      .header-banner-img{
        width: 1920px;
        height: 760px;
      }
      .banner-list-title{
        position: absolute;
        top: 250px;
        width: 100%;
        text-align: center;
        font-size: 52px;
        color: #fff;
      }
      .banner-list-box{
        position: absolute;
        top: 410px;
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        .banner-list-register{
          width: 180px;
          height: 48px;
          line-height: 48px;
          font-size: 18px;
          color: #fff;
          background: #0773FF;
          border: 4px;
          cursor: pointer;
        }
        .banner-list-login{
          width: 180px;
          height: 48px;
          line-height: 48px;
          font-size: 18px;
          color: #fff;
          background: #2A2344;
          border: 1px solid rgba(255,255,255,1);
          border: 4px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
    .home-introduce{
      width: 100%;
      height: 640px;
      background: rgba(243, 247, 250, 1);
      text-align: center;
      .home-introduce-title{
        font-size: 36px;
        color: rgba(51, 51, 51, 1);
        padding: 70px 0 15px;
      }
      .home-introduce-tip{
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
        line-height: 24px;
      }
      .home-introduce-content{
        margin-top: 70px;
      }
    }
    .home-advantage{
      width: 100%;
      height: 574px;
      background: rgba(255, 255, 255, 1);
      overflow: hidden;
      text-align: center;
      .home-advantage-title{
        font-size: 36px;
        color: rgba(51, 51, 51, 1);
        padding: 70px 0 80px 0;
      }
      .home-advantage-img{
        margin-left: 70px;
      }
    }
    .home-industry{
      width: 100%;
      height: 1086px;
      background: rgba(243, 247, 250, 1);
      text-align: center;
      .home-industry-title{
        color: rgba(51, 51, 51, 1);
        font-size: 36px;
        padding: 70px 0 50px 0;
      }
    }
    .home-partner{
      width: 100%;
      height: 520px;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      .home-partner-title{
        color: rgba(51, 51, 51, 1);
        font-size: 36px;
        padding: 70px 0 80px 0;
      }
    }
  }
</style>