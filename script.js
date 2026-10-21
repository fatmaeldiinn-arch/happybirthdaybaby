// ===== القلوب الطايرة =====
function createHearts() {
  const container = document.querySelector('.hearts');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (14 + Math.random() * 22) + 'px';
    heart.style.animationDuration = (7 + Math.random() * 5) + 's';
    heart.style.animationDelay = (Math.random() * 8) + 's';
    heart.style.opacity = 0.5 + Math.random() * 0.5;
    container.appendChild(heart);
  }
}
createHearts();

// ===== دالة الاحتفال (Confetti) =====
function fireConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#d6336c', '#ffffff', '#ffeb3b', '#4fc3f7']
    });
  }
}

// ===== العد التنازلي ورسالة عيد الميلاد =====
let count = 5;
const countdownEl = document.getElementById('countdown');
const flames = document.querySelectorAll('.flame');
const nextBtn1 = document.getElementById('nextBtn1');
const bdayMsg = document.getElementById('bdayMsg');

const timer = setInterval(() => {
  count--;
  if (count > 0) {
    if(countdownEl) {
        countdownEl.textContent = count;
        countdownEl.style.transform = 'scale(1.2)';
        setTimeout(() => countdownEl.style.transform = 'scale(1)', 200);
    }
  } else {
    clearInterval(timer);
    if (countdownEl) countdownEl.classList.add('done');
    flames.forEach(f => f.classList.add('out'));
    
    // 1. الاحتفال
    fireConfetti();

    // 2. كتابة الرسالة حرف حرف
    setTimeout(() => {
      typeWriter("Happy Birthday To My ZOZZZYYYY 🥰", 0);
    }, 500);
  }
}, 1000);

// دالة كتابة الحروف
function typeWriter(text, i) {
  if (!bdayMsg) return;
  if (i < text.length) {
    bdayMsg.innerHTML += text.charAt(i);
    bdayMsg.style.opacity = 1;
    setTimeout(() => typeWriter(text, i + 1), 80);
  } else {
    if (nextBtn1) setTimeout(() => nextBtn1.classList.add('show'), 500);
  }
}

// ===== مشغل الأغاني =====
const audioPlayers = document.querySelectorAll('.custom-audio');

audioPlayers.forEach(player => {
  const audioSrc = player.getAttribute('data-src');
  if (!audioSrc) return;

  const audio = new Audio(audioSrc);
  audio.preload = 'metadata';
  player.audioElement = audio; // بنحفظ الأغنية جوه الديف عشان نستخدمها بعدين
  
  const playBtn = player.querySelector('.play-pause');
  const playIcon = player.querySelector('.icon-play');
  const pauseIcon = player.querySelector('.icon-pause');
  const seekBar = player.querySelector('.seek-bar');
  const currentTimeEl = player.querySelector('.current');
  const totalTimeEl = player.querySelector('.total');

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  audio.addEventListener('loadedmetadata', () => {
    if (totalTimeEl) totalTimeEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    if (seekBar && currentTimeEl) {
      const progress = (audio.currentTime / audio.duration) * 100;
      seekBar.value = progress;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  if (seekBar) {
    seekBar.addEventListener('input', () => {
      const time = (seekBar.value / 100) * audio.duration;
      audio.currentTime = time;
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        // نقفل أي أغنية تانية شغالة
        audioPlayers.forEach(p => {
          if (p !== player && p.audioElement) {
            p.audioElement.pause();
            p.querySelector('.icon-play').style.display = 'block';
            p.querySelector('.icon-pause').style.display = 'none';
          }
        });
        
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });
  }
});

// ===== التنقل بين الشاشات =====
function goToScreen(currentId, nextId) {
  document.getElementById(currentId).classList.remove('active');
  const nextScreen = document.getElementById(nextId);
  nextScreen.classList.add('active');
  
  document.querySelector('.app-container').scrollTo(0, 0);

  // لو إحنا رايحين للشاشة التالتة (صورته)
  if (nextId === 'screen3') {
    fireConfetti();

    setTimeout(() => {
      const screen3AudioDiv = document.getElementById('screen3Audio');
      if (screen3AudioDiv) {
        const playBtn = screen3AudioDiv.querySelector('.play-pause');
        if (playBtn) {
          playBtn.click(); 
        }
      }
    }, 300);
  }
}

// ===== ربط الأزرار =====
function bindNextButton(btnId, currentScreen, nextScreen) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener('click', () => goToScreen(currentScreen, nextScreen));
  }
}

bindNextButton('nextBtn1', 'screen1', 'screen2');
bindNextButton('nextBtn2', 'screen2', 'screen3');
bindNextButton('nextBtn3', 'screen3', 'screen4');
bindNextButton('nextBtn4', 'screen4', 'screen5');
bindNextButton('nextBtn5', 'screen5', 'screen6');
bindNextButton('nextBtn6', 'screen6', 'screen7');
bindNextButton('nextBtn7', 'screen7', 'screen8');