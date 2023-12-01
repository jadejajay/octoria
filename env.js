const z = require('zod');

const packageJSON = require('./package.json');
const path = require('path');
const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

const BUNDLE_ID = 'com.octoria'; // ios bundle id
const PACKAGE = 'com.octoria'; // android package name
const NAME = 'octoria'; // app name
const EXPO_ACCOUNT_OWNER = 'expo-owner'; // expo account owner

/**
 * We declare a function withEnvSuffix that will add a suffix to the variable name based on the APP_ENV
 * Add a suffix to variable env based on APP_ENV
 * @param {string} name
 * @returns  {string}
 */

const withEnvSuffix = (name) => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`;
};

const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // ADD YOUR CLIENT ENV VARS HERE
  API_URL: z.string(),
  SHARECAM_BACKGROUND: z.string(),
  USERPHOTO_URL: z.string(),
  SHARE_WHATSAPP: z.string(),
  SHARE_INSTAGRAM: z.string(),
  SHARE_FACEBOOK: z.string(),
  SHARE_TELEGRAM: z.string(),
  SHARE_DOWNLOAD: z.string(),
  GIF_CAMERA: z.string(),
  INTRO_VIDEO: z.string(),
  POST_DEMO: z.string(),
  XRSERVICE_API: z.string(),
  XRSERVICE_FALLBACK: z.string(),
});

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
  // ADD YOUR BUILD TIME ENV VARS HERE
  SECRET_KEY: z.string(),
});

/**
 * @type {Record<keyof z.infer<typeof client> , string | undefined>}
 */
const _clientEnv = {
  APP_ENV,
  NAME: NAME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  // ADD YOUR ENV VARS HERE TOO
  API_URL: process.env.API_URL,
  SHARECAM_BACKGROUND: process.env.SHARECAM_BACKGROUND,
  USERPHOTO_URL: process.env.USERPHOTO_URL,
  SHARE_WHATSAPP: process.env.SHARE_WHATSAPP,
  SHARE_INSTAGRAM: process.env.SHARE_INSTAGRAM,
  SHARE_FACEBOOK: process.env.SHARE_FACEBOOK,
  SHARE_TELEGRAM: process.env.SHARE_TELEGRAM,
  SHARE_DOWNLOAD: process.env.SHARE_DOWNLOAD,
  GIF_CAMERA: process.env.GIF_CAMERA,
  INTRO_VIDEO: process.env.INTRO_VIDEO,
  POST_DEMO: process.env.POST_DEMO,
  XRSERVICE_API: process.env.XRSERVICE_API,
  XRSERVICE_FALLBACK: process.env.XRSERVICE_FALLBACK,
};

/**
 * @type {Record<keyof z.infer<typeof buildTime> , string | undefined>}
 */
const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,
  // ADD YOUR ENV VARS HERE TOO
  SECRET_KEY: process.env.SECRET_KEY,
};

const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`
  );
  throw new Error(
    'Invalid environment variables, Check terminal for more details '
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix,
};
