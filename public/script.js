const audio = document.getElementById('musica');
const btnEnter = document.getElementById('btn-enter');
const startScreen = document.getElementById('start-screen');
const carScene = document.getElementById('car-scene');
const carImage = document.getElementById('car-image');
const planeImage = document.getElementById('plane-image');
const transitionScreen = document.getElementById('transition-screen');
const lyricContainer = document.getElementById('lyric-container');
const bassCircle = document.getElementById('bass-circle');
const crackEffect = document.getElementById('crack-effect');
const volumeSlider = document.getElementById('volume-slider');
const rainContainer = document.getElementById('photo-rain-container');
const finalMsg1 = document.getElementById('final-msg-1');
const finalMsg2 = document.getElementById('final-msg-2');
const corners = [
    document.getElementById('corner-tl'),
    document.getElementById('corner-tr'),
    document.getElementById('corner-bl'),
    document.getElementById('corner-br')
];

let audioContext, analyser, source, dataArray;
let isAudioInitialized = false;
let isFillingScreen = false;
let currentActiveLine = null;

// --- DATASET DE LETRAS (RECUERDA MANTENER TU LISTA COMPLETA AQUÍ) ---
const lyrics = [
    { start: 0.44, end: 5.00, text: "Yo sé que estás a punto de casarte" },
    { start: 5.44, end: 9.50, text: "Pero quería decirte, por favor, no te cases" }, 
    { start: 9.84, end: 16.00, text: "Todos los días pienso en llegar a tu casa" },
    { start: 16.56, end: 21.00, text: "En un Ferrari F50 y que nos escapemos" },
    { start: 21.84, end: 26.00, text: "A que nos escapemos a Japón" },

    { start: 56.20, end: 58.20, text: "Hoy tengo ganas de extrañarte" },
    { start: 58.30, end: 61.80, text: "Hoy tengo ganas de contarte" },
    { start: 61.90, end: 65.50, text: "Que esto no ha sido fácil (fácil)" },
    { start: 66.00, end: 68.50, text: "Mami, esto no ha sido fácil, fácil" }, 

    { start: 68.20, end: 71.30, text: "Yo te quería for life, yo te quería for life" },
    { start: 71.40, end: 74.50, text: "Y yo te quería for life" },
    { start: 75.00, end: 78.00, text: "Y ya no sé ni cómo estás" },
    { start: 78.10, end: 80.70, text: "¿Cómo tú estás? Extraño saber cómo tú estás" },
    { start: 80.80, end: 82.90, text: "Y he tratado de sacarte de mi mente" },
    { start: 82.90, end: 85.50, text: "Porque sé que sacarte del corazón" },
    { start: 85.50, end: 88.00, text: "Mami, nunca vo'a poder" },

    { start: 86.50, end: 89.00, text: "Y compré dos pasajes para Japón" },
    { start: 89.00, end: 91.80, text: "Por si cambias de opinión" },
    { start: 91.80, end: 93.70, text: "Y conmigo quieres desaparecer" },
    { start: 93.70, end: 98.10, text: "Lo intentamos otra vez, ey, ey" },
    
    // Robi
    { start: 98.15, end: 101.00, text: "Tú eres mi canción, Robi con Penélope" },
    { start: 101.05, end: 104.40, text: "Como Robi con Penélope" },
    { start: 104.75, end: 107.80, text: "Yo por ti cambié, yo por ti cambié" },
    { start: 107.85, end: 110.80, text: "Pregúntale a Elon, que en mi nave me monté" },
    { start: 110.85, end: 113.60, text: "Busqué el anillo más grande que te encontré" },
    
    // Tarde
    { start: 113.60, end: 115.60, text: "Pero llegué tarde, como siempre" },
    { start: 115.60, end: 121.00, text: "Como siempre llegué tarde, como siempre" },

    { start: 123.00, end: 127.00, text: "Yo te quería for life, yo te quería for life" },
    { start: 127.10, end: 133.10, text: "Y yo te quería for life, yeah" },
    { start: 133.20, end: 138.40, text: "Y ya no sé ni cómo estás" },
    { start: 138.40, end: 141.70, text: "Extraño saber cómo tú estás" },
    
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

    // --- RAP FINAL AJUSTADO (+1.15 SEGUNDOS) ---
    // Original: 176.50 -> Nuevo: 177.65
    { start: 177.65, end: 179.65, text: "Mañana hay trabajo y los nenes tienen escuela" },
    // Original: 178.60 -> Nuevo: 179.75
    { start: 179.75, end: 182.05, text: "Los dejamos hoy cuidando con abuela" },
    // Original: 181.00 -> Nuevo: 182.15
    { start: 182.15, end: 184.45, text: "Porque la noche es de nosotros y grabamos una movie nueva" },
    // Original: 183.40 -> Nuevo: 184.55
    { start: 184.55, end: 187.35, text: "Mami repitiera to' si por mí fuera" },
    // Original: 186.30 -> Nuevo: 187.45
    { start: 187.45, end: 189.65, text: "Me quedé con las ganas de tantas cosas" },
    // Original: 188.60 -> Nuevo: 189.75
    { start: 189.75, end: 192.95, text: "Saber que esto es solo un sueño a mí me pesa" },
    // Original: 191.90 -> Nuevo: 193.05
    { start: 193.05, end: 195.85, text: "Estoy con otra y no siento nada" },
    // Original: 194.70 -> Nuevo: 195.85
    { start: 195.85, end: 198.25, text: "Me cago en la madre del que ahora tú besas" },
    // Original: 197.20 -> Nuevo: 198.35
    { start: 198.35, end: 202.25, text: "Porque yo te quería for life" },
    // Original: 201.20 -> Nuevo: 202.35
    { start: 202.35, end: 204.95, text: "Yo te quería for life" },
    // Original: 203.80 -> Nuevo: 204.95
    { start: 204.95, end: 207.25, text: "Fiel y ya no sé cómo estás" },
    // Original: 206.10 -> Nuevo: 207.25
    { start: 207.25, end: 212.55, text: "Extraño saber cómo tú estás" },
    // Original: 211.40 -> Nuevo: 212.55
    { start: 212.55, end: 217.65, text: "Yo te quería for life" },
    // Original: 217.60 -> Nuevo: 218.75
    { start: 218.75, end: 224.95, text: "Y ya no sé ni cómo estás" },
    
    // --- ESTA LÍNEA DETONA EL FINAL (AJUSTADA +1.15) ---
    // Original: 223.80 -> Nuevo: 224.95
    { start: 224.95, end: 228.85, text: "Extraño saber cómo tú estás" }
];


