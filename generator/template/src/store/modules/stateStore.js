/*
 * @Description: 状态存储
 * @Date: 2020-03-19 15:56:56
 */
import { CHANGE_LOADING_ARR } from '../mutationTypes';
const stateStore = {
    state: {
        loadingArr: 0, // 关于加载动画几时结束
    },
    mutations: {
    // 改变loading
        [CHANGE_LOADING_ARR]: (state, v) => {
            state.loadingArr = v;
        },
    },
    getters: {
        loadingArr: state => state.loadingArr,
    },
};
export default stateStore;
