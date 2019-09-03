<template>
<span @click="back" class="link">< 返回</span>
</template>

<script>
    export default {
      name: 'back',
      methods: {
        back() {
          if (window.history.length <= 1) {
            this.$router.push({ path: '/' })
            return false
          } else {
            this.$router.go(-1)
          }
        }
      }
    }
</script>

<style scoped>
span{
  cursor: pointer;
  border-right: 1px solid #333;
  padding-right: 9px;
}
</style>
