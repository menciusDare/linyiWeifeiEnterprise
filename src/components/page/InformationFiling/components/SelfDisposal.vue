// 危险废物自行利用处置情况
<template>
  <div
    class="planDetail selfDisposal boxSizing boxShadow"
    :class="eaTitle == '查看环评' ? 'lookCha' : ''"
  >
    <el-form
      :model="disposalForm"
      status-icon
      ref="disposalForm"
      class="boxSizing"
      inline-message
    >
      <el-form-item
        label="是否存在环评项目信息"
        style="text-algin: left"
        prop="existEa"
        :rules="disposalFormRules.existEa"
      >
        <el-radio-group :disabled="disabled" v-model="disposalForm.existEa">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div v-if="disposalForm.existEa == 1">
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span @click="textaa">环评信息</span>
        </div>
        <!-- 环评信息  -->
        <div>
          <div class="managementMain">
            <ul class="management">
              <li class="rowFlex">
                <div class="line1"><span>序号</span></div>
                <div class="line2"><span>环评名称</span></div>
                <div class="line3"><span>审批文号</span></div>
                <div class="line4"><span>审批单位</span></div>
                <div class="line4"><span>审批日期</span></div>
                <div class="line4"><span>危废总量</span></div>
                <div class="operation">操作</div>
              </li>
              <li
                v-for="(item, index) in disposalForm.eaList"
                :key="index"
                class="rowFlex"
              >
                <div class="line1">
                  <span class="">{{ index + 1 }}</span>
                </div>
                <div class="line2">
                  <el-form-item>
                    {{ item.eaName }}
                  </el-form-item>
                </div>
                <div class="line2">
                  <el-form-item>
                    {{ item.examinationFileId }}
                  </el-form-item>
                </div>
                <div class="line4">
                  <el-form-item>
                    {{ item.examinationUnit }}
                  </el-form-item>
                </div>
                <div class="line4">
                  <el-form-item>
                    {{ item.examinationDate }}
                  </el-form-item>
                </div>
                <div class="line4">
                  <el-form-item>
                    {{ item.amount }}
                  </el-form-item>
                </div>
                <div class="operation" v-if="view == 2">
                  <i class="el-icon-view" @click="viewEa(item, 'view')"></i>
                  <i class="el-icon-edit" @click="viewEa(item, 'edit')"></i>
                  <i
                    class="el-icon-delete"
                    @click="deleteEa(item.id, index)"
                  ></i>
                </div>
                <div class="operation" v-else>
                  <i class="el-icon-view" @click="viewEa(item, 'view')"></i>
                </div>
              </li>
            </ul>
            <div class="addButton" v-if="view == 2" @click="openEaDialog">
              <i class="el-icon-circle-plus"></i> 新增
            </div>
          </div>
        </div>
        <!--是否存在危险废物自行利用处置设施  -->
        <el-form-item
          label="是否存在危险废物自行利用处置设施"
          style="text-algin: left"
          prop="existSelfHandle"
          :rules="disposalFormRules.existSelfHandle"
        >
          <el-radio-group
            :disabled="disabled"
            v-model="disposalForm.existSelfHandle"
          >
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 设施信息 -->
        <div v-if="disposalForm.existSelfHandle == 1">
          <div class="titleName boxSizing">
            <i class="el-icon-arrow-down"></i>
            <span @click="textaa">设施信息</span>
          </div>
          <div>
            <div class="managementMain">
              <ul class="management">
                <li class="rowFlex">
                  <div class="line1"><span>序号</span></div>
                  <div class="line2"><span>环评名称</span></div>
                  <div class="line3"><span>设施名称</span></div>
                  <div class="line4"><span>设施类别</span></div>
                  <div class="line4"><span>设施地址</span></div>
                  <div class="line4"><span>总投资</span></div>
                  <div class="line4"><span>设计能力</span></div>
                  <div class="operation">操作</div>
                </li>
                <li
                  v-for="(item, index) in disposalForm.voluntarilyList"
                  :key="index"
                  class="rowFlex"
                >
                  <div class="line1">
                    <span class="">{{ index + 1 }}</span>
                  </div>
                  <div class="line2">
                    {{ item.eaName }}
                  </div>
                  <div class="line3">
                    {{ item.equipmentName }}
                  </div>
                  <div class="line4">
                    {{ item.equipmentType }}
                  </div>
                  <div class="line4">
                    {{ item.equipmentAddress }}
                  </div>
                  <div class="line4">
                    {{ item.totalInvestment }}
                  </div>
                  <div class="line4">
                    {{ item.designCapability }}
                  </div>
                  <div class="operation" v-if="view == 2">
                    <i
                      class="el-icon-view"
                      @click="viewVoluntarily(item, 'view')"
                    ></i>
                    <i
                      class="el-icon-edit"
                      @click="viewVoluntarily(item, 'edit')"
                    ></i>
                    <i
                      class="el-icon-delete"
                      @click="deleteVoluntarily(item.id, index)"
                    ></i>
                  </div>

                  <div class="operation" v-else>
                    <i
                      class="el-icon-view"
                      @click="viewVoluntarily(item, 'view')"
                    ></i>
                  </div>
                </li>
              </ul>
              <div
                class="addButton"
                v-if="view == 2"
                @click="openVoluntarilyDialog"
              >
                <i class="el-icon-circle-plus"></i> 新增
              </div>
            </div>
          </div>
          <!-- 危险废物自行处置利用情况 -->
          <div class="titleName boxSizing">
            <i class="el-icon-arrow-down"></i>
            <span @click="textaa">危险废物自行处置利用情况</span>
          </div>

          <div>
            <div class="managementMain">
              <ul class="management">
                <li class="rowFlex">
                  <div class="line1"><span>序号</span></div>
                  <div class="line2"><span>设施名称</span></div>
                  <div class="line2"><span>废物名称</span></div>
                  <div class="line2"><span>废物代码</span></div>
                  <div class="line3">
                    <span>本年度计划利用处置量（吨）</span>
                  </div>
                  <div class="line4">
                    <span>上年度实际利用处置量（吨）</span>
                  </div>
                  <div v-if="view == 2" class="operation">操作</div>
                </li>
                <li
                  v-for="(item, index) in disposalForm.managementList"
                  :key="index"
                  class="rowFlex"
                >
                  <div class="line1">
                    <span class="">{{ index + 1 }}</span>
                  </div>
                  <div class="line2">
                    <el-form-item
                      :prop="`managementList.${index}.equipmentName`"
                      :rules="managementRules.equipmentName"
                    >
                      <el-select
                        :disabled="disabled"
                        v-model="item.equipmentName"
                        placeholder="请选择贮存设施"
                      >
                        <el-option
                          v-for="item in disposalForm.voluntarilyList"
                          :key="item.equipmentName"
                          :label="item.equipmentName"
                          :value="item.equipmentName"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="line2">
                    <el-form-item
                      :prop="`managementList.${index}.wasteName`"
                      :rules="managementRules.wasteName"
                    >
                      <el-select
                        v-model="item.tid"
                        :disabled="disabled"
                        @change="change($event, index)"
                        placeholder="请选择危废名称"
                      >
                        <el-option
                          v-for="item in sysDetails"
                          :key="item.tid"
                          :label="item.name"
                          :value="item.tid"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="line3">
                    {{ splitCode(item.dictDetailCode) }}
                  </div>
                  <div class="line4">
                    <el-form-item
                      :prop="`managementList.${index}.thisYearNumber`"
                      :rules="managementRules.thisYearNumber"
                    >
                      <el-input
                        type="number"
                        :disabled="disabled"
                        v-model="item.thisYearNumber"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="line4">
                    <el-form-item
                      :prop="`managementList.${index}.lastYearNumber`"
                      :rules="managementRules.lastYearNumber"
                    >
                      <el-input
                        type="number"
                        :disabled="disabled"
                        v-model="item.lastYearNumber"
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
            <div class="rowFlex countAdd">
              <span>合计本年度计划处置量：</span>
              <el-form-item prop="thisYearNumber">
                <el-input
                  type="text"
                  :disabled="disabled"
                  v-model="disposalForm.thisYearNumber"
                  readonly
                ></el-input>
              </el-form-item>
              <span style="margin-left: 1%">吨</span>
            </div>
            <div class="rowFlex countAdd">
              <span>合计上年度计划处置量：</span>
              <el-form-item prop="lastYearNumber">
                <el-input
                  type="text"
                  :disabled="disabled"
                  v-model="disposalForm.lastYearNumber"
                  readonly
                ></el-input>
              </el-form-item>
              <span style="margin-left: 1%">吨</span>
            </div>
          </div>
        </div>

        <!--  -->
      </div>

      <!-- ------------------------------------------------------------------------------------------- -->
      <div v-if="disposalForm.existEa == 0">
        <div class="textareaCon solutions">
          <div
            style="margin-top: 26px; margin-bottom: 11px"
            class="secondaryTitle"
          >
            无环评原因
          </div>
          <div class="textareaMain">
            <el-form-item prop="solutions" :rules="disposalForm.noEaReason">
              <el-input
                type="textarea"
                resize="none"
                :disabled="disabled"
                placeholder="无环评原因"
                v-model="disposalForm.noEaReason"
                maxlength="250"
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
            @click="submitForm('disposalForm')"
            >保存</el-button
          >
          <el-button v-if="view == 2" @click="resetForm('disposalForm')"
            >一键清空 <i class="el-icon-refresh-right"></i
          ></el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 增加环评信息的弹窗 -->
    <el-dialog
      :title="eaTitle"
      :visible.sync="addEadialogVisible"
      width="854px"
      :modal-append-to-body="false"
      :before-close="handleClose1"
    >
      <el-form
        :inline="true"
        label-position="left"
        ref="eaForm"
        :model="eaForm"
        :rules="EaRules"
      >
        <el-form-item label="环评名称" prop="eaName">
          <el-input
            type="text"
            v-model="eaForm.eaName"
            :disabled="eaDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批文号" prop="examinationFileId">
          <el-input
            type="text"
            v-model="eaForm.examinationFileId"
            :disabled="eaDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批单位" prop="examinationUnit">
          <el-input
            type="text"
            v-model="eaForm.examinationUnit"
            :disabled="eaDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>

        <el-form-item label="审批日期">
          <el-date-picker
            v-model="eaForm.examinationDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            :disabled="eaDisabled"
            style="width: 220px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label-width="183px"
          label="是否含有危险废物产生信息"
          prop="temp2"
        >
          <el-radio-group :style="eaForm.temp2==null?'width:200px':''" :disabled="eaDisabled" v-model="eaForm.temp2">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="危废总量" prop="amount" v-if="eaForm.temp2 == 1">
          <el-input
            v-model="eaForm.amount"
            :disabled="eaDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <!-- 上传部分 -->
      </el-form>
      <el-form>
        <el-form-item>
          <div style="">
            <div></div>
            <el-upload
              class="upload-demo"
              action="/api/permissions/imageController/uploadFile"
              :file-list="fileList"
              :on-success="handleAvatarSuccess"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
              :limit="1"
              :on-exceed="handleExceed"
            >
              <div v-if="eaTitle != '查看环评'" style="margin-left: -410px">
                <span style="margin-left: -74px;">1,仅上传固体废物（危险废物）相关篇章（30M以内）</span>
                <br>
                <span style="margin-left: -28px;">2, 请在文件上传成功提示弹出后点击确定按钮。</span>
                <el-button size="small" type="primary">点击上传</el-button>
              </div>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="eaTitle != '查看环评'" @click="handleClose('eaForm')"
          >取 消</el-button
        >
        <el-button
          type="primary"
          v-if="eaTitle != '查看环评'"
          @click="addEa('eaForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 增加设施弹窗 -->

    <el-dialog
      :title="voluntarilyTitle"
      :visible.sync="addVoluntarilyDialogVisible"
      width="1138px"
      :modal-append-to-body="false"
      :before-close="handleClose2"
    >
      <el-form
        :inline="true"
        ref="voluntarilyForm"
        :model="voluntarily"
        :rules="voluntarilyRules"
        label-width="124px"
      >
        <el-form-item label="环评名称" prop="eaName">
          <el-select
            v-model="voluntarily.eaName"
            :disabled="voluntarilyDisabled"
            placeholder="请选择环评项目"
            style="width: 220px"
          >
            <el-option
              v-for="item in disposalForm.eaList"
              :key="item.eaName"
              :label="item.eaName"
              :value="item.eaName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设施名称" prop="equipmentName">
          <el-input
            type="text"
            v-model="voluntarily.equipmentName"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设施类别" prop="equipmentType">
          <el-input
            type="text"
            v-model="voluntarily.equipmentType"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="总投资" prop="totalInvestment">
          <el-input
            type="number"
            v-model="voluntarily.totalInvestment"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>

        <el-form-item label="设计能力" prop="designCapability">
          <el-input
            type="number"
            v-model="voluntarily.designCapability"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设计使用年限" prop="designServiceLife">
          <el-input
            type="number"
            v-model="voluntarily.designServiceLife"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="投入运行时间" prop="operationTime">
          <el-input
            type="number"
            v-model="voluntarily.operationTime"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="运行费用" prop="operatingExpenses">
          <el-input
            type="number"
            v-model="voluntarily.operatingExpenses"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="投入利用处置效果" prop="useDisposalEffect">
          <el-input
            type="text"
            v-model="voluntarily.useDisposalEffect"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="年总产量" prop="yearYield">
          <el-input
            type="number"
            v-model="voluntarily.yearYield"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="主要设备和数量" prop="equipmentNumber">
          <el-input
            type="text"
            v-model="voluntarily.equipmentNumber"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="设施地址" prop="equipmentAddress">
          <el-input
            type="text"
            v-model="voluntarily.equipmentAddress"
            :disabled="voluntarilyDisabled"
            style="width: 220px"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="污染物排放达标情况"
          label-width="169px"
          prop="isStandard"
        >
          <el-radio-group
            :disabled="voluntarilyDisabled"
            v-model="voluntarily.isStandard"
            style="width: 220px"
          >
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="是否定期检查污染物排放情况"
          label-width="197px"
          prop="isRegular"
        >
          <el-radio-group
            :disabled="voluntarilyDisabled"
            style="width: 220px"
            v-model="voluntarily.isRegular"
          >
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="二次环境污染控制和事故预防措施"
          label-width="254px"
          prop="measures"
        >
          <el-input
            type="textarea"
            v-model="voluntarily.measures"
            :disabled="voluntarilyDisabled"
            :rows="3"
            style="width: 580px"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="voluntarilyTitle != '查看设施'"
          @click="handleClose('voluntarilyForm')"
          >取 消</el-button
        >
        <el-button
          v-if="voluntarilyTitle != '查看设施'"
          type="primary"
          @click="addVoluntarily('voluntarilyForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import downloadImge from "@/components/common/unit/DownloadImge";
