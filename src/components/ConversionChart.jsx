import { Card } from 'antd'
import ReactECharts from 'echarts-for-react'

const ConversionChart = ({ data }) => {
  // 按日期排序
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  // 格式化日期显示（将 2024-01-01 格式化为 01/01）
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}/${day}`
  }

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '挂车点击与成交转化分析',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
      },
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      backgroundColor: 'rgba(22, 24, 35, 0.95)',
      borderColor: '#FE2C55',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
      },
      formatter: (params) => {
        const dataIndex = params[0].dataIndex
        const originalDate = sortedData[dataIndex].date
        let result = `<div style="padding: 5px;">
          <div style="margin-bottom: 5px; font-weight: bold; color: #FFFFFF;">${originalDate}</div>`
        
        params.forEach(param => {
          result += `<div style="margin-top: 5px;">
            ${param.marker} ${param.seriesName}: <span style="font-weight: bold;">${param.value.toLocaleString()}</span>
          </div>`
        })
        
        // 计算转化率
        if (params.length >= 2) {
          const cartClicks = params[0].value
          const orders = params[1].value
          const rate = cartClicks > 0 ? ((orders / cartClicks) * 100).toFixed(2) : 0
          result += `<div style="margin-top: 8px; padding-top: 5px; border-top: 1px solid #2F2F2F; color: #25F4EE;">
            转化率: ${rate}%
          </div>`
        }
        
        result += '</div>'
        return result
      },
    },
    legend: {
      data: ['挂车点击', '成交单数'],
      top: 40,
      textStyle: {
        color: '#A8A8A8',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: 100,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: sortedData.map(item => formatDate(item.date)),
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#2F2F2F',
        },
      },
      axisLabel: {
        color: '#A8A8A8',
        rotate: 45,
        fontSize: 11,
        interval: 0, // 显示所有标签
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#2F2F2F',
        },
      },
      axisLabel: {
        color: '#A8A8A8',
      },
      splitLine: {
        lineStyle: {
          color: '#2F2F2F',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: '挂车点击',
        type: 'bar',
        data: sortedData.map(item => item.cartClicks),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#FFD700',
              },
              {
                offset: 1,
                color: 'rgba(255, 215, 0, 0.3)',
              },
            ],
          },
          borderRadius: [5, 5, 0, 0],
          shadowColor: 'rgba(255, 215, 0, 0.5)',
          shadowBlur: 10,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(255, 215, 0, 0.8)',
          },
        },
      },
      {
        name: '成交单数',
        type: 'line',
        data: sortedData.map(item => item.orders),
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#52C41A',
          shadowColor: 'rgba(82, 196, 26, 0.5)',
          shadowBlur: 10,
        },
        itemStyle: {
          color: '#52C41A',
          borderWidth: 3,
          borderColor: '#52C41A',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(82, 196, 26, 0.4)',
              },
              {
                offset: 1,
                color: 'rgba(82, 196, 26, 0.05)',
              },
            ],
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(82, 196, 26, 0.8)',
          },
        },
      },
    ],
  }

  return (
    <Card className="neon-border-pink">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </Card>
  )
}

export default ConversionChart
