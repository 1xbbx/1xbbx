# 部署指南

## 📦 部署选项

### 1. Vercel 部署 (推荐)

#### 步骤:

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel
```

4. **生产环境部署**
```bash
vercel --prod
```

#### 配置文件 (vercel.json):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. Netlify 部署

#### 步骤:

1. **安装 Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **登录**
```bash
netlify login
```

3. **初始化**
```bash
netlify init
```

4. **部署**
```bash
netlify deploy --prod
```

#### 配置文件 (netlify.toml):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages 部署

#### 步骤:

1. **安装 gh-pages**
```bash
npm install -D gh-pages
```

2. **修改 vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',  // 替换为你的仓库名
})
```

3. **添加部署脚本到 package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **部署**
```bash
npm run deploy
```

### 4. Docker 部署

#### Dockerfile:

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

#### 构建和运行:

```bash
# 构建镜像
docker build -t douyin-dashboard .

# 运行容器
docker run -d -p 3000:80 douyin-dashboard
```

### 5. 传统服务器部署

#### 使用 Nginx:

1. **构建项目**
```bash
npm run build
```

2. **上传 dist 目录到服务器**
```bash
scp -r dist/* user@server:/var/www/douyin-dashboard/
```

3. **配置 Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/douyin-dashboard;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **重启 Nginx**
```bash
sudo systemctl restart nginx
```

#### 使用 Apache:

1. **配置 .htaccess**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔒 生产环境优化

### 1. 环境变量

创建 `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_TITLE=抖音数据分析看板
```

### 2. 构建优化

修改 `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'antd-vendor': ['antd', '@ant-design/icons'],
          'echarts-vendor': ['echarts', 'echarts-for-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
```

### 3. 启用 CDN

在 `index.html` 中添加:

```html
<link rel="dns-prefetch" href="https://cdn.yourdomain.com">
<link rel="preconnect" href="https://cdn.yourdomain.com">
```

### 4. 添加分析工具

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>

<!-- 百度统计 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?your_id";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

## 🔐 安全配置

### 1. HTTPS 配置

使用 Let's Encrypt 免费 SSL:

```bash
sudo certbot --nginx -d yourdomain.com
```

### 2. 安全头配置 (Nginx)

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### 3. CORS 配置

如果需要连接后端 API:

```nginx
add_header Access-Control-Allow-Origin "https://yourdomain.com" always;
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;
```

## 📊 监控和日志

### 1. 错误追踪

集成 Sentry:

```bash
npm install @sentry/react
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

### 2. 性能监控

使用 Lighthouse 或 Web Vitals:

```bash
npm install web-vitals
```

```javascript
// src/main.jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🚀 CI/CD 自动化

### GitHub Actions 示例:

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📝 部署检查清单

部署前确保:

- [ ] 所有依赖已安装
- [ ] 构建成功无错误
- [ ] 环境变量已配置
- [ ] API 端点已更新
- [ ] 域名已配置
- [ ] SSL 证书已安装
- [ ] 防火墙规则已设置
- [ ] 备份策略已制定
- [ ] 监控工具已集成
- [ ] 错误追踪已启用

## 🔄 更新和回滚

### 更新部署:

```bash
# 拉取最新代码
git pull origin main

# 安装依赖
npm install

# 构建
npm run build

# 重启服务
pm2 restart douyin-dashboard
```

### 快速回滚:

```bash
# 回退到上一个版本
git checkout previous-commit-hash

# 重新构建
npm run build

# 重启服务
pm2 restart douyin-dashboard
```

## 📞 支持

遇到部署问题?
- 查看构建日志
- 检查服务器错误日志
- 联系运维团队

---

**祝部署顺利！🎉**
