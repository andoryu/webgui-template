
from flask import Flask
from flask import render_template
from flask import send_from_directory

from flask_socketio import emit, SocketIO


app = Flask(__name__, static_url_path='/', static_folder="../front/assets",
                        template_folder="../front/views/")

app.config['SECRET KEY'] = 'deadbeef'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/assets/<path:path>")
def send_css(path):
    return send_from_directory('../front/assets/', path)

@socketio.on('sys')
def websocket_system(data):
    message = {
        'command': 'log',
        'data'   : "Wallaby Ted's cousin - Roo Ted"
    }
    emit("sys", message)

@socketio.on('app')
def websocket_app(data):
    print("app:", data)


if __name__ == "__main__":
    socketio.run(app)
