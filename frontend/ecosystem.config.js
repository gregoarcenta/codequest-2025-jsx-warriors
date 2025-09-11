module.exports = {
  apps: [
    {
      name: "blogdevtalles",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
