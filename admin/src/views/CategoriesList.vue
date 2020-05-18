 <template>
    <el-table :data="model" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleDelete(scope.row._id)" type="text" size="small">删除</el-button>
                <el-button @click="handleEdit(scope.row._id)" type="text" size="small">编辑</el-button>
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
            const res = await this.$http.get("/categories");
            this.model = res.data;
            console.log(res);
        },
        async handleDelete(id) {
            await this.$http.delete(`/categories/${id}`);
            console.log(res);
        },
        handleEdit (id) {
            this.$router.push({path: `/categories/create/${id}`})
        }
    }
};
</script>