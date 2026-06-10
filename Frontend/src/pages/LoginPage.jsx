import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { login, register } from '../api/auth'
import { FormField, Input } from '../components/ui/FormField'
import Button from '../components/ui/Button'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [isLogin, setIsLogin]   = useState(true)
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const setAuth    = useAppStore((s) => s.setAuth)
  const navigate   = useNavigate()

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const data = isLogin
        ? await login(email, password)
        : await register(name, email, password, 'admin')

      setAuth(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoMark}>💰</div>
          <span className={styles.logoText}>FinBoard</span>
        </div>

        <h2 className={styles.title}>
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p className={styles.subtitle}>
          {isLogin ? 'Sign in to your account' : 'Start tracking your finances'}
        </p>

        <div className={styles.form}>
          {!isLogin && (
            <FormField label="Name">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormField>
          )}
          <FormField label="Email">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <FormField label="Password">
            <Input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </FormField>

          {error && <p className={styles.error}>{error}</p>}

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', marginTop: '4px' }}
          >
            {loading ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
          </Button>
        </div>

        <p className={styles.toggle}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className={styles.toggleBtn}
            onClick={() => { setIsLogin(!isLogin); setError('') }}
          >
            {isLogin ? 'Register' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}