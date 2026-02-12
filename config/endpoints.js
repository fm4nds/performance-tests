export const BASE_URL = 'https://api.spacexdata.com/v5';

export const ENDPOINTS = {
  LATEST_LAUNCH: `${BASE_URL}/launches/latest`,
  LAUNCHES: `${BASE_URL}/launches`,
  ROCKETS: `${BASE_URL}/rockets`,
  LAUNCHES_UPCOMING: `${BASE_URL}/launches/upcoming`,
  LAUNCHES_PAST: `${BASE_URL}/launches/past`,
};

export const ENDPOINT_NAMES = {
  LATEST_LAUNCH: 'SpaceX Latest Launch',
  LAUNCHES: 'SpaceX Launches',
  ROCKETS: 'SpaceX Rockets',
};

