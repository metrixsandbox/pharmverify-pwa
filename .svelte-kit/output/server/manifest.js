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
		client: {start:"_app/immutable/entry/start.BhHjo8_K.js",app:"_app/immutable/entry/app.CynBnsns.js",imports:["_app/immutable/entry/start.BhHjo8_K.js","_app/immutable/chunks/BUdVBflY.js","_app/immutable/chunks/B3j33h_W.js","_app/immutable/chunks/DeSkOD6_.js","_app/immutable/entry/app.CynBnsns.js","_app/immutable/chunks/B3j33h_W.js","_app/immutable/chunks/CZhRGZ2u.js","_app/immutable/chunks/Dw1W2wAM.js","_app/immutable/chunks/DeSkOD6_.js","_app/immutable/chunks/DRuqBm41.js","_app/immutable/chunks/0MgyMWFH.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
