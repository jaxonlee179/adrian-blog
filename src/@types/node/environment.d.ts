namespace NodeJS {
  interface ProcessEnv {
    PROTOCOL?: string;
    HOST?: string;
    DB_HOST?: string;
    USING_CACHE?: string;
    REDIS_URL?: string;
    LOGGER_CAPPED_SIZE_IN_MB?: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    SEEDER?: string;
    JWT_KEY?: string;
    JWT_EXP_IN_MINS?: string;
    REFRESH_TOKEN_EXP_IN_DAYS?: string;
    S3_ENDPOINT?: string;
    S3_REGION?: string;
    S3_ACCESS_KEY?: string;
    S3_SECRET_KEY?: string;
    S3_ACL?: string;
    S3_FORTH_PATH_STYLE?: string;
    S3_STREAMING_UPLOAD?: string;
    S3_BUCKET?: string;
  }
}