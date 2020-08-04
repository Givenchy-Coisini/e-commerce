<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="treeTable"
        border
        index-text="#"
        show-index
        :expand-type="false"
        :selection-type="false"
        :data="cateList"
        :columns="columns"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            style="color:lightgreen;"
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
          ></i>
          <i style="color:red;" class="el-icon-error" v-else></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.cat_id)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserByid(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addCateDialogClosed" >
      <!-- 内容主体取 -->
   <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="80px">
  <el-form-item label="分类名称" prop="cat_name" >
    <el-input v-model="addCateForm.cat_name"></el-input>
  </el-form-item>
    <el-form-item label="父级分类:" >
        <!-- options用来指定数据源 -->
        <!-- props用来指定配置对象 -->
           <el-cascader
        expand-trigger="hover"
        :props="cascaderProps"
        :options="parentCateList"
        v-model="selectedKeys"
        @change="parentCateChange"
        clearable
        change-on-select
        >
  </el-cascader>
  </el-form-item>
   </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate" >确 定</el-button>
      </span>
    </el-dialog>
     <!-- 修改分类的对话框 -->
    <el-dialog title="修改角色" :visible.sync="EditCateDialogVisible" width="50%" @close="editDialogClose" >
      <!-- 内容主体区域 -->
   <el-form :model="EditForm" :rules="EditFormRules" ref="EditFormRef" label-width="80px">
   <el-form-item label="分类名称" prop="cat_name">
    <el-input v-model="EditForm.cat_name"></el-input>
  </el-form-item>
   </el-form>
      <!-- 底部区域 -->
     <span slot="footer" class="dialog-footer">
        <el-button @click="EditCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类的数据列表 默认为空
      cateList: [],
      // 查询参数
      query: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      EditForm: {},
      EditCateDialogVisible: false,
      total: 0,
    //   指定级联选择器的配置对象
      cascaderProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
      },
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 表示将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'isok'
        },
        {
          label: '排序',
          // 表示将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'order'
        },
        {
          label: '操作',
          // 表示将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'opt'
        }
      ],
         addCateDialogVisible: false,
        //  添加分类的表单数据对象
         addCateForm: {
             cat_name: '',
            //  父级分类的id
             cat_pid: 0,
             cat_level: 0
         },
        //  父级分类的列表
         parentCateList: [],
        //  选中的父级元素的id数组
         selectedKeys: [],
        // 添加分类表单的验证规则对象
         addCateFormRules: {
         cate_name: [
              { required: true, message: '请输入分类名称', trigger: 'blur' },
              { min: 3, max: 10, message: '用户名的长度在3-10之间', trigger: 'blur' }
         ]
         },
         EditFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 5, message: '用户名的长度在2-5之间', trigger: 'blur' }
        ]
        }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.query
      })
      console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败!')
      }
      this.cateList = res.data.result
      this.total = res.data.total
    },
    // 监听 pageSize的改变
    handleSizeChange(newSize) {
      this.query.pagesize = newSize
      this.getCateList()
    },
    // 监听pageNum的改变
    handleCurrentChange(newPage) {
      this.query.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog() {
        // 先获取数据分类的列表
        this.getParentCateList()
        // 再显示出对话框
        this.addCateDialogVisible = true
    },
    async getParentCateList() {
        const { data: res } = await this.$http.get('categories', { params: { type: 2 } }
      )
      console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败!')
      }
      this.parentCateList = res.data
      console.log('tag', this.parentCateList)
    },
    // 选择项发生变化时候触发
    parentCateChange() {
        console.log(this.selectedKeys)
        // 如果selectedKeys 数据中的length大于0,证明选中父级分类
        // 反之，则说明 没有选中任何父级分类
        if (this.selectedKeys.length > 0) {
            // 父级分类的id
          this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
          this.addCateForm.cat_level = this.selectedKeys.length// 为当前分类的等级赋值
          return false
        } else { // 没有选中
             this.addCateForm.cat_pid = 0
             this.addCateForm.cat_level = 0
        }
    },
    addCate() {
        console.log(this.addCateForm)
        this.$refs.addCateFormRef.validate(async valid => {
            if (!valid) return false
            const { data: res } = await this.$http.post('categories', this.addCateForm)
            if (res.meta.status !== 201) {
            return this.$message.error('添加分类失败!')
      }
      this.$message.success('添加分类成功!')
      this.getCateList()
      this.addCateDialogVisible = false
})
    },
    // 监听对话框的关闭事件，重置表单数据
    addCateDialogClosed() {
     this.$refs.addCateFormRef.resetFields()
     this.selectedKeys = []
     this.addCateForm.cat_level = 0
     this.addCateForm.cat_pid = 0
    },
    editDialogClose() {
      this.$refs.EditFormRef.resetFields()
    },
     EditCate() {
      // 点击按钮,修改角色信息并且提交
      this.$refs.EditFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return false
        // 可以发起修改用户的网络请求
        const { data } = await this.$http.put('categories/' + this.EditForm.cat_id, { cat_name: this.EditForm.cat_name })
        if (data.meta.status !== 200) return this.$message.error('更新失败')
        // 隐藏修改用户的对话框
        this.EditCateDialogVisible = false
        // 重新获取用户列表数据
        this.getCateList()
        // 提示修改成功
        this.$message.success('更新分类信息成功')
    })
    },
       async showEditDialog(id) {
       // 展示编辑的对话框
       console.log(id)
       const { data } = await this.$http.get('categories/' + id)
       if (data.meta.status !== 200) {
        return this.$message.error('查询分类信息失败')
       }
       this.EditForm = data.data
       console.log('xxxx', this.EditForm)
       this.EditCateDialogVisible = true
    },
    async removeUserByid(id) {
      // 根据id删除用户
      // 弹框提示
      const res = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
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
        const { data } = await this.$http.delete('categories/' + id)
        if (data.meta.status !== 200) return this.$message.error('删除分类失败')
        this.$message.success('删除分类成功')
        // 重新获取用户列表数据
        this.getCateList()
    }
  }
}
</script>

<style scoped>
.treeTable {
    margin-top: 15px;
}
.el-cascader {
    width: 100%;
}
</style>
