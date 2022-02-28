<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"><i class="icon icon-shenbaodengji menu-icon"></i>企业管理</a
        ><span class="sep">&gt;</span><span class="text-primary">企业信息</span>
      </div>
    </div>
    <div class="panel">
      <div class="overflowX">
        <table class="table-default" v-loading="loading">
          <thead>
            <tr>
              <th style="text-align: center; width: 6%">序号</th>
              <th style="text-align: center; width: 10%">企业名称</th>
              <th style="text-align: center; width: 9%">企业类型</th>
              <th style="text-align: center; width: 10%">联系人</th>
              <th style="text-align: center; width: 8%">联系人手机号</th>
              <th style="text-align: center; width: 8%">设备厂商</th>
              <th style="text-align: center; width: 8%">监控类型</th>
              <th style="text-align: center; width: 8%">状态</th>
              <th style="text-align: center; width: 8%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableDatas" :key="item.id">
              <td style="text-align: center; width: 5%">
                {{ getIndex(index) }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.name"
              >
                {{ item.name }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.entKind"
              >
                {{ item.entKind }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.managerName"
              >
                {{ item.managerName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.managerPhone"
              >
                {{ item.managerPhone }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.supplierName"
              >
                {{ item.supplierName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                v-html="addHtml(item.entType)"
              ></td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
              >
                {{ item.status == 1 ? "同步" : "不同步" }}
              </td>
              <td style="text-align: center; width: 7%">
                <div class="btn-opreate">
                  <a
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="
                      jumpAddress(item.id, item.regionCode, item.correlationId)
                    "
                    >企业详情</a
                  >
                  <a
                    href="javascript:;"
                    class="text-primary text-underline"
                    @click="
                      jumpAddressToProductionBook(
                        item.id,
                        item.name,
                        item.regionName,
                        item.entKind
                      )
                    "
                    >管理台账</a
                  >
                  <span
                    class="text-primary text-underline"
                    style="cursor: pointer"
                    @click="handelEdit(item)"
                    >编辑</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="el-pagination is-background mt-lg">
        <span class="el-pagination__total">共 {{ total }} 条，每页显示</span>
        <span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="10"
            layout=" sizes, prev, pager, next"
            :total="total"
          ></el-pagination>
        </span>
        <span class="el-pagination__total">共 {{ totalPage }} 页</span>
      </div>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="titleName"
      :visible.sync="addDialogVisible"
      v-if="addDialogVisible"
      width="40%"
      center
      :modal-append-to-body="false"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
        :rules="entRules"
      >
        <ul class="Onlinedealil newOnlinedealil">
          <li class="Onlinedealli">
            <el-form-item label="企业名称">
              <el-input
                clearable
                v-model="ruleForm.applicationTitle"
                size="small"
                disabled
                placeholder="请输入企业名称"
                class="handle-input mr10"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contacts">
              <el-input
                clearable
                v-model="ruleForm.contacts"
                size="small"
                disabled
                placeholder="请输入联系人"
                class="handle-input mr10"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input
                clearable
                v-model="ruleForm.iphone"
                size="small"
                disabled
                placeholder="请输入联系人电话"
                class="handle-input mr10"
              ></el-input>
            </el-form-item>
            <!-- 经营企业 -->
            <el-form-item label="企业类型" v-if="entKindStatus == '经营企业'">
              <el-select
                v-model="ruleForm.business"
                multiple
                placeholder="请选择"
                @change="statusChange"
              >
                <el-option
                  v-for="item in monitorPickerIdList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 产废企业 -->
            <el-form-item label="企业类型" v-else>
              <el-select
                v-model="ruleForm.business1"
                placeholder="请选择"
                @change="statusChange1"
              >
                <el-option
                  v-for="item in businessList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li class="Onlinedealli">
            <el-form-item label="监控类型">
              <el-checkbox-group v-model="ruleForm.checkList">
                <el-checkbox
                  v-for="(item, index) in monitoringTypeList"
                  :label="item.value"
                  :key="index"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </li>

          <li class="Onlinedealli">
            <el-form-item label="是否拥有省平台账号" change>
              <el-radio
                v-model="isHaveAccount"
                label="have"
                @change="changeRadioStatus"
                >有</el-radio
              >
              <el-radio
                v-model="isHaveAccount"
                label="none"
                @change="changeRadioStatus"
                >无</el-radio
              >
            </el-form-item>
            <el-form-item
              label="省平台账号"
              v-if="isHaveAccount === 'have'"
              prop="provincialAccount"
            >
              <el-input
                v-model="ruleForm.provincialAccount"
                placeholder="请输入省平台登录账号"
                class="w300"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="省平台密码"
              v-if="isHaveAccount === 'have'"
              prop="provincialPwd"
            >
              <el-input
                v-model="ruleForm.provincialPwd"
                placeholder="请输入省平台登录密码"
                class="w300"
              ></el-input>
            </el-form-item>
          </li>
        </ul>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handelSave('ruleForm')"
          style="
            background: rgba(42, 175, 255, 1);
            border-color: rgba(42, 175, 255, 1);
          "
          >保存</el-button
        >
      </span>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog
      title="企业详情"
      :visible.sync="detailVisible"
      width="70%"
      v-if = "detailVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <CompanyDetail ref="CompanyDetail"></CompanyDetail>
    </el-dialog>
  </div>
</template>

<script>
import CompanyDetail from "./components/companyDetail.vue";
export default {
  name: "enterpriseManagement",
  components: {
    CompanyDetail,
  },
  data() {
    return {
      popVisible: false,
      isHaveAccount: "none",
      detailVisible: false,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      regionCode: sessionStorage.getItem("regionCode"), //[],
      entKind: -1,
      search: "",
      addDialogVisible: false, //控制编辑弹窗显示隐藏
      titleName: "", //标题
      entKindStatus: "", //判断是经营企业还是产废企业
      ruleForm: {
        applicationTitle: "", //企业名称
        contacts: "", //联系人
        monitorPickerId: "", //经营企业
        ename: "", //监控类型
        iphone: "", //联系人电话
        business: [], //经营企业
        business1: "", //产废企业
        checkList: [], //监控类型
        checkList1: [], //首页监控类型
        deviceManufacturerNum: [], //设备厂商
        provincialPwd: "",
        provincialAccount: "",
      },
      loading: false,
      //经营企业数组
      monitorPickerIdList: [],
      //产废企业
      businessList: [],
      //监控类型
      monitoringTypeList: [
        {
          value: "1",
          label: "国家级",
          name: "国家级",
        },
        {
          value: "2",
          label: "省级",
          name: "省级",
        },
        {
          value: "3",
          label: "市级",
          name: "市级",
        },
        {
          value: "4",
          label: "小微企业",
          name: "小微企业",
        },
        {
          value: "5",
          label: "一般",
          name: "一般",
        },
      ],
      entRules: {},
    };
  },
  created() {
    this.entClassFind();
    this.entClassFindList();
    this.loadingData();
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      this.reset();
      this.loadingData();
    }
    this.$route.meta.isUseCache = false;
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.name == "enterpriseProductionBook" ||
      to.name == "managementEnterpriseProductionBook" ||
      to.name == "collectEnterpriseProductionBook"
    ) {
      from.meta.isUseCache = true;
    }
    next();
  },
  methods: {
    changeRadioStatus() {
      if (this.isHaveAccount === "have") {
        this.$set(this.entRules, "provincialAccount", [
          { required: true, message: "请输入省平台登录账号", trigger: "blur" },
        ]);
        this.$set(this.entRules, "provincialPwd", [
          { required: true, message: "请输入省平台登录密码", trigger: "blur" },
        ]);
        this.$set(this.ruleForm, "provincialPwd", "");
        this.$set(this.ruleForm, "provincialAccount", "");
      } else {
        delete this.entRules["provincialAccount"];
        delete this.entRules["provincialPwd"];
        this.$set(this.ruleForm, "provincialPwd", "");
        this.$set(this.ruleForm, "provincialAccount", "");
      }
    },
    reset() {
      this.ruleForm.deviceManufacturerNum = [];
      this.cur_page = 1;
      this.regionCode = sessionStorage.getItem("regionCode");
      this.entKind = "";
      this.search = "";
      this.ruleForm.checkList1 = [];
    },
    handleClose() {
      this.detailVisible = false;
    },
    // 获取企业类型列表
    entClassFind() {
      const params = {
        type: 1,
        pageSize: 1000,
        currentPage: 1,
      };
      this.$axios
        .get(`/api/permissions/entClass/find`, { params })
        .then((resp) => {
          if (!resp.code) {
            const { data } = resp;
            this.businessList = data.list;
          }
        })
        .catch((error) => {});
    },
    entClassFindList() {
      const params = {
        type: 2,
        pageSize: 1000,
        currentPage: 1,
      };
      this.$axios
        .get(`/api/permissions/entClass/find`, { params })
        .then((resp) => {
          if (!resp.code) {
            const { data } = resp;
            this.monitorPickerIdList = data.list;
          }
        })
        .catch((error) => {});
    },
    //设备厂商
    deviceManufacturerNumChange(val) {
      this.ruleForm.deviceManufacturerNum = val;
    },
    //点击编辑按钮
    handelEdit(item) {
      this.ruleForm.business = [];
      this.ruleForm.business1 = "";
      this.addDialogVisible = true;
      this.nameList = item.entKind;
      this.ruleForm.applicationTitle = item.name; //企业名称回显
      this.ruleForm.contacts = item.managerName; //联系人回显
      this.ruleForm.iphone = item.contactsPhone; //后几号回显
      this.entKindStatus = item.entKind; //判断是经营企业还是产废企业
      this.titleName = item.name; //标题回显
      this.uid = item.id;
      this.ruleForm.checkList = item.entType ? item.entType.split(",") : [];
      if (item.provincialPlatformPassword && item.provincialPlatformUserName) {
        this.isHaveAccount = 'have'
        this.$set(this.entRules, "provincialAccount", [
          { required: true, message: "请输入省平台登录账号", trigger: "blur" },
        ]);
        this.$set(this.entRules, "provincialPwd", [
          { required: true, message: "请输入省平台登录密码", trigger: "blur" },
        ]);
        this.$set(this.ruleForm, "provincialPwd", item.provincialPlatformPassword);
        this.$set(this.ruleForm, "provincialAccount", item.provincialPlatformUserName);
      }
      for (const key in item) {
        if (Object.keys(this.ruleForm).includes(key)) {
          this.ruleForm[key] = item[key];
        }
      }
      if (item.entKind == "经营企业") {
        this.ruleForm.business = item.entSubClass
          ? item.entSubClass.split(",")
          : [];
      } else {
        this.ruleForm.business1 = item.entSubClass ? item.entSubClass : "";
      }
    },
    //点击保存
    handelSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            id: this.uid,
            entType: this.ruleForm.checkList.join(","),
            entSubClass: this.ruleForm.business,
            provincialPlatformUserName: this.ruleForm.provincialAccount,
            provincialPlatformPassword: this.ruleForm.provincialPwd
          };
          if (this.nameList == "经营企业") {
            params.entSubClass = this.ruleForm.business.join(",");
          } else {
            params.entSubClass = this.ruleForm.business1;
          }
          this.$axios
            .post("/api/regulatory/tEnterpriseInfo/editEnterpriseInfo", params)
            .then((res) => {
              if (res.code == 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.loadingData();
                for (let key in this.ruleForm) {
                  if (
                    [
                      "business",
                      "checkList",
                      "checkList1",
                      "deviceManufacturerNum",
                    ].includes(key)
                  ) {
                    this.ruleForm[key] = [];
                  } else {
                    this.ruleForm[key] = "";
                  }
                }
                this.addDialogVisible = false;
              } else {
                this.$message.error("保存失败");
              }
            })
            .catch((err) => {});
        }
      });
    },
    statusChange(val) {
      this.ruleForm.business = val;
    },
    statusChange1(val) {
      this.ruleForm.business = val;
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },

    jumpAddress() {
      this.detailVisible = true;
    },
    jumpAddressToProductionBook(entId, entName, regionName, entKind) {
      if (entKind == "产废企业") {
        this.$router.push({
          path: "/" + "enterpriseProductionBook",
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName,
          },
        });
      }
      if (entKind == "收集企业") {
        this.$router.push({
          path: "/" + "collectEnterpriseProductionBook",
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName,
          },
        });
      }
      if (entKind == "经营企业") {
        this.$router.push({
          path: "/" + "managementEnterpriseProductionBook",
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName,
          },
        });
      }
    },

    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.loadingData();
    },
    handleCurrentChange(newPage) {
      this.cur_page = newPage;
      this.loadingData();
    },
    show() {
      this.cur_page = 1;
      this.loadingData();
    },
    addHtml(item) {
      if (item == null) {
        return;
      }
      var items = item.toString().split(",");
      var html = "";
      for (var i = 0; i < items.length; i++) {
        var num = items[i];
        if (num == 1) {
          html =
            html +
            "<div style='height: 30px;width: 80px;background-color: #33FFFF;margin-right: 2px;padding:5px 5px;color: white;display:inline;'>国家级</div>";
        } else if (num == 2) {
          html =
            html +
            "<div style='height: 30px;width: 80px;background-color: #FFAA33;margin-right: 2px;padding:5px 5px;color: white;display:inline'>省级</div>";
        } else if (num == 3) {
          html =
            html +
            "<div style='height: 30px;width: 50px;background-color: #33CCFF;margin-right: 2px;padding:5px 5px;color: white;display:inline'>市级</div>";
        } else if (num == 4) {
          html =
            html +
            "<div style='height: 30px;width: 50px;background-color: #FF7744;margin-right: 2px;padding:5px 5px;color: white;display:inline'>小微企业</div>";
        } else if (num == 5) {
          html =
            html +
            "<div style='height: 30px;width: 50px;background-color: #33FF33;margin-right: 2px;padding:5px 5px;color: white;display:inline'>一般固废</div>";
        }
      }
      return html;
    },
    loadingData() {
      var _this = this;
      var url = "/api/regulatory/tEnterpriseManagement/selectEnterpriseDetails";
      let params = {
        pageNo: _this.cur_page,
        pageSize: _this.pageSize,
        entKind: _this.entKind,
        name: _this.search,
        supplierCode: _this.ruleForm.deviceManufacturerNum,
        entTypes: _this.ruleForm.checkList1,
      };
      _this.loading = true;
      _this.$axios
        .post(url, params)
        .then((response) => {
          if (response.code == 0) {
            _this.loading = false;
            _this.tableDatas = response.data.records;
            _this.total = response.data.total;
            _this.totalPage = response.data.pages;
          }
        })
        .catch((error) => {
          _this.loading = false;
        });
    },
    closeData() {
      var _this = this;
    },
    searchRegionChange() {
      let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
      if (regionInfo.length > 0) {
        this.regionCode = regionInfo[0].value;
      }
    },
  },
};
</script>

<style scoped>
.filter-item {
  display: flex !important;
}
.el-checkbox-group {
  display: flex !important;
}
.el-checkbox-group {
  margin-left: 15px;
}
.el-table {
  border: 0;
}
.el-table th.is-leaf,
.el-table th {
  background: rgba(223, 234, 251, 0.3);
}
.panel {
  box-sizing: border-box;
  padding: 20px;
}
.el-table::before {
  height: 0;
}
</style>
