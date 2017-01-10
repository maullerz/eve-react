'use strict'
let fs = require('vinyl-fs')
let Ftp = require('vinyl-ftp')
let async = require('async')
let _ = require('lodash')

if (!process.env.ftp_host) {
  console.error('ENV variables is not defined')
  process.exit(1)
}

let conn = new Ftp({
  host: process.env.ftp_host || '',
  user: process.env.ftp_user || '',
  password: process.env.ftp_password || '',
  parallel: 10
})

async.series({
    // Clean ftp before deploy
  cleanStatic: function (callback) {
    conn.rmdir('./static', () => {
      callback(null, true)
    })
  },
  cleanManifest: function (callback) {
    conn.delete('./asset-manifest.json', () => {
      callback(null, true)
    })
  },
  cleanIndex: function (callback) {
    conn.delete('./index.html', () => {
      callback(null, true)
    })
  },
  status: function (callback) {
    fs.src(['./build/**'], {buffer: false}).pipe(conn.dest('/'))
        .on('end', () => {
          callback(null, 'Deployed!')
        })
        .on('error', () => {
          callback(null, 'Not deployed!')
        })
  }
},
  function (err, result) {
    if (err) {
      console.error(err)
    }
    if (result) {
      _.each(result, function (v, k) {
        console.log(k + ': ' + v)
      })
    }
  })
