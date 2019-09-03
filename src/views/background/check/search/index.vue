<template>
  <div class="table">
    <div class="out-table"  v-loading="loading">
      <el-tabs type="border-card"  @tab-click="tabBtn">
        <el-tab-pane label="手动添加">
          <div class="form-container">
            <el-form label-width="106px" class="auth-form" :model="checkForm" :rules="checkRules" ref="checkForm">
              <el-form-item label="候选人姓名" prop="name">
                <el-input class="auth-input" placeholder="请输入候选人姓名" v-model="checkForm.name" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="idCard">
                <el-input class="auth-input" placeholder="请输入身份证号码" v-model="checkForm.idCard" maxlength="30"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobile">
                <el-input class="auth-input" placeholder="请输入手机号码" v-model="checkForm.mobile" maxlength="11" type="number"></el-input>
              </el-form-item>
              <el-button type="primary" class="add-btn"  :disabled="!checkForm.name || !checkForm.idCard || !checkForm.mobile"  @click="addForm">确定</el-button>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="候选人库">
          <div class="handle-bar">
            <div class="handle-box" >
              <el-input placeholder="输入姓名或手机号搜索" v-model="info.property">
                <el-button slot="append" icon="el-icon-search"  type="primary" @click="search"></el-button>
              </el-input>
            </div>
          </div>
          <el-table :data="recordData" border style="width: 100%" ref="multipleTable" :fit="true"  @row-click="listChange" @selection-change="selsChange">
            <el-table-column  type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" style="padding-right: 0" width="50"></el-table-column>
            <el-table-column prop="name" label="姓名" style="padding-right: 0"></el-table-column>
            <el-table-column prop="idCard" label="身份证号" style="padding-right: 0"></el-table-column>
            <el-table-column prop="mobile" label="手机号码" > </el-table-column>
            <el-table-column prop="position" label="面试岗位"></el-table-column>
            <el-table-column
              prop="isSurveyed"
              label="背调状态"
              :filters="[{ text: '已背调', value: 1 }, { text: '未背调', value: 0 }]"
              :filter-method="filterTag"
              :filter-multiple="false"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <div>{{scope.row.isSurveyed ? '已背调' : '未背调'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="操作" width="60">
              <template slot-scope="scope">
                <el-button @click="details(scope.$index, scope.row)" type="text" size="small">详情</el-button>
                <!--<el-button @click="sendCheck(scope.$index, scope.row)" type="text" size="small">发起背调</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <p>显示第1到第{{info.pageSize}}记录，总共{{total}}记录</p>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" background layout="prev, pager, next" :total="total">
            </el-pagination>
          </div>
          <el-button type="primary" class="add-btn"  :disabled="this.obj.length === 0"  @click="addOrder">确定</el-button>
        </el-tab-pane>
        <el-tab-pane label="批量导入">
          <div class="tip">
            <p><i class="icon iconfont icon-jingshi"></i>请正确填写候选人姓名及身份证号，提供的身份核验会产生费用</p>
            <p>提交候选人的信息，候选人通过系统发送的短信链接24小时内完成电子授权</p>
          </div>
          <p>1、点击下载<a :href="execl" rel="external nofollow" download="候选人批量查询登记表.xlsx" class="link">《候选人批量查询登记表》模版</a> ，按照表中说明填写候选人信息。</p>
          <p>2、您需要必填的信息包括：”姓名、身份证号、手机号“，保存表格为XLS或XLSX     格式，一次批量背调支持1-100位候选人</p>
          <p>3、上传已经编辑好的《候选人批量查询登记表》。</p>
          <div class="df">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="doUpload"
              :limit="1"
              :file-list="fileList"
              :before-upload="beforeUpload">
              <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
              <el-input :placeholder="fileName" class="fileName">
                <template slot="append">上传</template>
              </el-input>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="add-btn btn2"  :disabled="!fileName"  @click="submitUpload()">提交</el-button>
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import { candidateList, candidateList2 } from '@/api/order'
  import { addExecl } from '@/api/info'
  import { getToken } from '@/utils/auth'
  import { checkInputPhone, checkInputID } from '@/utils/check/index'
  import { candidateAdd } from '@/api/resumeForm'
  export default {
    name: 'order',
    computed: {
      ...mapGetters([
        'tid',
        'uid',
        'tctype',
        'candidate'
      ])
    },
    data() {
      const validateId = (rule, value, callback) => { checkInputID(value, callback, '', false) }
      const validatePhone = (rule, value, callback) => {
        checkInputPhone(value, callback, '', false)
      }
      return {
        dialogVisible3: false,
        loading: false,
        failureExcel: '',
        successNum: 0,
        failureNum: 0,
        execl: './static/候选人批量查询登记表.xlsx',
        attence: '',
        fileName: '',
        attenceFile: {},
        obj: '',
        tabIndex: 0,
        recordData: [],
        info: {
          property: '',
          pageNo: 1,
          pageSize: 10
        },
        currentPage: 1,
        check: '',
        total: 0,
        checkForm: {
          name: '',
          idCard: '',
          mobile: ''
        },
        checkRules: {
          name: [{ required: true, message: '请输入候选人姓名', trigger: 'blur' }],
          idCard: [{ required: true, trigger: 'blur', validator: validateId }],
          mobile: [{ required: true, trigger: 'blur', validator: validatePhone }]
        },
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
            label: '已授权'
          }, {
            value: '1',
            label: '未授权'
          }]
      }
    },
    created() {
    },
    mounted() {
      console.log(this.recordData[0])
      this.$refs.multipleTable.toggleRowSelection(this.recordData[0])
      console.log(this.$refs.multipleTable)
      this.getList(this.info)
      // this.checked()
    },
    methods: {
      filterTag(value, row) {
        console.log(value)
        console.log(row)
        return row.isSurveyed === value
      },
      formatter(row, column, cellValue) {
        if (cellValue) { return '已背调' } return '未背调'
      },
      beforeUpload(file) {
        console.log(file, '文件')
        this.files = file
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!extension && !extension2) {
          this.$message.warning('上传模板只能是 xls、xlsx格式!')
          return
        }
        if (!isLt2M) {
          this.$message.warning('上传模板大小不能超过 5MB!')
          return
        }
        this.fileName = file.name
        return false
      },
      submitUpload() {
        console.log('上传' + this.files.name)
        if (this.fileName == '') {
          this.$message.warning('请选择要上传的文件！')
          return false
        }
        const fileFormData = new FormData()
        fileFormData.append('excelFile', this.files, this.fileName)
        const requestConfig = {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `bearer ${getToken()}`
          }
        }
        axios.post(addExecl, fileFormData, requestConfig).then(res => {
          console.log(res.data)
          this.loading = true
          if (!res.data.success) {
            this.$message.error(res.data.msg)
            this.loading = false
          } else {
            this.loading = false
            this.$store.commit('SET_ORDERINFOTXT', this.fileName)
            this.$store.commit('SET_CANDITATE', res.data.data.orderSerialNumber)
            this.$store.commit('SET_FAILUREEXCEL', res.data.data.failureUrl)
            this.$store.commit('SET_SUCCESSNUM', res.data.data.success)
            this.$store.commit('SET_FAILURENUM', res.data.data.failure)
            this.$store.commit('SET_SHOW1', true)
            this.$store.commit('SET_UPLOADCANDIDATE', true)
          }
        }).catch(res => {
          console.log(res)
          this.$message.warning(res.msg)
        })
      },
      checked() {
        this.$refs.multipleTable.toggleRowSelection(this.recordData, true)
      },
      handleClick(tab, event) {
        console.log(this.info.isSurveyed)
        this.info.pageNum = 1
        this.getList(this.info)
      },
      tabBtn(tab, e) {
        this.tabIndex = tab.index
        console.log(this.tabIndex)
      },
      selsChange(sels) {
        this.obj = sels
        console.log(this.obj)
      },
      listChange(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
        console.log('row')
        console.log(row)
        // let obj = {
        //   highestEducation: null,
        //   id: 325,
        //   idCard: "440982199207276714",
        //   isSurveyed: 0,
        //   mobile: "15268561504",
        //   name: "黎宽",
        //   position: null,
        //   workingNum: null,
        // }
        // this.$refs.multipleTable.toggleRowSelection(this.recordData[0])
      },
      addBtn() {
        this.$router.push({ path: 'addCheck' })
      },
      handleCurrentChange(e) {
        this.info.pageNo = e
        this.getList(this.info)
      },
      getList(e) {
        candidateList(e).then((response) => {
          this.recordData = response.data.list
          this.total = response.data.total
          console.log(this.candidate)
          this.candidate.split(',').map((item1)=>{
            response.data.list.map((item2,index)=>{
              console.log(item2,item1)
              if(item1 == item2.id) {
                console.log(this.recordData[0],111,this.$refs.multipleTable)
                setTimeout(()=>{
                  this.$refs.multipleTable.toggleRowSelection(this.recordData[index])
                },1000)
              }
            })
          })
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      getListSearch(e) {
        candidateList2(e).then((response) => {
          this.recordData = response.data.list
          this.total = response.data.total
        }).catch(error => {
          this.$message.error(error.msg)
        })
      },
      // acceptStatus(row, column, cellValue) {
      //   if (cellValue) { return '已授权' } return '未授权'
      // },
      // surveyStatus(row, column, cellValue) {
      //   if (cellValue) { return '已背调' } return '未背调'
      // },
      details(index, row) {
        this.$router.push({ path: 'candidateDetails', query: { id: row.id }})
      },
      sendCheck() {
        this.$router.push({ path: '/background/check' })
      },
      search() {
        this.currentPage = 1
        this.getListSearch(this.info)
      },
      // goLink() {
      //   this.$emit('dialogStatus', false)
      // },
      addOrder() {
        const list = this.obj.map(item => item.id).join()
        console.log(list)
        console.log(this.obj.length)
        this.$store.commit('SET_CANDITATE', list)
        this.$store.commit('SET_ORDERINFOTXT', `已选择 ${this.obj.length} 位候选人`)
        this.$emit('dialogStatus', false)
      },
      addForm() {
        candidateAdd(this.checkForm).then((response) => {
          this.$store.commit('SET_CANDITATE', response.data)
          this.$store.commit('SET_ORDERINFOTXT', `已选择 1 位候选人`)
          this.$emit('dialogStatus', false)
          console.log(response)
          this.getList(this.info)
        }).catch(error => {
          this.$message.error(error.msg)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .table{
    box-shadow: none !important;
  }
  .btns{
    margin: 27px 0;
    display: flex;
    justify-content: space-between;
  }
  .handle-box{
    width: 360px;
  }
  .add-btn{
    width: 17%;
  }
  .add-btn2{
    color: #2961E9;
    border-color: #2961E9;

  }
  .link{
    color: #5E9BF2;
  }
  .tip{
    color: #999;
    padding: 10px;
    border: 1px solid #B2B2B2;
    margin-bottom: 40px;
    margin-top: 20px;
  }
  .df{
    display: flex;
    flex-direction: column;
  }
  .icon-jingshi{
    padding-right: 10px;
  }
  .btn2{
    margin-top: 40px;
  }
  .pagination{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .download-btn{
    width: 17%;
    color: #FF0000;
    background: #EBEBEB;
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
</style>
