<template>
  <div class="pagination">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSizes" :background="background"
      :page-sizes="[10, 30, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>
<script>
export default {
  name: "paginAtion",
  props: {
    total: {
      default: () => { },
      type: Number,
    },
    pageNum: {
      // 当前页
      type: Number,
      default: () => { },
    },
    pageSize: {
      // 每页显示条数
      type: Number,
      default: 10,
      // 默认10条
    },
    background: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSizes: 10,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", {
        pageSize: val,
        currentPage: this.currentPage,
      });
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", {
        currentPage: val,
        pageSize: this.pageSizes,
      });
    },
  },
};
</script>
<style scoped>
.pagination {
  text-align: center;
  padding-top: 5px;
  background-color: #fff;
  /* padding-bottom: 10px; */
}
</style>
