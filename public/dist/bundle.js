var Qc=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Gd=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){let o=n[t++],c=n[t++],u=n[t++],d=((s&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{let o=n[t++],c=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|c&63)}}return e.join("")},Yc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let o=n[s],c=s+1<n.length,u=c?n[s+1]:0,d=s+2<n.length,f=d?n[s+2]:0,b=o>>2,T=(o&3)<<4|u>>4,A=(u&15)<<2|f>>6,C=f&63;d||(C=64,c||(A=64)),r.push(t[b],t[T],t[A],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Qc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Gd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let o=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;let f=s<n.length?t[n.charAt(s)]:64;++s;let T=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||u==null||f==null||T==null)throw new Gi;let A=o<<2|u>>4;if(r.push(A),f!==64){let C=u<<4&240|f>>2;if(r.push(C),T!==64){let x=f<<6&192|T;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Gi=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Hd=function(n){let e=Qc(n);return Yc.encodeByteArray(e,!0)},yn=function(n){return Hd(n).replace(/\./g,"")},Ki=function(n){try{return Yc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Kd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Wd=()=>Kd().__FIREBASE_DEFAULTS__,Qd=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Yd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Ki(n[1]);return e&&JSON.parse(e)},mr=()=>{try{return Wd()||Qd()||Yd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Wi=n=>{var e,t;return(t=(e=mr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Jc=n=>{let e=Wi(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Qi=()=>{var n;return(n=mr())===null||n===void 0?void 0:n.config},Yi=n=>{var e;return(e=mr())===null||e===void 0?void 0:e[`_${n}`]};var pr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Xc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let c=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[yn(JSON.stringify(t)),yn(JSON.stringify(c)),""].join(".")}function te(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(te())}function Jd(){var n;let e=(n=mr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function el(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function tl(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function nl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rl(){let n=te();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function il(){return!Jd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ji(){try{return typeof indexedDB=="object"}catch{return!1}}function sl(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}var Xd="FirebaseError",_e=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Xd,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ue.prototype.create)}},Ue=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],c=o?Zd(o,r):"Error",u=`${this.serviceName}: ${c} (${s}).`;return new _e(s,u,r)}};function Zd(n,e){return n.replace(eh,(t,r)=>{let s=e[r];return s!=null?String(s):`<${r}?>`})}var eh=/\{\$([^}]+)}/g;function ol(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function lt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let o=n[s],c=e[s];if(Wc(o)&&Wc(c)){if(!lt(o,c))return!1}else if(o!==c)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function Wc(n){return n!==null&&typeof n=="object"}function Pt(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ct(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[s,o]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(o)}}),e}function xt(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function al(n,e){let t=new Hi(n,e);return t.subscribe.bind(t)}var Hi=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");th(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=$i),s.error===void 0&&(s.error=$i),s.complete===void 0&&(s.complete=$i);let o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function th(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function $i(){}var tg=4*60*60*1e3;function qe(n){return n&&n._delegate?n._delegate:n}var be=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var ut="[DEFAULT]";var Xi=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new pr;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(rh(e))try{this.getOrInitializeService({instanceIdentifier:ut})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=ut){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ut){return this.instances.has(e)}getOptions(e=ut){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[o,c]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(o);r===u&&c.resolve(s)}return s}onInit(e,t){var r;let s=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);let c=this.instances.get(s);return c&&e(c,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:nh(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ut){return this.component?this.component.multipleInstances?e:ut:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function nh(n){return n===ut?void 0:n}function rh(n){return n.instantiationMode==="EAGER"}var gr=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Xi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var ih=[],O;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(O||(O={}));var sh={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},oh=O.INFO,ah={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},ch=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=ah[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Ye=class{constructor(e){this.name=e,this._logLevel=oh,this._logHandler=ch,this._userLogHandler=null,ih.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?sh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}};var lh=(n,e)=>e.some(t=>n instanceof t),cl,ll;function uh(){return cl||(cl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function dh(){return ll||(ll=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var ul=new WeakMap,es=new WeakMap,dl=new WeakMap,Zi=new WeakMap,ns=new WeakMap;function hh(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",c)},o=()=>{t(Re(n.result)),s()},c=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",c)});return e.then(t=>{t instanceof IDBCursor&&ul.set(t,n)}).catch(()=>{}),ns.set(e,n),e}function fh(n){if(es.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",c),n.removeEventListener("abort",c)},o=()=>{t(),s()},c=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",c),n.addEventListener("abort",c)});es.set(n,e)}var ts={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return es.get(n);if(e==="objectStoreNames")return n.objectStoreNames||dl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Re(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function hl(n){ts=n(ts)}function ph(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(yr(this),e,...t);return dl.set(r,e.sort?e.sort():[e]),Re(r)}:dh().includes(n)?function(...e){return n.apply(yr(this),e),Re(ul.get(this))}:function(...e){return Re(n.apply(yr(this),e))}}function mh(n){return typeof n=="function"?ph(n):(n instanceof IDBTransaction&&fh(n),lh(n,uh())?new Proxy(n,ts):n)}function Re(n){if(n instanceof IDBRequest)return hh(n);if(Zi.has(n))return Zi.get(n);let e=mh(n);return e!==n&&(Zi.set(n,e),ns.set(e,n)),e}var yr=n=>ns.get(n);function pl(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){let c=indexedDB.open(n,e),u=Re(c);return r&&c.addEventListener("upgradeneeded",d=>{r(Re(c.result),d.oldVersion,d.newVersion,Re(c.transaction),d)}),t&&c.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),u.then(d=>{o&&d.addEventListener("close",()=>o()),s&&d.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}var gh=["get","getKey","getAll","getAllKeys","count"],yh=["put","add","delete","clear"],rs=new Map;function fl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(rs.get(e))return rs.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=yh.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||gh.includes(t)))return;let o=async function(c,...u){let d=this.transaction(c,s?"readwrite":"readonly"),f=d.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),s&&d.done]))[0]};return rs.set(e,o),o}hl(n=>({...n,get:(e,t,r)=>fl(e,t)||n.get(e,t,r),has:(e,t)=>!!fl(e,t)||n.has(e,t)}));var ss=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(vh(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function vh(n){let e=n.getComponent();return e?.type==="VERSION"}var os="@firebase/app",ml="0.10.12";var Be=new Ye("@firebase/app"),_h="@firebase/app-compat",wh="@firebase/analytics-compat",bh="@firebase/analytics",Ih="@firebase/app-check-compat",Eh="@firebase/app-check",Th="@firebase/auth",Ah="@firebase/auth-compat",Sh="@firebase/database",kh="@firebase/data-connect",Rh="@firebase/database-compat",Ph="@firebase/functions",Ch="@firebase/functions-compat",xh="@firebase/installations",Dh="@firebase/installations-compat",Nh="@firebase/messaging",Oh="@firebase/messaging-compat",Lh="@firebase/performance",Vh="@firebase/performance-compat",Mh="@firebase/remote-config",Fh="@firebase/remote-config-compat",Uh="@firebase/storage",qh="@firebase/storage-compat",Bh="@firebase/firestore",zh="@firebase/vertexai-preview",jh="@firebase/firestore-compat",$h="firebase",Gh="10.14.0";var as="[DEFAULT]",Hh={[os]:"fire-core",[_h]:"fire-core-compat",[bh]:"fire-analytics",[wh]:"fire-analytics-compat",[Eh]:"fire-app-check",[Ih]:"fire-app-check-compat",[Th]:"fire-auth",[Ah]:"fire-auth-compat",[Sh]:"fire-rtdb",[kh]:"fire-data-connect",[Rh]:"fire-rtdb-compat",[Ph]:"fire-fn",[Ch]:"fire-fn-compat",[xh]:"fire-iid",[Dh]:"fire-iid-compat",[Nh]:"fire-fcm",[Oh]:"fire-fcm-compat",[Lh]:"fire-perf",[Vh]:"fire-perf-compat",[Mh]:"fire-rc",[Fh]:"fire-rc-compat",[Uh]:"fire-gcs",[qh]:"fire-gcs-compat",[Bh]:"fire-fst",[jh]:"fire-fst-compat",[zh]:"fire-vertex","fire-js":"fire-js",[$h]:"fire-js-all"};var vr=new Map,Kh=new Map,cs=new Map;function gl(n,e){try{n.container.addComponent(e)}catch(t){Be.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xe(n){let e=n.name;if(cs.has(e))return Be.debug(`There were multiple attempts to register component ${e}.`),!1;cs.set(e,n);for(let t of vr.values())gl(t,n);for(let t of Kh.values())gl(t,n);return!0}function _n(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ze(n){return n.settings!==void 0}var Wh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Je=new Ue("app","Firebase",Wh);var ls=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new be("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Je.create("app-deleted",{appName:this._name})}};var Ze=Gh;function hs(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:as,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Je.create("bad-app-name",{appName:String(s)});if(t||(t=Qi()),!t)throw Je.create("no-options");let o=vr.get(s);if(o){if(lt(t,o.options)&&lt(r,o.config))return o;throw Je.create("duplicate-app",{appName:s})}let c=new gr(s);for(let d of cs.values())c.addComponent(d);let u=new ls(t,r,c);return vr.set(s,u),u}function _r(n=as){let e=vr.get(n);if(!e&&n===as&&Qi())return hs();if(!e)throw Je.create("no-app",{appName:n});return e}function Te(n,e,t){var r;let s=(r=Hh[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);let o=s.match(/\s|\//),c=e.match(/\s|\//);if(o||c){let u=[`Unable to register library "${s}" with version "${e}":`];o&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&c&&u.push("and"),c&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Be.warn(u.join(" "));return}Xe(new be(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var Qh="firebase-heartbeat-database",Yh=1,vn="firebase-heartbeat-store",is=null;function wl(){return is||(is=pl(Qh,Yh,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(vn)}catch(t){console.warn(t)}}}}).catch(n=>{throw Je.create("idb-open",{originalErrorMessage:n.message})})),is}async function Jh(n){try{let t=(await wl()).transaction(vn),r=await t.objectStore(vn).get(bl(n));return await t.done,r}catch(e){if(e instanceof _e)Be.warn(e.message);else{let t=Je.create("idb-get",{originalErrorMessage:e?.message});Be.warn(t.message)}}}async function yl(n,e){try{let r=(await wl()).transaction(vn,"readwrite");await r.objectStore(vn).put(e,bl(n)),await r.done}catch(t){if(t instanceof _e)Be.warn(t.message);else{let r=Je.create("idb-set",{originalErrorMessage:t?.message});Be.warn(r.message)}}}function bl(n){return`${n.name}!${n.options.appId}`}var Xh=1024,Zh=30*24*60*60*1e3,us=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new ds(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=vl();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(c=>{let u=new Date(c.date).valueOf();return Date.now()-u<=Zh}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Be.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=vl(),{heartbeatsToSend:r,unsentEntries:s}=ef(this._heartbeatsCache.heartbeats),o=yn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Be.warn(t),""}}};function vl(){return new Date().toISOString().substring(0,10)}function ef(n,e=Xh){let t=[],r=n.slice();for(let s of n){let o=t.find(c=>c.agent===s.agent);if(o){if(o.dates.push(s.date),_l(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),_l(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var ds=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ji()?sl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Jh(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let s=await this.read();return yl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let s=await this.read();return yl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}};function _l(n){return yn(JSON.stringify({version:2,heartbeats:n})).length}function tf(n){Xe(new be("platform-logger",e=>new ss(e),"PRIVATE")),Xe(new be("heartbeat",e=>new us(e),"PRIVATE")),Te(os,ml,n),Te(os,ml,"esm2017"),Te("fire-js","")}tf("");var nf="firebase",rf="10.14.0";Te(nf,rf,"app");function wr(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Ul(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var ql=Ul,Bl=new Ue("auth","Firebase",Ul());var Sr=new Ye("@firebase/auth");function sf(n,...e){Sr.logLevel<=O.WARN&&Sr.warn(`Auth (${Ze}): ${n}`,...e)}function Ir(n,...e){Sr.logLevel<=O.ERROR&&Sr.error(`Auth (${Ze}): ${n}`,...e)}function Ae(n,...e){throw Ns(n,...e)}function Ce(n,...e){return Ns(n,...e)}function zl(n,e,t){let r=Object.assign(Object.assign({},ql()),{[e]:t});return new Ue("auth","Firebase",r).create(e,{appName:n.name})}function dt(n){return zl(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ns(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Bl.create(n,...e)}function R(n,e,...t){if(!n)throw Ns(e,...t)}function Pe(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Ir(e),new Error(e)}function $e(n,e){n||Pe(e)}function ms(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function of(){return Il()==="http:"||Il()==="https:"}function Il(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function af(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(of()||tl()||"connection"in navigator)?navigator.onLine:!0}function cf(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var ht=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,$e(t>e,"Short delay should be less than long delay!"),this.isMobile=Zc()||nl()}get(){return af()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Os(n,e){$e(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var kr=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var lf={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var uf=new ht(3e4,6e4);function ne(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ue(n,e,t,r,s={}){return jl(n,s,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});let u=Pt(Object.assign({key:n.config.apiKey},c)).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);let f=Object.assign({method:e,headers:d},o);return el()||(f.referrerPolicy="no-referrer"),kr.fetch()($l(n,n.config.apiHost,t,u),f)})}async function jl(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},lf),e);try{let s=new gs(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let c=await o.json();if("needConfirmation"in c)throw wn(n,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{let u=o.ok?c.errorMessage:c.error.message,[d,f]=u.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw wn(n,"credential-already-in-use",c);if(d==="EMAIL_EXISTS")throw wn(n,"email-already-in-use",c);if(d==="USER_DISABLED")throw wn(n,"user-disabled",c);let b=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw zl(n,b,f);Ae(n,b)}}catch(s){if(s instanceof _e)throw s;Ae(n,"network-request-failed",{message:String(s)})}}async function yt(n,e,t,r,s={}){let o=await ue(n,e,t,r,s);return"mfaPendingCredential"in o&&Ae(n,"multi-factor-auth-required",{_serverResponse:o}),o}function $l(n,e,t,r){let s=`${e}${t}?${r}`;return n.config.emulator?Os(n.config,s):`${n.config.apiScheme}://${s}`}function df(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var gs=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ce(this.auth,"network-request-failed")),uf.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function wn(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let s=Ce(n,e,r);return s.customData._tokenResponse=t,s}function El(n){return n!==void 0&&n.enterprise!==void 0}var ys=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return df(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function hf(n,e){return ue(n,"GET","/v2/recaptchaConfig",ne(n,e))}async function ff(n,e){return ue(n,"POST","/v1/accounts:delete",e)}async function Gl(n,e){return ue(n,"POST","/v1/accounts:lookup",e)}function bn(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Hl(n,e=!1){let t=qe(n),r=await t.getIdToken(e),s=Ls(r);R(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let o=typeof s.firebase=="object"?s.firebase:void 0,c=o?.sign_in_provider;return{claims:s,token:r,authTime:bn(fs(s.auth_time)),issuedAtTime:bn(fs(s.iat)),expirationTime:bn(fs(s.exp)),signInProvider:c||null,signInSecondFactor:o?.sign_in_second_factor||null}}function fs(n){return Number(n)*1e3}function Ls(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ir("JWT malformed, contained fewer than 3 sections"),null;try{let s=Ki(t);return s?JSON.parse(s):(Ir("Failed to decode base64 JWT payload"),null)}catch(s){return Ir("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Tl(n){let e=Ls(n);return R(e,"internal-error"),R(typeof e.exp<"u","internal-error"),R(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function En(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof _e&&pf(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function pf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var vs=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Tn=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=bn(this.lastLoginAt),this.creationTime=bn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Rr(n){var e;let t=n.auth,r=await n.getIdToken(),s=await En(n,Gl(t,{idToken:r}));R(s?.users.length,t,"internal-error");let o=s.users[0];n._notifyReloadListener(o);let c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Wl(o.providerUserInfo):[],u=mf(n.providerData,c),d=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!u?.length,b=d?f:!1,T={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new Tn(o.createdAt,o.lastLoginAt),isAnonymous:b};Object.assign(n,T)}async function Kl(n){let e=qe(n);await Rr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function mf(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Wl(n){return n.map(e=>{var{providerId:t}=e,r=wr(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function gf(n,e){let t=await jl(n,{},async()=>{let r=Pt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,c=$l(n,s,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",kr.fetch()(c,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function yf(n,e){return ue(n,"POST","/v2/accounts:revokeToken",ne(n,e))}var In=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){R(e.idToken,"internal-error"),R(typeof e.idToken<"u","internal-error"),R(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Tl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){R(e.length!==0,"internal-error");let t=Tl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(R(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:s,expiresIn:o}=await gf(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:s,expirationTime:o}=t,c=new n;return r&&(R(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),s&&(R(typeof s=="string","internal-error",{appName:e}),c.accessToken=s),o&&(R(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Pe("not implemented")}};function et(n,e){R(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Nt=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,o=wr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vs(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Tn(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){let t=await En(this,this.stsTokenManager.getToken(this.auth,e));return R(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Hl(this,e)}reload(){return Kl(this)}_assign(e){this!==e&&(R(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){R(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Rr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ze(this.auth.app))return Promise.reject(dt(this.auth));let e=await this.getIdToken();return await En(this,ff(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,o,c,u,d,f,b;let T=(r=t.displayName)!==null&&r!==void 0?r:void 0,A=(s=t.email)!==null&&s!==void 0?s:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,x=(c=t.photoURL)!==null&&c!==void 0?c:void 0,U=(u=t.tenantId)!==null&&u!==void 0?u:void 0,D=(d=t._redirectEventId)!==null&&d!==void 0?d:void 0,Z=(f=t.createdAt)!==null&&f!==void 0?f:void 0,K=(b=t.lastLoginAt)!==null&&b!==void 0?b:void 0,{uid:H,emailVerified:X,isAnonymous:ke,providerData:ee,stsTokenManager:_}=t;R(H&&_,e,"internal-error");let p=In.fromJSON(this.name,_);R(typeof H=="string",e,"internal-error"),et(T,e.name),et(A,e.name),R(typeof X=="boolean",e,"internal-error"),R(typeof ke=="boolean",e,"internal-error"),et(C,e.name),et(x,e.name),et(U,e.name),et(D,e.name),et(Z,e.name),et(K,e.name);let g=new n({uid:H,auth:e,email:A,emailVerified:X,displayName:T,isAnonymous:ke,photoURL:x,phoneNumber:C,tenantId:U,stsTokenManager:p,createdAt:Z,lastLoginAt:K});return ee&&Array.isArray(ee)&&(g.providerData=ee.map(y=>Object.assign({},y))),D&&(g._redirectEventId=D),g}static async _fromIdTokenResponse(e,t,r=!1){let s=new In;s.updateFromServerResponse(t);let o=new n({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Rr(o),o}static async _fromGetAccountInfoResponse(e,t,r){let s=t.users[0];R(s.localId!==void 0,"internal-error");let o=s.providerUserInfo!==void 0?Wl(s.providerUserInfo):[],c=!(s.email&&s.passwordHash)&&!o?.length,u=new In;u.updateFromIdToken(r);let d=new n({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:c}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Tn(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!o?.length};return Object.assign(d,f),d}};var Al=new Map;function je(n){$e(n instanceof Function,"Expected a class definition");let e=Al.get(n);return e?($e(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Al.set(n,e),e)}var Pr=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Pr.type="NONE";var _s=Pr;function Er(n,e,t){return`firebase:${n}:${e}:${t}`}var Cr=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:s,name:o}=this.auth;this.fullUserKey=Er(this.userKey,s.apiKey,o),this.fullPersistenceKey=Er("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Nt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(je(_s),e,r);let s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f),o=s[0]||je(_s),c=Er(r,e.config.apiKey,e.name),u=null;for(let f of t)try{let b=await f._get(c);if(b){let T=Nt._fromJSON(e,b);f!==o&&(u=T),o=f;break}}catch{}let d=s.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!d.length?new n(o,e,r):(o=d[0],u&&await o._set(c,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(c)}catch{}})),new n(o,e,r))}};function Sl(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Xl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ql(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(eu(e))return"Blackberry";if(tu(e))return"Webos";if(Yl(e))return"Safari";if((e.includes("chrome/")||Jl(e))&&!e.includes("edge/"))return"Chrome";if(Zl(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Ql(n=te()){return/firefox\//i.test(n)}function Yl(n=te()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Jl(n=te()){return/crios\//i.test(n)}function Xl(n=te()){return/iemobile/i.test(n)}function Zl(n=te()){return/android/i.test(n)}function eu(n=te()){return/blackberry/i.test(n)}function tu(n=te()){return/webos/i.test(n)}function Vs(n=te()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function vf(n=te()){var e;return Vs(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function _f(){return rl()&&document.documentMode===10}function nu(n=te()){return Vs(n)||Zl(n)||tu(n)||eu(n)||/windows phone/i.test(n)||Xl(n)}function ru(n,e=[]){let t;switch(n){case"Browser":t=Sl(te());break;case"Worker":t=`${Sl(te())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ze}/${r}`}var ws=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=o=>new Promise((c,u)=>{try{let d=e(o);c(d)}catch(d){u(d)}});r.onAbort=t,this.queue.push(r);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function wf(n,e={}){return ue(n,"GET","/v2/passwordPolicy",ne(n,e))}var bf=6,bs=class{constructor(e){var t,r,s,o;let c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=c.minPasswordLength)!==null&&t!==void 0?t:bf,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,o,c,u;let d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(t=d.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(s=d.containsLowercaseLetter)!==null&&s!==void 0?s:!0),d.isValid&&(d.isValid=(o=d.containsUppercaseLetter)!==null&&o!==void 0?o:!0),d.isValid&&(d.isValid=(c=d.containsNumericCharacter)!==null&&c!==void 0?c:!0),d.isValid&&(d.isValid=(u=d.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),d}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}};var Is=class{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xr(this),this.idTokenSubscription=new xr(this),this.beforeStateQueue=new ws(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Bl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=je(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Cr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Gl(this,{idToken:e}),r=await Nt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ze(this.app)){let c=this.app.settings.authIdToken;return c?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(u,u))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let c=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=s?._redirectEventId,d=await this.tryRedirectSignIn(e);(!c||c===u)&&d?.user&&(s=d.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(c){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return R(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Rr(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cf()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ze(this.app))return Promise.reject(dt(this));let t=e?qe(e):null;return t&&R(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&R(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ze(this.app)?Promise.reject(dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ze(this.app)?Promise.reject(dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(je(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await wf(this),t=new bs(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ue("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await yf(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&je(e)||this._popupRedirectResolver;R(t,this,"argument-error"),this.redirectPersistenceManager=await Cr.create(this,[je(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};let o=typeof t=="function"?t:t.next.bind(t),c=!1,u=this._isInitialized?Promise.resolve():this._initializationPromise;if(R(u,this,"internal-error"),u.then(()=>{c||o(this.currentUser)}),typeof t=="function"){let d=e.addObserver(t,r,s);return()=>{c=!0,d()}}else{let d=e.addObserver(t);return()=>{c=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return R(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ru(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&sf(`Error while retrieving App Check token: ${t.error}`),t?.token}};function On(n){return qe(n)}var xr=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=al(t=>this.observer=t)}get next(){return R(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Wr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function If(n){Wr=n}function iu(n){return Wr.loadJS(n)}function Ef(){return Wr.recaptchaEnterpriseScript}function Tf(){return Wr.gapiScript}function su(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Af="recaptcha-enterprise",Sf="NO_RECAPTCHA",Es=class{constructor(e){this.type=Af,this.auth=On(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(c,u)=>{hf(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{let f=new ys(d);return o.tenantId==null?o._agentRecaptchaConfig=f:o._tenantRecaptchaConfigs[o.tenantId]=f,c(f.siteKey)}}).catch(d=>{u(d)})})}function s(o,c,u){let d=window.grecaptcha;El(d)?d.enterprise.ready(()=>{d.enterprise.execute(o,{action:e}).then(f=>{c(f)}).catch(()=>{c(Sf)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,c)=>{r(this.auth).then(u=>{if(!t&&El(window.grecaptcha))s(u,o,c);else{if(typeof window>"u"){c(new Error("RecaptchaVerifier is only supported in browser"));return}let d=Ef();d.length!==0&&(d+=u),iu(d).then(()=>{s(u,o,c)}).catch(f=>{c(f)})}}).catch(u=>{c(u)})})}};async function kl(n,e,t,r=!1){let s=new Es(n),o;try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}let c=Object.assign({},e);return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Rl(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let o=await kl(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let c=await kl(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}function ou(n,e){let t=_n(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),o=t.getOptions();if(lt(o,e??{}))return s;Ae(s,"already-initialized")}return t.initialize({options:e})}function kf(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(je);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function au(n,e,t){let r=On(n);R(r._canInitEmulator,r,"emulator-config-failed"),R(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let s=!!t?.disableWarnings,o=cu(e),{host:c,port:u}=Rf(e),d=u===null?"":`:${u}`;r.config.emulator={url:`${o}//${c}${d}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:c,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||Pf()}function cu(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Rf(n){let e=cu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){let o=s[1];return{host:o,port:Pl(r.substr(o.length+1))}}else{let[o,c]=r.split(":");return{host:o,port:Pl(c)}}}function Pl(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Pf(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var ft=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Pe("not implemented")}_getIdTokenResponse(e){return Pe("not implemented")}_linkToIdToken(e,t){return Pe("not implemented")}_getReauthenticationResolver(e){return Pe("not implemented")}};async function Cf(n,e){return ue(n,"POST","/v1/accounts:signUp",e)}async function xf(n,e){return yt(n,"POST","/v1/accounts:signInWithPassword",ne(n,e))}async function Df(n,e){return yt(n,"POST","/v1/accounts:signInWithEmailLink",ne(n,e))}async function Nf(n,e){return yt(n,"POST","/v1/accounts:signInWithEmailLink",ne(n,e))}var An=class n extends ft{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Rl(e,t,"signInWithPassword",xf);case"emailLink":return Df(e,{email:this._email,oobCode:this._password});default:Ae(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Rl(e,r,"signUpPassword",Cf);case"emailLink":return Nf(e,{idToken:t,email:this._email,oobCode:this._password});default:Ae(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Dt(n,e){return yt(n,"POST","/v1/accounts:signInWithIdp",ne(n,e))}var Of="http://localhost",pt=class n extends ft{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ae("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,o=wr(t,["providerId","signInMethod"]);if(!r||!s)return null;let c=new n(r,s);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){let t=this.buildRequest();return Dt(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Dt(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Dt(e,t)}buildRequest(){let e={requestUri:Of,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Pt(t)}return e}};async function Lf(n,e){return ue(n,"POST","/v1/accounts:sendVerificationCode",ne(n,e))}async function Vf(n,e){return yt(n,"POST","/v1/accounts:signInWithPhoneNumber",ne(n,e))}async function Mf(n,e){let t=await yt(n,"POST","/v1/accounts:signInWithPhoneNumber",ne(n,e));if(t.temporaryProof)throw wn(n,"account-exists-with-different-credential",t);return t}var Ff={USER_NOT_FOUND:"user-not-found"};async function Uf(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return yt(n,"POST","/v1/accounts:signInWithPhoneNumber",ne(n,t),Ff)}var Sn=class n extends ft{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Vf(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Mf(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Uf(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:o}=e;return!r&&!t&&!s&&!o?null:new n({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:o})}};function qf(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Bf(n){let e=Ct(xt(n)).link,t=e?Ct(xt(e)).deep_link_id:null,r=Ct(xt(n)).deep_link_id;return(r?Ct(xt(r)).link:null)||r||t||e||n}var Dr=class n{constructor(e){var t,r,s,o,c,u;let d=Ct(xt(e)),f=(t=d.apiKey)!==null&&t!==void 0?t:null,b=(r=d.oobCode)!==null&&r!==void 0?r:null,T=qf((s=d.mode)!==null&&s!==void 0?s:null);R(f&&b&&T,"argument-error"),this.apiKey=f,this.operation=T,this.code=b,this.continueUrl=(o=d.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(c=d.languageCode)!==null&&c!==void 0?c:null,this.tenantId=(u=d.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){let t=Bf(e);try{return new n(t)}catch{return null}}};var Ot=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return An._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Dr.parseLink(t);return R(r,"argument-error"),An._fromEmailAndCode(e,r.code,r.tenantId)}};Ot.PROVIDER_ID="password";Ot.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ot.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Nr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var mt=class extends Nr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var kn=class n extends mt{constructor(){super("facebook.com")}static credential(e){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};kn.FACEBOOK_SIGN_IN_METHOD="facebook.com";kn.PROVIDER_ID="facebook.com";var Rn=class n extends mt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Rn.GOOGLE_SIGN_IN_METHOD="google.com";Rn.PROVIDER_ID="google.com";var Pn=class n extends mt{constructor(){super("github.com")}static credential(e){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Pn.GITHUB_SIGN_IN_METHOD="github.com";Pn.PROVIDER_ID="github.com";var Cn=class n extends mt{constructor(){super("twitter.com")}static credential(e,t){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Cn.TWITTER_SIGN_IN_METHOD="twitter.com";Cn.PROVIDER_ID="twitter.com";var xn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){let o=await Nt._fromIdTokenResponse(e,r,s),c=Cl(r);return new n({user:o,providerId:c,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let s=Cl(r);return new n({user:e,providerId:s,_tokenResponse:r,operationType:t})}};function Cl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Ts=class n extends _e{constructor(e,t,r,s){var o;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new n(e,t,r,s)}};function lu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Ts._fromErrorAndOperation(n,o,e,r):o})}async function zf(n,e,t=!1){let r=await En(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return xn._forOperation(n,"link",r)}async function jf(n,e,t=!1){let{auth:r}=n;if(ze(r.app))return Promise.reject(dt(r));let s="reauthenticate";try{let o=await En(n,lu(r,s,e,n),t);R(o.idToken,r,"internal-error");let c=Ls(o.idToken);R(c,r,"internal-error");let{sub:u}=c;return R(n.uid===u,r,"user-mismatch"),xn._forOperation(n,s,o)}catch(o){throw o?.code==="auth/user-not-found"&&Ae(r,"user-mismatch"),o}}async function $f(n,e,t=!1){if(ze(n.app))return Promise.reject(dt(n));let r="signIn",s=await lu(n,r,e),o=await xn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}function uu(n,e,t,r){return qe(n).onIdTokenChanged(e,t,r)}function du(n,e,t){return qe(n).beforeAuthStateChanged(e,t)}function Gf(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:start",ne(n,e))}function Hf(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:finalize",ne(n,e))}function Kf(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:start",ne(n,e))}function Wf(n,e){return ue(n,"POST","/v2/accounts/mfaEnrollment:finalize",ne(n,e))}var Or="__sak";var Lr=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Or,"1"),this.storage.removeItem(Or),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Qf=1e3,Yf=10,Vr=class extends Lr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=nu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((c,u,d)=>{this.notifyListeners(c,d)});return}let r=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let c=this.storage.getItem(r);!t&&this.localCache[r]===c||this.notifyListeners(r,c)},o=this.storage.getItem(r);_f()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Yf):s()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Qf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Vr.type="LOCAL";var hu=Vr;var Mr=class extends Lr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Mr.type="SESSION";var Ms=Mr;function Jf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Fr=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:s,data:o}=t.data,c=this.handlersMap[s];if(!c?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});let u=Array.from(c).map(async f=>f(t.origin,o)),d=await Jf(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Fr.receivers=[];function Fs(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var As=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,c;return new Promise((u,d)=>{let f=Fs("",20);s.port1.start();let b=setTimeout(()=>{d(new Error("unsupported_event"))},r);c={messageChannel:s,onMessage(T){let A=T;if(A.data.eventId===f)switch(A.data.status){case"ack":clearTimeout(b),o=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(A.data.response);break;default:clearTimeout(b),clearTimeout(o),d(new Error("invalid_response"));break}}},this.handlers.add(c),s.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}};function xe(){return window}function Xf(n){xe().location.href=n}function fu(){return typeof xe().WorkerGlobalScope<"u"&&typeof xe().importScripts=="function"}async function Zf(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ep(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function tp(){return fu()?self:null}var pu="firebaseLocalStorageDb",np=1,Ur="firebaseLocalStorage",mu="fbase_key",gt=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Qr(n,e){return n.transaction([Ur],e?"readwrite":"readonly").objectStore(Ur)}function rp(){let n=indexedDB.deleteDatabase(pu);return new gt(n).toPromise()}function Ss(){let n=indexedDB.open(pu,np);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Ur,{keyPath:mu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Ur)?e(r):(r.close(),await rp(),e(await Ss()))})})}async function xl(n,e,t){let r=Qr(n,!0).put({[mu]:e,value:t});return new gt(r).toPromise()}async function ip(n,e){let t=Qr(n,!1).get(e),r=await new gt(t).toPromise();return r===void 0?null:r.value}function Dl(n,e){let t=Qr(n,!0).delete(e);return new gt(t).toPromise()}var sp=800,op=3,qr=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ss(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>op)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return fu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fr._getInstance(tp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Zf(),!this.activeServiceWorker)return;this.sender=new As(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ep()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Ss();return await xl(e,Or,"1"),await Dl(e,Or),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>xl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>ip(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Dl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(s=>{let o=Qr(s,!1).getAll();return new gt(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),sp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};qr.type="LOCAL";var gu=qr;function ap(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:start",ne(n,e))}function cp(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:finalize",ne(n,e))}function lp(n,e){return ue(n,"POST","/v2/accounts/mfaSignIn:finalize",ne(n,e))}var Pg=su("rcb"),Cg=new ht(3e4,6e4);var up="recaptcha";async function dp(n,e,t){var r;let s=await t.verify();try{R(typeof s=="string",n,"argument-error"),R(t.type===up,n,"argument-error");let o;if(typeof e=="string"?o={phoneNumber:e}:o=e,"session"in o){let c=o.session;if("phoneNumber"in o)return R(c.type==="enroll",n,"internal-error"),(await Gf(n,{idToken:c.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:s}})).phoneSessionInfo.sessionInfo;{R(c.type==="signin",n,"internal-error");let u=((r=o.multiFactorHint)===null||r===void 0?void 0:r.uid)||o.multiFactorUid;return R(u,n,"missing-multi-factor-info"),(await ap(n,{mfaPendingCredential:c.credential,mfaEnrollmentId:u,phoneSignInInfo:{recaptchaToken:s}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:c}=await Lf(n,{phoneNumber:o.phoneNumber,recaptchaToken:s});return c}}finally{t._reset()}}var Dn=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=On(e)}verifyPhoneNumber(e,t){return dp(this.auth,e,qe(t))}static credential(e,t){return Sn._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Sn._fromTokenResponse(t,r):null}};Dn.PROVIDER_ID="phone";Dn.PHONE_SIGN_IN_METHOD="phone";function hp(n,e){return e?je(e):(R(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Nn=class extends ft{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Dt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Dt(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function fp(n){return $f(n.auth,new Nn(n),n.bypassAuthState)}function pp(n){let{auth:e,user:t}=n;return R(t,e,"internal-error"),jf(t,new Nn(n),n.bypassAuthState)}async function mp(n){let{auth:e,user:t}=n;return R(t,e,"internal-error"),zf(t,new Nn(n),n.bypassAuthState)}var Br=class{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:c,type:u}=e;if(c){this.reject(c);return}let d={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(d))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fp;case"linkViaPopup":case"linkViaRedirect":return mp;case"reauthViaPopup":case"reauthViaRedirect":return pp;default:Ae(this.auth,"internal-error")}}resolve(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var gp=new ht(2e3,1e4);var ks=class n extends Br{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return R(e,this.auth,"internal-error"),e}async onExecution(){$e(this.filter.length===1,"Popup operations only handle one event");let e=Fs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ce(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ce(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ce(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gp.get())};e()}};ks.currentPopupAction=null;var yp="pendingRedirect",Tr=new Map,Rs=class extends Br{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Tr.get(this.auth._key());if(!e){try{let r=await vp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Tr.set(this.auth._key(),e)}return this.bypassAuthState||Tr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function vp(n,e){let t=bp(e),r=wp(n);if(!await r._isAvailable())return!1;let s=await r._get(t)==="true";return await r._remove(t),s}function _p(n,e){Tr.set(n._key(),e)}function wp(n){return je(n._redirectPersistence)}function bp(n){return Er(yp,n.config.apiKey,n.name)}async function Ip(n,e,t=!1){if(ze(n.app))return Promise.reject(dt(n));let r=On(n),s=hp(r,e),c=await new Rs(r,s,t).execute();return c&&!t&&(delete c.user._redirectEventId,await r._persistUserIfCurrent(c.user),await r._setRedirectUser(null,e)),c}var Ep=10*60*1e3,Ps=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Tp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!yu(e)){let s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Ce(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ep&&this.cachedEventUids.clear(),this.cachedEventUids.has(Nl(e))}saveEventToCache(e){this.cachedEventUids.add(Nl(e)),this.lastProcessedEventTime=Date.now()}};function Nl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function yu({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Tp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return yu(n);default:return!1}}async function Ap(n,e={}){return ue(n,"GET","/v1/projects",e)}var Sp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kp=/^https?/;async function Rp(n){if(n.config.emulator)return;let{authorizedDomains:e}=await Ap(n);for(let t of e)try{if(Pp(t))return}catch{}Ae(n,"unauthorized-domain")}function Pp(n){let e=ms(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let c=new URL(n);return c.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&c.hostname===r}if(!kp.test(t))return!1;if(Sp.test(n))return r===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}var Cp=new ht(3e4,6e4);function Ol(){let n=xe().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xp(n){return new Promise((e,t)=>{var r,s,o;function c(){Ol(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ol(),t(Ce(n,"network-request-failed"))},timeout:Cp.get()})}if(!((s=(r=xe().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=xe().gapi)===null||o===void 0)&&o.load)c();else{let u=su("iframefcb");return xe()[u]=()=>{gapi.load?c():t(Ce(n,"network-request-failed"))},iu(`${Tf()}?onload=${u}`).catch(d=>t(d))}}).catch(e=>{throw Ar=null,e})}var Ar=null;function Dp(n){return Ar=Ar||xp(n),Ar}var Np=new ht(5e3,15e3),Op="__/auth/iframe",Lp="emulator/auth/iframe",Vp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Mp=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Fp(n){let e=n.config;R(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Os(e,Lp):`https://${n.config.authDomain}/${Op}`,r={apiKey:e.apiKey,appName:n.name,v:Ze},s=Mp.get(n.config.apiHost);s&&(r.eid=s);let o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${Pt(r).slice(1)}`}async function Up(n){let e=await Dp(n),t=xe().gapi;return R(t,n,"internal-error"),e.open({where:document.body,url:Fp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Vp,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});let c=Ce(n,"network-request-failed"),u=xe().setTimeout(()=>{o(c)},Np.get());function d(){xe().clearTimeout(u),s(r)}r.ping(d).then(d,()=>{o(c)})}))}var qp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bp=500,zp=600,jp="_blank",$p="http://localhost",zr=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Gp(n,e,t,r=Bp,s=zp){let o=Math.max((window.screen.availHeight-s)/2,0).toString(),c=Math.max((window.screen.availWidth-r)/2,0).toString(),u="",d=Object.assign(Object.assign({},qp),{width:r.toString(),height:s.toString(),top:o,left:c}),f=te().toLowerCase();t&&(u=Jl(f)?jp:t),Ql(f)&&(e=e||$p,d.scrollbars="yes");let b=Object.entries(d).reduce((A,[C,x])=>`${A}${C}=${x},`,"");if(vf(f)&&u!=="_self")return Hp(e||"",u),new zr(null);let T=window.open(e||"",u,b);R(T,n,"popup-blocked");try{T.focus()}catch{}return new zr(T)}function Hp(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var Kp="__/auth/handler",Wp="emulator/auth/handler",Qp=encodeURIComponent("fac");async function Ll(n,e,t,r,s,o){R(n.config.authDomain,n,"auth-domain-config-required"),R(n.config.apiKey,n,"invalid-api-key");let c={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ze,eventId:s};if(e instanceof Nr){e.setDefaultLanguage(n.languageCode),c.providerId=e.providerId||"",ol(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(let[b,T]of Object.entries(o||{}))c[b]=T}if(e instanceof mt){let b=e.getScopes().filter(T=>T!=="");b.length>0&&(c.scopes=b.join(","))}n.tenantId&&(c.tid=n.tenantId);let u=c;for(let b of Object.keys(u))u[b]===void 0&&delete u[b];let d=await n._getAppCheckToken(),f=d?`#${Qp}=${encodeURIComponent(d)}`:"";return`${Yp(n)}?${Pt(u).slice(1)}${f}`}function Yp({config:n}){return n.emulator?Os(n,Wp):`https://${n.authDomain}/${Kp}`}var ps="webStorageSupport",Cs=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ms,this._completeRedirectFn=Ip,this._overrideRedirectResult=_p}async _openPopup(e,t,r,s){var o;$e((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");let c=await Ll(e,t,r,ms(),s);return Gp(e,c,Fs())}async _openRedirect(e,t,r,s){await this._originValidation(e);let o=await Ll(e,t,r,ms(),s);return Xf(o),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):($e(o,"If manager is not set, promise should be"),o)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Up(e),r=new Ps(e);return t.register("authEvent",s=>(R(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ps,{type:ps},s=>{var o;let c=(o=s?.[0])===null||o===void 0?void 0:o[ps];c!==void 0&&t(!!c),Ae(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Rp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return nu()||Yl()||Vs()}},vu=Cs,jr=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Pe("unexpected MultiFactorSessionType")}}},xs=class n extends jr{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Hf(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return cp(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},$r=class{constructor(){}static assertion(e){return xs._fromCredential(e)}};$r.FACTOR_ID="phone";var Gr=class{static assertionForEnrollment(e,t){return Hr._fromSecret(e,t)}static assertionForSignIn(e,t){return Hr._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;R(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let s=await Kf(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Kr._fromStartTotpMfaEnrollmentResponse(s,r.user.auth)}};Gr.FACTOR_ID="totp";var Hr=class n extends jr{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return R(typeof this.secret<"u",e,"argument-error"),Wf(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){R(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return lp(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Kr=class n{constructor(e,t,r,s,o,c,u){this.sessionInfo=c,this.auth=u,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=o}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let s=!1;return(br(e)||br(t))&&(s=!0),s&&(br(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),br(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function br(n){return typeof n>"u"||n?.length===0}var Vl="@firebase/auth",Ml="1.7.9";var Ds=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){R(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Jp(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Xp(n){Xe(new be("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:u}=r.options;R(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});let d={apiKey:c,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ru(n)},f=new Is(r,s,o,d);return kf(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xe(new be("auth-internal",e=>{let t=On(e.getProvider("auth").getImmediate());return(r=>new Ds(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Te(Vl,Ml,Jp(n)),Te(Vl,Ml,"esm2017")}var Zp=5*60,em=Yi("authIdTokenMaxAge")||Zp,Fl=null,tm=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>em)return;let s=t?.token;Fl!==s&&(Fl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Us(n=_r()){let e=_n(n,"auth");if(e.isInitialized())return e.getImmediate();let t=ou(n,{popupRedirectResolver:vu,persistence:[gu,hu,Ms]}),r=Yi("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let o=new URL(r,location.origin);if(location.origin===o.origin){let c=tm(o.toString());du(t,c,()=>c(t.currentUser)),uu(t,u=>c(u))}}let s=Wi("auth");return s&&au(t,`http://${s}`),t}function nm(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}If({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{let o=Ce("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",nm().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Xp("Browser");var _u=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},wu={};var qs,bu;(function(){var n;function e(_,p){function g(){}g.prototype=p.prototype,_.D=p.prototype,_.prototype=new g,_.prototype.constructor=_,_.C=function(y,v,I){for(var m=Array(arguments.length-2),Ve=2;Ve<arguments.length;Ve++)m[Ve-2]=arguments[Ve];return p.prototype[v].apply(y,m)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,p,g){g||(g=0);var y=Array(16);if(typeof p=="string")for(var v=0;16>v;++v)y[v]=p.charCodeAt(g++)|p.charCodeAt(g++)<<8|p.charCodeAt(g++)<<16|p.charCodeAt(g++)<<24;else for(v=0;16>v;++v)y[v]=p[g++]|p[g++]<<8|p[g++]<<16|p[g++]<<24;p=_.g[0],g=_.g[1],v=_.g[2];var I=_.g[3],m=p+(I^g&(v^I))+y[0]+3614090360&4294967295;p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[1]+3905402710&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[2]+606105819&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[3]+3250441966&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(I^g&(v^I))+y[4]+4118548399&4294967295,p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[5]+1200080426&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[6]+2821735955&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[7]+4249261313&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(I^g&(v^I))+y[8]+1770035416&4294967295,p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[9]+2336552879&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[10]+4294925233&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[11]+2304563134&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(I^g&(v^I))+y[12]+1804603682&4294967295,p=g+(m<<7&4294967295|m>>>25),m=I+(v^p&(g^v))+y[13]+4254626195&4294967295,I=p+(m<<12&4294967295|m>>>20),m=v+(g^I&(p^g))+y[14]+2792965006&4294967295,v=I+(m<<17&4294967295|m>>>15),m=g+(p^v&(I^p))+y[15]+1236535329&4294967295,g=v+(m<<22&4294967295|m>>>10),m=p+(v^I&(g^v))+y[1]+4129170786&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[6]+3225465664&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[11]+643717713&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[0]+3921069994&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(g^v))+y[5]+3593408605&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[10]+38016083&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[15]+3634488961&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[4]+3889429448&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(g^v))+y[9]+568446438&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[14]+3275163606&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[3]+4107603335&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[8]+1163531501&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(v^I&(g^v))+y[13]+2850285829&4294967295,p=g+(m<<5&4294967295|m>>>27),m=I+(g^v&(p^g))+y[2]+4243563512&4294967295,I=p+(m<<9&4294967295|m>>>23),m=v+(p^g&(I^p))+y[7]+1735328473&4294967295,v=I+(m<<14&4294967295|m>>>18),m=g+(I^p&(v^I))+y[12]+2368359562&4294967295,g=v+(m<<20&4294967295|m>>>12),m=p+(g^v^I)+y[5]+4294588738&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[8]+2272392833&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[11]+1839030562&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[14]+4259657740&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(g^v^I)+y[1]+2763975236&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[4]+1272893353&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[7]+4139469664&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[10]+3200236656&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(g^v^I)+y[13]+681279174&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[0]+3936430074&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[3]+3572445317&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[6]+76029189&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(g^v^I)+y[9]+3654602809&4294967295,p=g+(m<<4&4294967295|m>>>28),m=I+(p^g^v)+y[12]+3873151461&4294967295,I=p+(m<<11&4294967295|m>>>21),m=v+(I^p^g)+y[15]+530742520&4294967295,v=I+(m<<16&4294967295|m>>>16),m=g+(v^I^p)+y[2]+3299628645&4294967295,g=v+(m<<23&4294967295|m>>>9),m=p+(v^(g|~I))+y[0]+4096336452&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[7]+1126891415&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[14]+2878612391&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[5]+4237533241&4294967295,g=v+(m<<21&4294967295|m>>>11),m=p+(v^(g|~I))+y[12]+1700485571&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[3]+2399980690&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[10]+4293915773&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[1]+2240044497&4294967295,g=v+(m<<21&4294967295|m>>>11),m=p+(v^(g|~I))+y[8]+1873313359&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[15]+4264355552&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[6]+2734768916&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[13]+1309151649&4294967295,g=v+(m<<21&4294967295|m>>>11),m=p+(v^(g|~I))+y[4]+4149444226&4294967295,p=g+(m<<6&4294967295|m>>>26),m=I+(g^(p|~v))+y[11]+3174756917&4294967295,I=p+(m<<10&4294967295|m>>>22),m=v+(p^(I|~g))+y[2]+718787259&4294967295,v=I+(m<<15&4294967295|m>>>17),m=g+(I^(v|~p))+y[9]+3951481745&4294967295,_.g[0]=_.g[0]+p&4294967295,_.g[1]=_.g[1]+(v+(m<<21&4294967295|m>>>11))&4294967295,_.g[2]=_.g[2]+v&4294967295,_.g[3]=_.g[3]+I&4294967295}r.prototype.u=function(_,p){p===void 0&&(p=_.length);for(var g=p-this.blockSize,y=this.B,v=this.h,I=0;I<p;){if(v==0)for(;I<=g;)s(this,_,I),I+=this.blockSize;if(typeof _=="string"){for(;I<p;)if(y[v++]=_.charCodeAt(I++),v==this.blockSize){s(this,y),v=0;break}}else for(;I<p;)if(y[v++]=_[I++],v==this.blockSize){s(this,y),v=0;break}}this.h=v,this.o+=p},r.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var p=1;p<_.length-8;++p)_[p]=0;var g=8*this.o;for(p=_.length-8;p<_.length;++p)_[p]=g&255,g/=256;for(this.u(_),_=Array(16),p=g=0;4>p;++p)for(var y=0;32>y;y+=8)_[g++]=this.g[p]>>>y&255;return _};function o(_,p){var g=u;return Object.prototype.hasOwnProperty.call(g,_)?g[_]:g[_]=p(_)}function c(_,p){this.h=p;for(var g=[],y=!0,v=_.length-1;0<=v;v--){var I=_[v]|0;y&&I==p||(g[v]=I,y=!1)}this.g=g}var u={};function d(_){return-128<=_&&128>_?o(_,function(p){return new c([p|0],0>p?-1:0)}):new c([_|0],0>_?-1:0)}function f(_){if(isNaN(_)||!isFinite(_))return T;if(0>_)return D(f(-_));for(var p=[],g=1,y=0;_>=g;y++)p[y]=_/g|0,g*=4294967296;return new c(p,0)}function b(_,p){if(_.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(_.charAt(0)=="-")return D(b(_.substring(1),p));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=f(Math.pow(p,8)),y=T,v=0;v<_.length;v+=8){var I=Math.min(8,_.length-v),m=parseInt(_.substring(v,v+I),p);8>I?(I=f(Math.pow(p,I)),y=y.j(I).add(f(m))):(y=y.j(g),y=y.add(f(m)))}return y}var T=d(0),A=d(1),C=d(16777216);n=c.prototype,n.m=function(){if(U(this))return-D(this).m();for(var _=0,p=1,g=0;g<this.g.length;g++){var y=this.i(g);_+=(0<=y?y:4294967296+y)*p,p*=4294967296}return _},n.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(x(this))return"0";if(U(this))return"-"+D(this).toString(_);for(var p=f(Math.pow(_,6)),g=this,y="";;){var v=X(g,p).g;g=Z(g,v.j(p));var I=((0<g.g.length?g.g[0]:g.h)>>>0).toString(_);if(g=v,x(g))return I+y;for(;6>I.length;)I="0"+I;y=I+y}},n.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function x(_){if(_.h!=0)return!1;for(var p=0;p<_.g.length;p++)if(_.g[p]!=0)return!1;return!0}function U(_){return _.h==-1}n.l=function(_){return _=Z(this,_),U(_)?-1:x(_)?0:1};function D(_){for(var p=_.g.length,g=[],y=0;y<p;y++)g[y]=~_.g[y];return new c(g,~_.h).add(A)}n.abs=function(){return U(this)?D(this):this},n.add=function(_){for(var p=Math.max(this.g.length,_.g.length),g=[],y=0,v=0;v<=p;v++){var I=y+(this.i(v)&65535)+(_.i(v)&65535),m=(I>>>16)+(this.i(v)>>>16)+(_.i(v)>>>16);y=m>>>16,I&=65535,m&=65535,g[v]=m<<16|I}return new c(g,g[g.length-1]&-2147483648?-1:0)};function Z(_,p){return _.add(D(p))}n.j=function(_){if(x(this)||x(_))return T;if(U(this))return U(_)?D(this).j(D(_)):D(D(this).j(_));if(U(_))return D(this.j(D(_)));if(0>this.l(C)&&0>_.l(C))return f(this.m()*_.m());for(var p=this.g.length+_.g.length,g=[],y=0;y<2*p;y++)g[y]=0;for(y=0;y<this.g.length;y++)for(var v=0;v<_.g.length;v++){var I=this.i(y)>>>16,m=this.i(y)&65535,Ve=_.i(v)>>>16,Jt=_.i(v)&65535;g[2*y+2*v]+=m*Jt,K(g,2*y+2*v),g[2*y+2*v+1]+=I*Jt,K(g,2*y+2*v+1),g[2*y+2*v+1]+=m*Ve,K(g,2*y+2*v+1),g[2*y+2*v+2]+=I*Ve,K(g,2*y+2*v+2)}for(y=0;y<p;y++)g[y]=g[2*y+1]<<16|g[2*y];for(y=p;y<2*p;y++)g[y]=0;return new c(g,0)};function K(_,p){for(;(_[p]&65535)!=_[p];)_[p+1]+=_[p]>>>16,_[p]&=65535,p++}function H(_,p){this.g=_,this.h=p}function X(_,p){if(x(p))throw Error("division by zero");if(x(_))return new H(T,T);if(U(_))return p=X(D(_),p),new H(D(p.g),D(p.h));if(U(p))return p=X(_,D(p)),new H(D(p.g),p.h);if(30<_.g.length){if(U(_)||U(p))throw Error("slowDivide_ only works with positive integers.");for(var g=A,y=p;0>=y.l(_);)g=ke(g),y=ke(y);var v=ee(g,1),I=ee(y,1);for(y=ee(y,2),g=ee(g,2);!x(y);){var m=I.add(y);0>=m.l(_)&&(v=v.add(g),I=m),y=ee(y,1),g=ee(g,1)}return p=Z(_,v.j(p)),new H(v,p)}for(v=T;0<=_.l(p);){for(g=Math.max(1,Math.floor(_.m()/p.m())),y=Math.ceil(Math.log(g)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),I=f(g),m=I.j(p);U(m)||0<m.l(_);)g-=y,I=f(g),m=I.j(p);x(I)&&(I=A),v=v.add(I),_=Z(_,m)}return new H(v,_)}n.A=function(_){return X(this,_).h},n.and=function(_){for(var p=Math.max(this.g.length,_.g.length),g=[],y=0;y<p;y++)g[y]=this.i(y)&_.i(y);return new c(g,this.h&_.h)},n.or=function(_){for(var p=Math.max(this.g.length,_.g.length),g=[],y=0;y<p;y++)g[y]=this.i(y)|_.i(y);return new c(g,this.h|_.h)},n.xor=function(_){for(var p=Math.max(this.g.length,_.g.length),g=[],y=0;y<p;y++)g[y]=this.i(y)^_.i(y);return new c(g,this.h^_.h)};function ke(_){for(var p=_.g.length+1,g=[],y=0;y<p;y++)g[y]=_.i(y)<<1|_.i(y-1)>>>31;return new c(g,_.h)}function ee(_,p){var g=p>>5;p%=32;for(var y=_.g.length-g,v=[],I=0;I<y;I++)v[I]=0<p?_.i(I+g)>>>p|_.i(I+g+1)<<32-p:_.i(I+g);return new c(v,_.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,bu=wu.Md5=r,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=b,qs=wu.Integer=c}).apply(typeof _u<"u"?_u:typeof self<"u"?self:typeof window<"u"?window:{});var Yr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ge={};var Bs,rm,Lt,zs,Ln,Jr,js,$s,Gs;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,l){return i==Array.prototype||i==Object.prototype||(i[a]=l.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Yr=="object"&&Yr];for(var a=0;a<i.length;++a){var l=i[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function s(i,a){if(a)e:{var l=r;i=i.split(".");for(var h=0;h<i.length-1;h++){var w=i[h];if(!(w in l))break e;l=l[w]}i=i[i.length-1],h=l[i],a=a(h),a!=h&&a!=null&&e(l,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var l=0,h=!1,w={next:function(){if(!h&&l<i.length){var E=l++;return{value:a(E,i[E]),done:!1}}return h=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,l){return l})}});var c=c||{},u=this||self;function d(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function f(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function b(i,a,l){return i.call.apply(i.bind,arguments)}function T(i,a,l){if(!i)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,h),i.apply(a,w)}}return function(){return i.apply(a,arguments)}}function A(i,a,l){return A=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?b:T,A.apply(null,arguments)}function C(i,a){var l=Array.prototype.slice.call(arguments,1);return function(){var h=l.slice();return h.push.apply(h,arguments),i.apply(this,h)}}function x(i,a){function l(){}l.prototype=a.prototype,i.aa=a.prototype,i.prototype=new l,i.prototype.constructor=i,i.Qb=function(h,w,E){for(var k=Array(arguments.length-2),z=2;z<arguments.length;z++)k[z-2]=arguments[z];return a.prototype[w].apply(h,k)}}function U(i){let a=i.length;if(0<a){let l=Array(a);for(let h=0;h<a;h++)l[h]=i[h];return l}return[]}function D(i,a){for(let l=1;l<arguments.length;l++){let h=arguments[l];if(d(h)){let w=i.length||0,E=h.length||0;i.length=w+E;for(let k=0;k<E;k++)i[w+k]=h[k]}else i.push(h)}}class Z{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function K(i){return/^[\s\xa0]*$/.test(i)}function H(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function X(i){return X[" "](i),i}X[" "]=function(){};var ke=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function ee(i,a,l){for(let h in i)a.call(l,i[h],h,i)}function _(i,a){for(let l in i)a.call(void 0,i[l],l,i)}function p(i){let a={};for(let l in i)a[l]=i[l];return a}let g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,a){let l,h;for(let w=1;w<arguments.length;w++){h=arguments[w];for(l in h)i[l]=h[l];for(let E=0;E<g.length;E++)l=g[E],Object.prototype.hasOwnProperty.call(h,l)&&(i[l]=h[l])}}function v(i){var a=1;i=i.split(":");let l=[];for(;0<a&&i.length;)l.push(i.shift()),a--;return i.length&&l.push(i.join(":")),l}function I(i){u.setTimeout(()=>{throw i},0)}function m(){var i=_i;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class Ve{constructor(){this.h=this.g=null}add(a,l){let h=Jt.get();h.set(a,l),this.h?this.h.next=h:this.g=h,this.h=h}}var Jt=new Z(()=>new dd,i=>i.reset());class dd{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Xt,Zt=!1,_i=new Ve,Ka=()=>{let i=u.Promise.resolve(void 0);Xt=()=>{i.then(hd)}};var hd=()=>{for(var i;i=m();){try{i.h.call(i.g)}catch(l){I(l)}var a=Jt;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}Zt=!1};function He(){this.s=this.s,this.C=this.C}He.prototype.s=!1,He.prototype.ma=function(){this.s||(this.s=!0,this.N())},He.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var fd=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{let l=()=>{};u.addEventListener("test",l,a),u.removeEventListener("test",l,a)}catch{}return i}();function en(i,a){if(oe.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var l=this.type=i.type,h=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(ke){e:{try{X(a.nodeName);var w=!0;break e}catch{}w=!1}w||(a=null)}}else l=="mouseover"?a=i.fromElement:l=="mouseout"&&(a=i.toElement);this.relatedTarget=a,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:pd[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&en.aa.h.call(this)}}x(en,oe);var pd={2:"touch",3:"pen",4:"mouse"};en.prototype.h=function(){en.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var tn="closure_listenable_"+(1e6*Math.random()|0),md=0;function gd(i,a,l,h,w){this.listener=i,this.proxy=null,this.src=a,this.type=l,this.capture=!!h,this.ha=w,this.key=++md,this.da=this.fa=!1}function Jn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Xn(i){this.src=i,this.g={},this.h=0}Xn.prototype.add=function(i,a,l,h,w){var E=i.toString();i=this.g[E],i||(i=this.g[E]=[],this.h++);var k=bi(i,a,h,w);return-1<k?(a=i[k],l||(a.fa=!1)):(a=new gd(a,this.src,E,!!h,w),a.fa=l,i.push(a)),a};function wi(i,a){var l=a.type;if(l in i.g){var h=i.g[l],w=Array.prototype.indexOf.call(h,a,void 0),E;(E=0<=w)&&Array.prototype.splice.call(h,w,1),E&&(Jn(a),i.g[l].length==0&&(delete i.g[l],i.h--))}}function bi(i,a,l,h){for(var w=0;w<i.length;++w){var E=i[w];if(!E.da&&E.listener==a&&E.capture==!!l&&E.ha==h)return w}return-1}var Ii="closure_lm_"+(1e6*Math.random()|0),Ei={};function Wa(i,a,l,h,w){if(h&&h.once)return Ya(i,a,l,h,w);if(Array.isArray(a)){for(var E=0;E<a.length;E++)Wa(i,a[E],l,h,w);return null}return l=ki(l),i&&i[tn]?i.K(a,l,f(h)?!!h.capture:!!h,w):Qa(i,a,l,!1,h,w)}function Qa(i,a,l,h,w,E){if(!a)throw Error("Invalid event type");var k=f(w)?!!w.capture:!!w,z=Ai(i);if(z||(i[Ii]=z=new Xn(i)),l=z.add(a,l,h,k,E),l.proxy)return l;if(h=yd(),l.proxy=h,h.src=i,h.listener=l,i.addEventListener)fd||(w=k),w===void 0&&(w=!1),i.addEventListener(a.toString(),h,w);else if(i.attachEvent)i.attachEvent(Xa(a.toString()),h);else if(i.addListener&&i.removeListener)i.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return l}function yd(){function i(l){return a.call(i.src,i.listener,l)}let a=vd;return i}function Ya(i,a,l,h,w){if(Array.isArray(a)){for(var E=0;E<a.length;E++)Ya(i,a[E],l,h,w);return null}return l=ki(l),i&&i[tn]?i.L(a,l,f(h)?!!h.capture:!!h,w):Qa(i,a,l,!0,h,w)}function Ja(i,a,l,h,w){if(Array.isArray(a))for(var E=0;E<a.length;E++)Ja(i,a[E],l,h,w);else h=f(h)?!!h.capture:!!h,l=ki(l),i&&i[tn]?(i=i.i,a=String(a).toString(),a in i.g&&(E=i.g[a],l=bi(E,l,h,w),-1<l&&(Jn(E[l]),Array.prototype.splice.call(E,l,1),E.length==0&&(delete i.g[a],i.h--)))):i&&(i=Ai(i))&&(a=i.g[a.toString()],i=-1,a&&(i=bi(a,l,h,w)),(l=-1<i?a[i]:null)&&Ti(l))}function Ti(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[tn])wi(a.i,i);else{var l=i.type,h=i.proxy;a.removeEventListener?a.removeEventListener(l,h,i.capture):a.detachEvent?a.detachEvent(Xa(l),h):a.addListener&&a.removeListener&&a.removeListener(h),(l=Ai(a))?(wi(l,i),l.h==0&&(l.src=null,a[Ii]=null)):Jn(i)}}}function Xa(i){return i in Ei?Ei[i]:Ei[i]="on"+i}function vd(i,a){if(i.da)i=!0;else{a=new en(a,this);var l=i.listener,h=i.ha||i.src;i.fa&&Ti(i),i=l.call(h,a)}return i}function Ai(i){return i=i[Ii],i instanceof Xn?i:null}var Si="__closure_events_fn_"+(1e9*Math.random()>>>0);function ki(i){return typeof i=="function"?i:(i[Si]||(i[Si]=function(a){return i.handleEvent(a)}),i[Si])}function ae(){He.call(this),this.i=new Xn(this),this.M=this,this.F=null}x(ae,He),ae.prototype[tn]=!0,ae.prototype.removeEventListener=function(i,a,l,h){Ja(this,i,a,l,h)};function he(i,a){var l,h=i.F;if(h)for(l=[];h;h=h.F)l.push(h);if(i=i.M,h=a.type||a,typeof a=="string")a=new oe(a,i);else if(a instanceof oe)a.target=a.target||i;else{var w=a;a=new oe(h,i),y(a,w)}if(w=!0,l)for(var E=l.length-1;0<=E;E--){var k=a.g=l[E];w=Zn(k,h,!0,a)&&w}if(k=a.g=i,w=Zn(k,h,!0,a)&&w,w=Zn(k,h,!1,a)&&w,l)for(E=0;E<l.length;E++)k=a.g=l[E],w=Zn(k,h,!1,a)&&w}ae.prototype.N=function(){if(ae.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var l=i.g[a],h=0;h<l.length;h++)Jn(l[h]);delete i.g[a],i.h--}}this.F=null},ae.prototype.K=function(i,a,l,h){return this.i.add(String(i),a,!1,l,h)},ae.prototype.L=function(i,a,l,h){return this.i.add(String(i),a,!0,l,h)};function Zn(i,a,l,h){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var w=!0,E=0;E<a.length;++E){var k=a[E];if(k&&!k.da&&k.capture==l){var z=k.listener,ie=k.ha||k.src;k.fa&&wi(i.i,k),w=z.call(ie,h)!==!1&&w}}return w&&!h.defaultPrevented}function Za(i,a,l){if(typeof i=="function")l&&(i=A(i,l));else if(i&&typeof i.handleEvent=="function")i=A(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(i,a||0)}function ec(i){i.g=Za(()=>{i.g=null,i.i&&(i.i=!1,ec(i))},i.l);let a=i.h;i.h=null,i.m.apply(null,a)}class _d extends He{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:ec(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function nn(i){He.call(this),this.h=i,this.g={}}x(nn,He);var tc=[];function nc(i){ee(i.g,function(a,l){this.g.hasOwnProperty(l)&&Ti(a)},i),i.g={}}nn.prototype.N=function(){nn.aa.N.call(this),nc(this)},nn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ri=u.JSON.stringify,wd=u.JSON.parse,bd=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function Pi(){}Pi.prototype.h=null;function rc(i){return i.h||(i.h=i.i())}function ic(){}var rn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ci(){oe.call(this,"d")}x(Ci,oe);function xi(){oe.call(this,"c")}x(xi,oe);var st={},sc=null;function er(){return sc=sc||new ae}st.La="serverreachability";function oc(i){oe.call(this,st.La,i)}x(oc,oe);function sn(i){let a=er();he(a,new oc(a))}st.STAT_EVENT="statevent";function ac(i,a){oe.call(this,st.STAT_EVENT,i),this.stat=a}x(ac,oe);function fe(i){let a=er();he(a,new ac(a,i))}st.Ma="timingevent";function cc(i,a){oe.call(this,st.Ma,i),this.size=a}x(cc,oe);function on(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},a)}function an(){this.g=!0}an.prototype.xa=function(){this.g=!1};function Id(i,a,l,h,w,E){i.info(function(){if(i.g)if(E)for(var k="",z=E.split("&"),ie=0;ie<z.length;ie++){var q=z[ie].split("=");if(1<q.length){var ce=q[0];q=q[1];var le=ce.split("_");k=2<=le.length&&le[1]=="type"?k+(ce+"="+q+"&"):k+(ce+"=redacted&")}}else k=null;else k=E;return"XMLHTTP REQ ("+h+") [attempt "+w+"]: "+a+`
`+l+`
`+k})}function Ed(i,a,l,h,w,E,k){i.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+w+"]: "+a+`
`+l+`
`+E+" "+k})}function At(i,a,l,h){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+Ad(i,l)+(h?" "+h:"")})}function Td(i,a){i.info(function(){return"TIMEOUT: "+a})}an.prototype.info=function(){};function Ad(i,a){if(!i.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(i=0;i<l.length;i++)if(Array.isArray(l[i])){var h=l[i];if(!(2>h.length)){var w=h[1];if(Array.isArray(w)&&!(1>w.length)){var E=w[0];if(E!="noop"&&E!="stop"&&E!="close")for(var k=1;k<w.length;k++)w[k]=""}}}}return Ri(l)}catch{return a}}var tr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},lc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Di;function nr(){}x(nr,Pi),nr.prototype.g=function(){return new XMLHttpRequest},nr.prototype.i=function(){return{}},Di=new nr;function Ke(i,a,l,h){this.j=i,this.i=a,this.l=l,this.R=h||1,this.U=new nn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new uc}function uc(){this.i=null,this.g="",this.h=!1}var dc={},Ni={};function Oi(i,a,l){i.L=1,i.v=or(Me(a)),i.m=l,i.P=!0,hc(i,null)}function hc(i,a){i.F=Date.now(),rr(i),i.A=Me(i.v);var l=i.A,h=i.R;Array.isArray(h)||(h=[String(h)]),Sc(l.i,"t",h),i.C=0,l=i.j.J,i.h=new uc,i.g=$c(i.j,l?a:null,!i.m),0<i.O&&(i.M=new _d(A(i.Y,i,i.g),i.O)),a=i.U,l=i.g,h=i.ca;var w="readystatechange";Array.isArray(w)||(w&&(tc[0]=w.toString()),w=tc);for(var E=0;E<w.length;E++){var k=Wa(l,w[E],h||a.handleEvent,!1,a.h||a);if(!k)break;a.g[k.key]=k}a=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),sn(),Id(i.i,i.u,i.A,i.l,i.R,i.m)}Ke.prototype.ca=function(i){i=i.target;let a=this.M;a&&Fe(i)==3?a.j():this.Y(i)},Ke.prototype.Y=function(i){try{if(i==this.g)e:{let le=Fe(this.g);var a=this.g.Ba();let Rt=this.g.Z();if(!(3>le)&&(le!=3||this.g&&(this.h.h||this.g.oa()||Nc(this.g)))){this.J||le!=4||a==7||(a==8||0>=Rt?sn(3):sn(2)),Li(this);var l=this.g.Z();this.X=l;t:if(fc(this)){var h=Nc(this.g);i="";var w=h.length,E=Fe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ot(this),cn(this);var k="";break t}this.h.i=new u.TextDecoder}for(a=0;a<w;a++)this.h.h=!0,i+=this.h.i.decode(h[a],{stream:!(E&&a==w-1)});h.length=0,this.h.g+=i,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=l==200,Ed(this.i,this.u,this.A,this.l,this.R,le,l),this.o){if(this.T&&!this.K){t:{if(this.g){var z,ie=this.g;if((z=ie.g?ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(z)){var q=z;break t}}q=null}if(l=q)At(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Vi(this,l);else{this.o=!1,this.s=3,fe(12),ot(this),cn(this);break e}}if(this.P){l=!0;let Ee;for(;!this.J&&this.C<k.length;)if(Ee=Sd(this,k),Ee==Ni){le==4&&(this.s=4,fe(14),l=!1),At(this.i,this.l,null,"[Incomplete Response]");break}else if(Ee==dc){this.s=4,fe(15),At(this.i,this.l,k,"[Invalid Chunk]"),l=!1;break}else At(this.i,this.l,Ee,null),Vi(this,Ee);if(fc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),le!=4||k.length!=0||this.h.h||(this.s=1,fe(16),l=!1),this.o=this.o&&l,!l)At(this.i,this.l,k,"[Invalid Chunked Response]"),ot(this),cn(this);else if(0<k.length&&!this.W){this.W=!0;var ce=this.j;ce.g==this&&ce.ba&&!ce.M&&(ce.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),zi(ce),ce.M=!0,fe(11))}}else At(this.i,this.l,k,null),Vi(this,k);le==4&&ot(this),this.o&&!this.J&&(le==4?qc(this.j,this):(this.o=!1,rr(this)))}else jd(this.g),l==400&&0<k.indexOf("Unknown SID")?(this.s=3,fe(12)):(this.s=0,fe(13)),ot(this),cn(this)}}}catch{}finally{}};function fc(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Sd(i,a){var l=i.C,h=a.indexOf(`
`,l);return h==-1?Ni:(l=Number(a.substring(l,h)),isNaN(l)?dc:(h+=1,h+l>a.length?Ni:(a=a.slice(h,h+l),i.C=h+l,a)))}Ke.prototype.cancel=function(){this.J=!0,ot(this)};function rr(i){i.S=Date.now()+i.I,pc(i,i.I)}function pc(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=on(A(i.ba,i),a)}function Li(i){i.B&&(u.clearTimeout(i.B),i.B=null)}Ke.prototype.ba=function(){this.B=null;let i=Date.now();0<=i-this.S?(Td(this.i,this.A),this.L!=2&&(sn(),fe(17)),ot(this),this.s=2,cn(this)):pc(this,this.S-i)};function cn(i){i.j.G==0||i.J||qc(i.j,i)}function ot(i){Li(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,nc(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function Vi(i,a){try{var l=i.j;if(l.G!=0&&(l.g==i||Mi(l.h,i))){if(!i.K&&Mi(l.h,i)&&l.G==3){try{var h=l.Da.g.parse(a)}catch{h=null}if(Array.isArray(h)&&h.length==3){var w=h;if(w[0]==0){e:if(!l.u){if(l.g)if(l.g.F+3e3<i.F)dr(l),lr(l);else break e;Bi(l),fe(18)}}else l.za=w[1],0<l.za-l.T&&37500>w[2]&&l.F&&l.v==0&&!l.C&&(l.C=on(A(l.Za,l),6e3));if(1>=yc(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else ct(l,11)}else if((i.K||l.g==i)&&dr(l),!K(a))for(w=l.Da.g.parse(a),a=0;a<w.length;a++){let q=w[a];if(l.T=q[0],q=q[1],l.G==2)if(q[0]=="c"){l.K=q[1],l.ia=q[2];let ce=q[3];ce!=null&&(l.la=ce,l.j.info("VER="+l.la));let le=q[4];le!=null&&(l.Aa=le,l.j.info("SVER="+l.Aa));let Rt=q[5];Rt!=null&&typeof Rt=="number"&&0<Rt&&(h=1.5*Rt,l.L=h,l.j.info("backChannelRequestTimeoutMs_="+h)),h=l;let Ee=i.g;if(Ee){let fr=Ee.g?Ee.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(fr){var E=h.h;E.g||fr.indexOf("spdy")==-1&&fr.indexOf("quic")==-1&&fr.indexOf("h2")==-1||(E.j=E.l,E.g=new Set,E.h&&(Fi(E,E.h),E.h=null))}if(h.D){let ji=Ee.g?Ee.g.getResponseHeader("X-HTTP-Session-Id"):null;ji&&(h.ya=ji,j(h.I,h.D,ji))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-i.F,l.j.info("Handshake RTT: "+l.R+"ms")),h=l;var k=i;if(h.qa=jc(h,h.J?h.ia:null,h.W),k.K){vc(h.h,k);var z=k,ie=h.L;ie&&(z.I=ie),z.B&&(Li(z),rr(z)),h.g=k}else Fc(h);0<l.i.length&&ur(l)}else q[0]!="stop"&&q[0]!="close"||ct(l,7);else l.G==3&&(q[0]=="stop"||q[0]=="close"?q[0]=="stop"?ct(l,7):qi(l):q[0]!="noop"&&l.l&&l.l.ta(q),l.v=0)}}sn(4)}catch{}}var kd=class{constructor(i,a){this.g=i,this.map=a}};function mc(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function gc(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function yc(i){return i.h?1:i.g?i.g.size:0}function Mi(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function Fi(i,a){i.g?i.g.add(a):i.h=a}function vc(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}mc.prototype.cancel=function(){if(this.i=_c(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let i of this.g.values())i.cancel();this.g.clear()}};function _c(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(let l of i.g.values())a=a.concat(l.D);return a}return U(i.i)}function Rd(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(d(i)){for(var a=[],l=i.length,h=0;h<l;h++)a.push(i[h]);return a}a=[],l=0;for(h in i)a[l++]=i[h];return a}function Pd(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(d(i)||typeof i=="string"){var a=[];i=i.length;for(var l=0;l<i;l++)a.push(l);return a}a=[],l=0;for(let h in i)a[l++]=h;return a}}}function wc(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(d(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var l=Pd(i),h=Rd(i),w=h.length,E=0;E<w;E++)a.call(void 0,h[E],l&&l[E],i)}var bc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Cd(i,a){if(i){i=i.split("&");for(var l=0;l<i.length;l++){var h=i[l].indexOf("="),w=null;if(0<=h){var E=i[l].substring(0,h);w=i[l].substring(h+1)}else E=i[l];a(E,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function at(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof at){this.h=i.h,ir(this,i.j),this.o=i.o,this.g=i.g,sr(this,i.s),this.l=i.l;var a=i.i,l=new dn;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),Ic(this,l),this.m=i.m}else i&&(a=String(i).match(bc))?(this.h=!1,ir(this,a[1]||"",!0),this.o=ln(a[2]||""),this.g=ln(a[3]||"",!0),sr(this,a[4]),this.l=ln(a[5]||"",!0),Ic(this,a[6]||"",!0),this.m=ln(a[7]||"")):(this.h=!1,this.i=new dn(null,this.h))}at.prototype.toString=function(){var i=[],a=this.j;a&&i.push(un(a,Ec,!0),":");var l=this.g;return(l||a=="file")&&(i.push("//"),(a=this.o)&&i.push(un(a,Ec,!0),"@"),i.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&i.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&i.push("/"),i.push(un(l,l.charAt(0)=="/"?Nd:Dd,!0))),(l=this.i.toString())&&i.push("?",l),(l=this.m)&&i.push("#",un(l,Ld)),i.join("")};function Me(i){return new at(i)}function ir(i,a,l){i.j=l?ln(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function sr(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function Ic(i,a,l){a instanceof dn?(i.i=a,Vd(i.i,i.h)):(l||(a=un(a,Od)),i.i=new dn(a,i.h))}function j(i,a,l){i.i.set(a,l)}function or(i){return j(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function ln(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function un(i,a,l){return typeof i=="string"?(i=encodeURI(i).replace(a,xd),l&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function xd(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Ec=/[#\/\?@]/g,Dd=/[#\?:]/g,Nd=/[#\?]/g,Od=/[#\?@]/g,Ld=/#/g;function dn(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function We(i){i.g||(i.g=new Map,i.h=0,i.i&&Cd(i.i,function(a,l){i.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}n=dn.prototype,n.add=function(i,a){We(this),this.i=null,i=St(this,i);var l=this.g.get(i);return l||this.g.set(i,l=[]),l.push(a),this.h+=1,this};function Tc(i,a){We(i),a=St(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function Ac(i,a){return We(i),a=St(i,a),i.g.has(a)}n.forEach=function(i,a){We(this),this.g.forEach(function(l,h){l.forEach(function(w){i.call(a,w,h,this)},this)},this)},n.na=function(){We(this);let i=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let h=0;h<a.length;h++){let w=i[h];for(let E=0;E<w.length;E++)l.push(a[h])}return l},n.V=function(i){We(this);let a=[];if(typeof i=="string")Ac(this,i)&&(a=a.concat(this.g.get(St(this,i))));else{i=Array.from(this.g.values());for(let l=0;l<i.length;l++)a=a.concat(i[l])}return a},n.set=function(i,a){return We(this),this.i=null,i=St(this,i),Ac(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function Sc(i,a,l){Tc(i,a),0<l.length&&(i.i=null,i.g.set(St(i,a),U(l)),i.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let i=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var h=a[l];let E=encodeURIComponent(String(h)),k=this.V(h);for(h=0;h<k.length;h++){var w=E;k[h]!==""&&(w+="="+encodeURIComponent(String(k[h]))),i.push(w)}}return this.i=i.join("&")};function St(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function Vd(i,a){a&&!i.j&&(We(i),i.i=null,i.g.forEach(function(l,h){var w=h.toLowerCase();h!=w&&(Tc(this,h),Sc(this,w,l))},i)),i.j=a}function Md(i,a){let l=new an;if(u.Image){let h=new Image;h.onload=C(Qe,l,"TestLoadImage: loaded",!0,a,h),h.onerror=C(Qe,l,"TestLoadImage: error",!1,a,h),h.onabort=C(Qe,l,"TestLoadImage: abort",!1,a,h),h.ontimeout=C(Qe,l,"TestLoadImage: timeout",!1,a,h),u.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=i}else a(!1)}function Fd(i,a){let l=new an,h=new AbortController,w=setTimeout(()=>{h.abort(),Qe(l,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:h.signal}).then(E=>{clearTimeout(w),E.ok?Qe(l,"TestPingServer: ok",!0,a):Qe(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(w),Qe(l,"TestPingServer: error",!1,a)})}function Qe(i,a,l,h,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),h(l)}catch{}}function Ud(){this.g=new bd}function qd(i,a,l){let h=l||"";try{wc(i,function(w,E){let k=w;f(w)&&(k=Ri(w)),a.push(h+E+"="+encodeURIComponent(k))})}catch(w){throw a.push(h+"type="+encodeURIComponent("_badmap")),w}}function hn(i){this.l=i.Ub||null,this.j=i.eb||!1}x(hn,Pi),hn.prototype.g=function(){return new ar(this.l,this.j)},hn.prototype.i=function(i){return function(){return i}}({});function ar(i,a){ae.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}x(ar,ae),n=ar.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,pn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,fn(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,pn(this)),this.g&&(this.readyState=3,pn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;kc(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function kc(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?fn(this):pn(this),this.readyState==3&&kc(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,fn(this))},n.Qa=function(i){this.g&&(this.response=i,fn(this))},n.ga=function(){this.g&&fn(this)};function fn(i){i.readyState=4,i.l=null,i.j=null,i.v=null,pn(i)}n.setRequestHeader=function(i,a){this.u.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let i=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,i.push(l[0]+": "+l[1]),l=a.next();return i.join(`\r
`)};function pn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(ar.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Rc(i){let a="";return ee(i,function(l,h){a+=h,a+=":",a+=l,a+=`\r
`}),a}function Ui(i,a,l){e:{for(h in l){var h=!1;break e}h=!0}h||(l=Rc(l),typeof i=="string"?l!=null&&encodeURIComponent(String(l)):j(i,a,l))}function G(i){ae.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}x(G,ae);var Bd=/^https?$/i,zd=["POST","PUT"];n=G.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,a,l,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Di.g(),this.v=this.o?rc(this.o):rc(Di),this.g.onreadystatechange=A(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(E){Pc(this,E);return}if(i=l||"",l=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var w in h)l.set(w,h[w]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(let E of h.keys())l.set(E,h.get(E));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(l.keys()).find(E=>E.toLowerCase()=="content-type"),w=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(zd,a,void 0))||h||w||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[E,k]of l)this.g.setRequestHeader(E,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Dc(this),this.u=!0,this.g.send(i),this.u=!1}catch(E){Pc(this,E)}};function Pc(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,Cc(i),cr(i)}function Cc(i){i.A||(i.A=!0,he(i,"complete"),he(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,he(this,"complete"),he(this,"abort"),cr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),cr(this,!0)),G.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?xc(this):this.bb())},n.bb=function(){xc(this)};function xc(i){if(i.h&&typeof c<"u"&&(!i.v[1]||Fe(i)!=4||i.Z()!=2)){if(i.u&&Fe(i)==4)Za(i.Ea,0,i);else if(he(i,"readystatechange"),Fe(i)==4){i.h=!1;try{let k=i.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var l;if(!(l=a)){var h;if(h=k===0){var w=String(i.D).match(bc)[1]||null;!w&&u.self&&u.self.location&&(w=u.self.location.protocol.slice(0,-1)),h=!Bd.test(w?w.toLowerCase():"")}l=h}if(l)he(i,"complete"),he(i,"success");else{i.m=6;try{var E=2<Fe(i)?i.g.statusText:""}catch{E=""}i.l=E+" ["+i.Z()+"]",Cc(i)}}finally{cr(i)}}}}function cr(i,a){if(i.g){Dc(i);let l=i.g,h=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||he(i,"ready");try{l.onreadystatechange=h}catch{}}}function Dc(i){i.I&&(u.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Fe(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Fe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),wd(a)}};function Nc(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function jd(i){let a={};i=(i.g&&2<=Fe(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<i.length;h++){if(K(i[h]))continue;var l=v(i[h]);let w=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();let E=a[w]||[];a[w]=E,E.push(l)}_(a,function(h){return h.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function mn(i,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[i]||a}function Oc(i){this.Aa=0,this.i=[],this.j=new an,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=mn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=mn("baseRetryDelayMs",5e3,i),this.cb=mn("retryDelaySeedMs",1e4,i),this.Wa=mn("forwardChannelMaxRetries",2,i),this.wa=mn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new mc(i&&i.concurrentRequestLimit),this.Da=new Ud,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Oc.prototype,n.la=8,n.G=1,n.connect=function(i,a,l,h){fe(0),this.W=i,this.H=a||{},l&&h!==void 0&&(this.H.OSID=l,this.H.OAID=h),this.F=this.X,this.I=jc(this,null,this.W),ur(this)};function qi(i){if(Lc(i),i.G==3){var a=i.U++,l=Me(i.I);if(j(l,"SID",i.K),j(l,"RID",a),j(l,"TYPE","terminate"),gn(i,l),a=new Ke(i,i.j,a),a.L=2,a.v=or(Me(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&u.Image&&(new Image().src=a.v,l=!0),l||(a.g=$c(a.j,null),a.g.ea(a.v)),a.F=Date.now(),rr(a)}zc(i)}function lr(i){i.g&&(zi(i),i.g.cancel(),i.g=null)}function Lc(i){lr(i),i.u&&(u.clearTimeout(i.u),i.u=null),dr(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function ur(i){if(!gc(i.h)&&!i.s){i.s=!0;var a=i.Ga;Xt||Ka(),Zt||(Xt(),Zt=!0),_i.add(a,i),i.B=0}}function $d(i,a){return yc(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=on(A(i.Ga,i,a),Bc(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;let w=new Ke(this,this.j,i),E=this.o;if(this.S&&(E?(E=p(E),y(E,this.S)):E=this.S),this.m!==null||this.O||(w.H=E,E=null),this.P)e:{for(var a=0,l=0;l<this.i.length;l++){t:{var h=this.i[l];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break t}h=void 0}if(h===void 0)break;if(a+=h,4096<a){a=l;break e}if(a===4096||l===this.i.length-1){a=l+1;break e}}a=1e3}else a=1e3;a=Mc(this,w,a),l=Me(this.I),j(l,"RID",i),j(l,"CVER",22),this.D&&j(l,"X-HTTP-Session-Id",this.D),gn(this,l),E&&(this.O?a="headers="+encodeURIComponent(String(Rc(E)))+"&"+a:this.m&&Ui(l,this.m,E)),Fi(this.h,w),this.Ua&&j(l,"TYPE","init"),this.P?(j(l,"$req",a),j(l,"SID","null"),w.T=!0,Oi(w,l,null)):Oi(w,l,a),this.G=2}}else this.G==3&&(i?Vc(this,i):this.i.length==0||gc(this.h)||Vc(this))};function Vc(i,a){var l;a?l=a.l:l=i.U++;let h=Me(i.I);j(h,"SID",i.K),j(h,"RID",l),j(h,"AID",i.T),gn(i,h),i.m&&i.o&&Ui(h,i.m,i.o),l=new Ke(i,i.j,l,i.B+1),i.m===null&&(l.H=i.o),a&&(i.i=a.D.concat(i.i)),a=Mc(i,l,1e3),l.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Fi(i.h,l),Oi(l,h,a)}function gn(i,a){i.H&&ee(i.H,function(l,h){j(a,h,l)}),i.l&&wc({},function(l,h){j(a,h,l)})}function Mc(i,a,l){l=Math.min(i.i.length,l);var h=i.l?A(i.l.Na,i.l,i):null;e:{var w=i.i;let E=-1;for(;;){let k=["count="+l];E==-1?0<l?(E=w[0].g,k.push("ofs="+E)):E=0:k.push("ofs="+E);let z=!0;for(let ie=0;ie<l;ie++){let q=w[ie].g,ce=w[ie].map;if(q-=E,0>q)E=Math.max(0,w[ie].g-100),z=!1;else try{qd(ce,k,"req"+q+"_")}catch{h&&h(ce)}}if(z){h=k.join("&");break e}}}return i=i.i.splice(0,l),a.D=i,h}function Fc(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;Xt||Ka(),Zt||(Xt(),Zt=!0),_i.add(a,i),i.v=0}}function Bi(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=on(A(i.Fa,i),Bc(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Uc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=on(A(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,fe(10),lr(this),Uc(this))};function zi(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function Uc(i){i.g=new Ke(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=Me(i.qa);j(a,"RID","rpc"),j(a,"SID",i.K),j(a,"AID",i.T),j(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&j(a,"TO",i.ja),j(a,"TYPE","xmlhttp"),gn(i,a),i.m&&i.o&&Ui(a,i.m,i.o),i.L&&(i.g.I=i.L);var l=i.g;i=i.ia,l.L=1,l.v=or(Me(a)),l.m=null,l.P=!0,hc(l,i)}n.Za=function(){this.C!=null&&(this.C=null,lr(this),Bi(this),fe(19))};function dr(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function qc(i,a){var l=null;if(i.g==a){dr(i),zi(i),i.g=null;var h=2}else if(Mi(i.h,a))l=a.D,vc(i.h,a),h=1;else return;if(i.G!=0){if(a.o)if(h==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var w=i.B;h=er(),he(h,new cc(h,l)),ur(i)}else Fc(i);else if(w=a.s,w==3||w==0&&0<a.X||!(h==1&&$d(i,a)||h==2&&Bi(i)))switch(l&&0<l.length&&(a=i.h,a.i=a.i.concat(l)),w){case 1:ct(i,5);break;case 4:ct(i,10);break;case 3:ct(i,6);break;default:ct(i,2)}}}function Bc(i,a){let l=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(l*=2),l*a}function ct(i,a){if(i.j.info("Error code "+a),a==2){var l=A(i.fb,i),h=i.Xa;let w=!h;h=new at(h||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||ir(h,"https"),or(h),w?Md(h.toString(),l):Fd(h.toString(),l)}else fe(2);i.G=0,i.l&&i.l.sa(a),zc(i),Lc(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),fe(2)):(this.j.info("Failed to ping google.com"),fe(1))};function zc(i){if(i.G=0,i.ka=[],i.l){let a=_c(i.h);(a.length!=0||i.i.length!=0)&&(D(i.ka,a),D(i.ka,i.i),i.h.i.length=0,U(i.i),i.i.length=0),i.l.ra()}}function jc(i,a,l){var h=l instanceof at?Me(l):new at(l);if(h.g!="")a&&(h.g=a+"."+h.g),sr(h,h.s);else{var w=u.location;h=w.protocol,a=a?a+"."+w.hostname:w.hostname,w=+w.port;var E=new at(null);h&&ir(E,h),a&&(E.g=a),w&&sr(E,w),l&&(E.l=l),h=E}return l=i.D,a=i.ya,l&&a&&j(h,l,a),j(h,"VER",i.la),gn(i,h),h}function $c(i,a,l){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new G(new hn({eb:l})):new G(i.pa),a.Ha(i.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Gc(){}n=Gc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function hr(){}hr.prototype.g=function(i,a){return new ve(i,a)};function ve(i,a){ae.call(this),this.g=new Oc(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!K(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!K(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new kt(this)}x(ve,ae),ve.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ve.prototype.close=function(){qi(this.g)},ve.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var l={};l.__data__=i,i=l}else this.u&&(l={},l.__data__=Ri(i),i=l);a.i.push(new kd(a.Ya++,i)),a.G==3&&ur(a)},ve.prototype.N=function(){this.g.l=null,delete this.j,qi(this.g),delete this.g,ve.aa.N.call(this)};function Hc(i){Ci.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){e:{for(let l in a){i=l;break e}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}x(Hc,Ci);function Kc(){xi.call(this),this.status=1}x(Kc,xi);function kt(i){this.g=i}x(kt,Gc),kt.prototype.ua=function(){he(this.g,"a")},kt.prototype.ta=function(i){he(this.g,new Hc(i))},kt.prototype.sa=function(i){he(this.g,new Kc)},kt.prototype.ra=function(){he(this.g,"b")},hr.prototype.createWebChannel=hr.prototype.g,ve.prototype.send=ve.prototype.o,ve.prototype.open=ve.prototype.m,ve.prototype.close=ve.prototype.close,Gs=Ge.createWebChannelTransport=function(){return new hr},$s=Ge.getStatEventTarget=function(){return er()},js=Ge.Event=st,Jr=Ge.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},tr.NO_ERROR=0,tr.TIMEOUT=8,tr.HTTP_ERROR=6,Ln=Ge.ErrorCode=tr,lc.COMPLETE="complete",zs=Ge.EventType=lc,ic.EventType=rn,rn.OPEN="a",rn.CLOSE="b",rn.ERROR="c",rn.MESSAGE="d",ae.prototype.listen=ae.prototype.K,Lt=Ge.WebChannel=ic,rm=Ge.FetchXmlHttpFactory=hn,G.prototype.listenOnce=G.prototype.L,G.prototype.getLastError=G.prototype.Ka,G.prototype.getLastErrorCode=G.prototype.Ba,G.prototype.getStatus=G.prototype.Z,G.prototype.getResponseJson=G.prototype.Oa,G.prototype.getResponseText=G.prototype.oa,G.prototype.send=G.prototype.ea,G.prototype.setWithCredentials=G.prototype.Ha,Bs=Ge.XhrIo=G}).apply(typeof Yr<"u"?Yr:typeof self<"u"?self:typeof window<"u"?window:{});var Iu="@firebase/firestore";var se=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};se.UNAUTHENTICATED=new se(null),se.GOOGLE_CREDENTIALS=new se("google-credentials-uid"),se.FIRST_PARTY=new se("first-party-uid"),se.MOCK_USER=new se("mock-user");var Yt="10.14.0";var It=new Ye("@firebase/firestore");function Vn(){return It.logLevel}function N(n,...e){if(It.logLevel<=O.DEBUG){let t=e.map(ra);It.debug(`Firestore (${Yt}): ${n}`,...t)}}function yi(n,...e){if(It.logLevel<=O.ERROR){let t=e.map(ra);It.error(`Firestore (${Yt}): ${n}`,...t)}}function Qs(n,...e){if(It.logLevel<=O.WARN){let t=e.map(ra);It.warn(`Firestore (${Yt}): ${n}`,...t)}}function ra(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function B(n="Unexpected state"){let e=`FIRESTORE (${Yt}) INTERNAL ASSERTION FAILED: `+n;throw yi(e),new Error(e)}function ge(n,e){n||B()}function ye(n,e){return n}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},L=class extends _e{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var wt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var ni=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Ys=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(se.UNAUTHENTICATED))}shutdown(){}},Js=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},Xs=class{constructor(e){this.t=e,this.currentUser=se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ge(this.o===void 0);let r=this.i,s=d=>this.i!==r?(r=this.i,t(d)):Promise.resolve(),o=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new wt,e.enqueueRetryable(()=>s(this.currentUser))};let c=()=>{let d=o;e.enqueueRetryable(async()=>{await d.promise,await s(this.currentUser)})},u=d=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit(d=>u(d)),setTimeout(()=>{if(!this.auth){let d=this.t.getImmediate({optional:!0});d?u(d):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new wt)}},0),c()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ge(typeof r.accessToken=="string"),new ni(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return ge(e===null||typeof e=="string"),new se(e)}},Zs=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=se.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},eo=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Zs(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(se.FIRST_PARTY))}shutdown(){}invalidateToken(){}},to=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},no=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ge(this.o===void 0);let r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);let c=o.token!==this.R;return this.R=o.token,N("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};let s=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){let o=this.A.getImmediate({optional:!0});o?s(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ge(typeof t.token=="string"),this.R=t.token,new to(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function $(n,e){return n<e?-1:n>e?1:0}function Ft(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}var Se=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new L(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var Q=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new Se(0,0))}static max(){return new n(new Se(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var ri=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(),r===void 0?r=e.length-t:r>e.length-t&&B(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let s=0;s<r;s++){let o=e.get(s),c=t.get(s);if(o<c)return-1;if(o>c)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},pe=class n extends ri{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new L(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new n(t)}static emptyPath(){return new n([])}},im=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Ne=class n extends ri{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return im.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",s=0,o=()=>{if(r.length===0)throw new L(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},c=!1;for(;s<e.length;){let u=e[s];if(u==="\\"){if(s+1===e.length)throw new L(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new L(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,s+=2}else u==="`"?(c=!c,s++):u!=="."||c?(r+=u,s++):(o(),s++)}if(o(),c)throw new L(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var F=class n{constructor(e){this.path=e}static fromPath(e){return new n(pe.fromString(e))}static fromName(e){return new n(pe.fromString(e).popFirst(5))}static empty(){return new n(pe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&pe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return pe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new pe(e.slice()))}};var ro=class{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}};ro.UNKNOWN_ID=-1;function sm(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Q.fromTimestamp(r===1e9?new Se(t+1,0):new Se(t,r));return new Et(s,F.empty(),e)}function om(n){return new Et(n.readTime,n.key,-1)}var Et=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(Q.min(),F.empty(),-1)}static max(){return new n(Q.max(),F.empty(),-1)}};function am(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:$(n.largestBatchId,e.largestBatchId))}var io=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};var S=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let s=0,o=0,c=!1;e.forEach(u=>{++s,u.next(()=>{++o,c&&o===s&&t()},d=>r(d))}),c=!0,o===s&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(s=>s?n.resolve(s):r());return t}static forEach(e,t){let r=[];return e.forEach((s,o)=>{r.push(t.call(this,s,o))}),this.waitFor(r)}static mapArray(e,t){return new n((r,s)=>{let o=e.length,c=new Array(o),u=0;for(let d=0;d<o;d++){let f=d;t(e[f]).next(b=>{c[f]=b,++u,u===o&&r(c)},b=>s(b))}})}static doWhile(e,t){return new n((r,s)=>{let o=()=>{e()===!0?t().next(()=>{o()},s):r()};o()})}};function cm(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Bu(n){return n.name==="IndexedDbTransactionError"}var ii=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};ii.oe=-1;function ia(n){return n==null}function si(n){return n===0&&1/n==-1/0}var lm=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],ev=[...lm,"documentOverlays"],um=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],dm=um,hm=[...dm,"indexConfiguration","indexState","indexEntries"];var tv=[...hm,"globals"];function Eu(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function sa(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function fm(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var Ie=class n{constructor(e,t){this.comparator=e,this.root=t||Oe.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Oe.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Oe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Mt(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Mt(this.root,e,this.comparator,!1)}getReverseIterator(){return new Mt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Mt(this.root,e,this.comparator,!0)}},Mt=class{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Oe=class n{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??n.RED,this.left=s??n.EMPTY,this.right=o??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new n(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this,o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return n.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw B();let e=this.left.check();if(e!==this.right.check())throw B();return e+(this.isRed()?0:1)}};Oe.EMPTY=null,Oe.RED=!0,Oe.BLACK=!1;Oe.EMPTY=new class{constructor(){this.size=0}get key(){throw B()}get value(){throw B()}get color(){throw B()}get left(){throw B()}get right(){throw B()}copy(e,t,r,s,o){return this}insert(e,t,r){return new Oe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var me=class n{constructor(e){this.comparator=e,this.data=new Ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new oi(this.data.getIterator())}getIteratorFrom(e){return new oi(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},oi=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var vt=class n{constructor(e){this.fields=e,e.sort(Ne.comparator)}static empty(){return new n([])}unionWith(e){let t=new me(Ne.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ft(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var so=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Tt=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new so("Invalid base64 string: "+o):o}}(e);return new n(t)}static fromUint8Array(e){let t=function(s){let o="";for(let c=0;c<s.length;++c)o+=String.fromCharCode(s[c]);return o}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Tt.EMPTY_BYTE_STRING=new Tt("");var pm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nt(n){if(ge(!!n),typeof n=="string"){let e=0,t=pm.exec(n);if(ge(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:J(n.seconds),nanos:J(n.nanos)}}function J(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ut(n){return typeof n=="string"?Tt.fromBase64String(n):Tt.fromUint8Array(n)}function oa(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function zu(n){let e=n.mapValue.fields.__previous_value__;return oa(e)?zu(e):e}function ai(n){let e=nt(n.mapValue.fields.__local_write_time__.timestampValue);return new Se(e.seconds,e.nanos)}var oo=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Xr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?oa(n)?4:$u(n)?9007199254740991:ju(n)?10:11:B()}function Le(n,e){if(n===e)return!0;let t=qt(n);if(t!==qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ai(n).isEqual(ai(e));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;let c=nt(s.timestampValue),u=nt(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,o){return Ut(s.bytesValue).isEqual(Ut(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,o){return J(s.geoPointValue.latitude)===J(o.geoPointValue.latitude)&&J(s.geoPointValue.longitude)===J(o.geoPointValue.longitude)}(n,e);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return J(s.integerValue)===J(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){let c=J(s.doubleValue),u=J(o.doubleValue);return c===u?si(c)===si(u):isNaN(c)&&isNaN(u)}return!1}(n,e);case 9:return Ft(n.arrayValue.values||[],e.arrayValue.values||[],Le);case 10:case 11:return function(s,o){let c=s.mapValue.fields||{},u=o.mapValue.fields||{};if(Eu(c)!==Eu(u))return!1;for(let d in c)if(c.hasOwnProperty(d)&&(u[d]===void 0||!Le(c[d],u[d])))return!1;return!0}(n,e);default:return B()}}function jn(n,e){return(n.values||[]).find(t=>Le(t,e))!==void 0}function Bt(n,e){if(n===e)return 0;let t=qt(n),r=qt(e);if(t!==r)return $(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,e.booleanValue);case 2:return function(o,c){let u=J(o.integerValue||o.doubleValue),d=J(c.integerValue||c.doubleValue);return u<d?-1:u>d?1:u===d?0:isNaN(u)?isNaN(d)?0:-1:1}(n,e);case 3:return Tu(n.timestampValue,e.timestampValue);case 4:return Tu(ai(n),ai(e));case 5:return $(n.stringValue,e.stringValue);case 6:return function(o,c){let u=Ut(o),d=Ut(c);return u.compareTo(d)}(n.bytesValue,e.bytesValue);case 7:return function(o,c){let u=o.split("/"),d=c.split("/");for(let f=0;f<u.length&&f<d.length;f++){let b=$(u[f],d[f]);if(b!==0)return b}return $(u.length,d.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,c){let u=$(J(o.latitude),J(c.latitude));return u!==0?u:$(J(o.longitude),J(c.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Au(n.arrayValue,e.arrayValue);case 10:return function(o,c){var u,d,f,b;let T=o.fields||{},A=c.fields||{},C=(u=T.value)===null||u===void 0?void 0:u.arrayValue,x=(d=A.value)===null||d===void 0?void 0:d.arrayValue,U=$(((f=C?.values)===null||f===void 0?void 0:f.length)||0,((b=x?.values)===null||b===void 0?void 0:b.length)||0);return U!==0?U:Au(C,x)}(n.mapValue,e.mapValue);case 11:return function(o,c){if(o===Xr.mapValue&&c===Xr.mapValue)return 0;if(o===Xr.mapValue)return 1;if(c===Xr.mapValue)return-1;let u=o.fields||{},d=Object.keys(u),f=c.fields||{},b=Object.keys(f);d.sort(),b.sort();for(let T=0;T<d.length&&T<b.length;++T){let A=$(d[T],b[T]);if(A!==0)return A;let C=Bt(u[d[T]],f[b[T]]);if(C!==0)return C}return $(d.length,b.length)}(n.mapValue,e.mapValue);default:throw B()}}function Tu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return $(n,e);let t=nt(n),r=nt(e),s=$(t.seconds,r.seconds);return s!==0?s:$(t.nanos,r.nanos)}function Au(n,e){let t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){let o=Bt(t[s],r[s]);if(o)return o}return $(t.length,r.length)}function zt(n){return ao(n)}function ao(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=nt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ut(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(let o of t.values||[])s?s=!1:r+=",",r+=ao(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),s="{",o=!0;for(let c of r)o?o=!1:s+=",",s+=`${c}:${ao(t.fields[c])}`;return s+"}"}(n.mapValue):B()}function co(n){return!!n&&"integerValue"in n}function aa(n){return!!n&&"arrayValue"in n}function Hs(n){return!!n&&"mapValue"in n}function ju(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Fn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return sa(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Fn(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Fn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function $u(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var tt=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Hs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fn(t)}setAll(e){let t=Ne.emptyPath(),r={},s=[];e.forEach((c,u)=>{if(!t.isImmediateParentOf(u)){let d=this.getFieldsMap(t);this.applyChanges(d,r,s),r={},s=[],t=u.popLast()}c?r[u.lastSegment()]=Fn(c):s.push(u.lastSegment())});let o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){let t=this.field(e.popLast());Hs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Le(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Hs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){sa(t,(s,o)=>e[s]=o);for(let s of r)delete e[s]}clone(){return new n(Fn(this.value))}};var jt=class n{constructor(e,t,r,s,o,c,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=c,this.documentState=u}static newInvalidDocument(e){return new n(e,0,Q.min(),Q.min(),Q.min(),tt.empty(),0)}static newFoundDocument(e,t,r,s){return new n(e,1,t,Q.min(),r,s,0)}static newNoDocument(e,t){return new n(e,2,t,Q.min(),Q.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,Q.min(),Q.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var $t=class{constructor(e,t){this.position=e,this.inclusive=t}};function Su(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){let o=e[s],c=n.position[s];if(o.field.isKeyField()?r=F.comparator(F.fromName(c.referenceValue),t.key):r=Bt(c,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function ku(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Le(n.position[t],e.position[t]))return!1;return!0}var Gt=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function mm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var ci=class{},re=class n extends ci{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new uo(e,t,r):t==="array-contains"?new po(e,r):t==="in"?new mo(e,r):t==="not-in"?new go(e,r):t==="array-contains-any"?new yo(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ho(e,r):new fo(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Bt(t,this.value)):t!==null&&qt(this.value)===qt(t)&&this.matchesComparison(Bt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},rt=class n extends ci{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return Gu(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function Gu(n){return n.op==="and"}function Hu(n){return gm(n)&&Gu(n)}function gm(n){for(let e of n.filters)if(e instanceof rt)return!1;return!0}function lo(n){if(n instanceof re)return n.field.canonicalString()+n.op.toString()+zt(n.value);if(Hu(n))return n.filters.map(e=>lo(e)).join(",");{let e=n.filters.map(t=>lo(t)).join(",");return`${n.op}(${e})`}}function Ku(n,e){return n instanceof re?function(r,s){return s instanceof re&&r.op===s.op&&r.field.isEqual(s.field)&&Le(r.value,s.value)}(n,e):n instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,c,u)=>o&&Ku(c,s.filters[u]),!0):!1}(n,e):void B()}function Wu(n){return n instanceof re?function(t){return`${t.field.canonicalString()} ${t.op} ${zt(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(Wu).join(" ,")+"}"}(n):"Filter"}var uo=class extends re{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){let t=F.comparator(e.key,this.key);return this.matchesComparison(t)}},ho=class extends re{constructor(e,t){super(e,"in",t),this.keys=Qu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},fo=class extends re{constructor(e,t){super(e,"not-in",t),this.keys=Qu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Qu(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>F.fromName(r.referenceValue))}var po=class extends re{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return aa(t)&&jn(t.arrayValue,this.value)}},mo=class extends re{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&jn(this.value.arrayValue,t)}},go=class extends re{constructor(e,t){super(e,"not-in",t)}matches(e){if(jn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!jn(this.value.arrayValue,t)}},yo=class extends re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!aa(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>jn(this.value.arrayValue,r))}};var vo=class{constructor(e,t=null,r=[],s=[],o=null,c=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=c,this.endAt=u,this.ue=null}};function Ru(n,e=null,t=[],r=[],s=null,o=null,c=null){return new vo(n,e,t,r,s,o,c)}function ca(n){let e=ye(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>lo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),ia(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>zt(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>zt(r)).join(",")),e.ue=t}return e.ue}function la(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!mm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ku(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ku(n.startAt,e.startAt)&&ku(n.endAt,e.endAt)}var $n=class{constructor(e,t=null,r=[],s=[],o=null,c="F",u=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=c,this.startAt=u,this.endAt=d,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function ym(n,e,t,r,s,o,c,u){return new $n(n,e,t,r,s,o,c,u)}function Pu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function vm(n){return n.collectionGroup!==null}function Un(n){let e=ye(n);if(e.ce===null){e.ce=[];let t=new Set;for(let o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(c){let u=new me(Ne.comparator);return c.filters.forEach(d=>{d.getFlattenedFilters().forEach(f=>{f.isInequality()&&(u=u.add(f.field))})}),u})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new Gt(o,r))}),t.has(Ne.keyField().canonicalString())||e.ce.push(new Gt(Ne.keyField(),r))}return e.ce}function bt(n){let e=ye(n);return e.le||(e.le=_m(e,Un(n))),e.le}function _m(n,e){if(n.limitType==="F")return Ru(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{let o=s.dir==="desc"?"asc":"desc";return new Gt(s.field,o)});let t=n.endAt?new $t(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new $t(n.startAt.position,n.startAt.inclusive):null;return Ru(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function _o(n,e,t){return new $n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Yu(n,e){return la(bt(n),bt(e))&&n.limitType===e.limitType}function Ju(n){return`${ca(bt(n))}|lt:${n.limitType}`}function Mn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Wu(s)).join(", ")}]`),ia(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(c){return`${c.field.canonicalString()} (${c.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>zt(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>zt(s)).join(",")),`Target(${r})`}(bt(n))}; limitType=${n.limitType})`}function ua(n,e){return e.isFoundDocument()&&function(r,s){let o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):F.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,s){for(let o of Un(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,s){for(let o of r.filters)if(!o.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(c,u,d){let f=Su(c,u,d);return c.inclusive?f<=0:f<0}(r.startAt,Un(r),s)||r.endAt&&!function(c,u,d){let f=Su(c,u,d);return c.inclusive?f>=0:f>0}(r.endAt,Un(r),s))}(n,e)}function wm(n){return(e,t)=>{let r=!1;for(let s of Un(n)){let o=bm(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function bm(n,e,t){let r=n.field.isKeyField()?F.comparator(e.key,t.key):function(o,c,u){let d=c.data.field(o),f=u.data.field(o);return d!==null&&f!==null?Bt(d,f):B()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B()}}var it=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){sa(this.inner,(t,r)=>{for(let[s,o]of r)e(s,o)})}isEmpty(){return fm(this.inner)}size(){return this.innerSize}};var Im=new Ie(F.comparator);function wo(){return Im}var Xu=new Ie(F.comparator);function Zr(...n){let e=Xu;for(let t of n)e=e.insert(t.key,t);return e}function Em(n){let e=Xu;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function _t(){return qn()}function Zu(){return qn()}function qn(){return new it(n=>n.toString(),(n,e)=>n.isEqual(e))}var rv=new Ie(F.comparator),Tm=new me(F.comparator);function we(...n){let e=Tm;for(let t of n)e=e.add(t);return e}var Am=new me($);function Sm(){return Am}function km(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:si(e)?"-0":e}}function Rm(n){return{integerValue:""+n}}var Ht=class{constructor(){this._=void 0}};function Pm(n,e,t){return n instanceof Gn?function(s,o){let c={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&oa(o)&&(o=zu(o)),o&&(c.fields.__previous_value__=o),{mapValue:c}}(t,e):n instanceof Kt?ed(n,e):n instanceof Wt?td(n,e):function(s,o){let c=xm(s,o),u=Cu(c)+Cu(s.Pe);return co(c)&&co(s.Pe)?Rm(u):km(s.serializer,u)}(n,e)}function Cm(n,e,t){return n instanceof Kt?ed(n,e):n instanceof Wt?td(n,e):t}function xm(n,e){return n instanceof Hn?function(r){return co(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}var Gn=class extends Ht{},Kt=class extends Ht{constructor(e){super(),this.elements=e}};function ed(n,e){let t=nd(e);for(let r of n.elements)t.some(s=>Le(s,r))||t.push(r);return{arrayValue:{values:t}}}var Wt=class extends Ht{constructor(e){super(),this.elements=e}};function td(n,e){let t=nd(e);for(let r of n.elements)t=t.filter(s=>!Le(s,r));return{arrayValue:{values:t}}}var Hn=class extends Ht{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function Cu(n){return J(n.integerValue||n.doubleValue)}function nd(n){return aa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Dm(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Kt&&s instanceof Kt||r instanceof Wt&&s instanceof Wt?Ft(r.elements,s.elements,Le):r instanceof Hn&&s instanceof Hn?Le(r.Pe,s.Pe):r instanceof Gn&&s instanceof Gn}(n.transform,e.transform)}var Bn=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function ti(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Kn=class{};function rd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new bo(n.key,Bn.none()):new Wn(n.key,n.data,Bn.none());{let t=n.data,r=tt.empty(),s=new me(Ne.comparator);for(let o of e.fields)if(!s.has(o)){let c=t.field(o);c===null&&o.length>1&&(o=o.popLast(),c=t.field(o)),c===null?r.delete(o):r.set(o,c),s=s.add(o)}return new Qt(n.key,r,new vt(s.toArray()),Bn.none())}}function Nm(n,e,t){n instanceof Wn?function(s,o,c){let u=s.value.clone(),d=Du(s.fieldTransforms,o,c.transformResults);u.setAll(d),o.convertToFoundDocument(c.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Qt?function(s,o,c){if(!ti(s.precondition,o))return void o.convertToUnknownDocument(c.version);let u=Du(s.fieldTransforms,o,c.transformResults),d=o.data;d.setAll(id(s)),d.setAll(u),o.convertToFoundDocument(c.version,d).setHasCommittedMutations()}(n,e,t):function(s,o,c){o.convertToNoDocument(c.version).setHasCommittedMutations()}(0,e,t)}function zn(n,e,t,r){return n instanceof Wn?function(o,c,u,d){if(!ti(o.precondition,c))return u;let f=o.value.clone(),b=Nu(o.fieldTransforms,d,c);return f.setAll(b),c.convertToFoundDocument(c.version,f).setHasLocalMutations(),null}(n,e,t,r):n instanceof Qt?function(o,c,u,d){if(!ti(o.precondition,c))return u;let f=Nu(o.fieldTransforms,d,c),b=c.data;return b.setAll(id(o)),b.setAll(f),c.convertToFoundDocument(c.version,b).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(T=>T.field))}(n,e,t,r):function(o,c,u){return ti(o.precondition,c)?(c.convertToNoDocument(c.version).setHasLocalMutations(),null):u}(n,e,t)}function xu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ft(r,s,(o,c)=>Dm(o,c))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Wn=class extends Kn{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},Qt=class extends Kn{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}};function id(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function Du(n,e,t){let r=new Map;ge(n.length===t.length);for(let s=0;s<t.length;s++){let o=n[s],c=o.transform,u=e.data.field(o.field);r.set(o.field,Cm(c,u,t[s]))}return r}function Nu(n,e,t){let r=new Map;for(let s of n){let o=s.transform,c=t.data.field(s.field);r.set(s.field,Pm(o,c,e))}return r}var bo=class extends Kn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}};var Io=class{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let o=this.mutations[s];o.key.isEqual(e.key)&&Nm(o,e,r[s])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=zn(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=zn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Zu();return this.mutations.forEach(s=>{let o=e.get(s.key),c=o.overlayedDocument,u=this.applyToLocalView(c,o.mutatedFields);u=t.has(s.key)?null:u;let d=rd(c,u);d!==null&&r.set(s.key,d),c.isValidDocument()||c.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),we())}isEqual(e){return this.batchId===e.batchId&&Ft(this.mutations,e.mutations,(t,r)=>xu(t,r))&&Ft(this.baseMutations,e.baseMutations,(t,r)=>xu(t,r))}};var Eo=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var W,V;function Om(n){if(n===void 0)return yi("GRPC error has no .code"),P.UNKNOWN;switch(n){case W.OK:return P.OK;case W.CANCELLED:return P.CANCELLED;case W.UNKNOWN:return P.UNKNOWN;case W.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case W.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case W.INTERNAL:return P.INTERNAL;case W.UNAVAILABLE:return P.UNAVAILABLE;case W.UNAUTHENTICATED:return P.UNAUTHENTICATED;case W.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case W.NOT_FOUND:return P.NOT_FOUND;case W.ALREADY_EXISTS:return P.ALREADY_EXISTS;case W.PERMISSION_DENIED:return P.PERMISSION_DENIED;case W.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case W.ABORTED:return P.ABORTED;case W.OUT_OF_RANGE:return P.OUT_OF_RANGE;case W.UNIMPLEMENTED:return P.UNIMPLEMENTED;case W.DATA_LOSS:return P.DATA_LOSS;default:return B()}}(V=W||(W={}))[V.OK=0]="OK",V[V.CANCELLED=1]="CANCELLED",V[V.UNKNOWN=2]="UNKNOWN",V[V.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",V[V.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",V[V.NOT_FOUND=5]="NOT_FOUND",V[V.ALREADY_EXISTS=6]="ALREADY_EXISTS",V[V.PERMISSION_DENIED=7]="PERMISSION_DENIED",V[V.UNAUTHENTICATED=16]="UNAUTHENTICATED",V[V.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",V[V.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",V[V.ABORTED=10]="ABORTED",V[V.OUT_OF_RANGE=11]="OUT_OF_RANGE",V[V.UNIMPLEMENTED=12]="UNIMPLEMENTED",V[V.INTERNAL=13]="INTERNAL",V[V.UNAVAILABLE=14]="UNAVAILABLE",V[V.DATA_LOSS=15]="DATA_LOSS";var iv=new qs([4294967295,4294967295],0);var To=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function Ou(n){return ge(!!n),Q.fromTimestamp(function(t){let r=nt(t);return new Se(r.seconds,r.nanos)}(n))}function Lu(n,e){let t=function(s){return new pe(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Lm(n){let e=pe.fromString(n);return ge(Um(e)),e}function Vm(n){let e=Lm(n);return e.length===4?pe.emptyPath():Mm(e)}function Mm(n){return ge(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Fm(n){let e=Vm(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,s=null;if(r>0){ge(r===1);let b=t.from[0];b.allDescendants?s=b.collectionId:e=e.child(b.collectionId)}let o=[];t.where&&(o=function(T){let A=sd(T);return A instanceof rt&&Hu(A)?A.getFilters():[A]}(t.where));let c=[];t.orderBy&&(c=function(T){return T.map(A=>function(x){return new Gt(Vt(x.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(A))}(t.orderBy));let u=null;t.limit&&(u=function(T){let A;return A=typeof T=="object"?T.value:T,ia(A)?null:A}(t.limit));let d=null;t.startAt&&(d=function(T){let A=!!T.before,C=T.values||[];return new $t(C,A)}(t.startAt));let f=null;return t.endAt&&(f=function(T){let A=!T.before,C=T.values||[];return new $t(C,A)}(t.endAt)),ym(e,s,c,o,u,"F",d,f)}function sd(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Vt(t.unaryFilter.field);return re.create(r,"==",{doubleValue:NaN});case"IS_NULL":let s=Vt(t.unaryFilter.field);return re.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let o=Vt(t.unaryFilter.field);return re.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let c=Vt(t.unaryFilter.field);return re.create(c,"!=",{nullValue:"NULL_VALUE"});default:return B()}}(n):n.fieldFilter!==void 0?function(t){return re.create(Vt(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return B()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(r=>sd(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B()}}(t.compositeFilter.op))}(n):B()}function Vt(n){return Ne.fromServerFormat(n.fieldPath)}function Um(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var Ao=class{constructor(e){this.ct=e}};function qm(n){let e=Fm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?_o(e,e.limit,"L"):e}var li=class{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(J(e.integerValue));else if("doubleValue"in e){let r=J(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),si(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=nt(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Ut(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?$u(e)?this.dt(t,Number.MAX_SAFE_INTEGER):ju(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):B()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){let r=e.fields||{};this.dt(t,55);for(let s of Object.keys(r))this.Vt(s,t),this.Tt(r[s],t)}wt(e,t){var r,s;let o=e.fields||{};this.dt(t,53);let c="value",u=((s=(r=o[c].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.dt(t,15),t.At(J(u)),this.Vt(c,t),this.Tt(o[c],t)}bt(e,t){let r=e.values||[];this.dt(t,50);for(let s of r)this.Tt(s,t)}yt(e,t){this.dt(t,37),F.fromName(e).path.forEach(r=>{this.dt(t,60),this.Dt(r,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}};li.vt=new li;var So=class{constructor(){this.un=new ko}addToCollectionParentIndex(e,t){return this.un.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(Et.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(Et.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}},ko=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new me(pe.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new me(pe.comparator)).toArray()}};var sv=new Uint8Array(0);var De=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};De.DEFAULT_COLLECTION_PERCENTILE=10,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,De.DEFAULT=new De(41943040,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),De.DISABLED=new De(-1,0,0);var Qn=class n{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new n(0)}static kn(){return new n(-1)}};var Ro=class{constructor(){this.changes=new it(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,jt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Po=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var Co=class{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&zn(r.mutation,s,vt.empty(),Se.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,we()).next(()=>r))}getLocalViewOfDocuments(e,t,r=we()){let s=_t();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(o=>{let c=Zr();return o.forEach((u,d)=>{c=c.insert(u,d.overlayedDocument)}),c}))}getOverlayedDocuments(e,t){let r=_t();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,we()))}populateOverlays(e,t,r){let s=[];return r.forEach(o=>{t.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(e,s).next(o=>{o.forEach((c,u)=>{t.set(c,u)})})}computeViews(e,t,r,s){let o=wo(),c=qn(),u=function(){return qn()}();return t.forEach((d,f)=>{let b=r.get(f.key);s.has(f.key)&&(b===void 0||b.mutation instanceof Qt)?o=o.insert(f.key,f):b!==void 0?(c.set(f.key,b.mutation.getFieldMask()),zn(b.mutation,f,b.mutation.getFieldMask(),Se.now())):c.set(f.key,vt.empty())}),this.recalculateAndSaveOverlays(e,o).next(d=>(d.forEach((f,b)=>c.set(f,b)),t.forEach((f,b)=>{var T;return u.set(f,new Po(b,(T=c.get(f))!==null&&T!==void 0?T:null))}),u))}recalculateAndSaveOverlays(e,t){let r=qn(),s=new Ie((c,u)=>c-u),o=we();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(c=>{for(let u of c)u.keys().forEach(d=>{let f=t.get(d);if(f===null)return;let b=r.get(d)||vt.empty();b=u.applyToLocalView(f,b),r.set(d,b);let T=(s.get(u.batchId)||we()).add(d);s=s.insert(u.batchId,T)})}).next(()=>{let c=[],u=s.getReverseIterator();for(;u.hasNext();){let d=u.getNext(),f=d.key,b=d.value,T=Zu();b.forEach(A=>{if(!o.has(A)){let C=rd(t.get(A),r.get(A));C!==null&&T.set(A,C),o=o.add(A)}}),c.push(this.documentOverlayCache.saveOverlays(e,f,T))}return S.waitFor(c)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(c){return F.isDocumentKey(c.path)&&c.collectionGroup===null&&c.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):vm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(o=>{let c=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):S.resolve(_t()),u=-1,d=o;return c.next(f=>S.forEach(f,(b,T)=>(u<T.largestBatchId&&(u=T.largestBatchId),o.get(b)?S.resolve():this.remoteDocumentCache.getEntry(e,b).next(A=>{d=d.insert(b,A)}))).next(()=>this.populateOverlays(e,f,o)).next(()=>this.computeViews(e,d,f,we())).next(b=>({batchId:u,changes:Em(b)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let s=Zr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){let o=t.collectionGroup,c=Zr();return this.indexManager.getCollectionParents(e,o).next(u=>S.forEach(u,d=>{let f=function(T,A){return new $n(A,null,T.explicitOrderBy.slice(),T.filters.slice(),T.limit,T.limitType,T.startAt,T.endAt)}(t,d.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next(b=>{b.forEach((T,A)=>{c=c.insert(T,A)})})}).next(()=>c))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(c=>(o=c,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s))).next(c=>{o.forEach((d,f)=>{let b=f.getKey();c.get(b)===null&&(c=c.insert(b,jt.newInvalidDocument(b)))});let u=Zr();return c.forEach((d,f)=>{let b=o.get(d);b!==void 0&&zn(b.mutation,f,vt.empty(),Se.now()),ua(t,f)&&(u=u.insert(d,f))}),u})}};var xo=class{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return S.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ou(s.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:qm(s.bundledQuery),readTime:Ou(s.readTime)}}(t)),S.resolve()}};var Do=class{constructor(){this.overlays=new Ie(F.comparator),this.Ir=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){let r=_t();return S.forEach(t,s=>this.getOverlay(e,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,o)=>{this.ht(e,t,o)}),S.resolve()}removeOverlaysForBatchId(e,t,r){let s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){let s=_t(),o=t.length+1,c=new F(t.child("")),u=this.overlays.getIteratorFrom(c);for(;u.hasNext();){let d=u.getNext().value,f=d.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&d.largestBatchId>r&&s.set(d.getKey(),d)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new Ie((f,b)=>f-b),c=this.overlays.getIterator();for(;c.hasNext();){let f=c.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let b=o.get(f.largestBatchId);b===null&&(b=_t(),o=o.insert(f.largestBatchId,b)),b.set(f.getKey(),f)}}let u=_t(),d=o.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((f,b)=>u.set(f,b)),!(u.size()>=s)););return S.resolve(u)}ht(e,t,r){let s=this.overlays.get(r.key);if(s!==null){let c=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,c)}this.overlays=this.overlays.insert(r.key,new Eo(t,r));let o=this.Ir.get(t);o===void 0&&(o=we(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}};var No=class{constructor(){this.sessionToken=Tt.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}};var Yn=class{constructor(){this.Tr=new me(Y.Er),this.dr=new me(Y.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){let r=new Y(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new Y(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){let t=new F(new pe([])),r=new Y(t,e),s=new Y(t,e+1),o=[];return this.dr.forEachInRange([r,s],c=>{this.Vr(c),o.push(c.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){let t=new F(new pe([])),r=new Y(t,e),s=new Y(t,e+1),o=we();return this.dr.forEachInRange([r,s],c=>{o=o.add(c.key)}),o}containsKey(e){let t=new Y(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},Y=class{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return F.comparator(e.key,t.key)||$(e.wr,t.wr)}static Ar(e,t){return $(e.wr,t.wr)||F.comparator(e.key,t.key)}};var Oo=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new me(Y.Er)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){let o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let c=new Io(o,t,r,s);this.mutationQueue.push(c);for(let u of s)this.br=this.br.add(new Y(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return S.resolve(c)}lookupMutationBatch(e,t){return S.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,s=this.vr(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new Y(t,0),s=new Y(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],c=>{let u=this.Dr(c.wr);o.push(u)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new me($);return t.forEach(s=>{let o=new Y(s,0),c=new Y(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,c],u=>{r=r.add(u.wr)})}),S.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,s=r.length+1,o=r;F.isDocumentKey(o)||(o=o.child(""));let c=new Y(new F(o),0),u=new me($);return this.br.forEachWhile(d=>{let f=d.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(u=u.add(d.wr)),!0)},c),S.resolve(this.Cr(u))}Cr(e){let t=[];return e.forEach(r=>{let s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ge(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return S.forEach(t.mutations,s=>{let o=new Y(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){let r=new Y(t,0),s=this.br.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){let t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Lo=class{constructor(e){this.Mr=e,this.docs=function(){return new Ie(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,s=this.docs.get(r),o=s?s.size:0,c=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:c}),this.size+=c-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():jt.newInvalidDocument(t))}getEntries(e,t){let r=wo();return t.forEach(s=>{let o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():jt.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=wo(),c=t.path,u=new F(c.child("")),d=this.docs.getIteratorFrom(u);for(;d.hasNext();){let{key:f,value:{document:b}}=d.getNext();if(!c.isPrefixOf(f.path))break;f.path.length>c.length+1||am(om(b),r)<=0||(s.has(b.key)||ua(t,b))&&(o=o.insert(b.key,b.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(e,t,r,s){B()}Or(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Vo(this)}getSize(e){return S.resolve(this.size)}},Vo=class extends Ro{constructor(e){super(),this.cr=e}applyChanges(e){let t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}};var Mo=class{constructor(e){this.persistence=e,this.Nr=new it(t=>ca(t),la),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Yn,this.targetCount=0,this.kr=Qn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),S.resolve()}Kn(e){this.Nr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.kr=new Qn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.Kn(t),S.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0,o=[];return this.Nr.forEach((c,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Nr.delete(c),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){let r=this.Nr.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);let s=this.persistence.referenceDelegate,o=[];return s&&t.forEach(c=>{o.push(s.markPotentiallyOrphaned(e,c))}),S.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Br.yr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.Br.containsKey(t))}};var Fo=class{constructor(e,t){this.qr={},this.overlays={},this.Qr=new ii(0),this.Kr=!1,this.Kr=!0,this.$r=new No,this.referenceDelegate=e(this),this.Ur=new Mo(this),this.indexManager=new So,this.remoteDocumentCache=function(s){return new Lo(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Ao(t),this.Gr=new xo(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Do,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Oo(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);let s=new Uo(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(e,t){return S.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}},Uo=class extends io{constructor(e){super(),this.currentSequenceNumber=e}},qo=class n{constructor(e){this.persistence=e,this.Jr=new Yn,this.Yr=null}static Zr(e){return new n(e)}get Xr(){if(this.Yr)return this.Yr;throw B()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),S.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Xr,r=>{let s=F.fromPath(r);return this.ei(e,s).next(o=>{o||t.removeEntry(s,Q.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return S.or([()=>S.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}};var Bo=class n{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=we(),s=we();for(let o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new n(e,t.fromCache,r,s)}};var zo=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var jo=class{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return il()?8:cm(te())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){let o={result:null};return this.Yi(e,t).next(c=>{o.result=c}).next(()=>{if(!o.result)return this.Zi(e,t,s,r).next(c=>{o.result=c})}).next(()=>{if(o.result)return;let c=new zo;return this.Xi(e,t,c).next(u=>{if(o.result=u,this.zi)return this.es(e,t,c,u.size)})}).next(()=>o.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(Vn()<=O.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Mn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),S.resolve()):(Vn()<=O.DEBUG&&N("QueryEngine","Query:",Mn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Vn()<=O.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Mn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,bt(t))):S.resolve())}Yi(e,t){if(Pu(t))return S.resolve(null);let r=bt(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=_o(t,null,"F"),r=bt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{let c=we(...o);return this.Ji.getDocuments(e,c).next(u=>this.indexManager.getMinOffset(e,r).next(d=>{let f=this.ts(t,u);return this.ns(t,f,c,d.readTime)?this.Yi(e,_o(t,null,"F")):this.rs(e,f,t,d)}))})))}Zi(e,t,r,s){return Pu(t)||s.isEqual(Q.min())?S.resolve(null):this.Ji.getDocuments(e,r).next(o=>{let c=this.ts(t,o);return this.ns(t,c,r,s)?S.resolve(null):(Vn()<=O.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Mn(t)),this.rs(e,c,t,sm(s,-1)).next(u=>u))})}ts(e,t){let r=new me(wm(e));return t.forEach((s,o)=>{ua(e,o)&&(r=r.add(o))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(e,t,r){return Vn()<=O.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Mn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Et.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(o=>(t.forEach(c=>{o=o.insert(c.key,c)}),o))}};var $o=class{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new Ie($),this._s=new it(o=>ca(o),la),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Co(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}};function Bm(n,e,t,r){return new $o(n,e,t,r)}async function zm(n,e){let t=ye(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{let c=[],u=[],d=we();for(let f of s){c.push(f.batchId);for(let b of f.mutations)d=d.add(b.key)}for(let f of o){u.push(f.batchId);for(let b of f.mutations)d=d.add(b.key)}return t.localDocuments.getDocuments(r,d).next(f=>({hs:f,removedBatchIds:c,addedBatchIds:u}))})})}var ui=class{constructor(){this.activeTargetIds=Sm()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Go=class{constructor(){this.so=new ui,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new ui,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Ho=class{_o(e){}shutdown(){}};var di=class{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){N("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.ho)e(0)}lo(){N("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var ei=null;function Ks(){return ei===null?ei=function(){return 268435456+Math.round(2147483648*Math.random())}():ei++,"0x"+ei.toString(16)}var jm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Ko=class{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}};var de="WebChannelConnection",Wo=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(t,r,s,o,c){let u=Ks(),d=this.xo(t,r.toUriEncodedString());N("RestConnection",`Sending RPC '${t}' ${u}:`,d,s);let f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,c),this.No(t,d,f,s).then(b=>(N("RestConnection",`Received RPC '${t}' ${u}: `,b),b),b=>{throw Qs("RestConnection",`RPC '${t}' ${u} failed with error: `,b,"url: ",d,"request:",s),b})}Lo(t,r,s,o,c,u){return this.Mo(t,r,s,o,c)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Yt}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,c)=>t[c]=o),s&&s.headers.forEach((o,c)=>t[c]=o)}xo(t,r){let s=jm[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){let o=Ks();return new Promise((c,u)=>{let d=new Bs;d.setWithCredentials(!0),d.listenOnce(zs.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Ln.NO_ERROR:let b=d.getResponseJson();N(de,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(b)),c(b);break;case Ln.TIMEOUT:N(de,`RPC '${e}' ${o} timed out`),u(new L(P.DEADLINE_EXCEEDED,"Request time out"));break;case Ln.HTTP_ERROR:let T=d.getStatus();if(N(de,`RPC '${e}' ${o} failed with status:`,T,"response text:",d.getResponseText()),T>0){let A=d.getResponseJson();Array.isArray(A)&&(A=A[0]);let C=A?.error;if(C&&C.status&&C.message){let x=function(D){let Z=D.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(Z)>=0?Z:P.UNKNOWN}(C.status);u(new L(x,C.message))}else u(new L(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new L(P.UNAVAILABLE,"Connection failed."));break;default:B()}}finally{N(de,`RPC '${e}' ${o} completed.`)}});let f=JSON.stringify(s);N(de,`RPC '${e}' ${o} sending request:`,s),d.send(t,"POST",f,r,15)})}Bo(e,t,r){let s=Ks(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],c=Gs(),u=$s(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(d.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Oo(d.initMessageHeaders,t,r),d.encodeInitMessageHeaders=!0;let b=o.join("");N(de,`Creating RPC '${e}' stream ${s}: ${b}`,d);let T=c.createWebChannel(b,d),A=!1,C=!1,x=new Ko({Io:D=>{C?N(de,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(A||(N(de,`Opening RPC '${e}' stream ${s} transport.`),T.open(),A=!0),N(de,`RPC '${e}' stream ${s} sending:`,D),T.send(D))},To:()=>T.close()}),U=(D,Z,K)=>{D.listen(Z,H=>{try{K(H)}catch(X){setTimeout(()=>{throw X},0)}})};return U(T,Lt.EventType.OPEN,()=>{C||(N(de,`RPC '${e}' stream ${s} transport opened.`),x.yo())}),U(T,Lt.EventType.CLOSE,()=>{C||(C=!0,N(de,`RPC '${e}' stream ${s} transport closed`),x.So())}),U(T,Lt.EventType.ERROR,D=>{C||(C=!0,Qs(de,`RPC '${e}' stream ${s} transport errored:`,D),x.So(new L(P.UNAVAILABLE,"The operation could not be completed")))}),U(T,Lt.EventType.MESSAGE,D=>{var Z;if(!C){let K=D.data[0];ge(!!K);let H=K,X=H.error||((Z=H[0])===null||Z===void 0?void 0:Z.error);if(X){N(de,`RPC '${e}' stream ${s} received error:`,X);let ke=X.status,ee=function(g){let y=W[g];if(y!==void 0)return Om(y)}(ke),_=X.message;ee===void 0&&(ee=P.INTERNAL,_="Unknown error status: "+ke+" with message "+X.message),C=!0,x.So(new L(ee,_)),T.close()}else N(de,`RPC '${e}' stream ${s} received:`,K),x.bo(K)}}),U(u,js.STAT_EVENT,D=>{D.stat===Jr.PROXY?N(de,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===Jr.NOPROXY&&N(de,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{x.wo()},0),x}};function Ws(){return typeof document<"u"?document:null}function od(n){return new To(n,!0)}var Qo=class{constructor(e,t,r=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();let t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}};var Yo=class extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new L(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Mo(e,Lu(t,r),s,o,c)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new L(P.UNKNOWN,o.toString())})}Lo(e,t,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([c,u])=>this.connection.Lo(e,Lu(t,r),s,c,u,o)).catch(c=>{throw c.name==="FirebaseError"?(c.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new L(P.UNKNOWN,c.toString())})}terminate(){this.y_=!0,this.connection.terminate()}},Jo=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(yi(t),this.D_=!1):N("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}};var Xo=class{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(c=>{r.enqueueAndForget(async()=>{cd(this)&&(N("RemoteStore","Restarting streams for network reachability change."),await async function(d){let f=ye(d);f.L_.add(4),await da(f),f.q_.set("Unknown"),f.L_.delete(4),await ad(f)}(this))})}),this.q_=new Jo(r,s)}};async function ad(n){if(cd(n))for(let e of n.B_)await e(!0)}async function da(n){for(let e of n.B_)await e(!1)}function cd(n){return ye(n).L_.size===0}async function $m(n,e){let t=ye(n);e?(t.L_.delete(2),await ad(t)):e||(t.L_.add(2),await da(t),t.q_.set("Unknown"))}var Zo=class n{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(c=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){let c=Date.now()+r,u=new n(e,t,c,s,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};var ea=class{constructor(){this.queries=Vu(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){let s=ye(t),o=s.queries;s.queries=Vu(),o.forEach((c,u)=>{for(let d of u.j_)d.onError(r)})})(this,new L(P.ABORTED,"Firestore shutting down"))}};function Vu(){return new it(n=>Ju(n),Yu)}function Gm(n){n.Y_.forEach(e=>{e.next()})}var Mu,Fu;(Fu=Mu||(Mu={})).ea="default",Fu.Cache="cache";var ta=class{constructor(e,t,r,s,o,c){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=c,this.Ca={},this.Fa=new it(u=>Ju(u),Yu),this.Ma=new Map,this.xa=new Set,this.Oa=new Ie(F.comparator),this.Na=new Map,this.La=new Yn,this.Ba={},this.ka=new Map,this.qa=Qn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}};function Uu(n,e,t){let r=ye(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let s=[];r.Fa.forEach((o,c)=>{let u=c.view.Z_(e);u.snapshot&&s.push(u.snapshot)}),function(c,u){let d=ye(c);d.onlineState=u;let f=!1;d.queries.forEach((b,T)=>{for(let A of T.j_)A.Z_(u)&&(f=!0)}),f&&Gm(d)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Hm(n,e,t){let r=ye(n),s=[],o=[],c=[];r.Fa.isEmpty()||(r.Fa.forEach((u,d)=>{c.push(r.Ka(d,e,t).then(f=>{var b;if((f||t)&&r.isPrimaryClient){let T=f?!f.fromCache:(b=t?.targetChanges.get(d.targetId))===null||b===void 0?void 0:b.current;r.sharedClientState.updateQueryState(d.targetId,T?"current":"not-current")}if(f){s.push(f);let T=Bo.Wi(d.targetId,f);o.push(T)}}))}),await Promise.all(c),r.Ca.d_(s),await async function(d,f){let b=ye(d);try{await b.persistence.runTransaction("notifyLocalViewChanges","readwrite",T=>S.forEach(f,A=>S.forEach(A.$i,C=>b.persistence.referenceDelegate.addReference(T,A.targetId,C)).next(()=>S.forEach(A.Ui,C=>b.persistence.referenceDelegate.removeReference(T,A.targetId,C)))))}catch(T){if(!Bu(T))throw T;N("LocalStore","Failed to update sequence numbers: "+T)}for(let T of f){let A=T.targetId;if(!T.fromCache){let C=b.os.get(A),x=C.snapshotVersion,U=C.withLastLimboFreeSnapshotVersion(x);b.os=b.os.insert(A,U)}}}(r.localStore,o))}async function Km(n,e){let t=ye(n);if(!t.currentUser.isEqual(e)){N("SyncEngine","User change. New user:",e.toKey());let r=await zm(t.localStore,e);t.currentUser=e,function(o,c){o.ka.forEach(u=>{u.forEach(d=>{d.reject(new L(P.CANCELLED,c))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Hm(t,r.hs)}}var hi=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=od(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Bm(this.persistence,new jo,e.initialUser,this.serializer)}Ga(e){return new Fo(qo.Zr,this.serializer)}Wa(e){return new Go}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};hi.provider={build:()=>new hi};var fi=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Uu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Km.bind(null,this.syncEngine),await $m(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ea}()}createDatastore(e){let t=od(e.databaseInfo.databaseId),r=function(o){return new Wo(o)}(e.databaseInfo);return function(o,c,u,d){return new Yo(o,c,u,d)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,o,c,u){return new Xo(r,s,o,c,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Uu(this.syncEngine,t,0),function(){return di.D()?new di:new Ho}())}createSyncEngine(e,t){return function(s,o,c,u,d,f,b){let T=new ta(s,o,c,u,d,f);return b&&(T.Qa=!0),T}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){let o=ye(s);N("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await da(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};fi.provider={build:()=>new fi};function Wm(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var qu=new Map;function Qm(n,e,t,r){if(e===!0&&r===!0)throw new L(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ym(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B()}function Jm(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new L(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Ym(n);throw new L(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}var pi=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new L(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new L(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Qm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Wm((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new L(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new L(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new L(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},mi=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pi({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pi(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ys;switch(r.type){case"firstParty":return new eo(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new L(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=qu.get(t);r&&(N("ComponentProvider","Removing Datastore"),qu.delete(t),r.terminate())}(this),Promise.resolve()}};function Xm(n,e,t,r={}){var s;let o=(n=Jm(n,mi))._getSettings(),c=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==c&&Qs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:c,ssl:!1})),r.mockUserToken){let u,d;if(typeof r.mockUserToken=="string")u=r.mockUserToken,d=se.MOCK_USER;else{u=Xc(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);let f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new L(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new se(f)}n._authCredentials=new Js(new ni(u,d))}}var gi=class{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Qo(this,"async_queue_retry"),this.Vu=()=>{let r=Ws();r&&N("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;let t=Ws();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;let t=Ws();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});let t=new wt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Bu(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){let t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;let s=function(c){let u=c.message||"";return c.stack&&(u=c.stack.includes(c.message)?c.stack:c.message+`
`+c.stack),u}(r);throw yi("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);let s=Zo.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&B()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(let t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){let t=this.Tu.indexOf(e);this.Tu.splice(t,1)}};var na=class extends mi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new gi,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new gi(e),this._firestoreClient=void 0,await e}}};function ld(n,e){let t=typeof n=="object"?n:_r(),r=typeof n=="string"?n:e||"(default)",s=_n(t,"firestore").getImmediate({identifier:r});if(!s._initialized){let o=Jc("firestore");o&&Xm(s,...o)}return s}var cv=new RegExp("[~\\*/\\[\\]]");(function(e,t=!0){(function(s){Yt=s})(Ze),Xe(new be("firestore",(r,{instanceIdentifier:s,options:o})=>{let c=r.getProvider("app").getImmediate(),u=new na(new Xs(r.getProvider("auth-internal")),new no(r.getProvider("app-check-internal")),function(f,b){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new L(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new oo(f.options.projectId,b)}(c,s),c);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),Te(Iu,"4.7.3",e),Te(Iu,"4.7.3","esm2017")})();var Zm={apiKey:"AIzaSyDPBrfoqBwcazXXtteV0AM9T9klwYLigfs",authDomain:"salesblanket.firebaseapp.com",projectId:"salesblanket",storageBucket:"salesblanket.firebasestorage.app",messagingSenderId:"70376660372",appId:"1:70376660372:web:6c4292246d100ebd118381"},ud=hs(Zm),mv=Us(ud),gv=ld(ud);var vi=class{constructor(){this.routes={"":"landing",landing:!1,login:!1,404:!1,unauthorized:!1,dashboard:!0,"daily-view":!0,contacts:!0,addresses:!0,map:!0,appointments:!0,tasks:!0,calendar:!0,settings:!0,leads:!0,"canvasser-management":!0,territories:!0,"inspector-management":!0},this.currentPath="",this.handleRoute=this.handleRoute.bind(this),window.addEventListener("hashchange",this.handleRoute),this.handleRoute()}async handleRoute(){let e=window.location.hash.slice(1)||"landing";if(e===this.currentPath){console.log(`Already on route: ${e}, skipping render`);return}console.log(`Navigating to route: ${e}`);let t=document.getElementById("route-content");if(!t){console.error("Error: 'route-content' container not found.");return}if(!this.routes.hasOwnProperty(e)){console.error("Route not found:",e),window.location.hash="landing";return}let r=this.routes[e]===!0,s=firebase.auth().currentUser;if(r&&!s){console.log("Protected route accessed without auth, redirecting to landing"),window.location.hash="landing";return}for(this.currentPath=e;t.firstChild;)t.removeChild(t.firstChild);let o=e==="404"?"not-found-view":`${e}-view`;console.log(`Attempting to create component: ${o}`);try{let c=document.createElement(o);t.appendChild(c)}catch(c){console.error(`Failed to create element for route: ${e}`,c),window.location.hash="landing"}}};var ha=class extends HTMLElement{constructor(){super(),this.initialized=!1}connectedCallback(){this.initialized||(this.initialized=!0,this.checkAuthState())}checkAuthState(){firebase.auth().onAuthStateChanged(async e=>{let t=window.location.hash.slice(1)||"landing";console.log("Current route:",t);let r=["landing","login","404","unauthorized"],s=["dashboard","daily-view","contacts","addresses","map","appointments","tasks","calendar","settings","territories"];if(!e){console.log("No user signed in"),r.includes(t)||(window.location.hash="landing");return}console.log("User signed in:",e.uid);try{let o=firebase.firestore().collection("users").doc(e.uid),c=await o.get();if(!c.exists)await o.set({uid:e.uid,email:e.email,displayName:e.displayName||"",photoURL:e.photoURL||"",role:"canvasser",createdAt:firebase.firestore.FieldValue.serverTimestamp(),firstName:"",lastName:"",mobilePhone:"",textNotifications:!1,status:"active",swagPoints:0,lastActive:firebase.firestore.FieldValue.serverTimestamp(),completedProfile:!1}),window.location.hash="daily-view";else{let u=c.data();console.log("User data:",u),await o.update({lastActive:firebase.firestore.FieldValue.serverTimestamp()}),r.includes(t)&&(window.location.hash="daily-view")}}catch(o){console.error("Error handling user data:",o),window.location.hash="daily-view"}}),firebase.auth().onIdTokenChanged(e=>{e||(window.location.hash="landing")})}};customElements.define("app-root",ha);var M=(n,e)=>{customElements.get(n)||(customElements.define(n,e),console.log(`Registered component: ${n}`))};var fa=class extends HTMLElement{constructor(){super(),this.map=null,this.markers=new Map,this.geocoder=null,this.drawingManager=null,this.territories=new Map,this.currentMode="view",this.infoWindow=null,this.bounds=null,this.mapInitialized=!1}connectedCallback(){this.innerHTML=`
            <div class="map-container" style="width: 100%; height: 500px;">
                <div id="map" style="width: 100%; height: 100%;"></div>
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="add-address" class="control-btn">
                            <span class="material-icons">add_location</span>
                            Add Address
                        </button>
                        <button id="draw-territory" class="control-btn">
                            <span class="material-icons">draw</span>
                            Draw Territory
                        </button>
                        <button id="optimize-route" class="control-btn">
                            <span class="material-icons">route</span>
                            Optimize Route
                        </button>
                    </div>
                </div>
            </div>
        `,this.initializeMap()}async initializeMap(){try{await this.loadGoogleMapsScript();let e=this.querySelector("#map");this.map=new google.maps.Map(e,{center:{lat:39.8283,lng:-98.5795},zoom:4,mapTypeControl:!0,streetViewControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP}),this.geocoder=new google.maps.Geocoder,this.infoWindow=new google.maps.InfoWindow,this.bounds=new google.maps.LatLngBounds,this.drawingManager=new google.maps.drawing.DrawingManager({drawingMode:null,drawingControl:!1,polygonOptions:{fillColor:"#4CAF50",fillOpacity:.2,strokeColor:"#4CAF50",strokeWeight:2,editable:!1}}),this.drawingManager.setMap(this.map),this.mapInitialized=!0,this.setupEventListeners(),await Promise.all([this.loadSavedAddresses(),this.loadTerritories()])}catch(e){console.error("Map initialization error:",e)}}loadGoogleMapsScript(){return new Promise((e,t)=>{if(window.google?.maps){e();return}let r=document.createElement("script");r.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw&libraries=places,drawing,geometry",r.defer=!0,r.async=!0,r.onload=e,r.onerror=t,document.head.appendChild(r)})}setupEventListeners(){if(!this.mapInitialized)return;let e=this.querySelector("#add-address"),t=this.querySelector("#draw-territory"),r=this.querySelector("#optimize-route");e&&e.addEventListener("click",()=>{this.mapInitialized&&this.enableAddressCreation()}),t&&t.addEventListener("click",()=>{this.mapInitialized&&this.toggleTerritoryDrawing()}),r&&r.addEventListener("click",()=>{this.mapInitialized&&this.optimizeRoute()}),this.map&&this.map.addListener("click",async s=>{this.currentMode==="add-address"&&await this.handleAddressCreation(s.latLng)})}async loadSavedAddresses(){if(!this.mapInitialized)return;let e=firebase.auth().currentUser;if(e)try{(await firebase.firestore().collection("addresses").where("userId","==",e.uid).get()).forEach(r=>{let s=r.data();this.addMarker({id:r.id,position:{lat:s.latitude,lng:s.longitude},status:s.status,address:s.address,data:s})}),this.markers.size>0&&this.fitBoundsToMarkers()}catch(t){console.error("Error loading addresses:",t)}}enableAddressCreation(){this.mapInitialized&&(this.currentMode="add-address",this.map.setOptions({draggableCursor:"crosshair"}))}optimizeRoute(){this.mapInitialized&&console.log("Route optimization to be implemented")}toggleTerritoryDrawing(){this.mapInitialized&&(this.currentMode!=="draw-territory"?(this.currentMode="draw-territory",this.drawingManager.setMap(this.map),this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON)):(this.currentMode="view",this.drawingManager.setMap(null)))}};M("map-component",fa);var pa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="map-page">
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="new-address" class="control-btn">
                            <span class="material-icons">add_location</span>
                            New Address
                        </button>
                        <button id="route-planner" class="control-btn">
                            <span class="material-icons">route</span>
                            Plan Route
                        </button>
                        <button id="territory-view" class="control-btn">
                            <span class="material-icons">grid_on</span>
                            Territory
                        </button>
                    </div>
                </div>
                
                <div class="map-container">
                    <map-component id="main-map"></map-component>
                </div>
                
                <div class="address-panel">
                    <!-- Will show selected address details -->
                </div>
            </div>
        `,this.setupEventListeners()}setupEventListeners(){this.querySelector("#new-address").addEventListener("click",()=>{this.querySelector("#main-map").enableAddressCreation()}),this.querySelector("#route-planner").addEventListener("click",()=>{this.querySelector("#main-map").showRoutePlanner()}),this.querySelector("#territory-view").addEventListener("click",()=>{this.querySelector("#main-map").toggleTerritoryView()})}};M("map-view",pa);var ma=class extends HTMLElement{constructor(){super(),console.log("HomeView constructor called")}connectedCallback(){console.log("HomeView connected to the DOM");let e=document.getElementById("debug");e&&(e.textContent="HomeView loaded"),this.innerHTML=`
            <div class="home-container" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 20px;
                background-color: #f5f5f5;
            ">
                <h1 style="
                    color: #4CAF50;
                    margin-bottom: 30px;
                    font-size: 2em;
                ">Welcome to Sales Blanket</h1>
                <button id="google-signin-btn" style="
                    background-color: #4CAF50;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                ">Sign in with Google</button>
            </div>
        `,this.addEventListeners()}addEventListeners(){let e=this.querySelector("#google-signin-btn");e&&e.addEventListener("click",async()=>{try{let t=new firebase.auth.GoogleAuthProvider;await firebase.auth().signInWithPopup(t)}catch(t){console.error("Google Sign-In Error:",t),alert("Failed to log in. Please try again.")}})}};customElements.get("home-view")||(customElements.define("home-view",ma),console.log("home-view component registered"));var ga=class extends HTMLElement{constructor(){super(),this.user=null}connectedCallback(){console.log("DashboardView connected to the DOM."),firebase.auth().onAuthStateChanged(e=>{e?(this.user=e,this.render()):window.location.hash="home"})}render(){this.innerHTML=`
            <div class="dashboard-container">
                <div class="dashboard-content">
                    <h1>Welcome, ${this.user?.displayName||"User"}!</h1>
                    
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <h3>Tasks</h3>
                            <p>0 Active</p>
                        </div>
                        <div class="stat-card">
                            <h3>Contacts</h3>
                            <p>0 Total</p>
                        </div>
                    </div>
                    
                    <div class="recent-activity">
                        <h2>Recent Activity</h2>
                        <p>No recent activity</p>
                    </div>
                </div>
            </div>
        `}};customElements.get("dashboard-view")||customElements.define("dashboard-view",ga);var ya=class extends HTMLElement{constructor(){super(),this.userData={},this.initialized=!1}async connectedCallback(){this.initialized||(this.initialized=!0,await this.loadEmployeeData(),this.render(),this.setupEventListeners())}async loadEmployeeData(){let e=firebase.auth().currentUser;if(e)try{let t=await firebase.firestore().collection("users").doc(e.uid).get();t.exists&&(this.userData=t.data())}catch(t){console.error("Error loading employee data:",t)}}render(){this.innerHTML=`
            <div class="employee-data">
                <div class="section-header">
                    <h2>Employee Information</h2>
                </div>
                
                <form id="employee-form" class="employee-form">
                    <!-- Personal Information -->
                    <div class="form-section">
                        <h3 class="section-header">Personal Information</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" 
                                       value="${this.userData.firstName||""}" required>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" 
                                       value="${this.userData.lastName||""}" required>
                            </div>
                            <div class="form-group">
                                <label for="dob">Date of Birth</label>
                                <input type="date" id="dob" name="dob" 
                                       value="${this.userData.dob||""}">
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div class="form-section">
                        <h3 class="section-header">Contact Information</h3>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label for="address1">Address Line 1</label>
                                <input type="text" id="address1" name="address1" 
                                       value="${this.userData.address1||""}">
                            </div>
                            <div class="form-group full-width">
                                <label for="address2">Address Line 2</label>
                                <input type="text" id="address2" name="address2" 
                                       value="${this.userData.address2||""}">
                            </div>
                            <div class="form-group">
                                <label for="city">City</label>
                                <input type="text" id="city" name="city" 
                                       value="${this.userData.city||""}">
                            </div>
                            <div class="form-group">
                                <label for="state">State</label>
                                <input type="text" id="state" name="state" 
                                       value="${this.userData.state||""}">
                            </div>
                            <div class="form-group">
                                <label for="zip">ZIP Code</label>
                                <input type="text" id="zip" name="zip" 
                                       value="${this.userData.zip||""}">
                            </div>
                            <div class="form-group">
                                <label for="mobilePhone">Mobile Phone</label>
                                <input type="tel" id="mobilePhone" name="mobilePhone" 
                                       value="${this.userData.mobilePhone||""}">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" 
                                       value="${this.userData.email||""}" readonly>
                            </div>
                        </div>
                    </div>

                    <!-- Personal Preferences -->
                    <div class="form-section">
                        <h3 class="section-header">Personal Preferences</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="favoriteColor">Favorite Color</label>
                                <input type="text" id="favoriteColor" name="favoriteColor" 
                                       value="${this.userData.favoriteColor||""}">
                            </div>
                            <div class="form-group">
                                <label for="favoriteHobby">Favorite Hobby</label>
                                <input type="text" id="favoriteHobby" name="favoriteHobby" 
                                       value="${this.userData.favoriteHobby||""}">
                            </div>
                            <div class="form-group">
                                <label for="favoriteFood">Favorite Food</label>
                                <input type="text" id="favoriteFood" name="favoriteFood" 
                                       value="${this.userData.favoriteFood||""}">
                            </div>
                        </div>
                    </div>

                    <!-- Family Information -->
<div class="form-section">
    <h3 class="section-header">Family Information</h3>
    <div class="form-grid">
        <!-- Children Information -->
        <div class="form-group full-width">
            <h4>Children</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label for="childFirstName">Child First Name</label>
                    <input type="text" id="childFirstName" name="childFirstName" 
                           value="${this.userData.childFirstName||""}">
                </div>
                <div class="form-group">
                    <label for="childBirthday">Child Birthday</label>
                    <input type="date" id="childBirthday" name="childBirthday" 
                           value="${this.userData.childBirthday||""}">
                </div>
            </div>
        </div>

        <div class="form-group full-width">
            <label for="pets">Pets</label>
            <input type="text" id="pets" name="pets" 
                   value="${this.userData.pets||""}">
        </div>

        <!-- Partner Information -->
        <div class="form-group full-width">
            <h4>Partner Information</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label for="partnerFirstName">Partner First Name</label>
                    <input type="text" id="partnerFirstName" name="partnerFirstName" 
                           value="${this.userData.partnerFirstName||""}">
                </div>
                <div class="form-group">
                    <label for="partnerLastName">Partner Last Name</label>
                    <input type="text" id="partnerLastName" name="partnerLastName" 
                           value="${this.userData.partnerLastName||""}">
                </div>
                <div class="form-group">
                    <label for="partnerBirthday">Partner Birthday</label>
                    <input type="date" id="partnerBirthday" name="partnerBirthday" 
                           value="${this.userData.partnerBirthday||""}">
                </div>
            </div>
        </div>
    </div>
</div>

                    <!-- Goals -->
                    <div class="form-section">
                        <h3 class="section-header">Goals</h3>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label>Personal Goals</label>
                                <div class="nested-form-group">
                                    <input type="text" name="personalGoal1Year" placeholder="1 Year Goal" 
                                           value="${this.userData.personalGoal1Year||""}">
                                    <input type="text" name="personalGoal5Year" placeholder="5 Year Goal" 
                                           value="${this.userData.personalGoal5Year||""}">
                                    <input type="text" name="personalGoal10Year" placeholder="10 Year Goal" 
                                           value="${this.userData.personalGoal10Year||""}">
                                </div>
                            </div>
                            <div class="form-group full-width">
                                <label>Company Goals</label>
                                <div class="nested-form-group">
                                    <input type="text" name="companyGoal1Year" placeholder="1 Year Goal" 
                                           value="${this.userData.companyGoal1Year||""}">
                                    <input type="text" name="companyGoal5Year" placeholder="5 Year Goal" 
                                           value="${this.userData.companyGoal5Year||""}">
                                    <input type="text" name="companyGoal10Year" placeholder="10 Year Goal" 
                                           value="${this.userData.companyGoal10Year||""}">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="secondary-button" id="cancelChanges">Cancel</button>
                        <button type="submit" class="primary-button">Save Changes</button>
                    </div>
                </form>
            </div>
        `}setupEventListeners(){let e=this.querySelector("#employee-form"),t=this.querySelector("#cancelChanges");e&&e.addEventListener("submit",async r=>{r.preventDefault(),await this.saveEmployeeData(new FormData(e))}),t&&t.addEventListener("click",()=>{this.loadEmployeeData().then(()=>this.render())})}async saveEmployeeData(e){let t=firebase.auth().currentUser;if(t)try{let r={};for(let[s,o]of e.entries())r[s]=o;await firebase.firestore().collection("users").doc(t.uid).update({...r,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),this.showMessage("Employee data saved successfully","success")}catch(r){console.error("Error saving employee data:",r),this.showMessage("Failed to save employee data","error")}}showMessage(e,t){let r=document.createElement("div");r.className=`settings-message ${t}`,r.textContent=e,this.appendChild(r),setTimeout(()=>r.remove(),3e3)}};customElements.define("employee-management",ya);var va=class extends HTMLElement{constructor(){super(),this.workflows=[]}connectedCallback(){this.loadWorkflows(),this.render()}async loadWorkflows(){try{let e=await firebase.firestore().collection("workflows").get();this.workflows=e.docs.map(t=>({id:t.id,...t.data()}))}catch(e){console.error("Error loading workflows:",e)}}render(){this.innerHTML=`
            <div class="workflow-management">
                <div class="info-container">
                    <h1>Create a new workflow</h1>
                    <p>
                        A workflow is a collection of leads, contacts or addresses. You can create a custom 
                        workflow and blend types of data in the system. Within each workflow you can create 
                        phases and stages.
                    </p>

                    <div class="definitions">
                        <div class="definition-item">
                            <h3>Phases</h3>
                            <p>
                                A phase contains stages. Generally phases are used for management to 
                                have a condensed view of data to manage. Phases work well when designed 
                                to identify a "bucket" of work for a specific role in the company.
                            </p>
                        </div>

                        <div class="definition-item">
                            <h3>Stages</h3>
                            <p>
                                The best way to describe a stage would be to think of it as a stop on 
                                a trip, in which we have tasks to complete.
                            </p>
                        </div>

                        <div class="definition-item">
                            <h3>Tasks</h3>
                            <p>Items that need to be completed within the stage.</p>
                        </div>
                    </div>
                </div>

                <div class="workflows-container">
                    <div class="section-header">
                        <h2>Current Workflows</h2>
                        <button id="create-workflow" class="create-button">
                            <span class="material-icons">add</span>
                            Create Workflow
                        </button>
                    </div>

                    <div class="workflows-grid">
                        ${this.workflows.length?this.renderWorkflows():this.renderEmptyState()}
                    </div>
                </div>
            </div>
        `,this.setupEventListeners()}renderWorkflows(){return this.workflows.map(e=>`
            <div class="workflow-card" data-id="${e.id}">
                <div class="workflow-header">
                    <div>
                        <h3>${e.name}</h3>
                        <span class="collection-name">Collection: ${e.collection}</span>
                    </div>
                    <span class="status-badge ${e.active?"active":"inactive"}">
                        ${e.active?"Active":"Inactive"}
                    </span>
                </div>
                <div class="phase-preview">
                    ${e.phases?.map(t=>`
                        <span class="phase-badge" style="background-color: ${t.color}20; 
                            color: ${t.color}; border: 1px solid ${t.color}">
                            ${t.name}
                        </span>
                    `).join("")||"No phases defined"}
                </div>
                <div class="workflow-actions">
                    <button class="edit-workflow" data-id="${e.id}">
                        <span class="material-icons">edit</span>
                        Edit
                    </button>
                </div>
            </div>
        `).join("")}renderEmptyState(){return`
            <div class="empty-state">
                <div class="empty-state-icon">
                    <span class="material-icons">account_tree</span>
                </div>
                <p>No workflows created</p>
                <p>Click 'Create Workflow' to get started</p>
            </div>
        `}setupEventListeners(){this.querySelector("#create-workflow")?.addEventListener("click",()=>{this.showWorkflowModal()}),this.querySelectorAll(".edit-workflow").forEach(e=>{e.addEventListener("click",t=>{let r=t.target.closest("button").dataset.id;this.showWorkflowModal(r)})})}showWorkflowModal(e=null){let t=e?this.workflows.find(s=>s.id===e):null,r=document.createElement("div");r.className="modal",r.innerHTML=`
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${t?"Edit":"Create"} Workflow</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form id="workflow-form">
                    <div class="form-group">
                        <label>Collection Type</label>
                        <select name="collection" required>
                            <option value="">Select Collection</option>
                            <option value="contacts">Contacts</option>
                            <option value="addresses">Addresses</option>
                            <option value="leads">Leads</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Workflow Name</label>
                        <input type="text" name="name" required 
                               value="${t?.name||""}">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" rows="3">${t?.description||""}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="secondary-button">Cancel</button>
                        <button type="submit" class="primary-button">
                            ${t?"Update":"Create"} Workflow
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(r),this.setupModalEventListeners(r,t)}setupModalEventListeners(e,t){let r=e.querySelector("#workflow-form"),s=e.querySelector(".close-modal"),o=e.querySelector(".secondary-button"),c=()=>e.remove();s.addEventListener("click",c),o.addEventListener("click",c),r.addEventListener("submit",async u=>{u.preventDefault();let d=new FormData(r),f={collection:d.get("collection"),name:d.get("name"),description:d.get("description"),active:!0,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};try{t?await firebase.firestore().collection("workflows").doc(t.id).update(f):(f.createdAt=firebase.firestore.FieldValue.serverTimestamp(),await firebase.firestore().collection("workflows").add(f)),await this.loadWorkflows(),this.render(),c()}catch(b){console.error("Error saving workflow:",b),alert("Failed to save workflow. Please try again.")}})}};customElements.define("workflow-management",va);var _a=class extends HTMLElement{constructor(){super(),this.users=[],this.currentUserRole=null}async connectedCallback(){let e=firebase.auth().currentUser;if(!e)return;let t=await firebase.firestore().collection("users").doc(e.uid).get();if(this.currentUserRole=t.data()?.role,this.currentUserRole!=="admin"){this.innerHTML=`
                <div class="unauthorized-message">
                    <p>You don't have permission to manage roles.</p>
                </div>
            `;return}await this.loadUsers(),this.render(),this.setupEventListeners()}async loadUsers(){try{let e=await firebase.firestore().collection("users").get();this.users=e.docs.map(t=>({id:t.id,...t.data()}))}catch(e){console.error("Error loading users:",e)}}render(){this.innerHTML=`
            <div class="role-management">
                <div class="role-header">
                    <h2>Role Management</h2>
                    <p class="role-description">Manage user roles and permissions.</p>
                </div>

                <div class="users-table">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Current Role</th>
                                <th>New Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.users.map(e=>`
                                <tr data-user-id="${e.id}">
                                    <td>
                                        <div class="user-info">
                                            <span class="user-name">${e.firstName} ${e.lastName}</span>
                                            <span class="user-email">${e.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="current-role ${e.role}">${e.role||"No role"}</span>
                                    </td>
                                    <td>
                                        <select class="role-select" ${e.role==="admin"?"disabled":""}>
                                            <option value="">Select Role</option>
                                            <option value="setter" ${e.role==="setter"?"selected":""}>Setter</option>
                                            <option value="closer" ${e.role==="closer"?"selected":""}>Closer</option>
                                            <option value="manager" ${e.role==="manager"?"selected":""}>Manager</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button class="update-role-btn" ${e.role==="admin"?"disabled":""}>
                                            Update Role
                                        </button>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `}setupEventListeners(){this.querySelectorAll(".update-role-btn").forEach(e=>{e.addEventListener("click",async t=>{let r=t.target.closest("tr"),s=r.dataset.userId,o=r.querySelector(".role-select").value;if(!o){alert("Please select a role");return}try{await this.updateUserRole(s,o),await this.loadUsers(),this.render()}catch(c){console.error("Error updating role:",c),alert("Failed to update role. Please try again.")}})})}async updateUserRole(e,t){await firebase.firestore().collection("users").doc(e).update({role:t,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),await firebase.functions().httpsCallable("setUserRole")({uid:e,role:t})}};customElements.define("role-management",_a);var eg={systemSettings:{timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,dateFormat:"MM/DD/YYYY",dataSync:!0},preferences:{defaultView:"dashboard",startingPage:"daily-view",timeFormat:"12h",showNotifications:!0},notifications:{emailNotifications:!1,textNotifications:!1,appNotifications:!0,quietHours:{start:"22:00",end:"07:00"}},appearance:{theme:"light",fontSize:"medium",layout:"grid"}},wa=class extends HTMLElement{constructor(){super(),this.users=[],this.pendingInvites=[],this.initialized=!1}async connectedCallback(){if(this.initialized)return;this.initialized=!0;let e=firebase.auth().currentUser;if(e)try{if((await firebase.firestore().collection("users").doc(e.uid).get()).data()?.role!=="admin"){this.innerHTML=`
                    <div class="unauthorized-message">
                        <p>You don't have permission to manage users.</p>
                    </div>
                `;return}await Promise.all([this.loadUsers(),this.loadPendingInvites()]),this.render(),this.setupEventListeners()}catch(t){console.error("Error in UserManagement:",t),this.innerHTML=`
                <div class="error-message">
                    <p>An error occurred while loading user management.</p>
                </div>
            `}}async loadUsers(){try{let e=await firebase.firestore().collection("users").get();this.users=e.docs.map(t=>({id:t.id,...t.data()}))}catch(e){console.error("Error loading users:",e)}}async loadPendingInvites(){try{let e=await firebase.firestore().collection("userInvites").where("status","==","pending").get();this.pendingInvites=e.docs.map(t=>({id:t.id,...t.data()}))}catch(e){console.error("Error loading invites:",e)}}render(){this.innerHTML=`
            <div class="user-management">
                <div class="section-header">
                    <h2>User Management</h2>
                    <button id="invite-user-btn" class="add-button">
                        <span class="material-icons">person_add</span>
                        Invite User
                    </button>
                </div>

                <!-- Active Users Section -->
                <div class="users-section">
                    <h3>Active Users</h3>
                    <div class="users-table">
                        ${this.renderUsersTable()}
                    </div>
                </div>

                <!-- Pending Invites Section -->
                <div class="pending-invites">
                    <h3>Pending Invites</h3>
                    <div class="invites-list">
                        ${this.renderPendingInvites()}
                    </div>
                </div>

                <!-- Invite Modal -->
                <div id="invite-modal" class="modal" style="display: none;">
                    <div class="modal-card">
                        <div class="modal-header">
                            <h3>Invite New User</h3>
                            <button class="close-button">&times;</button>
                        </div>
                        <form id="invite-form">
                            <div class="modal-content">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>First Name<span class="required">*</span></label>
                                        <input type="text" name="firstName" required>
                                    </div>
                                    <div class="form-group">
                                        <label>Last Name<span class="required">*</span></label>
                                        <input type="text" name="lastName" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Email<span class="required">*</span></label>
                                    <input type="email" name="email" required>
                                    <span class="field-hint">Company email required</span>
                                </div>
                                <div class="form-group">
                                    <label>Role<span class="required">*</span></label>
                                    <select name="role" required>
                                        <option value="">Select Role</option>
                                        <option value="setter">Setter</option>
                                        <option value="closer">Closer</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-cancel secondary-button">Cancel</button>
                                <button type="submit" class="btn-primary">Send Invite</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `}renderUsersTable(){return this.users.length?`
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.users.map(e=>`
                        <tr data-user-id="${e.id}">
                            <td>${e.firstName} ${e.lastName}</td>
                            <td>${e.email}</td>
                            <td>${e.role}</td>
                            <td>
                                <span class="status-badge ${e.status||"active"}">
                                    ${e.status||"Active"}
                                </span>
                            </td>
                            <td>
                                <button class="icon-button edit-user" title="Edit User">
                                    <span class="material-icons">edit</span>
                                </button>
                                ${e.role!=="admin"?`
                                    <button class="icon-button deactivate-user" title="Deactivate User">
                                        <span class="material-icons">block</span>
                                    </button>
                                `:""}
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `:'<div class="empty-state">No users found</div>'}renderPendingInvites(){return this.pendingInvites.length?this.pendingInvites.map(e=>`
            <div class="invite-card" data-id="${e.id}">
                <div class="invite-info">
                    <span class="name">${e.firstName} ${e.lastName}</span>
                    <span class="email">${e.email}</span>
                    <span class="role">${e.role}</span>
                    <span class="date">${this.formatDate(e.createdAt)}</span>
                </div>
                <button class="cancel-invite-btn" data-id="${e.id}">
                    <span class="material-icons">close</span>
                </button>
            </div>
        `).join(""):'<div class="empty-state">No pending invites</div>'}formatDate(e){if(!e)return"";let t=e.toDate();return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(t)}setupEventListeners(){let e=this.querySelector("#invite-user-btn"),t=this.querySelector("#invite-modal"),r=this.querySelector(".close-button"),s=this.querySelector(".btn-cancel"),o=this.querySelector("#invite-form");e&&t&&e.addEventListener("click",()=>{t.style.display="flex"});let c=()=>{t&&(t.style.display="none",o?.reset())};r?.addEventListener("click",c),s?.addEventListener("click",c),t?.addEventListener("click",u=>{u.target===t&&c()}),o?.addEventListener("submit",async u=>{u.preventDefault();let d=o.querySelector(".btn-primary");if(d){d.disabled=!0,d.textContent="Sending...";try{let f=new FormData(o),b={firstName:f.get("firstName").trim(),lastName:f.get("lastName").trim(),email:f.get("email").toLowerCase().trim(),role:f.get("role")};await this.createUserInvite(b),c(),await this.loadPendingInvites(),this.render(),this.showMessage("Invite sent successfully","success")}catch(f){console.error("Error creating invite:",f),this.showMessage("Failed to send invite","error")}finally{d.disabled=!1,d.textContent="Send Invite"}}}),this.querySelectorAll(".cancel-invite-btn").forEach(u=>{u.addEventListener("click",async d=>{let f=d.currentTarget.dataset.id;if(confirm("Are you sure you want to cancel this invite?"))try{await firebase.firestore().collection("userInvites").doc(f).update({status:"cancelled",cancelledAt:firebase.firestore.FieldValue.serverTimestamp()}),await this.loadPendingInvites(),this.render(),this.showMessage("Invite cancelled successfully","success")}catch(b){console.error("Error cancelling invite:",b),this.showMessage("Failed to cancel invite","error")}})}),this.querySelectorAll(".edit-user").forEach(u=>{u.addEventListener("click",d=>{let f=d.currentTarget.closest("tr").dataset.userId,b=this.users.find(T=>T.id===f);b&&this.showEditUserModal(b)})}),this.querySelectorAll(".deactivate-user").forEach(u=>{u.addEventListener("click",async d=>{let f=d.currentTarget.closest("tr").dataset.userId;confirm("Are you sure you want to deactivate this user?")&&await this.deactivateUser(f)})})}async createUserInvite(e){try{await firebase.firestore().collection("users").doc(e.email).set({...eg,firstName:e.firstName,lastName:e.lastName,email:e.email,role:e.role,status:"invited",createdAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:!0}),await firebase.firestore().collection("userInvites").add({...e,status:"pending",createdAt:firebase.firestore.FieldValue.serverTimestamp()})}catch(t){throw console.error("Error creating user invite:",t),t}}async deactivateUser(e){try{await firebase.firestore().collection("users").doc(e).update({status:"inactive",deactivatedAt:firebase.firestore.FieldValue.serverTimestamp()}),await this.loadUsers(),this.render(),this.showMessage("User deactivated successfully","success")}catch(t){console.error("Error deactivating user:",t),this.showMessage("Failed to deactivate user","error")}}showMessage(e,t){let r=document.createElement("div");r.className=`settings-message ${t}`,r.textContent=e,this.appendChild(r),setTimeout(()=>r.remove(),3e3)}};customElements.define("user-management",wa);var ba=class extends HTMLElement{constructor(){super(),this.settings={theme:"light",fontSize:"medium",colorScheme:"default"}}async connectedCallback(){console.log("AppearanceSettings connected"),await this.loadAppearanceSettings(),this.render(),this.setupEventListeners()}async loadAppearanceSettings(){let e=firebase.auth().currentUser;if(e)try{let t=await firebase.firestore().collection("users").doc(e.uid).get();if(t.exists){let r=t.data();this.settings={...this.settings,...r.appearanceSettings}}}catch(t){console.error("Error loading appearance settings:",t)}}render(){this.innerHTML=`
            <div class="appearance-settings preference-card">
                <h3>Appearance Settings</h3>
                <div class="settings-group">
                    <div class="setting-item">
                        <label>Theme</label>
                        <select id="theme">
                            <option value="light" ${this.settings.theme==="light"?"selected":""}>Light</option>
                            <option value="dark" ${this.settings.theme==="dark"?"selected":""}>Dark</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>Font Size</label>
                        <select id="fontSize">
                            <option value="small" ${this.settings.fontSize==="small"?"selected":""}>Small</option>
                            <option value="medium" ${this.settings.fontSize==="medium"?"selected":""}>Medium</option>
                            <option value="large" ${this.settings.fontSize==="large"?"selected":""}>Large</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label>Color Scheme</label>
                        <select id="colorScheme">
                            <option value="default" ${this.settings.colorScheme==="default"?"selected":""}>Default</option>
                            <option value="high-contrast" ${this.settings.colorScheme==="high-contrast"?"selected":""}>High Contrast</option>
                        </select>
                    </div>
                </div>
            </div>
        `}setupEventListeners(){["theme","fontSize","colorScheme"].forEach(e=>{this.querySelector(`#${e}`)?.addEventListener("change",async t=>{this.settings[e]=t.target.value,await this.saveSettings()})})}async saveSettings(){let e=firebase.auth().currentUser;if(e)try{await firebase.firestore().collection("users").doc(e.uid).update({appearanceSettings:this.settings,updatedAt:firebase.firestore.FieldValue.serverTimestamp()})}catch(t){console.error("Error saving appearance settings:",t)}}};customElements.define("appearance-settings",ba);var Ia={notifications:{emailNotifications:!1,textNotifications:!1,appNotifications:!0,quietHours:{start:"22:00",end:"07:00"}}},Ea=class extends HTMLElement{constructor(){super(),console.log("NotificationSettings constructor called"),this.settings=Ia.notifications,this.initialized=!1}async connectedCallback(){this.initialized||(this.initialized=!0,console.log("NotificationSettings connected"),await this.loadSettings(),this.render(),this.setupEventListeners())}async loadSettings(){let e=firebase.auth().currentUser;if(e)try{let t=await firebase.firestore().collection("users").doc(e.uid).get();if(t.exists){let r=t.data();this.settings={...Ia.notifications,...r.notificationSettings||{}}}}catch(t){console.error("Error loading notification settings:",t),this.settings=Ia.notifications}}render(){console.log("Rendering notification settings with:",this.settings),this.innerHTML=`
            <div class="notification-settings">
                <div class="settings-group">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Email Notifications</h4>
                            <p>Receive updates via email</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="emailToggle" 
                                   ${this.settings.emailNotifications?"checked":""}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Text Notifications</h4>
                            <p>Receive updates via SMS</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="textToggle" 
                                   ${this.settings.textNotifications?"checked":""}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>App Notifications</h4>
                            <p>Receive in-app notifications</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="appToggle" 
                                   ${this.settings.appNotifications?"checked":""}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Quiet Hours</h4>
                            <p>Don't send notifications during these hours</p>
                        </div>
                        <div class="time-range">
                            <div class="time-input">
                                <label>Start</label>
                                <input type="time" id="quietHoursStart" 
                                       value="${this.settings.quietHours.start}">
                            </div>
                            <div class="time-input">
                                <label>End</label>
                                <input type="time" id="quietHoursEnd" 
                                       value="${this.settings.quietHours.end}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-actions">
                    <button class="secondary-button" id="cancelChanges">Cancel</button>
                    <button class="primary-button" id="saveChanges">Save Changes</button>
                </div>
            </div>
        `}setupEventListeners(){["email","text","app"].forEach(e=>{let t=this.querySelector(`#${e}Toggle`);t&&t.addEventListener("change",r=>{this.settings[`${e}Notifications`]=r.target.checked})}),["Start","End"].forEach(e=>{let t=this.querySelector(`#quietHours${e}`);t&&t.addEventListener("change",r=>{this.settings.quietHours[e.toLowerCase()]=r.target.value})}),this.querySelector("#saveChanges")?.addEventListener("click",()=>{this.saveSettings()}),this.querySelector("#cancelChanges")?.addEventListener("click",()=>{this.loadSettings().then(()=>this.render())})}async saveSettings(){let e=firebase.auth().currentUser;if(e)try{await firebase.firestore().collection("users").doc(e.uid).update({notificationSettings:this.settings,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),this.showMessage("Settings saved successfully","success")}catch(t){console.error("Error saving settings:",t),this.showMessage("Failed to save settings","error")}}showMessage(e,t){let r=document.createElement("div");r.className=`settings-message ${t}`,r.textContent=e,this.appendChild(r),setTimeout(()=>r.remove(),3e3)}};customElements.define("notification-settings",Ea);var Ta=class extends HTMLElement{constructor(){super(),this.settings={timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,dateFormat:"MM/DD/YYYY",dataSync:!0}}async connectedCallback(){let e=firebase.auth().currentUser;if(e)try{let t=await firebase.firestore().collection("users").doc(e.uid).get();if(!t.exists||t.data()?.role!=="admin"){this.innerHTML=`
                    <div class="unauthorized-message">
                        <p>System settings are only available to administrators.</p>
                    </div>
                `;return}await this.loadSystemSettings(),this.render(),this.setupEventListeners()}catch(t){console.error("Error loading user role:",t)}}async loadSystemSettings(){let e=firebase.auth().currentUser;if(e)try{let t=await firebase.firestore().collection("users").doc(e.uid).get();if(t.exists){let r=t.data();this.settings={...this.settings,...r.systemSettings}}}catch(t){console.error("Error loading system settings:",t)}}render(){this.innerHTML=`
            <div class="system-settings preference-card">
                <h3>System Settings</h3>
                <div class="settings-group">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Timezone</h4>
                            <p>Set system timezone</p>
                        </div>
                        <select id="timezone">
                            ${this.getTimezoneOptions()}
                        </select>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Date Format</h4>
                            <p>Choose how dates are displayed</p>
                        </div>
                        <select id="dateFormat">
                            <option value="MM/DD/YYYY" ${this.settings.dateFormat==="MM/DD/YYYY"?"selected":""}>MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY" ${this.settings.dateFormat==="DD/MM/YYYY"?"selected":""}>DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD" ${this.settings.dateFormat==="YYYY-MM-DD"?"selected":""}>YYYY-MM-DD</option>
                        </select>
                    </div>

                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Data Synchronization</h4>
                            <p>Keep data synced across devices</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="dataSyncToggle"
                                   ${this.settings.dataSync?"checked":""}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="settings-actions">
                    <button class="secondary-button" id="cancelChanges">Cancel</button>
                    <button class="primary-button" id="saveChanges">Save Changes</button>
                </div>
            </div>
        `}getTimezoneOptions(){return(Intl.supportedValuesOf?Intl.supportedValuesOf("timeZone"):["UTC","America/New_York","Europe/London","Asia/Tokyo"]).map(t=>`
            <option value="${t}" ${this.settings.timezone===t?"selected":""}>
                ${t.replace(/_/g," ")}
            </option>
        `).join("")}setupEventListeners(){this.querySelectorAll("select, input").forEach(t=>{t.addEventListener("change",()=>{this.querySelector("#saveChanges").removeAttribute("disabled")})}),this.querySelector("#saveChanges")?.addEventListener("click",()=>{this.saveSettings()}),this.querySelector("#cancelChanges")?.addEventListener("click",()=>{this.loadSettings().then(()=>this.render())})}async saveSettings(){let e=firebase.auth().currentUser;if(e)try{await firebase.firestore().collection("users").doc(e.uid).update({systemSettings:this.settings,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),this.showMessage("Settings saved successfully","success"),this.querySelector("#saveChanges").setAttribute("disabled","true")}catch(t){console.error("Error saving settings:",t),this.showMessage("Failed to save settings","error")}}showMessage(e,t){let r=document.createElement("div");r.className=`settings-message ${t}`,r.textContent=e,this.appendChild(r),setTimeout(()=>r.remove(),3e3)}};customElements.define("system-settings",Ta);var Aa=class extends HTMLElement{constructor(){super(),this.preferences={startingPage:"daily-view",timeFormat:"12h",showNotifications:!0}}async connectedCallback(){console.log("UserPreferences connected"),await this.loadUserPreferences(),this.render(),this.setupEventListeners()}async loadUserPreferences(){let e=firebase.auth().currentUser;if(e)try{let t=await firebase.firestore().collection("users").doc(e.uid).get();if(t.exists){let r=t.data();this.preferences={...this.preferences,...r.preferences}}}catch(t){console.error("Error loading user preferences:",t)}}render(){this.innerHTML=`
            <div class="user-preferences preference-card">
                <h3>User Preferences</h3>
                <div class="settings-group">
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Starting Page</h4>
                            <p>Select which page to show after login</p>
                        </div>
                        <select id="startingPage">
                            <option value="dashboard" ${this.preferences.startingPage==="dashboard"?"selected":""}>Dashboard</option>
                            <option value="daily-view" ${this.preferences.startingPage==="daily-view"?"selected":""}>Daily View</option>
                            <option value="tasks" ${this.preferences.startingPage==="tasks"?"selected":""}>Tasks</option>
                        </select>
                    </div>
    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Time Format</h4>
                            <p>Choose 12 or 24 hour time format</p>
                        </div>
                        <select id="timeFormat">
                            <option value="12h" ${this.preferences.timeFormat==="12h"?"selected":""}>12 Hour</option>
                            <option value="24h" ${this.preferences.timeFormat==="24h"?"selected":""}>24 Hour</option>
                        </select>
                    </div>
    
                    <div class="setting-item">
                        <div class="setting-info">
                            <h4>Show Notifications</h4>
                            <p>Display notifications on your desktop</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="showNotifications"
                                   ${this.preferences.showNotifications?"checked":""}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        `}async updatePreference(e,t){let r=firebase.auth().currentUser;if(r)try{await firebase.firestore().collection("users").doc(r.uid).update({preferences:{...this.preferences,[e]:t}}),this.preferences[e]=t}catch(s){console.error("Error updating preference:",s),alert("Failed to update preference. Please try again.")}}setupEventListeners(){["defaultView","startingPage","timeFormat"].forEach(e=>{this.querySelector(`#${e}`)?.addEventListener("change",t=>{this.updatePreference(e,t.target.value)})}),this.querySelector("#showNotifications")?.addEventListener("change",e=>{this.updatePreference("showNotifications",e.target.checked)}),this.querySelector("#resetPreferences")?.addEventListener("click",()=>{confirm("Are you sure you want to reset all preferences to defaults?")&&this.resetToDefaults()}),this.querySelector("#savePreferences")?.addEventListener("click",()=>{this.saveAllPreferences()})}async resetToDefaults(){let e={defaultView:"dashboard",startingPage:"daily-view",timeFormat:"12h",showNotifications:!0},t=firebase.auth().currentUser;if(t)try{await firebase.firestore().collection("users").doc(t.uid).update({preferences:e}),this.preferences=e,this.render(),alert("Preferences have been reset to defaults")}catch(r){console.error("Error resetting preferences:",r),alert("Failed to reset preferences. Please try again.")}}async saveAllPreferences(){let e=firebase.auth().currentUser;if(e)try{await firebase.firestore().collection("users").doc(e.uid).update({preferences:this.preferences,updatedAt:firebase.firestore.FieldValue.serverTimestamp()}),alert("All preferences have been saved")}catch(t){console.error("Error saving preferences:",t),alert("Failed to save preferences. Please try again.")}}};customElements.define("user-preferences",Aa);var Sa=class extends HTMLElement{constructor(){super(),this.currentSection="employee",this.currentUserRole=null,this.userData=null,this.sections=[{id:"employee",title:"Employee Data",icon:"badge",adminOnly:!1},{id:"users",title:"User Management",icon:"group_add",adminOnly:!0},{id:"roles",title:"Role Management",icon:"admin_panel_settings",adminOnly:!0},{id:"workflows",title:"Workflow Management",icon:"account_tree",adminOnly:!0},{id:"appearance",title:"Appearance",icon:"palette",adminOnly:!1},{id:"notifications",title:"Notifications",icon:"notifications",adminOnly:!1},{id:"system",title:"System Settings",icon:"settings",adminOnly:!1},{id:"preferences",title:"User Preferences",icon:"person_outline",adminOnly:!1}]}async connectedCallback(){console.log("SettingsView connected"),await this.loadUserData(),this.render(),this.setupEventListeners()}async loadUserData(){let e=firebase.auth().currentUser;if(!e){console.warn("No authenticated user found");return}try{let t=await firebase.firestore().collection("users").doc(e.uid).get();t.exists&&(this.userData={id:t.id,...t.data()},this.currentUserRole=this.userData?.role,console.log("User data loaded:",this.userData))}catch(t){console.error("Error loading user data:",t)}}render(){this.innerHTML=`
            <div class="settings-container">
                <div class="settings-header">
                    <h1>Settings</h1>
                </div>
                
                <div class="settings-layout">
                    <div class="settings-sidebar">
                        ${this.renderSidebar()}
                    </div>

                    <div class="settings-content" id="settings-content">
                        ${this.renderSection(this.currentSection)}
                    </div>
                </div>
            </div>
        `}renderSidebar(){return this.sections.filter(e=>!e.adminOnly||this.currentUserRole==="admin").map(e=>`
                <button class="sidebar-button ${this.currentSection===e.id?"active":""}" 
                        data-section="${e.id}">
                    <span class="material-icons">${e.icon}</span>
                    ${e.title}
                </button>
            `).join("")}renderSection(e){switch(console.log("Rendering section:",e),e){case"employee":return`
                  <employee-management 
                    data-user='${JSON.stringify(this.userData)}'>
                  </employee-management>
                `;case"users":return this.currentUserRole!=="admin"?"<p>Access Denied</p>":"<user-management></user-management>";case"roles":return this.currentUserRole!=="admin"?"<p>Access Denied</p>":"<role-management></role-management>";case"workflows":return this.currentUserRole!=="admin"?"<p>Access Denied</p>":"<workflow-management></workflow-management>";case"appearance":return`
                  <div class="settings-content-section">
                    <h2>Appearance Settings</h2>
                    <appearance-settings save-enabled="true"></appearance-settings>
                  </div>
                `;case"notifications":return`
                  <div class="settings-content-section">
                    <h2>Notification Settings</h2>
                    <notification-settings></notification-settings>
                  </div>
                `;case"system":return this.currentUserRole!=="admin"?"<p>Access Denied</p>":"<system-settings></system-settings>";case"preferences":return`
                  <div class="settings-content-section">
                    <h2>User Preferences</h2>
                    <user-preferences save-enabled="true"></user-preferences>
                  </div>
                `;default:return`
                  <div class="empty-state">
                    <p>Select an option from the sidebar</p>
                  </div>
                `}}setupEventListeners(){let e=this.querySelectorAll(".sidebar-button");e.forEach(t=>{t.addEventListener("click",()=>{let r=t.dataset.section;if(this.currentSection===r)return;console.log("Sidebar button clicked:",r),e.forEach(o=>o.classList.remove("active")),t.classList.add("active"),this.currentSection=r;let s=this.querySelector("#settings-content");s&&(s.innerHTML=this.renderSection(r))})}),this.addEventListener("userupdate",async()=>{console.log("User update event received"),await this.loadUserData(),this.render()})}};customElements.define("settings-view",Sa);var ka=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="appointments-page">
                <div class="page-header">
                    <h1>Appointments</h1>
                    <button class="add-button">
                        <span class="material-icons">add_task</span>
                        New Appointment
                    </button>
                </div>
                <div class="appointments-grid">
                    <!-- Appointment list will be populated here -->
                </div>
            </div>
        `}};M("appointments-view",ka);var Ra=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="tasks-page">
                <div class="page-header">
                    <h1>Tasks</h1>
                    <button class="add-button">
                        <span class="material-icons">add_task</span>
                        New Task
                    </button>
                </div>
                <div class="tasks-grid">
                    <!-- Task list will be populated here -->
                </div>
            </div>
        `,this.setupEventListeners()}setupEventListeners(){}};M("tasks-view",Ra);var Pa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="calendar-page">
                <div class="page-header">
                    <h1>Calendar</h1>
                    <div class="calendar-controls">
                        <button class="view-button">
                            <span class="material-icons">view_module</span>
                            Month
                        </button>
                        <button class="view-button">
                            <span class="material-icons">view_week</span>
                            Week
                        </button>
                        <button class="view-button">
                            <span class="material-icons">view_day</span>
                            Day
                        </button>
                    </div>
                </div>
                <div class="calendar-grid">
                    <!-- Calendar will be populated here -->
                </div>
            </div>
        `,this.setupEventListeners()}setupEventListeners(){}};M("calendar-view",Pa);var Ca=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="contacts-page">
                <div class="page-header">
                    <h1>Contacts</h1>
                    <button class="add-button">
                        <span class="material-icons">person_add</span>
                        Add Contact
                    </button>
                </div>
                <div class="contacts-grid">
                    <div class="contacts-table">
                        <!-- Contacts table will be populated here -->
                    </div>
                </div>
            </div>
        `,this.setupEventListeners(),this.fetchContacts()}setupEventListeners(){this.querySelector(".add-button").addEventListener("click",()=>{this.showAddContactModal()})}async fetchContacts(){let e=firebase.auth().currentUser;if(!e)return;let t=firebase.firestore().collection("contacts"),r=(await e.getIdTokenResult()).claims.admin,s=t.where("userId","==",e.uid);r&&(s=t);let c=(await s.get()).docs.map(u=>({id:u.id,...u.data()}));this.renderContacts(c)}renderContacts(e){let t=this.querySelector(".contacts-table");t.innerHTML=e.length?`
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map(r=>`
                                <tr>
                                    <td>${r.firstName}</td>
                                    <td>${r.lastName}</td>
                                    <td>${r.email}</td>
                                </tr>
                            `).join("")}
                    </tbody>
                </table>
            `:"<p>No contacts available</p>"}showAddContactModal(){let e=document.createElement("div");e.className="modal",e.innerHTML=`
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Add Contact</h2>
                <form id="add-contact-form">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" required>
                    
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" required>
                    
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    
                    <button type="submit">Add</button>
                </form>
            </div>
        `,document.body.appendChild(e),e.querySelector(".close").addEventListener("click",()=>e.remove()),e.querySelector("#add-contact-form").addEventListener("submit",async t=>{t.preventDefault();let r=new FormData(t.target);await firebase.firestore().collection("contacts").add({firstName:r.get("firstName"),lastName:r.get("lastName"),email:r.get("email"),userId:firebase.auth().currentUser.uid,createdAt:firebase.firestore.FieldValue.serverTimestamp()}),e.remove(),this.fetchContacts()})}};M("contacts-view",Ca);var xa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="addresses-page">
                <div class="page-header">
                    <h1>Addresses</h1>
                    <button class="add-button">
                        <span class="material-icons">add_location</span>
                        Add Address
                    </button>
                </div>
                <div class="addresses-grid">
                    <!-- Address cards will be populated here -->
                </div>
            </div>
        `,this.setupEventListeners(),this.fetchAddresses()}setupEventListeners(){this.querySelector(".add-button").addEventListener("click",()=>{})}async fetchAddresses(){let e=firebase.auth().currentUser;if(!e)return;let s=(await firebase.firestore().collection("addresses").where("userId","==",e.uid).get()).docs.map(o=>({id:o.id,...o.data()}));this.renderAddresses(s)}renderAddresses(e){let t=this.querySelector(".addresses-grid");t.innerHTML=e.length?e.map(r=>this.createAddressCard(r)).join(""):"<p>No addresses available</p>"}createAddressCard(e){return`
            <div class="address-card">
                <img src="${e.photoURL||"/placeholder.png"}" alt="Address Photo" class="address-photo">
                <div class="address-details">
                    <h2>${e.address}</h2>
                    <p>City: ${e.city}, State: ${e.state}, ZIP: ${e.zip}</p>
                    <p><strong>Salesman:</strong> ${e.salesman?.name||"Not Assigned"}</p>
                    <p><strong>Setter:</strong> ${e.setter?.name||"Not Assigned"}</p>
                </div>
                <div class="address-actions">
                    <button class="view-button" data-id="${e.id}">
                        <span class="material-icons">visibility</span>
                        View
                    </button>
                </div>
            </div>
        `}};M("addresses-view",xa);var Da=class extends HTMLElement{connectedCallback(){this.loadUserData()}async loadUserData(){let e=firebase.auth().currentUser;if(e)try{let r=(await firebase.firestore().collection("users").doc(e.uid).get()).data();this.render(r)}catch(t){console.error("Error loading user data:",t)}}render(e={}){this.innerHTML=`
            <div class="daily-view">
                <div class="dashboard-grid">
                    <div class="dashboard-card welcome-card">
                        <h2>Welcome Back, ${e.firstName||"User"}!</h2>
                        <p class="date">${new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
                    </div>

                    <div class="dashboard-card stats-card">
                        <h3>Your Stats</h3>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Swag Points</span>
                                <span class="stat-value">${e.swagPoints||0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Active Tasks</span>
                                <span class="stat-value">${e.activeTasks||0}</span>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-card tasks-card">
                        <h3>Today's Tasks</h3>
                        <div class="tasks-list">
                            <!-- Will be populated with tasks -->
                            <p class="empty-state">No tasks due today</p>
                        </div>
                    </div>

                    <div class="dashboard-card messages-card">
                        <h3>Recent Messages</h3>
                        <div class="messages-list">
                            <!-- Will be populated with messages -->
                            <p class="empty-state">No new messages</p>
                        </div>
                    </div>
                </div>
            </div>
        `}};M("daily-view",Da);var Na=class extends HTMLElement{constructor(){super(),this.map=null,this.leadData=null}connectedCallback(){console.log("LeadsView connected"),this.render(),this.loadGoogleMapsScript().then(()=>this.loadLeadData()).catch(e=>console.error("Error initializing leads view:",e))}render(){this.innerHTML=`
            <div class="leads-page">
                <div class="page-header">
                    <h1>Leads Management</h1>
                    <button class="add-button">
                        <span class="material-icons">add_circle</span>
                        New Lead
                    </button>
                </div>
                <div class="leads-content">
                    <div class="leads-list">
                        <!-- Leads will be loaded here -->
                    </div>
                    <div id="map-container" class="map-container">
                        <!-- Map will be initialized here -->
                    </div>
                </div>
            </div>
        `}loadGoogleMapsScript(){return new Promise((e,t)=>{if(window.google?.maps){e();return}let r=document.createElement("script");r.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8kQcCqXqvKLn1C0pu0RWbr4Kw-gYF6jw&libraries=places,drawing,geometry",r.async=!0,r.defer=!0,r.onload=e,r.onerror=t,document.head.appendChild(r)})}async loadLeadData(){try{let e=firebase.auth().currentUser;if(!e)return;let s=(await firebase.firestore().collection("leads").where("userId","==",e.uid).get()).docs.map(o=>({id:o.id,...o.data()}));this.renderLeads(s)}catch(e){console.error("Error loading leads:",e)}}renderLeads(e){let t=this.querySelector(".leads-list");if(!e.length){t.innerHTML='<p class="no-leads">No leads available</p>';return}t.innerHTML=e.map(r=>`
            <div class="lead-card" data-id="${r.id}">
                <h3>${r.address||"Unnamed Lead"}</h3>
                <p>${r.status||"New"}</p>
                <div class="lead-actions">
                    <button class="view-lead" data-id="${r.id}">
                        <span class="material-icons">visibility</span>
                    </button>
                </div>
            </div>
        `).join(""),this.setupLeadCardListeners()}setupLeadCardListeners(){this.querySelectorAll(".view-lead").forEach(t=>{t.addEventListener("click",r=>{let s=r.currentTarget.dataset.id;window.location.hash=`leads/${s}`})})}};M("leads-view",Na);var Oa=class extends HTMLElement{constructor(){super(),this.map=null,this.drawingManager=null,this.territories=new Map,this.currentTerritory=null,this.initialized=!1}async connectedCallback(){this.initialized||(await this.loadGoogleMapsScript(),this.render(),await this.initializeMap(),await this.loadTerritories(),this.setupEventListeners(),this.initialized=!0)}loadGoogleMapsScript(){return new Promise((e,t)=>{if(window.google?.maps){e();return}let r=document.createElement("script");r.src=`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=drawing,geometry`,r.defer=!0,r.async=!0,r.onload=e,r.onerror=t,document.head.appendChild(r)})}render(){this.innerHTML=`
            <div class="territory-map-container">
                <div class="map-controls">
                    <div class="control-panel">
                        <button id="draw-territory" class="control-btn" disabled>
                            <span class="material-icons">draw</span>
                            Draw Territory
                        </button>
                        <button id="edit-boundary" class="control-btn" disabled>
                            <span class="material-icons">edit</span>
                            Edit Boundary
                        </button>
                    </div>
                </div>
                <div id="map" style="width: 100%; height: 100%;"></div>
            </div>
        `}async initializeMap(){let e=this.querySelector("#map");if(!e)return;this.map=new google.maps.Map(e,{center:{lat:39.8283,lng:-98.5795},zoom:4,mapTypeControl:!0,streetViewControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP}),this.drawingManager=new google.maps.drawing.DrawingManager({drawingMode:null,drawingControl:!1,polygonOptions:{fillColor:"#4CAF50",fillOpacity:.2,strokeColor:"#4CAF50",strokeWeight:2,editable:!1}}),this.drawingManager.setMap(this.map);let t=firebase.auth().currentUser;if(t){let r=await firebase.firestore().collection("users").doc(t.uid).get();r.exists&&r.data().role==="admin"&&(this.querySelector("#draw-territory").disabled=!1,this.querySelector("#edit-boundary").disabled=!1)}}async loadTerritories(){try{let e=await firebase.firestore().collection("territories").get();if(e.forEach(t=>{let r=t.data();this.addTerritoryToMap(t.id,r)}),e.size>0){let t=new google.maps.LatLngBounds;this.territories.forEach(r=>{r.getPath().forEach(s=>t.extend(s))}),this.map.fitBounds(t)}}catch(e){console.error("Error loading territories:",e)}}addTerritoryToMap(e,t){if(!t.boundaries||!t.boundaries.coordinates)return;let r=t.boundaries.coordinates.map(o=>new google.maps.LatLng(o.lat,o.lng)),s=new google.maps.Polygon({paths:r,fillColor:"#4CAF50",fillOpacity:.2,strokeColor:"#4CAF50",strokeWeight:2,editable:!1,map:this.map});this.territories.set(e,s),s.addListener("click",()=>{this.selectTerritory(e,s)})}selectTerritory(e,t){this.currentTerritory&&this.territories.get(this.currentTerritory).setOptions({fillColor:"#4CAF50",strokeColor:"#4CAF50"}),this.currentTerritory=e,t.setOptions({fillColor:"#2196F3",strokeColor:"#2196F3"}),this.dispatchEvent(new CustomEvent("territory-selected",{detail:{territoryId:e},bubbles:!0}))}setupEventListeners(){this.querySelector("#draw-territory")?.addEventListener("click",()=>{this.startDrawing()}),this.querySelector("#edit-boundary")?.addEventListener("click",()=>{this.toggleBoundaryEditing()}),google.maps.event.addListener(this.drawingManager,"polygoncomplete",e=>{this.handlePolygonComplete(e)})}startDrawing(){this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON),this.querySelector("#draw-territory").disabled=!0}toggleBoundaryEditing(){if(!this.currentTerritory)return;let e=this.territories.get(this.currentTerritory),t=!e.getEditable();e.setEditable(t),this.querySelector("#edit-boundary").classList.toggle("active",t)}handlePolygonComplete(e){this.drawingManager.setDrawingMode(null),this.querySelector("#draw-territory").disabled=!1;let t=e.getPath().getArray().map(r=>({lat:r.lat(),lng:r.lng()}));this.dispatchEvent(new CustomEvent("territory-drawn",{detail:{coordinates:t},bubbles:!0})),e.setMap(null)}enableDrawing(){this.startDrawing()}panToTerritory(e){let t=this.territories.get(e);if(t){let r=new google.maps.LatLngBounds;t.getPath().forEach(s=>r.extend(s)),this.map.fitBounds(r),this.selectTerritory(e,t)}}};M("territory-map",Oa);var La=class extends HTMLElement{constructor(){super(),this.initialized=!1,this.currentTerritory=null,this.userRole=null}async connectedCallback(){this.initialized||(await this.loadUserRole(),this.render(),this.setupEventListeners(),this.initialized=!0)}async loadUserRole(){try{let e=firebase.auth().currentUser;if(!e)throw new Error("User not authenticated");let t=await firebase.firestore().collection("users").doc(e.uid).get();if(!t.exists)throw new Error("User data not found");this.userRole=t.data().role,console.log(`User role: ${this.userRole}`)}catch(e){console.error("Error loading user role:",e)}}render(){this.innerHTML=`
            <div class="territories-page">
                <div class="page-header">
                    <h1>Territory Management</h1>
                    ${this.userRole==="admin"?`
                        <button id="create-territory" class="add-button">
                            <span class="material-icons">add</span>
                            Create Territory
                        </button>
                    `:""}
                </div>
                <div class="territories-layout">
                    <div class="map-section">
                        <territory-map id="territory-map"></territory-map>
                    </div>
                    <div class="details-section">
                        ${this.currentTerritory?this.renderTerritoryDetails():this.renderEmptyState()}
                    </div>
                </div>
            </div>
        `}renderEmptyState(){return`
            <div class="empty-state">
                <span class="material-icons">map</span>
                ${this.userRole==="admin"?"<p>Create a new territory or select an existing one to manage</p>":"<p>Select a territory to view details</p>"}
            </div>
        `}renderTerritoryDetails(){return`
            <div class="territory-details">
                <h2>${this.currentTerritory.name}</h2>
                <p>Details and actions will go here.</p>
            </div>
        `}setupEventListeners(){let e=this.querySelector("#territory-map");if(!e){console.error("Territory map component not found");return}e.addEventListener("territory-selected",t=>{this.handleTerritorySelection(t.detail.territoryId)}),e.addEventListener("territory-drawn",t=>{this.handleTerritoryDrawn(t.detail.coordinates)}),this.querySelector("#create-territory")?.addEventListener("click",()=>{this.showTerritoryNamePrompt()})}async handleTerritorySelection(e){try{let t=await firebase.firestore().collection("territories").doc(e).get();if(!t.exists)throw new Error("Territory not found");this.currentTerritory={id:t.id,...t.data()},this.render()}catch(t){console.error("Error loading territory:",t)}}async handleTerritoryDrawn(e){if(!e||e.length===0){console.error("Invalid coordinates received:",e);return}let t={boundaries:{coordinates:e},createdAt:new Date().toISOString(),status:"new",createdBy:firebase.auth().currentUser?.uid||"unknown"};this.showCreateTerritoryModal(t)}showTerritoryNamePrompt(){let e=prompt("Enter the name of the new territory:");e&&this.showLocationPrompt(e)}showLocationPrompt(e){let t=prompt("Enter the location (state, zip code, or full address) for the territory:");t&&this.geocodeLocation(t,e)}async geocodeLocation(e,t){try{let s=await(await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(e)}&key=YOUR_API_KEY`)).json();if(s.results.length>0){let{lat:o,lng:c}=s.results[0].geometry.location;this.showCreateTerritoryModal(t,{lat:o,lng:c})}else alert("Location not found. Please try again.")}catch(r){console.error("Geocoding error:",r),alert("An error occurred while geocoding the location. Please try again.")}}showCreateTerritoryModal(e,t){let r=document.createElement("territory-create");r.setAttribute("territory-name",e),r.setAttribute("initial-location",JSON.stringify(t)),document.body.appendChild(r)}};M("territories-view",La);var Va=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="landing-page">
                <div class="hero-section">
                    <div class="hero-content">
                        <h1>SalesBlanket</h1>
                        <p class="hero-subtitle">Smart Territory Management</p>
                        <div class="hero-actions">
                            <button class="login-button" onclick="window.location.hash='login'">
                                <span class="material-icons">login</span>
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

                <div class="features-section">
                    <h2>Features</h2>
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="material-icons">map</span>
                            <h3>Territory Management</h3>
                            <p>Efficiently manage and track your territories</p>
                        </div>
                        <div class="feature-card">
                            <span class="material-icons">people</span>
                            <h3>Team Management</h3>
                            <p>Coordinate canvassers and inspectors</p>
                        </div>
                        <div class="feature-card">
                            <span class="material-icons">analytics</span>
                            <h3>Performance Tracking</h3>
                            <p>Track and analyze team performance</p>
                        </div>
                    </div>
                </div>
            </div>
        `}};M("landing-view",Va);var Ma=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="login-page">
                <div class="login-container">
                    <div class="login-card">
                        <div class="login-header">
                            <h1>SalesBlanket</h1>
                            <p class="login-subtitle">Sign in to continue</p>
                        </div>
                        
                        <div class="login-body">
                            <button id="google-signin-btn" class="google-signin-button">
                                <img src="https://www.google.com/favicon.ico" alt="Google" class="google-icon">
                                Sign in with Google
                            </button>
                            <p class="login-note">Please use your company email address</p>
                        </div>
                    </div>
                </div>
            </div>
        `,this.setupLoginHandler()}setupLoginHandler(){let e=this.querySelector("#google-signin-btn");e&&e.addEventListener("click",async()=>{try{let t=new firebase.auth.GoogleAuthProvider;await firebase.auth().signInWithPopup(t)}catch(t){console.error("Google Sign-In Error:",t),alert("Failed to log in. Please make sure to use your company email.")}})}};M("login-view",Ma);var Fa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="not-found-page">
                <h1>404</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        `}};M("not-found-view",Fa);var Ua=class extends HTMLElement{connectedCallback(){console.log("UnauthorizedView connected"),this.innerHTML=`
            <div class="unauthorized-page">
                <div class="unauthorized-container">
                    <span class="material-icons error-icon">error_outline</span>
                    <h1>Access Denied</h1>
                    <p>You don't have permission to access this page.</p>
                    <button class="return-button" onclick="window.location.hash='daily-view'">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        `}};M("unauthorized-view",Ua);var qa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="management-page">
                <div class="page-header">
                    <h1>Canvasser Management</h1>
                    <div class="header-actions">
                        <button class="add-button">
                            <span class="material-icons">person_add</span>
                            Add Canvasser
                        </button>
                    </div>
                </div>
                
                <div class="management-grid">
                    <div class="grid-section territories">
                        <h2>Territories</h2>
                        <div class="territory-list">
                            <!-- Territory assignments -->
                        </div>
                    </div>
                    
                    <div class="grid-section canvassers">
                        <h2>Active Canvassers</h2>
                        <div class="canvasser-list">
                            <!-- Active canvassers -->
                        </div>
                    </div>
                    
                    <div class="grid-section metrics">
                        <h2>Performance Metrics</h2>
                        <div class="metrics-grid">
                            <!-- Performance data -->
                        </div>
                    </div>
                </div>
            </div>
        `}};M("canvasser-management-view",qa);var Ba=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="management-page">
                <div class="page-header">
                    <h1>Inspector Management</h1>
                    <div class="header-actions">
                        <button class="add-button">
                            <span class="material-icons">person_add</span>
                            Add Inspector
                        </button>
                    </div>
                </div>
                
                <div class="management-grid">
                    <div class="grid-section assignments">
                        <h2>Current Assignments</h2>
                        <div class="assignment-list">
                            <!-- Inspector assignments -->
                        </div>
                    </div>
                    
                    <div class="grid-section inspectors">
                        <h2>Active Inspectors</h2>
                        <div class="inspector-list">
                            <!-- Active inspectors -->
                        </div>
                    </div>
                </div>
            </div>
        `}};M("inspector-management-view",Ba);var za=class extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
            <footer class="main-footer">
                <div class="footer-content">
                    <div class="copyright-text">
                        \xA9 ${new Date().getFullYear()} SalesBlanket. All Operations & Intellectual Property Rights 
                        Reserved. Patent Pending.
                    </div>
                    <div class="company-info">
                        RenewedSolutions<br>
                        est. 2024
                    </div>
                </div>
            </footer>
        `}};customElements.define("footer-bar",za);var ja=class extends HTMLElement{constructor(){super(),this.user=null}connectedCallback(){this.render()}async checkProfileStatus(e){try{let t=await firebase.firestore().collection("users").doc(e).get();if(t.exists){let r=t.data();return!r.firstName||!r.lastName||!r.mobilePhone}return!0}catch(t){return console.error("Error checking profile status:",t),!1}}render(){this.innerHTML=`
            <header class="main-header">
                <div class="brand-section">
                    <div class="logo">SalesBlanket</div>
                    <div class="version">v1.0.0</div>
                </div>
                <div id="auth-section" class="auth-section"></div>
            </header>
        `,this.setupVersionClick(),this.setupAuthDisplay()}setupVersionClick(){console.log("Setting up version click handler");let e=this.querySelector(".version");console.log("Version element:",e),e?e.addEventListener("click",()=>{console.log("Version clicked");try{let t=document.createElement("version-modal");document.body.appendChild(t),console.log("Modal created and appended")}catch(t){console.error("Error creating modal:",t)}}):console.warn("Version element not found")}async setupAuthDisplay(){firebase.auth().onAuthStateChanged(async e=>{if(!e){this.querySelector("#auth-section").innerHTML="";return}this.user=e,this.needsProfileUpdate=await this.checkProfileStatus(e.uid);let t=this.querySelector("#auth-section");t.innerHTML=`
                <span class="user-name">${e.displayName||"User"}</span>
                <div class="notification-wrapper">
                    <div class="notification-icon ${this.needsProfileUpdate?"active":""}">
                        <span class="material-icons">local_police</span>
                        ${this.needsProfileUpdate?'<div class="notification-pulse"></div>':""}
                    </div>
                    <div class="notification-dropdown">
                        <div class="notification-header">
                            <h3>Notifications</h3>
                        </div>
                        <div class="notification-list">
                            ${this.needsProfileUpdate?`
                                <div class="notification-item" data-action="complete-profile">
                                    <div class="notification-content">
                                        <span class="material-icons">warning</span>
                                        <div class="notification-text">
                                            <p>Complete your employee profile</p>
                                            <small>Required for full access</small>
                                        </div>
                                    </div>
                                </div>
                            `:`
                                <div class="notification-empty">
                                    <p>No new notifications</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
                <button id="settings-btn" class="settings-button">
                    <span id="settings-btn" class="material-icons" style="cursor: pointer; margin: 0 10px;">settings</span>
                </button>
                <button id="signout-btn" class="signout-button">Sign Out</button>
            `,this.setupNotifications(),this.setupButtons()})}setupNotifications(){let e=this.querySelector(".notification-icon"),t=this.querySelector(".notification-dropdown");if(e&&t){e.addEventListener("click",s=>{s.stopPropagation(),t.classList.toggle("show")});let r=this.querySelector(".notification-item");r&&r.addEventListener("click",()=>{window.location.hash="settings",t.classList.remove("show")}),document.addEventListener("click",s=>{!t.contains(s.target)&&!e.contains(s.target)&&t.classList.remove("show")})}}setupButtons(){this.querySelector("#signout-btn")?.addEventListener("click",()=>{firebase.auth().signOut()}),this.querySelector("#settings-btn")?.addEventListener("click",()=>{window.location.hash="settings"})}};customElements.define("header-bar",ja);var $a=class extends HTMLElement{connectedCallback(){firebase.auth().onAuthStateChanged(e=>{e?this.fetchUserData(e.uid).then(t=>{this.user=t,console.log("Rendering nav menu. User role:",this.user?.role),this.render()}):this.innerHTML=""})}async fetchUserData(e){let t=await firebase.firestore().collection("users").doc(e).get();return t.exists?t.data():null}render(){let e=this.user?.role==="pending";console.log("Rendering nav menu. User role:",this.user?.role),this.innerHTML=`
            <nav class="sub-header">
                <div class="nav-buttons">
                    <div class="nav-group">
                        <button class="nav-button" data-route="dashboard">
                            <span class="material-icons">dashboard</span>
                            Dashboard
                        </button>
                        <div class="management-dropdown">
                            <div class="management-item">
                                Management
                                <div class="sub-management">
                                    <div class="sub-management-item" data-route="canvasser-management">
                                        Canvasser Management
                                    </div>
                                    <div class="sub-management-item" data-route="inspector-management">
                                        Inspector Management
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="nav-button" data-route="daily-view">
                        <span class="material-icons">today</span>
                        Daily View
                    </button>
                    <button class="nav-button" data-route="leads">
                    <span class="material-icons">assignment_ind</span>
                        Leads
                    </button>
                    <button class="nav-button" data-route="contacts">
                        <span class="material-icons">people</span>
                        Contacts
                    </button>
                    <button class="nav-button" data-route="addresses">
                        <span class="material-icons">location_on</span>
                        Addresses
                    </button>
                    <button class="nav-button" data-route="map">
                        <span class="material-icons">map</span>
                        Map
                    </button>
                    <button class="nav-button" data-route="appointments">
                        <span class="material-icons">assignment</span>
                        appointments
                    </button>
                    <button class="nav-button" data-route="tasks">
                        <span class="material-icons">task</span>
                        Tasks
                    </button>
                    <button class="nav-button" data-route="calendar">
                        <span class="material-icons">calendar_today</span>
                        Calendar
                    </button>
                    <button class="nav-button" data-route="territories">
                        <span class="material-icons">map</span>
                        Territories
                    </button>
                </div>
            </nav>
        `,console.log("Nav menu rendered successfully"),this.setupNavigationEvents()}setupNavigationEvents(){this.querySelectorAll(".nav-button").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.route;window.location.hash=t})}),this.querySelectorAll(".sub-management-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.route;window.location.hash=t})})}};customElements.define("nav-menu",$a);var Ga=class extends HTMLElement{constructor(){super(),this.selectedWorkflow=null,this.workflows=[],this.phases=[]}async connectedCallback(){let e=this.getAttribute("workflow-id");await this.loadWorkflows(),e&&(this.selectedWorkflow=this.workflows.find(t=>t.id===e),this.selectedWorkflow&&await this.loadPhases(e)),this.render()}async loadWorkflows(){try{let e=await firebase.firestore().collection("workflows").get();this.workflows=e.docs.map(t=>({id:t.id,...t.data()}))}catch(e){console.error("Error loading workflows:",e)}}async loadPhases(e){try{let t=await firebase.firestore().collection("workflows").doc(e).get();t.exists&&(this.phases=t.data().phases||[])}catch(t){console.error("Error loading phases:",t)}}render(){this.innerHTML=`
            <div class="phase-management">
                ${this.selectedWorkflow?this.renderPhaseManagement():this.renderWorkflowSelection()}
            </div>
        `,this.setupEventListeners()}renderWorkflowSelection(){return`
            <div class="workflow-selection">
                <div class="section-header">
                    <h2>Select Workflow</h2>
                </div>
                <div class="workflows-list">
                    ${this.workflows.map(e=>`
                        <div class="workflow-card" data-id="${e.id}">
                            <div class="workflow-info">
                                <h3>${e.name}</h3>
                                <span class="collection-type">Collection: ${e.collection}</span>
                            </div>
                            <button class="select-workflow-btn">
                                <span class="material-icons">arrow_forward</span>
                                Manage Phases
                            </button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `}renderPhaseManagement(){return`
            <div class="phase-section">
                <div class="section-header">
                    <div class="header-info">
                        <h2>Phases for ${this.selectedWorkflow.name}</h2>
                        <span class="collection-type">Collection: ${this.selectedWorkflow.collection}</span>
                    </div>
                    <button class="add-phase-btn">
                        <span class="material-icons">add</span>
                        Add Phase
                    </button>
                </div>

                <div class="phases-list">
                    ${this.phases.length?this.phases.map(e=>`
                        <div class="phase-item" data-id="${e.id}">
                            <div class="phase-color" style="background-color: ${e.color}"></div>
                            <div class="phase-info">
                                <h3>${e.name}</h3>
                                <p>${e.description||""}</p>
                            </div>
                            <div class="phase-actions">
                                <button class="edit-phase-btn">
                                    <span class="material-icons">edit</span>
                                </button>
                                <button class="manage-stages-btn">
                                    <span class="material-icons">view_list</span>
                                    Manage Stages
                                </button>
                            </div>
                        </div>
                    `).join(""):`
                        <div class="empty-state">
                            <p>No phases created yet</p>
                            <p>Click 'Add Phase' to get started</p>
                        </div>
                    `}
                </div>
            </div>
        `}setupEventListeners(){this.querySelectorAll(".select-workflow-btn").forEach(e=>{e.addEventListener("click",async t=>{let r=t.target.closest(".workflow-card").dataset.id;this.selectedWorkflow=this.workflows.find(s=>s.id===r),await this.loadPhases(r),this.render()})}),this.querySelector(".add-phase-btn")?.addEventListener("click",()=>{this.showPhaseModal()}),this.querySelectorAll(".edit-phase-btn").forEach(e=>{e.addEventListener("click",t=>{let r=t.target.closest(".phase-item").dataset.id,s=this.phases.find(o=>o.id===r);this.showPhaseModal(s)})}),this.querySelectorAll(".manage-stages-btn").forEach(e=>{e.addEventListener("click",t=>{let r=t.target.closest(".phase-item").dataset.id;this.dispatchEvent(new CustomEvent("managestages",{detail:{workflowId:this.selectedWorkflow.id,phaseId:r},bubbles:!0}))})})}};customElements.define("phase-management",Ga);var Ha=class extends HTMLElement{constructor(){super(),this.handleKeyPress=this.handleKeyPress.bind(this)}connectedCallback(){this.render(),document.addEventListener("keydown",this.handleKeyPress)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyPress)}handleKeyPress(e){e.key==="Escape"&&this.close()}close(){this.remove()}getVersionHistory(){return`
    SalesBlanket Version History
    ===========================
    
    Version 1.0.2 (December 21, 2024)
    --------------------------------
    \u2022 Added role management system
    \u2022 Implemented user invite functionality
    \u2022 Updated phase structure to include communication systems
    \u2022 Reorganized development roadmap
    
    Phase 1: Core System Updates & Role Management
    --------------------------------------------
    1. Role System Restructuring
       \u2022 Update existing roles (setter, closer)
       \u2022 Add manager role
       \u2022 Create role assignment interface in settings
       \u2022 Update security rules
       \u2022 Add role-specific views/access
    
    2. Collection Structure Updates
       \u2022 Addresses collection stages
         - new_without_contact
         - do_not_solicit
         - damage_present
         - go_back
       \u2022 Contacts collection stages
         - new_without_address
         - do_not_solicit
         - address_added
       \u2022 Leads collection stages
         - appointment_scheduled
    
    3. Basic UI Components
       \u2022 Implement reusable kanban board
       \u2022 Update navigation for new roles
       \u2022 Add settings interfaces
    
    Phase 2: Communications & Territory Management
    -------------------------------------------
    1. Communication Systems
       \u2022 Email Integration
         - SMTP/Email service setup
         - User invite emails
         - Notification templates
         - Email verification
       \u2022 Twilio SMS Integration
         - SMS verification
         - Text notifications
         - Opt-in/out management
       \u2022 Communication Preferences
         - User notification settings
         - Frequency controls
    
    2. Territory Management
       \u2022 Create territory drawing interface
       \u2022 Territory assignment system
       \u2022 Boundary management
       \u2022 Territory sharing capabilities
       \u2022 Admin-only territory controls
    
    3. Map Component Enhancement
       \u2022 Collection-based filters
       \u2022 Status-based pin colors
       \u2022 Territory overlay visualization
       \u2022 Area selection tools
       \u2022 Filter views by collection type
    
    Phase 3: Task & Automation System
    -------------------------------
    1. Task Management
       \u2022 Basic task creation
       \u2022 Door knock tracking
       \u2022 Flyer status tracking
       \u2022 Task assignment system
       \u2022 Task completion workflows
    
    2. Automation System
       \u2022 Settings page automation builder
       \u2022 Notification rule configuration
       \u2022 Task generation rules
       \u2022 Follow-up automation
    
    Phase 4: Integration Systems
    --------------------------
    1. GHL Integration
       \u2022 API connection setup
       \u2022 Contact sync
       \u2022 Appointment sync
       \u2022 Task sync
       \u2022 Error handling & retry logic
    
    2. Notification System
       \u2022 Access request notifications
       \u2022 Territory-based alerts
       \u2022 Geographic grouping
       \u2022 Manager alerts
       \u2022 Task notifications
    
    Phase 5: Advanced Features & Reporting
    ----------------------------------
    1. Progress Tracking
       \u2022 User performance metrics
       \u2022 Territory performance tracking
       \u2022 Conversion rate tracking
       \u2022 Activity logging
    
    2. Reporting System
       \u2022 Basic reports
       \u2022 Custom report builder
       \u2022 Automated reporting
       \u2022 Export capabilities
    
    Phase 6: Optimization & Enhancement
    --------------------------------
    1. System Optimization
       \u2022 Performance improvements
       \u2022 Data caching
       \u2022 Load time optimization
       \u2022 Mobile responsiveness
    
    2. User Experience Enhancements
       \u2022 Bulk operations
       \u2022 Advanced filters
       \u2022 Quick actions
       \u2022 User preferences
    
    Dependencies & Considerations:
    ---------------------------
    1. Role system must be completed before territory management
    2. Collection structure updates needed before task system
    3. Basic UI components required for all phases
    4. Communication systems needed for notifications
    5. Territory system needed before geographic notifications
    
    Previous Versions:
    ----------------
    Version 1.0.1 (December 20, 2024)
    \u2022 Fixed authentication flow to direct to daily-view
    \u2022 Added daily-view button to navigation menu
    \u2022 Corrected routes organization and imports
    \u2022 Added profile completion notification
    \u2022 Implemented proper routing for authenticated/public pages
    
    Version 1.0.0 (December 19, 2024)
    \u2022 Initial release
    \u2022 Basic authentication system
    \u2022 User role management
    \u2022 Navigation structure
    \u2022 Core application framework`}render(){this.innerHTML=`
            <div class="version-modal">
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-title">Version History</div>
                        <button class="terminal-close">\xD7</button>
                    </div>
                    <div class="terminal-content">
                        <pre class="terminal-text">${this.getVersionHistory()}</pre>
                    </div>
                </div>
            </div>
        `,this.querySelector(".terminal-close").addEventListener("click",()=>this.close())}};customElements.define("version-modal",Ha);document.addEventListener("DOMContentLoaded",()=>{console.log("App initializing..."),new vi,document.getElementById("route-content")||console.error("route-content element missing"),document.querySelector("nav-menu")||console.error("nav-menu element missing")});window.addEventListener("error",n=>{console.error("Global error:",n.error);let e=document.getElementById("debug");e&&(e.textContent=`Error: ${n.error.message}`,e.style.backgroundColor="red",e.style.color="white")});
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=bundle.js.map
