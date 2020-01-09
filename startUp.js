const { exec } = require('child_process')
const { writeFileSync } = require('fs')

// A start up script being run right before npm start
// Checks envs and sets a new env to determine API URL

let URL

if (process.env['API_HOST']) { // if $API_HOST is set, using it
  URL = `${process.env['API_HOST']}:${process.env.API_PORT}`
} else { // if not getting `api` IP from system's hosts
  exec('getent hosts api | awk \'{ print $1 }\'', (err, stdout) => {
    if (err) {
      console.error(err)
      process.exit(0)
    }
    URL = `${stdout.trimEnd()}:${process.env.API_PORT}`
  })
}

// writing new env that will be included into CRA process
writeFileSync('./.env', `REACT_APP_API=${URL}`)
console.log('API URL is set to: ', URL)
