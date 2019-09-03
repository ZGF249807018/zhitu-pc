<template>
  <div class="item-container" v-if="tctype">
    <div class="item-bar table-container">
      <div class="title">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item :to="{ path: 'check' }">返回</el-breadcrumb-item>
          <el-breadcrumb-item>确认支付</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="breadcrumb">
        <ul id="breadcrumb">
          <li><a href="#"><span class="icon icon-home"></span>订单确认</a></li>
          <li class="dark" ><a href="#"><span class="icon icon-beaker"></span>支付确认</a></li>
          <li><a href="#"><span class="icon icon-double-angle-right"></span>支付完成</a></li>
        </ul>
      </div>
      <div class="coupon-container details">
        <div class="box">
          <div class="tc-name">订单信息</div>
          <ul class="tc-list">
            <li><span>套餐版本：{{orderData.packageVo.name}}</span></li>
          </ul>
          <ul class="tc-list">
            <li><span>套餐详情：</span></li>
            <li  v-for="(item, index) in orderData.packageVo.childPackageVOList" :key="index"><span>{{item.name}}、</span></li>
          </ul>
          <ul class="tc-list">
            <li><span>单价：<span class="num">{{mealPrice | decimalNum}}</span>元</span></li>
          </ul>
          <ul class="tc-list">
            <li>候选人数：<span>{{allNum}} 人</span></li>
          </ul>
          <ul class="tc-list">
            <li><span>费用：<span class="num">{{allPrice | decimalNum }}</span>元</span></li>
          </ul>
          <div class="remarks">
            <div class="info">备注：<span>{{remark}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-bar">
      <div class="title">支付方式</div>
      <div class="recharge-list ">
        <div class="recharge-type">
          <div class="bottom-title">
            <label>优惠券：</label>
            <el-select v-model="couponVal" :placeholder="couponStatus" class="handle-select" @change="couponId" >
              <el-option
                v-for="item in couponList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="bottom-title">
            <label>支付方式:</label>
            <el-radio-group v-model="consume.payType" class="order-radio">
              <el-radio :label="0"><span class="icon iconfont icon-yue1"></span>余额支付</el-radio>
              <el-radio :label="1"><span class="icon iconfont icon-zhifubao"></span>支付宝支付</el-radio>
              <el-radio :label="2"><span class="icon iconfont icon-weixin"></span>微信支付</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="order-price">
          <div v-if="hasActivity" class="list">
            <span class="new">实付金额：<span class="red">{{afterPrice | decimalNum }}</span>元</span>
            <span class="old">总金额：{{allPrice | decimalNum }}元</span>
          </div>
          <div v-else class="list">
            <span class="new">实付金额 <span class="red">{{thisPrice | decimalNum }}</span>元</span>
          </div>
          <el-button type="primary" class="sendBtn orderBtn list" @click="sendOrder" :disabled="isDisabled">确认支付</el-button>
        </div>

      </div>
    </div>

    <el-dialog title="支付密码" :visible.sync="visible" width="350px" @close="close">
      <el-form :model="consume" :rules="formRules" ref="consume">
        <el-form-item label="支付密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="consume.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="sendSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="550px"
      class="pay-pass-input"
    >
      <PayPass @dialogStatus="dialogForm" :payMobile="payMobile"></PayPass>
      <!--<span>支付密码未设置，是否去设置？</span>-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="goSet">确 定</el-button>
  </span>
    </el-dialog>
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
  import { userDetail } from '@/api/info'
  import Cookies from 'js-cookie'
  import PayPass from '../../../personal/information/modifyPayPass'
  export default {
    name: 'details',
    computed: {
      ...mapGetters([
        'tid',
        'uid',
        'candidate',
        'tctype',
        'price',
        'orderDetails',
        'remark',
        'uploadCandidate'
      ])
    },
    data() {
      const payPass = (rule, value, callback) => { checkInputPayPass(value, callback) }
      return {
        visible: false,
        dialogVisible: false,
        formLabelWidth: '120px',
        arr: [],
        hasActivity: false,
        isDisabled: false,
        activityPrice: '', // 普通活动价格
        couponStatus: '无可用优惠券',
        activityId: '',
        thisPrice: 0, // 总价
        allPrice: 0, // 原价
        mealPrice: '', // 套餐价格
        afterPrice: 0, // 活动价
        decrease_amount: 0,
        couponDecrease: 0,
        allNum: '',
        orderData: '',
        couponVal: '',
        couponAmount: 0,
        payMobile: '',
        couponList: [],
        formRules: {
          password: [{ required: true, validator: payPass, trigger: 'blur' }]
        },
        consume: {
          userId: '',
          packageId: '',
          payType: 0,
          remark: '',
          activityId: null,
          couponRecordId: null,
          password: '',
          orderNoList: []
        }
      }
    },
    components: { PayPass },
    created() {
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
      if (!tc) {
        this.$router.push({ path: '/background/check' })
      } else {
        if (this.uploadCandidate) {
          importOrders(obj.toString(), tc).then((response) => {
            self.orderData = response.data
            for (const obj of self.orderData.orderList) {
              if (obj.orderNo) {
                this.consume.orderNoList.push(obj.orderNo)
              }
            }
            self.allNum = response.data.orderList.length
            self.mealPrice = response.data.packageVo.price
            self.allPrice = response.data.packageVo.price * self.allNum
            self.thisPrice = response.data.packageVo.price * self.allNum
            getWithOrder(self.thisPrice).then((response) => {
              if (response.data.decreaseAmount) {
                this.decrease_amount = response.data.decreaseAmount
                self.afterPrice = self.allPrice - response.data.decreaseAmount > 0 ? self.allPrice - response.data.decreaseAmount : 0
                self.activityPrice = self.afterPrice
                self.consume.activityId = response.data.activityId
                self.hasActivity = true
              }
            }).catch(error => {
              self.$message.error(error.msg)
            })
          }).catch(error => {
            self.$message.error(error.msg)
          })
        }
        orderInfo(self.tid, self.uid, tc, obj).then((response) => {
          self.orderData = response.data
          for (const obj of self.orderData.orderList) {
            if (obj.orderNo) {
              this.consume.orderNoList.push(obj.orderNo)
            }
          }
          self.allNum = self.orderData.orderList.length
          self.mealPrice = response.data.packageVo.price
          self.allPrice = response.data.packageVo.price * self.allNum
          self.thisPrice = response.data.packageVo.price * self.allNum
          getWithOrder(self.thisPrice).then((response) => {
            if (response.data.decreaseAmount) {
              this.decrease_amount = response.data.decreaseAmount
              self.afterPrice = self.allPrice - response.data.decreaseAmount > 0 ? self.allPrice - response.data.decreaseAmount : 0
              self.activityPrice = self.afterPrice
              self.consume.activityId = response.data.activityId
              self.hasActivity = true
            }
          }).catch(error => {
            self.$message.error(error.msg)
          })
        }).catch(error => {
          self.$message.error(error.msg)
        })
      }

      getCouponWithOrder(self.tid, self.price).then((response) => {
        if (!response.data) {
          self.couponStatus = '无可用优惠券'
        } else {
          self.couponStatus = '选择优惠券'
          self.couponList = response.data
          const obj = { name: '选择优惠券', id: '', decreaseAmount: 0 }
          self.couponList.unshift(obj)
        }
      }).catch(error => {
        self.$message.error(error.msg)
      })
    },
    methods: {
      dialogForm() {
        this.dialogVisible = false
      },
      close() {
        this.consume.password = ''
        this.$refs.consume.resetFields()
      },
      couponId(e) {
        const self = this
        console.log(e)
        if (e) {
          let couponAmount = ''
          for (const i of self.couponList) {
            if (i.id === e) {
              self.couponAmount = i.decreaseAmount
              couponAmount = i.decreaseAmount
              this.consume.couponRecordId = i.id
            }
          }
          if (self.hasActivity) {
            self.afterPrice = self.activityPrice - self.couponAmount > 0 ? self.activityPrice - self.couponAmount : 0
          } else {
            self.thisPrice = self.allPrice - self.couponAmount > 0 ? self.allPrice - self.couponAmount : 0
          }
        } else {
          self.couponAmount = 0
          this.consume.couponRecordId = null
          if (self.hasActivity) {
            self.afterPrice = self.activityPrice 
          } else {
            self.thisPrice = self.allPrice
          }
        }
      },
      sendOrder() {
        if (this.hasActivity) {
          this.$store.commit('SET_PRICE', this.afterPrice)
        } else {
          this.$store.commit('SET_PRICE', this.thisPrice)
        }
        const type = this.consume.payType
        if (type == '0' && (this.thisPrice + this.afterPrice) != 0 ) {
          userDetail(this.tid).then((response) => {
            console.log(response)
            this.payMobile = response.data.mobile
            if (response.data.isSetPayPwd) {
              this.visible = true
            } else {
              this.dialogVisible = true
            }
          }).catch(error => {
            this.$message.error(error.msg)
          })
        } else {
          this.orderSubmit()
        }
      },
      goSet() {
        this.$router.push({ path: '/personal/infor' })
      },
      orderSubmit() {
        this.consume.userId = this.uid
        this.consume.packageId = parseInt(this.tctype)
        this.consume.remark = this.remark
        consume(this.consume).then((response) => {
          if ((this.consume.payType == '1' || this.consume.payType == '2') && (this.thisPrice + this.afterPrice) != 0) {
            this.$store.commit('SET_PAY', response)
            Cookies.set('thisPayType', this.consume.payType)
            this.$router.push({ path: '/pay' })
          } else {
            this.$message.success('支付成功')
            this.$router.push({ path: 'orderSearch' })
          }
          this.$store.commit('SET_ORDERINFOTXT', '')
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      sendSubmit() {
        this.visible = false
        this.orderSubmit()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .pay-pass-input{
  }
  .bottom-title{
    margin-bottom: 30px;
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
  .remarks{
    border-top: 1px solid #eee;
    width: 100%;
    padding: 20px 30px;
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
