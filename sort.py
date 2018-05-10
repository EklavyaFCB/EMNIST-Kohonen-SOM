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
parser.add_argument('-c','--classes', action='store', type=int, help='Insert the number of different classes in the database to be sorted')
parser.add_argument('-ip','--input_path', action='store', help='Insert the data path to the .csv file')
parser.add_argument('-sp','--save_path', action='store', help='Insert the save path for the sorted output .csv file (do not insert the file name itself)')
args = parser.parse_args()

#-----------------------------------------------------------------
# SET-UP
#-----------------------------------------------------------------

# Enough arguments given
if not (args.input_path):
	print('ERROR - No input path given')
	print('Use -ip to insert the input file path, eg: -p=/Users/input_path/input_file.csv')
	sys.exit(1)

if not (args.save_path):
	print('ERROR - No save path given')
	print('Use -sp to insert a file save path, eg: -sp=/Users/save_path/')
	sys.exit(1)

if not (args.classes):
	print('ERROR - Number of classes not given')
	print('Use -c to input the total number of classes in the dataset, eg -c=47:')
	sys.exit(1)

# Read arguments
if args.input_path:
	data_path = args.input_path

if args.save_path:
	save_path = args.save_path

if args.classes:
	max_classes = args.classes

# Read raw data
data = pd.read_csv(data_path, encoding='utf-8', header=None)

if (args.debug):
	print('Number of classes', max_classes)
	print('Input path', data_path)
	print('Save path', save_path)
	print('')
	print('Raw data shape:', data.shape)
	print(type(data))

#-----------------------------------------------------------------
# SORTING
#-----------------------------------------------------------------

# Sorting into classes
# Numpy arrays are immutable, and are very inefficient for appending,
# as they create a new array, then copy entire rows/columns onto it
# We therefore use python lists (mutable), then later convert them to Numpy array

sortedInputs = []
sortedLabels = []

max_inputs_per_class = data.shape[0]//max_classes

# Number of classes

# Numpy arrays are immutable, and are very inefficient for appending 
# (they create a new array, then copy entire rows/columns onto it).
# We therefore use python lists (mutable), then convert them to Numpy array

# Create lists per class
arr_0 = []
arr_1 = []
arr_2 = []
arr_3 = []
arr_4 = []
arr_5 = []
arr_6 = []
arr_7 = []
arr_8 = []
arr_9 = []
arr_10 = []
arr_11 = []
arr_12 = []
arr_13 = []
arr_14 = []
arr_15 = []
arr_16 = []
arr_17 = []
arr_18 = []
arr_19 = []
arr_20 = []
arr_21 = []
arr_22 = []
arr_23 = []
arr_24 = []
arr_25 = []
arr_26 = []
arr_27 = []
arr_28 = []
arr_29 = []
arr_30 = []
arr_31 = []
arr_32 = []
arr_33 = []
arr_34 = []
arr_35 = []
arr_36 = []
arr_37 = []
arr_38 = []
arr_39 = []
arr_40 = []
arr_41 = []
arr_42 = []
arr_43 = []
arr_44 = []
arr_45 = []
arr_46 = []

if (args.debug):
	print('Starting sorting')

