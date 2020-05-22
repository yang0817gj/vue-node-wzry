<template>
    <div class="category-create">
        <h3>{{id ? '修改' : '新建'}}英雄</h3>
        <el-form label-position="left" label-width="80px" @submit.native.prevent="handleSubmit">
            <el-tabs value="second">
                <el-tab-pane label="基本信息" name="first">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="icon-uploader"
                            :action="uploadsUrl"
                            :headers="getAuthToken()"
                            :show-file-list="false"
                            :on-success="handleiconSuccess"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="icon" />
                            <i v-else class="el-icon-plus icon-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option
                                v-for="item in heroList"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="背景图">
                        <el-upload
                            class="icon-uploader"
                            :action="uploadsUrl"
                            :headers="getAuthToken()"
                            :show-file-list="false"
                            :on-success="handleBannerSuccess"
                        >
                            <img v-if="model.banner" :src="model.banner" class="icon" />
                            <i v-else class="el-icon-plus icon-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate
                            v-model="model.scores.difficult"
                            style="padding-top:.6rem;"
                            show-score
                            :max="10"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate
                            v-model="model.scores.skills"
                            style="padding-top:.6rem;"
                            show-score
                            :max="10"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate
                            v-model="model.scores.attack"
                            style="padding-top:.6rem;"
                            show-score
                            :max="10"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate
                            v-model="model.scores.survive"
                            style="padding-top:.6rem;"
                            show-score
                            :max="10"
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" :multiple-limit="6" multiple>
                            <el-option
                                v-for="item in itemList"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" :multiple-limit="6" multiple>
                            <el-option
                                v-for="item in itemList"
                                :key="item._id"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" placeholder="请输入内容" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" placeholder="请输入内容" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" placeholder="请输入内容" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能管理" name="second">
                    <el-button
                        size="medium"
                        type="text"
                        style="margin: 20px 0;"
                        @click="model.skills.push({})"
                    >
                        <i class="el-icon-plus"></i> 添加技能
                    </el-button>
                    <el-row type="flex" class="skills-wrap">
                        <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
                            <el-card class="box-card">
                                <el-form label-position="left" label-width="80px" :model="item[i]">
                                    <el-form-item label="技能名称">
                                        <el-input v-model="item.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="技能图标">
                                        <el-upload
                                            class="icon-uploader"
                                            :action="uploadsUrl"
                                            :headers="getAuthToken()"
                                            :show-file-list="false"
                                            :on-success="res => $set(item, 'icon', res.file.url)"
                                        >
                                            <img v-if="item.icon" :src="item.icon" class="icon" />
                                            <i v-else class="el-icon-plus icon-uploader-icon"></i>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="技能介绍">
                                        <el-input
                                            type="textarea"
                                            placeholder="请输入内容"
                                            v-model="item.description"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item label="技能消耗">
                                        <el-input v-model="item.cooling"></el-input>
                                    </el-form-item>
                                    <el-form-item label="技能冷却">
                                        <el-input v-model="item.consume"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button
                                            size="small"
                                            type="danger"
                                            @click="model.skills.splice(i,1)"
                                        >删除技能</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
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
                scores: {},
                skills: []
            },
            heroList: [],
            itemList: []
        };
    },
    mounted() {
        this.id && this.fetch();
        this.fetchHeroes();
        this.fetchItems();
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
        async fetchHeroes() {
            const res = await this.$http.get("/rest/categories");
            this.heroList = res.data;
        },
        async fetchItems() {
            const res = await this.$http.get("/rest/items");
            this.itemList = res.data;
        },
        handleiconSuccess(res) {
            this.$set(this.model, "avatar", res.file.url);
        },
        handleBannerSuccess(res) {
            this.$set(this.model, "banner", res.file.url);
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
    min-width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.icon {
    min-width: 5rem;
    height: 5rem;
    display: block;
}

.skills .el-input,
.el-textarea {
    width: 280px;
}
.box-card {
    box-sizing: border-box;
    margin: 20px;
}
.skills-wrap {
    flex-wrap: wrap;
}
</style>