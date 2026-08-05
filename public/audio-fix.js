(() => {
  const AUDIO_URL = "https://6a71df349114394d792ef2ba--hzi-drinking-guide.netlify.app/brand/brand-soundtrack.m4a";
  let installed = false;
  let playing = false;

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
    audio.play().then(() => {
      playing = true;
      syncButton();
    }).catch(() => {
      // Keep all gesture listeners installed and retry on the next user gesture.
      playing = false;
    });
  };

  const install = () => {
    const audio = getAudio();
    const button = getButton();
    if (!(audio instanceof HTMLAudioElement) || !(button instanceof HTMLElement)) return false;
    if (installed) return true;
    installed = true;

    audio.src = AUDIO_URL;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.32;
    audio.setAttribute("playsinline", "");
    audio.load();

    audio.addEventListener("play", () => {
      playing = true;
      syncButton();
    });
    audio.addEventListener("pause", () => {
      playing = false;
      syncButton();
    });

    // A swipe starts with touchstart/pointerdown, so playback is requested
    // inside the user's first gesture just like the original working version.
    ["touchstart", "pointerdown", "mousedown", "keydown", "wheel"].forEach((type) => {
      window.addEventListener(type, (event) => {
        const target = event.target;
        if (target instanceof Element && target.closest(".sound-toggle")) return;
        attemptPlay();
      }, { capture: true, passive: true });
    });

    // Own the SOUND button so the React window pointerdown handler cannot
    // start playback and then have the same tap immediately pause it again.
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".sound-toggle")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (audio.paused) attemptPlay();
      else audio.pause();
    }, true);

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && playing && audio.paused) attemptPlay();
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
