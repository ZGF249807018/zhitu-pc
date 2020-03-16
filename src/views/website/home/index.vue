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
      <!-- <img src="../img/industry-bg.png" /> -->
      <div class="industry-bg-list">
        <div class="industry-img-box">
          <img src="../img/industry-first-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">交通运输行业</p>
            <p class="industry-content-text">交通运输行业客、货运安全的关键因素是司机，其驾驶行为将直接关系到货物或乘客的生命财产安全，通过历史重大交通事故数据分析，除超速、疲劳驾驶外、无证驾驶也是导致交通事故的重要原因之一，提供针对交通运输行业的背景核查方案。推荐项目：身份信息核实、驾驶证信息核查、驾驶员累计扣分查询、社会不良信息核查。</p>
          </div>
        </div>
        <div class="industry-img-box">
          <img src="../img/industry-two-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">家政行业</p>
            <p class="industry-content-text">社会经济的发展，让保姆、月嫂、护理工、幼教等工种逐渐普及到普通家庭，用工安全尤为重要，根据该岗位需求，我们为家政行业制定了针对性的背景核实方案。推荐项目：身份信息核实、金融风险核查、社会不良信息核查。</p>
          </div>
        </div>
        <div class="industry-img-box">
          <img src="../img/industry-three-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">IT/互联网/高科技</p>
            <p class="industry-content-text">TMT行业，对员工的专业能力、敬业精神具有更高的要求，同时确保信息安全、核心技术不被泄露至关重要。 推荐项目：身份信息核实、金融风险核查、社会不良信息核查、教育背景、法院失信被执行人信息、个人工商（投资、任职、法人）信息、工作履历核实、工作表现核实</p>
          </div>
        </div>
      </div>
      <div class="industry-bg-list">
        <div class="industry-img-box">
          <img src="../img/industry-four-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">金融行业</p>
            <p class="industry-content-text">基于金融行业的监管需求和高风险属性，大部分工作岗位会受到严格管控，所以在背景核实中，对金融从业者的职业操守和专业性具有极高的要求，推荐项目：身份信息核实、金融风险核查、金融违规核查、社会不良信息核查、法院失信被执行人信息、教育背景、执业资格、个人工商（投资、任职、法人）信息、工作履历核实、工作表现核实</p>
          </div>
        </div>
        <div class="industry-img-box">
          <img src="../img/industry-five-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">医药/医疗/保健</p>
            <p class="industry-content-text">近年随着社会经济体制的变化和医疗行业的发展， 医疗领域各专业人才市场的竞争日趋激烈、对医护人员等各专业人才提出了更高的要求，我们可针对不同专业人才做定制化的背景核查方案。</p>
          </div>
        </div>
        <div class="industry-img-box">
          <img src="../img/industry-six-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">工业／制造</p>
            <p class="industry-content-text">工业制造是国家的支柱产业之一、近年随着“中国制造”的升级发展，人才的竞争日趋激烈，针对不同的专业人才需求提供高效实时的背景核实方案，助力企业招聘决策，规避用工风险同时快速纳入贤才。</p>
          </div>
        </div>
      </div>
      <div class="industry-bg-list">
        <div class="industry-img-box">
          <img src="../img/industry-seven-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">劳务派遣／任务外包</p>
            <p class="industry-content-text">近年劳务派遣、任务外包人口呈快速增长趋势，用工单位或企业的需求标准也将逐渐提高。针对不同平台不同专业的人才，我们均可为您提供匹配的背景核查方案。</p>
          </div>
        </div>
        <div class="industry-img-box">
          <img src="../img/industry-eight-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">房地产/建筑设计</p>
            <p class="industry-content-text">房地产/建筑设计的中高端人才薪酬水平较高，且一般会授权独立负责项目，招错一个人的成本是高昂的，而中低端岗位的需求巨大且流动性强，不同的岗位执行针对性的背景核实方案，对招到对的人和保持团队稳定性非常重要。</p>
          </div>
        </div>
        <div class="industry-img-box">
          <img src="../img/industry-nine-bg.png" class="industry-bg-img" />
          <div class="industry-content-box">
            <p class="industry-content-title">其它行业</p>
            <p class="industry-content-text">各行各业，提高用人标准，招到“对的”人，促进企业更好发展和规避企业风险是企业永恒不变的话题， 反之，招错一个人的代价往往是很大的。针对各行各业和不同的岗位，我们出具与之匹配的背景核实方案，助力企业做好人才风控。</p>
          </div>
        </div>
      </div>
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
      padding-bottom: 90px;
      background: rgba(243, 247, 250, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      .home-industry-title{
        color: rgba(51, 51, 51, 1);
        font-size: 36px;
        padding: 70px 0 50px 0;
      }
      .industry-bg-list{
        display: flex;
        flex-direction: row;
        width: 1200px;
      }
      .industry-bg-list + .industry-bg-list{
        margin-top: 18px;
      }
      .industry-img-box + .industry-img-box{
        margin-left: 18px;
      }
      .industry-img-box{
        width: 388px;
        height: 260px;
        position: relative;
      }
      .industry-img-box:hover{
        .industry-content-box{
          width: 388px;
          height: 260px;
          padding: 30px;
          transition: all 0.5s ease-in;
        }
      }
      .industry-content-box{
        width: 0;
        height: 0;
        position: absolute;
        text-align: center;
        background: #fff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        top: 0;
        left: 0;
      }
      .industry-content-title{
        font-size: 28px;
        color: #333;
      }
      .industry-content-text{
        font-size: 14px;
        line-height: 24px;
        color: #666;
        margin-top: 10px;
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