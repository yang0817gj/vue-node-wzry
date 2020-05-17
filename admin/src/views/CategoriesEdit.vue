<template>
    <div class="category-create">
        <h3>新增分类</h3>
        <el-form label-position="left" label-width="80px" @submit.native.prevent="handleSubmit">
            <el-form-item label="名称">
                <el-input v-model="medel.name"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" native-type="submit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            medel: {}
        };
    },
    mounted() {
    },
    methods: {
        handleSubmit () {
            console.log(123)
        }
    },
};
</script>

<style lang="scss">
</style>