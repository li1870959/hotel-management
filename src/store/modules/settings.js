const state = {
    theme: window.localStorage.getItem('theme') ?? 'default',
    themeList: [
        {
            key: 'default',
            label: '默认',
            themeId: 'school-default'
        },
        {
            key: 'green',
            label: '绿色',
            themeId: 'school-green'
        },
        {
            key: 'purple',
            label: '紫色',
            themeId: 'school-purple'
        }
    ]
};

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value;
        }
    }
};

const actions = {
    initTheme({ dispatch }, data) {
        const themeKey = window.localStorage.getItem('theme') ?? 'default'; // 初始化主题参数，如若没有设置过则使用默认主题
        dispatch('changeTheme', themeKey);
    },
    changeTheme({ state }, data) {
        const { themeList } = state;
        const themeKey = data;
        const themeValue = themeList.find((v) => v.key === themeKey);
        const themeIdList = themeList.map((v) => v.themeId);
        const classList = document.body.classList;
        themeIdList.forEach((v) => {
            classList.remove(v);
        });

        state.theme = themeKey;
        classList.add(themeValue.themeId);
        window.localStorage.setItem('theme', themeKey);
    },
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
