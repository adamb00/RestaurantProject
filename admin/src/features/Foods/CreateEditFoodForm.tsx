import { FieldValues, useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import UserInput from '../../ui/UserInput';
import { IS_VALID_NUMBER } from '../../utils/helper';
import IError from '../../interfaces/IError';

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

   const isVegetarian = watch('isVegetarian');
   const hasTypeAlready = watch('type');

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
                  update
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
                  options={[
                     'pizza',
                     'soup',
                     'starter',
                     'dessert',
                     'main course',
                     'salad',
                     'one plater',
                     'side',
                     'sauce',
                  ]}
               />
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Vegetarian?
                  </label>
                  <UserInput
                     checked={element && element.isVegetarian}
                     control={control}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
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
                     checked={element && element.needSide}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
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
                        checked={element && element.isAvailable}
                        className={className}
                        formError={error ? true : false}
                        disabled={isLoading}
                        name='isAvailable'
                        type='checkbox'
                     />
                  </div>
               )}
            </div>
            <div className={`${usage}-food__form--group`}>
               <div className='user-input__checkbox'>
                  <label className={className ? `user-input__label--${className}` : 'user-input__label'}>
                     Gluten free?
                  </label>
                  <UserInput
                     control={control}
                     checked={element && element.glutenFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
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
                     checked={element && element.canMakeGlutenFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
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
                     checked={element && element.lactoseFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
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
                     checked={element && element.canMakeLactoseFree}
                     className={className}
                     formError={error ? true : false}
                     disabled={isLoading}
                     name='canMakeLactoseFree'
                     type='checkbox'
                  />
               </div>
            </div>

            <Button onClick={handleSubmit(handleOnClick)}>{update === true ? 'save' : 'submit'}</Button>
         </form>
      </div>
   );
}
