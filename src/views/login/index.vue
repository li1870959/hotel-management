<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">酒店管理系统</div>
      <el-form :model="loginForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="number">
          <el-input v-model="loginForm.number" placeholder="请输入账号">
            <el-button slot="prepend" icon="el-icon-s-check"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="submitForm()">
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { login } from '@/api/login';
export default {
    data: function () {
        return {
            loginForm: {
                number: '',
                password: ''
            },
            rules: {
                number: [{ required: true, trigger: 'blur', message: '请输入账号' }],
                password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
            }
        };
    },
    mounted() {},
    methods: {
        submitForm() {
            this.$refs.login.validate(async (valid) => {
                if (valid) {
                    const para = {
                        username: this.loginForm.number,
                        password: this.loginForm.password
                    };

                    const res = await login(para);
                    if (res.data.code === 0) {
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        this.saveUserData(res);
                    } else {
                        this.$message.error(res.data.message);
                    }
                }
            });
        },
        saveUserData(res) {
            const {
                data: { username }
            } = res.data;

            window.localStorage.setItem('username', username);
            this.$router.push({ path: '/dashboard' });
        },
        ...mapActions('user/', ['setUserdata'])
    }
};
</script>

<style scoped>
.login-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login.jpg);
    background-size: 100% 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    width: 500px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 50px 40px;
    background: transparent;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>