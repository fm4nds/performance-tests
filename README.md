# Testes de Performance - API SpaceX com K6

Projeto de testes de performance para a API da SpaceX utilizando K6.

## API Testada

**Endpoint Principal:**
- `GET https://api.spacexdata.com/v5/launches/latest`

**Descrição:** Retorna informações sobre o último lançamento da SpaceX.

## Testes Disponíveis

### 1. Simple Test
- **Arquivo:** `scenarios/simple-test.js`
- **Configuração:** 10 usuários virtuais por 1 minuto
- **Objetivo:** Teste básico e rápido para validação inicial

### 2. Load Test
- **Arquivo:** `scenarios/load-test.js`
- **Configuração:** Carga gradual
  - 30s: Ramp-up para 10 usuários
  - 1min: Estabilidade com 10 usuários
  - 30s: Ramp-up para 20 usuários
  - 1min: Estabilidade com 20 usuários
  - 30s: Ramp-down para 0 usuários
- **Objetivo:** Avaliar comportamento sob carga gradual

### 3. Stress Test
- **Arquivo:** `scenarios/stress-test.js`
- **Configuração:** Carga alta
  - 30s: Ramp-up para 50 usuários
  - 2min: Estabilidade com 50 usuários
  - 30s: Ramp-up para 100 usuários
  - 2min: Estabilidade com 100 usuários
  - 30s: Ramp-down para 0 usuários
- **Objetivo:** Identificar limites e pontos de falha do sistema

### 4. Spike Test
- **Arquivo:** `scenarios/spike-test.js`
- **Configuração:** Picos de tráfego
  - 10s: 10 usuários
  - 10s: Pico de 100 usuários
  - 10s: Volta para 10 usuários
  - 1min: Estabilidade com 10 usuários
- **Objetivo:** Testar comportamento em picos súbitos de tráfego

## Executar Testes

### CI/CD e terminal Linux/macOS (sem dashboard)

```bash
npm run test:simple
npm run test:load
npm run test:stress
npm run test:spike
npm run test:all
```

### Windows local com dashboard

```bash
npm run test:simple:dashboard
npm run test:load:dashboard
npm run test:stress:dashboard
npm run test:spike:dashboard
npm run test:all:dashboard
```

**Dashboard:** http://localhost:5665 (disponível enquanto o teste está rodando)

## Pré-requisitos

- [K6](https://k6.io/docs/getting-started/installation/) instalado
- Node.js 14+ (para scripts npm)