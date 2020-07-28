<template>
    <div></div>
</template>

<script>
export default {
    mounted() {
        if (this.$route.query['error[error]']) {
            this.$router.push('/login');
            return;
        }

        if (!this.$route.query['jwt']) {
            this.$router.push('/login');
            return;
        }

        // store jwt in vuex + cookie
        // redirect to /dashboard

        console.log(this.$route);
    }
};
</script>
