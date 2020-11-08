module.exports = {
  apps: [{
    name: 'correo',
    script: './app.js',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    log_file: '~/.pm2/logs/correo-outerr.log',
    out_file: 'NULL', // ~/.pm2/logs/correo-out.log
    error_file: 'NULL', // ~/.pm2/logs/correo-err.log
    combine_logs: true,
    merge_logs: true,
    env_production: {
      NODE_ENV: 'production',
      NODE_PATH: "./"
    },
    env_development: {
      NODE_ENV: 'development',
      NODE_PATH: "./"
    }
  }]
};