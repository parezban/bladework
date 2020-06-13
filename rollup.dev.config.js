import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import typescript from '@rollup/plugin-typescript';


export default {
  input: 'src/main.ts',
  output: {
    file: 'output/bundle.js',
    format: 'iife'
  },
  plugins: [
    typescript(),
    serve({ contentBase: './output/',open:true }),
    livereload()
  ]
};