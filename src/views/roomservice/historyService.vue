<template>
  <div id="currentServiceAdd">
    <el-dialog :title="title" :visible.sync="visible" width="80%" :lock-scroll="false" :show-close="false" :close-on-click-modal="false">
      <el-form :model="searchForm" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="员工姓名:">
              <el-input v-model="searchForm.employeeName" placeholder="员工姓名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="服务类型:" prop="categoryName">
              <el-select v-model="searchForm.categoryName" palceholder="请选择服务类型" clearable>
                <el-option v-for="(val, idx) in categoryList" :key="idx" :label="val" :value="val">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="服务时间：">
              <el-date-picker v-model="createTimeRange" type="daterange" range-separator="-" start-placeholder="起始时间" end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getHistoryList()">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table border height="300" :data="currentServiceInfo" element-loading-text="拼命加载中">
        <el-table-column label="住客信息">
          <el-table-column label="房号" prop="roomNumber" />
          <el-table-column label="员工" prop="employeeName" />
          <el-table-column label="服务类型" prop="categoryName" />
          <el-table-column label="开始时间" prop="serviceStartTime" />
          <el-table-column label="结束时间" prop="serviceEndTime" />
        </el-table-column>
      </el-table>
      <page-component :total="total" :page="{currentPage:searchForm.page,pageSize:searchForm.size}" @pageChange="(item)=>handlePageChange(item)" />
      <span slot="footer">
        <el-button type="primary" @click="cancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getServiceHistoryList } from '@/api/service';
import PageComponent from '@/components/Pagenation/index';
export default {
    components: {
        PageComponent
    },
    props: {
        title: String,
        default: 'title'
    },
    data() {
        return {
            visible: false,
            searchForm: {
                employeeName: '',
                categoryName: '',
                page: 1,
                size: 50
            },
            total: 0,
            createTimeRange: '',
            currentServiceInfo: [],
            categoryList: ['前台接待', '客房服务', '餐饮服务', '洗衣/干洗服务', '行李及行程安排服务', '礼宾服务'],
            serviceData: {}
        };
    },
    mounted() {
        this.getHistoryList();
    },
    methods: {
        open() {
            this.visible = true;
        },

        getHistoryList() {
            getServiceHistoryList(this.searchForm).then((res) => {
                if (res.data.code == 0) {
                    this.total = res.data.totalRows;
                    this.currentServiceInfo = res.data.data;
                }
            });
        },
        handlePageChange(item) {
            this.searchForm = {
                ...this.searchForm,
                page: item.currentPage,
                size: item.pageSize
            };
            this.getServiceHistoryList();
        },

        cancel() {
            this.visible = false;
        }
    }
};
</script>

<style lang="less">
</style>
