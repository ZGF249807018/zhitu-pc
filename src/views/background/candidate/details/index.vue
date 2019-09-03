<template>
  <div class="item-container">
    <!--<div class="crumbs">-->
      <!--<div class="container-title"><Back></Back><span>候选人详情</span></div>-->
    <!--</div>-->
    <div class="add-table-box" id="pdfDom">
      <table class="box_table" >
        <tbody>
        <tr>
          <td class="t2 table-title" colspan=8><h3>基本信息</h3></td>
        </tr>
        <tr>
          <td class="t1">姓名</td>
          <td class="t2">{{ruleForm.name}}</td>
          <td class="t1">性别</td>
          <td class="t2">{{ruleForm.sex}}</td>
          <td class="t1">籍贯</td>
          <td class="t2">{{ruleForm.nativeAddress}}</td>
          <td class="t1">户籍性质</td>
          <td class="t2">{{ruleForm.nativeNature}}</td>
        </tr>
        <tr>
          <td class="t1">出生日期</td>
          <td class="t2">{{ruleForm.birthday}}</td>
          <td class="t1">婚姻状况</td>
          <td class="t2">{{ruleForm.maritalStatus}}</td>
          <td class="t1">政治面貌</td>
          <td class="t2">{{ruleForm.politicalStatus | politicalStatus}}</td>
          <td class="t1">最高学历</td>
          <td class="t2">{{ruleForm.highestEducation}}</td>
        </tr>
        <tr>
          <td class="t1">工作年限</td>
          <td class="t2">{{ruleForm.workingNum | workingNum}}</td>
          <td class="t1">应聘岗位</td>
          <td class="t2">{{ruleForm.position}}</td>
          <td class="t1">当前薪资</td>
          <td class="t2">{{ruleForm.currentSalary}}</td>
          <td class="t1">期望薪资</td>
          <td class="t2">{{ruleForm.expectedSalary}}</td>
        </tr>
        <tr>
          <td class="t1">手机号码</td>
          <td class="t2">{{ruleForm.mobile}}</td>
          <td class="t1">邮箱</td>
          <td class="t2">{{ruleForm.email}}</td>
          <td class="t1">身份证号</td>
          <td class="t2" colspan=3>{{ruleForm.idCard}}</td>
        </tr>
        <tr>
          <td class="t1">当前状态</td>
          <td class="t2">{{ruleForm.currentState | currentState}}</td>
          <td class="t1">到岗时间</td>
          <td class="t2">{{ruleForm.arrivalTime | moment}}</td>
          <td class="t1">现居地址</td>
          <td class="t2" colspan=3>{{ruleForm.currentAddress}}</td>
        </tr>
        </tbody>
      </table>
      <table class="box_table">
        <tr>
          <td class="t2 table-title" colspan=8><h3>紧急联系人</h3></td>
        </tr>
        <tr>
          <td class="t3">紧急联系人姓名</td>
          <td class="t3">{{ruleForm.contact}}</td>
          <td class="t3">联系方式</td>
          <td class="t3">{{ruleForm.contactMobile}}</td>
          <td class="t3">与本人关系</td>
          <td class="t3">{{ruleForm.relation}}</td>
        </tr>
      </table>
      <table class="box_table">
        <tr>
          <td class="t2 table-title" colspan=8><h3>教育/培训经历</h3></td>
        </tr>
        <tr>
          <td class="t4">学校/培训机构</td>
          <td class="t4">学历/培训证书</td>
          <td class="t4">专业</td>
          <td class="t4">开始时间</td>
          <td class="t4">结束时间</td>
        </tr>
        <tr v-for="(i, k) in ruleForm.educationInfoVOS" :key="k">
          <td class="t4">{{i.university}}</td>
          <td class="t4">{{i.degree}}</td>
          <td class="t4">{{i.major}}</td>
          <td class="t4">{{i.startTime | moment}}</td>
          <td class="t4">{{i.endTime | moment}}</td>
        </tr>
      </table>
      <table class="box_table">
        <tr>
          <td class="t2 table-title" colspan=8><h3>工作经历（从最近一份填起）</h3></td>
        </tr>
        <tr>
          <td class="t4">公司名称</td>
          <td class="t4">工作岗位</td>
          <td class="t4">在职时间</td>
          <td class="t4">离职原因</td>
          <td class="t4">证明人</td>
          <td class="t4">证明人关系</td>
          <td class="t4">证明人关电话</td>
        </tr>
        <tr v-for="(i, k) in ruleForm.workInfoVOS" :key="k">
          <td class="t4">{{i.company}}</td>
          <td class="t4">{{i.position}}</td>
          <td class="t4">{{i.startTime | moment }} - {{i.endTime | moment }}</td>
          <td class="t4">{{i.reason}}</td>
          <td class="t4">{{i.witness}}</td>
          <td class="t4">{{i.relation}}</td>
          <td class="t4">{{i.witnessMobile}}</td>
        </tr>
      </table>
      <div class="signature">
        <div class="content">
          <h3>本人声明</h3>
          <p>本人保证所填写的表格每一项内容真实，如因信息不完整、虚假信息等造成应聘失败、辞退等一切后果、本人自行承担。</p>
        </div>
        <div class="signature-bar">
          <span> 签名：<span class="info" v-if="ruleForm.signaturePicUrl"><img :src="imgDataUrl + ruleForm.signaturePicUrl" alt="签名" class="signatureImg"></span><span class="info" v-else></span></span>
          <span>日期：<span class="info">{{ruleForm.signatureTime | moment}}</span></span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Back from '@/components/Back/index'
  import { candidateDetail } from '@/api/order'
  import { mapGetters } from 'vuex'
  export default {
    name: 'back',
    props: ['indexId'],
    computed: {
      ...mapGetters([
        'tid',
        'uid',
        'tctype'
      ])
    },
    data() {
      return {
        imgDataUrl: process.env.IMG_API,
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
          'educationInfoVOS': [{ university: null, degree: '', major: null, startTime: null, endTime: null, certificateNum: null }],
          'workInfoVOS': [{ company: null, position: null, startTime: null, endTime: null, reason: null, witness: null, witnessMobile: null, relation: null }]
        }
      }
    },
    components: { Back },
    created() {
      this.id = this.$route.query.id || this.indexId
      candidateDetail(this.id).then((response) => {
        this.ruleForm = response.data
      }).catch(error => {
        this.$message.error(error.msg)
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @media print {
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
        margin-top: -1px;
        td {
          font-size: 14px;
          text-align: center;
          height: 38px;
          border: 1px solid #dddddd;
          em{
            padding-right: 6px;
          }
        }

        .t1{
          color: #333333;
          width: 11%;
          height: 25px;
          font-size: 14px;
        }
        .table-title{
          background: rgba(250,250,250,1);
        }
        .t2{
          width: 13%;
        }
        .t3{
          width: 17%;
        }
        .t4{
          width: 13%;
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
      .signature{
        padding: 20px;
        border: 1px solid #dddddd;
        margin-top: -1px;
        .content{
          h3{
            text-align: center;
            line-height: 40px;
          }
          p{
            line-height: 35px;
            text-indent: 12px;
          }
        }
        .signature-bar{
          display: flex;
          justify-content: flex-end;
          .info{
            border-bottom: 1px solid #333;
            width: 100px;
            height: 25px;
            display: inline-block;
            margin: 0 15px;
          }
        }
      }
    }
  }
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
      margin-top: -1px;
      td {
        font-size: 14px;
        text-align: center;
        height: 38px;
        border: 1px solid #dddddd;
        em{
          padding-right: 6px;
        }
      }
      .signatureImg{
        width: 100px;
        height: 30px;
      }
      .t1{
        color: #333333;
        width: 11%;
        height: 25px;
        font-size: 14px;
      }
      .table-title{
        background: rgba(250,250,250,1);
      }
      .t2{
        width: 13%;
      }
      .t3{
        width: 17%;
      }
      .t4{
        width: 13%;
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
    .signature{
      padding: 20px;
      border: 1px solid #dddddd;
      margin-top: -1px;
      .content{
        h3{
          text-align: center;
          line-height: 40px;
        }
        p{
          line-height: 35px;
          text-indent: 12px;
        }
      }
      .signature-bar{
        display: flex;
        justify-content: flex-end;
        .info{
          border-bottom: 1px solid #333;
          width: 100px;
          height: 25px;
          display: inline-block;
          margin: 0 15px;
        }
      }
    }
  }

</style>
