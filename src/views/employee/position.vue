<template>
  <div class="position" ref="box">
    <el-form v-model="searchForm" :inline="true">

      <el-form-item label="职位：">
        <el-input v-model="searchForm.positionName" placeholder="请输入职位" clearable />
      </el-form-item>

      <el-form-item label="职位描述：">
        <el-input v-model="searchForm.introduce" placeholder="请输入职位描述" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getPositionList(searchForm)">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.open(null)">新增</el-button>
      </el-form-item>

    </el-form>
    <el-table border :height="tableHeight" :data="positionList" v-loading="loading" element-loading-text="拼命加载中">

      <el-table-column label="序号" type="index" width="55">
        <template slot-scope="scope">
          <span>{{  scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" prop="positionName" />
      <el-table-column label="职位描述" prop="introduce" show-overflow-tooltip />
      <el-table-column label="操作" prop="operation" width="200">
        <template slot-scope="scoped">
          <el-button type="text" icon="el-icon-edit" @click="$refs.updateDialog.open(scoped.row)">修改</el-button>
          <el-button type="text" icon="el-icon-delete" class="red" @click="deletePosition(scoped.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-dialog ref="addDialog" title="新增" @confirmData="(item) => addPosition(item)" />
    <update-dialog ref="updateDialog" title="修改" @confirmData="(item) => updatePosition(item)" />
    <page-component :total="total" :page="{currentPage:searchForm.page,pageSize:searchForm.size}" @pageChange="(item)=>handlePageChange(item)" />
  </div>
</template>

<script>
import AddDialog from './addPosition';
import updateDialog from './addPosition';
import { getPositionData } from '@/api/position';
import PageComponent from '@/components/Pagenation/index';
export default {
    components: {
        PageComponent,
        AddDialog,
        updateDialog
    },
    data() {
        return {
            tableHeight: 0,
            loading: true,
            searchForm: {
                positionName: '',
                introduce: '',
                page: 1,
                size: 50
            },
            total: 0,
            positionList: []
        };
    },
    mounted() {
        this.getPositionList();
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

            this.getPositionList();
        },
        getPositionList() {
            getPositionData(this.searchForm).then((res) => {
                this.total = res.data.total;
                this.positionList = res.data.data;
                this.loading = false;
            });
        },

        addPosition() {
            this.$message({
                type: 'success',
                message: '新增职位成功'
            });

            this.getPositionList();
        },
        updatePosition(item) {
            this.$message({
                type: 'success',
                message: '修改职位成功'
            });

            this.getPositionList();
        },
        deletePosition(data) {
            this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then((res) => {
                    this.positionList = this.positionList.filter((v) => v.id !== data.id);
                    this.total--;
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

<style lang="less">
.position {
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
