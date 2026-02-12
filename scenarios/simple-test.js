import { SCENARIOS } from '../config/scenarios.js';
import { BASIC_THRESHOLDS } from '../config/thresholds.js';
import { ENDPOINTS } from '../config/endpoints.js';
import { getLatestLaunch } from '../utils/http.js';
import { validateBasicResponse } from '../utils/checks.js';
import { check, sleep } from 'k6';
import { calculateSleepTime } from '../utils/helpers.js';
import { SLEEP_DURATION } from '../config/constants.js';

export const options = {
  vus: SCENARIOS.SIMPLE.vus,
  duration: SCENARIOS.SIMPLE.duration,
  thresholds: BASIC_THRESHOLDS,
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

export default function () {
  const response = getLatestLaunch(ENDPOINTS.LATEST_LAUNCH);
  check(response, validateBasicResponse(response));
  
  const sleepTime = calculateSleepTime(SLEEP_DURATION.MIN, SLEEP_DURATION.MAX);
  sleep(sleepTime);
}

