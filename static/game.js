/**
 * SPACE RAIDERS - Et C64-inspirert spill
 * =====================================
 * Perfekt for live demo med KI!
 *
 * ENKLE TING Å MODIFISERE I DEMOEN:
 * - Endre farge på spilleren (playerColor)
 * - Endre hastigheter (playerSpeed, bulletSpeed, enemySpeed)
 * - Endre antall fiender (enemyRows, enemyCols)
 * - Legg til power-ups
 * - Endre fiendenes bevegelsesmønster
 */

// ============================================
// SPILLVARIABLER
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Spilltilstand
let gameRunning = false;
let gamePaused = false;
let score = 0;
let hiScore = 0;
let lives = CONFIG.playerLives;

// Spiller
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 30,
    speed: CONFIG.playerSpeed,
    color: CONFIG.playerColor
};

// Arrays for spillobjekter
let bullets = [];
let enemies = [];
let particles = [];  // For eksplosjonseffekter

// Fiende-bevegelse
let enemyDirection = 1;
let enemyDropAmount = 20;

// Tastaturinput
const keys = {
    left: false,
    right: false,
    space: false
};

// ============================================
// SPILLOBJEKT-KLASSER
// ============================================

/**
 * Kule-klasse
 * DEMO-IDE: Endre størrelse eller legg til "laser" effekt
 */
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 15;
        this.speed = CONFIG.bulletSpeed;
        this.color = CONFIG.bulletColor;
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Glow effekt
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

/**
 * Fiende-klasse
 * DEMO-IDE: Endre til forskjellige typer fiender
 */
class Enemy {
    constructor(x, y, row) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 30;
        this.row = row;
        this.color = CONFIG.enemyColor;
        this.animFrame = 0;
    }

    update() {
        this.x += CONFIG.enemySpeed * enemyDirection;
    }

    draw() {
        ctx.fillStyle = this.color;

        // Tegn en pixel-art alien
        this.drawPixelAlien();
    }

    drawPixelAlien() {
        const px = 4; // Pixel størrelse
        const startX = this.x;
        const startY = this.y;

        ctx.fillStyle = this.color;

        // Enkel alien sprite (klassisk invader-look)
        const sprite = [
            [0,0,1,0,0,0,0,0,1,0,0],
            [0,0,0,1,0,0,0,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,0,0],
            [0,1,1,0,1,1,1,0,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,0,1],
            [1,0,1,0,0,0,0,0,1,0,1],
            [0,0,0,1,1,0,1,1,0,0,0]
        ];

        for (let row = 0; row < sprite.length; row++) {
            for (let col = 0; col < sprite[row].length; col++) {
                if (sprite[row][col] === 1) {
                    ctx.fillRect(
                        startX + col * px,
                        startY + row * px,
                        px - 1,
                        px - 1
                    );
                }
            }
        }
    }
}

/**
 * Partikkel for eksplosjoner
 * DEMO-IDE: Gjør eksplosjonene større/mer fargerike
 */
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 30;
        this.color = color;
        this.size = Math.random() * 6 + 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.size *= 0.95;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 30;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

// ============================================
// SPILLFUNKSJONER
// ============================================

/**
 * Initialiser fiendene
 * DEMO-IDE: Endre formasjon eller lag mønstre
 */
function initEnemies() {
    enemies = [];
    const startX = 50;
    const startY = 50;
    const spacingX = 60;
    const spacingY = 50;

    for (let row = 0; row < CONFIG.enemyRows; row++) {
        for (let col = 0; col < CONFIG.enemyCols; col++) {
            enemies.push(new Enemy(
                startX + col * spacingX,
                startY + row * spacingY,
                row
            ));
        }
    }
}

/**
 * Lag eksplosjon
 */
function createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle(x, y, color));
    }
}

/**
 * Tegn spilleren
 * DEMO-IDE: Endre skipets design
 */
function drawPlayer() {
    ctx.fillStyle = player.color;

    // Tegn et romskip (trekant-ish form)
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.lineTo(player.x + player.width - 10, player.y + player.height - 5);
    ctx.lineTo(player.x + player.width / 2, player.y + player.height - 15);
    ctx.lineTo(player.x + 10, player.y + player.height - 5);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Motor-flamme
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(player.x + player.width/2 - 5, player.y + player.height - 10, 10, 8 + Math.random() * 5);
}

/**
 * Oppdater spilleren
 */
