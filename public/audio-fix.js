(() => {
  const AUDIO_URL = "/brand/fresh-house.mp3";

  const install = () => {
    const audio = document.querySelector(".brand-app audio");
    const button = document.querySelector(".sound-toggle");
    if (!(audio instanceof HTMLAudioElement) || !(button instanceof HTMLElement)) return false;
    if (audio.dataset.hziAudioFixed === "1") return true;

    audio.dataset.hziAudioFixed = "1";
    audio.src = AUDIO_URL;
    audio.preload = "auto";
    audio.setAttribute("playsinline", "");
    audio.load();

    // The React app also listens on window.pointerdown for the first autoplay
    // attempt. Prevent a tap on the SOUND button from starting audio on
    // pointerdown and then immediately pausing it again on click.
    button.addEventListener("pointerdown", (event) => event.stopPropagation());
    button.addEventListener("touchstart", (event) => event.stopPropagation(), { passive: true });

    // If a browser suspends the media element while the page is backgrounded,
    // resume only when the UI still says SOUND ON and the user returns.
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && button.textContent?.includes("SOUND ON") && audio.paused) {
        void audio.play().catch(() => undefined);
      }
    });

    return true;
  };

  if (install()) return;
  const observer = new MutationObserver(() => {
    if (install()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
