class HotModule {
  file;
  cb;

  constructor(file) {
    this.file = file;
  }

  onFileChange(cb) {
    this.cb = cb;
  }

  fileChanged() {
    if (!this.cb) return;

    import(`${this.file}?t=${Date.now()}`).then((newMod) => this.cb(newMod));
  }
}

window.hotModules ??= {};

export function hmrClient(mod) {
  console.log("hmr client", mod);

  const url = new URL(mod.url);

  const hot = new HotModule(url.pathname);
  window.hotModules[url.pathname] = hot;

  import.meta.hot = hot;
}
