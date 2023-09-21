<template>
  <div id="roomtypeAdd">
    <el-dialog :title="title" :visible.sync="visible" :lock-scroll="false" :show-close="false" :close-on-click-modal="false">
      <el-form ref="roomtypeForm" :model="item" :rules="rules" label-width="120px">
        <el-form-item label="客房类型：" prop="roomTypeName">
          <el-input v-model="item.roomTypeName" placeholder="请输入客房类型" clearable />
        </el-form-item>
        <el-form-item label="可住人数：" prop="peopleNum">
          <el-input v-model="item.peopleNum" placeholder="请输入可住人数" clearable />
        </el-form-item>
        <el-form-item label="楼层：" prop="floor">
          <el-input v-model="item.floor" placeholder="请输入楼层" clearable />
        </el-form-item>
        <el-form-item label="面积：" prop="area">
          <el-input v-model="item.area" placeholder="请输入面积" clearable />
        </el-form-item>
        <el-form-item label="价格：" prop="price">
          <el-input v-model="item.price" placeholder="请输入价格" clearable />
        </el-form-item>
        <el-form-item label="床型：" prop="bedType">
          <el-select v-model="item.bedType" placeholder="请选择床型" clearable style="width:100%;">
            <el-option v-for="i in bedTypeList" :key="i" :label="i" :value="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有窗:" prop="window">
          <el-radio-group v-model="item.window">
            <el-radio v-model="item.window" label="有窗" border>有窗</el-radio>
            <el-radio v-model="item.window" label="无窗" border>无窗</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否可加床：" prop="jiaChuang">
          <el-select v-model="item.jiaChuang" placeholder="是否可加床" clearable style="width:100%;">
            <el-option key="1" label="可加床（1.8米大床，50/天）" value="可加床（1.8米大床，50/天）"></el-option>
            <el-option key="2" label="不可加床" value="不可加床"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="床型具体说明：" prop="bedDetail">
          <el-input type="textarea" :rows="2" v-model="item.bedDetail" resize="none" maxlength="200" show-word-limit palceholder="床型具体说明"></el-input>
        </el-form-item>
        <el-form-item label="房间设施说明：" prop="facilities">
          <el-input type="textarea" :rows="2" v-model="item.facilities" resize="none" maxlength="200" show-word-limit palceholder="房间设施说明"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm('roomtypeForm')">提交</el-button>
        <el-button @click="resetForm('roomtypeForm')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/room';
import { getRoomTypeById } from '@/api/roomtype';
import { uploadFile } from '@/api/uploadFile';
export default {
    props: {
        title: String,
        default: 'title'
    },
    data() {
        return {
            visible: false,
            bedTypeList: [], // 保存床型
            item: {
                roomType: '',
                peopleNum: '',
                area: '',
                floor: '',
                bedType: '',
                bedDetail: '',
                window: '',
                jiaChuang: '',
                facilities: '',
                price: ''
            },
            rules: {
                roomTypeName: [{ required: true, message: '请输入', trigger: 'change' }],
                peopleNum: [{ required: true, message: '请输入', trigger: 'blur' }],
                area: [{ required: true, message: '请输入', trigger: 'blur' }],
                floor: [{ required: true, message: '请输入', trigger: 'blur' }],
                bedType: [{ required: true, message: '请选择', trigger: 'change' }],
                price: [{ required: true, message: '请输入', trigger: 'blur' }]
            }
        };
    },
    mounted() {
        this.getCategoryList();
    },
    methods: {
        open(item) {
            this.visible = true;
            this.item = item || {};
        },
        getCategoryList() {
            getCategoryList().then((res) => {
                if (res.data.code === 0) {
                    this.bedTypeList = res.data.data;
                }
            });
        },

        submitForm() {
            this.$refs.roomtypeForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗？', '是否保存', {
                        cancelButtonText: '取消',
                        confirmButtonText: '确认',
                        lockScroll: false,
                        type: 'warning'
                    }).then(() => {
                        this.$emit('confirmData', this.item);
                        this.resetForm('roomtypeForm');
                    });
                }
            });
        },
        resetForm() {
            this.$nextTick(() => {
                this.$refs.roomtypeForm.clearValidate();
            });
            this.item = {};
            this.visible = false;
        }
    }
};
</script>

<style lang="scss">
</style>
