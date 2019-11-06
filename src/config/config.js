const config = {
  PORT: 0,
  DATABASE: "mongodb://localhost:27017/",
  SECRET: "0000",
  SERVER: "http://localhost"
};

exports.get = function get() {
  return config;
};
