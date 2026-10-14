# Jiayu147｜学术个人网站维护指南

- 网站：https://jiayu147.github.io/
- 仓库：https://github.com/jiayu147/jiayu147.github.io
- 日常更新分支：`master`

本指南对应当前网站的实际文件结构。日常维护可以直接在 GitHub 网页上完成。

## 1. 网站如何工作

这是一个静态多页面网站，各板块是独立页面。

| 类型 | 作用 |
| --- | --- |
| HTML | 保存标题、正文、论文、动态、图片路径等内容 |
| CSS | 控制深绿配色、字号、布局、图片裁剪与手机排版 |
| JavaScript | 控制手机菜单、导航高亮和首页动态同步 |
| GitHub Pages | 构建并发布仓库中的网页文件 |

日常流程：修改文件 → Commit changes 提交 → 等待 Pages 部署成功 → 刷新网站检查。

## 2. 要改什么，就打开哪个文件

| 板块 | 文件 | 常见更新 |
| --- | --- | --- |
| Home | `index.html` | 首页标题、简介、Research focus、首页备用动态 |
| Research | `research.html` | 研究方向、说明文字、图片 |
| Moment | `archive.html` | 全部动态、Moments 简介、背景照片 |
| Publications | `publications.html` | 年份、论文标题、作者、期刊和 DOI |
| Collaborators | `team.html` | 合作者姓名、简介、头像、邮箱 |
| About | `personal-information.html` | 个人照片、经历、基金、联系方式和地址 |
| 图片 | `assets/` | 所有页面使用的照片与图片 |

**文件名与菜单名称不完全相同：Moment 使用 `archive.html`，Collaborators 使用 `team.html`。**

`species.html` 和 `life.html` 是保留的旧页面，目前不在主导航中。日常维护以以上六个页面为准。

### 样式与交互文件

| 文件 | 负责的部分 |
| --- | --- |
| `styles.css` | 基础样式、导航、页脚和早期样式 |
| `site-theme.css` | 全站深绿主题、统一页面宽度、次级页面横幅与响应式布局 |
| `typography.css` | 全站正文字号，通常最后加载 |
| `home.css` | 首页横幅、简介、Research focus 等专用布局 |
| `research.css` | Research 标题与左图右文排版 |
| `publications.css` | Publications 横幅和论文列表 |
| `collaborators.css` | 合作者介绍及竖向头像排版 |
| `about.css` | About 背景、个人照片和图注 |
| `news.css` | Home 和 Moment 的动态列表 |
| `script.js` | 首页动态同步、手机菜单、当前导航高亮 |

`app.js` 目前未被页面引用。`publications.bib` 不会自动生成网页中的论文列表；更新论文请编辑 `publications.html`。

## 3. 直接在 GitHub 网页上更新

### 修改已有文字

1. 打开仓库，确认当前分支是 `master`。
2. 点击需要修改的文件，例如 `archive.html`。
3. 点击右上方铅笔按钮，进入编辑。
4. 找到原句，只替换需要修改的文字。
5. 点击 **Commit changes…**，填写说明，例如 `Update fieldwork news`。
6. 日常直接发布可选择提交到当前 `master` 分支，再确认提交。
7. 进入 **Actions**，查看最新的 **pages build and deployment**。
8. 部署成功后，打开网站检查；必要时强制刷新浏览器。

保存编辑器中的内容不等于网站已经更新，必须完成提交并等待部署。

### 上传修改好的文件

1. 在仓库根目录选择 **Add file → Upload files**。
2. 上传需要覆盖的 HTML、CSS、JavaScript 或 README 文件。
3. 文件名保持与原文件一致。
4. 填写提交说明并提交到 `master`。
5. 如果修改的是网页文件，等待 Actions 部署后检查网站。

图片应上传到 `assets/` 文件夹，见第 7 节。已有 GitHub Pages 配置通常无需重新设置；出现发布问题时，到 **Settings → Pages** 查看当前发布来源。

## 4. 新增 Moment：最常用的操作

打开 `archive.html`，找到 `<div class="news-list">`。复制其中一个完整的 `<article>`，修改后放在列表最前面。

```html
<article class="news-item" id="new-fieldwork"
         aria-labelledby="new-fieldwork-title">
    <div class="news-meta">
        <time datetime="2026-10-14">2026-10-14</time>
        <span>Field Work</span>
    </div>
    <div class="news-copy">
        <h3 id="new-fieldwork-title">Your new title</h3>
        <p>Your description about <em>Acanthus ilicifolius</em>.</p>
    </div>
</article>
```

每次需要修改：

