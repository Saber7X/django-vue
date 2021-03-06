import Vue from 'vue';
import Vuex from 'vuex';
import Qs from "qs";
import axios from 'axios';
import router from '../router';
// import store from '../store';
import alert from "element-ui/packages/alert";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userinfo: {},
    },
    getters: {
        // 查询登录状态
        isnotUserlogin(state) {
            return state.userinfo.token;
        }
    },
    mutations: {
        //  保存 注册登录用户信息
        saveUserinfo(state, userinfo) {
            state.userinfo = userinfo;
        },
        //   清空 用户登录状态
        clearUserinfo(state) {
            state.userinfo = {};
        }
    },
    action: {
        //  登录
        blogLogin({commit}, formData) {
            axios({
                url: ' http://127.0.0.1:8000/api/dweb-login/',
                method: 'post',
                data: Qs.stringify(formData)
            }).then((res) => {
                if (res.data === ' none') {
                    alert('用户名不存在');
                    return;
                }
                if (res.data === 'pwderr') {
                    alert('密码错误');
                    return;
                }
                commit('saveUserinfo', res.data);
                // 缓存
                localStorage.setItem('token', res.data.token);
                router.push({path: '/'});
            });
        },
        //    注册
        blogRegister({commit}, formData) {
            axios({
                url: 'http://localhost:8080/api/dweb-register',
                method: 'post',
                data: Qs.stringify(formData)
            }).then((res) => {
                if (res.data === 'repeat') {
                    alert('用户名已经存在');
                    return;
                }
                commit('saveUserinfo', res.data);
                // 缓存
                localStorage.setItem('token', res.data.token);
                router.push({path: '/'});
            });
        },
        //自动登录
        tryAutoLogin({commit}) {
            let token = localStorage.getItem(' token');
            if (token) {
                axios({
                    url: "http://127.0.0.19000/api/ auto-login/",
                    method: " post",
                    data: Qs.stringify({token})
                }).then((res) => {
                    console.log(res.data);
                    if (res.data === 'tokenTimeout') {
                        alert('用户信息过期，重新登陆');
                        return;
                    }
                    commit('saveUserinfo', res.data);
                    // 缓存
                    localStorage.setItem('token', res.data.token);
                    router.push({path: '/'});
                });
            }
        },
        //    登出
        blogLogout({commit}, token) {
            commit('clearUserinfo');
            localStorage.removeItem('token');
            // router.push({path: '/'});
            axios({
                url: "http://127.0.0.1:9000/api/dweb-logout/",
                method: " post",
                data: Qs.stringify({token})
            }).then((res) => {
                console.log(res.data);
            });
        },
        // 权限判断
        async checkUserPerm({getters}, checkInfo) {
            //用户
            let token = getters.isnotUserlogin;
            //表
            let contentType = checkInfo.contentType;
            //权限
            let permissons = checkInfo.permissons;
            // 鉴权结果
            let perm_data;
            await axios({
                url: "http://127.0.0.1:9000/api/dweb-checkperm/",
                method: " post",
                data: Qs.stringify({
                    token,
                    contentType,
                    permissons: JSON.stringify(permissons)
                })
            }).then((res) => {
                console.log(res.data);
                if (res.data === 'nologin') {
                    perm_data = false;
                    alert('用户信息错误');
                    return;
                }
                if (res.data === 'noperm') {
                    perm_data = false;
                    alert('用户权限不足，联系管理员');
                    router.push({path: '/'});
                    return;
                }
                if (res.data === 'ok') {
                    perm_data = true;
                }
            });
            return perm_data;
        }
    },
    modules: {},
});