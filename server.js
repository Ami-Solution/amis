const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.production.config');

const port = 3001,
      host = 'localhost';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    colors: true
  },
  historyApiFallback: true
}).listen(port, host, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at ${host}:${port}`);
});
