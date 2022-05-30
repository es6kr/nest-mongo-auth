type Promisable<T> = T | Promise<T>;
type Close = () => Promisable<any>;

declare let buildModule: (
  init: () => Promisable<INestApplicationContext>,
) => void;

declare let register: (init: () => Promisable<Close>) => void;

interface Closable {
  close: Close;
}
