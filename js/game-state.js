/**
 * Central RPG Game State Store
 * Manages trainer profile, team, collection, inventory, badges, learning records & progression.
 */
const GameState = (() => {
  const DEFAULT_STATE = {
    trainer: {
      name: 'Pelatih',
      avatar: '🧢',
      id: '042026',
      level: 1,
      xp: 0,
      nextXp: 100,
      coins: 250,
      isChampion: false
    },
    currentRegion: 'region1',
    team: [],          // Max 6 active Pokémon objects
    collection: [],    // All caught Pokémon objects
    seenSpecies: [],   // Array of species IDs seen
    caughtSpecies: [], // Array of species IDs caught
    inventory: {
      pokeball: 5,
      greatball: 2,
      potion: 3,
      superpotion: 1,
      evo_stone: 1
    },
    badges: {
      region1: false, // Nature Badge
      region2: false, // Knowledge Badge
      region3: false  // Mastery Badge
    },
    missions: {
      region1: { wild: false, catch: false, puzzle: false, hunt: false, trainer: false },
      region2: { wild: false, catch: false, puzzle: false, hunt: false, trainer: false },
      region3: { wild: false, catch: false, puzzle: false, hunt: false, trainer: false }
    },
    learnedWords: [],     // { word, topic, example }
    answeredIds: [],      // Question IDs answered correctly
    mistakes: [],         // Question objects answered incorrectly
    achievements: [],     // Unlocked achievement IDs
    stats: {
      battlesWon: 0,
      questionsCorrect: 0,
      puzzlesSolved: 0,
      itemsFound: 0
    },
    settings: {
      enabled: true,
      bgmVolume: 0.35,
      sfxVolume: 0.7
    }
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));

  function get() {
    return state;
  }

  /** Initializes a fresh trainer save */
  function initNewGame(name, avatar, starterSpeciesId) {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    state.trainer.name = (name || 'Pelatih').trim().slice(0, 16) || 'Pelatih';
    state.trainer.avatar = avatar || '🧢';
    state.trainer.id = String(Math.floor(100000 + Math.random() * 900000));

    const starter = PokemonDB.createInstance(Number(starterSpeciesId) || 1, 5);
    state.team.push(starter);
    state.collection.push(starter);
    registerSpecies(starter.speciesId, true);
    unlockAchievement('first_pokemon');
    SaveSystem.save();
    return state;
  }

  /** Replaces state from validated LocalStorage payload */
  function loadState(loaded) {
    state = Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), loaded);
    state.trainer = Object.assign({}, DEFAULT_STATE.trainer, loaded.trainer || {});
    state.inventory = Object.assign({}, DEFAULT_STATE.inventory, loaded.inventory || {});
    state.badges = Object.assign({}, DEFAULT_STATE.badges, loaded.badges || {});
    state.missions = Object.assign({}, DEFAULT_STATE.missions, loaded.missions || {});
    state.stats = Object.assign({}, DEFAULT_STATE.stats, loaded.stats || {});
    state.settings = Object.assign({}, DEFAULT_STATE.settings, loaded.settings || {});
    syncTeamReferences();
  }

  /** Ensures team array items point directly to collection objects */
  function syncTeamReferences() {
    const uids = state.team.map(p => p.uid);
    state.team = state.collection.filter(p => uids.includes(p.uid)).slice(0, 6);
    if (state.team.length === 0 && state.collection.length > 0) {
      state.team.push(state.collection[0]);
    }
  }

  function registerSpecies(speciesId, caught = false) {
    const id = Number(speciesId);
    if (!state.seenSpecies.includes(id)) state.seenSpecies.push(id);
    if (caught && !state.caughtSpecies.includes(id)) state.caughtSpecies.push(id);
    if (state.caughtSpecies.length >= 5) unlockAchievement('collector_5');
  }

  function addPokemon(pokeInstance) {
    state.collection.push(pokeInstance);
    if (state.team.length < 6) {
      state.team.push(pokeInstance);
    }
    registerSpecies(pokeInstance.speciesId, true);
    unlockAchievement('first_pokemon');
    SaveSystem.save();
  }

  function addTrainerXp(amount) {
    state.trainer.xp += amount;
    while (state.trainer.xp >= state.trainer.nextXp) {
      state.trainer.xp -= state.trainer.nextXp;
      state.trainer.level += 1;
      state.trainer.nextXp = state.trainer.level * 100;
      Main.showToast(`🎉 Tahap Pelatih meningkat ke Tahap ${state.trainer.level}!`);
    }
  }

  function addCoins(amount) {
    state.trainer.coins = Math.max(0, state.trainer.coins + amount);
  }

  function recordLearning(question, isCorrect) {
    if (isCorrect) {
      state.stats.questionsCorrect += 1;
      if (!state.answeredIds.includes(question.id)) {
        state.answeredIds.push(question.id);
      }
      if (question.word && !state.learnedWords.some(w => w.word === question.word)) {
        state.learnedWords.push({
          word: question.word,
          topic: question.topic,
          example: question.example
        });
      }
      if (state.stats.questionsCorrect >= 10) {
        unlockAchievement('grammar_explorer');
      }
      // Remove from mistakes if previously missed
      state.mistakes = state.mistakes.filter(m => m.id !== question.id);
    } else {
      if (!state.mistakes.some(m => m.id === question.id)) {
        state.mistakes.push(question);
      }
    }
  }

  function completeMission(regionKey, missionKey) {
    if (state.missions[regionKey] && !state.missions[regionKey][missionKey]) {
      state.missions[regionKey][missionKey] = true;
      addTrainerXp(30);
      addCoins(40);
      Main.showToast(`📜 Misi Wilayah Selesai! +30 XP & +40 Poké Coins!`);
    }
    SaveSystem.save();
  }

  function unlockAchievement(achId) {
    if (state.achievements.includes(achId)) return;
    state.achievements.push(achId);
    const ach = Achievements.LIST.find(a => a.id === achId);
    if (ach) {
      addCoins(ach.rewardCoins);
      addTrainerXp(ach.rewardXp);
      Main.showToast(`🏆 Pencapaian Dibuka: ${ach.title}! (+${ach.rewardCoins} Coins)`);
    }
  }

  return {
    get,
    initNewGame,
    loadState,
    registerSpecies,
    addPokemon,
    addTrainerXp,
    addCoins,
    recordLearning,
    completeMission,
    unlockAchievement
  };
})();
