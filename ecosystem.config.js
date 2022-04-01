// pm2 config
module.exports = {
  apps: [
    {
      name: 'HaiTokoKurirDev',
      script: './dist/app.js',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
