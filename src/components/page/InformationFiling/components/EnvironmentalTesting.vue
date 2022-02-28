// 环境监测状况
<template>
  <div class="planDetail boxSizing envionmrntalTest">
    <el-form ref="envionmrntalList" :model="envionmrntalList">
      <div>
        <!-- 利用处置设施运行参数监测情况 -->
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>利用处置设施运行参数监测情况</span>
        </div>
        <div class="textareaCon left2">
          <el-form-item
            prop="parameterMonitor"
            :rules="envionmrntalRules.parameterMonitor"
          >
            <el-input
              type="textarea"
              resize="none"
              :disabled="disabled"
              placeholder="利用处置设施运行参数监测情况"
              v-model="envionmrntalList.parameterMonitor"
              maxlength="1024"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="pollutant">
        <!-- 污染物监测指标及频次 -->
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>污染物监测指标及频次</span>
        </div>
        <div class="textareaCon left2">
          <el-form-item
            prop="contaminantsMonitor"
            :rules="envionmrntalRules.contaminantsMonitor"
          >
            <el-input
              type="textarea"
              resize="none"
              :disabled="disabled"
              placeholder="污染物监测指标及频次"
              v-model="envionmrntalList.contaminantsMonitor"
              maxlength="1024"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="selfMonitoring">
        <!-- 自行监测情况 -->
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>自行监测情况</span>
        </div>
        <div class="textareaCon left2">
          <el-form-item
            prop="voluntarilyMonitor"
            :rules="envionmrntalRules.voluntarilyMonitor"
          >
            <el-input
              type="textarea"
              resize="none"
              :disabled="disabled"
              placeholder="自行监测情况"
              v-model="envionmrntalList.voluntarilyMonitor"
              maxlength="1024"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 委托监测情况 -->
      <div class="entrustedMonitoring">
        <div class="titleName boxSizing">
          <i class="el-icon-arrow-down"></i>
          <span>委托监测情况</span>
        </div>
        <div class="textareaCon left2">
          <el-form-item
            prop="entrustMonitor"
            :rules="envionmrntalRules.entrustMonitor"
          >
            <el-input
              type="textarea"
              resize="none"
              :disabled="disabled"
              placeholder="委托监测情况"
              v-model="envionmrntalList.entrustMonitor"
              maxlength="1024"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </div>
      </div>
      <!-- 提交 -->
      <div class="buttonCon">
        <el-form-item>
          <el-button
            v-if="view == 2"
            type="primary"
            @click="submitForm('envionmrntalList')"
            >保存</el-button
          >
          <el-button v-if="view == 2" @click="resetForm('envionmrntalList')"
            >一键清空 <i class="el-icon-refresh-right"></i>
          </el-button>
        </el-form-item>
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
      envionmrntalList: {
        id: "",
        parameterMonitor: "",
        contaminantsMonitor: "",
        voluntarilyMonitor: "",
        entrustMonitor: "",
        recordYear: this.$route.query.year,
      },
      envionmrntalRules: {
        parameterMonitor: [
          {
            required: true,
            message: "请输入利用处置设施运行参数监测情况",
            trigger: "blur",
          },
        ],
        contaminantsMonitor: [
          {
            required: true,
            message: "请输入污染物监测指标及频次",
            trigger: "blur",
          },
        ],
        voluntarilyMonitor: [
          { required: true, message: "请输入自行监测情况", trigger: "blur" },
        ],
        entrustMonitor: [
          { required: true, message: "请输入委托监测情况", trigger: "blur" },
        ],
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
    onloadEnvironmentalTesting() {
      let _this = this;
      this.$axios
        .get(
          "api/regulatory/tEnterpriseEnvironmentalMonitoring/getEnterpriseEnvironmentalMonitoring?recordYear=" +
            this.$route.query.year
        )
        .then(function (res) {
          if (res.data != null) {
            _this.envionmrntalList = res.data;
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
                "api/regulatory/tEnterpriseEnvironmentalMonitoring/saveEnterpriseEnvironmentalMonitoring",
                _this.envionmrntalList
              )
              .then(function (res) {
                _this.$message.success("保存成功");
                _this.$parent.getManangementState();
                _this.onloadEnvironmentalTesting();
              })
              .catch(function (res) {
                _this.$message.error("保存失败");
              });
            const {
              parameterMonitor,
              contaminantsMonitor,
              voluntarilyMonitor,
              entrustMonitor,
            } = this.envionmrntalList;
            console.log(
              parameterMonitor,
              contaminantsMonitor,
              voluntarilyMonitor,
              entrustMonitor
            );
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
    this.onloadEnvironmentalTesting();
  },
};
</script>
