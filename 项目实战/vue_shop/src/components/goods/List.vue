<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query"  @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table stripe border :data="goodsList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="95"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="70"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="140">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <!-- {{scope.row.mg_state}}  scope会覆盖props -->
            <!-- 修改按钮 -->
            <el-button  @click="showEditDialog(scope.row.id)" size="mini" type="primary" icon="el-icon-edit"></el-button>
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeGoodsByid(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少数据
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },
  methods: {
      async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败!')
      }
      // this.$message.success('获取商品列表成功!')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    showEditDialog() {
    },
    async removeGoodsByid(id) {
      console.log('xxxx', id)
      // 弹框提示
      const res = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // 如果用户确认删除  返回值为字符串confirm
        // 如果用户取消了删除  返回值为字符串cancle
        console.log(res)
        if (res !== 'confirm') {
          return this.$message.info('已取消了删除')
        }
        const { data } = await this.$http.delete('goods/' + id)
        if (data.meta.status !== 200) return this.$message.error('删除商品失败')
        this.$message.success('删除商品成功')
        // 重新获取用户列表数据
        this.getGoodsList()
    },
    handleSizeChange(newSize) {
       this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    goAddpage() {
      this.$router.push('/goods/add')
    }
  },
  created() {
      this.getGoodsList()
  }
}
</script>

<style scoped>
</style>
