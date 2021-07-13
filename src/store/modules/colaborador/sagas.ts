import { all, call, put, takeLatest, select } from "redux-saga/effects";

import types from "./types";
import api from "../../../services/api";
import {
  updateColaborador,
  allColaboradores as allColaboradoresAction,
  resetColaborador,
} from "./actions";

import consts from "../../../consts";

export function* allColaboradores() {
  const { form } = yield select((state) => state.colaborador);

  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(
      api.get,
      `/colaborador/salao/${consts.salaoId}`
    );

    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(updateColaborador({ colaboradores: res.colaboradores }));
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export function* filterColaboradores() {
  const { form, colaborador } = yield select((state) => state.colaborador);

  try {
    yield put(updateColaborador({ form: { ...form, filtering: true } }));
    const { data: res } = yield call(api.post, `/colaborador/filter`, {
      filters: {
        email: colaborador.email,
        status: "A",
      },
    });

    yield put(
      updateColaborador({ form: { ...form, filtering: false, disabled: true } })
    );
    if (res.error) {
      alert(res.message);
      return false;
    }

    if (res.colaboradores.length > 0) {
      yield put(
        updateColaborador({
          colaborador: res.colaboradores[0],
          form: { ...form, filtering: false },
        })
      );
    } else {
      yield put(updateColaborador({ form: { ...form, disabled: false } }));
    }

    yield put(updateColaborador({ colaboradores: res.colaboradores }));
  } catch (err) {
    yield put(updateColaborador({ form: { ...form, filtering: false } }));
    alert(err.message);
  }
}

export function* addColaborador() {
  const { form, colaborador, components } = yield select(
    (state) => state.colaborador
  );

  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));
    const { data: res } = yield call(api.post, `/colaborador`, {
      salaoId: consts.salaoId,
      colaborador,
    });

    yield put(updateColaborador({ form: { ...form, saving: false } }));
    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allColaboradoresAction());
    yield put(
      updateColaborador({ components: { ...components, drawer: false } })
    );
    yield put(resetColaborador());
  } catch (err) {
    updateColaborador({ form: { ...form, saving: false } });
    alert(err.message);
  }
}

export function* unlinkColaborador() {
  const { form, colaborador, components } = yield select(
    (state) => state.colaborador
  );

  try {
    yield put(updateColaborador({ form: { ...form, saving: true } }));
    const { data: res } = yield call(
      api.delete,
      `/colaborador/vinculo/${colaborador.vinculoId}`
    );

    yield put(
      updateColaborador({
        form: { ...form, saving: false },
        components: { ...components, confirmDelete: false },
      })
    );
    if (res.error) {
      alert(res.message);
      return false;
    }

    yield put(allColaboradoresAction());
    yield put(
      updateColaborador({
        components: { ...components, drawer: false, confirmDelete: false },
      })
    );
    yield put(resetColaborador());
  } catch (err) {
    updateColaborador({ form: { ...form, saving: false } });
    alert(err.message);
  }
}

export function* allServicos() {
  const { form } = yield select((state) => state.colaborador);

  try {
    updateColaborador({ form: { ...form, filtering: true } });
    const { data: res } = yield call(
      api.get,
      `/salao/servicos/${consts.salaoId}`
    );

    yield put(updateColaborador({ form: { ...form, filtering: false } }));

    if (res.error) {
      alert(res.message);
      return false;
    }

    updateColaborador({ servicos: [res.servicos] });
  } catch (err) {
    updateColaborador({ form: { ...form, filtering: false } });
    alert(err.message);
  }
}

export default all([
  takeLatest(types.ALL_COLABORADORES, allColaboradores),
  takeLatest(types.FILTER_COLABORADORES, filterColaboradores),
  takeLatest(types.ADD_COLABORADOR, addColaborador),
  takeLatest(types.UNLINK_COLABORADOR, unlinkColaborador),
  takeLatest(types.ALL_SERVICOS, allServicos),
]);