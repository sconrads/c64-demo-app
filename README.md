# Atari Demo App

En retro Space Invaders-klon med Atari 2600-estetikk, bygget med Flask og vanilla JavaScript.

Laget som demo-app for foredrag om KI-assistert utvikling og psykisk helse.

## Funksjoner

- Klassisk "wood grain" Atari-design
- Regnbue-striper (ikonisk Atari-element)
- Retro fargeplett fra Atari 2600
- CRT vignette-effekt

## Kjøring

```bash
pip install flask
python app.py
```

Åpne http://localhost:5000

## Spillkontroller

- **Piltaster**: Beveg skipet
- **Mellomrom**: Skyt
- **P**: Pause
- **R**: Restart

## Demo-konfigurasjon

Endre verdier i `app.py` for live-demo:

```python
GAME_CONFIG = {
    "player_color": "#30a030",
    "enemy_color": "#e85800",
    "player_speed": 8,
    "enemy_rows": 3,
    "game_title": "SPACE RAIDERS"
}
```

## Teknologi

- Python/Flask
- Vanilla JavaScript (Canvas API)
- CSS med Atari-fargeplett og wood grain-effekt
