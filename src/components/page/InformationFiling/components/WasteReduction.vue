// 危险废物减量化计划
<template>
  <div class="planDetail wasteReduction boxSizing">
    <!-- 减少危险废物产生量的计划 -->
    <!-- rel -->
    <el-form ref="reductionList" :model="reductionList" inline-message>
      <!-- 减少危险废物产生量的计划 -->
      <div>
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>减少危险废物危害性的计划</span>
        </div>
        <!-- <div class="reductionForm left2">
          <ul>
            <li class="rowFlex">
              <div class="line1"><span>序号</span></div>
              <div class="line2"><span>危险废物名称</span></div>
              <div class="line3"><span>本年度计划产生量（吨）</span></div>
              <div :class="view == 2 ? 'line4' : 'line3'">
                <span>备注</span>
              </div>
              <div v-if="view == 2" class="operation">操作</div>
            </li>
            <li
              v-for="(item, index) in reductionList.reductionForm"
              :key="index"
              class="rowFlex"
            >
              <div class="line1">
                <span class="">{{ index + 1 }}</span>
              </div>
              <div class="line2">
                <el-form-item
                  :prop="`reductionForm.${index}.dictDetailCode`"
                  :rules="reductionRules.dictDetailCode"
                >
                  <el-select
                    :disabled="disabled"
                    v-model="item.dictDetailCode"
                    @change="change"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="NameList in hazardousNameList"
                      :key="NameList.value"
                      :label="NameList.name"
                      :value="NameList.value"
                      :disabled="NameList.disabled"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="line3">
                <el-form-item
                  :prop="`reductionForm.${index}.yield`"
                  :rules="reductionRules.yield"
                >
                  <el-input
                    type="number"
                    :disabled="disabled"
                    v-model="item.yield"
                  ></el-input>
                </el-form-item>
              </div>
              <div :class="view == 2 ? 'line4' : 'line3'">
                <el-form-item
                  :prop="`reductionForm.${index}.remarks`"
                  :rules="reductionRules.remarks"
                >
                  <el-input
                    type="text"
                    :disabled="disabled"
                    v-model="item.remarks"
                  ></el-input>
                </el-form-item>
              </div>
              <div
                class="operation"
                v-if="view == 2"
                @click="deleteReduction(index)"
              >
                <i class="el-icon-delete"></i>
              </div>
            </li>
          </ul>
          <div class="addButton" v-if="view == 2" @click="addReduction">
            <i class="el-icon-circle-plus"></i> 新增
          </div>
          <div class="rowFlex countAdd">
            <span>合计上年度计划产生量：</span>
            <el-form-item prop="yield">
              <el-input
                type="text"
                :disabled="disabled"
                v-model="reductionList.yield"
                readonly
              ></el-input>
            </el-form-item>
            <span style="margin-left: 1%">吨</span>
          </div>
        </div> -->

        <el-table
          :data="reductionList.reductionForm"
          height="400"
          max-height="400"
          border
          class="reductionForm"
          style="width: 100%; margin-bottom: 20px">
          <el-table-column
            type="index"
            width="60"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="危险废物名称"
            width="280">
          </el-table-column>
          <el-table-column
            prop="number"
            label="本年度计划产生量（吨）">
            <template slot-scope="scope">
              <el-form-item :prop="`reductionForm.${scope.$index}.yield`" :rules="reductionRules.yield">
                <el-input type="number" :disabled="disabled" v-model="scope.row.yield"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
            <template slot-scope="scope">
              <el-form-item :prop="`reductionForm.${scope.$index}.remarks`" :rules="reductionRules.remarks">
                <el-input type="text" :disabled="disabled" v-model="scope.row.remarks"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <div class="rowFlex countAdd">
          <span>合计上年度计划产生量：</span>
          <el-form-item prop="yield">
            <el-input
              type="text"
              :disabled="disabled"
              v-model="reductionList.yield"
              readonly
            ></el-input>
          </el-form-item>
          <span style="margin-left: 1%">吨</span>
        </div>
      </div>
      <!-- 减少危险废物产生量的计划 -->
      <div>
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>减少危险废物危害性的计划</span>
        </div>
        <div class="textareaCon left2">
          <el-form-item
            prop="wasteDecrementPlan"
            :rules="reductionRules.wasteDecrementPlan"
          >
            <el-input
              type="textarea"
              resize="none"
              :disabled="disabled"
              placeholder="请输入内容"
              v-model="reductionList.wasteDecrementPlan"
              maxlength="1024"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 减少危险废物产生量和危害性的措施 -->
      <div>
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>减少危险废物产生量和危害性的措施</span>
        </div>
        <div class="textareaCon left2">
          <div class="reductionForm2 left2">
            <ul>
              <li class="rowFlex">
                <div class="line1"><span>相关方面</span></div>
                <div class="line2"><span>具体措施</span></div>
              </li>
              <li class="rowFlex">
                <div class="line1">
                  <span class="">改进设计</span>
                </div>
                <div class="line2">
                  <el-form-item
                    prop="improvedDesign"
                    :rules="reductionRules.improvedDesign"
                  >
                    <el-input
                      type="text"
                      :disabled="disabled"
                      v-model="reductionList.improvedDesign"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="rowFlex">
                <div class="line1">
                  <span class="">采用先进的工艺技术和设备</span>
                </div>
                <div class="line2">
                  <el-form-item
                    prop="advancedTechnology"
                    :rules="reductionRules.advancedTechnology"
                  >
                    <el-input
                      type="text"
                      :disabled="disabled"
                      v-model="reductionList.advancedTechnology"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="rowFlex">
                <div class="line1">
                  <span class="">使用清洁的能源和原料</span>
                </div>
                <div class="line2">
                  <el-form-item
                    prop="cleanEnergy"
                    :rules="reductionRules.cleanEnergy"
                  >
                    <el-input
                      type="text"
                      :disabled="disabled"
                      v-model="reductionList.cleanEnergy"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="rowFlex">
                <div class="line1">
                  <span class="">改善管理</span>
                </div>
                <div class="line2">
                  <el-form-item
                    prop="improveManagement"
                    :rules="reductionRules.improveManagement"
                  >
                    <el-input
                      type="text"
                      :disabled="disabled"
                      v-model="reductionList.improveManagement"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="rowFlex">
                <div class="line1">
                  <span class="">危险废物综合利用</span>
                </div>
                <div class="line2">
                  <el-form-item
                    prop="comprehensiveUtilization"
                    :rules="reductionRules.comprehensiveUtilization"
                  >
                    <el-input
                      type="text"
                      :disabled="disabled"
                      v-model="reductionList.comprehensiveUtilization"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="rowFlex">
                <div class="line1">
                  <span class="">提高污染防治水平</span>
                </div>
                <div class="line2">
                  <el-form-item
                    prop="pollutionPrevention"
                    :rules="reductionRules.pollutionPrevention"
                  >
                    <el-input
                      type="text"
                      :disabled="disabled"
                      v-model="reductionList.pollutionPrevention"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
              <li class="rowFlex">
                <div class="line1">
                  <span class="">其他</span>
                </div>
                <div class="line2">
                  <el-form-item prop="other" :rules="reductionRules.other">
                    <el-input
                      type="text"
                      :disabled="disabled"
                      v-model="reductionList.other"
                    ></el-input>
                  </el-form-item>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 保存 -->
      <div class="buttonCon">
        <el-form-item>
          <el-button
            type="primary"
            v-if="view == 2"
            @click="submitForm('reductionList')"
            >保存</el-button
          >
          <el-button v-if="view == 2" @click="resetForm('reductionList')"
            >一键清空 <i class="el-icon-refresh-right"></i>
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
  <!-- 减少危险废物产生量和危害性的措施 -->
