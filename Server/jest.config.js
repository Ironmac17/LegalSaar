module.exports = {
    testEnvironment: "node",
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "controllers/**/*.js",
        "utils/**/*.js",
        "services/**/*.js",
        "middleware/**/*.js",
        "!**/*.test.js",
    ],
    testMatch: ["**/__tests__/**/*.test.js"],
    transformIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
    testTimeout: 10000,
};
