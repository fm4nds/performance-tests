export function parseJsonSafely(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

export function isValidJsonResponse(response) {
  if (!response || !response.body) {
    return false;
  }
  const parsed = parseJsonSafely(response.body);
  return parsed !== null;
}

export function getResponseBody(response) {
  if (!isValidJsonResponse(response)) {
    return null;
  }
  return parseJsonSafely(response.body);
}

export function hasField(obj, fieldName) {
  return obj && typeof obj === 'object' && fieldName in obj && obj[fieldName] !== undefined;
}

export function calculateSleepTime(min = 0.5, max = 2.0) {
  return Math.random() * (max - min) + min;
}

export function formatDuration(ms) {
  if (ms < 1000) {
    return `${ms.toFixed(0)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

export function formatPercentage(value, decimals = 2) {
  return `${(value * 100).toFixed(decimals)}%`;
}

