<template>
    <div class="login-container">
        <el-card class="login-card">
            <div slot="header" class="clearfix">
                <span>请登录</span>
            </div>
            <el-form label-width="80px" label-position="left" @submit.native.prevent="handleLogin">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="model.pwd"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {}
        }
    },
    methods: {
        async handleLogin () {
            console.log(this.model);
            this.$http.post('/admin_users', this.model)
        }
    },
};
</script>

<style lang="scss">
.login-container {
    // background: #f2f2f2;
    overflow: hidden;
    min-height: 100vh;
    background: url('../assets/bg.png') no-repeat center;
    background-size: cover;
    .login-card {
        width: 30rem;
        margin: 10rem auto;
        // background-color: #f2f2f2;
    }
}
</style>