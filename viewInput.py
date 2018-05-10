# Name: Eklavya SARKAR, 
# ID:201135564, 
# Username: u5es2

# Sort the EMNIST Balanced 47 Classes (training or testing) data
# Sequence: digits (0-9), then capital letters (A-Z), then small letters (selected ones from a-z)

import argparse
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

#-----------------------------------------------------------------
# CONFIG
#-----------------------------------------------------------------

# Argument Parser
parser = argparse.ArgumentParser(description='Sort the EMNIST data in order of their class')
parser.add_argument('-d','--debug', action='store_true', default=False, help='Print debug messages')
args = parser.parse_args()

#-----------------------------------------------------------------
# SET UP
#-----------------------------------------------------------------

# Read raw data
#data_path = '/Users/eklavya/Movies/EMNIST_csv/Balanced/Sorted/SortedTestInputs.csv'
data_url = 'http://cgi.csc.liv.ac.uk/~u5es2/EMNIST/Sorted/Train.csv'
data = pd.read_csv(data_url, encoding='utf-8', header=None)

labels_url = 'http://cgi.csc.liv.ac.uk/~u5es2/EMNIST/Sorted/TrainLabels.txt'
labels = pd.read_csv(labels_url, encoding='utf-8', header=None)

# Convert to NumPy arrays
inputs = np.array(data)
labels = np.array(labels)

if args.debug:
    print(inputs.shape)
    print(labels.shape)

#-----------------------------------------------------------------
# GENERATE PLOTS
#-----------------------------------------------------------------


def display(n_cols, n_rows, x):
    
    plt.figure(dpi=100)

    fig, ax = plt.subplots(n_rows, n_cols, sharex='col', sharey='row')

    for i in range(n_rows):
       for j in range(n_cols):
            label = labels[i] 
            pic = np.rot90((np.fliplr(inputs[x,:].reshape((28,28)))))
            ax[i, j].imshow(pic, cmap='gray')
            ax[i, j].axis('off')
            x+=2400
    fig.savefig('static/images/dataset.png', bbox_inches='tight', transparent=True)

#-----------------------------------------------------------------
# MAIN METHOD CALLS
#-----------------------------------------------------------------
display(9,5,0)