import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, Icon, Modal, SelectPicker, TagPicker } from "rsuite";
import Table from "../../components/Table";

import {
  addColaborador,
  allColaboradores,
  allServicos,
  filterColaboradores,
  unlinkColaborador,
  updateColaborador,
} from "../../store/modules/colaborador/actions";

import bancos from '../../data/bancos.json';

const Colaboradores: React.FC = () => {
  const dispatch = useDispatch();
  const { colaboradores, colaborador, behavior, form, components, servicos } =
    useSelector((state: any) => state.colaborador);

  const setComponent = (component: any, state: any) => {
    dispatch(
      updateColaborador({
        components: { ...components, [component]: state },
      })
    );
  };

  const setColaborador = (key: string, value: any) => {
    dispatch(
      updateColaborador({
        colaborador: { ...colaborador, [key]: value },
      })
    );
  };

  const setContaBancaria = (key: string, value: any) => {
    dispatch(
      updateColaborador({
        colaborador: {
          ...colaborador, contaBancaria: {
            ...colaborador.contaBancaria, [key]: value,
          }
        },
      })
    );
  }

  const save = () => {
    dispatch(addColaborador());
  };

  const remove = () => {
    dispatch(unlinkColaborador());
  };

  useEffect(() => {
    dispatch(allColaboradores());
    dispatch(allServicos())
  }, [dispatch]);

  return (
    <div className="col p-5 overflow-auto h-100">

      <Drawer
        show={components.drawer}
        size="sm"
        onHide={() => setComponent("drawer", false)}
      >
        <Drawer.Body>
          <h3>
            {behavior === "create" ? "Criar novo" : "Atualizar"} colaborador
          </h3>
          <div className="row mt-3">
            <div className="form-group col-12 mb-3">
              <b>E-mail</b>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail do colaborador"
                  disabled={behavior === 'update'}
                  value={colaborador.email}
                  onChange={(e) => setColaborador("email", e.target.value)}
                />
                {behavior === 'create' && (
                  <div className="input-group-append">
                    <Button
                      appearance="primary"
                      loading={form.filtering}
                      disabled={form.filtering}
                      onClick={() => dispatch(filterColaboradores())}
                    >
                      Pesquisar
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group col-6 mb-3">
              <b className="">Nome</b>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do cliente"
                disabled={form.disabled}
                value={colaborador.nome}
                onChange={(e) => setColaborador("nome", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Status</b>
              <select
                className="form-control"
                disabled={form.disabled && behavior === 'create'}
                value={colaborador.status}
                onChange={e => setColaborador('vinculo', e.target.value)}
              >
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
            </div>

            <div className="form-group col-6 mb-3">
              <b className="">Telefone / Whatsapp</b>
              <input
                type="text"
                className="form-control"
                placeholder="Telefone / WhatsApp do cliente"
                disabled={form.disabled}
                value={colaborador.telefone}
                onChange={(e) => setColaborador("telefone", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Data de nascimento</b>
              <input
                type="date"
                className="form-control"
                disabled={form.disabled}
                value={colaborador.dataNascimento}
                onChange={(e) =>
                  setColaborador("dataNascimento", e.target.value)
                }
              />
            </div>

            <div className="form-group col-6 mb-3">
              <b>Sexo</b>
              <select
                className="form-control"
                disabled={form.disabled}
                value={colaborador.sexo}
                onChange={(e) => setColaborador("sexo", e.target.value)}
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <b className="">Especialidades</b>
              <TagPicker
                size="lg"
                block
                data={servicos}
                disabled={form.disabled && behavior === 'create'}
                value={colaborador.especialidades}
                onChange={especialidade => setColaborador('especialidades', especialidade)}
              />
            </div>

            <div className="row">

              <div className="form-group col-6 mb-3">
                <b className="">Titular da conta</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome do titular da conta"
                  disabled={form.disabled}
                  value={colaborador.contaBancaria.titular}
                  onChange={(e) => setContaBancaria("titular", e.target.value)}
                />
              </div>
              <div className="form-group col-6 mb-3">
                <b className="">CPF/CNPJ</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CPF/CNPJ do titular"
                  disabled={form.disabled}
                  value={colaborador.contaBancaria.cpfCnpj}
                  onChange={(e) => setContaBancaria("cpfCnpj", e.target.value)}
                />
              </div>

              <div className="form-group col-6 mb-3">
                <b className="">Banco</b>
                <SelectPicker
                  disabled={form.disabled}
                  value={colaborador.contaBancaria.banco}
                  onChange={banco => setContaBancaria('banco', banco)}
                  data={bancos}
                  size="lg"
                  block
                />
              </div>
              <div className="form-group col-6 mb-3">
                <b>Tipo de conta</b>
                <select
                  className="form-control"
                  disabled={form.disabled}
                  value={colaborador.contaBancaria.tipo}
                  onChange={(e) => setContaBancaria("tipo", e.target.value)}
                >
                  <option value="conta_corrente">Conta Corrente</option>
                  <option value="conta_poupanca">Conta Poupança</option>
                </select>
              </div>

              <div className="form-group col-6 mb-3">
                <b className="">Agência</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Agência"
                  disabled={form.disabled}
                  value={colaborador.contaBancaria.agencia}
                  onChange={(e) => setContaBancaria("agencia", e.target.value)}
                />
              </div>

              <div className="form-group col-6 mb-3">
                <b className="">Número da conta</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Número da conta"
                  disabled={form.disabled}
                  value={colaborador.contaBancaria.numero}
                  onChange={(e) => setContaBancaria("numero", e.target.value)}
                />
              </div>

              <div className="form-group col-6 mb-3">
                <b className="">Dígito</b>
                <input
                  type="text"
                  className="form-control"
                  placeholder="DV"
                  disabled={form.disabled}
                  value={colaborador.contaBancaria.dv}
                  onChange={(e) => setContaBancaria("dv", e.target.value)}
                />
              </div>
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
            {behavior === "create" ? "Salvar" : "Atualizar"} Colaborador
          </Button>
          {behavior === 'update' && (
            <Button
              loading={form.saving}
              color="red"
              size="lg"
              block
              className="mt-1"
              onClick={() => setComponent('confirmDelete', true)}
            >
              Remover Colaborador
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
            <h2 className="mb-4 mt-0">Colaboradores</h2>
            <div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  dispatch(
                    updateColaborador({
                      behavior: "create",
                    })
                  );
                  setComponent("drawer", true);
                }}
              >
                <span className="mdi mdi-plus">Novo Colaborador</span>
              </button>
            </div>
          </div>

          <Table
            loading={form.filtering}
            data={colaboradores}
            config={[
              { label: "Nome", key: "nome", width: 200, fixed: true },
              { label: "E-mail", key: "email", width: 200 },
              { label: "Telefone", key: "telefone", width: 200 },
              {
                label: "Sexo",
                content: (colaborador: any) =>
                  colaborador.sexo === "M" ? "Masculino" : "Feminino",
                width: 200,
              },
              {
                label: "Data Cadastro",
                content: (colaborador: any) =>
                  moment(colaborador.dataCadastro).format("DD/MM/YYYY"),
                width: 200,
              },
            ]}
            actions={(colaborador) => (
              <Button color="blue" size="xs">
                Ver informações
              </Button>
            )}
            onRowClick={(colaborador) => {
              dispatch(
                updateColaborador({
                  behavior: "update",
                })
              );
              setComponent("drawer", true);
              dispatch(
                updateColaborador({
                  colaborador,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Colaboradores;
