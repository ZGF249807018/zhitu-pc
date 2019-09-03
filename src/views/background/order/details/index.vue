<template>
  <div class="item-container">
    <div class="item-bar table-container">
      <!--<div class="title">订单详情</div>-->
      <div class="crumbs">
        <div class="container-title"><Back></Back><span>订单详情</span></div>
      </div>
      <div class="coupon-container details" v-if="orderData">
        <div class="tab-list">
          <div class="order-container">
            <h3 class="order-title">订单详情</h3>
            <div class="left">
              <div class="orderTitle"><div class="title-name">套餐版本：</div><div class="title-info">{{packageInfo.name}}</div></div>
              <div class="orderTitle">
                <div class="title-name">套餐详情：</div>
                <div class="title-info package-name-list" >
                  <el-popover
                    placement="top-start"
                    width="600"
                    trigger="hover"
                    :content="packageName">
                    <div class="left" slot="reference">
                      <div class="package-name" >
                        {{packageName}}
                      </div>
                    </div>
                  </el-popover>
                </div>
              </div>
              <div class="orderTitle"><div class="title-name">候选人：</div><div class="title-info">{{candidateInfo.name}}&nbsp;&nbsp;{{candidateInfo.mobile}}&nbsp;&nbsp;{{candidateInfo.position}}</div></div>
              <div class="orderTitle"><div class="title-name">订单状态：</div><div class="title-info" :class="[ 'order-status-'+orderData.status ]">{{orderData.status}}</div></div>
              <div class="orderTitle"><div class="title-name">订单编号：</div><div class="title-info">{{orderData.orderNo}}</div></div>
              <div class="orderTitle"><div  class="title-name">下单时间：</div><div class="title-info">{{orderData.createTime | moment2}}</div></div>
              <div class="orderTitle"><div class="title-name">支付方式：</div><div class="title-info">{{orderData.payType}}</div></div>
              <div class="orderTitle"><div class="title-name">优惠活动：</div><div class="title-info">{{orderData.activityName ? orderData.activityName : '无活动'}}</div></div>
              <div class="orderTitle"><div class="title-name">优惠券抵扣：</div><div class="title-info">{{orderData.couponConcessions | decimalNum}}</div></div>
              <div class="orderTitle"><div class="title-name">订单价格：</div><div class="title-info">{{orderData.price | decimalNum2 }}</div></div>
              <div class="orderTitle"><div class="title-name">实付款：</div><div class="title-info">{{orderData.actualPay | decimalNum2 }}</div></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="tip">无订单详情信息</h1>
      </div>
    </div>
  </div>


</template>

<script>
  import { mapGetters } from 'vuex'
  import { backgroundDetails } from '@/api/order'
  import '../../../../utils/index'
  import Qs from 'qs'
  const moment = require('moment')
  import Back from '@/components/Back/index'
  export default {
    name: 'details',
    computed: {
      ...mapGetters([
        'tid'
      ])
    },
    components: { Back },
    data() {
      return {
        visible: false,
        orderData: '',
        candidateInfo: '',
        packageList: [],
        packageInfo: '',
        packageName: ''
        // orderNum: '492758732321591296',
        // id: '10'
      }
    },
    created() {
      const query = Qs.parse(location.hash.substring(26))
      backgroundDetails(this.tid, query.thisId).then((response) => {
        this.orderData = response.data
        this.candidateInfo = response.data.candidateInfo
        this.packageInfo = response.data.packageInfo
        this.packageList = response.data.packageInfo.groupVOList
        for (const i of this.packageList) {
          this.packageName += i.name + '、'
        }
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    methods: {
    },
    activated() {
      this.$message.error('error')
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .order-container{
    margin: 32px;
    width: 100%;
    .package-name-list{
      white-space: nowrap;
      width: 90%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .left{
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .right{
      float: left;
      width: calc(100% - 80px);
      padding-right: 10px;
      padding-left: 10px;
    }
    .package-name{
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      width:800px;
      cursor: default;
    }
    .order-title{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      span{
        float: left;
      }
    }
    .colorStyle{
      line-height: 30px;
      font-size: 14px;
      height: 30px;
    }
    .orderTitle{
      color: #666;
      width: 100%;
      display: flex;
      @extend .colorStyle;
      .title-name{
        color: #666;
      }
      .title-info{
        color: #333;
        padding-left: 10px;
        display: flex;
        div{

        }

      }
      .order-status-已完成{
        color: #01AB09;
      }
      .order-status-待支付, .order-status-待授权{
        color: #E30101;
      }
      .order-status-已取消（授权过期）,.order-status-已取消（用户取消）{
        color: #999;
      }
    }

  }

  .box{
    padding: 30px 0;
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
      font-size: 18px;
    }
  }
.name{
  float: left;
  width: auto;
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
  }
  .icon{
    display: inline-block;
    font-size: 20px;
  }
  .tc-item{
    float: left;

  }
  .tc-list{
    margin-left: 20px;
    margin-top: 20px;
    span{
      font-size: 18px;
      color: #232323;
    }

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
