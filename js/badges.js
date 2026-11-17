/**
 * Gym Leaders & Language Badges System
 */
const Badges = (() => {
  const GYMS = [
    {
      region: 'region1',
      badgeName: 'Nature Badge',
      badgeIcon: '🌿',
      leader: 'Ketua Gym Flora',
      topic: 'Kata Berimbuhan (Awalan, Akhiran, Apitan)',
      desc: 'Menguji kecekapan membentuk kata terbitan dengan imbuhan yang tepat mengikut konteks ayat.'
    },
    {
      region: 'region2',
      badgeName: 'Knowledge Badge',
      badgeIcon: '⚡',
      leader: 'Ketua Gym Volt',
      topic: 'Kata Majmuk (Bebas & Mantap)',
      desc: 'Menguji keupayaan membezakan kata majmuk dieja terpisah dan kata majmuk mantap dieja rapat.'
    },
    {
      region: 'region3',
      badgeName: 'Mastery Badge',
      badgeIcon: '⛰️',
      leader: 'Ketua Gym Rocky',
      topic: 'Kata Ganda (Penuh & Separa)',
      desc: 'Menguji penguasaan penggandaan penuh bersempang dan penggandaan separa kata dasar.'
    }
  ];

  function countEarned() {
    const b = GameState.get().badges;
    return [b.region1, b.region2, b.region3].filter(Boolean).length;
  }

  function render() {
    const state = GameState.get();
    const container = document.getElementById('gyms-container');

    container.innerHTML = GYMS.map(g => {
      const earned = state.badges[g.region];
      const completedCount = Object.values(state.missions[g.region]).filter(Boolean).length;
      const unlocked = completedCount >= 3 || earned;

      return `
        <div class="rpg-card" style="border-color:${earned ? '#ca8a04' : '#1e2436'};">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:2.4rem;">${g.badgeIcon}</span>
            <span class="type-pill">${earned ? '🏅 DIMILIKI' : unlocked ? '⚔️ SEDIA DICABAR' : `🔒 ${completedCount}/3 Misi`}</span>
          </div>
          <h3 class="mt-12">${g.badgeName}</h3>
          <p><strong>${g.leader}</strong></p>
          <p style="color:#2563eb;font-weight:800;font-size:0.88rem;margin:4px 0;">${g.topic}</p>
          <p class="small-muted">${g.desc}</p>
          <button class="pixel-btn ${earned ? 'btn-green' : 'btn-orange'} btn-block"
            ${unlocked ? '' : 'disabled'}
            onclick="Regions.selectRegion('${g.region}'); Regions.startGymBattle();">
            ${earned ? 'Cabar Semula Ketua Gym' : unlocked ? 'Cabar Ketua Gym Sekarang!' : 'Selesaikan 3 Misi Wilayah Dahulu'}
          </button>
        </div>
      `;
    }).join('');
  }

  return { GYMS, countEarned, render };
})();
