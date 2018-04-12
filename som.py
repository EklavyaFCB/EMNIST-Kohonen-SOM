# Name: Eklavya SARKAR, 
# ID:201135564, 
# Username: u5es2

# We're using sorted EMNIST Balanced 47 Classes data, to make a SOM

import argparse
import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Argument Parser for debugging
parser = argparse.ArgumentParser(description='Make a 2D map of a multidimensional input')
parser.add_argument('-d','--debug', action='store_true', default=False, help='Print debug messages to stderr')
parser.add_argument('-t','--type', action='store', default="d", help='Choose type of dataset: letters(=l), digits(=d), or combined(=c)')
parser.add_argument('-r','--rate', type=float, action='store', default=0.3, help='Choose learning rate (range: 0-1)')
parser.add_argument('-iTr','--inputsTrain', type=int, action='store', default=20, help='Choose number of train inputs per class (range: 0-2400)')
parser.add_argument('-iTe','--inputsTest', type=int, action='store', default=20, help='Choose number of test inputs per class (range: 0-400)')
args = parser.parse_args()

#----------------------------------------------------------------------------------------
# CONFIG 
#----------------------------------------------------------------------------------------

# Constants
# ======== DO NOT CHANGE ========|
INPUTS_MAX_VALUE = 255			#|
MAX_CLASSES = 47				#|
MAX_INPUTS_PER_CLASS = 2400		#|
MAX_TEST_INPUTS_PER_CLASS = 400	#|
# =========DO NOT CHANGE ========|

# Parameters configure according to given arguments
if not len(vars(args)) > 1:
	print('Using default values')

# Number of training inputs, range: 0 - 2400
if (args.inputsTrain):
	chosen_inputs_per_class = args.inputsTrain

# Number of testing inputs, range: 0 - 2400
if (args.inputsTest):
	chosen_test_inputs_per_class = args.inputsTest

# Learning rate (Eta), range: 0 - 1
if (args.rate): 
	init_learning_rate =  args.rate

# Number of classes
if (args.type == 'd'): # Digits
	n_classes = 10
elif (args.type == 'l'): # Letters
	n_classes = MAX_CLASSES-10
elif (args.type == 'c'): # Combined
	n_classes = MAX_CLASSES

#----------------------------------------------------------------------------------------
# SET-UP
#----------------------------------------------------------------------------------------

if args.debug:
	print("Debug mode ON")
	print('Loading input files ...')

# Inputs (Sorted inputs of all 47 classes)
train_inputs_path = '/Users/eklavya/Movies/EMNIST_csv/Balanced/Sorted/SortedTrainInputs.csv'
train_inputs = pd.read_csv(train_inputs_path, encoding='utf-8', header=None)

test_inputs_path = '/Users/eklavya/Movies/EMNIST_csv/Balanced/Sorted/SortedTestInputs.csv'
test_inputs = pd.read_csv(test_inputs_path, encoding='utf-8', header=None)

if args.debug:
	print('Loaded 1/3 files')

# Labels
train_labels_path = '/Users/eklavya/Movies/EMNIST_csv/Balanced/Sorted/SortedTrainLabels.txt'
train_labels = pd.read_csv(train_labels_path, encoding='utf-8', dtype=np.int8, header=None)

test_labels_path = '/Users/eklavya/Movies/EMNIST_csv/Balanced/Sorted/SortedTestLabels.txt'
test_labels = pd.read_csv(test_labels_path, encoding='utf-8', dtype=np.int8, header=None)

if args.debug:
	print('Loaded 2/3 files')

if (args.type == 'd'):
	colours_path = '/Users/eklavya/Dropbox/__Liverpool/_390/SourceCode/10Colors.csv'
	save_path = '/Users/Eklavya/Movies/EMNIST_csv/Balanced/Runs/Digits/'
elif (args.type == 'l'):
	colours_path = '/Users/eklavya/Dropbox/__Liverpool/_390/SourceCode/47Colors.csv'
	save_path = '/Users/Eklavya/Movies/EMNIST_csv/Balanced/Runs/Letters/'
else: 
	colours_path = '/Users/eklavya/Dropbox/__Liverpool/_390/SourceCode/47Colors.csv'
	save_path = '/Users/Eklavya/Movies/EMNIST_csv/Balanced/Runs/Combined/'

class_colours = pd.read_csv(colours_path, encoding='utf-8', header=None)

