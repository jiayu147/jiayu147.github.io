# Jiayu147 Ecology - Academic Personal Website

这是一个基于 GitHub Pages 的学术个人网站模板，从 Weebly 平台迁移而来。

## 网站结构

```
.
├── index.html              # 首页
├── personal-information.html  # 个人信息页面
├── research.html           # 研究内容页面
├── publications.html       # 发表论文页面
├── species.html           # 物种信息页面
├── life.html             # 生活内容页面
├── team.html             # 团队介绍页面
├── styles.css            # 样式文件
├── script.js             # JavaScript 交互文件
└── README.md             # 本文件
```

## 功能特点

- ✅ 完全响应式设计，支持手机、平板、电脑访问
- ✅ 现代化学术网站设计风格
- ✅ 包含7个主要页面（与原有 Weebly 网站对应）
- ✅ 已包含真实的发表论文数据
- ✅ 移动端友好的汉堡菜单
- ✅ 平滑滚动和动画效果
- ✅ 易于定制和扩展

## 如何部署到 GitHub Pages

### 步骤 1: 创建 GitHub 账户

如果还没有 GitHub 账户，请先注册：https://github.com/signup

### 步骤 2: 创建新的仓库

1. 登录 GitHub
2. 点击右上角的 "+" 号，选择 "New repository"
3. 仓库名称填写：`[你的用户名].github.io`
   - 例如：如果用户名是 `jiayu147`，则填写 `jiayu147.github.io`
   - **重要**：这会让你的网站直接通过 `https://[用户名].github.io` 访问
4. 选择 "Public"（公开）
5. 勾选 "Add a README file"（可选）
6. 点击 "Create repository"

### 步骤 3: 上传文件

#### 方法一：通过 GitHub 网页上传（推荐新手）

1. 进入你刚创建的仓库
2. 点击 "Add file" → "Upload files"
3. 将以下文件拖拽到网页中：
   - `index.html`
   - `personal-information.html`
   - `research.html`
   - `publications.html`
   - `species.html`
   - `life.html`
   - `team.html`
   - `styles.css`
   - `script.js`
4. 在 "Commit changes" 下方填写提交信息，例如 "Initial website upload"
5. 点击 "Commit changes"

#### 方法二：使用 Git 命令行（推荐熟悉 Git 的用户）

```bash
# 克隆仓库到本地
git clone https://github.com/[你的用户名]/[你的用户名].github.io.git

# 进入仓库目录
cd [你的用户名].github.io

# 复制所有网站文件到这个目录

# 添加文件到 Git
git add .

# 提交更改
git commit -m "Initial website upload"

# 推送到 GitHub
git push origin main
```

### 步骤 4: 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 "Settings"（设置）
3. 在左侧菜单找到 "Pages"
4. 在 "Build and deployment" → "Branch" 中选择：
   - Branch: `main` (或 `master`)
   - Folder: `/ (root)`
5. 点击 "Save"
6. 等待几分钟，GitHub 会显示你的网站地址：`https://[用户名].github.io`

### 步骤 5: 访问你的网站

在浏览器中输入：`https://[你的用户名].github.io`

**注意**：GitHub Pages 的部署可能需要 1-5 分钟，请耐心等待。

## 如何自定义网站内容

### 1. 修改个人信息

编辑 `personal-information.html` 文件：
- 替换 `[Your Name]` 为你的真实姓名
- 替换 `[your.email@xmu.edu.cn]` 为你的邮箱
- 替换办公室地址等信息
- 上传你的照片，替换占位符图片

### 2. 添加真实照片

1. 准备你的照片，命名为 `profile.jpg` 或其他格式
2. 上传到仓库（通过网页或 Git）
3. 在 `personal-information.html` 中修改图片路径：
   ```html
   <img src="profile.jpg" alt="Profile Photo">
   ```

### 3. 更新研究内容

编辑 `research.html` 文件：
- 替换 `[Funding Agency/Project Number]` 为真实的资助信息
- 替换 `[Start Year] - [End Year]` 为真实的时间
- 添加你的实际研究项目和描述

### 4. 添加更多发表论文

编辑 `publications.html` 文件：
- 在相应的年份标题下添加新的论文条目
- 复制现有的 `publication-item` div 并修改内容
- 确保 DOI 链接正确

### 5. 修改物种信息

编辑 `species.html` 文件：
- 替换占位符图片为真实的物种照片
- 修改物种描述为你实际研究的内容
- 添加或删除物种卡片

### 6. 更新团队信息

编辑 `team.html` 文件：
- 添加真实的团队成员信息和照片
- 更新校友信息
- 修改合作者列表

### 7. 自定义颜色主题

编辑 `styles.css` 文件，修改以下 CSS 变量：

```css
:root {
    --primary-color: #2c5f2d;      /* 主色调（深绿色）*/
    --secondary-color: #97bc62;    /* 副色调（浅绿色）*/
    --accent-color: #4a90e2;      /* 强调色（蓝色）*/
    --text-color: #333;            /* 文字颜色 */
    --light-bg: #f5f5f5;         /* 浅色背景 */
    --white: #ffffff;              /* 白色 */
}
```

## 如何更新网站

### 通过 GitHub 网页：

1. 进入你的仓库
2. 点击要修改的文件
3. 点击右上角的铅笔图标（Edit this file）
4. 进行修改
5. 滚动到底部，填写提交信息
6. 点击 "Commit changes"

### 通过 Git 命令行：

```bash
# 拉取最新更改
git pull

# 修改文件后
git add .
git commit -m "描述你的更改"
git push origin main
```

## 自定义域名（可选）

如果你想使用自己的域名（例如 `www.yourname.com`）：

1. 购买域名（从域名注册商如阿里云、腾讯云等）
2. 在域名注册商处添加 CNAME 记录，指向 `[用户名].github.io`
3. 在 GitHub 仓库中创建 `CNAME` 文件，内容为你的域名
4. 在 GitHub 仓库 Settings → Pages → Custom domain 中填写你的域名

## 故障排除

### 网站无法访问

- 确认仓库名称正确：`[用户名].github.io`
- 确认 GitHub Pages 已启用（Settings → Pages）
- 等待 5-10 分钟让 GitHub 部署

### 样式无法加载

- 确认 `styles.css` 文件已上传
- 检查 HTML 文件中的 CSS 链接路径：`<link rel="stylesheet" href="styles.css">`
- 确保文件名大小写正确（GitHub 区分大小写）

### 图片无法显示

- 确认图片已上传到仓库
- 检查图片路径是否正确
- 使用相对路径，例如 `src="profile.jpg"` 而不是完整 URL

## 技术栈

- HTML5
- CSS3（Flexbox、Grid、CSS Variables）
- Vanilla JavaScript（无框架依赖）
- 完全静态，无需服务器端处理

## 浏览器兼容性

- Chrome（推荐）
- Firefox
- Safari
- Edge
- 移动端浏览器

## 许可

MIT License - 可自由使用、修改和分发

## 贡献

如果你发现 bug 或有改进建议，欢迎提交 Issue 或 Pull Request。

## 联系方式

如有问题，可以：
- 查看 GitHub Pages 官方文档：https://pages.github.com/
- 在仓库中提交 Issue
- 联系我：[你的邮箱]

---

**祝你的学术网站建设顺利！🎓🌿**
