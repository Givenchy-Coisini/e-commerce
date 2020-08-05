<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps align-center :space="200" :active="activeIndex - 0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          :before-leave="beforeTabLeave"
          v-model="activeIndex"
          :tab-position="'left'"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                :props="cateProps"
                :options="cateList"
                v-model="addForm.goods_cat"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox border :label="cb" v-for="(cb, i) in item.attr_vals" :key="i"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
              <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                  <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
              <!-- action 表示图片庶上传到胡后台API地址 -->
              <el-upload
          action="http://127.0.0.1:8888/api/private/v1/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          :headers="headerObj"
          :on-success="handleSuccess">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
              <!-- 富文本编辑器 -->
              <quill-editor v-model="addForm.goods_introduce"></quill-editor>
          <!-- 添加商品的按钮 -->
          <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog
  title="图片预览"
  :visible.sync="previewVisible"
  width="50%">
 <img :src="previewPath" alt="" class="previewImg">
</el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      activeIndex: '0',
      //  添加商品的表单数据对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属的分类数组
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      cateList: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCateKeys: [],
      manyTableData: [],
      onlyTableData: [],
    //   图片上传组件的headers请求头对象
      headerObj: {
          Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      previewVisible: false
    }
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败!')
      }
      this.cateList = res.data
      console.log(this.cateList)
    },
    handleChange() {
      console.log(this.addForm.goods_cat)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      // console.log(`即将离开的标签页是:${oldActiveName}`)
      // console.log(`即将进入的标签页是${activeName}`)
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    async tabClicked() {
      // console.log(this.activeIndex)
      if (this.activeIndex === '1') {
        const {
          data: res
        } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'many' }
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态参数列表失败')
        }
        res.data.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [1, 2, 3] : item.attr_vals.split('')
        })
        this.manyTableData = res.data
        console.log(res.data)
      } else if (this.activeIndex === '2') {
        const {
          data: res
        } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: { sel: 'only' }
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态参数列表失败')
        }
        // res.data.forEach((item) => {
        //   item.attr_vals =
        //     item.attr_vals.length === 0 ? [1, 2, 3] : item.attr_vals.split('')
        // })
        this.onlyTableData = res.data
        console.log(res.data)
      }
    },
    // 处理图片预览
    handlePreview(file) {
        console.log('xxxsss', file)
        this.previewPath = file.response.data.url
        this.previewVisible = true
    },
    // 处理移除图片的操作
    handleRemove(file) {
        console.log('xxx', file)
        /***
         * 1.获取将要删除的图片的临时路径
         * 2.从pics数组中，找到这个图片对应的索引值
         * 3.调用数组的splice方法，把图片信息对象，从pics数组中移除
         */
        const filePath = file.response.data.tmp_path
        const index = this.addForm.pics.findIndex(x => {
            x.pic = filePath
        })
        this.addForm.pics.splice(index, 1)
        console.log(this.addForm)
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      console.log(response)
    //   1.先拼接得到图片信息对象
    const picInfo = { pic: response.data.tmp_path }
    //   2.将图片信息对象 push到pics数组中
    this.addForm.pics.push(picInfo)
    console.log(this.addForm)
  },
  add() {
    //   添加商品
    this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
            return this.$message.error('请填写必要的表单项')
        }
        // 执行添加的业务逻辑
        // lodash  --->实现深拷贝 cloneDeep(obj) 弄了一个一模一样的对象 对这个改变的时候不影响原来的
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')
        // 处理动态参数
        this.manyTableData.forEach(item => {
            const newInfo = {
                attr_id: item.attr_id,
                attr_value: item.attr_vals.join(',')
            }
            this.addForm.attrs.push(newInfo)
        })
        // 处理动态属性
         this.onlyTableData.forEach(item => {
            const newInfo = {
                attr_id: item.attr_id,
                attr_value: item.attr_vals
            }
            this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs
        // console.log(form)
        // 发起请求 添加商品
        // 商品的名称必须是唯一的
        const { data: res } = await this.$http.post('goods', form)
       if (res.meta.status !== 201) {
        return this.$message.error('添加商品失败!')
      }
         this.$message.success('添加商品成功')
         this.$router.push('/goods')
    })
  }
  },
  created() {
    this.getCateList()
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
    margin: 0 10px 0 0 !important;
}
.previewImg {
    width: 100%;
}
.btnAdd {
    margin-top: 15px;
}
</style>
