<template>
  <div>
    <Echart id="quarterCount" :options="options" />
  </div>
</template>

<script>
import Echart from '@/components/Echart'

export default {
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: '#409EFF',
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: newData.name,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            minInterval: 1,
            axisTick: {
              show: true
            }
          }],
          series: [{
            name: '项目数量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            label: {
              show: true,
              position: 'inside'
            },
            data: newData.data
          }]
        }
      }
    }
  }

}
</script>
