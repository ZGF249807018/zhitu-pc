<template>
  <div class="table">
    <div class="crumbs">
      <h1 class="container-title">交易记录</h1>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="value" placeholder="交易类型" class="handle-select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--<div class="handle-input time-input">-->
          <!--<el-date-picker-->
            <!--@change="chooseTimeRange"-->
            <!--:picker-options="pickerBeginDateBefore"-->
            <!--v-model="timeValue"-->
            <!--type="datetimerange"-->
            <!--value-format="yyyy-MM-dd HH:mm"-->
            <!--range-separator="至"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期"-->
            <!--align="right">-->
          <!--</el-date-picker>-->
        <!--</div>-->
        <el-date-picker
          :picker-options="pickerOptionsStart"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="chooseTimeRange1"
          v-model="sxyInfo.start"
          type="datetime"
          placeholder="">
        </el-date-picker>
        至
        <el-date-picker
          :picker-options="pickerOptionsEnd"
          value-format="yyyy-MM-dd HH:mm"
          @change="chooseTimeRange2"
          v-model="sxyInfo.end"
          type="datetime"
          placeholder="">
        </el-date-picker>
        <div class="search-btn"><el-button type="primary" icon="search" @click="search">查询</el-button></div>
      </div>
      <el-table :data="recordData" border style="width: 100%" ref="multipleTable">
        <el-table-column prop="tradeNo" label="订单编号" ></el-table-column>
        <el-table-column prop="createTime" label="交易创建时间" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="amount" label="交易金额" :formatter="dateFormat2"> </el-table-column>
        <!-- <el-table-column prop="account" label="账号类型"></el-table-column> -->
          <el-table-column prop="typeName" label="交易类型" ></el-table-column>
        <el-table-column prop="statusName" label="状态"></el-table-column>
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
  import { rechargeRecord } from '@/api/info'
  import { days, days2 } from '@/utils/index'
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
        value: '',
        total: '',
        currentPage: 1,
        options: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '0',
            label: '充值'
          }, {
            value: '1',
            label: '消费'
          }, {
            value: '2',
            label: '退款'
          }],
        pageSize: 10,
        pageNum: 1,
        sxyInfo: { start: '', end: '' },
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
        startTime: days(30),
        endTime: days2(0),
        timeValue: [new Date(new Date(new Date().toLocaleDateString()).getTime()), new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)]
      }
    },
    created() {
      this.sxyInfo.start = this.startTime
      this.sxyInfo.end = this.endTime
      this.getList(this.pageSize, this.pageNum, this.startTime, this.endTime)
    },
    methods: {
      dateFormat2(row, column) {
        const date = row[column.property]
        if (date) {
          return date / 100
        } else {
          return 0
        }
      },
      chooseTimeRange1(e) {
        this.sxyInfo.start = e
        this.startTime = e
      },
      chooseTimeRange2(e) {
        console.log(e)
        this.sxyInfo.end = e
        this.endTime = e
      },
      chooseTimeRange(t) {
        this.startTime = t[0]
        this.endTime = t[1]
        console.log(this.startTime)
        console.log(this.endTime)
        // this.startTime = moment(this.startTime).format('YYYY-MM-DD HH-mm')
        // this.endTime = moment(this.endTime).format('YYYY-MM-DD HH-mm')
      },
      getList(pageSize, pageNum, startTime, endTime) {
        rechargeRecord(pageSize, pageNum, this.tid, startTime, endTime, this.type).then((response) => {
          this.recordData = response.data.list
          this.total = response.data.total
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      },
      pickerBeginDateBefore(e) {
        this.startTime = e
      },
      handleCurrentChange(e) {
        // this.startTime = moment(this.startTime).format('YYYY-MM-DD HH-mm')
        // this.endTime = moment(this.endTime).format('YYYY-MM-DD HH-mm')
        this.getList(this.pageSize, e, this.startTime, this.endTime)
      },
      search() {
        this.type = this.value
        this.currentPage = 1
        // this.startTime = moment(this.startTime).format('YYYY-MM-DD HH-mm')
        // this.endTime = moment(this.endTime).format('YYYY-MM-DD HH-mm')
        console.log(this.startTime)
        console.log(this.endTime)
        this.getList(this.pageSize, this.pageNum, this.startTime, this.endTime)
      }
    }
  }

</script>

<style scoped>
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
</style>
