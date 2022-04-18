import os
import pandas as pd
from random import randint


def get_filename(csvFilePath):
    # Get the file name of original CSV file and remove the extension
    basename = os.path.basename(csvFilePath)
    withext = os.path.splitext(basename)[0]

    return withext


def create_dir(n, newDirPath):
    # Generate the new directory path based on positive or negative sentiment
    if (n == 1):
        dir = newDirPath + '/class_a/'
    else:
        dir = newDirPath + '/class_b/'

    # Create the directory if it doesn't exist
    if not os.path.exists(dir):
        os.makedirs(dir)

    return dir


def create_file(dir, filename, data):
    # Create the file
    with open(dir + filename + '.txt', 'w') as f:
        f.write(data)


def split_csv(csvFilePath, newDirPath, splitKey):
    # Read the CSV file
    df = pd.read_csv(csvFilePath)

    # Split the dataframe into a list of dataframes
    for (n), group in df.groupby([splitKey]):

        # Create the new directory if it doesn't exist
        dir = create_dir(n, newDirPath)

        # If good or bad sentiment
        if (n == 1):
            for v in group.values:
                # Create two random numbers between 0 and the length of the dataframe
                r1 = randint(0, len(group))
                r2 = randint(0, len(group))

                print('Bad: ' + str(v[3]) + '\n')
                create_file(dir, f'{r1}_{r2}', str(v[3]))
        else:
            for v in group.values:
                # Create two random numbers between 0 and the length of the dataframe
                r1 = randint(0, len(group))
                r2 = randint(0, len(group))

                print('Good: ' + str(v[3]) + '\n')
                create_file(dir, f'{r1}_{r2}', str(v[3]))
