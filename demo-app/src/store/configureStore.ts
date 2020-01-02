import configureStoreDev from './configureStore.dev';

const configure =
    process.env.NODE_ENV === 'production' ? null : configureStoreDev;

export default configure;
