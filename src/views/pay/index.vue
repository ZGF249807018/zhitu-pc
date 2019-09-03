<template>
  <div v-html="payload" class="alipay" ref="alipay" v-if="!payload.data"></div>
  <div v-else>
    <div class="top-bar">
      <div class="top">
        <div class="pay-icon">
          <i class="icon iconfont icon-weixin"></i>
          <div class="txt">
            <div class="tip">微信支付</div>
          </div>
        </div>
      </div>
      <div class="container2">
        <div class="container-top">
          <p>职兔背调</p>
          <p>收款方：杭州数脉科技有限公司</p>
        </div>
        <div class="box">
          <!--<div class="tip">-->
            <!--扫码付款（元）-->
            <!--<div class="red">{{price}}</div>-->
          <!--</div>-->
          <div class="code">
            <Qrcode :value="codeUrl" :options="{ size: 200 }"></Qrcode>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { wxqrcode } from '@/api/info'
  import { orderStatus } from '@/api/order'
  import Qrcode from '@xkeshi/vue-qrcode'
  import Qs from 'qs'

  export default {
    name: 'pay',
    data() {
      return {
        apply: '',
        codeUrl: '',
        num: 0,
        num2: 0,
        max: 5,   // 请求间隔
        max2: 0, // 请求时长
        weixinPay: false
      }
    },
    computed: {
      ...mapGetters([
        'tid',
        'uid',
        'payload',
        'price',
        'payCount'
      ])
    },
    created() {
      if (this.payload.data) {
        wxqrcode(this.payload.data).then((response) => {
          this.codeUrl = response.data
        }).catch(error => {
          console.log(error)
        })
      }
    },
    methods: {
      time2() {
        this.num2++
        if (this.num2 < this.max2) {
          setTimeout(this.time2, 1000)
          console.log('num2:  ' + this.num2)
        } else {
          console.log('done2')
        }
      },
      time() {
        this.num++
        if (this.num < this.max) {
          setTimeout(this.time, 1000)
          console.log('num: ' + this.num)
        } else {
          console.log('done')
          this.num = 0
          if (this.num2 < this.max2) {
            setTimeout(this.time, 1000)
            orderStatus(this.payload.data).then((response) => {
              console.log(response)
              const query = Qs.parse(location.hash.substring(6))
              if (response.data === 1 && query.type === 'rechagre') {
                this.$router.back(-1)
              } else if (response.data === 1) {
                this.$router.push({ path: '/background/orderSearch' })
              } else if (response.data === 2) {
                this.$message.error('支付失败')
              }
            }).catch(error => {
              console.log(error.msg)
            })
          }
        }
      }

    },
    mounted() {
      this.apply = this.payload
      this.$nextTick(() => {
        document.forms[0].submit()
      })
      if (this.payload.data) {
        this.max2 = 900
        setTimeout(this.time2, 1000)
        setTimeout(this.time, 1000)
      }
      if (!this.$refs.alipay.innerHTML) {
        this.$router.back(-1)
      }
    },
    beforeDestroy() {
      this.max2 = 0
    },
    components: {
      Qrcode
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

body{
  background: #eff0f1;

}
.pay-icon{
  display: flex;
  align-items: center;
  .txt{
    display: inline-block;
    margin-left: 10px;
    line-height: 2;
    color: #232323;
    .tip{
      font-size: 20px;
    }
  }
  .icon-weixin{
    padding: 0 10px;
    background: #52C146;
    color: #fff;
    border-radius: 4px;
    font-size: 35px;
    transform: scale(.8);

  }
}
  .top-bar{
    background: #fff;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #d9d9d9;
    .top{
      width: 955px;
      margin: 0 auto;
    }
  }
  .container2{
    width: 954px;
    height: 532px;
    margin: 60px auto;
    .box{
      border-top: 3px solid #b3b3b3;
      border-bottom: 3px solid #b3b3b3;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #fff;
      padding: 20px;
      .tip{
        text-align: center;
        font-size: 18px;
        .red{
          font-size: 30px;
          color: #ff6600;
          font-weight: bold;
        }
      }
      .code{
        margin: auto;
        canvas{
          border: 1px solid #d3d3d3;
          padding-bottom: 35px;
        }
        &:after{
          content: '打开微信扫码付款';
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          white-space: pre-wrap;
          width: 100%;
          position: relative;
          bottom: 63px;
          display: block;
          height: 30px;
        }
      }
    }
  }
  .container-top{
    display: flex;
    font-size: 16px;
    p{
      &:first-child{
        padding-right: 20px;
        font-weight: bold;
      }
    }
  }
</style>
