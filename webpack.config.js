const path = require('path');

module.exports = {
    mode: 'development', 
    entry: './frontend/assets/js/main.js',
    output: {
        path: path.resolve(__dirname,'dist', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            }
        ]
    },
    devtool: 'source-map'
}