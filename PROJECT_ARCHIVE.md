# 胡子精酿移动品牌网站｜GitHub 接力摘要

- 项目：胡子精酿 H.ZI 移动品牌展示网站；与“胡子大富翁”完全独立，禁止混用任何大富翁素材或视觉语言。
- 现有生产站：`https://hzi-drinking-guide.netlify.app/`
- Netlify Site ID：`3b9eae58-fc98-4294-81ce-b1a149a5f14e`
- GitHub 仓库：`momoyellowup-afk/hzi-drinking-guide`
- 本轮分支：`refine-v2`
- 本轮视觉决定：中文使用标准粗黑无衬线字体；导航与详情封面以完整门店模型为主体；氛围背景只做延伸；模型原内容不改变；通过景深、光晕、落影、色彩和背景场景增强 C4D/Blender 式 3D 落地感；介绍页减少无意义空白、字号增大、避免文字裁切；产品页保留三卡横滑并增加 snap 停顿感。
- 七店顺序：胡子 NO.1、胡子 NO.2、胡子 NO.4、胡子 NO.5、野马 MUSTANG、胡子 NO.7、JUMP BURGER。
- 地址未知：统一显示“地址待更新”，不得虚构。
- 每店 3 个产品位：统一占位 `? / 特色产品 / 即将揭晓`。
- 当前品牌媒体暂时读取既有不可变 Netlify 部署的 `/brand/` 资产，以确保原模型和场景不被改动；后续可把优化媒体迁回仓库或对象存储。
- GitHub Actions 使用 Ubuntu + Node 22 验证 `npx tsc` 与 `npx vite build`。
- Netlify 应继续覆盖同一个站点，不新建第二个站点；生产域名不变时二维码内容无需更换。
