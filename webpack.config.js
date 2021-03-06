const path = require( "path" );

module.exports = {
	mode: "development",
	entry: "./src/js/app.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "app.bundle.js",
        libraryTarget: 'var',
        library: 'ui'
	}
};
