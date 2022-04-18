const { defineConfig } = require("@vue/cli-service")
const path = require("path")

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "dist"),
  devServer: {
    port: 8000,
    allowedHosts: "all"
  },
  css: {
    sourceMap: true
  },
  configureWebpack: {
    resolve: {
      fallback: {
        fs: require.resolve("browserify-fs"),
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer"),
        console: require.resolve("console-browserify"),
        constants: require.resolve("constants-browserify"),
        crypto: require.resolve("crypto-browserify"),
        domain: require.resolve("domain-browser"),
        events: require.resolve("events"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        path: require.resolve("path-browserify"),
        punycode: require.resolve("punycode"),
        querystring: require.resolve("querystring-es3"),
        stream: require.resolve("stream-browserify"),
        string_decoder: require.resolve("string_decoder"),
        sys: require.resolve("util"),
        timers: require.resolve("timers-browserify"),
        tty: require.resolve("tty-browserify"),
        url: require.resolve("url"),
        util: require.resolve("util"),
        vm: require.resolve("vm-browserify"),
        zlib: require.resolve("browserify-zlib")
      }
    }
  }
})
