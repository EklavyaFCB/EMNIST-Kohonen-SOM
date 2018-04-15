from flask import Flask
from flask import render_template
#import som

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

@app.route('/3')
def three():
    return render_template('3.html')

    #bmuTrain, radiusTrain, rateTrain, sqDistTrain = trainSOM(inputs, n_iterations, time_constant)
    #bmuTest, radiusTest, rateTest, sqDistTest = trainSOM(testInputs, n_iterations_test, time_constant_test)
    #makeSOM(bmuTrain, labels, bmuTest, testLabels)

if __name__ == "__main__":
    app.run(debug=True)