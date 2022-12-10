<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
      :on-remove="delremove"
      :on-change="changeFile"
      :http-request="upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />

    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID471mO6Thqw7774wgHj6IKLF9xbJ4mKtY',
  SecretKey: 'f7MYg2PtaOI9xZzFSfWbxCNSfxKjz406'
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false, // 控制图片的显示或者隐藏
      imgUrl: '', // 存储点击的图片地址
      currentFileUid: '', // 用一个变量 记住当前上传的图片id
      percent: 0,
      showPercent: false // 默认不显示进度条
    }
  },
  computed: {
    // 判断是否已经上传了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      // 点击预览
      this.imgUrl = file.url
      this.showDialog = true
    },
    delremove(file, fileList) {
      this.fileList = fileList
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item)
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      return true
    },
    upload(params) {
      this.showPercent = true
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: 'picture-1315406987', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            onProgress: (params) => {
              // 进度条
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            console.log(err || data)
            if (!err && data.statusCode === 200) {
            //   console.log(this.imgUrl)
              this.fileList = this.fileList.map((item) => {
                //   记录下id
                if (item.uid === this.currentFileUid) {
                  // 将成功的地址赋值给原来的url属性
                  return { url: 'http://' + data.Location, upload: true }
                  // upload 为true 表示这张图片已经上传 根据有没有upload这个标记来决定是否去保存
                }
                return item
              })
              setTimeout(() => {
                this.showPercent = false // 隐藏进度条
                this.percent = 0 // 进度归0
                // console.log(this.fileList)
              }, 1000)
            }
          }
        )
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
