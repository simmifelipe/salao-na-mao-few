import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  addHorario,
  allHorarios,
  allServicos,
  filterColaboradores,
  removeHorario,
  updateHorario,
} from "../../store/modules/horario/actions";
import { Button, DatePicker, Drawer, Icon, Modal, TagPicker } from "rsuite";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const Horarios: React.FC = () => {
  const dispatch = useDispatch();
  const {
    horarios,
    horario,
    behavior,
    form,
    components,
    servicos,
    colaboradores,
  } = useSelector((state: any) => state.horario);

  const setComponent = (component: any, state: any) => {
    dispatch(
      updateHorario({
        components: { ...components, [component]: state },
      })
    );
  };

  const setHorario = (key: string, value: any) => {
    dispatch(
      updateHorario({
        horario: { ...horario, [key]: value },
      })
    );
  };

  const save = () => {
    dispatch(addHorario());
  };

  const remove = () => {
    dispatch(removeHorario());
  };

  useEffect(() => {
    dispatch(allHorarios());
    dispatch(allServicos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterColaboradores());
  }, [dispatch, horario.especialidades]);

  const diasSemanaData = [
    new Date(2021, 3, 11, 0, 0, 0, 0),
    new Date(2021, 3, 12, 0, 0, 0, 0),
    new Date(2021, 3, 13, 0, 0, 0, 0),
    new Date(2021, 3, 14, 0, 0, 0, 0),
    new Date(2021, 3, 15, 0, 0, 0, 0),
    new Date(2021, 3, 16, 0, 0, 0, 0),
    new Date(2021, 3, 17, 0, 0, 0, 0),
  ];

  const diasDaSemana = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const formatEvents = horarios
    .map((horario: any, index: number) =>
      horario.dias.map((dia: any) => ({
        resource: horario,
        title: `${horario.especialidades.length} espec. e ${horario.colaboradores.length} colab.`,
        start: new Date(
          diasSemanaData[dia].setHours(
            parseInt(moment(horario.inicio).format("HH")),
            parseInt(moment(horario.inicio).format("mm"))
          )
        ),
        end: new Date(
          diasSemanaData[dia].setHours(
            parseInt(moment(horario.fim).format("HH")),
            parseInt(moment(horario.fim).format("mm"))
          )
        ),
      }))
    )
    .flat();

  return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer
        show={components.drawer}
        size="sm"
        onHide={() => setComponent("drawer", false)}
      >
        <Drawer.Body>
          <h3>
            {behavior === "create" ? "Criar novo" : "Atualizar"} horário de
            atendimento
          </h3>

          <div className="row mt-3">
            <div className="col-12">
              <b>Dias da semana</b>
              <TagPicker
                size="lg"
                block
                value={horario.dias}
                data={diasDaSemana.map((label, value) => ({ label, value }))}
                onChange={(value) => setHorario("dias", value)}
              />
            </div>

            <div className="col-6 mt-3">
              <b className="d-block">Horário Inicial</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.inicio}
                onChange={(e) => setHorario("inicio", e)}
              />
            </div>
            <div className="col-6 mt-3">
              <b className="d-block">Horário Final</b>
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                value={horario.fim}
                onChange={(e) => setHorario("fim", e)}
              />
            </div>

            <div className="col-12 mt-3">
              <b>Especialidades disponíveis</b>
              <TagPicker
                size="lg"
                block
                data={servicos}
                value={horario.especialidades}
                onChange={(e) => setHorario("especialidades", e)}
              />
            </div>

            <div className="col-12 mt-3">
              <b>Colaboradores disponíveis</b>
              <TagPicker
                size="lg"
                block
                data={colaboradores}
                value={horario.colaboradores}
                onChange={(e) => setHorario("colaboradores", e)}
              />
            </div>
          </div>

          <Button
            loading={form.saving}
            color={behavior === "create" ? "green" : "blue"}
            size="lg"
            block
            className="mt-3"
            onClick={() => save()}
          >
            {behavior === "create" ? "Salvar" : "Atualizar"} horário
          </Button>
          {behavior === "update" && (
            <Button
              loading={form.saving}
              color="red"
              size="lg"
              block
              className="mt-1"
              onClick={() => setComponent("confirmDelete", true)}
            >
              Remover horário
            </Button>
          )}
        </Drawer.Body>
      </Drawer>

      <Modal
        show={components.confirmDelete}
        onHide={() => setComponent("confirmDelete", false)}
        size="xs"
      >
        <Modal.Body>
          <Icon
            icon="remind"
            style={{
              color: "#ffb300",
              fontSize: 24,
            }}
          />
          {"  "} Tem certeza que deseja excluir? Essa ação será irreversível!
        </Modal.Body>
        <Modal.Footer>
          <Button loading={form.saving} onClick={() => remove()} color="red">
            Sim, tenho certeza!
          </Button>
          <Button
            onClick={() => setComponent("confirmDelete", false)}
            appearance="subtle"
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        <div className="col-12">
          <div className="w-100 d-flex justify-content-between">
            <h2 className="mb-4 mt-0">Horários</h2>
            <div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  dispatch(
                    updateHorario({
                      behavior: "create",
                    })
                  );
                  setComponent("drawer", true);
                }}
              >
                <span className="mdi mdi-plus">Novo Horário</span>
              </button>
            </div>
          </div>

          <Calendar
            onSelectEvent={(e) => {
              dispatch(
                updateHorario({
                  behavior: "update",
                })
              );
              setComponent("drawer", true);
              dispatch(
                updateHorario({
                  horario: e.resource,
                })
              );
            }}
            onSelectSlot={(slotInfo) => {
              const { start, end } = slotInfo;
              dispatch(
                updateHorario({
                  behavior: "create",
                  horario: {
                    ...horario,
                    dias: [moment(start).day()],
                    inicio: start,
                    fim: end,
                  },
                })
              );
              setComponent("drawer", true);
            }}
            localizer={localizer}
            toolbar={false}
            formats={{
              dateFormat: "dd",
              dayFormat: (date: any, culture: any, localizer: any) =>
                localizer?.format(date, "dddd", culture),
            }}
            popup
            selectable
            events={formatEvents}
            view="week"
            style={{ height: 600 }}
            date={diasSemanaData[moment().day()]}
          />
        </div>
      </div>
    </div>
  );
};

export default Horarios;
