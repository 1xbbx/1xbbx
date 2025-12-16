import { useState } from 'react'
import { Upload, message, Card, Button, Table } from 'antd'
import { InboxOutlined, CheckCircleOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'

const { Dragger } = Upload

const FileUpload = ({ onDataUpload }) => {
  const [parsedData, setParsedData] = useState(null)
  const [loading, setLoading] = useState(false)

  // 解析日期函数 - 处理Excel日期序列号和各种日期格式
  const parseDate = (dateValue) => {
    if (!dateValue) {
      return new Date().toISOString().split('T')[0]
    }

    // 如果是数字（Excel日期序列号）
    if (typeof dateValue === 'number') {
      // Excel日期从1900年1月1日开始计数（但Excel错误地认为1900是闰年）
      const excelEpoch = new Date(1899, 11, 30) // 1899-12-30
      const date = new Date(excelEpoch.getTime() + dateValue * 86400000)
      return date.toISOString().split('T')[0]
    }

    // 如果是字符串
    if (typeof dateValue === 'string') {
      // 尝试解析各种日期格式
      let date = null
      
      // 格式1: YYYY-MM-DD 或 YYYY/MM/DD
      if (dateValue.match(/^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/)) {
        date = new Date(dateValue.replace(/\//g, '-'))
      }
      // 格式2: MM/DD/YYYY 或 DD/MM/YYYY
      else if (dateValue.match(/^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/)) {
        date = new Date(dateValue)
      }
      // 格式3: YYYY年MM月DD日
      else if (dateValue.match(/^\d{4}年\d{1,2}月\d{1,2}日$/)) {
        const matches = dateValue.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
        if (matches) {
          date = new Date(matches[1], parseInt(matches[2]) - 1, matches[3])
        }
      }
      // 其他格式尝试直接解析
      else {
        date = new Date(dateValue)
      }

      // 验证日期是否有效
      if (date && !isNaN(date.getTime())) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      }
    }

    // 如果是Date对象
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      return dateValue.toISOString().split('T')[0]
    }

    // 默认返回今天
    return new Date().toISOString().split('T')[0]
  }

  const parseExcelFile = (file) => {
    setLoading(true)
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array', cellDates: true })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false })

        // 数据转换和验证
        const formattedData = jsonData.map((row, index) => {
          const dateValue = row['发布日期'] || row['date'] || row['Date'] || row['日期']
          
          return {
            id: row['视频ID'] || row['videoId'] || row['ID'] || `video_${index + 1}`,
            date: parseDate(dateValue),
            views: parseInt(row['播放量'] || row['views'] || 0),
            likes: parseInt(row['点赞'] || row['likes'] || 0),
            comments: parseInt(row['评论'] || row['comments'] || 0),
            shares: parseInt(row['转发'] || row['shares'] || 0),
            favorites: parseInt(row['收藏'] || row['favorites'] || 0),
            cartClicks: parseInt(row['挂车点击'] || row['cartClicks'] || 0),
            orders: parseInt(row['成交单数'] || row['orders'] || 0),
          }
        })

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
