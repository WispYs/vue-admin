<template>
  <div>
    <Echart id="workHoursCheck" :options="options" />
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
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['成本工时', '预算工时', '实际工时']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: newData.proName
          },
          series: [
            {
              name: '成本工时',
              type: 'bar',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: newData.costDay
            },
            {
              name: '预算工时',
              type: 'bar',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: newData.setPlan
            },
            {
              name: '实际工时',
              type: 'bar',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: newData.setWork
            }
          ]
        }
      }
    }
  }

}
</script>
