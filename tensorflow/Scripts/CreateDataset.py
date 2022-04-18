import os
import SplitCSV

directory = os.fsencode('./Data/')

for file in os.listdir(directory):
    filename = os.fsdecode(file)
    if filename.endswith(".csv"):
        # print('Processing: ' + filename)
        SplitCSV.split_csv('./Data/' + filename, './Dataset/', 'CLASS')

# print('Done!')
