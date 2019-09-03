<template>
  <div>
    <el-dialog
      title="添加子账号"
      :visible.sync="visible"
      @close="close"
      @open="open"
      :show="show"
      :formType="formType"
      width="30%"
    >
      <el-form label-width="120px" class="auth-form" :model="accountForm" :rules="accountRules" ref="accountForm">
        <span v-if="formType !== 'reset_password' ">
          <el-form-item label="登录名：" prop="name">
            <el-input class="auth-input" placeholder="" v-model="accountForm.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
              <el-input class="auth-input" placeholder="" v-model="accountForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
              <el-input class="auth-input" placeholder="" v-model="accountForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="子账号名称：" prop="account">
              <el-input class="auth-input" placeholder="" v-model="accountForm.account"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password" v-if="formType === 'add_account'">
              <el-input class="auth-input" placeholder="" v-model="accountForm.password" type="password"></el-input>
          </el-form-item>
        </span>
        <span v-else-if="formType === 'reset_password' ">
           <el-form-item label="登录密码：" prop="password">
          <el-input class="auth-input" placeholder="" v-model="accountForm.password" type="password"></el-input>
        </el-form-item>
        </span>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('update:show', false)">取 消</el-button>
    <el-button type="primary" @click="addTable">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>


<script>
  import { findAll, addAccount, editAccount, deleteAccount, resetPwd } from '@/api/info'
  import { checkInputPhone, checkInputEmail, checkInputPass } from '@/utils/check/index'

  export default {
    props: ['show', 'tableData', 'dialogType'],
    watch: {
      show() {
        this.visible = this.show
      }
    },
    data() {
      const validatePhoneNum = (rule, value, callback) => {
        checkInputPhone(value, callback, '', false)
      }
      const validateEmail = (rule, value, callback) => {
        checkInputEmail(value, callback)
      }
      const validatePass = (rule, value, callback) => {
        checkInputPass(value, callback)
      }
      return {
        visible: this.show,
        formType: this.dialogType,
        idx: -1,
        accountForm: {
          name: '',
          email: '',
          mobile: '',
          account: '',
          password: ''
        },
        accountRules: {
          name: [{ required: true, message: '请输入登录名', trigger: 'blur' }],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          mobile: [{ required: true, trigger: 'blur', validator: validatePhoneNum }],
          account: [{ required: true, message: '请输入子账号', trigger: 'blur' }],
          password: [{ required: this.isEdit, trigger: 'blur', validator: validatePass }]
        }
      }
    },
    methods: {
      addTable() {
        if (this.formType === 'add_account') {
          this.isEdit = true
          this.$refs.accountForm.validate(valid => {
            if (valid) {
              this.visible = false
              this.$emit('update:show', false)
              if (this.formType === 'add_account') {
                this.accountForm = {
                  name: this.accountForm.name,
                  email: this.accountForm.email,
                  mobile: this.accountForm.mobile,
                  account: this.accountForm.account,
                  password: this.accountForm.password
                }
                this.$set(this.tableData, this.idx, this.accountForm)
                this.tableData.splice(-1, 1, this.accountForm)
                // addAccount(this.accountForm.name, this.accountForm.email, this.accountForm.mobile, this.accountForm.account, this.accountForm.password, this.tid).then((response) => {
                //   this.$set(this.tableData, this.idx, this.accountForm)
                //   this.tableData.splice(-1, 1, this.accountForm)
                //   this.$emit('update:tableData', this.tableData)
                //   console.log(this.tableData)
                //   this.$message.success('添加成功')
                // }).catch(error => {
                //   this.$message.error(error.msg)
                //   this.loading = false
                // })
              } else if (this.formType === 'edit') {
                this.accountForm = {
                  name: this.tableData.name,
                  email: this.tableData.email,
                  mobile: this.tableData.mobile,
                  account: this.tableData.account
                }
                // this.$set(this.tableData, this.idx, this.accountForm)
                // editAccount(this.tid, this.accountForm.account, this.accountForm.email, this.accountForm.name, this.accountForm.mobile).then((response) => {
                //   this.$message.success('修改成功')
                // }).catch(error => {
                //   this.$message.error(error.msg)
                //   this.loading = false
                // })
                console.log(this.tableData)
              } else {
                resetPwd(this.userId, this.tid, this.accountForm.password).then(() => {
                  this.$message.success('修改成功')
                }).catch(error => {
                  this.$message.error(error.msg)
                  this.loading = false
                })
              }
            } else {
              this.loading = false
              return false
            }
          })
        }
      },
      close() {
        this.$emit('update:show', false)
        this.$refs.accountForm.resetFields()
        // this.accountForm = {
        //   name: '',
        //   email: '',
        //   mobile: '',
        //   account: '',
        //   password: ''
        // }
      },
      open() {
        this.formType = this.dialogType
        console.log(this.formType)
      }
    }
  }

</script>

<style scoped>

</style>
