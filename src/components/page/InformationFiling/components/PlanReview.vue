// 上年度管理计划回顾
<template>
  <div>
    <div class="planDetail planRwview boxSizing">
      <!-- 检查、监测和公开 -->
      <el-form ref="planList" :model="planList" :rules="rules" status-icon>
        <div>
          <div class="titleName boxSizing">
            <i class="el-icon-arrow-down"></i>
            <span>检查、监测和公开</span>
          </div>
          <div class="textareaCon left2">
            <el-form-item prop="monitoringContent">
              <el-input
                type="textarea"
                resize="none"
                :disabled="disabled"
                placeholder="上年度各级环保部门检查、环境监测、信息公开情况（包括检查时间、存在的问题、下一步措施；环境监测达标情况和原因分析；信息公开内容）"
                v-model="planList.monitoringContent"
                maxlength="1024"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="titleName boxSizing">
            <i class="el-icon-arrow-down"></i>
            <span>危险废物比较分析</span>
          </div>
          <div class="textareaCon left2">
            <el-form-item prop="analysisContent">
              <el-input
                type="textarea"
                resize="none"
                :disabled="disabled"
                placeholder="上年度实际产生的危险废物数量、种类、转移、贮存、利用处置情况，并与上年度管理计划对比分析"
                v-model="planList.analysisContent"
                maxlength="1024"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="qustion">
          <div class="titleName boxSizing">
            <i class="el-icon-arrow-down"></i>
            <span>管理制度执行情况</span>
          </div>
          <div class="paddingleft2">
            <div class="secondaryTitle">危险废物经营许可证制度</div>
            <el-form-item
              label="1、是否将危险废物委托给有资质单位收集、贮存、利用、处置："
              style="text-algin: left"
              prop="isEntrust"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isEntrust">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="2、是否与有资质单位签订危险废物利用处置合同/协议："
              style="text-algin: left"
              prop="isQualifications"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isQualifications">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="3、是否对危险废物许可证进行审查确认："
              style="text-algin: left"
              prop="isExamination"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isExamination">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dividingLine"></div>
            <div class="secondaryTitle">危险废物转移审批制度</div>
            <el-form-item
              label="1、转移危险废物是否经过环保部门批准："
              style="text-algin: left"
              prop="isRatify"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isRatify">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dividingLine"></div>
            <div class="secondaryTitle">危险废物转移联单制度</div>
            <el-form-item
              label="1、是否按照规定填写危险废物转移联单："
              style="text-algin: left"
              prop="isTransferVoucher"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isTransferVoucher">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dividingLine"></div>
            <div class="secondaryTitle">危险废物识别标志制度</div>
            <el-form-item
              label="1、危险废物收集、贮存、处置设施场所是否设置危险废物识别标志："
              style="text-algin: left"
              prop="isSign"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isSign">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="secondaryTitle">危险废物识别标志制度</div>
            <el-form-item
              label="2、危险废物的容器和包装物是否设置危险废物标签："
              style="text-algin: left"
              prop="isLabel"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isLabel">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dividingLine"></div>
            <div class="secondaryTitle">危险废物建立台账登记制度</div>
            <el-form-item
              label="1、是否按照国家规定建立危险废物台账："
              style="text-algin: left"
              prop="isStandingBook"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isStandingBook">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="dividingLine"></div>
            <div class="secondaryTitle">
              建设项目固废污染防治设施环境影响评价及验收制度
            </div>
            <el-form-item
              label="1、危险废物收集、贮存、处置等污染防治设施是否通过环评审批："
              style="text-algin: left"
              prop="isApproval"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isApproval">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="2、上述危险废物相关污染防治设施是否与主体工程同时通过环保验收："
              style="text-algin: left"
              prop="isAdopt"
            >
              <el-radio-group :disabled="disabled" v-model="planList.isAdopt">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <!-- 提交 -->
        <div class="buttonCon">
          <el-form-item>
            <el-button
              v-if="view == 2"
              type="primary"
              @click="submitForm('planList')"
              >保存</el-button
            >
            <el-button v-if="view == 2" @click="resetForm('planList')"
              >一键清空 <i class="el-icon-refresh-right"></i
            ></el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled:false,
      view: "",
      planList: {
        monitoringContent: "",
        analysisContent: "",
        // monitor: '',
        isEntrust: "",
        isQualifications: "",
        isExamination: "",
        isRatify: "",
        isTransferVoucher: "",
        isSign: "",
        isLabel: "",
        isStandingBook: "",
        isApproval: "",
        isAdopt: "",
        recordYear:this.$route.query.year
      },
      rules: {
        monitoringContent: [
          { required: true, message: "请填写", trigger: "blur" },
        ],
        analysisContent: [
          { required: true, message: "请填写", trigger: "blur" },
        ],
        // monitor: [{ required: true, message: '请填写', trigger: 'blur' }],
        isEntrust: [{ required: true, message: "请选择", trigger: "change" }],
        isQualifications: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        isExamination: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        isRatify: [{ required: true, message: "请选择", trigger: "change" }],
        isTransferVoucher: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        isSign: [{ required: true, message: "请选择", trigger: "change" }],
        isLabel: [{ required: true, message: "请选择", trigger: "change" }],
        isStandingBook: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        isApproval: [{ required: true, message: "请选择", trigger: "change" }],
        isAdopt: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  created() {
    this.initDisabled();
  },
  methods: {
        initDisabled() {
      this.view = this.$route.query.view;
      if (this.view == 1) {
        this.disabled = true;
      }
    },
    onloadPlanReview() {
      let _this = this;
      this.$axios
        .get(
          "api/regulatory/tEnterpriseManagementPlan/getEnterpriseManagementPlan?recordYear=" +
            this.$route.query.year
        )
        .then(function (res) {
          if (res.data != null) {
            _this.planList = res.data;
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
                "api/regulatory/tEnterpriseManagementPlan/saveEnterpriseManagementPlan",
                _this.planList
              )
              .then(function (res) {
                if (res.data != null && res.data) {
                  _this.$message.success("保存成功");
                  _this.$parent.getManangementState();
                  _this.onloadPlanReview();
                } else {
                  _this.$message.error("保存失败");
                }
              })
              .catch(function (res) {
                _this.$message.error("保存失败");
              });
            console.log(_this.planList);
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
  },
  mounted() {
    this.onloadPlanReview();
  },
};
</script>
<style>
.planRwview .qustion .el-form-item__label {
  width: 100%;
  text-align: left;
  line-height: 23px;
  margin-top: 10px;
}

/* .planRwview .qustion .el-form-item{
        margin-bottom: 10px;
    } */
.planRwview .qustion .el-form-item,
.planRwview .secondaryTitle {
  margin-left: 2%;
}
</style>
