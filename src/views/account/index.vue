<template>
  <div class="table">
    <div class="crumbs">
      <h1 class="container-title">交易记录</h1>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="status" placeholder="订单状态" class="handle-select mr10">
          <el-option key="1" label="已完成" value="已完成"></el-option>
          <el-option key="2" label="已授权" value="已授权"></el-option>
        </el-select>
        <el-select v-model="type" placeholder="账号类型" class="handle-select mr10">
          <el-option key="1" label="全部" value="全部"></el-option>
          <el-option key="2" label="当前主账号" value="当前主账号"></el-option>
          <el-option key="2" label="全部子账号" value="全部子账号"></el-option>
        </el-select>
        <el-input v-model="name" placeholder="候选人" class="handle-input mr10"></el-input>
        <div class="handle-input mr10">
          <el-date-picker
            v-model="value5"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
        <div class="search-btn"><el-button type="primary" icon="search" @click="search">搜索</el-button></div>

      </div>
      <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="订单编号" sortable width="150">
        </el-table-column>
        <el-table-column prop="name" label="创建时间" width="120">
        </el-table-column>
        <el-table-column prop="address" label="候选人" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="address" label="金额" :formatter="dateFormat2">
        </el-table-column>
        <el-table-column prop="address" label="套餐类型" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="address" label="状态" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="address" label="账号类型" :formatter="formatter">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data() {
      return {
        list: null,
        listLoading: true,
        url: './static/order.json',
        tableData: [],
        cur_page: 1,
        multipleSelection: [],
        select_cate: '',
        select_word: '',
        del_list: [],
        is_search: false,
        editVisible: false,
        delVisible: false,
        form: {
          name: '',
          date: '',
          address: ''
        },
        idx: -1,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        timeValue: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: ''
      }
    },
    created() {
      this.getList()
    },
    dateFormat2(row, column) {
      const date = row[column.property]
      if (date) {
        return date / 100
      } else {
        return 0
      }
    },
    computed: {
      data() {

      }
    },
    methods: {
      // 分页导航
      handleCurrentChange(val) {
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
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .search-btn{
    float: right;
    margin-right: 12%;
  }
</style>
