<template>
  <div class="resume-container">
  </div>
</template>

<script>
  import Qs from 'qs'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
    },
    data() {
      return {
      }
    },
    created() {
      const query = this.$route.query
      // 授权页面 authorize
      if (query.orderNo && query.candidateId) {
        this.$router.push(
          { path: '/authorize', query:{orderNo:query.orderNo, candidateId:query.candidateId, 
          tenantId:query.tenantId, company:query.company, tag:query.tag, gzllNum:query.gzllNum}})
      }
      // 候选人资料填写页面 resume
      if (query.userId && query.candidateNo) {
        this.$router.push(
          { path: '/jobInfo', query:{userId:query.userId, candidateNo:query.candidateNo, tenantId:query.tenantId, company:query.company} })
      }
    },
    components: {},
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
</style>
