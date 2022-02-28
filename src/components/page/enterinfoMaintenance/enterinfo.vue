<template id="enterinfo">
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-zhuanyun"></i>企业信息维护
        </a>
        <span class="sep">></span>
        <span class="text-primary">企业基本设置</span>
      </div>
    </div>
    <div class="panel mt-lg">
      <div class="panel-hd">
        <h2 class="panel-tit01">资质文件</h2>
      </div>
      <div class="panel-bd">
        <div style="height: 130px;
    background-color: #fef6de">
          <i class="el-icon-warning-outline"></i>
          <b>温馨提示</b>
          <div style="text-indent:3em;">
            <p>1、完善企业信息才能使用相关业务。</p>
            <p>2、请上传清晰丶完整丶无遮挡物的营业执照、经营许可证、运输许可证照片。</p>
            <p>3、要求原件红章清晰，若为复印件需加盖公司公章。</p>
            <p>4、所有证照提交后审核时间为2个工作日，只有完成审核并获得业务资质后才可正常营运接单。</p>
            <p>5、图片大小不能超过6M，图片格式为JPG丶PNG。</p>
          </div>
        </div>
        <div style="height: 20px"></div>
        <div style="text-align: center">
          <el-row :gutter="100">
            <el-col :span="8">
              <el-upload
                class="avatar-uploader"
                action="/api/permissions/imageController/uploadImage"
                :show-file-list="false"
                :on-success="onYyzzSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"  style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width: 100%;height: 200px"
              >
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar" style="width: 100%;height: 200px;display: block;"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"style="font-size: 28px;
    color: #8c939d;width: 100%;height: 178px;line-height: 178px;text-align: center;"></i>
              </el-upload>
              <div>*营业执照照片</div>
            </el-col>
            <el-col :span="8">
              <el-upload
                class="avatar-uploader"
                action="/api/permissions/imageController/uploadImage"
                :show-file-list="false"
                :on-success="onJyxkzSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload" style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width: 100%;height: 200px"
              >
                <img v-if="imageUrl2" :src="imageUrl2"  style="width: 100%;height: 200px;display: block;"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"style="font-size: 28px;
    color: #8c939d;width: 100%;height: 200px;line-height: 200px;text-align: center;"></i>
              </el-upload>
              <div>*经营许可证</div>
            </el-col>
            <el-col :span="8">
              <el-upload
                class="avatar-uploader"
                action="/api/permissions/imageController/uploadImage"
                :show-file-list="false"
                :on-success="onYsxkzSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload" style="border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;width: 100%;height: 200px"
              >
                <img v-if="imageUrl3" :src="imageUrl3" style="width: 100%;height: 200px;display: block;"/>
                <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 28px;
    color: #8c939d;width: 100%;height: 200px;line-height: 200px;text-align: center;"></i>
              </el-upload>
              <div>*运输许可证</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="panel mt-lg">
      <div class="panel-hd">
        <h2 class="panel-tit01">企业基本信息</h2>
      </div>
      <div class="panel-bd" style="text-align: center">
        <el-form
          :model="enterpriseForm"
          :rules="enterpriseFormrules"
          ref="enterpriseForm"
          label-width="40%"
          class="demo-ruleForm"
        >
          <el-row :gutter="0">
            <el-col :span="2"></el-col>
            <el-col :span="10">
              <el-form-item label="单位名称：" prop="name">
                <el-input
                  v-model="enterpriseForm.name"
                  placeholder="请输入单位名称"
                  style="float: left;width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="社会统一信用代码：" prop="creditCode">
                <el-input
                  v-model="enterpriseForm.creditCode"
                  placeholder="请输入社会统一信用代码"
                  style="float: left;width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="2"></el-col>
            <el-col :span="10">
              <el-form-item label="所在区域：" prop="regionCode1">
                <el-cascader
                  v-model="enterpriseForm.regionCode1"
                  :options="regionCodeOptions"
                  :props="{ checkStrictly: true }"
                  placeholder="请选择所在区域"
                  style="float: left;width: 100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属行业：" prop="categoryId1">
                 <el-cascader
                 ref="categoryCascader"
                  v-model="enterpriseForm.categoryId1"
                  :options="categoryOptions"
                  :props="{ checkStrictly: true }"
                  placeholder="请选择所属行业"
                  style="float: left;width: 100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="2"></el-col>
            <el-col :span="10">
              <el-form-item label="法人：" prop="legal">
                <el-input
                  v-model="enterpriseForm.legal"
                  placeholder="请输入法人"
                  style="float: left;width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系人：">
                <el-input
                  v-model="enterpriseForm.contacts"
                  placeholder="请输入联系人"
                  style="float: left;width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="2"></el-col>
            <el-col :span="10">
              <el-form-item label="法人电话：" prop="legalPhone">
                <el-input
                  v-model="enterpriseForm.legalPhone"
                  placeholder="请输入法人电话"
                  style="float: left;width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="联系人电话：">
                <el-input
                  v-model="enterpriseForm.contactsPhone"
                  placeholder="请输入联系人电话"
                  style="float: left;width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2"></el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- <div v-if="enterpriseForm.entType==2" class="panel mt-lg">
      <div class="panel-hd">
        <h2 class="panel-tit01">处置能力</h2>
      </div>
      <div class="panel-bd">
        <el-table
          :data="propTableData.col.filter(data => handleAdd || data.name.toLowerCase().includes(handleAdd.toLowerCase()))"
          highlight-current-row
          border
        >
          <el-table-column label="危废类别">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-select
                  size="mini"
                  v-model="scope.row.hazardousType"
                  @change="hazardousTypeChange(scope.row)"
                >
                  <el-option
                    v-for="item in hazardousTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
              <span v-if="scope.row.isSet == false">
                <el-select
                  size="mini"
                  v-model="scope.row.hazardousType"
                  @change="hazardousTypeChange(scope.row)"
                  disabled
                >
                  <el-option
                    v-for="item in hazardousTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="危废代码">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-select
                  size="mini"
                  v-model="scope.row.hazardousCode"
                  @change="hazardousCodeChange(scope.row)"
                >
                  <el-option
                    v-for="item in hazardousCodeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
              <span v-if="scope.row.isSet == false">
                <el-select
                  size="mini"
                  v-model="scope.row.hazardousCode"
                  @change="hazardousCodeChange(scope.row)"
                  disabled
                >
                  <el-option
                    v-for="item in hazardousCodeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="危废俗称">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <span>{{ scope.row.hazardousName }}</span>
              </span>
              <span v-else>{{ scope.row.hazardousName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="处置限额">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input size="mini" v-model="scope.row.hazardousTNum"></el-input>
              </span>
              <span v-else>{{ scope.row.hazardousTNum }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="170px">
            <template slot="header" slot-scope="scope">
              <el-button
                v-model="handleAdd"
                size="mini"
                type="success"
                round
                plain
                @click="handleAdd(scope.$index, scope.row)"
              >新增</el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                round
                plain
                v-if="!scope.row.isSet"
                @click="valChange(scope.row,scope.$index,true)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="primary"
                round
                plain
                v-else
                @click="valChange(scope.row,scope.$index,true)"
              >保存</el-button>
              <el-button
                size="mini"
                type="danger"
                round
                plain
                v-if="!scope.row.isSet"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                type="danger"
                round
                plain
                v-else
                @click="valChange(scope.row,scope.$index,false)"
              >取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div> -->
    <div class="panel mt-lg">
      <!--<div class="panel-hd">
        <h2 class="panel-tit01">操作</h2>
      </div>-->
      <div class="panel-bd" style="text-align: center">
        <el-button type="primary" @click="submitForm()" style="width: 200px;">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
const defaultProp = {
  code: "",
  maxValue: "",
  minValue: "",
  name: "",
  valueType: "String",
  id: "",
  typeId: "",
  warning: false
};
export default {
  data() {
    return {
      enterpriseForm: {
        name: "",
        creditCode: "",
        regionCode: "",
        regionCode1: "",
        categoryId: "",
        categoryId1:"",
        scale: "",
        legal: "",
        legalPhone: "",
        contacts: "",
        contactsPhone: "",
        entType: sessionStorage.getItem("entType")
      },
      enterpriseFormrules: {
        name: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        creditCode: [
          {
            required: true,
            message: "请输入社会统一信用代码",
            trigger: "blur"
          }
        ]
      },
      show: true,
      count: "",
      timer: null,
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      propTableData: {
        sel: null, // 选中行
        col: []
      },
      photoListForm: [],
      regionCodeOptions: [],
      categoryOptions: [],
      hazardousTypeOptions: [],
      hazardousCodeOptions: [],
      entId: sessionStorage.getItem("entId"),
      scaleOptions: [
        {
          value: "0-50",
          label: "0-50"
        },
        {
          value: "50-200",
          label: "50-200"
        },
        {
          value: "200-500",
          label: "200-500"
        },
        {
          value: "500-1000",
          label: "500-1000"
        },
        {
          value: "1000以上",
          label: "1000以上"
        }
      ]
    };
  },
  mounted() {
    this.getRegionTree();
    this.selectIndustryCategoryList();
    // this.sysDicType();
    this.selectTEnterpriseInfoDetails();
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    //营业执照
    onYyzzSuccess(response, file, fileList) {
      if (response.code == 0) {
        var imageData = {};
        imageData.type = 1;
        imageData.locationUrl = response.data.locationUrl;
        imageData.thumbnailUrl = response.data.thumbnailUrl;
        this.photoListForm.push(imageData);
        this.imageUrl1 = URL.createObjectURL(file.raw);
        this.$message({ message: "上传成功", type: "success" });
        return true;
      } else {
        this.$message({ message: response.msg, type: "error" });
        return false;
      }
    },
    //经营许可证
    onJyxkzSuccess(response, file, fileList) {
      if (response.code == 0) {
        var imageData = {};
        imageData.type = 2;
        imageData.locationUrl = response.data.locationUrl;
        imageData.thumbnailUrl = response.data.thumbnailUrl;
        this.photoListForm.push(imageData);
        this.imageUrl2 = URL.createObjectURL(file.raw);
        this.$message({ message: "上传成功", type: "success" });
        return true;
      } else {
        this.$message({ message: response.msg, type: "error" });
        return false;
      }
    },
    //运输许可证
    onYsxkzSuccess(response, file, fileList) {
      if (response.code == 0) {
        var imageData = {};
        imageData.type = 3;
        imageData.locationUrl = response.data.locationUrl;
        imageData.thumbnailUrl = response.data.thumbnailUrl;
        this.photoListForm.push(imageData);
        this.imageUrl3 = URL.createObjectURL(file.raw);
        this.$message({ message: "上传成功", type: "success" });
        return true;
      } else {
        this.$message({ message: response.msg, type: "error" });
        return false;
      }
    },
    //移除图片
    handleRemove(file, fileList) {
      console.log(file);
      for (let i = 0; i < this.photoListForm.length; i++) {
        if (this.photoListForm[i].fileUrl == file.response.data.fileUrl) {
          this.photoListForm.splice(i, 1);
        }
      }
      var params = new URLSearchParams();
      params.append("fileUrl", file.response.data.fileUrl);
      params.append("thumbUrl", file.response.data.thumbUrl);
      this.$axios
        .post("/api/base/imageController/batchDeleteImageByUrl", params)
        .then(response => {
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        })
        .catch(error => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },

    //政区树
    getRegionTree() {
      let self = this;
      let url = '/api/regulatory/regionInfo/getRegionChildrenList?regionCode='+371300;
      var params = new URLSearchParams();
      params.append("regionCode", this.AppConfig.appInfo.regionCode);
       params.append("includeStation", true);
      self.$axios
        .get(url)
        .then(function(res) {
          if (res.code == 0) {
            self.regionCodeOptions = res.data;
          }
        })
        .catch(function(err) {
          self.$message.error("获取政区树，请稍后再试!");
        });
    },
    //行业列表
    selectIndustryCategoryList() {
      let self = this;
      let url = "/api/regulatory/tEnterpriseInfo/selectIndustryCategoryList/";
      self.$axios
        .get(url)
        .then(function(res) {
          if (res.code == 0) {
            self.categoryOptions = res.data;
          }
        })
        .catch(function(err) {
          self.$message.error("获取行业列表失败，请稍后再试!");
        });
    },
    addTEnterpriseInfo() {
      let self = this;
      let url = "/api/regulatory/tEnterpriseInfo/addTEnterpriseInfo/";
      let tEnterpriseInfo = self.enterpriseForm;
      tEnterpriseInfo.regionCode =
        tEnterpriseInfo.regionCode1[tEnterpriseInfo.regionCode1.length - 1];
      // tEnterpriseInfo.entType = self.entType;
      self.$axios
        .post(url, {
          tenterpriseInfo: tEnterpriseInfo,
          tcapacitiesDto: self.propTableData.col,
          tattachments: self.photoListForm,
          personId: sessionStorage.getItem("personId")
        })
        .then(function(res) {
          if (res.code == 0) {
            self.$message.success("保存企业信息成功!");
            self.selectTEnterpriseInfoDetails();
          }else{
             self.$message.error("保存企业信息失败，请稍后再试!");
          }
        })
        .catch(function(err) {
          self.$message.error("保存企业信息失败，请稍后再试!");
        });
    },
    //修改企业信息
    updateTEnterpriseInfo() {
      let self = this;
      let url = "/api/regulatory/tEnterpriseInfo/updateTEnterpriseInfo/";
      let tEnterpriseInfo = self.enterpriseForm;
      tEnterpriseInfo.regionCode =
              tEnterpriseInfo.regionCode1[tEnterpriseInfo.regionCode1.length - 1];
              tEnterpriseInfo.categoryId= self.$refs["categoryCascader"].getCheckedNodes()[0].data.id;
      self.$axios
        .post(url, {
          tenterpriseInfo: tEnterpriseInfo,
          tcapacitiesDto: self.propTableData.col,
          tattachments: self.photoListForm
        })
        .then(function(res) {
          if (res.code == 0) {
            self.$message.success("修改企业信息成功!");
            self.selectTEnterpriseInfoDetails();
          }else{
             self.$message.error("修改企业信息失败，请稍后再试!");
          }
        })
        .catch(function(err) {
          self.$message.error("修改企业信息失败，请稍后再试!");
        });
    },
    submitForm() {
      this.$refs["enterpriseForm"].validate(valid => {
        if (valid) {
          if (this.entId && this.entId != "") {
            this.updateTEnterpriseInfo();
          } else {
            this.addTEnterpriseInfo();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    hazardousTypeChange(row) {
      let id = "";
      this.hazardousTypeOptions.forEach(element => {
        if (element.value == row.hazardousType) {
          id = element.id;
        }
      });
      this.selectListByTypeId(id);
      row.hazardousName = "";
      row.hazardousCode = "";
    },
    hazardousCodeChange(row) {
      let length = this.propTableData.col.length;
      this.hazardousCodeOptions.forEach(element => {
        if (element.value == row.hazardousCode) {
          row.hazardousName = element.name;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt6M = file.size / 1024 / 1024 < 6;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt6M) {
        this.$message.error("上传图片大小不能超过 6MB!");
      }
      return isJPG && isLt6M;
    },
   
    beforeClose() {
      this.$emit("cancel");
    },
    //查询危废代码
    selectTEnterpriseInfoDetails() {
      let self = this;
      let url =
        "/api/regulatory/tEnterpriseInfo/selectTEnterpriseInfoDetails?entId=" +
        sessionStorage.getItem("entId");
      self.$axios
        .get(url)
        .then(function(res) {
          if (res.code == 0) {
            self.enterpriseForm = res.data.tenterpriseInfo;
            self.enterpriseForm.regionCode1=res.data.tenterpriseInfo.regionCode;
            self.photoListForm = res.data.tattachments;
            for (var j = 0; j < self.photoListForm.length; j++) {
              var objs = self.photoListForm[j];
              if (objs.type == 1) {
                self.imageUrl1 = self.IMG_URL + objs.locationUrl;
              } else if (objs.type == 2) {
                self.imageUrl2 = self.IMG_URL + objs.locationUrl;
              } else if (objs.type == 3) {
                self.imageUrl3 = self.IMG_URL + objs.locationUrl;
              }
            }
          }
        })
        .catch(function(err) {
          self.$message.error("查询企业详情失败!");
        });
    },
    Message(msg, type) {
      this.$message({ type: type ? type : "info", message: msg });
    }
  }
};
</script>
<style  scoped lang='scss'>
.el-upload--text{
     width: 100% ;
     height: 100% ;
  }
#enterinfo{

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .el-upload--text{
     width: 100% ;
     height: 100% ;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .panel {
    position: relative;
    border-radius: 2px;
    background-color: #fff;
    border: 1px solid #eaecef;
  }
  .panel .panel-hd {
    padding: 0 20px;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #eaecef;
  }
  .panel .panel-hd .icon {
    margin-right: 10px;
    color: #172033;
  }
  .panel .panel-hd .panel-tit {
    float: left;
    font-size: 16px;
  }
  .panel .panel-hd .panel-tit01 {
    float: left;
    font-size: 16px;
    padding-left: 13px;
    position: relative;
  }
  .panel .panel-hd .panel-tit01:before {
    position: absolute;
    content: "";
    left: 0;
    top: 50%;
    margin-top: -8px;
    width: 3px;
    border-radius: 1px;
    height: 16px;
    background-color: #0fb6f5;
  }
  .panel .panel-right {
    float: right;
  }
  .panel .panel-right .more {
    color: #7a8399;
  }
  .panel .panel-right .more:hover {
    color: #0fa2f5;
  }
  .panel .panel-bd {
    padding: 20px;
  }

  .panel-box {
    background-color: #fff;
  }
  .panel-box .panel-hd {
    font-size: 18px;
    line-height: 20px;
    padding: 20px 20px;
    overflow: hidden;
  }
  .panel-box .panel-right {
    float: right;
    color: #475066;
    font-size: 14px;
  }
  .panel-box .title {
    float: left;
    padding-left: 13px;
    position: relative;
  }
  .panel-box .title:before {
    content: "";
    left: 0;
    top: 50%;
    position: absolute;
    width: 3px;
    height: 16px;
    margin-top: -8px;
    background-color: #0fa2f5;
    border-radius: 3px;
  }
  .panel-box .panel-bd {
    line-height: 18px;
    padding: 0 20px 20px;
  }
  .mt-lg {
    margin-top: 20px;
  }
}
</style>