function updatePlayer() {
    if (keys.left && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.right && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

/**
 * Skyt en kule
 */
let lastShot = 0;
const shootCooldown = 250; // millisekunder mellom skudd

function shoot() {
    const now = Date.now();
    if (now - lastShot > shootCooldown) {
        bullets.push(new Bullet(
            player.x + player.width / 2 - 2,
            player.y
        ));
        lastShot = now;
    }
}

/**
 * Oppdater fiender
 */
function updateEnemies() {
    let hitEdge = false;

    enemies.forEach(enemy => {
        enemy.update();
        if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
            hitEdge = true;
        }
    });

    if (hitEdge) {
        enemyDirection *= -1;
        enemies.forEach(enemy => {
            enemy.y += enemyDropAmount;
        });
    }

    // Sjekk om fiender når bunnen
    enemies.forEach(enemy => {
        if (enemy.y + enemy.height >= player.y) {
            gameOver();
        }
    });
}

/**
 * Sjekk kollisjoner
 */
function checkCollisions() {
    // Kuler mot fiender
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Treff!
                createExplosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2, enemy.color);
                enemies.splice(enemyIndex, 1);
                bullets.splice(bulletIndex, 1);
                score += 100;
                updateScore();

                // Sjekk om alle fiender er drept
                if (enemies.length === 0) {
                    nextLevel();
                }
            }
        });
    });
}

/**
 * Neste nivå
 */
function nextLevel() {
    CONFIG.enemySpeed += 0.5;
    initEnemies();
    score += 500; // Bonus for å fullføre nivå
    updateScore();
}

/**
 * Game over
 */
function gameOver() {
    gameRunning = false;

    if (score > hiScore) {
        hiScore = score;
        document.getElementById('hiScore').textContent = hiScore;
    }

    // Tegn game over skjerm
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px "Press Start 2P"';
    ctx.fillStyle = '#e75b5b';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 20);

    ctx.font = '14px "Press Start 2P"';
    ctx.fillStyle = '#a0a0ff';
    ctx.fillText('TRYKK R FOR Å STARTE PÅ NYTT', canvas.width/2, canvas.height/2 + 30);
}

/**
 * Oppdater score display
 */
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
}

/**
 * Hovedspilløkke
 */
function gameLoop() {
    if (!gameRunning || gamePaused) {
        requestAnimationFrame(gameLoop);
        return;
    }

    // Tøm canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tegn stjernebakgrunn
    drawStars();

    // Oppdater og tegn spiller
    updatePlayer();
    drawPlayer();

    // Oppdater og tegn kuler
    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    // Oppdater og tegn fiender
    updateEnemies();
    enemies.forEach(enemy => enemy.draw());

    // Oppdater og tegn partikler
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    // Sjekk kollisjoner
    checkCollisions();

    // Kontinuerlig skyting hvis mellomrom holdes
    if (keys.space) {
        shoot();
    }

    requestAnimationFrame(gameLoop);
}

// Stjerner i bakgrunnen
const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
    });
}

function drawStars() {
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.fillRect(star.x, star.y, star.size, star.size);
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

// ============================================
// INPUT HANDLING
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === ' ') {
        keys.space = true;
        e.preventDefault();
    }
    if (e.key === 'p' || e.key === 'P') {
        gamePaused = !gamePaused;
        if (gamePaused) {
            ctx.font = '20px "Press Start 2P"';
            ctx.fillStyle = '#ffff00';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', canvas.width/2, canvas.height/2);
        }
    }
    if (e.key === 'r' || e.key === 'R') {
        restartGame();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === ' ') keys.space = false;
});

// ============================================
// SPILL START/RESTART
// ============================================

function restartGame() {
    score = 0;
    lives = CONFIG.playerLives;
    bullets = [];
    particles = [];
    player.x = canvas.width / 2 - 25;
    CONFIG.enemySpeed = 2;
    enemyDirection = 1;

    initEnemies();
    updateScore();

    gameRunning = true;
    gamePaused = false;
}

// Start spilløkken (men ikke selve spillet ennå)
function init() {
    // Tegn startskjerm
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();

    ctx.font = '24px "Press Start 2P"';
    ctx.fillStyle = '#a0a0ff';
    ctx.textAlign = 'center';
    ctx.fillText(CONFIG.gameTitle, canvas.width/2, canvas.height/2 - 40);

    ctx.font = '12px "Press Start 2P"';
    ctx.fillStyle = '#58d854';
    ctx.fillText('TRYKK START FOR Å SPILLE', canvas.width/2, canvas.height/2 + 20);

    ctx.font = '10px "Press Start 2P"';
    ctx.fillStyle = '#787878';
    ctx.fillText('LAGET MED KI-ASSISTANSE', canvas.width/2, canvas.height/2 + 60);

    gameLoop();
}

// Kjør init når siden lastes
init();
