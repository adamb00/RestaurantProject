import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import UserInput from '../../ui/UserInput';
import { IS_VALID_NUMBER } from '../../utils/helper';
import IError from '../../interfaces/IError';
import { useGetFoodTypes } from './useFoods';
import Loader from '../../ui/Loader';
import UploadImage from '../../ui/UploadImage';

interface CreateEditFoodFormProps {
   handleOnClick: (data: FieldValues) => Promise<void>;
   error: IError | undefined;
   update?: boolean;
   isLoading: boolean;
   className?: string;
   element?: FieldValues;
}

export default function CreateEditFoodForm({
   error,
   handleOnClick,
   update = false,
   isLoading,
   className,
   element,
}: CreateEditFoodFormProps) {
   const { handleSubmit, control, watch } = useForm();
   const { isLoading: typesIsLoading, types } = useGetFoodTypes();

   if (typesIsLoading) return <Loader />;

   const isVegetarian = watch('isVegetarian');
   const hasTypeAlready = watch('type') ?? '';

   const usage = update ? 'edit' : 'create';

   return (
      <div className={`${usage}-food`}>
         <form className={`${usage}-food__form`}>
            <div className={`${usage}-food__form--group`}>
               <UserInput
                  initialValue={element && element.name}
                  className={className}
                  placeholder='Name of the food'
                  control={control}
                  formError={error ? true : false}
                  disabled={isLoading}
                  name='name'
                  rules={update ? {} : { required: 'Food name is required' }}
               />
               {hasTypeAlready !== 'pizza' && (
                  <UserInput
                     placeholder='Price of the food'
                     initialValue={element && element.price}
                     className={className}
                     control={control}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='price'
                     rules={
                        update
                           ? {}
                           : {
                                required: 'Food price is required',
                                validate: {
                                   matchPattern: IS_VALID_NUMBER,
                                },
                             }
                     }
                  />
               )}
            </div>
            <UserInput
               placeholder='Description of the food'
               control={control}
               className={className}
               initialValue={element && element.description}
               formError={error ? true : false}
               disabled={isLoading}
               name='description'
               message={true}
               rules={
                  // TODO IF HASTYPEALREADY IS TOPPING, NOT NECESSARY TO ADD DESCRIPTION
                  update || hasTypeAlready.toLowerCase() === 'topping'
                     ? {}
                     : {
                          required: 'Food description is required',
                          minLength: {
                             value: 5,
                             message: 'Description must be more or equal than 5 characters.',
                          },
                       }
               }
            />
            <UploadImage control={control} name='image' />
            <div className={`${usage}-food__form--group`}>
               <Dropdown
                  control={control}
                  formError={error ? true : false}
                  initialValue={element && element.type}
                  name='type'
                  rules={
                     update
                        ? {}
                        : {
                             required: 'Please select a food type',
                          }
                  }
                  options={[...types.types]}
               />
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Vegetarian?
                  </label>
                  <UserInput
                     checked={element?.isVegetarian}
                     control={control}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading || hasTypeAlready.toLowerCase() === 'topping'}
                     name='isVegetarian'
                     type='checkbox'
                  />
               </div>

               {update ? (
                  <Dropdown
                     control={control}
                     formError={error ? true : false}
                     name='meatType'
                     options={['beef', 'poultry', 'pork', 'fish', 'speciality', 'plate', 'pasta']}
                     initialValue={element && element.meatType}
                  />
               ) : (
                  hasTypeAlready &&
                  hasTypeAlready.toLowerCase() !== 'topping' &&
                  !isVegetarian && (
                     <Dropdown
                        control={control}
                        formError={error ? true : false}
                        name='meatType'
                        options={['beef', 'poultry', 'pork', 'fish', 'speciality', 'plate', 'pasta']}
                        initialValue={element && element.meatType}
                     />
                  )
               )}
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Need side?
                  </label>
                  <UserInput
                     control={control}
                     checked={element?.needSide}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading || hasTypeAlready.toLowerCase() === 'topping'}
                     name='needSide'
                     type='checkbox'
                  />
               </div>
               {update === true && (
                  <div className='user-input__checkbox'>
                     <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                        Active?
                     </label>
                     <UserInput
                        control={control}
                        checked={element?.isAvailable}
                        className={className}
                        formError={error ? true : false}
                        disabled={isLoading || hasTypeAlready.toLowerCase() === 'topping'}
                        name='isAvailable'
                        type='checkbox'
                     />
                  </div>
               )}
            </div>
            {hasTypeAlready === 'pizza' && (
               <div className={`${usage}-food__form--group`}>
                  <UserInput
                     placeholder='Price for 28cm'
                     initialValue={element && element.price[0]}
                     className={className}
                     control={control}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='28cmPrice'
                     rules={
                        update
                           ? {}
                           : {
                                validate: {
                                   matchPattern: IS_VALID_NUMBER,
                                },
                             }
                     }
                  />
                  <UserInput
                     placeholder='Price for 32cm'
                     className={className}
                     initialValue={element && element.price[1]}
                     control={control}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='32cmPrice'
                     rules={
                        update
                           ? {}
                           : {
                                validate: {
                                   matchPattern: IS_VALID_NUMBER,
                                },
                             }
                     }
                  />
                  <UserInput
                     placeholder='Price for 52cm'
                     className={className}
                     initialValue={element && element.price[2]}
                     control={control}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='52cmPrice'
                     rules={
                        update
                           ? {}
                           : {
                                required: false,
                                validate: {
                                   matchPattern: IS_VALID_NUMBER,
                                },
                             }
                     }
                  />
               </div>
            )}
            <div className={`${usage}-food__form--group`}>
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Gluten free?
                  </label>
                  <UserInput
                     control={control}
                     checked={element?.glutenFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading || hasTypeAlready.toLowerCase() === 'topping'}
                     name='glutenFree'
                     type='checkbox'
                  />
               </div>
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Can make gluten free?
                  </label>
                  <UserInput
                     control={control}
                     checked={element?.canMakeGlutenFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading || hasTypeAlready.toLowerCase() === 'topping'}
                     name='canMakeGlutenFree'
                     type='checkbox'
                  />
               </div>

               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Lactose free?
                  </label>
                  <UserInput
                     control={control}
                     checked={element?.lactoseFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading || hasTypeAlready.toLowerCase() === 'topping'}
                     name='lactoseFree'
                     type='checkbox'
                  />
               </div>
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Can make lactose free?
                  </label>
                  <UserInput
                     control={control}
                     checked={element?.canMakeLactoseFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading || hasTypeAlready.toLowerCase() === 'topping'}
                     name='canMakeLactoseFree'
                     type='checkbox'
                  />
               </div>
            </div>
            {/* <div className='user-input__sizes'>
               <label className='user-input__label'>Available sizes: </label>
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>28cm</label>
                  <UserInput
                     control={control}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='28cm'
                     type='checkbox'
                  />
               </div>
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>32cm</label>
                  <UserInput
                     control={control}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='32cm'
                     type='checkbox'
                  />
               </div>
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>52cm</label>
                  <UserInput
                     control={control}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='52cm'
                     type='checkbox'
                  />
               </div> */}
            {/* </div> */}

            <Button onClick={handleSubmit(handleOnClick)}>{update === true ? 'save' : 'submit'}</Button>
         </form>
      </div>
   );
}
