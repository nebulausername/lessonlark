import type { NextConfig } from 'next';

import { BASIS } from './src/lib/pfad';

/**
 * Lessonlark wird statisch exportiert (`out/`) und von nginx unter
 * kaufmeinewebsite.de/lessonlark/ ausgeliefert. Kein Server, keine API:
 * jedes Formular bleibt im Browser.
 *
 * `trailingSlash` erzeugt `kurse/index.html` statt `kurse.html`, damit nginx
 * mit `try_files $uri $uri/` auskommt.
 */
const config: NextConfig = {
  output: 'export',
  basePath: BASIS,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
