const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');

const pathClient = path.resolve(__dirname, 'client');
const pathDist = path.resolve(__dirname, 'dist');

const isDevelop = process.env.APP_ENV === 'develop' ? true : false;

const CSSModuleLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        sourceMap: isDevelop,
        localIdentName: '[local]__[hash:base64:5]'
    }
}

const CSSLoader = {
    loader: 'css-loader',
    options: {
        modules: false,
        sourceMap: isDevelop
    }
}

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: isDevelop,
        plugins: () => [
            autoprefixer({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
            })
        ]
    }
}

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: pathClient + '/index.js',
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', CSSLoader, postCSSLoader]
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', CSSLoader, postCSSLoader, 'sass-loader']
            },
            {
                test: /\.module\.scss$/,
                use: ['style-loader', CSSModuleLoader, postCSSLoader, 'sass-loader']
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin([{
            from: 'client/static',
            to: 'static'
        }]),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new webpack.DefinePlugin(envKeys)
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: pathDist,
        publicPath: '/',
        filename: 'bundle.js'
    }
};