import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, Icon, Modal } from "rsuite";
import Table from "../../components/Table";

import {
  addColaborador,
  allColaboradores,
  filterColaboradores,
  unlinkColaborador,
  updateColaborador,
} from "../../store/modules/colaborador/actions";

const Colaboradores: React.FC = () => {
  const dispatch = useDispatch();
  const { colaboradores, colaborador, behavior, form, components } =
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

  const save = () => {
    dispatch(addColaborador());
  };

  const remove = () => {
    dispatch(unlinkColaborador());
  };

  useEffect(() => {
    dispatch(allColaboradores());
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
              </div>
            </div>

            <div className="form-group col-6 mb-3">
              <b className="">Nome</b>
              <input
                type="text"
                className="form-control"
                placeholder="Nomde do cliente"
                disabled={form.disabled}
                value={colaborador.nome}
                onChange={(e) => setColaborador("nome", e.target.value)}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <b className="">Telefone</b>
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
          </div>
          <Button
            block
            className="btn-lg mt-3"
            color={behavior === "create" ? "green" : "red"}
            size="lg"
            loading={form.saving}
            onClick={() => {
              if (behavior === "create") {
                save();
              } else {
                setComponent("confirmDelete", true);
              }
            }}
          >
            {behavior === "create" ? "Salvar" : "Remover"} Cliente
          </Button>
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
            <h2 className="mb-4 mt-0">Clientes</h2>
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
                <span className="mdi mdi-plus">Novo Cliente</span>
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
                content: (cliente: any) =>
                  cliente.sexo === "M" ? "Masculino" : "Feminino",
                width: 200,
              },
              {
                label: "Data Cadastro",
                content: (cliente: any) =>
                  moment(cliente.dataCadastro).format("DD/MM/YYYY"),
                width: 200,
              },
            ]}
            actions={(cliente) => (
              <Button color="blue" size="xs">
                Ver informações
              </Button>
            )}
            onRowClick={(cliente) => {
              dispatch(
                updateColaborador({
                  behavior: "update",
                })
              );
              setComponent("drawer", true);
              dispatch(
                updateColaborador({
                  cliente,
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
