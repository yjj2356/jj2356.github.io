// rain.js
// rain.js (이 코드로 파일을 통째로 덮어쓰세요)

const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 설정 (여기서 디자인을 바꿀 수 있습니다!) ---
const config = {
    characters: 'アァカサタナハマヤャラワガザダバパイィキミヒニリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン',
    fontSize: 16,
    speed: 40,
    
    // [수정됨] 잔상 효과를 밝은 배경에 맞게 반투명한 '흰색' 계열로 변경합니다.
    // rgba(240, 248, 255)는 #f0f8ff(AliceBlue)의 색상값입니다.
    trail: 0.1, // 밝은 배경에서는 잔상을 조금 더 진하게(숫자를 높게) 해야 잘 보입니다.
    trailColor: 'rgba(240, 248, 255, 0.1)',

    // [수정됨] 비처럼 내리는 문자들의 색상을 '어두운' 계열로 변경합니다.
    colors: [
        '#336699', // 메인 남색
        '#427191', // 조금 더 어두운 남색
        '#607d8b', // 청회색
        '#78909c'  // 더 밝은 청회색 (은색 느낌)
    ]
};
// ---------------------------------------------

const columns = Math.floor(canvas.width / config.fontSize);
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1 + Math.random() * canvas.height;
}

function draw() {
    // [수정됨] 잔상 효과 색을 config에서 가져옵니다.
    ctx.fillStyle = config.trailColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
        const randomColor = config.colors[Math.floor(Math.random() * config.colors.length)];
        ctx.fillStyle = randomColor;
        ctx.font = `${config.fontSize}px 'DotGothic16'`;

        const text = config.characters.charAt(Math.floor(Math.random() * config.characters.length));
        
        const xPos = i * config.fontSize;
        const yPos = drops[i] * config.fontSize;
        
        ctx.fillText(text, xPos, yPos);

        if (yPos > canvas.height && Math.random() > 0.985) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, config.speed);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
