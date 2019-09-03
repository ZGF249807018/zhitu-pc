<template>
  <div class="coupon-container">
    <div class="coupon-top shadow-list"><el-button type="primary" class="submitBtn"  @click="recordList">查看使用记录</el-button></div>
    <div class="tab-list shadow-list">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all">
          <el-row  class="list">
            <div v-if="listData.length === 0" class="noCoupon">暂无优惠券</div>
            <el-col :span="6" class="item" v-for="(item, index) in listData" :key="item.type" v-else>
              <div class="stamp stamp02" v-if="item.type == 0 && item.isExpired == 0">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay / 100 }}元可用</p>
                  <p class="tc">{{item.startTime}}-{{item.endTime }}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
              <div class="stamp stamp03" v-else-if="item.type == 1 && item.isExpired == 0 ">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay / 100 }}元可用</p>
                  <p class="tc">{{item.startTime}}-{{item.endTime }}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
              <div class="stamp stamp04" v-else-if="item.type == 2  && item.isExpired == 0">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay / 100 }}元可用</p>
                  <p class="tc">{{item.startTime}}-{{item.endTime }}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
              <div class="stamp stamp05" v-else-if="item.isExpired == 1">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay / 100 }}元可用</p>
                  <p class="tc">{{item.startTime}}-{{item.endTime }}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="抵用券" name="0">
          <el-row class="list">
            <div v-if="listData.length === 0" class="noCoupon">暂无优惠券</div>
            <el-col :span="6" class="item" v-for="(item, index) in listData" :key="item.type" >
              <div class="stamp stamp02">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay /100 }}元可用</p>
                  <p class="tc">{{item.startTime}}-{{item.endTime}}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="折扣券" name="1">
          <el-row class="list">
            <div v-if="listData.length === 0" class="noCoupon">暂无优惠券</div>
            <el-col :span="6" class="item" v-for="(item, index) in listData" :key="item.type" v-else>
              <div class="stamp stamp03">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay / 100}}元可用</p>
                  <p class="tc">{{item.startTime }}-{{item.endTime}}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="满减券" name="2">
          <el-row class="list">
            <div v-if="listData.length === 0" class="noCoupon">暂无优惠券</div>
            <el-col :span="6" class="item" v-for="(item, index) in listData" :key="index" v-else>
              <div class="stamp stamp04">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay / 100 }}元可用</p>
                  <p class="tc">{{item.startTime}}-{{item.endTime}}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="已过期" name="3">
          <el-row class="list">
            <div v-if="listData.length === 0" class="noCoupon">暂无优惠券</div>
            <el-col :span="6" class="item" v-for="(item, index) in listData" :key="item.type" v-else>
              <div class="stamp stamp05">
                <div class="par">
                  <sub class="sign">￥</sub>
                  <span>{{item.cost / 100 }}</span>
                  <p class="tc">满{{item.limitPay / 100 }}元可用</p>
                  <p class="tc">{{item.startTime}}-{{item.endTime}}</p>
                </div>
                <div class="copy">{{item.countType}}</div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { couponList } from '@/api/coupon'
  const moment = require('moment')
  export default {
    computed: {
      ...mapGetters([
        'tid'
      ])
    },
    data() {
      return {
        timestamp: (new Date()).getTime(),
        listData: [],
        noCoupon: false,
        loading: false,
        type: '',
        isExpired: 0,
        activeName: 'all'
      }
    },
    filters: {
      times: function(value) { return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()} : ${value.getMinutes()} : ${value.getSeconds()}` }
    },
    created() {
      this.getCouponList(this.type, this.isExpired)
    },
    methods: {
      recordList() {
        this.$router.push({ path: 'couponRecord' })
        console.log(1)
      },
      getCouponList(type, isExpired) {
        couponList(this.tid, type, isExpired).then((response) => {
          this.listData = response.data
          if (response.data.length === 0) {
            // this.noCoupon = true
          } else {
            for (const i of this.listData) {
              switch (i.type) {
                case 0:
                  i.countType = '抵用券'
                  break
                case 1:
                  i.countType = '折扣券'
                  break
                case 2:
                  i.countType = '满减券'
                  break
              }
              i.startTime = moment(i.startTime).format('YYYY.MM.DD')
              console.log(i.startTime)
              i.endTime = moment(i.endTime).format('YYYY.MM.DD')
              console.log(i.endTime)
            }
          }
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      handleClick(tab, event) {
        const this_id = event.target.getAttribute('id')
        this.type = this_id.replace(/[^0-9]/ig, '')
        console.log(this.type)
        this.type = this.type ? this.type : ''
        this.isExpired = this.type === '3' ? '1' : '0'
        this.getCouponList(this.type, this.isExpired)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
  .stamp01, .stamp02, .stamp03,.stamp04{
    width: 22vw;
  }
  .noCoupon{
    color: #909399;
    font-size: 16px;
    text-align: center;
    line-height: 2;
  }
  .coupon-top{
    padding: 20px;
    background: #fff;
    margin: 20px;
    min-height: 88px;
    .submitBtn{
      float: right;
    }
  }
  .tab-list{
    background: #fff;
    min-height: 400px;
    margin: 20px;
  }

  .list{
    .item{
      transform: scale(.85);
    }
    .stamp{
      float: left;
    }

  }
  .stamp {
    display: flex;
    padding: 0 10px;
    position: relative;
    overflow: hidden;
  }
  .stamp:before {
    content: '';
    position: absolute;
    top:0;
    bottom:0;
    left:10px;
    right:10px;

    z-index: -1;
  }
  .stamp:after {
    content: '';
    position: absolute;
    left: 10px;
    top: 10px;
    right: 10px;
    bottom: 10px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);
    z-index: -2;
  }

  .stamp i{
    position: absolute;
    left: 20%;
    top: 45px;
    height: 190px;
    width: 390px;
    background-color: rgba(255,255,255,.15);
    transform: rotate(-30deg);
  }
  .stamp .par{
    float: left;
    padding: 16px 15px;
    width: 220px;
    border-right:2px dashed rgba(255,255,255,.3);
    text-align: left;
  }
  .stamp .par p{
    color:#fff;
    font-size: 14px;
    line-height: 21px;
  }
  .stamp .par span{
    font-size: 50px;
    color:#fff;
    margin-right: 5px;
    line-height: 65px;
  }
  .stamp .par .sign{font-size: 25px;}
  .stamp .par sub{
    position: relative;
    top:0;
    color:rgba(255,255,255,.8);
  }
  .sub{
    margin-left: 1.4vw;
  }
  .stamp .copy{

    font-size: 1.5vw;
    color: white;
    text-align: center;
    line-height: 15vh;
    width: 7vw;
    height: 15vh;
  }
  .stamp .copy p{font-size: 16px;margin-top: 15px;}
  .stamp01{
    background: #F39B00;
    background-size: 15px 15px;
    background-position: 9px 3px;
  }
  .stamp01:before{
    background-color:#F39B00;
  }
  .stamp02{
    background: #D24161;
    background-size: 15px 15px;
    background-position: 9px 3px;
  }
  .stamp02:before{
    background-color:#D24161;
  }
  .stamp03{
    background: rgba(254, 106, 0, 1);
    background-size: 15px 15px;
    background-position: 9px 3px;
  }
  .stamp03:before{
    background-color:rgba(254, 106, 0, 1);
  }

  .stamp03 .copy p{
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 8px;
  }
  .stamp03 .copy a{
    background-color:#fff;
    color:#333;
    font-size: 14px;
    text-decoration:none;
    padding:5px 10px;
    border-radius:3px;
    display: block;
  }


  .stamp04{
    background: rgba(41, 97, 233, 1);
    background-size: 12px 8px;
    background-position: -5px 10px;
  }
  .stamp04:before{
    background-color:rgba(41, 97, 233, 1);
    left: 5px;
    right: 5px;
  }
  .stamp04 .copy p{
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 8px;
  }
  .stamp04 .copy a{
    background-color:#fff;
    color:#333;
    font-size: 14px;
    text-decoration:none;
    padding:5px 10px;
    border-radius:3px;
    display: block;
  }

  .stamp05{
    background: rgba(153, 153, 153, .6);
    background-size: 12px 8px;
    background-position: -5px 10px;
  }
  .stamp05:before{
    background-color: rgba(153, 153, 153, .6);
    left: 5px;
    right: 5px;
  }
</style>
