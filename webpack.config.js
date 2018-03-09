const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = env => {

	let plugins = [];
	let devtool = false;
	let mode = 'development';

	plugins.push(new webpack.ProvidePlugin({
		"$": "jquery",
		"jQuery": "jquery",
		"window.jQuery": "jquery"
	}));

	if (env == "build") {
		console.log("build");

		mode = 'production';

		plugins.push(new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery'",
			"window.$": "jquery"
		}));

		/*
		plugins.push(new CopyWebpackPlugin([{
			from: 'src/public/admin/imgs',
			to: 'imgs'
		}]));

		const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
		const uglifyJsPlugin = require('./plugins/admin.uglifyJsPlugin');
		plugins.push(new UglifyJsPlugin(uglifyJsPlugin));

		const banner = require('./plugins/banner');
		plugins.push(new webpack.BannerPlugin(banner));

		plugins.push(new CopyWebpackPlugin([{
			from: 'src/public/admin/imgs/',
			to: 'imgs/'
		}]));

		plugins.push(new CopyWebpackPlugin([{
			from: 'src/public/admin/imgs/icon.png',
			to: 'imgs/icon.png',
			toType: 'file'
		}]));

		plugins.push(new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.(s?)css$/,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {discardComments: {removeAll: true}},
			canPrint: true
		}));

		plugins.push(new CopyWebpackPlugin([{
			from: './src/public/admin/libs/jsonlint.js',
			to: 'libs/jsonlint.js',
			toType: 'file'
		}]));

		const WebpackShellPlugin = require('webpack-shell-plugin');
		plugins.push(new WebpackShellPlugin({
			//onBuildStart: ['php src/public/admin/libs/dhtmlxSuite_v51/libCompiler/lib_compiler.php']
			onBuildEnd: ['php src/public/admin/libs/dhtmlxSuite_v51/libCompiler/lib_compiler.php']
		}));
		*/

		/*
		const WebpackShellPlugin = require('webpack-shell-plugin');
		plugins.push(new WebpackShellPlugin({
			//onBuildStart: ['php src/public/admin/libs/dhtmlxSuite_v51/libCompiler/lib_compiler.php']
			onBuildEnd: ['php src/public/admin/libs/dhtmlxSuite_v51/libCompiler/lib_compiler.php --debug=true']
		}));
		*/
	} else {
		console.log("watch");
		devtool = 'source-map';
	}

	/*
	plugins.push(new CopyWebpackPlugin([{
		from: 'src/public/admin/templates',
		to: 'templates'
	}]));

	plugins.push(new HtmlWebpackPlugin({
		template: './src/public/admin/index.ejs',
		inject: 'body'
	}));

	plugins.push(new ExtractTextPlugin('styles.css', {
		allChunks: true
	}));
	*/

	return {
		entry: __dirname + '/src/index.js',
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: 'rm-seatingtool.js'
		},
		devtool: devtool,
		module: {
			loaders: [
				{test: /\.css$/, loader: "style!css"},
				{test: /\.(jpe?g|png|gif)$/i, loader: "file"}
			]
		},
		module: {
			rules: [
				{
					test: /\.(jpe?g|png|gif)$/i,
					loader: "file-loader",
					query: {
						name: '[name].[ext]',
						outputPath: 'images/'
						//the images will be emmited to public/assets/images/ folder
						//the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png);
					}
				},
				{
					test: /\.css$/,
					loaders: ["style-loader", "css-loader"]
				}
			]
		},
		/*
		resolve: {
			alias: {
				"jquery-ui": "jquery-ui/jquery-ui.js",
				modules: path.join(__dirname, "node_modules")
			}
		},
		module: {
			loaders: [
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					exclude: /(node_modules|bower_components|scss|css.js)/,
					query: {presets: ["env"]}
				}, {
					test: /\.(s?)css$/,
					loader: ExtractTextPlugin.extract('css-loader!sass-loader')
				}, {
					test: /\.jpg$/,
					loader: "file-loader"
				}, {
					test: /\.png$/,
					loader: "file-loader"
				}, {
					test: /\.gif$/,
					loader: "file-loader"
				}
			]
			{ test: /\.css$/, loader: "style!css" },
      { test: /\.(jpe?g|png|gif)$/i, loader:"file" }
		},*/
		plugins: plugins
	}

};
