import { produce } from "immer";
import types from "./types";

const INITIAL_STATE = {
  behavior: "create", // create, delete
  components: {
    drawer: false,
    confirmDelete: false,
    view: "week",
  },
  form: {
    filtering: false,
    disabled: true,
    saving: false,
  },
  colaboradores: [],
  servicos: [],
  horarios: [],
  horario: {
    dias: [],
    inicio: "",
    fim: "",
    especialidades: [],
    coalboradores: [],
  },
};

function horario(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case types.UPDATE_HORARIO: {
      return produce(state, (draft) => {
        draft = { ...draft, ...action.payload };
        return draft;
      });
    }
    case types.RESET_HORARIO: {
      return produce(state, (draft) => {
        draft.horario = INITIAL_STATE.horario;
        return draft;
      });
    }
    default: {
      return state;
    }
  }
}

export default horario;
