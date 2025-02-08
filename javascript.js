console.log("Script loaded")



const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let waves = [];

function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < waves.length; i++) {
        let wave = waves[i];
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 180, 255, ${wave.opacity})`;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();

        wave.radius += 3;
        wave.opacity -= 0.008;

        if (wave.opacity <= 0) {
            waves.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(drawWaves);
}

canvas.addEventListener("click", (event) => {
    waves.push({ 
        x: event.clientX, 
        y: event.clientY, 
        radius: 10, 
        opacity: 1 
    });
});

drawWaves();