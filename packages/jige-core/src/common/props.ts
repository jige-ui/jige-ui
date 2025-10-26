import type { JSX } from "solid-js/jsx-runtime";

type Context = {
  useContext: () => [
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
  ];
};
type ContextChild<
  T extends [
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
  ],
> = (state: T[0], actions: T[1], staticData: T[2]) => JSX.Element;
export type MaybeContextChild<T extends ReturnType<Context["useContext"]>> =
  | ContextChild<T>
  | JSX.Element;
export type PropsWithContextChild<
  T extends ReturnType<Context["useContext"]>,
  U,
> = Omit<U, "children"> & {
  children: MaybeContextChild<T>;
};
export function callMaybeContextChild<
  T extends ReturnType<Context["useContext"]>,
>(context: T, children: MaybeContextChild<T>) {
  return typeof children === "function"
    ? children(
        ...(context as [
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
        ])
      )
    : children;
}

export type MaybeCallableChild<T extends any[] = []> =
  | JSX.Element
  | ((...args: T) => JSX.Element);
export function callMaybeCallableChild(
  children: MaybeCallableChild<any[]>,
  ...args: any
) {
  return typeof children === "function" ? children(...args) : children;
}

export function emptyFn<T, U = undefined>(
  returnVal?: U
): (a: T) => U | undefined {
  return () => returnVal;
}
export function undefinedOr<T, U>(val: T | undefined, fallback: U) {
  return val === undefined ? fallback : val;
}
