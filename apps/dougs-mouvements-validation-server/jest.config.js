module.exports = {
  displayName: 'dougs-mouvements-validation-server',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/dougs-mouvements-validation-server',
};
