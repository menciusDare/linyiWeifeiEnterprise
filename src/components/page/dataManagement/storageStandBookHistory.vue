<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>数据管理</a
        ><span class="sep">&gt;</span
        ><span class="text-primary">历史数据记录</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <!-- 收起后样式名.filter-more-mini -->
        <div style="padding: 20px 0px 0 2px">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">审核状态：</div>
              <div class="filter-con">
                <div class="el-select w124">
                  <el-select v-model="auditStatus" clearable>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item" v-if="roleType == 9">
              <div class="filter-label">区域选择：</div>
              <div class="filter-con">
                <div class="el-select w124">
                  <el-cascader
                    v-model="regionCode"
                    :options="regionCodeoptions"
                    :props="{ checkStrictly: true }"
                    @change="handleChange"
                    emitPath
                  ></el-cascader>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">
                  <span class="el-input__prefix">
                    <i class="el-input__icon el-icon-search"></i>
                  </span>
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="搜索企业名称"
                    v-model="companyName"
                    class="el-input__inner"
                  />
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button
                  type="button"
                  @click="getEntSSBookHistory"
                  class="button-type"
                >
                  <span>查询</span>
                </button>-->
                <el-button
                  type="button"
                  size="medium"
                  @click="getEntSSBookHistory"
                  class="el-button el-button--primary"
                >
                  <span>查询</span></el-button
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button
                  type="button"
                  @click="downloadTemplate"
                  class="button-type"
                >
                  <span>下载模板</span>
                </button>-->
                <el-button
                  type="button"
                  size="medium"
                  @click="downloadTemplate"
                  class="el-button el-button--primary"
                >
                  <span>下载模板</span></el-button
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <el-upload
                  class="upload-demo"
                  action="/api/regulatory/tEnterpriseStorageStandingBookHistory/importExcel"
                  :http-request="UploadExcel"
                  :before-upload="beforeUpload"
                  :file-list="fileList"
                  accept=".xls"
                  style="float: right"
                >
                  <!--<button
                    type="button"
                    @click="UploadExcel"
                    class="button-type"
                  >
                    <span>上传</span>
                  </button>-->
                  <el-button
                    type="button"
                    size="medium"
                    @click="UploadExcel"
                    class="el-button el-button--primary"
                  >
                    <span>上传</span></el-button
                  >
                </el-upload>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button
                  type="button"
                  @click="openAddSSHistoryDialog"
                  class="button-type"
                >
                  <span>新增</span>
                </button>-->
                <el-button
                  type="button"
                  size="medium"
                  @click="openAddSSHistoryDialog"
                  class="el-button el-button--primary"
                >
                  <span>新增</span></el-button
                >
              </div>
            </li>
          </ul>
        </div>

        <div class="main-container">
          <table class="table-default">
            <thead>
              <tr>
                <th style="text-align: center; width: 6%">序号</th>
                <th style="text-align: center; width: 14%">操作时间</th>
                <th style="text-align: center; width: 14%">操作类型</th>
                <th style="text-align: center; width: 10%">危废名称</th>
                <th style="text-align: center; width: 10%">危废代码</th>
                <th style="text-align: center; width: 10%">危废类别</th>
                <th style="text-align: center; width: 10%">数量(KG)</th>
                <th style="text-align: center; width: 10%">贮存容器</th>
                <!-- <th style="text-align:center;width: 10%">容器个数</th> -->
                <th style="text-align: center; width: 10%">经办人</th>
                <th style="text-align: center; width: 10%">转移公司</th>
                <th style="text-align: center; width: 10%">转移时间</th>
                <th style="text-align: center; width: 10%">审核状态</th>
                <th style="text-align: center; width: 10%">溯源码</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in tableDatas" :key="item.id">
                <td style="text-align: center; width: 6%">
                  {{ pageSize * (cur_page - 1) + i + 1 }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 14%;
                  "
                  :title="item.storageTime"
                >
                  {{ item.storageTime }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.operationTypeStr"
                >
                  {{ item.operationTypeStr }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.dictDetailName"
                >
                  {{ item.dictDetailName }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.dictDetailCode"
                >
                  {{ item.dictDetailCode }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.dictTypeName"
                >
                  {{ item.dictTypeName }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.number"
                >
                  {{ item.number }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.containerName"
                >
                  {{ item.containerName }}
                </td>
                <!-- <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.containerNumber"
                >1</td>-->
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.userName"
                >
                  {{ item.userName }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.transferCompanyName"
                >
                  {{ item.transferCompanyName }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.transferDate"
                >
                  {{ item.transferDate }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.auditStatusStr"
                >
                  {{ item.auditStatusStr }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 10%;
                  "
                  :title="item.sourceTracing"
                >
                  {{ item.sourceTracing }}
                </td>
                <!-- <td style="text-align:center;width: 10%">
              <a href="javascript:;" class="text-primary text-underline" @click="details(item,2)">查看</a>
                </td>-->
              </tr>
            </tbody>
          </table>

          <div class="el-pagination is-background mt-lg">
            <span class="el-pagination__total"
              >共 {{ total }} 条，每页显示</span
            >
            <span class="el-pagination__total">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cur_page"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="total"
              ></el-pagination>
            </span>

            <span class="el-pagination__total">共 {{ totalPage }} 页</span>
          </div>
        </div>
      </div>
      <el-dialog
        title="订单流转信息"
        :visible.sync="dialogVisible"
        class="dlogBox"
        :modal-append-to-body="false"
        width="60%"
      >
        <div>
          <div class="modal-bd">
            <!-- 危废 -->
            <div class="wf-info">
              <div class="wf-hd">
                <div class="wf-time">
                  <i class="icon icon-time"></i>
                  {{ tableData.time }}
                </div>
              </div>
              <div class="wf-bd">
                <table class="table-text">
                  <tr>
                    <td>
                      <div class="list-name">危废名称：</div>
                      <div class="list-text">
                        {{ tableData.dictDetailName }}
                      </div>
                    </td>
                    <td>
                      <div class="list-name">数量(KG)：</div>
                      <div class="list-text">{{ tableData.number }}</div>
                    </td>
                    <td>
                      <div class="list-name">贮存容器：</div>
                      <div class="list-text">{{ tableData.containerName }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="list-name">危废类别：</div>
                      <div class="list-text">{{ tableData.dictTypeName }}</div>
                    </td>
                    <td>
                      <div class="list-name">危废代码：</div>
                      <div class="list-text">
                        {{ tableData.dictDetailCode }}
                      </div>
                    </td>
                    <td>
                      <div class="list-name">经办人：</div>
                      <div class="list-text">{{ tableData.userName }}</div>
                    </td>
                    <td v-if="tableData.type == 4">
                      <div class="list-name">完成时间：</div>
                      <div class="list-text">{{ tableData.completeTime }}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <!-- 处置 -->
            <div class="cz-cont mt">
              <div class="code-box">
                <img
                  :src="
                    tattachment
                      ? imgurl + tattachment.locationUrl
                      : '../../../../static/css/images/code.png'
                  "
                  alt
                  class="code-pic"
                />
                <div class="code-text">
                  {{ tableData.sourceTracing }}
                  <!--预留相关内容文字描述放置两行-->
                </div>
              </div>
              <div class="step-box step03">
                <ol class="step-list">
                  <li class="is-active" style="height: unset" v-if="cz">
                    <div class="step-time">
                      <span class="time-text">利用处置</span>
                    </div>
                    <div class="step-icon">
                      <span class="step-num"></span>
                      <div class="step-line" style="height: unset"></div>
                    </div>
                    <div class="qiye-con">
                      <div class="qiye-item">
                        <div>处置企业：</div>
                        <div>{{ regionName }} {{ entName }}</div>
                      </div>
                      <div class="qiye-item">
                        <div>处置时间：</div>
                        <div>{{ cz.time }}</div>
                      </div>
                    </div>
                  </li>
                  <li
                    :class="cz ? '' : 'is-active'"
                    style="height: unset"
                    v-if="zy"
                  >
                    <div class="step-time">
                      <span class="time-text">转移</span>
                    </div>
                    <div class="step-icon">
                      <span class="step-num"></span>
                      <div class="step-line" style="height: unset"></div>
                    </div>
                    <div class="qiye-con">
                      <div class="qiye-item">
                        <div>承运企业：</div>
                        <div>{{ zy.regionName }} {{ zy.entName }}</div>
                      </div>
                      <div class="qiye-item">
                        <div>车辆：</div>
                        <div>{{ zy.cardNo }}</div>
                      </div>
                      <div class="qiye-item">
                        <div>承运人：</div>
                        <div>{{ zy.contacts }}</div>
                      </div>
                      <div class="qiye-item">
                        <div>运输时间：</div>
                        <div>{{ zy.time }}</div>
                      </div>
                      <div class="qiye-item">
                        <div>五联单：</div>
                        <div>{{ zy.fivefoldSheet }}</div>
                      </div>
                    </div>
                  </li>

                  <li
                    :class="cz || zy ? '' : 'is-active'"
                    style="height: unset"
                    v-if="zc"
                  >
                    <div class="step-time">
                      <span class="time-text">贮存</span>
                    </div>
                    <div class="step-icon">
                      <span class="step-num"></span>
                      <div class="step-line" style="height: unset"></div>
                    </div>
                    <div class="qiye-con">
                      <div class="qiye-item">
                        <div>贮存企业：</div>
                        <div>{{ regionName }} {{ entName }}</div>
                      </div>
                      <div class="qiye-item">
                        <div>接收时间：</div>
                        <div>{{ zc.time }}</div>
                      </div>
                    </div>
                  </li>
                  <li
                    :class="cz || zy || zc ? '' : 'is-active'"
                    style="height: unset"
                    v-if="sc"
                  >
                    <div class="step-time">
                      <span class="time-text">生产</span>
                    </div>
                    <div class="step-icon">
                      <span class="step-num"></span>
                      <div class="step-line" style="height: unset"></div>
                    </div>
                    <div class="qiye-con">
                      <div class="qiye-item">
                        <div>生产企业：</div>
                        <div>{{ regionName }} {{ entName }}</div>
                      </div>
                      <div class="qiye-item">
                        <div>接收时间：</div>
                        <div>{{ sc.time }}</div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="新增"
        :visible.sync="addHistorydialogVisible"
        width="50%"
        :modal-append-to-body="false"
        :before-close="handleClose"
      >
        <el-form
          :inline="true"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="操作时间" prop="storageTime">
            <el-date-picker
              v-model="form.storageTime"
              type="datetime"
              style="width: 220px"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="操作类型" prop="operationType">
            <el-select
              v-model="form.operationType"
              placeholder="请选择操作类型"
              style="width: 220px"
            >
              <el-option label="入库" value="1"></el-option>
              <el-option label="出库" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="贮存设施" prop="storageId">
            <el-select
              v-model="form.storageId"
              placeholder="请选择贮存设施"
              @change="storageChange"
              style="width: 220px"
            >
              <el-option
                v-for="item in storageOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量（KG）" prop="number">
            <el-input
              v-model="form.number"
              type="number"
              style="width: 220px"
            ></el-input>
          </el-form-item>
          <el-form-item label="危废名称" prop="dictDetailName">
            <el-select
              v-model="form.dictDetailCode"
              @change="change"
              @focus="focus"
              placeholder="请选择"
              style="width: 220px"
            >
              <el-option
                v-for="itemtype in sysDetails"
                :key="itemtype.code"
                :label="itemtype.name"
                :value="itemtype.code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="危废代码">
            <el-input
              type="text"
              v-model="form.dictDetailCode2"
              style="width: 220px"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="危废类别">
            <el-input
              type="text"
              v-model="form.dictTypeName"
              style="width: 220px"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <el-form-item label="贮存容器" prop="containerId">
            <el-select
              v-model="form.containerId"
              placeholder="请选择贮存容器"
              style="width: 220px"
            >
              <el-option v-for="item in containereOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
<!--              <el-option label="包" value="35"></el-option>
              <el-option label="桶" value="15"></el-option>
              <el-option label="盒" value="19"></el-option>-->
            </el-select>
          </el-form-item>

          <el-form-item label="转移公司">
            <el-select
              v-model="form.transferCompanyId"
              placeholder="请选择"
              style="width: 220px"
            >
              <el-option
                v-for="item in tranferCompanys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="溯源码" prop="sourceTracing">
            <el-input
              v-model="form.sourceTracing"
              style="width: 220px"
            ></el-input>
          </el-form-item> -->
          <el-form-item label="转移时间">
            <el-date-picker
              v-model="form.transferDate"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              style="width: 220px"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="addSSHistory">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import downloadFile from "../../common/unit/DownloadFile2";
export default {
  name: "SSHistory",
  data() {
    return {
      containereOptions:[],
      fileList: [],
      maxStorage: "",
      companyName: "",
      auditStatus: "",
      form: {
        storageTime: "",
        operationType: "",
        number: "",
        userName: "",
        dictDetailCode: "",
        dictDetailCode2: "",
        dictTypeName: "",
        dictDetailName: "",
        containerId: "",
        transferCompanyId: "",
        transferDate: "",
        sourceTracing: "",
        storageId: "",
        createdBy: sessionStorage.getItem("userId"),
      },
      roleType: sessionStorage.getItem("roleType"),
      sysDetails: [],
      sysDetails1: [],
      tranferCompanys: [],
      addHistorydialogVisible: false,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      dialogVisible: false,
      totalPage: 0,
      entId: "",
      entName: "",
      regionName: "",
      regionCode: "",
      regionCodeoptions: [],
      port: "/api/regulatory/",
      tableDatas: [],
      tableData: {},
      imgurl: this.IMG_URL,
      zc: null,
      cz: null,
      sc: null,
      zy: null,
      tattachment: null,
      storageOptions: [],
      options: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "未审核",
          value: 0,
        },
        {
          label: "审核通过",
          value: 1,
        },
        {
          label: "审核拒绝",
          value: -1,
        },
      ],
      YearOptions: [
        {
          value: "",
          label: "全部年份",
        },
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2020",
          label: "2020",
        },
      ],
      rules: {
        storageTime: [
          { required: true, message: "请输入操作时间", trigger: "blur" },
        ],
        operationType: [
          { required: true, message: "请选择操作类型", trigger: "change" },
        ],
        dictDetailName: [
          { required: true, message: "请选择危废名称", trigger: "change" },
        ],
        number: [
          { required: true, message: "请填写数量（KG）", trigger: "blur" },
          // { validator: maxNumber, trigger: "blur" },
        ],
        containerId: [
          { required: true, message: "请填写贮存容器", trigger: "blur" },
        ],
        storageId: [
          { required: true, message: "请填写贮存设施", trigger: "blur" },
        ],
        transferCompanyName: [
          { required: true, message: "请选择转移公司", trigger: "change" },
        ],
        // sourceTracing: [
        //   { required: true, message: "请填写溯源码", trigger: "blur" },
        // ],
        transferDate: [
          { required: true, message: "请选择转移时间", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getInfo();
    this.getDetailsSelectData();
    this.getTransferList();
    this.getStorageFacilitiesList();
    this.getCityOptions1();
  },
  methods: {
    focus() {
      if (this.sysDetails == null || this.sysDetails.length <= 0) {
        this.$message("请先选择贮存设施");
      }
    },
    handleChange(value) {
      this.regionCode = value[value.length - 1];
    },
    getCityOptions1() {
      if (this.roleType == 9) {
        this.getCityOptions();
      }
    },
    storageChange(id) {
      this.getHazardousNameListsById(id);
    },
    getHazardousNameListsById(id) {
      let _this = this;
      _this.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBookHistory/getHazardousNameListsById/" +
            id
        )
        .then(function (response) {
          if (response.data != null) {
            _this.sysDetails = response.data;
          }
        })
        .catch(function (err) {});
    },
    getCityOptions() {
      let self = this;
      let params = new URLSearchParams();
      params.append("regionId", "0");
      self.$axios
        .post("/api/regulatory/regionInfo/getRegionTree/", params)
        .then((res) => {
          self.regionCodeoptions = res.data[0].children;
        });
    },

    beforeUpload(file) {
      let fileTypes = ["application/vnd.ms-excel"];
      const isLt10M = file.size / 1024 / 1024 < 20;
      const isXLS = fileTypes.includes(file.type);
      if (!isXLS) {
        this.$message.error("文件必须是.xls格式");
      }
      if (!isLt10M) {
        this.$message.error("文件大小不超过20M！");
      }
      return isXLS && isLt10M;
    },
    //excel表格上传
    UploadExcel(params) {
      let self = this;
      let formData = new FormData();
      console.log("params", params);
      formData.append("file", params.file);
      self
        .$axios({
          url: params.action,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: sessionStorage.getItem("token"),
          },
          data: formData,
        })
        .then((res) => {
          if (res.data) {
            this.$message({
              message: "导入成功！",
              type: "success",
            });

            this.getInfo();
          } else {
            this.$message.error(
              "导入失败！请检查excel表格中的时间格式是否正确,请按照2020/0/0 0:00:00格式书写，注意前后不要有空格"
            );
          }
        })
        .catch(function (err) {
          console.log(err);
        });
        this.fileList = [];
    },
    //下载模板
    downloadTemplate() {
      let _this = this;
      _this.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBookHistory/exportExcel",
          { responseType: "blob" }
        )
        .then(function (response) {
          downloadFile(response);
        })
        .catch(function (err) {
          _this.$message(
            "本系统中无此登录人公司的贮存设施数据，请先添加贮存设施数据"
          );
        });
    },
    chooseStatus(item) {
      if (item == -1) {
        return "审核拒绝";
      } else if (item == 0) {
        return "未审核";
      } else if (item == 1) {
        return "审核通过";
      }
    },
    addSSHistory() {
      console.log("form", this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let self = this;
          // self.form.storageTime = self.form.date1 + " " + self.form.time1;
          // self.form.transferDate = self.form.date2 + " " + self.form.time2;
          self.$axios
            .post(
              "/api/regulatory/tEnterpriseStorageStandingBookHistory/addSSHistory",
              this.form
            )
            .then((res) => {
              if (res.code == 0 && res.data != null) {
                this.$message({
                  message: "添加成功！",
                  type: "success",
                });
                this.handleClose();
                this.getInfo();
              }
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getStorageFacilitiesList() {
      let self = this;
      self.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBookHistory/getStorageFacilitiesList"
        )
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.storageOptions = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getTransferList() {
      let self = this;
      self.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBookHistory/getTransferList"
        )
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.tranferCompanys = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getDetailsSelectData() {
      let self = this;
      self.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBookHistory/getHazardousNameLists"
        )
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.sysDetails1 = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    openAddSSHistoryDialog() {
      var option = this.sysDetails1;
      console.log("option", option);
      if (option == null || option == undefined || option.length <= 0) {
        this.$message(
          "本系统中无此登录人公司的贮存设施数据，请先添加贮存设施数据"
        );

        return false;
      }
      var storageOptions = this.storageOptions;
      console.log("storageOptions", storageOptions);
      if (
        storageOptions == null ||
        storageOptions == undefined ||
        storageOptions.length <= 0
      ) {
        this.$message(
          "本系统中无此登录人公司的贮存设施数据，请先添加贮存设施数据"
        );
        return false;
      }
      this.initContainere();
      this.addHistorydialogVisible = true;
    },

    getInfo() {
      let self = this;
      self.$axios
        .get("/api/regulatory/tVideocamera/getEntIdAndCompanyName")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            (self.entId = res.data.id), (self.entName = res.data.name);
            self.regionName = res.data.regionCode;
            this.getEntSSBookHistory();
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleClose() {
      this.addHistorydialogVisible = false;
      this.form = {
        storageTime: "",
        operationType: "",
        number: "",
        userName: "",
        dictDetailCode: "",
        dictTypeName: "",
        dictDetailName: "",
        containerId: "",
        transferCompanyId: "",
        transferDate: "",
        sourceTracing: "",
        storageId: "",
        createdBy: sessionStorage.getItem("userId"),
      };
      this.maxStorage = "";
      this.sysDetails = [];
      this.$refs["form"].resetFields();
    },
    //企业贮存台账历史记录数据
    getEntSSBookHistory() {
      var _this = this;
      _this.$axios
        .post(
          _this.port +
            "tEnterpriseStorageStandingBookHistory/getEntSSBookHistory",
          {
            page: _this.cur_page,
            limit: _this.pageSize,
            entId: _this.entId,
            auditStatus: _this.auditStatus,
            companyName: _this.companyName,
            regionCode: _this.regionCode,
          }
        )
        .then((response) => {
          if (response.code == 0) {
            _this.tableDatas = response.data.records;
            _this.total = response.data.total;
            _this.totalPage = response.data.pages;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },

    //溯源
    selectentErpriseBookTraceability(sourceTracing) {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectentErpriseBookTraceability", {
          sourceTracing: sourceTracing,
        })
        .then((response) => {
          if (response.code == 0) {
            _this.sc = null;
            _this.zc = null;
            _this.zy = null;
            _this.cz = null;
            _this.tattachment = response.data.tattachment;
            response.data.list.forEach((element) => {
              if (element.type == "sc") {
                _this.sc = element;
              } else if (element.type == "zc") {
                _this.zc = element;
              } else if (element.type == "zy") {
                _this.zy = element;
              } else if (element.type == "cz") {
                _this.cz = element;
              }
            });
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error);
        });
    },
    splitCode(code) {
      if (code != null && code != undefined) {
        return code.split("#")[0];
      }
    },
    change(code) {
      var option = this.sysDetails;
      if (
        option != null &&
        option != undefined &&
        option.length > 0 &&
        code != null
      ) {
        for (let i of option) {
          if (code === i.code) {
            this.form.dictDetailName = i.name;
            this.form.dictDetailCode2 = this.splitCode(i.code);
            this.form.dictTypeName = i.typeName;
          }
        }
      }
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.getEntSSBookHistory();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getEntSSBookHistory();
    },
    backPage() {
      this.$router.push({ name: "enterpriseMonitor" });
    },
    details(item, type) {
      this.dialogVisible = true;
      this.selectentErpriseBookTraceability(item.sourceTracing);
      this.tableData = item;
      if (type == 1) {
        this.tableData.time = item.productionTime;
      } else if (type == 2) {
        this.tableData.time = item.storageTime;
      } else if (type == 3) {
        this.tableData.time = item.transferTime;
      } else if (type == 4) {
        this.tableData.time = item.acceptTime;
      }
      this.tableData.type = type;
      console.log(this.tableData);
    },
    initContainere() {
      var _this = this;
      _this.$axios.get("/api/regulatory/type/getTypeOptionsList/14").then((res) => {
        _this.containereOptions = res.data;
      });
    },
  },
};
</script>

<style scoped>
</style>