<template>
    <b-container class="h-100-vh">
        <b-row class="h-100">
            <b-col lg="4" offset-lg="4" align-self="center">
                <b-card class="shadow">
                    <b-card-title class="text-center">
                        <img src="~/assets/img/logo.png" alt="Just-Look Network Logo" class="img-fluid logo" />
                        <h1 class="mt-3">Login</h1>
                        <hr />
                    </b-card-title>

                    <!-- <b-form> -->
                    <!-- <b-input-group prepend="@" class="mt-3">
                            <b-form-input id="email" type="email" required placeholder="Enter email"></b-form-input>
                        </b-input-group>

                        <b-input-group prepend="**" class="mt-3">
                            <b-form-input
                                id="password"
                                type="password"
                                required
                                placeholder="Enter password"
                            ></b-form-input>
                        </b-input-group> -->

                    <b-button variant="primary" class="mt-3 p-3" block @click="login">Login with Discord</b-button>
                    <!-- <b-button type="submit" variant="secondary" class="mt-2" block>Register</b-button>
                        <b-button type="submit" variant="link" class="">forgot password?</b-button> -->
                    <!-- </b-form> -->
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    methods: {
        login() {
            console.log('asdas');
        }
    }
});
</script>

<style lang="scss" scoped>
.logo {
    max-height: 150px;
}
.h-100-vh {
    height: 100vh !important;
}
</style>
