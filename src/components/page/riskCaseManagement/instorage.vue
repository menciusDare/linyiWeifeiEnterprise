<template>
  <div class="containers">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"
        ><i class="icon icon-zhihuijianguan menu-icon"></i>企业台账新增</a
        ><span class="sep">&gt;</span><span class="text-primary">新增入库</span>
      </div>
    </div>
    <div class="contents">
      <el-form
              :model="labelForm"
              ref="ruleForm"
              :rules="rules"
              label-width="180px"
              class="submit-form"
      >
        <el-form-item label="贮存间：" prop="storageId">
          <el-select
                  v-model="labelForm.storageId"
                  class="select-type"
                  @change="storageChange"
                  placeholder="请选择贮存间"
          >
            <el-option
                    v-for="item in storageOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="危废名称：" prop="dictDetailCode">
          <el-select
                  v-model="labelForm.dictDetailCode"
                  class="select-type"
                  @change="change"
                  @focus="focus"
                  placeholder="请选择危废名称"
          >
            <el-option
                    v-for="itemtype in sysDetails"
                    :key="itemtype.code"
                    :label="itemtype.name"
                    :value="itemtype.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="危废代码：">
          <el-input v-model="labelForm.wasteCode" :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="危废类别：">
          <el-input v-model="labelForm.wasteType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="数量（kg）：" prop="number">
          <el-input
                  min="0"
                  type="number"
                  v-model="labelForm.number"
                  placeholder="请输入数量"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-btn">
        <el-button @click="resetBtn">重置</el-button>
        <el-button style="margin-left: 50px" @click="sureSubmit" type="primary"
        >确定</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写数量（KG）'));
        }
        if (value <= 0) {
          return callback(new Error('数量必须大于0'));
        } else {
          callback()
        }
      };
      return {
        labelForm: {
          storageId: "",
          dictDetailCode: "",
          wasteCode: "",
          wasteType: "",
          number: "",
        },
        rules: {
          storageId: [
            { required: true, message: "请选择贮存间", trigger: "change" },
          ],
          dictDetailCode: [
            { required: true, message: "请选择危废名称", trigger: "change" },
          ],
          number: [
            { required: true, validator: checkNumber, trigger: "blur" },
          ],
        },
        storageOptions: [],
        sysDetails: [],
        cultureOptions: [{ name: 123 }],
      };
    },
    mounted() {
      this.getStorageFacilitiesList();
    },
    methods: {
      getStorageFacilitiesList() {
        this.$axios
                .get(
                        "/api/regulatory/tEnterpriseStorageStandingBookHistory/getStorageFacilitiesList"
                )
                .then((res) => {
                  if (res.code == 0 && res.data != null) {
                    this.storageOptions = res.data;
                  }
                })
                .catch(function (err) {
                  console.log(err);
                });
      },
      storageChange(id) {
        let _this = this;
        _this.labelForm.dictDetailCode = ''
        _this.labelForm.wasteCode = ''
        _this.labelForm.wasteType = ''
        _this.$axios
                .get(
                        "/api/regulatory/tEnterpriseStorageStandingBookHistory/getHazardousNameListsById/" +
                        id
                )
                .then(function (response) {
                  if (response.data != null) {
                    response.data.forEach(item => {
                      item.name = `${item.name}  (${_this.splitCode(item.code)})`
                    })
                    _this.sysDetails = response.data;
                  }
                })
                .catch(function (err) {});
      },
      focus() {
        if (!this.labelForm.storageId) {
          this.$message("请先选择贮存间");
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
              this.labelForm.wasteCode = this.splitCode(i.code);
              this.labelForm.wasteType = i.typeName;
            }
          }
        }
      },
      splitCode(code) {
        if (code != null && code != undefined) {
          return code.split("#")[0];
        }
      },
      sureSubmit() {
        let that = this
        console.log(1111)
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$confirm("确定入库吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              closeOnClickModal: false,
              type: "warning",
            })
                    .then(() => {
                      this.addInstorage()
                    })
                    .catch(() => {
                      this.$message({
                        type: "info",
                        message: "已取消提交",
                      });
                    });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetBtn() {
        this.labelForm.wasteCode = ''
        this.labelForm.wasteType = ''
        this.$refs.ruleForm.resetFields();
      },
      addInstorage() {
        let storeName  = ''
        this.storageOptions.forEach(item => {
          item.id == this.labelForm.storageId ? storeName = item.name : ''
        })
        var data =  new FormData()
        data.append('dictDetailCode',this.labelForm.dictDetailCode)
        data.append('entId',Number(sessionStorage.getItem('entId')))
        data.append('number',Number(this.labelForm.number))
        data.append('containeName',storeName)
        data.append('storageId',this.labelForm.storageId)
        data.append('maxPici',1)
        data.append('source',5)
        data.append('depId','')
        this.$axios
                .post(
                        "/api/enterprise/terminal/tEnterpriseInfo/inStorageRoom",data
                )
                .then((response) => {
                  if(!response.code) {
                    this.$message({
                      type: "success",
                      message: "入库成功",
                    });
                    this.resetBtn()
                  }else {
                    this.$message({
                      type: "error",
                      message: response.msg,
                    });
                  }
                })
                .catch(function (err) {});
      }
    },
  };
</script>
<style scoped>
  .containers {
    width: 100%;
  }
  .main-top {
    margin-left: 20px;
  }
  .contents {
    width: 800px;
    /* padding: 50px; */
    margin: 0 auto;
  }
  .submit-form {
    margin-top: 60px;
    width: 70%;
  }
  .select-type {
    width: 100%;
  }
  .footer-btn {
    width: 70%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
</style>