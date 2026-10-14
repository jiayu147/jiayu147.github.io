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

六个主要页面之外，还有六个 `moment-*.html` 独立动态详情页。导航和页脚调整需要覆盖所有 HTML 页面。

### 样式与交互文件

| 文件 | 负责的部分 |
| --- | --- |
| `styles.css` | 基础样式、导航、页脚和早期样式 |
| `site-theme.css` | 全站深绿主题、统一页面宽度、次级页面横幅与响应式布局 |
| `typography.css` | 全站正文字号、顶部站点名称与导航字号，通常最后加载 |
| `home.css` | 首页横幅、简介、Research focus 等专用布局 |
| `research.css` | Research 标题与左图右文排版 |
| `publications.css` | Publications 横幅和论文列表 |
| `collaborators.css` | 合作者介绍及竖向头像排版 |
| `about.css` | About 背景、个人照片和图注 |
| `news.css` | Home 和 Moment 的动态列表 |
| `moment.css` | 动态详情页的简讯、分隔线、详细正文、图片与图题 |
| `script.js` | 首页动态同步、手机菜单、当前导航高亮 |

`publications.bib` 不会自动生成网页中的论文列表；更新论文请编辑 `publications.html`。

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
        <h3 id="new-fieldwork-title"><a href="moment-new-fieldwork.html">Your new title</a></h3>
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

`script.js` 在首页加载时读取 `archive.html`，按每条动态的 `datetime` 从新到旧排序，选取前三条，并保留标题指向独立详情页的链接。

**修改已有简讯后，首页在线列表会自动同步。新增动态还需要创建对应详情页，并设置标题链接；首页会自动显示最新三条及这些链接。**

`index.html` 还包含三条备用动态；如果浏览器不能读取 Moment，或禁用了 JavaScript，会显示这三条备用内容。维护首页时可以顺便更新它们。

日期、文章 `id`、标题 `<h3>` 和现有的 `news-list` / `news-item` 类名应保留正确格式，以便自动同步。

## 5. Publications：新增、修改与删除论文

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

## 6. Research、Collaborators 和 About：逐项维护

### Research

当前顺序：Plant clonality → Mesocosm arrays → Plant interactions。修改顶部介绍时，找到 `section-hero-copy`，两句话分别保留在两个 `<p>` 中。

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

页面标题是 Personal information，导航名称仍为 About。顶部两段介绍在 `section-hero-copy` 中；兴趣爱好也在第二个段落。个人头像和图注在 `about-portrait` 中，背景照片与个人头像是两张独立图片。

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

导航和页脚分别写在每个 HTML 页面里。修改全站菜单、站点名称或页脚信息时，要同步修改所有 HTML 页面，包括六个主要页面和目前六个动态详情页。

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


## 12. Home：具体修改位置

打开 `index.html`，在编辑器中用 Ctrl+F 搜索下列关键词：

| 要更新的内容 | 搜索位置 | 操作 |
| --- | --- | --- |
| 顶部 Jiayu147 / Coastal plant ecology | `nav-logo` | 修改 `<span>` / `<small>` 内文字；其他页面同样修改 |
| 首页背景 | `home-hero-photo` | 修改 `src`，并填写新图片的实际 `width`、`height` |
| 首页两行大标题 | `Rapid Changing Coastal` | 修改两个 `<span>` 内文字，保留两个 span 以维持分行 |
| 横幅介绍 | `home-hero-copy` | 替换段落内容 |
| 首页中部简介 | `overview-copy` | 修改 `<h2>` 中句子 |
| Research focus 四个关键词 | `focus-panel` | 修改四个 `<li>`；两行两列由 `home.css` 控制 |
| 最新三条动态 | `news-list` | 在线内容来自 `archive.html`；这里的三条用于加载失败或禁用 JS 时备用 |
| More archive | `href="archive.html"` | 保持指向动态列表 |

修改首页最新简讯时，先改 `archive.html`，再同步 `index.html` 的备用条目。不要只改首页，否则自动加载后会被动态列表中的文字覆盖。

## 13. Moment：列表、详情、照片的完整更新流程

首次操作建议先阅读第 19 节：包含可直接复制的 HTML 模板、照片插入位置和结束标签示例。

### 13.1 当前六条动态与详情文件

| 日期 | 内容 | 详情文件 |
| --- | --- | --- |
| 2026-10-02 | 月度 Acanthus 野外实验 | `moment-clonal-acanthus-monthly.html` |
| 2026-09-19 | Go belowground 课程 | `moment-go-belowground-2026.html` |
| 2026-08-21 | Acanthus 野外调查 | `moment-acanthus-field-investigation.html` |
| 2026-05-17 | 武汉会议 | `moment-eco-evolutionary-wuhan.html` |
| 2026-04-10 | Třeboň 团队交流 | `moment-jitka-group-trebon.html` |
| 2026-04-02 | Konstanz MGCP 会议 | `moment-mgcp-konstanz.html` |

