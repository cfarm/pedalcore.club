var webpack = require('webpack');
module.exports = {
  entry: [
    './static/js/keys.js',
    './static/js/calendar.js'
  ],
  output: {
    filename: './static/js/scripts.js'
  },
  resolve: {
    alias: {
      jquery: './vendor/jquery-1.12.3.js'
    }
  }
};