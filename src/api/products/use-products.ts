// import type { AxiosError } from 'axios';
// import { createQuery } from 'react-query-kit';

// import type { Product } from '@/types';

// import { client } from '../common';

// type Response = Product[];
// type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

// export const useProducts = createQuery<Response, Variables, AxiosError>({
//   primaryKey: 'octoria/api/products/get-products.php', // we recommend using  endpoint base url as primaryKey
//   queryFn: async ({ queryKey: [primaryKey] }) => {
//     // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
//     // primaryKey is 'posts' in this case
//     const response = await client.get(`${primaryKey}`);
//     return response.data.posts;
//   },
//   cacheTime: 1000 * 60 * 60 * 24, // 24 hours
//   staleTime: 1000 * 60 * 60 * 24, // 24 hours
// });
