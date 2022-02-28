// 废物生产情况
<template>
  <div class="planDetail wasteProduction boxShadow boxSizing">
    <el-form
      :model="wasteForm"
      status-icon
      ref="wasteForm"
      class="boxSzing"
      inline-message
    >
      <div class="production waste">
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>详情</span>
        </div>
        <!-- <div class="wasteForm left2">
          <ul>
            <li class="rowFlex">
              <div class="line1">
                <span>序号</span>
              </div>
              <div class="line2">
                <span>危废名称</span>
              </div>
              <div class="line3">
                <span>危废代码</span>
              </div>
              <div class="line3">
                <span>危废类别</span>
              </div>
              <div class="line2">
                <span>有害物质名称</span>
              </div>
              <div class="line3">
                <span>物理性状</span>
              </div>
              <div class="line2">
                <span>危险特征</span>
              </div>
              <div class="line3">
                <span>
                  本年度计划
                  <br />产生量(吨）
                </span>
              </div>
              <div class="line3">
                <span>
                  上年度实际
                  <br />产生量(吨）
                </span>
              </div>
              <div class="line2">来源及生产工序</div>
              <div v-if="view == 2" class="operation">操作</div>
            </li>
            <li
              v-for="(item, index) in wasteForm.wasteList"
              :key="index"
              class="rowFlex"
            >
              <div class="line1">
                <span class>{{ index + 1 }}</span>
              </div>
              <div class="line2"  v-if="view == 2">
                <div style="width: 100%; cursor:pointer;" @click="showSelectDialog(item, index)">{{item.name}} <i style="color: #C0C4CC" class="el-select__caret el-input__icon el-icon-arrow-down"></i></div>

              </div>
              <div class="line2" v-if="view == 1">
                <div>{{item.name}}</div>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`wasteList.${index}.dictDetailCode`"
                  :rules="wasteListRules.dictDetailCode"
                >
                  {{ splitCode(item.dictDetailCode) }}
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  v-if="view == 1"
                  :prop="`wasteList.${index}.typeName`"
                  :rules="wasteListRules.typeName"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.typeName"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  v-else
                  :prop="`wasteList.${index}.typeName`"
                  :rules="wasteListRules.typeName"
                >
                  {{ item.typeName }}
                </el-form-item>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`wasteList.${index}.harmfulName`"
                  :rules="wasteListRules.harmfulName"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.harmfulName"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`wasteList.${index}.physicalProperties`"
                  :rules="wasteListRules.physicalProperties"
                >

                  <el-select
                    :disabled="disabled"
                    v-model="item.physicalProperties"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in physicalSelectData"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="line2 selectedChange">
                <el-form-item
                  :prop="`wasteList.${index}.hazardCharacteristics`"
                  :rules="wasteListRules.hazardCharacteristics"
                >
                  <el-select
                    :disabled="disabled"
                    v-model="item.hazardCharacteristicList"
                    @change="hazardChange($event, index)"
                    multiple
                    collapse-tags
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in hazardSelectData"
                      :key="index"
                      :label="item.name"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`wasteList.${index}.thisYearNumber`"
                  :rules="wasteListRules.lastYearNumber"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.thisYearNumber"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`wasteList.${index}.lastYearNumber`"
                  :rules="wasteListRules.lastYearNumber"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.lastYearNumber"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`wasteList.${index}.productionProcess`"
                  :rules="wasteListRules.productionProcess"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.productionProcess"
                  ></el-input>
                </el-form-item>
              </div>
              <div
                class="operation"
                v-if="view == 2"
                @click="deleteWaste(item, index)"
              >
                <i class="el-icon-delete"></i>
              </div>
            </li>
          </ul>
          <div class="addButton" v-if="view == 2" @click="addWastet">
            <i class="el-icon-circle-plus"></i> 新增
          </div>
        </div> -->

        <el-table :data="wasteForm.wasteList" height="400" max-height="400" border
          style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="危废名称" width="280">
        </el-table-column>
        <el-table-column prop="code" label="危废代码" width="180" :formatter="splitCode"></el-table-column>
        <el-table-column prop="typeName" label="危废类别"></el-table-column>
        <el-table-column prop="harmfulName" label="有害物质名称" :show-overflow-tooltip='true'>
          <!-- <template slot-scope="scope">
              <el-form-item :prop="`wasteList.${scope.$index}.harmfulName`" :rules="wasteListRules.harmfulName">
                <el-input type="text" v-model="scope.row.harmfulName"></el-input>
              </el-form-item>
            </template> -->
        </el-table-column>
        <el-table-column prop="formName" label="物理性状" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="wxName" label="危险特征" :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="thisYearNumber" label="本年度计划产生量（吨）">
          <template slot-scope="scope">
              <el-form-item :prop="`wasteList.${scope.$index}.thisYearNumber`" :rules="wasteListRules.thisYearNumber">
                <el-input type="number" v-model="scope.row.thisYearNumber"></el-input>
              </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="lastYearNumber" label="上年度实际产生量（吨）">
          <template slot-scope="scope">
              <el-form-item :prop="`wasteList.${scope.$index}.lastYearNumber`" :rules="wasteListRules.lastYearNumber">
                <el-input type="number" v-model="scope.row.lastYearNumber"></el-input>
              </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="productionProcess" label="来源及生产工序" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
              <el-form-item :prop="`wasteList.${scope.$index}.productionProcess`" :rules="wasteListRules.productionProcess">
                <el-input type="text" v-model="scope.row.productionProcess"></el-input>
              </el-form-item>
            </template>
        </el-table-column>

        </el-table>
        <div class="rowFlex countAdd left2">
          <span>合计本年度计划产生量：</span>
          <el-form-item prop="lastYearTotal">
            <el-input
              type="text"
              :disabled="disabled"
              v-model="wasteForm.thisYearNumber"
              readonly
            ></el-input>
          </el-form-item>
        </div>
        <div class="rowFlex countAdd left2">
          <span>合计上年度计划产生量：</span>
          <el-form-item prop="lastYearTotal">
            <el-input
              type="text"
              :disabled="disabled"
              v-model="wasteForm.lastYearNumber"
              readonly
            ></el-input>
          </el-form-item>
        </div>
        <div class="buttonCon">
          <el-form-item>
            <el-button
              type="primary"
              v-if="view == 2"
              @click="submitForm('wasteForm')"
              >保存</el-button
            >
            <el-button v-if="view == 2" @click="resetForm('wasteForm')">
              一键清空
              <i class="el-icon-refresh-right"></i>
            </el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <!-- <el-dialog title="编辑危废名称"  :modal-append-to-body="true"  top="15vh"  width="400px"  :visible.sync="inforDialog" append-to-body  @close="closeInfoDialog" :close-on-click-modal="false" >
      危废名称：<el-select
            v-model="tid"
            filterable
            @change="change()"
            placeholder="请选择"
    >
      <el-option
              v-for="(itemtype, index) in sysDetails"
              :key="index"
              :label="itemtype.name"
              :value="itemtype.tid"
      ></el-option>
    </el-select>
    </el-dialog> -->



  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: false,
      physicalSelectData: [],
      hazardSelectData: [],
      view: "",
      recordYear: '',
      sysDetails: [],
      wasteForm: {
        wasteList: [
          {
            name: "",
            code: "",
            typeName: "",
            harmfulName: "",     // 有害物质名称
            physicalProperties: "",  //物理性状
            formName: '',
            wxName: "",  //危险特征
            hazardCharacteristics: '',
            thisYearNumber: "",    // 本年度计划产生量(吨）
            lastYearNumber: "",
            productionProcess: "",
            recordYear: '',
          },
        ],
        thisYearNumber: "",    // 本年度计划产生量(吨）
        lastYearNumber: "",
        readonly: true,
      },
      wasteListRules: {
        // name: [{ required: true, message: "请输入", trigger: "blur" }],
        // code: [{ required: true, message: "请输入", trigger: "blur" }],
        // typeName: [{ required: true, message: "请输入", trigger: "blur" }],
        // harmfulName: [{ required: true, message: "请输入", trigger: "blur" }],
        // physicalProperties: [
        //   { required: true, message: "请输入", trigger: "blur" },
        // ],
        // hazardCharacteristics: [
        //   { required: true, message: "请输入", trigger: "blur" },
        // ],
        thisYearNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        lastYearNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        productionProcess: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      inforDialog: false,
      tid: '',
      litsItem: {},
      litsIndex: 0
    };
  },
  created() {
    this.initDisabled();
    this.getNameOption()
    this.recordYear = this.$route.query.year;
    console.log(this.$route.query.year)
    this.getDetailsSelectData();
    this.getHazardousInfo();
    // this.getPhysicalSelectData();
    // this.getHazardSelectData();
  },
  methods: {
    initDisabled() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    // hazardChange(value, index) {
    //   let hazardCharacteristics = "";
    //   if (value != null && value != undefined && value.length > 0) {
    //     for (let i = 0; i < value.length; i++) {
    //       if (i < value.length - 1) {
    //         hazardCharacteristics += value[i] + ",";
    //       } else {
    //         hazardCharacteristics += value[i];
    //       }
    //     }
    //   }
    //   // this.wasteForm.wasteList[index].hazardCharacteristics ='',
    //   this.wasteForm.wasteList[
    //           index
    //           ].hazardCharacteristics = hazardCharacteristics;
    // },
    // getPhysicalSelectData() {
    //   let self = this;
    //   self.$axios
    //           .get("/api/regulatory/type/getSelectDataByType/" + 5)
    //           .then((res) => {
    //             if (res.code == 0 && res.data != null) {
    //               self.physicalSelectData = res.data;
    //             }
    //           })
    //           .catch(function (err) {
    //             console.log(err);
    //           });
    // },

    // getHazardSelectData() {
    //   let self = this;
    //   self.$axios
    //           .get("/api/regulatory/type/getSelectDataByType/" + 6)
    //           .then((res) => {
    //             if (res.code == 0 && res.data != null) {
    //               self.hazardSelectData = res.data;
    //             }
    //           })
    //           .catch(function (err) {
    //             console.log(err);
    //           });
    // },
    splitCode(row,column) {
      if (row.value != null && row.value != undefined) {
        return row.value.split("#")[0];
      }
    },
    // 危废类别列表

    // 危废名称列表
    getNameOption() {
      let _this = this;
      this.$axios
        .get(
          "api/regulatory/tEnterpriseHazardousReductionPlan/getHazardousOption"
        )
        .then(function (res) {
          _this.wasteForm.wasteList = res.data.map((item) => {
            item.id =  ''
            item.name = item.name
            item.code = item.value
            item.typeName = item.dicType
            item.harmfulName = item.harmfulName
            item.physicalProperties = item.formName
            item.wxName = item.wxName
            item.physicalProperties = item.formCode
            item.thisYearNumber = item.thisYearNumber
            item.lastYearNumber = item.lastYearNumber
            item.productionProcess = item.productionProcess
            item.hazardCharacteristics = item.wxCode
            item.recordYear= _this.recordYear
            // console.log(this.recordYear)
            return item;
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDetailsSelectData() {
      let self = this;
      /*self.$axios
              .get("/api/regulatory/type/getDetailsSelectData")
              .then((res) => {
                if (res.code == 0 && res.data != null) {
                  self.sysDetails = res.data;
                }
              })
              .catch(function (err) {
                console.log(err);
              });*/
    },
    // change(tid, index) {
    //   // console.log("change 函数");
    //   // console.log(this.tid);
    //   // console.log(this.litsIndex);
    //   var option = this.sysDetails;
    //   if (option != null && option != undefined && option.length > 0) {
    //     for (let i of option) {
    //       if (this.tid === i.tid) {
    //         this.wasteForm.wasteList[this.litsIndex].name = i.name;
    //         this.wasteForm.wasteList[this.litsIndex].dictDetailCode = i.code;
    //         this.wasteForm.wasteList[this.litsIndex].typeName = i.typeName;
    //         this.inforDialog = false
    //       }
    //     }
    //   }
    // },
    getHazardousInfo() {
      let self = this;
      self.$axios
              .get(
                      "/api/regulatory/tEnterpriseHazardousInfo/getHazardousInfo/" +
                      self.recordYear
              )
              .then((res) => {
                if (res.code === 0 && res.data != null) {
              self.wasteForm.wasteList.forEach((item, index) => {
            let obj = res.data.filter((ele) => { return ele.dictDetailCode === item.value})
            if (obj.length > 0) {
              this.$set(item,'thisYearNumber', obj[0].thisYearNumber)
              this.$set(item,'lastYearNumber', obj[0].lastYearNumber)
              this.$set(item,'productionProcess', obj[0].productionProcess)
              this.$set(item,'id', obj[0].id)
            }
          })
                  // self.wasteForm.wasteList = res.data;
                  // var wasteList = self.wasteForm.wasteList;
                  // if (wasteList.length > 0) {
                  //   for (let i of wasteList) {
                  //     if (i.hazardCharacteristics != null) {
                  //       self.$set(
                  //               i,
                  //               "hazardCharacteristicList",
                  //               i.hazardCharacteristics.split(",")
                  //       );
                  //     }
                  //   }
                  //   console.log("wasteList", wasteList);
                  // }
                }
              })
              .catch(function (err) {
                console.log(err);
              });
    },

    // addWastet() {
    //   const wasteList = {
    //     name: "请选择",
    //     code: "",
    //     typeName: "",
    //     harmfulName: "",
    //     physicalProperties: "",
    //     hazardCharacteristics: "",
    //     thisYearNumber: "",
    //     lastYearNumber: "",
    //     productionProcess: "",
    //     recordYear: this.recordYear,
    //   };
    //   this.wasteForm.wasteList.push(wasteList);
    // },
    // deleteWaste(item, index) {
    //   this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     closeOnClickModal: false,
    //     type: "warning",
    //   }).then(() => {
    //     if (item.id != null && item.id != undefined) {
    //       let self = this;
    //       let params = self.wasteForm.wasteList;
    //       self.$axios
    //               .delete("/api/regulatory/tEnterpriseHazardousInfo/" + item.id)
    //               .then((res) => {
    //                 if (res.code == 0) {
    //                   self.$message.success("删除成功!");
    //                   self.getHazardousInfo();
    //                 }
    //               })
    //               .catch(function (err) {
    //                 console.log(err);
    //               });
    //     }
    //     this.wasteForm.wasteList.splice(index, 1);
    //   });
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // const {name, code, typeName, harmfulName, physicalProperties, hazardCharacteristics, thisYearNumber, lastYearNumber, productionProcess} = {...this.wasteForm}
          console.log(name);
          this.$confirm("此操作将保存填写内容, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            type: "warning",
          }).then(() => {
            let self = this;
            let params = self.wasteForm.wasteList;
            self.$axios
                    .post(
                            "/api/regulatory/ReportAndRegister/addHazardousInfo",
                            params
                    )
                    .then((res) => {
                      if (res.code == 0) {
                        self.$message.success("添加成功!");
                        this.$parent.getManangementState();
                        self.getHazardousInfo();
                      }
                    })
                    .catch(function (err) {
                      this.$message.error("添加失败！");
                    });
          });
        } else {
          this.$message({
            message: "存在未填写的必填项！",
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
        this.wasteForm = {
          wasteList: [
            {
            name: "",
            value: "",
            dicType: "",
            harmfulName: "",     // 有害物质名称
            formName: "",  //物理性状
            physicalProperties: '',
            wxName: "",  //危险特征
            hazardCharacteristics: '',
            thisYearNumber: "",    // 本年度计划产生量(吨）
            lastYearNumber: "",
            productionProcess: "",
            recordYear: this.$route.query.year,
            },
          ],
          thisYearNumber: "",    // 本年度计划产生量(吨）
            lastYearNumber: "",
          readonly: true,
        };
      });
    },
    // closeInfoDialog() {
    //   this.inforDialog = false
    // },
    // showSelectDialog(item, index) {
    //   this.inforDialog = true
    //   this.litsItem = item
    //   this.litsIndex = index
    //   this.tid = item.tid
    // },
    // 较精度计算浮点数 avascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 返回值：arg1加上arg2的精确结果
    accAdd(arg1, arg2) {
      var r1, r2, m;
      try {
        r1 = (1 * arg1).toString().split(".")[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = (1 * arg2).toString().split(".")[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (arg1 * m + arg2 * m) / m;
    }
  },
  watch: {
    "wasteForm.wasteList": {
      handler(value) {
        this.wasteForm.thisYearNumber = value.reduce((pre, item) => {
          if (!item.thisYearNumber) return pre
          return this.accAdd(pre, +Number(item.thisYearNumber))
        }, 0);
        this.wasteForm.lastYearNumber = value.reduce((pre, item) => {
          if (!item.lastYearNumber) return pre;
          return this.accAdd(pre, +Number(item.lastYearNumber))
        }, 0);
      },
      deep: true,
    },
  },
};
</script>
<style>
.planDetail.wasteProduction .el-select__tags {
  max-width: 100% !important;
}
/* .planDetail.wasteProduction .selectedChange .el-input__suffix {
  right: -3px;
} */
.planDetail.wasteProduction
  .selectedChange
  .el-select
  .el-input
  .el-select__caret {
  font-size: 12px;
}
.production ul {
  border: 1px solid rgba(151, 151, 151, 0.58);
}
.wasteProduction .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 29px;
  margin-top: -10px;
}
.el-table th, .el-table td{
  padding: 0;
}
/* .wasteForm > ul > li {
  border-bottom: 1px solid rgba(151, 151, 151, 0.4);
  text-align: center;
  align-items: center;
  width: 100%;
  height: 34px;
} */
/* .wasteForm > ul > li:first-child {
  height: 45px;
} */
/* .wasteForm .el-form-item__content {
  line-height: 32px;
} */
/* .wasteForm > ul > li > div {
  border-right: 1px solid rgba(151, 151, 151, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
} */
/* .wasteForm > ul > li > div.line1 {
  width: 5%;
}
.wasteForm > ul > li > div.line2 {
  width: 15%;
}
.wasteForm > ul > li > div.line3 {
  width: 10%;
}
.wasteForm > ul > li > div.line4 {
  width: 15%;
}
.wasteForm > ul > li > div.operation {
  width: 5%;
}
.wasteForm > ul > li:last-child {
  border-bottom: 0;
}
.wasteForm > ul > li div:last-child {
  border-right: 0;
}
.wasteForm > ul > li > div .el-form-item {
  margin-bottom: 0;
} */
.wasteForm input.el-input__inner {
  border: none;
  line-height: 32px;
  height: 32px;
}
  /* .el-select-dropdown{
    width: 200px !important;
  } */
</style>
