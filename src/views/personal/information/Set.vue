<template>
  <div v-if="!setStatus">
    <el-col :span="4">
      <div class="set unset"><i class="el-icon-warning"></i><span>未设置</span></div>
      <div class="change" @click="setUp">设置</div>
    </el-col>
  </div>
  <div v-else>
    <el-col :span="4">
      <div class="set"><i class="el-icon-circle-check"></i><span>已设置</span></div>
      <div class="change" @click="setUp">修改</div>
    </el-col>
  </div>
</template>

<script>
    export default {
      props: ['setStatus', 'setType'],
      data() {
        return {

        }
      },
      methods: {
        modify() {
          console.log(this.setType)
        },
        setUp() {
          switch (this.setType) {
            case 'email':
              if (this.setStatus) {
                this.$router.push({ path: 'modifyEmail' })
              } else {
                this.$router.push({ path: 'bindemail' })
              }
              break
            case 'mobile':
              this.$router.push({ path: 'modifyPhone' })
              break
            case 'paypass':
              this.$router.push({ path: 'modifyPayPass' })
              break
            case 'loginpass':
              this.$router.push({ path: 'modifyLoginPass' })
              break
          }
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $warnColor:#F90;
  $linkColor:#409EFF;
  $successColor:#67C23A;
  $borderColor:#eee;
  .change{
    color: $linkColor;
    cursor: pointer;
    display: inline-block;
    &:hover{
      text-decoration: underline;
    }

  }
  .set{
    color: $successColor;
    display: inline-block;
    margin-right: 20px;
    i{
      font-style: normal;
      padding-right: 8px;
    }
  }
  .unset{
    color: $warnColor;
  }
</style>
