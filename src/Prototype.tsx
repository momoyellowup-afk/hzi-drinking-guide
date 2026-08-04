import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDownIcon, ChevronRightIcon, SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import { Carousel } from "./mobile/Carousel";

type Store = {
  id: string;
  number: string;
  display: string;
  eyebrow: string;
  tags: string[];
  scene: string;
  model: string;
  intro: string;
  note: string;
  accent: string;
  glow: string;
  profile: [string, string, string];
  statement: string;
  moment: string;
};

const stores: Store[] = [
  {
    id: "store-1",
    number: "NO.1",
    display: "胡子 NO.1",
    eyebrow: "品牌发源地",
    tags: ["熟客记忆", "经典酒款"],
    scene: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/scenes/store-1-scene.webp",
    model: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/store-1-cut.png",
    intro: "胡子的故事从这里开始。第一批熟客、第一张吧台、第一杯被记住的酒，共同把一店变成品牌记忆的原点。它不追求喧闹，而是把经典、熟悉与人与人之间的关系留在同一个夜晚里。",
    note: "ORIGIN · REGULARS · CLASSICS",
    accent: "#f5b73d",
    glow: "rgba(245,183,61,.34)",
    profile: ["品牌起源", "熟客文化", "经典酒款"],
    statement: "所有故事，都从第一杯开始。",
    moment: "熟客小聚 · 经典酒款 · 从第一杯开始",
  },
  {
    id: "store-2",
    number: "NO.2",
    display: "胡子 NO.2",
    eyebrow: "R&B 美式复古酒馆",
    tags: ["音乐现场", "复古夜色"],
    scene: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/scenes/store-2-scene.webp",
    model: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/store-2-cut.png",
    intro: "二店把 R&B 变成夜晚的情绪入口。低照度、复古质感与更贴近人的音乐现场，让一杯酒从味觉延伸到听觉；这里适合慢下来，也适合把一段夜色记得更久。",
    note: "R&B LIVE · AMERICAN RETRO",
    accent: "#ef355f",
    glow: "rgba(239,53,95,.34)",
    profile: ["R&B 现场", "美式复古", "情绪夜晚"],
    statement: "把 R&B 留在夜里，也把情绪留在杯里。",
    moment: "晚饭以后 · R&B 夜 · 慢慢喝到深夜",
  },
  {
    id: "store-4",
    number: "NO.4",
    display: "胡子 NO.4",
    eyebrow: "社区邻里的一站",
    tags: ["轻松日常", "稳定复访"],
    scene: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/scenes/store-4-scene.webp",
    model: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/store-4-cut.png",
    intro: "四店是一间真正落在社区里的胡子。它没有距离感，更像下班路上的固定坐标：随时可以进来喝一杯、聊两句，再自然地成为下一次见面的理由。",
    note: "NEIGHBORHOOD · DAILY · EASY",
    accent: "#34d7e3",
    glow: "rgba(52,215,227,.34)",
    profile: ["社区属性", "轻量体验", "邻里关系"],
    statement: "下班以后，社区里总有一杯等你。",
    moment: "下班路上 · 邻里碰杯 · 随时坐一会儿",
  },
  {
    id: "store-5",
    number: "NO.5",
    display: "胡子 NO.5",
    eyebrow: "前店后厂",
    tags: ["精酿工厂", "品牌窗口"],
    scene: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/scenes/store-5-scene.webp",
    model: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/store-5-cut.png",
    intro: "五店把“喝到一杯酒”和“看见一杯酒如何诞生”放在同一个空间。前店是热闹的品牌窗口，后厂是真实发生的酿造现场，酒液、设备与发酵过程共同构成这里最直接的魅力。",
    note: "FRONT BAR · BACK BREWERY",
    accent: "#e69f2a",
    glow: "rgba(230,159,42,.36)",
    profile: ["前店后厂", "现场酿造", "品牌窗口"],
    statement: "从发酵现场，到你手里的这一杯。",
    moment: "看现场酿造 · 朋友聚会 · 喝最新鲜的一杯",
  },
  {
    id: "store-mustang",
    number: "MUSTANG",
    display: "野马 MUSTANG",
    eyebrow: "快闪派对小厅",
    tags: ["主题切换", "后半夜"],
    scene: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/scenes/store-mustang-scene.webp",
    model: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/store-mustang-cut.png",
    intro: "野马是胡子更自由、更大胆的一面。主题、灯光、音乐与现场角色不断切换，它不是一间固定表情的酒吧，而是一座专门为年轻夜生活准备的快闪派对空间。",
    note: "POP-UP · PARTY · AFTER DARK",
    accent: "#ff1478",
    glow: "rgba(255,20,120,.38)",
    profile: ["主题派对", "灯光音乐", "年轻夜生活"],
    statement: "今晚不需要固定剧本，跟着现场走。",
    moment: "主题派对 · 音乐灯光 · 后半夜继续玩",
  },
  {
    id: "store-7",
    number: "NO.7",
    display: "胡子 NO.7",
    eyebrow: "城市旗舰店",
    tags: ["多人聚会", "自由互动"],
    scene: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/scenes/store-7-scene.webp",
    model: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/store-7-cut.png",
    intro: "七店把胡子的社交属性放大到城市中心。更多座位、更完整的酒头与更开放的互动方式，让它既能承接多人聚会，也能容纳临时加入的朋友和一场说来就来的夜晚。",
    note: "CITY FLAGSHIP · SOCIAL HUB",
    accent: "#ff6d42",
    glow: "rgba(255,109,66,.36)",
    profile: ["城市中心", "多人社交", "丰富酒头"],
    statement: "人更多，酒更多，夜晚也更自由。",
    moment: "多人聚会 · 城市会合 · 临时加入也自在",
  },
  {
    id: "store-jump",
    number: "JUMP",
    display: "JUMP BURGER",
    eyebrow: "现代美式厨房",
    tags: ["汉堡", "玩乐派"],
    scene: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/scenes/store-jump-scene.webp",
    model: "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/store-jump-cut.png",
    intro: "JUMP BURGER 用最直接的味觉和节奏接住胡子的玩乐属性。开放厨房、汉堡与轻松的用餐氛围同时发生，它更年轻、更明快，也让“喝一杯”自然延伸成“吃点好的再继续玩”。",
    note: "BURGER · OPEN KITCHEN · PLAY",
    accent: "#ff9f2f",
    glow: "rgba(255,159,47,.36)",
    profile: ["开放厨房", "现代美式", "年轻玩乐"],
    statement: "先吃得痛快，再把夜晚继续下去。",
    moment: "汉堡时间 · 朋友聚餐 · 吃完继续玩",
  },
];

