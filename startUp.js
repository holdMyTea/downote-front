const { exec } = require('child_process')
const { writeFileSync } = require('fs')

exec('getent hosts api | awk \'{ print $1 }\'', (err, stdout) => {
  if (err) {
    console.error(err)
  } else {
    const URL = `${stdout.trimEnd()}:${process.env.API_PORT}`
    writeFileSync('./.env', `REACT_APP_API=${URL}`)
    console.log('API URL is set to: ', URL)
  }
})
