const tokens = {
    admin: {
        username: 'admin',
        password: '123456'
    },
    liyongjian: {
        username: 'liyongjian',
        password: '123456'
    }
};

module.exports = [
    {
        url: '/login',
        type: 'get',
        response: (config) => {
            const { username, password } = config.query;
            const token = tokens[username];

            if (!token) {
                return {
                    code: 100,
                    message: '无此账号，请先注册！'
                };
            }
            if (token && (token.username !== username || token.password !== password)) {
                return {
                    code: 100,
                    message: '账号或密码不正确，请重试！'
                };
            }

            return {
                code: 0,
                data: token
            };
        }
    },
    {
        url: '/getUserInfo',
        type: 'get',
        response: (config) => {
            return {
                code: 0,
                data: {
                    username: window.localStorage.getItem('username'),
                    remark: '这个人很帅，什么都没留下',
                    readName: '李永健',
                    telPhone: '187-0959-0935',
                    birthday: '1970-09-06',
                    qq: '2365182543',
                    weiXin: '18709590935',
                    email: '18709590935@163.com',
                    introduce: '这是李永健的简介，是测试用的'
                }
            };
        }
    },

    // user logout
    {
        url: '/vue-element-admin/user/logout',
        type: 'post',
        response: (_) => {
            return {
                code: 20000,
                data: 'success'
            };
        }
    }
];
