export const useGetFoodImage = image => {
   const images = image ? require.context('../../../../assets', true) : require('../../../../assets/bandula_png.png');

   const photo = image ? images(`./${image}`) : images;

   return photo;
};
