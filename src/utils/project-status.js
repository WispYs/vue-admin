export default {
  ProjectStatus: [
    {
      name: '未开始',
      value: 0
    }, {
      name: '进行中',
      value: 1
    }, {
      name: '已完成',
      value: 2
    }, {
      name: '已搁置',
      value: 3
    }
  ],
  DesignStatus: [
    {
      name: '图纸设计',
      fields: 'drawingDesign'
    }, {
      name: '柜体订货',
      fields: 'cabinetOrder'
    }, {
      name: '主材订货',
      fields: 'materialMain'
    }, {
      name: '辅材订货',
      fields: 'informationSubmit'
    }, {
      name: '资料提交',
      fields: 'materialAuxiliary'
    }
  ],
  ProduceStatus: [
    {
      name: '领料排版',
      fields: 'pickingLayout'
    }, {
      name: '接线成套',
      fields: 'wiringSet'
    }, {
      name: '上电测试',
      fields: 'powerTest'
    }, {
      name: '打包待发',
      fields: 'packDelever'
    }
  ]
}
