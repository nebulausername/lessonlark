import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const konfiguration = [
  { ignores: ['.next*/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'pruef-ausgabe/**'] },
  ...nextCoreWebVitals,
];

export default konfiguration;
