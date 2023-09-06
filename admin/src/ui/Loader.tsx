import PuffLoader from 'react-spinners/PuffLoader';

export default function Loader() {
   return (
      <div className='loader'>
         <PuffLoader color={'#36d7b7'} loading={true} size={250} aria-label='Loading Spinner' data-testid='loader' />
      </div>
   );
}
