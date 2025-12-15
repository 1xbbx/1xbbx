// 数据处理工具函数

/**
 * 格式化数字显示
 * @param {number} num - 数字
 * @returns {string} 格式化后的字符串
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0'
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

/**
 * 计算转化率
 * @param {number} conversions - 转化数
 * @param {number} clicks - 点击数
 * @returns {string} 转化率百分比
 */
export const calculateConversionRate = (conversions, clicks) => {
  if (!clicks || clicks === 0) return '0.00'
  return ((conversions / clicks) * 100).toFixed(2)
}

/**
 * 计算互动率
 * @param {object} video - 视频数据
 * @returns {string} 互动率百分比
 */
export const calculateEngagementRate = (video) => {
  if (!video.views || video.views === 0) return '0.00'
  const totalEngagement = 
    (video.likes || 0) + 
    (video.comments || 0) + 
    (video.shares || 0) + 
    (video.favorites || 0)
  return ((totalEngagement / video.views) * 100).toFixed(2)
}

/**
 * 按指定字段排序数据
 * @param {array} data - 数据数组
 * @param {string} field - 排序字段
 * @param {string} order - 排序方向 'asc' | 'desc'
 * @returns {array} 排序后的数据
 */
export const sortData = (data, field, order = 'desc') => {
  return [...data].sort((a, b) => {
    if (order === 'asc') {
      return a[field] - b[field]
    }
    return b[field] - a[field]
  })
}

/**
 * 按日期排序数据
 * @param {array} data - 数据数组
 * @param {string} order - 排序方向 'asc' | 'desc'
 * @returns {array} 排序后的数据
 */
export const sortByDate = (data, order = 'asc') => {
  return [...data].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    if (order === 'asc') {
      return dateA - dateB
    }
    return dateB - dateA
  })
}

/**
 * 获取Top N数据
 * @param {array} data - 数据数组
 * @param {string} field - 排序字段
 * @param {number} n - 数量
 * @returns {array} Top N数据
 */
export const getTopN = (data, field, n = 5) => {
  return sortData(data, field, 'desc').slice(0, n)
}

/**
 * 计算数据总和
 * @param {array} data - 数据数组
 * @param {string} field - 字段名
 * @returns {number} 总和
 */
export const sumField = (data, field) => {
  return data.reduce((sum, item) => sum + (item[field] || 0), 0)
}

/**
 * 计算数据平均值
 * @param {array} data - 数据数组
 * @param {string} field - 字段名
 * @returns {number} 平均值
 */
export const avgField = (data, field) => {
  if (data.length === 0) return 0
  return sumField(data, field) / data.length
}

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @param {string} format - 格式 'YYYY-MM-DD' | 'MM/DD' | 'MM-DD'
 * @returns {string} 格式化后的日期
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  switch (format) {
    case 'MM/DD':
      return `${month}/${day}`
    case 'MM-DD':
      return `${month}-${day}`
    case 'YYYY-MM-DD':
    default:
      return `${year}-${month}-${day}`
  }
}

/**
 * 验证数据完整性
 * @param {object} row - 数据行
 * @returns {object} 验证结果 { valid: boolean, errors: array }
 */
export const validateDataRow = (row) => {
  const errors = []
  const requiredFields = [
    'id', 'date', 'views', 'likes', 'comments', 
    'shares', 'favorites', 'cartClicks', 'orders'
  ]
  
  requiredFields.forEach(field => {
    if (row[field] === undefined || row[field] === null) {
      errors.push(`缺少必需字段: ${field}`)
    }
  })
  
  // 验证数字字段
  const numericFields = [
    'views', 'likes', 'comments', 'shares', 
    'favorites', 'cartClicks', 'orders'
  ]
  numericFields.forEach(field => {
    if (row[field] && isNaN(Number(row[field]))) {
      errors.push(`${field} 必须是数字`)
    }
  })
  
  // 验证日期格式
  if (row.date && isNaN(Date.parse(row.date))) {
    errors.push('日期格式不正确')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 过滤日期范围
 * @param {array} data - 数据数组
 * @param {string} startDate - 开始日期
 * @param {string} endDate - 结束日期
 * @returns {array} 过滤后的数据
 */
export const filterByDateRange = (data, startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  return data.filter(item => {
    const itemDate = new Date(item.date)
    return itemDate >= start && itemDate <= end
  })
}

/**
 * 导出数据为CSV
 * @param {array} data - 数据数组
 * @param {string} filename - 文件名
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (data.length === 0) return
  
  const headers = Object.keys(data[0])
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(field => row[field]).join(','))
  ].join('\n')
  
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
