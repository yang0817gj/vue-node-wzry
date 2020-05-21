 <template>
    <el-table :data="model" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row._id)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            model: []
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        async fetch() {
            const res = await this.$http.get("/rest/articles");
            this.model = res.data;
        },
        handleDelete(row) {
            this.$confirm(`此操作将永久删除文章  "${row.title}"?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                await this.$http.delete(`/rest/articles/${row._id}`);
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                this.fetch()
            });
        },
        handleEdit(id) {
            this.$router.push({ path: `/articles/create/${id}` });
        }
    }
};
</script>