<template>
  <div class="checkin" ref="box">
    <el-form v-model="searchForm" inline>

      <el-form-item label="房号：" prop="number">
        <el-input v-model="searchForm.number" placeholder="请输入房号" clearable />
      </el-form-item>

      <el-form-item label="客房类型：" prop="roomType">
        <el-input v-model="searchForm.roomType" placeholder="请输入客房类型" clearable />
      </el-form-item>

      <el-form-item label="床型：" prop="bedType">
        <el-select v-model="searchForm.bedType" placeholder="请选择床型" clearable>
          <el-option v-for="i in bedTypeList" :key="i" :label="i" :value="i">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态：" prop="state">
        <el-select v-model="searchForm.state" placeholder="请选择状态" clearable>
          <el-option v-for="(item,idx) in states" :key="idx" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间：">
        <el-date-picker v-model="createTimeRange" type="daterange" range-separator="-" start-placeholder="入住时间" end-placeholder="退房时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="房费：" prop="startMoney">
        <el-input v-model="searchForm.startMoney" placeholder="最低房费" clearable style="width:48%" />-
        <el-input v-model="searchForm.endMoney" placeholder="最高房费" clearable style="width:48%" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getCheckinList()">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.open(null)">新增</el-button>
      </el-form-item>

    </el-form>
    <el-table border :height="tableHeight" :data="checkinList" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号" type="index" width="55">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房号" prop="number" />
      <el-table-column label="入住时间" prop="checkinTime" />
      <el-table-column label="入住天数" prop="checkinDay" />
      <el-table-column label="房费" prop="money" />
      <el-table-column label="预计退房时间" prop="expectCheckoutTime" />
      <el-table-column label="操作" prop="operation" width="200" fixed="right">
        <template slot-scope="scoped">
          <el-button type="text" @click="$refs.updateDetails.open(scoped.row)">查看详情</el-button>
          <el-button type="text" class="red" @click="$refs.updateRoom.open(scoped.row)">换房</el-button>
          <el-button type="text" class="red" @click="$refs.updateDialog.open(scoped.row)">修改</el-button>
          <el-button type="text" class="red" @click="$refs.checkOut.open(scoped.row)">退房</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-dialog ref="addDialog" title="新增入住" @confirmData="(item) => addcheckin(item)" />
    <check-out ref="checkOut" title="调整房费" @confirmData="(item) => checkout(item)" />
    <update-details ref="updateDetails" title="入住详情" />
    <update-dialog ref="updateDialog" title="修改入住天数" @confirmData="(item) => updateCheckin(item)" />
    <update-room ref="updateRoom" title="换房" @confirmData="(item) => updateRoom(item)" />
    <page-component :total="total" :page="{currentPage:searchForm.page,pageSize:searchForm.size}" @pageChange="(item)=>handlePageChange(item)" />
  </div>
</template>

<script>
import AddDialog from './addCheckin';
import UpdateDetails from './details';
import UpdateDialog from './updateDialog';
import UpdateRoom from './updateroom';
import CheckOut from './checkout';
import { getCheckinList } from '@/api/checkin';
import { getCategoryList } from '@/api/room';
import PageComponent from '@/components/Pagenation';
export default {
    components: {
        PageComponent,
        AddDialog,
        UpdateDetails,
        UpdateDialog,
        UpdateRoom,
        CheckOut
    },
    data() {
        return {
            tableHeight: 0,
            loading: true,
            searchForm: {
                number: '',
                roomType: '',
                bedType: '',
                state: '',
                startMoney: '',
                endMoney: '',
                statTime: '',
                endTime: '',
                page: 1,
                size: 50
            },
            total: 0,
            states: [
                {
                    label: '未退房未到期',
                    value: 1
                },
                {
                    label: '未退房已到期',
                    value: 2
                }
            ],
            createTimeRange: '',
            checkinList: [],
            checkinData: {},
            bedTypeList: []
        };
    },
    mounted() {
        this.getCheckinList();
        this.getCategoryList();
        this.getTableHeight();
    },
    methods: {
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
            this.getCheckinList();
        },
        getCategoryList() {
            getCategoryList().then((res) => {
                if (res.data.code === 0) {
                    this.bedTypeList = res.data.data;
                }
            });
        },

        getCheckinList() {
            this.loading = true;
            getCheckinList(this.searchForm)
                .then((res) => {
                    if (res.data.code == 0) {
                        this.total = res.data.total;
                        this.checkinList = res.data.data;
                        this.loading = false;
                    }
                })
                .catch(() => {
                    this.loading = false;
                });
        },

        addcheckin() {
            this.$message({
                type: 'success',
                message: '新增成功'
            });
            this.getCheckinList();
        },
        updateCheckin() {
            this.$message({
                type: 'success',
                message: '修改入住天数成功'
            });

            this.getCheckinList();
        },
        updateRoom(item) {
            this.$message({
                type: 'success',
                message: '换房成功'
            });

            this.getCheckinList();
        },
        checkout() {
            this.$message({
                type: 'success',
                message: '退房成功'
            });
            this.getCheckinList();
        }
    }
};
</script>

<style lang="less" scoped>
.checkin {
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
