// https://jestjs.io/docs/en/configuration.html

module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  setupFiles: [
    "./testUtils/setupTests.ts",
    "./node_modules/react-native-gesture-handler/jestSetup.js"
  ],
  collectCoverageFrom: [
    "src/pages/**/*.tsx",
    "src/components/**/*.tsx",
    "src/context/*.tsx",
    "src/utils/*.ts",
    "!src/context/index.tsx",
  ],
};
