<template>
  <div id="updateAdd">
    <el-dialog :title="title" :visible.sync="visible" :lock-scroll="false" :show-close="false" :close-on-click-modal="false">
      <el-form ref="updateForm" :model="item" :rules="rules" label-width="100px">
        <el-form-item label="房号:" prop="number">
          <el-select v-model="item.number" placeholder="请选择房号">
            <el-option v-for="(item,index) in roomList" :key="index" :label="item.number" :value="item.number">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="resetForm('updateForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('updateForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCheckinList } from '@/api/checkin';
export default {
    props: {
        title: String,
        default: 'title'
    },
    data() {
        return {
            visible: false,
            firstRoomList: [],
            roomList: {}, // 保存房号和roomId
            item: {
                number: '',
                roomId: ''
            },
            rules: {
                number: [{ required: true, message: '请选择房号', trigger: 'change' }]
            }
        };
    },
    mounted() {
        this.getroomList();
    },
    methods: {
        open() {
            this.visible = true;
        },
        getroomList() {
            getCheckinList({ page: 1, size: 50 }).then((res) => {
                if (res.data.code == 0) {
                    this.roomList = res.data.data;
                }
            });
        },

        submitForm() {
            this.$refs.updateForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗？', '是否保存', {
                        cancelButtonText: '取消',
                        confirmButtonText: '确认',
                        lockScroll: false,
                        type: 'warning'
                    }).then(() => {
                        this.$emit('confirmData', this.item);
                        this.resetForm('updateForm');
                    });
                }
            });
        },
        resetForm(updateForm) {
            this.$nextTick(() => {
                this.$refs.updateForm.clearValidate();
            });
            this.item = {};
            this.visible = false;
        }
    }
};
</script>

<style lang="less">
</style>
