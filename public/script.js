async function startBubbles() {
    const res = await fetch('/api/mensajes');
    const mensajes = await res.json();

    setInterval(() => {
        const b = document.createElement('div');
        b.className = 'bubble';
        b.innerText = mensajes[Math.floor(Math.random() * mensajes.length)];
        
        // Posición y tamaño aleatorio
        b.style.left = Math.random() * 90 + "vw";
        b.style.fontSize = (Math.random() * 10 + 12) + "px";
        
        document.getElementById('bubble-container').appendChild(b);

        // Borrar del código después de que suba para no alentar la PC
        setTimeout(() => b.remove(), 8000);
    }, 1500);
}

startBubbles();