import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useAuthGuard() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const role = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='))
      ?.split('=')[1]

    const isLoginPage = location.pathname === '/login'

   
    if (!role && !isLoginPage) {
      navigate('/login')
      return
    }


    if (role) {
      navigate('/')
    }
  }, [location, navigate])
}