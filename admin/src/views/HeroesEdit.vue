<template>
    <div class="category-create">
        <h3>{{id ? '修改' : '新建'}}英雄</h3>
        <el-form label-position="left" label-width="80px" @submit.native.prevent="handleSubmit">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                    class="icon-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="handleiconSuccess"
                >
                    <img v-if="model.avatar" :src="model.avatar" class="icon" />
                    <i v-else class="el-icon-plus icon-uploader-icon"></i>
                </el-upload>
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
        };
    },
    mounted() {
        this.id && this.fetch();
    },
    methods: {
        async handleSubmit() {
            let res;
            if (!this.id) {
                res = await this.$http.post("/rest/heroes", this.model);
            } else {
                res = await this.$http.put(
                    `/rest/heroes/${this.id}`,
                    this.model
                );
            }
        },
        async fetch() {
            const res = await this.$http.get(`/rest/heroes/${this.id}`);
            this.model = res.data;
        },
        handleiconSuccess(res) {
            this.$set(this.model, 'avatar', res.file.url)
        }
    }
};
</script>

<style lang="scss">
.icon-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.icon-uploader .el-upload:hover {
    border-color: #409eff;
}
.icon-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.icon {
    width: 178px;
    height: 178px;
    display: block;
}
</style>