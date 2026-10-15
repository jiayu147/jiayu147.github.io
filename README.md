# Jiayu147｜按网页板块维护网站

网站：[jiayu147.github.io](https://jiayu147.github.io/) · 仓库：[jiayu147/jiayu147.github.io](https://github.com/jiayu147/jiayu147.github.io) · 日常分支：`master`

本指南按网页顶部导航的顺序组织。HTML 保存内容，CSS 控制排版，script.js 控制手机菜单和首页动态同步；提交后由 GitHub Pages 发布。

### 常见任务入口

| 想做什么 | 查看章节 |
| --- | --- |
| 修改首页标题、简介或背景 | 第 3 节 Home |
| 更新研究方向 | 第 4 节 Research |
| 发布动态、补正文或照片 | 第 5 节 Moment |
| 添加论文 | 第 6 节 Publications |
| 更新合作者 | 第 7 节 Collaborators |
| 修改个人经历、基金或联系方式 | 第 8 节 About |
| 调整导航、字体、背景或缓存版本 | 第 9 节 |
| 本地预览、检查或恢复内容 | 第 10 节 |

## 1. 网页与仓库文件对应表

| 网页导航 | 内容文件 | 专用样式 | 要修改的内容 |
| --- | --- | --- | --- |
| Home | `index.html` | `home.css` | 两行大标题、简介、Research focus、首页备用三条动态 |
| Research | `research.html` | `research.css` | 三个研究方向的标题、照片和说明 |
| Moment | `archive.html` | `news.css` | 简讯列表、日期、分类、标题链接、简讯文字 |
| Moment → 某条标题 | `moment-文章编号.html` | `moment.css` | 该文章的简讯、详细正文、照片和图题 |
| Publications | `publications.html` | `publications.css` | 年份、论文标题、作者、期刊、DOI |
| Collaborators | `team.html` | `collaborators.css` | 合作者姓名、职位、头像、介绍、联系方式 |
| About（页内标题 Personal information） | `personal-information.html` | `about.css` | 个人照片、经历、基金、Contact、Address |

主页仍使用 index.html，Moment 列表使用 archive.html，Collaborators 使用 team.html，About 使用 personal-information.html。这些是当前正式内容文件，菜单名称不必与文件名相同。动态详情保留 moment- 前缀。

### 公共文件

| 文件或目录 | 职责 |
| --- | --- |
| `styles.css` | 基础样式、导航与页脚 |
| `site-theme.css` | 深绿主题、统一宽度、次级页面背景横幅与手机叠加效果 |
| `typography.css` | 全站字号及顶部站点名称、导航字号 |
| `script.js` | 首页读取 archive.html 的最新三条、手机菜单、导航高亮 |
| `assets/` | 图片；现有命名按 home/research/moment/collaborator/about 等用途组织 |
| `templates/moment-template.html` | 创建新动态的完整 HTML 模板 |
| `sitemap.xml` | 正式公开页面地址，包括各条动态 |
| `robots.txt`、`.nojekyll`、`assets/favicon.svg` | 站点辅助文件，应保留 |
| `publications.bib` | 文献导出资料；网页论文列表不会自动读取它 |
| `README.md` | 本维护指南，不是网页正文 |

### 当前维护文件名

以第 1 节对应表中的文件名为准；导航显示名称可以与文件名不同。

## 2. 在 GitHub 上编辑、上传和发布

### 修改已有文件

1. 打开仓库并确认分支 master。
2. 按第 1 节找到对应文件，点击铅笔编辑；Ctrl+F 搜索标题、原句或下文给出的 class 名。
3. 只修改目标文字或区块，保留 HTML 标签、结束标签和类名。
4. 点击 **Commit changes…**，填写具体说明，如 Update research introduction，提交到 master。
5. 打开 Actions，等待最新 pages build and deployment 成功。
6. 打开网站检查电脑和手机效果；必要时强制刷新。

### 上传图片

进入 assets 文件夹 → Add file → Upload files → 上传 → Commit changes。先上传图片，再更新 HTML 的 src；文件名和大小写必须完全一致。右键电脑照片 → 属性 → 详细信息，可查看原始像素宽高。

### 创建新 HTML 文件

仓库根目录 → Add file → Create new file → 填写文件名 → 粘贴代码 → 修改内容 → Commit changes。上传完整替换文件时，进入它所在的目录并使用 Upload files，保持准确文件名。

多个文件在网页编辑器中通常分别提交。新增动态建议按照片 → 详情页 → 列表 → 首页备用条目和 sitemap 的顺序，避免先发布尚不存在的链接。

## 3. Home｜index.html

| 想改的部分 | 搜索位置 | 操作 |
| --- | --- | --- |
| 背景图 | `home-hero-photo` | 修改 src 和原图 width/height |
| 两行大标题 | `Rapid Changing Coastal` | 修改两个 span 的内容，保留两个 span |
| 横幅介绍 | `home-hero-copy` | 修改 p 的文字 |
| Research updates… 简介 | `overview-copy` | 修改 h2 内容 |
| Research focus 四个关键词 | `focus-panel` | 修改四个 li；排列由 home.css 控制 |
| Latest post | `news-list` | 此处是三条备用简讯；在线内容来自 archive.html |
| More archive 按钮 | `href="archive.html"` | 保持指向 Moment 列表 |

首页加载后，script.js 读取 archive.html，按 datetime 从新到旧排序，显示最新三条，并沿用详情标题链接。index.html 中预先写好的三条称为“备用条目”：脚本禁用、读取失败或列表没有有效条目时，它们仍会显示。自动读取只改变浏览器中的显示，不会改写 index.html 文件。**不要只修改首页简讯**：自动加载后会被 archive.html 内容覆盖。改简讯先改 Moment 列表，再同步详情页及首页备用内容。

## 4. Research｜research.html

顶部两句介绍在 section-hero-copy 内，分别保留两个 p。三个方向依次为 Plant clonality → Mesocosm arrays → Plant interactions。

每个方向是完整的 section.research-topic：h2 是小标题，research-figure 是图片，research-copy 是正文。复制新增或调换顺序时移动整个 section，并修改唯一标题 id 与 aria-labelledby。

```html
<section class="content-section research-topic" aria-labelledby="new-topic-heading">
    <div class="container research-topic-layout">
        <h2 id="new-topic-heading">New research topic</h2>
        <figure class="research-figure">
            <img class="research-image" src="assets/new-research.jpg"
                 alt="图片内容" width="1200" height="900" loading="lazy">
        </figure>
        <div class="research-copy">
            <p>第一段研究说明。</p>
            <p>第二段研究说明。</p>
        </div>
    </div>
</section>
```

标题在图片文字上方；电脑左图右文，手机正文区上下排列。照片显示最大宽度 320px，普通图按 4:3 裁剪；竞争示意图的 research-image-diagram 类保留完整图。顶部横幅在手机仍是图文叠加。

## 5. Moment｜archive.html 与独立详情页

### 新增动态完成清单

按以下顺序操作，详细代码见下方 A–E：

- [ ] 有照片时：先上传到 assets，记录文件名和上传图片的实际像素尺寸。
- [ ] 必做：复制模板到根目录，创建详情页；删除 base 和 noindex，替换内容、日期、canonical 与返回链接（A、B）。
- [ ] 必做：在 archive.html 添加条目，核对标题、日期、分类、简讯和详情链接（C）。
- [ ] 有条件：新增或修改后，最新三条的内容或顺序发生变化时，同步 index.html 的备用三条（C、D）。仅补充旧动态的详细正文无需修改首页。
- [ ] 必做：在 sitemap.xml 添加新详情页地址，在下方文件索引表增加一行。
- [ ] 必做：部署成功后，检查列表、详情、返回链接、照片及首页（E）。

### 编号与链接对应关系

下面以同一条新动态为例；将 my-new-event 统一换成自己的简短英文编号。编号应唯一，建议使用小写字母、数字和连字符。已有文件沿用原来的对应关系，不必为统一名称而改名。

| 位置 | 对应值 |
| --- | --- |
| 根目录详情文件名 | `moment-my-new-event.html` |
| archive.html 的 article id | `my-new-event` |
| 列表 h3 id | `my-new-event-title` |
| 列表 article 的 aria-labelledby | `my-new-event-title`，与列表 h3 id 相同 |
| 列表标题链接 href | `moment-my-new-event.html` |
| 详情页两处返回链接 href | `archive.html#my-new-event` |
| 详情页 canonical、sitemap 中的地址 | `https://jiayu147.github.io/moment-my-new-event.html` |
| 首页备用 article id | `home-my-new-event` |
| 首页备用 h3 id、article 的 aria-labelledby | 两者均为 `home-my-new-event-title` |

详情页的 `moment-title` 是该页面内部的标题 id，可保留；不同 HTML 文件之间允许使用相同 id，同一文件内不能重复。

### 当前列表与详情文件

| 日期 | 网页标题 | 详情文件 | 列表编号 |
| --- | --- | --- | --- |
| 2026-10-02 | Monthly field experiment of clonal Acanthus finished in Zhangjiang Estuary | `moment-clonal-acanthus-monthly.html` | `clonal-acanthus-monthly` |
| 2026-09-19 | Attending the Go belowground 2026 training course in Czech Republic | `moment-go-belowground-2026.html` | `go-belowground-2026` |
| 2026-08-21 | The field investigation of clonal Acanthus in Zhangjiang Estuary | `moment-acanthus-field-investigation.html` | `acanthus-field-investigation` |
| 2026-05-17 | Attending the conference of eco-evolutionary dynamics in a changing world in Wuhan | `moment-eco-evolutionary-wuhan.html` | `eco-evolutionary-wuhan` |
| 2026-04-10 | Happy to meet Jitka’s group in Czech Republic | `moment-jitka-group-trebon.html` | `jitka-group-trebon` |
| 2026-04-02 | MGCP Conference in Konstanz University | `moment-mgcp-konstanz.html` | `mgcp-konstanz` |
| 2025-10-31 | Biomass harvesting and clonal traits measuring of salt marshes finished in Zhangjiang Estuary | `moment-saltmarsh-experiment.html` | `clonal-saltmarsh-experiment` |

以实际文件为准；新增活动时在此表增加一行。列表与详情分别保存，改简讯需要同步两处。完整正文只在详情页编辑。模板：[templates/moment-template.html](templates/moment-template.html)。

### A. 新增动态：复制模板

1. 在 GitHub 打开模板文件，点击 Raw，复制全部 HTML 内容。
2. 返回仓库根目录，确认分支为 master，选择 **Add file → Create new file**。
3. 文件名填写 `moment-my-new-event.html`，粘贴模板。
4. **删除 `<base href="../">`**：它仅用于让 templates 文件夹内的模板正确预览。根目录的正式详情页不能保留它。
5. 删除 `<meta name="robots" content="noindex">`：这行只用于让搜索引擎忽略模板。
6. 搜索 `REPLACE`，替换标题、页面 title、description、简讯、详细文字、图片说明及图题。
7. 两处日期（datetime 属性和显示日期）改成真实日期，统一使用 YYYY-MM-DD；示例日期仅用于演示，发布前必须替换。分类沿用 Field Work 或 Academic Exchange。这两个名称是当前内容约定，并非代码限制；可新增分类，但列表和详情中的拼写应保持一致。
8. canonical 地址改为 `https://jiayu147.github.io/moment-my-new-event.html`。
9. 两处 Back to Moments 的 href 改为 `archive.html#my-new-event`，编号与列表 article id 一致。
10. 保存提交到 master。之后按 C 步骤将动态加入列表。

### B. 添加或更新详细文字、照片

已有动态无需重新复制完整模板：按本节开头的“当前列表与详情文件”表找到对应详情文件，点击铅笔修改。

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

默认两图居中并列，整组最大宽度 800px，手机仍保持两列并缩小图片，图题自动换行。若只想缩小这一组，将图库开头改为 `<div class="moment-gallery" style="max-width: 600px;">`。单张照片只用一个 figure，直接放在 moment-body 内，不用双列容器；如需缩小并居中，在 figure 上加 `style="max-width: 600px; margin: 32px auto;"`。更多照片可以按两张一组增加图库，最后单张使用单独 figure。

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

日期、分类、标题和简讯与详情页保持一致；id 必须唯一。按日期从新到旧排列。首页在线列表会自动取最新三条，无需另外写同步脚本；若最新三条的内容或顺序有变化，同时更新 index.html 的备用三条；article id 加 home- 前缀，h3 id 和 aria-labelledby 使用同一个 home-编号-title，参见本节编号对应表。

在 sitemap.xml 的 `</urlset>` 前，参照现有条目加入正式详情地址：

```xml
<url>
    <loc>https://jiayu147.github.io/moment-my-new-event.html</loc>
</url>
```

同时在本节的“当前列表与详情文件”表增加一行。模板本身不用加入 sitemap 或导航。

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


## 6. Publications｜publications.html

在对应年份 section.publication-year 中复制 article.publication-item。标题在作者上方，顺序为标题 → 作者 → 期刊 → DOI。

```html
<section class="publication-year" aria-labelledby="year-2026">
    <h2 class="year-heading" id="year-2026">2026</h2>
    <article class="publication-item">
        <h3>Paper title about <em>Spartina alterniflora</em></h3>
        <div class="authors">Wang JY, Author B, Author C</div>
        <div class="journal"><em>Journal name</em>, volume, article number</div>
        <a class="doi" href="https://doi.org/10.xxxx/example"
           target="_blank" rel="noopener noreferrer">https://doi.org/10.xxxx/example</a>
    </article>
</section>
```

同年新增只复制 article，不重复年份 section。新年份复制整个 section，修改年份、heading id 和 aria-labelledby，放在旧年份之前。DOI 的 href 与显示文字同时改；作者按论文原顺序。删除论文删除整个 article，空年份可删除整个 section。只改 publications.bib 不会更新网页。

## 7. Collaborators｜team.html

Ctrl+F 搜索姓名。每人是 collaborator-section；姓名职位在 h2，头像在 collaborator-figure，介绍在 collaborator-copy，邮箱在 collaborator-contact。

新增人物复制完整 section，替换内容、唯一 heading id 与 aria-labelledby。头像先上传到 assets，再更新 src、alt、实际像素尺寸。当前显示竖向 3:4、最大宽度 120px；裁剪由 collaborators.css 控制，不改变原图。

```html
<p class="collaborator-contact">Contact:
    <a href="mailto:person@example.com">person@example.com</a>
</p>
```

邮箱链接和显示文字一起更新。删除人物删除完整 section；头像文件仅在全站不再引用时删除。顶部 It takes a village. 在 section-hero-copy 中。

## 8. About｜personal-information.html

导航名称是 About，页内大标题是 Personal information。顶部两段介绍在 section-hero-copy；个人照片与图注在 about-portrait。

| 要更新的信息 | 搜索标题 | 修改位置 |
| --- | --- | --- |
| 博士后经历 | Postdoctoral work experience | 后面的 p |
| 学历 | Education experience | 每个学位一个 p |
| 基金 | Foundation | 项目名称、年份等 p，可新增段落 |
| 姓名与联系方式 | Contact | 姓名、办公室、单位、邮箱 p |
| 通信地址 | Address | 后面的单位地址段落 |

头像路径为 assets/jiayu-field.jpg，背景为 assets/about-coast.jpg；更换时分别修改对应 img，图题改 figcaption。学名用 em。若更换全站邮箱，还需同步所有页面页脚的 Email 链接。

## 9. 全站导航、背景、字号与图片命名

### 顶部与页脚

每个 HTML 都独立保存 nav-logo、nav-menu 与 footer。改 Jiayu147、Coastal plant ecology、导航名称或页脚时，同步全部正式页面及模板；index.html 同样需要同步导航与页脚。字号在 typography.css：站点名称 23px、副标题 14px、导航 16px，769–1000px 的导航 15px。

### 背景图片对应表

| 板块 | 当前图片 | 控制背景裁剪的 CSS |
| --- | --- | --- |
| Home | assets/coastal-ecotone.jpg | home.css |
| Research | assets/mesocosms.jpg | site-theme.css |
| Moment | assets/moments-coastal-train.jpg | site-theme.css，HTML 内联位置 |
| Publications | assets/publications-storytelling.jpg | publications.css |
| Collaborators | assets/collaborators-field.jpg | site-theme.css |
| About | assets/about-coast.jpg | site-theme.css、about.css |

背景 object-fit: cover 自动裁剪，深绿渐变叠加文字，手机也在同一区域显示。不要把手机背景改成 position: relative / height: auto，否则会重新上下分开。调整单图裁剪可在 img 上设置 style="object-position: center 65%;"。需要不同屏幕不同位置时，用专用类名和 media 规则，并移除内联位置。

### 命名规则

主页面沿用对应表中的既有名称，首页使用 index.html；动态详情使用 moment-简短英文主题.html。新图片建议使用 research-主题.jpg、moment-主题-序号.jpg、collaborator-姓名.jpg、about-用途.jpg。尽量小写和连字符，扩展名与实际文件一致。现有已引用图片保留当前名称，包括少数 .JPG；若改名必须同步所有 src，不能只改文件。

width/height 写原图真实像素；实际显示大小由 CSS 控制。图库最大 800px，照片保持原比例；头像为 3:4，Research 照片为 4:3。object-position 控制 CSS 裁剪中心，不改变上传原图。

### 上传图片建议

- 普通照片优先用 JPEG，需透明背景或保留细小文字的图用 PNG；不要只改扩展名来转换格式。
- 以网页浏览为目的时，可先将照片长边缩至约 1600–2400px，再适当压缩；单张尽量控制在约 500KB 以内，复杂图可按清晰度适当放宽。这是建议，不是上传限制。
- width/height 填压缩、缩放后实际上传文件的像素尺寸。
- alt 用简短文字描述画面，供图片无法加载或屏幕阅读器使用；figcaption 是网页上可见的图题，可补充地点、人物、日期或研究背景。

### CSS 与缓存

共享主题用 site-theme.css，专用布局用对应板块 CSS，字号优先看 typography.css。Moment 列表用 news.css，详情用 moment.css，两者用途不同。修改 CSS 后更新所有引用页面的 ?v= 标记；普通改正文不用改 CSS 版本。后加载且优先级合适的规则覆盖前面的规则。

例如修改 moment.css 后，把所有引用它的正式详情页和模板中的 `moment.css?v=20261014d` 统一改为新的标记，如 `moment.css?v=20261015a`。版本标记是手动设置的缓存标识，不需要改 CSS 文件名。共享样式改动需检查全部引用页面；script.js 改动同样更新引用它的 ?v= 标记。

Windows 浏览器可用 Ctrl+F5 强制刷新；手机可先重新加载，仍显示旧内容时再清理该站点缓存。部署未成功时，强制刷新不会使修改提前上线。

## 10. 检查、恢复与常用写法

- 提交前核对标签完整、id 唯一、文件名大小写准确。
- 简讯、详情标题/日期/分类一致；首页备用三条同步。
- 点击每个动态标题和 Back to Moments，检查照片、图题、邮箱、DOI。
- 等待 Pages 部署，再检查电脑和手机横幅裁剪、正文换行与图片并列。
- 发现错误可以再次编辑提交；恢复旧内容时在文件 History 中复制旧段落到当前版本，避免覆盖其他最新修改。

| 内容 | HTML 写法 |
| --- | --- |
| 段落 | `<p>Text.</p>` |
| 学名斜体 | `<em>Acanthus ilicifolius</em>` |
| 加粗 | `<strong>Text</strong>` |
| 邮箱 | `<a href="mailto:name@example.com">name@example.com</a>` |
| 正文 & | `&amp;` |

HTML 不会把 Markdown 星号自动变成斜体。图片不显示先查路径；两图不并列先查 gallery 和 CSS；内容不更新先查分支、部署和缓存。

### 本地预览

先安装 Python，并把仓库文件下载或克隆到电脑。在仓库根目录打开终端，运行：

```bash
python -m http.server 8000
```

Windows 若找不到 python，可尝试 `py -m http.server 8000`。保持终端运行，在浏览器打开 http://localhost:8000/；结束时回到终端按 Ctrl+C。直接双击 HTML 使用 file:// 预览时，浏览器可能阻止首页读取 archive.html，因此检查首页自动同步应使用本地服务器。

### 使用 Git 更新

以下以新增动态为例；先将示例文件名替换为实际文件名：

```bash
git pull --ff-only origin master
# 修改需要更新的文件
git status --short
git add archive.html moment-my-new-event.html sitemap.xml README.md
# 有新照片时，另行暂存实际新增的图片
# git add assets/moment-my-new-event-1.jpg
# 最新三条发生变化时，暂存已同步的首页备用内容
# git add index.html
git diff --cached --stat
git commit -m "Add a new Moment"
git push origin master
```

需先安装 Git、克隆仓库并配置 GitHub 认证；git pull 前确认本地修改已妥善保存。上方示例中的图片和首页命令以 # 注释，适用时去掉 # 并替换为实际路径后执行。提交前检查暂存文件是否齐全，仅添加本次更新涉及的文件。README 修改只改变本指南，不改变网页正文。
