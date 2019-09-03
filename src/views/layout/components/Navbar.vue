<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logo"><img src="../../../assets/images/logo.png" alt="职兔背调"></div>
<div class="avatar-container">
  <div class="avatar-wrapper">
    <el-popover
      placement="top-start"
      width="auto"
      trigger="hover">
      <div class="item">
        <router-link to="/personal/infor">
          <ul class="userHead">
            <li><img class="user-avatar" :src="logo ? img + logo : defaultImg" slot="reference"></li>
            <li><div class="role">{{primary? '管理员' : '子账号'}}</div></li>
          </ul>
        </router-link>
        <ul>
          <li><i class="icon iconfont icon-chongzhi"></i></li>
          <li><div>可用余额（元）<div class="red">{{balance | decimalNum2 }}</div></div></li>
          <li><router-link to="/balance/account"><el-button type="primary" class="send-btn">立即充值</el-button></router-link></li>
        </ul>
        <ul>
          <li><i class="icon iconfont icon-xianjinquan"></i></li>
          <li><div>优惠券（张）<div class="red">{{coupon}}</div></div></li>
          <li><router-link to="/background"><el-button type="primary" class="send-btn">立即使用</el-button></router-link></li>
        </ul>
        <ul>
          <li><i class="icon iconfont icon-yue"></i></li>
          <li><div>职兔币（个）<div class="red">0</div></div></li>
          <!--<li><router-link to="#"><el-button type="primary" class="send-btn">立即使用</el-button></router-link></li>-->
        </ul>
          <div @click="logout" style="display:block;text-align: center;padding: 10px;cursor: pointer" >退出</div>
      </div>
      <div class="user-avatar icon iconfont icon-user" slot="reference"><span>{{account}}</span> <span class="el-icon-caret-bottom"></span> </div>
    </el-popover>
  </div>
</div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBalance, couponRecord } from '@/api/info'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import '@/styles/index.scss'
export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'tid',
      'primary',
      'company',
      'account',
      'logo'
    ])
  },
  data() {
    return {
      img: process.env.IMG_API,
      visible: true,
      coupon: '',
      balance: '',
      defaultImg: './static/menuHead.png'
    }
  },
  created() {
    couponRecord(this.tid).then((response) => {
      console.log(response.data)
      this.coupon = response.data
      this.$store.commit('SET_COUPON', this.coupon)
    }).catch(error => {
      console.log(error)
    })
    getBalance(this.tid).then((response) => {
      console.log(response.data)
      this.balance = response.data
      this.$store.commit('SET_BALANCE', this.balance)
    }).catch(error => {
      console.log(error)
    })
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/variables';
  .el-icon-caret-bottom{

  }
  .send-btn{
    font-size: 12px !important;
  }
  .userHead{
    img{
      width: 100%;
      height: 100%;
      max-width: 40px;
      max-height: 40px;
      border-radius: 50%;
    }
    .role{
      color: #999;
    }
  }
  .item{
    ul{
      overflow: hidden;
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      border-bottom: 1px solid rgba(153,153,153,.3);
      padding-bottom: 10px;
      padding-top: 10px;
      li{
        margin-right: 15px;
        .red{
          color: #FF0000;
          font-weight: bold;
        }
        .icon-xianjinquan{
          font-size: .8vw !important;
        }
        &:first-child{
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 50%;
          background: #2366FD;
          color: #fff;
          text-align: center;
          i{
            font-size: 1.2vw;
          }
        }
        &:nth-child(3){
          margin-left: auto;
        }
      }
    }
  }
</style>
