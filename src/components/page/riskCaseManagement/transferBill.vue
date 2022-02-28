<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#/transferBill">转移联单管理</a><span class="sep">&gt;</span
        ><span class="text-primary">转移联单申请</span>
      </div>
    </div>
    <div>
      <el-form
        ref="form"
        :model="formDisposition"
        :rules="rules"
        :label-position="'right'"
        label-width="auto"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>产废部门</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="部门名称:" prop="searchInfo.entName">
                <el-input
                  v-model="formDisposition.searchInfo.entName"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行政区域:">
                <el-input
                  v-model="formDisposition.searchInfo.regionCodeName"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系人:">
                <el-input
                  v-model="formDisposition.searchInfo.linkName"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话:">
                <el-input
                  v-model="formDisposition.searchInfo.linkPhone"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>接收单位</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="单位名称:"
                prop="rceivesDatas.receivesUnitName"
              >
                <el-select
                  :disabled="cargoStatus"
                  style="width: 100%"
                  v-model="formDisposition.rceivesDatas.receivesUnitName"
                  no-data-text="无匹配数据"
                  @change="selectAccept"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item, index) in acceptList"
                    :key="index"
                    :label="item.entName"
                    :value="item.entName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="经营许可证:"
                prop="rceivesDatas.receivesUnitCode"
              >
                <el-input
                  v-model="formDisposition.rceivesDatas.receivesUnitCode"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="行政区域:"
                prop="rceivesDatas.receivesUnitAdministration"
              >
                <el-input
                  v-model="formDisposition.rceivesDatas.receivesUnitRegionName"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="单位地址:"
                prop="rceivesDatas.receivesUnitAddress"
              >
                <el-input
                  v-model="formDisposition.rceivesDatas.receivesUnitAddress"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="联系人:"
                prop="rceivesDatas.receivesUnitPerson"
              >
                <el-input
                  v-model="formDisposition.rceivesDatas.receivesUnitPerson"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系电话:"
                prop="rceivesDatas.receivesUnitNumber"
              >
                <el-input
                  v-model="formDisposition.rceivesDatas.receivesUnitNumber"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>转移信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="计划转移日期:" prop="transferDate">
                <el-date-picker
                  :disabled="cargoStatus"
                  style="width: 100%"
                  v-model="formDisposition.transferDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划编号:">
                <el-input v-model="formDisposition.planNo" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <el-button
            :disabled="cargoStatus"
            type="primary"
            icon="el-icon-plus"
            style="margin-bottom: 20px"
            @click="addTransferWaste"
            >转移废物信息</el-button
          >
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="废物类别" prop="typeName" width="200">
            </el-table-column>
            <el-table-column label="废物代码" prop="dictDetailCode" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.dictDetailCode.split('#')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="废物名称" prop="name" width="280">
            </el-table-column>
            <el-table-column label="处置方式" width="200">
              <template slot-scope="scope">
                <template v-if="cargoStatus">
                  <span>{{ scope.row.disposalMethod }}</span>
                </template>
                <template v-else>
                  <span v-if="checkDisposalWay(scope.row)">
                    <span v-show="false">{{
                      (scope.row.disposalMethod = disposalWaste(
                        scope.row,0
                      ))
                    }}</span>
                    {{ disposalWaste(scope.row,1) }}
                  </span>
                  <el-select
                    v-else
                    v-model="scope.row.disposalMethod"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in scope.row.listDisposalMethod"
                      :key="item.disposalMethod"
                      :label="item.disposalMethodName"
                      :value="item.disposalMethod"
                    >
                    </el-option>
                  </el-select>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.number }}kg</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="!cargoStatus"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card" v-if="cargoStatus">
          <div slot="header" class="clearfix">
            <span>运输单位</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="单位名称:"
                prop="transportDatas.transportName"
              >
                <el-select
                  style="width: 100%"
                  v-model="formDisposition.transportDatas.transportName"
                  no-data-text="无匹配数据"
                  @change="selectTransport"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="item in transportList"
                    :key="item.entId"
                    :label="item.entName"
                    :value="item.entName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="道路运输证号:"
                prop="transportDatas.transportCode"
              >
                <el-input
                  v-model="formDisposition.transportDatas.transportCodeame"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="单位地址:"
                prop="transportDatas.transportAddress"
              >
                <el-input
                  v-model="formDisposition.transportDatas.transportAddress"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="联系人:"
                prop="transportDatas.transportPerson"
              >
                <el-input
                  v-model="formDisposition.transportDatas.transportPerson"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系电话:"
                prop="transportDatas.transportNumber"
              >
                <el-input
                  v-model="formDisposition.transportDatas.transportNumber"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <el-row>
        <el-col
          :span="24"
          style="text-align: center; margin-bottom: 20px"
          v-if="!cargoStatus"
        >
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="resetForm">重 置</el-button>
        </el-col>
        <el-col
          :span="24"
          style="text-align: center; margin-bottom: 20px"
          v-else
        >
          <el-button type="success" @click="receive">接 收</el-button>
          <el-button type="danger" @click="toBack">退 回</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 转移废物信息 -->
    <el-dialog
      title="添加转移危废"
      class="transfer-content"
      :visible.sync="transferVisible"
      width="40%"
      :modal-append-to-body="false"
      :before-close="handleTransferClose"
    >
      <div>
        <el-table
          ref="multipleTable"
          :data="tableWasteData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="序号" type="index" width="120">
          </el-table-column>
          <el-table-column label="废物名称" prop="name" width="200">
          </el-table-column>
          <el-table-column label="废物代码" prop="dictDetailCode" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.dictDetailCode.split('#')[0]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="number" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.number }}kg</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleTransferClose">取 消</el-button>
        <el-button type="primary" @click="transferAudit">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "transferBill",
  components: {},
  data() {
    return {
      transferVisible: false,
      tableWasteData: [],
      cargoStatus: false,
      currentPage: false,
      entId: "",
      acceptList: [],
      selectedWasteList: [],
      formDisposition: {
        searchInfo: {
          entName: "",
          linkName: "",
          regionCodeName: "",
          linkPhone: "",
          businessLicense: "",
          entAddress: "",
          entId: "",
          regionCode: "",
          roadTransportCertificate: "",
        },
        rceivesDatas: {
          rceivesInfoId: "",
          receivesUnitName: "",
          receivesUnitCode: "",
          receivesUnitAdministration: "",
          receivesUnitPerson: "",
          receivesUnitNumber: "",
          receivesUnitAddress: "",
          receivesUnitCertificate: "",
          receivesUnitRegionName: "",
        },
        transportDatas: {
          transportId: "",
          transportName: "",
          transportCode: "",
          transportAddress: "",
          transportPerson: "",
          transportNumber: "",
          transportAdministration: "",
          transportCertificate: "",
          transportRegionName: "",
        },
        transferDate: "",
        planNo: "计划编号",
      },
      tableData: [],
      rules: {
        "searchInfo.entName": [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        "rceivesDatas.receivesUnitName": [
          { required: true, message: "请选择单位名称", trigger: "change" },
        ],
        "transportDatas.transportName": [
          { required: true, message: "请选择单位名称", trigger: "change" },
        ],
        transferDate: [
          { required: true, message: "请选择计划转移日期", trigger: "change" },
        ],
      },
      wasteList: [],
      haseRceivesInfoId: null,
      hasTransportInfoId: null,
      transportList: [],
      transEntId: '',
    };
  },
  created() {
    this.entId = this.$route.query && this.$route.query.entId;
    this.currentPage = this.$route.query && this.$route.query.currentPage;
    this.entId ? (this.cargoStatus = true) : false;
    if (!this.cargoStatus) {
      this.searchEntInfo(1, 0);
      this.checkThisEnterprise();
    } else {
      this.viewLinkedInfo();
      this.searchEntInfo(4, 1);
    }
  },
  methods: {
    // 查看联单申请
    viewLinkedInfo() {
      let params = new URLSearchParams();
      params.append("linkedId", this.entId);
      this.$axios
        .get("/api/enterprise/tFiveLinked/viewLinkedInfo", { params })
        .then((res) => {
          if (!res.code) {
            this.formDisposition.searchInfo.entName = res.data.outEntName;
            this.formDisposition.searchInfo.regionCodeName =
              res.data.outEntRegionCodeName;
            this.formDisposition.searchInfo.linkName = res.data.outEntLinkName;
            this.formDisposition.searchInfo.linkPhone =
              res.data.outEntLinkPhone;
            this.formDisposition.rceivesDatas.receivesUnitName =
              res.data.acceptEntName;
            this.formDisposition.rceivesDatas.receivesUnitCode =
              res.data.licenceNo;
            this.formDisposition.rceivesDatas.receivesUnitRegionName =
              res.data.acceptEntRegionCodeName;
            this.formDisposition.rceivesDatas.receivesUnitAddress =
              res.data.acceptEntAddress;
            this.formDisposition.rceivesDatas.receivesUnitPerson =
              res.data.acceptEntLinkName;
            this.formDisposition.rceivesDatas.receivesUnitNumber =
              res.data.acceptEntLinkPhone;
            this.formDisposition.transferDate = [
              this.formatterDate(
                res.data.transportDateStart,
                "yyyy-MM-dd hh:mm:ss"
              ),
              this.formatterDate(
                res.data.transportDateEnd,
                "yyyy-MM-dd hh:mm:ss"
              ),
            ];
            const wasteArray = [];
            wasteArray.push({
              typeName: res.data.typeName,
              dictDetailCode: res.data.dictDetailCode,
              name: res.data.name,
              disposalMethod: res.data.disposalMethod,
              number: res.data.number,
            });
            this.tableData = wasteArray;
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "连接服务器失败！",
          });
        });
    },
    // 过滤计划转移日期
    formatterDate(value, str) {
      if (value != null) {
        let val = new Date(value).format(str);
        return val;
      }
    },
    // 获取产废信息
    searchEntInfo(entKind, status) {
      let params = new URLSearchParams();
      params.append("entKind", entKind);
      if (!status) {
        params.append("entId", sessionStorage.getItem("entId"));
      }
      this.$axios
        .get("/api/enterprise/tEnterpriseInfo/searchEntInfo", { params })
        .then((res) => {
          if (!res.code && res.data.length > 0) {
            if (status) {
              this.transportList = res.data;
            } else {
              this.formDisposition.searchInfo = res.data[0];
            }
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "连接服务器失败！",
          });
        });
    },
    // 判断当前企业是否申报通过
    checkThisEnterprise() {
      this.$axios
        .post(
          "/api/enterprise/tEnterpriseDeclare/checkThisEnterpriseIsDeclareFinish"
        )
        .then((res) => {
          if (!res.code) {
            this.listDeclareEnterprise();
          } else {
            this.$message({
              type: "error",
              message: res.msg,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "连接服务器失败！",
          });
        });
    },
    // 获取经营企业信息
    listDeclareEnterprise() {
      this.$axios
        .post("/api/enterprise/tEnterpriseDeclare/listDeclareEnterprise")
        .then((res) => {
          if (!res.code) {
            this.acceptList = res.data;
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "连接服务器失败！",
          });
        });
    },
    // 获取危废入库列表
    addTransferWaste() {
      this.$refs["form"].validateField(
        "rceivesDatas.receivesUnitName",
        (valid) => {
          if (!valid) {
            const data = new FormData();
            data.append(
              "entName",
              this.formDisposition.rceivesDatas.receivesUnitName
            );
            this.$axios
              .post(
                "/api/enterprise/tEnterpriseStorageStandingBook/listCanDeliveryHazardousInfo",
                data
              )
              .then((res) => {
                if (!res.code) {
                  this.tableWasteData = res.data;
                  this.transferVisible = true;
                  if (this.tableData.length) {
                    const arrayData = [];
                    this.tableData.forEach((i) => {
                      i.listHazardousInfo.forEach((k) => {
                        arrayData.push(k);
                      });
                    });
                    this.$nextTick(() => {
                      const arrayWaste = res.data;
                      arrayData.forEach((row) => {
                        for (let i = 0; i < arrayWaste.length; i++) {
                          if (
                            row.storageStandingBookId ==
                            arrayWaste[i].storageStandingBookId
                          ) {
                            this.$refs.multipleTable.toggleRowSelection(
                              arrayWaste[i]
                            );
                            break;
                          }
                        }
                      });
                    });
                  }
                }
              })
              .catch((error) => {
                this.$message({
                  type: "error",
                  message: "连接服务器失败！",
                });
              });
          }
        }
      );
    },
    // 判断处置方式是一个或多个
    checkDisposalWay(scope) {
      if (scope.listDisposalMethod.length <= 1) {
        return true;
      }
      return false;
    },
    // 处置方式唯一默认待入
    disposalWaste(scope,status) {
      if(status) {
        return scope.listDisposalMethod[0].disposalMethodName;
      } else {
        return scope.listDisposalMethod[0].disposalMethod;
      }
    },
    // 取消添加转移危废
    handleTransferClose() {
      this.selectedWasteList = [];
      this.transferVisible = false;
    },
    // 确定添加转移危废
    transferAudit() {
      if (this.selectedWasteList.length <= 0) {
        return this.$message({
          type: "warning",
          message: "请选择要转移的危废",
        });
      }
      this.$axios
        .post(
          "/api/enterprise/tEnterpriseStorageStandingBook/mergeHazardousInfo",
          this.selectedWasteList
        )
        .then((res) => {
          if (!res.code) {
            this.tableData = res.data;
            this.selectedWasteList = [];
            this.transferVisible = false;
            this.$message({
              type: "success",
              message: "添加转移危废成功",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "连接服务器失败！",
          });
        });
    },
    // 选择转移废物信息
    handleSelectionChange(val) {
      this.selectedWasteList = val;
    },
    // 接收
    receive() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const data = {
            linkedId: this.entId,
            transEntId: this.transEntId
          }
          this.$axios
            .post(`/api/enterprise/tFiveLinked/receivingEntLinkedAffirm`, data)
            .then((response) => {
              if (response.code === 0) {
                this.$message({
                  type: "success",
                  message: "接收成功",
                });
                this.resetForm();
                this.$router.push({
                  path: '/cityTransferBill',
                  params: {
                    currentPage: this.currentPage
                  }
                })
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "连接服务器失败！",
              });
            });
        }
      });
    },
    // 退回
    toBack() {
      let title = `确定退回${this.formDisposition.searchInfo.entName}的指派吗？`
      this.$confirm(title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          let data = new URLSearchParams()
          data.append('linkedId',this.entId)
          this.$axios
            .post(`/api/enterprise/tFiveLinked/returnLinked`, data)
            .then((response) => {
              if (response.code === 0) {
                this.$message({
                  type: "success",
                  message: "退回成功!",
                });
                this.resetForm();
                this.$router.push({
                  path: '/cityTransferBill',
                  params: {
                    currentPage: this.currentPage
                  }
                })
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "连接服务器失败！",
              });
            });
        })
        .catch(() => {});
    },
    // 选择接收单位待入信息
    selectAccept() {
      this.tableData = []
      this.acceptList.forEach((item) => {
        if (
          item.entName === this.formDisposition.rceivesDatas.receivesUnitName
        ) {
          this.haseRceivesInfoId = item.entId;
          this.formDisposition.rceivesDatas.rceivesInfoId = item.entId;
          this.formDisposition.rceivesDatas.receivesUnitName = item.entName;
          this.formDisposition.rceivesDatas.receivesUnitCode =
            item.businessLicense;
          this.formDisposition.rceivesDatas.receivesUnitAdministration =
            item.regionCode;
          this.formDisposition.rceivesDatas.receivesUnitPerson = item.linkName;
          this.formDisposition.rceivesDatas.receivesUnitNumber = item.linkPhone;
          this.formDisposition.rceivesDatas.receivesUnitAddress =
            item.entAddress;
          this.formDisposition.rceivesDatas.receivesUnitCertificate =
            item.roadTransportCertificate;
          this.formDisposition.rceivesDatas.receivesUnitRegionName =
            item.regionCodeName;
        }
      });
    },
    // 选择运输单位待入信息
    selectTransport() {
      this.transportList.forEach((item) => {
        if (
          item.entName === this.formDisposition.transportDatas.transportName
        ) {
          this.transEntId = item.entId
          this.$set(
            this.formDisposition.transportDatas,
            "transportId",
            item.entId
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportName",
            item.entName
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportCode",
            item.businessLicense
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportAddress",
            item.entAddress
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportPerson",
            item.linkName
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportNumber",
            item.linkPhone
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportAdministration",
            item.regionCode
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportCertificate",
            item.roadTransportCertificate
          );
          this.$set(
            this.formDisposition.transportDatas,
            "transportRegionName",
            item.regionCodeName
          );
        }
      });
    },
    // 申请联单保存
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.tableData.length) {
            return this.$message({
              type: "warning",
              message: "请添加转移废物信息",
            });
          }
          const hazardousInfoDTOS = JSON.parse(JSON.stringify(this.tableData));
          for (let item of hazardousInfoDTOS) {
            item.listDisposalMethod = null;
          }
          const data = {
            acceptEntId: this.haseRceivesInfoId,
            transportDateStart: this.formDisposition.transferDate[0],
            transportDateEnd: this.formDisposition.transferDate[1],
            hazardousInfoDTOS,
          };
          this.$axios
            .post(`/api/enterprise/tFiveLinked/transferLinkedApply`, data)
            .then((response) => {
              if (response.code === 0) {
                this.$message({
                  type: "success",
                  message: "保存成功！",
                });
                this.resetForm();
              }
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: "连接服务器失败！",
              });
            });
        }
      });
    },
    // 重置
    resetForm() {
      for (let key in this.formDisposition.rceivesDatas) {
        this.formDisposition.rceivesDatas[key] = "";
      }
      this.formDisposition.transferDate = "";
      this.tableData = [];
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    // 废物信息删除
    handleDelete(index) {
      if (this.tableData.length <= 1) {
        return this.$message({
          type: "info",
          message: "至少保留一条数据",
        });
      }
      this.tableData.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
<style>
.transfer-content .el-dialog__body {
  max-height: 500px;
  overflow: auto;
}
</style>
