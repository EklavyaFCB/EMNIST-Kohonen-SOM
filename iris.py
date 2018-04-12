# Name: Eklavya SARKAR, 
# ID:201135564, 
# Username: u5es2

# We're using the Iris dataset to train an ANN

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Raw Data
url = 'http://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'
data = pd.read_csv(url, encoding='utf-8', header=None)

# Add Column names
attributes = ["sepal_length", "sepal_width", "petal_length", "petal_width", "class"]
data.columns = attributes

# Put labels in seperate NumPy array
labels = np.array(data['class'])

# Put inputs in a a seperate NumPy Array, while normalising it
inputs = np.array(data[["sepal_length", "sepal_width", "petal_length", "petal_width"]]/inputs.max())