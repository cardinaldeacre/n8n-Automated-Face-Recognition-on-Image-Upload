import { Outlet, useOutletContext } from 'react-router-dom';

export default function App() {
  const ctx = useOutletContext();
  return <Outlet context={ctx} />;
}
