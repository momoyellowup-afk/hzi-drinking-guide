(() => {
  const PRIMARY = "/brand/fresh-house.mp3";
  const FALLBACK = "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/brand-soundtrack.m4a";
  let usingFallback = false;
  let playSucceeded = false;
  let pending = false;

  const getAudio = () => document.querySelector(".brand-app audio");
  const getButton = () => document.querySelector(".sound-toggle");

  const syncButton = () => {
    const audio = getAudio();
    const button = getButton();
    if (!audio || !button) return;
    const span = button.querySelector("span");
    const isPlaying = !audio.paused && !audio.ended;
    button.setAttribute("aria-label", isPlaying ? "关闭背景音乐" : "播放背景音乐");
    if (span) span.textContent = isPlaying ? "SOUND ON" : "SOUND OFF";
  };

  const configure = () => {
    const audio = getAudio();
    if (!audio) return null;
    if (audio.dataset.hziAudioReady !== "1") {
      audio.dataset.hziAudioReady = "1";
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.32;
      audio.src = PRIMARY;
      audio.addEventListener("play", () => {
        playSucceeded = true;
        pending = false;
        syncButton();
      });
      audio.addEventListener("pause", syncButton);
      audio.addEventListener("ended", syncButton);
      audio.addEventListener("error", () => {
        if (!usingFallback) switchToFallback(true);
      });
      audio.load();
    }
    return audio;
  };

  const switchToFallback = (tryImmediately = false) => {
    const audio = getAudio();
    if (!audio || usingFallback) return;
    usingFallback = true;
    pending = false;
    audio.src = FALLBACK;
    audio.load();
    if (tryImmediately) attemptPlay();
  };

  const attemptPlay = async () => {
    const audio = configure();
    if (!audio || pending || (!audio.paused && !audio.ended)) {
      syncButton();
      return;
    }
    pending = true;
    const fallbackTimer = window.setTimeout(() => {
      if (!playSucceeded && audio.paused && !usingFallback) switchToFallback(true);
    }, 2200);
    try {
      await audio.play();
      playSucceeded = true;
      pending = false;
      window.clearTimeout(fallbackTimer);
      syncButton();
    } catch (_) {
      pending = false;
      window.clearTimeout(fallbackTimer);
      if (!usingFallback) switchToFallback(true);
    }
  };

  const activation = (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(".sound-toggle")) return;
    attemptPlay();
  };

  ["touchstart", "pointerdown", "mousedown", "keydown", "wheel"].forEach((type) => {
    window.addEventListener(type, activation, { capture: true, passive: true });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest(".sound-toggle");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const audio = configure();
    if (!audio) return;
    if (audio.paused) attemptPlay();
    else {
      audio.pause();
      playSucceeded = false;
      syncButton();
    }
  }, true);

  const observer = new MutationObserver(() => {
    if (getAudio()) {
      configure();
      syncButton();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("DOMContentLoaded", () => {
    configure();
    syncButton();
  });
})();
