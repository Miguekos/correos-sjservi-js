module.exports = {
  apps: [{
    name: 'correo-sjservi-js',
    script: './app.js',
    instances: 1,
    exec_mode: 'fork',
    watch: true,
    log_file: '~/.pm2/logs/correo-sjservi-outerr.log',
    out_file: 'NULL', // ~/.pm2/logs/prospecto-out.log
    error_file: 'NULL', // ~/.pm2/logs/prospecto-err.log
    combine_logs: true,
    merge_logs: true,
    env_production: {
        NODE_ENV: 'production',
      },
    env_development: {
        NODE_ENV: 'development',
      },
  }],
};
