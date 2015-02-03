import pymongo

"""
    Loads data from a mongoDB collection.  Generates training sample array.
    Returns tuple (trainingData, trainingClassification) which correspond to
    the X and y parameters needed for the RandomForest.fit function.
"""
def load_training_data(mongoCollection, classification):
    trainingData = []
    trainingClassification = []
    for doc in mongoCollection:
        trainingData.append([
            doc.timeFromStart,
            doc.alpha,
            doc.beta
            doc.gamma
        ])
        trainingClassification.append(classification)
    return trainingData, trainingClassification
    
"""[3.0, 2.0, 49.0] -> "Sleep"
    [4.0, 1.0, 39.0] -> "Sleep"
    [8.0, 4.0, 38.0] -> "Sleep"
    [103.0, 2.0, 49.0] -> "Awake"
    [204.0, 1.0, 39.0] -> "Awake"
    [108.0, 4.0, 38.0] -> "Awake"

    X = [
        [3.0, 2.0, 49.0],
        [4.0, 1.0, 39.0],
        [8.0, 4.0, 38.0],
        [103.0, 2.0, 49.0],
        [204.0, 1.0, 39.0],
        [108.0, 4.0, 38.0]] 

    y = [
        "Sleep",
        "Sleep",
        "Sleep",
        "Awake",
        "Awake",
        "Awake"]

    forest.fit(X, y)
"""
def main:
    X = []
    y = []

    sleepData, sleepClassification = load_training_data(mongo.getCollection("sleep_data"), "sleep")
    X = X + sleepData
    y = y + sleepClassification

    awakeData, awakeClassification = load_training_data(mongo.getCollection("awake_data"), "awake")
    X = X + awakeData
    y = y + awakeClassification

    # ... other data
    forest.fit(X, y)

    # We are now trained!

    classification = forest.predict([0.0, 4.0, 2.0])
