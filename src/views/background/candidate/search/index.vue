<template>
  <div class="table">
    <div class="crumbs">
      <div class="container-title"><Back></Back><span>候选人库</span></div>
    </div>
    <div class="container">
      <div class="handle-box">
        <label class="list-title">姓名:</label>
        <el-input  class="input-name" v-model="info.name" placeholder=""></el-input>
        <label class="list-title">手机号码:</label>
        <el-input  class="input-name" v-model="info.mobile" placeholder=""></el-input>
        <!--<label class="list-title">授权状态：</label>-->
        <!--<el-select v-model="info.isAccepted" placeholder="授权状态" class="handle-select">-->
          <!--<el-option-->
            <!--v-for="item in options2"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <label class="list-title">背调状态：</label>
        <el-select v-model="info.isSurveyed" placeholder="背调状态" class="handle-select">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="search-btn"><el-button type="primary" icon="search" @click="search">查询</el-button></div>
      </div>
      <div class="btns">
        <el-button type="primary" plain @click="addBtn" class="btn add-btn" >添加 <span class="icon iconfont icon-icon02"></span> </el-button>
        <el-button type="primary"   @click="downloadBtn" class="btn download-btn" :disabled="this.lists.length === 0">导出</el-button>
        <a :href="zip" rel="external nofollow"  download="" class="link" id="zip"></a>
      </div>
      <el-table :data="recordData" border stripe style="width: 100%" ref="multipleTable" :fit="true"  @row-click="listChange" @selection-change="selsChange">
        <el-table-column  type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" style="padding-right: 0"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" > </el-table-column>
        <el-table-column prop="position" label="面试岗位"></el-table-column>
        <el-table-column prop="highestEducation" label="最高学历"></el-table-column>
        <el-table-column prop="workingNum" label="工作年限" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="isSurveyed" label="背调状态"  :formatter="surveyed"></el-table-column>

        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button @click="details(scope.$index, scope.row)" type="text" size="small" class="view">查看</el-button>
            <el-button @click="edit(scope.$index, scope.row)"  type="text" size="small" class="edit">编辑</el-button>
            <el-button @click="deleteList(scope.$index, scope.row)" type="text" size="small" class="delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!--<el-button @click="sendCheck" type="primary" class="btn download-btn fl" :disabled="this.lists.length === 0">发起背调</el-button>-->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" background layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog
      title="应聘登记表"
      :visible.sync="dialogFormVisible" width="920px" v-loading="loadingPdf"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <Details :indexId="dId" v-if="dialogFormVisible"></Details>
      <div class="dialogBtns">
        <!--<a href="#" @click="printView">打印</a>-->
        <a @click="printView" >PDF下载</a>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { candidateList, batchDownload, candidateDelete } from '@/api/order'
  import Cookies from 'js-cookie'
  import Back from '@/components/Back/index'
  import Details from '../details/index'
  import html2canvas from '../../../../../static/html2canvas'
  import jsPDF from '../../../../../static/jsPdf'
  export default {
    name: 'order',
    computed: {
      ...mapGetters([
        'tid',
        'uid',
        'tctype'
      ])
    },
    components: { Back, Details },
    data() {
      return {
        zipUrl: process.env.IMG_API,
        zip: '',
        dTime: '',
        zipName: '',
        loadingPdf: false,
        htmlTitle: '应聘登记表',
        dialogFormVisible: false,
        idx: -1,
        delVisible: false,
        lists: '',
        dId: 0,
        pdfUrl: '',
        recordData: [],
        cId: 0,
        info: {
          isSurveyed: null,
          mobile: null,
          tenantId: '',
          // userId: '',
          name: null,
          pageNo: 1,
          pageSize: 10
        },
        currentPage: 1,
        check: '',
        total: 0,
        options1: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '0',
            label: '未背调'
          }, {
            value: '1',
            label: '已背调'
          }],
        options2: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '0',
            label: '拒绝背调'
          }, {
            value: '1',
            label: '同意背调'
          }]
      }
    },

    created() {
      this.getList(this.info)
    },
    methods: {
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === 1) {
          return '1-3年'
        } else if (date === 2) {
          return '3-5年'
        } else if (date === 3) {
          return '5-10年'
        } else if (date === 4) {
          return '10年以上'
        } else if (!date) {
          return ''
        }
      },
      dialogForm() {
        this.dialogFormVisible = false
      },
      surveyed(row, column, cellValue) {
        if (cellValue) { return '已背调' } return '未背调'
      },
      selsChange(sels) {
        this.lists = sels
        console.log('selsChange')
        console.log(this.lists)
        // Object.assign({}, sels.orderNo)
      },
      listChange(row, event, column) {
      },
      downloadBtn() {
        const nums = this.lists.map(item => item.id).join()
        this.getZip(nums)
      },
      getZip(nums) {
        batchDownload(this.tid, nums).then((response) => {
          if (!response.data) {
            this.$message.error('文件不存在')
          }
          const str = response.data
          this.zip = this.zipUrl + str
          this.zipName = str.slice(15)
          console.log(this.zipName)
          const downLoad = document.getElementById('zip')
          downLoad.downLoad = this.zipName
          setTimeout(() => {
            downLoad.click()
          }, 500)
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      addBtn() {
        this.$router.push({ path: 'add' })
      },
      handleCurrentChange(e) {
        this.info.pageNo = e
        this.getList(this.info)
      },
      getList(e) {
        this.info.tenantId = this.tid
        // this.info.userId = this.uid
        candidateList(e).then((response) => {
          this.recordData = response.data.list
          this.total = response.data.total
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      acceptStatus(row, column, cellValue) {
        if (cellValue) { return '已授权' } return '未授权'
      },
      surveyStatus(row, column, cellValue) {
        if (cellValue) { return '已背调' } return '未背调'
      },
      details(index, row) {
        console.log('index：' + index)
        console.log(row)
        this.dialogFormVisible = true
        this.dId = row.id
      },
      edit(index, row) {
        console.log(row)
        this.$router.push({ path: 'candidateEdit', query: { id: row.id }})
      },
      deleteList(index, row) {
        this.idx = index
        this.cId = row.id
        this.delVisible = true
      },
      deleteRow() {
        candidateDelete(this.cId).then(() => {
          this.recordData.splice(this.idx, 1)
          this.delVisible = false
          this.$message.success('删除成功')
        }).catch(error => {
          this.$message.error(error.msg)
          this.loading = false
        })
      },
      sendCheck() {
        const list = this.lists.map(item => item.id).join()
        console.log(list)
        this.$store.commit('SET_CANDITATE', list)
        // this.$router.push({ path: '/background/check', query: { type: 'candidate' }})
        this.$router.push({ path: '/background/check' })
        this.$store.commit('SET_ORDERINFOTXT', `已选择 ${this.obj.length} 位候选人`)
        alert(this.obj.length)
      },
      search() {
        this.currentPage = 1
        this.getList(this.info)
      },
      printView() {
        this.getZip(this.dId)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .view{
    span{
      color: #2961E9;
    }
  }
.edit{
  span{
    color: #2BBB59;
  }
}
.delete{
  span{
    color: #FF0000;
  }
}
  .btns{
    margin: 33px 0;
  }
  .add-btn{
    width: 160px;
    background: #fff;
    border-color: #5E9BF2;
    color: #5E9BF2;
  }
  .download-btn{
    width: 160px;
  }
  .list-title{
    margin-right: 15px;
  }
  .input-name{
    width: 150px;
    margin-right: 15px;
  }
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
    margin-right: 15px;
  }

  .handle-input {
    display: inline-block;
  }
  .time-input{
    margin-right: 16px;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .search-btn{
    display: inline-block;
    margin-left: 15px;
  }
  .dialogBtns{
    position: absolute;
    right: -150px;
    top: 19%;
    a{
      display: block;
      width: 120px;
      height: 40px;
      border: 2px solid rgba(255,255,255,1);
      box-shadow: 0px 3px 7px 0px rgba(255,255,255,0.5);
      border-radius: 4px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      &:first-child{
        margin-bottom: 40px;
      }
      &:hover{
        background-color: #409EFF;
      }
    }
  }
</style>
