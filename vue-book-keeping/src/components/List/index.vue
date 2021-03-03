<template>
  <div class="list-wrapper">
    <list-item
      v-for="(data, index) in listData"
      :key="index"
      :list="data.list"
    >
      <p slot="sub-header-left">11月18日 星期日</p>
      <p slot="sub-header-right">支出：1.5</p>
    </list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'list',
  props: ['listData'],
  components: {
    ListItem
  },
  data() {
    return {

    }
  },
  mounted() {
    console.log('listdata', this.listData)
  }
}
</script>