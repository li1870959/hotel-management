<template>
  <div class="roomstate" ref="box">
    <el-form v-model="searchForm" :inline="true">

      <el-form-item label="房号：">
        <el-input v-model="searchForm.number" placeholder="请输入房号" clearable />
      </el-form-item>

      <el-form-item label="客房类型：" prop="roomType">
        <el-select v-model="searchForm.roomType" placeholder="请选择客房类型" clearable>
          <el-option v-for="(item,index) in roomTypeList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="可住人数：">
        <el-input v-model="searchForm.peopleNum" placeholder="请输入可住人数" clearable />
      </el-form-item>

      <el-form-item label="楼层：">
        <el-input v-model="searchForm.floor" placeholder="请输入楼层" clearable />
      </el-form-item>

      <el-form-item label="床型：">
        <el-select v-model="searchForm.bedType" placeholder="请选择床型" clearable>
          <el-option v-for="(item,index) in bedTypeList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="客房状态：">
        <el-select v-model="searchForm.state" placeholder="请输入客房状态" clearable>
          <el-option key="1" label="空闲" value="空闲"></el-option>
          <el-option key="2" label="在住" value="在住"></el-option>
          <el-option key="3" label="不可用" value="不可用"></el-option>
          <el-option key="4" label="正在打扫" value="正在打扫"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="房费：" prop="startPrice">
        <el-input v-model="searchForm.startPrice" placeholder="最低房费" clearable style="width:48%" />-
        <el-input v-model="searchForm.endPrice" placeholder="最高房费" clearable style="width:48%" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getroomList(searchForm)">查询</el-button>
      </el-form-item>

    </el-form>
    <el-table row-key="id" border :height="tableHeight" :data="roomList" v-loading="loading" element-loading-text="拼命加载中" fit>
      <el-table-column label="序号" type="index" width="55">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房号" prop="number" />
      <el-table-column label="客房类型" prop="roomType" width="100" />
      <el-table-column label="楼层" prop="floor" />
      <el-table-column label="面积" prop="area" />
      <el-table-column label="可住人数" prop="peopleNum" />
      <el-table-column label="单价" prop="price" />
      <el-table-column label="客房状态" prop="state" />
      <el-table-column label="床型" prop="bedType" />
      <el-table-column label="床型细节" prop="bedDetail" width="100" show-overflow-tooltip />
      <el-table-column label="是否可加床" prop="jiaChuang" width="100" />
      <el-table-column label="客房设施" prop="facilities" width="400" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" width="200" show-overflow-tooltip />
      <el-table-column label="操作" prop="operation" width="100" fixed="right">
        <template slot-scope="scoped">
          <el-button type="text" @click="imgList = scoped.row.imageList;drawer = true">查看图片</el-button>
        </template>
      </el-table-column>

    </el-table>
    <page-component :total="total" :page="{currentPage:searchForm.page,pageSize:searchForm.size}" @pageChange="(item)=>handlePageChange(item)" />
    <el-drawer custom-class="roomstate-drawer" title="客房图片详情" :visible.sync="drawer" direction="rtl" size="50%">
      <div style="display:flex;justify-content: space-between;flex-wrap:wrap;padding:0 20px;">
        <div v-for="(img, index) in imgList" :key="index" style="margin:0 0 20px;">
          <img :src="img" width="200" alt="图片暂时无法找到">
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getroomList } from '@/api/room';
import { getAllRoomTypeList } from '@/api/room';
import { getCategoryList } from '@/api/room';
import PageComponent from '@/components/Pagenation';
export default {
    components: {
        PageComponent
    },
    data() {
        return {
            tableHeight: 0,
            loading: false,
            drawer: false, // 控制抽屉的显影
            searchForm: {
                number: '',
                searchForm: '',
                peopleNum: '',
                floor: '',
                bedType: '',
                state: '',
                startPrice: '',
                endPrice: '',
                page: 1,
                size: 50
            },
            total: 0,
            imgList: [],
            roomList: [],
            roomData: {},
            roomTypeList: [], // 客房类型
            bedTypeList: []
        };
    },
    mounted() {
        this.getroomList();
        this.getAllRoomTypeList();
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
            this.getroomList();
        },

        getCategoryList() {
            getCategoryList().then((res) => {
                if (res.data.code === 0) {
                    this.bedTypeList = res.data.data;
                }
            });
        },
        getroomList() {
            this.loading = true;
            getroomList(this.searchForm).then((res) => {
                if (res.data.code === 0) {
                    this.total = res.data.total;
                    this.roomList = res.data.data;
                    this.loading = false;
                }
            });
        },
        getAllRoomTypeList() {
            getAllRoomTypeList().then((res) => {
                if (res.data.code === 0) {
                    this.roomTypeList = res.data.data;
                }
            });
        }
    }
};
</script>

<style lang="less">
.roomstate {
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
    .roomstate-drawer {
        .el-drawer__body {
            overflow: hidden auto;
        }
    }
}
</style>
