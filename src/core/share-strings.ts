export const sharePost = (share: any) => {
  const str = `Hi, This ${share.type} is generated using Octoria Post maker application.`;
  return str;
};
export const enquiryPost = (share: any) => {
  const str = `Hello, I have an enquiry for Octoria Product ${share.name} ${
    share.size ? ' with' : share.finishing ? ' with' : ''
  } ${share.size ? share.size + ' Size' : ''} ${
    share.finishing
      ? share.size
        ? ' and ' + share.finishing + ' Finishing'
        : share.finishing + ' Finishing'
      : ''
  } from Octoria mobile application. https://octoriahardware.com/products/post/${
    share.id
  }`;
  return str;
};
