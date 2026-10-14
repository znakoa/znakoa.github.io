import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import type {ClientModule} from '@docusaurus/types';

type HueKey = 'js' | 'vue' | 'react' | 'node' | 'mini' | 'eng' | 'algo' | 'note';

const SHELF_ROUTES: Array<[RegExp, HueKey]> = [
  [/basics-javascript/i, 'js'],
  [/basics-vue/i, 'vue'],
  [/basics-react/i, 'react'],
  [/basics-node/i, 'node'],
  [/basics-mini-programs/i, 'mini'],
  [/basics-engineering/i, 'eng'],
  [/handwritten-questions/, 'algo'],
  [/\/docs\/daily-work\//, 'mini'],
  [/\/docs\/(gitorder|export-word|class-name)/, 'eng'],
  [/\/docs\/material/, 'note'],
  [/handbooks\/interview-guide/, 'note'],
  [/handbooks\/javascript-core/, 'js'],
  [/handbooks\/browser-core/, 'react'],
  [/handbooks\/http-network/, 'node'],
  [/handbooks\/design-patterns/, 'algo'],
  [/handbooks\/(sdk-webpack|ai-engineering|chunked-upload)/, 'eng'],
  [/^\/blog/, 'note'],
];

function applyShelfHue(pathname: string): void {
  if (!ExecutionEnvironment.canUseDOM) return;

  const root = document.documentElement;
  const hit = SHELF_ROUTES.find(([pattern]) => pattern.test(pathname));
  const key: HueKey = hit ? hit[1] : 'js';

  root.style.setProperty('--sc-shelf-l', `var(--hue-${key}-l)`);
  root.style.setProperty('--sc-shelf-d', `var(--hue-${key}-d)`);
}

if (ExecutionEnvironment.canUseDOM) {
  applyShelfHue(window.location.pathname);
}

const clientModule: ClientModule = {
  onRouteDidUpdate({location}) {
    applyShelfHue(location.pathname);
  },
};

export default clientModule;
