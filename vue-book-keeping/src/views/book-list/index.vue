<template>
  <div class="book-list">
    <header class="book-list-detail-header">
      <!-- header -->
      <van-nav-bar title="Book" />
      <!-- sub header -->
      <div class="header-statistics">
        <van-row gutter="24">
          <van-col
            v-for="(item, index) in topAnalyFields"
            :span="item.span"
            :key="index"
          >
          <block-item
            :template="item.template"
            :propsData="item.templateData"
          >
            <div slot="right" class="vertacal-divider" v-if="index === 0"></div>
          </block-item>
          </van-col>
        </van-row>
      </div>
    </header>

    <div class="book-content">
      <List :listData="listData" />
    </div>
  </div>
</template>

<script>
import { NavBar, Col, Row } from 'vant';
import BlockItem from '@/components/BlockItem';
import List from '@/components/List';
export default {
  name: 'book-list',
  components: {
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row,
    BlockItem,
    List
  },
  data() {
    return {
      topAnalyFields: [{ 
        span: 6, 
        template: {
          type: {
            type: 'select',
            direction: 'right-bottom',
          },
          subField: {
            name: '年',
            dataIndex: 'Year',
            dataDirect: 'left',
          },
          field: {
            name: '月',
            dataIndex: 'Month',
            dataDirect: 'left',
          }
        },
        templateData: {
          'Year': '2018',
          'Month': '6',
        }
      },{ 
        span: 9, 
        template: {
          subField: {
            name: '收入',
          },
          field: {
            dataIndex: 'income',
            isFormat: true,
            precision: 2,
            isallowTh: false
          },
          textAlign: 'left'
        },
          templateData: {
          'income': '0.00',
        }
      },{
        span: 9,
        template: {
          subField: {
            name: '支出',
          },
          field: {
            dataIndex: 'payment',
            isFormat: true,
            precision: 2,
            isallowTh: false
          },
          textAlign: 'left'
        },
        templateData: {
          'payment': '5598.97',
        }
      }],
      listData: [],
    }
  },
  methods: {
    fetchData() {
      const { dispatch } = this.$store;
      dispatch({
        type: 'getBookKeepList',
        userId: '12336',
        date: '2021-03-08'
      }).then(res => {
        this.listData = res;
      })
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.book-list {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .book-list-detail-header {
    .van-nav-bar {
      background: rgba(#ff9900, 0.7);
      font-family: PingFangSC-Regular, sans-serif;
      &::after {
        display: none;
      }
    }
    .header-statistics {
      padding-top: 6px;
      background: rgba(#ff9900, 0.7);
      .vertacal-divider {
        position: absolute;
        top: 50%;
        right: -8px;
        height: 39px;
        width: 1px;
        margin: 5px;
        background: #000;
        transform: translateY(-45%) scale(0.5);
      }
    }
  }
  .book-content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>