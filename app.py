"""
SpareBank 1 Demo App - En spill-app for KI-foredrag
Perfekt for å demonstrere live kodeendringer med KI!
"""

from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Spillkonfigurasjon - PERFEKT FOR LIVE DEMO ENDRINGER!
GAME_CONFIG = {
    "player_color": "#0071CE",      # SpareBank 1 blå
    "enemy_color": "#C8102E",       # SpareBank 1 rød
    "bullet_color": "#FFFFFF",      # Hvit
    "player_speed": 8,              # Spillerhastighet
    "bullet_speed": 10,             # Kulehastighet
    "enemy_speed": 2,               # Fiendehastighet
    "enemy_rows": 3,                # Antall rader med fiender
    "enemy_cols": 8,                # Antall kolonner med fiender
    "player_lives": 3,              # Antall liv
    "game_title": "SPACE RAIDERS",  # Spilltittel
    "enemy_image": "/static/dnb-logo.svg"  # Skyt på konkurrenten!
}


@app.route("/")
def index():
    """Hovedside med spillet"""
    return render_template("index.html", config=GAME_CONFIG)


@app.route("/config")
def get_config():
    """API endpoint for spillkonfigurasjon"""
    return jsonify(GAME_CONFIG)


@app.route("/about")
def about():
    """Om-side med info om demoen"""
    return render_template("about.html")


if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("  SPAREBANK 1 DEMO APP")
    print("  Åpne http://localhost:5000 i nettleseren")
    print("=" * 50 + "\n")
    app.run(debug=True, port=5000)
