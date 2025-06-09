// rain.js (이 코드로 파일을 통째로 덮어쓰세요)

const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// [핵심 변경 1: 제공해주신 문장들을 여기에 모두 모읍니다]
const textBlocks = [
    `내가 밥맛이면 자네는 꿀맛이란 말인가?`,
    `축복해라. 결혼엔 그게 필요한 법이지.`,
    `각오는 되어있나? 나는 되어있다.`,
    `希望なのよ。人は分かり合えるかも知れない、ということの`,
    `君は僕と同じだね。`,
    `너는 이제까지 먹은 빵의 개수를 기억하고 있나?`,
    `안 보이는 곳에서 너를 안전하게 지키고 있었다고`,
    `You're beautiful, I love to watch your face in the morning light You're really cool, I like the way we fight right through the night And the way we used to kiss was way out of sight But I can never hope to set you free 'Cause you're my bittersweet bundle of misery`,
    `きみの愛馬が！ずきゅんどきゅん　走り出し(ふっふー)`,
    `遥か彼方僕らは出会ってしまった`,
    `カルマだから何度も出会ってしまうよ雲の隙間で君と集まって星座になれたら`,
    `Sociability It's hard enough for me Take me away form this big bad world And agree to marry me So we can start all over again`,
    `世界よまぶたを閉じて生命は目覚めて時を紡ぎだすあなたの証拠をさかのぼるようにそして光が胸に届く心よ原始に戻れ`,
    `날개야 다시 돋아라. 날자. 날자. 한 번만 더 날자꾸나. 한 번만 더 날아 보자꾸나.`,
    `버스가 산모퉁이를 돌아갈 때 나는 '무진 Mujin 10km'라는 이정비를 보았다. 그것은 옛날과 똑같은 모습으로 길가의 잡초 속에서 튀어나와 있었다.`,
    `eclipse first, the rest nowhere.`
];

// 위 문장들을 하나의 긴 텍스트로 합치고, 공백과 줄바꿈을 모두 제거합니다.
// 이 텍스트가 ASCII 비의 재료가 됩니다.
const characterPool = textBlocks.join('').replace(/\s/g, '');

// --- 설정 ---
const config = {
    fontSize: 16,
    // [핵심 변경 2: 속도를 더 빠르게 합니다. 숫자가 작을수록 빨라집니다 (40 -> 30)]
    speed: 30, 
    trailColor: 'rgba(240, 248, 255, 0.1)', // 잔상 색 (밝은 배경용)
    colors: [ // 떨어지는 텍스트의 색상 (어두운 계열)
        '#336699', '#427191', '#607d8b', '#78909c'
    ]
};
// ---------------------------------------------

const columns = Math.floor(canvas.width / config.fontSize);
const drops = [];

// 각 세로줄의 시작 Y좌표를 랜덤으로 초기화합니다.
for (let x = 0; x < columns; x++) {
    drops[x] = 1 + Math.random() * canvas.height;
}

function draw() {
    // 잔상 효과를 그립니다.
    ctx.fillStyle = config.trailColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 각 세로줄을 순회하며 문자를 그립니다.
    for (let i = 0; i < drops.length; i++) {
        // 랜덤 색상과 폰트 설정
        const randomColor = config.colors[Math.floor(Math.random() * config.colors.length)];
        ctx.fillStyle = randomColor;
        ctx.font = `${config.fontSize}px 'DotGothic16'`;

        // [핵심 변경 3: 문장 모음(characterPool)에서 랜덤으로 글자 하나를 선택합니다]
        const text = characterPool.charAt(Math.floor(Math.random() * characterPool.length));
        
        // 문자를 그릴 위치 (x, y)
        const xPos = i * config.fontSize;
        const yPos = drops[i] * config.fontSize;
        
        ctx.fillText(text, xPos, yPos);

        // 비가 화면 아래로 떨어지면, 랜덤하게 다시 위로 보냅니다.
        if (yPos > canvas.height && Math.random() > 0.985) {
            drops[i] = 0;
        }

        // y좌표를 증가시켜 문자가 아래로 떨어지는 것처럼 보이게 합니다.
        drops[i]++;
    }
}

// 애니메이션 시작 (설정한 speed 값에 따라 반복)
setInterval(draw, config.speed);

// 창 크기가 변경될 때 캔버스 크기도 조절 (반응형 대응)
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
