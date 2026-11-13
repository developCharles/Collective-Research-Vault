import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
})

// automatically attach JWT Token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    console.log('[API Interceptor] Token from localStorage:', token ? 'Present' : 'Missing')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log('[API Interceptor] Authorization header added')
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || ''
        const isLogin = error.config?.url?.includes('/auth/login')
        if (!isLogin && /token/i.test(message)) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.assign('/login')
        }
        return Promise.reject(error)
    }
)

export const getNotifications = ()    => api.get('/notifications')
export const getUnreadCount   = ()    => api.get('/notifications/unread')
export const markOneRead      = (id)  => api.patch(`/notifications/${id}/read`)
export const markAllRead      = ()    => api.patch('/notifications/read-all')

export default api