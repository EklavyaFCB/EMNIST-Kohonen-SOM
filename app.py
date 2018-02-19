from flask import Flask
from flask import render_template
app = Flask(__name__)
 
@app.route("/")
def index():
    return render_template('index.html')

@app.route('/dataset')
def dataset():
    return render_template('dataset.html')

@app.route('/about')
def about():
    return render_template('about.html')
 
if __name__ == "__main__":
    app.run()