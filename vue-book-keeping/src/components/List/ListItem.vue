<template>
  <div class="list-item-wrapper">
    <header class="sub-header">
      <slot name='sub-header-left'></slot>
      <slot name='sub-header-right'></slot>
    </header>

    <ul class="list-content">
      <li
        v-for="(l, index) in list"
        :key="index"
        class="l-item"
      >
        <span class="icon"><img :src="l.iconUrl" alt="icon"></span>
        <span class="desc">{{l.keeping_description}}</span>
        <span class="extra">{{l.extra}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: ['list'],
  data() {
    return {}
  },
  mounted() {
    console.log('list=', this.list)
  }
}
</script>


<style lang="scss" scoped>
.list-item-wrapper {
  .sub-header {
    min-height: 20px;
    padding: 5px 0;
    width: 100%;
    display: flex;
    color: #999;
    font-size: 13px;
    position: relative;
    background: #fafafa;
    &::after {
      content: '';
      height: 0;
      width: 100%;
      border-bottom: 1px solid #eee;
      position: absolute;
      bottom: 0;
      transform: scale(1, 0.5);
    }
    :first-child{
      flex: 0 0 40%;
      text-align: left;
      padding-left: 10px;
    }
    :last-child {
      flex: 1;
      text-align: right;
      padding-right: 10px;
    }
  }

  .list-content {
    .l-item {
      font-size: 14px;
      color: #666;
      display: flex;
      padding: 16px 0 16px 15%;
      position: relative;
      .icon {
        position: absolute;
        top: 50%;
        left: 8%;
        transform: translate(-50%, -50%);
        display: block;
        height: 32px;
        width: 32px;
        background: #f5f5f5;
        border-radius: 50%;
        img {
          height: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .desc {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .extra {
        flex: 0 0 20%;
        text-align: right;
        padding-right: 10px;
      }
      &::after {
        content: '';
        height: 0;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: absolute;
        bottom: 0;
        transform: scale(1, 0.5);
      }
      &:nth-last-of-type(1)::after {
        display: none;
      }
    }
  }
}
</style>