<!-- 柱状图 -->
<style lang="stylus" scoped>
.kk
  height 800px
  color white
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>

<template>
<div class="kk">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
  <div class="main"></div>
</div>

</template>

<script>
import echarts from 'echarts'
import header from 'components/header/header'
import filter from 'components/filter/filter'

export default {
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '柱状图'
    }
  },
  methods: {
    _init() {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true;
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  },
  components: {
    'v-header': header,
    'v-filter': filter
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.kk .main'));
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        data: ['直达', '其它外链', '搜索引擎', '直接输入网址或书签', 'cnblogs.com', '微博', '微信', '百度', '谷歌', '360', '必应', '其他']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
                {value: 335, name: '直达', selected: true},
                {value: 679, name: '其它外链'},
                {value: 1548, name: '搜索引擎'}
          ]
        },
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '55%'],
          data: [
                {value: 335, name: '直接输入网址或书签'},
                {value: 310, name: 'cnblogs.com'},
                {value: 234, name: '微博'},
                {value: 135, name: '微信'},
                {value: 1048, name: '百度'},
                {value: 251, name: '谷歌'},
                {value: 147, name: '360'},
                {value: 42, name: '必应'},
                {value: 60, name: '其他'}
          ]
        }
      ]
    }
    this.myChart.setOption(option);
    this._init()
  }
}

</script>
