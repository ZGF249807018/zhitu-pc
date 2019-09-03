<template>
  <div class="header">
    <div class="menu">
      <a href="#" class="logo"><img src="../../assets/images/logo.png" alt="职兔背调"></a>
      <ul>
        <li><a href="http://www.tianyanbd.cn"></a></li>
        <li><a href="http://www.tianyanbd.cn">背调服务</a></li>
        <li><a href="http://www.tianyanbd.cn">优势特色</a></li>
        <li><a href="http://www.tianyanbd.cn">背调流程</a></li>
        <li><a href="http://www.tianyanbd.cn">联系我们</a></li>
      </ul>
      <div class="contactWay">
        <p><img src="../../assets/images/qq.png" alt="qq"><span>3602954257</span></p>
        <p><img src="../../assets/images/weixin.png" alt="微信"><span>wxid_czkuiyqhzv8o12</span></p>
        <p><img src="../../assets/images/call.png" alt="电话"><span>0571-89020021</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default  {
    name: 'Topbar'
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  a{
    color: #fff;
  }
  .header{
    width: 100%;
    height: 100px;
    margin-top: 25px;
    .logo{
      float: left;
      img{
        width: 180px;
        height: auto;
      }
    }
    .menu{
      width: 80%;
      height: 100px;
      min-width: 1000px;
      margin: 0 auto;
      ul{
        width: 600px;
        float: left;
        li{
          line-height: 30px;
          display: inline-block;
          text-align: center;
          font-size: 18px;
          width: 100px;
        }
      }
      .contactWay {
        width: 190px;
        float: right;
        p{
          margin-top: 0px;
        }
        img{
          width: 17px;
          height: 18px;
          display: inline-block;
          position: relative;
          top: 3px;
        }
        span{
          color: whitesmoke;
          margin-left: 5px;
          font-size: 16px;
          line-height: 1;
        }
      }
    }
  }
</style>
