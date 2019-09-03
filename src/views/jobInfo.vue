<template>
  <div class="resume-container">
    <div v-if="!showMore">
      <div class="title">
        <dl>
          <dt><h1 class="content-title1"><i class="icon"></i>{{u_company}}</h1></dt>
        </dl>
        <p class="tip1">求职登记表填写是公司招聘的正常流程，为了提高双方沟通效率，请如实填写。</p>
      </div>
      <div>
        <el-form :model="ruleForm1" :rules="formRules" ref="ruleForm1">
          <div class="box">
            <h1 class="content-title">身份信息<span>(必填)</span></h1>
            <div class="form-list">
              <div class="auth-form">
                <el-form-item label="姓名：" prop="name" >
                  <el-input class="auth-input" placeholder="请输入您的姓名" v-model="ruleForm1.name" ></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="idCard">
                  <el-input class="auth-input" placeholder="请输入身份证号" v-model.trim="ruleForm1.idCard"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="mobile">
                  <el-input class="auth-input" placeholder="请输入您的手机号码" v-model.trim="ruleForm1.mobile"  maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码：" prop="idCard">
                  <el-input class="auth-input" placeholder="请输入短信验证码" v-model.trim="ruleForm1.smsCode" type="number"></el-input>
                  <captcha :captchaInfo="codeType" :captchaType="'phone'" :sendCode="ruleForm1.mobile"></captcha>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="bottom">
        <div class="buttons">
          <el-button type="primary" :loading="loading" @click.native.prevent="next"  class="submit-send">下一步</el-button>
        </div>
      </div>
    </div>
    <div v-if="showMore">
      <el-form :model="ruleForm" :rules="formRules" ref="ruleForm">
        <div class="box">
          <h1 class="content-title">基本信息<span>(必填)</span></h1>
          <div class="form-list">
            <div class="auth-form">
              <el-form-item label="当前状态" prop="currentState">
                <el-select v-model="ruleForm.currentState" placeholder="请选择当前状态" class="handle-select">
                  <el-option
                    v-for="item in currentStateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱地址" prop="email">
                <el-input class="auth-input" placeholder="请填写邮箱地址" v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="政治面貌" prop="politicalStatus">
                <el-select v-model="ruleForm.politicalStatus" placeholder="请选择政治面貌" class="handle-select">
                  <el-option
                    v-for="item in politicalOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高学历" prop="highestEducation">
                <el-select v-model="ruleForm.highestEducation" placeholder="请填写最高学历" class="handle-select" >
                  <el-option
                    v-for="item in highestOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作年限" prop="workingNum">
                <el-select v-model="ruleForm.workingNum" placeholder="请输入工作年限" class="handle-select">
                  <el-option
                    v-for="v in workingNumOptions"
                    :key="v.value"
                    :label="v.label"
                    :value="v.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面试岗位" prop="position">
                <el-input class="auth-input" placeholder="请输入面试岗位" v-model="ruleForm.position"  maxlength="15"></el-input>
              </el-form-item>
              <el-form-item label="当前薪资（元）" prop="currentSalary">
                <el-input class="auth-input" placeholder="请填写当前薪资" v-model.lazy="ruleForm.currentSalary"></el-input>
              </el-form-item>
              <el-form-item label="期望薪资（元）" prop="expectedSalary">
                <el-input class="auth-input" placeholder="请填写期望薪资" v-model.lazy="ruleForm.expectedSalary"></el-input>
              </el-form-item>
              <el-form-item label="到岗时间" prop="arrivalTime">
                <el-date-picker
                  v-model="ruleForm.arrivalTime"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerBeginDateBefore"
                  type="date"
                  placeholder="请选择最快到岗时间">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box">
          <h1 class="content-title">紧急联系人<span>(必填)</span></h1>
          <div class="form-list">
            <div class="auth-form">
              <el-form-item label="姓名" prop="contact" left>
                <el-input class="auth-input" placeholder="请输入姓名" v-model="ruleForm.contact" ></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="contactMobile" left>
                <el-input class="auth-input" placeholder="请输入电话" v-model="ruleForm.contactMobile" id="aa"></el-input>
              </el-form-item>
              <el-form-item label="与本人的关系" prop="relation" left>
                <el-select v-model="ruleForm.relation" placeholder="请选择与本人的关系" class="handle-select">
                  <el-option
                    v-for="item in contactOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box" >
          <h1 class="content-title">教育经历<span>(由专科起填)</span></h1>
          <div class="form-list">
            <div class="auth-form">
              <div class="moreRules">
                <div class="moreList" v-for="(item, index) in educationParams" :key="index">
                  <el-form-item class="rules" label="学校名称:" >
                    <el-input v-model="educationParams[index].university" placeholder="请输入学校名称"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="学历:" >
                    <el-input v-model="educationParams[index].degree" placeholder="请输入学历"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="专业:" >
                    <el-input v-model="educationParams[index].major" placeholder="请输入专业"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="入学时间:">
                    <el-date-picker
                      value-format="yyyy-MM"
                      v-model="educationParams[index].startTime"
                      type="month"
                      @change="changeData"
                      placeholder="">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="rules" label="毕业时间:" >
                    <el-date-picker
                      value-format="yyyy-MM"
                      v-model="educationParams[index].endTime"
                      @change="changeData"
                      type="month"
                      placeholder="">
                    </el-date-picker>
                  </el-form-item>
                  <el-button type="danger" @click="deleteBtn(item, index, 'edu')"  v-show="showDelete.edu && index !== 0  || eduNum > 0" class="el-icon-delete">&nbsp;删除本条记录</el-button>
                </div>
              </div>
              <el-form-item >
                <el-button type="primary" class="addItem" @click="addItems('edu')" v-show="this.addNum.edu < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加教育经历</el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box" >
          <h1 class="content-title">工作经历<span>(由最近起填)</span></h1>
          <div class="form-list">
            <div class="auth-form">
              <div class="moreRules">
                <div class="moreList" v-for="(item, index) in workParams" :key="index">
                  <el-form-item class="rules" label="公司名称">
                    <el-input v-model="workParams[index].company" placeholder="请输入公司名称"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="岗位" >
                    <el-input v-model="workParams[index].position" placeholder="请输入岗位"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="薪资（元）">
                      <el-input v-model.lazy="workParams[index].salary" placeholder="请输入薪资"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="入职时间" >
                    <el-date-picker
                      value-format="yyyy-MM"
                      v-model="workParams[index].startTime"
                      type="month"
                      @change="changeData"
                      placeholder="请选择入职时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="rules" label="离职时间" >
                    <el-date-picker
                      value-format="yyyy-MM"
                      v-model="workParams[index].endTime"
                      type="month"
                      @change="changeData"
                      placeholder="请选择入离职时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="rules" label="离职原因" >
                    <el-input v-model="workParams[index].reason" placeholder="请输入离职原因"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="证明人姓名" >
                    <el-input v-model="workParams[index].witness" placeholder="请输入证明人姓名"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="证明人电话" >
                    <el-input v-model="workParams[index].witnessMobile" placeholder="请输入证明人电话"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="证明人关系" >
                    <el-select v-model="workParams[index].relation" @change="changeData" placeholder="请选择证明人关系" class="handle-select">
                      <el-option
                        v-for="item in contactOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-button type="danger" @click="deleteBtn(item, index, 'work')" v-show="showDelete.work && index !== 0 || wordNum > 0" class="el-icon-delete">&nbsp;删除本条记录</el-button>
                </div>
              </div>
              <el-form-item >
                <el-button type="primary" class="addItem" @click="addItems('work')" v-show="this.addNum.work < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加工作经历</el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box greement-container">
          <h1 class="content-title">本人声明</h1>
          <div class="greement">
            <p>本人保证所填写的表格每一项内容真实，如因信息不完整、虚假信息等造成应聘失败、辞退等一切后果，本人自行承担。</p>
          </div>
          <div class="autograph">
            <div class="list" @click="drawBtn">
              <span>签名：</span>
              <span class="info line" id="autograph">
                <img :src="drawImg" alt="" style="width: 100px;height: 40px;" >
              </span>
              <el-form-item prop="signaturePicUrl"><el-input v-model="ruleForm.signaturePicUrl" type="hidden"></el-input> </el-form-item>
            </div>
            <div class="list"><span>日期：</span><span class="info">{{nowTime}}</span></div>
          </div>
          <div class="buttons">
            <el-button type="primary"  @click.native.prevent="submitSendForm"  class="submit-send" :loading="loading">提交</el-button>
          </div>
        </div>
      </el-form>
      <div  class="draw-contanier" v-show="drawStatus">
        <Draw   @upload="getImgUrl"></Draw>
      </div>
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">确定删除？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteEdu">确 定</el-button>
            </span>
      </el-dialog>
    </div>
    <a :href="drawImg" rel="external nofollow" type="签名.png" class="link" id="imgUrls"></a>
  </div>
