export const EnvConf = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_HOST: process.env.APP_HOST || "localhost",
  APP_PORT: +Number(process.env.APP_PORT) || 3000,
  PASSPHRASE: process.env.PASSPHRASE || "youtubesave",
};
