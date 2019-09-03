<template>
  <div>
    <h1 v-show="message">{{message}}</h1>
    <embed class="pdf" :src="thisPdf" width="100%" height="100%">
  </div>

</template>
<script>
  import { mapGetters } from 'vuex'
  import { reportView } from '@/api/report'
  export default {
    name: 'details',
    computed: {
      ...mapGetters([
        'tid'
      ])
    },
    data() {
      return {
        message: '',
        thisPdf: '',
        id: ''
      }
    },
    components: {
    },
    created() {
      // this.thisPdf = this.getPdf()
      this.getPdf()
    },
    // mounted() {
    //   console.log(this.thisPdf)
    //   this.$nextTick(() => {
    //     this.thisPdf = this.getPdf()
    //   })
    // },
    methods: {
      getPdf() {
        this.id = this.$route.query.id
        reportView(this.id).then((response) => {
          if (!response.result) {
            this.message = response.message
          }
         window.location.href = ''
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  h1 {
    text-align: center;
    line-height: 10;
    color: #909399;
  }
</style>
