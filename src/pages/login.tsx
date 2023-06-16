import { ChangeEvent, MouseEvent, useState } from "react"
import { loginService } from "../services/user"
import { useNavigate } from "react-router-dom"

type Values = {
  email: string
  password: string
}

export default function Login () {
  const navigate = useNavigate()
  const [values, setValues] = useState<Values>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Values>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setErrors({
      email: '',
      password: ''
    })

    if (values.email === '') {
      setErrors(prev => ({
        ...prev,
        email: 'O Campo email obrigatório'
      }))
    }

    if (values.password === '') {
      setErrors(prev => ({
        ...prev,
        password: 'O Campo password obrigatório'
      }))
    }

    if (values.email === '' || values.password === '') {
      return
    }

    try {
      const result = await loginService(values)
      localStorage.setItem('AUTH_TOKEN', result.token)
      // navigate('/')
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }

  return (
    <div>
      {error !== '' && <h1>{error}</h1>}

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" name="email" required onChange={handleChange} />
          <p>{errors.email}</p>
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" placeholder="Senha" name="password" required onChange={handleChange} />
          <p>{errors.password}</p>
        </div>
        <div>
          <button type="submit" onClick={handleLogin}>Entrar</button>
        </div>
      </form>
    </div>
  )
}
