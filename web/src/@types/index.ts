export interface State {
  id: number
  sigla: string
  nome: string
  regiao: Regiao
}

export interface Regiao {
  id: number
  sigla: string
  nome: string
}

export type City = {
  id: number
  nome: string
  microrregiao: {
    id: number
    nome: string
    mesorregiao: {
      id: number
      nome: string
      UF: {
        id: number
        sigla: string
        nome: string
        regiao: {
          id: number
          sigla: string
          nome: string
        }
      }
    }
  }
  'regiao-imediata': {
    id: number
    nome: string
    'regiao-intermediaria': {
      id: number
      nome: string
      UF: {
        id: number
        sigla: string
        nome: string
        regiao: {
          id: number
          sigla: string
          nome: string
        }
      }
    }
  }
}
