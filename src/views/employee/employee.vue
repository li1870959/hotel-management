<template>
  <div class="employee-child" ref="box">
    <el-form v-model="searchForm" :inline="true">

      <el-form-item label="账号：">
        <el-input v-model="searchForm.number" placeholder="请输入账号" clearable />
      </el-form-item>

      <el-form-item label="姓名：">
        <el-input v-model="searchForm.readName" placeholder="请输入姓名" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getempList(searchForm)">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.open(null)">新增</el-button>
      </el-form-item>

    </el-form>
    <el-table border :height="tableHeight" :data="empList" v-loading="loading" element-loading-text="拼命加载中" @cell-mouse-enter="mouseEnter">
      <el-table-column label="序号" type="index" width="55">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="number" />
      <el-table-column label="头像" prop="headImg">
        <template slot-scope="scope">
          <img v-if="scope.row.headImg" :src="scope.row.headImg" alt="用户头像" width="30" height="30">
          <img v-else src="@/assets/img/userPicture.jpg" alt="用户头像" width="30" height="30">
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" prop="readName" />
      <el-table-column label="职位" prop="positionName" />
      <el-table-column label="联系电话" prop="telPhone" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column label="出生日期" prop="birthday" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="微信" prop="weiXin" />
      <el-table-column label="QQ" prop="qq" />
      <el-table-column label="操作" prop="operation" width="200">
        <template slot-scope="scoped">
          <el-button type="text" icon="el-icon-edit" @click="$refs.updateDialog.open(empData)">修改</el-button>
          <el-button type="text" icon="el-icon-s-tools" @click="handleReset">重置密码</el-button>
          <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scoped.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="addDialog" title="新增" @confirmData="(item) => addemp(item)" />
    <update-dialog ref="updateDialog" title="修改" @confirmData="(item) => update(item)" />
    <page-component :total="totalSize" :page="{currentPage:searchForm.page,pageSize:searchForm.limit}" @pageChange="(item)=>handlePageChange(item)" />
  </div>
</template>

<script>
import editDialog from './addEmp';
import updateDialog from './update';
import { getempDataList, addemp, update, resetPassword, delemp } from '@/api/employee';
import PageComponent from '@/components/Pagenation/index';
export default {
    components: {
        PageComponent,
        editDialog,
        updateDialog
    },
    data() {
        return {
            tableHeight: 0,
            loading: false,
            searchForm: {
                number: '',
                readName: '',
                sex: '',
                page: 1,
                limit: 50
            },
            empList: [],
            empData: {},
            totalSize: 0
        };
    },
    mounted() {
        this.getempList();
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
                limit: item.pageSize
            };

            this.getempList();
        },
        getempList() {
            this.loading = true;
            getempDataList(this.searchForm).then((res) => {
                this.empList = res.data.data;
                this.totalSize = res.data.total;
                this.loading = false;
            });
        },
        mouseEnter(data) {
            this.empData = Object.assign({}, data);
        },
        addemp() {
            this.$message({
                type: 'success',
                message: '新增员工成功'
            });
        },
        update(item) {
            this.$message({
                type: 'success',
                message: '修改成功'
            });
        },
        handleDelete(data) {
            this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then((res) => {
                    this.empList = this.empList.filter((v) => v.id !== data.id);
                    this.totalSize--;
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
        },
        handleReset() {
            // 重置密码
            this.$confirm('是否重置密码为123abc?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: 'true'
            })
                .then((res) => {
                    this.$message({
                        type: 'success',
                        message: '重置密码成功'
                    });
                })
                .catch((res) => {
                    this.$message({
                        type: 'info',
                        message: '取消重置密码'
                    });
                });
        }
    }
};
</script>

<style lang="less" scoped>
.employee-child {
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
