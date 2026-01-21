# Bytt til SpareBank 1-tema

Endre appen til SpareBank 1 look and feel med følgende endringer:

## CSS (static/style.css)
Bytt ut hele filen med SpareBank 1-styling:
- Bakgrunn: SpareBank 1 mørk blå (#002776)
- Primærfarge: Mørk blå (#002776)
- Sekundærfarge: Lys blå (#0071CE)
- Aksent: SpareBank 1 rød (#C8102E)
- Tekst: Hvit (#FFFFFF)
- Moderne, profesjonell bankstil
- Runde knapper med hover-effekter
- Subtil gradient bakgrunn
- Fjern retro-elementer (scanlines, blinkende cursor)

## HTML templates (index.html, about.html)
- Erstatt `.c64-border` med `.sb1-container`
- Fjern `.scanlines` og `.cursor` elementer
- Fjern retro startup-tekst
- Legg til SpareBank 1 header med logo-tekst:
  ```
  SpareBank 1
  ```
  med rød "1" i logoen
- Endre knapper til `.sb1-button`
- Moderne, ren layout
- Endre instruksjonstekst til norsk bokmål

## app.py konfigurasjon
```python
GAME_CONFIG = {
    "player_color": "#0071CE",      # SpareBank 1 lys blå
    "enemy_color": "#C8102E",       # SpareBank 1 rød
    "bullet_color": "#FFFFFF",      # Hvit
    "enemy_image": "/static/dnb-logo.svg"  # Skyt på konkurrenten!
}
```

Oppdater også docstring og print-melding til "SPAREBANK 1 DEMO APP".
