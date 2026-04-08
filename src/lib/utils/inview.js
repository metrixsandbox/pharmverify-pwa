// Svelte action: adds `is-inview` class once the element first enters the viewport.
// Usage: <div use:inview> or <div use:inview={{ threshold: 0.2, once: true }}>
export function inview(node, opts = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = opts;
  node.classList.add('reveal');
  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('is-inview');
    return {};
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        node.classList.add('is-inview');
        if (once) io.unobserve(node);
      } else if (!once) {
        node.classList.remove('is-inview');
      }
    }
  }, { threshold, rootMargin });
  io.observe(node);
  return {
    destroy() { io.disconnect(); }
  };
}
