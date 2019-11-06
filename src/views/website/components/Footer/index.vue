<template>
  <div class="footer-container">
    <div class="footer-content">
      <div class="footer-content">
        <img src="../../img/footer-content-logo.png" class="footer-content-logo">
        <div class="footer-content-list">
          <p class="footer-content-p">产品与服务</p>
          <ul class="footer-content-ul">
            <li class="footer-content-li">产品与服务</li>
            <li class="footer-content-li">背调流程</li>
            <li class="footer-content-li">常见问题</li>
          </ul>
        </div>
        <div class="footer-content-list">
          <p class="footer-content-p">合作与发展</p>
          <ul class="footer-content-ul">
            <li class="footer-content-li">商务合作</li>
            <li class="footer-content-li">加入我们</li>
            <li class="footer-content-li">联系我们</li>
          </ul>
        </div>
        <div class="footer-content-list">
          <p class="footer-content-p">联系方式</p>
          <p class="footer-content-number">0571-88921093</p>
          <p class="footer-content-tip">全国统一客服热线</p>
          <p class="footer-content-address">杭州市余杭区良睦路1399号20幢</p>
        </div>
        <div class="footer-content-list">
          <p class="footer-content-p">公众号</p>
          <img src="../../img/footer-code.png" class="footer-code">
        </div>
        <div class="footer-content-list">
          <p class="footer-content-p">官方微博</p>
          <img src="../../img/footer-code.png" class="footer-code">
        </div>
      </div>
      <div class="footer-record">
        <p>Copyright © 2017-2019 杭州数脉科技有限公司 浙ICP备17029783号 浙公网安备33011002013735号</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .footer-content{
    width: 100%;
    height: 268px;
    .footer-content{
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 308px;
      background: rgba(34, 34, 34, 1);
      padding-top: 46px;
      .footer-content-logo{
        width: 175px;
        height: 72px;

      }
      .footer-content-list{
        margin-left: 60px;
        .footer-content-p{
          color: rgba(255, 255, 255, 1);
          font-size: 20px;
          position: relative;
          padding-bottom: 10px;
        }
        .footer-content-p::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 26px;
          height: 3px;
          background: rgba(7, 115, 255, 1);
        }
        .footer-content-ul{
          margin-top: 20px;
        }
        .footer-content-li{
          color: rgba(153, 153, 153, 1);
          font-size: 14px;
          line-height: 30px;
        }
        .footer-content-number{
          color: rgba(255, 255, 255, 1);
          font-size: 28px;
          margin-top: 22px;
        }
        .footer-content-tip{
          color: rgba(153, 153, 153, 1);
          font-size: 14px;
          margin-top: 10px;
        }
        .footer-content-address{
          color: rgba(255, 255, 255, 1);
          font-size: 13px;
          margin-top: 15px;
        }
        .footer-code{
          width: 110px;
          height: 110px;
          margin-top: 15px;
        }
      }
    }
    .footer-record{
      width: 100%;
      height: 60px;
      background: rgba(28, 28, 28, 1);
      color: rgba(153, 153, 153, 1);
      font-size: 14px;
      text-align: center;
      line-height: 60px;
    }
  }
</style>