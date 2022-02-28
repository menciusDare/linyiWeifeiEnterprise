<template>
    <div class="login-page">
        <div class="login-side">
            <div class="login-side-bd" style="width: 100%;position:fixed;height: 40px;top: -35px">
                <!--<img src="../../static/css/images/pic/loginNow.png" style="width: 60px;height:60px;transform: translate(-280px,65px)">
                <p style="font-size: 36px;transform: translate(0px,-19px)">&nbsp;&nbsp;&nbsp;&nbsp;临沂市危废全过程企业管理平台</p>-->
                <!--  -->     <img src="../../static/css/images/logo.png" style="width: 110px;height:60px;transform: translate(-210px,65px)">
                      <p style="font-size: 36px;transform: translate(40px,-19px)">&nbsp;&nbsp;&nbsp;&nbsp;危废全过程企业管理平台</p>
                  </div>
              </div>

              <div class="login-main">
                  <div class="login-main-bd">
                      <div class="login-tit">用户登录</div>
                      <div class="login-item">
                          <label class="login-label" for="username">账号：</label>
                          <br/>
                          <input v-model="ruleForm.username" type="text" class="login-input" placeholder="请输入您的账号" id="username">
                          <div v-if="userNameMessage" class="login-tips" style="display: block;">{{userNameMessage}}</div>
                          <!--<div class="login-tips" style="display: block;">用户名错误</div>-->
                </div>
                <div class="login-item">
                    <label class="login-label" for="pwd">密码：</label>
                    <br/>
                    <input v-model="ruleForm.password" type="password"  class="login-input" placeholder="请输入您的密码" id="pwd">
                    <div v-if="passwordMessage" class="login-tips" style="display: block;">{{passwordMessage}}</div>
                </div>
                <div class="login-item">
                    <div style="height: 10px"></div>
                    <el-checkbox v-model="checked">&nbsp;<span style="font-size: 16px;color: white">记住密码</span></el-checkbox>
                </div>
                <!--<div class="login-item">-->
                <!--<label class="login-label" for="code">验证码：</label>-->
                <!--<input type="text" class="login-input login-input-code" placeholder="请输入验证码" id="code">-->
                <!--<div class="login-code">-->
                <!--<img src="../../static/css/images/pic/code.png" alt="" class="login-code-pic">-->
                <!--<span class="login-code-text">看不清？换一张</span>-->
                <!--</div>-->
                <!--<div class="login-tips" style="display: block;">验证码错误，请检查并重新输入</div>-->
                <!--</div>-->
                <div class="login-item-btn" @keyup.enter.native="submitForm()">
                    <a href="#" class="login-btn" @click="submitForm()">登 录</a>
                    <a href="#" class="login-btn" @click="register()">注 册</a>
                </div>
                <!--<div class="login-item-text">-->
                <!--<div class="login-remember is-active"><i></i>记住密码</div>-->
                <!--<div class="login-account"><a href="#">忘记密码?</a><span>|</span><a href="#" class="text-white">立即注册</a></div>-->
                <!--</div>-->
            </div>
            <div class="login-main-foot" style="transform: translate(0px,50px)">
                <p>
                    <span>中节能天融科技有限公司</span>
                    <span>版权所有</span>
                </p>
                <p>
                    <span>Copyright © {{startYear}}-{{endYear}} </span>
                    <span>All Right Reserved </span>
                    <!--<span>京ICP备10207363-1号</span>-->
                </p>
            </div>
        </div>
      <!--注册弹窗-->
      <el-dialog
          title="企业注册"
          :visible.sync="entInfoOperationDialogVisible"
          :close-on-press-escape = "false"
          :close-on-click-modal = "false"
          :modal-append-to-body = "false"
          width="50%"
          :before-close="handleClose">
        <!--添加企业-->
        <entInfoOperation @handleClose="handleClose" ref="entInfoOperation"></entInfoOperation>
      </el-dialog>
    </div>
</template>

