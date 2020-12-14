export default {
  // 项目列表
  projectList: {
    'code': 20000,
    'total': 40,
    'list': [
      {
        'id': 202013,
        'title': '上海XXX工业有限公司',
        'dateTime1': '2020-11-12',
        'dateTime2': '2020-11-15',
        'dateTime3': '2020-11-17',
        'dateTime4': '2020-11-23',
        'dStatus': 0,
        'dStatusArr': [
          {
            'name': '图纸设计',
            'status': 1
          }, {
            'name': '柜体订货',
            'status': 0
          }, {
            'name': '主材订货',
            'status': 1
          }, {
            'name': '辅材订货',
            'status': 0
          }, {
            'name': '资料提交',
            'status': 1
          }
        ],
        'pStatus': 0,
        'pStatusArr': [
          {
            'name': '领料排版',
            'status': 1
          }, {
            'name': '接线成套',
            'status': 1
          }, {
            'name': '上线测试',
            'status': 0
          }, {
            'name': '打包发布',
            'status': 0
          }
        ],
        'issue': '项目实际发货时间拖得太长了',
        'stakeholder': '张三',
        'remark': '以后由张三及时跟进项目进度'

      },
      {
        'id': 202014,
        'title': '苏州XX机械公司',
        'dateTime1': '2020-10-26',
        'dateTime2': '2020-10-28',
        'dateTime3': '2020-11-01',
        'dateTime4': '2020-11-03',
        'dStatus': 1,
        'dStatusArr': [
          {
            'name': '图纸设计',
            'status': 1
          }, {
            'name': '柜体订货',
            'status': 1
          }, {
            'name': '主材订货',
            'status': 1
          }, {
            'name': '辅材订货',
            'status': 1
          }, {
            'name': '资料提交',
            'status': 1
          }
        ],
        'pStatus': 0,
        'pStatusArr': [
          {
            'name': '领料排版',
            'status': 1
          }, {
            'name': '接线成套',
            'status': 0
          }, {
            'name': '上线测试',
            'status': 0
          }, {
            'name': '打包发布',
            'status': 0
          }
        ],
        'issue': '项目途中出现不可抗因素拖延',
        'stakeholder': '李四',
        'remark': '请及时上报'

      },
      {
        'id': 202015,
        'title': '杭州XX工业公司',
        'dateTime1': '2020-10-12',
        'dateTime2': '2020-10-12',
        'dateTime3': '2020-10-16',
        'dateTime4': '2020-10-18',
        'dStatus': 1,
        'dStatusArr': [
          {
            'name': '图纸设计',
            'status': 1
          }, {
            'name': '柜体订货',
            'status': 1
          }, {
            'name': '主材订货',
            'status': 1
          }, {
            'name': '辅材订货',
            'status': 1
          }, {
            'name': '资料提交',
            'status': 1
          }
        ],
        'pStatus': 0,
        'pStatusArr': [
          {
            'name': '领料排版',
            'status': 1
          }, {
            'name': '接线成套',
            'status': 1
          }, {
            'name': '上线测试',
            'status': 1
          }, {
            'name': '打包发布',
            'status': 1
          }
        ],
        'issue': '项目进展顺利',
        'stakeholder': '李四',
        'remark': ''
      }

    ]
  },

  // 通知信息
  newsLists: {
    'code': 20000,
    'item': [
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' },
      { 'title': '上海昨日新增两例本地感染人员，全公司所有去过中风险地区的职工请及时报备', 'date': '2020-11-23' }
    ]
  },

  // 日历备注信息
  calendarData: [
    { 'date': '2020-10-14', 'title': '上海XXXX机械公司项目预计完成' },
    { 'date': '2020-10-16', 'title': '上海XXXX机械公司项目实际交付' },
    { 'date': '2020-11-01', 'title': '上海XX电气公司项目启动' },
    { 'date': '2020-11-12', 'title': '上海XX电气公司项目计划发货' },
    { 'date': '2020-11-18', 'title': '上海XX电气公司项目材料到货' },
    { 'date': '2020-11-22', 'title': '上海XX电气公司项目材料资料提交' },
    { 'date': '2020-11-26', 'title': '上海XX电气公司项目材料预计完成' }
  ],

  // 项目进度
  projectProgress: [
    { 'title': '上海XX电气公司项目', 'progress': 45 },
    { 'title': '上海XXXXXX机械有限公司项目', 'progress': 100 },
    { 'title': '苏州XXXXX电动公司项目', 'progress': 75 },
    { 'title': '杭州XXXX院公司项目', 'progress': 50 },
    { 'title': '南京XXXX有限公司项目', 'progress': 25 }
  ],

  progressList: [
    {
      proNo: 'L20356',
      proName: '2020*****30期（F04A159）',
      worktime1: 96,
      worktime2: 72,
      worktime3: 75,
      progress: 1,
      status: 1
    }, {
      proNo: 'L20436',
      proName: '****-山东齐智',
      worktime1: 42,
      worktime2: 40,
      worktime3: 50,
      progress: 0.80,
      status: 2
    }, {
      proNo: 'L20498',
      proName: '八耳3000种猪场配怀舍电控箱',
      worktime1: 120,
      worktime2: 100,
      worktime3: 75,
      progress: 0.75,
      status: 1
    }
  ]
}
