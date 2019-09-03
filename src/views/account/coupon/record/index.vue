<template>
  <div class="table">
    <div class="crumbs">
      <h1 class="container-title">使用记录</h1>
    </div>
    <div class="container">
      <div class="handle-box">
        <label class="list-title">券类型</label>
        <el-select v-model="value" placeholder="券类型" class="handle-select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <!--<label class="list-title">券状态</label>-->
        <!--<el-select v-model="statusVal" placeholder="券状态" class="handle-select">-->
          <!--<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
        <!--</el-select>-->
        <div class="search-btn"><el-button type="primary" icon="search" @click="search">查询</el-button></div>
      </div>
      <el-table :data="recordData" border style="width: 100%" ref="multipleTable">
        <el-table-column prop="useScene" label="使用场景" :formatter="useScene"></el-table-column>
        <el-table-column prop="name" label="券名称"></el-table-column>
        <el-table-column prop="type" label="券类型" :formatter="couponType"></el-table-column>
        <el-table-column prop="isUse" label="券状态" :formatter="usedStatus"></el-table-column>
        <el-table-column prop="createTime" label="使用时间" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="tradeNo" label="关联订单号" :formatter="orderNoStatus"> </el-table-column>
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
  import { couponRecord } from '@/api/coupon'
  export default {
    name: 'order',
    computed: {
      ...mapGetters(['tid', 'uid'])
    },
    data() {
      return {
        recordData: [],
        value: '',    // 券类型
        statusVal: '',  // 券状态
        total: 0,
        currentPage: 1,
        options: [{ value: '', label: '全部' }, { value: '0', label: '抵用券' }, { value: '1', label: '折扣券' }, { value: '2', label: '满减券' }],
        // status: [{ value: '', label: '全部' }, { value: '0', label: '未过期' }, { value: '1', label: '已过期' }],
        pageSize: 10,
        pageNum: 1
      }
    },
    created() {
      this.getList(this.pageSize, this.pageNum)
    },
    methods: {
      getList(pageSize, pageNum) {
        couponRecord(this.tid, this.value, pageNum, pageSize).then((response) => {
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
      couponType(row, column, cellValue) {
        if (cellValue === 0) {
          return '抵用券'
        } else if (cellValue === 1) {
          return '折扣券'
        }
        return '满减券'
      },
      usedStatus(row, column, cellValue) {
        if (cellValue) { return '已使用' } return '未使用'
      },
      orderNoStatus(row, column, cellValue) {
        if (cellValue) { return cellValue } return '无订单号'
      },
      useScene(row, column, cellValue) {
        if (cellValue) { return '充值' } return '背调下单'
      },
      handleCurrentChange(e) {
        this.getList(this.pageSize, e, this.startTime, this.endTime)
      },
      search() {
        this.currentPage = 1
        this.getList(this.pageSize, this.pageNum)
      }
    }
  }

</script>

<style scoped>
  .list-title{
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
</style>
