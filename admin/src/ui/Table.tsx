import { PropsWithChildren, createContext } from 'react';

export const TableContext = createContext('');

interface TableRowProps {
   status?: string;
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
const Row = ({ children, status }: PropsWithChildren<TableRowProps>) => {
   return (
      <tr
         className={
            status === 'active'
               ? 'table__row table__row--active'
               : status === 'declined'
               ? 'table__row table__row--declined'
               : 'table__row'
         }
      >
         {children}
      </tr>
   );
};
const Body = ({ children }: PropsWithChildren) => {
   return <tbody className='table__body'>{children}</tbody>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