第一条已有详细正文和两张照片；其余五条的详细正文目前是 `to be updated`。所有详情页都采用简讯 → 横线 → 详细正文的结构。

### 13.2 更正一条已有简讯

例如修改参与人员，需要同步以下位置：

1. `archive.html`：找到对应文章的 `id`，修改 `news-copy` 内的 `<p>`。
2. 对应 `moment-*.html`：修改 `moment-summary` 内同一句简讯；若 `<meta name="description">` 也使用该句，则一并修改。
3. 如果这条属于首页最新三条，修改 `index.html` 中对应备用简讯。
4. 如果改标题或日期，同步详情页的 `<title>`、`<h1>`、`<time>`。分类也应与列表一致。

`archive.html` 与详情页是独立 HTML 文件，详情页简讯不会自动读取列表；首页在线列表会读取 `archive.html`，但首页备用文字也需要手工同步。

### 13.3 为已有动态补充详细正文

打开对应详情文件，搜索 `moment-body`，将 `<p>to be updated</p>` 替换为完整介绍：

```html
<div class="moment-summary">
    <p>这里保留列表中的简讯。</p>
</div>
<hr class="moment-divider">
<div class="moment-body">
    <p>第一段详细介绍，学名写作 <em>Acanthus ilicifolius</em>。</p>
    <p>第二段详细介绍。</p>
    <p>第三段详细介绍。</p>
</div>
```

简讯为 16px；详细正文桌面为 18px，手机为 17px。横线使用 `moment-divider`。填写详细正文不需要把长文复制到列表或首页，列表继续显示简讯。

### 13.4 在正文末尾添加两张照片

先将照片上传到 `assets/`，再在 `moment-body` 的最后一个段落后、该 div 的结束标签前加入：

```html
<div class="moment-gallery">
    <figure>
        <img src="assets/my-event-photo-1.jpg"
             alt="第一张照片的具体内容"
             width="1706" height="1279" loading="lazy">
        <figcaption>第一张照片的图题。</figcaption>
    </figure>
    <figure>
        <img src="assets/my-event-photo-2.jpg"
             alt="第二张照片的具体内容"
             width="2048" height="1536" loading="lazy">
        <figcaption>第二张照片的图题。</figcaption>
    </figure>
</div>
```

将示例文件名与尺寸换成实际照片信息。当前 `moment-gallery` 两张图在电脑和手机上均并列、居中，图片按原比例显示，图题在对应图片下方自动换行。只有一张照片时，可直接放一个 `<figure>`，不使用双列 gallery。不同长宽比的两张图可能高度不同；需要整齐时可先准备相同比例的照片。

2026-10-02 的照片文件是 `assets/moment-acanthus-mesocosms.jpg` 和 `assets/moment-fieldwork-mud.jpg`，图题在对应详情页的 `<figcaption>` 修改。

### 13.5 新增一条带详情页的动态

1. 确定独一无二的编号，例如 `fieldwork-2026-11`，和详情文件名 `moment-fieldwork-2026-11.html`。
2. 复制一份现有详情页代码。在仓库根目录选择 **Add file → Create new file**，填入新文件名，粘贴代码。
3. 修改 `<title>`、`description`、`canonical`、日期、分类、`<h1>`、`moment-summary`、`moment-body`。
4. 两处 Back to Moments 链接都改为 `archive.html#fieldwork-2026-11`。不要把文章编号留成复制来源的编号。
5. 在 `archive.html` 列表最前面添加第 4 节的 article 模板，将文章 id、标题 id、aria-labelledby、日期、分类和简讯全部改好；标题链接为 `moment-fieldwork-2026-11.html`。
6. 在 `sitemap.xml` 的 `</urlset>` 前加入一行：

```xml
<url><loc>https://jiayu147.github.io/moment-fieldwork-2026-11.html</loc></url>
```

7. 更新首页备用三条，保留 `home-` 前缀，标题链接指向详情页。
8. 提交后检查 Moment 标题、首页最新三条、详情页以及 Back to Moments 是否都能正常进入。

GitHub 网页编辑通常一次提交一个文件。建议按照片 → 详情页 → 列表链接 → 首页备用条目和 sitemap 的顺序提交，避免先发布链接而页面尚未创建。若想让多个文件一次发布，可在电脑上修改完整仓库后通过 Git 一次提交。

