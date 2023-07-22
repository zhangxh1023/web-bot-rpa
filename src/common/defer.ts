export type deferType<T> = {
  promise: Promise<T>,
  resolve: (value: T) => void,
  reject: (reason?: T) => void,
};

export const defer = <T>() => {
  const defer: deferType<T> = {} as deferType<T>;
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};
