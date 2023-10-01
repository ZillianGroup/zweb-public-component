interface ImportMetaEnv {
  readonly ZWEB_API_BASE_URL: string
  readonly ZWEB_MARKET_URL: string
  readonly ZWEB_INSTANCE_ID: string
  readonly ZWEB_SENTRY_ENV: string
  readonly ZWEB_SENTRY_SERVER_API: string
  readonly ZWEB_APP_VERSION: string
  readonly ZWEB_APP_ENV: string
  readonly ZWEB_GOOGLE_MAP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