### 13.6 删除一条动态

从 `archive.html` 删除完整 article；检查 `index.html` 备用列表，补齐新的前三条。删除对应详情页前先确认没有其他链接引用，并从 sitemap 删除其地址。照片只有确认全站不再引用时才删除。已分享过的详情地址删除后会失效，可选择只从列表移除、保留详情页。

## 14. Research：修改、增加和排序研究方向

每个方向的结构如下，新增时建议复制现有完整 section，再替换内容：

```html
<section class="content-section research-topic" aria-labelledby="new-topic-heading">
    <div class="container research-topic-layout">
        <h2 id="new-topic-heading">New research topic</h2>
        <figure class="research-figure">
            <img class="research-image" src="assets/new-research.jpg"
                 alt="图片内容说明" width="1200" height="900" loading="lazy">
        </figure>
        <div class="research-copy">
            <p>研究说明第一段。</p>
            <p>研究说明第二段。</p>
        </div>
    </div>
</section>
```

标题整体位于图片和文字上方；电脑端左图右文，手机端正文区会上下排列。此规则与手机顶部横幅不同：横幅始终图文叠加。调换方向顺序时移动整段 section，不能只移动标题。

竞争示意图带有专用类名以完整展示；更换为普通照片时参考另外两个方向的图片类名。若示意图需要继续完整显示，保留原有 `research-image-diagram` 类名。

## 15. Publications：新年份、作者与 DOI

同年新增论文只需复制 `publication-item` 放在对应年份 section 内。新年份则复制整个 section，例如：

```html
<section class="publication-year" aria-labelledby="year-2026">
    <h2 class="year-heading" id="year-2026">2026</h2>
    <article class="publication-item">
        <h3>Paper title</h3>
        <div class="authors">Wang JY, Author B, Author C</div>
        <div class="journal"><em>Journal name</em>, volume, article number</div>
        <a class="doi" href="https://doi.org/10.xxxx/example"
           target="_blank" rel="noopener noreferrer">https://doi.org/10.xxxx/example</a>
    </article>
</section>
```

新年份放在旧年份之前，年份标题 id 与 aria-labelledby 成对修改。作者按论文原始顺序填写，标题在作者上方。删除论文时删除整个 article；某年没有论文后，可删除该年的整个 section。网页不读取 `publications.bib`，可另外维护该文件作为文献导出资料。

## 16. Collaborators 与 About：头像、联系方式和经历

### Collaborators

在 `team.html` 搜索姓名。介绍和邮箱位于 `collaborator-copy`；头像路径在该人的 `collaborator-figure` 中。上传新头像后修改 `src`、`alt`、实际像素尺寸。头像显示比例由 CSS 裁剪为竖向 3:4，最大宽度 120px。

新增人物复制完整 `collaborator-section`，修改 heading id 和 aria-labelledby，避免两个人共用编号。按 section 在文件中的顺序显示。为某个人调整裁剪时，可以给头像增加独立类名，并在 `collaborators.css` 设置 `object-position`，例如 `.portrait-new-person { object-position: center 15%; }`。

邮箱需要同时更新 `<a href="mailto:...">` 和中间显示文字。调整背景简介 It takes a village. 时，修改顶部 `section-hero-copy` 的 `<p>`。

### About

在 `personal-information.html` 搜索以下标题，修改后面的段落：

- Postdoctoral work experience：单位、任职时间、合作导师。
- Education experience：学位、学院、学校、年份、导师；新增学历增加一个 `<p>`。
- Foundation：基金名称、项目题目和执行年份；多个项目可以分段。
- Contact：姓名、代称、办公室和邮箱。
- Address：各单位的完整通信地址。

头像图注在 `about-portrait` 的 `<figcaption>`，背景图片在 `section-hero-photo`。若更新全站邮箱，页脚中的 Email 链接也要在所有 HTML 页面同步更新。直接修改 About 的 Contact 不会自动改变页脚。

## 17. 顶部导航、背景照片与手机适配

### 顶部文字大小

`typography.css` 中的最终规则控制：Jiayu147 23px、Coastal plant ecology 14px、导航 16px。769–1000px 宽度的导航为 15px，减少拥挤。手机采用折叠菜单。调整这些字号时搜索 `nav-logo`、`nav-logo small`、`nav-menu a`，不要修改横幅 h1 来替代导航字号。

### 各页面背景文件

