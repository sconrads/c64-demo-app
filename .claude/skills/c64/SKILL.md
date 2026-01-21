---
name: c64
description: Bytt demo-appen til Commodore 64 look and feel med blå bakgrunn, BASIC startup-tekst og blinkende cursor
allowed-tools: Read, Edit, Write
---

# Bytt til Commodore 64-tema

Endre appen til Commodore 64 look and feel med følgende endringer:

## CSS (static/style.css)
Bytt ut hele filen med C64-styling:
- Bakgrunn: Klassisk C64 blå (#4040e0)
- Border: `.c64-border` med lys blå ramme (#a0a0ff)
- Fargepalett: C64-farger (grønn #58d854, rød #e75b5b, cyan #58d8d8, lys blå #a0a0ff)
- Blinkende cursor: `.cursor` med animation
- Scanlines: `.scanlines` - horisontale linjer for CRT-look
- Knapper: `.c64-button` - kantete, grå knapper
- Fjern wood grain og rainbow stripe

## HTML templates (index.html, about.html)
- Erstatt `.atari-border` og `.inner-border` med `.c64-border`
- Erstatt `.crt-effect` med `.scanlines`
- Fjern `.rainbow-stripe` elementer
- Fjern Atari-logo
- Legg til C64 startup-tekst:
  ```
  **** COMMODORE 64 BASIC V2 ****
  64K RAM SYSTEM  38911 BASIC BYTES FREE
  READY.
  ```
- Legg til blinkende cursor med `.cursor` klasse etter "READY."
- Endre knapper fra `.atari-button` til `.c64-button`
- Endre "FIRE BUTTON = SKYT" til "MELLOMROM = SKYT"
- Endre "GAME SELECT" til "START SPILL"

## app.py konfigurasjon
```python
GAME_CONFIG = {
    "player_color": "#58d854",      # C64 grønn
    "enemy_color": "#e75b5b",       # C64 rød
    "bullet_color": "#ffff00",      # Gul
}
```

Oppdater også docstring og print-melding til "COMMODORE 64 DEMO APP".
