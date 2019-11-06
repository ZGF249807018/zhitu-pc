<template>
  <div class="resume-container">
    <div v-if="!showMore">
      <div class="title">
        <dl>
          <dt><h1 class="content-title1"><i class="icon"></i>{{u_company}}</h1></dt>
        </dl>
        <p class="tip3">亲爱的{{authInfo.name}}，您已通过本公司面试，目前进入背景资料核实阶段（公司招聘入职正 常流程），需要您配合完成资料核对、更新完成资料核对、更新完善并提交授权。根据经验，该过程会耽搁您3分钟时间</p>
      </div>
      <div>
        <el-form :model="authInfo" :rules="formRules" ref="authInfo">
          <div class="box">
            <h1 class="content-title">身份信息<span>(必填)</span></h1>
            <div class="form-list">
              <div class="auth-form">
                <el-form-item label="姓名：" prop="name" >
                  <el-input class="auth-input" placeholder="请输入您的姓名" v-model="authInfo.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：" prop="idCard">
                  <el-input class="auth-input" placeholder="请输入身份证号" v-model.trim="authInfo.idCard" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" prop="mobile">
                  <el-input class="auth-input" placeholder="请输入您的手机号码" v-model.trim="authInfo.mobile"  maxlength="11" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码：" prop="smsCode">
                  <el-input class="auth-input" placeholder="请输入短信验证码" v-model.trim="authCode" type="number"></el-input>
                  <captcha :captchaInfo="codeType" :captchaType="'phone'" :sendCode="authInfo.mobile"></captcha>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="bottom">
        <div class="buttons">
          <el-button type="primary" :loading="loading" @click.native.prevent="next"  class="submit-send" :disabled="linkStatus">下一步</el-button>
        </div>
      </div>
    </div>
    <div v-else-if="showMore">
      <el-form :model="authInfo" :rules="formRules" ref="authInfo">
        <div class="box" v-if="tag === '1' || tag === '2' || tag === '3'">
          <h1 class="content-title">基本信息<span></span></h1>
          <div class="form-list">
            <div class="auth-form">
              <el-form-item label="当前状态" prop="currentState">
                <el-select v-model="authInfo.currentState" placeholder="请选择当前状态" class="handle-select" >
                  <el-option
                    v-for="item in currentStateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱地址" prop="email">
                <el-input class="auth-input" placeholder="请填写邮箱地址" v-model="authInfo.email"></el-input>
              </el-form-item>
              <el-form-item label="政治面貌" prop="politicalStatus">
                <el-select v-model="authInfo.politicalStatus" placeholder="请选择政治面貌" class="handle-select">
                  <el-option
                    v-for="item in politicalOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高学历" prop="highestEducation">
                <el-select v-model="authInfo.highestEducation" placeholder="请填写最高学历" class="handle-select">
                  <el-option
                    v-for="item in highestOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作年限" prop="workingNum">
                <el-select v-model="authInfo.workingNum" placeholder="请输入工作年限" class="handle-select">
                  <el-option
                    v-for="item in workingNumOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面试岗位" prop="position">
                <el-input class="auth-input" placeholder="请输入面试岗位" v-model="authInfo.position"  maxlength="15"></el-input>
              </el-form-item>
              <el-form-item label="当前薪资（元）" prop="currentSalary">
                <el-input class="auth-input" placeholder="请填写当前薪资" v-model.number="authInfo.currentSalary" ></el-input>
              </el-form-item>
              <el-form-item label="期望薪资（元）" prop="expectedSalary">
                <el-input class="auth-input" placeholder="请填写期望薪资" v-model.number="authInfo.expectedSalary" ></el-input>
              </el-form-item>
              <el-form-item label="到岗时间" prop="arrivalTime">
                <el-date-picker
                  v-model="authInfo.arrivalTime"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerBeginDateBefore"
                  type="date"
                  placeholder="请选择最快到岗时间">
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box" v-if="tag === '1' || tag === '3'">
          <el-form :model="authInfo" :rules="formRules" ref="authInfo">
            <h1 class="content-title">教育经历<span>(由专科起填)</span></h1>
            <div class="form-list">
              <div class="auth-form">
                <div class="moreRules">
                  <div class="moreList" v-for="(item, index) in educationParams" :key="item.key">
                    <el-form-item class="rules" label="学校名称:" prop="name">
                      <el-input v-model="educationParams[index].university" placeholder="请输入学校名称"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="学历:" prop="name">
                      <el-input v-model="educationParams[index].degree" placeholder="请输入学历"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="专业:" prop="name">
                      <el-input v-model="educationParams[index].major" placeholder="请输入专业"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="证书编号:" prop="name">
                      <el-input v-model="educationParams[index].certificateNum" placeholder="请输入证书编号"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="入学时间:" prop="name">
                      <el-date-picker
                        value-format="yyyy-MM"
                        v-model="educationParams[index].startTime"
                        @change="changeData"
                        type="month"
                        placeholder="">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item class="rules" label="毕业时间:" prop="name">
                      <el-date-picker
                        value-format="yyyy-MM"
                        v-model="educationParams[index].endTime"
                        @change="changeData"
                        type="month"
                        placeholder="">
                      </el-date-picker>
                    </el-form-item>
                    <el-button type="danger" @click="deleteBtn(item, index, 'edu')"  v-show="showDelete.edu && index !== 0   || eduNum > 0" class="el-icon-delete">&nbsp;删除本条记录</el-button>
                  </div>
                </div>
                <el-form-item v-if='educationParams.length < 3'>
                  <el-button type="primary" class="addItem" @click="addItems('edu')" v-show="this.addNum.edu < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加教育经历</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <div class="box" v-if="tag === '2' || tag === '3'">
          <el-form :model="authInfo" :rules="formRules" ref="authInfo">
            <h1 class="content-title">工作经历<span>(由最近起填)</span></h1>
            <div class="form-list">
              <div class="auth-form">
                <div class="moreRules">
                  <div class="moreList" v-for="(item, index) in workParams" :key="index">
                    <el-form-item class="rules" label="公司名称" :rules="formRules.company" prop="name">
                      <el-input v-model="workParams[index].company" placeholder="请输入公司名称"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="岗位" prop="name">
                      <el-input v-model="workParams[index].position" placeholder="请输入岗位"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="薪资（元）" prop="name">
                      <el-input v-model.number="workParams[index].salary" placeholder="请输入薪资" type="number"  :value="item.salary"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="入职时间" prop="name">
                      <el-date-picker
                        value-format="yyyy-MM"
                        @change="changeData"
                        v-model="workParams[index].startTime"
                        type="month"
                        placeholder="请选择入职时间">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item class="rules" label="离职时间" prop="name">
                      <el-date-picker
                        value-format="yyyy-MM"
                        @change="changeData"
                        v-model="workParams[index].endTime"
                        type="month"
                        placeholder="请选择入离职时间">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item class="rules" label="离职原因" prop="name">
                      <el-input v-model="workParams[index].reason" placeholder="请输入离职原因"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="证明人姓名" prop="name">
                      <el-input v-model="workParams[index].witness" placeholder="请输入证明人姓名"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="证明人电话" prop="name" >
                      <el-input v-model="workParams[index].witnessMobile" placeholder="请输入证明人电话"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="证明人关系" prop="name">
                      <el-select v-model="workParams[index].relation" placeholder="请选择证明人关系" class="handle-select">
                        <el-option
                          v-for="v in contactOptions"
                          @change="changeData"
                          :key="v.value"
                          :label="v.label"
                          :value="v.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item class="rules" label="证明人姓名">
                      <el-input v-model="workParams[index].witnessOptional" placeholder="请输入证明人姓名"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="证明人电话">
                      <el-input v-model="workParams[index].witnessMobileOptional" placeholder="请输入证明人电话"></el-input>
                    </el-form-item>
                    <el-form-item class="rules" label="证明人关系">
                      <el-select v-model="workParams[index].relationOptional" placeholder="请选择证明人关系" class="handle-select">
                        <el-option
                          v-for="v in contactOptions"
                          @change="changeData"
                          :key="v.value"
                          :label="v.label"
                          :value="v.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div class="box greement-container">
          <div class="autograph">
            <div >
              <p class="declare-p">授权声明</p>
              <p class="declare-p">本人保证所提交的简历信息真实，并授权公司及其合作第三方机构对个人履历中各项信息进行背景核实。</p>
            </div>
            <div class="list" @click="drawBtn">
              <span>签名：</span>
              <span class="info line" id="autograph">
                <img :src="drawImg" alt="" style="width: 100px;height: 40px;" id="ringoImage" width="200" height="200">
              </span>
              <span>日期：</span><span class="info">{{nowTime}}</span>
            </div>
          </div>
          <div class="greement">
            <el-checkbox v-model="checked">我已阅读并同意<span @click.prevent="toAuth" class="link" target="_blank">《职兔授权协议》</span></el-checkbox>
          </div>
          <div class="buttons">
            <el-button type="primary"  @click.native.prevent="submitSendForm"  class="submit-send">提交</el-button>
          </div>
        </div>
      </el-form>
      <div  class="draw-contanier" v-show="drawStatus">
        <Draw   @upload="getImgUrl"></Draw>
      </div>
      <el-dialog title="签名" :visible.sync="dialogDrawVisible">
        <Draw></Draw>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDrawVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogDrawVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
  import { doAuthorization } from '@/api/resumeForm'
  import { getDetail } from '@/api/order'
  import { authCaptcha } from '@/api/check'
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
        showDelete: { edu: false, work: false, family: false },
        type: '',
        addNum: { edu: 0, work: 0, family: 0 },
        tag: 0,
        deleteType: '',
        linkStatus: false,
        checked: true,
        authCode: '',
        dialogDrawVisible: false,
        loading: false,
        delVisible: false,
        idx: -1,
        authInfo: {
          'id': null, // 必填
          'gzllNum': 0,
          'tenantId': null, // 必填
          'orderNo': null, // 必填
          'authPicUrl': null, // 必填
          'tag': null, // 必填，见详解
          'currentState': 0,
          'email': null,
          'politicalStatus': 1,
          'highestEducation': null,
          'workingNum': 1,
          'position': '',
          'currentSalary': 0,
          'expectedSalary': 0,
          'arrivalTime': null,
          'contact': null,
          'contactMobile': null,
          'relation': null
        },
        educationParams: [{
          'university': null,
          'degree': null,
          'major': null,
          'startTime': null,
          'endTime': null,
          'certificateNum': null
        }],
        workParams: [{
          'company': null,
          'position': null,
          'startTime': null,
          'endTime': null,
          'salary': null,
          'reason': null,
          'witness': null,
          'witnessMobile': null,
          'relation': null
        }],
        u_company: '',
        codeType: {
          codeType: 'code_notice'
        },
        contactOptions: [{ value: '朋友', label: '朋友' }, { value: '同事', label: '同事' }, { value: '亲属', label: '亲属' }, { value: '其他', label: '其他' }],
        politicalOptions: [{ value: 3, label: '群众' }, { value: 1, label: '团员' }, { value: 2, label: '党员' }],
        workingNumOptions: [{ value: 1, label: '1-3年' }, { value: 2, label: '3-5年' }, { value: 3, label: '5-10年' }, { value: 4, label: '10年以上' }],
        currentStateOptions: [{ value: 1, label: '应届毕业生' }, { value: 2, label: '已离职' }, { value: 3, label: '在职' }, { value: 4, label: '其他' }],
        highestOptions: [{ value: '小学', label: '小学' }, { value: '初中', label: '初中' }, { value: '高中', label: '高中' }, { value: '大专', label: '大专' }, { value: '本科', label: '本科' }, { value: '研究生', label: '研究生' }, { value: '博士', label: '博士' }],
        formRules: {
          name: [{ required: false, message: '请输入姓名', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          idCard: [{ required: false, trigger: 'blur', validator: validateId }],
          mobile: [{ required: false, message: '请输入手机号码', trigger: 'blur' }, { validator: validatePhone, trigger: 'blur' }],
          smsCode: [{ required: true, message: '请输入短信验证码', trigger: 'change' }]
        }
      }
    },
    created() {
      // 授权页面 authorize
      console.log(this.$route)
      const query = this.$route.query
      this.tenantId = query.tenantId
      this.candidateId = query.candidateId
      this.orderNo = query.orderNo
      this.u_company = query.u_company
      this.tag = query.tag
      getDetail(query.tenantId, query.candidateId, query.orderNo).then((response) => {
        this.loading = false
        let data = response.data
        let workParams = []
        for(let i = 0; i < query.gzllNum; i++) {
          if( i < response.data.workInfoVOS.length){
            workParams.push(response.data.workInfoVOS[i])
          } 
          else {
            workParams.push({
              company: "",
              position: "",
              salary: "",
              startTime: "",
              endTime: "",
              witness: "",
              witnessMobile: "",
              relation: "",
              witnessOptional: '',
              relationOptional: '',
              witnessMobileOptional: ''
            })
          }
        }
        data.gzllNum = query.gzllNum
        data.orderNo = this.orderNo
        data.id = this.candidateId
        data.tenantId = this.tenantId
        data.tag = this.tag
        this.workParams = workParams
        this.educationParams = response.data.educationInfoVOS
        delete data.educationInfoVOS
        delete data.workInfoVOS
        delete data.workingNum
        this.authInfo = Object.assign({},data)
        console.log(response.data.educationInfoVOS)
        console.log(this.authInfo)
      }).catch(error => {
        this.$message.error(error.msg)
        this.loading = false
      })
      this.getNowTime()
    },
    components: { Captcha, Draw },
    methods: {
      changeData(){
        this.authInfo = Object.assign({},this.authInfo)
        console.log(this.authInfo)
      },
      getImgUrl(data) {
        console.log(data)
      },
      toAuth() {
        const {
          company,
          idCard,
          name,
        } = this.$route.params;
        console.log('this.$route.query',this.$route.params)
        const { href } = this.$router.resolve({ path: "/credit" ,query: {  company: company , idCard: idCard ,name: name  }},);
        window.open(href, "_blank");
      },
      next() {
        authCaptcha(this.authInfo.mobile, 'code_notice', this.authCode).then(() => {
          this.loading = false
          this.showMore = true
        }).catch(error => {
          this.$message.error(error.msg)
          this.loading = false
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
        if (this.idx === 1) {
          this.showDelete[this.deleteType] = false
        }
        if (this.idx !== -1) {
          switch (this.deleteType) {
            case 'edu' :
              this.educationParams.splice(this.idx, 1)
              this.addNum.edu--
              break
            case 'work' :
              this.workParams.splice(this.idx, 1)
              this.addNum.work--
              break
          }
          this.delVisible = false
        }
      },
      addItems(type) {
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
        if (!this.checked) {
          this.$message.warning('同意协议才能提交哦')
        } else {
          if (this.drawImg) {
            this.$store.commit('SET_DRAWSTATUS', false)
            const fileImg = this.base64ToBlob(this.drawImg)
            const fd = new FormData()
            fd.append('file', fileImg, 'image.jpg')
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            axios.post(addLogo, fd, config).then(res => {
              this.$store.commit('SET_AUTOGRAPHURL', res.data.data.imgUrl)
              let submitForm = this.authInfo
              submitForm.authPicUrl = this.autographUrl
              submitForm.workParams = this.workParams
              submitForm.educationParams = this.educationParams
              doAuthorization(submitForm).then(() => {
                this.loading = false
                this.$router.push({ path: '/wrote' })
              }).catch(error => {
                this.$message.error(error.msg)
                this.loading = false
              })
            }).catch(res => {
              console.log(res)
            })
          } else {
            this.$message.warning('请填写签名')
          }
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
      getNowTime2() {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
        let clock = ''
        clock = year + '-'
        clock += month + '-'
        clock += day
        this.authInfo.signatureTime = clock
        if (month < 10) { clock += '0' }
        if (day < 10) { clock += '0' }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
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
  .declare-p{
    text-align: center;
    line-height: 40px;
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
    height: 140px;
    margin:  0 auto;
    .list{
      text-align: center;
      margin-top: 10px;
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
