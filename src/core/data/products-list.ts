import firestore from '@react-native-firebase/firestore';

import { F_PRODUCT_LIST, type Product } from '@/types';

import { logger } from '../logger';
export const addProducts = async () => {
  const batch = firestore().batch();
  for (let i = 0; i < products.length; i++) {
    const ref = firestore().collection(F_PRODUCT_LIST).doc();
    batch.set(ref, products[i]);
    logger.log(`Added document ${i}`);
  }
  batch.commit();
  logger.log(`All Products Added Successfully.`);
};

export const products: Product[] = [
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-32.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-32.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-32.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1025 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-4.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-4.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-4.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1026 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-14.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-14.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-14.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '105 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-2.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-2.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-2.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1011 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-10.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-10.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-10.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '101 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-22.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-22.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-22.webp',
      'https://ibaisindia.co.in/chats/videos/4.mp4',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1014 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-24.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-24.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-24.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1016 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-6.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-6.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-6.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1028 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-30.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-30.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-30.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1023 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-11.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-11.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-11.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '102 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-25.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-25.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-25.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1017 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-7.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-7.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-7.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1029 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-13.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-13.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-13.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '104 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-21.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-21.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-21.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1013 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-28.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-28.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-28.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1020 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-3.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-3.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-3.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1022 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-17.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-17.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-17.webp',
      'https://ibaisindia.co.in/intro.mp4',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '108 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-9.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-9.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-9.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1031 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-27.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-27.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-27.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1019 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-19.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-19.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-19.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '1010 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
  {
    catalogue:
      'https://ibaisindia.co.in/octoria/Octoria%20%28Without%20Price%29_compressed.pdf',
    category: 'Hardware',
    description: 'this is demo product not for production',
    featured: 2,
    finishing: ['Polished'],
    image3d:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-16.webp',
    thumbnail:
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-16.webp',
    images: [
      'https://ibaisindia.co.in/octoria/dashboard/uploads/Untitled-16.webp',
    ],
    material: 'Stainless Steel',
    model: 'https://ibaisindia.co.in/octoria/xrservice/?model=handle.glb',
    name: '107 XYLO',
    price: '100',
    quantity: ['1'],
    sizes: ['4'],
    subCategory: 'Tower Bolt',
    type: 'Tower Bolt',
  },
];
