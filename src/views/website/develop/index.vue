<template>
  <div class="develop-container">
    <!-- <baidu-map class="baidu-map" :zoom="zoom" :center="center">
    </baidu-map> -->
    <Header :navPath="navPath"></Header>
    <div class="develop-header">
      <img src="../img/product-bg.png" class="develop-header-img">
    </div>
    <div class="develop-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商务合作" name="first">
          <div class="first-tab-container">
            <p class="develop-title">商务合作</p>
            <div class="develop-content-box">
              <img src="../img/develop-logo.png" class="develop-logo-img">
              <div class="content-box-right">
                <p class="develop-box-tilte">COOPERATION</p>
                <p class="develop-box-text">职兔背调是杭州数脉科技有限公司旗下雇佣风控管理平台，平台通过大数据+专业顾问的服务模式，在候选人授权情况下，合法、合规地。</p>
                <p class="develop-box-text">帮助企有四个套餐每个套餐有相应价格股份；有十多个背调项目，单个背调项价格期间为1-20元，企业可以根据自己的需求进行自由组合定制；履历核实需要专业顾问进行访谈，按段收费。</p>
                <p class="develop-box-phone">商务热线：400-039-6618</p>
                <p class="develop-box-email">商务邮箱：BD@shumaidata.com</p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="加入我们" name="second">
          <div class="second-tab-container">
            <p class="develop-title">加入我们</p>
            <div class="develop-content-box">
              <div class="tag-box">
                <el-tag class="develop-tag-box active-tag-box">技术类</el-tag>
                <!-- <el-tag class="develop-tag-box">产品类</el-tag>
                <el-tag class="develop-tag-box">运营类</el-tag>
                <el-tag class="develop-tag-box">商务类</el-tag>
                <el-tag class="develop-tag-box">职能类</el-tag> -->
              </div>
              <div class="tag-content">
                <p class="tag-content-tip"><span class="tag-content-icon">!</span>我们的发展离不开人才的加入，如果您认为自己非常优秀，请将您的简历投递至 shumai@shumaidata.com，我们期待您的加入！</p>
                <div class="tag-position-list">
                  <p class="tag-position-title">运维工程师</p>
                  <div class="tag-position-describe">
                    <p class="describe-title">岗位描述：</p>
                    <p class="describe-text">1、独立负责金融产品、风险管理、信用管理、用户行业、业务逻辑的日常运营分析，提供日常运营分析报告以及其他分析结果；</p>
                    <p class="describe-text">2、在充分了解金融业务的基础上，利用数据挖掘的先进技术，优化现有分析方法；</p>
                    <p class="describe-text">3、独立承担复杂分析任务，充分发挥对数据的敏感性，给风控、信用、营销、运营等提供有力、有价值的分析支持，提高运营有效性；</p>
                    <p class="describe-text">4、负责业务核心指标的监控和跟踪分析，并对异常波动情况进行深入分析和问题定位；</p>
                    <p class="describe-text">5、分析和研究数据与实际业务的关联关系，以实地走访等形式完备分析知识体系;</p>
                  </div>
                  <div class="tag-position-describe">
                    <p class="describe-title">任职资格：</p>
                    <p class="describe-text">1、计算机、统计学、数学、计量经济学、金融学等相关专业，本科及以上学历，2年以上数据分析相关工作经验；</p>
                    <p class="describe-text">2、具有深厚的数学、统计学和计算机相关知识，了解数据仓库和数据挖掘的相关技术；</p>
                    <p class="describe-text">3、对商业和业务逻辑敏感，具备良好的逻辑分析能力、组织沟通能力和团队精神；</p>
                    <p class="describe-text">4、曾经参与过比较完整的数据采集、整理、分析工作；</p>
                    <p class="describe-text">5、精通Excel、PPT、WORD等办公软件，具有专业的数据分析能力，较强逻辑推理能力，以及书面和口头表达能力；</p>
                    <p class="describe-text">6、具有很强的团队意识，有诚信、愿意分享和承担责任；</p>
                    <p class="describe-text">7、熟悉SAS、SPSS、R等</p>
                  </div>
                </div>
                <div class="tag-position-list">
                  <p class="tag-position-title">高级java开发工程师</p>
                  <div class="tag-position-describe">
                    <p class="describe-title">岗位描述：</p>
                    <p class="describe-text">1、负责风险数据大规模存储系统、分布式计算系统、挖掘算法等设计、研发以及维护、优化工作；</p>
                    <p class="describe-text">2、带领团队攻克高并发、高稳定性，复杂业务模型等带来的各种挑战及技术难关；</p>
                    <p class="describe-text">3、参与项目的系统设计和核心代码开发，指导和培训其他工程师；</p>
                    <p class="describe-text">4、整理和提交技术文档，负责核心功能模块的代码编写和测试工作；</p>
                  </div>
                  <div class="tag-position-describe">
                    <p class="describe-title">任职资格：</p>
                    <p class="describe-text">1、计算机科学、计算机软件、通信或相关专业本科及以上学历，5年以上IT行业经验；</p>
                    <p class="describe-text">2、具有非常扎实的Java基础，精通J2EE体系结构，熟悉IO、多线程、集合等基础框架，熟悉分布式、缓存、消息、搜索等常见的机制，对Spring等有非常深入的实践经验；</p>
                    <p class="describe-text">3、有在Hadoop、HBase、Storm等分布式平台开发测试经验者优先；</p>
                    <p class="describe-text">4、具有良好的系统分析、架构设计能力，熟悉软件系统分析/设计的方法论，并有丰富的实践经验；</p>
                    <p class="describe-text">5、熟悉敏捷开发的相关理念，具有敏捷项目实施的经验；</p>
                    <p class="describe-text">6、精通UML和Linux的日常应用</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="联系我们" name="third">
          <div class="third-tab-container">
            <p class="develop-title">联系我们</p>
            <div class="develop-content-box">
              <div class="develop-input-box">
                <el-input v-model="input" placeholder="姓名*" class="name-input"></el-input>
                <div class="sex-container">
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
                </div>
                <el-input v-model="input" placeholder="公司*" class="company-input"></el-input>
              </div>
              <div class="develop-input-box">
                <el-input v-model="input" placeholder="电话*" class="phone-input"></el-input>
                <el-input v-model="input" placeholder="邮箱*" class="email-input"></el-input>
              </div>
              <div class="develop-input-box">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="进一步说明您的需求！如果您有其他方面的建议或问题，欢迎在此处留言。最多输入200字"
                  v-model="textarea">
                </el-input>
              </div>
              <div class="develop-input-box">
                <el-button class="submit-btn">确认提交</el-button>
                <p class="submit-phone">咨询热线：400-039-6618</p>
              </div>
              <div class="develop-contact-box">
                <img src="../img/develop-contact-bg.png" class="develop-contact-bg">
                <div class="contact-box-right">
                  <p class="work-time-title">工作时间</p>
                  <p class="work-contack-text time-icon">周一至周五：9:00-18:00</p>
                  <p class="work-contack-title">联系方式 </p>
                  <p class="work-contack-text member-icon">联系人：潘女士</p>
                  <p class="work-contack-text phone-icon">联系电话：0571-89020021</p>
                  <p class="work-contack-text email-icon">Email： shumai@shumaidata.com</p>
                  <p class="work-contack-text address-icon">地址： 杭州市余杭区良睦路1399号互联网村20幢</p>
                </div>
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
    name: 'develop',
    components: { 
      Header,
      Footer
    },
    data() {
      return {
        navPath: 'develop',
        activeName: 'first',
        radio: '1'
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
  .develop-container {
    background: #f5f5f5;
    min-width: 1200px;
    .develop-header{
      height: 440px;
    }
    .develop-header-img{
      width: 100%;
      height: 440px;
    }
    .first-tab-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 140px;
      .develop-title{
        color: #333;
        font-size: 36px;
        text-align: center;
        margin-top: 70px;
      }
      .develop-content-box{
        display: flex;
        margin-top: 76px;
        width: 1200px;
      }
      .develop-logo-img{
        width: 570px;
        height: 390px;
      }
      .content-box-right{
        margin-left: 40px;
        flex: 1;
      }
      .develop-box-tilte{
        color: #000;
        font-size: 40px;
        font-weight: bold;
        font-family: Arial;
        position: relative;
        line-height: 50px;
      }
      .develop-box-tilte::after{
        content: '';
        width: 70px;
        height: 4px;
        background: #FE9603;
        position: absolute;
        left: 320px;
        top: 23px;
      }
      .develop-box-text{
        color: #666;
        font-size: 14px;
        line-height: 24px;
        margin-top: 20px;
      }
      .develop-box-phone{
        color: #000;
        font-size: 18px;
        line-height: 36px;
        margin-top: 50px;
      }
      .develop-box-email{
        color: #000;
        font-size: 18px;
        line-height: 36px;
      }
    }
    .second-tab-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 140px;
      .develop-title{
        color: #333;
        font-size: 36px;
        text-align: center;
        margin-top: 70px;
      }
      .develop-content-box{
        width: 1200px;
        margin-top: 50px;
      }
      .develop-tag-box{
        width: 120px;
        height: 40px;
        line-height: 40px;
        background: #E1EBF2;
        color: #003333;
        font-size: 15px;
        text-align: center;
        font-weight: bold;
      }
      .active-tag-box{
        background: #0773FF;
        color: #fff;
      }
      .tag-content{
        padding: 50px;
        background: #fff;
        border-radius: 8px;
      }
      .tag-content-icon{
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 14px;
        background: #0773FF;
        color: #fff;
        font-size: 12px;
        margin-right: 5px;
      }
      .tag-content-tip{
        color: #666;
        font-size: 14px;
        text-align: center;
      }
      .tag-position-list{
        margin: 30px 0;
        .tag-position-title{
          width: 100%;
          height: 40px;
          line-height: 40px;
          background: #F8F8F8;
          font-size: 16px;
          color: #FE9603;
          font-weight: bold;
          padding-left: 20px;
          position: relative;
        }
        .tag-position-title::before{
          content: '';
          width: 3px;
          height: 40px;
          background: #FE9603;
          position: absolute;
          left: 0;
          top: 0;
        }
        .tag-position-describe{
          padding-left: 10px;
        }
        .describe-title{
          color: #333;
          font-size: 14px;
          font-weight: bold;
          margin: 25px 0 15px;
        }
        .describe-text{
          color: #333;
          font-size: 13px;
          line-height: 30px;
        }
      }
    }
    .third-tab-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 140px;
      .develop-title{
        color: #333;
        font-size: 36px;
        text-align: center;
        margin-top: 70px;
      }
      .develop-content-box{
        width: 1200px;
        padding: 90px 120px;
        background: #fff;
        margin-top: 50px;
        border-radius: 8px;
      }
      .develop-input-box{
        display: flex;
        justify-content: space-between;
        .name-input{
          width: 240px;
          height: 40px;
        }
        .sex-container{
          width: 200px;
          height: 40px;
          border: 1px solid #DDDDDD;
          margin-left: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .company-input{
          width: 450px;
          height: 40px;
          margin-left: 60px;
        }
        .phone-input{
          width: 450px;
          height: 40px;
        }
        .email-input{
          width: 450px;
          height: 40px;
          margin-left: 60px;
        }
        .submit-btn{
          width: 240px;
          background: #FE9603;
          color: #fff;
          font-size: 16px;
        }
        .submit-phone{
          color: #333;
          font-size: 16px;
        }
      }
      .develop-input-box + .develop-input-box{
        margin-top: 20px;
      }
      .develop-contact-box{
        display: flex;
        margin-top: 140px;
        .develop-contact-bg{
          width: 560px;
        }
        .contact-box-right{
          flex: 1;
          margin-left: 50px;
        }
        .work-time-title{
          font-size: 18px;
          color: #FE9603;
          font-weight: bold;
          margin: 20px 0 10px;
        }
        .work-contack-text{
          font-size: 14px;
          color: #333;
          line-height: 36px;
          position: relative;
          padding-left: 25px;
        }
        .work-contack-title{
          font-size: 18px;
          color: #FE9603;
          font-weight: bold;
          margin: 50px 0 10px;
        }
        .time-icon::before{
          content: '';
          width: 18px;
          height: 18px;
          background: url('../img/develop-time-icon.png') no-repeat;
          position: absolute;
          top: 8px;
          left: 0;
        }
        .member-icon::before{
          content: '';
          width: 18px;
          height: 18px;
          background: url('../img/develop-member-icon.png') no-repeat;
          position: absolute;
          top: 8px;
          left: 0;
        }
        .phone-icon::before{
          content: '';
          width: 18px;
          height: 18px;
          background: url('../img/develop-phone-icon.png') no-repeat;
          position: absolute;
          top: 8px;
          left: 0;
        }
        .email-icon::before{
          content: '';
          width: 18px;
          height: 18px;
          background: url('../img/develop-email-icon.png') no-repeat;
          position: absolute;
          top: 8px;
          left: 0;
        }
        .address-icon::before{
          content: '';
          width: 18px;
          height: 18px;
          background: url('../img/develop-address-icon.png') no-repeat;
          position: absolute;
          top: 8px;
          left: 0;
        }
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