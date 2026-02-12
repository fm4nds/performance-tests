export const BASIC_THRESHOLDS = {
  http_req_duration: ['p(95)<2000', 'p(99)<3000', 'avg<1000'],
  http_req_failed: ['rate<0.01'],
  http_reqs: ['rate>5'],
  http_req_waiting: ['p(95)<1500'],
};

export const THRESHOLDS = {
  http_req_duration: ['p(95)<2000', 'p(99)<3000', 'avg<1000'],
  http_req_failed: ['rate<0.01'],
  http_reqs: ['rate>10'],
  http_req_waiting: ['p(95)<1500'],
  errors: ['rate<0.01'],
  response_time: ['p(95)<2000'],
};

export const STRICT_THRESHOLDS = {
  http_req_duration: ['p(95)<1000', 'p(99)<2000', 'avg<500'],
  http_req_failed: ['rate<0.001'],
  http_reqs: ['rate>20'],
  http_req_waiting: ['p(95)<800'],
  errors: ['rate<0.001'],
  response_time: ['p(95)<1000'],
};

export const RELAXED_THRESHOLDS = {
  http_req_duration: ['p(95)<5000', 'p(99)<8000'],
  http_req_failed: ['rate<0.05'],
  http_reqs: ['rate>5'],
  errors: ['rate<0.05'],
};

