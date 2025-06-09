// rain.js (이 코드로 파일을 통째로 덮어쓰세요)

const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 설정 (여기서 디자인을 바꿀 수 있습니다!) ---
const config = {
    font: "15px 'DotGothic16'", // 폰트 크기와 종류
    trailColor: 'rgba(240, 248, 255, 0.1)', // 잔상 색 (밝은 배경용)
    colors: [ // 떨어지는 텍스트의 색상 (어두운 계열)
        '#336699', '#427191', '#607d8b', '#78909c'
    ],
    // 새 텍스트 블록이 생성될 확률 (숫자가 작을수록 더 자주 나타남)
    spawnChance: 0.98,
    // 떨어지는 텍스트 블록의 최대 개수
    maxBlocks: 50
};

// [새로 추가] 떨어뜨릴 텍스트 블록 목록
// 여러 줄로 된 문장은 백틱(`)으로 감싸고, 줄바꿈이 필요한 곳에 엔터를 치면 됩니다.
const textBlocks = [
    `내가 밥맛이면 자네는 꿀맛이란 말인가?`,
    `축복해라. 결혼엔 그게 필요한 법이지.`,
    `각오는 되어있나? 나는 되어있다.`,
    `希望なのよ。人は分かり合えるかも知れない、ということの`,
    `君は僕と同じだね。`,
    `너는 이제까지 먹은 빵의 개수를 기억하고 있나?`,
    `안 보이는 곳에서 너를 안전하게 지키고 있었다고`,
`You're beautiful, I love to
watch your face in the morning light
You're really cool, I like the way we fight right through the night
And the way we used to kiss was
way out of sight
But I can never hope to set you
free
'Cause you're my bittersweet bundle of misery`,
    `きみの愛馬が！ずきゅんどきゅん　走り出し(ふっふー)`,
    `遥か彼方僕らは出会ってしまった`,
`カルマだから
何度も出会ってしまうよ
雲の隙間で
君と集まって星座になれたら`,
`Sociability
It's hard enough for me
Take me away
from this big bad world
And agree to marry me
So we can start all over again`,
`世界よまぶたを閉じて
生命は目覚めて時を紡ぎだす
あなたの証拠をさかのぼるように
そして光が胸に届く
心よ原始に戻れ`,
    `날개야 다시 돋아라. 날자. 날자. 한 번만 더 날자꾸나. 한 번만 더 날아 보자꾸나.`,
`버스가 산모퉁이를 돌아갈 때 나는 '무진 Mujin 10km'라는 이정비를 보았다. 그것은 옛날과 똑같은 모습으로 길가의 잡초 속에서 튀어나와 있었다.`,
    `eclipse first, the rest nowhere.`
];
// ---------------------------------------------

// 활성화된 텍스트 블록들을 관리하는 배열
let activeBlocks = [];

// 텍스트를 여러 줄로 나누는 헬퍼 함수
const splitIntoLines = (text) => text.split('\n');

function createNewBlock() {
    // 랜덤 텍스트 선택 및 줄 나누기
    const text = textBlocks[Math.floor(Math.random() * textBlocks.length)];
    const lines = splitIntoLines(text);

    // 텍스트 블록 객체 생성
    const block = {
        lines: lines,
        x: Math.random() * canvas.width * 0.9, // 화면 가장자리 피하기
        y: -50, // 화면 위에서 시작
        speed: 1 + Math.random() * 1.5, // 다양한 속도
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        // 블록의 전체 높이 계산 (나중에 화면 벗어나는지 체크할 때 사용)
        height: lines.length * parseInt(config.font) 
    };
    activeBlocks.push(block);
}

function draw() {
    // 잔상 효과
    ctx.fillStyle = config.trailColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 새 텍스트 블록 생성 시도
    if (Math.random() > config.spawnChance && activeBlocks.length < config.maxBlocks) {
        createNewBlock();
    }

    // 모든 활성 블록을 그리고 위치 업데이트
    ctx.font = config.font;
    for (let i = activeBlocks.length - 1; i >= 0; i--) {
        const block = activeBlocks[i];
        
        // 텍스트 그리기
        ctx.fillStyle = block.color;
        block.lines.forEach((line, index) => {
            const yPos = block.y + (index * parseInt(config.font) * 1.2); // 줄 간격 1.2배
            ctx.fillText(line, block.x, yPos);
        });

        // 위치 업데이트
        block.y += block.speed;

        // 화면을 벗어난 블록은 배열에서 제거
        if (block.y > canvas.height + block.height) {
            activeBlocks.splice(i, 1);
        }
    }

    requestAnimationFrame(draw); // 부드러운 애니메이션을 위해 setInterval 대신 사용
}

// 창 크기 변경시 캔버스 크기 재조정
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 애니메이션 시작
draw();
