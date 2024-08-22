module.exports = {
  root: true,
  extends: ['@react-native'],
  plugins: ['prettier', 'react', 'react-native'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
  },
};
