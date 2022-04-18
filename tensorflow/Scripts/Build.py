from tensorflow.keras import layers
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from collections import Counter
from nltk.corpus import stopwords
import nltk
import string
import re
import tensorflow as tf
from tensorflow import keras
import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
import time

df = pd.read_csv("training-data.csv")

df.shape

df.head()

SPAM = (df.CLASS == 1).sum()
NOT_SPAM = (df.CLASS == 0).sum()

print(f"There is {SPAM} total spam and {NOT_SPAM} total not spam")


def remove_URL(text):
    url = re.compile(r"https?://\S+|www\.\S+")
    return url.sub(r"", text)


def remove_punct(text):
    translator = str.maketrans("", "", string.punctuation)
    return text.translate(translator)


URL = "Visit us at https://example.com for free money"
PUNCT = "Don't haven't. Here, we, go!"

print("Removing URL's and Punctuation:")
print(remove_URL(URL))
print(remove_punct(PUNCT))

df["CONTENT"] = df.CONTENT.map(remove_URL)
df["CONTENT"] = df.CONTENT.map(remove_punct)

df.CONTENT


nltk.download('stopwords')

stop = set(stopwords.words("english"))


def remove_stopwords(text):
    filtered_words = [word.lower()
                      for word in text.split() if word.lower() not in stop]
    return " ".join(filtered_words)


df["CONTENT"] = df.CONTENT.map(remove_stopwords)
df.CONTENT


def counter_words(text_col):
    count = Counter()
    for text in text_col.values:
        for word in text.split():
            count[word] += 1
    return count


counter = counter_words(df.CONTENT)

num_unigue_words = len(counter)

i = 0
for word in counter.most_common(5):
    i = i + 1
    print(f"{i}: {word[0]}")

train_size = int(df.shape[0] * 0.8)

train_df = df[:train_size]
val_df = df[train_size:]

train_sentences = train_df.CONTENT.to_numpy()
train_labels = train_df.CLASS.to_numpy()

val_sentences = train_df.CONTENT.to_numpy()
val_labels = train_df.CLASS.to_numpy()

train_sentences.shape, val_sentences.shape


tokenizer = Tokenizer(num_words=num_unigue_words)
tokenizer.fit_on_texts(train_sentences)

word_index = tokenizer.word_index

train_sequences = tokenizer.texts_to_sequences(train_sentences)
val_sequences = tokenizer.texts_to_sequences(val_sentences)

print(train_sentences[10:15])
print(train_sequences[10:15])


max_length = 10000

train_padded = pad_sequences(
    train_sequences, maxlen=max_length, padding="post", truncating="post")
val_padded = pad_sequences(
    val_sequences, maxlen=max_length, padding="post", truncating="post")

train_padded. shape, val_padded.shape

train_padded[10]

reverse_word_index = dict([(idx, word) for (word, idx) in word_index.items()])


def decode(sequence):
    return " ".join([reverse_word_index.get(idx, "?") for idx in sequence])


decoded_text = decode(train_sequences[10])

print(train_sequences[10])
print(decoded_text)


model = keras.models.Sequential()
model.add(layers.Embedding(num_unigue_words, 32, input_length=max_length))

model.add(layers.LSTM(64, dropout=0.1))
model.add(layers.Dense(1, activation="sigmoid"))

model.summary()

loss = keras.losses.BinaryCrossentropy(from_logits=False)
optim = keras.optimizers.Adam(learning_rate=0.001)
metrics = ["accuracy"]

model.compile(loss=loss, optimizer=optim, metrics=metrics)

model.fit(train_padded, train_labels, epochs=20, verbose=1)

predictions = model.predict(train_padded)
predictions = [1 if p > 0.5 else 0 for p in predictions]

print(train_sentences[10:20])

print(train_labels[10:20])
print(predictions[10:20])
