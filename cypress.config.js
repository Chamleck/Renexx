const { defineConfig } = require('cypress')
let myUniqueId
module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
    viewportHeight: 1080,
    viewportWidth: 1920,
    watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
  //додав таску яка буде зберігати айді та можна буде дістати його в іншому місці за командою
      on('task', {
        setMyUniqueId: (val) => {
            return (myUniqueId = val);
        },
//таска щоб дістати змінну
        getMyUniqueId: () => {
            return myUniqueId;
        }
    })
      
      // modify config values


      config.defaultCommandTimeout = 10000
      config.pageLoadTimeout = 100000
      config.baseUrl = 'https://emails-dev.alpha-pram.com/'
      

      
      // modify env var value
      config.env.ENVIRONMENT = 'main'
      
      // IMPORTANT return the updated config object
      return config
    }
  }
})