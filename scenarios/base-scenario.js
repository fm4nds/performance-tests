import { ENDPOINTS } from '../config/endpoints.js';
import { getLatestLaunch } from '../utils/http.js';
import { validateLaunchResponse } from '../utils/checks.js';
import { errorRate, responseTime, successRate, clientErrorRate, serverErrorRate } from '../utils/metrics.js';
import { isSuccessfulResponse, isClientError, isServerError } from '../utils/http.js';
import { check, sleep } from 'k6';
import { generateSummary } from '../utils/summary.js';
import { SLEEP_DURATION } from '../config/constants.js';
import { calculateSleepTime } from '../utils/helpers.js';

export function executeLaunchTest() {
  const response = getLatestLaunch(ENDPOINTS.LATEST_LAUNCH);
  const success = check(response, validateLaunchResponse(response));
  
  errorRate.add(!success);
  responseTime.add(response.timings.duration);
  
  if (isSuccessfulResponse(response)) {
    successRate.add(1);
  } else {
    successRate.add(0);
  }
  
  if (isClientError(response)) {
    clientErrorRate.add(1);
  } else {
    clientErrorRate.add(0);
  }
  
  if (isServerError(response)) {
    serverErrorRate.add(1);
  } else {
    serverErrorRate.add(0);
  }
  
  sleep(calculateSleepTime(SLEEP_DURATION.MIN, SLEEP_DURATION.MAX));
  
  return response;
}

export function handleSummary(data) {
  return generateSummary(data);
}

