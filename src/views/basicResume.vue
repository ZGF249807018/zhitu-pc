<template>
  <div class="resume-container">
    <div v-show="!showMore">
      <div class="title">
        <dl>
          <dt><h1 class="content-title"><i class="icon"></i>{{u_company}}</h1></dt>
          <dd><h1 class="content-title">应聘资料表</h1></dd>
        </dl>
        <p class="tip1">面试登记表填写是公司招聘的正常流程，为了提高双方沟通效率，请如实填写。</p>
        <p class="tip2" ><i class="icon iconfont icon-tongzhi1"></i>特别提示：如此公司未与您进行过求职招聘沟通，请忽略！</p>
      </div>
      <el-form :model="ruleForm" :rules="formRules" ref="ruleForm">
        <div class="box">
          <h1 class="content-title">基本信息</h1>
          <div class="form-list">
            <div class="auth-form">
              <el-form-item label="姓名：" prop="name" >
                <el-input class="auth-input" placeholder="请输入您的姓名" v-model="ruleForm.name" ></el-input>
              </el-form-item>
              <el-form-item label="身份证号：" prop="idCard">
                <el-input class="auth-input" placeholder="请输入身份证号" v-model="ruleForm.idCard"></el-input>
              </el-form-item>
              <el-form-item label="手机号码：" prop="mobile">
                <el-input class="auth-input" placeholder="请输入您的手机号码" v-model="ruleForm.mobile"  maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="短信验证码：" prop="idCard">
                <el-input class="auth-input" placeholder="请输入短信验证码" v-model="ruleForm.idCard"></el-input>
                <captcha :captchaInfo="codeType" :captchaType="'phone'" :sendCode="ruleForm.mobile"></captcha>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box" v-if="showMore">
          <h1 class="content-title">身份信息</h1>
          <div class="form-list">
            <div class="auth-form">
              <el-form-item label="邮箱地址：" prop="email">
                <el-input class="auth-input" placeholder="请填写邮箱地址" v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="面试岗位：" prop="position">
                <el-input class="auth-input" placeholder="请输入面试岗位" v-model="ruleForm.position"  maxlength="15"></el-input>
              </el-form-item>
              <el-form-item label="当前薪资（元）" prop="currentSalary">
                <el-input class="auth-input" placeholder="请填写当前薪资" v-model="ruleForm.currentSalary" type="number"></el-input>
              </el-form-item>
              <el-form-item label="期望薪资（元）" prop="expectedSalary">
                <el-input class="auth-input" placeholder="请填写期望薪资" v-model="ruleForm.expectedSalary"></el-input>
              </el-form-item>
              <el-form-item label="最快到岗时间" prop="arrivalTime">
                <el-date-picker
                  v-model="ruleForm.arrivalTime"
                  @change="chooseTimeRange"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerBeginDateBefore"
                  type="date"
                  placeholder="请选择最快到岗时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="出生年月" prop="birthday">
                <el-date-picker
                  v-model="ruleForm.birthday"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerBeginDateAfter"
                  type="date"
                  placeholder="请选择出生年月">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="婚姻状况" prop="maritalStatus">
                <el-select v-model="ruleForm.maritalStatus" placeholder="请选择婚姻状况" class="handle-select">
                  <el-option
                    v-for="item in maritalOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌" prop="politicalStatus">
                <el-select v-model="ruleForm.politicalStatus" placeholder="请选择婚姻状况" class="handle-select">
                  <el-option
                    v-for="item in politicalOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高学历" prop="highestEducation">
                <el-select v-model="ruleForm.highestEducation" placeholder="请填写最高学历" class="handle-select">
                  <el-option
                    v-for="item in highestOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="户籍地址" prop="nativeAddress">
                <el-input class="auth-input" placeholder="请填写户籍地址" v-model="ruleForm.nativeAddress"></el-input>
              </el-form-item>
              <el-form-item label="现居住地" prop="currentAddress">
                <el-input class="auth-input" placeholder="请填写现居住地" v-model="ruleForm.currentAddress"></el-input>
              </el-form-item>
              <el-form-item label="户籍性质" prop="nativeNature">
                <el-radio-group v-model="ruleForm.nativeNature">
                  <ul class="radio">
                    <li><el-radio :label="1">本地城镇</el-radio></li>
                    <li><el-radio :label="2">外地城镇（省内）</el-radio></li>
                    <li><el-radio :label="3">外地城镇（省外）</el-radio></li>
                    <li><el-radio :label="4">本地农村</el-radio></li>
                    <li><el-radio :label="5">外地农村（省内）</el-radio></li>
                    <li><el-radio :label="6">外地农村（省外）</el-radio></li>
                  </ul>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="当前状态" prop="currentState">
                <el-radio-group v-model="ruleForm.currentState">
                  <ul class="radio">
                    <li><el-radio :label="1">应届毕业生</el-radio></li>
                    <li><el-radio :label="2">已离职</el-radio></li>
                    <li><el-radio :label="3">在职</el-radio></li>
                    <li><el-radio :label="4">其他</el-radio></li>
                  </ul>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="紧急联系人姓名" prop="contact">
                <el-input class="auth-input" placeholder="请填写紧急联系人姓名" v-model="ruleForm.contact"></el-input>
              </el-form-item>
              <el-form-item label="紧急联系人手机号码" prop="contactMobile">
                <el-input class="auth-input" placeholder="请填写紧急联系人手机号码" v-model="ruleForm.contactMobile"></el-input>
              </el-form-item>
              <el-form-item label="紧急联系人与本人关系" prop="relation">
                <el-input class="auth-input" placeholder="请填写紧急联系人与本人关系" v-model="ruleForm.relation"></el-input>
              </el-form-item>
              <el-form-item label="是否接受背景调查" prop="isAccepted">
                <el-radio-group v-model="ruleForm.isAccepted">
                  <ul class="radio">
                    <li><el-radio :label="1">同意背调</el-radio></li>
                    <li><el-radio :label="0">拒绝背调</el-radio></li>
                  </ul>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box" v-if="showMore">
          <h1 class="content-title">教育经历</h1>
          <div class="form-list">
            <div class="auth-form">
              <div class="moreRules">
                <div class="moreList" v-for="(item, index) in ruleForm.educationParamsList" :key="item.key">
                  <el-form-item class="rules" label="学校名称:" :prop="'educationParamsList.' + index +'.university'" :rules="formRules.university">
                    <el-input v-model="item.university" placeholder="请输入学校名称"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="学历:" :prop="'educationParamsList.'+ index +'.degree'" :rules="formRules.degree">
                    <el-input v-model="item.degree" placeholder="请输入学历"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="专业:" :prop="'educationParamsList.'+ index +'.major'" :rules="formRules.major">
                    <el-input v-model="item.major" placeholder="请输入专业"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="入学时间:" :prop="'educationParamsList.'+ index +'.startTime'" :rules="formRules.startTime">
                    <el-date-picker
                      value-format="yyyy-MM"
                      @change="chooseTimeRange1"
                      v-model="item.startTime"
                      type="month"
                      placeholder="">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="rules" label="毕业时间:" :prop="'educationParamsList.'+ index +'.endTime'" :rules="formRules.endTime">
                    <el-date-picker
                      value-format="yyyy-MM"
                      @change="chooseTimeRange2"
                      v-model="item.endTime"
                      type="month"
                      placeholder="">
                    </el-date-picker>
                  </el-form-item>
                  <el-button type="danger" @click="deleteBtn(item, index, 'edu')"  v-show="showDelete.edu && index !== 0 " class="el-icon-delete">&nbsp;删除本条记录</el-button>
                </div>
              </div>
              <el-form-item >
                <el-button type="primary" class="addItem" @click="addItems('edu')" v-show="this.addNum.edu < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加教育经历</el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box" v-if="showMore">
          <h1 class="content-title">工作经历</h1>
          <div class="form-list">
            <div class="auth-form">
              <div class="moreRules">
                <div class="moreList" v-for="(item, index) in ruleForm.workParamsList" :key="item.key">
                  <el-form-item class="rules" label="公司名称:" :prop="'workParamsList.' + index +'.company'" :rules="formRules.company">
                    <el-input v-model="item.company" placeholder="请输入公司名称"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="入职时间:" :prop="'workParamsList.'+ index +'.startTime'" :rules="formRules.startTime">
                    <el-date-picker
                      value-format="yyyy-MM"
                      @change="chooseTimeRange1"
                      v-model="item.startTime"
                      type="month"
                      placeholder="请选择入职时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="rules" label="离职时间:" :prop="'workParamsList.'+ index +'.endTime'" :rules="formRules.endTime">
                    <el-date-picker
                      value-format="yyyy-MM"
                      @change="chooseTimeRange2"
                      v-model="item.endTime"
                      type="month"
                      placeholder="请选择入离职时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="rules" label="薪资（元）:" :prop="'workParamsList.'+ index +'.salary'" :rules="formRules.salary">
                    <el-input v-model="item.salary" placeholder="请输入薪资"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="离职原因:" :prop="'workParamsList.'+ index +'.reason'" :rules="formRules.reason">
                    <el-input v-model="item.reason" placeholder="请输入离职原因"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="证明人姓名:" :prop="'workParamsList.'+ index +'.witness'" :rules="formRules.witness">
                    <el-input v-model="item.witness" placeholder="请输入证明人姓名"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="证明人电话:" :prop="'workParamsList.'+ index +'.witnessMobile'" :rules="formRules.witnessMobile">
                    <el-input v-model="item.witnessMobile" placeholder="请输入证明人电话"></el-input>
                  </el-form-item>
                  <el-button type="danger" @click="deleteBtn(item, index, 'work')" v-show="showDelete.work && index !== 0 " class="el-icon-delete">&nbsp;删除本条记录</el-button>
                </div>
              </div>
              <el-form-item >
                <el-button type="primary" class="addItem" @click="addItems('work')" v-show="this.addNum.work < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加工作经历</el-button>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="box" v-if="showMore">
          <h1 class="content-title">家庭信息</h1>
          <div class="form-list">

            <div class="auth-form">
              <div class="moreRules">
                <div class="moreList" v-for="(item, index) in ruleForm.familyParamsList" :key="item.key">
                  <el-form-item class="rules" label="姓名:" :prop="'familyParamsList.' + index +'.name'" :rules="formRulesOther.name">
                    <el-input v-model="item.name" placeholder="请输入成员姓名"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="手机号码:" :prop="'familyParamsList.'+ index +'.mobile'" :rules="formRulesOther.mobile">
                    <el-input v-model="item.mobile" placeholder="请输入成员手机号码"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="与本人关系:" :prop="'familyParamsList.'+ index +'.relation'" :rules="formRules.relation">
                    <el-input v-model="item.relation" placeholder="请输入成员与本人关系"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="工作单位" :prop="'familyParamsList.'+ index +'.company'" :rules="formRulesOther.company">
                    <el-input v-model="item.company" placeholder="请输入成员工作单位"></el-input>
                  </el-form-item>
                  <el-form-item class="rules" label="职务:" :prop="'familyParamsList.'+ index +'.position'" :rules="formRulesOther.position">
                    <el-input v-model="item.position" placeholder="请输入成员职务"></el-input>
                  </el-form-item>
                  <el-button type="danger" @click="deleteBtn(item, index, 'family')" v-show="showDelete.family && index !== 0 " class="el-icon-delete">&nbsp;删除本条记录</el-button>
                </div>
              </div>
              <el-form-item >
                <el-button type="primary" class="addItem" @click="addItems('family')" v-show="this.addNum.family < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加家庭信息</el-button>
              </el-form-item>
            </div>

          </div>
        </div>
      </el-form>
      <div class="bottom">
        <div class="buttons">
          <el-button type="primary" :loading="loading" @click.native.prevent="next"  class="submit-send">下一步</el-button>
        </div>
      </div>
    </div>

    <div v-show="showMore">
      <div class="box" >
        <h1 class="content-title">身份信息</h1>
        <div class="form-list">
          <div class="auth-form">
            <el-form-item label="邮箱地址：" prop="email">
              <el-input class="auth-input" placeholder="请填写邮箱地址" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="面试岗位：" prop="position">
              <el-input class="auth-input" placeholder="请输入面试岗位" v-model="ruleForm.position"  maxlength="15"></el-input>
            </el-form-item>
            <el-form-item label="当前薪资（元）" prop="currentSalary">
              <el-input class="auth-input" placeholder="请填写当前薪资" v-model="ruleForm.currentSalary" type="number"></el-input>
            </el-form-item>
            <el-form-item label="期望薪资（元）" prop="expectedSalary">
              <el-input class="auth-input" placeholder="请填写期望薪资" v-model="ruleForm.expectedSalary"></el-input>
            </el-form-item>
            <el-form-item label="最快到岗时间" prop="arrivalTime">
              <el-date-picker
                v-model="ruleForm.arrivalTime"
                @change="chooseTimeRange"
                value-format="yyyy-MM-dd"
                :picker-options="pickerBeginDateBefore"
                type="date"
                placeholder="请选择最快到岗时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="出生年月" prop="birthday">
              <el-date-picker
                v-model="ruleForm.birthday"
                value-format="yyyy-MM-dd"
                :picker-options="pickerBeginDateAfter"
                type="date"
                placeholder="请选择出生年月">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="ruleForm.maritalStatus" placeholder="请选择婚姻状况" class="handle-select">
                <el-option
                  v-for="item in maritalOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌" prop="politicalStatus">
              <el-select v-model="ruleForm.politicalStatus" placeholder="请选择婚姻状况" class="handle-select">
                <el-option
                  v-for="item in politicalOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最高学历" prop="highestEducation">
              <el-select v-model="ruleForm.highestEducation" placeholder="请填写最高学历" class="handle-select">
                <el-option
                  v-for="item in highestOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户籍地址" prop="nativeAddress">
              <el-input class="auth-input" placeholder="请填写户籍地址" v-model="ruleForm.nativeAddress"></el-input>
            </el-form-item>
            <el-form-item label="现居住地" prop="currentAddress">
              <el-input class="auth-input" placeholder="请填写现居住地" v-model="ruleForm.currentAddress"></el-input>
            </el-form-item>
            <el-form-item label="户籍性质" prop="nativeNature">
              <el-radio-group v-model="ruleForm.nativeNature">
                <ul class="radio">
                  <li><el-radio :label="1">本地城镇</el-radio></li>
                  <li><el-radio :label="2">外地城镇（省内）</el-radio></li>
                  <li><el-radio :label="3">外地城镇（省外）</el-radio></li>
                  <li><el-radio :label="4">本地农村</el-radio></li>
                  <li><el-radio :label="5">外地农村（省内）</el-radio></li>
                  <li><el-radio :label="6">外地农村（省外）</el-radio></li>
                </ul>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="当前状态" prop="currentState">
              <el-radio-group v-model="ruleForm.currentState">
                <ul class="radio">
                  <li><el-radio :label="1">应届毕业生</el-radio></li>
                  <li><el-radio :label="2">已离职</el-radio></li>
                  <li><el-radio :label="3">在职</el-radio></li>
                  <li><el-radio :label="4">其他</el-radio></li>
                </ul>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="紧急联系人姓名" prop="contact">
              <el-input class="auth-input" placeholder="请填写紧急联系人姓名" v-model="ruleForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人手机号码" prop="contactMobile">
              <el-input class="auth-input" placeholder="请填写紧急联系人手机号码" v-model="ruleForm.contactMobile"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人与本人关系" prop="relation">
              <el-input class="auth-input" placeholder="请填写紧急联系人与本人关系" v-model="ruleForm.relation"></el-input>
            </el-form-item>
            <el-form-item label="是否接受背景调查" prop="isAccepted">
              <el-radio-group v-model="ruleForm.isAccepted">
                <ul class="radio">
                  <li><el-radio :label="1">同意背调</el-radio></li>
                  <li><el-radio :label="0">拒绝背调</el-radio></li>
                </ul>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="box" >
        <h1 class="content-title">教育经历</h1>
        <div class="form-list">
          <div class="auth-form">
            <div class="moreRules">
              <div class="moreList" v-for="(item, index) in ruleForm.educationParamsList" :key="item.key">
                <el-form-item class="rules" label="学校名称:" :prop="'educationParamsList.' + index +'.university'" :rules="formRules.university">
                  <el-input v-model="item.university" placeholder="请输入学校名称"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="学历:" :prop="'educationParamsList.'+ index +'.degree'" :rules="formRules.degree">
                  <el-input v-model="item.degree" placeholder="请输入学历"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="专业:" :prop="'educationParamsList.'+ index +'.major'" :rules="formRules.major">
                  <el-input v-model="item.major" placeholder="请输入专业"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="入学时间:" :prop="'educationParamsList.'+ index +'.startTime'" :rules="formRules.startTime">
                  <el-date-picker
                    value-format="yyyy-MM"
                    @change="chooseTimeRange1"
                    v-model="item.startTime"
                    type="month"
                    placeholder="">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="rules" label="毕业时间:" :prop="'educationParamsList.'+ index +'.endTime'" :rules="formRules.endTime">
                  <el-date-picker
                    value-format="yyyy-MM"
                    @change="chooseTimeRange2"
                    v-model="item.endTime"
                    type="month"
                    placeholder="">
                  </el-date-picker>
                </el-form-item>
                <el-button type="danger" @click="deleteBtn(item, index, 'edu')"  v-show="showDelete.edu && index !== 0 " class="el-icon-delete">&nbsp;删除本条记录</el-button>
              </div>
            </div>
            <el-form-item >
              <el-button type="primary" class="addItem" @click="addItems('edu')" v-show="this.addNum.edu < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加教育经历</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="box" >
        <h1 class="content-title">工作经历</h1>
        <div class="form-list">
          <div class="auth-form">
            <div class="moreRules">
              <div class="moreList" v-for="(item, index) in ruleForm.workParamsList" :key="item.key">
                <el-form-item class="rules" label="公司名称:" :prop="'workParamsList.' + index +'.company'" :rules="formRules.company">
                  <el-input v-model="item.company" placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="入职时间:" :prop="'workParamsList.'+ index +'.startTime'" :rules="formRules.startTime">
                  <el-date-picker
                    value-format="yyyy-MM"
                    @change="chooseTimeRange1"
                    v-model="item.startTime"
                    type="month"
                    placeholder="请选择入职时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="rules" label="离职时间:" :prop="'workParamsList.'+ index +'.endTime'" :rules="formRules.endTime">
                  <el-date-picker
                    value-format="yyyy-MM"
                    @change="chooseTimeRange2"
                    v-model="item.endTime"
                    type="month"
                    placeholder="请选择入离职时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item class="rules" label="薪资（元）:" :prop="'workParamsList.'+ index +'.salary'" :rules="formRules.salary">
                  <el-input v-model="item.salary" placeholder="请输入薪资"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="离职原因:" :prop="'workParamsList.'+ index +'.reason'" :rules="formRules.reason">
                  <el-input v-model="item.reason" placeholder="请输入离职原因"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="证明人姓名:" :prop="'workParamsList.'+ index +'.witness'" :rules="formRules.witness">
                  <el-input v-model="item.witness" placeholder="请输入证明人姓名"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="证明人电话:" :prop="'workParamsList.'+ index +'.witnessMobile'" :rules="formRules.witnessMobile">
                  <el-input v-model="item.witnessMobile" placeholder="请输入证明人电话"></el-input>
                </el-form-item>
                <el-button type="danger" @click="deleteBtn(item, index, 'work')" v-show="showDelete.work && index !== 0 " class="el-icon-delete">&nbsp;删除本条记录</el-button>
              </div>
            </div>
            <el-form-item >
              <el-button type="primary" class="addItem" @click="addItems('work')" v-show="this.addNum.work < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加工作经历</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="box" >
        <h1 class="content-title">家庭信息</h1>
        <div class="form-list">

          <div class="auth-form">
            <div class="moreRules">
              <div class="moreList" v-for="(item, index) in ruleForm.familyParamsList" :key="item.key">
                <el-form-item class="rules" label="姓名:" :prop="'familyParamsList.' + index +'.name'" :rules="formRulesOther.name">
                  <el-input v-model="item.name" placeholder="请输入成员姓名"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="手机号码:" :prop="'familyParamsList.'+ index +'.mobile'" :rules="formRulesOther.mobile">
                  <el-input v-model="item.mobile" placeholder="请输入成员手机号码"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="与本人关系:" :prop="'familyParamsList.'+ index +'.relation'" :rules="formRules.relation">
                  <el-input v-model="item.relation" placeholder="请输入成员与本人关系"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="工作单位" :prop="'familyParamsList.'+ index +'.company'" :rules="formRulesOther.company">
                  <el-input v-model="item.company" placeholder="请输入成员工作单位"></el-input>
                </el-form-item>
                <el-form-item class="rules" label="职务:" :prop="'familyParamsList.'+ index +'.position'" :rules="formRulesOther.position">
                  <el-input v-model="item.position" placeholder="请输入成员职务"></el-input>
                </el-form-item>
                <el-button type="danger" @click="deleteBtn(item, index, 'family')" v-show="showDelete.family && index !== 0 " class="el-icon-delete">&nbsp;删除本条记录</el-button>
              </div>
            </div>
            <el-form-item >
              <el-button type="primary" class="addItem" @click="addItems('family')" v-show="this.addNum.family < 2 "><i class="iconfont icon-tianjialianxiren"></i>增加家庭信息</el-button>
            </el-form-item>
          </div>

        </div>
      </div>
      <div class="bottom" >
        <div class="greement">
          <el-checkbox v-model="checked">我已阅读并同意<router-link to="/agreement" class="link" target="_blank">《职兔背调协议》</router-link></el-checkbox>
        </div>
        <div class="buttons">
          <!--<el-button type="primary" @click.native.prevent="back"  class="send-btn">返回</el-button>-->
          <el-button type="primary" :loading="loading" @click.native.prevent="submitSendForm"  class="submit-send">提交</el-button>
        </div>
      </div>
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
  import Qs from 'qs'
  import { checkInputCode, checkInputPhone, checkInputID, checkTime, checkMoney, checkMoney2, checkInputPhone2, checkInputPhone3 } from '@/utils/check/index'
  import { interviewSubmit } from '@/api/resumeForm'
  import { validateCandidateNo } from '@/api/order'
  import Captcha from '@/components/Captcha/index'
  export default {
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
        codeType: {
          codeType: 'code_notice'
        },
        showMore: false,
        sxyInfo: { start: '', end: '' },
        pickerOptionsStart: {
          disabledDate: time => {
            const endDateVal = this.sxyInfo.end
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime()
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            const beginDateVal = this.sxyInfo.start
            if (beginDateVal) {
              return (time.getTime() < new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              )
            }
          }

        },
        pickerBeginDateBefore: { disabledDate(time) { return time.getTime() < Date.now() - 8.64e7 } },
        pickerBeginDateAfter: { disabledDate(time) { return time.getTime() > Date.now() - 8.64e7 } },
        showDelete: { edu: false, work: false, family: false },
        type: '',
        timeType: { edu: '', work: '', family: '' },
        addNum: { edu: 0, work: 0, family: 0 },
        deleteType: '',
        thisTime: '',
        checked: false,
        loading: false,
        show: false,
        showAdd: false,
        delVisible: false,
        idx: -1,
        c_id: '',
        t_id: '',
        u_id: '',
        u_company: '',
        u_name: '',
        ruleForm: {
          candidateNo: null,
          tenantId: null,
          userId: null,
          name: '',
          mobile: '',
          email: '',
          idCard: '',
          position: '',
          isAccepted: 1,
          currentSalary: '',
          expectedSalary: '',
          arrivalTime: '',
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
          educationParamsList: [{ university: '', degree: '', major: '', startTime: '', endTime: '' }],
          workParamsList: [{ company: '', startTime: '', endTime: '', salary: '', witness: '', witnessMobile: '', reason: '' }],
          familyParamsList: [{ name: null, mobile: null, relation: null, company: null, position: null }]
        },
        maritalOptions: [{ value: '未婚', label: '未婚' }, { value: '已婚', label: '已婚' }],
        politicalOptions: [{ value: '群众', label: '群众' }, { value: '团员', label: '团员' }, { value: '党员', label: '党员' }],
        highestOptions: [{ value: '小学', label: '小学' }, { value: '初中', label: '初中' }, { value: '高中', label: '高中' }, { value: '大专', label: '大专' }, { value: '本科', label: '本科' }, { value: '研究生', label: '研究生' }, { value: '博士', label: '博士' }],
        onTime: '',
        radio2: 1,
        formRulesOther: {
          name: [{ required: false, validator: Code, trigger: 'blur' }],
          mobile: [{ required: false, validator: validatePhone2, trigger: 'blur' }],
          company: [{ required: false, validator: Code, trigger: 'blur' }],
          position: [{ required: false, validator: Code, trigger: 'blur' }]
        },
        formRules: {
          email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
          idCard: [{ required: true, trigger: 'blur', validator: validateId }],
          currentSalary: [{ required: true, message: '请填写当前薪资', trigger: 'blur' }, { validator: validateMoney, trigger: 'blur' }],
          expectedSalary: [{ required: false, validator: validateMoney2, trigger: 'blur' }],
          nativeAddress: [{ required: false, validator: Code, trigger: 'blur' }],
          currentAddress: [{ required: false, validator: Code, trigger: 'blur' }],
          contact: [{ required: false, validator: Code, trigger: 'blur' }],
          contactMobile: [{ required: false, validator: validatePhone2, trigger: 'blur' }],
          university: [{ required: true, message: '请输入学校名称', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          degree: [{ required: true, message: '请输入您的学历', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          major: [{ required: true, message: '请填写专业', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          startTime: [{ required: true, message: '请选择时间', trigger: 'change' }, { validator: validateTime, trigger: 'change' }],
          endTime: [{ required: true, message: '请选择时间', trigger: 'change' }, { validator: validateTime, trigger: 'change' }],
          salary: [{ required: true, message: '请输入薪资', trigger: 'blur' }, { validator: validateMoney, trigger: 'blur' }],
          witness: [{ required: true, message: '请输入证明人姓名', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          witnessMobile: [{ required: true, message: '请输入证明人电话', trigger: 'blur' }, { validator: validatePhone3, trigger: 'blur' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: validatePhone, trigger: 'blur' }],
          relation: [{ required: false, validator: Code, trigger: 'blur' }],
          reason: [{ required: true, message: '请输入离职原因', trigger: 'blur' }, { validator: Code, trigger: 'blur' }],
          company: [{ required: true, message: '请输入单位名称' }, { validator: Code, trigger: 'blur' }],
          position: [{ required: true, message: '请输入岗位', trigger: 'blur' }, { validator: Code, trigger: 'blur' }]

          // arrivalTime: [{ required: true, message: '请输入到岗时间', trigger: 'change' }],
          // birthday: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
          // maritalStatus: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
          // politicalStatus: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
          // highestEducation: [{ required: true, message: '请选择最高学历', trigger: 'change' }],
          // nativeNature: [{ required: true, message: '请选择户籍性质', trigger: 'change' }],
          // currentState: [{ required: true, message: '请选择当前状态', trigger: 'change' }],
        }
      }
    },
    components: { Captcha },
    created() {
      const query = Qs.parse(location.hash.substring(9))
      const tid = query.tenantId
      const uid = query.userId
      const cid = query.candidateNo
      const company = query.company
      const name = query.name
      this.c_id = cid
      this.u_id = uid
      this.t_id = tid
      this.u_company = company
      this.u_name = name
      // if (tid && uid && cid) {
      //   validateCandidateNo(cid).then((res) => {
      //     console.log(res)
      //     if (res.data) {
      //       this.$router.push({ path: '/wrote' })
      //     }
      //   }).catch(error => {
      //     this.$message.error(error.msg)
      //   })
      // } else {
      //   this.$router.push({ path: '/404' })
      // }
    },
    methods: {
      next() {
        this.showMore = true
      },
      chooseTimeRange1(e) {
        this.sxyInfo.start = e
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
              this.ruleForm.educationParamsList.splice(this.idx, 1)
              this.addNum.edu --
              break
            case 'work' :
              this.ruleForm.workParamsList.splice(this.idx, 1)
              this.addNum.work --
              break
            case 'family' :
              this.ruleForm.familyParamsList.splice(this.idx, 1)
              this.addNum.family --
              break
          }
          this.delVisible = false
        }
      },
      addItems(type) {
        switch (type) {
          case 'edu' :
            this.ruleForm.educationParamsList.push({ university: '', degree: '', major: '', startTime: '', endTime: '' })
            this.showDelete[type] = true
            this.addNum.edu ++
            console.log(this.addNum.edu)
            break
          case 'work' :
            this.ruleForm.workParamsList.push({ company: '', startTime: '', endTime: '', salary: '', witness: '', witnessMobile: '' })
            this.showDelete[type] = true
            this.addNum.work ++
            console.log(this.addNum.work)
            break
          case 'family' :
            this.ruleForm.familyParamsList.push({ name: null, mobile: null, relation: null, company: null, position: null })
            this.showDelete[type] = true
            this.addNum.family ++
            console.log(this.addNum.family)
            break
        }
      },
      submitSendForm() {
        console.log(this.ruleForm)
        if (this.checked === false) {
          this.$message.warning('同意协议才能提交哦')
        } else {
          this.$refs.ruleForm.validate(valid => {
            console.log(valid)
            if (valid) {
              this.ruleForm.tenantId = this.t_id
              this.ruleForm.candidateNo = this.c_id
              this.ruleForm.userId = this.u_id
              interviewSubmit(this.ruleForm).then(() => {
                this.loading = false
                this.$message.success('提交成功')
              }).catch(error => {
                this.$message.error(error.msg)
                this.loading = false
              })
            }
          })
        }
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
    color: #fff;
    font-weight: normal;
    font-size: 24px;
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
  .el-icon-delete{
    margin-left: 200px;
  }
  .box{
    margin: 0 auto 14px auto;
    background: #fff;
    box-shadow:0px 0px 6px rgba(35,102,253,0.2);
  }
  .auth-form{
    width:800px;
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
    height: 40px;
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
    margin-top: 30px;
    width: 300px;
  }
  .resume-container{
    width: 1200px;
    margin: 60px auto;
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
