import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
   return <h1 className='heading-primary heading-primary--main'>{children}</h1>;
}
