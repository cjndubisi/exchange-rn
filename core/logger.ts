const logger = {
  log: (...args) => {},
  info: (...args) => {},
  error: (...args) => {},
  warn: (...args) => {},
};

if (process.env.NODE_ENV === 'production') {
  // TODO: Migrate to winston.
  logger['log'] = console.log;
  logger['info'] = console.info;
  logger['error'] = console.error;
  logger['warn'] = console.warn;
} else {
  logger['log'] = console.log;
  logger['info'] = console.info;
  logger['error'] = console.error;
  logger['warn'] = console.error;
}

export default logger;
