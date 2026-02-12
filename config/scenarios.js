export const SCENARIOS = {
  LOAD_TEST: {
    name: 'Load Test - Gradual Ramp',
    stages: [
      { duration: '30s', target: 10 },
      { duration: '1m', target: 10 },
      { duration: '30s', target: 20 },
      { duration: '1m', target: 20 },
      { duration: '30s', target: 0 },
    ],
  },
  STRESS_TEST: {
    name: 'Stress Test - High Load',
    stages: [
      { duration: '30s', target: 50 },
      { duration: '2m', target: 50 },
      { duration: '30s', target: 100 },
      { duration: '2m', target: 100 },
      { duration: '30s', target: 0 },
    ],
  },
  SPIKE_TEST: {
    name: 'Spike Test - Sudden Traffic',
    stages: [
      { duration: '10s', target: 10 },
      { duration: '10s', target: 100 },
      { duration: '10s', target: 10 },
      { duration: '1m', target: 10 },
    ],
  },
  SIMPLE: {
    name: 'Simple Test - Basic Load',
    vus: 10,
    duration: '1m',
  },
  SOAK_TEST: {
    name: 'Soak Test - Extended Duration',
    stages: [
      { duration: '2m', target: 10 },
      { duration: '30m', target: 10 },
      { duration: '2m', target: 0 },
    ],
  },
};

