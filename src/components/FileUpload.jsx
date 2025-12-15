import { useState } from 'react'
import { Upload, message, Card, Button, Table } from 'antd'
import { InboxOutlined, CheckCircleOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'

const { Dragger } = Upload

const FileUpload = ({ onDataUpload }) => {
  const [parsedData, setParsedData] = useState(null)
  const [loading, setLoading] = useState(false)

  const parseExcelFile = (file) => {
    setLoading(true)
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // 数据转换和验证
        const formattedData = jsonData.map((row, index) => ({
          id: row['视频ID'] || row['videoId'] || `video_${index + 1}`,
          date: row['发布日期'] || row['date'] || new Date().toISOString().split('T')[0],
          views: parseInt(row['播放量'] || row['views'] || 0),
          likes: parseInt(row['点赞'] || row['likes'] || 0),
          comments: parseInt(row['评论'] || row['comments'] || 0),
          shares: parseInt(row['转发'] || row['shares'] || 0),
          favorites: parseInt(row['收藏'] || row['favorites'] || 0),
          cartClicks: parseInt(row['挂车点击'] || row['cartClicks'] || 0),
          orders: parseInt(row['成交单数'] || row['orders'] || 0),
        }))

        setParsedData(formattedData)
        message.success(`成功解析 ${formattedData.length} 条数据`)
        setLoading(false)
      } catch (error) {
        message.error('文件解析失败，请检查文件格式')
        setLoading(false)
        console.error(error)
      }
    }

    reader.readAsArrayBuffer(file)
  }

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.xlsx,.xls,.csv',
    beforeUpload: (file) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                      file.type === 'application/vnd.ms-excel' ||
                      file.name.endsWith('.csv')
      
      if (!isExcel) {
        message.error('只能上传 Excel 或 CSV 文件！')
        return false
      }

      parseExcelFile(file)
      return false // 阻止自动上传
    },
  }

  const handleConfirm = () => {
    if (parsedData && parsedData.length > 0) {
      onDataUpload(parsedData)
      message.success('数据已应用到看板')
    }
  }

  const columns = [
    { title: '视频ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: '发布日期', dataIndex: 'date', key: 'date', width: 120 },
    { title: '播放量', dataIndex: 'views', key: 'views', width: 100 },
    { title: '点赞', dataIndex: 'likes', key: 'likes', width: 80 },
    { title: '评论', dataIndex: 'comments', key: 'comments', width: 80 },
    { title: '转发', dataIndex: 'shares', key: 'shares', width: 80 },
    { title: '收藏', dataIndex: 'favorites', key: 'favorites', width: 80 },
    { title: '挂车点击', dataIndex: 'cartClicks', key: 'cartClicks', width: 100 },
    { title: '成交单数', dataIndex: 'orders', key: 'orders', width: 100 },
  ]

  return (
    <div className="space-y-6">
      <Card
        title={
          <span className="text-lg font-semibold">
            📤 数据上传
          </span>
        }
        className="neon-border-pink"
      >
        <Dragger {...uploadProps} className="mb-4">
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-6xl text-douyin-primary" />
          </p>
          <p className="ant-upload-text text-white text-lg">
            点击或拖拽文件到此区域上传
          </p>
          <p className="ant-upload-hint text-gray-400">
            支持 Excel (.xlsx, .xls) 或 CSV 格式文件
          </p>
          <p className="ant-upload-hint text-gray-500 text-xs mt-2">
            必需字段：视频ID、发布日期、播放量、点赞、评论、转发、收藏、挂车点击、成交单数
          </p>
        </Dragger>

        {parsedData && parsedData.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckCircleOutlined className="text-green-500 text-2xl mr-2" />
                <span className="text-white text-lg">
                  成功解析 <span className="text-douyin-primary font-bold">{parsedData.length}</span> 条数据
                </span>
              </div>
              <Button
                type="primary"
                size="large"
                onClick={handleConfirm}
                className="bg-douyin-primary hover:bg-opacity-80"
              >
                应用到看板
              </Button>
            </div>
          </div>
        )}
      </Card>

      {parsedData && parsedData.length > 0 && (
        <Card
          title="数据预览"
          className="neon-border-cyan"
        >
          <Table
            columns={columns}
            dataSource={parsedData}
            rowKey="id"
            scroll={{ x: 1000 }}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      )}
    </div>
  )
}

export default FileUpload
