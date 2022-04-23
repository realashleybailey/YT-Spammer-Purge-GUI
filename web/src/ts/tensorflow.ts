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
import store from "@/store"

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

(window as any).predictSpam = predictSpam
;(window as any).start = async () => {
  const comments = {}

  store.state.spam.forEach((spam: any) => {
    comments[spam.id] = true
  })

  const good: any[] = []
  const bad: any[] = []

  for (const comment of store.state.comments) {
    const result = await predictSpam(comment.snippet?.topLevelComment?.snippet?.textDisplay || "")
    const spam = await (result as any).data()

    const isSpam = comments[comment.id || ""] || false
    const matched = spam[0] >= 0.9967515239246206
    console.log(comment.snippet?.topLevelComment?.snippet?.textDisplay)
    console.log("SPAM: %c" + (isSpam ? "TRUE" : "FALSE"), "background: #" + (isSpam ? "ff0000" : "00ff00") + "; color: #" + (isSpam ? "ffffff" : "000000") + "")
    console.log("ACCURACY: " + spam[0])
    console.log("MATCHED: %c" + (matched ? "TRUE" : "FALSE"), "background: #" + (matched ? "ff0000" : "00ff00") + "; color: #" + (matched ? "ffffff" : "000000") + "")
    console.log("\n")

    if (isSpam && matched) {
      good.push(spam[0])
    }
    if (!isSpam && !matched) {
      bad.push(spam[0])
    }
  }

  // Get the mean of the good and bad arrays
  const goodMean = good.reduce((a, b) => a + b, 0) / good.length
  const badMean = bad.reduce((a, b) => a + b, 0) / bad.length

  // Get the standard deviation of the good and bad arrays
  const goodStd = Math.sqrt(good.reduce((a, b) => a + Math.pow(b - goodMean, 2), 0) / good.length)
  const badStd = Math.sqrt(bad.reduce((a, b) => a + Math.pow(b - badMean, 2), 0) / bad.length)

  // Get the average difference between the good and bad arrays
  const goodBadDiff = good.reduce((a, b) => a + Math.abs(b - badMean), 0) / good.length
  const badGoodDiff = bad.reduce((a, b) => a + Math.abs(b - goodMean), 0) / bad.length

  console.log(goodMean, badMean)
  console.log(goodStd, badStd)
  console.log(goodBadDiff, badGoodDiff)

  console.log(good, bad)
}

export { predictSpam, tokenize }
