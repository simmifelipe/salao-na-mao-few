import { combineReducers } from 'redux'

import agendamento from './modules/agendamento/reducer';
import cliente from './modules/cliente/reducer';
import colaborador from './modules/colaborador/reducer';

export default combineReducers({
  agendamento,
  cliente,
  colaborador
})