
<template>
  <div>
    <div class="dashboard-container top-box">
        <div  class="shadow-list top-left">
          <div class="title">
            我的工作台
          </div>
          <div class="co-info">
            <div class="co-avatar"><img :src="logo ? imgDataUrl + logo: defaultImg " alt="头像" class="fl"></div>
            <div class="fl co-top">
              <div class="co-title">欢迎登录职兔背调！</div>
              <div class="co-name"><span>企业名称：</span><span class="info">{{company}}</span></div>
              <div class="co-name"><span>账号级别：</span><span class="info">{{primary ? '主账号': '子账号'}}</span></div>
              <div class="co-name"><span>企业认证：</span><span class="icon iconfont "  :class="[ 'auth-'+certify ]">
                <span v-if="certify == 0 || certify == 2"><router-link to="/personal/authForm" >{{certify == 0 ? '未认证' : '认证失败'}}</router-link></span>
                <span v-else>{{certify == 1 ? '审核中' : '已认证'}}</span>
              </span>
              </div>

            </div>
          </div>
        </div>
      <div  class="shadow-list top-right">
          <img src="../../assets/images/quick.png" alt="一键背调，急速有效" class="fl top-img">
        <div  class="pl">
          <div class="fl txt-name">一键背调，急速有效</div>
        </div>
          <router-link to="/background/check" ><el-button type="primary" class="start-btn">开始背调</el-button></router-link>
      </div>
    </div>
    <div class="dashboard-container">
      <div >
        <div class="list-pro">
          <div  class="list-pro-info shadow-list">
            <div class="list-icon">
              <div class="icons-bar"><i class="account icon iconfont icon-chongzhi"></i></div>
            </div>
            <div class="list-pro-num account">
              <div class="m-info">
                <div class="unit">账户余额</div>
                <div class="num"><span class="red">{{balance | decimalNum2 }}</span><span class="unit">元</span></div>
              </div>
              <router-link to="/balance/account"><div class="icon-link">充值</div></router-link>
            </div>
          </div>
          <div  class="list-pro-info shadow-list">
            <div class="list-icon">
              <div class="icons-bar"><i class="coupon icon iconfont icon-xianjinquan"></i></div>
            </div>
            <div class="list-pro-num coupon">
              <div class="m-info">
                <div class="unit">优惠券</div>
                <div class="num"><span class="red">{{coupon}}</span><span class="unit">张</span></div>
              </div>
              <router-link to="/background"><div class="icon-link">使用</div></router-link>
            </div>
          </div>
          <div  class="list-pro-info shadow-list">
            <div class="list-icon">
              <div class="icons-bar"><i class="tianyan-coin icon iconfont icon-yue"></i></div>
            </div>
            <div class="list-pro-num">
              <div class="m-info">
                <div class="unit">职兔币</div>
                <div class="num"><span class="red">{{count}}</span><span class="unit">个</span></div>
              </div>
              <router-link to="/balance/account"><div class="icon-link">充值</div></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="co-time-info dashboard-container shadow-list">
      <div class="block">
        <span class="start-time">起止时间</span>
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-button type="primary" @click="searchReport" class="search-btn">确定</el-button>
      </div>
    </div>
    <el-row class="dashboard-container dashboard-container2">
      <el-col :span="24">
        <div class="list-pro">
          <div  class="shadow-list list-pro-info">
            <div class="list-icon">
              <div class="icons-bar icons-bar2"><i class="report icon iconfont icon-dingdan"></i></div>
            </div>
            <div class="list-pro-num list-pro-num2">
              <div class="m-info">
                <div class="unit">背调报告</div>
                <div class="num"><span class="red">{{report}}</span><span class="unit">份</span></div>
              </div>
            </div>
          </div>
          <div  class="shadow-list list-pro-info">
            <div class="list-icon">
              <div class="icons-bar icons-bar2"><i class="processing icon iconfont icon-chulizhong"></i></div>
            </div>
            <div class="list-pro-num list-pro-num2">
              <div class="m-info">
                <div class="unit">处理中</div>
                <div class="num"><span class="red">{{doing}}</span><span class="unit">份</span></div>
              </div>
            </div>
          </div>
          <div  class="shadow-list list-pro-info">
            <div class="list-icon">
              <div class="icons-bar icons-bar2"><i class="cancel  icon iconfont icon-dingdanquxiao"></i></div>
            </div>
            <div class="list-pro-num list-pro-num2">
              <div class="unit">已取消</div>
              <div class="num"><span class="red">{{cancel}}</span><span class="unit">份</span></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="info-add">
        <div class="bottom-bg">
          <div  class="shadow-list qcode-bg">
            <div class="title">扫码填写应聘资料表</div>
            <div class="tc tip1">企业专属面试申请表，候选人通过扫码在线 填写应聘资料</div>
            <div class="qcode" id="qcode" v-if="certify == 3">
            <!--<Qrcode :value="codeUrl" :options="{ size: 200 }"></Qrcode>-->
              <!--<vue-q-art :config="config" style="display: flex;justify-content: center"></vue-q-art>-->
              <img  id="qcodeLogo" />
            </div>
            <div v-else>
              <p class="code-tip">企业未认证,功能暂未开放</p>
            </div>
            <!--<div class="send-info">企业专属面试申请表，候选人通过扫码在线 填写应聘资料</div>-->
            <!--<el-form  label-width="100px"  autoComplete="on" :model="emailForm" :rules="emailRules" ref="emailForm" >-->
              <!--<el-form-item label="姓名" prop="name">-->
                <!--<el-input v-model="emailForm.name" name="name" class="viewForm-input"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="邮箱" prop="email">-->
                <!--<el-input v-model="emailForm.email" name="phone" class="viewForm-input"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item>-->
                <!--<el-button type="primary" @click="submitEmailForm"  class="send-btn">发送面试资料</el-button>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
          </div>
          <div class="shadow-list email-bg">
            <div class="title">面试邀请函</div>
            <div class="send-info"><i class="icon iconfont icon-tongzhi1"></i>提示：面试邀请一键发送，应聘资料表在线填写！</div>
            <el-form  label-width="100px"  autoComplete="on" :model="viewForm" :rules="viewRules" ref="viewForm" >
              <el-form-item label="候选人姓名" prop="name">
                <el-input v-model="viewForm.name" name="name" class="viewForm-input" placeholder="请输入候选人姓名（必填）"></el-input>
              </el-form-item>
              <el-form-item label="候选人电话" prop="mobile">
                <el-input v-model.trim="viewForm.mobile" name="mobile" class="viewForm-input" placeholder="请输入候选人电话（必填）"></el-input>
              </el-form-item>
              <el-form-item label="候选人邮箱" prop="email">
              <el-input v-model.trim="viewForm.email" name="email" class="viewForm-input" placeholder="请输入候选人邮箱"></el-input>
              </el-form-item>
              <el-form-item class="rules" label="面试时间:" prop="interviewTime">
                <el-date-picker
                  format="yyyy 年 MM 月 dd 号 HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  v-model="viewForm.interviewTime"
                  :picker-options="pickerBeginDateBefore"
                  placeholder="请输入面试时间（必填）"
                  type="datetime"
                  class="viewForm-input" >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="面试地址" prop="address">
                <el-input v-model="viewForm.address" name="address" class="viewForm-input" placeholder="请输入面试地址（必填）"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="contact">
                <el-input v-model="viewForm.contact" name="contact" class="viewForm-input" placeholder="请输入招聘专员姓名（必填）"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model.trim="viewForm.phone" name="phone" class="viewForm-input" placeholder="请输入招聘专员电话（必填）"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="showInvitation"  class="send-btn">发送面试资料</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
    <el-dialog
      title="发送邀请函"
      class="tc"
      :visible.sync="dialogVisible4"
      width="380px"
      center
    >
      <span>系统已为您自动生成{{this.viewForm.name}}的面试邀请函， 候选人完成应聘资料提交后可在候选人库里查看。</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible5 = true">查看邀请函</el-button>
      <el-button type="primary" @click="submitViewForm">立即发送</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="xxx公司（职兔）面试邀请函"
      class="template-title"
      :visible.sync="dialogVisible5"
      width="1000px"
      center
    >
      <div class="content">
        <div class="describe">
          <p>XX先生／女士：您好！</p>
          <p>很高兴收阅您的应聘简历，感谢您对我公司的信任和选择。您的简历已 经通过我公司的初步筛选，为了促进双方的进一步了解，诚邀请您到我公司参加面试。具体事宜如下：</p>
        </div>
        <div class="info">
          <p><i class="icon iconfont icon-sanjiaoxing"></i>面试时间：XX</p>
          <p><i class="icon iconfont icon-sanjiaoxing"></i>面试地点：XX</p>
          <p><i class="icon iconfont icon-sanjiaoxing"></i>联系人：XX</p>
          <p><i class="icon iconfont icon-sanjiaoxing"></i>联系电话：XX</p>
          <p><span class="red">特别提示：</span>为了提高双方效率，请点击XXX链接并进行应聘资料填写。</p>
        </div>
        <div class="footer">
          <p>XXX公司 人事部</p>
          <p>日期： XX年XX月XX日</p>
        </div>
        <div class="template-img"></div>
      </div>

    </el-dialog>

    <el-dialog
      title="提示"
      class="tc"
      :visible.sync="dialogVisible"
      width="380px"
      center
      >
      <span>企业认证后，可正常使用背调服务。<br/>认证前可免费进行一次自查体检。</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="checkMyself">自查体验</el-button>
    <el-button type="primary" @click="goLink1">去认证</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="
      企业未认证，您可以对自己
      发起一次背调"
      :visible.sync="dialogVisible2"
      width="552px"
    >
      <div style="margin: auto">
        <div >
          <span class="txt-title">背调项目</span>
          <!--<el-popover-->
          <!--placement="top-start"-->
          <!--title=""-->
          <!--width="150"-->
          <!--trigger=""-->
          <!--content="hover">-->
          <!--<el-button slot="reference" class="pop-info">-->
            <!--<span>项目说明</span> <i class="icon iconfont icon-gantanhao"></i>-->
          <!--</el-button>-->
        <!--</el-popover>-->
          <el-button slot="reference" class="pop-info">
            <span>项目说明</span> <i class="icon iconfont icon-gantanhao"></i>
          </el-button>
          <ul class="icon-lists">
            <li><div class="icon iconfont icon-idcard"></div><div class="txt">身份验证</div></li>
            <li><div class="icon iconfont icon-shouji2"></div><div class="txt">手机实名验证</div></li>
            <li><div class="icon iconfont icon-fumianyuqing"></div><div class="txt">社会负面记录</div></li>
          </ul>
          <ul class="icon-lists">
            <li><div class="icon iconfont icon-fayuan"></div><div class="txt">法院涉诉信息</div></li>
            <li><div class="icon iconfont icon-shixinbeizhihang"></div><div class="txt">法院失信被执行人信息</div></li>
            <li><div class="icon iconfont icon-jinrong"></div><div class="txt">金融风险信息</div></li>
          </ul>
        </div>
        <p class="txt2">您需要正确填写本人姓名及身份证号码 ，若不匹配无法背调</p>
        <el-form label-width="126px" class="auth-form" :model="checkForm" :rules="checkRules" ref="checkForm">
        <el-form-item label="候选人姓名" prop="name">
          <el-input class="auth-input" placeholder="" v-model="checkForm.name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idCard">
          <el-input class="auth-input" placeholder="" v-model="checkForm.idCard" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input class="auth-input" placeholder="" v-model="checkForm.mobile" maxlength="11" type="number"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible2 = false">取 消</el-button>-->
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog
      title="下单成功"
      class="tc"
      :visible.sync="dialogVisible3"
      width="380px"
      center
    >
      <span>授权成功3分钟可查看数据报告</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goLink">查看订单</el-button>
    <el-button type="primary" @click="goLink2">继续查询</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  // import VueQArt from 'vue-qart'
  // import Qrcode from '@xkeshi/vue-qrcode'
  const moment = require('moment')
  import { days, days2 } from '@/utils/index'
  import { sendInterviewUrl, sendInterviewEmail, sendInterview } from '@/api/info'
  import { reportCount, statistics, createTasteReport } from '@/api/report'
  import { checkInputPhone, checkInputEmail, checkInputName, checkInputID, checkContactName, checkContacPhone } from '@/utils/check/index'
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'company',
        'primary',
        'logo',
        'certify',
        'tid',
        'uid',
        'balance',
        'coupon',
        'orderInfo'
      ])
    },
    data() {
      const validateId = (rule, value, callback) => { checkInputID(value, callback, '', false) }
      const validateEmail = (rule, value, callback) => {
        checkInputEmail(value, callback)
      }
      const validatePhone = (rule, value, callback) => {
        checkInputPhone(value, callback, '', false)
      }
      const validateContactPhone = (rule, value, callback) => {
        checkContacPhone(value, callback, this.viewForm.mobile)
      }
      const validateName = (rule, value, callback) => {
        checkInputName(value, callback, '', false)
      }
      const validateContactName = (rule, value, callback) => {
        checkContactName(value, callback, this.viewForm.name)
      }
      return {

        config: {
          value: '',
          imagePath: './static/menuHead.png',
          filter: 'color'
        },
        urlInfo: '',
        downloadButton: false,
        input1: '',
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible5: false,
        templateActiveName: '1',
        startTime: days(30),
        endTime: days2(0),
        report: '',
        reportNum: 0,
        doing: '',
        cancel: '',
        imgDataUrl: process.env.IMG_API,
        defaultImg: './static/menuHead.png',
        count: 0,
        timeRange: [days(30), days2(0)],
        viewForm: { name: '', phone: '', interviewTime: '', address: '', mobile: '', contact: '', email: '' },
        emailForm: { name: '', email: '' },
        pickerBeginDateBefore: { disabledDate(time) { return time.getTime() < Date.now() - 8.64e7 } },
        codeUrl: '',
        emailRules: {
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          name: [{ required: true, trigger: 'blur', validator: validateName }]
        },
        viewRules: {
          name: [{ required: true, trigger: 'blur', validator: validateName }],
          mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
          email: [{ required: true, trigger: 'blur', validator: validateEmail }],
          interviewTime: [{ required: true, trigger: 'blur', message: '请输入面试时间' }],
          address: [{ required: true, trigger: 'blur', message: '请输入面试地址' }],
          contact: [{ required: true, trigger: 'blur', validator: validateContactName }],
          phone: [{ required: true, trigger: 'blur', validator: validateContactPhone }]
        },
        checkForm: {
          name: '',
          email: '',
          mobile: ''
        },
        isSubmitViewForm: false,
        checkRules: {
          name: [{ required: true, message: '请输入候选人姓名', trigger: 'blur' }],
          idCard: [{ required: true, trigger: 'blur', validator: validateId }],
          mobile: [{ required: true, trigger: 'blur', validator: validatePhone }]
        },
                pickerOptions: {
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
        }
      }
    },
    components: {
      // Qrcode,
      // VueQArt
    },
    created() {
      console.log(process.env.BASE_API)
      // this.endTime = moment(this.endTime).format('YYYY-MM-DD HH:mm:ss')
      statistics(this.tid, '', '').then((response) => {
          this.Alldoing = response.data.processingCount
          reportCount(this.tid, '', '').then((response) => {
            this.allReport = response.data
            console.log(this.certify)
            if (this.certify == '0' && this.allReport == 0 && this.Alldoing == 0) {
              this.dialogVisible = true
            }
          }).catch(error => {
            this.$message.error(error.msg)
          })
        }).catch(error => {
          this.$message.error(error.msg)
        })
      this.reportResult(this.startTime, this.endTime)
    },
    mounted() {
      const this_company = encodeURIComponent(encodeURIComponent(this.company))
      console.log(this)
      new QRCode(document.getElementById('qcode'),process.env.mobile_API+'/#' + `?tenantId=${this.tid}&userId=${this.uid}&company=${this.company}`)
    },
    methods: {
      checkMyself(){
        if(this.allReport != 0 || this.Alldoing != 0 ){
          this.$message.error('免费自查已使用')
          return false
        }
        this.dialogVisible = false
        this.dialogVisible2 = true
      },
      showInvitation() {
        console.log(this.certify)
        if (this.certify == 0 || this.certify == 4) {
          this.dialogVisible = true
          return false
        }else if(this.certify == 1){
          this.$message.error('企业认证审核未通过，请等待')
          return false
        }
        this.$refs.viewForm.validate(valid => {
          if (valid) {
            this.dialogVisible4 = true
          }
        })
      },
      goLink() {
        this.$router.push({ path: '/background/orderSearch' })
      },
      goLink1() {
        this.$router.push({ path: '/personal/auth' })
      },
      goLink2() {
        this.$router.push({ path: '/background/check' })
      },
      saveEdit() {
        if(this.isSubmitViewForm){
          return false
        }
        this.isSubmitViewForm = true
        this.$refs.checkForm.validate(valid => {
          if (valid) {
            createTasteReport(this.tid, this.uid, 107, this.checkForm.mobile, this.checkForm.name, this.checkForm.idCard).then((response) => {
              this.dialogVisible2 = false
              this.dialogVisible3 = true
              this.isSubmitViewForm = false
              console.log(response)
            }).catch(error => {
              console.log(error)
              this.isSubmitViewForm = false
              this.$message.error('姓名和身份证号不匹配')
            })
          }
        })
      },
      reportResult(startTime, endTime) {
        statistics(this.tid, startTime, endTime).then((response) => {
          this.doing = response.data.processingCount
          this.cancel = response.data.canceledCount
        }).catch(error => {
          this.$message.error(error.msg)
        })
        reportCount(this.tid, startTime, endTime).then((response) => {
          this.report = response.data
        }).catch(error => {
          this.$message.error(error.msg)
        })
        if (this.certify == '0' && this.allReport == 0 && this.Alldoing == 0) {
          this.dialogVisible = true
        }
      },
      searchReport() {
        console.log(this.timeRange)
        if(this.timeRange){
          this.startTime = moment(this.timeRange[0]).format('YYYY-MM-DD HH:mm:ss')
          this.endTime = moment(this.timeRange[1]).format('YYYY-MM-DD HH:mm:ss')
        }
        this.reportResult(this.startTime, this.endTime)
      },
      submitViewForm() {
        console.log(this.viewForm.interviewTime)
        if(this.isSubmitViewForm){
          return false
        }
        this.isSubmitViewForm = true
        sendInterview(this.viewForm.name, this.viewForm.phone, this.viewForm.interviewTime, this.viewForm.address, this.viewForm.mobile, this.viewForm.contact, this.viewForm.email).then((response) => {
          console.log(response)
          this.$message.success('发送成功')
          this.dialogVisible4 = false
          this.isSubmitViewForm = false
        }).catch(error => {
          this.$message.error(error.msg)
          this.isSubmitViewForm = false
        })
      },
      submitEmailForm() {
        this.$refs.emailForm.validate(valid => {
          const email = this.emailForm.email.trim()
          if (valid) {
            sendInterviewEmail(this.tid, this.uid, this.emailForm.name, email).then((response) => {
              console.log(response)
              this.$message.success('发送成功')
            }).catch(error => {
              console.log(error)
              this.$message.error('发送失败')
            })
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/variables';
  .send{
    width: 100%;
  }
  #qcode{
    display: flex;
    justify-content: center;
  }
  .pop-info{
    right: 0;
    top: 0;
    border: none;
    background: transparent;
    span,i{
      color: #409EFF;
    }

  }
  .dialog-footer{
    display: flex;
    justify-content: center;
    .el-button{
      width: 274px;
    }
  }
  .list-pro-num{
    .num{
      display: flex;
      .red{
        font-weight: bold;
        padding-right: 10px;
        font-size: 36px !important;
        word-wrap: break-word;
      }
      .unit{
        font-size: 24px;
        color: #333;
        position: relative;
      }
    }
  }

.template-img{
  width: 750px;
  height: 1584px;
  background: url("../../assets/images/temp-img.png") no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
  cursor: not-allowed;
  margin: 135px auto 0 auto;
}
  .viewForm-input{
    width: 90%;
  }
  .send-btn{
    width: 300px;
    position: relative;
  }
  .icon-chulizhong,.icon-dingdan,.icon-dingdanquxiao{
    font-size: 5vw;
  }
.dashboard-container2 {
  .icons{
    padding: 10px !important;
    i{
      font-size: 3rem !important;
    }
  }
  .list-pro-num{
    top: 0 !important;
  }
}
.search-btn{
  margin-left: 20px;
}
.co-time-info{
  padding: 20px;
}
.bottom{
  padding: 80px 72px;
  display: flex;
  align-items: center;
  .pl{
    padding-left: 40px;
  }
}
  .title{
    height: 38px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    padding-left: 27px;
    font-size: 14px;
    line-height: 38px;
  }
  .send-info{
    font-size: 16px;
    padding: 10px 30px ;
    color: #FF7200;
    background: #F8F8F8;
    margin-bottom: 23px;
  }
  .tip1{
    font-size: 20px;
    padding: 40px;
  }
  .el-form{
    margin-left: 30px;
  }
  .txt-name{
    color: #000;
    font-size: 27px;
    font-weight: bold;
  }
  .top-box{
    display: flex;
  }
  .top-left{
    height: 216px;
    flex: 1;
    margin-right: 20px;
  }
  .top-right{
    flex: 1;
    height: 216px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-lists{
    display: flex;
    justify-content: space-around;
    width: 100%;
    text-align: center;
    &:first-child{
      margin-bottom: 25px;
    }
    li{
      text-align: center;
      width: 32%;
      .icon{
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: #B2B2B2;
        color: #5E9BF2;
        font-size: 30px;
        text-align: center;
        line-height: 65px;
        margin: auto;
      }
      .txt{
        font-size: 16px;
        color: #333;
        padding-top: 5px;
      }
    }
  }
  .txt2{
    color: #B2B2B2;
    font-size: 16px;
    text-align: center;
    line-height: 3.8;
  }
  .bottom-bg{
    background: #fff;
    display: flex;
    line-height: 1.5rem;
    .qcode-bg{
      margin-right: 20px;
     flex: 1;
    }
    .email-bg{
      flex: 1;
    }
  }
  .qcode{

    canvas{
      width:220px;
      height: 220px;
      flex: 1;
      margin: auto;
      display: block;
      background: #F8F8F8;
      padding: 28px;
    }

  }
  .m-info{
    display: flex;
    flex-direction: column;
  }
  .txt-title{
    padding-left: 30px;
  }
  .list-icon{
    text-align: center;
    padding: 45px 18px;
    display: flex;
  }
  .icon-link{
    border: rgb(124, 178, 255) 1px solid;
    width: 100px;
    height: 36px;
    text-align: center;
    border-radius: 20px;
    line-height: 36px;
    color: rgb(124, 178, 255);
    margin-left: 28px;
    &:hover{
      background: #66b1ff;
      color: #fff;
    }
  }
  .action-btn{
    width: 14%;
    span{
      color: #fff;
      border-radius: 4px;
      border: 1px solid #fff;
      padding: 10px 12px;
      position: relative;
      top: 10px;
      right: 6px;
      display: inline-block;
      font-size: 14px;
    }


  }
  @media (max-width: 1260px){

  }
  .start-time{
    margin-right: 29px;
  }
  .info-add{
    margin: 20px;
    .code-tip{
      text-align: center,
    }
  }

  .start-btn{
    margin-left: 75px;
    margin-right: 20px;
  }
  .auth{
    span{
      font-size: 12px;
    }
  }
  .dashboard-container{
    background: #fff;
    margin: 20px;
    .list-icon-color{
      color: #fff;
    }
    @mixin list-icon-color($bg) {
      background: $bg;
      color: #fff;
      padding: 10px;
    }
    .list-pro-info2{
      /*flex-direction: column;*/
    }
    .list-pro{
      display: flex;
      .list-pro-info{
        margin-right: 20px;
        border-radius: 4px;
          flex: 1;
        display: flex;
          &:nth-child(1){.list-icon .icons-bar{ @include list-icon-color(#FE6B69)} }
          &:nth-child(2){.list-icon .icons-bar{ @include list-icon-color(#73A0DB)} }
          &:nth-child(3){.list-icon .icons-bar{ @include list-icon-color(#FCD161)} }

        &:nth-child(1){.list-icon .icons-bar2{ @include list-icon-color(#37C4C6)} }
        &:nth-child(2){.list-icon .icons-bar2{ @include list-icon-color(#746FD5)} }
        &:nth-child(3){.list-icon .icons-bar2{ @include list-icon-color(#1888C8)} }
      }
      .list-pro-num2{
        flex-direction: column;
        margin: 0 !important;
      }
      .list-pro-num{
        line-height: 2.5rem;
        margin: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        div{
          &.unit{
            font-size: 24px;
          }
            span{
              font-size: 18px;
            }
        }
      }
      .icons{
        padding: 20px 20px 2px 20px;
        text-align: center;
        i{
          display: block;
          font-size: 3rem;
          color: #fff;
        }
      }
      .icon-txt{
        font-size: 12px;
        color: #fff;
        padding: 3px 0;
        width: 100%;
        display: block;
        text-align: center;
      }
      .txt-title{
        padding-left: 35px;
      }
      .icons-bar{
        display: flex;
        align-items: center;
        justify-content: center;
        /*width: 7vw;*/
        width: 96px;
        .account{
          /*font-size: 5vw;*/
          font-size: 73px;
        }
        .coupon{
          /*font-size: 3.3vw;*/
          font-size: 53px;
        }
        .tianyan-coin{
          /*font-size: 5vw;*/
          font-size: 73px;
        }
      }
    }
    el-col{
      height: 80px;
      border-radius:4px;
      display: block;
      box-shadow:0px 0px 0px rgba(22,22,22,0.08);
    }
    .co-info{
      height: 100px;
      display: flex;
      align-items: center;
      padding-top: 30px;
      .co-avatar{
        width: 123px;
        display: flex;
      }
      .co-title{
        color: #017DC4;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        width: 100%;
        margin-bottom: 10px;
      }
      .auth-0{
        padding: 5px 10px;
        background: #1888C8;
        color: #fff;
        border-radius: 12px;
      }
      .auth-3{
        color: #67C23A;
      }
      .auth-1{
        color: #FFBA00;
      }
      .auth-2{
        color: #FF0D0D;
      }
      img{
        width: 74px;
        height: 74px;
        border-radius: 50%;
        margin: auto;
      }
      .co-name{
        color: #B2B2B2;
        font-size: 14px;
        .info{
          color: #333;
        }
        .iconfont{
          font-size: 14px;
          span{
            padding-left: 5px;
          }
        }
      }
      .co-top{
        width: calc(100% - 123px);
        line-height: 2;
        padding-top: 40px;
      }
    }
    .top-img{
      width: 80px;
      height: 75px;
      margin-right: 26px;
    }
  }
  #canvas{width:200px!important;height:200px!important;}
</style>