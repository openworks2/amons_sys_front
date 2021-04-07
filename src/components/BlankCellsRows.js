import React from "react";
import { Table } from "semantic-ui-react";

const BlankCellsRows = ({ cellCount, rowCount }) => {
  // 빈 TABLE ROW 생성

  let blankCells = [];
  let blankRows = [];

  for (cellCount; cellCount > 0; cellCount--) {
    blankCells.push(
      <Table.Cell
        selectable={false}
        active={false}
        key={cellCount}
      ></Table.Cell>
    );
  }

  for (rowCount; rowCount > 0; rowCount--) {
    blankRows.push(
      <Table.Row className="table-row blank" key={rowCount}>
        {[...blankCells]}
      </Table.Row>
    );
  }
  return [...blankRows];
};

export default BlankCellsRows;
