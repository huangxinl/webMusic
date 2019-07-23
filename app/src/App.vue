<template>
  <div id="app">
      <m-header></m-header>
      <tab></tab>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>
<script>
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab'
export default {
  name: 'home',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus">
@import '../src/common/stylus/variable'
#app
    color $color-theme
</style>
