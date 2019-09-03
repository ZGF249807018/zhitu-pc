<template>
    <div class="container">
      <h1 class="agreement-h1">特别提示：</h1>
      <p class="agreement-p">为了保障您的合法权益，请认真阅读并遵守本授权书的全部内容，如您不接受授权协议的任何条款，请立即停止授权。</p>
      <p class="agreement-p">授权人
        <span class="agreement-message">{{ name || logoList.name }}</span> ;
      </p>
      <p class="agreement-p">身份证号
        <span class="agreement-message">{{ idCard || logoList.idCard  }}</span>；
      </p>
      <p class="agreement-p">拟向
        <span class="agreement-message">{{ company || logoList.company  }}</span> 公司（如下简称公司）申请入职。根据该公司的入职流程，需对本人进行个人信息核实，本人自愿做出如下授权并已经充分理解其含义：
      </p>
      <h4 class="agreement-p">第一条：授权内容</h4>
      <p>（一）本人同意授权该公司通过互联网数据服务公司、合法征信机构、政府机构、杭州数脉科技有限公司、前雇主公司等（以下统称“第三方”）查询本人简历相关信息，包括但不限于身份信息、学历学籍、资格证书、在外投资任职、疑似违法犯罪记录信息、手机实名认证、社保公积金、个税信息 、工作经历、金融征信（以下简称“个人相关信息”）等。</p>
      <p>（二）本人授权公司及第三方通过合法渠道对本次入职所需信息进行查询、保存、整理、加工并出具简历职业背调报告。</p>
      <p>（三）本人已确保所提供的个人资料真实完整，如因资料不实、夸大、造假导致招聘流程终止、解雇等，个人将承担完全责任，公司及合作第三方不承担任何责任。 授权日期为签订本授权协议至公司核查完成止。</p>      
      <h4 class="agreement-p">第二条：保密条款</h4>
      <p>（一）入职背调属于本公司的正常入职流程，公司及合作第三方对候选人的信息查询、整理、加工等仅用于该入职审核流程，不能用于除此之外的任何其他场景，公司对候选人个人隐私将会严格遵守保密义务。</p>
      <p>（二）公司、公司合作第三方基于候选人入职背景审核的过程中，所交互的信息（包括但不限于短信、邮件、账号、个人信 息、公司相关信息及资料）需严格保密。</p>
    </div>
</template>

<script>
    export default {
      name: "credit",
      data() {
        return {
          logoList: {},
          company: "",
          idCard: "",
          name: ""
        };
      },
      mounted() {
        const {
          company,
          idCard,
          name,
        } = this.$route.query;
        console.log(this.$route.query)
        if ( company && idCard && name ){
          this.company = company
          this.idCard = idCard
          this.name = name
        }else {
          console.log(111)
          let logoList = sessionStorage.getItem("logoList");
          let company = sessionStorage.getItem("company");
          this.company = company.slice(1,company.length-1)
          this.logoList = JSON.parse(logoList);
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.container{
  .agreement-h1{
    text-align: center;
  }
  .agreement-p{
    padding-top: 10px;
  }
  .agreement-message{
    display: inline-block;
    min-width: 100px;
    border-bottom: 1px solid #333!important;
  }
}
</style>
