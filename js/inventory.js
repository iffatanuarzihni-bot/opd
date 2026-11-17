/**
 * Item Shop & Player Bag Inventory Management
 */
const Inventory = (() => {
  const ITEMS = [
    {
      id: 'pokeball',
      name: 'Poké Ball',
      icon: '🔴',
      price: 50,
      desc: 'Bola asas untuk menangkap Pokémon liar di Wilayah Lingua.'
    },
    {
      id: 'greatball',
      name: 'Great Ball',
      icon: '🔵',
      price: 120,
      desc: 'Kadar tangkapan +25% lebih tinggi berbanding Poké Ball biasa!'
    },
    {
      id: 'potion',
      name: 'Potion Pemulih',
      icon: '🧪',
      price: 60,
      desc: 'Memulihkan 35 HP Pokémon semasa pertarungan tatabahasa.'
    },
    {
      id: 'superpotion',
      name: 'Super Potion',
      icon: '⚗️',
      price: 130,
      desc: 'Memulihkan 80 HP Pokémon semasa pertarungan sukar.'
    },
    {
      id: 'evo_stone',
      name: 'Batu Evolusi Bahasa',
      icon: '💎',
      price: 250,
      desc: 'Memberi +120 XP segera kepada Pokémon utama untuk mempercepatkan evolusi!'
    }
  ];

  function renderShop() {
    const state = GameState.get();
    document.getElementById('shop-coins').textContent = state.trainer.coins;
    const grid = document.getElementById('shop-items-grid');

    grid.innerHTML = ITEMS.map(item => {
      const owned = state.inventory[item.id] || 0;
      return `
        <div class="rpg-card">
          <div style="font-size:2.4rem;margin-bottom:6px;">${item.icon}</div>
          <h3>${item.name}</h3>
          <p class="small-muted">${item.desc}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;margin:10px 0;">
            <strong>Harga: 🪙 ${item.price}</strong>
            <span class="type-pill">Dimiliki: ${owned}</span>
          </div>
          <button class="pixel-btn btn-yellow btn-block" onclick="Inventory.buyItem('${item.id}')">
            Beli ${item.name}
          </button>
        </div>
      `;
    }).join('');
  }

  function buyItem(itemId) {
    const state = GameState.get();
    const item = ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (state.trainer.coins < item.price) {
      Main.showToast('❌ Poké Coins tidak mencukupi! Selesaikan misi untuk kumpul syiling.');
      return;
    }

    AudioEngine.sfx.click();
    GameState.addCoins(-item.price);

    if (item.id === 'evo_stone') {
      const lead = state.team[0];
      if (lead) {
        const logs = PokemonDB.grantXp(lead, 120);
        AudioEngine.sfx.levelUp();
        Main.showToast(`💎 Batu Evolusi digunakan pada ${lead.name}! ${logs.join(' ')}`);
      }
    } else {
      state.inventory[item.id] = (state.inventory[item.id] || 0) + 1;
      Main.showToast(`✅ Membeli 1x ${item.name}!`);
    }

    SaveSystem.save();
    renderShop();
    Main.refreshHUD();
  }

  return { ITEMS, renderShop, buyItem };
})();
