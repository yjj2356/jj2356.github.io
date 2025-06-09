// rain.js

const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 설정 (여기서 디자인을 바꿀 수 있습니다!) ---
const config = {
    // 사용할 문자: 일본어 카타카나로 '씹덕 감성' 극대화
    characters: 'アァカサタナハマヤャラワガザダバパイィキミヒニリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン',
    fontSize: 16,
    speed: 40, // 숫자가 작을수록 빠릅니다 (밀리초 단위)
    trail: 0.05, // 잔상의 투명도. 0.01~0.1 사이 값이 적당합니다.
    colors: [ // 비처럼 내리는 문자들의 색상 (하늘색 + 은색 계열)
        '#f0f8ff', // AliceBlue
        '#e0f7fa', // 밝은 청록
        '#bbdefb', // 밝은 파랑
        '#e9e9f0', // 은색
        '#dcdce2'  // 더 진한 은색
    ]
};
// ---------------------------------------------

const columns = Math.floor(canvas.width / config.fontSize);
const drops = [];

// 각 열의 시작 Y좌표를 랜덤으로 초기화
for (let x = 0; x < columns; x++) {
    drops[x] = 1 + Math.random() * canvas.height;
}

function draw() {
    // 이전 프레임 위에 반투명한 검은 레이어를 덮어 잔상 효과를 만듭니다.
    ctx.fillStyle = `rgba(10, 4, 26, ${config.trail})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 각 열을 순회하며 문자를 그립니다.
    for (let i = 0; i < drops.length; i++) {
        // 랜덤 색상과 폰트 설정
        const randomColor = config.colors[Math.floor(Math.random() * config.colors.length)];
        ctx.fillStyle = randomColor;
        ctx.font = `${config.fontSize}px 'DotGothic16'`;

        // 랜덤 문자 선택
        const text = config.characters.charAt(Math.floor(Math.random() * config.characters.length));
        
        // 문자를 그릴 위치 (x, y)
        const xPos = i * config.fontSize;
        const yPos = drops[i] * config.fontSize;
        
        ctx.fillText(text, xPos, yPos);

        // 비가 화면 아래로 떨어지면, 랜덤하게 다시 위로 보냅니다.
        // Math.random() > 0.985 조건으로 인해 비가 내리는 타이밍이 각기 달라집니다.
        if (yPos > canvas.height && Math.random() > 0.985) {
            drops[i] = 0;
        }

        // y좌표를 증가시켜 문자가 아래로 떨어지는 것처럼 보이게 합니다.
        drops[i]++;
    }
}

// 애니메이션 시작
setInterval(draw, config.speed);

// 창 크기가 변경될 때 캔버스 크기도 조절 (반응형 대응)
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // 필요하다면 여기서 columns와 drops 배열을 다시 계산할 수 있습니다.
});
