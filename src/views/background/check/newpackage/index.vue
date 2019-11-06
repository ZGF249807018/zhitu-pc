<template>
  <div>
    <div class="table">
      <div class="crumbs">
        <div class="container-title"><Back></Back><span>定制套餐</span></div>
      </div>
      <div class="item-bar table-container" style="box-shadow:none">
        <div class="title" style="border-bottom:none">
          <el-input  class="input-name new-package-input" v-model="name" placeholder="请输入套餐名称" ></el-input>
          <div class="info" style="margin-left: 30px;"><el-button type="primary"  @click="nextBtn">保存</el-button></div>
          <div class="next-btn">
            <div class="info num">合计：<span class="red">{{priceNum + allPer + allRes | decimalNum }}</span> 元</div>
            <!--<div class="info back"><el-button type="primary"  @click="prevBtn">返回</el-button></div>-->

          </div>
        </div>
        <div>
                <ul class="package-list icon-checkbox-custom">
                  <el-checkbox-group v-model="checked">
                    <li class="item-lists" v-for="(i, index) in itemList" :key="index">
                      <el-checkbox :checked=" i.selected === 1 ? true : i.status " :label="i.code" :name="i.price"  class="icon iconfont "  @change="thisPrice" :disabled="i.selected === 1" :class="i.icon" border >
                        {{i.name}}
                        <el-popover
                          placement="top-start"
                          title=""
                          width="250"
                          trigger="hover"
                          :content="i.description">
                          <el-button slot="reference" class="pop-info">
                            <i class="icon iconfont icon-gantanhao"></i>
                          </el-button>
                        </el-popover>
                      </el-checkbox>
                      <div class="tc">
                        <span class="red"> <span class="unit">￥</span>{{i.price | decimalNum }}</span>
                      </div>
                    </li>
                  </el-checkbox-group>
                  <li class="item-lists">
                    <el-checkbox :checked="gzllhsList.selected === 1 ? true : gzllhsList.status " :label="gzllhsList.code" :name="gzllhsList.price"  class="icon iconfont "  @change="changeWork" :disabled="gzllhsList.selected === 1" :class="[ 'icon-'+gzllhsList.id ]" border >
                      {{gzllhsList.name}}
                      <el-popover
                        placement="top-start"
                        title=""
                        width="250"
                        trigger="hover"
                        :content="gzllhsList.description">
                        <el-button slot="reference" class="pop-info">
                          <i class="icon iconfont icon-gantanhao"></i>
                        </el-button>
                      </el-popover>
                    </el-checkbox>
                    <div class="tc">
                      <span class="red"> <span class="unit">￥</span>{{gzllhsList.price * perfermanceCount  | decimalNum }}</span>
                      <el-input-number v-model="perfermanceCount" @change="handleChange1" :min="1" :max="3" size="mini" class="num-list" ></el-input-number>
                    </div>
                  </li>
                  <li class="item-lists">
                    <el-checkbox :checked="gzbxjdList.selected === 1 ? true : gzbxjdList.status " :label="gzbxjdList.code" :name="gzbxjdList.price"  class="icon iconfont "  @change="changeExpression" :disabled="gzbxjdList.selected === 1" :class="[ 'icon-'+gzbxjdList.id ]" border >
                      {{gzbxjdList.name}}
                      <el-popover
                        placement="top-start"
                        title=""
                        width="250"
                        trigger="hover"
                        :content="gzbxjdList.description">
                        <el-button slot="reference" class="pop-info">
                          <i class="icon iconfont icon-gantanhao"></i>
                        </el-button>
                      </el-popover>
                    </el-checkbox>
                    <div class="tc">
                      <span class="red"> <span class="unit">￥</span>{{gzbxjdList.price * resumeCount  | decimalNum }}</span>
                      <el-input-number v-model="resumeCount" @change="handleChange2" :min="1" :max="perfermanceCount" size="mini" class="num-list" ></el-input-number>
                    </div>
                  </li>
                </ul>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
  import { mapGetters } from 'vuex'
  import { childList } from '@/api/report'
  import { addCustom } from '@/api/resumeForm'
  import Back from '@/components/Back/index'
  export default {
    name: 'details',
    computed: {
      ...mapGetters([
        'tid',
        'uid'
      ])
    },
    data() {
      return {
        priceNum: 0,
        perfermanceCount: null,
        resumeCount: null,
        perChecked: false,
        resChecked: false,
        allPer: 0,
        allRes: 0,
        checked: [],
        name: '',
        itemList: [],
        gzllhsList: [],
        gzbxjdList: []
      }
    },
    created() {
      childList().then((response) => {
        this.itemList = response.data.itemList
        this.gzllhsList = response.data.gzllhs
        this.gzbxjdList = response.data.gzbxjd
        let num = 0
        for (const item of response.data.itemList) {
          if(item.selected === 1){
            num += item.price
          }
        }
        this.priceNum = num
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    components: { Back },
    methods: {
      prevBtn() {
        this.$router.back(-1)
      },
      thisPrice(e, event) {
        let num = 0
        num = parseInt(event.target.name)
        if (e) {
          this.priceNum += num
        } else {
          this.priceNum -= num
        }
      },
      changeWork(e) {
        if (e) {
          this.allPer = this.gzllhsList.price * this.perfermanceCount
          this.perChecked = true
        } else {
          this.allPer = null
          this.perChecked = false
        }
      },
      changeExpression(e) {
        if (e) {
          this.allRes = this.gzbxjdList.price * this.resumeCount
          this.resChecked = true
        } else {
          this.allRes = null
          this.resChecked = true
        }
      },
      handleChange1(value) {
        this.perfermanceCount = value
        if (this.resumeCount > value) {
          this.resumeCount = value
        }
        if (this.perChecked) {
          this.allPer = this.gzllhsList.price * this.perfermanceCount
          this.allRes = this.gzbxjdList.price * this.resumeCount
        }
      },
      handleChange2(value) {
        this.resumeCount = value
        if (this.perfermanceCount === this.resumeCount) {
          this.$message.warning('工作表现鉴定不能大于工作履历核实')
        }
        if (this.resChecked) {
          this.allRes = this.gzbxjdList.price * this.resumeCount
        }
      },
      nextBtn(e, v) {
        if (this.resChecked && !this.perChecked) {
          this.$message.warning('请先选择工作履历核实')
          return false
        }
        if (!this.name) {
          this.$message.warning('请填写自定义套餐名称')
          return false
        }
        this.perfermanceCount = this.perChecked ? this.perfermanceCount : null
        this.resumeCount = this.resChecked ? this.resumeCount : null
        addCustom(this.tid, this.uid, this.name, this.checked, this.perfermanceCount, this.resumeCount).then((response) => {
          this.$message.success('添加成功')
          this.$router.push({ path: 'check' })
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .item-lists{
    width: 14%;
    float: left;
  }
  .back{
    margin: 0 20px;
  }
  .num-list{
    position: relative;
    top: -4px;
    left: 12px;
  }
  .unit{
    color: #333;
  }
  .package-list{
    overflow: hidden;
    background: #fff;
    position: relative;
    padding: 20px;
  }
  .pop-info{
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    &:hover{
      background: transparent;
    }
  }

  .input-name{
    width: 200px;

  }
  .title{
    display: flex;
    .next-btn{
      margin-left: auto;
      .info{
        display: inline-block;
        &:first-child{
          margin-right: 20px;
        }
      }
      .num{
        font-size: 18px;
        .red{
          position: relative;
          top: 2px;
        }
      }
    }
  }
.el-input__inner{
  width: 386px;
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
    }
  }
  .name{
    float: left;
    width: 120px;
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
    font-size: 20px;
  }
  .icon{
    display: inline-block;
    font-size: 20px;
  }
  .tc-list{
    margin-left: 20px;
    margin-top: 20px;
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
