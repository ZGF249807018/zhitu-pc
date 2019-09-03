<template>
  <div class="table">
    <div class="crumbs">
      <h1 class="container-title">背调订单</h1>
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
        <div class="handle-input time-input">
          <el-date-picker
            v-model="timeRange"
            @change="changeTimeRange"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-input clearable="" class="input-name" v-model="candidateName" placeholder="请输入候选人"></el-input>
        <div class="search-btn"><el-button type="primary" icon="search" @click="search">查询</el-button></div>
      </div>
      <el-table :data="recordData" border style="width: 100%" ref="multipleTable">
        <el-table-column prop="orderNo" label="订单编号" ></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" style="padding-right: 0" width="100"></el-table-column>
        <el-table-column prop="candidateName" label="候选人"> </el-table-column>
        <el-table-column prop="packageName" label="套餐类型"></el-table-column>
        <el-table-column prop="price" label="订单金额（元）" :formatter="dateFormat2"></el-table-column>
        <el-table-column prop="activityConcessions" label="优惠金额（元）" :formatter="dateFormat2"></el-table-column>
        <el-table-column prop="couponConcessions" label="抵扣金额（元）" :formatter="dateFormat2"></el-table-column>
        <el-table-column prop="actualPay" label="实付金额（元）" :formatter="dateFormat2"></el-table-column>
        <el-table-column  label="状态" >
          <template slot-scope="scope" >
            <el-popover trigger="hover" placement="top" v-if="scope.row.status !== 3 ">
              <p>{{ scope.row.description}}</p>
              <div slot="reference" class="name-wrapper" >
                {{ scope.row.orderStatus}}
              </div>
            </el-popover>
            <div slot="reference" class="name-wrapper" v-else>
              {{ scope.row.orderStatus}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button @click="details(scope.$index, scope.row)" type="text" size="small">{{scope.row.details}}</el-button>
            <el-button @click="cancel(scope.$index, scope.row)" type="text" size="small" ref="btn" >
              {{scope.row.cancel}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" background layout="prev, pager, next" :total="total" v-if="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  const moment = require('moment')
  import { mapGetters } from 'vuex'
  import { backgroundList, backgroundDetails, cancelOrder } from '@/api/order'
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
        recordData: [],
        value: '',
        againStatus: false,
        total: '',
        currentPage: 1,
        orderStatus: '取消订单',
        pickerBeginDateBefore: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        options: [
          {
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '待授权'
          }, {
            value: '2',
            label: '已授权'
          }, {
            value: '3',
            label: '已完成'
          }, {
            value: '4',
            label: '已取消（授权过期）'
          }, {
            value: '5',
            label: '已取消（用户取消）'
          }],
        pageSize: 10,
        pageNum: 1,
        candidateName: '',
        startTime: days(30),
        endTime: days2(0),
        timeRange: [days(30),days2(0)]
      }
    },
    created() {
      this.sxyInfo.start = this.startTime
      this.sxyInfo.end = this.endTime
      this.getList(this.pageSize, this.pageNum, this.startTime, this.endTime, this.candidateName)
    },
    methods: {
      changeTimeRange (time) {
        this.startTime = time[0]
        this.endTime = time[1]
      },
      statusFormat(row, column) {
        const date = row[column.property]
        if (date === 1) {
          return '待授权'
        } else if (date === 2) {
          return '已授权'
        } else if (date === 3) {
          return '已完成'
        } else if (date === 4) {
          return '已取消（授权过期）'
        } else if (date === 5) {
          return '已取消（用户取消）'
        } else {
          return '待支付'
        }
      },
      chooseTimeRange(t) {
        this.startTime = t[0]
        this.endTime = t[1]
      },
      getList(pageSize, pageNum, startTime, endTime, candidateName) {
        backgroundList(this.tid, startTime, endTime, candidateName, this.value, pageSize, pageNum).then((response) => {
          this.recordData = response.data.list
          console.log(this.recordData)
          if(this.recordData) {
            for (const i of this.recordData) {
              i.details = '详情'
              // i.cancel = '取消'
              // i.again = '再次发起'
              switch (i.status) {
                case 0 :
                  i.orderStatus = '未支付'
                  break
                case 1 :
                  i.description = '请在3天内完成授权，过期后自动取消订单，金额原路返回'
                  i.orderStatus = '待授权'
                  i.cancel = '取消'
                  break
                case 2 :
                  i.orderStatus = '已授权'
                  break
                case 3 :
                  i.orderStatus = '已完成'
                  break
                case 4 :
                  i.description = '授权过期'
                  i.orderStatus = '已取消'
                  i.cancel = '再次发起'
                  break
                case 5 :
                  i.description = '用户取消'
                  i.orderStatus = '已取消'
                  i.cancel = '再次发起'
                  break
              }
            }
          }
          console.log(this.recordData)
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
      dateFormat2(row, column) {
        const date = row[column.property]
        if (date) {
          return date / 100
        } else {
          return 0
        }
      },
      handleCurrentChange(e) {
        this.getList(this.pageSize, e, this.startTime, this.endTime, this.candidateName)
      },
      search() {
        console.log(this.value)
        this.currentPage = 1
        this.startTime = moment(this.startTime).format('YYYY-MM-DD HH:mm:ss')
        this.endTime = moment(this.endTime).format('YYYY-MM-DD HH:mm:ss')
        this.getList(this.pageSize, this.pageNum, this.startTime, this.endTime, this.candidateName)
      },
      details(index, row) {
        console.log(index)
        console.log(row.orderNo)
        this.$router.push({ path: 'orderDetails', query: { thisId: row.orderNo }})
      },
      cancel(index, row) {
        if (row.status === 4 || row.status === 5) {
          this.againStatus = true
        }
        this.resetTable(index, row, this.againStatus)
      },
      resetTable(index, row, status) {
        console.log(status)
        console.log(row)
        if (status) {
          this.$store.commit('SET_CANDITATE', row.candidateId)
          this.$store.commit('SET_PACKAGE', row.packageId)
          this.$store.commit('SET_PRICE', row.price)
          this.$router.push({ path: 'orderConfirm' })
        } else {
          cancelOrder(this.tid, row.orderNo).then(() => {
            row.orderStatus = '已取消'
            row.description = '用户取消'
            row.cancel = '再次发起'
            row.status = 5
            this.$set(this.recordData, index, row)
            this.$message.success('取消成功')
          }).catch(error => {
            this.$message.error(error.msg)
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>
