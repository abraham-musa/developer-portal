#! /bin/bash
sentry-cli releases new $SENTRY_RELEASE
sentry-cli releases files $SENTRY_RELEASE upload-sourcemaps $SOURCE_DIR --url-prefix '~/static/js' --rewrite
sentry-cli releases finalize $SENTRY_RELEASE
