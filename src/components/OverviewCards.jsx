import { Row, Col, Card, Statistic } from 'antd'
import {
  EyeOutlined,
  LikeOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
} from '@ant-design/icons'

const OverviewCards = ({ data }) => {
  // 计算总数
  const totalViews = data.reduce((sum, item) => sum + item.views, 0)
  const totalLikes = data.reduce((sum, item) => sum + item.likes, 0)
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0)
  const totalCartClicks = data.reduce((sum, item) => sum + item.cartClicks, 0)

  // 计算转化率
  const conversionRate = totalCartClicks > 0 
    ? ((totalOrders / totalCartClicks) * 100).toFixed(2) 
    : 0

  const cardData = [
    {
      title: '总播放量',
      value: totalViews,
      icon: <EyeOutlined className="text-4xl text-douyin-primary" />,
      color: 'pink',
      suffix: '',
    },
    {
      title: '总点赞数',
      value: totalLikes,
      icon: <LikeOutlined className="text-4xl text-douyin-secondary" />,
      color: 'cyan',
      suffix: '',
    },
    {
      title: '总成交单数',
      value: totalOrders,
      icon: <ShoppingCartOutlined className="text-4xl text-green-500" />,
      color: 'green',
      suffix: '',
    },
    {
      title: '转化率',
      value: conversionRate,
      icon: <RiseOutlined className="text-4xl text-yellow-500" />,
      color: 'yellow',
      suffix: '%',
    },
  ]

  const formatNumber = (num) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w'
    }
    return num.toLocaleString()
  }

  return (
    <Row gutter={[16, 16]}>
      {cardData.map((item, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card
            className={`neon-border-${item.color} hover:scale-105 transition-transform duration-300`}
            style={{
              background: 'linear-gradient(135deg, #161823 0%, #1F1F1F 100%)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">{item.title}</p>
                <Statistic
                  value={item.suffix === '%' ? item.value : formatNumber(item.value)}
                  suffix={item.suffix}
                  valueStyle={{
                    color: '#FFFFFF',
                    fontSize: '28px',
                    fontWeight: 'bold',
                  }}
                />
              </div>
              <div>{item.icon}</div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default OverviewCards
