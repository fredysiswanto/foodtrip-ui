module.exports = {
  apps: [
    // Admin App
    {
      name: 'foodtrip-admin',
      script: 'npm',
      args: 'run dev:admin',
      cwd: '/home/ubuntu/foodtrip-ui',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 5174,
      },
      env_production: {
        NODE_ENV: 'production',
      },
      watch: ['apps/admin/src'],
      ignore_watch: ['apps/admin/dist', 'node_modules', 'pnpm-lock.yaml'],
      max_memory_restart: '500M',
      error_file: '/home/ubuntu/log/pm2/admin-error.log',
      out_file: '/home/ubuntu/log/pm2/admin-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
    },

    // Client App
    {
      name: 'foodtrip-client',
      script: 'npm',
      args: 'run dev:client',
      cwd: '/home/ubuntu/foodtrip-ui',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 5173,
      },
      env_production: {
        NODE_ENV: 'production',
      },
      watch: ['apps/client/src'],
      ignore_watch: ['apps/client/dist', 'node_modules', 'pnpm-lock.yaml'],
      max_memory_restart: '500M',
      error_file: '/home/ubuntu/log/pm2/client-error.log',
      out_file: '/home/ubuntu/log/pm2/client-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: false,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],

  // Deployment configuration
  //   deploy: {
  //     production: {
  //       user: 'user',
  //       host: 'your-ubuntu-server.com', // Ganti dengan IP/domain server
  //       ref: 'origin/main',
  //       repo: 'git@github.com:yourusername/foodtrip-ui.git', // Ganti dengan repo URL
  //       path: '/home/user/foodtrip-ui',
  //       'post-deploy':
  //         'pnpm install && pnpm build && pm2 reload ecosystem.config.js --env production',
  //       'pre-deploy-local': 'echo "Deployment started"',
  //     },
  //     development: {
  //       user: 'user',
  //       host: 'your-dev-server.com',
  //       ref: 'origin/develop',
  //       repo: 'git@github.com:yourusername/foodtrip-ui.git',
  //       path: '/home/user/foodtrip-ui-dev',
  //       'post-deploy': 'pnpm install && pm2 reload ecosystem.config.js',
  //     },
  //   },
};
