// 企业基本信息填写
<template>
    <div class="planDetail informMain boxShadow boxSizing">
        <el-form :model="companylist" status-icon :rules="rules" ref="ruleForm" class="boxSzing" inline-message>
            <!-- 公司信息 -->
            <div class="companyInformation">
                <div class="titleName boxSizing">
                    <i class="el-icon-arrow-down"></i>
                    <span>公司信息</span>
                </div>
                <div class="companyForm">
                    <el-form-item label="单位名称:" prop="name" class="lineOne">
                        <el-input v-model="companylist.name" placeholder="请输入单位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="单位注册地址:" prop="value">
                        <div class="block">
                            <el-cascader v-model="companylist.value" :options="options"  ></el-cascader>
                        </div>
                    </el-form-item>
                    <el-form-item label="详细地址:" prop="detailedAddress">
                        <el-input type="text" v-model="companylist.detailedAddress" placeholder="请输入单位详细地址"></el-input>
                    </el-form-item>
                    <el-form-item label="生产设施地址:" prop="address">
                        <el-input type="text" v-model="companylist.address" placeholder="请输入生产设施地址"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编:" prop="postCode">
                        <el-input type="text" v-model="companylist.postCode" placeholder="请输入邮编"></el-input>
                    </el-form-item>
                </div>
                <div class="dividingLine"></div>
                <div class="companyForm">
                    <el-form-item label="法定代表人：" prop="legal">
                        <el-input v-model="companylist.legal" placeholder="请输入法定代表人"></el-input>
                    </el-form-item>
                    <el-form-item label="行业类别与代码：" prop="categoryName">
                        <el-input type="text" v-model="companylist.categoryName" placeholder="请输入行业类别与代码·"></el-input>
                    </el-form-item>
                    <el-form-item label="总投资：" prop="totalInvestment">
                        <el-input type="number" v-model="companylist.totalInvestment"></el-input>
                        <span class="biaozhu">万元</span>
                    </el-form-item>
                    <el-form-item label="总产值：" prop="totalOutputValue">
                        <el-input type="text" v-model="companylist.totalOutputValue"></el-input>
                        <span class="biaozhu">万元</span>
                    </el-form-item>
                    <el-form-item label="占地面积：" prop="areaCovered">
                        <el-input type="text" v-model="companylist.areaCovered" placeholder="请输入邮编"></el-input>
                        <span class="biaozhu">亩</span>
                    </el-form-item>
                    <el-form-item label="职工人数：" prop="numOfEmps">
                        <el-input type="number" v-model="companylist.numOfEmps"></el-input>
                        <span class="biaozhu">人</span>
                    </el-form-item>
                    <el-form-item label="环保部门负责人：" prop="headOfEpd">
                        <el-input type="number" v-model="companylist.headOfEpd" placeholder="请输入环保部门负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：" prop="contacts">
                        <el-input type="text" v-model="companylist.contacts" placeholder="请输入联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="contactsPhone">
                        <el-input type="tel" v-model="companylist.contactsPhone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="传真电话：" prop="faxTelephone">
                        <el-input type="text" v-model="companylist.faxTelephone" placeholder="请输入传真电话"></el-input>
                    </el-form-item>
                    <el-form-item label="电子信箱：" prop="mailBox" class="lineOne">
                        <el-input type="text" v-model="companylist.mailBox" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="单位网址：" prop="companyWebsite" class="lineOne">
                        <el-input type="text" v-model="companylist.companyWebsite" placeholder="请输入单位网址"></el-input>
                    </el-form-item>
                </div>
            </div>
            <!-- 管理部门及人员  -->
            <div class="departmentPeople">
                <div class="titleName boxSizing">
                    <i class="el-icon-arrow-down"></i>
                    <span>管理部门及人员</span>
                </div>
                <div class="companyForm">
                    <el-form-item label="管理部门：" prop="department" class="lineOne">
                        <el-input v-model="companylist.department" placeholder="请输入管理部门"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入部门负责人：" prop="departmentPeople" class="lineOne">
                        <el-input type="text" v-model="companylist.departmentPeople" placeholder="请输入部门负责人"></el-input>
                    </el-form-item>
                    <el-form-item label="废物管理负责人：" prop="fuDepartment" >
                        <el-input type="text" v-model="companylist.fuDepartment"  placeholder="请输入废物管理负责人"></el-input>
                    </el-form-item>
                </div>
                <div class="dividingLine"></div>
                <div class="departmentForm">
                    <ul>
                        <li>
                            <span class="num">序号</span><span class="chargeName">废物污染防治设施技术负责人</span><span class="culture">文化程度</span><span class="operation">操作</span>
                        </li>
                        <li v-for="(item, index) in companylist.departmentlist" :key="index">
                            <span class="num">{{index+1}}</span>
                            <span class="chargeName">
                              <el-form-item :prop="`departmentlist.${index}.chargeName`" :rules="rules.chargeName">
                                <el-input type="text" v-model="item.chargeName" style="border:0"></el-input>
                              </el-form-item>
                            </span>
                            <span class="culture">
                              <el-form-item :prop="`departmentlist.${index}.culture`" :rules="rules.culture">
                                <el-select v-model="item.culture" placeholder="请选择文化程度">
                                  <el-option v-for="item in cultureOptions" :key="item.value" :label="item.label" :value="item.value" >
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </span>
                            <span class="operation" @click="deleteDepartment(item.index)"><i class="el-icon-delete"></i></span>
                        </li>
                    </ul>
                    <div class="addButton" @click="addDepartment"><i class="el-icon-circle-plus"></i> 新增</div>
                </div>
            </div>
            <!-- 规章制度 -->
            <div class="regulationsRules">
                <div class="titleName boxSizing">
                    <i class="el-icon-arrow-down"></i>
                    <span>规章制度</span>
                </div>
                <div class="rules boxSizing">
                    <div class="rulesIntroduce rowFlex">
                        <i class="el-icon-warning-outline"></i>
                        <div class="">
                            <span>温馨提示</span>
                            <span>1, 支持PDF/Word/等格式文件上传, 单个文件大小不能超过20MB。</span>
                        </div>
                    </div>
                    <div class="rowFlex uploadDocuments">
                        <el-upload class="rulesUpload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-circle-plus"></i>
                            <div class="el-upload__text"><span>将文档拖放到</span><span>此处即可上传</span></div>
                        </el-upload>
                        <el-upload class="rulesUpload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-circle-plus"></i>
                            <div class="el-upload__text"><span>将文档拖放到</span><span>此处即可上传</span></div>
                        </el-upload>
                        <el-upload class="rulesUpload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-circle-plus"></i>
                            <div class="el-upload__text"><span>将文档拖放到</span><span>此处即可上传</span></div>
                        </el-upload>
                        <el-upload class="rulesUpload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-circle-plus"></i>
                            <div class="el-upload__text"><span>将文档拖放到</span><span>此处即可上传</span></div>
                        </el-upload>
                        <el-upload class="rulesUpload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                            <i class="el-icon-circle-plus"></i>
                            <div class="el-upload__text"><span>将文档拖放到</span><span>此处即可上传</span></div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="manageOrganization">
                <div class="titleName boxSizing">
                    <i class="el-icon-arrow-down"></i>
                    <span>管理组织图</span>
                </div>
                <el-upload class="manageUpload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-circle-plus"></i>
                    <div class="el-upload__text"><span>将图片拖放到</span><span>此处即可上传</span></div>
                </el-upload>
            </div>
            <!-- 保存 -->
            <div class="buttonCon">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="resetForm('ruleForm')">一键清空 <i class="el-icon-refresh-right"></i></el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import {cityArray} from '../city'
