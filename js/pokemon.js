/**
 * Pokémon Species Database, Custom SVG Sprite Generator, Evolution & Stat Calculator
 */
const PokemonDB = (() => {
  const SPECIES = {
    1: {
      id: 1, name: 'Daunaur', type: 'Rumput', region: 'region1',
      baseHp: 56, atk: 14, evolvesTo: 2, evolveLevel: 6,
      concept: 'Kata Berimbuhan Awalan',
      desc: 'Pokémon benih hutan yang gemar mengumpul awalan seperti ber-, me-, dan ter-.'
    },
    2: {
      id: 2, name: 'Rimbunaur', type: 'Rumput', region: 'region1',
      baseHp: 76, atk: 20, evolvesTo: 3, evolveLevel: 11,
      concept: 'Kata Berimbuhan Akhiran',
      desc: 'Bunga di belakangnya mekar setiap kali ia berjaya memadankan akhiran -an dan -kan.'
    },
    3: {
      id: 3, name: 'Florasaur', type: 'Rumput/Aura', region: 'region1',
      baseHp: 102, atk: 28, evolvesTo: null, evolveLevel: null,
      concept: 'Kata Berimbuhan Apitan',
      desc: 'Penjaga rimba Lingua yang menguasai imbuhan apitan ke-...-an dan pe-...-an.'
    },
    4: {
      id: 4, name: 'Baraapi', type: 'Api', region: 'region2',
      baseHp: 54, atk: 15, evolvesTo: 5, evolveLevel: 6,
      concept: 'Kata Majmuk Bebas',
      desc: 'Api pada ekornya menyala terang apabila dua kata dasar digabungkan dengan betul.'
    },
    5: {
      id: 5, name: 'Nyalasaur', type: 'Api', region: 'region2',
      baseHp: 74, atk: 21, evolvesTo: 6, evolveLevel: 11,
      concept: 'Kata Majmuk Mantap',
      desc: 'Mampu mencantumkan kata majmuk mantap seperti matahari dan kerjasama dengan haba tinggi.'
    },
    6: {
      id: 6, name: 'Nagaapi', type: 'Api/Terbang', region: 'region2',
      baseHp: 100, atk: 29, evolvesTo: null, evolveLevel: null,
      concept: 'Penguasaan Kata Majmuk',
      desc: 'Naga perkasa Metro City yang mempertahankan kedaulatan kosakata majmuk.'
    },
    7: {
      id: 7, name: 'Kuraair', type: 'Air', region: 'region3',
      baseHp: 58, atk: 13, evolvesTo: 8, evolveLevel: 6,
      concept: 'Kata Ganda Penuh',
      desc: 'Cengkerangnya memantulkan gema kata ganda penuh seperti buku-buku dan kanak-kanak.'
    },
    8: {
      id: 8, name: 'Aruskura', type: 'Air', region: 'region3',
      baseHp: 78, atk: 19, evolvesTo: 9, evolveLevel: 11,
      concept: 'Kata Ganda Separa',
      desc: 'Menghasilkan gelombang separa untuk membentuk perkataan pepohon dan dedaun.'
    },
    9: {
      id: 9, name: 'Samudrakura', type: 'Air/Batu', region: 'region3',
      baseHp: 105, atk: 27, evolvesTo: null, evolveLevel: null,
      concept: 'Penguasaan Kata Ganda',
      desc: 'Penjaga Gua Pergunungan yang mengawal keharmonian semua jenis penggandaan.'
    },
    10: {
      id: 10, name: 'Tupaimbuh', type: 'Normal', region: 'region1',
      baseHp: 46, atk: 12, evolvesTo: 11, evolveLevel: 5,
      concept: 'Kata Dasar & Awalan',
      desc: 'Pokémon lincah di Grassland Forest yang gemar menyusun kata dasar.'
    },
    11: {
      id: 11, name: 'Musangapitan', type: 'Normal/Rumput', region: 'region1',
      baseHp: 68, atk: 18, evolvesTo: null, evolveLevel: null,
      concept: 'Kata Berimbuhan Apitan',
      desc: 'Bulu ekornya bercahaya apabila menemui apitan yang tepat.'
    },
    12: {
      id: 12, name: 'Voltikus', type: 'Elektrik', region: 'region2',
      baseHp: 52, atk: 16, evolvesTo: 13, evolveLevel: 7,
      concept: 'Kata Majmuk Radas',
      desc: 'Maskot elektrik Metro City yang gemar kata majmuk seperti tetikus dan papan kekunci.'
    },
    13: {
      id: 13, name: 'Kilatray', type: 'Elektrik', region: 'region2',
      baseHp: 76, atk: 23, evolvesTo: null, evolveLevel: null,
      concept: 'Kata Majmuk Antarabangsa',
      desc: 'Bergerak sepantas kilat membetulkan ejaan kata majmuk yang salah.'
    },
    14: {
      id: 14, name: 'Batuganda', type: 'Batu', region: 'region3',
      baseHp: 62, atk: 15, evolvesTo: 15, evolveLevel: 7,
      concept: 'Kata Ganda Berimbuhan',
      desc: 'Batu kembar dari Mountain Cave yang melambangkan kata ganda penuh.'
    },
    15: {
      id: 15, name: 'Kristalgua', type: 'Batu/Psikik', region: 'region3',
      baseHp: 88, atk: 24, evolvesTo: null, evolveLevel: null,
      concept: 'Juara Pembentukan Kata',
      desc: 'Pokémon kristal legenda yang hanya muncul kepada pelatih berilmu tinggi.'
    }
  };

  const TYPE_COLORS = {
    Rumput: ['#22c55e', '#15803d'],
    'Rumput/Aura': ['#10b981', '#047857'],
    Api: ['#f97316', '#c2410c'],
    'Api/Terbang': ['#ef4444', '#b91c1c'],
    Air: ['#38bdf8', '#0369a1'],
    'Air/Batu': ['#0ea5e9', '#1e3a8a'],
    Normal: ['#a8a29e', '#57534e'],
    'Normal/Rumput': ['#84cc16', '#3f6212'],
    Elektrik: ['#facc15', '#ca8a04'],
    Batu: ['#a16207', '#713f12'],
    'Batu/Psikik': ['#c084fc', '#6b21a8']
  };

  /** Generates a crisp, self-contained inline SVG Pokémon sprite */
  function getSpriteSVG(speciesId) {
    const sp = SPECIES[speciesId] || SPECIES[1];
    const [primary, secondary] = TYPE_COLORS[sp.type] || ['#60a5fa', '#1d4ed8'];
    const stage = ((speciesId - 1) % 3) + 1;
    const crown = stage >= 2 ? `<polygon points="36,16 44,6 50,15 56,6 64,16" fill="#facc15" stroke="#1e2436" stroke-width="2.5"/>` : '';
    const wings = stage === 3 ? `<path d="M16,52 Q4,28 28,42 Z M84,52 Q96,28 72,42 Z" fill="${secondary}" stroke="#1e2436" stroke-width="2.5"/>` : '';

    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        ${wings}
        <ellipse cx="50" cy="58" rx="${26 + stage * 2}" ry="${24 + stage * 2}" fill="${primary}" stroke="#1e2436" stroke-width="3.5"/>
        <ellipse cx="50" cy="64" rx="16" ry="13" fill="#fef9c3" opacity="0.85"/>
        <circle cx="36" cy="36" r="10" fill="${secondary}" stroke="#1e2436" stroke-width="3"/>
        <circle cx="64" cy="36" r="10" fill="${secondary}" stroke="#1e2436" stroke-width="3"/>
        ${crown}
        <circle cx="40" cy="52" r="4.5" fill="#1e2436"/>
        <circle cx="60" cy="52" r="4.5" fill="#1e2436"/>
        <circle cx="41.5" cy="50.5" r="1.6" fill="#ffffff"/>
        <circle cx="61.5" cy="50.5" r="1.6" fill="#ffffff"/>
        <path d="M43,62 Q50,69 57,62" fill="none" stroke="#1e2436" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="58" r="3.5" fill="#fb7185" opacity="0.8"/>
        <circle cx="68" cy="58" r="3.5" fill="#fb7185" opacity="0.8"/>
        <text x="50" y="94" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="900" font-size="10" fill="#1e2436">#${String(speciesId).padStart(2, '0')}</text>
      </svg>
    `;
  }

  /** Creates a new Pokémon instance for player team or wild encounter */
  function createInstance(speciesId, level = 3) {
    const sp = SPECIES[speciesId] || SPECIES[1];
    const maxHp = sp.baseHp + level * 6;
    const attack = sp.atk + level * 2;
    return {
      uid: 'pk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      speciesId: sp.id,
      name: sp.name,
      type: sp.type,
      level,
      hp: maxHp,
      maxHp,
      attack,
      xp: 0,
      nextXp: level * 45
    };
  }

  /** Grants XP to a Pokémon, handles level-ups and automatic stage evolution */
  function grantXp(poke, amount) {
    const logs = [];
    poke.xp += amount;
    while (poke.xp >= poke.nextXp) {
      poke.xp -= poke.nextXp;
      poke.level += 1;
      poke.nextXp = poke.level * 45;
      const sp = SPECIES[poke.speciesId];
      poke.maxHp = sp.baseHp + poke.level * 6;
      poke.hp = poke.maxHp;
      poke.attack = sp.atk + poke.level * 2;
      logs.push(`${poke.name} naik ke Tahap ${poke.level}!`);

      if (sp.evolvesTo && poke.level >= sp.evolveLevel) {
        const oldName = poke.name;
        const nextSp = SPECIES[sp.evolvesTo];
        poke.speciesId = nextSp.id;
        poke.name = nextSp.name;
        poke.type = nextSp.type;
        poke.maxHp = nextSp.baseHp + poke.level * 6;
        poke.hp = poke.maxHp;
        poke.attack = nextSp.atk + poke.level * 2;
        logs.push(`✨ EVOLUSI! ${oldName} berevolusi menjadi ${poke.name}!`);
      }
    }
    return logs;
  }

  return { SPECIES, getSpriteSVG, createInstance, grantXp };
})();