if args.debug:
	print('Loaded 3/3 files')
	print('Save path:', save_path)

# bmu_path = '/Users/eklavya/Movies/EMNIST_csv/Balanced/Runs/Digits/2018-04-08-18-33-38_10classes_0.5rate_200inputs.csv'
# bmu_idx_arr = pd.read_csv(bmu_path, encoding='utf-8', header=None)
# bmu_idx_arr = np.array(bmu_idx_arr)

if args.debug:
	print('Loaded train inputs:', type(train_inputs))
	print('Loaded train labels:', type(train_labels))
	print('Loaded test inputs', type(test_inputs))
	print('Loaded test labels:', type(test_labels))
	print('Loaded colors:', type(class_colours))

inputs = []
labels = []

testInputs = []
testLabels = []

if (args.type == 'd'): 
	# From 0 to 24000
	loopStart = 0 
	loopEnd = 10*MAX_INPUTS_PER_CLASS 

	# From 0 to 4000
	loopStartTest = 0 
	loopEndTest = 10*MAX_TEST_INPUTS_PER_CLASS

elif (args.type == 'l'): 
	# From 24000 to 112800
	loopStart = 10*MAX_INPUTS_PER_CLASS
	loopEnd = MAX_CLASSES*MAX_INPUTS_PER_CLASS

	# From 4000 to 18800
	loopStartTest = 10*MAX_TEST_INPUTS_PER_CLASS
	loopEndTest = MAX_CLASSES*MAX_TEST_INPUTS_PER_CLASS

elif (args.type == 'c'):
	# From 0 to 112800
	loopStart = 0
	loopEnd = MAX_CLASSES*MAX_INPUTS_PER_CLASS

	# From 0 to 18800
	loopStartTest = 0 
	loopEndTest = MAX_CLASSES*MAX_TEST_INPUTS_PER_CLASS

else: # Default mode is digits
	loopStart = 0 
	loopEnd = 10*MAX_INPUTS_PER_CLASS

	# From 0 to 4000
	loopStartTest = 0 
	loopEndTest = 10*MAX_TEST_INPUTS_PER_CLASS

for i in range(loopStart,loopEnd,MAX_INPUTS_PER_CLASS):
    for j in range(chosen_inputs_per_class):
        inputs.append(train_inputs.iloc[i+j][:]/INPUTS_MAX_VALUE) # Append normalised value
        labels.append(train_labels.iloc[i])

for i in range(loopStartTest,loopEndTest,MAX_TEST_INPUTS_PER_CLASS):
    for j in range(chosen_test_inputs_per_class):
        testInputs.append(test_inputs.iloc[i+j][:]/INPUTS_MAX_VALUE) # Normalised
        testLabels.append(test_labels.iloc[i])

# Convert to NumPy Arrays
labels = np.array(labels)
inputs = np.array(inputs)

testLabels = np.array(testLabels)
testInputs = np.array(testInputs)

class_colours = np.array(class_colours)

if args.debug:
	if (inputs.max()==1 and inputs.min()==0):
		trainNormaliseCheck = True
	else:
		trainNormaliseCheck = False
	
	if (testInputs.max()==1 and testInputs.min()==0):
		testNormaliseCheck = True
	else:
		testNormaliseCheck = False

	print('Train labels:',labels.shape)
	print('Train inputs:', inputs.shape)
	print('Test labels:',testLabels.shape)
	print('Test inputs:', testInputs.shape)
	print('colours:', class_colours.shape)
	print('Training data normalised:', trainNormaliseCheck)
	print('Testing data normalised:', testNormaliseCheck)

# Variables
n = inputs.shape[0]
m = inputs.shape[1]

n_test = testInputs.shape[0]
m_test = testInputs.shape[1]

network_dimensions = np.array([n_classes*2,n_classes*2])

n_iterations = n
n_iterations_test = n_test

if args.debug:
	print('n_classes:', n_classes)
	print('n:', n)
	print('m:', m)
	print('n_test:', n_test)
	print('m_test:', m_test)
	print('Network dimensions:', network_dimensions.shape)
	print('Number of training iterations:', n_iterations)
	print('Number of testing iterations:', n_iterations_test)
	print('Initial learning rate:', init_learning_rate)
	print('Inputs per class:', chosen_inputs_per_class)

# Variables

# Weight Matrix - same for training and testing as same number of classes and therefore network dimensions
net = np.random.random((network_dimensions[0], network_dimensions[1], m))

