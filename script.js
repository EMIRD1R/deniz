document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded!');
    
    // MÜZİK SİSTEMİ - OTOMATIK BAŞLATMA
    const music = document.getElementById('background-music');
    
    // Otomatik başlatma fonksiyonu
    function autoStartMusic() {
        if (music) {
            music.currentTime = 15;
            music.volume = 0.5;
            music.play().then(() => {
                console.log('🎵 Müzik başarıyla başladı!');
            }).catch(e => {
                console.log('Başlatma denemesi:', e.message);
            });
        }
    }
    
    if (music) {
        console.log('Müzik elementi bulundu');
        
        // Hemen başlatmayı dene
        autoStartMusic();
        
        // Müzik yüklendiğinde
        music.addEventListener('loadeddata', () => {
            console.log('Müzik yüklendi');
            music.currentTime = 15; // 15. saniyeye git
            music.volume = 0.5;     // Ses seviyesi
            music.play();           // Çal
            console.log('🎵 Müzik 15. saniyeden başlatıldı!');
        });
        
        // Eğer yüklenmişse direkt başlat
        if (music.readyState >= 2) {
            music.currentTime = 15;
            music.volume = 0.5;
            music.play();
            console.log('🎵 Müzik zaten yüklü, 15. saniyeden başladı!');
        }
        
        // Direkt başlatmayı dene
        setTimeout(() => {
            music.currentTime = 15;
            music.volume = 0.5;
            music.play().then(() => {
                console.log('🎵 Müzik otomatik başladı!');
            }).catch(() => {
                console.log('Otomatik başlatma engellendi, alternatif deneniyor...');
                // Alternatif yöntem: fake user interaction
                setTimeout(() => {
                    music.currentTime = 15;
                    music.volume = 0.5;
                    music.play();
                    console.log('🎵 Alternatif yöntemle başladı!');
                }, 100);
            });
        }, 500);
        
        // 1 saniye sonra kontrol et
        setTimeout(() => {
            if (music.paused) {
                music.currentTime = 15;
                music.volume = 0.5;
                music.play();
                console.log('🎵 1 saniye sonra müzik başlatıldı!');
            }
        }, 1000);
        
        // 2 saniye sonra da kontrol et
        setTimeout(() => {
            if (music.paused) {
                music.currentTime = 15;
                music.volume = 0.5;
                music.play();
                console.log('🎵 2 saniye sonra müzik başlatıldı!');
            }
        }, 2000);
        
        // İlk 10 saniye her 200ms kontrol et
        let checkCount = 0;
        const musicChecker = setInterval(() => {
            checkCount++;
            if (music.paused) {
                autoStartMusic();
                console.log(`🎵 ${checkCount}. kontrol - müzik başlatılıyor...`);
            } else {
                console.log('✅ Müzik çalıyor, kontrol durduruluyor');
                clearInterval(musicChecker);
            }
            
            // 50 kez denedikten sonra durdur (10 saniye)
            if (checkCount >= 50) {
                clearInterval(musicChecker);
                console.log('Müzik kontrol sistemi durdu');
            }
        }, 200);
        
        // "Tıkla" yazısına tıklanınca
        const clickText = document.getElementById('click-text');
        if (clickText) {
            clickText.addEventListener('click', () => {
                autoStartMusic();
                clickText.style.display = 'none'; // Yazıyı gizle
                console.log('🎵 "Tıkla" yazısına tıklanarak müzik başladı!');
            });
        }
        
        // Müzik başlarsa yazıyı gizle
        music.addEventListener('play', () => {
            if (clickText) {
                clickText.style.display = 'none';
                console.log('Müzik başladı, "tıkla" yazısı gizlendi');
            }
        });
    }
    
    // Matrix efektini başlat
    createMatrixEffect();
    console.log('Matrix efekti başlatıldı');
    
    // Sistem bozuldu efektlerini başlat
    startSystemCorruption();
    console.log('System corruption başlatıldı');
    
    // Yıkıntı efektlerini başlat
    startRuinsEffects();
    console.log('Ruins effects başlatıldı');
    
    // Elementleri al
    const systemCrashMsg = document.getElementById('system-crash-msg');
    const dataDeleteMsg = document.getElementById('data-delete-msg');
    const loadingContainer = document.getElementById('loading-container');
    
    console.log('Elementler bulundu:', { systemCrashMsg, dataDeleteMsg, loadingContainer });
    
    // AKIŞ BAŞLAT
    
         // 1. Önce "Sistem başlatılıyor..." göster (3 saniye)
     systemCrashMsg.style.display = 'block';
     console.log('1. Sistem başlatılıyor mesajı gösteriliyor...');
    
    setTimeout(() => {
        // 2. "Herşey yalanmış..." göster (3 saniye)
        systemCrashMsg.style.display = 'none';
        dataDeleteMsg.style.display = 'block';
        console.log('2. Herşey yalanmış mesajı gösteriliyor...');
        
        setTimeout(() => {
            // 3. Loading bar göster ve başlat (3 saniye)
            dataDeleteMsg.style.display = 'none';
            loadingContainer.style.display = 'block';
            console.log('3. Loading başlatılıyor...');
            
            startDataDeletion().then(() => {
                // 4. Final mesajı göster
                loadingContainer.style.display = 'none';
                console.log('4. Final mesaj gösteriliyor...');
                showFinalMessage();
            });
        }, 3000);
    }, 3000);
});

