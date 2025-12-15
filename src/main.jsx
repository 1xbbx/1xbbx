import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#FE2C55',
          colorBgBase: '#000000',
          colorBgContainer: '#161823',
          colorBorder: '#2F2F2F',
          colorText: '#FFFFFF',
          colorTextSecondary: '#A8A8A8',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