# Initial Radius (sigma) for the neighbourhood - same for tranining and testing as same network dimensions
init_radius = max(network_dimensions[0], network_dimensions[1]) / 2

# Radius decay parameter - different as (possibly) different number of iterations
time_constant = n_iterations / np.log(init_radius)
time_constant_test = n_iterations_test / np.log(init_radius)

if args.debug:
	print('Net', type(net))
	print('Initial Radius', init_radius)
	print('Time constant', time_constant)
	print('Time constant test', time_constant_test)

#----------------------------------------------------------------------------------------
# METHODS
#----------------------------------------------------------------------------------------

# Saving files with timestamp
def timeStamped(fmt='%Y-%m-%d-%H-%M-%S'):
	return datetime.datetime.now().strftime(fmt)

# View on Matplotlib
#def display(n_cols, n_rows, x):
#
#	fig, ax = plt.subplots(n_rows, n_cols, sharex='col', sharey='row')
#
#	if args.debug:
#		for i in range(n_rows):
#		    for j in range(n_cols):
#		        pic = np.rot90((np.fliplr(inputs[x,:].reshape((28,28)))))
#		        ax[i, j].imshow(pic, cmap='gray')
#		        ax[i, j].axis('off')
#		        x+=1
#		plt.show()

#if args.debug:
#	display(5,5,0)


# Find Best Matching Unit (BMU)
def find_bmu(t, net, m):

	# A 1D array which will contain the X,Y coordinates
	# of the BMU for the given input vector t
	bmu_idx = np.array([0,0])

	# Set the initial minimum difference
	min_diff = np.iinfo(np.int).max

	# To compute the high-dimension distance between 
	# the given input vector and each neuron,
	# we calculate the difference between the vectors
	for x in range (net.shape[0]):
		for y in range(net.shape[1]):
			w = net[x,y,:].reshape(m, 1)

			# Don't sqrt to avoid heavy operation
			diff = np.sum((w - t) ** 2)

			if (diff < min_diff):
				min_diff = diff
				bmu_idx = np.array([x, y])

	bmu = net[bmu_idx[0], bmu_idx[1], :].reshape(m, 1)

	return(bmu, bmu_idx, min_diff)

# Decay the neighbourhood radius with time
def decay_radius(initial_radius, i, time_constant):
	return initial_radius * np.exp(-i / time_constant)

# Decay the learning rate with time
def decay_learning_rate(initial_learning_rate, i, n_iterations):
	return initial_learning_rate * np.exp(-i / n_iterations)

# Calculate the influence
def calculate_influence(distance, radius):
	return np.exp(-distance / (2* (radius**2)))


# SOM Step Learning
def trainSOM(inputsValues, times, timeCTE):
	
	bmu_idx_arr = []
	radiusList = []
	learnRateList = []
	sqDistList = []

	for i in range (times):
		
		if args.debug:
			print('\r', str(i/times * 100) + '%') # Progress percentage
		
		# ------------- INPUT -------------
		# 1. Select a input weight vector at each step

		# This can be random, however since we're using sorted inputs, we're
		# proceeding in a linear manner through all nodes for sake of clarity
		t = inputsValues[i, :].reshape(np.array([m, 1]))

		# ------------- BMU -------------
		# 2. Find the chosen input vector's BMU at each step
		#bmu, bmu_idx = find_bmu(t, net, m)
		bmu, bmu_idx, dist = find_bmu(t, net, m)

		bmu_idx_arr.append(bmu_idx)
		sqDistList.append(dist)
		
		# ------------- DECAY -------------
		# 3. Determine topological neighbourhood for each step
		r = decay_radius(init_radius, i, timeCTE)
		l = decay_learning_rate(init_learning_rate, i, times)

		radiusList.append(r)
		learnRateList.append(l)

		# ------------- UPDATE -------------
		# 4. Repeat for all nodes in the *BMU neighbourhood*
		for x in range(net.shape[0]):
			for y in range(net.shape[1]):
				
				# Find weight vector
				w = net[x, y, :].reshape(m, 1)
				#wList.append(w)
				
				# Get the 2-D distance (not Euclidean as no sqrt)
				w_dist = np.sum((np.array([x, y]) - bmu_idx) ** 2)
				#wDistList.append(w_dist)
				
				# If the distance is within the current neighbourhood radius
				if w_dist <= r**2:
					
					# Calculate the degree of influence (based on the 2-D distance)
					influence = calculate_influence(w_dist, r)
					
					# Update weight:
					# new w = old w + (learning rate * influence * delta)
					# delta = input vector t - old w
					new_w = w + (l * influence * (t - w))
					#new_wList.append(new_w)

					# Update net with new weight
					net[x, y, :] = new_w.reshape(1, m)

		# Every 100 iterations we call for a SOM to be made to view
		#if (i>0 and i%100==0):
		#	bmu_interim_arr = np.array(bmu_idx_arr)
		#	makeSOM(bmu_interim_arr, labels, [], [])

	# Convert to NumPy array
	bmu_idx_arr = np.array(bmu_idx_arr)

	np.savetxt((save_path+'%s'%timeStamped()+'_%s'%n_classes+'classes'+'_%s'%init_learning_rate+'rate'+'_%s'%chosen_inputs_per_class+'inputs'+'.csv'), bmu_idx_arr, fmt='%d', delimiter=',')
	#np.savetxt((save_path+'Net_%s'%timeStamped()+'.txt'), net, fmt='%d')

	return(bmu_idx_arr, radiusList, learnRateList, sqDistList)

