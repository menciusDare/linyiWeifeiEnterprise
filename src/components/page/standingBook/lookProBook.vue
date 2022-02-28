<template>
    <div>
        <el-dialog
                :title="dialogTitle"
                :visible.sync="centerDialogVisible"
                class="dlogBox"
                :modal-append-to-body="false"
                :close-on-click-modal="false"
                width="60%"
                :before-close="closeDoalog"
        >
            <div>
                <div class="modal-bd">
                    <!-- 危废 -->
                    <div class="wf-info">
                        <div class="wf-hd">
                            <div class="wf-time">
                                <i class="icon icon-time"></i>
                                {{tableData.storageTime}}
                            </div>
                        </div>
                        <div class="wf-bd">
                            <table class="table-text">
                                <tr>
                                    <td>
                                        <div class="list-name">危废名称：</div>
                                        <div class="list-text">{{tableData.dictDetailName}}</div>
                                    </td>
                                    <td>
                                        <div class="list-name">数量(KG)：</div>
                                        <div class="list-text">{{tableData.number}}</div>
                                    </td>
                                    <td>
                                        <div class="list-name">贮存容器：</div>
                                        <div class="list-text">{{tableData.containerName}}</div>
                                    </td>
                                    <td>
                                        <div class="list-name">容器个数：</div>
                                        <div class="list-text">1桶</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="list-name">危废类别：</div>
                                        <div class="list-text">{{tableData.dictTypeName}}</div>
                                    </td>
                                    <td>
                                        <div class="list-name">危废代码：</div>
                                        <div class="list-text">{{tableData.dictDetailCode}}</div>
                                    </td>
                                    <td>
                                        <div class="list-name">经办人：</div>
                                        <div class="list-text">{{tableData.userName}}</div>
                                    </td>
                                    <td v-if="tableData.type==4">
                                        <div class="list-name">完成时间：</div>
                                        <div class="list-text">{{tableData.completeTime}}</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- 处置 -->
                    <div class="cz-cont mt">
                        <div class="code-box">
                            <img :src="tattachment?imgurl+tattachment.locationUrl:'../../../../static/css/images/code.png'" alt class="code-pic" />
                            <div class="code-text">{{tableData.sourceTracing}}<!--预留相关内容文字描述放置两行--></div>
                        </div>
                        <div class="step-box step03">
                            <ol class="step-list">
                                <li class="is-active" style="height: unset;" v-if="cz">
                                    <div class="step-time">
                                        <span class="time-text">利用处置</span>
                                    </div>
                                    <div class="step-icon">
                                        <span class="step-num"></span>
                                        <div class="step-line" style="height: unset;"></div>
                                    </div>
                                    <div class="qiye-con">
                                        <div class="qiye-item">
                                            <div>处置企业：</div>
                                            <div>{{regionName}} {{entName}}</div>
                                        </div>
                                        <div class="qiye-item">
                                            <div>处置时间：</div>
                                            <div>{{cz.time}}</div>
                                        </div>
                                    </div>
                                </li>
                                <li :class="cz?'':'is-active'" style="height: unset;" v-if="zy">
                                    <div class="step-time">
                                        <span class="time-text">转移</span>
                                    </div>
                                    <div class="step-icon">
                                        <span class="step-num"></span>
                                        <div class="step-line" style="height: unset;"></div>
                                    </div>
                                    <div class="qiye-con">
                                        <div class="qiye-item">
                                            <div>承运企业：</div>
                                            <div>{{zy.regionName}} {{zy.entName}}</div>
                                        </div>
                                        <div class="qiye-item">
                                            <div>车辆：</div>
                                            <div>{{zy.cardNo}}</div>
                                        </div>
                                        <div class="qiye-item">
                                            <div>承运人：</div>
                                            <div>{{zy.contacts}}</div>
                                        </div>
                                        <div class="qiye-item">
                                            <div>运输时间：</div>
                                            <div>{{zy.time}}</div>
                                        </div>
                                        <div class="qiye-item">
                                            <div>五联单：</div>
                                            <div>{{zy.fivefoldSheet}}</div>
                                        </div>
                                    </div>
                                </li>

                                <li :class="(cz || zy)?'':'is-active'" style="height: unset;" v-if="zc">
                                    <div class="step-time">
                                        <span class="time-text">贮存</span>
                                    </div>
                                    <div class="step-icon">
                                        <span class="step-num"></span>
                                        <div class="step-line" style="height: unset;"></div>
                                    </div>
                                    <div class="qiye-con">
                                        <div class="qiye-item">
                                            <div>贮存企业：</div>
                                            <div>{{regionName}} {{entName}}</div>
                                        </div>
                                        <div class="qiye-item">
                                            <div>接收时间：</div>
                                            <div>{{zc.time}}</div>
                                        </div>
                                    </div>
                                </li>
                                <li :class="(cz || zy || zc)?'':'is-active'" style="height: unset;" v-if="sc">
                                    <div class="step-time">
                                        <span class="time-text">生产</span>
                                    </div>
                                    <div class="step-icon">
                                        <span class="step-num"></span>
                                        <div class="step-line" style="height: unset;"></div>
                                    </div>
                                    <div class="qiye-con">
                                        <div class="qiye-item">
                                            <div>生产企业：</div>
                                            <div>{{regionName}} {{entName}}</div>
                                        </div>
                                        <div class="qiye-item">
                                            <div>接收时间：</div>
                                            <div>{{sc.time}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "lookProBook",
        props: {},
        components: {},
        computed: {},
        data() {
            return {
                dialogTitle:"订单流转信息",
                centerDialogVisible: false,
                tableData:{},
                zc: null,
                cz: null,
                sc: null,
                zy: null,
                tattachment:null,
                // entId:'',
                entName:'',
                regionName:'',
                imgurl:this.IMG_URL,
            }
        },
        methods: {
            openDialog(item){
                this.centerDialogVisible = true;
                this.tableData=item;
                this.selectentErpriseBookTraceability(item.sourceTracing);
                this.getInfo();
            },
            closeDoalog(){
                this.centerDialogVisible = false;
                this.tableData = {};
                this.entName = '';
                this.regionName='';
            },
            getInfo(){
                let self = this;
                self.$axios.get("/api/regulatory/tVideocamera/getEntIdAndCompanyName").then((res) => {
                    if (res.code == 0 && res.data != null) {
                        // self.entId=res.data.id;
                        self.entName=res.data.name;
                        self.regionName=res.data.regionCode;
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            //溯源
            selectentErpriseBookTraceability(sourceTracing) {
                var _this = this;
                _this.$axios.post("/api/regulatory/tEnterpriseInfo/selectentErpriseBookTraceability", {
                        sourceTracing: sourceTracing
                }).then(response => {
                    if (response.code == 0) {
                        _this.sc = null;
                        _this.zc = null;
                        _this.zy = null;
                        _this.cz = null;
                        _this.tattachment=response.data.tattachment;
                        response.data.list.forEach(element => {
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
                }).catch(error => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>

</style>