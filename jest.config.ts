import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^.+\\.(css|scss)$": "identity-obj-proxy",
		"^lucide-react$": "<rootDir>/__mocks__/lucide-react.ts",
		"^@radix-ui/react-dialog$":
			"<rootDir>/__mocks__/@radix-ui/react-dialog.ts",
		"^next-intl$": "<rootDir>/__mocks__/next-intl.ts",
	},
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
	transform: {
		"^.+\\.(t|j)sx?$": ["babel-jest", { configFile: "./.babelrc.test.js" }],
	},
	transformIgnorePatterns: ["/node_modules/(?!lucide-react)"],
};

export default createJestConfig(config);
