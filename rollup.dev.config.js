import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: 'src/main.js',
  output: {
    file: 'output/bundle.js',
    format: 'iife'
  },
  plugins: [
    serve({ contentBase: './output/',open:true }),
    livereload()
  ]
};