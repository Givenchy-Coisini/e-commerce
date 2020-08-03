<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table stripe border :data="userList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row.mg_state}}  scope会覆盖props-->
            <el-switch v-model="scope.row.mg_state" @change="UserStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <!-- {{scope.row.mg_state}}  scope会覆盖props -->
            <!-- 修改按钮 -->
            <el-button  @click="showEditDialog(scope.row.id)" size="mini" type="primary" icon="el-icon-edit"></el-button>
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserByid(scope.row.id)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top">
              <el-button size="mini" type="warning" icon="el-icon-setting" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
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
      ></el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体取 -->
   <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
    <el-form-item label="手机号" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
   </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="EditDialogVisible" width="50%" @close="editDialogClose" >
      <!-- 内容主体取 -->
   <el-form :model="EditForm" :rules="EditFormRules" ref="EditFormRef" label-width="70px">
  <el-form-item label="用户名" >
    <el-input v-model="EditForm.username" disabled></el-input>
  </el-form-item>
    <el-form-item label="邮箱" prop="email">
    <el-input v-model="EditForm.email"></el-input>
  </el-form-item>
    <el-form-item label="手机号" prop="mobile">
    <el-input v-model="EditForm.mobile"></el-input>
  </el-form-item>
   </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
  <el-dialog
  title="分配角色"
  :visible.sync="setRoledialogVisible"
  width="50%"
  @close="setRoledialogClose">
 <div>
  <p>当前的用户:{{userinfo.username}}</p>
  <p>当前的角色: {{userinfo.role_name}}</p>
  <p>分配新角色:
    <el-select v-model="selectedRoleId" placeholder="请选择">
    <el-option
      v-for="item in rolesList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select></p>
 </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRoledialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    var checkMobeil = (rule, value, callback) => {
    // 验证手机号的正则表达式
     const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|16[0-9]|17[678]|18[0-9|]14[57])[0-9]{8}$/
     if (regMobile.test(value)) {
       return callback()
     }
     callback(new Error('请输入正确的手机号'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
       // 控制修改用户对话框的显示与隐藏
      EditDialogVisible: false,
      // 控制分配角色对话框的显示与隐藏
      setRoledialogVisible: false,
    // 需要被配角色的用户信息
      userinfo: {},
      // 已经选中的角色id值
      selectedRoleId: '',
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 所有角色的数据列表
      rolesList: [],
      // 查询到的用户信息对象
      EditForm: {},
      // 添加表单验证的规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在3-10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在6-15之间', trigger: 'blur' }
        ],
          email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
         mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobeil, trigger: 'blur' }
        ]
      },
      EditFormRules: {
        // 修改表单的验证规则对象
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
         mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobeil, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败!')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    addDialogClose() {
      // 监听添加用户对话框的关闭事件
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose() {
      // 监听修改用户对话框的关闭事件
       this.$refs.EditFormRef.resetFields()
    },
    addUser() {
      // 点击按钮,添加新用户
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return false
        // 可以发起添加用户的网络请求
        const { data } = await this.$http.post('users', this.addForm)
        if (data.meta.status !== 201) return this.$message.error('添加失败')
        this.$message.success('添加成功')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
    })
    },
    EditUser() {
 // 点击按钮,修改用户信息并且提交
      this.$refs.EditFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return false
        // 可以发起修改用户的网络请求
        const { data } = await this.$http.put('users/' + this.EditForm.id, { email: this.EditForm.email, mobile: this.EditForm.mobile })
        if (data.meta.status !== 200) return this.$message.error('更新失败')
        // 隐藏修改用户的对话框
        this.EditDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
        // 提示修改成功
        this.$message.success('更新用户信息成功')
    })
    },
    async removeUserByid(id) {
      // 根据id删除用户
      // 弹框提示
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
        const { data } = await this.$http.delete('users/' + id)
        if (data.meta.status !== 200) return this.$message.error('删除用户失败')
        this.$message.success('删除用户成功')
        // 重新获取用户列表数据
        this.getUserList()
    },
    async showEditDialog(id) {
       // 展示编辑的对话框
       console.log(id)
       const { data } = await this.$http.get('users/' + id)
       if (data.meta.status !== 200) {
        return this.$message.error('查询用户信息失败')
       }
       this.EditForm = data.data
       this.EditDialogVisible = true
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      //  console.log(newSize)
      // 点击以后当前显示多少页赋值给pagesize 然后重新请求数据
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async UserStateChange(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败!')
      }
      this.$message.success('更新用户状态成功!')
    },
    async setRole(userInfo) {
      // 展示分配角色的对话框
      this.userinfo = userInfo
     // 获取对话框之前 获取所有角色的列表
     const { data: res } = await this.$http.get('roles')
     if (res.meta.status !== 200) {
        return this.$message.error('更新用户状态失败!')
      }
      this.rolesList = res.data
      this.$message.success('更新用户状态成功!')
      this.setRoledialogVisible = true
    },
    // 点击按钮 分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择用户角色!')
      }
       const { data: res } = await this.$http.put(`users/${this.userinfo.id}/role`, { rid: this.selectedRoleId })
      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败!')
      }
      this.$message.success('更新角色成功!')
      this.getUserList()
      this.setRoledialogVisible = false
    },
    setRoledialogClose() {
       // 监听分配角色对话框的关闭事件
    this.selectedRoleId = ''
     this.userinfo = {}
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>
</style>
