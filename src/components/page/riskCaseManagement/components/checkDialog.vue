<template>
    <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="案件描述" name='check'>
            <AddDialog :currentData="currentData"></AddDialog>
        </el-tab-pane>
        <el-tab-pane label="整改办理记录" name='消息中心'>
            <RectificationRecord :currentData="currentData"></RectificationRecord>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
    import AddDialog from './addDialog.vue';
    import RectificationRecord from './rectificationRecord.vue';
    export default {
        name: 'checkDialog',
        components: {
            AddDialog,
            RectificationRecord
        },
        props: {
            currentData: Object
        },
        data() {
            return {
                activeName: 'check',
                formInline: {
                    officials: '',
                    region: '',
                    enterprise: '',
                    caseDetail: '',
                    radio: 3
                },
                labelPosition: 'right',
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                imageUrl: ''
            }
        },
        methods: {
            cancelCase() {
                this.$emit('cancelDialog')
            },
            confirmDialog(formName) {
                this.$emit('cancelDialog')
            }
        }
    }
</script>

<style></style>
