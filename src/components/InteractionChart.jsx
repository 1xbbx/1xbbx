import { Card } from 'antd'
import ReactECharts from 'echarts-for-react'

const InteractionChart = ({ data }) => {
  // 获取前5名热门视频（按点赞数排序）
  const topVideos = [...data]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: 'Top 5 热门视频互动分析',
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
        type: 'shadow',
      },
      backgroundColor: 'rgba(22, 24, 35, 0.95)',
      borderColor: '#25F4EE',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
      },
    },
    legend: {
      data: ['点赞', '评论', '转发', '收藏'],
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
    xAxis: {
      type: 'category',
      data: topVideos.map(item => item.id),
      axisLine: {
        lineStyle: {
          color: '#2F2F2F',
        },
      },
      axisLabel: {
        color: '#A8A8A8',
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
    series: [
      {
        name: '点赞',
        type: 'bar',
        data: topVideos.map(item => item.likes),
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
                color: '#FE2C55',
              },
              {
                offset: 1,
                color: '#FE2C55',
              },
            ],
          },
          shadowColor: 'rgba(254, 44, 85, 0.5)',
          shadowBlur: 10,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(254, 44, 85, 0.8)',
          },
        },
      },
      {
        name: '评论',
        type: 'bar',
        data: topVideos.map(item => item.comments),
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
                color: '#25F4EE',
              },
              {
                offset: 1,
                color: '#25F4EE',
              },
            ],
          },
          shadowColor: 'rgba(37, 244, 238, 0.5)',
          shadowBlur: 10,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(37, 244, 238, 0.8)',
          },
        },
      },
      {
        name: '转发',
        type: 'bar',
        data: topVideos.map(item => item.shares),
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
                color: '#FFD700',
              },
            ],
          },
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
        name: '收藏',
        type: 'bar',
        data: topVideos.map(item => item.favorites),
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
                color: '#9D50BB',
              },
              {
                offset: 1,
                color: '#9D50BB',
              },
            ],
          },
          shadowColor: 'rgba(157, 80, 187, 0.5)',
          shadowBlur: 10,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(157, 80, 187, 0.8)',
          },
        },
      },
    ],
  }

  return (
    <Card className="neon-border-cyan">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </Card>
  )
}

export default InteractionChart
