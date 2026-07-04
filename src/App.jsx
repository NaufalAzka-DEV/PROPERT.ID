import { useAntiDebug } from './hooks/useAntiDebug';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  useAntiDebug();

  return <AppRoutes />;
}
