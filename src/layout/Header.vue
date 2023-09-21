<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-left" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
      <div class="title">1111</div>
    </div>
    <div class="header-right">
      <div class="header-user-con">

        <el-tooltip class="item" effect="dark" content="切换主题" placement="top-end">
          <div class="color-icon"> <svg-icon icon-class="headTheme" @click="openSkin" /> </div>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="top-end">
          <div class="color-icon"> <svg-icon :icon-class="fullscreen?'closeFullScreen':'fullscreen'" @click="handleFullScreen" /> </div>
        </el-tooltip>

        <!-- 用户头像 -->
        <div class="user-avator">
          <img v-if="headImg" :src="headImg" />
          <img v-else src="@/assets/img/userPicture.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{number}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="updatePwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>

    <!-- 切换主题 -->
    <el-dialog title="主题切换" custom-class="change-theme-dialog" :visible.sync="skinOpen" width="570px" append-to-body>
      <div class="theme-header">
        <img :src="require('@/assets/img/changeTheme.png')" alt="">
        <p>切换您的主题</p>
      </div>

      <ul class="theme-content">
        <li v-for="skin in themeList" :key="skin.key" @click="skinChange(skin)">
          <p class="content-img"
            :class="{'active':skin.key === skinValue,'default':skin.key==='default','green':skin.key === 'green','purple':skin.key ==='purple'}"></p>
          <p class="content-label">{{skin.label}}</p>
        </li>
      </ul>

      <div class="theme-footer">
        <el-button type="primary" size="small" @click="skinSubmit">保存主题</el-button>
        <el-button type="text" @click="skinOpen = false">暂时不换</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import bus from '@/utils/bus';
import { getLoginEmployee, loginout } from '@/api/login';
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            theme: (state) => state.settings.theme,
            themeList: (state) => state.settings.themeList
        })
    },
    watch: {
        theme: {
            handler(newValue, oldValue) {
                this.skinValue = newValue;
            },
            immediate: true
        }
    },
    data() {
        return {
            collapse: false,
            fullscreen: false,
            number: '',
            headImg: '',
            message: 2,
            skinOpen: false, //主题切换弹窗
            skinValue: null
        };
    },

    mounted() {
        this.getLoginEmployee();
        // if (document.body.clientWidth < 1200) {
        //     this.collapseChage();
        // }
    },
    methods: {
        // 打开主题切换弹窗
        openSkin() {
            // this.skinValue = this.theme; //初始值
            this.skinOpen = true;
        },
        // 切换主题
        skinChange(item) {
            this.skinValue = item.key;
        },
        // 切换主题确认
        skinSubmit() {
            this.$store.dispatch('settings/changeTheme', this.skinValue);

            this.skinOpen = false;
        },
        getLoginEmployee() {
            getLoginEmployee(null).then((res) => {
                if (res.data.code === 0) {
                    this.number = res.data.data.number;
                    this.headImg = res.data.data.headImg;
                }
            });
        },
        handleCommand(command) {
            // 用户名下拉菜单选择事件
            if (command == 'updatePwd') {
                // 修改密码
                this.$router.push({ path: '/updatePwd' });
            } else if (command == 'loginout') {
                // localStorage.removeItem('ms_username');
                // this.$router.push('/login');
                loginout(null).then((res) => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '已退出登录'
                        });
                    }
                });
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    }
};
</script>

<style lang="less">
.change-theme-dialog {
    height: 500px;
    border-radius: 16px !important;
    .el-dialog__header,
    .el-dialog__footer {
        display: none;
    }
    .el-dialog__body {
        width: 100%;
        height: 100%;
        padding: 0 50px;
        .theme-header {
            width: 100%;
            height: 230px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
                width: 100px;
                height: 100px;
            }
            p {
                font-size: 20px;
                font-weight: bold;
                margin-top: 18px;
            }
        }
        .theme-content {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            li {
                width: 64px;
                text-align: center;
                cursor: pointer;
                .content-img {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                }
                .active {
                    border: 2px solid #4e8eff;
                }
                .default {
                    background: linear-gradient(225deg, #242f42 0%, #6f7d89 100%);
                }
                .green {
                    background: linear-gradient(225deg, #07c4a8 0%, #8be4d7 100%);
                }
                .purple {
                    background: linear-gradient(225deg, #8a2be2 0%, #e6e6fa 100%);
                }
                .content-label {
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 10px;
                }
            }
        }
        .theme-footer {
            margin-top: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .el-button:last-child {
                margin-top: 10px;
                margin-left: 0;
            }
        }
    }
}
</style>
<style lang="less" scoped>
.header {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    .header-left {
        height: 100%;
        padding: 0 0 0 20px;
        display: flex;
        align-items: center;
        i {
            cursor: pointer;
        }
        .title {
            width: 250px;
            margin-left: 40px;
        }
    }
    .header-right {
        margin-right: 20px;
        .header-user-con {
            height: 100%;
            display: flex;
            align-items: center;
            .color-icon {
                line-height: 16px;
                font-size: 15px;
                cursor: pointer;
                margin-right: 20px;
            }
        }

        .user-name {
            margin-left: 6px;
        }
        .user-avator {
            img {
                display: block;
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
        }
        .el-dropdown-link {
            color: #fff;
            cursor: pointer;
        }
        .el-dropdown-menu__item {
            text-align: center;
        }
    }
}
</style>
