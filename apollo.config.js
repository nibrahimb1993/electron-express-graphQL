const url = process.env.END_POINT || `http://localhost:4000/graphql`
module.exports = {
  client: {
    includes: ['./src/**/*.js', './src/**/*.ts', './src/**/*.tsx'],
    excludes: [],
    service: {
      name: 'widdee-api',
      url: url
    }
  }
}
