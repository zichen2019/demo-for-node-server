<template>
  <van-action-sheet
    @close="handleCloseAction"
    v-model="getshowBookRecord"
    class="add-action-sheet"
    title="新增记账"
  >
    <div class="content">
      <!-- 记账类型 -->
      <div class="type-check">
        <van-row gutter="24">
          <van-col span="6" class="type-field">类型:</van-col>
          <van-col span="18" style="padding: 0">
            <van-radio-group
              v-model="checkedType"
              direction="horizontal"
              @change="handleTypeCheck"
            >
                <van-radio
                  v-for="(type, index) in typeList"
                  :key="index"
                  :shape="type.shape"
                  :name="type.name"
                >
                  {{type.label}}
                </van-radio>
            </van-radio-group>
          </van-col>
        </van-row>
      </div>

      <!-- 记账图标类型 -->
      <div class="icon-check">
        <van-row gutter="24">
          <van-col span="6" class="type-field">{{getCurCheckedType}}类型:</van-col>
          <van-col span="18" style="padding: 0">
            <div 
              class="icon-wrapper" 
              v-for="(icon, index) in iconList"
              :key="index"
              >
              <van-icon
                :name="icon.name"
                :color="icon.color"
              />
              <p class="icon-label">{{icon.label}}</p>
            </div>
          </van-col>
        </van-row>
      </div>

      <!-- 记账内容 -->
      <div class="book-description">
        <van-field
          v-model="bookDescription"
          rows="1"
          autosize
          label-width="90"
          label="备注内容"
          type="textarea"
          placeholder="请输入备注"
          label-class="book-description-label"
          style="padding: 10px 0"
        />
      </div>

      <!-- 记账金额 -->
      <div class="book-amount">
        <van-field
          v-model="bookAmount"
          type="number"
          label-width="90"
          label-class="book-description-label"
          style="padding: 10px 0"
          label="金额" 
        />
      </div>

      <!-- 记账日期 -->
      <div class="book-date">
        <van-cell
          title="日期"
          title-class="book-description-label"
          :value="bookCalendar"
          isLink
          @click="showSelectCalendar = true" 
          style="padding: 10px 10px 10px 0"
        />
        <van-calendar v-model="showSelectCalendar" @confirm="handleSelectDate" />
      </div>

      <!-- btns -->
      <div class="book-btns">
        <button class="primary">保存</button>
      </div>
    </div>
  </van-action-sheet>  
</template>

<script>
import { ActionSheet, RadioGroup, Radio, Row, Col, Icon, Field, Cell } from 'vant';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'AddBookInfo',
  components: {
    [ActionSheet.name]: ActionSheet,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Cell.name]: Cell,
  },
  data() {
    return {
      checkedType: 'payment',
      typeList: [
        {name: 'payment', label: '支出', shape: 'square'},
        {name: 'income', label: '收入', shape: 'square'},
      ],
      iconList: [
        {name: 'phone-o', label: '通讯', color: '#555'},
        {name: 'gift-o', label: '礼物', color: '#555'},
        {name: 'fire-o', label: '通讯', color: '#555'},
        {name: 'cart-o', label: '购物', color: '#555'},
        {name: 'friends-o', label: '亲友', color: '#555'},
        {name: 'home-o', label: '居家', color: '#555'},
        {name: 'setting-o', label: '设置', color: '#555'},
      ],
      bookDescription: '',
      bookAmount: '',
      bookCalendar: '',
      showSelectCalendar: false,
    }
  },
  computed: {
    ...mapGetters([
      'getShowBookRecord',
    ]),
    getshowBookRecord: {
      get() {
        return this.getShowBookRecord
      },
      set(val) {
        this.setShowBookRecord(val);
        // this.$store.commit('setShowBookRecord', val)
      }
    },
    getCurCheckedType() {
      return this.typeList.filter(type => type.name === this.checkedType)[0].label;
    }
  },
  methods: {
    ...mapMutations([
      'setShowBookRecord'
    ]),

    ...mapActions([
      'getBookKeepList',
    ]),

    handleCloseAction(val = false) {
      this.setShowBookRecord(val);
    },

    handleTypeCheck(type) {
      this.checkedType = type;
    },

    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },

    handleSelectDate(date) {
      this.showSelectCalendar = false;
      this.bookCalendar = this.formatDate(date);
    },
  },
  mounted() {
    // console.log('12344sdsff', this.getShowBookRecord)
    // dispatch('getBookKeepList', {
    //   userId: '12336',
    //   date: '2021-03-08'
    // })
    // getBookKeepList()
  }
}
</script>

<style lang="scss" scoped>
.add-action-sheet {
  height: 81vh;
  width: 100vw;
  background: #fafafa;
}

.content {
  .type-check, .icon-check {
    padding: 10px 0;
    text-align: left;
    font-size: 14px;
    background: #fff;
    margin-top: 13px;
    .type-field {
      font-size: 14px;
      padding-left: 5px;
      color: #646566;
    }
  }

  .icon-check {
    .icon-wrapper {
      display: inline-block;
      height: 41px;
      width: 41px;
      margin: 0 12px 25px 0;
      border-radius: 50%;
      background: rgba(#ff9900, 0.6);
      position: relative;
      .van-icon {
        font-size: 18px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .icon-label {
        width: 100%;
        font-size: 13px;
        position: absolute;
        bottom: -22px;
        text-align: center;
      }
      // &::after{
      //   content: '';
      //   display: block;
      //   margin-bottom: ;
      // }
    }
  }

  .book-description, .book-amount, .book-date, .book-btns {
    margin-top: 17px;
  }

  .book-btns {
    button {
      height: 41px;
      width: 240px;
      outline: none;
      border: none;
      border-radius: 7px;
      letter-spacing: 5px;
      &.primary {
        color: #fff;
        background: rgba(#ff9900, 0.6);
      }
    }
  }
}

</style>