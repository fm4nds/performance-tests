import { HTTP_STATUS, RESPONSE_TIME_LIMITS } from '../config/constants.js';
import { getResponseBody, hasField, isValidJsonResponse } from './helpers.js';
import { isSuccessfulResponse } from './http.js';

export function validateLaunchResponse(response) {
  const body = getResponseBody(response);
  
  return {
    'status is 200': (r) => r.status === HTTP_STATUS.OK,
    'response is successful': (r) => isSuccessfulResponse(r),
    'response has data': (r) => r.body && r.body.length > 0,
    'response is valid JSON': (r) => isValidJsonResponse(r),
    'response has name field': (r) => {
      const data = getResponseBody(r);
      return hasField(data, 'name') && typeof data.name === 'string';
    },
    'response has date_utc field': (r) => {
      const data = getResponseBody(r);
      return hasField(data, 'date_utc') && typeof data.date_utc === 'string';
    },
    'response has flight_number field': (r) => {
      const data = getResponseBody(r);
      return hasField(data, 'flight_number') && typeof data.flight_number === 'number';
    },
    'response has rocket field': (r) => {
      const data = getResponseBody(r);
      return hasField(data, 'rocket');
    },
    'response time < 2000ms': (r) => r.timings.duration < RESPONSE_TIME_LIMITS.SLOW,
    'response time < 1000ms': (r) => r.timings.duration < RESPONSE_TIME_LIMITS.ACCEPTABLE,
    'content type is json': (r) => {
      const contentType = r.headers['Content-Type'] || r.headers['content-type'];
      return contentType && contentType.includes('application/json');
    },
    'no server errors': (r) => r.status < HTTP_STATUS.INTERNAL_SERVER_ERROR,
  };
}

export function validateBasicResponse(response) {
  return {
    'status is 200': (r) => r.status === HTTP_STATUS.OK,
    'response is successful': (r) => isSuccessfulResponse(r),
    'response has data': (r) => r.body && r.body.length > 0,
    'response time < 2000ms': (r) => r.timings.duration < RESPONSE_TIME_LIMITS.SLOW,
    'no server errors': (r) => r.status < HTTP_STATUS.INTERNAL_SERVER_ERROR,
  };
}

export function validateApiResponse(response, requiredFields = []) {
  const checks = {
    'status is 200': (r) => r.status === HTTP_STATUS.OK,
    'response is valid JSON': (r) => isValidJsonResponse(r),
  };

  if (requiredFields.length > 0) {
    requiredFields.forEach((field) => {
      checks[`response has ${field} field`] = (r) => {
        const data = getResponseBody(r);
        return hasField(data, field);
      };
    });
  }

  return checks;
}

