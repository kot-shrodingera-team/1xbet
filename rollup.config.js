import config from './node_modules/@kot-shrodingera-team/config/rollup.config';
import bookmakerName from './bookmakerName';

export default {
  ...config,
  input: './src/index.ts',
  output: {
    file: `./dist/${bookmakerName}.js`,
  },
};
