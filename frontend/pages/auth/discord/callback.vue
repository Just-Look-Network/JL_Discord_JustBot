<template>
    <div></div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
    layout: 'auth',
    middleware: 'notAuthenticated',

    mounted() {
        if (!this.$route.query['jwt']) {
            this.$router.push('/login');
            return;
        }

        const jwt = this.$route.query.jwt;

        this.$store.commit('auth/setAuth', jwt);
        Cookie.set('auth', jwt, { expires: 14 });
        this.$router.push('/');
    }
};
</script>
