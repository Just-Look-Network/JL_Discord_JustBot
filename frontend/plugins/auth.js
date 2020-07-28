export default ({ store, app: { $axios } }) => {
    if (store.state.auth.auth) {
        $axios.setToken(store.state.auth.auth, 'Bearer');
    }
};
