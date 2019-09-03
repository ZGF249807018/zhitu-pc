<template>
  <div>

  </div>

</template>

<script>
    export default {
      name: 'list',
      props: ['showPass'],
      data() {
        return {
          show: this.showPass,
          accountForm: {
            name: '13336015189',
            email: '343543@qq.com',
            mobile: '13336015189',
            account: this.showPass,
            password: '122612jun'
          },
        }
      }
    }
</script>

<style scoped>

</style>
