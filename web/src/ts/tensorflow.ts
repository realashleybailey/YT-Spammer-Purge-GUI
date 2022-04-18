/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Mon Apr 11 2022
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadLayersModel, tensor, LayersModel } from "@tensorflow/tfjs"
import * as DICTIONARY from "../../public/trained-model/dictionary"
import he from "he"

let MODEL: LayersModel | undefined

const MODEL_JSON_URL = "/trained-model/tfjs/model.json"
const ENCODING_LENGTH = 10000

const predictSpam = async (input: string, SPAM_THRESHOLD = 0.75) => {
  // Check if model is loaded
  if (MODEL === undefined) {
    MODEL = await loadLayersModel(MODEL_JSON_URL)
  }

  // Strip out all non-alphanumeric characters
  const lowercaseSentenceArray = he
    .decode(input)
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toLowerCase()
    .split(" ")

  // Tokenize the input
  const tokenizedInput = tokenize(lowercaseSentenceArray)

  // Predict the input
  const result = MODEL.predict(tokenizedInput)

  // Print the result to the console for us to inspect.
  return result
}

/**
 * Function that takes an array of words, converts words to tokens,
 * and then returns a Tensor representation of the tokenization that
 * can be used as input to the machine learning model.
 */
function tokenize(wordArray) {
  // Always start with the START token.
  const returnArray = [DICTIONARY.START]

  // Loop through the words in the sentence you want to encode.
  // If word is found in dictionary, add that number else
  // you add the UNKNOWN token.
  // eslint-disable-next-line no-var
  for (var i = 0; i < wordArray.length; i++) {
    const encoding = DICTIONARY.LOOKUP[wordArray[i]]
    returnArray.push(encoding === undefined ? DICTIONARY.UNKNOWN : encoding)
  }

  // Finally if the number of words was < the minimum encoding length
  // minus 1 (due to the start token), fill the rest with PAD tokens.
  while (i < ENCODING_LENGTH - 1) {
    returnArray.push(DICTIONARY.PAD)
    i++
  }

  // Convert to a TensorFlow Tensor and return that.
  return tensor([returnArray])
}

export { predictSpam, tokenize }
