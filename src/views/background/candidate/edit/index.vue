<template>
<div class="item-container">
  <div class="item-bar table-container">
    <el-form :model="ruleForm" :rules="formRules" ref="ruleForm">
    <div class="title">
      <Back></Back>
      <span>编辑候选人</span>
    </div>
    <div class="add-table-box" :class="[show1 ? 'edit' : 'read']">
      <div class="top-bar">
        <div class="list">
          <span>基本信息</span>
          <i class="icon iconfont icon-Group" @click="show1 = true"></i>
        </div>
        <div class="list" v-show="show1">
          <el-button type="info" class="btn-cancel" @click="cancel1">取消</el-button>
          <el-button type="primary" class="btn-ok" @click="save1">确定</el-button>
        </div>
      </div>
      <table class="box_table">
        <tbody>
        <tr>
          <td class="t1"><em class="red">*</em>候选人姓名</td>
          <td class="t2"><el-form-item prop="name"><el-input  v-model="ruleForm.name" placeholder="请输入您的姓名"  maxlength="30" :disabled="true"></el-input></el-form-item></td>
          <td class="t1"><em class="red">*</em>身份证号码</td>
          <td class="t2"><el-form-item prop="idCard"><el-input class="auth-input" placeholder="请输入身份证号" v-model.trim="ruleForm.idCard" maxlength="18" :disabled="true"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td class="t1"><em class="red">*</em>手机号码</td>
          <td class="t2"><el-form-item prop="mobile"><el-input  v-model.trim="ruleForm.mobile" placeholder="请输入您的手机号码"  maxlength="11" :disabled="!show1"></el-input></el-form-item></td>
          <td class="t1">邮箱</td>
          <td class="t2"><el-form-item prop="email"><el-input  v-model.lazy ="ruleForm.email" placeholder="请输入您的邮箱"  maxlength="34" :disabled="!show1"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td class="t1">性别</td>
          <td class="t2">
            <el-form-item prop="sex">
            <el-select v-model="this.idSex"  placeholder="请选择" class="handle-select" :disabled="true">
              <el-option
                v-for="item in list1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </td>
          <td class="t1">出生日期</td>
          <td class="t2"><el-form-item prop="birthday"><el-input  v-model="this.idBirth" placeholder="请输入您的出生日期" :disabled="true"  maxlength="11"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td class="t1">籍贯</td>
          <td class="t2"><el-form-item prop="nativeAddress"><el-input  v-model="this.idPlace" placeholder="请输入您的籍贯" :disabled="true" maxlength="11"></el-input></el-form-item></td>
          <td class="t1">户籍性质</td>
          <td class="t2">
            <el-form-item prop="nativeNature">
              <el-select v-model="ruleForm.nativeNature"  placeholder="请选择" class="handle-select" :disabled="!show1">
                <el-option
                  v-for="item in list2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="t1">政治面貌</td>
          <td class="t2">
            <el-form-item prop="politicalStatus">
              <el-select v-model="ruleForm.politicalStatus"  placeholder="请选择" class="handle-select" :disabled="!show1">
                <el-option
                  v-for="item in list3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          </td>
          <td class="t1">婚姻状况</td>
          <td class="t2">
            <el-form-item prop="maritalStatus">
              <el-select v-model="ruleForm.maritalStatus"  placeholder="请选择" class="handle-select" :disabled="!show1">
                <el-option
                  v-for="item in list5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="t1">工作年限</td>
          <td class="t2">
            <el-form-item prop="workingNum">
              <el-select v-model="ruleForm.workingNum"  placeholder="请选择" class="handle-select" :disabled="!show1">
                <el-option
                  v-for="item in list4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </td>
          <td class="t1">应聘岗位</td>
          <td class="t2"><el-form-item prop="position"><el-input  v-model="ruleForm.position" placeholder="请输入应聘岗位 "  maxlength="11" :disabled="!show1"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td class="t1">当前薪资（元）</td>
          <td class="t2"><el-form-item prop="currentSalary"><el-input  v-model="ruleForm.currentSalary" placeholder="请输入当前薪资"  maxlength="11" :disabled="!show1"></el-input></el-form-item></td>
          <td class="t1">期望薪资（元）</td>
          <td class="t2"><el-form-item prop="expectedSalary"><el-input  v-model="ruleForm.expectedSalary" placeholder="请输入期望薪资 "  maxlength="11" :disabled="!show1"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td class="t1">最高学历</td>
          <td class="t2">
            <el-form-item prop="highestEducation">
              <el-select v-model="ruleForm.highestEducation"  placeholder="请选择" class="handle-select" :disabled="!show1">
                <el-option
                  v-for="item in list7"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </td>
          <td class="t1">当前状态</td>
          <td class="t2">
            <el-form-item prop="currentState">
              <el-select v-model="ruleForm.currentState"  placeholder="请选择" class="handle-select" :disabled="!show1">
                <el-option
                  v-for="item in list6"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td class="t1">到岗时间</td>
          <td class="t2">
            <el-form-item prop="arrivalTime">
              <el-date-picker
                :disabled="!show1"
                v-model="ruleForm.arrivalTime"
                value-format="yyyy-MM-dd"
                :picker-options="pickerBeginDateBefore"
                type="date"
                placeholder="请选择最快到岗时间">
              </el-date-picker>
            </el-form-item>
          </td>
          <td class="t1">现居地址</td>
          <td class="t2"><el-form-item prop="currentAddress"><el-input  v-model="ruleForm.currentAddress" placeholder="请输入现居地址 "  maxlength="11" :disabled="!show1"></el-input></el-form-item></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="add-table-box">
      <div class="top-bar">
        <div class="list">
          <span>紧急联系人</span>
          <i class="icon iconfont icon-Group" @click="show2 = true"></i>
        </div>
        <div class="list" v-show="show2">
          <el-button type="info" class="btn-cancel"  @click="cancel2">取消</el-button>
          <el-button type="primary" class="btn-ok" @click="save2">确定</el-button>
        </div>
      </div>
      <table class="box_table">
        <tbody>
        <tr>
          <td class="t1">姓名</td>
          <td class="t2"><el-input  v-model="ruleForm.contact" placeholder="请输入姓名"  maxlength="30" :disabled="!show2"></el-input></td>
          <td class="t1">联系方式</td>
          <td class="t2"><el-form-item prop="contactMobile"><el-input  v-model="ruleForm.contactMobile" placeholder="请输入联系方式"  maxlength="11" :disabled="!show2"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td class="t1">与本人关系</td>
          <td class="t2">
            <!--<el-input  v-model="ruleForm.relation" placeholder="请输入与本人的关系"  maxlength="11" :disabled="!show2"></el-input>-->
            <el-select v-model="ruleForm.relation" placeholder="请选择与本人的关系" class="handle-select" :disabled="!show2">
              <el-option
                v-for="item in contactOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
          <td class="t1"></td>
          <td class="t2"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="add-table-box">
      <div class="top-bar">
        <div class="list">
          <span>教育/培训经历</span>
          <i class="icon iconfont icon-Group" @click="show3 = true"></i>
        </div>
        <div class="list" v-show="show3">
          <el-button type="primary" plain @click="addItems('edu')" v-show="this.addNum.edu < 2 " class="add-btn" >新增</el-button>
          <el-button type="info" class="btn-cancel" @click="show3 = false">取消</el-button>
          <el-button type="primary" class="btn-ok" @click="save3">确定</el-button>
        </div>
      </div>
      <div v-for="(item, index) in ruleForm.educationParams" :key="item.key">
        <table class="box_table" >
          <tbody>
          <tr>
            <td class="t1">学校</td>
            <td class="t2"><el-form-item class="rules"  :prop="'educationParams.' + index +'.university'" :rules="formRules.university"><el-input  placeholder="请输入学校"  v-model="item.university" maxlength="30" :disabled="!show3"></el-input></el-form-item></td>
            <td class="t1">学历/培训证书</td>
            <td class="t2"> <el-form-item class="rules"  :prop="'educationParams.'+ index +'.degree'" :rules="formRules.degree"><el-input   placeholder="请输入" v-model="item.degree" maxlength="11" :disabled="!show3"></el-input></el-form-item></td>
          </tr>
          <tr>
            <td class="t1">专业</td>
            <td class="t2"> <el-form-item class="rules"  :prop="'educationParams.'+ index +'.major'" :rules="formRules.major"><el-input   placeholder="请输入专业"  v-model="item.major" maxlength="30" :disabled="!show3"></el-input></el-form-item></td>
            <td class="t1">入学时间</td>
            <td class="t2">
              <el-form-item class="rules"  :prop="'educationParams.'+ index +'.startTime'" :rules="formRules.startTime" placeholder="请选择入学时间">
                <el-date-picker
                  :disabled="!show3"
                  value-format="yyyy-MM"
                  v-model="item.startTime"
                  type="month"
                  @change="chooseTimeRange1"
                  placeholder="">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="t1">毕业时间</td>
            <td class="t2">
              <el-form-item :prop="'educationParams.'+ index +'.endTime'" :rules="formRules.endTime" >
                <el-date-picker
                  :disabled="!show3"
                  v-model="item.endTime"
                  value-format="yyyy-MM"
                  type="month"
                  @change="chooseTimeRange1"
                  placeholder="">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="t1"></td>
            <td class="t2"></td>
          </tr>
          </tbody>
        </table>
        <div class="delete-bar">
          <el-button type="danger" @click="deleteBtn(item, index, 'edu')"  v-show="showDelete.edu && index !== 0  || eduNum > 0" class="el-icon-delete">&nbsp;删除</el-button>
        </div>
      </div>
    </div>
    <div class="add-table-box">
      <div class="top-bar">
        <div class="list" @click="show4 = true">
          <span>工作经历</span>
          <i class="icon iconfont icon-Group"></i>
        </div>
        <div class="list" v-show="show4">
          <el-button type="primary" plain @click="addItems('work')" v-show="this.addNum.work < 2" class="add-btn" >新增</el-button>
          <el-button type="info" class="btn-cancel" @click="show4 = false">取消</el-button>
          <el-button type="primary" class="btn-ok" @click="save4">确定</el-button>
        </div>
      </div>
      <div v-for="(item, index) in ruleForm.workParams" :key="item.key">
        <table class="box_table" >
          <tbody>
          <tr>
            <td class="t1">公司名称</td>
            <td class="t2">
              <el-form-item :prop="'workParams.' + index +'.company'" :rules="formRules.company">
                <el-input v-model="item.company" placeholder="请输入公司名称" maxlength="30" :disabled="!show4"></el-input>
              </el-form-item>
            </td>
            <td class="t1">工作岗位</td>
            <td class="t2">
              <el-form-item :prop="'workParams.' + index +'.position'" :rules="formRules.position">
                <el-input v-model="item.position" placeholder="请输入工作岗位" maxlength="30" :disabled="!show4"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="t1">入职时间</td>
            <td class="t2">
              <el-form-item :prop="'workParams.'+ index +'.startTime'" :rules="formRules.startTime" placeholder="请选择入职时间">
                <el-date-picker
                  :disabled="!show4"
                  value-format="yyyy-MM"
                  v-model="item.startTime"
                  type="month"
                  @change="chooseTimeRange1"
                  placeholder="">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="t1">离职时间</td>
            <td class="t2">
              <el-form-item class="rules"  :prop="'workParams.'+ index +'.endTime'" :rules="formRules.endTime"  placeholder="请选择离职时间">
                <el-date-picker
                  :disabled="!show4"
                  @change="chooseTimeRange1"
                  value-format="yyyy-MM"
                  v-model="item.endTime"
                  type="month"
                  placeholder="请选择入离职时间">
                </el-date-picker>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="t1">离职原因</td>
            <td class="t2">
              <el-form-item class="rules"  :prop="'workParams.'+ index +'.reason'" :rules="formRules.reason">
                <el-input v-model="item.reason" placeholder="请输入离职原因" maxlength="30" :disabled="!show4"></el-input>
              </el-form-item>
            </td>
            <td class="t1">证明人</td>
            <td class="t2">
              <el-form-item class="rules"  :prop="'workParams.'+ index +'.witness'" :rules="formRules.witness">
                <el-input v-model="item.witness" placeholder="请输入证明人姓名" maxlength="30" :disabled="!show4"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="t1">证明人关系</td>
            <td class="t2">
              <el-form-item class="rules"  :prop="'workParams.'+ index +'.relation'" :rules="formRules.relation">
                <el-input v-model="item.relation" placeholder="请输入证明人关系" maxlength="30" :disabled="!show4"></el-input>
              </el-form-item>
            </td>
            <td class="t1">证明人电话</td>
            <td class="t2">
              <el-form-item class="rules" :prop="'workParams.'+ index +'.witnessMobile'" :rules="formRules.witnessMobile">
                <el-input v-model="item.witnessMobile" placeholder="请输入证明人电话" maxlength="13" :disabled="!show4"></el-input>
              </el-form-item>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="delete-bar">
          <el-button type="danger" @click="deleteBtn(item, index, 'work')" v-show="showDelete.work && index !== 0 || wordNum > 0" class="el-icon-delete">&nbsp;删除</el-button>
        </div>
      </div>
    </div>
    </el-form>
    <el-button type="primary" :loading="loading" @click.native.prevent="submitSendForm"  class="sendBtn">确定</el-button>
  </div>
  <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
    <div class="del-dialog-cnt">确定删除？</div>
    <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteEdu">确 定</el-button>
            </span>
  </el-dialog>
