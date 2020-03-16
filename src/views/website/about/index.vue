<template>
  <div class="about-container">
    <!-- <baidu-map class="baidu-map" :zoom="zoom" :center="center">
    </baidu-map> -->
    <Header :navPath="navPath"></Header>
    <div class="about-header">
      <img src="../img/about-bg.png" class="about-header-img">
    </div>
    <div class="about-content">
      <div class="about-content-list">
        <p class="about-title">我们是谁？</p>
        <div class="about-content-box">
          <img src="../img/about-us-bg.png" class="about-us-img">
          <div class="content-box-right">
            <p class="about-text">杭州数脉科技有限公司成立于2016年12月，公司旗下产品职兔背调，是大数据与职业征信相结合的创新型人力资源职业背景调查平台，职兔背调总部位于杭州，在上海、武汉等地设有分支机构，迄今为止已经服务近5000家企业及10万名候选人。</p>
            <p class="about-text">职兔背调核心团队主要来自阿里、华为的技术精英和人力资源机构资深人士等，公司坚持客户第一的服务理念，不断完善产品，提升服务质量，致力于为企业人力资源风控保驾护航。</p>
          </div>
        </div>
      </div>
      <div class="about-content-list">
        <p class="about-title">企业文化</p>
        <div class="about-culture-box">
          <img src="../img/about-culture-logo.png" class="about-culture-img">
          <div class="content-box-right">
            <div class="content-box-list">
              <img src="../img/about-vision-icon.png" class="about-culture-icon">
              <div class="box-list-right">
                <p class="about-culture-title">愿景</p>
                <p class="about-culture-text">成为一家专业职业征信机构,让企业雇佣风控更智能</p>
              </div>
            </div>
            <div class="content-box-list">
              <img src="../img/about-mission-icon.png" class="about-culture-icon">
              <div class="box-list-right">
                <p class="about-culture-title">使命</p>
                <p class="about-culture-text">让信用职场诚信变得简单而美好</p>
              </div>
            </div>
            <div class="content-box-list">
              <img src="../img/about-worth-icon.png" class="about-culture-icon">
              <div class="box-list-right">
                <p class="about-culture-title">价值观</p>
                <p class="about-culture-text">客户第一    团队协作    诚实守信    专业敬业</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  export default {
    name: 'about',
    components: { 
      Header,
      Footer
    },
    data() {
      return {
        navPath: 'about'
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
  .about-container {
    background: #f5f5f5;
    min-width: 1200px;
    .about-header-img{
      width: 100%;
    }
    .about-content-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 70px;
    }
    .about-content-list:first-child{
      background: #fff;
    }
    .about-title{
      color: #333;
      font-size: 36px;
      margin-top: 70px;
    }
    .about-content-box{
      width: 1000px;
      display: flex;
      margin-top: 100px;
    }
    .about-culture-box{
      display: flex;
      margin-top: 100px;
      .content-box-right{
        padding-top: 80px;
      }
    }
    .about-us-img{
      width: 410px;
    }
    .about-culture-img{
      width: 749px;
      height: 589px;
    }
    .content-box-right{
      flex: 1;
      margin-left: 80px;
    }
    .about-text{
      color: #333;
      font-size: 15px;
      margin-top: 15px;
      line-height: 28px;
    }
    .content-box-list{
      display: flex;
    }
    .content-box-list + .content-box-list{
      margin-top: 60px;
    }
    .about-culture-icon{
      width: 80px;
      height: 80px;
    }
    .box-list-right{
      margin-left: 30px;
    }
    .about-culture-title{
      color: #333;
      font-size: 20px;
      line-height: 36px;
    }
    .about-culture-text{
      color: #666;
      font-size: 18px;
      margin-top: 10px;
    }
  }
</style>