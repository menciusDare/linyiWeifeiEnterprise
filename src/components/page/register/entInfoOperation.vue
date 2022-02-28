<template>
    <div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="添加企业" name="first">
                <addEntInfo @handleClose="handleClose" ref="addEntInfo"></addEntInfo>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import addEntInfo from './addEntInfo'
    export default {
        name: "entInfoOperation",
        components:{
            addEntInfo
        },
        data(){
            return{
                activeName: 'first'
            }
        },
        methods:{
            handleClick(tab, event) {

            },
            handleClose(){
              this.$emit("handleClose")
            }
        },
        mounted: function () {

        },
        created() {

        }
    }
</script>

<style scoped>

</style>