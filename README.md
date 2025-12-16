# 抖音/TikTok 电商短视频数据分析看板

一个现代化、专业的抖音电商短视频数据分析平台，提供实时数据监控、可视化分析和智能洞察。

## ✨ 功能特点

### 📊 核心功能

- **数据上传与解析**
  - 支持 Excel (.xlsx, .xls) 和 CSV 格式
  - 智能数据解析和验证
  - 实时数据预览

- **实时数据看板**
  - 总播放量、总点赞数、总成交单数概览
  - 动态计算转化率
  - 数据实时更新

### 📈 可视化图表

1. **趋势分析图（双轴折线图）**
   - 播放量趋势（左轴）
   - 成交单数趋势（右轴）
   - 时间序列展示

2. **互动分析图（柱状图）**
   - Top 5 热门视频对比
   - 点赞、评论、转发、收藏数据
   - 多维度互动分析

3. **转化分析图（柱状/面积图）**
   - 挂车点击量展示
   - 成交单数趋势
   - 转化率计算

### 🎨 UI 特色

- **抖音风格主题**
  - 黑色背景 (#000000)
  - 霓虹效果（粉红 #FE2C55 + 青色 #25F4EE）
  - 现代化卡片设计

- **响应式布局**
  - 支持桌面、平板、手机
  - 侧边栏导航
  - 流畅动画效果

## 🛠️ 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **UI 框架**: Ant Design 5
- **样式**: Tailwind CSS
- **图表库**: ECharts + echarts-for-react
- **数据解析**: SheetJS (xlsx)

## 📦 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🚀 快速开始

### 方式一：使用启动脚本 (推荐)

```bash
# Linux/Mac
./start.sh

# Windows (使用 Git Bash 或 WSL)
bash start.sh
```

### 方式二：手动启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 访问应用
# 浏览器打开 http://localhost:3000
```

### 方式三：生产模式

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 2. 使用 Mock 数据

项目自带 Mock 数据，启动后直接查看看板。

### 3. 上传自己的数据

点击侧边栏"数据上传"，上传包含以下字段的 Excel/CSV 文件：

| 字段名 | 说明 | 示例 |
|--------|------|------|
| 视频ID | 视频唯一标识 | DY001 |
| 发布日期 | 发布时间 | 2024-01-01 |
| 播放量 | 视频播放次数 | 125000 |
| 点赞 | 点赞数 | 8500 |
| 评论 | 评论数 | 320 |
| 转发 | 转发数 | 450 |
| 收藏 | 收藏数 | 890 |
| 挂车点击 | 购物车点击数 | 1200 |
| 成交单数 | 实际成交订单数 | 85 |

### 示例数据格式

```csv
视频ID,发布日期,播放量,点赞,评论,转发,收藏,挂车点击,成交单数
DY001,2024-12-01,125000,8500,320,450,890,1200,85
DY002,2024-12-02,98000,6200,280,380,720,950,68
```

**日期格式说明：**
- 支持多种日期格式：`YYYY-MM-DD`、`YYYY/MM/DD`、`MM/DD/YYYY`、中文格式、Excel序列号
- 详细说明请查看 [DATE_FORMAT_GUIDE.md](DATE_FORMAT_GUIDE.md)

## 📁 项目结构

```
/workspace
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # 侧边栏导航
│   │   ├── Dashboard.jsx        # 主看板
│   │   ├── FileUpload.jsx       # 文件上传组件
│   │   ├── OverviewCards.jsx    # 概览卡片
│   │   ├── TrendChart.jsx       # 趋势图
│   │   ├── InteractionChart.jsx # 互动分析图
│   │   └── ConversionChart.jsx  # 转化分析图
│   ├── utils/
│   │   └── mockData.js          # Mock 数据
│   ├── App.jsx                  # 主应用
│   ├── main.jsx                 # 入口文件
│   └── index.css                # 全局样式
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 核心组件说明

### Dashboard 看板
主要的数据展示页面，包含：
- 概览卡片
- 趋势分析图
- 互动分析图
- 转化分析图

### FileUpload 数据上传
- 拖拽上传或点击选择文件
- 支持 Excel/CSV 格式
- 实时数据预览
- 数据验证和格式化

### 图表组件
所有图表基于 ECharts，包含：
- 自定义主题（抖音风格）
- 响应式设计
- 交互式 tooltip
- 霓虹发光效果

## 🎨 主题定制

在 `tailwind.config.js` 中修改主题颜色：

```javascript
colors: {
  douyin: {
    primary: '#FE2C55',    // 主色（粉红）
    secondary: '#25F4EE',  // 辅助色（青色）
    dark: '#000000',       // 背景色
    darkGray: '#161823',   // 卡片背景
    lightGray: '#1F1F1F',  // 次级背景
  }
}
```

## 📊 数据说明

### 计算指标

- **转化率** = (成交单数 / 挂车点击) × 100%
- **互动率** = (点赞 + 评论 + 转发 + 收藏) / 播放量 × 100%

### 数据要求

- 所有数值字段必须为数字类型
- 日期格式：YYYY-MM-DD
- 视频ID 应唯一

## 🔧 开发

### 添加新图表

1. 在 `src/components/` 创建新组件
2. 使用 `echarts-for-react` 包装 ECharts
3. 在 `Dashboard.jsx` 中引入

### 修改数据结构

1. 更新 `src/utils/mockData.js`
2. 修改 `FileUpload.jsx` 中的解析逻辑
3. 更新相关图表组件的数据处理

## 📝 待办事项

- [ ] 添加数据导出功能
- [ ] 实现数据筛选和时间范围选择
- [ ] 添加更多图表类型（饼图、雷达图等）
- [ ] 实现数据对比功能
- [ ] 添加用户认证
- [ ] 集成后端API

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题，请提交 Issue 或联系开发团队。

---

**Made with ❤️ for TikTok/Douyin Creators**
