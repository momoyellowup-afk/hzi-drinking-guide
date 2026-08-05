# 胡子精酿移动品牌网站｜GitHub 接力摘要

- 项目：胡子精酿 H.ZI 移动品牌展示网站；与“胡子大富翁”完全独立，禁止混用任何大富翁素材或视觉语言。
- 现有生产站：`https://hzi-drinking-guide.netlify.app/`
- Netlify Site ID：`3b9eae58-fc98-4294-81ce-b1a149a5f14e`
- GitHub 仓库：`momoyellowup-afk/hzi-drinking-guide`
- 本轮视觉决定：中文使用标准粗黑无衬线字体；导航与详情封面以完整门店模型为主体；氛围背景只做延伸；模型原内容不改变；通过景深、光晕、落影、色彩和背景场景增强 C4D/Blender 式 3D 落地感；介绍页减少无意义空白、字号增大、避免文字裁切；产品页保留三卡横滑并增加 snap 停顿感。
- 七店顺序：胡子 NO.1、胡子 NO.2、胡子 NO.4、胡子 NO.5、野马 MUSTANG、胡子 NO.7、JUMP BURGER。
- 地址未知：统一显示“地址待更新”，不得虚构。
- 每店 3 个产品位：统一占位 `? / 特色产品 / 即将揭晓`。
- 当前品牌图片媒体暂时读取既有不可变 Netlify 部署的 `/brand/` 资产，以确保原模型和场景不被改动；后续可把优化媒体迁回仓库或对象存储。
- GitHub Actions 使用 Ubuntu + Node 22 验证 `npx tsc` 与 `npx vite build`。
- Netlify 应继续覆盖同一个站点，不新建第二个站点；生产域名不变时二维码内容无需更换。

## 2026-08-05 最新上线状态

- 导航页门店模型与小标签已放大；NO.5 标签改为“胡子全球酿造中心”；JUMP 使用 `JUMP BURGER`，并标注“JUMP 跳进厨房”。
- 产品页已改为移动端原生横向滚动 + snap，保留现有 Carousel 结构。
- 野马 MUSTANG 与胡子 NO.7 的门店详情封面模型已单独放大。
- 背景音乐最终方案不再依赖 Mixkit 或任何外部音频链接。
- 构建时由 `scripts/generate-brand-audio.mjs` 生成站点自有的 `/brand/young-house.wav`，风格为年轻、现代、放松的 House / fashion lounge；GitHub Actions 日志确认生成文件约 701 KB。
- `public/audio-fix.js` 负责第一次滑动/触摸后的稳定播放，以及 SOUND ON/OFF 控制；音频与网站同域发布。
- 对应生产功能提交：`5a1f96c393c375d70f90c58b4189111519736d81`。
