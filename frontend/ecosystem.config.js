module.exports = {
  apps: [
    {
      name: "blogdevtalles",
      script: "npm",
      args: "start",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
