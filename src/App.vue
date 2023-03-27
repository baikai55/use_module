<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/tuozhuai">拖拽</router-link> |
    <router-link to="/table">表格组件</router-link> |
  </nav>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>

</template>
<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default {
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn
    }
  }
}
</script>
<style lang="scss">
.el-pagination {
  justify-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
