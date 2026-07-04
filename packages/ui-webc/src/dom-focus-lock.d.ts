declare module "dom-focus-lock" {
  const focusLock: {
    on(domNode: HTMLElement | HTMLElement[]): void;
    off(domNode: HTMLElement | HTMLElement[]): void;
  };
  export default focusLock;
}
