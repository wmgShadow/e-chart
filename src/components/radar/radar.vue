<!-- 柱状图 -->
<style lang="stylus" scoped>
.radar
  height 800px
  color white
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>

<template>
<div class="radar">
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
    this.myChart = echarts.init(document.querySelector('.radar .main'));
    this.myChart.setOption({
      title: {
        text: '罗纳尔多 vs 舍普琴科',
        subtext: '完全实况球员数据'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        x: 'center',
        y: '120',
        data: ['罗纳尔多', '舍普琴科']
      },
      toolbox: {
        show: true,
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: true,
      polar: [
        {
          indicator: [
                {text: '进攻', max: 100},
                {text: '防守', max: 100},
                {text: '体能', max: 100},
                {text: '速度', max: 100},
                {text: '力量', max: 100},
                {text: '技巧', max: 100}
          ],
          radius: 110
        }
      ],
      series: [
        {
          name: '完全实况球员数据',
          type: 'radar',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: [
            {
              value: [97, 42, 88, 94, 90, 86],
              name: '舍普琴科'
            },
            {
              value: [97, 32, 74, 95, 88, 92],
              name: '罗纳尔多'
            }
          ]
        }
      ]
    }
   )
    this._init()
  }
}

</script>
