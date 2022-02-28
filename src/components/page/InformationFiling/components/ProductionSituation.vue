// 生产情况
<template>
  <div class="planDetail productionSituation boxShadow boxSizing">
    <el-form
      :model="productionlist"
      status-icon
      ref="productionlist"
      class="boxSzing"
      inline-message
    >
      <!-- 原辅材料及消耗量 -->
      <div class="production material">
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>原辅材料及消耗量</span>
        </div>
        <div class="productionForm materialForm">
          <ul>
            <li class="rowFlex">
              <div class="line1">序号</div>
              <div class="line2">原辅材料名称</div>
              <div class="line3">上年度消耗量（吨）</div>
              <div class="line1">序号</div>
              <div class="line2">原辅材料名称</div>
              <div :class="view == 2 ? 'line4' : 'line25'">
                本年度计划消耗量（吨）
              </div>
              <div v-if="view == 2" class="operation">操作</div>
            </li>
            <li
              v-for="(item, index) in productionlist.materialList"
              :key="index"
              class="rowFlex"
            >
              <div class="line1">
                <span class>{{ index + 1 }}</span>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`materialList.${index}.auxiliaryMaterials`"
                  :rules="rules.auxiliaryMaterials"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.auxiliaryMaterials"
                    style="border: 0"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`materialList.${index}.lastYearConsume`"
                  :rules="rules.lastYearConsume"
                >
                  <el-input
                    type="number"
                    :disabled="disabled"
                    v-model="item.lastYearConsume"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line1">
                <span class>{{ index + 1 }}</span>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`materialList.${index}.auxiliaryMaterials`"
                  :rules="rules.auxiliaryMaterials"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.auxiliaryMaterials"
                  ></el-input>
                </el-form-item>
              </div>
              <div :class="view == 2 ? 'line4' : 'line25'">
                <el-form-item
                  :prop="`materialList.${index}.thisYearConsume`"
                  :rules="rules.thisYearConsume"
                >
                  <el-input
                    type="number"
                    :disabled="disabled"
                    v-model="item.thisYearConsume"
                  ></el-input>
                </el-form-item>
              </div>
              <div
                class="operation"
                v-if="view == 2"
                @click="deleteMaterialList(item, index)"
              >
                <i class="el-icon-delete"></i>
              </div>
              <!-- <div class="operation" v-else></div> -->
            </li>
          </ul>
          <div class="addButton" v-if="view == 2" @click="addMaterialList">
            <i class="el-icon-circle-plus"></i> 新增
          </div>
        </div>
      </div>
      <div class="production equipment">
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>生产设备及数量</span>
        </div>
        <div class="productionForm equipmentForm">
          <ul>
            <li class="rowFlex">
              <div class="line1">序号</div>
              <div class="line2">设备名称</div>
              <div class="line3">上年度数量（台）</div>
              <div class="line1">序号</div>
              <div class="line3">设备名称</div>
              <div :class="view == 2 ? 'line4' : 'line27'">
                本年度数量（台）
              </div>
              <div v-if="view == 2" class="operation">操作</div>
            </li>
            <li
              v-for="(item, index) in productionlist.equipmentList"
              :key="index"
              class="rowFlex"
            >
              <div class="line1">
                <span class>{{ index + 1 }}</span>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`equipmentList.${index}.equipmentName`"
                  :rules="rules.equipmentName"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.equipmentName"
                    style="border: 0"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`equipmentList.${index}.lastYearNumber`"
                  :rules="rules.lastYearNumber"
                >
                  <el-input
                    type="number"
                    :disabled="disabled"
                    v-model="item.lastYearNumber"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line1">
                <span class>{{ index + 1 }}</span>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`equipmentList.${index}.equipmentName`"
                  :rules="rules.equipmentName"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.equipmentName"
                  ></el-input>
                </el-form-item>
              </div>
              <div :class="view == 2 ? 'line4' : 'line27'">
                <el-form-item
                  :prop="`equipmentList.${index}.thisYearNumber`"
                  :rules="rules.thisYearNumber"
                >
                  <el-input
                    type="number"
                    :disabled="disabled"
                    v-model="item.thisYearNumber"
                  ></el-input>
                </el-form-item>
              </div>
              <div
                class="operation"
                v-if="view == 2"
                @click="deleteEquipment(item, index)"
              >
                <i class="el-icon-delete"></i>
              </div>
              <!-- <div class="operation" v-else></div> -->
            </li>
          </ul>
          <div class="addButton" v-if="view == 2" @click="addEquipment">
            <i class="el-icon-circle-plus"></i> 新增
          </div>
        </div>
      </div>
      <div class="production product">
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>产品及产量</span>
        </div>
        <div class="productionForm equipmentForm">
          <ul>
            <li class="rowFlex">
              <div class="line1">序号</div>
              <div class="line2">产品名称</div>
              <div class="line3">上年度产量（台）</div>
              <div class="line1">序号</div>
              <div class="line3">产品名称</div>
              <div :class="view == 2 ? 'line4' : 'line27'">
                本年度产量（台）
              </div>
              <div v-if="view == 2" class="operation">操作</div>
            </li>
            <li
              v-for="(item, index) in productionlist.productList"
              :key="index"
              class="rowFlex"
            >
              <div class="line1">
                <span class>{{ index + 1 }}</span>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`productList.${index}.productName`"
                  :rules="rules.productName"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.productName"
                    style="border: 0"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`productList.${index}.lastYearNumber`"
                  :rules="rules.lastYearNumber"
                >
                  <el-input
                    type="number"
                    :disabled="disabled"
                    v-model="item.lastYearNumber"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line1">
                <span class>{{ index + 1 }}</span>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`productList.${index}.productName`"
                  :rules="rules.productName"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.productName"
                  ></el-input>
                </el-form-item>
              </div>
              <div :class="view == 2 ? 'line4' : 'line27'">
                <el-form-item
                  :prop="`productList.${index}.thisYearNumber`"
                  :rules="rules.thisYearNumber"
                >
                  <el-input
                    type="number"
                    :disabled="disabled"
                    v-model="item.thisYearNumber"
                  ></el-input>
                </el-form-item>
              </div>
              <div
                class="operation"
                v-if="view == 2"
                @click="deleteProduct(item, index)"
              >
                <i class="el-icon-delete"></i>
              </div>
              <!-- <div class="operation" v-else></div> -->
            </li>
          </ul>
          <div class="addButton" v-if="view == 2" @click="addProduct">
            <i class="el-icon-circle-plus"></i> 新增
          </div>
        </div>
      </div>
      <!-- 生产工艺流程图及说明 -->
      <div>
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>生产工艺流程图及说明</span>
        </div>
        <div v-if="view == 2" class="rulesIntroduce rowFlex">
          <i class="el-icon-warning-outline"></i>
          <div class>
            <span>温馨提示</span>
            <span
              >1, 支持jpeg/jpg/png等格式文件上传,
              单个文件大小不能超过20MB。</span
            >
            <span>2, 请在文件上传成功提示弹出后点击保存按钮。</span>
          </div>
        </div>
        <div :class="view == 2 ? '' : 'noneShow'">
          <el-upload
            class="rulesUpload"
            action="/api/permissions/imageController/uploadImage"
            list-type="picture-card"
            drag
            accept="image/jpeg,image/jpg,image/png"
            :http-request="UploadFile"
            :file-list="fileList"
            :before-upload="beforeUpload"
          >
            <div class="el-upload__text">
              <span>将文档拖放到</span>
              <i class="el-icon-circle-plus"></i>
              <span>此处即可上传</span>
            </div>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="view == 2"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </div>
      </div>
      <el-dialog
        title="查看图片"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
      >
        <img width="100%" :src="dialogImageUrl" alt />
        <!-- <iframe :src="dialogImageUrl" width="100%" height="760px"> </iframe> -->
      </el-dialog>
      <div class="buttonCon">
        <el-form-item>
          <el-button
            v-if="view == 2"
            type="primary"
            @click="submitForm('productionlist')"
            >保存</el-button
          >
          <el-button v-if="view == 2" @click="resetForm('productionlist')">
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
export default {
  data() {
    var validateName1 = (rule, value, callback) => {
      var list = this.productionlist.materialList;
      var conut = 0;
      if (
        list != null &&
        list != undefined &&
        list.length > 0
      ) {
        for (let i of list) {
          if (value == i.auxiliaryMaterials) {
            conut++;
          }
        }
      }
      if (conut == 2) {
        callback(new Error("原辅材料名称不能重复"));
      }
      callback();
    };
    var validateName2 = (rule, value, callback) => {
      var list = this.productionlist.equipmentList;
      var conut = 0;
      if (
        list != null &&
        list != undefined &&
        list.length > 0
      ) {
        for (let i of list) {
          if (value == i.equipmentName) {
            conut++;
          }
        }
      }
      if (conut == 2) {
        callback(new Error("设备名称不能重复"));
      }
      callback();
    };
    var validateName3 = (rule, value, callback) => {
      var list = this.productionlist.productList;
      var conut = 0;
      if (
        list != null &&
        list != undefined &&
        list.length > 0
      ) {
        for (let i of list) {
          if (value == i.productName) {
            conut++;
          }
        }
      }
      if (conut == 2) {
        callback(new Error("产品名称不能重复"));
      }
      callback();
    };
    return {
      disabled: false,
      view: "",
      ImgeUrl: this.AppConfig.appInfo.IMG_URL,
      fileList: [],
      correlationId: "",
      dialogImageUrl: "",
      dialogVisible: false,
      productionlist: {
        //原材料及消耗量数据
        materialList: [
          {
            auxiliaryMaterials: "",
            lastYearConsume: "",
            thisYearConsume: "",
            recordYear: this.$route.query.year,
          },
        ],
        //生产设备及属性数据
        equipmentList: [
          {
            equipmentName: "",
            lastYearNumber: "",
            thisYearNumber: "",
            recordYear: this.$route.query.year,
          },
        ],
        //产品及产量数据
        productList: [
          {
            productName: "",
            lastYearNumber: "",
            thisYearNumber: "",
            recordYear: this.$route.query.year,
          },
        ],
        //上传文件信息
        attachmentList: [],
      },
      rules: {
        auxiliaryMaterials: [
          { required: true, message: "请输入原始材料名称", trigger: "blur" },
          { validator: validateName1, trigger: "blur" },
        ],
        lastYearConsume: [
          { required: true, message: "请输入上年度消耗量", trigger: "blur" },
        ],
        thisYearConsume: [
          {
            required: true,
            message: "请输入本年度计划消耗量",
            trigger: "blur",
          },
        ],
        equipmentName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
          { validator: validateName2, trigger: "blur" },
        ],
        lastYearNumber: [
          { required: true, message: "请输入上年度数量", trigger: "blur" },
        ],
        thisYearNumber: [
          { required: true, message: "请输入本年度数量", trigger: "blur" },
        ],
        productName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { validator: validateName3, trigger: "blur" },
        ],
        lastYearNumber: [
          { required: true, message: "请输入上年度产量", trigger: "blur" },
        ],
        thisYearNumber: [
          { required: true, message: "请输入本年度产量", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.initDisabled();
    this.getData();
  },
  methods: {
    initDisabled() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    isContains(str, substr) {
      return str.indexOf(substr) >= 0;
    },
    getData() {
      self = this;
      const year = self.$route.query.year;
      var params = new URLSearchParams();
      params.append("recordYear", year);
      self.$axios
        .get("/api/regulatory/ReportAndRegister/getProduce", { params })
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.productionlist = res.data;
            var fileList = self.productionlist.attachmentList;
            if (fileList !== null && fileList.length > 0) {
              self.fileList = [];
              for (let i of fileList) {
                self.fileList.push({
                  id: i.id,
                  url: self.ImgeUrl + i.locationUrl,
                });
              }
            }
          }
        });
    },
    addMaterialList() {
      const materialList = {
        auxiliaryMaterials: "",
        lastYearConsume: "",
        thisYearConsume: "",
        recordYear: this.$route.query.year,
      };
      this.productionlist.materialList.push(materialList);
    },
    deleteMaterialList(item, index) {
      this.$confirm("此操作将永久删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        if (item.id != null && item.id != undefined) {
          self = this;
          let params = item.id;
          self.$axios
            .delete("/api/regulatory/tEnterpriseMaterials/" + params)
            .then((res) => {
              if (res.code == 0) {
                this.productionlist.materialList.splice(index, 1);
                self.$message.success("删除成功!");
                this.getData();
              }
            });
        } else {
          this.productionlist.materialList.splice(index, 1);
        }
      });
    },
    addEquipment() {
      const equipmentList = {
        equipmentName: "",
        lastYearNumber: "",
        thisYearNumber: "",
        recordYear: this.$route.query.year,
      };
      this.productionlist.equipmentList.push(equipmentList);
    },
    deleteEquipment(item, index) {
      this.$confirm("此操作将永久删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        if (item.id != null && item.id != undefined) {
          self = this;
          let params = item.id;
          self.$axios
            .delete("/api/regulatory/tEnterpriseEquipmentInfo/" + params)
            .then((res) => {
              if (res.code == 0) {
                this.productionlist.equipmentList.splice(index, 1);
                self.$message.success("删除成功!");
                this.getData();
              }
            });
        } else {
          this.productionlist.equipmentList.splice(index, 1);
        }
      });
    },
    addProduct() {
      const productList = {
        productName: "",
        lastYearNumber: "",
        thisYearNumber: "",
        recordYear: this.$route.query.year,
      };
      this.productionlist.productList.push(productList);
      console.log("productionlist", this.productionlist);
    },
    deleteProduct(item, index) {
      this.$confirm("此操作将永久删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        if (item.id != null && item.id != undefined) {
          self = this;
          let params = item.id;
          self.$axios
            .delete("/api/regulatory/tEnterpriseProductInfo/" + params)
            .then((res) => {
              if (res.code == 0) {
                this.productionlist.productList.splice(index, 1);
                self.$message.success("删除成功!");
                this.getData();
              }
            });
        } else {
          this.productionlist.productList.splice(index, 1);
        }
      });
    },
    //提交表单
    submitForm(formName) {
      self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将保存填写内容, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            type: "warning",
          }).then(() => {
            let params = self.productionlist;
            self.$axios
              .post("/api/regulatory/ReportAndRegister/addProduce", params)
              .then((res) => {
                if (res.code == 0) {
                  self.$message.success("添加成功!");
                  self.fileList = [];
                  self.productionlist.attachmentList = [];
                  this.$parent.getManangementState();
                  self.getData();
                } else {
                  this.$message.error("添加失败！");
                }
              });
          });
        } else {
          console.log("error submit!!");
          self.$message({
            message: "存在未填写的必填项或存在相同的名称！",
            type: "warning",
          });
          return false;
        }
      });
    },

    resetForm(formName) {
      // Object.assign(this.$data, this.$options.data());
      this.$confirm("此操作将清空全部已填写的数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        this.productionlist = {
          //原材料及消耗量数据
          materialList: [
            {
              auxiliaryMaterials: "",
              lastYearConsume: "",
              thisYearConsume: "",
              recordYear: this.$route.query.year,
            },
          ],
          //生产设备及属性数据
          equipmentList: [
            {
              equipmentName: "",
              lastYearNumber: "",
              thisYearNumber: "",
              recordYear: this.$route.query.year,
            },
          ],
          //产品及产量数据
          productList: [
            {
              productName: "",
              lastYearNumber: "",
              thisYearNumber: "",
              recordYear: this.$route.query.year,
            },
          ],
          //上传文件信息
          attachmentList: [],
        };
        this.fileList = [];
      });
    },
    beforeUpload(file) {
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
    //上传文件
    UploadFile(params) {
      let self = this;
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
            res.data.type = 4;
            self.$set(res.data, "uid", params.file.uid);
            self.$set(res.data, "fileName", params.file.name);
            self.productionlist.attachmentList.push(res.data);
            self.fileList.push({
              uid: params.file.uid,
              url: self.ImgeUrl + res.data.locationUrl,
              name: params.file.name,
            });
            self.$message.success("上传成功!");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //删除文件
    handleRemove(file) {
      this.$confirm("此操作将永久删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.productionlist.attachmentList;
        var fileList = self.fileList;
        if (fileList != undefined && fileList.length > 0) {
          for (var i = 0; i < fileList.length; i++) {
            if (fileList[i].uid == file.uid) {
              fileList.splice(i, 1);
            } else if (fileList[i].id == file.id) {
              fileList.splice(i, 1);
            }
          }
        }
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
      });
    },
    //文件下载回来
    handleDownload(file) {
      this.$confirm("此操作将下载此文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let self = this;
        let attachmentList = self.productionlist.attachmentList;
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
    //打开缩略图
    handlePictureCardPreview(file) {
      console.log("地址", file.url);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style>
.production .productionForm {
  width: 95%;
  margin: 0 auto;
}
.production .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 29px;
  margin-top: -10px;
}
.production .el-input__inner {
  line-height: 38px;
}
.production ul {
  border: 1px solid rgba(151, 151, 151, 0.58);
}
.productionForm > ul > li {
  text-align: center;
  align-items: center;
  width: 100%;
  height: 40px;
}
.productionForm > ul > li > div {
  border-right: 1px solid rgba(151, 151, 151, 0.4);
  border-bottom: 1px solid rgba(151, 151, 151, 0.4);
  height: 100%;
  line-height: 40px;
}
.productionForm > ul > li:last-child div {
  border-bottom: 0;
}
.productionForm > ul > li div:last-child {
  border-right: 0;
}
.productionForm > ul > li > div .el-form-item {
  margin-bottom: 0;
}
.productionForm .el-form-item__content {
  line-height: 40px;
}
.productionForm input.el-input__inner {
  border: none;
  /* height: 38px; */
}
.productionForm > ul > li .line1 {
  width: 10%;
}
.productionForm > ul > li .line2 {
  width: 20%;
}
.line3 {
  width: 20%;
}
.line4 {
  width: 15%;
}
.operation {
  width: 5%;
}
.productionForm .addButton {
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
.line27 {
  width: 25%;
}
</style>
