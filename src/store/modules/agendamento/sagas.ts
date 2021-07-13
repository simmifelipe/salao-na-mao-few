import { all, takeLatest, call, put } from 'redux-saga/effects';
import consts from '../../../consts';

import api from '../../../services/api';
import { updateAgendamentos } from './actions';
import types from './types';

export function* filterAgendamento({ start, end }: any): any {
  try {

    const { data: res } = yield call(api.post, '/agendamento/filter', {
      salaoId: consts.salaoId,
      periodo: {
        inicio: start,
        final: end,
      },
    });

    if (res.error) {
      alert(res.message)
      return false;
    }

    yield put(updateAgendamentos(res.agendamentos));

  } catch (err) {
    alert(err.message);
  }
}


export default all([
  takeLatest(types.FILTER_AGENDAMENTOS, filterAgendamento)
])