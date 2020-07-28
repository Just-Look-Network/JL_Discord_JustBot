export const state = () => ({
    auth: null
});

export const mutations = {
    setAuth(state, auth) {
        state.auth = auth;
        if (auth) this.$axios.setToken(auth, 'Bearer');
        else this.$axios.setToken(false);
    }
};

export const actions = {};
