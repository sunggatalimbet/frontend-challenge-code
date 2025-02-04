import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/types.ts",
	],
	transform: {
		"^.+\\.(t|j)sx?$": "babel-jest",
	},
	testEnvironmentOptions: {
		url: "http://localhost/",
	},
	maxWorkers: "50%",
	globals: {
		NODE_ENV: "test",
	},
	transformIgnorePatterns: ["/node_modules/"],
};

export default createJestConfig(config);
