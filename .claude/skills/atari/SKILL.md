---
name: atari
description: Bytt demo-appen til Atari 2600 look and feel med wood grain, regnbue-striper og retro farger
allowed-tools: Read, Edit, Write
---

# Bytt til Atari 2600-tema

Endre appen til Atari 2600 look and feel med følgende endringer:

## CSS (static/style.css)
Bytt ut hele filen med Atari-styling:
- Bakgrunn: Wood grain gradient (brun toner: #3c2000, #6c4400, #a06800)
- Border: `.atari-border` med wood grain effekt og silver ramme
- Inner container: `.inner-border` med svart bakgrunn
- Fargepalett: Atari-farger (oransje #e85800, gul #e8d020, grønn #30a030)
- Rainbow stripe: `.rainbow-stripe` - horisontal regnbue (rød→oransje→gul→grønn→cyan→blå→lilla)
- Knapper: `.atari-button` - runde, grå knapper med gradient
- CRT-effekt: `.crt-effect` - vignette (mørkere i kantene)
- Fjern blinkende cursor og scanlines

## HTML templates (index.html, about.html)
- Erstatt `.c64-border` med `.atari-border` og `.inner-border`
- Erstatt `.scanlines` med `.crt-effect`
- Legg til `.rainbow-stripe` elementer (over og under spillet)
- Legg til "A T A R I" logo med `.atari-logo` klasse
- Endre knapper fra `.c64-button` til `.atari-button`
- Endre "MELLOMROM = SKYT" til "FIRE BUTTON = SKYT"
- Endre "START SPILL" til "GAME SELECT"
- Fjern C64 startup-tekst og blinkende cursor

## app.py konfigurasjon
```python
GAME_CONFIG = {
    "player_color": "#30a030",      # Atari grønn
    "enemy_color": "#e85800",       # Atari oransje
    "bullet_color": "#e8d020",      # Atari gul
}
```

Oppdater også docstring og print-melding til "ATARI 2600 DEMO APP".
