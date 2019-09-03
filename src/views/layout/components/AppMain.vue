<template>
  <section class="app-main">
    <!--<transition name="fade" mode="out-in">-->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    <!--</transition>-->
  </section>
</template>

<script>
  import Cookies from 'js-cookie'
export default {
  name: 'AppMain',
  data() {
      return {

      }
  },
  created() {
      const loading = document.getElementById('Loading')
      if (loading !== null) {
        document.getElementById('app').removeChild(loading)
      }
      if (window.location.href.indexOf('method=alipay.trade.page.pay.return') !== -1) {
        Cookies.set('pay', true)
        const type = Cookies.get('thisPayType')
        if (type == 1) {
          this.$router.push({ path: '/background/orderSearch' })
          window.location.href = '/#/background/orderSearch'
        } else if (!type) {
          this.$router.push({ path: '/balance/account' })
          window.location.href = '/#/balance/account'
        }
      }
  }
}
</script>
<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 86px);
  position: relative;
  overflow: hidden;
  margin-top: 74px;
}
</style>
