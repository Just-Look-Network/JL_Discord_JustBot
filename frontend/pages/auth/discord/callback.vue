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
        // store jwt in vuex + cookie
        // redirect to /dashboard

        this.$store.commit('auth/setAuth', jwt); // mutating to store for client rendering
        Cookie.set('auth', jwt, { expires: 14 }); // saving token in cookie for server rendering
        this.$router.push('/');
    }
};
</script>
