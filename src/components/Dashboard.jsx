import { Row, Col } from 'antd'
import OverviewCards from './OverviewCards'
import TrendChart from './TrendChart'
import InteractionChart from './InteractionChart'
import ConversionChart from './ConversionChart'

const Dashboard = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white neon-text-pink mb-2">
          📊 数据分析看板
        </h1>
        <p className="text-gray-400">
          抖音电商短视频数据实时监控与分析
        </p>
      </div>

      {/* 概览卡片 */}
      <OverviewCards data={data} />

      {/* 趋势图 */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <TrendChart data={data} />
        </Col>
      </Row>

      {/* 互动分析和转化分析 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <InteractionChart data={data} />
        </Col>
        <Col xs={24} lg={12}>
          <ConversionChart data={data} />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
