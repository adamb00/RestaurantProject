import { PropsWithChildren, createContext } from 'react';

export const TableContext = createContext('');

interface TableRowProps {
   active?: boolean;
}

const Table = ({ children }: PropsWithChildren) => {
   return (
      <TableContext.Provider value={''}>
         <table className='table'>{children}</table>
      </TableContext.Provider>
   );
};
const Header = ({ children }: PropsWithChildren) => {
   return <thead className='table__header'>{children}</thead>;
};
const Row = ({ children, active = false }: PropsWithChildren<TableRowProps>) => {
   return <tr className={active ? 'table__row table__row--active' : 'table__row'}>{children}</tr>;
};
const Body = ({ children }: PropsWithChildren) => {
   return <tbody className='table__body'>{children}</tbody>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
