import { useEffect } from 'react';

function useErrorHandler() {
  useEffect(() => {
    const errorHandler = (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        // Navigate to login page (adjust as needed)
        window.location.href = '/login';
      }
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);
}

export default useErrorHandler;