<template>
  <div>
    <div class="item-container item-bar " style="padding-top: 20px;">
      <div class="coupon-container item-container package-container" style="margin: 0;">
        <div class="tab-list">
          <div class="top">选择套餐：</div>
          <div class="pgtext">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick"  @tab-remove="removeTab">
            <el-tab-pane :label="item.name" :name="item.id" v-for="(item, index) in list" :key="index"></el-tab-pane>
            <el-tab-pane :label="item.name" :name="item.id" :closable="item.close" v-for="(item, index) in list2" :key="index"></el-tab-pane>
          </el-tabs>
          </div>
          <div class="icon iconfont  add-package "  @click="addSelf" >定制套餐<i class="icon iconfont icon-icon02" ></i></div>
        </div>
      </div>
      <div class="table-container package-container">

        <div class="fixed-package-list">
            <el-checkbox-group v-model="checked" @change="checkedList">
              <ul class="package-list icon-checkbox-custom">
                <li class="item-lists" v-for="i in items"  :key="i.id">
                  <el-checkbox  :label="i.id" :name="i.price"  :id="i.id" class="icon iconfont" v-model="checkedIcon"  disabled="true" :class="i.icon" border >
                    <span class="fixed-package-name">{{i.name}}</span>
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
                </li>
              </ul>
            </el-checkbox-group>
        </div>
        <div class="next-btn">
          <div class="info num">套餐价格：<span class="red">{{priceNum | decimalNum }}</span>元</div>
        </div>
      </div>

      <div class="bottom">
        <div class="top">
          <div>添加候选人:</div>
          <div @click="dialogFormVisible = true" class="out-link">{{orderInfoTxt || '批量核验每次核验100位候选人'}}</div>
        </div>
        <div class="btn">
          <el-button type="primary"  @click="nextBtn">下一步</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="添加候选人" :visible.sync="dialogFormVisible" width="75%">
      <order @dialogStatus="dialogForm"></order>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="333px"
      class="package-dialog"
    >
      <span>{{certifyTip}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="goAuth">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="480px"
      class="packageDialog"
    >
      <span style="text-align: center;display: block;font-size: 20px;">确定删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="deletePackage">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="实名核验完成"
      class="tc"
      :visible.sync="show1"
      @close='goLink'
      width="380px"
      center
    >
      <div><span class="link">{{successNum}}</span>人一致，<span class="red">{{failureNum}}</span>不一致</div>
      <div>下载 <a :href="failureExeclUrl + failureExcel" rel="external nofollow" download="实名核验失败列表.xlsx" class="link">实名核验失败列表</a></div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="goLink">确定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { fixedList, itemList, customList, deleteCustom, pkgDetails } from '@/api/report'
  import Qs from 'qs'
  import order from '../search/index'
  export default {
    name: 'details',
    computed: {
      ...mapGetters([
        'tid',
        'certify',
        'orderInfoTxt',
        'show1',
        'failureExcel',
        'failureNum',
        'successNum',
      ])
    },
    data() {
      return {
        failureExeclUrl: process.env.Excel_API,
        dialogFormVisible: false,
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        editableTabsValue2: '2',
        certifyTip: '',
        deleteId: 0,
        priceNum: 0,
        ischecked: false,
        checkedIcon: true,
        checked: [],
        showDialog: true,
        type: '',
        tabIndex: 2,
        visible: false,
        list: [],
        list2: [],
        items: [],
        activeText: '',
        activeName: '',
      }
    },
    created() {
      fixedList().then((response) => {
        if (response.data) {
          this.list = response.data
          this.activeText = response.data[0].name
          this.activeName = response.data[0].id
          customList(this.tid).then((response) => {
            if (response.data) {
              this.list2 = response.data
              for (const i of this.list2) {
                i.close = 'closable'
              }
            }
          }).catch(error => { this.$message.error(error.msg) })
          this.getList(response.data[0].id)
          this.type = response.data[0].id
          pkgDetails(response.data[0].id).then((response) => {
            if (response) {
              this.priceNum = response.price
            }
          }).catch(error => { this.$message.error(error.msg) })
        }
      }).catch(error => { this.$message.error(error.msg) })
    },
    components: { order },
    methods: {
      dialogForm() {
        this.dialogFormVisible = false
      },
      removeTab(targetName) {
        this.deleteId = targetName
        this.dialogVisible2 = true
      },
      deletePackage() {
        const tabs = this.list2
        this.dialogVisible2 = false
        deleteCustom(this.tid, this.deleteId).then(() => {
          this.list2 = tabs.filter(tab => tab.id !== this.deleteId)
          this.$message.success('删除成功')
          location.reload()
        }).catch(error => { this.$message.error(error.msg) })
      },
      goAuth() {
        this.$router.push({ path: '/personal/auth' })
      },
      goLink() {
        this.$store.commit('SET_SHOW1', false)
        this.dialogFormVisible = false
      },
      nextBtn() {
        const query = Qs.parse(location.hash.substring(19))
        switch (this.certify.toString()) {
          case '0':
            this.certifyTip = '该账号还未认证，是否去认证？'
            this.dialogVisible = true
            break
          case '2':
            this.certifyTip = '认证失败，是否重新认证？'
            this.dialogVisible = true
            break
          case '1':
            this.$message.warning('账户审核中')
            break
          case '3':
            this.$store.commit('SET_PACKAGE', this.type)
            this.$store.commit('SET_PRICE', this.priceNum)
            if (query.type !== 'candidate') {
              if (this.orderInfoTxt) {
                this.$router.push({ path: 'orderConfirm',query:{activeText: this.activeText} })
              } else {
                this.$message.warning('请选择候选人')
              }
            } else {
              this.$router.push({ path: 'orderConfirm' })
            }
            break
        }
      },
      addSelf() {
        this.$router.push({ path: 'newpackage' })
      },
      getList(e) {
        itemList(e).then((response) => {
          this.items = response.data
          response.data.map((item,index)=>{
            this.checked.push(item.id)
          })
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      handleClick(tab, event) {
        this.activeText = event.target.innerText
        this.checked = []
        this.type = event.target.getAttribute('id').replace(/[^0-9]/ig, '')
        this.getList(this.type)
        pkgDetails(this.type).then((response) => {
          if (response) {
            this.priceNum = response.price
          }
        }).catch(error => { this.$message.error(error.msg) })
      },
      addBtn() {
        this.$router.push({ path: 'orderpackage' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .icon-icon02{
    position: relative !important;
    top: 0 !important;
    left: 5px !important;
  }
  .packageDialog{
    .dialog-footer{
      width: 60%;
      display: flex;
      justify-content: space-between;
      margin: auto;
      .el-button{
        width: 40%;
      }
    }
  }
  .add-package{
    width: 126px;
    height: 42px;
    text-align: center;
    line-height: 38px;
    color: #5e9bf2;
    background: white;
    border: 2px solid #5e9bf2;
    border-radius: 4px;
    position: absolute;
    top: 18px;
    left: 775px;
    font-size: 16px !important;
    cursor: pointer;
    &:hover{
      background-color: #ecf5ff;
      color: #409eff;
      border-color: #c6e2ff;
    }
    &:active{
      border-color: #3a8ee6;
    }
  }
  .unit{
    color: #333;
  }
  .pgtext{
    margin-left: 141px;
  }
  .pgtext .el-tabs__nav div .el-tabs__item .is-top{
    font-size: 16px;
  }
  .fixed-package-list{
    margin-bottom: 94px;
  }
  .bottom{
    border-top: 1px solid #eee;
    width: 100%;
    padding: 30px;
    .top{
      display: flex;
      padding: 20px 0px;
      width: 100%;
      div{
        font-size: 18px;
        font-family: 'MicrosoftYaHei';
        &:first-child{
          margin-right: 10px;
        }
      }
    }
  .btn{
    margin-left: 0px;
    margin-top: 40px;
    text-align: center;
    .el-button--primary{
      width: 300px;
      height: 40px;

    }
  }
  }
  .tab-list{
    .top{
      position: absolute;
      top: 30px;
      left: 31px;
      font-size: 18px;
      font-family: 'MicrosoftYaHei';
    }
  }
  .item-lists{
    width: 14%;
    float: left;
  }
  .package-list{
    overflow: hidden;
    background: #fff;
    position: relative;
  }
  .el-checkbox-group{
    overflow: hidden;
  }
  .table-container{
    padding: 20px;
  }
  .out-link{
    border-bottom: 1px solid #b2b2b2;
    padding-bottom: 5px;
    color: #5E9BF2;
  }
  .fixed-package-name{
    color: #409EFF;
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
  .icon-icon02{
    display: inline-block;
    font-size: 16px !important;
    position: absolute;
    top: 48px;
    left: 40%;
    cursor: pointer;
  }
  .package-container{
    position: relative;
  }
    .next-btn{
      float: left;
      position: absolute;
      bottom: 28px;
      left: 32px;
      .info{
        display: inline-block;
        &:first-child{
          margin-right: 20px;
        }
      }
      .num{
        font-family: 'MicrosoftYaHei';
        font-size: 18px;
        .red{
          position: relative;
          top: 2px;
        }
      }
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
    font-weight: bold;
    font-size: 26px;
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
