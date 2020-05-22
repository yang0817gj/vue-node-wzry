<template>
    <div class="category-create">
        <h3>{{id ? '修改' : '新建'}}文章</h3>
        <el-form label-position="left" label-width="80px" @submit.native.prevent="handleSubmit">
            <el-form-item label="名称">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <el-option
                        v-for="item in categoriesList"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容">
                <quill-editor
                    :content="model.content"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
export default {
    components: {
        quillEditor
    },
    props: {
        id: {
            type: String
        }
    },
    data() {
        return {
            model: {
                content: ""
            },
            categoriesList: [],
            items: [],
            editorOption: {
                modules: {
                    ImageExtend: {
                        // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
                        name: "file", // 图片参数名
                        size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
                        action: this.$http.defaults.baseURL + "/upload", // 服务器地址, 如果action为空，则采用base64插入图片
                        // response 为一个函数用来获取服务器返回的具体图片地址
                        // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                        // 则 return res.data.url
                        response: res => {
                            return res.file.url;
                        },
                        // headers: xhr => {
                        //     // 上传图片请求需要携带token的 在xhr.setRequestHeader中设置
                        //     xhr.setRequestHeader();
                        // }, // 可选参数 设置请求头部
                        sizeError: () => {}, // 图片超过大小的回调
                        start: () => {}, // 可选参数 自定义开始上传触发事件
                        end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                        error: () => {}, // 可选参数 上传失败触发的事件
                        success: () => {}, // 可选参数  上传成功触发的事件
                        change: (xhr, formData) => {
                            // xhr.setRequestHeader('myHeader','myValue')
                            // formData.append('token', 'myToken')
                        } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                    },

                    toolbar: {
                        // 如果不上传图片到服务器，此处不必配置
                        container: [
                            ["bold", "italic", "underline", "strike"], // toggled buttons
                            ["blockquote", "code-block"],

                            [{ header: 1 }, { header: 2 }], // custom button values
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ script: "sub" }, { script: "super" }], // superscript/subscript
                            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                            [{ direction: "rtl" }], // text direction

                            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],

                            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                            [{ font: [] }],
                            [{ align: [] }],
                            ["image"] //去除video即可
                        ], // container为工具栏，此次引入了全部工具栏，也可自行配置
                        handlers: {
                            image: function() {
                                // 劫持原来的图片点击按钮事件
                                QuillWatch.emit(this.quill.id);
                            }
                        }
                    }
                }
            }
        };
    },
    mounted() {
        this.id && this.fetch();
        this.fetchCategories();
    },
    methods: {
        async handleSubmit() {
            let res;
            if (!this.id) {
                res = await this.$http.post("/rest/articles", this.model);
            } else {
                res = await this.$http.put(
                    `/rest/articles/${this.id}`,
                    this.model
                );
            }
            this.$router.push('/articles/list')            
        },
        async fetch() {
            const res = await this.$http.get(`/rest/articles/${this.id}`);
            this.model = res.data;
        },
        async fetchCategories() {
            const res = await this.$http.get("/rest/categories");

            this.categoriesList = res.data;
        },

        onEditorChange({ quill, html, text }) {
            this.model.content = html;
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
.ql-container {
    min-height: 400px;
}
.quill-editor deep img {
    max-width: 100%;
}
</style>