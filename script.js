// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Collapsible Introduction Section
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
        const introTitle = introSection.querySelector('h2');
        const introContent = introSection.querySelector('.intro-content');

        introTitle.addEventListener('click', () => {
            introSection.classList.toggle('collapsed');
            const isCollapsed = introSection.classList.contains('collapsed');
            introTitle.setAttribute('aria-expanded', !isCollapsed);
            introContent.setAttribute('aria-hidden', isCollapsed);
        });

        // 페이지 로드 시 항상 펼쳐진 상태로 시작
        introSection.classList.remove('collapsed');
        introTitle.setAttribute('aria-expanded', 'true');
        introContent.setAttribute('aria-hidden', 'false');
    }
});
