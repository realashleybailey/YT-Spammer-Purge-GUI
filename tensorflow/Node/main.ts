import '@tensorflow/tfjs-node-gpu'
import * as use from '@tensorflow-models/universal-sentence-encoder'
import data from './trainingData.json'
import _ from 'lodash'
import * as fs from 'fs'

const adjustData = async () => {
    const model = await use.load()
    const embeddings = await model.embed(data.map(({ CONTENT }) => CONTENT.trim().toLowerCase()))
    fs.writeFileSync('embeddings.json', JSON.stringify(_.chunk(Array.from(embeddings.dataSync()), 512)))
    console.log('Saved...')
}

adjustData()