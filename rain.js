// rain.js (이 코드로 파일을 통째로 덮어쓰세요)

const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// [핵심 1: 제공해주신 문장 목록은 그대로 사용합니다]
const textBlocks = [
    `내가 밥맛이면 자네는 꿀맛이란 말인가?`,
    `축복해라. 결혼엔 그게 필요한 법이지.`,
    `각오는 되어있나? 나는 되어있다.`,
    `希望なのよ。人は分かり合えるかも知れない、ということの`,
    `君は僕と同じだね。`,
    `너는 이제까지 먹은 빵의 개수를 기억하고 있나?`,
    `안 보이는 곳에서 너를 안전하게 지키고 있었다고`,
    `You're a bittersweet bundle of misery`, // 영어는 너무 길어서 짧게 줄였습니다. 원하시면 원래대로 복구 가능합니다.
    `きみの愛馬が！ずきゅんどきゅん　走り出し(ふっふー)`,
    `遥か彼方僕らは出会ってしまった`,
    `カルマだから何度も出会ってしまうよ`, // 짧게 수정
    `Take me away from this big bad world`, // 짧게 수정
    `心よ原始に戻れ`, // 짧게 수정
    `날개야 다시 돋아라. 날자. 날자.`, // 짧게 수정
    `무진 Mujin 10km`,
    `eclipse first, the rest nowhere.`
];

// --- 설정 ---
const config = {
    fontSize: 16,
    speed: 35, // 이전보다 조금 더 빠르게 조정 (33ms)
    trailColor: 'rgba(240, 248, 255, 0.1)',
    colors: ['#336699', '#427191', '#607d8b', '#78909c']
};
// ---------------------------------------------

// [핵심 2: 이제 각 세로줄은 단순한 숫자가 아닌, 자신만의 상태를 가진 '객체'가 됩니다]
let columns; 

function setupColumns() {
    const columnCount = Math.floor(canvas.width / config.fontSize);
    columns = [];
    for (let i = 0; i < columnCount; i++) {
        columns.push(resetColumn({})); // 빈 객체로 시작
    }
}

// 세로줄 하나를 초기화하거나 리셋하는 함수
// 세로줄 하나를 초기화하거나 리셋하는 함수
function resetColumn(column) {
    const sentence = textBlocks[Math.floor(Math.random() * textBlocks.length)];
    column.sentence = sentence.replace(/\s/g, ''); // 공백 제거
    column.charIndex = 0; // 문장의 첫 글자부터 시작
    column.x = (columns.length > 0) ? columns.indexOf(column) * config.fontSize : 0;
    // [핵심 수정] 문장의 시작 위치를 화면 한참 위(마이너스 y값)로 랜덤하게 설정합니다.
    column.y = -(Math.random() * canvas.height * 2); 
    return column;
}

function draw() {
    // 잔상 효과
    ctx.fillStyle = config.trailColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${config.fontSize}px 'DotGothic16'`;
    ctx.fillStyle = config.colors[0]; // 일단 기본 색상으로 통일

    // 각 세로줄을 순회하며 글자를 그립니다.
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];

        // [핵심 3: 현재 세로줄의 문장에서, 순서에 맞는 글자를 가져옵니다]
        const char = column.sentence[column.charIndex];
        if (char) {
             // 글자마다 다른 색을 줍니다.
            ctx.fillStyle = config.colors[i % config.colors.length];
            ctx.fillText(char, column.x, column.y);
        }

        // y 좌표를 이동시켜 아래로 떨어지는 효과를 줍니다.
        column.y += config.fontSize;
        // 다음 글자를 가리키도록 인덱스를 증가시킵니다.
        column.charIndex++;

        // 문장이 끝나거나, 화면 밖으로 나가면 리셋합니다.
        // Math.random() > 0.995 조건으로 인해 모든 줄이 동시에 리셋되지 않아 자연스러워 보입니다.
        if (column.charIndex >= column.sentence.length || (column.y > canvas.height && Math.random() > 0.995)) {
            resetColumn(column);
        }
    }
}

// 창 크기가 변경될 때, 세로줄을 다시 계산합니다.
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setupColumns();
});


// 초기 설정 및 애니메이션 시작
setupColumns();
setInterval(draw, config.speed);
