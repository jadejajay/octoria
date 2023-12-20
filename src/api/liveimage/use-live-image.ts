// import { useEffect, useState } from 'react';

// import { client } from '../common';

// export function useLiveImage() {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const primaryKey = 'octoria/api/liveimage/liveimage.php';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await client.get(`${primaryKey}`);
//         logger.log(response.data, 'response.data');

//         setData(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         logger.log(error, 'erro');
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []); // Empty dependency array ensures this runs once on mount

//   return { data, isLoading };
// }