| 页面 | 背景文件 | 主要布局文件 |
| --- | --- | --- |
| Home | `assets/coastal-ecotone.jpg` | `home.css` |
| Research | `assets/mesocosms.jpg` | `site-theme.css` |
| Moment | `assets/moments-coastal-train.jpg` | `site-theme.css`，HTML 中有裁剪位置 |
| Publications | `assets/publications-storytelling.jpg` | `publications.css` |
| Collaborators | `assets/collaborators-field.jpg` | `site-theme.css` |
| About | `assets/about-coast.jpg` | `site-theme.css`、`about.css` |

更换背景时在对应 HTML 搜索表中的文件名，修改 src 和原图尺寸。背景使用 `object-fit: cover` 自动裁剪填满横幅；电脑与手机都让文字覆盖在照片上，深绿渐变帮助文字保持清晰。不要把手机背景图片改为 `position: relative` 或 `height: auto`，否则会重新变为文字和图片上下分开。

需要单独调整一张背景的裁剪中心，可在该 img 的现有 style 中设置：

```html
style="object-position: center 65%;"
```

百分比越大，通常越偏向图片下部。先在手机和电脑检查主体是否完整。若需要两个屏幕使用不同位置，移除内联 object-position，给图片独立类名，在对应 CSS 和手机 media 中分别设置，避免内联样式覆盖手机规则。Publications 图片有 Storytelling 文字，更换或裁剪时检查这段文字能否看清。

### 缓存版本与部署

共享 CSS 修改后，搜索所有引用该文件的 HTML，并将 `?v=...` 更新为一个新标记，例如 `?v=20261101a`。不要只更新首页。当前网站没有自动模板生成步骤，导航和页脚也是每页独立保存的。

README 仅是维护指南，修改它不会改变网站正文。`script.js` 负责首页动态、导航高亮和手机菜单；普通内容更新一般不需要修改它。`.nojekyll`、`robots.txt`、`sitemap.xml` 和 `assets/favicon.svg` 应保留。

## 18. 发布前后的逐项检查

1. 修改前确认 master 是最新版本。如果同时在 GitHub 和电脑上编辑，先拉取最新内容，避免覆盖自己的另一次更新。
2. 核对 HTML 开始和结束标签，编号唯一，标题链接与实际文件名一致。
3. 图片已上传，大小写与 src 完全一致；width/height 是图片原尺寸，不是页面显示尺寸。
4. 每条动态的标题、日期、分类和简讯在列表及详情页一致；首页备用内容也检查。
5. 学名使用 `<em>`，邮箱、DOI、返回链接可点击。
6. 等待 Actions 最新 Pages 部署完成，再打开线上页面。
7. 电脑和手机分别检查导航、顶部背景裁剪、文字清晰度、图题与正文换行。

如提交后发现错误，可重新编辑并提交修正。需要恢复旧文字时，在文件的 History 中打开之前的版本，复制需要恢复的内容，再回到当前版本编辑提交；这样不会覆盖其他文件的新修改。

## 官方参考

