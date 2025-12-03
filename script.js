// Detect mobile/touch device
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// Add some interactive sparkle effects on mouse move (desktop only)
if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            createSparkle(e.clientX, e.clientY);
        }
    });
}

// Touch sparkle effect for mobile
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(
                touch.clientX + (Math.random() - 0.5) * 50,
                touch.clientY + (Math.random() - 0.5) * 50
            );
        }, i * 50);
    }
}, { passive: true });

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: ${getRandomColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
    `;
    document.body.appendChild(sparkle);

    sparkle.animate([
        { transform: 'scale(1) translate(0, 0)', opacity: 1 },
        { transform: `scale(0) translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`, opacity: 0 }
    ], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => sparkle.remove();
}

function getRandomColor() {
    const colors = ['#ff006e', '#00f5d4', '#00bbf9', '#9b5de5', '#f15bb5', '#fee440'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Click effect on the title
document.querySelectorAll('.word').forEach(word => {
    word.addEventListener('click', () => {
        word.style.animation = 'none';
        word.offsetHeight; // Trigger reflow
        word.style.animation = '';
        
        // Burst of sparkles
        const rect = word.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSparkle(
                    centerX + (Math.random() - 0.5) * rect.width,
                    centerY + (Math.random() - 0.5) * rect.height
                );
            }, i * 30);
        }
    });
});

// Console easter egg
console.log('%c🤖 Nothing AI', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00f5d4, #9b5de5); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cDoes absolutely nothing. But does it with style. ✨', 'font-size: 14px; color: #888;');

// 🥚 Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activatePartyMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activatePartyMode() {
    document.body.classList.add('party-mode');
    
    // Show secret message
    const message = document.createElement('div');
    message.className = 'secret-message';
    message.innerHTML = '🎉 You found the secret! Still does nothing though... 🎉';
    document.body.appendChild(message);
    
    // Confetti explosion
    for (let i = 0; i < 100; i++) {
        setTimeout(() => createConfetti(), i * 20);
    }
    
    // Disco mode
    let hue = 0;
    const disco = setInterval(() => {
        hue = (hue + 10) % 360;
        document.body.style.background = `hsl(${hue}, 50%, 5%)`;
    }, 100);
    
    // Reset after 5 seconds
    setTimeout(() => {
        document.body.classList.remove('party-mode');
        message.remove();
        clearInterval(disco);
        document.body.style.background = '';
    }, 5000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#ff006e', '#00f5d4', '#00bbf9', '#9b5de5', '#f15bb5', '#fee440', '#ff0000', '#00ff00'];
    confetti.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -20px;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 9999;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;
    document.body.appendChild(confetti);

    confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0.8 }
    ], {
        duration: Math.random() * 2000 + 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
}

// 🥚 Secret word easter egg - type "nothing"
let typedWord = '';
const nothingLetters = ['n', 'o', 't', 'h', 'i', 'n', 'g'];
let nothingProgress = 0;

document.addEventListener('keydown', (e) => {
    if (e.key.length === 1) {
        const key = e.key.toLowerCase();
        
        // Check if typing "nothing"
        if (key === nothingLetters[nothingProgress]) {
            nothingProgress++;
            showAnticipation(nothingProgress);
            
            if (nothingProgress === nothingLetters.length) {
                revealTruth();
                nothingProgress = 0;
            }
        } else {
            if (nothingProgress > 0) {
                hideAnticipation();
            }
            nothingProgress = 0;
        }
    }
});

function showAnticipation(progress) {
    let existingHint = document.querySelector('.typing-hint');
    if (!existingHint) {
        existingHint = document.createElement('div');
        existingHint.className = 'typing-hint';
        document.body.appendChild(existingHint);
    }
    
    const hints = [
        "👀",
        "Ooo...",
        "Wait... is it?",
        "No way... 🤔",
        "It's happening!!",
        "COMING SOON™",
        "🚨 ALERT 🚨"
    ];
    
    existingHint.textContent = hints[progress - 1];
    existingHint.style.opacity = '1';
    existingHint.style.transform = `translateX(-50%) scale(${1 + progress * 0.1})`;
}

function hideAnticipation() {
    const hint = document.querySelector('.typing-hint');
    if (hint) {
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 300);
    }
}

function revealTruth() {
    hideAnticipation();
    
    // Drum roll effect
    const drumroll = document.createElement('div');
    drumroll.className = 'drumroll-overlay';
    drumroll.innerHTML = `
        <div class="drumroll-content">
            <p class="drumroll-text">🥁 DRUMROLL PLEASE... 🥁</p>
            <p class="drumroll-text">THE MOMENT YOU'VE BEEN WAITING FOR...</p>
            <p class="drumroll-text">INTRODUCING...</p>
            <p class="drumroll-text reveal-big">✨ NOTHING ✨</p>
            <p class="drumroll-text reveal-small">That's it. That's the whole thing.</p>
            <p class="drumroll-text reveal-emoji">🤷</p>
        </div>
    `;
    document.body.appendChild(drumroll);
    
    setTimeout(() => {
        drumroll.classList.add('fade-out');
        setTimeout(() => drumroll.remove(), 1000);
    }, 6000);
}
