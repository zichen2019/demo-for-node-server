<template>
  <div
    class="block-item-wrapper"
    :style="{'text-align': template.textAlign}"
    v-if="template"
  >
    <!-- 类型渲染 -->
    <div 
      v-if="template.type"
      class="type-icon"
      @click="selectCalendar"
    />

    <!-- subField渲染 -->
    <div class="sub-field" v-if="template.subField" >
      <span
        v-for="(f, index) in subFieldInfo"
        :key="index"
      >
        {{f}}
      </span>
    </div>

    <!-- Field渲染 -->
    <div v-if="template.field" >
     <span
        v-for="(f, index) in fieldInfo"
        :key="index"
      >
        {{f}}
      </span>
    </div>

    <!-- 插槽，用于渲染外部传入的右边区域的其他内容 -->
    <slot name="right"></slot>

    <!-- 组件内调用的其他功能组件 -->
    <van-calendar
      color="#fad958"
      :min-date="minDate"
      v-model="show"
      @confirm="handleSelectCanlendar"
    />
  </div>
</template>

<script>
import { isFunction, isEmpty } from 'lodash';
export default {
  name: 'FormItemRender',
  props: ['template', 'propsData'],
  components: {
    // [Calendar.name]: Calendar
  },
  data() {
    return {
      templateElement: null,
      show: false,
      minDate: new Date(1600-0-1)
    }
  },
  computed: {
    subFieldInfo() {
      let { 
        name,
        dataIndex,
        dataDirect,
        fieldRender,
        isFormat = false,
        precision = 2,
        isallowTh = false,
      } = this.template.subField;
      let subField = name ? [name] : []; // name
      
      if (isEmpty(this.propsData)) return subField;

      let subData = this.propsData[dataIndex]; // data 要展示的数据
      subData = isFormat
        ? [this.numberRender(subData, precision, isallowTh)]
        : [subData];

      subField = dataDirect === 'left'
        ? subData.concat(subField)
        : subField.concat(subData)

      if (fieldRender && isFunction(fieldRender)) {
        subField = fieldRender(this.propsData[dataIndex], name);
        subField = Array.isArray(subField) ? subField : [subField];
      }


      return subField;
    },
    fieldInfo() {
      let { 
        name,
        dataIndex,
        dataDirect,
        fieldRender,
        isFormat = false,
        precision = 2,
        isallowTh = false,
      } = this.template.field;
      let Field = name ? [name] : [];

      if (isEmpty(this.propsData)) return Field;

      let data = this.propsData[dataIndex]; // data 要展示的数据
      data = isFormat
        ? [this.numberRender(data, precision, isallowTh)]
        : [data];

      Field = dataDirect === 'left'
        ? data.concat(Field)
        : Field.concat(data)

      if (fieldRender && isFunction(fieldRender)) {
        Field = fieldRender(this.propsData[dataIndex], name);
        Field = Array.isArray(Field) ? Field : [Field];
      }
      return Field;
    }
  },
  mounted() {
  },
  methods: {
    numberRender(value) {
      if (!+value) return value;
      var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var allowThousandth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var allowEndZero = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (
        // 空检查
        value === null ||
        value === undefined ||
        value === '' || // 非法数值的检查
        +value === Infinity ||
        +value === -Infinity ||
        isNaN(+value)
      ) {
        return '';
      } // 将 value 转为字符串并移除千分位

      var ret;
      var valueString = String(value).replace(/,/g, '');
      if (
        valueString.length > 0 &&
        Object.prototype.toString.call(valueString.split('.')) === '[object Array]'
      ) {
        if (valueString.split('.')[1] && valueString.split('.')[1].length > 2) {
          ret = Number(valueString).toFixed(valueString.split('.')[1].length);
        } else {
          ret = Number(valueString).toFixed(precision);
        }
      }

      if (allowThousandth && typeof ret === 'string' && ret.length > 0) {
        var retList = ret.split('.');
        var commaValue = retList[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 整数部分千分位替换

        if (retList.length > 1) {
          ret = [commaValue, retList[1]].join('.');
        } else {
          ret = commaValue;
        }
      }

      if (!allowEndZero && ret.indexOf('.')) {
        return ret.replace(/(0|\.0)*$/, '');
      }

      return ret;
    },
    selectCalendar() {
      this.show = true
    },
    handleSelectCanlendar(date) {
      // console.log('date=', date) // Wed Mar 10 2021 00:00:00 GMT+0800 (中国标准时间）
    }
  }
}
</script>

<style lang="scss" scoped>
.block-item-wrapper {
  position: relative;
  .sub-field {
    font-size: 13px;
    color: #666;
    padding: 5px 0;
  }
}

.type-icon {
  position: absolute;
  right: 1%;
  bottom: 0;
  height: 60%;
  width: 100%;
  &::after {
    content: '';
    position: absolute;
    right: 10%;
    bottom: 25%;
    height: 0px;
    width: 0px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    border-width: 9px 5px 0px;
    
  }
}
</style>