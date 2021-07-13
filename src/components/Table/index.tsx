import React from 'react';
import { Table, TableProps } from 'rsuite'

const { Column, Cell, HeaderCell } = Table;

type Props = TableProps & {
  data: any;
  config: any;
  loading: boolean;
  actions(item: any): void;
  onRowClick(item: any): void;
}

const TableComponent: React.FC<Props> = ({ data, config, loading, actions, onRowClick }) => {
  return (
    <Table
      height={400}
      data={data}
      onRowClick={onRowClick}
      loading={loading}
    >
      {config.map((c: any) => (
        <Column flexGrow={!c.width ? 1 : 0} width={c.width} fixed={c.fixed}>
          <HeaderCell>{c.label}</HeaderCell>
          {!c.content ? (<Cell dataKey={c.key} />) : (<Cell>{(item: any) => c.content(item)}</Cell>)}
        </Column>
      ))}
      <Column width={150} fixed="right">
        <HeaderCell>Ações</HeaderCell>
        <Cell>
          {(item: any) => actions(item)}
        </Cell>
      </Column>
    </Table>
  )
}

export default TableComponent;