import { useNavigate } from 'react-router';
import { useUserContext } from '../context/UserContext';
import { useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_PATHS } from '../api/config';

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data.user);
        }
      } catch (error) {
        console.error(`Failed to fetch user info`, error);
        if (isMounted) {
          clearUser();
          navigate('/login');
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
