// 危险废物转移情况
<template>
  <div class="planDetail wasteTransfer boxSizing">
    <el-form
      ref="transferForm"
      :model="transferForm"
      inline-message
      :rules="transferListRules"
    >
      <div>
        <!-- 贮存措施 -->
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>贮存措施</span>
        </div>
        <div class="storageMeasures left2">
          <el-form-item
            label="1、贮存场所是否符合《危险废物贮存污染控制标准》有关要求："
            style="text-algin: left"
            prop="changsuo"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.changsuo"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="2、是否按危险废物特性分类收集、贮存："
            style="text-algin: left"
            prop="classification"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.classification"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="3、是否混合贮存未经安全性处置且性质不相容的危险废物"
            style="text-algin: left"
            prop="mixedstorage"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.mixedstorage"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="4、是否将危险废物混入非危险废物中贮存："
            style="text-algin: left"
            prop="standard"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.standard"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="5、是否通过建设项目环境影响评价审批及竣工环境保护验收："
            style="text-algin: left"
            prop="environmental"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.environmental"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 危险废物贮存设施现状 -->
          <div class="storageFacilities">
            <div class="secondaryTitle">危险废物贮存设施现状</div>
            <div class="storageMain">
              <ul class="storage">
                <li class="rowFlex">
                  <div class="line1"><span>序号</span></div>
                  <div class="line2"><span>设备名称</span></div>
                  <div class="line3"><span>数量</span></div>
                  <div class="line4"><span>类型</span></div>
                  <div class="line5"><span>面积</span></div>
                  <div :class="view == 2 ? 'line6' : 'line8'">
                    <span>贮存能力</span>
                  </div>
                  <div v-if="view == 2" class="operation">操作</div>
                </li>
                <li
                  v-for="(item, index) in transferForm.facilities"
                  :key="index"
                  class="rowFlex"
                >
                  <div class="line1">
                    <span class="">{{ index + 1 }}</span>
                  </div>
                  <div class="line2">
                    <el-form-item
                      :prop="`facilities.${index}.name`"
                      :rules="transferListRules.name"
                    >
                      <el-input
                        type="text"
                        :disabled="disabled"
                        v-model="item.name"
                        style="border: 0"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="line3">
                    <el-form-item
                      :prop="`facilities.${index}.number`"
                      :rules="transferListRules.number"
                    >
                      <el-input
                        type="number"
                        :disabled="disabled"
                        v-model="item.number"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="line4">
                    <el-form-item
                      :prop="`facilities.${index}.type`"
                      :rules="transferListRules.type"
                    >
                      <el-input
                        type="text"
                        :disabled="disabled"
                        v-model="item.type"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="line5">
                    <el-form-item
                      :prop="`facilities.${index}.size`"
                      :rules="transferListRules.size"
                    >
                      <el-input
                        type="text"
                        :disabled="disabled"
                        v-model="item.size"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div :class="view == 2 ? 'line6' : 'line8'">
                    <el-form-item
                      :prop="`facilities.${index}.storageCapacity`"
                      :rules="transferListRules.storageCapacity"
                    >
                      <el-input
                        type="text"
                        :disabled="disabled"
                        v-model="item.storageCapacity"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div
                    class="operation"
                    v-if="view == 2"
                    @click="deleteFacilities(index)"
                  >
                    <i class="el-icon-delete"></i>
                  </div>
                </li>
              </ul>
              <div class="addButton" v-if="view == 2" @click="addFacilities">
                <i class="el-icon-circle-plus"></i> 新增
              </div>
            </div>
          </div>
          <!-- 贮存危险废物情况 -->
          <div class="storageHazard">
            <div style="margin-top: 32px" class="secondaryTitle">
              贮存危险废物情况
            </div>

            <el-table
              :data="transferForm.storageHazard"
              height="400"
              max-height="400"
              border
              class="tableBox"
              style="width: 100%; margin-bottom: 20px">
              <el-table-column
                type="index"
                width="60"
                label="序号"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="wasteType"
                label="类别">
              </el-table-column>
              <el-table-column
                prop="numberPlan"
                label="拟贮存量（吨）">
                <template slot-scope="scope">
                  <el-form-item :prop="`storageHazard.${scope.$index}.numberPlan`" :rules="transferListRules.numberPlan">
                    <el-input type="number"  :disabled="disabled" v-model="scope.row.numberPlan"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="lastYearNumber"
                label="上年度贮存量（吨">
                <template  slot-scope="scope">
                  <el-form-item :prop="`storageHazard.${scope.$index}.lastYearNumber`" :rules="transferListRules.lastYearNumber">
                    <el-input type="number" :disabled="disabled" v-model="scope.row.lastYearNumber" ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="lastYearCount"
                label="截至上年度年底累计贮存量（吨）">
                <template  slot-scope="scope">
                  <el-form-item :prop="`storageHazard.${scope.$index}.lastYearCount`" :rules="transferListRules.lastYearCount">
                    <el-input type="number"  :disabled="disabled" v-model="scope.row.lastYearCount" ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="storageWhy"
                label="贮存原因">
                <template  slot-scope="scope">
                  <el-form-item :prop="`storageHazard.${scope.$index}.storageWhy`" :rules="transferListRules.storageWhy">
                    <el-input :disabled="disabled" v-model="scope.row.storageWhy" ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 贮存过程中采取的污染防治和事故预防措施 -->
          <div class="textareaCon solutions">
            <div
              style="margin-top: 26px; margin-bottom: 11px"
              class="secondaryTitle"
            >
              贮存过程中采取的污染防治和事故预防措施
            </div>
            <div class="textareaMain">
              <el-form-item
                prop="solutions"
                :rules="transferListRules.solutions"
              >
                <el-input
                  type="textarea"
                  resize="none"
                  :disabled="disabled"
                  placeholder="贮存过程中采取的污染防治和事故预防措施"
                  v-model="transferForm.solutions"
                  maxlength="1024"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- 运输措施 -->
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>运输措施</span>
        </div>
        <div class="left2">
          <!-- 3个问题 -->
          <el-form-item
            label="1、运输过程中是否遵守危险货物运输管理的规定："
            style="text-algin: left"
            prop="dangerous"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.dangerous"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="2、是否按危险废物特性分类运输："
            style="text-algin: left"
            prop="classifiedTransportation"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.classifiedTransportation"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="3、是否委托运输："
            style="text-algin: left"
            prop="consignment"
          >
            <el-radio-group
              :disabled="disabled"
              v-model="transferForm.consignment"
            >
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item
            prop="danwei"
            class="line-input"
            :rules="transferListRules.danwei"
          >
            <span>4.单位名称：</span>
            <el-input v-model="transferForm.danwei"></el-input>
          </el-form-item>
          <el-form-item
            prop="yunshu"
            class="line-input"
            :rules="transferListRules.yunshu"
          >
            <span>5.运输资质：</span>
            <el-input v-model="transferForm.yunshu"></el-input>
          </el-form-item> -->

          <div
            style="margin-top: 26px; margin-bottom: 11px"
            class="secondaryTitle"
          >
            运输单位
          </div>
          <div class="transferMain">
            <ul class="storage">
              <li class="rowFlex">
                <div class="line1"><span>序号</span></div>
                <div :class="view == 2 ? 'line2' : 'line3'">
                  <span>单位名称</span>
                </div>
                <div v-if="view == 2" class="operation">操作</div>
              </li>
              <li
                v-for="(item, index) in transferForm.transferEntList"
                :key="index"
                class="rowFlex"
              >
                <div class="line1">
                  <span class="">{{ index + 1 }}</span>
                </div>
                <div :class="view == 2 ? 'line2' : 'line3'">
                  <el-form-item
                    :prop="`transferEntList.${index}.infoId`"
                    :rules="transferListRules.infoId"
                  >
                    <!-- <el-input
                      type="text"
                      v-model="item.infoId"
                      style="border: 0"
                    ></el-input> -->
                    <el-select
                      :disabled="disabled"
                      v-model="item.infoId"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in transferEntList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div
                  class="operation"
                  v-if="view == 2"
                  @click="deleteTransferEnt(index)"
                >
                  <i class="el-icon-delete"></i>
                </div>
              </li>
            </ul>
            <div class="addButton" v-if="view == 2" @click="addTransferEnt">
              <i class="el-icon-circle-plus"></i> 新增
            </div>
          </div>

          <!-- 运输过程中采取的污染防治措施 -->
          <div class="textareaCon transport">
            <div
              style="margin-top: 26px; margin-bottom: 11px"
              class="secondaryTitle"
            >
              运输过程中采取的污染防治措施
            </div>
            <div class="textareaMain">
              <el-form-item
                prop="transport"
                :rules="transferListRules.transport"
              >
                <el-input
                  type="textarea"
                  resize="none"
                  :disabled="disabled"
                  placeholder="如自行运输危险废物的，还应包括工具种类、载重量、使用年限等"
                  v-model="transferForm.transport"
                  maxlength="1024"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
          <!-- 转移计划 -->
          <div class="textareaCon transferPlan">
            <div
              style="margin-top: 26px; margin-bottom: 11px"
              class="secondaryTitle"
            >
              转移计划
            </div>
            <div class="textareaMain">
              <el-form-item
                prop="transferPlan"
                :disabled="disabled"
                :rules="transferListRules.transferPlan"
              >
                <el-input
                  type="textarea"
                  resize="none"
                  :disabled="disabled"
                  placeholder="包括拟转移危险废物种类、数量，拟接收危险废物的单位等"
                  v-model="transferForm.transferPlan"
                  maxlength="1024"
                  show-word-limit
                >
                </el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- 保存 -->
        <div class="buttonCon">
          <el-form-item>
            <el-button
              v-if="view == 2"
              type="primary"
              @click="submitForm('transferForm')"
              >保存</el-button
            >
            <el-button v-if="view == 2"  @click="resetForm('transferForm')"
              >一键清空 <i class="el-icon-refresh-right"></i>
            </el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: false,
      view: "",
      transferEntList: [],
      transferForm: {
        recordYear: this.$route.query.year,
        changsuo: "",
        classification: "",
        mixedstorage: "",
        standard: "",
        environmental: "",
        dangerous: "", // 危险货物
        classifiedTransportation: "",
        consignment: "",
        transport: "", // 三个文本框
        danwei: "",
        yunshu: "",
        solutions: "",
        transferPlan: "",
        facilities: [
          {
            id: "",
            name: "",
            number: "",
            type: "",
            size: "",
            storageCapacity: "",
          },
        ],
        storageHazard: [
          {
            id: "",
            wasteName: "",
            wasteType: "",
            numberPlan: "",
            lastYearNumber: "",
            lastYearCount: "",
            storageWhy: "",
          },
        ],
        transferEntList: [
          {
            tiId: "",
            infoId: "",
          },
        ],
      },
      initStorageHazard: [],
      transferListRules: {
        // 危险废物贮存设施现状
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        number: [{ required: true, message: "请输入数量", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        size: [{ required: true, message: "请输入面积", trigger: "blur" }],
        storageCapacity: [
          { required: true, message: "请输入储存能力", trigger: "blur" },
        ],
        // 贮存危险废物情况
        wasteName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        wasteType: [{ required: true, message: "请输入类型", trigger: "blur" }],
        numberPlan: [
          { required: true, message: "请输入拟贮存量", trigger: "blur" },
        ],
        lastYearNumber: [
          { required: true, message: "请输入贮存量", trigger: "blur" },
        ],
        lastYearCount: [
          { required: true, message: "请输入贮存量", trigger: "blur" },
        ],
        storageWhy: [
          { required: true, message: "请输入贮存原因", trigger: "blur" },
        ],
        danwei: [
          { required: false, message: "请输入运输单位", trigger: "blur" },
        ],
        yunshu: [
          { required: false, message: "请输入运输单位", trigger: "blur" },
        ],
        // 三个文本狂框
        solutions: [
          {
            required: true,
            message: "请输入贮存过程中采取的污染防治和事故预防措施",
            trigger: "blur",
          },
        ],
        transport: [
          {
            required: true,
            message: "请输入运输过程中采取的污染防治措施",
            trigger: "blur",
          },
        ],
        transferPlan: [
          { required: true, message: "请输入转移计划", trigger: "blur" },
        ],
        // 两个输入框 单位和运输资质
        changsuo: [{ required: true, message: "请选择", trigger: "blur" }],
        classification: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        mixedstorage: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        standard: [{ required: true, message: "请选择", trigger: "change" }],
        environmental: [{ required: true, message: "请选择", trigger: "blur" }],
        dangerous: [{ required: true, message: "请选择", trigger: "blur" }],
        classifiedTransportation: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        consignment: [{ required: true, message: "请选择", trigger: "change" }],
        infoId: [
          { required: true, message: "请选择运输企业", trigger: "change" },
        ],
      },
      hazardousNameList: []
    };
  },
  created() {
    this.initDisabled();
    this.getTransferEntList();
    this.getNameOption()
  },
  methods: {
    getNameOption() {
      this.$axios
        .get(
          "api/regulatory/tEnterpriseHazardousReductionPlan/getHazardousOption"
        )
        .then((res) => {
          this.hazardousNameList = res.data.map((item) => {
            item.id =  ''
            item.remarks = ''
            item.numberPlan = ''
            item.lastYearNumber = ''
            item.lastYearCount = ''
            item.storageWhy = ''
            item.wasteType = item.dicType
            item.wasteCode = item.value
            item.dictDetailCode = item.value
            return item;
          })
          this.transferForm.storageHazard =  this.hazardousNameList
          this.onloadWasteTransfer();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    initDisabled() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    getTransferEntList() {
      this.$axios
        .get("api/regulatory/tEnterpriseHazardousTransfer/getTransferEntList")
        .then((res) => {
          if (res.data != null) {
            this.transferEntList = res.data;
          }
        });
    },

    //添加运输企业
    addTransferEnt() {
      var transferEnt = {
        tiId: "",
        infoId: "",
      };
      this.transferForm.transferEntList.push(transferEnt);
    },
    // 危险废物贮存设施现状
    addFacilities() {
      const facilities = {
        id: "",
        name: "",
        number: "",
        type: "",
        size: "",
        storageCapacity: "",
      };
      this.transferForm.facilities.push(facilities);
    },
    deleteTransferEnt(index) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let id = this.transferForm.transferEntList[index].tiId;
        if (id != null && id != "") {
          this.$axios
            .delete(
              "api/regulatory/tEnterpriseHazardousTransfer/deleteTransferById/" +
                id
            )
            .then((res) => {
              if (res.data != null && res.data) {
                this.transferForm.transferEntList.splice(index, 1);
                this.$message.success("删除成功");
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((res) => {
              this.$message.error("删除失败");
            });
        } else {
          this.transferForm.transferEntList.splice(index, 1);
          this.$message.success("删除成功");
        }
      });
    },
    deleteFacilities(index) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let id = this.transferForm.facilities[index].id;
        if (id != null && id != "") {
          this.$axios
            .delete(
              "api/regulatory/tEnterpriseHazardousTransferFacilities/" + id
            )
            .then((res) => {
              if (res.data != null && res.data) {
                this.transferForm.facilities.splice(index, 1);
                this.$message.success("删除成功");
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((res) => {
              this.$message.error("删除失败");
            });
        } else {
          this.transferForm.facilities.splice(index, 1);
          this.$message.success("删除成功");
        }
      });
    },
    submitForm(formName) {
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this
            .$confirm("此操作将保存填写内容, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              closeOnClickModal: false,
              type: "warning",
            })
            .then(() => {
              _this.$axios
                .post(
                  "api/regulatory/tEnterpriseHazardousTransfer/saveHazardousTransferInfo",
                  _this.transferForm
                )
                .then(function (res) {
                  _this.$message.success("保存成功");
                  _this.$parent.getManangementState();
                  _this.onloadWasteTransfer();
                })
                .catch(function (res) {
                  _this.$message.error("保存失败");
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
      this.$confirm("此操作将清空全部已填写的数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        // Object.assign(this.$data, this.$options.data());

        this.transferForm = {
          recordYear: this.$route.query.year,
          changsuo: "",
          classification: "",
          mixedstorage: "",
          standard: "",
          environmental: "",
          dangerous: "", // 危险货物
          classifiedTransportation: "",
          consignment: "",
          transport: "", // 三个文本框
          danwei: "",
          yunshu: "",
          solutions: "",
          transferPlan: "",
          facilities: [
            {
              id: "",
              name: "",
              number: "",
              type: "",
              size: "",
              storageCapacity: "",
            },
          ],
          storageHazard: this.initStorageHazard,
          transferEntList: [
            {
              tiId: "",
              infoId: "",
            },
          ],
        };
        this.$refs[formName].resetFields();
      });
    },
    onloadWasteTransfer() {
      let _this = this;
      this.$axios
        .get(
          "api/regulatory/tEnterpriseHazardousTransfer/getHazardousTransferInfo?recordYear=" +
            this.$route.query.year
        )
        .then((res) => {
            this.transferForm.storageHazard.forEach((item, index) => {
              let obj = res.data.enterpriseHazardousTransferStorageVos.filter((ele) => { return ele.wasteCode == item.value})
              if (obj.length > 0) {
                this.$set(item,'remarks', obj[0].remarks)
                this.$set(item,'id', obj[0].id)
                this.$set(item,'numberPlan', obj[0].numberPlan)
                this.$set(item,'lastYearNumber', obj[0].lastYearNumber)
                this.$set(item,'lastYearCount', obj[0].lastYearCount)
                this.$set(item,'storageWhy', obj[0].storageWhy)
              }
            })
            this.transferForm.changsuo = res.data.isStandard;
            this.transferForm.classification = res.data.isClassification;
            this.transferForm.mixedstorage = res.data.isNature;
            this.transferForm.standard = res.data.isBlend;
            this.transferForm.environmental = res.data.isCheck;
            this.transferForm.dangerous = res.data.isRule;
            this.transferForm.classifiedTransportation =
              res.data.isCharacteristic;
            this.transferForm.danwei = res.data.transportUnit;
            this.transferForm.yunshu = res.data.transportQualifications;
            this.transferForm.consignment = res.data.isEntrust;
            this.transferForm.transport = res.data.transportMeasures;
            this.transferForm.solutions = res.data.storageMeasures;
            this.transferForm.transferPlan = res.data.transferPlan;
            this.transferForm.facilities =
              res.data.enterpriseHazardousTransferFacilitiesVos;
            this.transferForm.transferEntList = res.data.transferEntList;
        });
    },
  },
};
</script>
<style>

.wasteTransfer .el-table__row .el-form-item{
  margin-bottom: 0 !important;
}

.storageMeasures {
  margin-left: 2%;
}

.wasteTransfer .el-form-item__label {
  text-align: left;
  width: 100%;
}

.wasteTransfer .el-form-item__content {
  margin-left: 0;
}

.storageMain.hazardMain ul {
  width: 100%;
}

.storageMain ul {
  border: 1px solid rgba(151, 151, 151, 0.58);
  width: 80%;
}

.storageMain > ul > li {
  border-bottom: 1px solid rgba(151, 151, 151, 0.4);
  text-align: center;
  align-items: center;
  width: 100%;
  height: 40px;
}

.storageMain > ul > li:first-child {
  height: 40px;
}

.storageMain .el-form-item__content {
  line-height: 40px;
}

.storageMain > ul > li > div {
  border-right: 1px solid rgba(151, 151, 151, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.storageMain > ul > li > div.line1 {
  width: 5%;
}

.storageMain > ul > li > div.line2,
.storageMain > ul > li > div.line6 {
  width: 20%;
}

.storageMain > ul > li > div.line3,
.storageMain > ul > li > div.line4,
.storageMain > ul > li > div.line5 {
  width: 15%;
}

.storageMain > ul > li > div.line8 {
  width: 30%;
}

.storageMain.hazardMain ul div.line3 {
  width: 10%;
}

.storageMain.hazardMain ul div.line2 {
  width: 15%;
}

.storageMain.hazardMain ul div.line7 {
  width: 15%;
}
.storageMain.hazardMain ul div.line8 {
  width: 20%;
}

.storageMain ul li:first-child div {
  background: rgba(151, 151, 151, 0.1);
}

.storageMain > ul > li > div.operation {
  width: 10%;
}

.storageMain > ul > li:last-child {
  border-bottom: 0;
}

.storageMain > ul > li div:last-child {
  border-right: 0;
}

.storageMain > ul > li > div .el-form-item {
  margin-bottom: 0;
}

.storageMain input.el-input__inner {
  border: none;
  line-height: 40px;
  /*height: 40px;*/
}

.accidentMain {
  width: 55%;
  height: 249px;
}

.accidentMain .el-textarea__inner {
  height: 249px;
}

.storageFacilities .el-form-item__error--inline,
.storageHazard .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -10px;
}

.line-input .el-input {
  width: 30%;
}

/*  -----------*/

.transferMain.hazardMain ul {
  width: 50%;
}

.transferMain ul {
  border: 1px solid rgba(151, 151, 151, 0.58);
  width: 55%;
}

.transferMain > ul > li {
  border-bottom: 1px solid rgba(151, 151, 151, 0.4);
  text-align: center;
  align-items: center;
  width: 100%;
  height: 40px;
}

.transferMain > ul > li:first-child {
  height: 40px;
}

.transferMain .el-form-item__content {
  line-height: 40px;
}

.transferMain > ul > li > div {
  border-right: 1px solid rgba(151, 151, 151, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.transferMain > ul > li > div.line1 {
  width: 10%;
}

.transferMain > ul > li > div.line2 {
  width: 84%;
}

.transferMain > ul > li > div.line3 {
  width: 90%;
}

.transferMain ul li:first-child div {
  background: rgba(151, 151, 151, 0.1);
}

.transferMain > ul > li > div.operation {
  width: 11%;
}

.transferMain > ul > li:last-child {
  border-bottom: 0;
}

.transferMain > ul > li div:last-child {
  border-right: 0;
}
.transferMain > ul > li > div .el-form-item {
  margin-bottom: 0;
  width: 100%;
}

.transferMain input.el-input__inner {
  border: none;
  line-height: 40px;
  /*height: 40px;*/
}

</style>
