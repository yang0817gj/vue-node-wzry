<template>
    <div class="category-create">
        <h3>{{id ? '修改' : '新建'}}分类</h3>
        <el-form label-position="left" label-width="80px" @submit.native.prevent="handleSubmit">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <el-option
                        v-for="item in items"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
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
                res = await this.$http.post("/categories", this.model);
            } else {
                res = await this.$http.put(
                    `/categories/${this.id}`,
                    this.model
                );
            }
            console.log(res);
        },
        async fetch() {
            const res = await this.$http.get(`/categories/${this.id}`);
            this.model = res.data;
        },
        async fetchCategory() {
            const res = await this.$http.get("/categories");
            this.items = res.data;
        }
    }
};
</script>

<style lang="scss">
</style>