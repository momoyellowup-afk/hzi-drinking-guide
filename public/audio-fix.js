(() => {
  const PRIMARY_AUDIO_URL = "/brand/fresh-house.mp3";
  const FALLBACK_AUDIO_URL = "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/brand-soundtrack.m4a";
  let installed = false;
  let usingFallback = false;
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

  const switchToFallback = () => {
    const audio = getAudio();
    if (!(audio instanceof HTMLAudioElement) || usingFallback) return;
    usingFallback = true;
    const wasTryingToPlay = wantsAudio;
    audio.src = FALLBACK_AUDIO_URL;
    audio.load();
    if (wasTryingToPlay) {
      void audio.play().then(syncButton).catch(() => undefined);
    }
  };

  const attemptPlay = () => {
    const audio = getAudio();
    if (!(audio instanceof HTMLAudioElement) || !audio.paused) return;
    wantsAudio = true;
    audio.play().then(syncButton).catch(() => {
      if (!usingFallback) switchToFallback();
    });
  };

  const install = () => {
    const audio = getAudio();
    const button = getButton();
    if (!(audio instanceof HTMLAudioElement) || !(button instanceof HTMLElement)) return false;
    if (installed) return true;
    installed = true;

    audio.src = PRIMARY_AUDIO_URL;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.32;
    audio.setAttribute("playsinline", "");
    audio.load();

    const slowLoadFallback = window.setTimeout(() => {
      if (!usingFallback && audio.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) switchToFallback();
    }, 2600);

    audio.addEventListener("loadeddata", () => window.clearTimeout(slowLoadFallback), { once: true });
    audio.addEventListener("error", () => switchToFallback());
    audio.addEventListener("play", () => {
      wantsAudio = true;
      syncButton();
    });
    audio.addEventListener("pause", syncButton);

    ["touchstart", "pointerdown", "mousedown", "keydown", "wheel"].forEach((type) => {
      window.addEventListener(type, (event) => {
        const target = event.target;
        if (target instanceof Element && target.closest(".sound-toggle")) return;
        attemptPlay();
      }, { capture: true, passive: true });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".sound-toggle")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (audio.paused) {
        wantsAudio = true;
        attemptPlay();
      } else {
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
