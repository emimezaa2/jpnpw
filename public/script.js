// ==========================================
// 🛡️ SISTEMA DE SEGURIDAD JPN (Security Layer)
// ==========================================

// 1. Bloquear Clic Derecho (Context Menu)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log("%c JPN SYSTEM: ACCESO DENEGADO", "color: red; font-weight: bold; font-size: 20px;");
    return false;
});

// 2. Bloquear Atajos de Teclado (F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I)
document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Ctrl + U (Ver código fuente)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    // Ctrl + Shift + I (Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    // Ctrl + S (Guardar página)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
});

// 3. Detectar si abren la consola (Trampa para curiosos)
// Esto limpia la consola si intentan ver tus variables
setInterval(() => {
    console.clear();
    console.log("%c JPN SECURE ENVIRONMENT", "color: #ff003c; background: #000; font-size: 30px; padding: 10px; border: 2px solid #ff003c;");
    console.log("No intentes robar el código.");
}, 2000);
const audio = document.getElementById('musica');
const btnEnter = document.getElementById('btn-enter');
const startScreen = document.getElementById('start-screen');
const transitionScreen = document.getElementById('transition-screen');
const lyricContainer = document.getElementById('lyric-container');
const bassCircle = document.getElementById('bass-circle');
const crackEffect = document.getElementById('crack-effect');
const volumeSlider = document.getElementById('volume-slider');
const rainContainer = document.getElementById('photo-rain-container');

let audioContext, analyser, source, dataArray;
let isAudioInitialized = false;
const SYNC_DELAY = 0; 

