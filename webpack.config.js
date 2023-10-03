module.exports = {
    output: {
       libraryTarget: 'commonjs'
     },
     externals: [
       { pg: { commonjs: 'pg' } }
     ],
   }