export default {
  data () {
    return {
      companylist: {
        name: '',
        value: '',
        detailedAddress: '',
        address: '',
        postCode: '',
        legal: '',
        categoryName: '',
        totalInvestment: '',
        totalOutputValue: '',
        areaCovered: '',
        numOfEmps: '',
        headOfEpd: '',
        contacts: '',
        contactsPhone: '',
        faxTelephone: '',
        mailBox: '',
        companyWebsite: '',
        department: '',
        departmentPeople: '',
        fuDepartment: '',
        departmentlist: [
          {chargeName: '', culture: ''}
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请选单位注册地址', trigger: 'change' }
        ],
        detailedAddress: [
          { required: true, message: '请输入单位详细地址', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入生产设施地址', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '请输入邮编', trigger: 'blur' }
        ],
        legal: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        categoryName: [
          { required: true, message: '请输入行业类别与代码·', trigger: 'blur' }
        ],
        totalInvestment: [
          { required: true, message: '请输入总投资', trigger: 'blur' }
        ],
        totalOutputValue: [
          { required: true, message: '请输入总产值', trigger: 'blur' }
        ],
        areaCovered: [
          { required: true, message: '请输入占地面积', trigger: 'blur' }
        ],
        numOfEmps: [
          { required: true, message: '请输入职工人数', trigger: 'blur' }
        ],
        headOfEpd: [
          { required: true, message: '请输入环保部门负责人', trigger: 'blur' }
        ],
        contacts: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        faxTelephone: [
          { required: true, message: '请输入传真电话', trigger: 'blur' }
        ],
        mailBox: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        companyWebsite: [
          { required: true, message: '请输入单位网址', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入管理部门', trigger: 'blur' }
        ],
        departmentPeople: [
          { required: true, message: '请输入部门负责人', trigger: 'blur' }
        ],
        fuDepartment: [
          { required: true, message: '请输入废物管理人', trigger: 'blur' }
        ],
        chargeName: [
          { required: true, message: '技术负责人', trigger: 'blur' }
        ],
        culture: [
          { required: true, message: '请输入文化程度', trigger: 'blur' }
        ]
      },
      cultureOptions: [
        { value: 'abc', label: '大学' },
        { value: 'bcd', label: '硕士' }
      ],
      value: [],
      options: cityArray
    }
  },
  methods: {
    addDepartment () {
      const departmentlist = {
        chargeName: '',
        culture: ''
      }
      this.companylist.departmentlist.push(departmentlist)
    },
    deleteDepartment (index) {
      this.departmentlist.splice(index, 1)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.companylist)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm (formName) {
      console.log(this.$refs[formName])
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
/* 管理部门及人员 */
.departmentForm{
    width: 61%;
    margin-left: 8%;
}
.departmentForm>ul{
    border: 1px solid rgba(151, 151, 151, 0.58);
}
.departmentForm>ul>li{
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    text-align: center;
}
.departmentForm>ul>li>span{
    border-right: 1px solid rgba(151, 151, 151,.4);
    border-bottom: 1px solid rgba(151, 151, 151,.4);
}
.departmentForm>ul>li span:last-child{
    border-right: 0;
}
.departmentForm>ul>li:last-child span{
    border-bottom: 0;
}
.departmentForm>ul>li .num{
    width: 10%;
}
.departmentForm>ul>li .chargeName{
    width: 40%;
}
.departmentForm>ul>li .culture{
    width: 40%;
}
.departmentForm>ul>li .operation{
    width: 10%;
}
.departmentForm .addButton{
    padding: 0 17px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: inline-block;
    margin: 12px 0;
    color: #424242;
    line-height: 29px;
    font-size: 12px;
    cursor: pointer;
}
.departmentForm .addButton .el-icon-circle-plus{
    color: rgba(0, 0, 0, .3);
}
/* 管理页面下面的增加 */
.departmentForm>ul>li .el-input__inner{
    width: 100%;
    line-height: 40px;
    height: 40px;
    border: none;
}
/* 规章制度 */
.regulationsRules{
    margin-bottom: 24px;
}
.rulesUpload{
    margin-left: 2%;
}
/* 管理组织图 */
.manageOrganization .manageUpload{
      margin-left: 2%;
}
.manageOrganization .el-icon-circle-plus{
    color: rgba(0, 0, 0, .5);
    font-size: 30px;
    margin-bottom: 16px;
}
.manageOrganization .el-upload-dragger{
    width: 100%;
    height: 100%;
    padding: 53px;
    background:rgba(216, 216, 216, .5);
}
.manageOrganization .el-upload-dragger span{
    display: block;
}
.manageOrganization .el-form-item__error{
  padding-top:9px
}
.departmentForm  .el-form-item{
  margin-bottom: 0;
}
.informMain .el-form-item__error--inline{
  position: absolute;
  top:50%;
  right: 27px;
  margin-top: -7px;

}
.el-select{
  width: 100%;
}
</style>
