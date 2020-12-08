<template>
  <el-calendar id="calendar" v-model="date">
    <template
      slot="dateCell"
      slot-scope="{date, data}"
    >
      <!--自定义内容-->
      <div :class="brightDate.indexOf(data.day)!=-1 ? 'highlight' : ''">
        <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
        <div v-for="(item, index) in calendarData" :key="index">
          <div v-if="(item.date.split('-')[0]).indexOf(data.day.split('-')[0])!=-1">
            <div v-if="(item.date.split('-')[1]).indexOf(data.day.split('-')[1])!=-1">
              <div v-if="(item.date.split('-')[2]).indexOf(data.day.split('-')[2])!=-1">
                <el-tooltip class="item" effect="dark" :content="item.title" placement="right">
                  <div class="is-selected">{{ item.title }}</div>
                </el-tooltip>
              </div>
              <div v-else />
            </div>
            <div v-else />
          </div>
          <div v-else />
        </div>
      </div>
    </template>
  </el-calendar>
</template>

<script>
import mockDate from '@/mock/mock-data'

export default {
  data() {
    return {
      calendarData: mockDate.calendarData,
      date: new Date()
    }
  },
  computed: {
    // 时间高亮的数组
    brightDate() {
      const ary = []
      for (const i in this.calendarData) {
        ary.push(this.calendarData[i].date)
      }
      return ary
    }
  },

  methods: {
    // 日历 Tooltip 文字提示
    content(date) {
      let content = ''
      for (const i in this.calendarData) {
        if (date === this.calendarData[i].startDate) {
          content = this.calendarData[i].judgeName + ` ` + this.calendarData[i].tribunalName
        }
      }
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
.highlight {
  // background: lightgoldenrodyellow;
  .calendar-day {
    color: #409EFF;
    font-weight: bold;
    font-size: 16px;
  }
}
.calendar-day{
  text-align: center;
  color: #202535;
  line-height: 26px;
  font-size: 12px;
}
.is-selected{
  color: #666;
  font-size: 10px;
  line-height: 16px;
  margin-top: 1px;
}

</style>
