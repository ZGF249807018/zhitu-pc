<template>
  <div class="table report-search">
    <div class="crumbs">
      <h1 class="container-title">背调报告</h1>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="value" placeholder="操作人" class="handle-select">
          <el-option
            v-for="item in accontName"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="timeRange"
          @change="changeTimeRange"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input clearable="" class="input-name" v-model="candidateName" placeholder="请输入候选人"></el-input>
        <div class="search-btn"><el-button type="primary" icon="search" @click="search">查询</el-button></div>
      </div>
      <div class="report-btn">
        <el-button type="primary"  @click="sendReport" class="btn"  :disabled="this.lists.length === 0">发送报告</el-button>
        <el-button type="info"  @click="downLoadReport" class="btn" plain>下载报告</el-button>
        <a :href="pdfUrl+thisPdf"  id="download"></a>
      </div>

      <el-table :data="recordData" border style="width: 100%" ref="multipleTable" :fit="true"  @row-click="listChange" @selection-change="selsChange">
        <el-table-column  type="selection"  width="55"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号" ></el-table-column>
        <el-table-column prop="reportCreateTime" label="创建时间" :formatter="dateFormat" style="padding-right: 0"></el-table-column>
        <el-table-column prop="candidateName" label="候选人" > </el-table-column>
        <el-table-column prop="packageName" label="套餐类型"></el-table-column>
        <el-table-column prop="amount" label="金额（元）" :formatter="dateFormat2"></el-table-column>
        <el-table-column prop="userName" label="操作人"></el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button @click="details(scope.$index, scope.row)" type="text" size="small">查看报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" background layout="prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="选择账号" :visible.sync="dialogTableVisible" width="546px">
      <el-checkbox-group v-model="checkVal">
        <div class="account-box">
          <div class="type">当前账号</div>
          <ul>
            <li > <el-checkbox :label="uid">{{account}}</el-checkbox></li>
          </ul>
          <div class="type">其他账号</div>
          <ul>
            <li v-for="(i, index) in checkList">
              <el-checkbox :label="i.id" >{{i.account}}</el-checkbox>
            </li>
          </ul>
        </div>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendReportSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  const moment = require('moment')
  import { mapGetters } from 'vuex'
  import { reportList, reportSend, reportDownload } from '@/api/report'
  import { findAll } from '@/api/info'
  import { days, days2 } from '@/utils/index'
  import Cookies from 'js-cookie'
  export default {
    name: 'order',
    computed: {
      ...mapGetters([
        'tid',
        'uid',
        'account'
      ])
    },
    data() {
      return {
        sxyInfo: { start: '', end: '' },
        dialogTableVisible: false,
        checkVal: [],
        checkList: [],
        recordData: [],
        pdfUrl: process.env.PDF_API,
        pdfUrl2: process.env.PDF_API2,
        thisPdf: '',
        orderNo: '',
        userId: '',
        value: '',
        lists: '',
        total: 0,
        currentPage: 1,
        pickerOptionsStart: {
          shortcuts: [{
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', date)
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', date)
            }
          }],
          disabledDate: time => {
            const endDateVal = this.sxyInfo.end
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime()
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            const beginDateVal = this.sxyInfo.start
            if (beginDateVal) {
              return (time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              )
            }
          }
        },
        pageSize: 10,
        pageNum: 1,
        candidateName: null,
        accontName: [],
        startTime: days(30),
        endTime: days2(0),
        timeRange: [days(30),days2(0)]
      }
    },
    watch() {

    },
    created() {
      this.sxyInfo.start = this.startTime
      this.sxyInfo.end = this.endTime
      this.getList(this.pageSize, this.pageNum, this.startTime, this.endTime, this.candidateName)
      findAll(this.tid).then((response) => {
        const arr = response.data
        const obj = { id: null, name: '全部', account: '', mobile: '', email: '' }
        arr.unshift(obj)
        this.accontName = arr
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    methods: {
      changeTimeRange (time) {
        this.startTime = time[0]
        this.endTime = time[1]
      },
      dateFormat2(row, column) {
        const date = row[column.property]
        if (date) {
          return date / 100
        } else {
          return 0
        }
      },
      selsChange(sels) {
        this.lists = sels
        console.log('selsChange')
        console.log(this.lists)
        // Object.assign({}, sels.orderNo)
      },
      listChange(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
        console.log('row')
        console.log(row)
      },
      chooseTimeRange(t) {
        this.startTime = t[0]
        this.endTime = t[1]
      },
      getList(pageSize, pageNum, startTime, endTime, candidateName) {
        reportList(this.tid, this.value, candidateName, startTime, endTime, pageSize, pageNum).then((response) => {
          this.recordData = response.data.list
          this.total = response.data.total
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      dateFormat(row, column) {
        const date = row[column.property]
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      handleCurrentChange(e) {
        this.getList(this.pageSize, e, this.startTime, this.endTime, this.candidateName)
      },
      search() {
        this.currentPage = 1
        this.startTime = moment(this.startTime).format('YYYY-MM-DD HH:mm:ss')
        this.endTime = moment(this.endTime).format('YYYY-MM-DD HH:mm:ss')
        this.getList(this.pageSize, this.pageNum, this.startTime, this.endTime, this.candidateName)
      },
      details(index, row) {
        if (!row.filePath) {
          this.$message.warning('文件不存在')
          return false
        }
        window.open(this.pdfUrl2 + row.filePath, '_blank')
      },
      sendReport() {
        this.dialogTableVisible = true
        console.log(this.lists)
        this.checkList = this.accontName
        this.checkList.forEach((i, v) => {
          if (i.account === this.account) {
            this.checkList.splice(v, 1)
          }
        })
        const nums = this.lists.map(item => item.orderNo).join()
        const ids = this.lists.map(item => item.userId).join()
        this.orderNo = nums
        this.userId = ids
        console.log(this.checkList)
        this.checkList.splice(0, 1)
      },
      sendReportSubmit() {
        if (this.checkVal.length === 0) {
          this.$message.warning('请选择账号')
        } else {
          const val = this.checkVal.map(item => item).join()
          reportSend(this.orderNo, val).then((response) => {
            this.$message.success('发送成功')
          }).catch(error => {
            this.$message.error(error.msg)
          })
          this.dialogTableVisible = false
        }
      },
      downLoadReport() {
        if (this.lists.length > 0) {
          const nums = this.lists.map(item => item.orderNo).join()
          this.orderNo = nums
          reportDownload(this.orderNo).then((response) => {
            Cookies.set('downloadZip', response.data)
            const newPage = this.$router.resolve({ path: '/downloadZip', query: { id: 2 }})
            window.open(newPage.href, '_blank')
          }).catch(error => {
            this.$message.error(error.msg)
          })
        } else {
          this.$message.warning('请选择候选人')
        }
        console.log('orderNo')
        console.log(this.orderNo)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .account-box{
    width: 100%;
    display: inline-block;
    .type{
      width: 100%;
      display: inline-block;
      background: #EBEBEB;
      color: #333;
      font-size: 14px;
      padding: 5px 45px;
    }
    ul{
      overflow: hidden;
      width: 90%;
      margin: 0 auto;
      li{
        float: left;
        padding: 10px 0 10px 20px;
      }
    }
  }
  .input-name{
    width: 150px;
  }
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
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
