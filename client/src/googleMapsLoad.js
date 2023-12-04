function loadScript(url, callback) {
  const existingScript = document.querySelector(`script[src="${url}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', callback);
    document.body.appendChild(script);
  } else if (existingScript && callback) {
    callback();
  }
}
export default loadScript;