# Bytt til SpareBank 1-tema

Endre appen til SpareBank 1 look and feel med følgende endringer.

**Offisielle farger fra design.sparebank1.no:**

## Fargeplett
- Fjell (mørk blå): #002776
- Vann (blå): #005aa4
- Frost (lys blå): #7eb5d2
- Bær (rød): #db3335
- Skog (grønn): #00754e
- Nordlys (lys grønn): #33af85
- Sol (oransje): #dc8000
- Sand (lys bakgrunn): #f8e9dd
- Natt (mørkest): #001032

## CSS (static/style.css)
Bytt ut hele filen med SpareBank 1-styling:
- Bakgrunn: Gradient fra Fjell (#002776) til Natt (#001032)
- Primærfarge: Fjell (#002776)
- Sekundærfarge: Vann (#005aa4)
- Aksent: Bær (#db3335)
- Lys bakgrunn: Sand (#f8e9dd)
- Font: Open Sans med Arial som fallback
- Border-radius: 4px (små), 8px (standard)
- Moderne, profesjonell bankstil
- Fjern retro-elementer (scanlines, blinkende cursor)

## HTML templates (index.html, about.html)
- Erstatt `.c64-border` med `.sb1-container`
- Fjern `.scanlines` og `.cursor` elementer
- Fjern retro startup-tekst
- Bruk SVG-logo i header:
  ```html
  <img src="{{ url_for('static', filename='sb1-logo-white.svg') }}" alt="SpareBank 1" class="sb1-logo-img">
  ```
  Logo: "SpareBank" i hvit tekst + rød sirkel med gradient (#e60000 til #af0000) med hvit "1"
- Endre knapper til `.sb1-button`
- Moderne, ren layout
- Endre instruksjonstekst til norsk bokmål

## app.py konfigurasjon
```python
GAME_CONFIG = {
    "player_color": "#005aa4",      # Vann - SpareBank 1 blå
    "enemy_color": "#db3335",       # Bær - SpareBank 1 rød
    "bullet_color": "#ffffff",      # Hvit
    "enemy_image": "/static/dnb-logo.svg"  # Skyt på konkurrenten!
}
```

Oppdater også docstring og print-melding til "SPAREBANK 1 DEMO APP".
