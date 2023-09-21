<template>
  <div id="positionAdd">
    <el-dialog :title="title" :visible.sync="visible" :lock-scroll="false" :show-close="false" :close-on-click-modal="false">
      <el-form ref="positionForm" :model="item" :rules="rules" label-width="100px">
        <el-form-item label="职位:" prop="positionName">
          <el-input v-model="item.positionName" palceholder="请输入职位" clearable />
        </el-form-item>
        <el-form-item label="职位描述:" prop="introduce">
          <el-input type="textarea" :rows="8" v-model="item.introduce" resize="none" show-word-limit palceholder="职位描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="success" @click="submitForm('positionForm')">提交</el-button>
        <el-button type="warning" @click="resetForm('positionForm')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        default: 'title'
    },
    data() {
        return {
            visible: false,
            item: {
                positionName: '',
                introduce: ''
            },
            rules: {
                positionName: [{ required: true, message: '请输入职位', trigger: 'blur' }],
                introduce: [{ required: true, message: '请输入职位描述', trigger: 'blur' }]
            }
        };
    },
    methods: {
        open(item) {
            this.visible = true;
            console.log(item);
            this.item = item || {};
        },
        submitForm() {
            this.$refs.positionForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗？', '是否保存', {
                        cancelButtonText: '取消',
                        confirmButtonText: '确认',
                        lockScroll: false,
                        type: 'warning'
                    }).then(() => {
                        this.$emit('confirmData', this.item);
                        this.resetForm('positionForm');
                    });
                }
            });
        },
        resetForm() {
            this.$nextTick(() => {
                this.$refs.positionForm.clearValidate();
            });
            this.item = {};
            this.visible = false;
        }
    }
};
</script>

<style lang="less">
</style>
