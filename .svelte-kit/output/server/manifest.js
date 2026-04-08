export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["icon-192.png","icon-512.png","icon.svg","manifest.json","service-worker.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json"},
	_: {
		client: {start:"_app/immutable/entry/start.B7XEWv7x.js",app:"_app/immutable/entry/app.BO0gG_6t.js",imports:["_app/immutable/entry/start.B7XEWv7x.js","_app/immutable/chunks/53mD3_RY.js","_app/immutable/chunks/BGcKV237.js","_app/immutable/chunks/BeHxzXmM.js","_app/immutable/entry/app.BO0gG_6t.js","_app/immutable/chunks/BGcKV237.js","_app/immutable/chunks/CMoivRG3.js","_app/immutable/chunks/D0cZumXh.js","_app/immutable/chunks/BeHxzXmM.js","_app/immutable/chunks/DgSRCOy6.js","_app/immutable/chunks/Co0ebYAj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
