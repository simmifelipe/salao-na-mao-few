import types from './types';

export function allServicos() {
  return {
    type: types.ALL_SERVICOS,
  }
}

export function updateServico(payload: any) {
  return {
    type: types.UPDATE_SERVICO,
    payload
  }
}

export function removeArquivo(key: any) {
  return {
    type: types.REMOVE_ARQUIVO
  }
}

export function addServico() {
  return { type: types.ADD_SERVICO }
}

export function resetServico() {
  return { type: types.RESET_SERVICO }
}


export function removeServico() {
  return { type: types.REMOVE_SERVICO }
}