<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.menuName }}</span>
            </template>

          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/utils/bus';
import { getLoginEmployee } from '@/api/login';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'dashboard',
                    menuName: '系统首页'
                },
                {
                    icon: 'el-icon-user-solid',
                    index: 'employee',
                    menuName: '员工管理'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'roomservice',
                    menuName: '客户服务'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: 'room',
                    menuName: '客房管理'
                },
                {
                    icon: 'el-icon-s-shop',
                    index: 'searchroom',
                    menuName: '客房查询'
                },
                {
                    icon: 'el-icon-suitcase-1',
                    index: 'checkin',
                    menuName: '入住管理'
                },
                {
                    icon: 'el-icon-school',
                    index: 'checkout',
                    menuName: '退房办理'
                },
                {
                    icon: 'el-icon-money',
                    index: 'finance',
                    menuName: '财务管理'
                }
            ]
        };
    },
    computed: {
        //员工管理、客房管理、客房查询、入住管理、客户服务、财务管理
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    mounted() {
        this.getLoginEmployee();
    },
    methods: {
        getLoginEmployee() {
            getLoginEmployee().then((res) => {
                if (res.data.code == 0) {
                    // console.log('当前登录的菜单是',res.data.data.menus)
                    let menus = res.data.data.menus;
                    for (let i = 0; i < menus.length; i++) {
                        if (menus[i].menuName == '系统首页') {
                            menus[i].index = 'dashboard';
                            menus[i].icon = 'el-icon-lx-home';
                        } else if (menus[i].menuName == '员工管理') {
                            menus[i].index = 'employee';
                            menus[i].icon = 'el-icon-lx-cascades';
                        } else if (menus[i].menuName == '客房管理') {
                            menus[i].index = 'room';
                            menus[i].icon = 'el-icon-lx-copy';
                        } else if (menus[i].menuName == '客房查询') {
                            menus[i].index = 'searchroom';
                            menus[i].icon = 'el-icon-s-shop';
                        } else if (menus[i].menuName == '入住管理') {
                            menus[i].index = 'checkin';
                            menus[i].icon = 'el-icon-lx-global';
                        } else if (menus[i].menuName == '退房记录') {
                            menus[i].index = 'checkout';
                            menus[i].icon = 'el-icon-lx-emoji';
                        } else if (menus[i].menuName == '客户服务') {
                            menus[i].index = 'roomservice';
                            menus[i].icon = 'el-icon-lx-calendar';
                        } else if (menus[i].menuName == '财务管理') {
                            menus[i].index = 'finance';
                            menus[i].icon = 'el-icon-lx-redpacket_fill';
                        }
                    }
                    this.items = menus;
                }
            });
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
}
</style>