// ==========================================
// 1. MOTOR DE AUDIO (EL EFECTO ROJO)
// ==========================================
function setupAudioContext() {
    if (isAudioInitialized) return;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    isAudioInitialized = true;
}

function animateBass() {
    requestAnimationFrame(animateBass);
    if (analyser && !audio.paused) {
        analyser.getByteFrequencyData(dataArray);
        let bass = 0;
        for (let i = 0; i < 10; i++) bass += dataArray[i];
        const avgBass = bass / 10;
        
        // Efecto visual del círculo rojo
        const scale = 1 + (avgBass / 400);
        const opacity = avgBass / 200;
        bassCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        bassCircle.style.opacity = opacity > 0.1 ? opacity : 0;
    }
}

// ==========================================
// 2. MOTOR DE LLUVIA Y ESQUINAS
// ==========================================
const PhotoRainEngine = {
    rainInterval: null,
    photoList: ['fotos/fer1.jpg', 'fotos/fer2.jpg', 'fotos/fer3.jpg', 'fotos/fer4.jpg', 'fotos/fer5.jpg'],

    start: function(speed = 800) {
        if (this.rainInterval || isFillingScreen) return;
        this.rainInterval = setInterval(() => this.createPhoto(false), speed);
    },
    stop: function() {
        clearInterval(this.rainInterval);
        this.rainInterval = null;
    },
    fillScreen: function() {
    if (isFillingScreen) return;
    isFillingScreen = true;
    this.stop();
    // Llenado rápido durante 6 segundos
    this.rainInterval = setInterval(() => this.createPhoto(true), 150);
    
    // DETENER LA GENERACIÓN después de 6 segundos
    setTimeout(() => {
        this.stop(); 
        console.log("Generación de fotos detenida para el final.");
    }, 6000); 
},
    createPhoto: function(isSticky = false) {
        const photoUrl = this.photoList[Math.floor(Math.random() * this.photoList.length)];
        const img = document.createElement('img');
        img.src = photoUrl;
        const startX = Math.random() * (window.innerWidth - 100);
        const rotation = (Math.random() * 40) - 20;

        if (isSticky) {
            img.className = 'sticky-photo';
            img.style.left = startX + 'px';
            img.style.top = Math.random() * (window.innerHeight - 150) + 'px';
        } else {
            img.className = 'falling-photo';
            img.style.left = startX + 'px';
            img.style.animationDuration = (8 + Math.random() * 6) + 's';
            img.addEventListener('animationend', () => img.remove());
        }
        img.style.setProperty('--rotation', rotation + 'deg');
        rainContainer.appendChild(img);
    }
};

