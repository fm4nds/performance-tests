import http from 'k6/http';
import { ENDPOINT_NAMES } from '../config/endpoints.js';
import { TIMEOUTS } from '../config/constants.js';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export function getLatestLaunch(endpoint) {
  return http.get(endpoint, {
    headers: DEFAULT_HEADERS,
    tags: {
      name: ENDPOINT_NAMES.LATEST_LAUNCH,
      endpoint: 'latest_launch',
    },
    timeout: `${TIMEOUTS.REQUEST}ms`,
  });
}

export function getRequest(url, params = {}) {
  const mergedHeaders = Object.assign({}, DEFAULT_HEADERS, params.headers || {});
  const mergedTags = Object.assign({ endpoint: params.endpoint || 'generic' }, params.tags || {});

  const options = {
    headers: mergedHeaders,
    tags: mergedTags,
    timeout: params.timeout || `${TIMEOUTS.REQUEST}ms`,
  };

  if (params.params) {
    options.params = params.params;
  }

  return http.get(url, options);
}

export function postRequest(url, payload, params = {}) {
  const mergedHeaders = Object.assign({}, DEFAULT_HEADERS, params.headers || {});
  const mergedTags = Object.assign(
    { endpoint: params.endpoint || 'generic', method: 'POST' },
    params.tags || {}
  );

  const options = {
    headers: mergedHeaders,
    tags: mergedTags,
    timeout: params.timeout || `${TIMEOUTS.REQUEST}ms`,
  };

  return http.post(url, JSON.stringify(payload), options);
}

export function isSuccessfulResponse(response) {
  return response && response.status >= 200 && response.status < 300;
}

export function isClientError(response) {
  return response && response.status >= 400 && response.status < 500;
}

export function isServerError(response) {
  return response && response.status >= 500;
}

