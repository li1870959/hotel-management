<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover" style="height:500px;">
          <div class="user-info">
            <img src="@/assets/img/userPicture.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{userInfo.username}}</div>
              <div>{{userInfo.remark}}</div>
            </div>
          </div>
          <el-row class="userinfo-list" v-for="(item,index) in infoList" :key="index">
            <el-col :span="3">{{item.name}}</el-col>
            <el-col :span="21">{{userInfo[item.value]}}</el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getLoginEmployee } from '@/api/login';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('username'),
            userInfo: {},
            infoList: [
                {
                    name: '姓名：',
                    value: 'readName'
                },
                {
                    name: '联系方式：',
                    value: 'telPhone'
                },
                {
                    name: '出生日期：',
                    value: 'birthday'
                },
                {
                    name: 'QQ：',
                    value: 'qq'
                },
                {
                    name: '微信：',
                    value: 'weiXin'
                },
                {
                    name: '邮箱：',
                    value: 'email'
                },
                {
                    name: '个人简介：',
                    value: 'introduce'
                }
            ]
        };
    },
    mounted() {
        this.getLoginEmployee();
    },

    computed: {},
    methods: {
        getLoginEmployee() {
            getLoginEmployee().then((res) => {
                console.log('当前登录用的的信息是', res);
                if (res.data.code == 0) {
                    this.userInfo = res.data.data;
                }
            });
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
    margin-bottom: 10px;
}

.userinfo-list {
    font-size: 14px;
    color: #333;
    line-height: 25px;
}

.todo-item {
    font-size: 14px;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
