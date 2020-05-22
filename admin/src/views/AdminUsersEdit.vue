<template>
    <div class="category-create">
        <h3>{{id ? '修改' : '新建'}}管理员</h3>
        <el-form label-position="left" label-width="80px" @submit.native.prevent="handleSubmit">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input  v-model="model.pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            model: {},
            items: []
        };
    },
    mounted() {
        this.id && this.fetch();
        this.fetchCategory();
    },
    methods: {
        async handleSubmit() {
            let res;
            if (!this.id) {
                res = await this.$http.post("/rest/admin_users", this.model);
            } else {
                res = await this.$http.put(
                    `/rest/admin_users/${this.id}`,
                    this.model
                );
            }
            this.$router.push('/admin_users/list')
        },
        async fetch() {
            const res = await this.$http.get(`/rest/admin_users/${this.id}`);
            this.model = res.data;
        },
        async fetchCategory() {
            const res = await this.$http.get("/rest/admin_users");
            this.items = res.data;
        }
    }
};
</script>

<style lang="scss">
</style>