module.exports = {
  // ...otras configuraciones...
  webdriver: {
    start_process: true,
    server_path: require('chromedriver').path,
    port: 9515,
    cli_args: ['--port=9515']
  },
  // ...otras configuraciones...
};

