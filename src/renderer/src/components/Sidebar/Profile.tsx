import { CaretDown, User } from 'phosphor-react'

export function Profile() {
  const isAuthenticated = false

  if (!isAuthenticated) {
    return (
      <button className="text-pen-100 flex mx-5 items-center gap-2 text-sm font-medium group">
        <div className="h-5 w-5 rounded-sm bg-pen-500 p-1">
          <User className="h-3 w-3 text-pen-300" />
        </div>
        Fazer login
      </button>
    )
  }

  return (
    <button className="text-pen-50 flex mx-5 items-center gap-2 text-sm font-medium group">
      <img
        className="h-5 w-5 rounded-sm"
        src="https://avatars.githubusercontent.com/u/2254731?v=4"
        alt=""
      />
      Diego Fernandes
      <CaretDown className="w-4 h-4 text-pen-100 group-hover:text-pen-50" />
    </button>
  )
}
