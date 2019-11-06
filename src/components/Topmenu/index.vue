<template>
  <div class="header">
    <div class="menu">
      <img src="../../assets/images/header-logo.png" alt="职兔背调"  @click="linkTo('/home')" class="header-logo-img">
      <p class="menu-title">欢迎来到职兔背调 | <span class="menu-link" @click="linkTo('/home')">返回首页</span></p>
      <!-- <ul>
        <li><a href="http://www.tianyanbd.cn"></a></li>
        <li><a href="http://www.tianyanbd.cn">背调服务</a></li>
        <li><a href="http://www.tianyanbd.cn">优势特色</a></li>
        <li><a href="http://www.tianyanbd.cn">背调流程</a></li>
        <li><a href="http://www.tianyanbd.cn">联系我们</a></li>
      </ul> -->
      <!-- <div class="contactWay">
        <p><img src="../../assets/images/qq.png" alt="qq"><span>3602954257</span></p>
        <p><img src="../../assets/images/weixin.png" alt="微信"><span>wxid_czkuiyqhzv8o12</span></p>
        <p><img src="../../assets/images/call.png" alt="电话"><span>0571-89020021</span></p>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default  {
    name: 'Topbar',
    methods: {
      linkTo (path) {
        this.$router.push({path: path})
      }
    }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .header{
    width: 100%;
    height: 100px;
    .menu{
      width: 80%;
      height: 100px;
      min-width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-logo-img{
        width: 175px;
        height: 72px;
      }
      .menu-title{
        color: #fff;
        font-size: 14px;
      }
      .menu-link{
        color: #5E9BF2;
        cursor: pointer;
      }
    }
  }
</style>
