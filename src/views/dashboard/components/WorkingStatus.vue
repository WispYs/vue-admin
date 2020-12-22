<template>
  <div>
    <Echart id="workingStatus" :options="options" />
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
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: newData.name
          },
          color: ['#e6a23c', '#409EFF', '#67c23a', '#f56c6c'],
          series: [
            {
              name: '项目进度',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'inner',
                formatter: '{c}'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: newData.data
            }
          ]
        }
      }
    }
  }

}
</script>
