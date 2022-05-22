type Promisable<T> = T | Promise<T>;
type Close = () => Promisable<any>;

declare var register: (init: () => Promisable<Close>) => void;
