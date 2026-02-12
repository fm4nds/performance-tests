import { formatDuration, formatPercentage } from './helpers.js';

function getMetricValue(metrics, metricName, defaultValue = null) {
  const metric = metrics[metricName];
  if (!metric || !metric.values) {
    return defaultValue;
  }
  return metric.values;
}

function formatMetricValue(value, format = 'number') {
  if (value === undefined || value === null) {
    return 'N/A';
  }
  
  switch (format) {
    case 'duration':
      return formatDuration(value);
    case 'percentage':
      return formatPercentage(value);
    case 'count':
      return value.toLocaleString();
    default:
      return typeof value === 'number' ? value.toFixed(2) : value;
  }
}

export function generateSummary(data) {
  const metrics = data.metrics || {};
  const httpReqs = getMetricValue(metrics, 'http_reqs', { count: 0, rate: 0 });
  const httpReqDuration = getMetricValue(metrics, 'http_req_duration', {});
  const httpReqFailed = getMetricValue(metrics, 'http_req_failed', { rate: 0 });
  const iterations = getMetricValue(metrics, 'iterations', { count: 0, rate: 0 });
  
  const duration = (data.state && data.state.testRunDurationMs) || 0;
  const totalRequests = (httpReqs && httpReqs.count) || 0;
  const failedRate = (httpReqFailed && httpReqFailed.rate) || 0;
  const successRate = (1 - failedRate) * 100;
  
  const summary = `
╔══════════════════════════════════════════════════════════════╗
║           RESUMO DO TESTE DE PERFORMANCE                    ║
╠══════════════════════════════════════════════════════════════╣
║ DURAÇÃO DO TESTE                                             ║
║   Total: ${formatDuration(duration).padEnd(45)}║
╠══════════════════════════════════════════════════════════════╣
║ REQUISIÇÕES                                                  ║
║   Total: ${formatMetricValue(totalRequests, 'count').padEnd(45)}║
║   Taxa de Sucesso: ${formatMetricValue(successRate, 'percentage').padEnd(35)}║
║   Taxa de Erro: ${formatMetricValue(httpReqFailed.rate, 'percentage').padEnd(38)}║
╠══════════════════════════════════════════════════════════════╣
║ TEMPO DE RESPOSTA                                            ║
║   Média: ${formatMetricValue(httpReqDuration.avg, 'duration').padEnd(43)}║
║   Mediana: ${formatMetricValue(httpReqDuration.med, 'duration').padEnd(40)}║
║   Mínimo: ${formatMetricValue(httpReqDuration.min, 'duration').padEnd(42)}║
║   Máximo: ${formatMetricValue(httpReqDuration.max, 'duration').padEnd(41)}║
║   p90: ${formatMetricValue(httpReqDuration['p(90)'], 'duration').padEnd(46)}║
║   p95: ${formatMetricValue(httpReqDuration['p(95)'], 'duration').padEnd(46)}║
║   p99: ${formatMetricValue(httpReqDuration['p(99)'], 'duration').padEnd(46)}║
╠══════════════════════════════════════════════════════════════╣
║ ITERAÇÕES                                                    ║
║   Total: ${formatMetricValue(iterations.count, 'count').padEnd(45)}║
║   Taxa: ${formatMetricValue(iterations.rate, 'number').padEnd(47)}/s║
╚══════════════════════════════════════════════════════════════╝
  `;
  
  return {
    'summary.json': JSON.stringify(data, null, 2),
    'summary.txt': summary,
    stdout: summary,
  };
}

