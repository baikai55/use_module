<template>
    <div id="table-test">
        <table-component :header="header" :tableData="tableData" ref="table"></table-component>
        <pagination-component :total="total" :pageNum="pageNum" :pageSize="pageSize" ref="pagination" background
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></pagination-component>

        <!-- <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" /> -->
    </div>
</template>

<script>
import tableComponent from '@/components/vue3_table_comp/tableComponent.vue'
import { reactive, toRefs } from '@vue/reactivity'
import PaginationComponent from '@/components/vue3_table_comp/paginationComponent.vue'
export default {
    components: { tableComponent, PaginationComponent },
    setup() {
        const data = reactive({
            tableData: [{ userName: "admin", realName: "管理员" }, { userName: "admin", realName: "管理员" }],
            header: [
                { prop: "userName", label: "用户名", minWidth: "120px" },
                { prop: "realName", label: "姓名", minWidth: "120px" },],
            pageSize: 10,
            pageNum: 1,
            total: 20
        })
        // 分页器一页显示多少条
        const handleSizeChange = (val) => {
            data.pageSize = val.pageSize;
        }
        // 分页器当前页
        const handleCurrentChange = (val) => {
            console.log(val);
            data.pageNum = val.currentPage;
        }
        return {
            ...toRefs(data),
            handleSizeChange,
            handleCurrentChange,
        }
    }
}
</script>

<style>

</style>