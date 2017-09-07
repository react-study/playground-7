const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

const compiler = webpack(config);

const serverOptions = {
    contentBase: path.resolve(__dirname, 'src'),
    compress: true,
    historyApiFallback: true,
    stats: {
        colors: true,
        hash: false,
        minimal: true,
        modules: false,
        reasons: true,
        timings: true,
        version: true,
        warnings: true
    }
};

const server = new WebpackDevServer(compiler, serverOptions);

server.listen(8080, () => {
    console.log('now listening http://localhost:8080');
});
