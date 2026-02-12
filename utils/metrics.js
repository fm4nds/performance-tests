import { Rate, Trend, Counter } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const responseTime = new Trend('response_time');
export const requestCounter = new Counter('total_requests');
export const successRate = new Rate('successful_requests');
export const clientErrorRate = new Rate('client_errors');
export const serverErrorRate = new Rate('server_errors');

