<template>
  <div id="empAdd">
    <el-dialog :title="title" :visible.sync="visible" top="0.5rem" :lock-scroll="false" :show-close="false" :close-on-click-modal="false">
      <el-form ref="empForm" :model="item" :rules="rules" label-width="100px">
        <el-form-item label="账号:" prop="number">
          <el-input v-model="item.number" palceholder="请输入账号" clearable />
        </el-form-item>
        <el-form-item label="姓名:" prop="readName">
          <el-input v-model="item.readName" palceholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="item.sex">
            <el-radio v-model="item.sex" label="男" border>男</el-radio>
            <el-radio v-model="item.sex" label="女" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职位:" prop="position">
          <el-select v-model="item.positionId" placeholder="请选择职位" clearable style="width:100%;">
            <el-option v-for="i in positionList" :key="i.positionId" :label="i.positionName" :value="i.positionId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话:" prop="telPhone">
          <el-input v-model="item.telPhone" palceholder="请输入联系电话" clearable />
        </el-form-item>
        <el-form-item label="头像:" prop="headImg">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <img v-if="item.headImg" :src="item.headImg" style="width:100%;height:100%;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-input v-model="item.birthday" palceholder="请输入出生日期" clearable />
        </el-form-item>
        <el-form-item label="QQ:" prop="qq">
          <el-input v-model="item.qq" palceholder="请输入QQ" clearable />
        </el-form-item>
        <el-form-item label="微信:" prop="weiXin">
          <el-input v-model="item.weiXin" palceholder="请输入微信" clearable />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="item.email" palceholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item label="简介:" prop="introduce">
          <el-input type="textarea" v-model="item.introduce" :rows="4" resize="none" maxlength="200" show-word-limit placeholder="请输入个人简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm('empForm')">提交</el-button>
        <el-button @click="resetForm('empForm')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPositionDataList } from '@/api/employee';
export default {
    props: {
        title: String,
        default: 'title'
    },
    data() {
        return {
            visible: false,
            uptoken: {
                key: ''
            },
            positionList: [], // 保存职位信息
            param: '', // 表单要提交的参数
            fileFlag: false,
            fileUploadPercent: 0,
            fileList: [],
            item: {
                number: '',
                readName: '',
                sex: '',
                position: '',
                telPhone: '',
                headImg: '',
                birthday: '',
                qq: '',
                weiXin: '',
                email: '',
                introduce: ''
            },
            rules: {
                // number: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                // readName: [{ required: true, message: '请输入姓名', trigger: 'change' }],
                // sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                // position: [{ required: true, message: '请选择职位', trigger: 'blur' }],
                // telPhone: [{required: true, validator: validateTelPhone, trigger: 'blur'}]
            }
        };
    },
    methods: {
        open(item) {
            this.visible = true;

            this.item = item;

            this.getPositionList();
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                // 如果不是jpg，也不是png的时候就弹出这条信息
                return this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                return this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            this.item.headImg = URL.createObjectURL(file);
        },
        getPositionList() {
            getPositionDataList(null).then((res) => {
                this.positionList = res.data.data;
                // console.log('职位信息是',this.positionList)
            });
        },
        submitForm(empForm) {
            this.$refs.empForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗？', '是否保存', {
                        cancelButtonText: '取消',
                        confirmButtonText: '确认',
                        lockScroll: false,
                        type: 'warning'
                    }).then(() => {
                        this.$emit('confirmData', this.item);
                        this.resetForm('empForm');
                    });
                }
            });
        },
        resetForm(empForm) {
            this.$nextTick(() => {
                this.$refs.empForm.clearValidate();
            });
            this.item = {};
            this.fileFlag = false;
            this.fileUploadPercent = 0;
            this.visible = false;
        }
    }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    // position: relative;
    // overflow: hidden;
    // text-align: left;
    width: 28%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}
.el-upload__tip {
    margin-top: 0;
}
.avatar {
    width: 80px;
    height: 80px;
    display: block;
}
</style>