def makeSOM(bmu_idx_arr, labels, bmu_idx_arr_test, testLabels):

	if (args.type=='d'):
		labelColorLen = n_classes
	else:
		labelColorLen = MAX_CLASSES

	labelColor = np.zeros((labelColorLen,3))
	plotVector = np.zeros((n,5))

	labelColor_test = np.zeros((labelColorLen,3))
	plotVectorTest = np.zeros((n_test,5))

	# plotVector Format: [X, Y, R, G, B]
	# Coordinates and colours in a single vector

    # --------------- SETUP ---------------
	#counter = 0
	#n_nodes = (network_dimensions[0]**2)
	#x_coords = [0] * n_nodes
	#y_coords = [0] * n_nodes
	#x_vec = [0] * n_nodes
	#y_vec = [0] * n_nodes

    ## --------------- NODES ---------------
	#for x in range(0, network_dimensions[0]):
		#for y in range(0, network_dimensions[1]):
			#w = net[x, y, :].reshape(m, 1)
			#x_vec[counter] = w[0]
			#y_vec[counter] = w[1]
			#x_coords[counter] = x
			#y_coords[counter] = y
			#counter = counter + 1

	# Insert training values
	for i in range(n):
        # Color classes
		labelColor[labels[i,0]-1][0] = class_colours[labels[i,0]-1][0]
		labelColor[labels[i,0]-1][1] = class_colours[labels[i,0]-1][1]
		labelColor[labels[i,0]-1][2] = class_colours[labels[i,0]-1][2]
        
		# X, Ys - Coordinates with added noise
		plotVector[i][0] = bmu_idx_arr[i][0]
		plotVector[i][1] = bmu_idx_arr[i][1]
        
		# R,G,Bs - Color each point according to class
		plotVector[i][2] = labelColor[labels[i,0]-1][0]
		plotVector[i][3] = labelColor[labels[i,0]-1][1]
		plotVector[i][4] = labelColor[labels[i,0]-1][2]

	# Insert testing values 
	for i in range(n_test):
		# Color classes
		labelColor_test[testLabels[i,0]-1][0] = class_colours[testLabels[i,0]-1][0]
		labelColor_test[testLabels[i,0]-1][1] = class_colours[testLabels[i,0]-1][1]
		labelColor_test[testLabels[i,0]-1][2] = class_colours[testLabels[i,0]-1][2]

		# X, Ys - Coordinates with added noise
		plotVectorTest[i][0] = bmu_idx_arr_test[i][0]
		plotVectorTest[i][1] = bmu_idx_arr_test[i][1]

		# R,G,Bs - Color each point according to class
		plotVectorTest[i][2] = labelColor_test[testLabels[i,0]-1][0]
		plotVectorTest[i][3] = labelColor_test[testLabels[i,0]-1][1]
		plotVectorTest[i][4] = labelColor_test[testLabels[i,0]-1][2]

	# Generate noise for each point
	if (plotVector.shape[0] > 0):
		a_x = -0.4
		a_y = -0.4
		b_x = 0.4
		b_y = 0.4
		
		noise_x = (b_x-a_x) * np.random.rand(plotVector.shape[0], 1) + a_x
		noise_y = (b_y-a_y) * np.random.rand(plotVector.shape[0], 1) + a_y

		noise_x_test = (b_x-a_x) * np.random.rand(plotVectorTest.shape[0], 1) + a_x
		noise_y_test = (b_y-a_y) * np.random.rand(plotVectorTest.shape[0], 1) + a_y

	# With noise
	xPlot = np.add(plotVector[:,0], noise_x[:,0])
	yPlot = np.add(plotVector[:,1], noise_y[:,0])

	xPlot_test = np.add(plotVectorTest[:,0], noise_x_test[:,0])
	yPlot_test = np.add(plotVectorTest[:,1], noise_y_test[:,0])

	# Witout noise
	# xPlot = np.array(plotVector[:,0])
	# yPlot = np.array(plotVector[:,1])

	# xPlot_test = np.array(plotVector[:,0])
	# yPlot_test = np.array(plotVector[:,1])

	zPlot = np.array(plotVector[:,2:5])
	zPlot_test = np.array(plotVectorTest[:,2:5])

	if (args.debug):
		print('Train Inputs per class:',args.inputsTrain)
		print('Test Inputs per class:',args.inputsTest)
		print('Rate:',args.rate)
		print('Type:',args.type)
		print('')
		print('x:',xPlot.shape)
		print('y:',yPlot.shape)
		print('z:',zPlot.shape)
		print('BMUs:',bmu_idx_arr.shape)
		print(labelColor)
		print('')
		print('x_test:',xPlot_test.shape)
		print('y_test:',yPlot_test.shape)
		print('z_test:',zPlot_test.shape)
		print('BMUs_test:',bmu_idx_arr_test.shape)
		print(labelColor_test)

	# Plot Scatterplot
	plotSize = (n_classes * 2)
	figSize = 5.91
	plt.figure(figsize=(figSize, figSize))

	# Plot nodes
	#plt.scatter(x_coords, y_coords, s=20, facecolor='none', edgecolor='b')

	# Plot train data
	plt.scatter(xPlot, yPlot, s=20, marker='o', facecolor=zPlot)
	plt.scatter(xPlot_test, yPlot_test, s=200, marker='x', facecolor=zPlot_test)

	#plt.legend(handles=[n])
	plt.xlim(-1, plotSize)
	plt.ylim(-1, plotSize)
	#plt.axis('off')
	plt.show()


	print(xPlot[0])
	print(yPlot[0])
	exportArr = np.zeros((n,3))
	exportArr[:,0] = xPlot[:] 
	exportArr[:,1] = yPlot[:]
	exportArr[:,2] = zPlot[:]
	print(exportArr[0][0])
	
	np.savetxt((save_path+'%s'%timeStamped()+'_%s'%n_classes+'classes'+'_%s'%init_learning_rate+'rate'+'_%s'%chosen_inputs_per_class+'inputs_WITH_NOISE'+'.csv'), exportArr, fmt='%.3f', delimiter=',')