const CornerTextEngine = {
    interval: null,
    start: function() {
        this.interval = setInterval(() => {
            const corner = corners[Math.floor(Math.random() * corners.length)];
            corner.classList.remove('corner-active');
            void corner.offsetWidth;
            corner.classList.add('corner-active');
        }, 6000);
    },
    stop: function() { clearInterval(this.interval); }
};

// ==========================================
// 3. LÓGICA DE SINCRONIZACIÓN
// ==========================================
function syncLyrics() {
    const currentTime = audio.currentTime;

    // Detonar llenado final
    if (currentTime >= 224.95 && !isFillingScreen) {
        PhotoRainEngine.fillScreen();
    }

    const line = lyrics.find(l => currentTime >= l.start && currentTime <= l.end);

    if (line) {
        PhotoRainEngine.stop(); // No hay fotos mientras hay letra
        if (currentActiveLine !== line) {
            renderLyric(line.text);
            currentActiveLine = line;
        }
    } else {
        // GAP DEL BEAT: Si no hay letra y la música suena, caen fotos
        if (!audio.paused && !audio.ended && !isFillingScreen) {
            PhotoRainEngine.start(800);
        }
        if (lyricContainer.innerHTML !== "") {
            lyricContainer.style.opacity = "0";
            setTimeout(() => { lyricContainer.innerHTML = ""; currentActiveLine = null; }, 500);
        }
    }
    requestAnimationFrame(syncLyrics);
}

function renderLyric(text) {
    lyricContainer.innerHTML = ''; 
    lyricContainer.style.opacity = "1";
    const el = document.createElement('div');
    el.className = 'lyric-phrase active';
    el.innerText = text;
    // ELIMINAMOS la línea de el.style.top aleatorio para que mande el CSS
    lyricContainer.appendChild(el);
}

// ==========================================
// 4. INICIO DE LA EXPERIENCIA
// ==========================================
btnEnter.addEventListener('click', async () => {
    crackEffect.classList.add('screen-break');
    setupAudioContext();
    if (audioContext.state === 'suspended') await audioContext.resume();

    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.style.display = 'none';
        carScene.style.display = 'block';
        carImage.classList.add('drive-animation');

        setTimeout(() => {
            carScene.style.opacity = '0';
            setTimeout(() => {
                carScene.style.display = 'none';
                transitionScreen.style.opacity = '1';
                setTimeout(() => {
                    transitionScreen.style.opacity = '0';
                    audio.play();
                    animateBass();
                    syncLyrics();
                    CornerTextEngine.start();
                }, 3000);
            }, 1000);
        }, 3500);
    }, 1000);
});

audio.addEventListener('ended', () => {
    // Detenemos las esquinas inmediatamente
    CornerTextEngine.stop();

    // Esperamos a que termine el llenado de fotos que inició en los últimos segundos
    setTimeout(() => {
        // 1. Desvanecer las fotos acumuladas
        const allPhotos = document.querySelectorAll('.sticky-photo, .falling-photo');
        allPhotos.forEach(p => p.classList.add('fade-out-photos'));

        // 2. Iniciar animación del avión
        planeImage.classList.add('fly-animation');

        // 3. Mostrar mensajes finales
        setTimeout(() => {
            finalMsg1.classList.add('visible');
            setTimeout(() => {
                finalMsg1.classList.remove('visible');
                setTimeout(() => {
                    finalMsg2.classList.add('visible');
                }, 1000);
            }, 5000);
        }, 2000);

    }, 8000); // Este tiempo debe ser un poco mayor al setTimeout del fillScreen
});

volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value);