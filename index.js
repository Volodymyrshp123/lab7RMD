import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Must be exported or directly passed to registerRootComponent
export function App() {
  const ctx = require.context('./src/app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
