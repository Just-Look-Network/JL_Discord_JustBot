<template>
    <Nuxt />
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
    middleware: ['authenticated'],

    created: function () {
        console.log('created!');
        const vm = this;

        this.$axios.interceptors.response.use(
            (res) => {
                return res;
            },
            (error) => {
                if (!error.response) {
                    swal('Network Error!', 'Backend not reachable, contact site admin!', 'error');
                    return Promise.reject(error);
                } else {
                    if (error.response.status === 403) {
                        console.log('NOT AUTORIZED ACTION LOGGED');
                        vm.$router.push('/');
                    }
                    if (
                        error.response.status === 401 &&
                        error.response.config &&
                        !error.response.config.__isRetryRequest
                    ) {
                        vm.$store.commit('auth/setAuth', null);
                        Cookie.remove('auth');
                        vm.$router.push('/login');
                    } else {
                        return Promise.reject(error);
                    }
                }
            }
        );
    }
};
</script>

<style>
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
