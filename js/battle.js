/**
 * Turn-Based Pokémon Grammar Battle Engine
 * Supports Wild Encounters, Trainer Battles, Gym Leaders, Team Rocket Boss & Final Champion.
 */
const Battle = (() => {
  let current = null;

  /** Starts a battle encounter */
  function start(config) {
    const state = GameState.get();
    // Ensure at least 1 healthy Pokémon
    let activePoke = state.team.find(p => p.hp > 0);
    if (!activePoke) {
      state.team.forEach(p => { p.hp = p.maxHp; });
      activePoke = state.team[0];
      Main.showToast('💖 Pusat Pokémon menghantar tenaga kecemasan untuk memulihkan pasukan kamu!');
    }

    const enemyPoke = PokemonDB.createInstance(config.enemySpeciesId, config.enemyLevel || 4);
    GameState.registerSpecies(enemyPoke.speciesId, false);

    current = {
      type: config.type || 'wild', // wild | trainer | gym | rocket | champion
      region: config.region || 'region1',
      questionPool: config.questionPool || config.region || 'region1',
      trainerTitle: config.trainerTitle || 'Pokémon Liar',
      missionKey: config.missionKey || null,
      playerPoke: activePoke,
      enemyPoke,
      questionsNeeded: config.questionsNeeded || 1,
      enemyDefeatedCount: 0,
      roster: config.roster || null, // Optional multi-Pokémon lineup for Boss/Champion
      rosterIndex: 0,
      currentQuestion: null,
      onWinCallback: config.onWin || null
    };

    AudioEngine.sfx.encounter();
    AudioEngine.startBGM('battle');
    Navigation.goTo('battle');
    renderArena();
  }

  function renderArena() {
    if (!current) return;
    const arena = document.getElementById('battle-arena');
    arena.className = `battle-arena arena-${current.region === 'champion' ? 'champion' : current.region}`;

    document.getElementById('battle-type-label').textContent =
      `${current.trainerTitle.toUpperCase()} • ${current.enemyPoke.name}`;

    updateCombatantUI();
    showActionMenu();
    setDialogue(`${current.trainerTitle} menghantar ${current.enemyPoke.name} (Lv.${current.enemyPoke.level})! Pilih tindakan kamu.`);
  }

  function updateCombatantUI() {
    const { playerPoke, enemyPoke } = current;

    // Enemy HUD
    document.getElementById('enemy-name').textContent = enemyPoke.name;
    document.getElementById('enemy-level').textContent = enemyPoke.level;
    document.getElementById('enemy-hp-text').textContent = `${enemyPoke.hp}/${enemyPoke.maxHp}`;
    const ePct = Math.max(0, Math.round((enemyPoke.hp / enemyPoke.maxHp) * 100));
    const eBar = document.getElementById('enemy-hp-fill');
    eBar.style.width = `${ePct}%`;
    eBar.className = `hp-bar-inner ${ePct <= 25 ? 'low' : ePct <= 55 ? 'mid' : ''}`;
    document.getElementById('enemy-sprite-box').innerHTML =
      `<div class="anim-idle">${PokemonDB.getSpriteSVG(enemyPoke.speciesId)}</div>`;

    // Player HUD
    document.getElementById('player-poke-name').textContent = playerPoke.name;
    document.getElementById('player-poke-level').textContent = playerPoke.level;
    document.getElementById('player-hp-text').textContent = `${playerPoke.hp}/${playerPoke.maxHp}`;
    document.getElementById('player-poke-xp').textContent = `${playerPoke.xp}/${playerPoke.nextXp}`;
    const pPct = Math.max(0, Math.round((playerPoke.hp / playerPoke.maxHp) * 100));
    const pBar = document.getElementById('player-hp-fill');
    pBar.style.width = `${pPct}%`;
    pBar.className = `hp-bar-inner ${pPct <= 25 ? 'low' : pPct <= 55 ? 'mid' : ''}`;
    document.getElementById('player-sprite-box').innerHTML =
      `<div class="anim-idle">${PokemonDB.getSpriteSVG(playerPoke.speciesId)}</div>`;
  }

  function setDialogue(text) {
    document.getElementById('battle-dialogue').innerHTML = text;
  }

  function showActionMenu() {
    document.getElementById('battle-action-menu').classList.remove('hidden');
    document.getElementById('battle-question-box').classList.add('hidden');
    document.getElementById('battle-feedback-box').classList.add('hidden');
    document.getElementById('battle-subpanel').classList.add('hidden');
  }

  /** Prompts a Bahasa Melayu grammar question to execute player's attack */
  function promptAttack() {
    AudioEngine.sfx.click();
    const state = GameState.get();
    const q = QuestionBank.getRandomQuestion(current.questionPool, state.answeredIds);
    current.currentQuestion = q;

    document.getElementById('battle-action-menu').classList.add('hidden');
    document.getElementById('battle-subpanel').classList.add('hidden');
    const qBox = document.getElementById('battle-question-box');
    qBox.classList.remove('hidden');

    document.getElementById('bq-category').textContent = q.topic;
    document.getElementById('bq-difficulty').textContent = `Tahap: ${q.difficulty}`;
    document.getElementById('bq-prompt').textContent = q.prompt;

    const letters = ['A', 'B', 'C', 'D'];
    document.getElementById('bq-options').innerHTML = q.options.map((opt, idx) => `
      <button class="option-btn" onclick="Battle.submitAnswer(${idx})">
        <strong>${letters[idx]}.</strong> ${opt}
      </button>
    `).join('');
  }

  /** Evaluates student's answer, calculates damage, and displays educational feedback */
  function submitAnswer(selectedIndex) {
    const q = current.currentQuestion;
    const isCorrect = selectedIndex === q.answer;
    GameState.recordLearning(q, isCorrect);

    document.getElementById('battle-question-box').classList.add('hidden');
    const fbBox = document.getElementById('battle-feedback-box');
    fbBox.classList.remove('hidden');

    const fbTitle = document.getElementById('bf-title');
    const fbExp = document.getElementById('bf-explanation');
    const nextBtn = document.getElementById('btn-battle-next');

    if (isCorrect) {
      AudioEngine.sfx.attack();
      const dmg = Math.max(18, current.playerPoke.attack + Math.floor(Math.random() * 10));
      current.enemyPoke.hp = Math.max(0, current.enemyPoke.hp - dmg);

      // Trigger attack animations
      const pSprite = document.getElementById('player-sprite-box');
      const eSprite = document.getElementById('enemy-sprite-box');
      pSprite.classList.add('anim-lunge-right');
      setTimeout(() => eSprite.classList.add('anim-hit'), 150);
      setTimeout(() => {
        pSprite.classList.remove('anim-lunge-right');
        eSprite.classList.remove('anim-hit');
      }, 650);

      updateCombatantUI();
      fbTitle.innerHTML = `✅ JAWAPAN TEPAT! (${current.playerPoke.name} mengenakan ${dmg} kerosakan!)`;
      fbTitle.style.color = '#15803d';
      fbExp.innerHTML = `<strong>Penjelasan:</strong> ${q.explanation}<br/><em>Contoh ayat: "${q.example}"</em>`;
      setDialogue(`${current.playerPoke.name} melancarkan Serangan Kuasa Bahasa! ${current.enemyPoke.name} kehilangan ${dmg} HP!`);

      nextBtn.onclick = () => {
        if (current.enemyPoke.hp <= 0) {
          handleEnemyFainted();
        } else {
          showActionMenu();
        }
      };
    } else {
      AudioEngine.sfx.damage();
      const enemyDmg = Math.max(10, current.enemyPoke.attack - 2 + Math.floor(Math.random() * 6));
      current.playerPoke.hp = Math.max(0, current.playerPoke.hp - enemyDmg);

      const eSprite = document.getElementById('enemy-sprite-box');
      const pSprite = document.getElementById('player-sprite-box');
      eSprite.classList.add('anim-lunge-left');
      setTimeout(() => pSprite.classList.add('anim-hit'), 150);
      setTimeout(() => {
        eSprite.classList.remove('anim-lunge-left');
        pSprite.classList.remove('anim-hit');
      }, 650);

      updateCombatantUI();
      const correctText = q.options[q.answer];
      fbTitle.innerHTML = `💡 Kurang Tepat — Jawapan Sebenar: "${correctText}"`;
      fbTitle.style.color = '#b91c1c';
      fbExp.innerHTML = `<strong>Jangan putus asa! Mari belajar bersama:</strong> ${q.explanation}<br/><em>Contoh: "${q.example}"</em>`;
      setDialogue(`${current.enemyPoke.name} membalas serangan! ${current.playerPoke.name} menerima ${enemyDmg} kerosakan.`);

      nextBtn.onclick = () => {
        if (current.playerPoke.hp <= 0) {
          handlePlayerFainted();
        } else {
          showActionMenu();
        }
      };
    }
    SaveSystem.save();
  }

  function handleEnemyFainted() {
    // Check if boss/champion has more Pokémon in roster
    if (current.roster && current.rosterIndex + 1 < current.roster.length) {
      current.rosterIndex += 1;
      const nextEntry = current.roster[current.rosterIndex];
      current.enemyPoke = PokemonDB.createInstance(nextEntry.speciesId, nextEntry.level);
      GameState.registerSpecies(current.enemyPoke.speciesId, false);
      updateCombatantUI();
      showActionMenu();
      setDialogue(`${current.trainerTitle} menghantar Pokémon seterusnya: <strong>${current.enemyPoke.name}</strong>!`);
      return;
    }

    // Victory!
    AudioEngine.sfx.levelUp();
    AudioEngine.startBGM('victory');
    const state = GameState.get();
    state.stats.battlesWon += 1;
    GameState.unlockAchievement('first_victory');

    const xpEarned = current.type === 'champion' ? 180 : current.type === 'gym' ? 110 : 45;
    const coinsEarned = current.type === 'champion' ? 300 : current.type === 'gym' ? 150 : 40;

    GameState.addTrainerXp(xpEarned);
    GameState.addCoins(coinsEarned);
    const evoLogs = PokemonDB.grantXp(current.playerPoke, xpEarned);

    if (current.missionKey) {
      GameState.completeMission(current.region, current.missionKey);
    }

    if (typeof current.onWinCallback === 'function') {
      current.onWinCallback();
    }

    SaveSystem.save();
    document.getElementById('battle-action-menu').classList.add('hidden');
    const fbBox = document.getElementById('battle-feedback-box');
    fbBox.classList.remove('hidden');

    document.getElementById('bf-title').innerHTML = `🏆 KEMENANGAN! ${current.enemyPoke.name} dikalahkan!`;
    document.getElementById('bf-title').style.color = '#15803d';
    document.getElementById('bf-explanation').innerHTML = `
      Kamu memperoleh <strong>+${xpEarned} XP</strong> dan <strong>+${coinsEarned} Poké Coins</strong>!<br/>
      ${evoLogs.length > 0 ? `<strong>${evoLogs.join('<br/>')}</strong>` : ''}
    `;
    const btn = document.getElementById('btn-battle-next');
    btn.textContent = 'Tamatkan Pertarungan →';
    btn.onclick = () => {
      btn.textContent = 'Teruskan →';
      AudioEngine.startBGM('world');
      Navigation.goTo(current.type === 'champion' || current.type === 'rocket' ? 'champion' : 'adventure');
    };
  }

  function handlePlayerFainted() {
    const state = GameState.get();
    const healthyBackup = state.team.find(p => p.hp > 0);
    if (healthyBackup) {
      current.playerPoke = healthyBackup;
      updateCombatantUI();
      showActionMenu();
      setDialogue(`Pokémon kamu keletihan! <strong>${healthyBackup.name}</strong> masuk ke arena!`);
    } else {
      setDialogue('Semua Pokémon dalam pasukan kamu keletihan! Mari berehat di Pusat Pokémon.');
      setTimeout(() => {
        AudioEngine.startBGM('world');
        Navigation.goTo('center');
      }, 1600);
    }
  }

  /** Throws a Poké Ball during wild battle */
  function attemptCatchInBattle() {
    if (current.type !== 'wild') {
      Main.showToast('⚠️ Kamu tidak boleh menangkap Pokémon milik pelatih lain!');
      return;
    }
    const state = GameState.get();
    const hasGreat = state.inventory.greatball > 0;
    const hasPoke = state.inventory.pokeball > 0;

    if (!hasGreat && !hasPoke) {
      Main.showToast('❌ Tiada Poké Ball dalam beg! Beli di Kedai Item Poké.');
      return;
    }

    if (hasGreat) state.inventory.greatball -= 1;
    else state.inventory.pokeball -= 1;

    AudioEngine.sfx.pokeball();
    const hpRatio = 1 - current.enemyPoke.hp / current.enemyPoke.maxHp;
    const catchChance = Math.min(0.95, 0.42 + hpRatio * 0.45 + (hasGreat ? 0.2 : 0));

    document.getElementById('enemy-sprite-box').innerHTML = `<div class="anim-pokeball">🔴</div>`;
    setDialogue(`Membaling ${hasGreat ? 'Great Ball' : 'Poké Ball'} ke arah ${current.enemyPoke.name}...`);

    setTimeout(() => {
      if (Math.random() <= catchChance) {
        AudioEngine.sfx.catchSuccess();
        GameState.addPokemon(current.enemyPoke);
        GameState.completeMission(current.region, 'catch');
        Main.showToast(`🎉 Tahniah! ${current.enemyPoke.name} berjaya ditangkap!`);
        SaveSystem.save();
        AudioEngine.startBGM('world');
        Navigation.goTo('adventure');
      } else {
        updateCombatantUI();
        setDialogue(`Alamak! ${current.enemyPoke.name} terlepas daripada bola! Kurangkan HPnya terlebih dahulu.`);
        SaveSystem.save();
      }
    }, 1200);
  }

  function openBagInBattle() {
    const state = GameState.get();
    const panel = document.getElementById('battle-subpanel');
    panel.classList.remove('hidden');
    panel.innerHTML = `
      <h4>🎒 Beg Item Pertarungan</h4>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0;">
        <button class="pixel-btn btn-small btn-green" ${state.inventory.potion > 0 ? '' : 'disabled'} onclick="Battle.usePotion('potion', 35)">
          🧪 Potion (+35 HP) [${state.inventory.potion}]
        </button>
        <button class="pixel-btn btn-small btn-blue" ${state.inventory.superpotion > 0 ? '' : 'disabled'} onclick="Battle.usePotion('superpotion', 80)">
          ⚗️ Super Potion (+80 HP) [${state.inventory.superpotion}]
        </button>
        <button class="pixel-btn btn-small" onclick="document.getElementById('battle-subpanel').classList.add('hidden')">Tutup</button>
      </div>
    `;
  }

  function usePotion(key, healAmt) {
    const state = GameState.get();
    if (state.inventory[key] <= 0) return;
    state.inventory[key] -= 1;
    current.playerPoke.hp = Math.min(current.playerPoke.maxHp, current.playerPoke.hp + healAmt);
    AudioEngine.sfx.heal();
    updateCombatantUI();
    document.getElementById('battle-subpanel').classList.add('hidden');
    setDialogue(`💖 ${current.playerPoke.name} dipulihkan sebanyak +${healAmt} HP!`);
    SaveSystem.save();
  }

  function openSwitchInBattle() {
    const state = GameState.get();
    const panel = document.getElementById('battle-subpanel');
    panel.classList.remove('hidden');
    panel.innerHTML = `
      <h4>🔄 Pilih Pokémon Aktif</h4>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0;">
        ${state.team.map((p, i) => `
          <button class="pixel-btn btn-small btn-yellow" ${p.hp <= 0 ? 'disabled' : ''} onclick="Battle.switchPoke(${i})">
            ${p.name} (Lv.${p.level} • ${p.hp}/${p.maxHp} HP)
          </button>
        `).join('')}
        <button class="pixel-btn btn-small" onclick="document.getElementById('battle-subpanel').classList.add('hidden')">Batal</button>
      </div>
    `;
  }

  function switchPoke(index) {
    const state = GameState.get();
    if (state.team[index] && state.team[index].hp > 0) {
      current.playerPoke = state.team[index];
      updateCombatantUI();
      document.getElementById('battle-subpanel').classList.add('hidden');
      setDialogue(`Ayuh, ${current.playerPoke.name}! Giliran kamu bertarung!`);
    }
  }

  return {
    start,
    promptAttack,
    submitAnswer,
    attemptCatchInBattle,
    openBagInBattle,
    usePotion,
    openSwitchInBattle,
    switchPoke
  };
})();
