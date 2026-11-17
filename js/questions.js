/**
 * KSSR Year 4 Bahasa Melayu Question Bank (Standard Kandungan 5.2: Pembentukan Kata)
 * - Region 1: Kata Berimbuhan (16 questions)
 * - Region 2: Kata Majmuk (16 questions)
 * - Region 3: Kata Ganda (16 questions)
 * - Champion League: Comprehensive Examination (20 questions)
 * - Interactive Word Puzzles per Region
 */
const QuestionBank = {
  region1: [
    {
      id: 'r1_01',
      topic: 'Kata Berimbuhan Awalan',
      difficulty: 'Mudah',
      prompt: 'Perkataan manakah yang mengandungi imbuhan awalan?',
      options: ['makanan', 'bermain', 'tulisan', 'sayuran'],
      answer: 1,
      word: 'bermain',
      explanation: 'Perkataan "bermain" mempunyai imbuhan awalan "ber-" pada kata dasar "main".',
      example: 'Adik suka bermain bola sepak di padang pada waktu petang.'
    },
    {
      id: 'r1_02',
      topic: 'Kata Berimbuhan Akhiran',
      difficulty: 'Mudah',
      prompt: 'Kenal pasti perkataan yang mengandungi imbuhan akhiran.',
      options: ['berjalan', 'membaca', 'makanan', 'berlari'],
      answer: 2,
      word: 'makanan',
      explanation: '"Makanan" dibentuk daripada kata dasar "makan" + imbuhan akhiran "-an".',
      example: 'Ibu menyediakan makanan yang berkhasiat untuk keluarga.'
    },
    {
      id: 'r1_03',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Sederhana',
      prompt: 'Perkataan manakah yang mengandungi imbuhan apitan?',
      options: ['permainan', 'membaca', 'berjalan', 'lukisan'],
      answer: 0,
      word: 'permainan',
      explanation: '"Permainan" menggunakan apitan "per-...-an" yang mengapit kata dasar "main".',
      example: 'Congkak ialah permainan tradisional masyarakat Melayu.'
    },
    {
      id: 'r1_04',
      topic: 'Kata Berimbuhan Awalan',
      difficulty: 'Mudah',
      prompt: 'Aina ______ buku cerita di perpustakaan sekolah.',
      options: ['bacaan', 'membaca', 'pembacaan', 'dibacakan'],
      answer: 1,
      word: 'membaca',
      explanation: 'Imbuhan awalan "mem-" sesuai digunakan untuk perbuatan aktif "membaca".',
      example: 'Murid-murid digalakkan membaca setiap hari.'
    },
    {
      id: 'r1_05',
      topic: 'Kata Berimbuhan Akhiran',
      difficulty: 'Mudah',
      prompt: '______ Amir sangat kemas dan mudah dibaca oleh cikgu.',
      options: ['Menulis', 'Penulis', 'Tulisan', 'Tertulis'],
      answer: 2,
      word: 'tulisan',
      explanation: 'Kata dasar "tulis" menerima akhiran "-an" menjadi kata nama "tulisan".',
      example: 'Tulisan tangan peserta itu sangat cantik.'
    },
    {
      id: 'r1_06',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Sederhana',
      prompt: 'Kita mestilah menjaga ______ kawasan sekolah setiap masa.',
      options: ['bersih', 'membersih', 'kebersihan', 'pembersih'],
      answer: 2,
      word: 'kebersihan',
      explanation: '"Kebersihan" menggunakan imbuhan apitan "ke-...-an" pada kata dasar "bersih".',
      example: 'Gotong-royong diadakan untuk menjaga kebersihan taman.'
    },
    {
      id: 'r1_07',
      topic: 'Kata Berimbuhan Awalan',
      difficulty: 'Mudah',
      prompt: 'Sampah sarap itu ______ oleh pekerja pembersihan pada awal pagi.',
      options: ['sapuan', 'menyapu', 'disapu', 'penyapu'],
      answer: 2,
      word: 'disapu',
      explanation: 'Imbuhan awalan "di-" membentuk kata kerja pasif "disapu".',
      example: 'Daun-daun kering telah disapu hingga bersih.'
    },
    {
      id: 'r1_08',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Sederhana',
      prompt: 'Pilih perkataan berimbuhan apitan yang betul.',
      options: ['minuman', 'peminum', 'meminum', 'terminum'],
      answer: 0,
      word: 'minuman',
      explanation: 'Eh, berhati-hati! Soalan meminta perkataan paling tepat—mari semak: antara pilihan ini, semua berawalan kecuali "minuman" (akhiran). Soalan latihan: pilih kata berakhiran "-an"!',
      example: 'Air kelapa muda ialah minuman yang menyegarkan.'
    },
    {
      id: 'r1_09',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Sederhana',
      prompt: 'Murid Tahun 4 sedang ______ aktiviti eksperimen sains.',
      options: ['jalankan', 'menjalankan', 'perjalanan', 'terjalan'],
      answer: 1,
      word: 'menjalankan',
      explanation: '"Menjalankan" mengandungi apitan "men-...-kan" dengan kata dasar "jalan".',
      example: 'Pasukan pengakap menjalankan latihan kawad kaki.'
    },
    {
      id: 'r1_10',
      topic: 'Kata Berimbuhan Awalan',
      difficulty: 'Mudah',
      prompt: 'Kakak ______ pokok bunga mawar di halaman rumah.',
      options: ['siraman', 'menyiram', 'penyiram', 'disirami'],
      answer: 1,
      word: 'menyiram',
      explanation: 'Imbuhan awalan "meny-" bergabung dengan kata dasar "siram" menjadi "menyiram".',
      example: 'Setiap petang, nenek menyiram sayur-sayuran di kebun.'
    },
    {
      id: 'r1_11',
      topic: 'Kata Berimbuhan Akhiran',
      difficulty: 'Sederhana',
      prompt: 'Tolong ______ lampu bilik darjah sebelum pulang ke rumah.',
      options: ['memadam', 'padamkan', 'pemadam', 'terpadam'],
      answer: 1,
      word: 'padamkan',
      explanation: '"Padamkan" mempunyai imbuhan akhiran "-kan" yang menunjukkan ayat suruhan.',
      example: 'Sila padamkan papan putih selepas kelas tamat.'
    },
    {
      id: 'r1_12',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Sederhana',
      prompt: '______ kemerdekaan negara disambut dengan penuh meriah.',
      options: ['Menyambut', 'Sambutan', 'Penyambut', 'Menyambuti'],
      answer: 1,
      word: 'sambutan',
      explanation: 'Kata dasar "sambut" + akhiran "-an" membentuk "sambutan".',
      example: 'Sambutan Hari Guru diadakan di dewan sekolah.'
    },
    {
      id: 'r1_13',
      topic: 'Kata Berimbuhan Awalan',
      difficulty: 'Mudah',
      prompt: 'Adik kecil itu ______ apabila melihat badut yang lucu.',
      options: ['ketawa', 'tertawa', 'mentertawakan', 'ditertawakan'],
      answer: 1,
      word: 'tertawa',
      explanation: 'Imbuhan awalan "ter-" pada kata dasar "tawa" membentuk "tertawa".',
      example: 'Penonton tertawa melihat telatah kucing itu.'
    },
    {
      id: 'r1_14',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Sukar',
      prompt: 'Perkataan manakah mempunyai apitan "ke-...-an"?',
      options: ['kecantikan', 'cantikkan', 'mencantikkan', 'tercantik'],
      answer: 0,
      word: 'kecantikan',
      explanation: '"Kecantikan" diapit oleh "ke-" di awal dan "-an" di akhir kata dasar "cantik".',
      example: 'Kecantikan pulau peranginan itu memukau pelancong.'
    },
    {
      id: 'r1_15',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Sukar',
      prompt: 'Guru Besar ______ hadiah kepada pemenang pertandingan bercerita.',
      options: ['hadiahkan', 'menghadiahkan', 'berhadiah', 'dihadiahi'],
      answer: 1,
      word: 'menghadiahkan',
      explanation: '"Menghadiahkan" menggunakan imbuhan apitan "meng-...-kan".',
      example: 'Ayah menghadiahkan sebuah basikal kepada abang.'
    }
  ],

  region2: [
    {
      id: 'r2_01',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Mudah',
      prompt: 'Antara berikut, yang manakah merupakan kata majmuk?',
      options: ['kereta api', 'berjalan', 'makanan', 'cantik'],
      answer: 0,
      word: 'kereta api',
      explanation: '"Kereta api" ialah kata majmuk bebas yang terdiri daripada dua kata dasar berbeza.',
      example: 'Kami menaiki kereta api laju ke Kuala Lumpur.'
    },
    {
      id: 'r2_02',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Mudah',
      prompt: 'Manakah antara berikut ialah kata majmuk mantap (dieja rapat)?',
      options: ['rumah sakit', 'matahari', 'meja makan', 'jalan raya'],
      answer: 1,
      word: 'matahari',
      explanation: '"Matahari" ialah kata majmuk mantap yang sudah lazim dieja bercantum.',
      example: 'Cahaya matahari pagi sangat baik untuk kesihatan.'
    },
    {
      id: 'r2_03',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Mudah',
      prompt: 'Ibu membeli ______ baharu untuk kegunaan sekolah adik.',
      options: ['alat tulis', 'alattulis', 'menulis', 'tulisan'],
      answer: 0,
      word: 'alat tulis',
      explanation: '"Alat tulis" ialah kata majmuk bebas dan mesti dieja terpisah.',
      example: 'Pensel, pemadam dan pembaris ialah contoh alat tulis.'
    },
    {
      id: 'r2_04',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Sederhana',
      prompt: 'Pilih ejaan kata majmuk mantap yang betul.',
      options: ['antara bangsa', 'antarabangsa', 'antara-bangsa', 'diantarabangsakan'],
      answer: 1,
      word: 'antarabangsa',
      explanation: '"Antarabangsa" termasuk dalam senarai kata majmuk mantap yang dieja rapat.',
      example: 'Lapangan Terbang Antarabangsa Kuala Lumpur sangat luas.'
    },
    {
      id: 'r2_05',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Sederhana',
      prompt: '______ penduduk kampung menjayakan program gotong-royong itu.',
      options: ['Kerja sama', 'Kerjasama', 'Bekerja sama', 'Kerja-sama'],
      answer: 1,
      word: 'kerjasama',
      explanation: '"Kerjasama" ialah kata majmuk mantap yang dieja sebagai satu perkataan.',
      example: 'Kerjasama berpasukan memudahkan kerja yang sukar.'
    },
    {
      id: 'r2_06',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Mudah',
      prompt: 'Pejalan kaki hendaklah menggunakan ______ ketika melintas jalan yang sibuk.',
      options: ['jejantas', 'lintasan belang', 'lampu', 'kereta'],
      answer: 1,
      word: 'lintasan belang',
      explanation: '"Lintasan belang" ialah kata majmuk bebas bagi kemudahan keselamatan jalan raya.',
      example: 'Murid-murid melintas di lintasan belang dengan berhati-hati.'
    },
    {
      id: 'r2_07',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Sederhana',
      prompt: 'Ayah menurunkan ______ pada borang kebenaran lawatan sekolah.',
      options: ['tanda tangan', 'tandatangan', 'tanda-tangan', 'bertanda'],
      answer: 1,
      word: 'tandatangan',
      explanation: '"Tandatangan" ialah kata majmuk mantap yang dieja rapat.',
      example: 'Sila dapatkan tandatangan ibu bapa pada surat itu.'
    },
    {
      id: 'r2_08',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Mudah',
      prompt: 'Kakak memakai ______ hitam ketika bercuti di tepi pantai.',
      options: ['cermin mata', 'cerminmata', 'bercermin', 'kaca'],
      answer: 0,
      word: 'cermin mata',
      explanation: '"Cermin mata" ialah kata majmuk bebas yang dieja berasingan.',
      example: 'Datuk memakai cermin mata untuk membaca surat khabar.'
    },
    {
      id: 'r2_09',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Sederhana',
      prompt: 'Menjaga kebersihan kelas ialah ______ semua murid.',
      options: ['tanggung jawab', 'tanggungjawab', 'bertanggung jawab', 'tanggung-jawab'],
      answer: 1,
      word: 'tanggungjawab',
      explanation: '"Tanggungjawab" ialah kata majmuk mantap yang dieja bercantum.',
      example: 'Setiap ketua kelas menjalankan tanggungjawab dengan amanah.'
    },
    {
      id: 'r2_10',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Sederhana',
      prompt: 'Kejohanan ______ tahunan sekolah akan diadakan pada bulan hadapan.',
      options: ['olah raga', 'olahraga', 'berolah raga', 'olah-raga'],
      answer: 1,
      word: 'olahraga',
      explanation: '"Olahraga" ialah kata majmuk mantap yang dieja rapat.',
      example: 'Hafiz menyertai acara larian dalam kejohanan olahraga.'
    },
    {
      id: 'r2_11',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Mudah',
      prompt: 'Puan Salmah menghidangkan nasi lemak di atas ______.',
      options: ['meja makan', 'mejamakan', 'makanan', 'bermeja'],
      answer: 0,
      word: 'meja makan',
      explanation: '"Meja makan" ialah kata majmuk bebas yang terdiri daripada "meja" dan "makan".',
      example: 'Keluarga kami berkumpul di meja makan pada waktu malam.'
    },
    {
      id: 'r2_12',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Sederhana',
      prompt: 'Semua pemandu mesti mematuhi peraturan ______.',
      options: ['jalan raya', 'jalanraya', 'berjalan', 'perjalanan'],
      answer: 0,
      word: 'jalan raya',
      explanation: '"Jalan raya" ialah kata majmuk bebas dan dieja terpisah.',
      example: 'Keselamatan di jalan raya amat penting untuk dielakkan kemalangan.'
    },
    {
      id: 'r2_13',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Sukar',
      prompt: 'Semua ______ syarikat itu menghadiri mesyuarat tahunan.',
      options: ['kaki tangan', 'kakitangan', 'kaki-tangan', 'berkaki'],
      answer: 1,
      word: 'kakitangan',
      explanation: '"Kakitangan" ialah kata majmuk mantap yang bermaksud pekerja.',
      example: 'Kakitangan hospital bekerja keras merawat pesakit.'
    },
    {
      id: 'r2_14',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Sederhana',
      prompt: 'Pasukan pengakap menggunakan ______ untuk mencari arah utara.',
      options: ['jarum kompas', 'kompas', 'mata angin', 'arah'],
      answer: 2,
      word: 'mata angin',
      explanation: '"Mata angin" ialah kata majmuk bebas yang merujuk arah seperti utara dan selatan.',
      example: 'Kita boleh menentukan arah menggunakan empat mata angin utama.'
    },
    {
      id: 'r2_15',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Sukar',
      prompt: 'Perkataan manakah BUKAN kata majmuk mantap?',
      options: ['matahari', 'kerjasama', 'kereta api', 'tandatangan'],
      answer: 2,
      word: 'kereta api',
      explanation: '"Kereta api" ialah kata majmuk bebas (dieja terpisah), manakala yang lain ialah kata majmuk mantap.',
      example: 'Stesen kereta api itu terletak di tengah bandar.'
    }
  ],

  region3: [
    {
      id: 'r3_01',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Mudah',
      prompt: 'Perkataan manakah ialah kata ganda penuh?',
      options: ['pepohon', 'lelaki', 'buku-buku', 'tetamu'],
      answer: 2,
      word: 'buku-buku',
      explanation: '"Buku-buku" menggandakan keseluruhan kata dasar "buku" dengan tanda sempang.',
      example: 'Buku-buku di atas rak itu disusun mengikut subjek.'
    },
    {
      id: 'r3_02',
      topic: 'Kata Ganda Separa',
      difficulty: 'Mudah',
      prompt: 'Manakah antara berikut merupakan kata ganda separa?',
      options: ['rumah-rumah', 'pepohon', 'kanak-kanak', 'meja-meja'],
      answer: 1,
      word: 'pepohon',
      explanation: '"Pepohon" ialah kata ganda separa daripada kata dasar "pohon" (pohon-pohon → pepohon).',
      example: 'Pepohon hijau di hutan itu memberikan udara yang segar.'
    },
    {
      id: 'r3_03',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Mudah',
      prompt: '______ itu sedang bermain buaian di taman permainan dengan gembira.',
      options: ['Kanak-kanak', 'Lelaki', 'Tetamu', 'Dedaun'],
      answer: 0,
      word: 'kanak-kanak',
      explanation: '"Kanak-kanak" ialah kata ganda penuh yang membawa maksud jamak.',
      example: 'Kanak-kanak prasekolah menyanyikan lagu Negaraku.'
    },
    {
      id: 'r3_04',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sederhana',
      prompt: '______ kering berguguran ditiup angin pada musim kemarau.',
      options: ['Daun-daunan', 'Dedaun', 'Bunga-bunga', 'Batu-batu'],
      answer: 1,
      word: 'dedaun',
      explanation: '"Dedaun" terbentuk melalui penggandaan separa daripada kata dasar "daun".',
      example: 'Dedaun kering itu dikumpulkan untuk dijadikan baja kompos.'
    },
    {
      id: 'r3_05',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sederhana',
      prompt: 'Ibu menghidangkan kuih-muih kepada ______ yang hadir ke rumah.',
      options: ['tetamu', 'orang-orang', 'murid-murid', 'kawan-kawan'],
      answer: 0,
      word: 'tetamu',
      explanation: '"Tetamu" ialah kata ganda separa daripada "tamu" (tamu-tamu → tetamu).',
      example: 'Kita hendaklah melayan tetamu dengan sopan santun.'
    },
    {
      id: 'r3_06',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sederhana',
      prompt: 'Budak ______ yang memakai baju biru itu ialah abang saya.',
      options: ['lelaki', 'budak-budak', 'kanak-kanak', 'anak-anak'],
      answer: 0,
      word: 'lelaki',
      explanation: '"Lelaki" ialah kata ganda separa daripada kata dasar "laki".',
      example: 'Murid lelaki dan perempuan beratur sebelum masuk ke kelas.'
    },
    {
      id: 'r3_07',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Mudah',
      prompt: '______ berwarna-warni hinggap di atas bunga mawar itu.',
      options: ['Rama-rama', 'Pepohon', 'Kekuda', 'Bebola'],
      answer: 0,
      word: 'rama-rama',
      explanation: '"Rama-rama" ialah kata ganda penuh yang merujuk kepada sejenis serangga.',
      example: 'Sayap rama-rama itu mempunyai corak yang sangat cantik.'
    },
    {
      id: 'r3_08',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sederhana',
      prompt: 'Adik suka makan sup ______ ikan yang dimasak oleh nenek.',
      options: ['bebola', 'bola-bola', 'ikan-ikan', 'sayur-sayur'],
      answer: 0,
      word: 'bebola',
      explanation: '"Bebola" ialah kata ganda separa daripada kata dasar "bola".',
      example: 'Bebola daging itu dimasak bersama sos tomato.'
    },
    {
      id: 'r3_09',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Mudah',
      prompt: '______ di dalam kelas Tahun 4 Bestari mendengar penerangan cikgu.',
      options: ['Murid-murid', 'Lelaki', 'Tetamu', 'Jejari'],
      answer: 0,
      word: 'murid-murid',
      explanation: '"Murid-murid" ialah kata ganda penuh yang menunjukkan ramai murid.',
      example: 'Murid-murid bertepuk tangan selepas persembahan tamat.'
    },
    {
      id: 'r3_10',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sukar',
      prompt: 'Tukang kayu menggunakan ______ untuk menyokong bumbung rumah itu.',
      options: ['kekuda', 'kuda-kuda', 'tetikus', 'sesiku'],
      answer: 0,
      word: 'kekuda',
      explanation: '"Kekuda" ialah kata ganda separa daripada kata dasar "kuda" yang bermaksud kayu penyangga.',
      example: 'Kekuda kayu itu dipasang dengan kukuh oleh tukang rumah.'
    },
    {
      id: 'r3_11',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sederhana',
      prompt: 'Ayah menggunakan ______ untuk mengklik ikon pada skrin komputer.',
      options: ['tetikus', 'tikus-tikus', 'kekunci', 'papan'],
      answer: 0,
      word: 'tetikus',
      explanation: '"Tetikus" ialah kata ganda separa daripada "tikus" yang merujuk peranti komputer.',
      example: 'Tetikus tanpa wayar memudahkan penggunaan komputer riba.'
    },
    {
      id: 'r3_12',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Mudah',
      prompt: '______ di tepi pantai itu sangat indah untuk bergambar.',
      options: ['Batu-batu', 'Bebatu', 'Pepasir', 'Lelangit'],
      answer: 0,
      word: 'batu-batu',
      explanation: '"Batu-batu" ialah kata ganda penuh yang menunjukkan banyak batu.',
      example: 'Ombak menghempas batu-batu besar di tepi pantai.'
    },
    {
      id: 'r3_13',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sukar',
      prompt: '______ basikal adik bengkok selepas terjatuh di atas jalan.',
      options: ['Jejari', 'Jari-jari', 'Roda-roda', 'Kekunci'],
      answer: 0,
      word: 'jejari',
      explanation: '"Jejari" ialah kata ganda separa daripada kata dasar "jari".',
      example: 'Jejari roda basikal itu diperbuat daripada besi tahan karat.'
    },
    {
      id: 'r3_14',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Sederhana',
      prompt: 'Pilih pasangan kata ganda penuh yang dieja dengan betul.',
      options: ['pokok pokok', 'pokok-pokok', 'pepokok', 'pokok2'],
      answer: 1,
      word: 'pokok-pokok',
      explanation: 'Kata ganda penuh mesti menggunakan tanda sempang (-) dan tidak boleh menggunakan angka 2.',
      example: 'Pokok-pokok bunga ditanam di sekeliling sekolah.'
    },
    {
      id: 'r3_15',
      topic: 'Kata Ganda Separa',
      difficulty: 'Sukar',
      prompt: 'Manakah antara berikut BUKAN kata ganda separa?',
      options: ['pepohon', 'tetamu', 'kerusi-kerusi', 'dedaun'],
      answer: 2,
      word: 'kerusi-kerusi',
      explanation: '"Kerusi-kerusi" ialah kata ganda penuh, manakala pepohon, tetamu dan dedaun ialah kata ganda separa.',
      example: 'Kerusi-kerusi di dewan disusun dengan teratur.'
    }
  ],

  champion: [
    {
      id: 'ch_01',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Juara',
      prompt: 'Pilih ayat yang menggunakan kata berimbuhan apitan dengan tepat.',
      options: [
        'Kami menyertai pertandingan melukis poster.',
        'Kami serta pertandingan lukis poster.',
        'Kami penyerta pertandingan lukisan poster.',
        'Kami terserta pertandingan dilukis poster.'
      ],
      answer: 0,
      word: 'pertandingan',
      explanation: '"Pertandingan" (per-...-an) ialah kata nama terbitan yang tepat dalam konteks ayat ini.',
      example: 'Pertandingan syarahan itu disertai oleh sepuluh buah sekolah.'
    },
    {
      id: 'ch_02',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Juara',
      prompt: 'Manakah senarai yang kesemuanya ialah kata majmuk mantap?',
      options: [
        'matahari, kerjasama, tandatangan',
        'kereta api, meja makan, jalan raya',
        'alat tulis, matahari, cermin mata',
        'olahraga, rumah sakit, kakitangan'
      ],
      answer: 0,
      word: 'matahari, kerjasama, tandatangan',
      explanation: 'Ketiga-tiga perkataan tersebut ialah kata majmuk mantap yang dieja rapat.',
      example: 'Kerjasama semua kakitangan menjayakan program antarabangsa itu.'
    },
    {
      id: 'ch_03',
      topic: 'Kata Ganda Separa',
      difficulty: 'Juara',
      prompt: 'Angin petang bertiup lembut menggoyangkan ______ di tepi tasik.',
      options: ['pepohon', 'pohon-pohonkan', 'memohon', 'permohonan'],
      answer: 0,
      word: 'pepohon',
      explanation: '"Pepohon" ialah kata ganda separa yang membawa maksud banyak pohon.',
      example: 'Pepohon rendang menjadi tempat berteduh pada waktu tengah hari.'
    },
    {
      id: 'ch_04',
      topic: 'Kata Berimbuhan Awalan',
      difficulty: 'Juara',
      prompt: 'Pasukan penyelamat berjaya ______ mangsa banjir ke tempat selamat.',
      options: ['memindahkan', 'pemindahan', 'berpindah', 'dipindah'],
      answer: 0,
      word: 'memindahkan',
      explanation: 'Apitan "me-...-kan" pada kata dasar "pindah" membentuk kata kerja transitif "memindahkan".',
      example: 'Mereka memindahkan barang berharga ke tingkat atas.'
    },
    {
      id: 'ch_05',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Juara',
      prompt: 'Pilih kata majmuk bebas yang sesuai: "Ibu menyimpan ubat di dalam ______."',
      options: ['peti sejuk', 'petisejuk', 'kesejukan', 'menyejuk'],
      answer: 0,
      word: 'peti sejuk',
      explanation: '"Peti sejuk" ialah kata majmuk bebas yang dieja terpisah.',
      example: 'Buah-buahan segar disimpan di dalam peti sejuk.'
    },
    {
      id: 'ch_06',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Juara',
      prompt: 'Semua ______ yang dipamerkan di muzium itu berusia ratusan tahun.',
      options: ['barang-barang', 'bebarang', 'barangan', 'membarang'],
      answer: 0,
      word: 'barang-barang',
      explanation: '"Barang-barang" ialah kata ganda penuh yang menunjukkan bilangan banyak.',
      example: 'Barang-barang antik itu dijaga dengan rapi.'
    },
    {
      id: 'ch_07',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Juara',
      prompt: '______ ilmu pengetahuan amat penting untuk masa depan murid.',
      options: ['Penguasaan', 'Menguasai', 'Dikuasai', 'Kuasai'],
      answer: 0,
      word: 'penguasaan',
      explanation: '"Penguasaan" menggunakan apitan "peng-...-an" pada kata dasar "kuasa".',
      example: 'Penguasaan bahasa kebangsaan membina jati diri murid.'
    },
    {
      id: 'ch_08',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Juara',
      prompt: 'Kita mestilah menjaga ______ negara demi keamanan bersama.',
      options: ['kedaulatan', 'warganegara', 'warga negara', 'bernegara'],
      answer: 1,
      word: 'warganegara',
      explanation: '"Warganegara" ialah kata majmuk mantap yang dieja rapat.',
      example: 'Sebagai warganegara Malaysia, kita hendaklah mematuhi undang-undang.'
    },
    {
      id: 'ch_09',
      topic: 'Kata Ganda Separa',
      difficulty: 'Juara',
      prompt: '______ di dalam mulut membantu kita menyebut bunyi huruf dengan jelas.',
      options: ['Lelangit', 'Langit-langit', 'Melangit', 'Kelangitan'],
      answer: 0,
      word: 'lelangit',
      explanation: '"Lelangit" ialah kata ganda separa yang merujuk bahagian atas rongga mulut.',
      example: 'Lidah menyentuh lelangit ketika menyebut sesetengah huruf.'
    },
    {
      id: 'ch_10',
      topic: 'Kata Berimbuhan Akhiran',
      difficulty: 'Juara',
      prompt: '______ yang diberikan oleh Cikgu Aminah sangat mudah difahami.',
      options: ['Penerangan', 'Terangkan', 'Menerangi', 'Diterangkan'],
      answer: 0,
      word: 'penerangan',
      explanation: '"Penerangan" dibentuk oleh apitan "peN-...-an" pada kata dasar "terang".',
      example: 'Murid mencatat isi penting daripada penerangan guru.'
    },
    {
      id: 'ch_11',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Juara',
      prompt: 'Doktor memeriksa suhu badan pesakit menggunakan ______.',
      options: ['jangka suhu', 'jangkasuhu', 'bersuhu', 'menjangka'],
      answer: 0,
      word: 'jangka suhu',
      explanation: '"Jangka suhu" ialah kata majmuk bebas yang dieja berasingan.',
      example: 'Jangka suhu digital menunjukkan bacaan 36.8 darjah Celsius.'
    },
    {
      id: 'ch_12',
      topic: 'Kata Ganda Separa',
      difficulty: 'Juara',
      prompt: '______ pada papan kekunci komputer itu tersusun mengikut abjad.',
      options: ['Kekunci', 'Kunci-kunci', 'Mengunci', 'Terkunci'],
      answer: 0,
      word: 'kekunci',
      explanation: '"Kekunci" ialah kata ganda separa daripada "kunci" untuk butang komputer.',
      example: 'Tekan kekunci Enter untuk menghantar jawapan.'
    },
    {
      id: 'ch_13',
      topic: 'Kata Berimbuhan Awalan',
      difficulty: 'Juara',
      prompt: 'Peserta larian itu ______ dengan pantas menuju ke garisan penamat.',
      options: ['berlari', 'larian', 'pelari', 'melarikan'],
      answer: 0,
      word: 'berlari',
      explanation: 'Imbuhan awalan "ber-" membentuk kata kerja tak transitif "berlari".',
      example: 'Atlet sekolah berlari mengelilingi padang.'
    },
    {
      id: 'ch_14',
      topic: 'Kata Majmuk Mantap',
      difficulty: 'Juara',
      prompt: '______ masyarakat perlu sentiasa dipupuk agar hidup harmoni.',
      options: ['Perpaduan', 'Sukarela', 'Suka rela', 'Bersukarela'],
      answer: 1,
      word: 'sukarela',
      explanation: '"Sukarela" ialah kata majmuk mantap yang dieja rapat.',
      example: 'Ramai belia menyertai kerja sukarela membantu mangsa bencana.'
    },
    {
      id: 'ch_15',
      topic: 'Kata Ganda Penuh',
      difficulty: 'Juara',
      prompt: '______ di pasar malam itu menjual pelbagai jenis kuih tradisional.',
      options: ['Peniaga-peniaga', 'Peniaga', 'Berniaga', 'Perniagaan'],
      answer: 0,
      word: 'peniaga-peniaga',
      explanation: '"Peniaga-peniaga" ialah penggandaan penuh kata berimbuhan untuk menunjukkan jamak.',
      example: 'Peniaga-peniaga menjaga kebersihan gerai masing-masing.'
    },
    {
      id: 'ch_16',
      topic: 'Kata Berimbuhan Apitan',
      difficulty: 'Juara',
      prompt: 'Kita perlu menghargai ______ pahlawan yang mempertahankan tanah air.',
      options: ['pengorbanan', 'berkorban', 'mengorbankan', 'korbanan'],
      answer: 0,
      word: 'pengorbanan',
      explanation: '"Pengorbanan" menggunakan apitan "peng-...-an" pada kata dasar "korban".',
      example: 'Pengorbanan perajurit negara sentiasa dikenang.'
    },
    {
      id: 'ch_17',
      topic: 'Kata Majmuk Bebas',
      difficulty: 'Juara',
      prompt: 'Encik Razak dilantik sebagai ______ majlis sambutan hari kantin.',
      options: ['pengerusi', 'guru besar', 'gurubesar', 'membesar'],
      answer: 1,
      word: 'guru besar',
      explanation: '"Guru besar" ialah kata majmuk bebas bagi gelaran jawatan dan dieja terpisah.',
      example: 'Guru besar menyampaikan ucapan perasmian di perhimpunan.'
    },
    {
      id: 'ch_18',
      topic: 'Kata Ganda Separa',
      difficulty: 'Juara',
      prompt: 'Sarang ______ di sudut siling rumah itu telah dibersihkan oleh ayah.',
      options: ['lelabah', 'labah-labah', 'melabah', 'kelabahan'],
      answer: 0,
      word: 'lelabah',
      explanation: '"Lelabah" ialah kata ganda separa bagi "labah-labah".',
      example: 'Lelabah membina sarang untuk menangkap serangga kecil.'
    },
    {
      id: 'ch_19',
      topic: 'Kata Berimbuhan Akhiran',
      difficulty: 'Juara',
      prompt: 'Pilih kata kerja berimbuhan akhiran "-i" yang betul.',
      options: ['hormati', 'menghormati', 'kehormatan', 'terhormat'],
      answer: 0,
      word: 'hormati',
      explanation: '"Hormati" mempunyai imbuhan akhiran "-i" tanpa awalan.',
      example: 'Hormati ibu bapa dan guru-guru kita.'
    },
    {
      id: 'ch_20',
      topic: 'Sintesis Pembentukan Kata',
      difficulty: 'Juara Tertinggi',
      prompt: 'Gabungan manakah yang tepat mewakili (Imbuhan Apitan + Kata Majmuk Mantap + Kata Ganda Separa)?',
      options: [
        'kebersihan + matahari + pepohon',
        'bermain + kereta api + buku-buku',
        'makanan + tandatangan + kanak-kanak',
        'permainan + jalan raya + tetamu'
      ],
      answer: 0,
      word: 'kebersihan, matahari, pepohon',
      explanation: '"Kebersihan" (apitan ke-...-an), "matahari" (majmuk mantap), dan "pepohon" (ganda separa)!',
      example: 'Tahniah! Kamu menguasai ketiga-tiga bentuk kata Bahasa Melayu Tahun 4!'
    }
  ],

  /** Interactive Word Puzzles per Region */
  puzzles: {
    region1: [
      {
        instruction: 'Cantumkan imbuhan dan kata dasar untuk membentuk kata berapitan yang bermaksud "aktiviti bermain":',
        tiles: ['per', 'main', 'an', 'ber', 'kan'],
        target: 'permainan',
        hint: 'Gunakan apitan per-...-an pada kata dasar "main".'
      },
      {
        instruction: 'Susun bahagian kata berikut untuk membentuk kata berawalan "menyapu":',
        tiles: ['meny', 'a', 'pu', 'an', 'di'],
        target: 'menyapu',
        hint: 'Mulakan dengan awalan "meny-".'
      },
      {
        instruction: 'Bina kata berakhiran yang bermaksud "sesuatu yang dimakan":',
        tiles: ['makan', 'an', 'ber', 'kan', 'ter'],
        target: 'makanan',
        hint: 'Kata dasar "makan" + akhiran "-an".'
      }
    ],
    region2: [
      {
        instruction: 'Cantumkan dua perkataan untuk membentuk KATA MAJMUK MANTAP bagi sumber cahaya bumi:',
        tiles: ['mata', 'hari', 'bulan', 'kaki', 'air'],
        target: 'matahari',
        hint: 'Dieja rapat tanpa jarak: mata + hari.'
      },
      {
        instruction: 'Cantumkan dua kata untuk membentuk KATA MAJMUK MANTAP yang bermaksud "bekerja bersama-sama":',
        tiles: ['kerja', 'sama', 'tanda', 'tangan', 'raya'],
        target: 'kerjasama',
        hint: 'Dieja rapat: kerja + sama.'
      },
      {
        instruction: 'Cantumkan kata majmuk mantap yang bermaksud "menurunkan nama/paraf pada dokumen":',
        tiles: ['tanda', 'tangan', 'meja', 'makan', 'jalan'],
        target: 'tandatangan',
        hint: 'Dieja rapat: tanda + tangan.'
      }
    ],
    region3: [
      {
        instruction: 'Bina KATA GANDA SEPARA daripada kata dasar "pohon":',
        tiles: ['pe', 'po', 'hon', 'po', 'an'],
        target: 'pepohon',
        hint: 'Suku kata pertama menjadi "pe-" diikuti "pohon".'
      },
      {
        instruction: 'Bina KATA GANDA SEPARA daripada kata dasar "tamu":',
        tiles: ['te', 'ta', 'mu', 'ber', 'kan'],
        target: 'tetamu',
        hint: 'Suku kata pertama menjadi "te-" diikuti "tamu".'
      },
      {
        instruction: 'Bina KATA GANDA SEPARA daripada kata dasar "daun":',
        tiles: ['de', 'da', 'un', 'deda', 'an'],
        target: 'dedaun',
        hint: 'Suku kata pertama menjadi "de-" diikuti "daun".'
      }
    ]
  },

  /** Utility to fetch random question without excessive repetition */
  getRandomQuestion(poolKey, seenIds = []) {
    const pool = this[poolKey] || this.region1;
    const unseen = pool.filter(q => !seenIds.includes(q.id));
    const source = unseen.length > 0 ? unseen : pool;
    return source[Math.floor(Math.random() * source.length)];
  }
};
