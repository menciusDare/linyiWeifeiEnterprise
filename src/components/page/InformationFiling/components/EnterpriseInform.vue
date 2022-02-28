// 企业基本信息填写
<template>
  <div class="planDetail informMain boxShadow boxSizing">
    <el-form :model="companylist" status-icon :rules="rules" ref="ruleForm" class="boxSzing" inline-message>
      <!-- 公司信息 -->
      <div class="companyInformation">
        <div class="titleName boxSizing" @click="show('show1')">
          <div v-if="show1">
            <i class="el-icon-arrow-down"></i>
            <span>公司信息</span>
          </div>
          <div v-else>
            <i class="el-icon-arrow-up"></i>
            <span>公司信息</span>
          </div>
        </div>
        <div v-show="show1">
          <div class="companyForm">
            <el-form-item label="单位名称:" prop="name" class="lineOne">
              <el-input v-model="companylist.name" :disabled="disabled" placeholder="请输入单位名称"></el-input>
            </el-form-item>
            <el-form-item label="单位注册地址:" prop="regionCode">
              <div class="block">
                <el-cascader v-model="companylist.regionCode" :options="options" :disabled="disabled" @change="handleChange" emitPath></el-cascader>
              </div>
            </el-form-item>
            <el-form-item label="单位注册详细地址:" prop="registeredAddress">
              <el-input type="text" :disabled="disabled" v-model="companylist.registeredAddress" placeholder="单位注册详细地址"></el-input>
            </el-form-item>
            <el-form-item label="社会统一信用码:" prop="creditCode">
              <el-input :disabled="disabled" type="text" v-model="companylist.creditCode" placeholder="社会统一信用码"></el-input>
            </el-form-item>
            <el-form-item label="生产设施地址:" prop="address">
              <el-input :disabled="disabled" type="text" v-model="companylist.address" placeholder="请输入生产设施地址"></el-input>
            </el-form-item>
            <el-form-item label="邮编:" prop="postCode">
              <el-input type="text" :disabled="disabled" v-model="companylist.postCode" placeholder="请输入邮编"></el-input>
            </el-form-item>
          </div>
          <div class="dividingLine"></div>
          <div class="companyForm">
            <el-form-item label="法定代表人：" prop="legal">
              <el-input :disabled="disabled" v-model="companylist.legal" placeholder="请输入法定代表人"></el-input>
            </el-form-item>
            <el-form-item label="行业类别与代码：" prop="categoryId">
              <!-- <el-input
                type="text"
                v-model="companylist.categoryId"
                placeholder="请输入行业类别与代码·"
              ></el-input> -->
              <div class="block">
                <el-cascader v-model="companylist.categoryId" @change="handleChange1" :options="categoryOptions" :props="{ value: 'value', label: 'label' }" emitPath :disabled="disabled"></el-cascader>
              </div>
            </el-form-item>
            <el-form-item label="总投资：" prop="totalInvestment">
              <el-input type="number" :disabled="disabled" v-model="companylist.totalInvestment"></el-input>
              <span class="biaozhu">万元</span>
            </el-form-item>
            <el-form-item label="总产值：" prop="totalOutputValue">
              <el-input type="number" :disabled="disabled" v-model="companylist.totalOutputValue"></el-input>
              <span class="biaozhu">万元</span>
            </el-form-item>
            <el-form-item label="占地面积：" prop="areaCovered">
              <el-input type="text" :disabled="disabled" v-model="companylist.areaCovered" placeholder="请输入占地面积"></el-input>
              <span class="biaozhu">亩</span>
            </el-form-item>
            <el-form-item label="职工人数：" prop="numOfEmps">
              <el-input type="number" :disabled="disabled" v-model="companylist.numOfEmps"></el-input>
              <span class="biaozhu">人</span>
            </el-form-item>
            <el-form-item label="环保部门负责人：" prop="headOfEpd">
              <el-input :disabled="disabled" v-model="companylist.headOfEpd" placeholder="请输入环保部门负责人"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contacts">
              <el-input type="text" :disabled="disabled" v-model="companylist.contacts" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="contactsPhone">
              <el-input type="tel" :disabled="disabled" v-model="companylist.contactsPhone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="传真电话：" prop="faxTelephone">
              <el-input type="text" :disabled="disabled" v-model="companylist.faxTelephone" placeholder="请输入传真电话"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="mailBox" class="lineOne">
              <el-input type="text" :disabled="disabled" v-model="companylist.mailBox" placeholder="请输入电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="单位网址：" prop="companyWebsite" class="lineOne">
              <el-input type="text" :disabled="disabled" v-model="companylist.companyWebsite" placeholder="请输入单位网址"></el-input>
            </el-form-item>
          </div>
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
            <el-input v-model="companylist.department" :disabled="disabled" placeholder="请输入管理部门"></el-input>
          </el-form-item>
          <el-form-item label="请输入部门负责人：" prop="departmentPeople" class="lineOne">
            <el-input type="text" :disabled="disabled" v-model="companylist.departmentPeople" placeholder="请输入部门负责人"></el-input>
          </el-form-item>
          <el-form-item label="废物管理负责人：" prop="fuDepartment">
            <el-input type="text" :disabled="disabled" v-model="companylist.fuDepartment" placeholder="请输入废物管理负责人"></el-input>
          </el-form-item>
        </div>
        <div class="dividingLine"></div>
        <div class="departmentForm">
          <ul>
            <li>
              <span class="num">序号</span><span class="chargeName">废物污染防治设施技术负责人</span><span :class="view == 2 ? 'education' : 'education2'">文化程度</span><span class="operation" v-if="view == 2">操作</span>
            </li>
            <li v-for="(item, index) in companylist.departmentList" :key="index">
              <span class="num">{{ index + 1 }}</span>
              <span class="userName">
                <el-form-item :prop="`departmentList.${index}.userName`" :rules="rules.userName">
                  <el-input type="text" :disabled="disabled" v-model="item.userName" style="border: 0"></el-input>
                </el-form-item>
              </span>
              <span :class="view == 2 ? 'education' : 'education2'">
                <el-form-item :prop="`departmentList.${index}.education`" :rules="rules.education">
                  <el-select v-model="item.education" :disabled="disabled" placeholder="请选择文化程度">
                    <el-option v-for="item in cultureOptions" :key="item.education" :label="item.label" :value="item.education">
                    </el-option>
                  </el-select>
                </el-form-item>
              </span>
              <span class="operation" v-if="view == 2" @click="deleteDepartment(item.id, index)"><i class="el-icon-delete"></i></span>
              <!-- <span class="operation" v-else></span> -->
            </li>
          </ul>
          <div v-if="view == 2" class="addButton" @click="addDepartment">
            <i class="el-icon-circle-plus"></i> 新增
          </div>
        </div>
      </div>
      <!-- 规章制度 -->
      <div class="regulationsRules">
        <div class="titleName boxSizing" @click="show('show3')">
          <div v-if="show3">
            <i class="el-icon-arrow-down"></i>
            <span>规章制度</span>
          </div>
          <div v-else>
            <i class="el-icon-arrow-up"></i>
            <span>规章制度</span>
          </div>
        </div>
        <div class="rules boxSizing" v-show="show3">
          <div v-if="view == 2" class="rulesIntroduce rowFlex">
            <i class="el-icon-warning-outline"></i>
            <div class>
              <span>温馨提示</span>
              <span>1, 支持PDF/Word/等格式文件上传,
                单个文件大小不能超过20MB。</span>
              <span>2, 请在文件上传成功提示弹出后点击保存按钮。</span>
            </div>
          </div>
          <div :class="view == 2 ? '' : 'noneShow'">
            <el-upload ref="upload" class="rulesUpload" action="/api/permissions/imageController/uploadFile" list-type="picture-card" drag accept="application/pdf,application/msword" :file-list="fileList1" :before-upload="beforeUpload" :http-request="UploadFile">
              <div class="el-upload__text">
                <span>将文档拖放到</span><i class="el-icon-circle-plus"></i><span>此处即可上传</span>
              </div>
              <div slot="file" slot-scope="{ file }">
                <!-- <img class="el-upload-list__item-thumbnail" :src="file.url" alt /> -->
                <iframe v-if="file.fileType == 'pdf'" scrolling="no" :src="file.url" width="163px">
                </iframe>
                <span v-if="file.fileType == 'word'" style="font-size: 12px">{{
                  file.name
                }}</span>
                <span class="el-upload-list__item-actions">
                  <span v-if="file.fileType == 'pdf'" style="margin-top: 10px" class="el-upload-list__item-preview" @click="handlePictureCardPreview1(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-download" @click="handleDownload1(file)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="view == 2" class="el-upload-list__item-delete" @click="handleRemove1(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="manageOrganization">
        <div class="titleName boxSizing" @click="show('show4')">
          <div v-if="show4">
            <i class="el-icon-arrow-down"></i>
            <span>管理组织图</span>
          </div>
          <div v-else>
            <i class="el-icon-arrow-up"></i>
            <span>管理组织图</span>
          </div>
        </div>
        <div v-if="view == 2" class="rulesIntroduce rowFlex">
          <i class="el-icon-warning-outline"></i>
          <div class>
            <span>温馨提示</span>
            <span>1, 支持jpeg/jpg/png等格式文件上传,
              单个文件大小不能超过20MB。</span>
            <span>2, 请在文件上传成功提示弹出后点击保存按钮。</span>
          </div>
        </div>
        <div :class="view == 2 ? '' : 'noneShow'">
          <el-upload class="rulesUpload" action="/api/permissions/imageController/uploadImage" list-type="picture-card" drag accept="image/jpeg,image/jpg,image/png" :http-request="UploadImage" :file-list="fileList2" :before-upload="beforeUpload2">
            <div class="el-upload__text">
              <span>将文档拖放到</span><i class="el-icon-circle-plus"></i><span>此处即可上传</span>
            </div>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <i class="el-icon-download"></i>
                </span>
                <span v-if="view == 2" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </div>

        <el-dialog title="查看文件详情" :visible.sync="pdfDialogVisible" :modal-append-to-body="false">
          <iframe :src="pdfDialogImageUrl" width="100%" height="760px">
          </iframe>
        </el-dialog>
        <el-dialog title="查看图片" :visible.sync="dialogVisible" :modal-append-to-body="false">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <!-- 处置合同备案 -->
      <div class="regulationsRules">
        <div class="titleName boxSizing" @click="show('show3')">
          <div v-if="show3">
            <i class="el-icon-arrow-down"></i>
            <span>处置合同备案</span>
          </div>
          <div v-else>
            <i class="el-icon-arrow-up"></i>
            <span>处置合同备案</span>
          </div>
        </div>
        <div class="rules boxSizing" v-show="show3">
          <div v-if="view == 2" class="rulesIntroduce rowFlex">
            <i class="el-icon-warning-outline"></i>
            <div class>
              <span>温馨提示</span>
              <span>1, 支持PDF/Word/等格式文件上传,
                单个文件大小不能超过20MB。</span>
              <span>2, 请在文件上传成功提示弹出后点击保存按钮。</span>
            </div>
          </div>
          <div :class="view == 2 ? '' : 'noneShow'">
            <el-upload ref="upload" class="rulesUpload" action="/api/permissions/imageController/uploadFile" list-type="picture-card" drag accept="application/pdf,application/msword" :file-list="fileList3" :before-upload="beforeUpload" :http-request="UploadFile2">
              <div class="el-upload__text">
                <span>将文档拖放到</span><i class="el-icon-circle-plus"></i><span>此处即可上传</span>
              </div>
              <div slot="file" slot-scope="{ file }">
                <!-- <img class="el-upload-list__item-thumbnail" :src="file.url" alt /> -->
                <iframe v-if="file.fileType == 'pdf'" scrolling="no" :src="file.url" width="163px">
                </iframe>
                <span v-if="file.fileType == 'word'" style="font-size: 12px">{{
                  file.name
                }}</span>
                <span class="el-upload-list__item-actions">
                  <span v-if="file.fileType == 'pdf'" style="margin-top: 10px" class="el-upload-list__item-preview" @click="handlePictureCardPreview2(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span class="el-upload-list__item-download" @click="handleDownload2(file)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="view == 2" class="el-upload-list__item-delete" @click="handleRemove2(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
      <!-- 保存 -->
      <div class="buttonCon">
        <el-form-item>
          <el-button v-if="view == 2" type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button v-if="view == 2" @click="resetForm('ruleForm')">
            一键清空
            <i class="el-icon-refresh-right"></i>
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import downloadImge from "@/components/common/unit/DownloadImge";
const acceptTypes = ["image/jpeg", "image/jpg", "image/png"];
export default {
  name: "enterpriseInform",
  data() {
    return {
      disabled: false,
      fileList: [],
      view: "",
      path: "/api/regulatory/",
      ImgeUrl: this.AppConfig.appInfo.IMG_URL,
      fileList1: [],
      fileList2: [],
      fileList3: [],
      entId: "",
      pdfDialogImageUrl: "",
      dialogImageUrl: "",
      pdfDialogVisible: false,
      dialogVisible: false,
      disabled: false,
      companylist: {
        //公司信息
        name: "",
        registeredAddress: "",
        creditCode: "",
        address: "",
        postCode: "",
        legal: "",
        categoryId: "",
        totalInvestment: "",
        totalOutputValue: "",
        areaCovered: "",
        numOfEmps: "",
        headOfEpd: "",
        contacts: "",
        contactsPhone: "",
        faxTelephone: "",
        mailBox: "",
        companyWebsite: "",
        //部门信息
        department: "",
        departmentPeople: "",
        departmentPeopleId: "",
        fuDepartmentId: "",
        fuDepartment: "",
        departmentList: [{ userName: "", education: "" }],
        //上传文件信息
        attachmentList: [],
        recordYear: this.$route.query.year,
      },
      rules: {
        name: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
        registeredAddress: [
          { required: true, message: "请选单位注册地址", trigger: "change" },
        ],
        creditCode: [
          { required: true, message: "请输社会统一信用码", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入生产设施地址", trigger: "blur" },
        ],
        postCode: [{ required: true, message: "请输入邮编", trigger: "blur" }],
        legal: [
          { required: true, message: "请输入法定代表人", trigger: "blur" },
        ],
        categoryId: [
          {
            required: true,
            message: "请选择行业类别与代码·",
            trigger: "change",
          },
        ],
        totalInvestment: [
          { required: true, message: "请输入总投资", trigger: "blur" },
        ],
        totalOutputValue: [
          { required: true, message: "请输入总产值", trigger: "blur" },
        ],
        areaCovered: [
          { required: true, message: "请输入占地面积", trigger: "blur" },
        ],
        numOfEmps: [
          { required: true, message: "请输入职工人数", trigger: "blur" },
        ],
        headOfEpd: [
          { required: true, message: "请输入环保部门负责人", trigger: "blur" },
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        contactsPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        faxTelephone: [
          { required: true, message: "请输入传真电话", trigger: "blur" },
        ],
        mailBox: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        companyWebsite: [
          { required: true, message: "请输入单位网址", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请输入管理部门", trigger: "blur" },
        ],
        departmentPeople: [
          { required: true, message: "请输入部门负责人", trigger: "blur" },
        ],
        fuDepartment: [
          { required: true, message: "请输入废物管理人", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入技术负责人", trigger: "blur" },
        ],
        education: [
          { required: true, message: "请选择文化程度", trigger: "change" },
        ],
      },
      cultureOptions: [
        { education: 1, label: "小学以下" },
        { education: 2, label: "小学" },
        { education: 3, label: "初中" },
        { education: 4, label: "中专" },
        { education: 5, label: "大专" },
        { education: 6, label: "高中" },
        { education: 7, label: "大学" },
        { education: 8, label: "硕士" },
        { education: 9, label: "硕士以上" },
      ],
      value: [],
      options: [],
      categoryOptions: [],
      show1: true,
      show2: true,
      show3: true,
      show4: true,
    };
  },
  created() {
    this.getCityOptions();
    this.getCategoryOptions();
    this.getEntId();
    // this.gettEnterpriseInfo(1);
    // this.getDept();
    this.initDisabled();
  },
  methods: {
    initDisabled() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    getCityOptions() {
      let self = this;
      let params = new URLSearchParams();
      params.append("regionId", "0");
      self.$axios
        .post("/api/regulatory/regionInfo/getRegionTree/", params)
        .then((res) => {
          self.options = res.data[0].children;
        });
    },
    getCategoryOptions() {
      let self = this;
      self.$axios
        .get("/api/permissions/industry/selectTindutryTree")
        .then((res) => {
          self.categoryOptions = res.data;
        });
    },
    handleChange(value) {
      if (value != undefined && value.length > 0) {
        this.companylist.regionCode = value[value.length - 1];
      }
    },
    handleChange1(value) {
      if (value != undefined && value.length > 0) {
        this.companylist.categoryId = value[value.length - 1];
      }
    },
    //获取部门数据
    getDept() {
      let self = this;
      self.$axios
        .get("/api/regulatory/tEnterpriseUser/getDeptSubmit")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            if (res.data.department != null) {
              self.$set(self.companylist, "department", res.data.department);
            }
            if (res.data.departmentPeople != null) {
              self.$set(
                self.companylist,
                "departmentPeople",
                res.data.departmentPeople
              );
            }
            if (res.data.departmentPeopleId) {
              self.$set(
                self.companylist,
                "departmentPeopleId",
                res.data.departmentPeopleId
              );
            }
            if (res.data.fuDepartment != null) {
              self.$set(
                self.companylist,
                "fuDepartment",
                res.data.fuDepartment
              );
            }
            if (res.data.fuDepartmentId != null) {
              self.$set(
                self.companylist,
                "fuDepartmentId",
                res.data.fuDepartmentId
              );
            }
            if (res.data.departmentList != null) {
              self.$set(
                self.companylist,
                "departmentList",
                res.data.departmentList
              );
            }
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    isContains(str, substr) {
      return str.indexOf(substr) >= 0;
    },

    //获取图片数据
    getImge(correlationId) {
      let self = this;
      self.$axios
        .post(
          "/api/regulatory/tEnterpriseTransportPlan/getImgList/" + correlationId
        )
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            let attachmentList = res.data;
            self.$set(self.companylist, "attachmentList", attachmentList);
            if (attachmentList != null && attachmentList.length > 0) {
              for (let i of attachmentList) {
                if (i.type == 1 || i.type == 2) {
                  // self.companylist.attachmentList.push(i);
                  if (self.isContains(i.locationUrl, ".pdf")) {
                    self.fileList1.push({
                      id: i.id,
                      url: self.ImgeUrl + i.locationUrl,
                      fileType: "pdf",
                    });
                  } else if (
                    self.isContains(i.locationUrl, ".doc") ||
                    self.isContains(i.locationUrl, ".docx")
                  ) {
                    self.fileList1.push({
                      id: i.id,
                      url: self.ImgeUrl + i.locationUrl,
                      fileType: "word",
                      name: i.fileName,
                    });
                  }
                } else if (i.type == 3) {
                  self.fileList2.push({
                    id: i.id,
                    url: self.ImgeUrl + i.locationUrl,
                  });
                }
              }
            }
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //获取企业基本信息数据
    gettEnterpriseInfo(id) {
      let self = this;
      self.$axios
        .get("/api/regulatory/tEnterpriseInfo/" + id)
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.companylist = res.data;
            self.$set(self.companylist, "attachmentList", []);
            self.$set(self.companylist, "recordYear", this.$route.query.year);
            let correlationId = self.companylist.correlationId;
            if (
              correlationId != null &&
              correlationId != undefined &&
              res.data.correlationId != ""
            ) {
              this.getImge(correlationId);
            }
            this.getDept();
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //获取企业id
    getEntId() {
      let self = this;
      self.$axios
        .get("/api/regulatory/ReportAndRegister/getEntId")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.entId = res.data;
            this.gettEnterpriseInfo(self.entId);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    addDepartment() {
      this.companylist.departmentList.push({
        userName: "",
        education: "",
      });
    },
    deleteDepartment(id, index) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        if (id != null && id != undefined) {
          self = this;
          let params = id;
          self.$axios
            .delete("/api/regulatory/tEnterpriseUser/" + params)
            .then((res) => {
              if (res.code == 0) {
                this.companylist.departmentList.splice(index, 1);
                self.$message.success("删除成功!");
                this.getData();
              }
            });
        } else {
          this.companylist.departmentList.splice(index, 1);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将保存填写内容, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            type: "warning",
          }).then(() => {
            var self = this;
            var params = this.companylist;
            var companylist = self.$axios
              .post("/api/regulatory/tEnterpriseInfo", params)
              .then((res) => {
                if (res.code == 0) {
                  "correlationId", res.data;
                  self.$message.success("添加成功!");
                  this.$refs[formName].resetFields();
                  this.companylist.attachmentList = [];
                  this.fileList1 = [];
                  this.fileList2 = [];
                  self.getEntId();
                  this.$parent.getManangementState();
                }
              })
              .catch(function (err) {
                console.log(err);
                this.$message.error("添加失败！");
              });
          });
        } else {
          console.log("error submit!!");
          this.$message({
            message: "存在未填写的必填项！",
            type: "warning",
          });
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$confirm("此操作将清空全部已填写的数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        this.$refs[formName].resetFields();
        this.companylist.attachmentList = [];
        this.companylist.departmentList = [];
        this.fileList1 = [];
        this.fileList2 = [];
      });
    },
    show(index) {
      this[index] = !this[index];
    },
    //图片上传
    UploadImage(params) {
      let self = this;
      let formData = new FormData();
      console.log("params", params);
      formData.append("file", params.file);
      self
        .$axios({
          url: params.action,
          method: "post",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
        .then((res) => {
          if (res.code == 0) {
            res.data.type = 3;
            self.$set(res.data, "uid", params.file.uid);
            let companylist = self.companylist;
            companylist.attachmentList.push(res.data);
            // self.fileList2.push(res.data);
            self.fileList2.push({
              uid: params.file.uid,
              url: self.ImgeUrl + res.data.locationUrl,
            });
            self.$message.success("上传成功!");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //上传文件
    UploadFile(params) {
      let self = this;
      console.log("params", params);
      let formData = new FormData();
      formData.append("file", params.file);
      self
        .$axios({
          url: params.action,
          method: "post",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
        .then((res) => {
          if (res.code == 0) {
            res.data.type = 1;
            self.$set(res.data, "uid", params.file.uid);
            let companylist = self.companylist;
            if (params.file.type == "application/msword") {
              self.fileList1.push({
                uid: params.file.uid,
                url: self.ImgeUrl + res.data.locationUrl,
                fileType: "word",
                name: params.file.name,
              });
            } else if (params.file.type == "application/pdf") {
              self.fileList1.push({
                uid: params.file.uid,
                url: self.ImgeUrl + res.data.locationUrl,
                fileType: "pdf",
              });
            }
            self.$set(res.data, "fileName", params.file.name);
            companylist.attachmentList.push(res.data);
            self.$message.success("上传成功!");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    UploadFile2(params) {
      let self = this;
      console.log("params", params);
      let formData = new FormData();
      formData.append("file", params.file);
      self
        .$axios({
          url: params.action,
          method: "post",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
        .then((res) => {
          if (res.code == 0) {
            res.data.type = 11;
            self.$set(res.data, "uid", params.file.uid);
            let companylist = self.companylist;
            if (params.file.type == "application/msword") {
              self.fileList3.push({
                uid: params.file.uid,
                url: self.ImgeUrl + res.data.locationUrl,
                fileType: "word",
                name: params.file.name,
              });
            } else if (params.file.type == "application/pdf") {
              self.fileList3.push({
                uid: params.file.uid,
                url: self.ImgeUrl + res.data.locationUrl,
                fileType: "pdf",
              });
            }
            self.$set(res.data, "fileName", params.file.name);
            companylist.attachmentList.push(res.data);
            self.$message.success("上传成功!");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //图片下载回来
    handleDownload(file) {
      this.$confirm("此操作将下载此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.companylist.attachmentList;
        if (attachmentList != undefined && attachmentList.length > 0) {
          for (var i = 0; i < attachmentList.length; i++) {
            if (
              attachmentList[i].uid == file.uid ||
              attachmentList[i].id == file.id
            ) {
              let params = new URLSearchParams();
              params.append("pathUrl", attachmentList[i].locationUrl);
              let locationUrl = attachmentList[i].locationUrl;
              let format = locationUrl.split(".")[1];
              let url = "api/permissions/imageController/downLoad";
              self.$axios
                .post(url, params, { responseType: "blob" })
                .then(function (response) {
                  let imgeName =
                    new Date().format("yyyyMMddhhmmss") + "." + format; //下载后图片名
                  downloadImge(response, imgeName);
                })
                .catch(function () {
                  self.$message.info("导出异常,请重试!");
                });
            }
          }
        }
      });
    },
    //删除上传的图片
    async handleRemove(file, fileList) {
      this.$confirm("此操作将删除此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.companylist.attachmentList;
        var fileList = self.fileList2;
        if (fileList != undefined && fileList.length > 0) {
          for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].uid == file.uid) {
              fileList.splice(i, 1);
            } else if (fileList[i].id == file.id) {
              fileList.splice(i, 1);
            }
          }
        }
        if (attachmentList != undefined && attachmentList.length > 0) {
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].uid == file.uid) {
              attachmentList.splice(i, 1);
              self.$message.success("删除成功!");
            } else if (attachmentList[i].id === file.id) {
              let params = attachmentList[i].id;
              self.$axios
                .delete("/api/regulatory/tattachment/" + params)
                .then((res) => {
                  if (res.code == 0 && res.data) {
                    attachmentList.splice(i, 1);
                    self.$message.success("删除成功!");
                  }
                });
            }
          }
        }
      });
    },
    //打开缩略图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //---------------------------------------------------分割线

    beforeUpload(file) {
      let fileTypes = ["application/pdf", "application/msword"];
      const isLt10M = file.size / 1024 / 1024 < 20;
      const isPDF = fileTypes.includes(file.type);
      if (!isPDF) {
        this.$message.error("文件必须是PDF格式或者WORD格式");
      }
      if (!isLt10M) {
        this.$message.error("文件大小不超过20M！");
      }
      return isPDF && isLt10M;
    },

    beforeUpload2(file) {
      let fileTypes = ["image/jpeg", "image/jpg", "image/png"];
      const isLt10M = file.size / 1024 / 1024 < 20;
      const isJPG = fileTypes.includes(file.type);
      if (!isJPG) {
        this.$message.error("文件必须是JPEG或JPG或PNG格式图片");
      }
      if (!isLt10M) {
        this.$message.error("文件大小不超过20M！");
      }
      return isJPG && isLt10M;
    },

    handlePictureCardPreview1(file) {
      this.pdfDialogVisible = true;
      this.pdfDialogImageUrl = file.url;
    },

    handlePictureCardPreview2(file) {
      this.pdfDialogVisible = true;
      this.pdfDialogImageUrl = file.url;
    },
    //删除上传的pdf或者word文件
    handleRemove1(file) {
      this.$confirm("此操作将永久删除此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.companylist.attachmentList;
        var fileList = self.fileList1;
        if (fileList != undefined && fileList.length > 0) {
          for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].uid == file.uid) {
              fileList.splice(i, 1);
            } else if (fileList[i].id == file.id) {
              fileList.splice(i, 1);
            }
          }
        }
        if (attachmentList != undefined && attachmentList.length > 0) {
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].uid == file.uid) {
              attachmentList.splice(i, 1);
              self.$message.success("删除成功!");
              console.log("self.fileList1", self.fileList1);
              console.log("self.attachmentList", self.attachmentList);
            } else if (attachmentList[i].id === file.id) {
              let params = attachmentList[i].id;
              self.$axios
                .delete("/api/regulatory/tattachment/" + params)
                .then((res) => {
                  if (res.code == 0 && res.data) {
                    attachmentList.splice(i, 1);
                    self.$message.success("删除成功!");
                  }
                });
            }
          }
        }
      });
    },
    handleRemove2(file) {
      this.$confirm("此操作将永久删除此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.companylist.attachmentList;
        var fileList = self.fileList3;
        if (fileList != undefined && fileList.length > 0) {
          for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].uid == file.uid) {
              fileList.splice(i, 1);
            } else if (fileList[i].id == file.id) {
              fileList.splice(i, 1);
            }
          }
        }
        if (attachmentList != undefined && attachmentList.length > 0) {
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].uid == file.uid) {
              attachmentList.splice(i, 1);
              self.$message.success("删除成功!");
              console.log("self.fileList3", self.fileList3);
              console.log("self.attachmentList", self.attachmentList);
            } else if (attachmentList[i].id === file.id) {
              let params = attachmentList[i].id;
              self.$axios
                .delete("/api/regulatory/tattachment/" + params)
                .then((res) => {
                  if (res.code == 0 && res.data) {
                    attachmentList.splice(i, 1);
                    self.$message.success("删除成功!");
                  }
                });
            }
          }
        }
      });
    },

    //pdf文件下载回来
    handleDownload1(file) {
      this.$confirm("此操作将下载此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.companylist.attachmentList;
        if (attachmentList != undefined && attachmentList.length > 0) {
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].uid == file.uid) {
              let params = new URLSearchParams();
              params.append("pathUrl", attachmentList[i].locationUrl);
              let locationUrl = attachmentList[i].locationUrl;
              let format = locationUrl.split(".")[1];
              let url = "api/permissions/imageController/downLoad";
              self.$axios
                .post(url, params, { responseType: "blob" })
                .then(function (response) {
                  let imgeName =
                    new Date().format("yyyyMMddhhmmss") + "." + format; //下载后图片名
                  downloadImge(response, imgeName);
                })
                .catch(function () {
                  self.$message.info("导出异常,请重试!");
                });
            } else if (attachmentList[i].id == file.id) {
              let params = new URLSearchParams();
              params.append("pathUrl", attachmentList[i].locationUrl);
              let locationUrl = attachmentList[i].locationUrl;
              let format = locationUrl.split(".")[1];
              let url = "api/permissions/imageController/downLoad";
              self.$axios
                .post(url, params, { responseType: "blob" })
                .then(function (response) {
                  let imgeName =
                    new Date().format("yyyyMMddhhmmss") + "." + format; //下载后图片名
                  downloadImge(response, imgeName);
                })
                .catch(function () {
                  self.$message.info("导出异常,请重试!");
                });
            }
          }
        }
      });
    },
    handleDownload2(file) {
      this.$confirm("此操作将下载此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.companylist.attachmentList;
        if (attachmentList != undefined && attachmentList.length > 0) {
          for (var i = 0; i < attachmentList.length; i++) {
            if (attachmentList[i].uid == file.uid) {
              let params = new URLSearchParams();
              params.append("pathUrl", attachmentList[i].locationUrl);
              let locationUrl = attachmentList[i].locationUrl;
              let format = locationUrl.split(".")[1];
              let url = "api/permissions/imageController/downLoad";
              self.$axios
                .post(url, params, { responseType: "blob" })
                .then(function (response) {
                  let imgeName =
                    new Date().format("yyyyMMddhhmmss") + "." + format; //下载后图片名
                  downloadImge(response, imgeName);
                })
                .catch(function () {
                  self.$message.info("导出异常,请重试!");
                });
            } else if (attachmentList[i].id == file.id) {
              let params = new URLSearchParams();
              params.append("pathUrl", attachmentList[i].locationUrl);
              let locationUrl = attachmentList[i].locationUrl;
              let format = locationUrl.split(".")[1];
              let url = "api/permissions/imageController/downLoad";
              self.$axios
                .post(url, params, { responseType: "blob" })
                .then(function (response) {
                  let imgeName =
                    new Date().format("yyyyMMddhhmmss") + "." + format; //下载后图片名
                  downloadImge(response, imgeName);
                })
                .catch(function () {
                  self.$message.info("导出异常,请重试!");
                });
            }
          }
        }
      });
    },
  },
};
</script>
<style>
/* 管理部门及人员 */
.block {
  display: block;
}
.departmentForm {
  width: 61%;
  margin-left: 8%;
}
.departmentForm > ul {
  border: 1px solid rgba(151, 151, 151, 0.58);
}
.departmentForm > ul > li {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  text-align: center;
}
.departmentForm > ul > li > span {
  border-right: 1px solid rgba(151, 151, 151, 0.4);
  border-bottom: 1px solid rgba(151, 151, 151, 0.4);
  width: 40%;
}
.departmentForm > ul > li span:last-child {
  border-right: 0;
}
.departmentForm > ul > li:last-child span {
  border-bottom: 0;
}
.departmentForm > ul > li .num {
  width: 10%;
}
.departmentForm > ul > li .userName {
  width: 40%;
}
.departmentForm > ul > li .education {
  width: 40%;
}
.departmentForm > ul > li .education2 {
  width: 50%;
}
.departmentForm > ul > li .operation {
  width: 10%;
}
.departmentForm .addButton {
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
.departmentForm .addButton .el-icon-circle-plus {
  color: rgba(0, 0, 0, 0.3);
}
/* 管理页面下面的增加 */
.departmentForm > ul > li .el-input__inner {
  width: 100%;
  line-height: 40px;
  height: 40px;
  border: none;
}
/* 规章制度 */
.regulationsRules {
  margin-bottom: 24px;
}
.rulesUpload {
  margin-left: 2%;
}
/* 管理组织图 */
.manageOrganization .manageUpload {
  margin-left: 2%;
}
.manageOrganization .el-icon-circle-plus {
  color: rgba(0, 0, 0, 0.5);
  font-size: 30px;
  margin-bottom: 0px;
}
.manageOrganization .el-upload-dragger {
  width: 100%;
  height: 100%;
  padding: 53px;
  background: rgba(216, 216, 216, 0.5);
}
.manageOrganization .el-upload-dragger span {
  display: block;
}
.manageOrganization .el-form-item__error {
  padding-top: 9px;
}
.departmentForm .el-form-item {
  margin-bottom: 0;
}
.informMain .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 27px;
  margin-top: -7px;
}
.el-select {
  width: 100%;
}

.rulesUpload .el-upload-dragger {
  width: 100%;
  height: 100%;
  padding: 36px 3px;
  background: rgba(216, 216, 216, 0.5);
}
</style>
