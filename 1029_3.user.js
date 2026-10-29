// ==UserScript==
// @name         AI 개별 팝업 런처
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  ChatGPT와 Gemini를 화면 우측에 독립된 팝업 창으로 실행
// @author       호씨나
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (window.self !== window.top) return;
    const currentDomain = window.location.hostname;
    if (currentDomain.includes('chatgpt.com') || currentDomain.includes('google.com')) return;

    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 33%;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 9999997;
        user-select: none;
    `;

    function createButton(text, bgColor, onClick) {
        const btn = document.createElement('div');
        btn.innerText = text;
        btn.style.cssText = `
            width: 42px;
            height: 42px;
            background-color: ${bgColor};
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 11px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 8px 0 0 8px;
            box-shadow: -2px 0 5px rgba(0,0,0,0.2);
            opacity: 0.6;
            transition: opacity 0.2s;
        `;
        btn.addEventListener('mouseenter', () => btn.style.opacity = '1');
        btn.addEventListener('mouseleave', () => btn.style.opacity = '0.6');
        btn.addEventListener('click', onClick);
        return btn;
    }

    const width = 450;
    const height = window.screen.availHeight;
    const leftPos = window.screen.availWidth - width;

    const gptBtn = createButton('GPT', '#10a37f', () => {
        window.open(
            'https://chatgpt.com/',
            'GPTWindow',
            `width=${width},height=${height},left=${leftPos},top=0,menubar=no,toolbar=no,location=no,status=no`
        );
    });

    const geminiBtn = createButton('GEM', '#1a73e8', () => {
        window.open(
            'https://gemini.google.com/app',
            'GeminiWindow',
            `width=${width},height=${height},left=${leftPos},top=0,menubar=no,toolbar=no,location=no,status=no`
        );
    });

    container.appendChild(gptBtn);
    container.appendChild(geminiBtn);
    document.body.appendChild(container);
})();