- [GitHub：编辑文件](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)
- [GitHub：上传文件](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub Pages：配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 19. Moment HTML 模板：照着完成一次更新

模板文件：[templates/moment-template.html](templates/moment-template.html)。它包含完整导航、标题、日期、分类、简讯、横线、详细正文、双图图库、返回链接和页脚。示例使用仓库现有照片方便预览，发布前应替换成当前活动照片，或删除示例图库。

### A. 新增动态：复制模板

1. 在 GitHub 打开模板文件，点击 Raw，复制全部 HTML 内容。
2. 返回仓库根目录，确认分支为 master，选择 **Add file → Create new file**。
3. 文件名填写 `moment-my-new-event.html`，粘贴模板。
4. **删除 `<base href="../">`**：它仅用于让 templates 文件夹内的模板正确预览。根目录的正式详情页不能保留它。
5. 删除 `<meta name="robots" content="noindex">`：这行只用于让搜索引擎忽略模板。
6. 搜索 `REPLACE`，替换标题、页面 title、description、简讯、详细文字、图片说明及图题。
7. 两处日期（datetime 和显示日期）改成真实日期；分类改为 Field Work 或 Academic Exchange。
8. canonical 地址改为 `https://jiayu147.github.io/moment-my-new-event.html`。
9. 两处 Back to Moments 的 href 改为 `archive.html#my-new-event`，编号与列表 article id 一致。
10. 保存提交到 master。之后按 C 步骤将动态加入列表。

### B. 添加或更新详细文字、照片

已有动态无需重新复制完整模板：按第 13.1 节找到对应详情文件，点击铅笔修改。

**添加文字：**搜索 `class="moment-body"`。每段文字写在 `<p>...</p>` 中；把 `<p>to be updated</p>` 替换为完整介绍。学名用 `<em>...</em>`。简讯位于上方 moment-summary 内，横线是 `<hr class="moment-divider">`，它们与详细正文独立。

**上传照片：**进入 assets 文件夹 → Add file → Upload files → 上传并提交。建议用英文文件名。照片属性中的像素宽高填入 width/height；网页显示大小由 CSS 控制，不要用这两个属性缩小图片。

**两张照片并列：**在最后一段正文之后、结束 moment-body 的 `</div>` 之前，插入下面这组代码：

```html
<div class="moment-body">
    <p>详细介绍第一段。</p>
    <p>详细介绍第二段。</p>

    <div class="moment-gallery">
        <figure>
            <img src="assets/my-photo-1.jpg"
                 alt="第一张照片的内容"
                 loading="lazy" width="1706" height="1279">
            <figcaption>第一张照片的图题。</figcaption>
        </figure>
        <figure>
            <img src="assets/my-photo-2.jpg"
                 alt="第二张照片的内容"
                 loading="lazy" width="2048" height="1536">
            <figcaption>第二张照片的图题。</figcaption>
        </figure>
    </div><!-- 结束图库 -->
</div><!-- 结束正文，图片必须在此标签之前 -->
```

这是一整块正文结构示例；已有 moment-body 时只插入内部图库，不要再嵌套一套 moment-body。替换路径、alt、图题及真实原图尺寸。两个 figure 的顺序决定左右顺序。

默认两图居中并列，整组最大宽度 800px，手机自动缩小，图题自动换行。若只想缩小这一组，将图库开头改为 `<div class="moment-gallery" style="max-width: 600px;">`。单张照片只用一个 figure，直接放在 moment-body 内，不用双列容器；如需缩小并居中，在 figure 上加 `style="max-width: 600px; margin: 32px auto;"`。更多照片可以按两张一组增加图库，最后单张使用单独 figure。

没有照片时删除整个 moment-gallery（包括其结束 div），保留结束 moment-body 的 div。图题修改 figcaption，正文修改 p，图片路径修改 src，这三者不要混淆。

### C. 将新动态添加到 Moment 与首页

详情页创建完成后，打开 archive.html，在 news-list 内添加新条目：

```html
<article class="news-item" id="my-new-event" aria-labelledby="my-new-event-title">
    <div class="news-meta">
        <time datetime="2026-11-01">2026-11-01</time>
        <span>Field Work</span>
    </div>
    <div class="news-copy">
        <h3 id="my-new-event-title">
            <a href="moment-my-new-event.html">新动态标题</a>
        </h3>
        <p>这里与详情页 moment-summary 中的简讯一致。</p>
    </div>
</article>
```

日期、分类、标题和简讯与详情页保持一致；id 必须唯一。按日期从新到旧排列。首页在线列表会自动取最新三条，无需另外写同步脚本；同时更新 index.html 的备用三条，将 id 与 aria-labelledby 改为对应的 home- 前缀版本。

在 sitemap.xml 的结束 urlset 前加入正式详情地址。模板本身不用加入 sitemap 或导航。

### D. 更正已有简讯：三处同步

1. archive.html 中这条 news-copy 的 p。
2. 对应详情页 moment-summary 的 p，并按需同步 description。
3. 属于首页最新三条时，index.html 中对应的备用 p。

完整详细正文只在详情页修改，不复制到首页或列表。标题或日期有更正时，同步列表、详情标题/日期以及首页备用条目。

### E. 提交后检查与问题排查

- 确认 moment.css 已在 head 中引用。当前样式版本是 `moment.css?v=20261014d`；添加正文照片一般不需要修改版本号。
- 两张图未并列：检查是否在同一个 moment-gallery 内、CSS 是否加载。
- 图片撑出页面：检查使用当前 moment.css；图片应在 moment-body 内，图库样式也已独立限制图片宽度。
- 图片不显示：检查 assets 文件存在、文件名和大小写准确。
- 返回链接找不到条目：检查 archive 的 article id 与 Back to Moments 的 #编号一致。
- 新页面所有链接都不对：检查是否忘删模板中的 base 标签。
- 图片尺寸元数据不要套用旧图：Go Belowground 合照实际为 3302×2475，课堂照片为 1707×1280；10-02 两图分别为 1706×1279、2048×1536。
- Commit 后等待 Actions 的 Pages 部署成功，再打开电脑和手机页面检查。若仍显示旧版本，强制刷新。

模板有多处英文注释标明可替换内容及结束标签位置，注释不会显示给访客。以后全站导航或页脚有修改，也应同步模板，避免新页面带入旧信息。
