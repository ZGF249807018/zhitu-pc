<template>
        <div class="item-container">
          <div class="item-bar">
            <div class="title">子账号管理说明</div>
            <div class="account-tip">
              <p>1. 用户可自主创建账号，子账号购买套餐金额从主账号中扣除；</p>
              <p>2 . 用户可查看所有子账号的背调记录；</p>
              <p>3. 子账号只能进行背调查询、查看记录；</p>
              <p>4. 子账号不能添加子账号。</p>
            </div>
          </div>
          <div class="item-bar table-container">
            <div class="title">消费记录</div>
            <el-button type="primary"  @click="dialogVisible1 = true"  class="send-btn" :add="pop === true">添加子账号 <i class="icon iconfont icon-icon02"></i></el-button>
            <el-table
              :data="tableData"
              stripe
              border
              class="account-table">
              <el-table-column
                prop="account"
                label="登录名"
               >
              </el-table-column>
              <el-table-column
                prop="name"
                label="子账户名称"
                >
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号"
                >
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                >
              </el-table-column>
              <el-table-column
                v-show="primary === 1"
                label="操作"
                >
                <template slot-scope="scope">
                  <el-button @click="editTable(scope.$index, scope.row)" type="text" size="small" :add="pop === false" >编辑</el-button>
                  <el-button @click="deleteTable(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                  <el-button @click="resetTable(scope.$index, scope.row)" type="text" size="small">重置密码</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog
              title="添加子账号"
              :visible.sync="dialogVisible1"
              @open="clear"
              width="30%"
            >
              <el-form label-width="120px" class="auth-form" :model="accountForm" :rules="accountRules" ref="accountForm">
                <el-form-item label="子账号名称：" prop="name" >
                  <el-input class="auth-input" placeholder="" v-model="accountForm.name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email" >
                  <el-input class="auth-input" placeholder="" v-model="accountForm.email" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="mobileAdd">
                  <el-input class="auth-input" placeholder="" v-model="accountForm.mobileAdd" type="number" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="登录名 ：" prop="accountAdd" >
                  <el-input class="auth-input" placeholder="" v-model="accountForm.accountAdd" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="登录密码：" prop="password" >
                  <el-input class="auth-input" placeholder="" v-model="accountForm.password" maxlength="30"></el-input>
                </el-form-item>
              </el-form>

              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="addTable">确 定</el-button>
  </span>
            </el-dialog>

            <el-dialog
              title="编辑子账号"
              :visible.sync="dialogVisible2"
              width="30%"
            >
              <el-form label-width="120px" class="auth-form" :model="accountForm3" :rules="accountRules" ref="accountForm3">
                <el-form-item label="子账号名称：" prop="name">
                  <el-input class="auth-input" placeholder="" v-model="accountForm3.name" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                  <el-input class="auth-input" placeholder="" v-model="accountForm3.email" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="mobile">
                  <el-input class="auth-input" placeholder="" v-model="accountForm3.mobile" maxlength="11" type="number"></el-input>
                </el-form-item>
                <el-form-item label="登录名：" prop="account" >
                  <el-input class="auth-input" placeholder="" v-model="accountForm3.account"  maxlength="30"></el-input>
                </el-form-item>
              </el-form>

              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="saveEdit">确 定</el-button>
  </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
              <div class="del-dialog-cnt">确定删除？</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
            </el-dialog>

            <el-dialog
              title="重置密码"
              @open="clear2"
              :visible.sync="dialogVisible3"
              width="30%"

            >
              <el-form label-width="60px" class="auth-form" :model="accountForm2" :rules="accountRules" ref="accountForm2">
                <el-form-item label="密码：" prop="password">
                  <el-input :type="pwdType" class="auth-input" placeholder="" v-model="accountForm2.password" maxlength="30" />
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible3 = false">取 消</el-button>
    <el-button type="primary" @click="sendReset">确 定</el-button>
  </span>
            </el-dialog>
          </div>
        </div>
</template>

