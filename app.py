from flask import Flask
from flask import render_template
from flask import request
#import som
#import RGB

app = Flask(__name__)
 
@app.route("/")
def index():
    return render_template('index.html')

@app.route('/1')
def one():
    return render_template('1.html')

@app.route('/cards1')
def cards1():
    return render_template('cards1.html')

@app.route('/cards2')
def cards2():
    return render_template('cards2.html')

@app.route('/cards3')
def cards3():
    return render_template('cards3.html')

@app.route('/1_3')
def oneThree():
    return render_template('1_3.html')

@app.route('/1_4')
def oneFour():
    return render_template('1_4.html')

@app.route('/1_5')
def oneFive():
    return render_template('1_5.html')

@app.route('/2')
def two():
    return render_template('2.html')

@app.route('/2_5')
def twoFive():
    return render_template('2_5.html')

@app.route('/3')
def three():
    return render_template('3.html')

@app.route('/canvas')
def canvas():
    return render_template('canvas.html')

@app.route('/dataset')
def dataset():
    return render_template('dataset.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.run(debug=True)