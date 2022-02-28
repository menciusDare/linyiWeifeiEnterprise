<template>
  <div>
    <div style="width: 100%;height: 50px;background-color: rgb(254, 246, 222)">
      <font color="red">如果有纸质合同,可在此录入</font>
    </div>
    <div>
      <el-form
        :model="contractForm"
        :rules="contractFormrules"
        ref="contractForm"
        label-width="40%"
        class="demo-ruleForm"
      >
        <el-row :gutter="0">
          <el-col :span="2"></el-col>
          <el-col :span="10">
            <el-form-item label="处置品类" prop="dictDetailCode">
              <el-select
                v-model="contractForm.dictDetailCode"
                multiple
                collapse-tags
                clearable
                placeholder="请选择处置品类"
                style="width:180px;height: 34px;"
              >
                <el-option
                  v-for="item in dicList"
                  :key="item.typeCode"
                  :label="item.typeName"
                  :value="item.typeCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="企业名称" prop="entIdTwo">
              <el-select
                v-model="contractForm.entIdTwo"
                clearable
                placeholder="请选择企业"
                style="width:180px"
              >
                <el-option
                  v-for="item in entList"
                  :key="item.entId"
                  :label="item.entName"
                  :value="item.entId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="2"></el-col>
          <el-col :span="10">
            <el-form-item label="合同开始日" prop="startDate">
              <div class="block">
                <el-date-picker
                  v-model="contractForm.startDate"
                  type="date"
                  style="width:180px"
                  placeholder="选择合同开始日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合同结束日" prop="endDate">
              <el-date-picker
                v-model="contractForm.endDate"
                type="date"
                style="width:180px"
                value-format="yyyy-MM-dd"
                placeholder="选择合同结束日"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :span="2"></el-col>
          <el-col :span="10">
            <el-form-item label="单位" prop="unit">
              <el-select v-model="contractForm.unit" style="width:180px" placeholder="请选择单位">
                <el-option
                  v-for="item in unitList"
                  :key="item.unitCode"
                  :label="item.unitName"
                  :value="item.unitCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="约定价格" prop="price">
              <el-input
                v-model.number="contractForm.price"
                placeholder="请输入约定价格"
                style="width:180px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin-top:1%;margin-bottom:1%;overflow: auto;height: 170px;text-align: center;">
      <el-upload
        action="/api/permissions/imageController/uploadImage"
        list-type="picture-card"
        ref="upload"
        :on-success="onYyzzSuccess"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
      ></el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="imageUrl1" alt />
      </el-dialog>
      <div>上传合同</div>
    </div>

    <div style="text-align: center;margin: 1%;">
      <el-button type="primary" @click="submitForm()" style="width: 200px;">确认新建</el-button>
      <el-button @click="goAdd" style="width: 200px;">创建并继续添加</el-button>
      <el-button @click="closePage" style="width: 200px;">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "testCar",
  data() {
    return {
      isClosePage: 0,
      dialogVisible: false,
      imageUrl1: "",
      contractForm: {
        dictDetailCode: "",
        entIdOne: sessionStorage.getItem("entId"),
        entIdTwo:"",
        status:8,
        startDate: null,
        endDate: null,
        price: null,
        unit: null,
      },
      photoListForm: [],
      regionCodeOptions: "",
      // 产废企业下拉框
      entList: [],
      entType: 1,
      // 处置品类下拉框
      dicList: [],
      unitList: [
        {
          unitName: "吨",
          unitCode: 0,
        },
        {
          unitName: "千克",
          unitCode: 1,
        },
        {
          unitName: "升",
          unitCode: 2,
        },
      ],
      dicName: "HW08",
      enterpriseForm: {},
      enterpriseFormrules: {},
      dicType: 1,
      //校验
      contractFormrules: {
        entIdTwo: [
          { required: true, message: "请选择企业", trigger: "blur" },
        ],
        dictDetailCode: [
          { required: true, message: "请选择处置品类", trigger: "blur" },
        ],
        startDate: [
          { required: true, message: "请选择合同开始日", trigger: "blur" },
        ],
        endDate: [
          { required: true, message: "请选择合同结束日", trigger: "blur" },
        ],
        unit: [{ required: true, message: "请选择单位", trigger: "blur" }],
        price: [
          { required: true, message: "请输入约定价格", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
    };
  },

  mounted() {
    this.getDicList();
    this.getEntList();
  },

  methods: {
    // // 根据所选的处置品类和当前企业类型查询对应的企业
    // changeDicDetail(){
    //     if(this.contractForm.dictDetailCode!=""){
    //         this.getEntList();
    //     }
    // },
    // // 选择企业
    // changeEnt(){
    //     if(this.contractForm.dictDetailCode==""){
    //         this.$message.info("请先选择处置品类!");
    //     }
    // },
    getEntList() {
      var that = this;
      var url = "/api/regulatory/tEnterpriseInfo/getEntList";
      var params = new URLSearchParams();
      params.append("dictDetailCode", this.contractForm.dictDetailCode);
      that.$axios
        .get(url, { params })
        .then(function (res) {
          if (res.code == 0) {
            that.entList = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    getDicList() {
      var that = this;
      var url = "/api/regulatory/tEnterpriseInfo/getDicList";
      var params = new URLSearchParams();
      params.append("dicName", "");
      params.append("dicType", that.dicType);
      that.$axios
        .get(url, { params })
        .then(function (res) {
          if (res.code == 0) {
            that.dicList = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    onYyzzSuccess(response, file, fileList) {
      if (response.code == 0) {
        var imageData = {};
        imageData.locationUrl = response.data.locationUrl;
        imageData.thumbnailUrl = response.data.thumbnailUrl;
        console.log(imageData);
        this.photoListForm.push(imageData);
        this.imageUrl1 = URL.createObjectURL(file.raw);
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
        .then((response) => {
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
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

    submitForm() {
      this.$refs["contractForm"].validate((valid) => {
        if (valid) {
          this.addContractForm();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*addContractForm() {
                debugger;
                let self = this;
                let contractForm = self.contractForm;
                let tAttachments = self.photoListForm
                let url = "/api4/tContractInfo/addTContractInfo/";
                var params = new URLSearchParams();
                params.append("dictDetailCode", contractForm.dictDetailCode);
                params.append("entIdOne", contractForm.entIdOne);
                params.append("startDate", contractForm.startDate);
                params.append("endDate", contractForm.endDate);
                params.append("price", contractForm.price);
                params.append("unitofvolume", contractForm.unit);
                params.append("tAttachments", tAttachments);
                self.$axios.get(url, {params}).then(function(res) {
                        if (res.code == 0) {
                            self.$message.success("新增合同信息成功");
                            self.closePage();
                            self.resetParam();

                        }
                    })
                    .catch(function(err) {
                        self.$message.error("新增合同信息失败，请重试!");
                    });
            },*/
    addContractForm() {
      let self = this;
      let contractForm = self.contractForm;
      let tAttachments = self.photoListForm;
      let dictDetailCodes = contractForm.dictDetailCode;
      let contractDetailcodes = [];
      dictDetailCodes.forEach((element) => {
        let contractDetailcode = {};
        contractDetailcode.detailCode = element;
        contractDetailcodes.push(contractDetailcode);
      });
      self.$delete(contractForm, "dictDetailCode");
      let url = "/api/regulatory/tEnterpriseInfo/addContractInfo/";
      self.$axios
        .post(url, {
          contractInfo: contractForm,
          contractDetailcodes: contractDetailcodes,
          tAttachment: tAttachments,
        })
        .then(function (res) {
            debugger;
          if (res.code == 0) {
            self.$message.success("新增合同信息成功");
            if (self.isClosePage == 0) {
              self.closePage();
            }
            self.resetParam();
          }
        })
        .catch(function (err) {
          self.$message.error("新增合同信息失败，请重试!");
        });
    },
    resetParam() {
      this.imageUrl1 = "";
      this.contractForm.dictDetailCode = "";
       this.contractForm.status = 8;
      this.contractForm.entIdOne = sessionStorage.getItem("entId");
      this.contractForm.entIdTwo = "";
      this.contractForm.startDate = null;
      this.contractForm.endDate = null;
      this.contractForm.price = null;
      this.contractForm.unit = null;
      this.photoListForm = [];
      this.isClosePage = 0;
      this.$refs.upload.clearFiles();
      this.$refs["contractForm"].clearValidate();
    },
    goAdd() {
      this.isClosePage = 1;
      this.$refs["contractForm"].validate((valid) => {
        if (valid) {
          this.addContractForm();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closePage() {
      this.$set(this.contractForm, "dictDetailCode");
      this.$refs["contractForm"].resetFields();
      this.$refs.upload.clearFiles();
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.lableWidthClass {
  width: 400px;
}
</style>
