module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }],
		"@babel/preset-react",
		"@babel/preset-typescript",
	],
	plugins: [
		"@babel/plugin-transform-modules-commonjs",
		"@babel/plugin-syntax-import-attributes",
	],
};
