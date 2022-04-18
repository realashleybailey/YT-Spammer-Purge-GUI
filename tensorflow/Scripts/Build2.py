import os
import pandas as pd
import html

data_folder = os.path.realpath(__file__ + '/../../Data/')
list_ = []
vocab = []

# Loop over all CSV files in the Data folder
for file in os.listdir(data_folder):
    frame = pd.read_csv(data_folder + '/' + file, index_col=None, header=0)
    list_.append(frame)


df = pd.concat(list_, ignore_index=True)
df.drop(columns=["COMMENT_ID", "AUTHOR", "DATE"], inplace=True)

df["CONTENT"] = df["CONTENT"].apply(html.unescape)
df["CONTENT"] = df["CONTENT"].str.replace("\ufeff", "")


df["CLASS"].value_counts(normalize=True)

for comment in df["CONTENT"]:
    for word in comment.split():
        vocab.append(word)


vocabulary = list(set(vocab))

for word in vocabulary:
    df[word] = 0
