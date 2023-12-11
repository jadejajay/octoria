// import type { AxiosError } from 'axios';
// import { createQuery } from 'react-query-kit';

// import type { Product } from '@/types';

// import { client } from '../common';

// type Variables = { id: number };
// type Response = Product;

// export const useProduct = createQuery<Response, Variables, AxiosError>({
//   primaryKey: 'octoria/api/products/get-product.php',
//   queryFn: async ({ queryKey: [primaryKey, variables] }) => {
//     const response = await client.post(
//       `${primaryKey}`,
//       JSON.stringify({ id: variables.id })
//     );
//     return response.data;
//   },
//   cacheTime: 1000 * 60 * 60 * 24, // 24 hours
//   staleTime: 1000 * 60 * 60 * 24, // 24 hours
// });
