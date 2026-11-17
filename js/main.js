/**
 * Main Application Controller
 * Wires UI events, Dashboard, Team Manager, Pokémon Center, Champion League & Professor Bahasa.
 */
const Main = (() => {
  let selectedAvatar = '🧢';
  let selectedStarter = '1';

  function init() {
    renderStarterPreviews();
    refreshTitleScreen();
    bindGlobalEvents();
  }

  /** Renders starter SVG previews on the Title Screen */
  function renderStarterPreviews() {
    [1, 4, 7].forEach(id => {
      const box = document.getElementById(`starter-svg-${id}`);
      if (box) box.innerHTML = PokemonDB.getSpriteSVG(id);
    });
  }

  /** Checks LocalStorage for existing trainer progress */
  function refreshTitleScreen() {
    const saved = SaveSystem.loadRaw();
    const panel = document.getElementById('continue-panel');
    if (saved) {
      panel.classList.remove('hidden');
      document.getElementById('save-preview-avatar').textContent = saved.trainer.avatar || '🧢';
      document.getElementById('save-preview-name').textContent = saved.trainer.name;
      const badgeCount = Object.values(saved.badges || {}).filter(Boolean).length;
      document.getElementById('save-preview-meta').textContent =
        `Tahap ${saved.trainer.level} • ${badgeCount}/3 Lencana • ${saved.collection.length} Pokémon`;
    } else {
      panel.classList.add('hidden');
    }
  }

  function bindGlobalEvents() {
    // Avatar selection
    document.querySelectorAll('.avatar-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        AudioEngine.sfx.click();
        document.querySelectorAll('.avatar-opt').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedAvatar = btn.dataset.avatar;
      });
    });

    // Starter Pokémon selection
    document.querySelectorAll('.starter-choice').forEach(card => {
      card.addEventListener('click', () => {
        AudioEngine.sfx.click();
        document.querySelectorAll('.starter-choice').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedStarter = card.dataset.starter;
      });
    });

    // Start New Game
    document.getElementById('btn-start-new-game').addEventListener('click', () => {
      const nameInput = document.getElementById('input-trainer-name').value;
      GameState.initNewGame(nameInput, selectedAvatar, selectedStarter);
      AudioEngine.sfx.levelUp();
      AudioEngine.startBGM('world');
      Navigation.goTo('dashboard');
      showToast(`🎉 Selamat datang ke Wilayah Lingua, Pelatih ${GameState.get().trainer.name}!`);
    });

    // Continue Game
    document.getElementById('btn-continue-game').addEventListener('click', () => {
      if (SaveSystem.loadIntoGame()) {
        const s = GameState.get().settings;
        AudioEngine.setSettings(s);
        AudioEngine.sfx.click();
        AudioEngine.startBGM('world');
        Navigation.goTo('dashboard');
        showToast(`👋 Selamat kembali, Pelatih ${GameState.get().trainer.name}!`);
      }
    });

    // Reset Save
    document.getElementById('btn-reset-save').addEventListener('click', () => {
      if (confirm('Adakah anda pasti mahu memadam semua data kemajuan permainan?')) {
        SaveSystem.clearSave();
        refreshTitleScreen();
        showToast('🗑️ Data simpanan telah dipadam.');
      }
    });

    // Navigation data-nav delegation
    document.body.addEventListener('click', e => {
      const target = e.target.closest('[data-nav]');
      if (target) {
        AudioEngine.sfx.click();
        Navigation.goTo(target.dataset.nav);
      }
    });

    // Mobile drawer toggle
    document.getElementById('btn-menu-toggle').addEventListener('click', () => {
      document.getElementById('side-nav').classList.toggle('open');
    });
    document.getElementById('btn-close-nav').addEventListener('click', () => {
      document.getElementById('side-nav').classList.remove('open');
    });

    // Quick Save button
    document.getElementById('btn-quick-save').addEventListener('click', () => {
      SaveSystem.save();
      AudioEngine.sfx.click();
      showToast('💾 Kemajuan permainan berjaya disimpan!');
    });

    // Flee Battle button
    document.getElementById('btn-flee-battle').addEventListener('click', () => {
      AudioEngine.sfx.click();
      AudioEngine.startBGM('world');
      Navigation.goTo('adventure');
      showToast('🏃 Kamu berundur dari pertarungan.');
    });

    // Pokémon Center Heal All
    document.getElementById('btn-heal-all').addEventListener('click', () => {
      const state = GameState.get();
      state.collection.forEach(p => { p.hp = p.maxHp; });
      SaveSystem.save();
      AudioEngine.sfx.heal();
      document.getElementById('heal-status-msg').innerHTML =
        '<strong style="color:#15803d;">✨ Semua Pokémon dalam pasukan dan simpanan telah pulih 100% HP!</strong>';
      showToast('💖 Semua Pokémon telah dipulihkan sepenuhnya!');
    });

    // Audio modal & title toggle
    document.getElementById('btn-audio-modal').addEventListener('click', () => {
      document.getElementById('audio-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-audio').addEventListener('click', () => {
      document.getElementById('audio-modal').classList.add('hidden');
    });
    document.getElementById('btn-title-audio').addEventListener('click', () => {
      const cur = AudioEngine.getSettings().enabled;
      AudioEngine.setSettings({ enabled: !cur });
      document.getElementById('btn-title-audio').textContent = `🔊 Bunyi: ${!cur ? 'HIDUP' : 'SENYAP'}`;
    });

    document.getElementById('chk-audio-enabled').addEventListener('change', e => {
      AudioEngine.setSettings({ enabled: e.target.checked });
      GameState.get().settings.enabled = e.target.checked;
      SaveSystem.save();
    });
    document.getElementById('rng-bgm-vol').addEventListener('input', e => {
      const val = Number(e.target.value) / 100;
      AudioEngine.setSettings({ bgmVolume: val });
      GameState.get().settings.bgmVolume = val;
      SaveSystem.save();
    });
    document.getElementById('rng-sfx-vol').addEventListener('input', e => {
      const val = Number(e.target.value) / 100;
      AudioEngine.setSettings({ sfxVolume: val });
      GameState.get().settings.sfxVolume = val;
      SaveSystem.save();
    });

    // Professor Bahasa Word Analyzer
    document.getElementById('btn-prof-analyze').addEventListener('click', () => {
      const word = document.getElementById('prof-word-input').value.trim();
      if (!word) return;
      analyzeCustomWord(word);
      document.getElementById('prof-word-input').value = '';
    });
  }

  function refreshHUD() {
    const state = GameState.get();
    document.getElementById('hud-avatar').textContent = state.trainer.avatar;
    document.getElementById('hud-trainer-name').textContent = state.trainer.name;
    document.getElementById('hud-trainer-level').textContent = state.trainer.level;
    document.getElementById('hud-xp-text').textContent = `${state.trainer.xp}/${state.trainer.nextXp} XP`;
    document.getElementById('hud-coins').textContent = state.trainer.coins;
    document.getElementById('hud-badges').textContent = `${Badges.countEarned()}/3`;
    document.getElementById('hud-caught').textContent = `${state.caughtSpecies.length}/15`;
  }

  function renderDashboard() {
    const state = GameState.get();
    const badgeCount = Badges.countEarned();

    document.getElementById('dash-avatar').textContent = state.trainer.avatar;
    document.getElementById('dash-name').textContent = state.trainer.name;
    document.getElementById('dash-id').textContent = state.trainer.id;
    document.getElementById('dash-rank').textContent =
      state.trainer.isChampion ? '👑 POKÉMON LANGUAGE MASTER' :
      badgeCount === 3 ? '⭐ PENCABAR LIGA JUARA' :
      badgeCount >= 1 ? '🏅 PELATIH BERLENCANA' : '🧢 PELATIH PEMULA';

    document.getElementById('dash-level').textContent = state.trainer.level;
    document.getElementById('dash-xp').textContent = `${state.trainer.xp} / ${state.trainer.nextXp} XP`;
    const xpPct = Math.min(100, Math.round((state.trainer.xp / state.trainer.nextXp) * 100));
    document.getElementById('dash-xp-fill').style.width = `${xpPct}%`;

    document.getElementById('dash-coins').textContent = state.trainer.coins;
    document.getElementById('dash-pokemon-count').textContent = state.collection.length;
    document.getElementById('dash-badge-count').textContent = `${badgeCount} / 3`;

    const masteryPct = Math.min(100, Math.round((state.answeredIds.length / 45) * 100));
    document.getElementById('dash-mastery').textContent = `${masteryPct}%`;

    // Badges row
    document.getElementById('dash-badges-row').innerHTML = Badges.GYMS.map(g => {
      const earned = state.badges[g.region];
      return `<div class="badge-slot ${earned ? 'earned' : ''}">${g.badgeIcon} ${g.badgeName}</div>`;
    }).join('');

    // Active Team preview
    document.getElementById('dash-active-team').innerHTML = state.team.map((p, idx) => `
      <div class="mini-poke-pill ${idx === 0 ? 'lead' : ''}">
        <div style="width:52px;height:52px;margin:0 auto;">${PokemonDB.getSpriteSVG(p.speciesId)}</div>
        <strong>${p.name}</strong>
        <div>Lv.${p.level} • ${p.hp}/${p.maxHp} HP</div>
      </div>
    `).join('');

    // KSSR Topic Mission Progress
    ['region1', 'region2', 'region3'].forEach((rk, i) => {
      const done = Object.values(state.missions[rk]).filter(Boolean).length;
      document.getElementById(`prog-r${i + 1}-text`).textContent = `${done} / 5 Misi`;
      document.getElementById(`prog-r${i + 1}-bar`).style.width = `${(done / 5) * 100}%`;
    });
  }

  function renderWorldMap() {
    const state = GameState.get();
    const earned = Badges.countEarned();
    ['region1', 'region2', 'region3'].forEach((rk, idx) => {
      const statusEl = document.getElementById(`map-status-r${idx + 1}`);
      if (state.badges[rk]) {
        statusEl.textContent = '🏅 LENCANA DIMILIKI';
        statusEl.style.background = '#fef08a';
      } else {
        statusEl.textContent = '✅ TERBUKA UNTUK MISI';
      }
    });

    const champStatus = document.getElementById('map-status-champ');
    const champBtn = document.getElementById('btn-enter-champion');
    if (earned >= 3) {
      champStatus.textContent = '👑 TERBUKA! CABAR SEKARANG';
      champStatus.style.background = '#dcfce7';
      champBtn.disabled = false;
    } else {
      champStatus.textContent = `🔒 Perlukan 3 Lencana (${earned}/3)`;
      champBtn.disabled = false; // Allow viewing instructions inside Champion screen
    }
  }

  /** Team & Collection Management Screen */
  function renderTeamScreen() {
    const state = GameState.get();
    document.getElementById('active-team-count').textContent = state.team.length;

    document.getElementById('active-team-grid').innerHTML = state.team.map((p, idx) => `
      <div class="poke-card ${idx === 0 ? 'lead-card' : ''}">
        ${idx === 0 ? '<span class="rank-pill">⭐ POKÉMON UTAMA</span>' : ''}
        <div class="poke-sprite-wrap">${PokemonDB.getSpriteSVG(p.speciesId)}</div>
        <h4>${p.name} (Lv.${p.level})</h4>
        <span class="type-pill">${p.type}</span>
        <div>HP: <strong>${p.hp}/${p.maxHp}</strong> • Serangan: <strong>${p.attack}</strong></div>
        <div style="font-size:0.8rem;color:#475569;">XP: ${p.xp}/${p.nextXp}</div>
        <div class="poke-card-actions">
          ${idx !== 0 ? `<button class="pixel-btn btn-small btn-yellow" onclick="Main.setLeadPokemon('${p.uid}')">Jadikan Utama</button>` : ''}
          ${state.team.length > 1 ? `<button class="pixel-btn btn-small" onclick="Main.removeFromTeam('${p.uid}')">Simpan ke Kotak</button>` : ''}
        </div>
      </div>
    `).join('');

    document.getElementById('storage-pokemon-grid').innerHTML = state.collection.map(p => {
      const inTeam = state.team.some(tp => tp.uid === p.uid);
      return `
        <div class="poke-card">
          <div class="poke-sprite-wrap">${PokemonDB.getSpriteSVG(p.speciesId)}</div>
          <h4>${p.name} (Lv.${p.level})</h4>
          <span class="type-pill">${p.type}</span>
          <div>HP: ${p.hp}/${p.maxHp}</div>
          <div class="poke-card-actions">
            ${inTeam
              ? '<span class="type-pill" style="background:#dcfce7;">Dalam Pasukan Aktif</span>'
              : `<button class="pixel-btn btn-small btn-green" onclick="Main.addToTeam('${p.uid}')">+ Masukkan Pasukan</button>`
            }
          </div>
        </div>
      `;
    }).join('');
  }

  function setLeadPokemon(uid) {
    const state = GameState.get();
    const idx = state.team.findIndex(p => p.uid === uid);
    if (idx > 0) {
      const [chosen] = state.team.splice(idx, 1);
      state.team.unshift(chosen);
      SaveSystem.save();
      renderTeamScreen();
      showToast(`⭐ ${chosen.name} kini menjadi Pokémon Utama!`);
    }
  }

  function removeFromTeam(uid) {
    const state = GameState.get();
    if (state.team.length <= 1) return;
    state.team = state.team.filter(p => p.uid !== uid);
    SaveSystem.save();
    renderTeamScreen();
  }

  function addToTeam(uid) {
    const state = GameState.get();
    if (state.team.length >= 6) {
      showToast('⚠️ Pasukan aktif sudah penuh (maksimum 6 Pokémon)!');
      return;
    }
    const poke = state.collection.find(p => p.uid === uid);
    if (poke && !state.team.some(tp => tp.uid === uid)) {
      state.team.push(poke);
      SaveSystem.save();
      renderTeamScreen();
      showToast(`✅ ${poke.name} menyertai pasukan aktif!`);
    }
  }

  /** Pokémon Center Mistake Review */
  function renderPokemonCenter() {
    const state = GameState.get();
    document.getElementById('mistake-count').textContent = state.mistakes.length;
    const list = document.getElementById('mistakes-review-list');

    if (state.mistakes.length === 0) {
      list.innerHTML = '<p style="color:#15803d;font-weight:800;">🎉 Hebat! Tiada rekod kesilapan yang belum diulang kaji.</p>';
      return;
    }

    list.innerHTML = state.mistakes.map(q => `
      <div class="mistake-item">
        <span class="q-tag">${q.topic}</span>
        <p style="font-weight:800;margin:6px 0;">${q.prompt}</p>
        <p style="font-size:0.86rem;color:#15803d;"><strong>Jawapan Tepat:</strong> ${q.options[q.answer]}</p>
        <p style="font-size:0.84rem;">${q.explanation}</p>
        <button class="pixel-btn btn-small btn-blue mt-12" onclick="Main.markReviewed('${q.id}')">
          ✅ Saya Sudah Faham (+10 XP)
        </button>
      </div>
    `).join('');
  }

  function markReviewed(qId) {
    const state = GameState.get();
    state.mistakes = state.mistakes.filter(m => m.id !== qId);
    GameState.addTrainerXp(10);
    SaveSystem.save();
    AudioEngine.sfx.heal();
    renderPokemonCenter();
    refreshHUD();
    showToast('📖 Bagus! Pemahaman tatabahasa dikukuhkan (+10 XP).');
  }

  /** Champion League & Final Examination */
  function renderChampionScreen() {
    const state = GameState.get();
    const earned = Badges.countEarned();
    const box = document.getElementById('champion-content');

    if (earned < 3) {
      box.innerHTML = `
        <div class="text-center">
          <div style="font-size:3rem;">🔒🏰</div>
          <h3>Pintu Gerbang Liga Juara Masih Berkunci</h3>
          <p class="mt-12">Kamu perlu mengumpul kesemua <strong>3 Lencana Gym Wilayah</strong> (Nature, Knowledge & Mastery Badge) sebelum menentang Bos Team Rocket dan Juara Bahasa!</p>
          <p class="mt-12">Lencana Semasa: <strong>${earned} / 3</strong></p>
          <button class="pixel-btn btn-yellow mt-12" data-nav="map">🗺️ Kembali ke Peta Dunia</button>
        </div>
      `;
      return;
    }

    box.innerHTML = `
      <div class="text-center">
        <div style="font-size:3.2rem;">👑🏆⚔️</div>
        <h3>${state.trainer.isChampion ? 'TAHNIAH, POKÉMON LANGUAGE MASTER!' : 'DEWAN UTAMA LIGA JUARA LINGUA'}</h3>
        <p class="mt-12">Semua 3 lencana telah dikumpulkan! Selesaikan dua cabaran terakhir untuk memulihkan Pokédex Bahasa sepenuhnya dan meraih gelaran <strong>POKÉMON LANGUAGE MASTER</strong>:</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin:18px 0;text-align:left;">
          <div class="mode-card">
            <h4>1. Pertarungan Bos Team Rocket</h4>
            <p>Rampas semula cakera data Pokédex Bahasa daripada Ketua Team Rocket (2 Pokémon)!</p>
            <button class="pixel-btn btn-red btn-block" onclick="Main.startRocketBoss()">Lawan Bos Team Rocket</button>
          </div>
          <div class="mode-card mode-gym">
            <h4>2. Peperiksaan Akhir: Juara Bahasa</h4>
            <p>Ujian komprehensif Kata Berimbuhan, Kata Majmuk & Kata Ganda menentang Juara Wilayah Lingua (3 Pokémon)!</p>
            <button class="pixel-btn btn-purple btn-block" onclick="Main.startChampionBattle()">Cabar Juara Bahasa!</button>
          </div>
        </div>
      </div>
    `;
  }

  function startRocketBoss() {
    Battle.start({
      type: 'rocket',
      region: 'champion',
      questionPool: 'champion',
      trainerTitle: 'Bos Team Rocket Giovanni',
      enemySpeciesId: 11,
      enemyLevel: 11,
      roster: [
        { speciesId: 11, level: 11 },
        { speciesId: 13, level: 12 }
      ],
      onWin: () => {
        showToast('🎉 Data Pokédex Bahasa berjaya dirampas semula daripada Team Rocket!');
      }
    });
  }

  function startChampionBattle() {
    Battle.start({
      type: 'champion',
      region: 'champion',
      questionPool: 'champion',
      trainerTitle: 'Juara Bahasa Agung Lingua',
      enemySpeciesId: 3,
      enemyLevel: 13,
      roster: [
        { speciesId: 3, level: 13 },
        { speciesId: 6, level: 14 },
        { speciesId: 9, level: 15 }
      ],
      onWin: () => {
        const state = GameState.get();
        state.trainer.isChampion = true;
        GameState.unlockAchievement('language_champion');
        AudioEngine.sfx.badge();
        showToast('👑 SYABAS! Kamu kini bergelar POKÉMON LANGUAGE MASTER!');
      }
    });
  }

  /** Built-in Rule-Based Professor Bahasa Assistant */
  function askProfessor(topic) {
    AudioEngine.sfx.click();
    const responses = {
      imbuhan: '<strong>Kata Berimbuhan</strong> ialah kata dasar yang menerima imbuhan: <br/>1) <em>Awalan</em> di hadapan (cth: <strong>ber</strong>main, <strong>mem</strong>baca)<br/>2) <em>Akhiran</em> di belakang (cth: makan<strong>an</strong>, tulis<strong>an</strong>)<br/>3) <em>Apitan</em> di depan & belakang serentak (cth: <strong>per</strong>main<strong>an</strong>, <strong>ke</strong>bersih<strong>an</strong>).',
      majmuk: '<strong>Kata Majmuk</strong> menggabungkan dua kata dasar:<br/>• <em>Kata Majmuk Bebas</em> dieja <strong>terpisah</strong> (cth: kereta api, meja makan, alat tulis).<br/>• <em>Kata Majmuk Mantap</em> dieja <strong>rapat</strong> sebagai satu kata (cth: matahari, kerjasama, tandatangan, antarabangsa, olahraga).',
      ganda: '<strong>Kata Ganda</strong> ialah proses menggandakan kata dasar:<br/>• <em>Kata Ganda Penuh</em> menggandakan seluruh kata dengan tanda sempang (cth: buku-buku, kanak-kanak).<br/>• <em>Kata Ganda Separa</em> menggandakan suku kata pertama dengan vokal "e" (cth: pepohon, lelaki, tetamu, dedaun).',
      tips: '<strong>Tips Juara:</strong> Baca keseluruhan ayat dahulu! Perhatikan sama ada ayat memerlukan kata kerja (<em>membaca, menjalankan</em>), kata nama (<em>makanan, kebersihan</em>), kata majmuk mantap (dieja rapat), atau kata ganda tanpa angka 2!'
    };
    appendProfMessage(responses[topic] || responses.tips);
  }

  function analyzeCustomWord(rawWord) {
    AudioEngine.sfx.click();
    const w = rawWord.toLowerCase();
    const mantapList = ['matahari', 'kerjasama', 'tandatangan', 'tanggungjawab', 'antarabangsa', 'olahraga', 'kakitangan', 'warganegara', 'sukarela', 'pesuruhjaya', 'setiausaha', 'bumiputera', 'suruhanjaya', 'beritahu', 'dukacita'];
    const separaList = ['pepohon', 'lelaki', 'tetamu', 'dedaun', 'bebola', 'kekuda', 'tetikus', 'jejari', 'lelangit', 'kekunci', 'lelabah'];

    let reply = '';
    if (w.includes('-')) {
      reply = `Perkataan <strong>"${rawWord}"</strong> menggunakan tanda sempang (-), maka ia tergolong dalam <strong>Kata Ganda Penuh</strong> (jika kata dasarnya diulang sepenuhnya).`;
    } else if (separaList.includes(w)) {
      reply = `Perkataan <strong>"${rawWord}"</strong> ialah <strong>Kata Ganda Separa</strong>! Suku kata pertamanya digandakan dengan vokal lemah "e".`;
    } else if (mantapList.includes(w)) {
      reply = `Perkataan <strong>"${rawWord}"</strong> ialah <strong>Kata Majmuk Mantap</strong>! Ia wajib dieja rapat sebagai satu perkataan.`;
    } else if (w.includes(' ')) {
      reply = `Gabungan <strong>"${rawWord}"</strong> dieja terpisah dan membawa makna khusus, menjadikannya <strong>Kata Majmuk Bebas</strong>.`;
    } else if (/^(per|ke|me|mem|men|meng|meny|pe|pem|pen|peng|peny).+(an|kan|i)$/.test(w)) {
      reply = `Perkataan <strong>"${rawWord}"</strong> mempunyai imbuhan di awal dan di akhir serentak — ini ialah <strong>Kata Berimbuhan Apitan</strong>!`;
    } else if (/^(ber|ter|di|me|mem|men|meng|meny|pe|pem|pen|peng|peny|se)/.test(w)) {
      reply = `Perkataan <strong>"${rawWord}"</strong> bermula dengan imbuhan di hadapan kata dasar — ini ialah <strong>Kata Berimbuhan Awalan</strong>!`;
    } else if (/(an|kan|i)$/.test(w) && w.length > 4) {
      reply = `Perkataan <strong>"${rawWord}"</strong> menerima imbuhan di hujung kata dasar — ini ialah <strong>Kata Berimbuhan Akhiran</strong>!`;
    } else {
      reply = `Perkataan <strong>"${rawWord}"</strong> kelihatan seperti <strong>Kata Dasar</strong> tunggal. Cuba tambah imbuhan seperti <em>ber-</em>, <em>-an</em>, atau <em>ke-...-an</em>!`;
    }

    appendProfMessage(`Analisis kata <em>"${rawWord}"</em>: ${reply}`);
  }

  function appendProfMessage(html) {
    const win = document.getElementById('prof-chat-window');
    const div = document.createElement('div');
    div.className = 'prof-msg';
    div.innerHTML = `<strong>Profesor Bahasa:</strong> ${html}`;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
  }

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }, 3200);
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    refreshHUD,
    refreshTitleScreen,
    renderDashboard,
    renderWorldMap,
    renderTeamScreen,
    setLeadPokemon,
    removeFromTeam,
    addToTeam,
    renderPokemonCenter,
    markReviewed,
    renderChampionScreen,
    startRocketBoss,
    startChampionBattle,
    askProfessor,
    showToast
  };
})();
