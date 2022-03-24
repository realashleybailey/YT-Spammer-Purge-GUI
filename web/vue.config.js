const { defineConfig } = require("@vue/cli-service")
const path = require("path")

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "dist"),
  devServer: {
    port: 8000
  },
  css: {
    sourceMap: true
  }
})