</div>
</template>

<script>
  import { checkInputCode, checkInputPhone, checkInputID, checkTime, checkMoney, checkMoney2, checkInputPhone2, checkInputPhone3, getCandidateId } from '@/utils/check/index'
  import Back from '@/components/Back/index'
  import { candidateDetail } from '@/api/order'
  import { candidateUpdate } from '@/api/resumeForm'
  import { threeElements } from '@/api/check'
  import { mapGetters } from 'vuex'
  export default {
    name: 'back',
    computed: {
      ...mapGetters([
        'idSex',
        'idBirth',
        'idPlace'
      ])
    },
    data() {
      const Code = (rule, value, callback) => { checkInputCode(value, callback) }
      const validatePhone = (rule, value, callback) => { checkInputPhone(value, callback, '', false) }
      const validatePhone2 = (rule, value, callback) => { checkInputPhone2(value, callback, '', false) }
      const validateId = (rule, value, callback) => { getCandidateId(value, callback, this.ruleForm.idCard) }
      const validateMoney = (rule, value, callback) => { checkMoney(value, callback) }
      const validateMoney2 = (rule, value, callback) => { checkMoney2(value, callback) }
      const validatePhone3 = (rule, value, callback) => { checkInputPhone3(value, callback) }
      const validateTime = (rule, value, callback) => { checkTime(value, callback) }
      return {
        clickNum: 0,
        show1: true,
        show2: true,
        show3: true,
        show4: true,
        delVisible: false,
        loading: false,
        wordNum: 2,
        eduNum: 2,
        idx: -1,
        id: 0,
        pickerBeginDateBefore: { disabledDate(time) { return time.getTime() < Date.now() - 8.64e7 } },
        formRules: {
          email: [{ required: false, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
          idCard: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }, { trigger: 'blur', validator: validateId }],
          currentSalary: [{ required: false, message: '请填写当前薪资', trigger: 'blur' }],
          expectedSalary: [{ required: false, message: '请填写期望薪资', trigger: 'blur' }],
          nativeAddress: [{ required: false, validator: Code, trigger: 'blur' }],
          currentAddress: [{ required: false, validator: Code, trigger: 'blur' }],
          contact: [{ required: false, validator: Code, trigger: 'blur' }],
          contactMobile: [{ required: false, validator: validatePhone2, trigger: 'blur' }],
          university: [{ required: false, message: '请输入学校名称', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          degree: [{ required: false, message: '请输入您的学历', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          major: [{ required: false, message: '请填写专业', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          startTime: [{ required: false, message: '请选择时间', trigger: 'change' }],
          endTime: [{ required: false, message: '请选择时间', trigger: 'change' }],
          salary: [{ required: false, message: '请输入薪资', trigger: 'blur' }, { validator: validateMoney, trigger: 'blur' }],
          witness: [{ required: false, message: '请输入证明人姓名', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          witnessMobile: [{ required: false, message: '请输入证明人电话', trigger: 'blur' }, { validator: validatePhone3, trigger: 'blur' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          mobile: [{ required: false, message: '请输入手机号码', trigger: 'blur' }, { validator: validatePhone, trigger: 'blur' }],
          relation: [{ required: false, validator: Code, trigger: 'blur' }],
          reason: [{ required: false, message: '请输入离职原因', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          company: [{ required: false, message: '请输入单位名称' }, { validator: Code, trigger: 'blur' }],
          position: [{ required: false, message: '请输入岗位', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          // arrivalTime: [{ required: true, message: '请输入到岗时间', trigger: 'change' }],
          // birthday: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
          // maritalStatus: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
          // politicalStatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
          // highestEducation: [{ required: true, message: '请选择最高学历', trigger: 'change' }],
          nativeNature: [{ required: true, message: '请选择户籍性质', trigger: 'change' }]
          // currentState: [{ required: true, message: '请选择当前状态', trigger: 'change' }],
        },
        addNum: { edu: 0, work: 0, family: 0 },
        deleteType: '',
        showDelete: { edu: false, work: false, family: false },
        ruleForm: {
          'name': null,
          'idCard': null,
          'mobile': null,
          'birthday': null,
          'nativeAddress': null,
          'sex': null,
          'currentState': null,
          'email': null,
          'highestEducation': null,
          'workingNum': null,
          'position': null,
          'currentSalary': null,
          'expectedSalary': null,
          'arrivalTime': null,
          'contact': null,
          'contactMobile': null,
          'relation': null,
          'signaturePicUrl': null,
          'signatureTime': null,
          'nativeNature': null, // 户籍性质
          'politicalStatus': null, // 政治面貌
          'maritalStatus': null,
          'currentAddress': null,
          'educationParams': [{ university: null, degree: null, major: null, startTime: null, endTime: null, certificateNum: null }],
          'workParams': [{ company: null, position: null, startTime: null, endTime: null, reason: null, witness: null, witnessMobile: null, relation: null }]
        },
        list1: [{ value: '男', label: '男' }, { value: '女', label: '女' }],
        contactOptions: [{ value: '朋友', label: '朋友' }, { value: '同事', label: '同事' }, { value: '亲属', label: '亲属' }, { value: '其他', label: '其他' }],
        list2: [
          { value: 1, label: '本地城镇' },
          { value: 2, label: '外地城镇（省内）' },
          { value: 3, label: '外地城镇（省外）' },
          { value: 4, label: '本地农村' },
          { value: 5, label: '外地农村（省内）' },
          { value: 6, label: '外地农村（省外）' }
        ],
        list3: [
          { value: 1, label: '团员' },
          { value: 2, label: '党员' },
          { value: 3, label: '群众' }
        ],
        list4: [
          { value: 1, label: '1-3年' },
          { value: 2, label: '3-5年' },
          { value: 3, label: '5-10年' },
          { value: 3, label: '10年以上' }
        ],
        list5: [
          { value: '已婚', label: '已婚' },
          { value: '未婚', label: '未婚' }
        ],
        list6: [
          { value: 1, label: '应届毕业生' },
          { value: 2, label: '已离职' },
          { value: 3, label: '在职' },
          { value: 4, label: '其他' }
        ],
        list7: [
          { value: '大专', label: '大专' },
          { value: '本科', label: '本科' },
          { value: '研究生', label: '研究生' },
          { value: '其他', label: '其他' }
        ]
      }
    },
    components: { Back },
    created() {
      this.id = this.$route.query.id
      candidateDetail(this.id).then((response) => {
        // this.ruleForm = response.data
        let  ruleForm = response.data
        if (response.data.educationInfoVOS.length !== 0) {
          ruleForm.educationParams = response.data.educationInfoVOS
          this.addNum.edu = response.data.educationInfoVOS.length - 1
        } else {
          ruleForm.educationParams = [{ 'university': null, 'degree': null, 'major': null, 'startTime': null, 'endTime': null, 'certificateNum': null }]
        }

        if (response.data.workInfoVOS.length !== 0) {
          ruleForm.workParams = response.data.workInfoVOS
          this.addNum.work = response.data.workInfoVOS.length - 1
        } else {
          ruleForm.workParams = [{ company: null, position: null, startTime: null, endTime: null, reason: null, witness: null, witnessMobile: null, relation: null }]
        }
        delete ruleForm.educationInfoVOS
        delete ruleForm.workInfoVOS
        this.ruleForm = Object.assign({},ruleForm)
        if (!this.ruleForm.nativeAddress) {
          threeElements(this.ruleForm.idCard).then((response) => {
            this.$store.commit('SET_IDSEX', response.data.sex)
            this.$store.commit('SET_IDBIRTH', response.data.birthday)
            this.$store.commit('SET_IDPLACE', response.data.nativeAddress)
          }).catch(error => {
            this.$message.error(error.msg)
            this.loading = false
          })
        }
        this.$store.commit('SET_IDSEX', response.data.sex)
        this.$store.commit('SET_IDBIRTH', response.data.birthday)
        this.$store.commit('SET_IDPLACE', response.data.nativeAddress)
      }).catch(error => {
        this.$message.error(error.msg)
      })
    },
    methods: {
      chooseTimeRange1() {
        console.log(111)
        this.ruleForm = Object.assign({},this.ruleForm)
        console.log(this.ruleForm)
      },
      deleteBtn(item, index, type) {
        this.idx = index
        this.deleteType = type
        this.delVisible = true
      },
      deleteEdu() {
        console.log(this.idx)
        if (this.idx === 1) {
          this.showDelete[this.deleteType] = false
        }
        if (this.idx !== -1) {
          switch (this.deleteType) {
            case 'edu' :
              this.ruleForm.educationParams.splice(this.idx, 1)
              this.addNum.edu--
              break
            case 'work' :
              this.ruleForm.workParams.splice(this.idx, 1)
              this.addNum.work--
              break
            case 'family' :
              this.ruleForm.familyParamsList.splice(this.idx, 1)
              this.addNum.family--
              break
          }
          this.delVisible = false
        }
      },
      addItems(type) {
        switch (type) {
          case 'edu' :
            this.ruleForm.educationParams.push({ university: null, degree: '', major: null, startTime: null, endTime: null, certificateNum: null })
            this.showDelete[type] = true
            this.addNum.edu++
            console.log(this.addNum.edu)
            break
          case 'work' :
            this.ruleForm.workParams.push({ company: null, position: null, startTime: null, endTime: null, reason: null, witness: null, witnessMobile: null, relation: null })
            this.showDelete[type] = true
            this.addNum.work++
            console.log(this.addNum.work)
            break
        }
      },
      cancel1() {
        this.show1 = false
        this.$refs.ruleForm.clearValidate('name')
      },
      cancel2() {
        this.show2 = false
        this.$refs.ruleForm.clearValidate('contactMobile')
      },
      save1() {
        console.log(this.ruleForm)
        this.$refs.ruleForm.validateField('name')
        this.$refs.ruleForm.validateField('idCard')
        this.$refs.ruleForm.validateField('mobile')
        this.show1 = false
      },
      save2() {
        console.log(this.ruleForm)
        this.$refs.ruleForm.validateField('name')
        this.$refs.ruleForm.validateField('idCard')
        this.$refs.ruleForm.validateField('mobile')
        this.show2 = false
      },
      save3() {
        this.$refs.ruleForm.validateField('name')
        this.show3 = false
      },
      save4() {
        this.$refs.ruleForm.validateField('name')
        this.show4 = false
      },
      submitSendForm() {
        this.clickNum++
        console.log(this.ruleForm.educationParams)
        console.log(this.ruleForm)
        this.show1 = false
        this.show2 = false
        this.show3 = false
        this.show4 = false
        this.$refs.ruleForm.clearValidate('idCard')
        this.$refs.ruleForm.clearValidate('idCard')
        this.ruleForm.nativeAddress = this.idPlace
        this.ruleForm.birthday = this.idBirth
        this.ruleForm.sex = this.idSex
        if (this.ruleForm.contactMobile === this.ruleForm.mobile) {
          this.$message.error('候选人电话号码不能和紧急联系人相同')
          return false
        }
        candidateUpdate(this.ruleForm).then(() => {
          this.loading = false
          this.$message.success('提交成功')
          this.$router.back(-1)
        }).catch(error => {
          this.$message.error(error.msg)
          this.loading = false
          location.reload()
        })
        // this.$refs.ruleForm.validate(valid => {
        //   console.log(valid)
        //   if (valid) {
        //     candidateAdd(this.ruleForm).then(() => {
        //       this.loading = false
        //       this.$message.success('提交成功')
        //     }).catch(error => {
        //       this.$message.error(error.msg)
        //       this.loading = false
        //     })
        //   }
        // })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add-table-box{
    margin: 24px;
    .top-bar{
      height: 26px;
      border-left: 4px solid #5E9BF2;
      line-height: 26px;
      padding-left: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-size: 18px;
        padding-right: 10px;
      }
      i{
        font-size: 20px;
      }
    }
    .delete-bar{
      width: 100%;
      margin-bottom: 40px;
      display: flex;
      justify-content: flex-end;
    }
    .box_table{
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      margin: 20px 0;
      td {
        font-size: 14px;
        text-align: center;
        height: 38px;
        border: 1px solid #dddddd;
        em{
          padding-right: 6px;
        }
      }
      tr{
        &:nth-child(even){
          background:rgba(250,250,250,1);
        }
      }
      .t1{
        color: #333333;
        width: 16%;
        height: 25px;
        font-size: 14px;
        font-weight: bold;
      }
      .t2{
        width: 34%;
      }
    }
  }
  .sendBtn{
    width: 400px;
    height: 38px;
    margin: 80px auto 0 auto;
    display: block;
  }
  .add-btn{
    width: 86px;
    height: 38px;
    background: #fff;
    border-color: #5E9BF2;
    color: #5E9BF2;
  }
  .icon-Group{
    cursor: pointer;
  }
</style>
