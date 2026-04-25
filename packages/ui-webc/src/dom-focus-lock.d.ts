declare module "dom-focus-lock" {
  const focusLock: {
    on(domNode: HTMLElement): void;
    off(domNode: HTMLElement): void;
  };
  export default focusLock;
}
