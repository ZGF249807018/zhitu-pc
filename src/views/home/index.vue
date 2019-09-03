
<template>
  <div>
    <div class="home-out">
      <div class="header">
        <div class="out">
          <a href="#"><img src="../../assets/images/logo.png" id="home-logo" /></a>
          <ul>
            <li><a href="javascript:;"></a></li>
            <li><a href="javascript:void(0)" rel="external nofollow" @click="goAnchor('#serve')" >背调服务</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#advantage')">优势特色</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#process')">背调流程</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#about')">关于我们</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#foot')">联系我们</a></li>
            <li><a href="javascript:;"></a></li>
            <li><router-link to="/register" class="register hoverReg">注册</router-link></li>
            <li><router-link to="/login" class="login hoverLog">登录</router-link></li>
          </ul>
        </div>
      </div>
      <div class="banner">
        <p class="introFirst">专业的第三方背调调查平台</p>
        <p class="introSecond">基于大数据全方位背景核查，为各行业提供详尽的解决方案</p>
        <p class="experience"><router-link to="/login">立即体验</router-link></p>
      </div>
    </div>
    <div class="bds-container" id="serve">
      <div class="bds-title">
        <p class="main-title">多样套餐服务</p>
        <p class="second-title">不同岗位选择不同的背调套餐，更可自定义搭配专属背调服务</p>
      </div>
      <div class="bds-items" id="bdsItems">
        <div id="horizontal" class="brand horizontal">
          <a target="_blank" href="javascript:void(0);" style="margin-left: 20px;">
            <div class="front">
              <p class="items-title">极速版A</p>
              <p style="margin-top: 13px;">-主要用于身份核验、以及负面安全记录核查</p>
              <p>-速度快</p>
              <p>-5项调查项目</p>
              <p class="asterisk">*适用于高效身份验真和安全记录核查</p>
              <p class="item">￥18.00</p>
            </div>
            <div class="info">
              图1
            </div></a>
          <a target="_blank" href="javascript:void(0);">
            <div class="front">
              <p class="items-title">极速版B</p>
              <p style="margin-top: 13px;">-主要用于身份核验、以及负面安全记录核查、学历专业认证、个人工商信息、法院涉法涉诉信息等</p>
              <p>-速度快</p>
              <p>-12项调查项目</p>
              <p class="asterisk">*适用于初级岗位的全方位背景核查</p>
              <p class="item">￥98.00</p>
            </div>
            <div class="info">
              图2
            </div></a>
          <a target="_blank" href="javascript:void(0);">
            <div class="front">
              <p class="items-title">标准版</p>
              <p style="margin-top: 13px;">-主要用于身份核验、以及负面安全记录核查、学历专业认证、过往工作履历核实与表现鉴定</p>
              <p>-速度快</p>
              <p>-9项调查项目</p>
              <p class="asterisk">*适用于中级岗位的全方位背景核查</p>
              <p class="item">￥568.00</p>
            </div>
            <div class="info">
              图3
            </div></a>
          <a target="_blank" href="javascript:void(0);">
            <div class="front">
              <p class="items-title">深度版</p>
              <p style="margin-top: 13px;">-主要用于身份核验、以及负面安全记录核查、学历专业认证、全方位风险评估、深度的过往工作履历核实与表现鉴定</p>
              <p>-速度快</p>
              <p>-13项调查项目</p>
              <p class="asterisk">*适用于高级岗位的全方位背景核查</p>
              <p class="item">￥998.00</p>
            </div>
            <div class="info">
              图3
            </div></a>
        </div>
      </div>
      <router-link to="/login" class="btn-primary btn-bd">开始背调</router-link>
    </div>
    <div class="bds-advantage" id="advantage">
      <p class="first-title">优势与特色</p>
      <p class="second-title">基于大数据全方位背景核查，为各行业提供专属服务</p>
      <div class="bds-container">
        <ul>
          <li style="margin-left: 40px;"><img src="./img/sudu.png" /><p class="bds-items">高效快捷</p><p class="bds-itemSecond">快速响应，及时交付报告</p></li>
          <li><img src="./img/discounts.png" /><p class="bds-items">价格优惠</p><p class="bds-itemSecond">具有竞争力的价格，更有多种优惠套餐</p></li>
          <li><img src="./img/dingzhi.png" /><p class="bds-items">个性定制</p><p class="bds-itemSecond">多种优惠套餐，自定义背调项目</p></li>
          <li><img src="./img/safety.png" /><p class="bds-items">数据安全</p><p class="bds-itemSecond">数据传递多重加密，安全可靠</p></li>
          <li><img src="./img/data.png" /><p class="bds-items">真实客观</p><p class="bds-itemSecond">数据客观真实，来源合法合规</p></li>
        </ul>
      </div>
    </div>
    <div class="bds-process" id="process">
      <p class="first-title">规范化操作流程</p>
      <p class="second-title">规范便捷的操作流程，为客户提供快速、严谨、客观的背调服务</p>
      <div class="items">
        <ul>
          <li class="item" style="margin-left: 90px;"><img src="./img/u1491.png" /><p style="text-indent: 15px;">发起背调</p></li>
          <li class="item1"><img src="./img/arrow2.png" /></li>
          <li class="item"><img src="./img/u1493.png" /><p>被调查人授权</p></li>
          <li class="item1"><img src="./img/arrow2.png" /></li>
          <li class="item"><img src="./img/u1495.png" /><p>调查项核验</p></li>
          <li class="item1"><img src="./img/arrow2.png" /></li>
          <li class="item"><img src="./img/u1497.png" /><p>工作履历核查</p></li>
          <li class="item1"><img src="./img/arrow2.png" /></li>
          <li class="item"><img src="./img/u1499.png" /><p>背调报告审查</p></li>
          <li class="item1"><img src="./img/arrow2.png" /></li>
          <li class="item"><img src="./img/u1501.png" /><p>背调报告交付</p></li>
        </ul>
      </div>
    </div>
    <div class="bds-callUs" id="callUs">
      <p class="first-title">多行业适用</p>
      <p class="second-title">多种核查项目与套餐，为各行业提供适用的解决方案</p>
      <div class="items">
        <div class="item-row family" style="margin-left: 45px;">
          <p>家政物业</p>
        </div>
        <div class="item-row job">
          <p>求职招聘</p>
        </div>
        <div class="item-row wedding">
          <p>婚礼交友</p>
        </div>
        <div class="item-row money">
          <p>金融借贷</p>
        </div>
      </div>
      <div class="items-Second">
        <div class="item-row transaction" style="margin-left: 45px;">
          <p>租赁交易</p>
        </div>
        <div class="item-row work">
          <p>工作外派</p>
        </div>
        <div class="item-row serve">
          <p>征信服务</p>
        </div>
        <div class="item-row expressage">
          <p>物流快递</p>
        </div>
      </div>
    </div>
    <div class="bds-process" id="about">
      <p class="first-title">公司简介</p>
      <p class="second-title about-text">杭州数脉科技有限公司成立于2016年12月，旗下产品有职兔背调，是一个居于大数据和区块链的职业背景调查平台，公司坚持客户第一的服务理念，不断完善产品，提升服务质量，努力为客户创造价值。
      数脉科技创始团队主要来自阿里、华为等知名企业，公司的使命是通过自身在数据采集、模型算法、机器学习领域的技术优势，发掘互联网数据的价值，帮助企业节约成本和提高效率。数脉科技致力于成为一家业内受尊敬的、专业的大数据征信公司。</p>
    </div>
    <div class="bds-foot" id="foot">
      <div class="items">
        <div class="items-left">
          <a href="javascript:;" rel="external nofollow" @click="goAnchor('#serve')" class="foot-ser">背调服务</a>
          <a href="javascript:;" rel="external nofollow" @click="goAnchor('#advantage')" class="foot-pro">背调流程</a>
          <a href="javascript:;" rel="external nofollow" @click="goAnchor('#process')" class="foot-adv">优势特色</a>
          <a href="#foot" rel="external nofollow" @click="goAnchor('#about')">关于我们</a>
          <a href="#foot" rel="external nofollow" @click="goAnchor('#foot')">联系我们</a>
          <a href="" style=" position: absolute;margin-top: -74px;margin-left: 112px;width: 84px;opacity: 0;">注册<b class="line"></b>登录</a>
        </div>
        <div class="items-center">
          <p class="title">联系人：潘虹</p>
          <p class="title">联系方式:0571-89020021</p>
          <p class="title">地址：杭州市余杭区良睦路1399号互联网村20幢</p>
          <p style="font-size: 20px;margin-top: 20px;">工作时间：9:00-18:00(工作日)</p>
        </div>
        <div class="items-right">
          <img src="./img/weixin-code.jpg" style="width:120px;height: 120px;border: 1px solid black" />
          <p style="font-size: 17px;width: 120px; text-align: center; margin-top: 5px;">微信公众号</p>
        </div>
      </div>
      <div class="bottom">
      <div style="width:500px;margin:0 auto; padding:20px 0 0 0;">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002013735" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="https://img.zhitubd.com/shumai/beian.png" style="float:left;"/>
          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">浙公网安备 33011002013735号</p>
        </a>
      </div>
      <div style="padding:20px 0;">Copyright &copy; 2017&nbsp;&nbsp;&nbsp;杭州数脉科技有限公司</span></div>
      </div>
    </div>
    <div class="hidden">
      <div class="header">
        <div class="out">
          <a href="#"><img src="../../assets/images/logo.png" /></a>
          <ul>
            <li><a href="javascript:;"></a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#serve')" class="bds-ser">背调服务</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#advantage')" class="bds-adv">优势特色</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#process')" class="bds-pro">背调流程</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#about')" class="bds-us">关于我们</a></li>
            <li><a href="javascript:;" rel="external nofollow" @click="goAnchor('#foot')" class="bds-us">联系我们</a></li>
            <li><a href="javascript:;"></a></li>
            <li><router-link to="/register" class="register hoverReg">注册</router-link></li>
            <li><router-link to="/login" class="login hoverLog">登录</router-link></li>
          </ul>
        </div>
        <!--<img src="./img/error.png" class="closeLogo" onclick="f1()" />-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page',
    data() {
      return {
      }
    },
    created() {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?3e4685f6b00da6d7780e2834b2b61a9a'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
  },
    mounted() {
      this.init()
    },
    methods: {
      goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.documentElement.scrollTop = anchor.offsetTop
      },
      init() {
        function f1() {
          $('.hidden').css('display', 'none'),
          flag = !0
        }
        $(window).scroll(function() {
          $(window).scrollTop() >= 100 ? ($('.hidden').css('display', 'block'), flag == 1 && $('.hidden').css('display', 'none')) : $('.hidden').css('display', 'none')
        })
        var flag = !1
        $('.login').hover(function() {
          $(this).addClass('addLogin'),
          $('.register').removeClass('hoverReg')
        },
        function() {
          $(this).removeClass('addLogin'),
          $('.register').addClass('hoverReg')
        })
      }
    }
  }
</script>
<style scoped src="./css/common.css"></style>
<style scoped src="./css/home.css"></style>
