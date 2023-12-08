// import { useEffect } from 'react';
// import * as FileSystem from 'expo-file-system';

// const useRemoveExpiredImages = ad => {
//    useEffect(() => {
//       const expirationDate = new Date(ad.expirationDate);
//       const currentDate = new Date();

//       if (expirationDate < currentDate) {
//          const imagePath = `../../../../${ad.image}`;

//          console.log('ip', imagePath);

//          FileSystem.getInfoAsync(imagePath)
//             .then(({ exists }) => {
//                if (exists) {
//                   FileSystem.deleteAsync(imagePath)
//                      .then(() => {
//                         console.log('Image deleted successfully:', ad.image);
//                      })
//                      .catch(error => {
//                         console.error('Error deleting image:', error);
//                      });
//                } else {
//                   console.log('Image does not exist:', ad.image);
//                }
//             })
//             .catch(error => {
//                console.error('Error checking image existence:', error);
//             });
//       }
//    }, [ad]);

//    return null;
// };

// export default useRemoveExpiredImages;