- 日期：`datetime` 中的日期和显示日期都改成同一天，格式为 `YYYY-MM-DD`。
- 分类：例如 `Field Work` 或 `Academic Exchange`。
- 标题：`<h3>` 中的文字。
- 正文：`<p>` 中的文字。
- 编号：把 `new-fieldwork` 换成独一无二的英文编号。
- 对应关系：`aria-labelledby` 必须与标题的 `id` 完全相同。

把新动态放在列表最前面，Moment 页面按 HTML 中的顺序显示。更正旧动态时，直接修改对应条目的文字即可。

### 首页如何自动显示最新三条

`script.js` 在首页加载时读取 `archive.html`，按每条动态的 `datetime` 从新到旧排序，选取前三条，并为标题添加指向 Moment 对应条目的链接。

**正常情况下，新增动态只需修改 `archive.html`，首页会自动同步最新三条。**

`index.html` 还包含三条备用动态；如果浏览器不能读取 Moment，或禁用了 JavaScript，会显示这三条备用内容。维护首页时可以顺便更新它们。

日期、文章 `id`、标题 `<h3>` 和现有的 `news-list` / `news-item` 类名应保留正确格式，以便自动同步。

## 5. 新增论文

打开 `publications.html`，在对应年份的 `<section class="publication-year">` 内复制一个完整的论文条目：

```html
<article class="publication-item">
    <h3>Your paper title about <em>Spartina alterniflora</em></h3>
    <div class="authors">Author A, Author B, Author C</div>
    <div class="journal"><em>Journal name</em>, volume, pages or article number</div>
    <a href="https://doi.org/YOUR-DOI" class="doi"
       target="_blank" rel="noopener noreferrer">https://doi.org/YOUR-DOI</a>
</article>
```

- 修改论文标题、作者顺序、期刊、卷页或文章号。
- DOI 的 `href` 和显示文字都要更新。
- 新年份需要复制一整段 `publication-year`，同时修改年份标题、`id` 和 `aria-labelledby`。
- 年份从新到旧排列，当前顺序为标题、作者、期刊、DOI。

## 6. 更新 Research、Collaborators 和 About

### Research

编辑 `research.html`。每个研究方向是一个完整的 `research-topic` 区块：标题在上，下方左图右文。复制或移动时，按整个 `<section>` 区块操作。

新增区块要设置唯一的标题 `id`，并同步对应的 `aria-labelledby`。说明文字位于 `research-copy` 内，图片路径位于 `<img src="...">`。

### Collaborators

编辑 `team.html`。每位合作者是一个 `collaborator-section`。新增时可复制：

```html
<section class="content-section collaborator-section"
         aria-labelledby="new-person-heading">
    <div class="container collaborator-layout">
        <h2 id="new-person-heading">Name 中文姓名, Position (pronouns)</h2>
        <figure class="collaborator-figure">
            <img class="collaborator-portrait"
                 src="assets/new-person.jpg" alt="Name 中文姓名"
                 width="600" height="800" loading="lazy" decoding="async">
        </figure>
        <div class="collaborator-copy">
            <p>Research interests and collaboration description.</p>
            <p class="collaborator-contact">Contact:
                <a href="mailto:person@example.com">person@example.com</a>
            </p>
        </div>
    </div>
</section>
```

修改姓名、职位、介绍、邮箱、图片路径和唯一编号。`width` / `height` 填图片本身的像素尺寸；网页显示尺寸由 CSS 控制。当前头像为最大宽度 120 像素、竖向 3:4 比例，电脑端通常显示为 120 × 160。

### About

编辑 `personal-information.html`。个人经历、基金、Contact、Address 分别位于独立的内容区块中。邮箱链接修改时，`mailto:` 后的地址和显示地址一起更新。

## 7. 上传、更换与裁剪图片

### 上传和引用

1. 打开仓库的 `assets/` 文件夹。
2. 选择 **Add file → Upload files**，上传照片并提交。
3. 编辑相应 HTML，将图片路径改为新文件名：

```html
<img src="assets/new-photo.jpg" alt="图片说明">
```

文件名、扩展名和大小写必须与上传文件完全一致。可使用 `fieldwork-2026-10.jpg` 这样的英文文件名。图片先上传成功，再更新网页引用。

### 当前裁剪方式

- Research 图片：统一 4:3 区域，最大宽度 320 像素；竞争示意图完整显示。
- Collaborators 头像：统一竖向 3:4，最大宽度 120 像素。
- About 个人照片：按原始比例显示，单独一行。
- 页面背景：照片叠加深绿渐变，以保持文字清楚。

例如合作者头像的 CSS：

```css
.collaborator-figure { max-width: 120px; }
.collaborator-portrait {
    aspect-ratio: 3 / 4;
    object-fit: cover;
    object-position: center 20%;
}
```

