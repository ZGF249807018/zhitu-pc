<template>
<div class="item-container dashboard-container">
  <div class="item-bar">
    <div class="title">
      账户余额
    </div>
    <el-row class="list-pro">
      <el-col :span="8" class="list-pro-info shadow-list">
        <div class="list-icon">
          <div class="icons-bar di account icon iconfont icon-chongzhi"></div>
        </div>
        <div class="list-pro-num di account">
          <div class="num"><span class="red">{{money | decimalNum2 }}</span><span class="yuan">元</span></div>
          <div class="unit">账户余额</div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="item-bar recharge-container">
    <div class="title">
      账户充值
    </div>
    <div class="pay-containaer">
      <div v-if="payStatus == false ">
        <div class="payTyps">选择支付方式</div>
        <el-radio-group v-model="payType">
          <el-radio :label="1">
            <div class="pay-icon">
              <i class="icon iconfont icon-zhifubao"></i>
              <div class="txt">
                <div class="type">在线支付</div>
                <div class="tip">使用支付宝在线支付</div>
              </div>
            </div>

          </el-radio>
          <!--<el-radio :label="6">-->
          <!--<div class="pay-icon">-->
          <!--<i class="icon iconfont icon-chongzhi"></i>-->
          <!--<div class="txt">-->
          <!--<div class="type">线下银行转账</div>-->
          <!--<div class="tip">支持线下银行转账</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</el-radio>-->
          <el-radio :label="2">
            <div class="pay-icon">
              <i class="icon iconfont icon-weixin"></i>
              <div class="txt">
                <div class="type">在线支付</div>
                <div class="tip">使用微信扫码支付</div>
              </div>
            </div>
          </el-radio>
        </el-radio-group>
        <el-form label-width="120px" class="recharge-form" :model="rechargeForm" :rules="rechargeRules" ref="rechargeForm">
          <el-form-item label="输入充值金额" prop="amount">
            <el-input v-model.number="rechargeForm.amount" type="number" name="rechargeNum"  class="recharge" min='100'></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="recharge" :loading="loading" class="recharge-btn">确认充值</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="payStatus == true ">
        <div class="pay-success ">
          <div class="top">
            <i class="el-icon-circle-check pay-success-icon"></i>
            <span>恭喜您充值成功</span>
          </div>
         <div class="count">{{count}} 秒后 自动跳转到账户余额</div>
          <el-button type="primary" @click="back"  class="back">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getBalance } from '@/api/info'
  import Cookies from 'js-cookie'
  export default {
    name: 'order',
    computed: {
      ...mapGetters([
        'tid',
        'uid'
      ])
    },
    data() {
      const validateNum = (rule, value, callback) => {
        var reg = /^[0-9]+$/ 
        if (value === '') {
          callback(new Error('请输入充值金额'))
        } else {
          if (value < 100 ) {
            callback(new Error('充值金额最低100元'))
          } else if (value > 100000) {
            callback(new Error('充值金额最高10万元'))
          } else if (!reg.test(value)) {
            callback(new Error('充值金额需为整数'))
          } else {
            callback()
          }
        }
      }
      return {
        loading: false,
        payType: 1,
        money: '',
        time: null,
        count: '',
        showCaptcha: true,
        payStatus: this.payStatus ? Cookies.get('pay') : false,
        rechargeForm: {
          userId: '',
          amount: '',
          payType: ''
        },
        rechargeRules: {
          amount: [{ required: true, trigger: 'blur', validator: validateNum }]
        }
      }
    },
    created() {
      getBalance(this.tid).then((response) => {
        this.money = response.data
      }).catch(error => {
        console.log(error)
      })
      if (this.payStatus === 'true') {
        const countTime = 3
        this.count = countTime
        this.time = setInterval(() => {
          if (this.count > 1) {
            this.count--
          } else {
            clearInterval(this.time)
            this.time = null
            Cookies.set('pay', false)
            this.$router.push({ path: '/record' })
          }
        }, 1000)
      }
    },
    methods: {
      recharge() {
        this.rechargeForm = {
          userId: this.uid,
          amount: this.rechargeForm.amount,
          payType: this.payType
        }
        const obj = JSON.parse(JSON.stringify(this.rechargeForm))
        obj.amount = obj.amount * 100
        this.$refs.rechargeForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('payforn', obj).then(() => {
              this.$store.commit('SET_PAYTYPE', this.payType)
              this.$router.push({ path: '/pay', query: { type: 'rechagre' }})
            }).catch((error) => {
              this.loading = false
              this.$message.error(error.msg)
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/variables';
  .dashboard-container{
    color: #232323;
    .pay-success{
      margin-left: 155px;
      margin-top: 50px;
      text-align: center;
      width: 280px;
      .count{
        color: #999;
      }
      .top,.count{
        line-height: 2;
      }
      .back{
        position: relative;
        top: 50px;
        width: 280px;
        background: #2961E9;
      }
    }
    .pay-success-icon{
      color: #2961E9;
    }
    .payTyps{
      margin: 50px 30px;
      font-size: 18px;
    }
    .recharge-form{
      margin-top: 50px;
    }
    .recharge{
      width: 118px;
    }
    .recharge-btn{
      margin-top: 20px;
      padding-right: 100px;
      padding-left: 100px;
      background: #2961E9;
      &:hover{
        background: rgba(41,97,223,.9);
        transition: all .3s;
      }
    }
    .recharge-container{
      padding-bottom: 100px;
    }
    .pay-icon{
      display: flex;
      justify-content: center;
      align-items: center;
      .txt{
        display: inline-block;
        margin-left: 10px;
        line-height: 2;
        color: #232323;
        .type{
          border-bottom: 1px solid #666;

        }
      }
      .icon-zhifubao{
        padding: 2px;
        background: #1296db;
        color: #fff;
        border-radius: 7px;
        font-size: 40px;
      }
      .icon-chongzhi{
        padding: 5px;
        background: #2961E9;
        color: #fff;
        border-radius: 4px;
        font-size: 35px;
      }
      .icon-weixin{
        padding: 5px;
        background: #52C146;
        color: #fff;
        border-radius: 4px;
        font-size: 35px;
      }
    }
    .list-icon{
      text-align: center;
      width: 11vw;
    }
    padding-bottom: 30px;
    margin: 20px;
    .list-icon-color{
      color: #fff;
    }
    @mixin list-icon-color($bg) {
      background: $linkColor;
      color: #fff;
    }
    .list-pro{
      padding: 20px;
      .list-pro-info{
        border-radius: 4px;
        display: flex;
        transform: scale(0.95);
        &:nth-child(1){.list-icon{ @include list-icon-color($menuBg)} }
        &:nth-child(2){.list-icon{ @include list-icon-color(#54C0EB)} }
        &:nth-child(3){.list-icon{ @include list-icon-color(#8A78D2)} }
      }
      .list-pro-num{
        line-height: 2.5rem;
        margin: auto;
        width: auto;
        height: 100%;
        div{
          &.unit{
            font-size: 30px;
          }
          &.num{
            display: flex;
            align-items: center;
            justify-content: center;
            .red{
              color: #FF0000;
              font-weight: bold;
              font-size: 36px;
            }
            .yuan{
              padding-left: 5px;
              font-size: 24px;
            }
          }
        }
      }
      .icons{
        padding: 20px 20px 2px 20px;
        text-align: center;
        i{
          display: block;
          font-size: 3rem;
          color: #fff;
        }
      }
      .icon-txt{
        font-size: 12px;
        color: #fff;
        padding: 3px 0;
        width: 100%;
        display: block;
        text-align: center;
      }
      .icons-bar{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 18vh;
        &.account{
          font-size: 6vw;
        }
        &.coupon{
          font-size: 4vw;
        }
        &.tianyan-coin{
          font-size: 5vw;
        }
      }
    }
    el-col{
      height: 80px;
      border-radius:4px;
      display: block;
      box-shadow:0px 0px 0px rgba(22,22,22,0.08);
    }
    .co-info{
      height: 100px;
      padding: 20px;
      display: flex;
      align-items: center;
      img{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        float: left;
      }
      .co-name{
        color: #232323;
        font-size: 18px;
      }
      .co-top{
        margin-left: 13px;
        line-height: 1.4;
      }

    }

  }
</style>
