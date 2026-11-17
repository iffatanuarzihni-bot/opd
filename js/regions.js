/**
 * Lingua Region Explorer & Multiple Gameplay Modes
 * Handles Grassland Forest, Metro City, Mountain Cave, Catching Challenges, Word Puzzles & Item Hunts.
 */
const Regions = (() => {
  const DATA = {
    region1: {
      id: 'region1',
      tag: 'WILAYAH 01 • KATA BERIMBUHAN',
      title: 'GRASSLAND FOREST',
      desc: 'Kuasai Kata Berawalan, Berakhiran, dan Berapitan untuk mencabar Ketua Gym Flora!',
      leader: 'Ketua Gym Flora',
      badgeName: 'Nature Badge',
      wildSpecies: [1, 10, 11],
      gymSpecies: 3,
      notes: `
        <p><strong>1. Awalan:</strong> Imbuhan di hadapan kata dasar (<em>bermain, membaca, disapu</em>).</p>
        <p><strong>2. Akhiran:</strong> Imbuhan di akhir kata dasar (<em>makanan, tulisan, padamkan</em>).</p>
        <p><strong>3. Apitan:</strong> Imbuhan di hadapan & belakang serentak (<em>permainan, kebersihan</em>).</p>
      `
    },
    region2: {
      id: 'region2',
      tag: 'WILAYAH 02 • KATA MAJMUK',
      title: 'METRO CITY',
      desc: 'Bezakan Kata Majmuk Bebas dan Kata Majmuk Mantap untuk menewaskan Ketua Gym Volt!',
      leader: 'Ketua Gym Volt',
      badgeName: 'Knowledge Badge',
      wildSpecies: [4, 12, 13],
      gymSpecies: 6,
      notes: `
        <p><strong>1. Kata Majmuk Bebas:</strong> Dua perkataan dieja terpisah (<em>kereta api, meja makan, alat tulis</em>).</p>
        <p><strong>2. Kata Majmuk Mantap:</strong> Dieja rapat sebagai satu kata (<em>matahari, kerjasama, tandatangan, antarabangsa</em>).</p>
      `
    },
    region3: {
      id: 'region3',
      tag: 'WILAYAH 03 • KATA GANDA',
      title: 'MOUNTAIN CAVE',
      desc: 'Kenal pasti Kata Ganda Penuh dan Kata Ganda Separa untuk meraih lencana daripada Ketua Gym Rocky!',
      leader: 'Ketua Gym Rocky',
      badgeName: 'Mastery Badge',
      wildSpecies: [7, 14, 15],
      gymSpecies: 9,
      notes: `
        <p><strong>1. Kata Ganda Penuh:</strong> Menggandakan seluruh kata dasar dengan tanda sempang (<em>buku-buku, kanak-kanak</em>).</p>
        <p><strong>2. Kata Ganda Separa:</strong> Menggandakan sebahagian kata dasar (<em>pepohon, lelaki, tetamu, dedaun</em>).</p>
      `
    }
  };

  let puzzleAnswer = [];
  let currentPuzzle = null;

  function selectRegion(regionKey) {
    const state = GameState.get();
    state.currentRegion = regionKey;
    SaveSystem.save();
    Navigation.goTo('adventure');
    renderAdventure();
  }

  function renderAdventure() {
    const state = GameState.get();
    const rKey = state.currentRegion || 'region1';
    const info = DATA[rKey];

    const banner = document.getElementById('adventure-banner');
    banner.className = `adventure-banner theme-${rKey}`;
    document.getElementById('adv-region-tag').textContent = info.tag;
    document.getElementById('adv-region-title').textContent = info.title;
    document.getElementById('adv-region-desc').textContent = info.desc;
    document.getElementById('adv-gym-leader-name').textContent = `6. Cabaran Gym: ${info.leader}`;
    document.getElementById('region-grammar-notes').innerHTML = info.notes;

    const m = state.missions[rKey];
    const missionLabels = [
      { key: 'wild', label: 'Kalahkan Pokémon Liar Wilayah' },
      { key: 'catch', label: 'Tangkap Pokémon Wilayah' },
      { key: 'puzzle', label: 'Selesaikan Teka-Teki Kata' },
      { key: 'hunt', label: 'Teroka & Temui Item Tersembunyi' },
      { key: 'trainer', label: 'Tewaskan Pelatih Akademi Wilayah' }
    ];

    document.getElementById('region-missions-list').innerHTML = missionLabels.map(item => `
      <li class="${m[item.key] ? 'done' : ''}">
        <span>${m[item.key] ? '✅' : '⬜'} ${item.label}</span>
        <span>${m[item.key] ? 'Selesai' : '+30 XP'}</span>
      </li>
    `).join('');

    const completedCount = Object.values(m).filter(Boolean).length;
    const gymBtn = document.getElementById('btn-adv-gym-challenge');
    if (completedCount >= 3 || state.badges[rKey]) {
      gymBtn.disabled = false;
      document.getElementById('adv-gym-req').textContent = `Syarat dipenuhi (${completedCount}/5 misi)! Sedia mencabar ${info.leader}.`;
    } else {
      gymBtn.disabled = true;
      document.getElementById('adv-gym-req').textContent = `Selesaikan sekurang-kurangnya 3 misi wilayah (${completedCount}/3 selesai).`;
    }

    document.getElementById('activity-stage').classList.add('hidden');
  }

  /** Mode 1: Wild Pokémon Encounter */
  function startWildBattle() {
    const rKey = GameState.get().currentRegion;
    const info = DATA[rKey];
    const spId = info.wildSpecies[Math.floor(Math.random() * info.wildSpecies.length)];
    Battle.start({
      type: 'wild',
      region: rKey,
      questionPool: rKey,
      trainerTitle: 'Pokémon Liar',
      enemySpeciesId: spId,
      enemyLevel: rKey === 'region1' ? 4 : rKey === 'region2' ? 7 : 10,
      missionKey: 'wild'
    });
  }

  /** Mode 2: Dedicated Catching Challenge */
  function startCatchingChallenge() {
    AudioEngine.sfx.encounter();
    const rKey = GameState.get().currentRegion;
    const info = DATA[rKey];
    const spId = info.wildSpecies[Math.floor(Math.random() * info.wildSpecies.length)];
    const sp = PokemonDB.SPECIES[spId];
    const q = QuestionBank.getRandomQuestion(rKey, GameState.get().answeredIds);

    GameState.registerSpecies(spId, false);
    const stage = document.getElementById('activity-stage');
    stage.classList.remove('hidden');
    stage.scrollIntoView({ behavior: 'smooth' });

    stage.innerHTML = `
      <h3>🔴 Cabaran Menangkap Pokémon: ${sp.name} Muncul!</h3>
      <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin:12px 0;">
        <div style="width:110px;height:110px;" class="anim-idle">${PokemonDB.getSpriteSVG(spId)}</div>
        <div style="flex:1;min-width:240px;">
          <span class="q-tag">${q.topic}</span>
          <p style="font-weight:800;font-size:1.05rem;margin:8px 0;">${q.prompt}</p>
          <div class="bq-options-grid">
            ${q.options.map((opt, idx) => `
              <button class="option-btn" onclick="Regions.resolveCatchChallenge(${spId}, '${q.id}', ${idx})">
                ${['A', 'B', 'C', 'D'][idx]}. ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function resolveCatchChallenge(spId, qId, chosenIdx) {
    const rKey = GameState.get().currentRegion;
    const q = QuestionBank[rKey].find(item => item.id === qId);
    const sp = PokemonDB.SPECIES[spId];
    const stage = document.getElementById('activity-stage');
    const isCorrect = chosenIdx === q.answer;
    GameState.recordLearning(q, isCorrect);

    if (isCorrect) {
      AudioEngine.sfx.catchSuccess();
      const caughtPoke = PokemonDB.createInstance(spId, rKey === 'region1' ? 4 : rKey === 'region2' ? 7 : 9);
      GameState.addPokemon(caughtPoke);
      GameState.completeMission(rKey, 'catch');
      renderAdventure();
      stage.classList.remove('hidden');
      stage.innerHTML = `
        <div class="text-center">
          <div class="anim-pokeball">🔴</div>
          <h3 style="color:#15803d;">🎉 BERJAYA! ${sp.name} telah ditangkap dan dimasukkan ke dalam koleksi!</h3>
          <p style="margin:8px 0;"><strong>Penjelasan:</strong> ${q.explanation}</p>
          <button class="pixel-btn btn-green" onclick="Regions.startCatchingChallenge()">Tangkap Pokémon Lain</button>
        </div>
      `;
    } else {
      AudioEngine.sfx.damage();
      stage.innerHTML = `
        <h3>💡 Hampir Berjaya! ${sp.name} belum masuk ke dalam Poké Ball.</h3>
        <p style="margin:8px 0;">Jawapan tepat ialah <strong>"${q.options[q.answer]}"</strong>. ${q.explanation}</p>
        <p><em>Contoh: "${q.example}"</em></p>
        <button class="pixel-btn btn-yellow mt-12" onclick="Regions.startCatchingChallenge()">Cuba Tangkap Semula →</button>
      `;
    }
    SaveSystem.save();
    Main.refreshHUD();
  }

  /** Mode 3: Interactive Word Building Puzzle */
  function startPuzzleMode() {
    AudioEngine.sfx.click();
    const rKey = GameState.get().currentRegion;
    const list = QuestionBank.puzzles[rKey];
    currentPuzzle = list[Math.floor(Math.random() * list.length)];
    puzzleAnswer = [];

    const stage = document.getElementById('activity-stage');
    stage.classList.remove('hidden');
    stage.scrollIntoView({ behavior: 'smooth' });
    renderPuzzleStage();
  }

  function renderPuzzleStage() {
    const stage = document.getElementById('activity-stage');
    const builtWord = puzzleAnswer.join('');
    stage.innerHTML = `
      <h3>🧩 Teka-Teki Pembentukan Kata</h3>
      <p style="font-weight:800;margin:8px 0;">${currentPuzzle.instruction}</p>
      <p class="small-muted">💡 Petunjuk: ${currentPuzzle.hint}</p>

      <div class="rpg-box" style="margin:12px 0;font-size:1.3rem;font-weight:900;letter-spacing:1px;color:#1d4ed8;">
        Kata Dibina: ${builtWord || '(Klik kepingan kata di bawah)'}
      </div>

      <div class="puzzle-tiles">
        ${currentPuzzle.tiles.map((t, i) => `
          <button class="tile-btn" onclick="Regions.addPuzzleTile('${t}')">${t}</button>
        `).join('')}
      </div>

      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="pixel-btn btn-green" onclick="Regions.checkPuzzle()">✅ Semak Jawapan</button>
        <button class="pixel-btn btn-red" onclick="Regions.resetPuzzleTiles()">🔄 Padam Susunan</button>
      </div>
    `;
  }

  function addPuzzleTile(tile) {
    AudioEngine.sfx.click();
    puzzleAnswer.push(tile);
    renderPuzzleStage();
  }

  function resetPuzzleTiles() {
    puzzleAnswer = [];
    renderPuzzleStage();
  }

  function checkPuzzle() {
    const rKey = GameState.get().currentRegion;
    const attempt = puzzleAnswer.join('').toLowerCase().trim();
    const stage = document.getElementById('activity-stage');

    if (attempt === currentPuzzle.target.toLowerCase()) {
      AudioEngine.sfx.levelUp();
      GameState.get().stats.puzzlesSolved += 1;
      GameState.completeMission(rKey, 'puzzle');
      renderAdventure();
      stage.classList.remove('hidden');
      stage.innerHTML = `
        <h3 style="color:#15803d;">🎉 TEKA-TEKI SELESAI! Kata "${currentPuzzle.target}" dibentuk dengan tepat!</h3>
        <p class="mt-12">Kamu menerima ganjaran +30 XP dan +40 Poké Coins!</p>
        <button class="pixel-btn btn-blue mt-12" onclick="Regions.startPuzzleMode()">Teka-Teki Seterusnya →</button>
      `;
    } else {
      AudioEngine.sfx.damage();
      Main.showToast(`❌ Susunan "${attempt}" belum tepat. Cuba padam dan susun semula!`);
    }
    Main.refreshHUD();
  }

  /** Mode 4: Hidden Grammar Item Hunt */
  function startItemHunt() {
    AudioEngine.sfx.click();
    const rKey = GameState.get().currentRegion;
    const spots = [
      { label: '🌳 Semak Samun', reward: 'coins', val: 45, text: 'Menjumpai 45 Poké Coins tersembunyi!' },
      { label: '🪨 Batu Berlumut', reward: 'pokeball', val: 1, text: 'Menjumpai 1x Poké Ball!' },
      { label: '📜 Peti Skrol Lama', reward: 'scroll', val: 1, text: 'Menjumpai Skrol Tatabahasa Rahsia Wilayah!' },
      { label: '🌼 Rumpun Bunga', reward: 'potion', val: 1, text: 'Menjumpai 1x Potion Pemulih!' }
    ];

    const stage = document.getElementById('activity-stage');
    stage.classList.remove('hidden');
    stage.scrollIntoView({ behavior: 'smooth' });

    stage.innerHTML = `
      <h3>🎒 Pencarian Item & Skrol Bahasa Tersembunyi</h3>
      <p class="small-muted">Klik lokasi di sekitar peta untuk mencari item berguna dan menyelesaikan misi penerokaan!</p>
      <div class="hunt-grid">
        ${spots.map((s, idx) => `
          <div class="hunt-spot" id="hunt-spot-${idx}" onclick="Regions.searchSpot(${idx}, '${s.reward}', ${s.val}, '${s.text}')">
            <div style="font-size:1.8rem;margin-bottom:6px;">${s.label.split(' ')[0]}</div>
            <div>${s.label}</div>
          </div>
        `).join('')}
      </div>
      <div id="hunt-log" class="mt-12" style="font-weight:800;color:#15803d;"></div>
    `;
  }

  function searchSpot(idx, reward, val, text) {
    const el = document.getElementById(`hunt-spot-${idx}`);
    if (!el || el.classList.contains('searched')) return;
    el.classList.add('searched');
    AudioEngine.sfx.catchSuccess();

    const state = GameState.get();
    state.stats.itemsFound += 1;
    if (reward === 'coins') GameState.addCoins(val);
    if (reward === 'pokeball') state.inventory.pokeball += val;
    if (reward === 'potion') state.inventory.potion += val;
    if (reward === 'scroll') {
      const rKey = state.currentRegion;
      GameState.completeMission(rKey, 'hunt');
      renderAdventure();
      document.getElementById('activity-stage').classList.remove('hidden');
    }

    document.getElementById('hunt-log').textContent = `✨ ${text}`;
    SaveSystem.save();
    Main.refreshHUD();
  }

  /** Mode 5: Regional Trainer Battle */
  function startTrainerBattle() {
    const rKey = GameState.get().currentRegion;
    const info = DATA[rKey];
    Battle.start({
      type: 'trainer',
      region: rKey,
      questionPool: rKey,
      trainerTitle: 'Pelatih Akademi Lingua',
      enemySpeciesId: info.wildSpecies[1] || info.wildSpecies[0],
      enemyLevel: rKey === 'region1' ? 5 : rKey === 'region2' ? 8 : 11,
      missionKey: 'trainer'
    });
  }

  /** Mode 6: Gym Leader Challenge */
  function startGymBattle() {
    const rKey = GameState.get().currentRegion;
    const info = DATA[rKey];
    Battle.start({
      type: 'gym',
      region: rKey,
      questionPool: rKey,
      trainerTitle: info.leader,
      enemySpeciesId: info.gymSpecies,
      enemyLevel: rKey === 'region1' ? 7 : rKey === 'region2' ? 10 : 13,
      onWin: () => {
        const state = GameState.get();
        state.badges[rKey] = true;
        AudioEngine.sfx.badge();
        Main.showToast(`🏅 TAHNIAH! Kamu memenangi ${info.badgeName} daripada ${info.leader}!`);
        if (Badges.countEarned() === 3) {
          GameState.unlockAchievement('badge_master');
        }
      }
    });
  }

  return {
    DATA,
    selectRegion,
    renderAdventure,
    startWildBattle,
    startCatchingChallenge,
    resolveCatchChallenge,
    startPuzzleMode,
    addPuzzleTile,
    resetPuzzleTiles,
    checkPuzzle,
    startItemHunt,
    searchSpot,
    startTrainerBattle,
    startGymBattle
  };
})();
