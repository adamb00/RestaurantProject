import { MouseEventHandler, PropsWithChildren } from 'react';

interface ButtonProps {
   onClick: MouseEventHandler;
   disabled?: boolean;
   className?: string;
}

export default function Button({ children, onClick, disabled, className }: PropsWithChildren<ButtonProps>) {
   return (
      <button onClick={onClick} disabled={disabled} className={`${className ? className : 'btn'}`}>
         {children}
      </button>
   );
}
