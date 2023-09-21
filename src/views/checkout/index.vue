<template>
  <div class="checkout" ref="box">
    <el-form v-model="searchForm" inline>

      <el-form-item label="客房信息：" prop="roomInfo	">
        <el-input v-model="searchForm.roomInfo	" placeholder="请输入客房信息" clearable />
      </el-form-item>

      <el-form-item label="住客信息：" prop="tenantInfo">
        <el-input v-model="searchForm.tenantInfo" placeholder="请输入住客信息" clearable />
      </el-form-item>

      <el-form-item label="房费：" prop="startMoney">
        <el-input v-model="searchForm.startMoney" placeholder="最低房费" clearable style="width:48%" />-
        <el-input v-model="searchForm.endMoney" placeholder="最高房费" clearable style="width:48%" />
      </el-form-item>

      <el-form-item label="入住时间：">
        <el-date-picker v-model="checkinTimeRange" type="daterange" range-separator="-" start-placeholder="起始时间" end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="退房时间：">
        <el-date-picker v-model="checkoutTimeRange" type="daterange" range-separator="-" start-placeholder="起始时间" end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getCheckoutList()">查询</el-button>
      </el-form-item>

    </el-form>
    <el-table border :height="tableHeight" :data="CheckoutList" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号" type="index" width="55">
        <template slot-scope="scope">
          <span>{{  scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房号" prop="number" />
      <el-table-column label="入住天数" prop="checkinDay" />
      <el-table-column label="入住时间" prop="checkinTime" />
      <el-table-column label="退房时间" prop="checkoutTime" />
      <el-table-column label="房费" prop="money" />
      <el-table-column label="操作" prop="operation" width="100">
        <template slot-scope="scoped">
          <el-button type="text" @click="$refs.updateDetails.open(scoped.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page-component :total="total" :page="{currentPage:searchForm.page,pageSize:searchForm.size}" @pageChange="(item)=>handlePageChange(item)" />
    <update-details ref="updateDetails" title="退房详情" />
  </div>
</template>

<script>
import UpdateDetails from './details';
import { getCheckoutList } from '@/api/checkout';
import { formateDate } from '@/utils/formateDate';
import PageComponent from '@/components/Pagenation';
export default {
    components: {
        PageComponent,
        UpdateDetails
    },
    data() {
        return {
            tableHeight: 0,
            loading: false,
            searchForm: {
                roomInfo: '',
                tenantInfo: '',
                statCheckinTime: '',
                endCheckinTime: '',
                statCheckoutTime: '',
                endCheckoutTime: '',
                startMoney: '',
                endMoney: '',
                page: 1,
                size: 50
            },
            total: 0,
            checkinTimeRange: '',
            checkoutTimeRange: '',
            CheckoutList: [],
            checkoutData: {}
        };
    },
    mounted() {
        this.getCheckoutList();
        this.getTableHeight();
    },
    methods: {
        formateDate,
        getTableHeight() {
            const boxHeight = this.$refs.box.offsetHeight;
            this.tableHeight = boxHeight - 100;
        },
        handlePageChange(item) {
            this.searchForm = {
                ...this.searchForm,
                page: item.currentPage,
                size: item.pageSize
            };
            this.getCheckoutList();
        },

        getCheckoutList() {
            this.loading = true;
            getCheckoutList(this.searchForm).then((res) => {
                if (res.data.code === 0) {
                    this.total = res.data.total;
                    this.CheckoutList = res.data.data;
                    this.loading = false;
                }
            });
        },

        addCheckout(item) {
            this.$message({
                type: 'success',
                message: '新增入住成功'
            });
            this.getCheckoutList();
        }
    }
};
</script>

<style lang="less" scoped>
.checkout {
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-form {
        .el-form-item {
            margin-right: 30px;
        }
    }
    .el-table {
        flex: 1;
    }
}
</style>
