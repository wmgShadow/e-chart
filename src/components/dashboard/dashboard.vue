<template lang="html">
  <div class="dashboard">
    <div class="flex-container column" >
        <div class="item one" @click="clickChart('1')" style="transform: translate(-14.5%,-37.5%) scale(0.23)">
          <multipleColumn></multipleColumn>
        </div>
        <div class="item two" @click="clickChart('2')" style="transform: translate(-14.5%,-12%) scale(0.23)">
          <column></column>
        </div>
        <div class="item three" @click="clickChart('3')" style="transform: translate(-14.5%,13.5%) scale(0.23)">
          <v-line></v-line>
        </div>
        <div class="item four active" @click="clickChart('4')" style="transform: translate(43.7%, 0) scale(1)">
          <point></point>
        </div>
         <div class="item five " @click="clickChart('5')" style="transform: translate(-14.5%,39%) scale(0.23)">
           <funnel></funnel>
        </div>
        <div class="item six " @click="clickChart('6')" style="transform: translate(-38%,-37.5%) scale(0.23)">
           <radar></radar>
        </div>
         <div class="item seven " @click="clickChart('7')" style="transform: translate(-38%,-12%) scale(0.23)">
          <cir></cir>
        </div>
         <div class="item eight " @click="clickChart('8')" style="transform: translate(-38%,13.5%) scale(0.23)">
          <dott></dott>
        </div>
         <div class="item nine " @click="clickChart('9')" style="transform: translate(-38%,39%) scale(0.23)">
           <kk></kk>
        </div>
        
    </div>
  </div>
</template>

<script>
import column from 'components/column/column'
import line from 'components/line/line'
import multipleColumn from 'components/multipleColumn/multipleColumn'
import point from 'components/point/point'
import heat from 'components/heat/heat'
import funnel from 'components/funnel/funnel'
import cir from 'components/cir/cir'
import dott from 'components/dott/dott'
import kk from 'components/kk/kk'
import radar from 'components/radar/radar'
export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this._init()
  },
  methods: {
    _resize() {
      this.$root.charts.forEach((myChart) => {
        myChart.resize()
      })
    },
    _init() {
      this.items = document.querySelectorAll('.flex-container .item')
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].dataset.order = i + 1;
      }
    },
    clickChart(clickIndex) {
      let activeItem = document.querySelector('.flex-container .active')
      let activeIndex = activeItem.dataset.order
      let clickItem = this.items[clickIndex - 1]
      if (activeIndex === clickIndex) {
        return
      }
      activeItem.classList.remove('active')
      clickItem.classList.add('active')
      this._setStyle(clickItem, activeItem)
    },
    _setStyle(el1, el2) {
      let transform1 = el1.style.transform
      let transform2 = el2.style.transform
      el1.style.transform = transform2
      el2.style.transform = transform1
    }
  },
  components: {
    column,
    multipleColumn,
    point,
    'v-line': line,
    funnel,
    cir,
    dott,
    kk,
    radar,
    heat
  }
}

</script>

<style lang="stylus" scoped>
*
  box-sizing: border-box;
 .point,.multipleColumn,.columnChart,.line
  height 100%!important
  width 100%!important
  background none!important
.item
    padding: 0px;
    margin: 0px;
    width: 68%;
    height: 100%;
    position absolute
    transform scale(0.33)
    text-align: center;
    transition:all 0.8s;
    background rgba(32, 32, 35, 0.5)
.dashboard
    position relative
    width 100%
    height 100%
    margin:0px;
    padding:0px;
    padding-top 5%
    background url('../../assets/bg.jpg');
    background-size 100% 100%;
.flex-container.column
    position relative
    height: 90%;
    width: 90%;
    overflow:hidden;
    margin:  0 auto 100px auto;
    box-sizing: content-box;
.active
    height 100%
    width: 69%;
    margin-left: 30px;
    line-height: 300px;
</style>
