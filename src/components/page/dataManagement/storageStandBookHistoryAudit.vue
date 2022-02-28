<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>数据管理</a><span class="sep">&gt;</span><span
              class="text-primary">历史数据审核</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
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
                <!--<button type="button" @click="getEntSSBookHistoryAudit" class="button-type">
                  <span>查询</span>
                </button>-->
                <el-button
                  type="button"
                  size="medium"
                  @click="getEntSSBookHistoryAudit"
                  class="el-button el-button--primary"
                >
                  <span>查询</span></el-button
                >
              </div>
            </li>

            <li class="filter-item">
              <div class="filter-btn">
                <!--<button type="button" @click="batchAudit" class="button-type">
                  <span>批量审核</span>
                </button>-->
                <el-button
                  type="button"
                  size="medium"
                  @click="batchAudit"
                  class="el-button el-button--primary"
                >
                  <span>批量审核</span></el-button
                >
              </div>
            </li>
          </ul>
        </div>

        <div class="main-container">
          <table class="table-default">
            <thead>
              <tr>
                <th style="text-align: center; width: 6%">
                  <el-checkbox
                    v-model="allChecked"
                    @change="allCheck"
                  ></el-checkbox>
                </th>
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
                <th style="text-align: center; width: 10%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in tableDatas" :key="item.id">
                <td v-if="item.auditStatus != 0">
                  <el-checkbox v-model="item.checked" disabled></el-checkbox>
                </td>
                <td v-if="item.auditStatus == 0">
                  <el-checkbox v-model="checked" ></el-checkbox>
                </td>

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
                <td style="text-align: center; width: 10%">
                  <!-- <a href="javascript:;" class="text-primary text-underline" @click="details(item,2)">查看</a> -->
                  <a
                    v-if="item.auditStatus == 0"
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="openAuditDialog(item, 2)"
                    >审核</a
                  >
                </td>
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
                    <!-- <td>
                      <div class="list-name">容器个数：</div>
                      <div class="list-text">1桶</div>
                    </td>-->
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
      <!-------------------审核弹窗------------------->
      <el-dialog
        title="审核"
        :visible.sync="auditDialogVisible"
        width="50%"
        :modal-append-to-body="false"
        :before-close="handleClose"
      >
        <p>
          审核信息
          <span style="width: 10px" class="wx border"
            >&nbsp;&nbsp;&nbsp; &nbsp;</span
          >
        </p>

        <br />
        <el-form
          ref="form"
          :rules="rules"
          :model="historyAudit"
          label-width="150px"
          class="auditDetails"
          style="padding: 10px; box-sizing: border-box"
        >
          <el-timeline>
            <div class="feedback_dialog">
              <el-timeline-item
                :timestamp="'审核时间：' + item.auditDate"
                placement="top"
                v-for="(item, index) in historyAuditList"
                :key="index"
              >
                <el-card>
                  <el-row>
                    <el-col :span="4">
                      <h4>审核人：</h4>
                    </el-col>
                    <el-col :span="18">{{ item.auditName }}</el-col>
                  </el-row>
                  <br />
                  <el-row>
                    <el-col :span="4">
                      <h4>审核状态：</h4>
                    </el-col>
                    <el-col :span="18">{{
                      item.status == 1 ? "通过" : "拒绝"
                    }}</el-col>
                  </el-row>
                  <br />

                  <el-row>
                    <el-col :span="4">
                      <h4>审核内容：</h4>
                    </el-col>
                    <el-col
                      :span="18"
                      style="letter-spacing: 1px; line-height: 22px"
                      >{{ item.opinion }}</el-col
                    >
                  </el-row>
                </el-card>
              </el-timeline-item>
            </div>
          </el-timeline>
          <div v-if="itemAuditStatus == 0">
            <el-form-item prop="status" label="审核状态：">
              <el-select v-model="historyAudit.status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="opinion" label="请填写审核意见：">
              <el-input
                type="textarea"
                :rows="6"
                maxlength="200"
                show-word-limit
                v-model="historyAudit.opinion"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item prop="loginUser" label="审核人：">
              <span>{{ loginUser }}</span>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="addHistoryAudit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "SSHistory",
  data() {
    return {
      companyName: "",
      allChecked: false,
      checked: false,
      isBatchAudit: false,
      itemAuditStatus: "",
      historyAuditList: [],
      regionCodeoptions: [],
      regionCode: "",
      historyAudit: {
        status: "",
        opinion: "",
        auditBy: window.sessionStorage.getItem("userId"),
        historyId: "",
      },
      historyAudits: [],
      loginUser: window.sessionStorage.getItem("name"),
      roleType: sessionStorage.getItem("roleType"),
      auditStatus: "",
      dialogVisible: false,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      auditDialogVisible: false,
      totalPage: 0,
      entId: "",
      entName: "",
      regionName: "",
      port: "/api/regulatory/",
      tableDatas: [],
      tableData: {},
      imgurl: this.IMG_URL,
      zc: null,
      cz: null,
      sc: null,
      zy: null,
      tattachment: null,
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
          value: 1,
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
        status: [
          {
            required: true,
            message: "请选择审核状态",
            trigger: "blur",
          },
        ],
        opinion: [
          {
            required: true,
            message: "请填写审核内容",
            trigger: "blur",
          },
        ],
      },
      options: [
        {
          label: "通过",
          value: 1,
        },
        {
          label: "拒绝",
          value: -1,
        },
      ],
    };
  },
  created() {
    this.initData();
    this.getDetailsSelectData();
    this.getTransferList();
    this.getCityOptions1();
  },
  methods: {
    initData() {
      if (this.roleType == 9) {
        this.getEntSSBookHistoryAudit();
      } else {
        this.getInfo();
      }
    },
    getCityOptions1() {
      if (this.roleType == 9) {
        this.getCityOptions();
      }
    },
    handleChange(value) {
      this.regionCode = value[value.length - 1];
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
    allCheck() {
      var self = this;
      if (self.allChecked) {
        for (var i = 0; i < self.tableDatas.length; i++) {
          if (
            self.tableDatas[i].checked == false &&
            self.tableDatas[i].auditStatus != 1
          ) {
            self.tableDatas[i].checked = true;
          }
        }
      } else {
        for (var i = 0; i < self.tableDatas.length; i++) {
          if (
            self.tableDatas[i].checked &&
            self.tableDatas[i].auditStatus != 1
          ) {
            self.tableDatas[i].checked = false;
          }
        }
      }
    },
    //批量审核按钮
    batchAudit() {
      this.isBatchAudit = true;
      var flag = false;
      if (this.tableDatas != null && this.tableDatas.length > 0) {
        for (var i = 0; i < this.tableDatas.length; i++) {
          if (this.tableDatas[i].checked) {
            flag = true;
            break;
          }
        }
      } else {
        this.$message("无数据");
      }
      if (flag) {
        this.auditDialogVisible = true;
      } else {
        this.$message("至少选择一项");
      }
    },
    getSSBkHistoryAuditData(id) {
      let self = this;
      var params = new URLSearchParams();
      params.append("historyId", id);
      self.$axios
        .get(
          "/api/regulatory/tEnterpriseStorageStandingBookHistory/getSSBkHistoryAuditData",
          { params }
        )
        .then((res) => {
          this.historyAuditList = res.data;
        })
        .catch(function (err) {
          console.log(err);
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
    //添加审核 以及批量审核
    addHistoryAudit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let self = this;
          var selIds = [];
          var audit_status = false;
          if (self.isBatchAudit) {
            for (var i = 0; i < self.tableDatas.length; i++) {
              if (self.tableDatas[i].checked) {
                self.historyAudits.push({
                  status: self.historyAudit.status,
                  opinion: self.historyAudit.opinion,
                  auditBy: self.historyAudit.auditBy,
                  historyId: self.tableDatas[i].id,
                });
                if(self.historyAudit.status==1){
                  audit_status = true;
                  selIds.push(self.tableDatas[i].id);
                }
              }
            }
            self.$axios
              .post(
                "/api/regulatory/tEnterpriseStorageStandingBookHistory/addHistoryAudits",
                this.historyAudits
              )
              .then((res) => {
                if (res.code == 0 && res.data != null) {
                  this.$message({
                    message: "审核成功！",
                    type: "success",
                  });
                  this.handleClose();
                  this.initData();
                  // 刷新月报、年报
                  if(audit_status){
                    this.synchroStorageBookHistoryToYearMonthReport(selIds);
                  }
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          } else {
            if(this.historyAudit.status==1){
              audit_status = true;
              selIds.push(this.historyAudit.historyId);
            }
            self.$axios
              .post(
                "/api/regulatory/tEnterpriseStorageStandingBookHistory/addHistoryAudit",
                this.historyAudit
              )
              .then((res) => {
                if (res.code == 0 && res.data != null) {
                  this.$message({
                    message: "审核成功！",
                    type: "success",
                  });
                  this.handleClose();
                  this.initData();
                  // 刷新月报、年报
                  if(audit_status){
                    this.synchroStorageBookHistoryToYearMonthReport(selIds);
                  }
                }
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    synchroStorageBookHistoryToYearMonthReport(ids){
        var self = this;
        let params =new URLSearchParams();
        params.append('ids',ids);
        self.$axios.get("/api/regulatory/entFont/synchroStorageBookHistoryToYearMonthReport",{params}).then((res) => {
            if (res.code == 0) {
                console.log("刷新年报、月报贮存信息成功");
            }else{
                console.log(res.msg);
            }
        }).catch(function (err) {
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
        .get("/api/regulatory/type/getDetailsSelectData")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            self.sysDetails = res.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    openAuditDialog(item) {
      this.auditDialogVisible = true;
      this.historyAudit.historyId = item.id;
      this.getSSBkHistoryAuditData(item.id);
      this.itemAuditStatus = item.auditStatus;
    },

    getInfo() {
      let self = this;
      self.$axios
        .get("/api/regulatory/tVideocamera/getEntIdAndCompanyName")
        .then((res) => {
          if (res.code == 0 && res.data != null) {
            (self.entId = res.data.id), (self.entName = res.data.name);
            self.regionName = res.data.regionCode;
            this.getEntSSBookHistoryAudit();
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      this.cur_page = 1;
      this.pageSize = 10;
      // this.init(tab.name);
    },
    handleClose() {
      this.auditDialogVisible = false;
      this.isBatchAudit = false;
      this.$refs["form"].resetFields();
    },
    //企业贮存台账历史记录数据
    getEntSSBookHistoryAudit() {
      var _this = this;
      _this.$axios
        .post(
          _this.port +
            "tEnterpriseStorageStandingBookHistory/getEntSSBookHistoryAudit",
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
    change(item, index) {
      this.form.dictDetailName = item.name;
      this.form.dictDetailCode = item.code;
      this.form.dictTypeName = item.typeName;
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      // this.init(this.activeName);
      this.getEntSSBookHistoryAudit();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.historyAudits = [];
      this.allChecked = false;
      this.getEntSSBookHistoryAudit();
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
  },
};
</script>

<style scoped>
</style>