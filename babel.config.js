module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: { node: "current" },
				modules: "commonjs",
			},
		],
		"@babel/preset-react",
		"@babel/preset-typescript",
	],
	roots: ["<rootDir>/src"],
	plugins: ["@babel/plugin-transform-modules-commonjs"],
};
