// rain.js (이 코드로 파일을 통째로 덮어쓰세요)

const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const textBlocks = [
    `내가 밥맛이면 자네는 꿀맛이란 말인가?`,
    `축복해라. 결혼엔 그게 필요한 법이지.`,
    `각오는 되어있나? 나는 되어있다.`,
    `希望なのよ。人は分かり合えるかも知れない、ということの`,
    `君は僕と同じだね。`,
    `너는 이제까지 먹은 빵의 개수를 기억하고 있나?`,
    `안 보이는 곳에서 너를 안전하게 지키고 있었다고`,
    `You're a bittersweet bundle of misery`,
    `きみの愛馬が！ずきゅんどきゅん　走り出し(ふっふー)`,
    `遥か彼方僕らは出会ってしまった`,
    `カルマだから何度も出会ってしまうよ`,
    `Take me away from this big bad world`,
    `心よ原始に戻れ`,
    `날개야 다시 돋아라. 날자. 날자.`,
    `무진 Mujin 10km`,
    `eclipse first, the rest nowhere.`
];

// --- 설정 ---
const config = {
    fontSize: 16,
    speed: 33,
    trailColor: 'rgba(240, 248, 255, 0.1)',
    colors: ['#336699', '#427191', '#607d8b', '#78909c'],
    // [핵심 1: 새 문장이 나타날 확률. 숫자가 1에 가까울수록(예: 0.99) 더 뜸하게 나타납니다.]
    spawnChance: 0.97
};
// ---------------------------------------------

let columns;

function setupColumns() {
    const columnCount = Math.floor(canvas.width / config.fontSize);
    columns = [];
    for (let i = 0; i < columnCount; i++) {
        // 모든 세로줄을 '비활성(isActive: false)' 상태로 시작합니다.
        columns.push({ x: i * config.fontSize, isActive: false });
    }
}

// '비활성' 상태인 세로줄 하나를 '활성' 상태로 만드는 함수
function activateRandomColumn() {
    // 쉬고 있는(비활성) 세로줄만 필터링합니다.
    const inactiveColumns = columns.filter(col => !col.isActive);
    if (inactiveColumns.length === 0) return; // 쉴 애가 없으면 아무것도 안 함

    // 쉬는 애들 중에서 랜덤으로 하나를 고릅니다.
    const columnToActivate = inactiveColumns[Math.floor(Math.random() * inactiveColumns.length)];

    // 선택된 세로줄을 초기화하고 '활성' 상태로 만듭니다.
    const sentence = textBlocks[Math.floor(Math.random() * textBlocks.length)];
    columnToActivate.sentence = sentence.replace(/\s/g, '');
    columnToActivate.charIndex = 0;
    columnToActivate.y = 0; // 시작점은 항상 맨 위(y=0)
    columnToActivate.isActive = true; // 깨워서 일 시킴
}

function draw() {
    // 잔상 효과
    ctx.fillStyle = config.trailColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // [핵심 2: 매 프레임마다 확률적으로 새로운 문장을 깨웁니다.]
    if (Math.random() > config.spawnChance) {
        activateRandomColumn();
    }

    ctx.font = `${config.fontSize}px 'DotGothic16'`;

    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        
        // '비활성' 상태인 줄은 그냥 건너뜁니다.
        if (!column.isActive) {
            continue;
        }

        const char = column.sentence[column.charIndex];
        if (char) {
            ctx.fillStyle = config.colors[i % config.colors.length];
            ctx.fillText(char, column.x, column.y);
        }

        column.y += config.fontSize;
        column.charIndex++;

        // 문장이 끝나면 다시 '비활성' 상태로 돌아가 쉬게 합니다.
        if (column.charIndex >= column.sentence.length) {
            column.isActive = false;
        }
    }
}

// 창 크기 변경 시, 세로줄 다시 계산
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setupColumns();
});

// 초기 설정 및 애니메이션 시작
setupColumns();
setInterval(draw, config.speed);
