<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" @change="onTabChange">
      <van-tabbar-item
        v-for="tab in tabbarList"
        :key="tab.id"
        :icon="tab.type === 'customize' ? '' : tab.icon"
      >
        <div :class="tab.className">
          <i
            @click="onBookKeeping"
            v-if="tab.type === 'customize'"
          />
          {{tab.label}}
        </div>
        <!-- eslint-disable-next-line -->
        <!-- <template #icon="props" >
          <img :src="tab.icon" />
        </template> -->
      </van-tabbar-item>
    </van-tabbar>

    <AddBookKeepingInfo />
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import AddBookKeepingInfo from './AddBookKeepingInfo';
import { mapMutations } from 'vuex';
export default {
  name: 'Index',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    AddBookKeepingInfo,
  },
  data() {
    return {
      active: 0,
      lastActive: 0,
      tabbarList: [
        {id: 'detail', icon: 'balance-list-o', label: '明细'},
        {id: 'detail1', icon: 'balance-list-o', label: '明细'},
        {id: 'book', type: 'customize', label: '记账', icon: '', className: 'book-keeping'},
        {id: 'detail3', icon: 'balance-list-o', label: '明细'},
        {id: 'detail4', icon: 'balance-list-o', label: '明细'},
      ]
    }
  },
  methods: {
    ...mapMutations([
      'setShowBookRecord'
    ]),
    onBookKeeping() {
      this.$store.commit('setShowBookRecord', true)
    },
    onTabChange(index) {
      if (index === 2) {
        this.active = this.lastActive;
      } else {
        this.lastActive = index;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.book-keeping{
  position: relative;
  top: -25%;
  z-index: 1000;
  & > i {
    display: block;
    height: 45px;
    width: 45px;
    background: #fff;
    border: 1px solid #eee;
    border-width: 1px 1px 0 0;
    transform: rotate(-45deg);
    border-radius: 50%;
    margin-bottom: 10px;
    position: relative;
    &::after {
      content: '';
      height: 30px;
      width: 30px;
      background: url(/img/logo.82b9c7a5.png) no-repeat;
      background-size: contain;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: rotate(45deg);
      margin-left: -15px;
      margin-top: -15px; 
    }
  }
}
</style>