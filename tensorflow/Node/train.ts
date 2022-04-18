import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-node-gpu'

const model = tf.sequential()

model.add(
  tf.layers.dense({
    inputShape: [512],
    activation: 'relu',
    units: 512,
  })
)

for (let i = 0; i < 10; i += 1) {
  model.add(
    tf.layers.dense({
      inputShape: [512],
      activation: 'relu',
      units: 512,
    })
  )
}

model.add(
  tf.layers.dense({
    activation: 'sigmoid',
    units: 1,
  })
)

model.compile({
  loss: 'binaryCrossentropy',
  optimizer: 'adam',
  metrics: ['accuracy'],
})