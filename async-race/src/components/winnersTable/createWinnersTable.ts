import { renderElement, sortTableCell } from '../../utils/utils';
import { createWinnerField } from '../winner/winner';
import updateWinnersTable from './updateWinnersTable';

export const createWinnersTable = () =>
  `
  <table class="table">
    <thead class="table-head">
      <tr class="table-head-tr">
        <th id="№" class="th">№</th>
        <th id="id" class="th">id</th>
        <th id="Car" class="th">Car</th>
        <th id="Name" class="th">Name</th>
        <th id="wins" class="th">Wins</th>
        <th id="time" class="th">Best time(sec)</th>
      </tr>
    </thead>
    <tbody class="table-body">
      ${createWinnerField()}
    </tbody>
  </table>
`;

export const listenWinnersTable = () => {
  const tableHead = renderElement('.table-head-tr');
  tableHead.addEventListener('click', async (event) => {
    const tableCell = event.target as HTMLTableCellElement;
    const tableCellId = tableCell.getAttribute('id')!;
    sortTableCell(tableCell, tableCellId);
    await updateWinnersTable();
  });
};
