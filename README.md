# C64 Demo App

En retro Space Invaders-klon med Commodore 64-estetikk, bygget med Flask og vanilla JavaScript.

Laget som demo-app for foredrag om KI-assistert utvikling og psykisk helse.

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
    "player_color": "#58d854",
    "enemy_color": "#e75b5b",
    "player_speed": 8,
    "enemy_rows": 3,
    "game_title": "SPACE RAIDERS"
}
```

## Teknologi

- Python/Flask
- Vanilla JavaScript (Canvas API)
- CSS med C64-fargeplett
