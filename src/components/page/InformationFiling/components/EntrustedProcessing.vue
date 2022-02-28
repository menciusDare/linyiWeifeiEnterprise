// 危险废物委托利用处置情况
<template>
  <el-form
    :model="entrustedList"
    status-icon
    ref="entrustedList"
    class="boxSizing"
    inline-message
  >
    <div class="planDetail entrystedProcessing boxSizing boxShadow">
      <!-- 单位介绍 -->
      <div class="">
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>基本信息</span>
        </div>
        <div
          class="entrystedIntroduce"
          v-for="(item, index) in entrustedList.introduceList"
          :key="index"
        >
          <div class="lineTitle rowFlex">
            <span>危险废物委托利用处置单位名称</span>
            <span>许可证编号</span>
          </div>
          <ul class="introduceMain">
            <li class="rowFlex">
              <div class="line1">
                <el-form-item
                  :prop="`introduceList.${index}.entrustEnterpriseName`"
                  :rules="listRules.entrustEnterpriseName"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.entrustEnterpriseName"
                    placeholder="请输入单位名称"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`introduceList.${index}.licence`"
                  :rules="listRules.licence"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.licence"
                    placeholder="请输入许可证编号"
                  ></el-input>
                </el-form-item>
              </div>
            </li>
            <li>
              <ul class="">
                <li class="rowFlex liMain">
                  <div class="line3"><span>序号</span></div>
                  <div class="line4"><span>危险废物的名称</span></div>
                  <div class="line5"><span>利用处置方式</span></div>
                  <div class="line6">
                    <span>上年度实际委托利用处置量（吨）</span>
                  </div>
                  <div class="line7">
                    <span>本年度计划委托利用处置量（吨）</span>
                  </div>
                  <div class="operation"></div>
                </li>
                <li
                  class="liMain rowFlex"
                  v-for="(mainItem, mainIndex) in item.listMain"
                  :key="mainIndex"
                >
                  <div class="line3">
                    <span class="">{{ mainIndex + 1 }}</span>
                  </div>
                  <div class="line4">
                    <el-form-item
                      :prop="`introduceList.${index}.listMain.${mainIndex}.hazardousCode`"
                      :rules="listRules.hazardousCode"
                    >
                      <!-- <el-input
                        type="text"
                        v-model="mainItem.hazardousName"
                        style="border: 0"
                      ></el-input> -->
                      <el-select
                      :disabled="disabled"
                        v-model="mainItem.hazardousCode"
                        placeholder="请选择危废名称"
                      >
                        <el-option
                          v-for="item in sysDetails"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="line5">
                    <el-form-item
                      :prop="`introduceList.${index}.listMain.${mainIndex}.disposalMethod`"
                      :rules="listRules.disposalMethod"
                    >
                      <!-- <el-input
                        type="text"
                        v-model="mainItem.disposalMethod"
                        style="border: 0"
                      ></el-input> -->
                      <el-select
                      :disabled="disabled"
                        v-model="mainItem.disposalMethod"
                        placeholder="请选择处置利用方式"
                      >
                        <el-option
                          v-for="item in disposeTypeList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="line6">
                    <el-form-item
                      :prop="`introduceList.${index}.listMain.${mainIndex}.lastYearNumber`"
                      :rules="listRules.lastYearNumber"
                    >
                      <el-input
                        type="number"
                        :disabled="disabled"
                        v-model="mainItem.lastYearNumber"
                        style="border: 0"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="line7">
                    <el-form-item
                      :prop="`introduceList.${index}.listMain.${mainIndex}.thisYearNumber`"
                      :rules="listRules.thisYearNumber"
                    >
                      <el-input
                        type="number"
                        :disabled="disabled"
                        v-model="mainItem.thisYearNumber"
                        style="border: 0"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div
                    class="operation operationDel"
                    v-if="view == 2"
                    @click="deleteIntroduce(index, mainIndex)"
                  >
                    <div><i class="el-icon-delete"></i>删除</div>
                  </div>
                </li>
                <div class="operationAdd">
                  <div
                    class="addButton"
                    v-if="view == 2"
                    @click="addIntroduce(index)"
                  >
                    <i class="el-icon-circle-plus"></i> 新增
                  </div>
                </div>
              </ul>
            </li>
            <div
              class="deleteButton"
              v-if="view == 2"
              @click="deleteReduction(index)"
            >
              <i class="el-icon-circle-close"></i>
            </div>
            <div class="deleteButton" v-else></div>
          </ul>
        </div>
        <div class="addButton" v-if="view == 2" @click="addReduction">
          <i class="el-icon-circle-plus"></i> 添加新单位
        </div>
      </div>
      <div class="rowFlex countAdd">
        <span>合计本年度计划委托利用处置量：</span>
        <el-form-item>
          <el-input
            type="text"
            :disabled="disabled"
            readonly
            v-model="entrustedList.thisYearCount"
          ></el-input>
        </el-form-item>
        <span style="margin-left: 1%">吨</span>
      </div>
      <!-- 上年度实际委托利用处置量： -->
      <div class="rowFlex countAdd">
        <span>上年度实际委托利用处置量：</span>
        <el-form-item>
          <el-input
            type="text"
            :disabled="disabled"
            readonly
            v-model="entrustedList.lastYearCount"
          ></el-input>
        </el-form-item>
        <span style="margin-left: 1%">吨</span>
      </div>
      <!-- 保存 -->
      <div class="buttonCon">
        <el-form-item>
          <el-button
            v-if="view == 2"
            type="primary"
            @click="submitForm('entrustedList')"
            >保存</el-button
          >
          <el-button v-if="view == 2" @click="resetForm('entrustedList')"
            >一键清空 <i class="el-icon-refresh-right"></i>
          </el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      disabled:false,
      sysDetails: [],
      disposeTypeList: [],
      view: "",
      entrustedList: {
        introduceList: [
          {
            id: "",
            entrustEnterpriseName: "",
            licence: "",
            recordYear: this.$route.query.year,
            listMain: [
              {
                id: "",
                hazardousName: "",
                hazardousCode: "",
                disposalMethod: "",
                lastYearNumber: "",
                thisYearNumber: "",
              },
            ],
          },
        ],
      },
      listRules: {
        entrustEnterpriseName: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
        ],
        licence: [
          { required: true, message: "请输入许可证编号", trigger: "blur" },
        ],
        hazardousCode: [
          { required: true, message: "请选择废物名称", trigger: "change" },
        ],
        disposalMethod: [
          { required: true, message: "请选择处置方式", trigger: "change" },
        ],
        lastYearNumber: [
          { required: true, message: "请输入多少吨", trigger: "blur" },
        ],
        thisYearNumber: [
          { required: true, message: "请输入多少吨", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.initDisabled();
    this.getDetailsSelectData();
    this.getDisposeType();
  },
  methods: {
    initDisabled() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    getDisposeType() {
      let self = this;
      self.$axios
        .get("/api/regulatory/type/getDisposeType")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.disposeTypeList = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getDetailsSelectData() {
      let self = this;
      self.$axios
        .get("/api/regulatory/tEnterpriseHazardousReductionPlan/getHazardousOption")
        .then((res) => {
          if (res.code === 0 && res.data != null) {
            self.sysDetails = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    addReduction() {
      const introduceList = {
        entrustEnterpriseName: "",
        licence: "",
        recordYear: this.$route.query.year,
        listMain: [
          {
            id: "",
            hazardousName: "",
            disposalMethod: "",
            lastYearNumber: "",
            thisYearNumber: "",
          },
        ],
      };
      this.entrustedList.introduceList.push(introduceList);
    },
    deleteReduction(parentIndex) {
      this.$confirm("此操作将永久删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let id = this.entrustedList.introduceList[parentIndex].id;
        if (id != undefined && id !== null && id !== "") {
          this.$axios
            .delete("api/regulatory/tEnterpriseHazardousEntrustHandle/" + id)
            .then((res) => {
              if (res.code == 0 && res.data) {
                this.entrustedList.introduceList.splice(parentIndex, 1);
                this.$message.success("删除成功!");
              } else {
                this.$message.error("删除失败");
              }
            });
        } else {
          this.entrustedList.introduceList.splice(parentIndex, 1);
          this.$message.success("删除成功!");
        }
      });
    },
    deleteIntroduce(parentIndex, mainIndex) {
      this.$confirm("此操作将永久删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let id = this.entrustedList.introduceList[parentIndex].listMain[
          mainIndex
        ].id;
        if (id != undefined && id !== null && id !== "") {
          this.$axios
            .delete(
              "api/regulatory/tEnterpriseHazardousEntrustHandle/handle/" + id
            )
            .then((res) => {
              if (res.code == 0 && res.data) {
                this.entrustedList.introduceList[+parentIndex].listMain.splice(
                  mainIndex,
                  1
                );
                this.$message.success("删除成功!");
              } else {
                this.$message.error("删除失败");
              }
            });
        } else {
          this.entrustedList.introduceList[+parentIndex].listMain.splice(
            mainIndex,
            1
          );
          this.$message.success("删除成功!");
        }
      });
    },
    addIntroduce(parentIndex) {
      const listMain = {
        hazardousName: "",
        hazardousCode: "",
        disposalMethod: "",
        lastYearNumber: "",
        thisYearNumber: "",
      };
      this.entrustedList.introduceList[+parentIndex].listMain.push(listMain);
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this
            .$confirm("此操作将提交填报信息, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              closeOnClickModal: false,
              type: "warning",
            })
            .then(() => {
              this.$axios
                .post(
                  "api/regulatory/tEnterpriseHazardousEntrustHandle/saveEnterpriseHazardousEntrustInfo",
                  _this.entrustedList.introduceList
                )
                .then(function (res) {
                  if (res.data != null && res.data) {
                    _this.$message.success("保存成功");
                  } else {
                    _this.$message.warning("保存失败");
                  }
                  _this.onloadProcessing();
                  _this.$parent.getManangementState();
                })
                .catch(function (res) {
                  _this.$message.warning("保存失败");
                });
            });
        } else {
          _this.$message({
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
      });
    },
    onloadProcessing() {
      let _this = this;
      this.$axios
        .get(
          "api/regulatory/tEnterpriseHazardousEntrustHandle/getEnterpriseHazardousEntrustInfo?recordYear=" +
            this.$route.query.year
        )
        .then(function (res) {
          _this.entrustedList.introduceList = res.data;
        });
    },
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
  mounted() {
    this.onloadProcessing();
  },
  watch: {
    "entrustedList.introduceList": {
      handler(value) {
        this.entrustedList.thisYearCount = value
          .map((item) => {
            return item.listMain.reduce((pre, n) => {
              if (!n.thisYearNumber) return pre;
              // return pre + +n.thisYearNumber;
              return this.accAdd(pre, +n.thisYearNumber)
            }, 0);
          })
          .reduce((count, i) => {
            return count + +i;
          }, 0);
        this.entrustedList.lastYearCount = value
          .map((item) => {
            return item.listMain.reduce((pre, n) => {
              if (!n.lastYearNumber) return pre;
              // return pre + +n.lastYearNumber;
              return this.accAdd(pre, +n.lastYearNumber)
            }, 0);
          })
          .reduce((count, i) => {
            return count + +i;
          }, 0);
      },
      deep: true,
    },
  },
};
</script>
<style>
.entrystedProcessing .entrystedIntroduce {
  width: 95%;
  margin-bottom: 20px;
}

.entrystedProcessing .lineTitle > span {
  display: block;
  width: 60%;
  padding-left: 1%;
  box-sizing: border-box;
}

.entrystedProcessing .lineTitle > span:first-child {
  width: 40%;
}

.entrystedProcessing .introduceMain {
  border: 1px solid rgba(151, 151, 151, 0.58);
  position: relative;
}

.entrystedProcessing .introduceMain .el-form-item {
  margin-bottom: 0;
}

.entrystedProcessing .introduceMain > li:first-child > div .el-input__inner {
  background: rgba(151, 151, 151, 0.1);
  border-radius: 1px;
  height: 40px;
  line-height: 40px;
}

.entrystedProcessing .introduceMain > li > div.line1 .el-input__inner,
.entrystedProcessing .introduceMain li > div.line2 .el-input__inner {
  border: 0;
}

.entrystedProcessing .introduceMain > li > div.line1 {
  width: 40%;
  border-right: 1px solid rgba(151, 151, 151, 1);
  border-bottom: 1px solid rgba(151, 151, 151, 1);
}

.entrystedProcessing .introduceMain > li > div.line2 {
  width: 60%;
  border-bottom: 1px solid rgba(151, 151, 151, 1);
}

.entrystedProcessing .introduceMain .liMain {
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.entrystedProcessing .introduceMain .liMain > div {
  line-height: 40px;
  width: 25%;
  text-align: left;
  padding-left: 1%;
  box-sizing: border-box;
}

.entrystedProcessing .introduceMain .liMain > div.line4,
.entrystedProcessing .introduceMain .liMain > div.line5 {
  width: 15%;
}

.entrystedProcessing .introduceMain .liMain > div.line3 {
  width: 5%;
}

.entrystedProcessing .introduceMain .liMain > div.operation {
  width: 6%;
  padding-left: 0;
  display: flex;
  justify-content: center;
  margin-left: 2%;
  border-radius: 4px;
  cursor: pointer;
}

.entrystedProcessing .introduceMain .liMain > div.operationDel {
  background-color: rgba(0, 0, 0, 0.25);
}

.entrystedProcessing .introduceMain .operationAdd {
  width: 100%;
  padding-left: 2%;
  box-sizing: border-box;
}

.entrystedProcessing .liMain.tableMain {
  margin-bottom: 20px;
}

.entrystedProcessing .deleteButton {
  position: absolute;
  right: -20px;
  top: -20px;
  color: rgba(151, 151, 151, 1);
  font-size: 20px;
}

.entrystedProcessing .el-form-item__error--inline,
.selfDisposal .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 27px;
  margin-top: -10px;
}
</style>
