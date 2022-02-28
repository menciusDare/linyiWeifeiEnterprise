<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#"><i class="icon icon-jianguan"></i>出库管理</a
        ><span class="sep">&gt;</span><span class="text-primary">出库填报</span>
      </div>
    </div>
    <div class="panel">
      <div class="outboundLeft">
        <div class="leftTop">
          <span>请选择出库危废</span>
          <!-- <el-checkbox v-model="checked" @change="pickAll()">全选</el-checkbox> -->
        </div>
        <div class="leftList">
          <el-table
            v-loading="loading"
            :data="tableData"
            :border="true"
            height="100%"
            :header-cell-style="{ background: '#f5f7fa' }"
          >
            <el-table-column label="" width="60" align="center">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.selected"
                  @change="changeValue(scope.row, scope.$index)"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="timeStr" label="入库时间" align="center">
            </el-table-column>
            <el-table-column prop="name" label="废物名称" align="center">
            </el-table-column>
            <el-table-column
              prop="dictDetailCode"
              label="废物代码"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="numberStr"
              label="数量"
              width="120"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-card class="outboundRight">
        <div class="outboundOption">
          <div class="rightItem"><span>总计：</span>{{ totalWeight }}Kg</div>
          <div class="rightItem">
            <span>出库时间： </span>
            <el-date-picker
              v-model="dateTime"
              type="datetime"
              placeholder="选择日期时间"
              format-value="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
          <div class="rightItem button-group">
            <el-button type="primary" @click="confirm()" :loading = "commitLoading">确定</el-button>
            <el-button @click="cancel()">取消</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "outbound",
  data() {
    return {
      commitLoading: false,
      loading: false,
      routePath: this.$route.path,
      checked: false,
      dateTime: null,
      tableData: [],
      totalWeight: 0,
      content: "",
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      this.loading = true
      this.$axios
        .post(
          "/api/enterprise/tEnterpriseStorageStandingBook/listCanVoluntaryDeliveryHazardousInfo"
        )
        .then((res) => {
          this.loading = false
          if (res.code == 0) {
            this.tableData = res.data.map((item) => {
              item.numberStr = item.number + "kg";
              item.code = item.name + item.dictDetailCode;
              item.timeStr = item.storageTime;
              item.selected = false
              return item;
            });
          }
        })
        .catch(function (err) {
          this.loading = false
        });
    },
    changeValue(params, index) {
      if (this.content && params.code != this.content) {
        this.$message({
          type: "info",
          message: "请选择相同类型",
        });
        this.tableData[index].selected = false;
      } else {
        this.content = params.code;
      }
      let local = this.tableData.filter((item) => {
        return item.selected == true;
      });
      if (local <= 0) {
        this.content = "";
        this.tableData = JSON.parse(JSON.stringify(this.tableData));
      }
      let total = 0;
      this.tableData.forEach((item) => {
        if (item.selected) {
          total = total + Number(item.number);
        }
      });
      this.totalWeight = total;
    },
    // pickAll() {
    //   let code = this.tableData[0].code;
    //   let onlyMark = true;
    //   this.checked = false;
    //   for (let i = 1; i < this.tableData.length; i++) {
    //     if (this.tableData[i].code == code) {
    //       onlyMark = false;
    //       this.checked = false;
    //       this.$message({
    //         type: "info",
    //         message: "所有数据的类型不唯一，不能全选",
    //       });
    //       break;
    //     }
    //   }

    //   if (onlyMark) {
    //     this.checked = true;
    //     this.tableData = this.tableData.map((item) => {
    //       item.selected = true;
    //       return item;
    //     });
    //   }
    // },
    confirm() {
      this.commitLoading = true
      if (this.dateTime == null) {
        this.$message({
          type: "info",
          message: "请选择出入内容或出库时间!",
        });
        this.commitLoading = false
        return;
      } else {
        let data = {
          hazardousInfoDTOS: this.tableData.filter((item) => {
            return item.selected == true;
          }),
          outTime: this.dateTime,
        };
        this.$axios
          .post(
            "/api/enterprise/tEnterpriseStorageStandingBook/voluntaryDelivery",
            data
          )
          .then((res) => {
            this.commitLoading = false
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "出库成功!",
              });
              this.getListData();
              this.content = "";
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          })
          .catch(function (err) {
            this.commitLoading = false
          });
      }
    },
    cancel() {
      this.dateTime = null;
      this.totalWeight = 0;
      this.content = "";
      this.tableData.map((item) => {
        item.selected = false;
        return item;
      });
    },
  },
};
</script>

<style scoped>
.panel {
  display: flex;
  height: 92%;
  padding: 20px;
}
.el-table__header {
  background: #f5f7fa;
}
.leftList {
  margin-top: 20px;
  height: 90%;
  overflow: hidden;
}
.outboundLeft {
  width: 60%;
  padding-right: 20px;
  height: 100%;
}
.leftTop {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.outboundRight {
  width: 40%;
  padding: 20px 0 20px 20px;
  margin-top: 45px;
  height: 200px;
}
.rightItem {
  margin-bottom: 10px;
}
.button-group {
  margin-top: 20px;
}
</style>
