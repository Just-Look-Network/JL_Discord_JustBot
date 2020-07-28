<template>
    <nuxt />
</template>

<script>
export default {
    created: function () {
        var vm = this;
        this.$axios.interceptors.response.use(
            (response) => {
                console.log(response);
                return response;
            },
            function (error) {
                if (!error.response) {
                    swal('Network Error!', 'Backend not reachable, contact site admin!', 'error');
                }
                return Promise.reject(error);
            }
        );
    }
};
</script>
