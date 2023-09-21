<template>
  <div class="page-component">
    <el-pagination background layout="total, sizes,prev, pager, next,jumper" :total="total" :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize" :page-sizes="[10, 50, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>

</template>
<script>
export default {
    props: {
        total: {
            required: true
        },
        page: {
            required: true
        }
    },
    methods: {
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.$emit('pageChange', this.page);
        },
        handleCurrentChange(val) {
            this.page.currentPage = val;
            this.$emit('pageChange', this.page);
        }
    }
};
</script>
<style lang="less" >
.page-component {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>

