const env = process.env;

const aws = {
  username: env.AWS_DB_USER,
  password: env.AWS_DB_PASSWORD,
  database: env.AWS_DB_NAME,
  host: env.AWS_DB_ENDPOINT,
  dialect: env.AWS_DB_DIALECT,
  port: env.AWS_DB_PORT
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT
};

const local = {
  username: env.LOCAL_DB_USER,
  password: env.LOCAL_DB_PASSWORD,
  database: env.LOCAL_DB_NAME,
  host: env.LOCAL_DB_ENDPOINT,
  dialect: env.LOCAL_DB_DIALECT,
  port: env.LOCAL_DB_PORT
};

module.exports = { aws, production, local };