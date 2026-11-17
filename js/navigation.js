/**
 * SPA Screen Router & Top HUD Updater
 */
const Navigation = (() => {
  const SCREENS = [
    'main-menu',
    'dashboard',
    'map',
    'adventure',
    'battle',
    'team',
    'pokedex',
    'gyms',
    'center',
    'shop',
    'champion',
    'professor',
    'achievements'
  ];

  function goTo(screenName) {
    if (!SCREENS.includes(screenName)) return;

    SCREENS.forEach(s => {
      const el = document.getElementById(`screen-${s}`);
      if (el) el.classList.toggle('active', s === screenName);
    });

    const hud = document.getElementById('top-hud');
    const sideNav = document.getElementById('side-nav');

    if (screenName === 'main-menu') {
      hud.classList.add('hidden');
      sideNav.classList.add('hidden');
      Main.refreshTitleScreen();
    } else {
      hud.classList.remove('hidden');
      sideNav.classList.remove('hidden');
      sideNav.classList.remove('open');
    }

    // Highlight active sidebar button
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.nav === screenName);
    });

    // Render target screen dynamically
    if (screenName === 'dashboard') Main.renderDashboard();
    if (screenName === 'map') Main.renderWorldMap();
    if (screenName === 'adventure') Regions.renderAdventure();
    if (screenName === 'team') Main.renderTeamScreen();
    if (screenName === 'pokedex') Pokedex.render();
    if (screenName === 'gyms') Badges.render();
    if (screenName === 'center') Main.renderPokemonCenter();
    if (screenName === 'shop') Inventory.renderShop();
    if (screenName === 'champion') Main.renderChampionScreen();
    if (screenName === 'achievements') Achievements.render();

    Main.refreshHUD();
  }

  return { goTo };
})();
