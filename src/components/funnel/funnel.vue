<!-- 折线图 -->
<style lang="stylus" scoped>
.funnel
  height 1000px
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
</style>


<template>
<div class="funnel">
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
      styleArr: [],
      myChart: {},
      name: '复杂柱状图'
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
    this.myChart = echarts.init(document.querySelector('.funnel .main'))
    this.myChart.setOption({
      title: {
        text: '漏斗图',
        subtext: '纯属虚构'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
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
      legend: {
        data: ['展现', '点击', '访问', '咨询', '订单'],
        y: '100',
        x: '350'
      },
      calculable: true,
      series: [
        {
          name: '漏斗图',
          type: 'funnel',
          x: '25%',
          y: '15%',
          y2: 120,
          width: '50%',
          height: '50%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '60%',
          sort: 'descending',
          gap: 8,
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                show: false,
                length: 8,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              }
            },
            emphasis: {
              borderColor: 'red',
              borderWidth: 4,
              label: {
                show: true,
                formatter: '{b}:{c}%',
                textStyle: {
                  fontSize: 20
                }
              },
              labelLine: {
                show: true
              }
            }
          },
          data: [
            {value: 60, name: '访问'},
            {value: 40, name: '咨询'},
            {value: 20, name: '订单'},
                {value: 80, name: '点击'},
                {value: 100, name: '展现'}
          ]
        }
      ]
    });
    this._init()
  }
}

</script>