# Make graphical comparaisons of various parameters
def plotVariables(radiusTrain, radiusTest, learnRateTrain, learnRateTest, sqDistTrain, sqDistTest):

	# Plot radius
	plt.title('Radius evolution')
	plt.xlabel('Number of iterations')
	plt.ylabel('Radius size')
	plt.plot(radiusTrain, 'r')
	plt.plot(radiusTest, 'b')
	plt.show()

	# Plot learning rate
	plt.title('Learning rate evolution')
	plt.xlabel('Number of iterations')
	plt.ylabel('Learning rate')
	plt.plot(learnRateTrain, 'r')
	plt.plot(learnRateTest, 'b')
	plt.show()

	# Plot 3D distance
	plt.title('Best Matching Unit 3D Distance')
	plt.xlabel('Number of iterations')
	plt.ylabel('Smallest Distance Squared')
	plt.plot(sqDistTrain, 'r')
	plt.plot(sqDistTest, 'b') # Change this for test data to show every 400 or 2400 steps ?
	plt.show()

# Call methods
bmuTrain, radiusTrain, rateTrain, sqDistTrain = trainSOM(inputs, n_iterations, time_constant)
bmuTest, radiusTest, rateTest, sqDistTest = trainSOM(testInputs, n_iterations_test, time_constant_test)

makeSOM(bmuTrain, labels, bmuTest, testLabels)

#plotVariables(radiusTrain, radiusTest, rateTrain, rateTest, sqDistTrain, sqDistTest)