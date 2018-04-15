import RGB

iterations = 60000
inputs = RGB.setUp(iterations)
bmu, radius, rate, sqDist = RGB.trainSOM(inputs, iterations)
RGB.makeSOM(bmu)
RGB.plotVariables(radius, rate, sqDist)