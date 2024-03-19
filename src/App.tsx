import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivatePage } from './pages/PrivatePage';
import { PrivateRoute } from './router/privateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/">
            <Route index element={<PrivatePage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
        </Route>
        
        <Route path="login" element={<LoginPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
