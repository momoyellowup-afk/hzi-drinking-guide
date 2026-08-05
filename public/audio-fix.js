(() => {
  const AUDIO_URL = "/brand/young-house.wav";
  let installed = false;
  let wantsAudio = false;

  const getAudio = () => document.querySelector(".brand-app audio");
  const getButton = () => document.querySelector(".sound-toggle");

  const syncButton = () => {
    const audio = getAudio();
    const button = getButton();
    if (!(audio instanceof HTMLAudioElement) || !(button instanceof HTMLElement)) return;
    const span = button.querySelector("span");
    const isPlaying = !audio.paused && !audio.ended;
    button.setAttribute("aria-label", isPlaying ? "关闭背景音乐" : "播放背景音乐");
    if (span) span.textContent = isPlaying ? "SOUND ON" : "SOUND OFF";
  };

  const attemptPlay = () => {
    const audio = getAudio();
    if (!(audio instanceof HTMLAudioElement) || !audio.paused) return;
    wantsAudio = true;
    void audio.play().then(syncButton).catch(() => undefined);
  };

  const install = () => {
    const audio = getAudio();
    const button = getButton();
    const screen = document.querySelector(".app-screen");
    if (!(audio instanceof HTMLAudioElement) || !(button instanceof HTMLElement) || !(screen instanceof HTMLElement)) return false;
    if (installed) return true;
    installed = true;

    audio.src = AUDIO_URL;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.34;
    audio.setAttribute("playsinline", "");
    audio.load();

    audio.addEventListener("play", () => {
      wantsAudio = true;
      syncButton();
    });
    audio.addEventListener("pause", syncButton);

    ["touchstart", "pointerdown", "mousedown", "wheel"].forEach((type) => {
      screen.addEventListener(type, attemptPlay, { capture: true, passive: true });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".sound-toggle")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (audio.paused) attemptPlay();
      else {
        wantsAudio = false;
        audio.pause();
      }
    }, true);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && wantsAudio && audio.paused) attemptPlay();
    });

    syncButton();
    return true;
  };

  if (install()) return;
  const observer = new MutationObserver(() => {
    if (install()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
