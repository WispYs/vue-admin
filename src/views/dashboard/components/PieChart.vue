<template>
  <div>
    <Echart id="pieChart" :options="options" />
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
            data: ['进行中', '已延期', '已中断', '已完成']
          },
          color: ['#e6a23c', '#409EFF', '#f56c6c', '#67c23a'],
          series: [
            {
              name: '项目进度',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
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
