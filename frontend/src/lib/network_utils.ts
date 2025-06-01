export const IS_BROWSER =
  typeof window !== 'undefined' && typeof document !== 'undefined';

const LOCALHOST = 'localhost'; 

enum BACKEND_NAMES {
  LOCAL = 'LOCAL', 
}

export type BackendName = (typeof BACKEND_NAMES)[keyof typeof BACKEND_NAMES];

export const BACKENDS = {
  LOCAL: {
    displayName: 'Local',
    apiUrl: 'http://localhost:3000',
  }, 
} satisfies { [K in BackendName]: object };

export function getCurrentBackend(): BackendName {
  if (!IS_BROWSER || document.location.hostname === LOCALHOST)
    return BACKEND_NAMES.LOCAL;  

  console.warn(
    `Unknown hostname: ${document.location.hostname}, defaulting to PROD`
  );
  return BACKEND_NAMES.LOCAL;
}

export const IS_DEV = [LOCALHOST].includes(document.location.hostname); 

export const CURRENT_BACKEND = getCurrentBackend();
export const API_ENDPOINT = BACKENDS[CURRENT_BACKEND].apiUrl;
