// --- Elemen DOM yang Dibutuhkan ---
const dialogBox = document.getElementById("dialogBox");
const dialogText = document.getElementById("dialogText");
const closeDialog = document.getElementById("closeDialog");
const gameContainer = document.getElementById("game-container");

// BARU: Elemen untuk Potret Karakter
const characterPortrait = document.createElement('img');
characterPortrait.id = 'characterPortrait';
characterPortrait.classList.add('hidden'); // Sembunyikan default
gameContainer.prepend(characterPortrait); 

// Area baru untuk tombol pilihan (dibuat dan dimasukkan saat start)
const optionsContainer = document.createElement('div');
optionsContainer.id = 'optionsContainer';
dialogBox.prepend(optionsContainer); 

// Sembunyikan tombol Tutup
closeDialog.classList.add('hidden');

// --- STRUKTUR CERITA ---
const MC_PORTRAIT = 'mc_ryu.png'; // NAMA FILE MC ANDA

const story = {
    'start': {
        text: 'Alarm Anda berbunyi nyaring. Hari sudah pagi. Anda perlu bergegas!',
        background: 'url("kamar_tidur.png")', 
        character_img: MC_PORTRAIT, // BARU: Tampilkan MC
        options: [
            { text: '1. Pergi Mandi.', next: 'mandi' },
            { text: '2. Lanjut Tidur.', next: 'tidur_lagi' },
            { text: '3. Langsung Berangkat.', next: 'berangkat_langsung' }
        ]
    },
    
    'mandi': {
        text: 'Air dingin membuat Anda segar, tetapi waktu Anda semakin sempit. Anda merasa lebih siap.',
        background: 'url("kamar_mandi.png")', 
        character_img: MC_PORTRAIT, // Tampilkan MC
        options: [
            { text: 'Selesai. Lanjutkan Cerita.', next: 'ending_mandi' }
        ]
    },
    
    'tidur_lagi': {
        text: 'Anda memejamkan mata lagi. Tiba-tiba Anda terbangun 2 jam kemudian! Anda terlambat dan panik!',
        background: 'url("kamar_tidur.png")',
        character_img: MC_PORTRAIT, // Tampilkan MC
        options: [
            { text: 'Selesai. Lanjutkan Cerita.', next: 'ending_tidur' }
        ]
    },
    
    'berangkat_langsung': {
        text: 'Anda langsung mengenakan jaket dan kabur. Anda menghemat waktu, tapi merasa kurang rapi sepanjang hari.',
        background: 'url("jalan_raya.png")', 
        character_img: MC_PORTRAIT, // Tampilkan MC
        options: [
            { text: 'Selesai. Lanjutkan Cerita.', next: 'ending_langsung' }
        ]
    },
    
    // --- AKHIR CERITA ---
    'ending_mandi': {
        text: 'Anda tiba tepat waktu dengan penampilan prima. Awal yang bagus!',
        background: 'url("kantor.png")',
        character_img: null, // Sembunyikan MC
        options: [{ text: 'Mulai Ulang', next: 'start' }]
    },
    'ending_tidur': {
        text: 'Anda dimarahi dan hari terasa kacau. Jangan ulangi!',
        background: 'url("kantor.png")',
        character_img: null, // Sembunyikan MC
        options: [{ text: 'Mulai Ulang', next: 'start' }]
    },
    'ending_langsung': {
        text: 'Meskipun buru-buru, Anda berhasil sampai. Sedikit bau? Mungkin iya. Tapi aman.',
        background: 'url("kantor.png")',
        character_img: null, // Sembunyikan MC
        options: [{ text: 'Mulai Ulang', next: 'start' }]
    }
};

let currentState = 'start';

// --- FUNGSI UTAMA UNTUK MEMUAT ADEGAN ---
function loadScene(sceneKey) {
    const scene = story[sceneKey];
    
    // 1. Perbarui Latar Belakang
    gameContainer.style.backgroundImage = scene.background;
    gameContainer.style.backgroundSize = 'cover';
    gameContainer.style.backgroundPosition = 'center';
    
    // 2. Tampilkan/Sembunyikan Potret Karakter (BARU)
    if (scene.character_img) {
        characterPortrait.src = scene.character_img;
        characterPortrait.classList.remove('hidden');
    } else {
        characterPortrait.classList.add('hidden');
    }
    
    // 3. Perbarui Teks Dialog
    dialogText.textContent = scene.text;
    
    // 4. Hapus Tombol Pilihan Lama dan Buat Baru
    optionsContainer.innerHTML = '';
    
    scene.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        
        button.onclick = () => {
            currentState = option.next; 
            loadScene(currentState);    
        };
        optionsContainer.appendChild(button);
    });
    
    dialogBox.classList.remove('hidden');
}

// Mulai Game saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadScene(currentState);
});