<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from './views/index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
p {
  margin: 0;
}

.van-radio-group .van-radio .van-radio__icon .van-icon{
  border-radius: 3px;
  margin-left: 5px;
}
.book-description-label {
  padding: 0 0 0 5px;
  font-size: 14px;
  margin-right: 5px !important;
  text-align: left;
  color: #646566;
}
.van-action-sheet__header {
  background: #fff;
}
</style>
