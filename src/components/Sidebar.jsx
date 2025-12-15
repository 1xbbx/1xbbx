import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  UploadOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '数据看板',
    },
    {
      key: 'upload',
      icon: <UploadOutlined />,
      label: '数据上传',
    },
  ]

  return (
    <Sider
      width={240}
      className="min-h-screen"
      style={{
        background: '#161823',
        borderRight: '1px solid #2F2F2F',
      }}
    >
      <div className="p-6 flex items-center justify-center border-b border-gray-800">
        <VideoCameraOutlined className="text-4xl mr-3 neon-text-pink" />
        <div>
          <h1 className="text-xl font-bold text-white m-0">抖音数据</h1>
          <p className="text-xs text-gray-400 m-0">Analytics Dashboard</p>
        </div>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[activeView]}
        items={menuItems}
        onClick={({ key }) => setActiveView(key)}
        className="border-0 mt-4"
        style={{
          background: 'transparent',
        }}
      />
    </Sider>
  )
}

export default Sidebar
