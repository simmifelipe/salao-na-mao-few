import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { filterAgendamentos } from '../../store/modules/agendamento/actions';
import { hourToMinuts } from '../../utils'

const localizer = momentLocalizer(moment);

const Agendamentos: React.FC = () => {

  const dispatch = useDispatch();
  const { agendamentos } = useSelector((state: any) => state.agendamento);

  const formatEventos = agendamentos.map((agendamento: any) => ({
    title: `${agendamento.servicoId.titulo} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`,
    start: moment(agendamento.data).toDate(),
    end: moment(agendamento.data).add(hourToMinuts(moment(agendamento.servicoId.duracao).format('HH:mm')), 'minutes').toDate(),
  }));

  const formatRange = (periodo: any): any => {
    let finalRange = {};
    if (Array.isArray(periodo)) {
      finalRange = {
        start: moment(periodo[0]).format('YYYY-MM-DD'),
        end: moment(periodo[periodo.length - 1]).format('YYYY-MM-DD'),
      }
    } else {
      finalRange = {
        start: moment(periodo.start).format('YYYY-MM-DD'),
        end: moment(periodo.end).format('YYYY-MM-DD'),
      }
    }

    return finalRange;
  }

  useEffect(() => {
    dispatch(
      filterAgendamentos(
        moment().weekday(0).format('YYYY-MM-DD'),
        moment().weekday(6).format('YYYY-MM-DD'),
      )
    )
  }, [dispatch])

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 mt-0">
            Agendamentos
          </h2>

          <Calendar
            localizer={localizer}
            events={formatEventos}
            onRangeChange={(periodo) => {
              const { start, end } = formatRange(periodo)
              dispatch(filterAgendamentos(start, end))
            }}
            defaultView="week"
            style={{ height: 600 }}
            selectable
            popup
          />
        </div>
      </div>
    </div>
  )
}

export default Agendamentos;