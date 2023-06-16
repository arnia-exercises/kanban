type LoginParams = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
}

export const loginService = async ({ email, password }: LoginParams): Promise<LoginResponse> => {
  const res = await fetch('https://arnia-kanban.vercel.app/api/user/login', {
    method: 'POST',
    headers: {
      'x-api-key': '52a8b954-e25d-4cc5-86e5-c32e92f994bb',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('AUTH_TOKEN') || ''
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  if (res.status === 200) {
    return await res.json()
  }
  
  if (res.status === 401 || res.status === 404) {
    throw new Error('Credenciais invalidas')
  }
  
  throw new Error('Ocorreu um erro, tente novamente mais tarde!')
}