// --- DATASET DE LETRAS (Aprobado) ---
const lyrics = [
    { start: 0.44, end: 5.00, text: "Yo sé que estás a punto de casarte" },
    { start: 5.44, end: 9.50, text: "Pero quería decirte, por favor, no te cases" }, 
    { start: 9.84, end: 16.00, text: "Todos los días pienso en llegar a tu casa" },
    { start: 16.56, end: 21.00, text: "En un Ferrari F50 y que nos escapemos" },
    { start: 21.84, end: 26.00, text: "A que nos escapemos a Japón" },
    // GAP INSTRUMENTAL AQUÍ
    { start: 56.20, end: 58.20, text: "Hoy tengo ganas de extrañarte" },
    { start: 58.30, end: 61.80, text: "Hoy tengo ganas de contarte" },
    { start: 61.90, end: 65.50, text: "Que esto no ha sido fácil (fácil)" },
    { start: 66.00, end: 68.50, text: "Mami, esto no ha sido fácil, fácil" }, 
    { start: 68.20, end: 71.30, text: "Yo te quería for life, yo te quería for life" },
    { start: 71.40, end: 74.50, text: "Y yo te quería for life" },
    { start: 75.00, end: 78.00, text: "Y ya no sé ni cómo estás" },
    { start: 78.10, end: 80.70, text: "¿Cómo tú estás? Extraño saber cómo tú estás" },
    { start: 80.80, end: 82.90, text: "Y he tratado de sacarte de mi mente" },
    { start: 82.90, end: 86.00, text: "Porque sé que sacarte del corazón" },
    { start: 86.30, end: 88.70, text: "Mami, nunca vo'a poder" },
    { start: 87.30, end: 89.80, text: "Y compré dos pasajes para Japón" },
    { start: 89.80, end: 92.50, text: "Por si cambias de opinión" },
    { start: 92.60, end: 94.50, text: "Y conmigo quieres desaparecer" },
    { start: 94.50, end: 98.10, text: "Lo intentamos otra vez, ey, ey" },
    // Robi
    { start: 99.90, end: 102.80, text: "Tú eres mi canción, Robi con Penélope" },
    { start: 102.80, end: 106.50, text: "Como Robi con Penélope" },
    { start: 106.50, end: 109.50, text: "Yo por ti cambié, yo por ti cambié" },
    { start: 109.60, end: 112.50, text: "Pregúntale a Elon, que en mi nave me monté" },
    { start: 112.60, end: 115.40, text: "Busqué el anillo más grande que te encontré" },
    // Tarde
    { start: 115.60, end: 117.50, text: "Pero llegué tarde, como siempre" },
    { start: 117.60, end: 121.80, text: "Como siempre llegué tarde, como siempre" },
    { start: 123.00, end: 127.00, text: "Yo te quería for life, yo te quería for life" },
    { start: 127.10, end: 133.10, text: "Y yo te quería for life, yeah" },
    { start: 133.20, end: 138.40, text: "Y ya no sé ni cómo estás" },
    { start: 138.40, end: 141.70, text: "Extraño saber cómo tú estás" },
    // Outro
    { start: 144.80, end: 147.00, text: "Y esta historia que comenzó en un apa tan pequeño" },
    { start: 147.00, end: 149.10, text: "Se convirtió en algo gigante lleno de sentimiento" },
    { start: 149.20, end: 152.80, text: "Yo todavía con tu cara sueño" },
    { start: 152.90, end: 155.00, text: "Y aunque estoy seguro que es tarde pa' contar lo que siento" },
    { start: 155.10, end: 159.40, text: "Te confieso que me quedé con ganas" },
    { start: 159.50, end: 162.00, text: "De tener par de Alvaritos que tuviesen tu cara" },
    { start: 162.00, end: 164.70, text: "Una nena que sepa cuidarse sola porque salió a su mamá" },
    { start: 164.70, end: 167.30, text: "Y un nene bien despista'o porque salió a su papá" },
    { start: 167.30, end: 169.80, text: "Y desde chamaquito haciendo wheelie" },
    { start: 169.80, end: 172.80, text: "Yo casi retira'o pero haciendo millis" },
    { start: 172.80, end: 175.50, text: "Viviendo en el West en una casa con una vista cabrona" },
    // Final
    { start: 173.90, end: 176.40, text: "Siempre haciendo lo que queremos sin importar la hora" },
    { start: 176.50, end: 178.50, text: "Mañana hay trabajo y los nenes tienen escuela" },
    { start: 178.60, end: 180.90, text: "Los dejamos hoy cuidando con abuela" },
    { start: 181.00, end: 183.30, text: "Porque la noche es de nosotros y grabamos una movie nueva" },
    { start: 183.40, end: 186.20, text: "Mami repitiera to' si por mí fuera" },
    { start: 186.30, end: 188.50, text: "Me quedé con las ganas de tantas cosas" },
    { start: 188.60, end: 191.80, text: "Saber que esto es solo un sueño a mí me pesa" },
    { start: 191.90, end: 194.70, text: "Estoy con otra y no siento nada" },
    { start: 194.70, end: 197.10, text: "Me cago en la madre del que ahora tú besas" },
    { start: 197.20, end: 201.10, text: "Porque yo te quería for life" },
    { start: 201.20, end: 203.80, text: "Yo te quería for life" },
    { start: 203.80, end: 206.10, text: "Fiel y ya no sé cómo estás" },
    { start: 206.10, end: 211.40, text: "Extraño saber cómo tú estás" },
    { start: 211.40, end: 217.50, text: "Yo te quería for life" },
    { start: 217.60, end: 223.80, text: "Y ya no sé ni cómo estás" },
    { start: 223.80, end: 227.70, text: "Extraño saber cómo tú estás" }
];

let currentActiveLine = null;
let isLyricVisible = false; // Nuevo: rastrea si hay letra en pantalla

// ==========================================
// 1. INICIALIZAR AUDIO
// ==========================================
function setupAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256; 
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function animateBass() {
    requestAnimationFrame(animateBass);
    if(analyser) {
        analyser.getByteFrequencyData(dataArray);
        let bass = 0;
        for(let i = 0; i < 10; i++) bass += dataArray[i];
        const avgBass = bass / 10; 

        const scale = 1 + (avgBass / 400); 
        const opacity = avgBass / 200;
        bassCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        bassCircle.style.opacity = opacity;
        
        if(avgBass > 200) {
            bassCircle.style.background = `radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,0,60,0) 70%)`;
        } else {
            bassCircle.style.background = `radial-gradient(circle, rgba(255,0,60,0.4) 0%, rgba(0,0,0,0) 70%)`;
        }
    }
}