</template>

<script>
  import Qs from 'qs'
  import { mapGetters } from 'vuex'
  import { checkInputCode, checkInputPhone, checkInputID, checkTime, checkMoney, checkMoney2, checkInputPhone2, checkInputPhone3 } from '@/utils/check/index'
  import { interviewSubmit } from '@/api/resumeForm'
  import { candidateCheck } from '@/api/order'
  import Captcha from '@/components/Captcha/index'
  import Draw from '@/components/Draw/index'
  import axios from 'axios'
  import { addLogo } from '@/api/info'
  export default {
    computed: {
      ...mapGetters([
        'drawStatus',
        'drawImg',
        'autographUrl',
        'autographTime'
      ])
    },
    data() {
      const Code = (rule, value, callback) => { checkInputCode(value, callback) }
      const validatePhone = (rule, value, callback) => { checkInputPhone(value, callback, '', false) }
      const validatePhone2 = (rule, value, callback) => { checkInputPhone2(value, callback, '', false) }
      const validateId = (rule, value, callback) => { checkInputID(value, callback, '', false) }
      const validateMoney = (rule, value, callback) => { checkMoney(value, callback) }
      const validateMoney2 = (rule, value, callback) => { checkMoney2(value, callback) }
      const validatePhone3 = (rule, value, callback) => { checkInputPhone3(value, callback) }
      const validateTime = (rule, value, callback) => { checkTime(value, callback) }
      return {
        wordNum: 2,
        eduNum: 2,
        nowTime: '',
        showMore: false,
        sxyInfo: { start: '', end: '' },
        pickerBeginDateBefore: { disabledDate(time) { return time.getTime() < Date.now() - 8.64e7 } },
        showDelete: { edu: false, work: false },
        addNum: { edu: 0, work: 0 },
        deleteType: '',
        tenantId: '',
        userId: '',
        loading: false,
        delVisible: false,
        idx: -1,
        u_company: '',
        codeType: {
          codeType: 'code_notice'
        },
        ruleForm1: {
          smsCode: '',
          name: '',
          mobile: '',
          idCard: '',
          userId: '',
          tenantId: ''
        },
        ruleForm: {
          workingNum: null,
          tenantId: null,
          userId: null,
          email: null,
          position: null,
          isAccepted: null,
          currentSalary: null,
          expectedSalary: null,
          arrivalTime: null,
          birthday: null,
          maritalStatus: null,
          politicalStatus: null,
          highestEducation: null,
          nativeAddress: null,
          currentAddress: null,
          currentState: null,
          contact: null,
          contactMobile: null,
          relation: null,
          signatureTime: null,
          signaturePicUrl: null,
        },
        educationParams: [{ university: null, degree: null, major: null, startTime: null, endTime: null }],
        workParams: [{ company: null, position: null, startTime: '', endTime: '', salary: null, reason: null, witness: null, witnessMobile: null, relation: null }],
        maritalOptions: [{ value: '未婚', label: '未婚' }, { value: '已婚', label: '已婚' }],
        contactOptions: [{ value: '朋友', label: '朋友' }, { value: '同事', label: '同事' }, { value: '亲属', label: '亲属' }, { value: '其他', label: '其他' }],
        politicalOptions: [{ value: 3, label: '群众' }, { value: 1, label: '团员' }, { value: 2, label: '党员' }],
        workingNumOptions: [{ value: 1, label: '1-3年' }, { value: 2, label: '3-5年' }, { value: 3, label: '5-10年' }, { value: 4, label: '10年以上' }],
        currentStateOptions: [{ value: 1, label: '应届毕业生' }, { value: 2, label: '已离职' }, { value: 3, label: '在职' }, { value: 4, label: '其他' }],
        highestOptions: [{ value: '大专', label: '大专' }, { value: '本科', label: '本科' }, { value: '研究生', label: '研究生' }, { value: '博士', label: '博士' }, { value: '其他', label: '其他' }],
        onTime: '',
        radio2: 1,
        formRules: {
          email: [{ required: false, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
          idCard: [{ required: true, trigger: 'blur', validator: validateId }],
          currentSalary: [{ required: true, message: '请填写当前薪资', trigger: 'blur' }, { validator: validateMoney, trigger: 'blur' }],
          expectedSalary: [{ required: true, message: '请填写期望薪资', trigger: 'blur' }, { validator: validateMoney, trigger: 'blur' }],
          nativeAddress: [{ required: false, validator: Code, trigger: 'blur' }],
          currentAddress: [{ required: false, validator: Code, trigger: 'blur' }],
          contact: [{ required: true, message: '请输入紧急联系人姓名', trigger: 'blur' }],
          contactMobile: [{ required: true, message: '请输入紧急联系人手机号码', trigger: 'blur' }],
          university: [{ required: false, message: '请输入学校名称', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          degree: [{ required: false, message: '请输入您的学历', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          major: [{ required: false, message: '请填写专业', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          startTime: [{ required: false, message: '请选择时间', trigger: 'change' }, { validator: validateTime, trigger: 'change' }],
          endTime: [{ required: false, message: '请选择时间', trigger: 'change' }, { validator: validateTime, trigger: 'change' }],
          salary: [{ required: false, message: '请输入薪资', trigger: 'blur' }, { validator: validateMoney, trigger: 'blur' }],
          witness: [{ required: false, message: '请输入证明人姓名', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          witnessMobile: [{ required: false, message: '请输入证明人电话', trigger: 'blur' }, { validator: validatePhone3, trigger: 'blur' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: validatePhone, trigger: 'blur' }],
          relation: [{ required: true, message: '请输入与本人的关系', trigger: 'blur' }],
          reason: [{ required: true, message: '请输入离职原因', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          company: [{ required: false, message: '请输入单位名称' }, { validator: Code, trigger: 'blur' }],
          position: [{ required: true, message: '请输入岗位', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],

          arrivalTime: [{ required: true, message: '请输入到岗时间', trigger: 'change' }],
          politicalStatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
          highestEducation: [{ required: true, message: '请选择最高学历', trigger: 'change' }],
          currentState: [{ required: true, message: '请选择当前状态', trigger: 'change' }],
          workingNum: [{ required: true, message: '请选择工作年限', trigger: 'change' }],
          smsCode: [{ required: true, message: '请输入短信验证码', trigger: 'change' }],
          signaturePicUrl: [{ required: true, message: '请输入签名', trigger: 'change' }]
        }
      }
    },
    created() {
      const query = this.$route.query
      // 授权页面 authorize
      this.u_company = query.company
      this.tenantId = query.tenantId
      this.userId = query.userId
      this.getNowTime()
    },
    components: { Captcha, Draw },
    methods: {
      getImgUrl(data) {
        console.log(data)
      },
      changeData(){
        this.ruleForm = Object.assign({},this.ruleForm)
        console.log(this.ruleForm)
      },
      next() {
        this.$refs.ruleForm1.validate(valid => {
          if (valid) {
            this.ruleForm1.tenantId = this.tenantId
            this.ruleForm1.userId = this.userId
            candidateCheck(this.ruleForm1).then((response) => {
              this.loading = false
              this.showMore = true
              this.ruleForm = response.data
              const eduArray = response.data.educationInfoVOS
              const workArray = response.data.workInfoVOS
              if (!eduArray) {
                this.ruleForm.educationParams = [{ university: null, degree: null, major: null, startTime: null, endTime: null }]
              }
              if (!workArray) {
                this.ruleForm.workParams = [{ company: null, position: null, startTime: null, endTime: null, salary: null, reason: null, witness: null, witnessMobile: null, relation: null }]
              }
              if (eduArray.length !== 0) {
                this.ruleForm.educationParams = eduArray
                this.addNum.edu = eduArray.length - 1
              } else {
                this.ruleForm.educationParams = [{ university: null, degree: null, major: null, startTime: null, endTime: null }]
              }
              if (workArray.length !== 0) {
                this.ruleForm.workParams = workArray
                this.addNum.work = workArray.length - 1
              } else {
                this.ruleForm.workParams = [{ company: null, position: null, startTime: null, endTime: null, salary: null, reason: null, witness: null, witnessMobile: null, relation: null }]
              }
              delete this.ruleForm.educationInfoVOS
              delete this.ruleForm.workInfoVOS
              delete this.ruleForm.signaturePicUrl
            }).catch(error => {
              this.$message.error(error.msg)
              this.loading = false
            })
          }
        })
      },
      chooseTimeRange1(e) {
        this.sxyInfo.start = e
      },
      drawBtn() {
        this.$store.commit('SET_DRAWSTATUS', true)
        this.$store.commit('SET_DRAWIMG', '')
      },
      chooseTimeRange2(e) {
        console.log(e)
        this.sxyInfo.end = e
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
          }
          this.delVisible = false
        }
      },
      addItems(type) {
        console.log(this.ruleForm.educationParams)
        switch (type) {
          case 'edu' :
            this.educationParams.push({ university: null, degree: null, major: null, startTime: null, endTime: null })
            this.showDelete[type] = true
            this.addNum.edu++
            break
          case 'work' :
            this.workParams.push({ company: null, position: null, startTime: null, endTime: null, salary: null, reason: null, witness: null, witnessMobile: null, relation: null })
            this.showDelete[type] = true
            this.addNum.work++
            break
        }
      },
      convertImageToCanvas(image) {
        var canvas = document.createElement('canvas')
        canvas.width = 750
        canvas.height = 464
        canvas.getContext('2d').drawImage(image, 0, 0)
        return canvas
      },
      base64ToBlob(urlData) {
        var arr = urlData.split(',')
        var mime = arr[0].match(/:(.*?);/)[1] || 'image/png'
        var bytes = window.atob(arr[1])
        var ab = new ArrayBuffer(bytes.length)
        var ia = new Uint8Array(ab)
        for (var i = 0;i < bytes.length;i++) {
          ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], {
          type: mime
        })
      },
      submitSendForm() {
        if (this.ruleForm.contactMobile === this.ruleForm1.mobile) {
          this.$message.warning('候选人姓名不能和紧急联系人相同')
          return false
        }
        this.loading = true
        this.ruleForm.tenantId = this.tenantId
        this.ruleForm.userId = this.userId
        this.days(0)
        if (this.drawImg) {
          this.$store.commit('SET_DRAWSTATUS', false)
          const fileImg = this.base64ToBlob(this.drawImg)
          const fd = new FormData()
          fd.append('file', fileImg, 'image.jpg')
          console.log('fd')
          console.log(fd)
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          axios.post(addLogo, fd, config).then(res => {
            this.$store.commit('SET_AUTOGRAPHURL', res.data.data.url)
            this.ruleForm.signaturePicUrl = this.autographUrl
            this.loading = false
            this.$refs.ruleForm.validate(valid => {
              if (valid) {
                let submitForm = this.ruleForm
                submitForm.workParams = this.workParams
                submitForm.educationParams = this.educationParams
                interviewSubmit(submitForm).then(() => {
                  this.loading = false
                  this.$router.push({ path: '/wrote' })
                }).catch(error => {
                  this.$message.error(error.msg)
                  this.loading = false
                })
              } else {
                $('body,html').animate({ scrollTop: $('.is-required:first-child').offset().top }, 500)
              }
            })
          }).catch(res => {
            this.loading = false
          })
        } else {
          this.loading = false
          this.$message.warning('请填写签名')
        }
      },
      getNowTime() {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
        let clock = ''
        clock = year + '年'
        clock += month + '月'
        clock += day + '日'
        this.nowTime = clock
        if (month < 10) { clock += '0' }
        if (day < 10) { clock += '0' }
      },
      addZero(s) {
        return s < 10 ? '0' + s : s
      },

      days(e) {
        const date = new Date()
        const lw = new Date(date - 1000 * 60 * 60 * 24 * e)// 最后一个数字30可改，30天的意思
        const lastY = lw.getFullYear()
        const lastM = lw.getMonth() + 1
        const lastD = lw.getDate()
        const hour = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()

        this.ruleForm.signatureTime = lastY + '-' + this.addZero(lastM) + '-' + this.addZero(lastD) + ' ' + this.addZero(hour) + ':' + this.addZero(min) + ':' + this.addZero(sec)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .input{
    width:200px;
    height:24px;
    line-height:24px;
    font-size:14px;
    padding:5px 8px;
    border:1px solid #ddd;
  }
  .input:empty::before {
    content: attr(placeholder);
  }
  .title{
    background: #50A4FF;
    color: #fff;
    padding: 50px 0;

    p{
      font-size: 20px;
      line-height: 40px;
    }
  }
  .tip2{
    font-size: 20px;
    color: #FF8A00;
  }
  .content-title{
    text-align: center;
    padding: 20px 0;
    font-weight: normal;
    font-size: 24px;
    background: #FAFAFA;
    width: 100%;
    span{
      font-size: 16px;
    }
    .icon{
      background: url("../../static/invite.png") no-repeat 0 0;
      width: 22px;
      height: 22px;
      display: inline-block;
      background-size: contain;
      margin-right: 10px;
      position: relative;
      top: 3px;
    }
  }
  .draw-contanier{

  }
  .el-icon-delete{
    margin-left: 200px;
  }
  .content-title1{
    text-align: center;
    font-weight: normal;
    font-size: 24px;
    width: 100%;
  }
  .buttons{
    display: flex;
    width: 100%;
  }
  .box{
    margin: 0 auto;
    background: #fff;
  }
  .auth-form{
    width:800px;
  }
  .greement-container{
    padding: 45px 0;
    border-top: 1px solid #eee;
  }
  .tip3{
    font-size: 20px;
    line-height: 40px;
    width: 780px;
    margin: auto;
    text-align: left;
    text-indent: 2em;
  }
  .autograph{
    height: 100px;
    margin-top: 70px;
    text-align: center;
    .list{
      margin-right: 36px;
      display: inline-block;
      &:first-child{
        cursor: pointer;
      }
    }
    span{
      font-size: 16px;
      display: inline-block;
    }
    .line{
      border-bottom: 1px solid #333;
      width: 160px;
      overflow: hidden;

    }
  }
  .addItem{
    margin-left: 165px;
    display: block;
  }
  .bottom{
    background: #fff;
    position: relative;
    top: -21px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px 0;
  }
  .moreList{
    border-bottom: 1px solid #909399;
    padding-bottom: 40px;
    margin-bottom: 20px;
    &:last-child{
      border-bottom: none;
    }
  }


  .send-btn{
    margin: 20px 0 40px 20px;
  }
  .icon-shouji{
    font-size: 3.6vw !important;
  }
  .icon-xueli{
    font-size: 3.7vw !important;
  }
  .greement{
    height: 45px;
    text-align: center;
    margin-top: 45px;
    p{
      line-height: 40px;
    }
    span{
      display: inline-block;
      color: #232323;
    }
  }
  .link{
    color: #409EFF !important;
    text-decoration: underline;
  }
  .radio{
    width: 400px;
    overflow: hidden;
    margin-top: 13px;
    li{
      margin-bottom: 15px;
      margin-right: 15px;
      float: left;
    }
  }
  .submit-send{
    font-size: 18px;
    margin: auto;
    width: 300px;
  }
  .resume-container{
    width: 1200px;
    margin: 60px auto;
    box-shadow:0px 0px 6px rgba(35,102,253,0.2);
    .form-list{
      .el-input__inner{
        width: 390px;
      }
    }
  }
  .title{
    text-align: center;
    dl{
      line-height: 2;
    }
    dt{
      font-size: 28px;
      font-weight: bold;
    }
    dd{
      font-size: 20px;
    }
  }
  .form-list{
    display: flex;
    justify-content: center;
  }
  .summary{
    padding: 20px;
    .list{
      .icon{
        div{
          margin: 1vh auto;
        }
        background:rgba(251,251,253,1);
        border:1px solid rgba(41,97,233,1);
        border-radius:4px;
        box-shadow:0px 0px 0px rgba(35,102,253,0.2);
        text-align: center;
        width: 100%;
        padding-bottom: 76%;
        height: 0;
        transform: scale(.85);
        display: flex;
      }
    }
    i{
      color: #2961E9;
      font-size: 4vw;
    }
    span{
      font-size: 18px;
      color: #2961E9;
      display: block;
      font-weight: bold;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 2vh;
    }
  }

</style>