# Sort and append according to class
for i in range(data.shape[0]):
    if data.iloc[i,0]==0:
        arr_0.append(data.iloc[i,1:])
    elif data.iloc[i,0]==1:
        arr_1.append(data.iloc[i,1:])
    elif data.iloc[i,0]==2:
        arr_2.append(data.iloc[i,1:])
    elif data.iloc[i,0]==3:
        arr_3.append(data.iloc[i,1:])
    elif data.iloc[i,0]==4:
        arr_4.append(data.iloc[i,1:])
    elif data.iloc[i,0]==5:
        arr_5.append(data.iloc[i,1:])
    elif data.iloc[i,0]==6:
        arr_6.append(data.iloc[i,1:])
    elif data.iloc[i,0]==7:
        arr_7.append(data.iloc[i,1:])
    elif data.iloc[i,0]==8:
        arr_8.append(data.iloc[i,1:])
    elif data.iloc[i,0]==9:
        arr_9.append(data.iloc[i,1:])
    elif data.iloc[i,0]==10:
        arr_10.append(data.iloc[i,1:])
    elif data.iloc[i,0]==11:
        arr_11.append(data.iloc[i,1:])
    elif data.iloc[i,0]==12:
        arr_12.append(data.iloc[i,1:])
    elif data.iloc[i,0]==13:
        arr_13.append(data.iloc[i,1:])
    elif data.iloc[i,0]==14:
        arr_14.append(data.iloc[i,1:])
    elif data.iloc[i,0]==15:
        arr_15.append(data.iloc[i,1:])
    elif data.iloc[i,0]==16:
        arr_16.append(data.iloc[i,1:])
    elif data.iloc[i,0]==17:
        arr_17.append(data.iloc[i,1:])
    elif data.iloc[i,0]==18:
        arr_18.append(data.iloc[i,1:])
    elif data.iloc[i,0]==19:
        arr_19.append(data.iloc[i,1:])
    elif data.iloc[i,0]==20:
        arr_20.append(data.iloc[i,1:])
    elif data.iloc[i,0]==21:
        arr_21.append(data.iloc[i,1:])
    elif data.iloc[i,0]==22:
        arr_22.append(data.iloc[i,1:])
    elif data.iloc[i,0]==23:
        arr_23.append(data.iloc[i,1:])
    elif data.iloc[i,0]==24:
        arr_24.append(data.iloc[i,1:])
    elif data.iloc[i,0]==25:
        arr_25.append(data.iloc[i,1:])
    elif data.iloc[i,0]==26:
        arr_26.append(data.iloc[i,1:])
    elif data.iloc[i,0]==27:
        arr_27.append(data.iloc[i,1:])
    elif data.iloc[i,0]==28:
        arr_28.append(data.iloc[i,1:])
    elif data.iloc[i,0]==29:
        arr_29.append(data.iloc[i,1:])
    elif data.iloc[i,0]==30:
        arr_30.append(data.iloc[i,1:])
    elif data.iloc[i,0]==31:
        arr_31.append(data.iloc[i,1:])
    elif data.iloc[i,0]==32:
        arr_32.append(data.iloc[i,1:])
    elif data.iloc[i,0]==33:
        arr_33.append(data.iloc[i,1:])
    elif data.iloc[i,0]==34:
        arr_34.append(data.iloc[i,1:])
    elif data.iloc[i,0]==35:
        arr_35.append(data.iloc[i,1:])
    elif data.iloc[i,0]==36:
        arr_36.append(data.iloc[i,1:])
    elif data.iloc[i,0]==37:
        arr_37.append(data.iloc[i,1:])
    elif data.iloc[i,0]==38:
        arr_38.append(data.iloc[i,1:])
    elif data.iloc[i,0]==39:
        arr_39.append(data.iloc[i,1:])
    elif data.iloc[i,0]==40:
        arr_40.append(data.iloc[i,1:])
    elif data.iloc[i,0]==41:
        arr_41.append(data.iloc[i,1:])
    elif data.iloc[i,0]==42:
        arr_42.append(data.iloc[i,1:])
    elif data.iloc[i,0]==43:
        arr_43.append(data.iloc[i,1:])
    elif data.iloc[i,0]==44:
        arr_44.append(data.iloc[i,1:])
    elif data.iloc[i,0]==45:
        arr_45.append(data.iloc[i,1:])
    else: # == 46
        arr_46.append(data.iloc[i,1:])

if (args.debug):
	print('Finished sorting')

# Merge in order into main list
sortedInputs.extend(arr_0+
arr_1+
arr_2+
arr_3+
arr_4+
arr_5+
arr_6+
arr_7+
arr_8+
arr_9+
arr_10+
arr_11+
arr_12+
arr_13+
arr_14+
arr_15+
arr_16+
arr_17+
arr_18+
arr_19+
arr_20+
arr_21+
arr_22+
arr_23+
arr_24+
arr_25+
arr_26+
arr_27+
arr_28+
arr_29+
arr_30+
arr_31+
arr_32+
arr_33+
arr_34+
arr_35+
arr_36+
arr_37+
arr_38+
arr_39+
arr_40+
arr_41+
arr_42+
arr_43+
arr_44+
arr_45+
arr_46)

if (args.debug):
	print('Starting labelling')

# Make sorted labels list
i = 0
for x in range(0, data.shape[0], max_inputs_per_class):
    for y in range (max_inputs_per_class):
        sortedLabels.append(i)
    i=i+1

if (args.debug):
	print('Finished labelling')

# Convert both lists to NumPy arrays
sortedInputs = np.array(sortedInputs)
sortedLabels = np.array(sortedLabels)

# View on Matplotlib to check
def display(n_cols, n_rows, x):

	fig, ax = plt.subplots(n_rows, n_cols, sharex='col', sharey='row')

	for i in range(n_rows):
	    for j in range(n_cols):
	        pic = np.rot90((np.fliplr(sortedInputs[x,:].reshape((28,28)))))
	        ax[i, j].imshow(pic, cmap='gray')
	        ax[i, j].axis('off')
	        x+=1
	plt.show()

if (args.debug):
	print('Sorted data shape:',sortedInputs.shape)
	print('Sorted labels shape:',sortedLabels.shape)
	# display(5,5,0)

#-----------------------------------------------------------------
# EXPORT 
#-----------------------------------------------------------------

# Make sure to change file name to not overwrite files in case you sort both training and testing files
np.savetxt(save_path+'SortedInputs.csv', sortedInputs, fmt='%d', delimiter=',')
np.savetxt(save_path+'SortedLabels.txt', sortedLabels, fmt='%d')

if (args.debug):
	print('Sorted inputs saved at ' + save_path)
	print('Sorted labels saved at ' + save_path)