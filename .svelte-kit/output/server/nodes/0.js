

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Db1VDTgw.js","_app/immutable/chunks/D0cZumXh.js","_app/immutable/chunks/BGcKV237.js","_app/immutable/chunks/Co0ebYAj.js"];
export const stylesheets = [];
export const fonts = [];
