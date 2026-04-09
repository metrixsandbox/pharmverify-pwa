export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["edit-mode.png","home.png","hp.png","icon-192.png","icon-512.png","icon.svg","landing.png","manifest.json","verify.png","service-worker.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.D2KI5RPA.js",app:"_app/immutable/entry/app.Op7QqImR.js",imports:["_app/immutable/entry/start.D2KI5RPA.js","_app/immutable/chunks/C8Ss9TtZ.js","_app/immutable/chunks/BGcKV237.js","_app/immutable/chunks/BeHxzXmM.js","_app/immutable/entry/app.Op7QqImR.js","_app/immutable/chunks/BGcKV237.js","_app/immutable/chunks/CMoivRG3.js","_app/immutable/chunks/D0cZumXh.js","_app/immutable/chunks/BeHxzXmM.js","_app/immutable/chunks/DgSRCOy6.js","_app/immutable/chunks/Co0ebYAj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
