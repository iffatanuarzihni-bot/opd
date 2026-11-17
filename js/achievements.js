/**
 * Achievements & Rewards Tracker
 */
const Achievements = (() => {
  const LIST = [
    {
      id: 'first_pokemon',
      title: 'Pokémon Pertama!',
      icon: '🔴',
      desc: 'Memulakan pengembaraan bersama Pokémon pertama di Wilayah Lingua.',
      rewardCoins: 50,
      rewardXp: 25
    },
    {
      id: 'first_victory',
      title: 'Kemenangan Pertama',
      icon: '⚔️',
      desc: 'Memenangi pertarungan tatabahasa pertama menentang Pokémon atau Pelatih.',
      rewardCoins: 75,
      rewardXp: 40
    },
    {
      id: 'grammar_explorer',
      title: 'Peneroka Tatabahasa',
      icon: '📖',
      desc: 'Menjawab sekurang-kurangnya 10 soalan pembentukan kata dengan tepat.',
      rewardCoins: 100,
      rewardXp: 60
    },
    {
      id: 'collector_5',
      title: 'Pengumpul Pokémon Lingua',
      icon: '🎒',
      desc: 'Menangkap 5 spesies Pokémon berbeza dalam Pokédex.',
      rewardCoins: 150,
      rewardXp: 80
    },
    {
      id: 'badge_master',
      title: 'Master Lencana Wilayah',
      icon: '🏅',
      desc: 'Mengumpul kesemua 3 Lencana Gym (Nature, Knowledge & Mastery Badge).',
      rewardCoins: 250,
      rewardXp: 150
    },
    {
      id: 'language_champion',
      title: 'Pokémon Language Master',
      icon: '👑',
      desc: 'Menewaskan Team Rocket dan Juara Bahasa di Liga Juara Lingua!',
      rewardCoins: 500,
      rewardXp: 300
    }
  ];

  function render() {
    const unlocked = GameState.get().achievements;
    const grid = document.getElementById('achievements-grid');

    grid.innerHTML = LIST.map(a => {
      const done = unlocked.includes(a.id);
      return `
        <div class="rpg-card" style="opacity:${done ? '1' : '0.68'};border-color:${done ? '#16a34a' : '#94a3b8'};">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:2.2rem;">${a.icon}</span>
            <span class="type-pill">${done ? '✅ TERBUKA' : '🔒 TERKUNCI'}</span>
          </div>
          <h3 class="mt-12">${a.title}</h3>
          <p class="small-muted">${a.desc}</p>
          <div style="font-size:0.84rem;font-weight:800;color:#15803d;">
            Ganjaran: +${a.rewardCoins} Poké Coins • +${a.rewardXp} XP
          </div>
        </div>
      `;
    }).join('');
  }

  return { LIST, render };
})();
