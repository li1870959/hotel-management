<template>
  <div class="service" ref="box">
    <el-form v-model="searchForm" inline>

      <el-form-item label="员工:" prop="employeeName">
        <el-select v-model="searchForm.employeeName" palceholder="请选择员工" clearable>
          <el-option v-for="(val, idx) in empList" :key="idx" :label="val.readName" :value="val.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务类型:" prop="categoryName">
        <el-select v-model="searchForm.categoryName" palceholder="请选择服务类型" clearable>
          <el-option v-for="(val, idx) in categoryList" :key="idx" :label="val" :value="val">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间：">
        <el-date-picker v-model="createTimeRange" type="daterange" range-separator="-" start-placeholder="服务开始时间" end-placeholder="服务结束时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getServiceList()">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.open(null)">新增</el-button>
        <el-button type="primary" icon="el-icon-search" @click="$refs.historyService.open()">查询历史服务</el-button>
      </el-form-item>

    </el-form>
    <el-table border :height="tableHeight" :data="serviceList" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号" type="index" width="55">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" prop="employeeName" />
      <el-table-column label="服务类型" prop="categoryName" />
      <el-table-column label="房号" prop="roomNumber" />
      <el-table-column label="服务时间" prop="createTime" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="操作" prop="operation" width="200">
        <template slot-scope="scoped">
          <el-button type="text" icon="el-icon-edit" @click="$refs.updateDialog.open(scoped.row)">修改</el-button>
          <el-button type="text" icon="el-icon-check" @click="finishService(scoped.row)">服务完成</el-button>
          <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scoped.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-dialog ref="addDialog" title="新增" @confirmData="(item) => addservice(item)" />
    <update-dialog ref="updateDialog" title="修改" @confirmData="(item) => updateservice(item)" />
    <history-service ref="historyService" title="历史服务" />
    <page-component :total="total" :page="{currentPage:searchForm.page,pageSize:searchForm.size}" @pageChange="(item)=>handlePageChange(item)" />
  </div>
</template>

<script>
import AddDialog from './addService';
import updateDialog from './addService';
import historyService from './historyService';
import { getServiceList } from '@/api/service';
import { getempDataList } from '@/api/employee';
import PageComponent from '@/components/Pagenation/index';
export default {
    components: {
        PageComponent,
        AddDialog,
        updateDialog,
        historyService
    },
    data() {
        return {
            tableHeight: 0,
            loading: true,
            empList: [], // 保存员工信息
            searchForm: {
                employeeName: '',
                categoryName: '',
                page: 1,
                size: 50
            },
            createTimeRange: '',
            serviceList: [],

            categoryList: ['前台接待', '客房服务', '餐饮服务', '洗衣/干洗服务', '行李及行程安排服务', '礼宾服务'],
            total: 0,
            serviceData: {}
        };
    },
    mounted() {
        this.getServiceList();
        this.getempList();
        this.getTableHeight();
    },
    methods: {
        getTableHeight() {
            const boxHeight = this.$refs.box.offsetHeight;
            this.tableHeight = boxHeight - 100;
        },
        getempList() {
            getempDataList({ number: '', readName: '', page: 1, limit: 50 }).then((res) => {
                console.log(res);
                this.empList = res.data.data;
            });
        },

        handlePageChange(item) {
            this.searchForm = {
                ...this.searchForm,
                page: item.currentPage,
                size: item.pageSize
            };
            this.getServiceList();
        },

        getServiceList() {
            getServiceList(this.searchForm).then((res) => {
                this.loading = false;
                this.serviceList = res.data.data;
                this.total = res.data.total;
            });
        },

        addservice() {
            this.$message({
                type: 'success',
                message: '新增客房服务成功'
            });
            this.getServiceList();
        },
        updateservice() {
            this.$message({
                type: 'success',
                message: '修改客房类型成功'
            });
            this.getServiceList();
        },
        finishService() {
            this.$message({
                type: 'success',
                message: '该服务已完成'
            });
        },
        handleDelete(data) {
            this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then((res) => {
                    this.serviceList = this.serviceList.filter((v) => v.id !== data.id);
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>

<style lang="less" scoped>
.service {
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
