from flask import Flask, make_response
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

@app.route('/1')
def one():
    return render_template('1.html')

@app.route('/1_2')
def oneTwo():
    return render_template('1_2.html')

@app.route('/2')
def two():
    return render_template('2.html')

@app.route('/3')
def three():
    return render_template('3.html')

if __name__ == "__main__":
    app.run(debug=True)