<template>
    <div class="category-create">
        <h3>{{id ? '修改' : '新建'}}分类</h3>
        <el-form label-position="left" label-width="100px" @submit.native.prevent="handleSubmit">
            <el-form-item label="广告位名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button
                    size="medium"
                    type="text"
                    style="margin: 10px 0;"
                    @click="model.items.push({})"
                >
                    <i class="el-icon-plus"></i> 添加广告
                </el-button>
                <el-row type="flex" style="flex-wrap: wrap;">
                    <el-col :md="12" v-for="(item, i) in model.items" :key="i">
                        <el-card style="margin:0 1rem 1rem 0;">
                            <el-form label-position="left" label-width="80px">
                                <el-form-item label="URL">
                                    <el-input v-model="item.url"></el-input>
                                </el-form-item>
                                <el-form-item style="margin-top:20px;" label="广告图">
                                    <el-upload
                                        class="icon-uploader"
                                        :action="uploadsUrl"
                                        :headers="getAuthToken()"
                                        :show-file-list="false"
                                        :on-success="res => $set(item, 'image', res.file.url)"
                                    >
                                        <img v-if="item.image" :src="item.image" class="icon" />
                                        <i v-else class="el-icon-plus icon-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>

                                <el-form-item>
                                    <el-button
                                        size="small"
                                        type="danger"
                                        @click="model.items.splice(i,1)"
                                    >删除技能</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
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
            model: {
                items: []
            }
        };
    },
    mounted() {
        this.id && this.fetch();
    },
    methods: {
        async handleSubmit() {
            let res;
            if (!this.id) {
                res = await this.$http.post("/rest/ads", this.model);
            } else {
                res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
            }
            this.$router.push('/ads/list')
        },
        async fetch() {
            const res = await this.$http.get(`/rest/ads/${this.id}`);
            this.model = res.data;
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
    min-width: 10rem;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
}
.icon {
    min-width: 10rem;
    height: 10rem;
    display: block;
}
</style>