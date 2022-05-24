type Promisable<T> = T | Promise<T>;
type Close = () => Promisable<any>;

declare var buildModule: (
  init: () => Promisable<INestApplicationContext>,
) => void;

declare var register: (init: () => Promisable<Close>) => void;

interface Closable {
  close: Close;
}