<script >
  import { mapGetters } from 'vuex'
  import { findAll, addAccount, editAccount, deleteAccount, resetPwd } from '@/api/info'
  import { checkInputEmail, checkInputPass, checkChildAccount, checkChildPhone, checkInputPhone, checkInputAccount } from '@/utils/check/index'
  import { Message } from 'element-ui'
  export default {
    computed: {
      ...mapGetters([
        'tid',
        'primary',
        'uid'
      ])
    },
    data() {
      const validatePhoneNumAdd = (rule, value, callback) => {
        checkInputPhone(value, callback, this.accountForm.mobileAdd, true)
      }
      const validatePhoneNum = (rule, value, callback) => {
        checkChildPhone(value, callback, this.accountForm.mobile || this.accountForm3.mobile, this.userId, true)
      }
      const validateAccount = (rule, value, callback) => {
        checkChildAccount(value, callback, this.accountForm.account || this.accountForm3.account, this.userId, true)
      }
      const validateAccountAdd = (rule, value, callback) => {
        checkInputAccount(value, callback, this.accountForm.accountAdd, true)
      }
      const validateEmail = (rule, value, callback) => {
        checkInputEmail(value, callback)
      }
      const validatePass = (rule, value, callback) => {
        checkInputPass(value, callback)
      }
      return {
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        delVisible: false,
        pop: false,
        edit: false,
        idx: -1,
        isEdit: false,
        userId: '',
        pwdType: 'password',
        accountForm: {
          name: '',
          email: '',
          mobile: '',
          account: '',
          password: '',
          accountAdd: '',
          mobileAdd: ''
        },
        accountForm2: {
          password: ''
        },
        accountForm3: {
          name: '',
          email: '',
          mobile: '',
          account: ''
        },
        accountRules: {
          name: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          mobile: [{ required: true, trigger: 'blur', validator: validatePhoneNum }],
          mobileAdd: [{ required: true, validator: validatePhoneNumAdd, trigger: 'blur' }],
          account: [{ required: true, trigger: 'blur', validator: validateAccount }],
          accountAdd: [{ required: true, trigger: 'blur', validator: validateAccountAdd }],
          password: [{ required: this.isEdit, trigger: 'blur', validator: validatePass }]
        },
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        findAll(this.tid).then((response) => {
          this.tableData = response.data
        }).catch(error => {
          Message.error(error.msg)
        })
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      editTable(index, row) {
        console.log(row)
        if (this.pop === false) {
          this.idx = index
          const item = this.tableData[index]
          console.log(item)
          console.log(item.id)
          this.userId = item.id
          this.accountForm3 = {
            name: item.name,
            email: item.email,
            mobile: item.mobile,
            account: item.account
          }
        }
        this.dialogVisible2 = true
      },
      deleteTable(index, row) {
        this.idx = index
        this.delVisible = true
        console.log(row)
        this.userId = row.id
      },
      addTable() {
        this.isEdit = true
        this.$refs.accountForm.validate(valid => {
          if (valid) {
            this.dialogVisible1 = false
            addAccount(this.accountForm.name, this.accountForm.email, this.accountForm.mobileAdd, this.accountForm.accountAdd, this.accountForm.password, this.tid).then((response) => {
              this.tableData.push(response.data)
              this.$message.success('添加成功')
              this.getList() // 解决编辑和传值密码时租户id获取不到问题
            }).catch(error => {
              Message.error(error.msg)
              this.loading = false
            })
          } else {
            this.loading = false
            return false
          }
        })
      },
      deleteRow() {
        deleteAccount(this.userId, this.tid).then(() => {
          this.tableData.splice(this.idx, 1)
          this.delVisible = false
          this.$message.success('删除成功')
        }).catch(error => {
          Message.error(error.msg)
          this.loading = false
        })
      },
      saveEdit() {
        this.isEdit = false
        this.$refs.accountForm3.validate(valid => {
          // this.$refs.accountForm3.resetFields()
          if (valid) {
            this.dialogVisible2 = false
            this.$set(this.tableData, this.idx, this.accountForm3)
            editAccount(this.userId, this.accountForm3.account, this.accountForm3.email, this.accountForm3.name, this.accountForm3.mobile).then((response) => {
              this.$message.success('修改成功')
              this.getList() // 解决编辑和传值密码时租户id获取不到问题
            }).catch(error => {
              Message.error(error.msg)
              this.loading = false
            })
          } else {
            this.loading = false
            return false
          }
        })
      },
      resetTable(index, row) {
        this.dialogVisible3 = true
        console.log(row)
        this.userId = row.id
      },
      sendReset() {
        this.isEdit = true
        this.$refs.accountForm2.validate(valid => {
          if (valid) {
            resetPwd(this.userId, this.tid, this.accountForm2.password).then(() => {
              this.dialogVisible3 = false
              this.$message.success('修改成功')
            }).catch(error => {
              this.dialogVisible3 = false
              Message.error(error.msg)
              this.loading = false
            })
          } else {
            this.loading = false
            return false
          }
        })
      },
      clear() {
        this.$refs.accountForm.resetFields()
        this.accountForm = {
          name: '',
          email: '',
          mobile: '',
          account: '',
          password: ''
        }
      },
      clear2() {
        this.$refs.accountForm2.resetFields()
        this.accountForm2 = {
          password: ''
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  @import '../../../styles/variables';
  .send-btn{
    background: #4da1ff;
    display: block;
    margin: 28px auto 50px auto;

  }

.account-tip{
  padding: 20px;
  p{
    line-height: 40px;
    font-size: 16px;
    color: #333;
  }
}
  .account-table{
    width: 95%;
    margin: 0 auto;
  }
  .pagination{
    float: left;
    background: #fff;
    margin-left: 20px;
    bottom: 170px;
    position: absolute;
  }
</style>
