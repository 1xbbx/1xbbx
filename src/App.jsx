import { useState } from 'react'
import { Layout } from 'antd'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import FileUpload from './components/FileUpload'
import { mockData } from './utils/mockData'

const { Content } = Layout

function App() {
  const [data, setData] = useState(mockData)
  const [activeView, setActiveView] = useState('dashboard')

  const handleDataUpload = (uploadedData) => {
    setData(uploadedData)
    setActiveView('dashboard')
  }

  return (
    <Layout className="min-h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <Layout>
        <Content className="p-6 overflow-auto">
          {activeView === 'dashboard' && <Dashboard data={data} />}
          {activeView === 'upload' && <FileUpload onDataUpload={handleDataUpload} />}
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
