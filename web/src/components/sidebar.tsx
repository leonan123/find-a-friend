import SearchIcon from '../assets/icons/search.svg'
import { SIDEBAR_WIDTH } from '../constants'

export function Sidebar() {
  return (
    <div
      style={{
        width: `${SIDEBAR_WIDTH}px`,
      }}
      className="bg-red-primary fixed inset-0 w-full"
    >
      <div className="bg-red-dark flex h-full max-h-[241px] flex-col justify-end px-10 pt-4 pb-6 text-white">
        <img
          src="/logo-icon.svg"
          alt="Find a friend"
          className="max-w-[45px]"
        />

        <form>
          <select className="h-16 w-1/3 min-w-[72px] rounded-2xl border px-3.5">
            <option value="">UF</option>
          </select>

          <select className="h-16 w-1/3 min-w-[72px] rounded-2xl border px-3.5">
            <option value="">UF</option>
          </select>

          <button>
            <img src={SearchIcon} alt="Buscar" />
          </button>
        </form>
      </div>
    </div>
  )
}
