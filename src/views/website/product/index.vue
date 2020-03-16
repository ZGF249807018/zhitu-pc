<template>
  <div class="product-container">
    <!-- <baidu-map class="baidu-map" :zoom="zoom" :center="center">
    </baidu-map> -->
    <Header :navPath="navPath"></Header>
    <div class="product-header">
        <img src="../img/product-bg.png" class="product-header-img">
    </div>
    <div class="product-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="产品与服务" name="first">
          <div class="first-tab-container">
            <div class="package-content">
              <p class="package-content-title">产品套餐介绍</p>
              <div class="package-list">
                <div class="package-item">
                  <div class="package-item-header">
                    <p class="package-item-title">极速版A</p>
                    <p class="package-item-tip">授权后秒出报告</p>
                    <p class="package-item-tip">5个维度背调项目</p>
                  </div>
                  <div class="package-item-content">
                    <p class="package-item-list">身份证实名认证</p>
                    <p class="package-item-list">手机实名认证</p>
                    <p class="package-item-list">手机运营商信息</p>
                    <p class="package-item-list">社会负面记录</p>
                    <p class="package-item-list">金融风险信息</p>
                  </div>
                  <el-button class="package-item-btn" @click="linkTo('/login')">立即背调</el-button>
                </div>
                <div class="package-item">
                  <div class="package-item-header">
                    <p class="package-item-title">极速版B</p>
                    <p class="package-item-tip">授权后秒出报告</p>
                    <p class="package-item-tip">11个维度背调项目</p>
                  </div>
                  <div class="package-item-content">
                    <p class="package-item-list">身份证实名认证</p>
                    <p class="package-item-list">手机实名认证</p>
                    <p class="package-item-list">手机运营商信息</p>
                    <p class="package-item-list">社会负面记录</p>
                    <p class="package-item-list">金融风险信息</p>
                    <p class="package-item-list">最高学历验证</p>
                    <p class="package-item-list">职业资格信息</p>
                    <p class="package-item-list">法院涉法涉诉信息</p>
                    <p class="package-item-list">被执行人信息</p>
                    <p class="package-item-list">失信被执行人信息</p>
                    <p class="package-item-list">个人工商信息</p>
                  </div>
                  <el-button class="package-item-btn" @click="linkTo('/login')">立即背调</el-button>
                </div>
                <div class="package-item">
                  <div class="package-item-header">
                    <p class="package-item-title">标准版</p>
                    <p class="package-item-tip">授权后3工作日出报告</p>
                    <p class="package-item-tip">9个维度背调项目</p>
                  </div>
                  <div class="package-item-content">
                    <p class="package-item-list">身份证实名认证</p>
                    <p class="package-item-list">手机实名认证</p>
                    <p class="package-item-list">手机运营商信息</p>
                    <p class="package-item-list">社会负面记录</p>
                    <p class="package-item-list">金融风险信息</p>
                    <p class="package-item-list">最高学历验证</p>
                    <p class="package-item-list">职业资格信息</p>
                    <p class="package-item-list">工作履历*2段</p>
                    <p class="package-item-list">工作表现*2段</p>
                  </div>
                  <el-button class="package-item-btn" @click="linkTo('/login')">立即背调</el-button>
                </div>
                <div class="package-item">
                  <div class="package-item-header">
                    <p class="package-item-title">深度版</p>
                    <p class="package-item-tip">授权后5工作日出报告</p>
                    <p class="package-item-tip">12个维度背调项目</p>
                  </div>
                  <div class="package-item-content">
                    <p class="package-item-list">身份证实名认证</p>
                    <p class="package-item-list">手机实名认证</p>
                    <p class="package-item-list">手机运营商信息</p>
                    <p class="package-item-list">社会负面记录</p>
                    <p class="package-item-list">金融风险信息</p>
                    <p class="package-item-list">最高学历验证</p>
                    <p class="package-item-list">职业资格信息</p>
                    <p class="package-item-list">法院涉法涉诉信息</p>
                    <p class="package-item-list">失信被执行人信息</p>
                    <p class="package-item-list">个人工商信息</p>
                    <p class="package-item-list">工作履历*3段</p>
                    <p class="package-item-list">工作表现*3段</p>
                  </div>
                  <el-button class="package-item-btn" @click="linkTo('/login')">立即背调</el-button>
                </div>
                <div class="package-item">
                  <div class="package-item-header">
                    <p class="package-item-title">自由定制套餐</p>
                  </div>
                  <div class="package-item-content">
                    <p class="package-item-text">可根据您的行业或岗位特性，自由选择背调项目。我们针对各行各业提供相应的背调解决方案，更多需求，请联系我们！</p>
                  </div>
                  <el-button class="package-item-btn" @click="linkTo('/login')">立即背调</el-button>
                </div>
              </div>
            </div>
            <div class="service-content">
              <p class="service-content-title">产品套餐介绍</p>
              <img src="../img/product-service-bg.png" class="service-content-img">
              <el-button class="service-content-btn" @click="linkTo('/login')">了解更多</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="背调流程" name="second">
          <div class="second-tab-container">
            <p class="product-flow-title">背调流程</p>
            <p class="product-flow-tip">规范便捷的操作流程，为客户提供快速、严谨、客观的背调服务</p>
            <img src="../img/product-flow-bg.png" class="product-flow-img">
          </div>
        </el-tab-pane>
        <el-tab-pane label="常见问题" name="third">
          <div class="third-tab-container">
            <p class="product-question-title">常见问题</p>
            <div class="product-question-content">
              <div class="product-question-list">
                <p class="question-title"><span>1.</span>职兔背调是什么？</p>
                <p class="question-tip">职兔背调是杭州数脉科技有限公司旗下雇佣风控管理平台，平台通过大数据+专业顾问的服务模式，在候选人授权情况下，合法、合规地帮助企业HR在招聘环节有效防范身份、学历、职业资格、社会不良记录、履历造假等不诚信行为。</p>
              </div>
              <div class="product-question-list">
                <p class="question-title"><span>2.</span>职兔背调的使用流程？</p>
                <p class="question-tip">企业首先通过官网或移动端注册并进行实名认证后，即可以使用平台的各个功能，背景调查只需三步：</p>
                <p class="question-tip">1).发起背调：在职兔背调平台上根据需求灵活选择或定制套餐，发起背调。</p>
                <p class="question-tip">2).候选人授权：候选人收到短信或邮件，在线电子签名完成授权。</p>
                <p class="question-tip">3).反馈报告：职兔背调平台查询数据源，生成报告并反馈给企业HR。</p>
              </div>
              <div class="product-question-list">
                <p class="question-title"><span>3.</span>为什么需要候选人授权？</p>
                <p class="question-tip">职兔背调严格要求企业对候选人的每次背调都需要得到候选人授权，目的主要为了保障企业及候选人双方的利益，确保背调过程合法、合规。</p>
              </div>
              <div class="product-question-list">
                <p class="question-title"><span>4.</span>一般多久出报告？</p>
                <p class="question-tip">线上极速背调：客观项的查询（指通过国家相关数据库查询），候选人授权后立即生成报告。</p>
              </div>
              <div class="product-question-list">
                <p class="question-title"><span>5.</span>职兔背调的合作方式？</p>
                <p class="question-tip">1)在线注册认证后即可使用：职兔背调是一个智能背调SaaS平台，在官网、小程序等完成注册和实名认证后即可使用各个功能。</p>
                <p class="question-tip">2)通过API与职兔平台对接：企业可以通过API的方式，使自有人力资源系统与职兔平台完成对接，灵活规划产品。</p>
                <p class="question-tip">更多需求或咨询，请联系：0571-89020021</p>
              </div>
              <div class="product-question-list">
                <p class="question-title"><span>6.</span>同一个公司是否可以开多个账户？</p>
                <p class="question-tip">同一个公司名称可以开通一个主账户（注册后即为主账户），主账户下可以添加多个子账号。</p>
              </div>
              <div class="product-question-list">
                <p class="question-title"><span>7.</span>职兔背调如何收费？</p>
                <p class="question-tip">可以支持充值后消费，也可以下单后在线支付。有四个套餐每个套餐有相应价格股份；有十多个背调项目，单个背调项价格期间为1-20元，企业可以根据自己的需求进行自由组合定制；履历核实需要专业顾问进行访谈，按段收费。</p>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  export default {
    name: 'product',
    components: { 
      Header,
      Footer
    },
    data() {
      return {
        navPath: 'product',
        activeName: 'first'
      }
    },
    created() {
    },
    beforeRouteUpdate (to, from, next) {
      if(to.query.activeName) {
        this.activeName = to.query.activeName
      }
      next()
    },
    mounted() {
      this.activeName = this.$route.query.activeName || 'first'
    },
    methods: {
      linkTo (path) {
        this.$router.push({path: path})
      },
      handleClick (tab, event) {
        this.$router.push({path: 'product', query: {activeName: tab.name}})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .product-container {
    background: #f5f5f5;
    min-width: 1200px;
    .product-header-img{
      width: 100%;
    }
    .first-tab-container{
      .package-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #F3F7FA;
        padding-bottom: 90px;
        .package-content-title{
          font-size: 36px;
          color: #333;
          margin: 70px 0 50px; 
        }
        .package-list{
          display: flex;
        }
        .package-item{
          width: 216px;
          height: 580px;
          background: #fff;
          border-radius: 4px;
          box-shadow: 0px 0px 16px rgba(7,115,255,0.4);
          position: relative;
        }
        .package-item:hover{
          box-shadow: 0px 0px 32px rgba(7,115,255,0.4);
        }
        .package-item + .package-item{
          margin-left: 30px;
        }
        .package-item-header{
          height: 106px;
          background: #0773FF;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .package-item-title{
          font-size: 22px;
          color: #fff;
          padding-bottom: 10px;
        }
        .package-item-tip{
          font-size: 14px;
          color: #fff;
          line-height: 20px;
        }
        .package-item-content{
          padding-top: 20px;
        }
        .package-item-list{
          color: #666;
          font-size: 14px;
          line-height: 28px;
          position: relative;
          padding-left: 50px;
        }
        .package-item-list::before{
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #0773FF;
          position: absolute;
          top: 12px;
          left: 40px;
        }
        .package-item-text{
          color: #666;
          font-size: 14px;
          padding: 0 28px;
          line-height: 28px;
        }
        .package-item-btn{
          width: 140px;
          height: 40px;
          background: #FE9602;
          border-radius: 3px;
          color: #fff;
          position: absolute;
          left: 38px;
          bottom: 35px;
          cursor: pointer;
        }
      }
      .service-content{
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 90px;
        .service-content-title{
          font-size: 36px;
          color: #333;
          padding: 70px 0 50px; 
        }
        .service-content-img{
          width: 1200px;
        }
        .service-content-btn{
          width: 240px;
          height: 52px;
          background: #FE9602;
          border-radius: 4px;
          color: #fff;
          margin-top: 50px;
        }
      }
    }
    .second-tab-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 120px;
      .product-flow-title{
        color: #333;
        font-size: 36px;
        margin-top: 70px;
      }
      .product-flow-tip{
        color: #666;
        font-size: 16px;
        margin-top: 14px;
      }
      .product-flow-img{
        width: 1106px;
        margin-top: 75px;
      }
    }
    .third-tab-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 70px;
      .product-question-title{
        color: #333;
        font-size: 36px;
        margin-top: 70px;
      }
      .product-question-content{
        width: 800px;
        margin-top: 66px;
      }
      .question-title{
        color: #0773FF;
        font-size: 16px;
      }
      .question-tip{
        color: #666;
        font-size: 14px;
        line-height: 24px;
        margin-top: 10px;
        padding-left: 20px;
      }
      .product-question-list + .product-question-list{
        margin-top: 30px;
      }
    }
    .el-tabs__header{
      margin: 0 auto;
      display: flex;
      justify-content: center;
      background: #fff;
    }
    .el-tabs__item{
      padding: 0;
      position: relative;
      color: #333;
      font-size: 16px;
    }
    .el-tabs__item.is-active{
      color: #0773FF;
      font-weight: bold;
    }
    .el-tabs__item + .el-tabs__item{
      margin-left: 120px;
    }
    .el-tabs__nav-wrap::after{
      display: none;
    }
    .el-tabs__active-bar{
      display: none;
    }
    .el-tabs__item.is-active::after{
      content: '';
      width: 100%;
      height: 4px;
      background: #0773FF;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
</style>