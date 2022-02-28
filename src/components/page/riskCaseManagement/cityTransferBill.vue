<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">转移联单管理</a><span class="sep">&gt;</span
        ><span class="text-primary">市内转移联单</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">联单状态：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select
                    v-model="labelForm.linkedStatus"
                    placeholder="请选择企业类型"
                    clearable
                  >
                    <el-option
                      v-for="item in linkedTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">计划转移时间：</div>
              <div class="filter-con">
                <div class="el-select w320">
                  <el-date-picker
                    v-model="labelForm.time"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="—"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">联单编号：</div>
              <div class="filter-con">
                <div class="el-input w160 el-input-group el-input--prefix">
                  <el-input
                    v-model.trim="labelForm.linkedNo"
                    placeholder="请输入联单编号"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">企业名称：</div>
              <div class="filter-con">
                <div class="el-input w160 el-input-group el-input--prefix">
                  <el-input
                    v-model.trim="labelForm.entName"
                    placeholder="请输入企业名称"
                  >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">筛选：</div>
              <div class="filter-con">
                <div class="el-input w160 el-input-group el-input--prefix">
                  <el-select
                    v-model="labelForm.linkedType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in optionsType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <el-button
                  type="button"
                  size="medium"
                  @click="queryData"
                  class="el-button el-button--primary"
                >
                  <span>查询</span></el-button
                >
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <el-button
                  type="button"
                  size="medium"
                  @click="basiReportList"
                  class="el-button el-button--primary"
                >
                  <span>导出</span></el-button
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="overflowX" style="overflow-x: auto">
        <table class="table-default" v-loading="showLoading">
          <thead>
            <tr>
              <th style="text-align: center; width: 6%">序号</th>
              <th style="text-align: center; width: 8%">联单编号</th>
              <th style="text-align: center; width: 8%">计划转移日期</th>
              <th style="text-align: center; width: 6%">计划转移重量（kg）</th>
              <th style="text-align: center; width: 9%">产废企业</th>
              <th style="text-align: center; width: 9%">接收企业</th>
              <th style="text-align: center; width: 9%">运输公司</th>
              <th style="text-align: center; width: 8%">签收日期</th>
              <th style="text-align: center; width: 6%">实际拉运数量（kg）</th>
              <th style="text-align: center; width: 6%">联单状态</th>
              <th style="text-align: center; width: 10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="tableDatas.length > 0">
              <tr v-for="(item, i) in tableDatas" :key="i">
                <td style="text-align: center; width: 6%">{{ item.index }}</td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 8%;
                  "
                  :title="item.linkedId"
                >
                  {{ item.linkedId }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 8%;
                  "
                  :title="formatterDate(item.plannedTransferTime, 'yyyy-MM-dd')"
                >
                  {{ formatterDate(item.plannedTransferTime, "yyyy-MM-dd") }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 6%;
                  "
                  :title="item.amount"
                >
                  {{ item.amount }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 9%;
                  "
                  :title="item.outEntName"
                >
                  {{ item.outEntName }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 9%;
                  "
                  :title="item.acceptEntName"
                >
                  {{ item.acceptEntName }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 9%;
                  "
                  :title="item.transEntName"
                >
                  <div :class="item.statusClass">{{ item.transEntName }}</div>
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 8%;
                  "
                  :title="formatterDate(item.signDate, 'yyyy-MM-dd')"
                >
                  <div>{{ formatterDate(item.signDate, "yyyy-MM-dd") }}</div>
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 6%;
                  "
                  :title="item.actualAmount"
                >
                  {{ item.actualAmount }}
                </td>
                <td
                  style="
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width: 6%;
                  "
                  :title="filterStatus(item.status)"
                >
                  <span style="color: rgb(56, 158, 13)">{{
                    filterStatus(item.status)
                  }}</span>
                </td>
                <td style="text-align: center; width: 10%">
                  <a
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="showInfo(item.linkedId)"
                    >详情</a
                  >
                  <a
                    v-if="item.buttonStatus == 1"
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="invalidDuplicate(item.linkedId)"
                    >作废</a
                  >
                  <a
                    v-if="item.buttonStatus == 2"
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="shippingConfirm(item.linkedId)"
                    >确认</a
                  >
                  <a
                    v-if="item.buttonStatus == 3"
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="signReceive(item.linkedId)"
                    >签收</a
                  >
                  <a
                    v-if="item.buttonStatus == 4"
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="assigned(item.linkedId)"
                    >指派</a
                  >
                  <a
                    v-if="item.buttonStatus == 5"
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="factory(item.linkedId)"
                    >出厂</a
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="el-pagination is-background mt-lg">
        <span class="el-pagination__total">共 {{ total }} 条，每页显示</span>
        <span class="el-pagination__total">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNumber"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </span>
        <span class="el-pagination__total">共 {{ totalPage }} 页</span>
      </div>
    </div>
    <!-- 指派 -->
    <el-dialog
      title="指派"
      :visible.sync="assignedVisible"
      width="50%"
      :modal-append-to-body="false"
      :before-close="handleAssignedClose"
    >
      <el-form
        ref="assigned"
        :rules="assignedRules"
        :model="assignedForm"
        label-width="120px"
        style="padding: 10px; box-sizing: border-box"
      >
        <el-row type="flex" justify="space-around">
          <el-col style="margin-left: -45px">
            <el-form-item label="驾驶员" prop="driver">
              <el-select
                v-model="assignedForm.driver"
                @change="changeDriver"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in driverList"
                  :key="index"
                  :label="item.driver"
                  :value="item.driver"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="进场车辆" prop="bothCar">
              <el-select v-model="assignedForm.bothCar" placeholder="请选择">
                <el-option
                  v-for="(item, index) in vehicleList"
                  :key="index"
                  :label="item.carNo"
                  :value="item.vehicleId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleAssignedClose">取 消</el-button>
        <el-button type="primary" @click="assignedAudit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 车辆出厂 -->
    <el-dialog
      title="车辆出厂确认"
      :visible.sync="signAfterVisible"
      width="40%"
      :modal-append-to-body="false"
      :before-close="handleSignAfterClose"
    >
      <el-form
        ref="signAfter"
        :rules="signAfterRules"
        :model="signAfterForm"
        label-width="150px"
        style="padding: 10px; box-sizing: border-box"
      >
        <el-row>
          <el-col>
            <el-form-item label="实际拉运数量（kg）" prop="amount">
              <el-input
                type="text"
                placeholder="请输入实际拉运数量"
                v-model="signAfterForm.amount"
                style="width: 200px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleSignAfterClose">取 消</el-button>
        <el-button type="primary" @click="signAfterAudit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import downloadFile from "../../common/unit/DownloadFile";
export default {
  name: "cityTransferBill",
  data() {
    return {
      showLoading: false,
      labelForm: {
        linkedStatus: "",
        time: "",
        linkedNo: "",
        entName: "",
        linkedType: "",
      },
      linkedTypes: [
        { value: 2, label: "待经营签收" },
        { value: 4, label: "已签收" },
        { value: 5, label: "待经营确认" },
        { value: 6, label: "待运输出厂" },
        { value: 7, label: "已作废" },
      ],
      optionsType: [
        {
          value: 1,
          label: "市内互转",
        },
        {
          value: 2,
          label: "本市转本省外市",
        },
        {
          value: 3,
          label: "本省外市转本市",
        },
        {
          value: 4,
          label: "本市转外省",
        },
        {
          value: 5,
          label: "外省转本市",
        },
      ],
      pageNumber: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: 10,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      assignedVisible: false,
      assignedRules: {
        driver: [
          { required: true, message: "请选择驾驶员", trigger: "change" },
        ],
        bothCar: [
          { required: true, message: "请选择进场车辆", trigger: "change" },
        ],
      },
      assignedForm: {
        driver: undefined,
        bothCar: undefined,
      },
      signAfterVisible: false,
      signAfterRules: {
        amount: [
          { required: true, message: "请输入实际拉运数量", trigger: "blur" },
        ],
      },
      signAfterForm: {
        amount: "",
      },
      driverList: [],
      vehicleList: [],
      assignerLinkedId: "",
      factoryLinkedId: "",
    };
  },
  created() {
    this.pageNumber = this.$route.params.currentPage
      ? this.$route.params.currentPage
      : 1;
  },
  mounted() {
    this.getListCityTransferLinked();
  },
  methods: {
    // 作废
    invalidDuplicate(linkedId) {
      this.$confirm("确认作废此转移联单吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      })
        .then(() => {
          let data = new URLSearchParams();
          data.append("linkedId", linkedId);
          this.$axios
            .post(`/api/enterprise/tFiveLinked/cancellationLinked`, data)
            .then((response) => {
              if (response.code === 0) {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
                this.getListCityTransferLinked();
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "连接服务器失败！",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 确认
    shippingConfirm(linkedId) {
      this.$router.push({
        path: "/transferBill",
        query: {
          entId: linkedId,
          currentPage: this.pageNumber,
        },
      });
    },
    // 签收
    signReceive(linkedId) {
      this.$confirm("确认签收吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        type: "warning",
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("linkedId", linkedId);
          this.$axios
            .post("/api/enterprise/tFiveLinked/receivingEntSign", params)
            .then((res) => {
              if (!res.code) {
                this.$message({
                  type: "success",
                  message: "签收成功",
                });
                this.getListCityTransferLinked();
              }
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 指派
    assigned(linkedId) {
      this.$axios
        .get("/api/enterprise/tFiveLinked/listThisEntDriver")
        .then((res) => {
          if (!res.code) {
            const driverList = [];
            for (let key in res.data) {
              driverList.push({
                driver: key,
                bothCar: res.data[key],
              });
            }
            this.assignerLinkedId = linkedId;
            this.driverList = driverList;
            this.assignedVisible = true;
          }
        })
        .catch((err) => {});
    },
    changeDriver() {
      this.assignedForm.bothCar = undefined;
      const array = this.driverList
      for (let index = 0; index < array.length; index++) {
        if (array[index].driver == this.assignedForm.driver) {
          this.vehicleList = array[index].bothCar;
          break;
        }
      }
    },
    // 出厂
    factory(linkedId) {
      this.factoryLinkedId = linkedId;
      this.signAfterVisible = true;
    },
    // 获取市内转移联单列表
    getListCityTransferLinked() {
      this.showLoading = true;
      const params = JSON.parse(JSON.stringify(this.labelForm));
      params["pageNumber"] = this.pageNumber;
      params["pageSize"] = this.pageSize;
      if (this.labelForm.time) {
        params["transportDateStart"] = this.labelForm.time[0] + ' 00:00:00';
        params["transportDateEnd"] = this.labelForm.time[1] + ' 23:59:59';
      }
      delete params.time;
      this.$axios
        .get("/api/enterprise/tFiveLinked/listCityTransferLinked", { params })
        .then((res) => {
          this.showLoading = false;
          if (!res.code) {
            res.data.records.forEach((item, index) => {
              item.index = this.pageSize * (this.pageNumber - 1) + index + 1;
            });
            this.tableDatas = res.data.records;
            this.totalPage = res.data.pages;
            this.total = res.data.total;
            this.pageNumber = res.data.current;
            this.pageSize = res.data.size;
          }
        })
        .catch((err) => {
          this.showLoading = false;
        });
    },
    // 过滤状态
    filterStatus(status) {
      switch (status) {
        case 2:
          return "待经营签收";
        case 4:
          return "已签收";
        case 5:
          return "待经营确认";
        case 6:
          return "待运输出厂";
        case 7:
          return "已作废";
      }
    },
    // 指派取消
    handleAssignedClose() {
      this.assignerLinkedId = "";
      this.$refs["assigned"].resetFields();
      this.assignedVisible = false;
    },
    // 指派确定
    assignedAudit() {
      this.$refs["assigned"].validate((valid) => {
        if (valid) {
          let params = new URLSearchParams();
          params.append("linkedId", this.assignerLinkedId);
          params.append("vehicleId", this.assignedForm.bothCar);
          this.$axios
            .post("/api/enterprise/tFiveLinked/transportationEntDriver", params)
            .then((res) => {
              if (!res.code) {
                this.$message({
                  type: "success",
                  message: "指派成功",
                });
                this.handleAssignedClose();
                this.getListCityTransferLinked();
              }
            })
            .catch((err) => {});
        }
      });
    },
    // 车辆出厂取消
    handleSignAfterClose() {
      this.$refs["signAfter"].resetFields();
      this.factoryLinkedId = "";
      this.signAfterVisible = false;
    },
    // 车辆出厂确定
    signAfterAudit() {
      this.$refs["signAfter"].validate((valid) => {
        if (valid) {
          let params = new URLSearchParams();
          params.append("linkedId", this.factoryLinkedId);
          params.append("amount", this.signAfterForm.amount);
          this.$axios
            .post(
              "/api/enterprise/tFiveLinked/transportationEntLeaveFactory",
              params
            )
            .then((res) => {
              if (!res.code) {
                this.$message({
                  type: "success",
                  message: "出厂成功",
                });
                this.handleSignAfterClose();
                this.getListCityTransferLinked();
              }
            })
            .catch((err) => {});
        }
      });
    },
    //导出
    basiReportList() {
      var _this = this;
      let url = "/api/enterprise/tFiveLinked/exportCityTransferLinked";
      var start = "";
      var end = "";
      if (null != _this.labelForm.time && _this.labelForm.time.length > 0) {
        start = _this.labelForm.time[0];
        end = _this.labelForm.time[1];
      }
      let params = new URLSearchParams();
      params.append("pageNumber", _this.pageNumber);
      params.append("pageSize", _this.pageSize);
      params.append("linkedStatus", _this.labelForm.linkedStatus);
      params.append("linkedNo", _this.labelForm.linkedNo);
      params.append("entName", _this.labelForm.entName);
      params.append("linkedType", _this.labelForm.linkedType);
      params.append("transportDateStart", start);
      params.append("transportDateEnd", end);
      _this.$axios
        .post(
          url,
          params,
          { responseType: "blob" }
          // {responseType: 'arraybuffer'}
        )
        .then(function (response) {
          downloadFile(response);
        })
        .catch(function () {
          _this.$message.info("导出异常,请重试!");
        });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.pageNumber = 1;
      this.getListCityTransferLinked();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getListCityTransferLinked();
    },
    // 查询
    queryData() {
      this.pageNumber = 1;
      this.getListCityTransferLinked();
    },
    // 过滤日期
    formatterDate(value, str) {
      if (value != null) {
        let val = new Date(value).format(str);
        return val;
      } else {
        return "--";
      }
    },
    // 详情
    showInfo(linkedId) {
      this.$router.push({
        name: "cityTransferDetail",
        query: {
          linkedId,
        },
      });
    },
  },
};
</script>

<style>
.text-state.state-off1 {
  background-color: #ffd306;
}
.text-state.state-off2 {
  background-color: #ff7575;
}
.text-state.state-off3 {
  background-color: #bbffbb;
}
</style>
