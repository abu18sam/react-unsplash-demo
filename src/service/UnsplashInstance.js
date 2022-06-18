import { createApi } from 'unsplash-js';

const UnsplashInstance = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_CLIENT_ID,
  //...other fetch options
});

export default UnsplashInstance;