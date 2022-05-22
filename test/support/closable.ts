register = function (init: () => Promisable<Close>) {
  let close: Close;
  beforeAll(async () => {
    close = await init();
  });
  afterAll(async () => await close());
};
