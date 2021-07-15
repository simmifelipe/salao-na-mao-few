import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Drawer, Icon, Modal, SelectPicker, Tag, TagPicker, Uploader } from "rsuite";
import Table from "../../components/Table";

import {
  addServico,
  allServicos,
  removeArquivo,
  updateServico,
} from "../../store/modules/servico/actions";
import consts from "../../consts";

const Servicos: React.FC = () => {
  const dispatch = useDispatch();
  const { servicos, servico, behavior, form, components } =
    useSelector((state: any) => state.servico);

  const setComponent = (component: any, state: any) => {
    dispatch(
      updateServico({
        components: { ...components, [component]: state },
      })
    );
  };

  const setServico = (key: string, value: any) => {
    dispatch(
      updateServico({
        servico: { ...servico, [key]: value },
      })
    );
  };

  const save = () => {
    dispatch(addServico());
  };

  const remove = () => {

  };

  useEffect(() => {
    dispatch(allServicos());
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
            {behavior === "create" ? "Criar novo" : "Atualizar"} servico
          </h3>
          <div className="row mt-3">
            <div className="form-group col-6 mb-3">
              <b className="">Título</b>
              <input
                type="text"
                className="form-control"
                placeholder="Título do servico"
                value={servico.titulo}
                onChange={(e) => setServico("titulo", e.target.value)}
              />
            </div>
            <div className="form-group col-3 mb-3">
              <b className="">R$ Preço</b>
              <input
                type="number"
                className="form-control"
                placeholder="Preço do servico"
                value={servico.preco}
                onChange={(e) => setServico("preco", e.target.value)}
              />
            </div>

            <div className="form-group col-3 mb-3">
              <b className="">Recorr. (dias)</b>
              <input
                type="number"
                className="form-control"
                placeholder="Recorrência do servico"
                value={servico.recorrencia}
                onChange={(e) => setServico("recorrencia", e.target.value)}
              />
            </div>
            <div className="form-group col-4 mb-3">
              <b className="">% Comissão</b>
              <input
                type="number"
                className="form-control"
                placeholder="Comissão do servico"
                value={servico.comissao}
                onChange={(e) => setServico("comissao", e.target.value)}
              />
            </div>

            <div className="form-group col-4 mb-3">
              <b className="">Duração</b>
              <DatePicker
                block
                format="HH:mm"
                value={servico.duracao}
                hideMinutes={min => ![0, 30].includes(min)}
                onChange={e => {
                  setServico('duracao', e);
                }}
              />
            </div>
            <div className="form-group col-4 mb-3">
              <b className="">Status</b>
              <select
                className="form-control"
                value={servico.status}
                onChange={e => setServico('status', e.target.value)}
              >
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
            </div>

            <div className="form-group col-12 mb-3">
              <b className="">Descrição</b>
              <textarea
                rows={5}
                className="form-control"
                placeholder="Descrição do serviço..."
                value={servico.descricao}
                onChange={e => setServico('descricao', e.target.value)}
              ></textarea>
            </div>

            <div className="form-group col-12">
              <b className="d-block">Imagens do serviço</b>
              <Uploader
                multiple
                autoUpload={false}
                listType="picture"
                defaultFileList={servico.arquivos.map((servico: any, index: any) => ({
                  name: servico?.caminho,
                  fileKey: index,
                  url: `${consts.bucketUrl}/${servico.caminho}`
                }))}
                onChange={files => {
                  const arquivos = files.filter(f => f.blobFile).map(f => f.blobFile);

                  setServico('arquivos', arquivos);
                }}
                onRemove={file => {
                  if (behavior === 'update' && file.url) {
                    dispatch(removeArquivo(file.name))
                  }
                }}
              >
                <button>
                  <Icon icon="camera-retro" size="lg" />
                </button>
              </Uploader>
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
            {behavior === "create" ? "Salvar" : "Atualizar"} Servico
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
              Remover Servico
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
            <h2 className="mb-4 mt-0">Serviços</h2>
            <div>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  dispatch(
                    updateServico({
                      behavior: "create",
                    })
                  );
                  setComponent("drawer", true);
                }}
              >
                <span className="mdi mdi-plus">Novo Serviço</span>
              </button>
            </div>
          </div>

          <Table
            loading={form.filtering}
            data={servicos}
            config={[
              {
                label: 'Titulo',
                key: 'titulo',
                sortable: true,
                fixed: true,
                width: 200,
              },
              {
                label: 'Preço',
                key: 'preco',
                content: (servico: any) => `R$ ${servico.preco.toFixed(2)}`,
              },
              {
                label: 'Comissão',
                key: 'comissao',
                content: (servico: any) => `R$ ${servico.comissao}%`,
              },
              {
                label: 'Recorrência (dias)',
                key: 'recorrencia',
                content: (servico: any) => `R$ ${servico.recorrencia}%`,
              },
              {
                label: 'Duração',
                key: 'duracao',
                content: (servico: any) => moment(servico.duracao).format('HH:mm'),
              },
              {
                label: 'Status',
                key: 'status',
                content: (servico: any) => (
                  <Tag color={servico.status === 'A' ? 'green' : 'red'}>
                    {servico.status === 'A' ? 'Ativo' : 'Inativo'}
                  </Tag>
                ),
              },
            ]}
            actions={(servico) => (
              <Button color="blue" size="xs">
                Ver informações
              </Button>
            )}
            onRowClick={(servico) => {
              dispatch(
                updateServico({
                  behavior: "update",
                })
              );
              setComponent("drawer", true);
              dispatch(
                updateServico({
                  servico,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Servicos;
