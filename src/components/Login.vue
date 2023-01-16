<template>
  <el-card body-style="padding: 20px 20px 0;"  style="margin: auto; max-width: 400px;">
    <el-form :label-width="40">
      <el-form-item label="账号">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

const username = ref('')
const password = ref('')
export default {
  name: "Login",
  data() {
    return {
      username: username,
      password: password
    }
  },
  methods: {
    login() {
      axios.post(
          '/api/login/',
          {
            username: username.value,
            password: password.value
          }
      ).then(
          r => {
            console.log(r.data)
            if (r.data['result'] === 'success') {
              ElMessage.success('成功')
              location.reload()
              this.$router.go(0)
            }else {
              ElMessage.error('失败')
            }
          }
      ).catch(
          () => {
            ElMessage.error('失败(失败)')
          }
      )
    }
  }
}
</script>

<style scoped>

</style>