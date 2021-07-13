import types from './types';


export function filterAgendamentos(start: any, end: any) {
  return {
    type: types.FILTER_AGENDAMENTOS,
    start,
    end,
  }
}

export function updateAgendamentos(agendamentos: any) {
  return {
    type: types.UPDATE_AGENDAMENTO,
    agendamentos
  }
}