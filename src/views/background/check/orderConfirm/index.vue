<template>
  <div class="item-container  orderConfirm" v-if="tctype">
    <div class="item-bar table-container">
      <div class="title">
        <Back></Back>
        <span>确认支付</span>
      </div>
      <div class="breadcrumb">
        <ul id="breadcrumb">
          <li class="dark"><a href="#"><span class="icon  icon-beaker "></span>订单确认</a></li>
          <li><a href="#"><span class="icon icon-home "></span>支付确认</a></li>
          <li><a href="#"><span class="icon icon-double-angle-right"></span>支付完成</a></li>
        </ul>
      </div>
      <div class="coupon-container details">
        <div class="box">
          <table class="order-table" >
            <thead>
              <tr class="top" >
                <th class="t1">套餐版本</th>
                <th class="t1">套餐详情</th>
                <th class="t1">单价（元）</th>
                <th class="t1"><span>候选人数</span></th>
                <th class="t1">费用</th>
              </tr>
            </thead>
            <tr class="content">
              <th class="t1">{{activeText}}</th>
              <th class="t1">
                <ul>
                  <li v-for="(i, k) in childPackageVOList" :key='k'>{{i.name}}</li>
                </ul>
              </th>
              <th class="t1">{{mealPrice | decimalNum }}</th>
              <th class="t1"><span class="num">{{arr}}</span></th>
              <th class="t1"><span class="price">{{allPrice | decimalNum }} 元</span></th>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="item-bar">
      <div class="recharge-list ">
        <div class="recharge-type">
          <div class="bottom-title">
            <label>备注</label>
            <el-input
              class="remarks"
              autosize
              type="textarea"
              :rows="1"
              maxlength="150"
              placeholder="请输入内容"
              v-model="remark">
            </el-input>
          </div>
        </div>
        <div class="order-price">
          <el-button type="primary" class="sendBtn orderBtn list" @click="sendOrder" >提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 style="color: #909399; text-align: left;line-height: 10;display: flex;justify-content: center;">没有订单信息，请重新选择套餐和候选人</h1>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { checkInputPayPass } from '@/utils/check/index'
  import { orderInfo, consume } from '@/api/resumeForm'
  import { getWithOrder, getCouponWithOrder, importOrders } from '@/api/order'
  import { pkgDetails } from '@/api/package'
  import { itemList} from '@/api/package'
  import { userDetail } from '@/api/info'
  import Back from '@/components/Back/index'
  export default {
    name: 'details',
    computed: {
      ...mapGetters([
        'tid',
        'uid',
        'candidate',
        'tctype',
        'orderDetails',
        'uploadCandidate'
      ])
    },
    data() {
      const payPass = (rule, value, callback) => { checkInputPayPass(value, callback) }
      return {
        remark: '',
        visible: false,
        arr: '',
        allPrice: 0, // 原价
        decrease_amount: 0,
        couponDecrease: 0,
        orderData: '',
        couponVal: '',
        couponAmount: 0,
        childPackageVOList: [],
        activeText: '',
        mealPrice: '',
        allPrice: ''
      }
    },
    components: { Back },
    created() {
      console.log(this)
      const self = this
      let obj
      console.log('obj')
      if (typeof self.candidate === 'string') {
        obj = self.candidate.split(',')
      } else {
        obj = []
        obj.push(self.candidate)
      }
      const tc = parseInt(self.tctype)
      console.log(tc)
      if (!tc) {
        this.$router.push({ path: '/background/check' })
      } else {
        console.log(typeof obj)
        console.log(this.uploadCandidate)
        itemList(tc).then((response) => {
          this.activeText = this.$route.query.activeText
          self.childPackageVOList = response.data
          self.arr = obj.length
          }).catch(error => {
          self.$message.error(error.msg)
        })
        pkgDetails(self.tctype).then((response) => {
          if (response) {
            self.mealPrice = response.price
            self.allPrice = response.price *  obj.length
          }
        }).catch(error => { self.$message.error(error.msg) })
      }
    },
    methods: {
      back() {
        if (window.history.length <= 1) {
          this.$router.push({ path: '/' })
          return false
        } else {
          this.$router.go(-1)
        }
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 500)
      },
      close() {
        this.consume.password = ''
        this.$refs.consume.resetFields()
      },
      sendOrder() {
        this.$store.commit('SET_REMARK', this.remark)
        this.$router.push({ path: 'order' })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bottom-title{
    display: flex;
    margin-bottom: 30px;
    align-items: center;
    .remarks{
      width: 47%;
    }
    label{
      margin-right: 15px;
    }
  }
  .sendBtn{
    margin-left: 60px;
  }

  .tc-name{
    font-size: 18px;
    margin: 20px 30px;
  }
  .tc-list{
    overflow: hidden;
    margin-left: 30px;
    .num{
      color: #ff0000;
    }
    li{
      float: left;
      line-height: 30px;
      span{
        font-size: 16px;
        &:first-child{
          padding-right: 5px;
        }
      }
    }
  }
  .order-price{
    display: flex;
    justify-content: flex-end;
    align-content: center;
    margin-bottom: 20px;
    margin-right: 30px;
    .list{

    }
  }
  .wrong{
    color: red;
  }
  .right{
    color: #67C23A;
  }
  .el-icon-circle-check{
    padding-right: 10px;
  }
  .el-icon-circle-close{
    padding-right: 10px;
  }
  .icon{
    padding-right: 15px;
    padding-left: 10px;
    &.icon-yue1{
      color: #2961E9;
    }
    &.icon-zhifubao{
      color: #1296db;
    }
    &.icon-weixin{
      color: #52C146;
    }
  }
  .red-num{
    font-size: 18px;
    color: red;
  }
.coupon-container{
  border: 1px solid #eee;
  width: 95%;
  margin: 36px auto 0px auto;
}
  .recharge-type{
    margin: 20px;
  }
  .recharge-list{
    padding: 20px;
    background: #fff;
  }
  .order-info{
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    .label-title{
      margin-right: 20px;
    }
    .list{
      height: 43px;
      line-height: 43px;
      font-size: 18px;
    }
  }
  .input-name-tyb{
    width: 100px;
  }
  .new{
    font-size: 18px;
    font-weight: bold;
    padding-right: 10px;
    color: #232323;
  }
  .old{
    text-decoration: line-through;
    font-size: 18px;
    color: #999;
    position: relative;
    top: 8px;
  }

  .el-list{
    border-right: 1px solid rgba(153,153,153,.4);
    &:last-child{
      border-right:none;
    }
  }
  .list{
    display: flex;
    justify-content: center;
    li{
      line-height: 40px;
      height: 40px;
    }
  }
  .name{
    float: left;
    width: 120px;
    text-align: right;
    margin-right: 50px;
  }
  .info{
    text-align: left;
  }
  .tc-name{
    font-size: 18px;
  }
  .tc-info{
    font-size: 26px;
  }
  .order-table{
    width: 100%;
    border-collapse:collapse;
    .top{
      height: 42px;
      background: #eee;
      th{
        width: 14%;
      }
    }
    .content{
      .num{
        color: #5E9BF2;
      }
      .price{
        color: #FF0000;
      }
      th{
        font-weight: normal;
        vertical-align: top;
        padding-top: 20px;
        padding-bottom: 20px;
      }
      ul{
        padding-left: 38%;
        li{
          line-height: 26px;
          font-weight: normal;
          text-align: left;
        }
      }
    }
  }
  .red{
    color: #FF0000;
    font-weight: bold;
    font-size: 26px;
    position: relative;
    top: 2px;
    right: 3px;
  }
  .icon{
    display: inline-block;
    font-size: 20px;
  }
  .tip{
    font-size: 16px;
    font-weight: normal;
    color: #606266;
    text-align: center;
    line-height: 10;
  }
  .top{
    .item{
      height: 30px;
      line-height: 40px;
      display: inline-block;
      font-size: 18px;
      .tc-title{

        font-weight: bold;
        width: 100px;
        text-align: right;
        display: inline-block;
      }
    }
  }

</style>
