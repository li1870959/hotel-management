<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
    name: 'App',
    mounted() {
        // 初始化主题
        this.$store.dispatch('settings/initTheme');
    }
};
</script>
<style>

</style>