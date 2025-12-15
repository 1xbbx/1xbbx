import { Card } from 'antd'
import ReactECharts from 'echarts-for-react'

const TrendChart = ({ data }) => {
  // 按日期排序
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '播放量与成交趋势',
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
        crossStyle: {
          color: '#999',
        },
      },
      backgroundColor: 'rgba(22, 24, 35, 0.95)',
      borderColor: '#FE2C55',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
      },
    },
    legend: {
      data: ['播放量', '成交单数'],
      top: 40,
      textStyle: {
        color: '#A8A8A8',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 100,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: sortedData.map(item => item.date),
        axisPointer: {
          type: 'shadow',
        },
        axisLine: {
          lineStyle: {
            color: '#2F2F2F',
          },
        },
        axisLabel: {
          color: '#A8A8A8',
          rotate: 45,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '播放量',
        nameTextStyle: {
          color: '#FE2C55',
        },
        axisLine: {
          lineStyle: {
            color: '#2F2F2F',
          },
        },
        axisLabel: {
          color: '#A8A8A8',
          formatter: (value) => {
            if (value >= 10000) {
              return (value / 10000).toFixed(0) + 'w'
            }
            return value
          },
        },
        splitLine: {
          lineStyle: {
            color: '#2F2F2F',
            type: 'dashed',
          },
        },
      },
      {
        type: 'value',
        name: '成交单数',
        nameTextStyle: {
          color: '#25F4EE',
        },
        axisLine: {
          lineStyle: {
            color: '#2F2F2F',
          },
        },
        axisLabel: {
          color: '#A8A8A8',
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '播放量',
        type: 'line',
        data: sortedData.map(item => item.views),
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#FE2C55',
          shadowColor: 'rgba(254, 44, 85, 0.5)',
          shadowBlur: 10,
        },
        itemStyle: {
          color: '#FE2C55',
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
                color: 'rgba(254, 44, 85, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(254, 44, 85, 0.05)',
              },
            ],
          },
        },
      },
      {
        name: '成交单数',
        type: 'line',
        yAxisIndex: 1,
        data: sortedData.map(item => item.orders),
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#25F4EE',
          shadowColor: 'rgba(37, 244, 238, 0.5)',
          shadowBlur: 10,
        },
        itemStyle: {
          color: '#25F4EE',
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
                color: 'rgba(37, 244, 238, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(37, 244, 238, 0.05)',
              },
            ],
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

export default TrendChart
