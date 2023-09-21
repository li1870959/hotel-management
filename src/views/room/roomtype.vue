<template>
  <div class="roomtype" ref="box">
    <el-form v-model="searchForm" inline>

      <el-form-item label="客房类型：" prop="roomType">
        <el-input v-model="searchForm.roomTypeName" placeholder="请输入客房类型" clearable />
      </el-form-item>

      <el-form-item label="可住人数：">
        <el-input v-model="searchForm.peopleNum" placeholder="请输入可住人数" clearable />
      </el-form-item>

      <el-form-item label="楼层：">
        <el-input v-model="searchForm.floor" placeholder="请输入楼层" clearable />
      </el-form-item>

      <el-form-item label="床型：">
        <el-select v-model="searchForm.bedType" placeholder="请选择床型" clearable>
          <el-option v-for="i in bedTypeList" :key="i.categoryId" :label="i.categoryName" :value="i.categoryName">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="房费：" prop="startMoney">
        <el-input v-model="searchForm.startPrice" placeholder="最低房费" clearable style="width:48%" />-
        <el-input v-model="searchForm.endPrice" placeholder="最高房费" clearable style="width:48%" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getRoomTypeList()">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.addDialog.open(null)">新增</el-button>
      </el-form-item>

    </el-form>
    <el-table border :height="tableHeight" :data="roomTypeList" v-loading="loading" element-loading-text="拼命加载中" fit>
      <el-table-column label="序号" type="index" width="55">
        <template slot-scope="scope">
          <span>{{  scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客房类型" prop="roomTypeName" />
      <el-table-column label="楼层" prop="floor" />
      <el-table-column label="面积" prop="area" />
      <el-table-column label="可住人数" prop="peopleNum" />
      <el-table-column label="单价" prop="price" />
      <el-table-column label="床型" prop="bedType" show-overflow-tooltip />
      <el-table-column label="床型细节" prop="bedDetail" show-overflow-tooltip />
      <el-table-column label="是否可加床" prop="jiaChuang" width="100" />
      <el-table-column label="客房设施" prop="facilities" width="400" show-overflow-tooltip />
      <el-table-column label="操作" prop="operation" width="180" fixed="right">
        <template slot-scope="scoped">
          <el-button type="text" @click="$refs.updateDialog.open(scoped.row)">查看详情</el-button>
          <el-button type="text" @click="imgList = scoped.row.imageList;drawer = true">查看图片</el-button>
          <el-button type="text" class="red" @click="handleDelete(scoped.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <add-dialog ref="addDialog" title="新增" @confirmData="(item,fileList) => addroomtype(item)" />
    <update-dialog ref="updateDialog" title="修改" @confirmData="(item,fileList) => updateroomtype(item)" />
    <page-component :total="total" :page="{currentPage:searchForm.page,pageSize:searchForm.size}" @pageChange="(item)=>handlePageChange(item)" />
    <el-drawer custom-class="roomtype-drawer" title="客房图片详情" :visible.sync="drawer" direction="rtl" size="50%">
      <div style="display:flex;justify-content: space-between;flex-wrap:wrap;padding:0 20px;">
        <div v-for="(img, index) in imgList" :key="index" style="margin:0 0 20px;">
          <img :src="img" width="200" alt="图片暂时无法找到">
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import AddDialog from './addRoomType';
import updateDialog from './addRoomType';
import { getCategoryList } from '@/api/category';
import { getRoomTypeList } from '@/api/roomtype';
import PageComponent from '@/components/Pagenation';
export default {
    components: {
        PageComponent,
        AddDialog,
        updateDialog
    },
    data() {
        return {
            tableHeight: 0,
            loading: false,
            drawer: false,
            searchForm: {
                roomTypeName: '',
                peopleNum: '',
                floor: '',
                bedType: '',
                startPrice: '',
                endPrice: '',
                page: 1,
                size: 50
            },
            total: 0,
            imgList: [],
            roomTypeList: [],
            bedTypeList: [],
            roomTypeData: {}
        };
    },
    mounted() {
        this.getRoomTypeList();
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
            this.getRoomTypeList();
        },
        getCategoryList() {
            getCategoryList().then((res) => {
                if (res.data.code === 0) {
                    this.bedTypeList = res.data.data;
                }
            });
        },
        getRoomTypeList() {
            this.loading = true;
            getRoomTypeList(this.searchForm).then((res) => {
                if (res.data.code === 0) {
                    this.total = res.data.total;
                    this.roomTypeList = res.data.data;
                    this.loading = false;
                }
            });
        },

        addroomtype() {
            this.$message({
                type: 'success',
                message: '新增客房类型成功'
            });
            this.getRoomTypeList();
        },
        updateroomtype() {
            this.$message({
                type: 'success',
                message: '修改客房类型成功'
            });
            this.getRoomTypeList();
        },
        handleDelete(data) {
            this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then((res) => {
                    this.roomTypeList = this.roomTypeList.filter((v) => v.id !== data.id);
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

<style lang="less" >
.roomtype {
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
    .roomtype-drawer {
        .el-drawer__body {
            overflow: hidden auto;
        }
    }
}
</style>
