import { SET_SESSION, SET_AUTHS } from '../mutationTypes';
export default {
    state: {
        mem: null,
        auths: [],
    },
    mutations: {
        [SET_SESSION]: (state, v) => {
            state.mem = v;
        },
        [SET_AUTHS]: (state, v) => {
            state.auths = v;
        },
    },
};
