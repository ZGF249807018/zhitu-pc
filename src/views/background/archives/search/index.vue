<template>
  <div class="table">
    <div class="crumbs">
      <h1 class="container-title">员工档案</h1>
    </div>
    <div class="container">
      <div class="handle-box">
        <label class="list-title">部门:</label>
        <el-input  class="input-name" v-model="department" placeholder=""></el-input>
        <label class="list-title">岗位:</label>
        <el-input  class="input-name" v-model="station" placeholder=""></el-input>
        <label class="list-title">姓名:</label>
        <el-input  class="input-name" v-model="name" placeholder=""></el-input>
        <div class="search-btn"><el-button type="primary" icon="search" @click="search">查询</el-button></div>
      </div>
      <div class="btns">
        <el-button type="primary"  @click="sendReport" class="btn">下载EXCEL模板</el-button>
        <a href="http://pdf2.tianyanbd.cn/reports/template.xlsx"  id="download"></a>
        <el-button type="info"  @click="downLoadReport" class="btn red" plain>下载员工档案</el-button>
        <el-button  type="primary"  @click="upLoadExcel" class="btn" plain>上传员工档案</el-button>
      </div>

      <el-table :data="recordData" border style="width: 100%" ref="multipleTable" :fit="true"  @row-click="listChange" @selection-change="selsChange">
        <el-table-column  type="selection"  width="55"></el-table-column>
        <el-table-column prop="department" label="部门" > </el-table-column>
        <el-table-column prop="position" label="岗位"></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="mobile" label="手机号码"></el-table-column>
        <el-table-column prop="birthday" label="出生年月" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="month" label="生日" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="startTime" label="入职时间" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="workAge" label="工龄"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" background layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  const moment = require('moment')
  import { mapGetters } from 'vuex'
  import { archivesInfo, archivesUpload, archivesExport } from '@/api/info'
  export default {
    name: 'order',
    computed: {
      ...mapGetters([
        'tid',
        'uid'
      ])
    },
    data() {
      return {
        recordData: [],
        department: '',
        station: '',
        name: '',
        orderNo: '',
        userId: '',
        lists: '',
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageNum: 1
      }
    },
    watch() {

    },
    created() {
      this.getList(this.pageSize, this.pageNum)
    },
    methods: {
      getList(pageSize, pageNum) {
        archivesInfo(pageSize, pageNum, this.tid).then((response) => {
          this.recordData = response.data.list
          this.total = response.data.total
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      upLoadExcel() {
        archivesUpload(this.tid, this.tid, file).then(() => {
          this.$message.success('上传成功')
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      selsChange(sels) {
        this.lists = sels
        console.log('selsChange')
        console.log(this.lists)
      },
      listChange(row, event, column) {
        this.$refs.table.toggleRowSelection(row)
        console.log('row')
        console.log(row)
      },
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      handleCurrentChange(e) {
        this.getList(this.pageSize, e)
      },
      search() {
        this.currentPage = 1
        this.getList(this.pageSize, this.pageNum)
      },
      sendReport() {
        document.getElementById('download').click()
      },
      downLoadReport() {
        archivesExport(this.tid).then((response) => {
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .btns{
    margin: 33px 0;
    display: flex;
    justify-content: space-between;
    .btn{
      width: 17%;
      &.red{
        color: #FF0000;
        background: #EBEBEB;
      }
    }
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
    margin-left: 20px;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .search-btn{
    display: inline-block;
    margin-left: 20px;
  }
  .report-btn{
    display: flex;
    margin-bottom: 20px;
    .btn{
      margin-right: 20px;
      padding-right: 5vh;
      padding-left: 5vh;
    }
  }
</style>
