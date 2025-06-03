import { createFileRoute } from '@tanstack/react-router'

import Logo from '../assets/logo.svg'
import MainImage from '../assets/main-image.webp'
import { LocaleForm } from '../components/locale-form'

export const Route = createFileRoute('/')({
  component: HomeRoute,
  head: () => ({
    meta: [{ title: 'Find a friend' }],
  }),
})

function HomeRoute() {
  return (
    <div className="bg-red-primary grid h-full min-h-dvh place-items-center py-5 text-white">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-7">
        <div>
          <img src={Logo} alt="Find a friend" width={215} height={56} />
        </div>

        <div className="mt-11 flex w-full flex-1 flex-wrap items-end justify-between gap-11 lg:gap-0">
          <h1 className="mx-auto max-w-[487px] text-center text-5xl font-extrabold lg:mx-0 lg:text-start lg:text-7xl">
            Leve a felicidade para o seu lar
          </h1>
          <img
            src={MainImage}
            className="mx-auto w-full max-w-[592px] lg:mx-0"
          />
        </div>

        <div className="mt-11 flex flex-col items-center justify-between gap-5 text-center lg:mt-28 lg:flex-row">
          <p className="mx-auto max-w-[487px] text-2xl font-medium lg:mx-0 lg:text-start">
            Encontre o animal de estimação ideal para seu estilo de vida!
          </p>

          <div className="mx-auto flex w-full max-w-[592px] justify-center text-start lg:mx-0 lg:justify-end">
            <div className="w-full space-y-2 space-x-8">
              <LocaleForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
