<template>
    <div class="main main-full informationFilling">
        <router-view></router-view>
    </div>
</template>
<script>

</script>
<style>
/* 公用样式 */
body{
    font-size: 14px;
}
ul{
    padding: 0;
}
.boxShadow{
    box-shadow: 2px 2px 4px 2px rgb(219, 184, 184,.12);
}
.boxSizing{
    box-sizing: border-box;
}
.dividingLine{
    width: 100%;
    height: 1px;
    background:rgba(151, 151, 151, .2);
    margin: 10px auto 17px;
}
.rowFlex{
    display: flex;
}
.informationFilling .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before{
    content: none;
}
.biaozhu{
    position: absolute;
    color: rgba(51, 51, 51, .5);
}
.width50{
    width: 50%
}
/* 向右2% */
.left2{
    margin-left: 2%;
}
/* 增加一条按钮 */
.countAdd{
    margin-bottom: 10px;
}
.countAdd>span{
    line-height: 30px;
    color: #333;
    font-size: 14px;
    display: block;
}
.countAdd>.el-form-item{
    margin-bottom: 0;
}
.countAdd .el-form-item__content{
    line-height: 30px;
}
.countAdd .el-input__inner{
    line-height: 30px;
    height: 30px;
}

.breadcrumb>a{
    margin-right: 6px;
}
.breadcrumb .selected{
    font-weight: bold;
}
/*  */
/* 公司信息titile name */
.planDetail .titleName{
    line-height: 21px;
    background-color: rgba(216, 216, 216, .2);
    line-height: 41px;
    padding:0 16px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #000;
}
.secondaryTitle{
    font-size: 16px;
    color: #333;
    font-weight: bold;
}
/* 是否和标题样式 */
.planDetail.wasteTransfer .el-form-item__label{
    font-size: 12px;
    color: #333;
    line-height: 17px;
}
.planDetail.wasteTransfer .el-radio__label{
    font-size: 12px;
    color: #424242;
}
.radioSelected{
    color: #424242;
}
/* 公司信息 */
.planDetail{
    width: 100%;
    margin-top: 15px;
    padding: 24px 35px;
}
/* 温馨提示 */
.rulesIntroduce{
    background-color: rgba(247, 181, 0, 0.13);
    width: 91%;
    padding: 10px 28px ;
    margin-bottom: 23px;
}
.rulesIntroduce span{
    font-size: 12px;
    line-height: 20px;
    display: block;
    color: #666;
}
.rulesIntroduce .el-icon-warning-outline{
    margin-top: 3px;
    margin-right: 5px;
}
/* 上传文件样式 */
.rulesUpload .el-upload-dragger{
    width: 100%;
    height: 100%;
    padding: 47px 21px;
    background:rgba(216, 216, 216, .5);
}
.rulesUpload .el-icon-circle-plus{
    color: rgba(0, 0, 0, .5);
    font-size: 30px;
}
.rulesUpload .el-upload__text span{
    display: block;
    color: #424242;
}
/* 保存一件清空按钮 */
.buttonCon{
    margin-top: 34px;
    margin-left: 2%;
}
.buttonCon .el-button--primary{
    padding: 10px 30px;
    background: #7B7B7B;
    border: none;
}
.buttonCon .el-button + .el-button{
    padding: 10px 30px;
    background: #fff;
    margin-left: 47px;
}
/* 新增按钮 */
.addButton{
    padding: 0 17px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: inline-block;
    margin: 12px 0;
    color: #424242;
    line-height: 29px;
    font-size: 12px;
    cursor: pointer;
}
/* 文字输入框样式 */
.textareaCon .el-textarea__inner{
    height: 246px;
}
.textareaCon .el-textarea{
    width: 55%;
    height: 246px;
}
/* ipnut的表单输入 */
.companyForm{
    display: flex;
    flex-wrap: wrap;
    padding-left:8%;
    padding-right:8%;
    justify-content: space-between;
    color: #333;
}
.companyForm .el-form-item{
    display: flex;
    width: 50%;
    margin-bottom: 19px;
    height: 35px;
    position: relative;
}
.companyForm .el-form-item.lineOne{
    width: 55%;
}
.companyForm .el-form-item.lineOne .el-form-item__label{
    width: 32%;
}
.companyForm .el-form-item.lineOne .el-form-item__content{
    width: 59%;
}
.companyForm .el-form-item__label{
    width: 37.4%;
    color: #333;
}
.companyForm .el-form-item__content{
    width: 70%;
}
.companyForm .el-cascader{
    width: 100%;
}
.companyForm .biaozhu{
    position: absolute;
    color: rgba(51, 51, 51, .5);
    width: 20%;
    padding-left: 5px;
}
</style>
