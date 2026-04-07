

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.4bvHFpk5.js","_app/immutable/chunks/Dw1W2wAM.js","_app/immutable/chunks/B3j33h_W.js","_app/immutable/chunks/0MgyMWFH.js"];
export const stylesheets = [];
export const fonts = [];
