buildModule = function (build: () => Promisable<Closable>) {
  let app: Closable;
  beforeAll(async () => {
    app = await build();
  });
  afterAll(async () => await app.close());
};

register = function (init: () => Promisable<Close>) {
  let close: Close;
  beforeAll(async () => {
    close = await init();
  });
  afterAll(async () => await close());
};
