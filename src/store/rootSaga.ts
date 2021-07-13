import { all } from 'redux-saga/effects';

import agendamento from './modules/agendamento/sagas';
import clientes from './modules/cliente/sagas';
import colaborador from './modules/colaborador/sagas';

export default function* rootSaga(): any {
  return yield all([agendamento, clientes, colaborador]);
}