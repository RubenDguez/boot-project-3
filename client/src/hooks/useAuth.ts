import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserToken {
  name: string;
  exp: number;
}

export default function useAuth(options: { needsAuth: boolean } = {needsAuth: true}) {
  const navigate = useNavigate();
  const isTokenExpired = useCallback((token: string) => {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }, []);

  const getProfile = useCallback(() => {
    // jwtDecode is used to decode the JWT token and return its payload.
    return jwtDecode<UserToken>(localStorage.getItem('id_token') || '');
}, []) 

  const getToken = useCallback(() => {
    return localStorage.getItem('id_token');
  }, []);

  const loggedIn = useCallback(() => {
    const token = getToken();
    return !!token && !isTokenExpired(token);
  }, []);

  const login = useCallback((idToken: string) => {
    localStorage.setItem('id_token', idToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('id_token');
  }, []);

  useEffect(() => {
    if (options.needsAuth && (!getToken() || isTokenExpired(getToken()!))) {
      logout();
      navigate('/login');
    }
  }, []);

  return { getToken, loggedIn, login, logout, isTokenExpired, getProfile };
}
