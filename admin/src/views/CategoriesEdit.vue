<template>
    <div class="category-create">
        <h3>新增分类</h3>
        <el-form label-position="left" label-width="80px" @submit.native.prevent="handleSubmit">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
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
            model: {}
        };
    },
    mounted() {
        console.log(this.id);
        this.id && this.fetch()
    },
    methods: {
        async handleSubmit() {
            const res = await this.$http.post("/categories", this.model); 
            console.log(res);
        },
        async fetch() {
            const res = await this.$http.get(`/categories/${this.id}`);
            this.model = res.data
        }
    }
};
</script>

<style lang="scss">
</style>