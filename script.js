document.addEventListener('DOMContentLoaded', async () => {
    // Konfeti scriptini başta yükle
    await loadConfetti();
    
    // Matrix efektini başlat
    createMatrixEffect();
    
    // 1. İlk mesaj: Sistem başlatılıyor...
    const systemMessage = document.getElementById('system-message');
    systemMessage.style.display = 'block';
    systemMessage.style.opacity = '1';
    await typeWriterEffect(systemMessage, '> Sistem başlatılıyor...', 50);
    await new Promise(resolve => setTimeout(resolve, 1500));
    systemMessage.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 500));
    systemMessage.style.display = 'none';
    
    // 2. Hoşgeldin mesajı
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.style.display = 'block';
    welcomeMessage.style.opacity = '1';
    await typeWriterEffect(welcomeMessage, '> Hoşgeldin Deniz...', 50);
    await new Promise(resolve => setTimeout(resolve, 2000));
    welcomeMessage.style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 500));
    welcomeMessage.style.display = 'none';
    
    // 3. Mesaj containerı göster
    const messageContainer = document.getElementById('message-container');
    messageContainer.style.display = 'block';
    
    // 4. Müzik başlat
    const music = new Audio('./music.mp3');
    music.loop = true;
    music.volume = 0.5;
    music.play().catch(() => {
        document.addEventListener('click', () => music.play(), { once: true });
    });
    
    // 5. Diğer mesajları sırayla göster
    const messages = document.querySelectorAll('.message');
    for (let i = 1; i < messages.length; i++) {
        const message = messages[i];
        message.style.display = 'block';
        await typeWriterEffect(message, message.textContent.trim(), 30);
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // 6. Butonları göster
    const buttons = document.querySelector('.buttons');
    buttons.style.display = 'flex';
    buttons.style.opacity = '1';
    
    // 7. Buton eventlerini ekle
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    
    // Hayır butonu için
    function moveNoButton() {
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    }
    
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', async (e) => {
        // Google Forms'a veri gönder
        const formData = new FormData();
        formData.append('entry.920808357', 'HAYIR');
        
        try {
            await fetch('https://docs.google.com/forms/d/e/920808357/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });
            console.log('Cevap kaydedildi: HAYIR');
        } catch (error) {
            console.error('Form gönderiminde hata:', error);
        }
        
        moveNoButton();
    });
    
    // Evet butonu için
    yesBtn.addEventListener('click', async () => {
        // Google Forms'a veri gönder
        const formData = new FormData();
        formData.append('entry.920808357', 'EVET');
        
        try {
            await fetch('https://docs.google.com/forms/d/e/920808357/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });
            console.log('Cevap kaydedildi: EVET');
        } catch (error) {
            console.error('Form gönderiminde hata:', error);
        }
        
        // Mevcut mesajları gizle
        messageContainer.style.display = 'none';
        
        
        // Özel stil ekle
        const style = document.createElement('style');
        style.textContent = `
            .love-card {
                background: linear-gradient(45deg, #000000, #1a0012);
                padding: 40px;
                border-radius: 20px;
                border: 3px solid #ff69b4;
                box-shadow: 0 0 30px rgba(255, 105, 180, 0.5);
                text-align: center;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 80%;
                animation: cardGlow 2s infinite;
                z-index: 1000;
            }

            .love-message {
                color: #ff69b4;
                font-size: 2.5em;
                text-shadow: 0 0 10px rgba(255, 105, 180, 0.8);
                margin-bottom: 20px;
                font-family: 'Arial', sans-serif;
            }

            .love-submessage {
                color: #ff8dc7;
                font-size: 1.2em;
                text-shadow: 0 0 8px rgba(255, 141, 199, 0.8);
                margin-top: 30px;
                font-family: 'Arial', sans-serif;
                letter-spacing: 2px;
            }

            @keyframes cardGlow {
                0% { box-shadow: 0 0 30px rgba(255, 105, 180, 0.5); }
                50% { box-shadow: 0 0 50px rgba(255, 105, 180, 0.8); }
                100% { box-shadow: 0 0 30px rgba(255, 105, 180, 0.5); }
            }
        `;
        document.head.appendChild(style);
        
        // Kart container'ı oluştur
        const card = document.createElement('div');
        card.className = 'love-card';
        document.body.appendChild(card);
        
        // Ana mesaj için div
        const mainMessage = document.createElement('div');
        mainMessage.className = 'love-message';
        card.appendChild(mainMessage);
        
        // Alt mesaj için div
        const subMessage = document.createElement('div');
        subMessage.className = 'love-submessage';
        card.appendChild(subMessage);
        
        // Konfeti efektleri
        const colors = ['#FF69B4', '#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'];
        
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors
        });

        setTimeout(() => {
            confetti({
                particleCount: 70,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });

            confetti({
                particleCount: 70,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });
        }, 500);

        // Sürekli konfeti
        const duration = 5 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        
        // Mesajları yaz
        await typeWriterEffect(mainMessage, '❤️ Seni Çok Seviyorum Deniz! ❤️', 50);
        await new Promise(resolve => setTimeout(resolve, 500));
        await typeWriterEffect(subMessage, '💝 Bu anı hiç unutmayacağım... 💝', 50);
        
        // Konfeti yağmurunu başlat
        frame();
    });
});

// Matrix efekti ve diğer yardımcı fonksiyonlar aynı kalacak...

// Matrix efekti - yeşil yazılar
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Sadece kalp karakteri kullan
    const hearts = ['♥'];
    const fontSize = 14; // Kalplerin boyutu
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0'; // Matrix yeşili
        ctx.font = `${fontSize}px Arial`; // Kalpler için daha uygun font

        for (let i = 0; i < drops.length; i++) {
            const heart = hearts[Math.floor(Math.random() * hearts.length)];
            ctx.fillText(heart, i * fontSize, drops[i] * fontSize);
            
            // Kalplerin düşme hızını ve yeniden başlama olasıl��ğını ayarla
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Pencere boyutu değişince canvas'ı güncelle
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    setInterval(draw, 33); // Yaklaşık 30 FPS
}

// Daktilo efekti
function typeWriterEffect(element, text, speed) {
    return new Promise(resolve => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(resolve, 500);
            }
        }
        
        type();
    });
}

// CSS ekleyelim
const style = document.createElement('style');
style.textContent += `
    .message, .welcome-message {
        color: #0F0;
        text-shadow: 0 0 5px #0F0;
        font-family: 'Courier New', monospace;
        font-size: 1.5em;
        margin: 20px 0;
        opacity: 0;
        display: none;
        transition: opacity 0.5s;
    }
`;
document.head.appendChild(style);
// Konfeti için script'i yükle
function loadConfetti() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
        script.onload = resolve;
        document.head.appendChild(script);
    });
}