const themeVars = (store: Store) => ({
  "--store-accent": store.accent,
  "--store-glow": store.glow,
}) as CSSProperties;

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProductRail({ store }: { store: Store }) {
  return (
    <Carousel ariaLabel={`${store.display} 三个特色产品`} className="product-carousel" contentClassName="product-track">
      {[1, 2, 3].map((slot) => (
        <article className="product-card" key={slot} style={themeVars(store)}>
          <div className="product-visual" aria-label="产品即将公布">
            <img src={store.scene} alt="" draggable={false} />
            <div className="product-question">?</div>
            <div className="product-orbit" />
          </div>
          <div className="product-copy">
            <p>{store.number} · PRODUCT 0{slot}</p>
            <h3>特色产品</h3>
            <strong>即将揭晓</strong>
          </div>
        </article>
      ))}
    </Carousel>
  );
}

export default function Prototype() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [activePage, setActivePage] = useState("cover");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.36;
    const begin = () => {
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
      window.removeEventListener("pointerdown", begin);
    };
    window.addEventListener("pointerdown", begin, { once: true });
    return () => window.removeEventListener("pointerdown", begin);
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const pages = Array.from(root.querySelectorAll<HTMLElement>(".story-page"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActivePage(visible.target.id);
      },
      { root, threshold: [0.52, 0.68, 0.82] },
    );
    pages.forEach((page) => observer.observe(page));
    return () => observer.disconnect();
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => undefined);
    else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="brand-app">
      <audio ref={audioRef} src="https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/brand-soundtrack.m4a" loop preload="auto" />
      <button className="sound-toggle" onClick={toggleAudio} aria-label={playing ? "关闭背景音乐" : "播放背景音乐"}>
        {playing ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
        <span>{playing ? "SOUND ON" : "SOUND OFF"}</span>
      </button>

      <div className="app-screen" ref={scrollRef}>
        <main className="brand-story" aria-label="胡子精酿七店品牌展示">
          <section className={`story-page cover-page ${activePage === "cover" ? "is-active" : ""}`} id="cover">
            <img src="https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/cover-map.jpg" alt="胡子精酿七家门店主视觉地图" className="cover-art" draggable={false} />
            <div className="cover-vignette" />
            <button className="swipe-cue" onClick={() => goTo("navigation")}><span>EXPLORE H.ZI · 探索七家店</span><ArrowDownIcon /></button>
          </section>

          <section className={`story-page nav-page ${activePage === "navigation" ? "is-active" : ""}`} id="navigation">
            <header className="section-heading">
              <p>H.ZI DRINKING GUIDE · 7 SPACES</p>
              <h1>七站胡子地图</h1>
              <span>每家店都有自己的夜晚。点开一站，继续往下滑。</span>
            </header>
            <nav className="store-grid" aria-label="七家门店导航">
              {stores.map((store) => (
                <button key={store.id} className="store-tile" style={themeVars(store)} onClick={() => goTo(store.id)}>
                  <span className="tile-color" />
                  <img src={store.model} alt={`${store.display} 3D 门店模型`} draggable={false} />
                  <span className="tile-copy"><b>{store.number}</b><small>{store.eyebrow}</small></span>
                  <ChevronRightIcon />
                </button>
              ))}
            </nav>
            <p className="map-footer">7 STORES · 7 CHARACTERS · ONE H.ZI</p>
          </section>

          {stores.map((store, index) => (
            <div className="store-chapter" key={store.id} style={themeVars(store)}>
              <section className={`story-page store-hero ${activePage === store.id ? "is-active" : ""}`} id={store.id}>
                <img src={store.scene} alt="" className="hero-scene" draggable={false} />
                <div className="hero-shade" />
                <div className="hero-ghost-number">{store.number}</div>
                <div className="chapter-index">{String(index + 1).padStart(2, "0")} / 07</div>
                <div className="model-stage">
                  <div className="model-halo" />
                  <img src={store.model} alt={`${store.display} 门店视觉模型`} className="store-model" draggable={false} />
                </div>
                <div className="store-title-block">
                  <p>{store.note}</p>
                  <h2>{store.display}</h2>
                  <div className="tag-row"><span>{store.eyebrow}</span>{store.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <button className="next-cue" onClick={() => goTo(`${store.id}-intro`)}><span>STORE STORY · 门店介绍</span><ArrowDownIcon /></button>
              </section>

              <section className={`story-page intro-page ${activePage === `${store.id}-intro` ? "is-active" : ""}`} id={`${store.id}-intro`}>
                <div className="intro-visual">
                  <img src={store.scene} alt="" className="intro-scene" draggable={false} />
                  <img src={store.model} alt="" className="intro-model" draggable={false} />
                  <div className="intro-number">{store.number}</div>
                </div>
                <div className="intro-panel">
                  <p className="kicker">STORE PROFILE · {String(index + 1).padStart(2, "0")}</p>
                  <h2>{store.eyebrow}</h2>
                  <p className="intro-statement">{store.statement}</p>
                  <p className="intro-text">{store.intro}</p>
                  <div className="profile-row" aria-label="门店关键词">
                    {store.profile.map((item, i) => <span key={item}><i>0{i + 1}</i>{item}</span>)}
                  </div>
                  <div className="address-line"><span>ADDRESS</span><b>地址待更新</b></div>
                  <div className="moment-strip"><span>WHEN TO COME · 今晚适合</span><strong>{store.moment}</strong></div>
                </div>
                <button className="next-cue intro-next" onClick={() => goTo(`${store.id}-products`)}><span>SIGNATURE MENU · 特色产品</span><ArrowDownIcon /></button>
              </section>

              <section className={`story-page products-page ${activePage === `${store.id}-products` ? "is-active" : ""}`} id={`${store.id}-products`}>
                <header className="product-heading">
                  <p>{store.number} · SIGNATURE MENU</p>
                  <h2>三款特色产品</h2>
                  <span>左右滑动 · 每一张都会自然停住 · 产品信息后续更新</span>
                </header>
                <ProductRail store={store} />
                <div className="product-progress"><span>01</span><i /><span>03</span></div>
                <button className="back-map" onClick={() => goTo("navigation")}>返回七站地图</button>
              </section>
            </div>
          ))}

          <section className={`story-page end-page ${activePage === "ending" ? "is-active" : ""}`} id="ending">
            <img src="https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/logo.jpg" alt="胡子精酿 H.ZI Tap Room" />
            <p>七家店 · 七种性格 · 同一个胡子</p>
            <button onClick={() => goTo("cover")}>BACK TO TOP</button>
          </section>
        </main>
      </div>
    </div>
  );
}
