import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from 'pages/AuthPage';
import NotesPage from 'pages/NotesPage';
import { useAuthContext } from 'utils/contexts/auth.context';

export const useRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Routes>
      <Route path="/notes" element={<NotesPage />} />
      <Route path="*" element={<Navigate to="/notes" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
