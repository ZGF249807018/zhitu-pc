<template>
  <a :href=" pdfUrl+ thisPdf"  id="download"></a>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  export default {
    name: 'download',
    data() {
      return {
        thisPdf: '',
        pdfUrl: process.env.PDF_API,
        pdfUrl2: process.env.PDF_API2,
      }
    },
    computed: {
      ...mapGetters([
        'downloadZip'
      ])
    },
    created() {
      this.thisPdf = Cookies.get('downloadZip')
    },
    mounted() {
      this.$nextTick(() => {
        document.getElementById('download').click()
      })
    }
  }
</script>