// Sistem bozulma efektleri
function startSystemCorruption() {
    // Static overlay'i aktifleştir
    const staticOverlay = document.querySelector('.static-overlay');
    staticOverlay.style.opacity = '1';
    
    // Random screen tear efektleri
    setInterval(() => {
        if (Math.random() > 0.8) {
            createScreenTear();
        }
    }, 2000);
}

function triggerGlitch() {
    const staticOverlay = document.querySelector('.static-overlay');
    staticOverlay.style.opacity = '1';
    
    setTimeout(() => {
        staticOverlay.style.opacity = '0.3';
    }, 200);
}

function createScreenTear() {
    const tear = document.createElement('div');
    tear.className = 'screen-tear';
    tear.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(tear);
    
    setTimeout(() => {
        document.body.removeChild(tear);
    }, 800);
}

// Matrix efekti - kırık kalpler
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

    // Kırık kalp karakterleri kullan
    const brokenHearts = ['💔', '🖤', '💀', '⚡', '❌'];
    const fontSize = 16; // Karakterlerin boyutu
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Random renk seç (kırmızı/gri tonları)
        const colors = ['#ff0000', '#800000', '#666666', '#333333', '#ff3333'];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.font = `${fontSize}px Arial`;

        for (let i = 0; i < drops.length; i++) {
            const symbol = brokenHearts[Math.floor(Math.random() * brokenHearts.length)];
            ctx.fillText(symbol, i * fontSize, drops[i] * fontSize);
            
            // Karakterlerin düşme hızını ve yeniden başlama olasılığını ayarla
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

    setInterval(draw, 40); // Biraz daha yavaş (25 FPS)
}

