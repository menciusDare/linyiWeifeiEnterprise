<template>
  <div>
    <el-dialog
      :title="title"
      :destroy-on-close="true"
      width="1100px"
      height="700px"
      :visible.sync="dialogVf"
      append-to-body
      @close="closevf"
      :close-on-click-modal="false"
    >
      <div class="panel">
        <div class="panel-bd pdtlr-0">
          <div
            class="breadcrumb"
            style="
              padding-top: 5px;
              padding-left: 9px;
              width: 100%;
              height: 100%;
              background-color: #fdf6ec;
              color: red;
              line-height: 23px;
              font-size: 14px;
            "
          >
            <div>
              第I类：按照《固体废物浸出毒性浸出方法》（GB5086-1997）规定方法进行浸出试验而获得的浸出液中，任何一种污染物的浓度均未超过《污水综合排放标准》（GB8978-1996）中最高允许排放浓度，且pH值在6~9的一般工业固体废物。
            </div>
            <div>
              第II类：按照《固体废物浸出毒性浸出方法》（GB5086-1997）规定方法进行浸出试验而获得的浸出液中，有一种或一种以上的污染物浓度超过《污水综合排放标准》（GB8978-1996）中最高允许排放浓度，或者pH值在6~9的之外的一般工业固体废物。
            </div>
          </div>
        </div>
      </div>
      <el-form
        label-position="right"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
        label-width="130px"
        style="width: 1050px"
        :rules="listRules"
      >
        <!--  一行  -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="废物分类" prop="vfKind">
              <el-select
                v-model="formInline.vfKind"
                placeholder="请选择"
                filterable
                style="width: 400px"
                :disabled="!lookFlog"
              >
                <el-option
                  v-for="(item, id) in wfKindList"
                  :key="id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
                        <el-form-item label="危废代码" prop="code">
                            <el-select v-model="formInline.code" placeholder="请选择" filterable  style = "width: 400px"  :disabled="formInline.vfKind=='' || !lookFlog">
                                <el-option
                                        v-for="(item,index) in codeList"
                                        :key="index"
                                        :label="item.detailsCode"
                                        :value="item.detailsCode"
                                ></el-option>
                            </el-select>
                          
                        </el-form-item>
                    </el-col> -->
        </el-row>
        <!--  二行  -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="废物大类" prop="fwType">
              <el-select
                v-model="formInline.fwType"
                placeholder="请选择"
                filterable
                style="width: 400px"
                :disabled="!lookFlog"
              >
                <el-option
                  v-for="item in fw_type"
                  :key="item.dicCode"
                  :label="item.dicName"
                  :value="item.dicCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
                  <el-col :span="12">
                                <el-form-item label="贮存间" prop="storageFacilitiesId">
                  <el-select
                    v-model="formInline.storageFacilitiesId"
                    placeholder="请选择"
                    filterable
                    style="width: 400px"
                    :disabled="!lookFlog"
                  >
                    <el-option
                      v-for="item in storeRoomList"
                      :key="item.id"
                      :label="item.facilitiesName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
        </el-row>
        <!--  三行  -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="废物俗称" prop="vfName">
              <el-input
                v-model="formInline.vfName"
                placeholder="请输入"
                style="width: 400px"
                :disabled="!lookFlog"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计量单位">
              <el-input
                placeholder="吨"
                title="吨"
                style="width: 400px"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
                        <el-form-item label="贮存间" prop="storageId">
                            <el-select v-model="formInline.storageId" placeholder="请选择" filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in storageList"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
          <!-- <el-col :span="12">
                        <el-form-item label="颜色" prop="wfColor">
                            <el-select v-model="formInline.wfColor" placeholder="请选择" multiple collapse-tags filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in wf_color"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
        </el-row>
        <!--  四行  -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="废物形态" prop="fwForm">
              <el-select
                v-model="formInline.fwForm"
                placeholder="请选择"
               
                collapse-tags
                filterable
                style="width: 400px"
                :disabled="!lookFlog"
              >
                <el-option
                  v-for="item in fw_form"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密度" prop="equipment">
              <div style="display: flex; flex-direction: row">
                <el-input
                  v-model="formInline.equipment"
                  placeholder="请输入"
                  min="0"
                  type="number"
                  style="width: 360px; border: none; height: 100%"
                  :disabled="!lookFlog"
                >
                </el-input>
                <div
                  style="
                    width: 40px;
                    background-color: rgb(221 221 221);
                    height: 34px;
                    line-height: 34px;
                    transform: translateY(3px);
                    text-align: center;
                  "
                >
                  g/m³
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  五行  -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="产生工艺及主要成分" prop="wxFeatures">
              <el-input
                v-model="formInline.wxFeatures"
                style="width: 400px"
                :rows="4"
                maxlength="40"
                type="textarea"
                placeholder="不超过40个字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="禁忌与应急措施" prop="emergency">
              <el-input
                v-model="formInline.emergency"
                style="width: 400px"
                :rows="4"
                type="textarea"
                placeholder="不超过40个字"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
                    <el-col :span="12">
                        <el-form-item label="危险特性" prop="wxFeatures">
                            <el-select v-model="formInline.wxFeatures" placeholder="请选择" multiple collapse-tags filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in wx_features"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
               
                    <el-col :span="12">
                        <el-form-item label="有害物质名称" prop="harmful">
                            <el-input v-model="formInline.harmful" placeholder="有害物质名称" style="width: 400px" :disabled ="!lookFlog"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row> -->
        <!--  六行  -->
        <!-- <el-row>
                     <el-col :span="12">
                        <el-form-item label="危险情况" prop="wxSituation">
                            <el-select v-model="formInline.wxSituation" placeholder="请选择" filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in wx_situation"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="应急措施" prop="measures">
                            <el-select v-model="formInline.measures" placeholder="请选择" filterable style = "width: 400px" :disabled ="!lookFlog">
                                <el-option
                                        v-for="item in measures"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
      </el-form>
      <div style="text-align: center; margin-top: 30px" v-if="lookFlog">
        <el-button type="primary" @click="submitVf()" :disabled="!lookFlog"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "solidStorageEditor",
  data() {
    // var checkNumber = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('请输入密度'));
    //   }
    //   if (value <= 0) {
    //     return callback(new Error('密度不能小于0'));
    //   } else {
    //     callback()
    //   }
    // };
    return {
      vfTypeList: [], // 危废分类
      title: "",
      wfname: "",
      dialogVf: false,
      newOneDialog: false,
      updateId: "",
      lookFlog: true,
      flag: false,
      formInline: {
        vfKind: "",
        fwType: "",
        vfName: "",
        storageId: "",
        emergency: "",
        wfColor: [],
        fwForm: '',
        wxFeatures: "",
        wxSituation: "",
        harmful: "",
        equipment: "",
        measures: "",
        code: "",
        storageFacilitiesId:''
      },
      wfKindList: [], //危废种类
      storageList: [], //储藏间
      wx_situation: [], //危险情况
      wx_features: [], //危险特性
      fw_form: [], //危废形态
      fw_type: [], //危废大类
      storeRoomList:[],
      measures: [], //应急措施
      wf_color: [], //危废颜色
      codeList: [], //危废代码列表
      listRules: {
        vfKind: [
          {
            required: true,
            message: "请选择废物分类",
            trigger: "change",
          },
        ],

        code: [
          {
            required: true,
            message: "请选择危废代码",
            trigger: "blur",
          },
        ],
        vfName: [
          {
            required: true,
            message: "请输入废物俗称",
            trigger: "blur",
          },
        ],
        fwType: [
          {
            required: true,
            message: "请选择废物大类",
            trigger: "change",
          },
        ],
        wfColor: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        fwForm: [
          {
            required: true,
            message: "请选择废物形态",
            trigger: "change",
          },
        ],
        wxFeatures: [
          {
            required: false,
            message: "请选择产生工艺及主要成分",
            trigger: "blur",
          },
        ],
        wxSituation: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        storageId: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        equipment: [
          {
            required: false,
            // validator: checkNumber,
            trigger: "blur",
          },
        ],
        measures: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        emergency: [
          {
            required: false,
            message: "请选择禁忌与应急措施",
            trigger: "blur",
          },
        ],
        harmful: [
          {
            required: true,
            message: "请填写",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.onloadSelect();
    // this.getvfTypeList();
    // this.getDetailsSelectData()
    
  },

  methods: {
    // getDetailsSelectData() {
    //   this.$axios
    //     .get("/api/regulatory/type/getDetailsSelectDataForSolidWaste")
    //     .then((res) => {
    //       if(!res.code) {
    //         this.fw_type = res.data;
    //       }
    //     });
    // },
    getvfTypeList() {
      this.$axios
        .post("/api/regulatory/hazardousWasteCategory/showDicType")
        .then((res) => {
          this.vfTypeList = res.data;
        });
    },
    //
    //加载下拉框
    onloadSelect() {
      var _this = this;
      var params = new URLSearchParams();
      _this.$axios
        .get("/api/regulatory/tStorageFacilities/storageSettingSelects", {
          params,
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.storageList = res.data.storageList;
            _this.wx_situation = res.data.wx_situation;
            _this.wx_features = res.data.wx_features;
            // _this.fw_form = res.data.fw_form;
            // _this.fw_type = res.data.fw_type;
            _this.measures = res.data.measures;
            _this.wf_color = res.data.wf_color;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    closevf() {
      this.clear();
    },
    selectVfInfo(vfCode, co) {
      var _this = this;
      _this.vfTypeList.forEach((item) => {
        if (item.id == vfCode) {
          _this.wfname = item.typeName;
        }
      });
      _this.formInline.code = "";
      _this.$axios
        .get("/api/regulatory/hazardousWasteCategory/getDetailsCodeByDicType", {
          params: { types: this.wfname },
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.codeList = res.data;
            if (res.data.length > 0) {
              if (co == 1) {
                _this.formInline.code = res.data[0].detailsCode;
              }
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    selectFwType (type) {
      this.$axios
        .get(`/api/regulatory/type/getTypeNameListsForSolidWaste/${type}`)
        .then((res) => {
          if (res.code == 0) {
           
          }
        })
        .catch((err) => {
        });
    },
    foursVfKind() {
      if(!this.formInline.fwType) {
        this.$message({
          type: 'info',
          message: '请先选择废物大类'
        })
      }
    },
    submitVf() {
    
      this.$refs["formInline"].validate((valid) => {
        if (valid) {
  
          if (this.flag) {
            this.update();
          } else {
            this.addTcarForm();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    addTcarForm() {
      let self = this;
      let url = "/api/regulatory/commonlysolidwaste/edit";
      self.$axios
        .post(url, {
          classId: self.formInline.vfKind,
          categoryId: self.formInline.fwType,
          name: self.formInline.vfName,
          form: self.formInline.fwForm,
          density: self.formInline.equipment,
          wasteComposition: self.formInline.wxFeatures,
          emergencyMeasure: self.formInline.emergency,
          storageFacilitiesId:self.formInline.storageFacilitiesId
        })
        .then(function (res) {
          if (res.code == 0) {
            self.$message.success("保存成功!");
            self.closePage();
          }
        })
        .catch(function (err) {
          self.$message.error("保存失败，请稍后再试!");
        });
    },

    update() {
      debugger
      let self = this;
      let url = "/api/regulatory/commonlysolidwaste/edit";
      self.$axios
        .post(url, {
          id: self.updateId,
          classId: self.formInline.vfKind,
          categoryId: self.formInline.fwType,
          name: self.formInline.vfName,
          form: self.formInline.fwForm,
          density: self.formInline.equipment,
          wasteComposition: self.formInline.wxFeatures,
          emergencyMeasure: self.formInline.emergency,
          storageFacilitiesId:self.formInline.storageFacilitiesId
        })
        .then(function (res) {
          if (res.code == 0) {
            self.$message.success("编辑成功!");
            self.closePage();
          }
        })
        .catch(function (err) {
          self.$message.error("保存失败，请稍后再试!");
        });
    },

    selectOne(id) {
      let that = this;
      that.updateId = id;
      var url = "/api/regulatory/commonlysolidwaste/wasteProduction";
      that.$axios
        .get(url, {
          params: { id },
        })
        .then(function (res) {
          if (res.code == 0) {
            that.selectVfInfo(res.data.vfKind);
            that.formInline.vfKind = res.data.classId;
            that.formInline.fwType = res.data.categoryId;
               that.formInline.storageFacilitiesId = res.data.storageFacilitiesId;
            
      
            that.formInline.vfName = res.data.name;
            that.formInline.fwForm = res.data.form;
            that.formInline.equipment = Number(res.data.density);
            that.formInline.wxFeatures = res.data.wasteComposition;
            that.formInline.emergency = res.data.emergencyMeasure;
            // that.dialogVf = true;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },

    selectOneForStart(id) {
      let that = this;
      that.updateId = id;
      var url = "/api/regulatory/commonlysolidwaste/wasteProduction";
      that.$axios
        .get(url, {
          params: { id },
        })
        .then(function (res) {
          if (res.code == 0) {
            that.selectVfInfo(res.data.vfKind);
            that.formInline.vfKind = res.data.classId;
            that.formInline.fwType = res.data.categoryId;
               that.formInline.storageFacilitiesId = res.data.storageFacilitiesId;
            that.formInline.vfName = res.data.name;
            that.formInline.fwForm = res.data.form;
            that.formInline.equipment = Number(res.data.density);
            that.formInline.wxFeatures = res.data.wasteComposition;
            that.formInline.emergency = res.data.emergencyMeasure;
            let url = "/api/regulatory/commonlysolidwaste/edit";
      that.$axios
        .post(url, {
          id: that.updateId,
          classId: that.formInline.vfKind,
          categoryId: that.formInline.fwType,
          name: that.formInline.vfName,
          form: that.formInline.fwForm,
          density: that.formInline.equipment,
          wasteComposition: that.formInline.wxFeatures,
          emergencyMeasure: that.formInline.emergency,
        })
        .then(function (res) {
          if (res.code == 0) {       
            // that.$message.success("编辑成功!");
         that.closePage();
          }
        })
        .catch(function (err) {
          that.$message.error("保存失败，请稍后再试!");
        });
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    lookInfoChil(id, bool) {
      let that = this;
      // that.onloadSelect();
      that.lookFlog = bool;
      var id = id;
      var url = "/api/regulatory/storageDetailcode/queryOneById";
      that.$axios
        .get(url, {
          params: { Id: id },
        })
        .then(function (res) {
          if (res.code == 0) {
            that.selectVfInfo(res.data.vfKind);
            that.formInline.vfKind = res.data.typeName;
            that.formInline.fwType = res.data.fwType;
            that.formInline.vfName = res.data.vfName;
            that.formInline.storageId = res.data.storageId;
            that.formInline.wfColor = res.data.wfColor.split(",");
            that.formInline.fwForm = res.data.fwForm;
            that.formInline.wxFeatures = res.data.wxFeatures.split(",");
            that.formInline.wxSituation = res.data.wxSituation;
            that.formInline.harmful = res.data.harmful;
            that.formInline.equipment = res.data.equipment;
            that.formInline.measures = res.data.measures;
            that.formInline.code = res.data.nameConcat;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },

    //关闭弹窗
    closePage() {
      this.$emit("close");
      this.clear();
    },
    cancel() {
      this.clear();
      this.dialogVf = false;
    },
    clear() {
      (this.formInline.vfKind = ""),
        (this.formInline.fwType = ""),
        (this.formInline.storageId = ""),
        (this.formInline.vfName = ""),
        (this.formInline.wfColor = []),
        (this.formInline.fwForm = ''),
        (this.formInline.wxFeatures = ""),
        (this.formInline.wxSituation = ""),
        (this.formInline.harmful = ""),
        (this.formInline.equipment = ""),
        (this.formInline.measures = ""),
        (this.formInline.code = ""),
        (this.formInline.emergency = ""),
        (this.lookFlog = true);
    },

    //危废小项
    closeDialog() {
      this.newOneDialog = false;
      // this.onloadSelect();
    },

    newOne(kind) {
      (this.newChil.vfcode = ""),
        (this.newChil.vfname = ""),
        (this.newChil.vfKind = kind),
        (this.newOneDialog = true);
    },

    addSmall() {
      let self = this;
      self.$refs["newChil"].validate((valid) => {
        if (valid) {
          let url = "/api/regulatory/storageDetailcode/addSmall";
          self.$axios
            .post(url, {
              vfKind: self.newChil.vfKind,
              vfcode: self.newChil.vfcode,
              vfname: self.newChil.vfname,
            })
            .then(function (res) {
              if (res.code == 0) {
                self.$message.success("保存成功!");
                self.selectVfInfo(self.vfCode);
                self.newOneDialog = false;
              } else {
                self.$message.error(res.msg);
              }
            })
            .catch(function (err) {
              self.$message.error("保存失败，请稍后再试!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.table-tr-width-320 {
  width: 320px;
}
.table-tr-width-400 {
  width: 400px;
}
</style>