`max-width` 控制最大宽度，`aspect-ratio` 控制显示比例，`object-fit: cover` 填满区域并裁剪边缘，`object-position` 调整裁剪位置。调整显示裁剪不改变原始图片文件。

## 8. 调整字号、配色和手机排版

- 正文字号：优先修改 `typography.css`。当前主要正文为 16 像素，桌面横幅简介为 18 像素，手机横幅简介为 16 像素。
- 全站主题：优先查看 `site-theme.css` 的 `.site-page` 变量。主色为 `#254b40`，强调色为 `#527c69`。
- 专用布局：修改对应页面的 CSS，例如头像尺寸在 `collaborators.css`。
- 手机布局：主要在 `@media (max-width: 768px)` 中设置；Research 和 Collaborators 转为上下排列，导航改为可展开菜单。

CSS 按 HTML 引用顺序加载，后加载且匹配优先级合适的规则会覆盖之前的规则。全站字号文件 `typography.css` 通常位于其他样式文件之后。

修改 CSS 或 JavaScript 后，可以更新对应 HTML 引用中的版本号，让浏览器重新获取文件：

```html
<link rel="stylesheet" href="news.css?v=20261014a">
<script src="script.js?v=20261014a"></script>
```

如果共享文件被多个页面引用，需要在相应页面同步更新版本号。版本号是浏览器缓存标记，不是另一份文件名。

## 9. 常用 HTML 写法

| 内容 | 写法 |
| --- | --- |
| 段落 | `<p>Your text.</p>` |
| 斜体学名 | `<em>Acanthus ilicifolius</em>` |
| 加粗 | `<strong>Your text</strong>` |
| 二级标题 | `<h2>Your heading</h2>` |
| 网页链接 | `<a href="https://example.com">Link text</a>` |
| 邮箱链接 | `<a href="mailto:name@example.com">name@example.com</a>` |
| 正文中的 & 符号 | `&amp;` |

HTML 文件不是 Markdown：写 `*Acanthus*` 不会自动变成斜体，应使用 `<em>Acanthus</em>`。保留原有标签、结束标签与类名，只改需要修改的内容。

## 10. 导航、页脚与辅助文件

导航和页脚分别写在每个 HTML 页面里。修改全站菜单或页脚信息时，要同步修改六个主要页面。

新增页面时，可复制现有页面保留公共结构，再修改页面标题、正文、当前导航项和专用样式引用。若要把新页面加入导航，也要同步更新其他页面的导航。

`README.md` 是 GitHub 仓库的维护说明，修改它不会直接改变网页正文。`sitemap.xml`、`robots.txt` 属于辅助文件；新增公开页面时可同步维护站点地图。

## 11. 更新后的检查与常见问题

每次更新后检查：日期和文字是否正确、图片是否加载、学名是否斜体、邮箱和 DOI 是否可点击，以及电脑和手机上的换行情况。

| 情况 | 检查方法 |
| --- | --- |
| 网页还显示旧内容 | 确认已经 Commit 到 `master`，查看 Actions 最新部署状态，再刷新页面 |
| 图片不显示 | 检查图片是否上传、`assets/` 路径、文件名及大小写 |
| 样式没有变化 | 检查 CSS 引用与覆盖关系，更新 `?v=...` 后刷新 |
| 首页动态没有同步 | 检查 Moment 条目的日期格式、唯一 `id`、`h3` 和类名，并确认 `script.js` 已加载 |
| 改了 `.bib` 但论文不变 | 当前论文列表直接来自 `publications.html` |
| 导航或页脚只改了一页 | 同步修改其他 HTML 页面里的同一部分 |
| 部署失败 | 打开 Actions 的失败任务，查看具体错误；在 Settings → Pages 核对发布来源 |

### 需要本地预览时

下载完整仓库，在仓库根目录运行：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000/`。本地 HTTP 预览可以运行首页读取 Moment 的功能；直接双击 HTML 文件的 `file://` 预览可能无法读取其他页面。

### 使用 Git 更新（可选）

首次使用可克隆仓库：

```bash
git clone https://github.com/jiayu147/jiayu147.github.io.git
cd jiayu147.github.io
```

日常修改前拉取最新内容，修改后明确添加需要提交的文件：

```bash
git pull --ff-only origin master
# 编辑需要修改的文件
git add archive.html
git commit -m "Add a new Moment"
git push origin master
```

如修改多个文件，把它们一起列在 `git add` 后。推送需要已配置的 GitHub 登录认证。之后仍需等待 Pages 部署，并检查线上结果。

## 官方参考

- [GitHub：编辑文件](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)
- [GitHub：上传文件](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub Pages：配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
