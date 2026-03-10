#!/usr/bin/env sh
set -eu

PORT=4010
BASE_URL="http://localhost:${PORT}"
ROUTES="/ /about /contact /rto-financing /products /products/category/steel-barns /products/30x60x16-premium-agriculture-building"

cleanup() {
  pkill -f "next start -p ${PORT}" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

next start -p "${PORT}" >/tmp/milestone-next-start.log 2>&1 &
sleep 1

for route in $ROUTES; do
  body_file="/tmp/milestone-smoke-route.html"
  code="$(curl -sS -o "$body_file" -w "%{http_code}" "${BASE_URL}${route}")"
  if [ "$code" != "200" ]; then
    echo "Smoke test failed: ${route} returned ${code}"
    exit 1
  fi

  if ! rg -q "_next/static/css/" "$body_file"; then
    echo "Smoke test failed: ${route} missing css reference"
    exit 1
  fi
done

echo "Smoke test passed for all routes."