</template>
<script>
export default {
  data() {
    return {
      disabled: false,
      view: "",
      hazardousNameList: [],
      reductionList: {
        reductionForm: [
          {
            id: "",
            name: "",
            dictDetailCode: "",
            yield: 0,
            remarks: "",
          },
        ],
        wasteDecrementPlan: "",
        improvedDesign: "",
        advancedTechnology: "",
        cleanEnergy: "",
        improveManagement: "",
        comprehensiveUtilization: "",
        pollutionPrevention: "",
        other: "",
        recordYear: this.$route.query.year,
        yield: 0
      },
      reductionRules: {
        dictDetailCode: [
          { required: true, message: "请选择废物名称", trigger: "change" },
        ],
        yield: [
          { required: true, message: "请输入计划产生量", trigger: "blur" },
        ],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
        wasteDecrementPlan: [
          {
            required: true,
            message: "请输入减少危险废物危害性的计划",
            trigger: "blur",
          },
        ],
        improvedDesign: [
          {
            required: true,
            message: "请输入改进设计",
            trigger: "blur",
          },
        ],
        advancedTechnology: [
          {
            required: true,
            message: "采用先进的工艺技术和设备",
            trigger: "blur",
          },
        ],
        cleanEnergy: [
          {
            required: true,
            message: "使用清洁的能源和原料",
            trigger: "blur",
          },
        ],
        improveManagement: [
          {
            required: true,
            message: "改善管理",
            trigger: "blur",
          },
        ],
        comprehensiveUtilization: [
          {
            required: true,
            message: "危险废物综合利用",
            trigger: "blur",
          },
        ],
        pollutionPrevention: [
          {
            required: true,
            message: "提高污染防治水平",
            trigger: "blur",
          },
        ],
        other: [
          {
            required: true,
            message: "其他",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.initDisabled2();
    this.getNameOption();
  },
  methods: {
    initDisabled2() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    change(item, index) {
      this.resetDisabled();
      this.initDisabled();
    },
    getNameOption() {
      this.$axios
        .get(
          "api/regulatory/tEnterpriseHazardousReductionPlan/getHazardousOption"
        )
        .then((res) => {
          this.hazardousNameList = res.data.map((item) => {
            item.id =  ''
            item.yield = ''
            item.remarks = ''
            item.dictDetailCode = item.value
            return item;
          })
          this.reductionList.reductionForm =  this.hazardousNameList
          this.onloadWasteReduction();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onloadWasteReduction() {
      this.$axios
        .get(
          "api/regulatory/tEnterpriseHazardousReductionPlan/hazardousReductionPlanList/" +
            this.$route.query.year
        )
        .then((res)=> {
          this.reductionList.reductionForm.forEach((item, index) => {
            let obj = res.data.reductionForm.filter((ele) => { return ele.dictDetailCode == item.value})
            if (obj.length > 0) {
              this.$set(item,'yield', obj[0].yield)
              this.$set(item,'remarks', obj[0].remarks)
              this.$set(item,'id', obj[0].id)
            }
          })
          this.reductionList.wasteDecrementPlan = res.data.wasteDecrementPlan;
          this.reductionList.advancedTechnology = res.data.advancedTechnology;
          this.reductionList.cleanEnergy = res.data.cleanEnergy;
          this.reductionList.comprehensiveUtilization = res.data.comprehensiveUtilization;
          this.reductionList.improveManagement = res.data.improveManagement;
          this.reductionList.improvedDesign = res.data.improvedDesign;
          this.reductionList.pollutionPrevention = res.data.pollutionPrevention;
          this.reductionList.other = res.data.other;
          // _this.reductionList.reductionForm = res.data.reductionForm;
          // _this.initDisabled();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    initDisabled() {
      // var reductionForm = this.reductionList.reductionForm;
      // var hazardousNameList = this.hazardousNameList;
      // if (
      //   reductionForm != null &&
      //   reductionForm != undefined &&
      //   reductionForm.length > 0
      // ) {
      //   for (let i of reductionForm) {
      //     if (
      //       hazardousNameList != null &&
      //       hazardousNameList != undefined &&
      //       hazardousNameList.length > 0
      //     ) {
      //       for (let j of hazardousNameList) {
      //         if (i.dictDetailCode == j.value) {
      //           this.$set(j, "disabled", true);
      //         }
      //       }
      //     }
      //   }
      // }
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("此操作将保存填写内容, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            closeOnClickModal: false,
            type: "warning",
          }).then(() => {
            this.$axios
              .post(
                "api/regulatory/tEnterpriseHazardousReductionPlan/saveHazardousReductionPlan",
                this.reductionList
              )
              .then(function (res) {
                _this.$message.success("保存成功");
                _this.$parent.getManangementState();
                _this.onloadWasteReduction();
              })
              .catch(function (error) {
                _this.$message.error("保存失败");
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

    resetDisabled() {
      if (this.hazardousNameList != null && this.hazardousNameList.length > 0) {
        for (let i of this.hazardousNameList) {
          this.$set(i, "disabled", false);
        }
      }
    },
    resetForm(formName) {
      this.$confirm("此操作将清空全部已填写的数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        this.$refs[formName].resetFields();
        this.reductionList.reductionForm = this.hazardousNameList;
        this.resetDisabled();
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

  watch: {
    "reductionList.reductionForm": {
      handler(value) {
        this.reductionList.yield = value.reduce((pre, item) => {
          if (!item.yield) return pre;
          // return pre + +item.yield;
          return this.accAdd(pre, +Number(item.yield))
        }, 0);
      },
      deep: true,
    },
  },
};
</script>
<style>
.wasteReduction .reductionForm .el-table__row .el-form-item{
  margin-bottom: 0 !important;
}
.wasteReduction .reductionForm {
  width: 88%;
}

.wasteReduction .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 29px;
  margin-top: -10px;
}

.wasteReduction .reductionForm ul {
  padding: 0;
  border: 1px solid rgba(151, 151, 151, 0.58);
}

.wasteReduction .reductionForm ul .el-form-item {
  margin-bottom: 0;
}

.wasteReduction .reductionForm ul .el-input__inner {
  line-height: 40;
  height: 40;
  border: 0;
}

.wasteReduction .reductionForm ul .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -10px;
}

.wasteReduction .reductionForm ul .el-form-item__content {
  line-height: 30px;
}

.wasteReduction .reductionForm ul li > div {
  width: 20%;
  border-bottom: 1px solid rgba(151, 151, 151, 0.58);
  border-right: 1px solid rgba(151, 151, 151, 0.58);
  text-align: center;
  line-height: 40px;
}

.wasteReduction .reductionForm ul li > div.operation,
.wasteReduction .reductionForm ul li > div.line1 {
  width: 10%;
}

.wasteReduction .reductionForm ul li > div.line2{
  width: 30%;
}
.wasteReduction .reductionForm ul li > div.line3 {
  width: 30%;
}

.wasteReduction .reductionForm ul li > div:last-child {
  border-right: 0;
}

.wasteReduction .reductionForm ul li:last-child > div {
  border-bottom: 0;
}

.wasteReduction .reductionForm ul li:first-child > div {
  background: rgba(151, 151, 151, 0.1);
}

/*
 */
.wasteReduction .reductionForm2 {
  margin-left: 0%;
  width: 88%;
}

.wasteReduction .reductionForm2 ul {
  padding: 0;
  border: 1px solid rgba(151, 151, 151, 0.58);
}

.wasteReduction .reductionForm2 ul .el-form-item {
  margin-bottom: 0;
}

.wasteReduction .reductionForm2 ul .el-input__inner {
  line-height: 40;
  height: 40;
  border: 0;
}

.wasteReduction .reductionForm2 ul .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -10px;
}

.wasteReduction .reductionForm2 ul .el-form-item__content {
  line-height: 30px;
}

.wasteReduction .reductionForm2 ul li > div {
  width: 20%;
  border-bottom: 1px solid rgba(151, 151, 151, 0.58);
  border-right: 1px solid rgba(151, 151, 151, 0.58);
  text-align: center;
  line-height: 40px;
}

.wasteReduction .reductionForm2 ul li > div.operation,
.wasteReduction .reductionForm2 ul li > div.line1 {
  width: 20%;
}

.wasteReduction .reductionForm2 ul li > div.line2,
.wasteReduction .reductionForm2 ul li > div.line3 {
  width: 80%;
}

.wasteReduction .reductionForm2 ul li > div:last-child {
  border-right: 0;
}

.wasteReduction .reductionForm2 ul li:last-child > div {
  border-bottom: 0;
}

.wasteReduction .reductionForm2 ul li:first-child > div {
  background: rgba(151, 151, 151, 0.1);
}
</style>
