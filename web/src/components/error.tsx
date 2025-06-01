import { useNavigate } from '@tanstack/react-router'

export function Error() {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate({
      to: '/',
    })
  }, 3000)

  return (
    <div>
      <h1>404</h1>
      <p>Página não encontrada</p>
    </div>
  )
}
