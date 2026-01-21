---
name: musikk
description: Legg til 80-talls chiptune-musikk i spillet med Web Audio API
allowed-tools: Read, Edit, Write
---

# Legg på musikk

Legg til 80-talls chiptune-musikk i spillet!

## 1. Opprett music.js (static/music.js)

```javascript
/**
 * 80-talls Chiptune Musikk Generator
 * Lager autentisk 8-bit lyd med Web Audio API
 */

class ChiptuneMusic {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.masterGain = null;
        this.tempo = 140; // BPM
        this.currentNote = 0;
        this.intervalId = null;
    }

    init() {
        if (this.audioContext) return;

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.audioContext.destination);
    }

    // Noter (frekvenser i Hz)
    notes = {
        'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61,
        'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
        'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46,
        'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
        '-': 0 // Pause
    };

    // Klassisk space invaders-aktig melodi
    melody = [
        'E4', 'C4', 'D4', 'B3', 'C4', 'A3', 'B3', 'G3',
        'E4', 'C4', 'D4', 'B3', 'C4', 'E4', 'G4', 'E4',
        'A4', 'G4', 'E4', 'C4', 'D4', 'E4', 'G4', 'A4',
        'G4', 'E4', 'D4', 'C4', 'D4', 'E4', 'C4', '-',
    ];

    // Bass-linje
    bassLine = [
        'C3', '-', 'G3', '-', 'C3', '-', 'G3', '-',
        'A3', '-', 'E3', '-', 'A3', '-', 'E3', '-',
        'F3', '-', 'C3', '-', 'F3', '-', 'C3', '-',
        'G3', '-', 'D3', '-', 'G3', '-', 'G3', '-',
    ];

    // Lag en oscillator med 8-bit lyd
    createOscillator(frequency, type = 'square', duration = 0.15) {
        if (frequency === 0) return; // Pause

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // Envelope for retro-lyd
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Spill en note
    playNote() {
        if (!this.isPlaying) return;

        const melodyNote = this.melody[this.currentNote % this.melody.length];
        const bassNote = this.bassLine[this.currentNote % this.bassLine.length];

        // Melodi (square wave)
        if (melodyNote !== '-') {
            this.createOscillator(this.notes[melodyNote], 'square', 0.12);
        }

        // Bass (triangle wave for dypere lyd)
        if (bassNote !== '-') {
            this.createOscillator(this.notes[bassNote], 'triangle', 0.2);
        }

        this.currentNote++;
    }

    // Start musikken
    play() {
        this.init();

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (this.isPlaying) return;

        this.isPlaying = true;
        const beatDuration = (60 / this.tempo) * 1000 / 2; // 8th notes

        this.intervalId = setInterval(() => this.playNote(), beatDuration);
    }

    // Stopp musikken
    stop() {
        this.isPlaying = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // Toggle musikk
    toggle() {
        if (this.isPlaying) {
            this.stop();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    // Sett volum (0-1)
    setVolume(value) {
        if (this.masterGain) {
            this.masterGain.gain.value = Math.max(0, Math.min(1, value));
        }
    }
}

// Global musikk-instans
const chiptuneMusic = new ChiptuneMusic();
```

## 2. Oppdater index.html

Legg til i instruksjonene:
```html
<p>P = Pause | R = Start på nytt | M = Musikk</p>
```

Legg til musikk-knapp ved siden av start-knappen:
```html
<button class="sb1-button secondary" onclick="toggleMusic()" id="musicBtn">Musikk: AV</button>
```

Legg til script-tags før `</body>`:
```html
<script src="{{ url_for('static', filename='music.js') }}"></script>
<script>
    function toggleMusic() {
        const isPlaying = chiptuneMusic.toggle();
        document.getElementById('musicBtn').textContent = isPlaying ? 'Musikk: PÅ' : 'Musikk: AV';
    }

    // M-tast for musikk
    document.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
            toggleMusic();
        }
    });
</script>
```

## Resultat
- 8-bit chiptune musikk med Web Audio API
- Square wave melodi + triangle wave bass
- Toggle med knapp eller M-tast
- Autentisk 80-talls datamaskin-lyd!
