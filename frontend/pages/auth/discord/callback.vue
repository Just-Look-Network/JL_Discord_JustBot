<template>
    <div></div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route);
        if (this.$route.query['error[error]']) {
            this.$router.push('/login');
        }

        const d = this.$route.query;
        if (!d.access_token && !d.refresh_token) {
            this.$router.push('/login');
        }

        const vm = this;

        this.$axios
            .get('/connect/discord/callback', {
                params: d
            })
            .then((res) => {
                console.log('well done!');
                if (res == null) return;

                console.log('User Profile', res.user);
                console.log('User token', res.jwt);

                this.$router.push('/');
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    this.errorAvailable = true;
                    this.errorText = err.response.data.message;
                    setTimeout(() => {
                        vm.errorAvailable = false;
                        vm.errorText = '';
                    }, 30000);
                }
            });
    }
};
</script>
