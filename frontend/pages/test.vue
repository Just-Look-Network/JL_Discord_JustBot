<template>
    <b-container class="h-100-vh">
        <b-row class="h-100">
            <b-col lg="4" offset-lg="4" align-self="center">
                <b-card class="shadow">
                    <b-card-title class="text-center">
                        <img src="~/assets/img/logo.png" alt="Just-Look Network Logo" class="img-fluid logo" />
                        <h1 class="mt-3">Submit Test</h1>
                        <hr />
                    </b-card-title>

                    <b-form>
                        <b-input-group prepend="@" class="mt-3">
                            <b-form-input
                                id="title"
                                type="text"
                                v-model="book.title"
                                required
                                placeholder="Enter Title"
                            ></b-form-input>
                        </b-input-group>

                        <b-input-group prepend="**" class="mt-3">
                            <b-form-input
                                id="desc"
                                type="text"
                                required
                                v-model="book.desc"
                                placeholder="Enter Description"
                            ></b-form-input>
                        </b-input-group>

                        <b-button variant="primary" @click="onSubmit" class="mt-3 p-3" block>Submit Test</b-button>
                        <b-button type="submit" variant="secondary" class="mt-2" block>Reset</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            book: {
                title: '',
                desc: ''
            }
        };
    },
    methods: {
        onSubmit() {
            const data = {
                title: this.book.title,
                description: this.book.desc
            };

            this.$axios
                .$post('/api/tutorials', data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.logo {
    max-height: 150px;
}
.h-100-vh {
    height: 100vh !important;
}
</style>