// Daktilo efekti
function typeWriterEffect(element, text, speed) {
    return new Promise(resolve => {
        let i = 0;
        element.innerHTML = ''; // textContent yerine innerHTML kullan
        
        // \n karakterlerini <br> ile değiştir
        const formattedText = text.replace(/\n/g, '<br>');
        
        function type() {
            if (i < formattedText.length) {
                // HTML tag'larını doğru işle
                if (formattedText.charAt(i) === '<') {
                    const tagEnd = formattedText.indexOf('>', i);
                    if (tagEnd !== -1) {
                        element.innerHTML += formattedText.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        element.innerHTML += formattedText.charAt(i);
                        i++;
                    }
                } else {
                    element.innerHTML += formattedText.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            } else {
                setTimeout(resolve, 500);
            }
        }
        
        type();
    });
}

// CSS override kaldırıldı - HTML'deki CSS'i kullanıyoruz

// Yıkıntı efektlerini başlat
function startRuinsEffects() {
    // Sistem parçacıklarını oluştur
    createSystemFragments();
    
    // Corruption lines oluştur
    createCorruptionLines();
    
    // Random sistem arızaları
    setInterval(() => {
        if (Math.random() > 0.7) {
            triggerSystemGlitch();
        }
    }, 1000);
}

function createSystemFragments() {
    const container = document.querySelector('.system-fragments');
    const fragments = ['ERROR', '404', 'NULL', 'CRASH', '💔', 'FAILED', 'LOST', 'BROKEN'];
    
    setInterval(() => {
        const fragment = document.createElement('div');
        fragment.className = 'fragment';
        fragment.textContent = fragments[Math.floor(Math.random() * fragments.length)];
        fragment.style.left = Math.random() * window.innerWidth + 'px';
        fragment.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(fragment);
        
        setTimeout(() => {
            container.removeChild(fragment);
        }, 5000);
    }, 500);
}

function createCorruptionLines() {
    const container = document.querySelector('.corruption-lines');
    
    setInterval(() => {
        const line = document.createElement('div');
        line.className = 'corruption-line';
        line.style.top = Math.random() * window.innerHeight + 'px';
        line.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(line);
        
        setTimeout(() => {
            container.removeChild(line);
        }, 3000);
    }, 800);
}

function triggerSystemGlitch() {
    const ruinsOverlay = document.querySelector('.ruins-overlay');
    const systemNoise = document.querySelector('.system-noise');
    
    // Ruins overlay'i geçici olarak göster
    ruinsOverlay.style.opacity = '1';
    systemNoise.style.opacity = '0.3';
    
    setTimeout(() => {
        ruinsOverlay.style.opacity = '0';
        systemNoise.style.opacity = '0.1';
    }, 150);
}

function showFinalMessage() {
    console.log('showFinalMessage çağrıldı!');
    
    // Müziği normal hızda tut
    const music = document.getElementById('background-music');
    if (music) {
        music.playbackRate = 1.0; // Müziği normal hızında çal
        music.volume = 0.7; // Ses seviyesini artır
        console.log('Müzik normal hızda tutuluyor');
    }
    
    // Tüm yıkıntı efektlerini maksimuma çıkar
    intensifyRuinsEffects();
    
    // Final mesaj container'ını göster
    const finalContainer = document.getElementById('final-message-container');
    if (finalContainer) {
        finalContainer.style.display = 'block';
        console.log('Final message container gösterildi');
    } else {
        console.error('Final message container bulunamadı!');
    }
}

// Yıkıntı efektlerini yoğunlaştır
function intensifyRuinsEffects() {
    const ruinsOverlay = document.querySelector('.ruins-overlay');
    const systemNoise = document.querySelector('.system-noise');
    
    // Efektleri daha yoğun yap
    ruinsOverlay.style.opacity = '0.8';
    systemNoise.style.opacity = '0.5';
    
    // Daha sık glitch efektleri
    setInterval(() => {
        triggerSystemGlitch();
    }, 300);
}

// Loading ve veri silme animasyonu
function startDataDeletion() {
    return new Promise(resolve => {
        const loadingFill = document.querySelector('.loading-fill');
        const loadingPercent = document.getElementById('loading-percent');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random artış
            if (progress > 100) progress = 100;
            
            loadingFill.style.width = progress + '%';
            loadingPercent.textContent = Math.floor(progress) + '%';
            
            // Random glitch efektleri loading sırasında
            if (Math.random() > 0.7) {
                triggerSystemGlitch();
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(resolve, 1000);
            }
        }, 200);
    });
}