// ==========================================
// 2. MOTOR LLUVIA DE FOTOS (NUEVO)
// ==========================================
const PhotoRainEngine = {
    rainInterval: null,
    // Configura aquí tus fotos fer1.jpg, etc.
    // Asumimos que están en una carpeta 'fotos' junto al HTML
    photoList: [
        'fotos/fer1.jpg',
        'fotos/fer2.jpg',
        'fotos/fer3.jpg',
        'fotos/fer4.jpg',
        'fotos/fer5.jpg'
    ],

    start: function() {
        if (this.rainInterval) return; // Ya corriendo
        console.log("Iniciando lluvia instrumental...");
        // Crear una foto cada 800ms (ajusta para más/menos densidad)
        this.rainInterval = setInterval(() => this.createPhoto(), 800);
    },

    stop: function() {
        if (!this.rainInterval) return;
        console.log("Deteniendo lluvia (Entra letra)...");
        clearInterval(this.rainInterval);
        this.rainInterval = null;
    },

    createPhoto: function() {
        const photoUrl = this.photoList[Math.floor(Math.random() * this.photoList.length)];
        const img = document.createElement('img');
        img.src = photoUrl;
        img.className = 'falling-photo';

        // Configuración aleatoria para cada foto
        const startX = Math.random() * window.innerWidth; // Posición horizontal
        const dropDuration = 8 + Math.random() * 6; // Caída lenta (8 a 14 segundos)
        const rotation = (Math.random() * 360) - 180; // Rotación final

        // Aplicar estilos dinámicos
        img.style.left = startX + 'px';
        img.style.animationDuration = dropDuration + 's';
        img.style.setProperty('--rotation', rotation + 'deg');

        rainContainer.appendChild(img);

        // Limpieza: Eliminar el elemento DOM cuando termine la animación para no saturar memoria
        img.addEventListener('animationend', () => {
            img.remove();
        });
    }
};

// ==========================================
// 3. CONTROL DE FLUJO (TRANSICIÓN)
// ==========================================
btnEnter.addEventListener('click', async () => {
    crackEffect.classList.add('screen-break');
    btnEnter.style.opacity = '0';

    if (!isAudioInitialized) {
        setupAudioContext();
        if (audioContext.state === 'suspended') await audioContext.resume();
        isAudioInitialized = true;
    }

    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.display = 'none';
        transitionScreen.style.opacity = '1';

        setTimeout(() => {
            transitionScreen.style.opacity = '0';
            setTimeout(() => { transitionScreen.style.display = 'none'; }, 2000);

            // INICIAR SHOW
            audio.play().then(() => {
                syncLyrics();  
                animateBass(); 
            }).catch(e => console.error("Error play:", e));

        }, 3000); 

    }, 1000); 
});

// ==========================================
// 4. MOTOR DE LETRAS + LLUVIA DETECTOR
// ==========================================
function syncLyrics() {
    const currentTime = audio.currentTime - SYNC_DELAY;
    const lineToDisplay = lyrics.find(l => currentTime >= l.start && currentTime <= l.end);

    if (lineToDisplay) {
        // --- ENTRA LETRA ---
        isLyricVisible = true;
        PhotoRainEngine.stop(); // Detener lluvia si está corriendo

        if (currentActiveLine !== lineToDisplay) {
            renderLyric(lineToDisplay.text);
            currentActiveLine = lineToDisplay;
        }
    } else {
        // --- GAP INSTRUMENTAL (No hay letra) ---
        
        // Solo iniciamos lluvia si la música está sonando y no ha terminado
        if (!audio.paused && !audio.ended) {
             isLyricVisible = false;
             PhotoRainEngine.start(); // Iniciar lluvia
        }

        if (lyricContainer.innerHTML !== "") {
            lyricContainer.style.opacity = "0";
            setTimeout(() => {
                const checkTime = audio.currentTime - SYNC_DELAY;
                if(!lyrics.find(l => checkTime >= l.start && checkTime <= l.end)) {
                    lyricContainer.innerHTML = "";
                    currentActiveLine = null;
                }
            }, 200);
        }
    }
    requestAnimationFrame(syncLyrics);
}

// Detector de fin de canción para la lluvia final
audio.addEventListener('ended', () => {
    console.log("Canción terminada. Lluvia final.");
    isLyricVisible = false;
    PhotoRainEngine.start(); // Lluvia eterna al final
});

function renderLyric(text) {
    lyricContainer.innerHTML = ''; 
    lyricContainer.style.opacity = "1";
    const el = document.createElement('div');
    el.className = 'lyric-phrase active';
    el.innerText = text;
    el.style.top = (40 + (Math.random() * 5)) + "vh";
    lyricContainer.appendChild(el);
}

volumeSlider.addEventListener('input', (e) => { 
    audio.volume = e.target.value; 
});