<script>
    import entInfoOperation from "./page/register/entInfoOperation.vue";
    export default {
        name: "loginHtml",
        components:{
          entInfoOperation
        },
        data(){
            return{
                entInfoOperationDialogVisible:false,
                startYear: 2019,
                endYear: 2019,
                authUsername: this.AppConfig.authInfo.username,
                authPassword: this.AppConfig.authInfo.password,
                userNameMessage: '',
                passwordMessage: '',
                checked:false,
                ruleForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            register(){
              this.entInfoOperationDialogVisible = true;
            },
            handleClose(){
              this.entInfoOperationDialogVisible = false;
              this.$refs.entInfoOperation.$refs.addEntInfo.$refs['entRuleForm'].clearValidate();
              this.$refs.entInfoOperation.activeName = "first";
            },
            validateFrom(){
                if (!this.ruleForm.username){
                    this.userNameMessage = "请输入账号";
                    return false;
                }else if (!this.ruleForm.password){
                    this.passwordMessage = "请输入密码";
                    return false;
                }else {
                    return true;
                }
            },
            submitForm() {
                const self = this;
                //判断复选框是否被勾选 勾选则调用配置cookie方法
                if (self.checked == true) {
                    console.log("checked == true");
                    //传入账号名，密码，和保存天数3个参数
                    if(self.ruleForm.password.length > 30) {
                        self.setCookie(self.ruleForm.username,self.ruleForm.password,true , 7);
                    }else{
                        self.setCookie(self.ruleForm.username,this.$md5(this.$md5(self.ruleForm.password)),true , 7);
                    }
                }else {
                    console.log("清空Cookie");
                    //清空Cookie
                    self.clearCookie();
                }
                //与后端请求代码，本功能不需要与后台交互所以省略
                console.log("登录成功");
                if (this.validateFrom()) {
                    var params = new URLSearchParams();
                    let password = this.ruleForm.password
                    if(this.checked == true) {
                        if(this.ruleForm.password.length < 30) {
                            password = this.$md5(this.$md5(this.ruleForm.password))
                        }
                    }else {
                        password = this.$md5(this.$md5(this.ruleForm.password))
                    }
                    params.append('username', this.ruleForm.username);
                    params.append('password', password);
                    //登录
                    self.$axios.post("/api/auth/web/token?grant_type=password",params,
                        {
                            auth: {
                                username: self.authUsername,
                                password: self.authPassword,
                            },
                        }).then(function (response) {
                            if(response.code==0){
                                console.log(response)
                                sessionStorage.setItem('token', response.data.access_token);
                                sessionStorage.setItem('name', response.data.name);
                                self.AppConfig.appInfo.userName = response.data.name;
                                  sessionStorage.setItem('entId', response.data.entId);
                                sessionStorage.setItem('username', response.data.username);
                                sessionStorage.setItem('userId', response.data.userId);
                                sessionStorage.setItem('entId', response.data.entId);
                                sessionStorage.setItem('regionCode', response.data.regionCode);
                                sessionStorage.setItem('regionLevel', response.data.regionLevel);
                                sessionStorage.setItem('roleType',response.data.roleType);
                                self.$axios.get("/api/regulatory/regionInfo/getRegionLatByRegionCode?regionCode="+response.data.regionCode).then(function (response) {
                                    if(response.code==0){
                                        sessionStorage.setItem('lng', response.data.lng);
                                        sessionStorage.setItem('lat', response.data.lat);
                                    }else{
                                        console.log("坐标获取失败！");
                                    }
                                }).catch(function (err) {
                                    console.log("坐标获取失败！");
                                })
                                if(response.data.roleType == 1){  //收集企业管理员
                                    setTimeout(function () {
                                        self.$router.push('/applicationRegistration');
                                    },50)
                                }else if(response.data.roleType == 8){//运输企业管理员
                                    setTimeout(function () {
                                        self.$router.push('/VehicleList');
                                    },50)
                                }else if(response.data.roleType == 5){ //产废企业管理员
                                    setTimeout(function () {
                                        self.$router.push('/applicationRegistration');
                                    },50)
                                }else if(response.data.roleType == 7){ //经营企业管理员
                                    setTimeout(function () {
                                        self.$router.push('/applicationRegistration');
                                    },50)
                                }else if(response.data.roleType == 9){ //运营管理员
                                    setTimeout(function () {
                                        self.$router.push('/amfHomeHtml');
                                    },50)
                                }else{
                                    self.$message.error("账号无此系统登录权限！")
                                }

                            }else{
                                self.$message.error(response.msg)
                            }
                    }).catch(function (err) {
                        console.log(err);
                        self.$message.error("登录失败,连接服务器失败!")
                    })
                };
            },
            initCopyRightTime(){
                var _this = this;
                var date = new Date();
                _this.startYear = date.getFullYear();
                _this.endYear = this.startYear + 100;
                _this.getCookies();
            },
            //设置cookie
            setCookie(c_name, c_pwd,c_checked, exdays) {
                var _this = this;
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + _this.StrToGMT(exdate);
                window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + _this.StrToGMT(exdate);
                window.document.cookie = "checked" + "=" + c_checked + ";path=/;expires=" + _this.StrToGMT(exdate);
            },
            StrToGMT(time){
                let GMT = new Date(time)
                return GMT
            },
            //读取cookie
            getCookies() {
                var _this = this;
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        //判断查找相对应的值
                        if (arr2[0] == 'userName') {
                            _this.ruleForm.username = arr2[1]; //保存到保存数据的地方
                        } else if (arr2[0] == 'userPwd') {
                            _this.ruleForm.password = arr2[1];
                        } else if (arr2[0] == 'checked') {
                            if("true"==arr2[1]){
                                _this.checked = true;
                            }else{
                                _this.checked = false;
                            }

                        }
                    }
                }
            },
            //清除cookie
            clearCookie: function() {
                this.setCookie("", "",false, -1); //修改2值都为空，天数为负1天就好了
            }
        },
        created() {
            var _self = this;
            _self.initCopyRightTime();
            document.onkeydown = function(e){
                if(window.event == undefined){
                    var key = e.keyCode;
                }else{
                    var key = window.event.keyCode;
                }
                if(key == 13){
                    _self.submitForm();
                }
            }
            this.initCopyRightTime();

        },
        destroyed(){
            document.onkeydown = undefined
        }
    }
</script>

<style scoped>
.login-item-btn{
  display: flex;
  justify-content: space-between;
}
.login-item-btn>a{
  width: 48%;
}
</style>
