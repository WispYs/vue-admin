<template>
  <div>
    <Echart id="barChart" :options="options" />
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
        console.log(newData)
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
            data: ['第一季度', '第二季度', '第三季度', '第四季度'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '项目数量',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: newData.data
          }]
        }
      }
    }
  }

}
</script>
