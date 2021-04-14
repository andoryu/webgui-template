
from flask import Flask
from flask import render_template
from flask import send_from_directory

app = Flask(__name__, static_url_path='/', static_folder="../front",
                        template_folder="../front/views")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/css/<path:path>")
def send_css(path):
    return send_from_directory('../front/css', path)

@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory('../front/js', path)    

@app.route("/images/<path:path>")
def send_imgs(path):
    return send_from_directory('../front/imgs', path)    


app.run(debug=True)