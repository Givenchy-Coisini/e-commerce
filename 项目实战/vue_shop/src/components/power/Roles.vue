<template>
  <div>
         <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <!-- 添加角色按钮区域 -->
        <el-row>
            <el-col>
                <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 角色列表区域 -->
         <el-table :data="roleList" border stripe>
            <el-table-column type="expand">
                <template slot-scope="scope">
                       <el-row :class="['bdbottom', index1 ===0 ? 'bdtop':'', 'vcenter']" v-for="(item1, index1) in scope.row.children" :key="item1.id">
                           <!-- 渲染一级权限 -->
                           <el-col :span="5">
                               <el-tag  @close="removeRightById(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
                               <i class="el-icon-caret-right"></i>
                           </el-col>
                           <!-- 渲染二级和三级权限 -->
                           <el-col :span="19">
                               <!-- 通过for循环 嵌套渲染二级权限 -->
                               <el-row :class="['bdtop', index2 ===0 ? 'bdbottom':'', 'vcenter']" v-for="(item2, index2) in item1.children" :key="item2.id">
                                   <el-col :span="6">
                                       <el-tag type="success" @close="removeRightById(scope.row, item2.id)" closable>{{item2.authName}}</el-tag>
                                       <i class="el-icon-caret-right"></i>
                                   </el-col>
                                   <el-col :span="18">
                                    <el-tag @close="removeRightById(scope.row, item3.id)" closable type="warning" v-for="(item3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                                   </el-col>
                               </el-row>
                           </el-col>
                       </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeUserByid(scope.row.id)">删除</el-button>
                    <el-button  size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主体区域 -->
   <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
  <el-form-item label="角色名" prop="roleName">
    <el-input v-model="addForm.roleName"></el-input>
  </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="addForm.roleDesc"></el-input>
  </el-form-item>
   </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addJuese">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色的对话框 -->
    <el-dialog title="修改角色" :visible.sync="EditDialogVisible" width="50%" @close="editDialogClose" >
      <!-- 内容主体区域 -->
   <el-form :model="EditForm" :rules="EditFormRules" ref="EditFormRef" label-width="80px">
   <el-form-item label="角色名" prop="roleName">
    <el-input v-model="EditForm.roleName"></el-input>
  </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="EditForm.roleDesc"></el-input>
  </el-form-item>
   </el-form>
      <!-- 底部区域 -->
     <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditJuese">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限的对话框 -->
    <el-dialog
    title="分配权限"
     :visible.sync="setRightDialogVisible"
    width="50%" @close="setRightDialogClose">
    <!-- 树形控件 -->
  <el-tree show-checkbox :data="rightsList" :props="treeProps" ref="treeRef" node-key="id" default-expand-all :default-checked-keys="defKeys"></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 所有角色列表数据
            roleList: [],
            EditForm: {},
            // 所有权限的数据
            rightsList: [],
            // 默认选中的id值数组
            defKeys: [],
            addDialogVisible: false,
            EditDialogVisible: false,
            // 分配权限对话框的显示和隐藏
            setRightDialogVisible: false,
            addForm: {
               roleName: '',
               roleDesc: ''
             },
             treeProps: {
                 children: 'children',
                 label: 'authName'
             },
            addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名的长度在2-10之间', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 5, message: '密码的长度在2-5之间', trigger: 'blur' }
        ]
          },
           EditFormRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 2, max: 5, message: '角色名的长度在2-5之间', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 6, message: '角色的长度在2-6之间', trigger: 'blur' }
        ]
          },
        roleId: ''
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        async getRoleList() {
            // 获取所有角色列表
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) {
                return this.$message.error('获取角色列表失败')
            }
            this.roleList = res.data
            console.log(this.roleList)
    },
    addJuese() {
      // 点击按钮,添加新角色
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return false
        // 可以发起添加角色的网络请求
        const { data } = await this.$http.post('roles', this.addForm)
        if (data.meta.status !== 201) return this.$message.error('添加失败')
        this.$message.success('添加角色成功')
        // 隐藏添加角色的对话框
        this.addDialogVisible = false
        // 重新获取角色列表数据
        this.getRoleList()
    })
    },
       async showEditDialog(id) {
       // 展示编辑的对话框
       console.log(id)
       const { data } = await this.$http.get('roles/' + id)
       if (data.meta.status !== 200) {
        return this.$message.error('查询用户信息失败')
       }
       this.EditForm = data.data
       console.log('xxxx', this.EditForm)
       this.EditDialogVisible = true
    },
    EditJuese() {
      // 点击按钮,修改角色信息并且提交
      this.$refs.EditFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return false
        // 可以发起修改用户的网络请求
        const { data } = await this.$http.put('roles/' + this.EditForm.roleId, { roleName: this.EditForm.roleName, roleDesc: this.EditForm.roleDesc })
        if (data.meta.status !== 200) return this.$message.error('更新失败')
        // 隐藏修改用户的对话框
        this.EditDialogVisible = false
        // 重新获取用户列表数据
        this.getRoleList()
        // 提示修改成功
        this.$message.success('更新用户信息成功')
    })
    },
    async removeUserByid(id) {
      // 根据id删除用户
      // 弹框提示
      const res = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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
        const { data } = await this.$http.delete('roles/' + id)
        if (data.meta.status !== 200) return this.$message.error('删除角色失败')
        this.$message.success('删除角色成功')
        // 重新获取用户列表数据
        this.getRoleList()
    },
    addDialogClose() {
        // 监听添加角色对话框的关闭事件
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose() {
         // 监听修改角色对话框的关闭事件
       this.$refs.EditFormRef.resetFields()
    },
      // 监听分配权限对话框的关闭事件
    setRightDialogClose() {
      this.defKeys = []
    },
    async removeRightById(role, rightid) {
        // 根据id删除对应的权限
        // 弹框提示用户是否是删除
         const res = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (res !== 'confirm') {
          return this.$message.info('已取消了删除')
        }
        const { data } = await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
        if (data.meta.status !== 200) return this.$message.error('删除权限失败')
        this.$message.success('删除权限成功')
        // 把服务器返回的最新的权限直接返回给角色的role
        role.children = data.data
    },
      // 展示分配权限的对话框
    async showSetRightDialog(role) {
        this.roleId = role.id
    //   获取所有权限的数据
     const { data: res } = await this.$http.get('/rights/tree')
     if (res.meta.status !== 200) {
         return this.$message.error('获取权限列表失败')
     }
     this.rightsList = res.data
     console.log(this.rightsList)
     this.getLeafKeys(role, this.defKeys)
     this.setRightDialogVisible = true
     },
    //  通过递归的形式：获取角色下所有的三级权限的id 并报存到defKeys
     getLeafKeys(node, arr) {
         if (!node.children) {
            //  如果当前节点不包含children 属性 则是三级节点
             return arr.push(node.id)
         }
         node.children.forEach(item => {
             this.getLeafKeys(item, arr)
         })
     },
    //  点击为角色分配权限
    async  allotRights() {
         const keys = [
            ...this.$refs.treeRef.getCheckedKeys(),
            ...this.$refs.treeRef.getHalfCheckedKeys()
         ]// 两个数组合并成了一个新的数组 展开运算符有合并的意思
         console.log(keys)
         const idStr = keys.join(',')
         const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
          if (res.meta.status !== 200) {
         return this.$message.error('分配权限失败')
     }
       this.$message.success('分配权限成功')
        this.getRoleList()
        this.setRightDialogVisible = false
     }
    }
}
</script>

<style lang="less" scoped>
.el-tag {
    margin: 7px;
}
.bdtop {
    border-top: 1px solid #eee;
}
.bdbottom {
     border-bottom: 1px solid #eee;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>
