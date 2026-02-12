import { SCENARIOS } from '../config/scenarios.js';
import { THRESHOLDS } from '../config/thresholds.js';
import { executeLaunchTest, handleSummary } from './base-scenario.js';

export const options = {
  stages: SCENARIOS.SPIKE_TEST.stages,
  thresholds: THRESHOLDS,
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

export default function () {
  executeLaunchTest();
}

export { handleSummary };

