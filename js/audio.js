/**
 * Web Audio API Retro Sound & Music Engine
 * Generates crisp 8-bit RPG sound effects and background melodies without external MP3 dependencies.
 */
const AudioEngine = (() => {
  let ctx = null;
  let enabled = true;
  let bgmVolume = 0.35;
  let sfxVolume = 0.7;
  let bgmTimer = null;
  let currentTrack = 'menu';

  /** Lazily initializes AudioContext after first user gesture */
  function ensureContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  /** Plays a single synthesized retro tone */
  function playTone(freq, duration = 0.12, type = 'square', volScale = 1, delay = 0) {
    if (!enabled) return;
    ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    const volume = Math.max(0.001, sfxVolume * volScale * 0.25);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  /** Named RPG Sound Effects */
  const sfx = {
    click() {
      playTone(660, 0.06, 'square', 0.6);
    },
    encounter() {
      [523, 659, 784, 1046].forEach((f, i) => playTone(f, 0.09, 'sawtooth', 0.8, i * 0.07));
    },
    attack() {
      playTone(320, 0.08, 'sawtooth', 0.9, 0);
      playTone(180, 0.14, 'square', 1.0, 0.06);
    },
    damage() {
      playTone(140, 0.18, 'sawtooth', 1.0, 0);
    },
    pokeball() {
      playTone(587, 0.1, 'triangle', 0.8, 0);
      playTone(784, 0.14, 'triangle', 0.8, 0.18);
    },
    catchSuccess() {
      [523, 659, 784, 1046].forEach((f, i) => playTone(f, 0.14, 'triangle', 1.0, i * 0.12));
    },
    levelUp() {
      [440, 554, 659, 880, 1108].forEach((f, i) => playTone(f, 0.12, 'square', 0.9, i * 0.09));
    },
    badge() {
      [523, 659, 784, 1046, 784, 1046].forEach((f, i) => playTone(f, 0.16, 'triangle', 1.0, i * 0.13));
    },
    heal() {
      [523, 659, 784, 659, 1046].forEach((f, i) => playTone(f, 0.13, 'sine', 0.9, i * 0.11));
    }
  };

  /** Lightweight Chiptune Background Loop */
  function startBGM(track = 'world') {
    currentTrack = track;
    stopBGM();
    if (!enabled) return;

    const melodies = {
      menu: [262, 330, 392, 523, 392, 330, 294, 349],
      world: [392, 440, 494, 523, 494, 440, 392, 330],
      battle: [220, 262, 247, 294, 262, 330, 311, 349],
      victory: [523, 659, 784, 1046, 784, 1046]
    };

    const notes = melodies[track] || melodies.world;
    let step = 0;

    bgmTimer = setInterval(() => {
      if (!enabled || bgmVolume <= 0.02) return;
      ensureContext();
      if (!ctx) return;
      const freq = notes[step % notes.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const vol = bgmVolume * 0.08;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
      step++;
    }, track === 'battle' ? 260 : 380);
  }

  function stopBGM() {
    if (bgmTimer) {
      clearInterval(bgmTimer);
      bgmTimer = null;
    }
  }

  function setSettings(opts) {
    if (typeof opts.enabled === 'boolean') enabled = opts.enabled;
    if (typeof opts.bgmVolume === 'number') bgmVolume = opts.bgmVolume;
    if (typeof opts.sfxVolume === 'number') sfxVolume = opts.sfxVolume;
    if (!enabled) stopBGM();
    else startBGM(currentTrack);
  }

  function getSettings() {
    return { enabled, bgmVolume, sfxVolume };
  }

  return { sfx, startBGM, stopBGM, setSettings, getSettings };
})();