const acceptTypes = ["image/jpeg", "image/jpg", "image/png"];
export default {
  data() {
    return {
      disabled: false,
      sysDetails: [],
      view: "",
      dialogImageUrl: "",
      ImgeUrl: "http://10.0.200.26/",
      fileList: [],
      temporaryFile: {
        correlationId: "",
        fileName: "",
      },
      dialogVisible: false,
      addVoluntarilyDialogVisible: false,
      addEadialogVisible: false,
      eaDisabled: false,
      voluntarilyDisabled: false,
      eaTitle: "新增环评",
      voluntarilyTitle: "新增设施",
      //环评对象
      eaForm: {
        eaName: "",
        examinationUnit: "",
        examinationFileId: "",
        examinationDate: "",
        amount: "",
        temp2: "",
        fileName: "",
      },
      //设施对象
      voluntarily: {
        eaName: "",
        assessmentId: "",
        equipmentName: "",
        equipmentType: "",
        equipmentAddress: "",
        totalInvestment: "",
        designCapability: "",
        designServiceLife: "",
        operationTime: "",
        operatingExpenses: "",
        number: "",
        isRegular: "",
        isStandard: "",
        measures: "",
        useDisposalEffect: "",
        yearYield: "",
      },
      //表单总体对象
      disposalForm: {
        existEa: "",
        existSelfHandle: "",
        eaList: [],
        voluntarilyList: [],
        recordYear: this.$route.query.year,
        managementList: [
          {
            id: "",
            name: "",
            thisYearnumber: "",
            lastYearnumber: "",
          },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },

      disposalFormRules: {
        existEa: [
          {
            required: true,
            message: "请选择是否存在环评信息",
            trigger: "change",
          },
        ],
        existSelfHandle: [
          {
            required: true,
            message: "请选择是否存在危险废物自行利用处置设施",
            trigger: "change",
          },
        ],
      },
      EaRules: {
        eaName: [
          { required: true, message: "请输入环评名称", trigger: "blur" },
        ],
        examinationUnit: [
          { required: true, message: "请输入环评单位名称", trigger: "blur" },
        ],
        examinationFileId: [
          { required: true, message: "请输入环评文件号", trigger: "blur" },
        ],
        examinationDate: [
          { required: true, message: "请选择环评时间", trigger: "change" },
        ],
        amount: [{ required: true, message: "请输入总重量", trigger: "blur" }],
        temp2: [
          {
            required: true,
            message: "请选择是否含有危险废物产生信息",
            trigger: "change",
          },
        ],
      },
      voluntarilyRules: {
        eaName: [
          { required: true, message: "请选择环评名称", trigger: "change" },
        ],
        equipmentName: [
          { required: true, message: "请输入设施名称", trigger: "blur" },
        ],
        equipmentType: [
          { required: true, message: "请输入设施类型", trigger: "blur" },
        ],
        totalInvestment: [
          { required: true, message: "请输入总投资", trigger: "blur" },
        ],
        designCapability: [
          { required: true, message: "请输入设计能力", trigger: "blur" },
        ],
        designServiceLife: [
          { required: true, message: "请输入设计使用年限", trigger: "blur" },
        ],
        operationTime: [
          { required: true, message: "请输入投入运行时间", trigger: "blur" },
        ],
        operatingExpenses: [
          { required: true, message: "请输入运行费用", trigger: "blur" },
        ],
        useDisposalEffect: [
          {
            required: true,
            message: "请输入投入利用处置效果",
            trigger: "blur",
          },
        ],
        yearYield: [
          { required: true, message: "请输入总年产量", trigger: "blur" },
        ],
        equipmentNumber: [
          { required: true, message: "请输入主要设备量", trigger: "blur" },
        ],
        equipmentAddress: [
          { required: true, message: "请输入设施地址", trigger: "blur" },
        ],
        isRegular: [
          {
            required: true,
            message: "请选择污染物排放达标情况",
            trigger: "change",
          },
        ],
        isStandard: [
          {
            required: true,
            message: "请选择是否定期检查污染物排放情况",
            trigger: "change",
          },
        ],
        measures: [
          {
            required: true,
            message: "请输入二次环境污染控制和事故预防措施",
            trigger: "blur",
          },
        ],
      },

      managementRules: {
        equipmentName: [
          { required: true, message: "请输入设施名称", trigger: "blur" },
        ],
        tid: [{ required: true, message: "请选择危废名称", trigger: "blur" }],

        thisYearNumber: [
          {
            required: true,
            message: "请输入本年度计划利用处置量",
            trigger: "blur",
          },
        ],
        lastYearNumber: [
          {
            required: true,
            message: "请输入上年度实际利用处置量",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.initDisabled();
    this.getDetailsSelectData();
    this.getEntId();
  },
  methods: {
    initDisabled() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    splitCode(code) {
      if (code != null && code != undefined) {
        return code.split("#")[0];
      }
    },
    //获取企业id
    getEntId() {
      let self = this;
      self.$axios
        .get("/api/regulatory/ReportAndRegister/getEntId")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            var entId = res.data;
            this.loadSelfDisposal(entId);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    change(tid, index) {
      var option = this.sysDetails;
      if (option != null && option.length > 0) {
        for (let i of option) {
          debugger
          if (tid === i.tid) {
            this.disposalForm.managementList[index].dictDetailCode = i.code;
          }
        }
      }
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
    //增加设施
    addVoluntarily(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.voluntarilyTitle == "新增设施") {
            var voluntarily = {
              eaName: this.voluntarily.eaName,
              assessmentId: this.voluntarily.assessmentId,
              equipmentName: this.voluntarily.equipmentName,
              equipmentType: this.voluntarily.equipmentType,
              equipmentAddress: this.voluntarily.equipmentAddress,
              equipmentNumber:this.voluntarily.equipmentNumber,
              totalInvestment: this.voluntarily.totalInvestment,
              designCapability: this.voluntarily.designCapability,
              designServiceLife: this.voluntarily.designServiceLife,
              operationTime: this.voluntarily.operationTime,
              operatingExpenses: this.voluntarily.operatingExpenses,
              number: this.voluntarily.number,
              isRegular: this.voluntarily.isRegular,
              isStandard: this.voluntarily.isStandard,
              measures: this.voluntarily.measures,
              useDisposalEffect: this.voluntarily.useDisposalEffect,
              yearYield: this.voluntarily.yearYield,
            };
            this.disposalForm.voluntarilyList.push(voluntarily);
            this.voluntarily = {};
          }
          this.addVoluntarilyDialogVisible = false;
        } else {
          this.$message({
            message: "存在未填写的必填项！",
            type: "warning",
          });
          return false;
        }
      });
    },
    //查看设施情况
    viewVoluntarily(item, type) {
      if (type == "view") {
        this.voluntarilyDisabled = true;
        this.voluntarilyTitle = "查看设施";
      } else if (type == "edit") {
        this.voluntarilyDisabled = false;
        this.voluntarilyTitle = "编辑设施";
      }
      this.addVoluntarilyDialogVisible = true;
      this.voluntarily = item;
    },
    openVoluntarilyDialog() {
      this.voluntarilyDisabled = false;
      this.voluntarilyTitle = "新增设施";
      this.addVoluntarilyDialogVisible = true;
    },

    //删除设施
    deleteVoluntarily(id, index) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        if (id != null && id != undefined) {
          this.$axios
            .delete(
              "api/regulatory/tEnterpriseHazardousVoluntarilyHandle/deleteVoluntarilyById/" +
                id
            )
            .then((res) => {
              if (res.data != null && res.data) {
                this.disposalForm.voluntarilyList.splice(index, 1);
                this.$message.success("删除成功");
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((res) => {
              this.$message.error("删除失败");
            });
        } else {
          this.disposalForm.voluntarilyList.splice(index, 1);
        }
      });
    },
    //查看环评信息数据
    viewEa(item, type) {
      if (type == "view") {
        this.eaDisabled = true;
        this.eaTitle = "查看环评";
      } else if (type == "edit") {
        this.eaDisabled = false;
        this.eaTitle = "编辑环评";
      }
      this.fileList = [];
      if (
        item.fileName != undefined &&
        item.fileName != null &&
        item.fileName != ""
      ) {
        this.fileList.push({
          name: item.fileName,
          id: item.correlationId,
        });
      }
      this.addEadialogVisible = true;
      this.eaForm = item;
    },

    //删除环评
    deleteEa(id, index) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        if (id != null && id != undefined) {
          this.$axios
            .delete(
              "api/regulatory/tEnterpriseHazardousVoluntarilyHandle/deleteEaById/" +
                id
            )
            .then((res) => {
              if (res.data != null && res.data) {
                this.disposalForm.eaList.splice(index, 1);
                this.$message.success("删除成功");
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((res) => {
              this.$message.error("删除失败");
            });
        } else {
          this.disposalForm.eaList.splice(index, 1);
        }
      });
    },
    //新增环评
    addEa(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.eaTitle == "新增环评") {
            var eaForm = {
              eaName: this.eaForm.eaName,
              examinationUnit: this.eaForm.examinationUnit,
              examinationFileId: this.eaForm.examinationFileId,
              examinationDate: this.eaForm.examinationDate,
              amount: this.eaForm.amount,
              correlationId: this.temporaryFile.correlationId,
              temp2: this.eaForm.temp2,
              fileName: this.temporaryFile.fileName,
            };
            this.disposalForm.eaList.push(eaForm);
          } else if (this.eaTitle == "编辑环评") {
            this.$set(
              this.eaForm,
              "correlationId",
              this.temporaryFile.correlationId
            );
            this.$set(this.eaForm, "fileName", this.temporaryFile.fileName);
          }
          this.eaForm = {};
          this.addEadialogVisible = false;
        } else {
          this.$message({
            message: "存在未填写的必填项！",
            type: "warning",
          });
          return false;
        }
      });
    },
    //打开新增环评的弹窗
    openEaDialog() {
      this.addEadialogVisible = true;
      this.eaDisabled = false;
      this.eaTitle = "新增环评";
    },

    handleClose(formName) {
      this.addEadialogVisible = false;
      this.addVoluntarilyDialogVisible = false;
      this.eaForm = {};
      this.voluntarily = {};
      this.fileList = [];
      this.temporaryFile.correlationId = "";
      this.temporaryFile.fileName = "";
      this.$refs[formName].clearValidate();
    },
    handleClose1() {
      this.addEadialogVisible = false;
      this.eaForm = {};
      this.fileList = [];
      this.temporaryFile.correlationId = "";
      this.temporaryFile.fileName = "";
      this.$refs["eaForm"].clearValidate();
    },
    handleClose2() {
      this.addVoluntarilyDialogVisible = false;
      this.voluntarily = {};
      this.$refs["voluntarilyForm"].clearValidate();
    },
    textaa() {
      console.log(this);
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 30;
      if (!isLt10M) {
        this.$message.error("文件大小不超过30M！");
      }
      return isLt10M;
    },

    beforeRemove(file, fileList) {
      if (this.eaTitle == "查看环评") {
        this.$message("查看时无法删除");
        return false;
      } else {
        return this.$confirm(`确定永久删除 ${file.name}？`);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleRemove(file, fileList) {
      if (file.id != undefined && file.id != null) {
        this.$axios
          .delete("api/regulatory/tattachment/" + file.id)
          .then((res) => {
            if (res.data) {
              this.$message.success("删除成功");
              this.temporaryFile.correlationId = "";
              this.temporaryFile.fileName = "";
              this.$set(this.eaForm, "correlationId", "");
              this.$set(this.eaForm, "fileName", "");
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((res) => {
            this.$message.error("删除失败");
          });
      }
      // this.getEntId();
    },

    handleAvatarSuccess(res, file) {
      if (res.data != null) {
        var attachment = res.data;
        this.$set(attachment, "fileName", file.name);
        this.$set(attachment, "type", 5);
        var url = "api/regulatory/tattachment/add";
        this.$axios({
          url: url,
          method: "post",
          data: attachment,
        }).then((res) => {
          if (res.data != null) {
            var id = res.data;
            // this.$set(this.eaForm,'correlationId',id)
            // this.$set(this.eaForm,'fileName',file.name)
            this.temporaryFile.correlationId = id;
            this.temporaryFile.fileName = file.name;
            this.$message.success("上传成功!");
          }
        });
      }
    },

    addFacilities() {
      const managementList = {
        id: "",
        name: "",
        thisYearnumber: "",
        lastYearnumber: "",
      };
      this.disposalForm.managementList.push(managementList);
    },
    deleteFacilities(index) {
      this.$confirm("此操作将删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      }).then(() => {
        let id = this.disposalForm.managementList[index].id;
        if (id !== null || id !== "") {
          this.$axios
            .delete(
              "api/regulatory/tEnterpriseHazardousVoluntarilyHandleDetails/" +
                id
            )
            .then((res) => {
              if (res.data != null && res.data) {
                this.disposalForm.managementList.splice(index, 1);
                this.$message.success("删除成功");
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((res) => {
              this.$message.error("删除失败");
            });
        } else {
          this.disposalForm.managementList.splice(index, 1);
          this.$message.success("删除成功");
        }
      });
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
                "api/regulatory/tEnterpriseHazardousVoluntarilyHandle/saveHazardousVoluntarilyHandleInfo",
                _this.disposalForm
              )
              .then(function (res) {
                if (res.data != null && res.data) {
                  _this.$message.success("保存成功");
                } else {
                  _this.$message.warning("保存失败");
                }
                _this.disposalForm.imgList = [];
                _this.fileList1 = [];
                _this.getEntId();
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

    loadSelfDisposal(entId) {
      let _this = this;
      this.$axios
        .get(
          "api/regulatory/tEnterpriseHazardousVoluntarilyHandle/getHazardousVoluntarilyHandleInfo?recordYear=" +
            this.$route.query.year +
            "&entId=" +
            entId
        )
        .then((res) => {
          if (res.data != null) {
            _this.disposalForm = res.data;
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
        // this.$refs[formName].resetFields();
        this.disposalForm = {
          eaList: [],
          voluntarilyList: [],
          recordYear: this.$route.query.year,
          managementList: [
            {
              id: "",
              name: "",
              thisYearnumber: "",
              lastYearnumber: "",
            },
          ],
        };
      });
    },
  },

  watch: {
    "disposalForm.managementList": {
      handler(value) {
        this.disposalForm.thisYearNumber = value.reduce((pre, item) => {
          if (!item.thisYearNumber) return pre;
          return pre + +item.thisYearNumber;
        }, 0);
        this.disposalForm.lastYearNumber = value.reduce((pre, item) => {
          if (!item.lastYearNumber) return pre;
          return pre + +item.lastYearNumber;
        }, 0);
      },
      deep: true,
    },
  },
};
</script>
<style>
/* 表单 */
.selfDisposal .companyForm {
  padding-left: 3%;
}

.selfDisposal .companyForm .lineClear .el-form-item__label {
  line-height: 21px;
}

.managementMain ul {
  width: 90%;
  margin: 11px auto 0;
  border: 1px solid rgba(151, 151, 151, 0.58);
}

.managementMain ul li > div {
  width: 25%;
  text-align: center;
  line-height: 40px;
  border-right: 1px solid rgba(151, 151, 151, 0.58);
  border-bottom: 1px solid rgba(151, 151, 151, 0.58);
}

.managementMain ul li > div.line1 {
  width: 10%;
}

.managementMain ul li > div.operation {
  width: 15%;
}

.managementMain ul li > div:last-child {
  border-right: 0;
}

.managementMain ul li:last-child > div {
  border-bottom: 0;
}

.managementMain ul li:first-child > div {
  background: rgba(151, 151, 151, 0.1);
}

.selfDisposal .el-form-item__error--inline,
.selfDisposal .el-form-item__error--inline {
  position: absolute;
  top: 50%;
  right: 27px;
  margin-top: -10px;
}

.managementMain .el-form-item {
  margin-bottom: 0;
}

.managementMain .el-input__inner {
  border: 0;
}

.selectedRadio .el-form-item__label {
  width: 37%;
}

.selfDisposal .secondaryTitle {
  margin-left: 5%;
  margin-top: 10px;
  display: block;
}

.selectedRadio .el-form-item {
  margin-bottom: 0px;
}

.selfDisposal .addButton {
  margin-left: 5%;
  margin-bottom: 20px;
}

.selfDisposal .countAdd {
  margin-left: 5%;
}

.textareaCon .el-form-item__error--inline {
  right: auto;
}

.selfDisposal .el-date-editor.el-input,
.selfDisposal .el-date-editor.el-input__inner {
  width: 100%;
}
.lookCha .el-upload-list__item:hover .el-icon-close {
  display: none;
}
.lookCha .el-upload-list__item.is-success .el-upload-list__item-status-label {
  display: none;
}
</style>
