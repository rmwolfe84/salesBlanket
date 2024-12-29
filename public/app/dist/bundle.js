(()=>{var Mc=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},xh=function(n){let e=[],t=0,r=0;for(;t<n.length;){let s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){let o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){let o=n[t++],c=n[t++],l=n[t++],d=((s&7)<<18|(o&63)<<12|(c&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{let o=n[t++],c=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|c&63)}}return e.join("")},Fc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){let o=n[s],c=s+1<n.length,l=c?n[s+1]:0,d=s+2<n.length,p=d?n[s+2]:0,E=o>>2,b=(o&3)<<4|l>>4,A=(l&15)<<2|p>>6,k=p&63;d||(k=64,c||(A=64)),r.push(t[E],t[b],t[A],t[k])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Mc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):xh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){let o=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;let p=s<n.length?t[n.charAt(s)]:64;++s;let b=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||l==null||p==null||b==null)throw new $i;let A=o<<2|l>>4;if(r.push(A),p!==64){let k=l<<4&240|p>>2;if(r.push(k),b!==64){let N=p<<6&192|b;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},$i=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Oh=function(n){let e=Mc(n);return Fc.encodeByteArray(e,!0)},_n=function(n){return Oh(n).replace(/\./g,"")},Hi=function(n){try{return Fc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Vh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Lh=()=>Vh().__FIREBASE_DEFAULTS__,Mh=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Hi(n[1]);return e&&JSON.parse(e)},mr=()=>{try{return Lh()||Mh()||Fh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Wi=n=>{var e,t;return(t=(e=mr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Uc=n=>{let e=Wi(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Qi=()=>{var n;return(n=mr())===null||n===void 0?void 0:n.config},Ji=n=>{var e;return(e=mr())===null||e===void 0?void 0:e[`_${n}`]};var pr=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function qc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let c=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[_n(JSON.stringify(t)),_n(JSON.stringify(c)),""].join(".")}function te(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Bc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(te())}function Uh(){var n;let e=(n=mr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function jc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function zc(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Gc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $c(){let n=te();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Kc(){return!Uh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Yi(){try{return typeof indexedDB=="object"}catch{return!1}}function Hc(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}var qh="FirebaseError",ve=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=qh,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ue.prototype.create)}},Ue=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],c=o?Bh(o,r):"Error",l=`${this.serviceName}: ${c} (${s}).`;return new ve(s,l,r)}};function Bh(n,e){return n.replace(jh,(t,r)=>{let s=e[r];return s!=null?String(s):`<${r}?>`})}var jh=/\{\$([^}]+)}/g;function Wc(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ut(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let s of t){if(!r.includes(s))return!1;let o=n[s],c=e[s];if(Lc(o)&&Lc(c)){if(!ut(o,c))return!1}else if(o!==c)return!1}for(let s of r)if(!t.includes(s))return!1;return!0}function Lc(n){return n!==null&&typeof n=="object"}function Ct(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function kt(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[s,o]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(o)}}),e}function Nt(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Qc(n,e){let t=new Ki(n,e);return t.subscribe.bind(t)}var Ki=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");zh(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Gi),s.error===void 0&&(s.error=Gi),s.complete===void 0&&(s.complete=Gi);let o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function zh(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Gi(){}var jm=4*60*60*1e3;function qe(n){return n&&n._delegate?n._delegate:n}var Ie=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var lt="[DEFAULT]";var Xi=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new pr;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($h(e))try{this.getOrInitializeService({instanceIdentifier:lt})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(t);try{let o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=lt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=lt){return this.instances.has(e)}getOptions(e=lt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[o,c]of this.instancesDeferred.entries()){let l=this.normalizeInstanceIdentifier(o);r===l&&c.resolve(s)}return s}onInit(e,t){var r;let s=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);let c=this.instances.get(s);return c&&e(c,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Gh(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=lt){return this.component?this.component.multipleInstances?e:lt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Gh(n){return n===lt?void 0:n}function $h(n){return n.instantiationMode==="EAGER"}var gr=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Xi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Kh=[],O;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(O||(O={}));var Hh={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Wh=O.INFO,Qh={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Jh=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),s=Qh[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Je=class{constructor(e){this.name=e,this._logLevel=Wh,this._logHandler=Jh,this._userLogHandler=null,Kh.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Hh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}};var Yh=(n,e)=>e.some(t=>n instanceof t),Jc,Yc;function Xh(){return Jc||(Jc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Zh(){return Yc||(Yc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Xc=new WeakMap,es=new WeakMap,Zc=new WeakMap,Zi=new WeakMap,ns=new WeakMap;function ed(n){let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",c)},o=()=>{t(Pe(n.result)),s()},c=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",c)});return e.then(t=>{t instanceof IDBCursor&&Xc.set(t,n)}).catch(()=>{}),ns.set(e,n),e}function td(n){if(es.has(n))return;let e=new Promise((t,r)=>{let s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",c),n.removeEventListener("abort",c)},o=()=>{t(),s()},c=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",c),n.addEventListener("abort",c)});es.set(n,e)}var ts={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return es.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Zc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Pe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function eu(n){ts=n(ts)}function nd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(_r(this),e,...t);return Zc.set(r,e.sort?e.sort():[e]),Pe(r)}:Zh().includes(n)?function(...e){return n.apply(_r(this),e),Pe(Xc.get(this))}:function(...e){return Pe(n.apply(_r(this),e))}}function rd(n){return typeof n=="function"?nd(n):(n instanceof IDBTransaction&&td(n),Yh(n,Xh())?new Proxy(n,ts):n)}function Pe(n){if(n instanceof IDBRequest)return ed(n);if(Zi.has(n))return Zi.get(n);let e=rd(n);return e!==n&&(Zi.set(n,e),ns.set(e,n)),e}var _r=n=>ns.get(n);function nu(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){let c=indexedDB.open(n,e),l=Pe(c);return r&&c.addEventListener("upgradeneeded",d=>{r(Pe(c.result),d.oldVersion,d.newVersion,Pe(c.transaction),d)}),t&&c.addEventListener("blocked",d=>t(d.oldVersion,d.newVersion,d)),l.then(d=>{o&&d.addEventListener("close",()=>o()),s&&d.addEventListener("versionchange",p=>s(p.oldVersion,p.newVersion,p))}).catch(()=>{}),l}var id=["get","getKey","getAll","getAllKeys","count"],sd=["put","add","delete","clear"],rs=new Map;function tu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(rs.get(e))return rs.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,s=sd.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||id.includes(t)))return;let o=async function(c,...l){let d=this.transaction(c,s?"readwrite":"readonly"),p=d.store;return r&&(p=p.index(l.shift())),(await Promise.all([p[t](...l),s&&d.done]))[0]};return rs.set(e,o),o}eu(n=>({...n,get:(e,t,r)=>tu(e,t)||n.get(e,t,r),has:(e,t)=>!!tu(e,t)||n.has(e,t)}));var ss=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(od(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function od(n){let e=n.getComponent();return e?.type==="VERSION"}var os="@firebase/app",ru="0.10.12";var Be=new Je("@firebase/app"),ad="@firebase/app-compat",cd="@firebase/analytics-compat",ud="@firebase/analytics",ld="@firebase/app-check-compat",hd="@firebase/app-check",dd="@firebase/auth",fd="@firebase/auth-compat",pd="@firebase/database",md="@firebase/data-connect",gd="@firebase/database-compat",_d="@firebase/functions",yd="@firebase/functions-compat",vd="@firebase/installations",wd="@firebase/installations-compat",Id="@firebase/messaging",Ed="@firebase/messaging-compat",Td="@firebase/performance",bd="@firebase/performance-compat",Ad="@firebase/remote-config",Sd="@firebase/remote-config-compat",Rd="@firebase/storage",Pd="@firebase/storage-compat",Cd="@firebase/firestore",kd="@firebase/vertexai-preview",Nd="@firebase/firestore-compat",Dd="firebase",xd="10.14.0";var as="[DEFAULT]",Od={[os]:"fire-core",[ad]:"fire-core-compat",[ud]:"fire-analytics",[cd]:"fire-analytics-compat",[hd]:"fire-app-check",[ld]:"fire-app-check-compat",[dd]:"fire-auth",[fd]:"fire-auth-compat",[pd]:"fire-rtdb",[md]:"fire-data-connect",[gd]:"fire-rtdb-compat",[_d]:"fire-fn",[yd]:"fire-fn-compat",[vd]:"fire-iid",[wd]:"fire-iid-compat",[Id]:"fire-fcm",[Ed]:"fire-fcm-compat",[Td]:"fire-perf",[bd]:"fire-perf-compat",[Ad]:"fire-rc",[Sd]:"fire-rc-compat",[Rd]:"fire-gcs",[Pd]:"fire-gcs-compat",[Cd]:"fire-fst",[Nd]:"fire-fst-compat",[kd]:"fire-vertex","fire-js":"fire-js",[Dd]:"fire-js-all"};var yr=new Map,Vd=new Map,cs=new Map;function iu(n,e){try{n.container.addComponent(e)}catch(t){Be.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xe(n){let e=n.name;if(cs.has(e))return Be.debug(`There were multiple attempts to register component ${e}.`),!1;cs.set(e,n);for(let t of yr.values())iu(t,n);for(let t of Vd.values())iu(t,n);return!0}function vn(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function je(n){return n.settings!==void 0}var Ld={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ye=new Ue("app","Firebase",Ld);var us=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ie("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ye.create("app-deleted",{appName:this._name})}};var Ze=xd;function ds(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:as,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Ye.create("bad-app-name",{appName:String(s)});if(t||(t=Qi()),!t)throw Ye.create("no-options");let o=yr.get(s);if(o){if(ut(t,o.options)&&ut(r,o.config))return o;throw Ye.create("duplicate-app",{appName:s})}let c=new gr(s);for(let d of cs.values())c.addComponent(d);let l=new us(t,r,c);return yr.set(s,l),l}function vr(n=as){let e=yr.get(n);if(!e&&n===as&&Qi())return ds();if(!e)throw Ye.create("no-app",{appName:n});return e}function be(n,e,t){var r;let s=(r=Od[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);let o=s.match(/\s|\//),c=e.match(/\s|\//);if(o||c){let l=[`Unable to register library "${s}" with version "${e}":`];o&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&c&&l.push("and"),c&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Be.warn(l.join(" "));return}Xe(new Ie(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var Md="firebase-heartbeat-database",Fd=1,yn="firebase-heartbeat-store",is=null;function cu(){return is||(is=nu(Md,Fd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(yn)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ye.create("idb-open",{originalErrorMessage:n.message})})),is}async function Ud(n){try{let t=(await cu()).transaction(yn),r=await t.objectStore(yn).get(uu(n));return await t.done,r}catch(e){if(e instanceof ve)Be.warn(e.message);else{let t=Ye.create("idb-get",{originalErrorMessage:e?.message});Be.warn(t.message)}}}async function su(n,e){try{let r=(await cu()).transaction(yn,"readwrite");await r.objectStore(yn).put(e,uu(n)),await r.done}catch(t){if(t instanceof ve)Be.warn(t.message);else{let r=Ye.create("idb-set",{originalErrorMessage:t?.message});Be.warn(r.message)}}}function uu(n){return`${n.name}!${n.options.appId}`}var qd=1024,Bd=30*24*60*60*1e3,ls=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new hs(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ou();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(c=>{let l=new Date(c.date).valueOf();return Date.now()-l<=Bd}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Be.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=ou(),{heartbeatsToSend:r,unsentEntries:s}=jd(this._heartbeatsCache.heartbeats),o=_n(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Be.warn(t),""}}};function ou(){return new Date().toISOString().substring(0,10)}function jd(n,e=qd){let t=[],r=n.slice();for(let s of n){let o=t.find(c=>c.agent===s.agent);if(o){if(o.dates.push(s.date),au(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),au(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var hs=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yi()?Hc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Ud(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let s=await this.read();return su(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let s=await this.read();return su(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}};function au(n){return _n(JSON.stringify({version:2,heartbeats:n})).length}function zd(n){Xe(new Ie("platform-logger",e=>new ss(e),"PRIVATE")),Xe(new Ie("heartbeat",e=>new ls(e),"PRIVATE")),be(os,ru,n),be(os,ru,"esm2017"),be("fire-js","")}zd("");var Gd="firebase",$d="10.14.0";be(Gd,$d,"app");function wr(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Ru(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Pu=Ru,Cu=new Ue("auth","Firebase",Ru());var Sr=new Je("@firebase/auth");function Kd(n,...e){Sr.logLevel<=O.WARN&&Sr.warn(`Auth (${Ze}): ${n}`,...e)}function Er(n,...e){Sr.logLevel<=O.ERROR&&Sr.error(`Auth (${Ze}): ${n}`,...e)}function Ae(n,...e){throw xs(n,...e)}function ke(n,...e){return xs(n,...e)}function ku(n,e,t){let r=Object.assign(Object.assign({},Pu()),{[e]:t});return new Ue("auth","Firebase",r).create(e,{appName:n.name})}function ht(n){return ku(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xs(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Cu.create(n,...e)}function P(n,e,...t){if(!n)throw xs(e,...t)}function Ce(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Er(e),new Error(e)}function Ge(n,e){n||Ce(e)}function ms(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Hd(){return lu()==="http:"||lu()==="https:"}function lu(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Wd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Hd()||zc()||"connection"in navigator)?navigator.onLine:!0}function Qd(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var dt=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ge(t>e,"Short delay should be less than long delay!"),this.isMobile=Bc()||Gc()}get(){return Wd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Os(n,e){Ge(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Rr=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ce("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ce("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ce("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Jd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Yd=new dt(3e4,6e4);function ne(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function le(n,e,t,r,s={}){return Nu(n,s,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});let l=Ct(Object.assign({key:n.config.apiKey},c)).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);let p=Object.assign({method:e,headers:d},o);return jc()||(p.referrerPolicy="no-referrer"),Rr.fetch()(Du(n,n.config.apiHost,t,l),p)})}async function Nu(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Jd),e);try{let s=new gs(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();let c=await o.json();if("needConfirmation"in c)throw wn(n,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{let l=o.ok?c.errorMessage:c.error.message,[d,p]=l.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw wn(n,"credential-already-in-use",c);if(d==="EMAIL_EXISTS")throw wn(n,"email-already-in-use",c);if(d==="USER_DISABLED")throw wn(n,"user-disabled",c);let E=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(p)throw ku(n,E,p);Ae(n,E)}}catch(s){if(s instanceof ve)throw s;Ae(n,"network-request-failed",{message:String(s)})}}async function _t(n,e,t,r,s={}){let o=await le(n,e,t,r,s);return"mfaPendingCredential"in o&&Ae(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Du(n,e,t,r){let s=`${e}${t}?${r}`;return n.config.emulator?Os(n.config,s):`${n.config.apiScheme}://${s}`}function Xd(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var gs=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ke(this.auth,"network-request-failed")),Yd.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function wn(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let s=ke(n,e,r);return s.customData._tokenResponse=t,s}function hu(n){return n!==void 0&&n.enterprise!==void 0}var _s=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Xd(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Zd(n,e){return le(n,"GET","/v2/recaptchaConfig",ne(n,e))}async function ef(n,e){return le(n,"POST","/v1/accounts:delete",e)}async function xu(n,e){return le(n,"POST","/v1/accounts:lookup",e)}function In(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ou(n,e=!1){let t=qe(n),r=await t.getIdToken(e),s=Vs(r);P(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");let o=typeof s.firebase=="object"?s.firebase:void 0,c=o?.sign_in_provider;return{claims:s,token:r,authTime:In(fs(s.auth_time)),issuedAtTime:In(fs(s.iat)),expirationTime:In(fs(s.exp)),signInProvider:c||null,signInSecondFactor:o?.sign_in_second_factor||null}}function fs(n){return Number(n)*1e3}function Vs(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Er("JWT malformed, contained fewer than 3 sections"),null;try{let s=Hi(t);return s?JSON.parse(s):(Er("Failed to decode base64 JWT payload"),null)}catch(s){return Er("Caught error parsing JWT payload as JSON",s?.toString()),null}}function du(n){let e=Vs(n);return P(e,"internal-error"),P(typeof e.exp<"u","internal-error"),P(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Tn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ve&&tf(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function tf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var ys=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var bn=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=In(this.lastLoginAt),this.creationTime=In(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Pr(n){var e;let t=n.auth,r=await n.getIdToken(),s=await Tn(n,xu(t,{idToken:r}));P(s?.users.length,t,"internal-error");let o=s.users[0];n._notifyReloadListener(o);let c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?Lu(o.providerUserInfo):[],l=nf(n.providerData,c),d=n.isAnonymous,p=!(n.email&&o.passwordHash)&&!l?.length,E=d?p:!1,b={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new bn(o.createdAt,o.lastLoginAt),isAnonymous:E};Object.assign(n,b)}async function Vu(n){let e=qe(n);await Pr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function nf(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Lu(n){return n.map(e=>{var{providerId:t}=e,r=wr(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function rf(n,e){let t=await Nu(n,{},async()=>{let r=Ct({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,c=Du(n,s,"/v1/token",`key=${o}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Rr.fetch()(c,{method:"POST",headers:l,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function sf(n,e){return le(n,"POST","/v2/accounts:revokeToken",ne(n,e))}var En=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){P(e.idToken,"internal-error"),P(typeof e.idToken<"u","internal-error"),P(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):du(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){P(e.length!==0,"internal-error");let t=du(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(P(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:s,expiresIn:o}=await rf(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:s,expirationTime:o}=t,c=new n;return r&&(P(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),s&&(P(typeof s=="string","internal-error",{appName:e}),c.accessToken=s),o&&(P(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Ce("not implemented")}};function et(n,e){P(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var xt=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,o=wr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ys(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new bn(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){let t=await Tn(this,this.stsTokenManager.getToken(this.auth,e));return P(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ou(this,e)}reload(){return Vu(this)}_assign(e){this!==e&&(P(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){P(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Pr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(je(this.auth.app))return Promise.reject(ht(this.auth));let e=await this.getIdToken();return await Tn(this,ef(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,o,c,l,d,p,E;let b=(r=t.displayName)!==null&&r!==void 0?r:void 0,A=(s=t.email)!==null&&s!==void 0?s:void 0,k=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,N=(c=t.photoURL)!==null&&c!==void 0?c:void 0,F=(l=t.tenantId)!==null&&l!==void 0?l:void 0,D=(d=t._redirectEventId)!==null&&d!==void 0?d:void 0,Z=(p=t.createdAt)!==null&&p!==void 0?p:void 0,H=(E=t.lastLoginAt)!==null&&E!==void 0?E:void 0,{uid:K,emailVerified:X,isAnonymous:Re,providerData:ee,stsTokenManager:v}=t;P(K&&v,e,"internal-error");let f=En.fromJSON(this.name,v);P(typeof K=="string",e,"internal-error"),et(b,e.name),et(A,e.name),P(typeof X=="boolean",e,"internal-error"),P(typeof Re=="boolean",e,"internal-error"),et(k,e.name),et(N,e.name),et(F,e.name),et(D,e.name),et(Z,e.name),et(H,e.name);let g=new n({uid:K,auth:e,email:A,emailVerified:X,displayName:b,isAnonymous:Re,photoURL:N,phoneNumber:k,tenantId:F,stsTokenManager:f,createdAt:Z,lastLoginAt:H});return ee&&Array.isArray(ee)&&(g.providerData=ee.map(_=>Object.assign({},_))),D&&(g._redirectEventId=D),g}static async _fromIdTokenResponse(e,t,r=!1){let s=new En;s.updateFromServerResponse(t);let o=new n({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Pr(o),o}static async _fromGetAccountInfoResponse(e,t,r){let s=t.users[0];P(s.localId!==void 0,"internal-error");let o=s.providerUserInfo!==void 0?Lu(s.providerUserInfo):[],c=!(s.email&&s.passwordHash)&&!o?.length,l=new En;l.updateFromIdToken(r);let d=new n({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:c}),p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new bn(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!o?.length};return Object.assign(d,p),d}};var fu=new Map;function ze(n){Ge(n instanceof Function,"Expected a class definition");let e=fu.get(n);return e?(Ge(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,fu.set(n,e),e)}var Cr=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Cr.type="NONE";var vs=Cr;function Tr(n,e,t){return`firebase:${n}:${e}:${t}`}var kr=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:s,name:o}=this.auth;this.fullUserKey=Tr(this.userKey,s.apiKey,o),this.fullPersistenceKey=Tr("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?xt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(ze(vs),e,r);let s=(await Promise.all(t.map(async p=>{if(await p._isAvailable())return p}))).filter(p=>p),o=s[0]||ze(vs),c=Tr(r,e.config.apiKey,e.name),l=null;for(let p of t)try{let E=await p._get(c);if(E){let b=xt._fromJSON(e,E);p!==o&&(l=b),o=p;break}}catch{}let d=s.filter(p=>p._shouldAllowMigration);return!o._shouldAllowMigration||!d.length?new n(o,e,r):(o=d[0],l&&await o._set(c,l.toJSON()),await Promise.all(t.map(async p=>{if(p!==o)try{await p._remove(c)}catch{}})),new n(o,e,r))}};function pu(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Mu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ju(e))return"Blackberry";if(zu(e))return"Webos";if(Fu(e))return"Safari";if((e.includes("chrome/")||Uu(e))&&!e.includes("edge/"))return"Chrome";if(Bu(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Mu(n=te()){return/firefox\//i.test(n)}function Fu(n=te()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Uu(n=te()){return/crios\//i.test(n)}function qu(n=te()){return/iemobile/i.test(n)}function Bu(n=te()){return/android/i.test(n)}function ju(n=te()){return/blackberry/i.test(n)}function zu(n=te()){return/webos/i.test(n)}function Ls(n=te()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function of(n=te()){var e;return Ls(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function af(){return $c()&&document.documentMode===10}function Gu(n=te()){return Ls(n)||Bu(n)||zu(n)||ju(n)||/windows phone/i.test(n)||qu(n)}function $u(n,e=[]){let t;switch(n){case"Browser":t=pu(te());break;case"Worker":t=`${pu(te())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ze}/${r}`}var ws=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=o=>new Promise((c,l)=>{try{let d=e(o);c(d)}catch(d){l(d)}});r.onAbort=t,this.queue.push(r);let s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function cf(n,e={}){return le(n,"GET","/v2/passwordPolicy",ne(n,e))}var uf=6,Is=class{constructor(e){var t,r,s,o;let c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=c.minPasswordLength)!==null&&t!==void 0?t:uf,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,o,c,l;let d={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,d),this.validatePasswordCharacterOptions(e,d),d.isValid&&(d.isValid=(t=d.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),d.isValid&&(d.isValid=(r=d.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),d.isValid&&(d.isValid=(s=d.containsLowercaseLetter)!==null&&s!==void 0?s:!0),d.isValid&&(d.isValid=(o=d.containsUppercaseLetter)!==null&&o!==void 0?o:!0),d.isValid&&(d.isValid=(c=d.containsNumericCharacter)!==null&&c!==void 0?c:!0),d.isValid&&(d.isValid=(l=d.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),d}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}};var Es=class{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nr(this),this.idTokenSubscription=new Nr(this),this.beforeStateQueue=new ws(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ze(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await kr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await xu(this,{idToken:e}),r=await xt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(je(this.app)){let c=this.app.settings.authIdToken;return c?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(l,l))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let c=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s?._redirectEventId,d=await this.tryRedirectSignIn(e);(!c||c===l)&&d?.user&&(s=d.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(c){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return P(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Pr(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(je(this.app))return Promise.reject(ht(this));let t=e?qe(e):null;return t&&P(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&P(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return je(this.app)?Promise.reject(ht(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return je(this.app)?Promise.reject(ht(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ze(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await cf(this),t=new Is(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ue("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await sf(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ze(e)||this._popupRedirectResolver;P(t,this,"argument-error"),this.redirectPersistenceManager=await kr.create(this,[ze(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};let o=typeof t=="function"?t:t.next.bind(t),c=!1,l=this._isInitialized?Promise.resolve():this._initializationPromise;if(P(l,this,"internal-error"),l.then(()=>{c||o(this.currentUser)}),typeof t=="function"){let d=e.addObserver(t,r,s);return()=>{c=!0,d()}}else{let d=e.addObserver(t);return()=>{c=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return P(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=$u(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Kd(`Error while retrieving App Check token: ${t.error}`),t?.token}};function On(n){return qe(n)}var Nr=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Qc(t=>this.observer=t)}get next(){return P(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Wr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lf(n){Wr=n}function Ku(n){return Wr.loadJS(n)}function hf(){return Wr.recaptchaEnterpriseScript}function df(){return Wr.gapiScript}function Hu(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var ff="recaptcha-enterprise",pf="NO_RECAPTCHA",Ts=class{constructor(e){this.type=ff,this.auth=On(e)}async verify(e="verify",t=!1){async function r(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(c,l)=>{Zd(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{let p=new _s(d);return o.tenantId==null?o._agentRecaptchaConfig=p:o._tenantRecaptchaConfigs[o.tenantId]=p,c(p.siteKey)}}).catch(d=>{l(d)})})}function s(o,c,l){let d=window.grecaptcha;hu(d)?d.enterprise.ready(()=>{d.enterprise.execute(o,{action:e}).then(p=>{c(p)}).catch(()=>{c(pf)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((o,c)=>{r(this.auth).then(l=>{if(!t&&hu(window.grecaptcha))s(l,o,c);else{if(typeof window>"u"){c(new Error("RecaptchaVerifier is only supported in browser"));return}let d=hf();d.length!==0&&(d+=l),Ku(d).then(()=>{s(l,o,c)}).catch(p=>{c(p)})}}).catch(l=>{c(l)})})}};async function mu(n,e,t,r=!1){let s=new Ts(n),o;try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}let c=Object.assign({},e);return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function gu(n,e,t,r){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let o=await mu(n,e,t,t==="getOobCode");return r(n,o)}else return r(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let c=await mu(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(o)})}function Wu(n,e){let t=vn(n,"auth");if(t.isInitialized()){let s=t.getImmediate(),o=t.getOptions();if(ut(o,e??{}))return s;Ae(s,"already-initialized")}return t.initialize({options:e})}function mf(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(ze);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Qu(n,e,t){let r=On(n);P(r._canInitEmulator,r,"emulator-config-failed"),P(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let s=!!t?.disableWarnings,o=Ju(e),{host:c,port:l}=gf(e),d=l===null?"":`:${l}`;r.config.emulator={url:`${o}//${c}${d}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:c,port:l,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||_f()}function Ju(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function gf(n){let e=Ju(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){let o=s[1];return{host:o,port:_u(r.substr(o.length+1))}}else{let[o,c]=r.split(":");return{host:o,port:_u(c)}}}function _u(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function _f(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var ft=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ce("not implemented")}_getIdTokenResponse(e){return Ce("not implemented")}_linkToIdToken(e,t){return Ce("not implemented")}_getReauthenticationResolver(e){return Ce("not implemented")}};async function yf(n,e){return le(n,"POST","/v1/accounts:signUp",e)}async function vf(n,e){return _t(n,"POST","/v1/accounts:signInWithPassword",ne(n,e))}async function wf(n,e){return _t(n,"POST","/v1/accounts:signInWithEmailLink",ne(n,e))}async function If(n,e){return _t(n,"POST","/v1/accounts:signInWithEmailLink",ne(n,e))}var An=class n extends ft{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return gu(e,t,"signInWithPassword",vf);case"emailLink":return wf(e,{email:this._email,oobCode:this._password});default:Ae(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return gu(e,r,"signUpPassword",yf);case"emailLink":return If(e,{idToken:t,email:this._email,oobCode:this._password});default:Ae(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Dt(n,e){return _t(n,"POST","/v1/accounts:signInWithIdp",ne(n,e))}var Ef="http://localhost",pt=class n extends ft{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ae("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,o=wr(t,["providerId","signInMethod"]);if(!r||!s)return null;let c=new n(r,s);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){let t=this.buildRequest();return Dt(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Dt(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Dt(e,t)}buildRequest(){let e={requestUri:Ef,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ct(t)}return e}};async function Tf(n,e){return le(n,"POST","/v1/accounts:sendVerificationCode",ne(n,e))}async function bf(n,e){return _t(n,"POST","/v1/accounts:signInWithPhoneNumber",ne(n,e))}async function Af(n,e){let t=await _t(n,"POST","/v1/accounts:signInWithPhoneNumber",ne(n,e));if(t.temporaryProof)throw wn(n,"account-exists-with-different-credential",t);return t}var Sf={USER_NOT_FOUND:"user-not-found"};async function Rf(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return _t(n,"POST","/v1/accounts:signInWithPhoneNumber",ne(n,t),Sf)}var Sn=class n extends ft{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return bf(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Af(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Rf(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:o}=e;return!r&&!t&&!s&&!o?null:new n({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:o})}};function Pf(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Cf(n){let e=kt(Nt(n)).link,t=e?kt(Nt(e)).deep_link_id:null,r=kt(Nt(n)).deep_link_id;return(r?kt(Nt(r)).link:null)||r||t||e||n}var Dr=class n{constructor(e){var t,r,s,o,c,l;let d=kt(Nt(e)),p=(t=d.apiKey)!==null&&t!==void 0?t:null,E=(r=d.oobCode)!==null&&r!==void 0?r:null,b=Pf((s=d.mode)!==null&&s!==void 0?s:null);P(p&&E&&b,"argument-error"),this.apiKey=p,this.operation=b,this.code=E,this.continueUrl=(o=d.continueUrl)!==null&&o!==void 0?o:null,this.languageCode=(c=d.languageCode)!==null&&c!==void 0?c:null,this.tenantId=(l=d.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){let t=Cf(e);try{return new n(t)}catch{return null}}};var Ot=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return An._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Dr.parseLink(t);return P(r,"argument-error"),An._fromEmailAndCode(e,r.code,r.tenantId)}};Ot.PROVIDER_ID="password";Ot.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ot.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var xr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var mt=class extends xr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Rn=class n extends mt{constructor(){super("facebook.com")}static credential(e){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Rn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Rn.PROVIDER_ID="facebook.com";var Pn=class n extends mt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Pn.GOOGLE_SIGN_IN_METHOD="google.com";Pn.PROVIDER_ID="google.com";var Cn=class n extends mt{constructor(){super("github.com")}static credential(e){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Cn.GITHUB_SIGN_IN_METHOD="github.com";Cn.PROVIDER_ID="github.com";var kn=class n extends mt{constructor(){super("twitter.com")}static credential(e,t){return pt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};kn.TWITTER_SIGN_IN_METHOD="twitter.com";kn.PROVIDER_ID="twitter.com";var Nn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){let o=await xt._fromIdTokenResponse(e,r,s),c=yu(r);return new n({user:o,providerId:c,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let s=yu(r);return new n({user:e,providerId:s,_tokenResponse:r,operationType:t})}};function yu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var bs=class n extends ve{constructor(e,t,r,s){var o;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new n(e,t,r,s)}};function Yu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?bs._fromErrorAndOperation(n,o,e,r):o})}async function kf(n,e,t=!1){let r=await Tn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Nn._forOperation(n,"link",r)}async function Nf(n,e,t=!1){let{auth:r}=n;if(je(r.app))return Promise.reject(ht(r));let s="reauthenticate";try{let o=await Tn(n,Yu(r,s,e,n),t);P(o.idToken,r,"internal-error");let c=Vs(o.idToken);P(c,r,"internal-error");let{sub:l}=c;return P(n.uid===l,r,"user-mismatch"),Nn._forOperation(n,s,o)}catch(o){throw o?.code==="auth/user-not-found"&&Ae(r,"user-mismatch"),o}}async function Df(n,e,t=!1){if(je(n.app))return Promise.reject(ht(n));let r="signIn",s=await Yu(n,r,e),o=await Nn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}function Xu(n,e,t,r){return qe(n).onIdTokenChanged(e,t,r)}function Zu(n,e,t){return qe(n).beforeAuthStateChanged(e,t)}function xf(n,e){return le(n,"POST","/v2/accounts/mfaEnrollment:start",ne(n,e))}function Of(n,e){return le(n,"POST","/v2/accounts/mfaEnrollment:finalize",ne(n,e))}function Vf(n,e){return le(n,"POST","/v2/accounts/mfaEnrollment:start",ne(n,e))}function Lf(n,e){return le(n,"POST","/v2/accounts/mfaEnrollment:finalize",ne(n,e))}var Or="__sak";var Vr=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Or,"1"),this.storage.removeItem(Or),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Mf=1e3,Ff=10,Lr=class extends Vr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Gu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((c,l,d)=>{this.notifyListeners(c,d)});return}let r=e.key;t?this.detachListener():this.stopPolling();let s=()=>{let c=this.storage.getItem(r);!t&&this.localCache[r]===c||this.notifyListeners(r,c)},o=this.storage.getItem(r);af()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ff):s()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Mf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Lr.type="LOCAL";var el=Lr;var Mr=class extends Vr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Mr.type="SESSION";var Ms=Mr;function Uf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Fr=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:s,data:o}=t.data,c=this.handlersMap[s];if(!c?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});let l=Array.from(c).map(async p=>p(t.origin,o)),d=await Uf(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Fr.receivers=[];function Fs(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var As=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,c;return new Promise((l,d)=>{let p=Fs("",20);s.port1.start();let E=setTimeout(()=>{d(new Error("unsupported_event"))},r);c={messageChannel:s,onMessage(b){let A=b;if(A.data.eventId===p)switch(A.data.status){case"ack":clearTimeout(E),o=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),l(A.data.response);break;default:clearTimeout(E),clearTimeout(o),d(new Error("invalid_response"));break}}},this.handlers.add(c),s.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:p,data:t},[s.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}};function Ne(){return window}function qf(n){Ne().location.href=n}function tl(){return typeof Ne().WorkerGlobalScope<"u"&&typeof Ne().importScripts=="function"}async function Bf(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function jf(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function zf(){return tl()?self:null}var nl="firebaseLocalStorageDb",Gf=1,Ur="firebaseLocalStorage",rl="fbase_key",gt=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Qr(n,e){return n.transaction([Ur],e?"readwrite":"readonly").objectStore(Ur)}function $f(){let n=indexedDB.deleteDatabase(nl);return new gt(n).toPromise()}function Ss(){let n=indexedDB.open(nl,Gf);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Ur,{keyPath:rl})}catch(s){t(s)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Ur)?e(r):(r.close(),await $f(),e(await Ss()))})})}async function vu(n,e,t){let r=Qr(n,!0).put({[rl]:e,value:t});return new gt(r).toPromise()}async function Kf(n,e){let t=Qr(n,!1).get(e),r=await new gt(t).toPromise();return r===void 0?null:r.value}function wu(n,e){let t=Qr(n,!0).delete(e);return new gt(t).toPromise()}var Hf=800,Wf=3,qr=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ss(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>Wf)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fr._getInstance(zf()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Bf(),!this.activeServiceWorker)return;this.sender=new As(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||jf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Ss();return await vu(e,Or,"1"),await wu(e,Or),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>vu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>Kf(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(s=>{let o=Qr(s,!1).getAll();return new gt(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(let s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};qr.type="LOCAL";var il=qr;function Qf(n,e){return le(n,"POST","/v2/accounts/mfaSignIn:start",ne(n,e))}function Jf(n,e){return le(n,"POST","/v2/accounts/mfaSignIn:finalize",ne(n,e))}function Yf(n,e){return le(n,"POST","/v2/accounts/mfaSignIn:finalize",ne(n,e))}var gg=Hu("rcb"),_g=new dt(3e4,6e4);var Xf="recaptcha";async function Zf(n,e,t){var r;let s=await t.verify();try{P(typeof s=="string",n,"argument-error"),P(t.type===Xf,n,"argument-error");let o;if(typeof e=="string"?o={phoneNumber:e}:o=e,"session"in o){let c=o.session;if("phoneNumber"in o)return P(c.type==="enroll",n,"internal-error"),(await xf(n,{idToken:c.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:s}})).phoneSessionInfo.sessionInfo;{P(c.type==="signin",n,"internal-error");let l=((r=o.multiFactorHint)===null||r===void 0?void 0:r.uid)||o.multiFactorUid;return P(l,n,"missing-multi-factor-info"),(await Qf(n,{mfaPendingCredential:c.credential,mfaEnrollmentId:l,phoneSignInInfo:{recaptchaToken:s}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:c}=await Tf(n,{phoneNumber:o.phoneNumber,recaptchaToken:s});return c}}finally{t._reset()}}var Dn=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=On(e)}verifyPhoneNumber(e,t){return Zf(this.auth,e,qe(t))}static credential(e,t){return Sn._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Sn._fromTokenResponse(t,r):null}};Dn.PROVIDER_ID="phone";Dn.PHONE_SIGN_IN_METHOD="phone";function ep(n,e){return e?ze(e):(P(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var xn=class extends ft{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Dt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Dt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Dt(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function tp(n){return Df(n.auth,new xn(n),n.bypassAuthState)}function np(n){let{auth:e,user:t}=n;return P(t,e,"internal-error"),Nf(t,new xn(n),n.bypassAuthState)}async function rp(n){let{auth:e,user:t}=n;return P(t,e,"internal-error"),kf(t,new xn(n),n.bypassAuthState)}var Br=class{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:c,type:l}=e;if(c){this.reject(c);return}let d={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(d))}catch(p){this.reject(p)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tp;case"linkViaPopup":case"linkViaRedirect":return rp;case"reauthViaPopup":case"reauthViaRedirect":return np;default:Ae(this.auth,"internal-error")}}resolve(e){Ge(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ge(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var ip=new dt(2e3,1e4);var Rs=class n extends Br{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return P(e,this.auth,"internal-error"),e}async onExecution(){Ge(this.filter.length===1,"Popup operations only handle one event");let e=Fs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ke(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ke(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ip.get())};e()}};Rs.currentPopupAction=null;var sp="pendingRedirect",br=new Map,Ps=class extends Br{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=br.get(this.auth._key());if(!e){try{let r=await op(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}br.set(this.auth._key(),e)}return this.bypassAuthState||br.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function op(n,e){let t=up(e),r=cp(n);if(!await r._isAvailable())return!1;let s=await r._get(t)==="true";return await r._remove(t),s}function ap(n,e){br.set(n._key(),e)}function cp(n){return ze(n._redirectPersistence)}function up(n){return Tr(sp,n.config.apiKey,n.name)}async function lp(n,e,t=!1){if(je(n.app))return Promise.reject(ht(n));let r=On(n),s=ep(r,e),c=await new Ps(r,s,t).execute();return c&&!t&&(delete c.user._redirectEventId,await r._persistUserIfCurrent(c.user),await r._setRedirectUser(null,e)),c}var hp=10*60*1e3,Cs=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!dp(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!sl(e)){let s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(ke(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=hp&&this.cachedEventUids.clear(),this.cachedEventUids.has(Iu(e))}saveEventToCache(e){this.cachedEventUids.add(Iu(e)),this.lastProcessedEventTime=Date.now()}};function Iu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function sl({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function dp(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return sl(n);default:return!1}}async function fp(n,e={}){return le(n,"GET","/v1/projects",e)}var pp=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,mp=/^https?/;async function gp(n){if(n.config.emulator)return;let{authorizedDomains:e}=await fp(n);for(let t of e)try{if(_p(t))return}catch{}Ae(n,"unauthorized-domain")}function _p(n){let e=ms(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let c=new URL(n);return c.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&c.hostname===r}if(!mp.test(t))return!1;if(pp.test(n))return r===n;let s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}var yp=new dt(3e4,6e4);function Eu(){let n=Ne().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function vp(n){return new Promise((e,t)=>{var r,s,o;function c(){Eu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Eu(),t(ke(n,"network-request-failed"))},timeout:yp.get()})}if(!((s=(r=Ne().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=Ne().gapi)===null||o===void 0)&&o.load)c();else{let l=Hu("iframefcb");return Ne()[l]=()=>{gapi.load?c():t(ke(n,"network-request-failed"))},Ku(`${df()}?onload=${l}`).catch(d=>t(d))}}).catch(e=>{throw Ar=null,e})}var Ar=null;function wp(n){return Ar=Ar||vp(n),Ar}var Ip=new dt(5e3,15e3),Ep="__/auth/iframe",Tp="emulator/auth/iframe",bp={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ap=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Sp(n){let e=n.config;P(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Os(e,Tp):`https://${n.config.authDomain}/${Ep}`,r={apiKey:e.apiKey,appName:n.name,v:Ze},s=Ap.get(n.config.apiHost);s&&(r.eid=s);let o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${Ct(r).slice(1)}`}async function Rp(n){let e=await wp(n),t=Ne().gapi;return P(t,n,"internal-error"),e.open({where:document.body,url:Sp(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bp,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});let c=ke(n,"network-request-failed"),l=Ne().setTimeout(()=>{o(c)},Ip.get());function d(){Ne().clearTimeout(l),s(r)}r.ping(d).then(d,()=>{o(c)})}))}var Pp={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Cp=500,kp=600,Np="_blank",Dp="http://localhost",jr=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function xp(n,e,t,r=Cp,s=kp){let o=Math.max((window.screen.availHeight-s)/2,0).toString(),c=Math.max((window.screen.availWidth-r)/2,0).toString(),l="",d=Object.assign(Object.assign({},Pp),{width:r.toString(),height:s.toString(),top:o,left:c}),p=te().toLowerCase();t&&(l=Uu(p)?Np:t),Mu(p)&&(e=e||Dp,d.scrollbars="yes");let E=Object.entries(d).reduce((A,[k,N])=>`${A}${k}=${N},`,"");if(of(p)&&l!=="_self")return Op(e||"",l),new jr(null);let b=window.open(e||"",l,E);P(b,n,"popup-blocked");try{b.focus()}catch{}return new jr(b)}function Op(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var Vp="__/auth/handler",Lp="emulator/auth/handler",Mp=encodeURIComponent("fac");async function Tu(n,e,t,r,s,o){P(n.config.authDomain,n,"auth-domain-config-required"),P(n.config.apiKey,n,"invalid-api-key");let c={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ze,eventId:s};if(e instanceof xr){e.setDefaultLanguage(n.languageCode),c.providerId=e.providerId||"",Wc(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(let[E,b]of Object.entries(o||{}))c[E]=b}if(e instanceof mt){let E=e.getScopes().filter(b=>b!=="");E.length>0&&(c.scopes=E.join(","))}n.tenantId&&(c.tid=n.tenantId);let l=c;for(let E of Object.keys(l))l[E]===void 0&&delete l[E];let d=await n._getAppCheckToken(),p=d?`#${Mp}=${encodeURIComponent(d)}`:"";return`${Fp(n)}?${Ct(l).slice(1)}${p}`}function Fp({config:n}){return n.emulator?Os(n,Lp):`https://${n.authDomain}/${Vp}`}var ps="webStorageSupport",ks=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ms,this._completeRedirectFn=lp,this._overrideRedirectResult=ap}async _openPopup(e,t,r,s){var o;Ge((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");let c=await Tu(e,t,r,ms(),s);return xp(e,c,Fs())}async _openRedirect(e,t,r,s){await this._originValidation(e);let o=await Tu(e,t,r,ms(),s);return qf(o),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(Ge(o,"If manager is not set, promise should be"),o)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Rp(e),r=new Cs(e);return t.register("authEvent",s=>(P(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ps,{type:ps},s=>{var o;let c=(o=s?.[0])===null||o===void 0?void 0:o[ps];c!==void 0&&t(!!c),Ae(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=gp(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Gu()||Fu()||Ls()}},ol=ks,zr=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Ce("unexpected MultiFactorSessionType")}}},Ns=class n extends zr{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Of(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Jf(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Gr=class{constructor(){}static assertion(e){return Ns._fromCredential(e)}};Gr.FACTOR_ID="phone";var $r=class{static assertionForEnrollment(e,t){return Kr._fromSecret(e,t)}static assertionForSignIn(e,t){return Kr._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;P(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let s=await Vf(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Hr._fromStartTotpMfaEnrollmentResponse(s,r.user.auth)}};$r.FACTOR_ID="totp";var Kr=class n extends zr{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return P(typeof this.secret<"u",e,"argument-error"),Lf(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){P(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return Yf(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Hr=class n{constructor(e,t,r,s,o,c,l){this.sessionInfo=c,this.auth=l,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=s,this.enrollmentCompletionDeadline=o}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let s=!1;return(Ir(e)||Ir(t))&&(s=!0),s&&(Ir(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Ir(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Ir(n){return typeof n>"u"||n?.length===0}var bu="@firebase/auth",Au="1.7.9";var Ds=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){P(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Up(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function qp(n){Xe(new Ie("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:l}=r.options;P(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});let d={apiKey:c,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:$u(n)},p=new Es(r,s,o,d);return mf(p,t),p},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xe(new Ie("auth-internal",e=>{let t=On(e.getProvider("auth").getImmediate());return(r=>new Ds(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),be(bu,Au,Up(n)),be(bu,Au,"esm2017")}var Bp=5*60,jp=Ji("authIdTokenMaxAge")||Bp,Su=null,zp=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>jp)return;let s=t?.token;Su!==s&&(Su=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Us(n=vr()){let e=vn(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Wu(n,{popupRedirectResolver:ol,persistence:[il,el,Ms]}),r=Ji("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let o=new URL(r,location.origin);if(location.origin===o.origin){let c=zp(o.toString());Zu(t,c,()=>c(t.currentUser)),Xu(t,l=>c(l))}}let s=Wi("auth");return s&&Qu(t,`http://${s}`),t}function Gp(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}lf({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{let o=ke("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",Gp().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});qp("Browser");var al=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},cl={};var qs,ul;(function(){var n;function e(v,f){function g(){}g.prototype=f.prototype,v.D=f.prototype,v.prototype=new g,v.prototype.constructor=v,v.C=function(_,y,I){for(var m=Array(arguments.length-2),Le=2;Le<arguments.length;Le++)m[Le-2]=arguments[Le];return f.prototype[y].apply(_,m)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,f,g){g||(g=0);var _=Array(16);if(typeof f=="string")for(var y=0;16>y;++y)_[y]=f.charCodeAt(g++)|f.charCodeAt(g++)<<8|f.charCodeAt(g++)<<16|f.charCodeAt(g++)<<24;else for(y=0;16>y;++y)_[y]=f[g++]|f[g++]<<8|f[g++]<<16|f[g++]<<24;f=v.g[0],g=v.g[1],y=v.g[2];var I=v.g[3],m=f+(I^g&(y^I))+_[0]+3614090360&4294967295;f=g+(m<<7&4294967295|m>>>25),m=I+(y^f&(g^y))+_[1]+3905402710&4294967295,I=f+(m<<12&4294967295|m>>>20),m=y+(g^I&(f^g))+_[2]+606105819&4294967295,y=I+(m<<17&4294967295|m>>>15),m=g+(f^y&(I^f))+_[3]+3250441966&4294967295,g=y+(m<<22&4294967295|m>>>10),m=f+(I^g&(y^I))+_[4]+4118548399&4294967295,f=g+(m<<7&4294967295|m>>>25),m=I+(y^f&(g^y))+_[5]+1200080426&4294967295,I=f+(m<<12&4294967295|m>>>20),m=y+(g^I&(f^g))+_[6]+2821735955&4294967295,y=I+(m<<17&4294967295|m>>>15),m=g+(f^y&(I^f))+_[7]+4249261313&4294967295,g=y+(m<<22&4294967295|m>>>10),m=f+(I^g&(y^I))+_[8]+1770035416&4294967295,f=g+(m<<7&4294967295|m>>>25),m=I+(y^f&(g^y))+_[9]+2336552879&4294967295,I=f+(m<<12&4294967295|m>>>20),m=y+(g^I&(f^g))+_[10]+4294925233&4294967295,y=I+(m<<17&4294967295|m>>>15),m=g+(f^y&(I^f))+_[11]+2304563134&4294967295,g=y+(m<<22&4294967295|m>>>10),m=f+(I^g&(y^I))+_[12]+1804603682&4294967295,f=g+(m<<7&4294967295|m>>>25),m=I+(y^f&(g^y))+_[13]+4254626195&4294967295,I=f+(m<<12&4294967295|m>>>20),m=y+(g^I&(f^g))+_[14]+2792965006&4294967295,y=I+(m<<17&4294967295|m>>>15),m=g+(f^y&(I^f))+_[15]+1236535329&4294967295,g=y+(m<<22&4294967295|m>>>10),m=f+(y^I&(g^y))+_[1]+4129170786&4294967295,f=g+(m<<5&4294967295|m>>>27),m=I+(g^y&(f^g))+_[6]+3225465664&4294967295,I=f+(m<<9&4294967295|m>>>23),m=y+(f^g&(I^f))+_[11]+643717713&4294967295,y=I+(m<<14&4294967295|m>>>18),m=g+(I^f&(y^I))+_[0]+3921069994&4294967295,g=y+(m<<20&4294967295|m>>>12),m=f+(y^I&(g^y))+_[5]+3593408605&4294967295,f=g+(m<<5&4294967295|m>>>27),m=I+(g^y&(f^g))+_[10]+38016083&4294967295,I=f+(m<<9&4294967295|m>>>23),m=y+(f^g&(I^f))+_[15]+3634488961&4294967295,y=I+(m<<14&4294967295|m>>>18),m=g+(I^f&(y^I))+_[4]+3889429448&4294967295,g=y+(m<<20&4294967295|m>>>12),m=f+(y^I&(g^y))+_[9]+568446438&4294967295,f=g+(m<<5&4294967295|m>>>27),m=I+(g^y&(f^g))+_[14]+3275163606&4294967295,I=f+(m<<9&4294967295|m>>>23),m=y+(f^g&(I^f))+_[3]+4107603335&4294967295,y=I+(m<<14&4294967295|m>>>18),m=g+(I^f&(y^I))+_[8]+1163531501&4294967295,g=y+(m<<20&4294967295|m>>>12),m=f+(y^I&(g^y))+_[13]+2850285829&4294967295,f=g+(m<<5&4294967295|m>>>27),m=I+(g^y&(f^g))+_[2]+4243563512&4294967295,I=f+(m<<9&4294967295|m>>>23),m=y+(f^g&(I^f))+_[7]+1735328473&4294967295,y=I+(m<<14&4294967295|m>>>18),m=g+(I^f&(y^I))+_[12]+2368359562&4294967295,g=y+(m<<20&4294967295|m>>>12),m=f+(g^y^I)+_[5]+4294588738&4294967295,f=g+(m<<4&4294967295|m>>>28),m=I+(f^g^y)+_[8]+2272392833&4294967295,I=f+(m<<11&4294967295|m>>>21),m=y+(I^f^g)+_[11]+1839030562&4294967295,y=I+(m<<16&4294967295|m>>>16),m=g+(y^I^f)+_[14]+4259657740&4294967295,g=y+(m<<23&4294967295|m>>>9),m=f+(g^y^I)+_[1]+2763975236&4294967295,f=g+(m<<4&4294967295|m>>>28),m=I+(f^g^y)+_[4]+1272893353&4294967295,I=f+(m<<11&4294967295|m>>>21),m=y+(I^f^g)+_[7]+4139469664&4294967295,y=I+(m<<16&4294967295|m>>>16),m=g+(y^I^f)+_[10]+3200236656&4294967295,g=y+(m<<23&4294967295|m>>>9),m=f+(g^y^I)+_[13]+681279174&4294967295,f=g+(m<<4&4294967295|m>>>28),m=I+(f^g^y)+_[0]+3936430074&4294967295,I=f+(m<<11&4294967295|m>>>21),m=y+(I^f^g)+_[3]+3572445317&4294967295,y=I+(m<<16&4294967295|m>>>16),m=g+(y^I^f)+_[6]+76029189&4294967295,g=y+(m<<23&4294967295|m>>>9),m=f+(g^y^I)+_[9]+3654602809&4294967295,f=g+(m<<4&4294967295|m>>>28),m=I+(f^g^y)+_[12]+3873151461&4294967295,I=f+(m<<11&4294967295|m>>>21),m=y+(I^f^g)+_[15]+530742520&4294967295,y=I+(m<<16&4294967295|m>>>16),m=g+(y^I^f)+_[2]+3299628645&4294967295,g=y+(m<<23&4294967295|m>>>9),m=f+(y^(g|~I))+_[0]+4096336452&4294967295,f=g+(m<<6&4294967295|m>>>26),m=I+(g^(f|~y))+_[7]+1126891415&4294967295,I=f+(m<<10&4294967295|m>>>22),m=y+(f^(I|~g))+_[14]+2878612391&4294967295,y=I+(m<<15&4294967295|m>>>17),m=g+(I^(y|~f))+_[5]+4237533241&4294967295,g=y+(m<<21&4294967295|m>>>11),m=f+(y^(g|~I))+_[12]+1700485571&4294967295,f=g+(m<<6&4294967295|m>>>26),m=I+(g^(f|~y))+_[3]+2399980690&4294967295,I=f+(m<<10&4294967295|m>>>22),m=y+(f^(I|~g))+_[10]+4293915773&4294967295,y=I+(m<<15&4294967295|m>>>17),m=g+(I^(y|~f))+_[1]+2240044497&4294967295,g=y+(m<<21&4294967295|m>>>11),m=f+(y^(g|~I))+_[8]+1873313359&4294967295,f=g+(m<<6&4294967295|m>>>26),m=I+(g^(f|~y))+_[15]+4264355552&4294967295,I=f+(m<<10&4294967295|m>>>22),m=y+(f^(I|~g))+_[6]+2734768916&4294967295,y=I+(m<<15&4294967295|m>>>17),m=g+(I^(y|~f))+_[13]+1309151649&4294967295,g=y+(m<<21&4294967295|m>>>11),m=f+(y^(g|~I))+_[4]+4149444226&4294967295,f=g+(m<<6&4294967295|m>>>26),m=I+(g^(f|~y))+_[11]+3174756917&4294967295,I=f+(m<<10&4294967295|m>>>22),m=y+(f^(I|~g))+_[2]+718787259&4294967295,y=I+(m<<15&4294967295|m>>>17),m=g+(I^(y|~f))+_[9]+3951481745&4294967295,v.g[0]=v.g[0]+f&4294967295,v.g[1]=v.g[1]+(y+(m<<21&4294967295|m>>>11))&4294967295,v.g[2]=v.g[2]+y&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.u=function(v,f){f===void 0&&(f=v.length);for(var g=f-this.blockSize,_=this.B,y=this.h,I=0;I<f;){if(y==0)for(;I<=g;)s(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<f;)if(_[y++]=v.charCodeAt(I++),y==this.blockSize){s(this,_),y=0;break}}else for(;I<f;)if(_[y++]=v[I++],y==this.blockSize){s(this,_),y=0;break}}this.h=y,this.o+=f},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var f=1;f<v.length-8;++f)v[f]=0;var g=8*this.o;for(f=v.length-8;f<v.length;++f)v[f]=g&255,g/=256;for(this.u(v),v=Array(16),f=g=0;4>f;++f)for(var _=0;32>_;_+=8)v[g++]=this.g[f]>>>_&255;return v};function o(v,f){var g=l;return Object.prototype.hasOwnProperty.call(g,v)?g[v]:g[v]=f(v)}function c(v,f){this.h=f;for(var g=[],_=!0,y=v.length-1;0<=y;y--){var I=v[y]|0;_&&I==f||(g[y]=I,_=!1)}this.g=g}var l={};function d(v){return-128<=v&&128>v?o(v,function(f){return new c([f|0],0>f?-1:0)}):new c([v|0],0>v?-1:0)}function p(v){if(isNaN(v)||!isFinite(v))return b;if(0>v)return D(p(-v));for(var f=[],g=1,_=0;v>=g;_++)f[_]=v/g|0,g*=4294967296;return new c(f,0)}function E(v,f){if(v.length==0)throw Error("number format error: empty string");if(f=f||10,2>f||36<f)throw Error("radix out of range: "+f);if(v.charAt(0)=="-")return D(E(v.substring(1),f));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=p(Math.pow(f,8)),_=b,y=0;y<v.length;y+=8){var I=Math.min(8,v.length-y),m=parseInt(v.substring(y,y+I),f);8>I?(I=p(Math.pow(f,I)),_=_.j(I).add(p(m))):(_=_.j(g),_=_.add(p(m)))}return _}var b=d(0),A=d(1),k=d(16777216);n=c.prototype,n.m=function(){if(F(this))return-D(this).m();for(var v=0,f=1,g=0;g<this.g.length;g++){var _=this.i(g);v+=(0<=_?_:4294967296+_)*f,f*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(N(this))return"0";if(F(this))return"-"+D(this).toString(v);for(var f=p(Math.pow(v,6)),g=this,_="";;){var y=X(g,f).g;g=Z(g,y.j(f));var I=((0<g.g.length?g.g[0]:g.h)>>>0).toString(v);if(g=y,N(g))return I+_;for(;6>I.length;)I="0"+I;_=I+_}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function N(v){if(v.h!=0)return!1;for(var f=0;f<v.g.length;f++)if(v.g[f]!=0)return!1;return!0}function F(v){return v.h==-1}n.l=function(v){return v=Z(this,v),F(v)?-1:N(v)?0:1};function D(v){for(var f=v.g.length,g=[],_=0;_<f;_++)g[_]=~v.g[_];return new c(g,~v.h).add(A)}n.abs=function(){return F(this)?D(this):this},n.add=function(v){for(var f=Math.max(this.g.length,v.g.length),g=[],_=0,y=0;y<=f;y++){var I=_+(this.i(y)&65535)+(v.i(y)&65535),m=(I>>>16)+(this.i(y)>>>16)+(v.i(y)>>>16);_=m>>>16,I&=65535,m&=65535,g[y]=m<<16|I}return new c(g,g[g.length-1]&-2147483648?-1:0)};function Z(v,f){return v.add(D(f))}n.j=function(v){if(N(this)||N(v))return b;if(F(this))return F(v)?D(this).j(D(v)):D(D(this).j(v));if(F(v))return D(this.j(D(v)));if(0>this.l(k)&&0>v.l(k))return p(this.m()*v.m());for(var f=this.g.length+v.g.length,g=[],_=0;_<2*f;_++)g[_]=0;for(_=0;_<this.g.length;_++)for(var y=0;y<v.g.length;y++){var I=this.i(_)>>>16,m=this.i(_)&65535,Le=v.i(y)>>>16,Yt=v.i(y)&65535;g[2*_+2*y]+=m*Yt,H(g,2*_+2*y),g[2*_+2*y+1]+=I*Yt,H(g,2*_+2*y+1),g[2*_+2*y+1]+=m*Le,H(g,2*_+2*y+1),g[2*_+2*y+2]+=I*Le,H(g,2*_+2*y+2)}for(_=0;_<f;_++)g[_]=g[2*_+1]<<16|g[2*_];for(_=f;_<2*f;_++)g[_]=0;return new c(g,0)};function H(v,f){for(;(v[f]&65535)!=v[f];)v[f+1]+=v[f]>>>16,v[f]&=65535,f++}function K(v,f){this.g=v,this.h=f}function X(v,f){if(N(f))throw Error("division by zero");if(N(v))return new K(b,b);if(F(v))return f=X(D(v),f),new K(D(f.g),D(f.h));if(F(f))return f=X(v,D(f)),new K(D(f.g),f.h);if(30<v.g.length){if(F(v)||F(f))throw Error("slowDivide_ only works with positive integers.");for(var g=A,_=f;0>=_.l(v);)g=Re(g),_=Re(_);var y=ee(g,1),I=ee(_,1);for(_=ee(_,2),g=ee(g,2);!N(_);){var m=I.add(_);0>=m.l(v)&&(y=y.add(g),I=m),_=ee(_,1),g=ee(g,1)}return f=Z(v,y.j(f)),new K(y,f)}for(y=b;0<=v.l(f);){for(g=Math.max(1,Math.floor(v.m()/f.m())),_=Math.ceil(Math.log(g)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),I=p(g),m=I.j(f);F(m)||0<m.l(v);)g-=_,I=p(g),m=I.j(f);N(I)&&(I=A),y=y.add(I),v=Z(v,m)}return new K(y,v)}n.A=function(v){return X(this,v).h},n.and=function(v){for(var f=Math.max(this.g.length,v.g.length),g=[],_=0;_<f;_++)g[_]=this.i(_)&v.i(_);return new c(g,this.h&v.h)},n.or=function(v){for(var f=Math.max(this.g.length,v.g.length),g=[],_=0;_<f;_++)g[_]=this.i(_)|v.i(_);return new c(g,this.h|v.h)},n.xor=function(v){for(var f=Math.max(this.g.length,v.g.length),g=[],_=0;_<f;_++)g[_]=this.i(_)^v.i(_);return new c(g,this.h^v.h)};function Re(v){for(var f=v.g.length+1,g=[],_=0;_<f;_++)g[_]=v.i(_)<<1|v.i(_-1)>>>31;return new c(g,v.h)}function ee(v,f){var g=f>>5;f%=32;for(var _=v.g.length-g,y=[],I=0;I<_;I++)y[I]=0<f?v.i(I+g)>>>f|v.i(I+g+1)<<32-f:v.i(I+g);return new c(y,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,ul=cl.Md5=r,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=p,c.fromString=E,qs=cl.Integer=c}).apply(typeof al<"u"?al:typeof self<"u"?self:typeof window<"u"?window:{});var Jr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},$e={};var Bs,$p,Vt,js,Vn,Yr,zs,Gs,$s;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,u){return i==Array.prototype||i==Object.prototype||(i[a]=u.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Jr=="object"&&Jr];for(var a=0;a<i.length;++a){var u=i[a];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=t(this);function s(i,a){if(a)e:{var u=r;i=i.split(".");for(var h=0;h<i.length-1;h++){var w=i[h];if(!(w in u))break e;u=u[w]}i=i[i.length-1],h=u[i],a=a(h),a!=h&&a!=null&&e(u,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var u=0,h=!1,w={next:function(){if(!h&&u<i.length){var T=u++;return{value:a(T,i[T]),done:!1}}return h=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,u){return u})}});var c=c||{},l=this||self;function d(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function p(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function E(i,a,u){return i.call.apply(i.bind,arguments)}function b(i,a,u){if(!i)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,h),i.apply(a,w)}}return function(){return i.apply(a,arguments)}}function A(i,a,u){return A=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?E:b,A.apply(null,arguments)}function k(i,a){var u=Array.prototype.slice.call(arguments,1);return function(){var h=u.slice();return h.push.apply(h,arguments),i.apply(this,h)}}function N(i,a){function u(){}u.prototype=a.prototype,i.aa=a.prototype,i.prototype=new u,i.prototype.constructor=i,i.Qb=function(h,w,T){for(var R=Array(arguments.length-2),j=2;j<arguments.length;j++)R[j-2]=arguments[j];return a.prototype[w].apply(h,R)}}function F(i){let a=i.length;if(0<a){let u=Array(a);for(let h=0;h<a;h++)u[h]=i[h];return u}return[]}function D(i,a){for(let u=1;u<arguments.length;u++){let h=arguments[u];if(d(h)){let w=i.length||0,T=h.length||0;i.length=w+T;for(let R=0;R<T;R++)i[w+R]=h[R]}else i.push(h)}}class Z{constructor(a,u){this.i=a,this.j=u,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function H(i){return/^[\s\xa0]*$/.test(i)}function K(){var i=l.navigator;return i&&(i=i.userAgent)?i:""}function X(i){return X[" "](i),i}X[" "]=function(){};var Re=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function ee(i,a,u){for(let h in i)a.call(u,i[h],h,i)}function v(i,a){for(let u in i)a.call(void 0,i[u],u,i)}function f(i){let a={};for(let u in i)a[u]=i[u];return a}let g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(i,a){let u,h;for(let w=1;w<arguments.length;w++){h=arguments[w];for(u in h)i[u]=h[u];for(let T=0;T<g.length;T++)u=g[T],Object.prototype.hasOwnProperty.call(h,u)&&(i[u]=h[u])}}function y(i){var a=1;i=i.split(":");let u=[];for(;0<a&&i.length;)u.push(i.shift()),a--;return i.length&&u.push(i.join(":")),u}function I(i){l.setTimeout(()=>{throw i},0)}function m(){var i=vi;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class Le{constructor(){this.h=this.g=null}add(a,u){let h=Yt.get();h.set(a,u),this.h?this.h.next=h:this.g=h,this.h=h}}var Yt=new Z(()=>new Zl,i=>i.reset());class Zl{constructor(){this.next=this.g=this.h=null}set(a,u){this.h=a,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let Xt,Zt=!1,vi=new Le,Va=()=>{let i=l.Promise.resolve(void 0);Xt=()=>{i.then(eh)}};var eh=()=>{for(var i;i=m();){try{i.h.call(i.g)}catch(u){I(u)}var a=Yt;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}Zt=!1};function Ke(){this.s=this.s,this.C=this.C}Ke.prototype.s=!1,Ke.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ke.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var th=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{let u=()=>{};l.addEventListener("test",u,a),l.removeEventListener("test",u,a)}catch{}return i}();function en(i,a){if(oe.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var u=this.type=i.type,h=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(Re){e:{try{X(a.nodeName);var w=!0;break e}catch{}w=!1}w||(a=null)}}else u=="mouseover"?a=i.fromElement:u=="mouseout"&&(a=i.toElement);this.relatedTarget=a,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:nh[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&en.aa.h.call(this)}}N(en,oe);var nh={2:"touch",3:"pen",4:"mouse"};en.prototype.h=function(){en.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var tn="closure_listenable_"+(1e6*Math.random()|0),rh=0;function ih(i,a,u,h,w){this.listener=i,this.proxy=null,this.src=a,this.type=u,this.capture=!!h,this.ha=w,this.key=++rh,this.da=this.fa=!1}function Yn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Xn(i){this.src=i,this.g={},this.h=0}Xn.prototype.add=function(i,a,u,h,w){var T=i.toString();i=this.g[T],i||(i=this.g[T]=[],this.h++);var R=Ii(i,a,h,w);return-1<R?(a=i[R],u||(a.fa=!1)):(a=new ih(a,this.src,T,!!h,w),a.fa=u,i.push(a)),a};function wi(i,a){var u=a.type;if(u in i.g){var h=i.g[u],w=Array.prototype.indexOf.call(h,a,void 0),T;(T=0<=w)&&Array.prototype.splice.call(h,w,1),T&&(Yn(a),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Ii(i,a,u,h){for(var w=0;w<i.length;++w){var T=i[w];if(!T.da&&T.listener==a&&T.capture==!!u&&T.ha==h)return w}return-1}var Ei="closure_lm_"+(1e6*Math.random()|0),Ti={};function La(i,a,u,h,w){if(h&&h.once)return Fa(i,a,u,h,w);if(Array.isArray(a)){for(var T=0;T<a.length;T++)La(i,a[T],u,h,w);return null}return u=Ri(u),i&&i[tn]?i.K(a,u,p(h)?!!h.capture:!!h,w):Ma(i,a,u,!1,h,w)}function Ma(i,a,u,h,w,T){if(!a)throw Error("Invalid event type");var R=p(w)?!!w.capture:!!w,j=Ai(i);if(j||(i[Ei]=j=new Xn(i)),u=j.add(a,u,h,R,T),u.proxy)return u;if(h=sh(),u.proxy=h,h.src=i,h.listener=u,i.addEventListener)th||(w=R),w===void 0&&(w=!1),i.addEventListener(a.toString(),h,w);else if(i.attachEvent)i.attachEvent(qa(a.toString()),h);else if(i.addListener&&i.removeListener)i.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return u}function sh(){function i(u){return a.call(i.src,i.listener,u)}let a=oh;return i}function Fa(i,a,u,h,w){if(Array.isArray(a)){for(var T=0;T<a.length;T++)Fa(i,a[T],u,h,w);return null}return u=Ri(u),i&&i[tn]?i.L(a,u,p(h)?!!h.capture:!!h,w):Ma(i,a,u,!0,h,w)}function Ua(i,a,u,h,w){if(Array.isArray(a))for(var T=0;T<a.length;T++)Ua(i,a[T],u,h,w);else h=p(h)?!!h.capture:!!h,u=Ri(u),i&&i[tn]?(i=i.i,a=String(a).toString(),a in i.g&&(T=i.g[a],u=Ii(T,u,h,w),-1<u&&(Yn(T[u]),Array.prototype.splice.call(T,u,1),T.length==0&&(delete i.g[a],i.h--)))):i&&(i=Ai(i))&&(a=i.g[a.toString()],i=-1,a&&(i=Ii(a,u,h,w)),(u=-1<i?a[i]:null)&&bi(u))}function bi(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[tn])wi(a.i,i);else{var u=i.type,h=i.proxy;a.removeEventListener?a.removeEventListener(u,h,i.capture):a.detachEvent?a.detachEvent(qa(u),h):a.addListener&&a.removeListener&&a.removeListener(h),(u=Ai(a))?(wi(u,i),u.h==0&&(u.src=null,a[Ei]=null)):Yn(i)}}}function qa(i){return i in Ti?Ti[i]:Ti[i]="on"+i}function oh(i,a){if(i.da)i=!0;else{a=new en(a,this);var u=i.listener,h=i.ha||i.src;i.fa&&bi(i),i=u.call(h,a)}return i}function Ai(i){return i=i[Ei],i instanceof Xn?i:null}var Si="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ri(i){return typeof i=="function"?i:(i[Si]||(i[Si]=function(a){return i.handleEvent(a)}),i[Si])}function ae(){Ke.call(this),this.i=new Xn(this),this.M=this,this.F=null}N(ae,Ke),ae.prototype[tn]=!0,ae.prototype.removeEventListener=function(i,a,u,h){Ua(this,i,a,u,h)};function de(i,a){var u,h=i.F;if(h)for(u=[];h;h=h.F)u.push(h);if(i=i.M,h=a.type||a,typeof a=="string")a=new oe(a,i);else if(a instanceof oe)a.target=a.target||i;else{var w=a;a=new oe(h,i),_(a,w)}if(w=!0,u)for(var T=u.length-1;0<=T;T--){var R=a.g=u[T];w=Zn(R,h,!0,a)&&w}if(R=a.g=i,w=Zn(R,h,!0,a)&&w,w=Zn(R,h,!1,a)&&w,u)for(T=0;T<u.length;T++)R=a.g=u[T],w=Zn(R,h,!1,a)&&w}ae.prototype.N=function(){if(ae.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var u=i.g[a],h=0;h<u.length;h++)Yn(u[h]);delete i.g[a],i.h--}}this.F=null},ae.prototype.K=function(i,a,u,h){return this.i.add(String(i),a,!1,u,h)},ae.prototype.L=function(i,a,u,h){return this.i.add(String(i),a,!0,u,h)};function Zn(i,a,u,h){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var w=!0,T=0;T<a.length;++T){var R=a[T];if(R&&!R.da&&R.capture==u){var j=R.listener,ie=R.ha||R.src;R.fa&&wi(i.i,R),w=j.call(ie,h)!==!1&&w}}return w&&!h.defaultPrevented}function Ba(i,a,u){if(typeof i=="function")u&&(i=A(i,u));else if(i&&typeof i.handleEvent=="function")i=A(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:l.setTimeout(i,a||0)}function ja(i){i.g=Ba(()=>{i.g=null,i.i&&(i.i=!1,ja(i))},i.l);let a=i.h;i.h=null,i.m.apply(null,a)}class ah extends Ke{constructor(a,u){super(),this.m=a,this.l=u,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:ja(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function nn(i){Ke.call(this),this.h=i,this.g={}}N(nn,Ke);var za=[];function Ga(i){ee(i.g,function(a,u){this.g.hasOwnProperty(u)&&bi(a)},i),i.g={}}nn.prototype.N=function(){nn.aa.N.call(this),Ga(this)},nn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Pi=l.JSON.stringify,ch=l.JSON.parse,uh=class{stringify(i){return l.JSON.stringify(i,void 0)}parse(i){return l.JSON.parse(i,void 0)}};function Ci(){}Ci.prototype.h=null;function $a(i){return i.h||(i.h=i.i())}function Ka(){}var rn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ki(){oe.call(this,"d")}N(ki,oe);function Ni(){oe.call(this,"c")}N(Ni,oe);var st={},Ha=null;function er(){return Ha=Ha||new ae}st.La="serverreachability";function Wa(i){oe.call(this,st.La,i)}N(Wa,oe);function sn(i){let a=er();de(a,new Wa(a))}st.STAT_EVENT="statevent";function Qa(i,a){oe.call(this,st.STAT_EVENT,i),this.stat=a}N(Qa,oe);function fe(i){let a=er();de(a,new Qa(a,i))}st.Ma="timingevent";function Ja(i,a){oe.call(this,st.Ma,i),this.size=a}N(Ja,oe);function on(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){i()},a)}function an(){this.g=!0}an.prototype.xa=function(){this.g=!1};function lh(i,a,u,h,w,T){i.info(function(){if(i.g)if(T)for(var R="",j=T.split("&"),ie=0;ie<j.length;ie++){var U=j[ie].split("=");if(1<U.length){var ce=U[0];U=U[1];var ue=ce.split("_");R=2<=ue.length&&ue[1]=="type"?R+(ce+"="+U+"&"):R+(ce+"=redacted&")}}else R=null;else R=T;return"XMLHTTP REQ ("+h+") [attempt "+w+"]: "+a+`
`+u+`
`+R})}function hh(i,a,u,h,w,T,R){i.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+w+"]: "+a+`
`+u+`
`+T+" "+R})}function At(i,a,u,h){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+fh(i,u)+(h?" "+h:"")})}function dh(i,a){i.info(function(){return"TIMEOUT: "+a})}an.prototype.info=function(){};function fh(i,a){if(!i.g)return a;if(!a)return null;try{var u=JSON.parse(a);if(u){for(i=0;i<u.length;i++)if(Array.isArray(u[i])){var h=u[i];if(!(2>h.length)){var w=h[1];if(Array.isArray(w)&&!(1>w.length)){var T=w[0];if(T!="noop"&&T!="stop"&&T!="close")for(var R=1;R<w.length;R++)w[R]=""}}}}return Pi(u)}catch{return a}}var tr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ya={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Di;function nr(){}N(nr,Ci),nr.prototype.g=function(){return new XMLHttpRequest},nr.prototype.i=function(){return{}},Di=new nr;function He(i,a,u,h){this.j=i,this.i=a,this.l=u,this.R=h||1,this.U=new nn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Xa}function Xa(){this.i=null,this.g="",this.h=!1}var Za={},xi={};function Oi(i,a,u){i.L=1,i.v=or(Me(a)),i.m=u,i.P=!0,ec(i,null)}function ec(i,a){i.F=Date.now(),rr(i),i.A=Me(i.v);var u=i.A,h=i.R;Array.isArray(h)||(h=[String(h)]),pc(u.i,"t",h),i.C=0,u=i.j.J,i.h=new Xa,i.g=Dc(i.j,u?a:null,!i.m),0<i.O&&(i.M=new ah(A(i.Y,i,i.g),i.O)),a=i.U,u=i.g,h=i.ca;var w="readystatechange";Array.isArray(w)||(w&&(za[0]=w.toString()),w=za);for(var T=0;T<w.length;T++){var R=La(u,w[T],h||a.handleEvent,!1,a.h||a);if(!R)break;a.g[R.key]=R}a=i.H?f(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),sn(),lh(i.i,i.u,i.A,i.l,i.R,i.m)}He.prototype.ca=function(i){i=i.target;let a=this.M;a&&Fe(i)==3?a.j():this.Y(i)},He.prototype.Y=function(i){try{if(i==this.g)e:{let ue=Fe(this.g);var a=this.g.Ba();let Pt=this.g.Z();if(!(3>ue)&&(ue!=3||this.g&&(this.h.h||this.g.oa()||Ic(this.g)))){this.J||ue!=4||a==7||(a==8||0>=Pt?sn(3):sn(2)),Vi(this);var u=this.g.Z();this.X=u;t:if(tc(this)){var h=Ic(this.g);i="";var w=h.length,T=Fe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ot(this),cn(this);var R="";break t}this.h.i=new l.TextDecoder}for(a=0;a<w;a++)this.h.h=!0,i+=this.h.i.decode(h[a],{stream:!(T&&a==w-1)});h.length=0,this.h.g+=i,this.C=0,R=this.h.g}else R=this.g.oa();if(this.o=u==200,hh(this.i,this.u,this.A,this.l,this.R,ue,u),this.o){if(this.T&&!this.K){t:{if(this.g){var j,ie=this.g;if((j=ie.g?ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!H(j)){var U=j;break t}}U=null}if(u=U)At(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Li(this,u);else{this.o=!1,this.s=3,fe(12),ot(this),cn(this);break e}}if(this.P){u=!0;let Te;for(;!this.J&&this.C<R.length;)if(Te=ph(this,R),Te==xi){ue==4&&(this.s=4,fe(14),u=!1),At(this.i,this.l,null,"[Incomplete Response]");break}else if(Te==Za){this.s=4,fe(15),At(this.i,this.l,R,"[Invalid Chunk]"),u=!1;break}else At(this.i,this.l,Te,null),Li(this,Te);if(tc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ue!=4||R.length!=0||this.h.h||(this.s=1,fe(16),u=!1),this.o=this.o&&u,!u)At(this.i,this.l,R,"[Invalid Chunked Response]"),ot(this),cn(this);else if(0<R.length&&!this.W){this.W=!0;var ce=this.j;ce.g==this&&ce.ba&&!ce.M&&(ce.j.info("Great, no buffering proxy detected. Bytes received: "+R.length),ji(ce),ce.M=!0,fe(11))}}else At(this.i,this.l,R,null),Li(this,R);ue==4&&ot(this),this.o&&!this.J&&(ue==4?Pc(this.j,this):(this.o=!1,rr(this)))}else Nh(this.g),u==400&&0<R.indexOf("Unknown SID")?(this.s=3,fe(12)):(this.s=0,fe(13)),ot(this),cn(this)}}}catch{}finally{}};function tc(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function ph(i,a){var u=i.C,h=a.indexOf(`
`,u);return h==-1?xi:(u=Number(a.substring(u,h)),isNaN(u)?Za:(h+=1,h+u>a.length?xi:(a=a.slice(h,h+u),i.C=h+u,a)))}He.prototype.cancel=function(){this.J=!0,ot(this)};function rr(i){i.S=Date.now()+i.I,nc(i,i.I)}function nc(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=on(A(i.ba,i),a)}function Vi(i){i.B&&(l.clearTimeout(i.B),i.B=null)}He.prototype.ba=function(){this.B=null;let i=Date.now();0<=i-this.S?(dh(this.i,this.A),this.L!=2&&(sn(),fe(17)),ot(this),this.s=2,cn(this)):nc(this,this.S-i)};function cn(i){i.j.G==0||i.J||Pc(i.j,i)}function ot(i){Vi(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,Ga(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function Li(i,a){try{var u=i.j;if(u.G!=0&&(u.g==i||Mi(u.h,i))){if(!i.K&&Mi(u.h,i)&&u.G==3){try{var h=u.Da.g.parse(a)}catch{h=null}if(Array.isArray(h)&&h.length==3){var w=h;if(w[0]==0){e:if(!u.u){if(u.g)if(u.g.F+3e3<i.F)hr(u),ur(u);else break e;Bi(u),fe(18)}}else u.za=w[1],0<u.za-u.T&&37500>w[2]&&u.F&&u.v==0&&!u.C&&(u.C=on(A(u.Za,u),6e3));if(1>=sc(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else ct(u,11)}else if((i.K||u.g==i)&&hr(u),!H(a))for(w=u.Da.g.parse(a),a=0;a<w.length;a++){let U=w[a];if(u.T=U[0],U=U[1],u.G==2)if(U[0]=="c"){u.K=U[1],u.ia=U[2];let ce=U[3];ce!=null&&(u.la=ce,u.j.info("VER="+u.la));let ue=U[4];ue!=null&&(u.Aa=ue,u.j.info("SVER="+u.Aa));let Pt=U[5];Pt!=null&&typeof Pt=="number"&&0<Pt&&(h=1.5*Pt,u.L=h,u.j.info("backChannelRequestTimeoutMs_="+h)),h=u;let Te=i.g;if(Te){let fr=Te.g?Te.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(fr){var T=h.h;T.g||fr.indexOf("spdy")==-1&&fr.indexOf("quic")==-1&&fr.indexOf("h2")==-1||(T.j=T.l,T.g=new Set,T.h&&(Fi(T,T.h),T.h=null))}if(h.D){let zi=Te.g?Te.g.getResponseHeader("X-HTTP-Session-Id"):null;zi&&(h.ya=zi,z(h.I,h.D,zi))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-i.F,u.j.info("Handshake RTT: "+u.R+"ms")),h=u;var R=i;if(h.qa=Nc(h,h.J?h.ia:null,h.W),R.K){oc(h.h,R);var j=R,ie=h.L;ie&&(j.I=ie),j.B&&(Vi(j),rr(j)),h.g=R}else Sc(h);0<u.i.length&&lr(u)}else U[0]!="stop"&&U[0]!="close"||ct(u,7);else u.G==3&&(U[0]=="stop"||U[0]=="close"?U[0]=="stop"?ct(u,7):qi(u):U[0]!="noop"&&u.l&&u.l.ta(U),u.v=0)}}sn(4)}catch{}}var mh=class{constructor(i,a){this.g=i,this.map=a}};function rc(i){this.l=i||10,l.PerformanceNavigationTiming?(i=l.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ic(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function sc(i){return i.h?1:i.g?i.g.size:0}function Mi(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function Fi(i,a){i.g?i.g.add(a):i.h=a}function oc(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}rc.prototype.cancel=function(){if(this.i=ac(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let i of this.g.values())i.cancel();this.g.clear()}};function ac(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(let u of i.g.values())a=a.concat(u.D);return a}return F(i.i)}function gh(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(d(i)){for(var a=[],u=i.length,h=0;h<u;h++)a.push(i[h]);return a}a=[],u=0;for(h in i)a[u++]=i[h];return a}function _h(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(d(i)||typeof i=="string"){var a=[];i=i.length;for(var u=0;u<i;u++)a.push(u);return a}a=[],u=0;for(let h in i)a[u++]=h;return a}}}function cc(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(d(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var u=_h(i),h=gh(i),w=h.length,T=0;T<w;T++)a.call(void 0,h[T],u&&u[T],i)}var uc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function yh(i,a){if(i){i=i.split("&");for(var u=0;u<i.length;u++){var h=i[u].indexOf("="),w=null;if(0<=h){var T=i[u].substring(0,h);w=i[u].substring(h+1)}else T=i[u];a(T,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function at(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof at){this.h=i.h,ir(this,i.j),this.o=i.o,this.g=i.g,sr(this,i.s),this.l=i.l;var a=i.i,u=new hn;u.i=a.i,a.g&&(u.g=new Map(a.g),u.h=a.h),lc(this,u),this.m=i.m}else i&&(a=String(i).match(uc))?(this.h=!1,ir(this,a[1]||"",!0),this.o=un(a[2]||""),this.g=un(a[3]||"",!0),sr(this,a[4]),this.l=un(a[5]||"",!0),lc(this,a[6]||"",!0),this.m=un(a[7]||"")):(this.h=!1,this.i=new hn(null,this.h))}at.prototype.toString=function(){var i=[],a=this.j;a&&i.push(ln(a,hc,!0),":");var u=this.g;return(u||a=="file")&&(i.push("//"),(a=this.o)&&i.push(ln(a,hc,!0),"@"),i.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&i.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(ln(u,u.charAt(0)=="/"?Ih:wh,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",ln(u,Th)),i.join("")};function Me(i){return new at(i)}function ir(i,a,u){i.j=u?un(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function sr(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function lc(i,a,u){a instanceof hn?(i.i=a,bh(i.i,i.h)):(u||(a=ln(a,Eh)),i.i=new hn(a,i.h))}function z(i,a,u){i.i.set(a,u)}function or(i){return z(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function un(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function ln(i,a,u){return typeof i=="string"?(i=encodeURI(i).replace(a,vh),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function vh(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var hc=/[#\/\?@]/g,wh=/[#\?:]/g,Ih=/[#\?]/g,Eh=/[#\?@]/g,Th=/#/g;function hn(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function We(i){i.g||(i.g=new Map,i.h=0,i.i&&yh(i.i,function(a,u){i.add(decodeURIComponent(a.replace(/\+/g," ")),u)}))}n=hn.prototype,n.add=function(i,a){We(this),this.i=null,i=St(this,i);var u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(a),this.h+=1,this};function dc(i,a){We(i),a=St(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function fc(i,a){return We(i),a=St(i,a),i.g.has(a)}n.forEach=function(i,a){We(this),this.g.forEach(function(u,h){u.forEach(function(w){i.call(a,w,h,this)},this)},this)},n.na=function(){We(this);let i=Array.from(this.g.values()),a=Array.from(this.g.keys()),u=[];for(let h=0;h<a.length;h++){let w=i[h];for(let T=0;T<w.length;T++)u.push(a[h])}return u},n.V=function(i){We(this);let a=[];if(typeof i=="string")fc(this,i)&&(a=a.concat(this.g.get(St(this,i))));else{i=Array.from(this.g.values());for(let u=0;u<i.length;u++)a=a.concat(i[u])}return a},n.set=function(i,a){return We(this),this.i=null,i=St(this,i),fc(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function pc(i,a,u){dc(i,a),0<u.length&&(i.i=null,i.g.set(St(i,a),F(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let i=[],a=Array.from(this.g.keys());for(var u=0;u<a.length;u++){var h=a[u];let T=encodeURIComponent(String(h)),R=this.V(h);for(h=0;h<R.length;h++){var w=T;R[h]!==""&&(w+="="+encodeURIComponent(String(R[h]))),i.push(w)}}return this.i=i.join("&")};function St(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function bh(i,a){a&&!i.j&&(We(i),i.i=null,i.g.forEach(function(u,h){var w=h.toLowerCase();h!=w&&(dc(this,h),pc(this,w,u))},i)),i.j=a}function Ah(i,a){let u=new an;if(l.Image){let h=new Image;h.onload=k(Qe,u,"TestLoadImage: loaded",!0,a,h),h.onerror=k(Qe,u,"TestLoadImage: error",!1,a,h),h.onabort=k(Qe,u,"TestLoadImage: abort",!1,a,h),h.ontimeout=k(Qe,u,"TestLoadImage: timeout",!1,a,h),l.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=i}else a(!1)}function Sh(i,a){let u=new an,h=new AbortController,w=setTimeout(()=>{h.abort(),Qe(u,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:h.signal}).then(T=>{clearTimeout(w),T.ok?Qe(u,"TestPingServer: ok",!0,a):Qe(u,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(w),Qe(u,"TestPingServer: error",!1,a)})}function Qe(i,a,u,h,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),h(u)}catch{}}function Rh(){this.g=new uh}function Ph(i,a,u){let h=u||"";try{cc(i,function(w,T){let R=w;p(w)&&(R=Pi(w)),a.push(h+T+"="+encodeURIComponent(R))})}catch(w){throw a.push(h+"type="+encodeURIComponent("_badmap")),w}}function dn(i){this.l=i.Ub||null,this.j=i.eb||!1}N(dn,Ci),dn.prototype.g=function(){return new ar(this.l,this.j)},dn.prototype.i=function(i){return function(){return i}}({});function ar(i,a){ae.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N(ar,ae),n=ar.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,pn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||l).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,fn(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,pn(this)),this.g&&(this.readyState=3,pn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;mc(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function mc(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?fn(this):pn(this),this.readyState==3&&mc(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,fn(this))},n.Qa=function(i){this.g&&(this.response=i,fn(this))},n.ga=function(){this.g&&fn(this)};function fn(i){i.readyState=4,i.l=null,i.j=null,i.v=null,pn(i)}n.setRequestHeader=function(i,a){this.u.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let i=[],a=this.h.entries();for(var u=a.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=a.next();return i.join(`\r
`)};function pn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(ar.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function gc(i){let a="";return ee(i,function(u,h){a+=h,a+=":",a+=u,a+=`\r
`}),a}function Ui(i,a,u){e:{for(h in u){var h=!1;break e}h=!0}h||(u=gc(u),typeof i=="string"?u!=null&&encodeURIComponent(String(u)):z(i,a,u))}function $(i){ae.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N($,ae);var Ch=/^https?$/i,kh=["POST","PUT"];n=$.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,a,u,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Di.g(),this.v=this.o?$a(this.o):$a(Di),this.g.onreadystatechange=A(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(T){_c(this,T);return}if(i=u||"",u=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var w in h)u.set(w,h[w]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(let T of h.keys())u.set(T,h.get(T));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(u.keys()).find(T=>T.toLowerCase()=="content-type"),w=l.FormData&&i instanceof l.FormData,!(0<=Array.prototype.indexOf.call(kh,a,void 0))||h||w||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[T,R]of u)this.g.setRequestHeader(T,R);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wc(this),this.u=!0,this.g.send(i),this.u=!1}catch(T){_c(this,T)}};function _c(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,yc(i),cr(i)}function yc(i){i.A||(i.A=!0,de(i,"complete"),de(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,de(this,"complete"),de(this,"abort"),cr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),cr(this,!0)),$.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?vc(this):this.bb())},n.bb=function(){vc(this)};function vc(i){if(i.h&&typeof c<"u"&&(!i.v[1]||Fe(i)!=4||i.Z()!=2)){if(i.u&&Fe(i)==4)Ba(i.Ea,0,i);else if(de(i,"readystatechange"),Fe(i)==4){i.h=!1;try{let R=i.Z();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var u;if(!(u=a)){var h;if(h=R===0){var w=String(i.D).match(uc)[1]||null;!w&&l.self&&l.self.location&&(w=l.self.location.protocol.slice(0,-1)),h=!Ch.test(w?w.toLowerCase():"")}u=h}if(u)de(i,"complete"),de(i,"success");else{i.m=6;try{var T=2<Fe(i)?i.g.statusText:""}catch{T=""}i.l=T+" ["+i.Z()+"]",yc(i)}}finally{cr(i)}}}}function cr(i,a){if(i.g){wc(i);let u=i.g,h=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||de(i,"ready");try{u.onreadystatechange=h}catch{}}}function wc(i){i.I&&(l.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Fe(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Fe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),ch(a)}};function Ic(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Nh(i){let a={};i=(i.g&&2<=Fe(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<i.length;h++){if(H(i[h]))continue;var u=y(i[h]);let w=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();let T=a[w]||[];a[w]=T,T.push(u)}v(a,function(h){return h.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function mn(i,a,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||a}function Ec(i){this.Aa=0,this.i=[],this.j=new an,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=mn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=mn("baseRetryDelayMs",5e3,i),this.cb=mn("retryDelaySeedMs",1e4,i),this.Wa=mn("forwardChannelMaxRetries",2,i),this.wa=mn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new rc(i&&i.concurrentRequestLimit),this.Da=new Rh,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ec.prototype,n.la=8,n.G=1,n.connect=function(i,a,u,h){fe(0),this.W=i,this.H=a||{},u&&h!==void 0&&(this.H.OSID=u,this.H.OAID=h),this.F=this.X,this.I=Nc(this,null,this.W),lr(this)};function qi(i){if(Tc(i),i.G==3){var a=i.U++,u=Me(i.I);if(z(u,"SID",i.K),z(u,"RID",a),z(u,"TYPE","terminate"),gn(i,u),a=new He(i,i.j,a),a.L=2,a.v=or(Me(u)),u=!1,l.navigator&&l.navigator.sendBeacon)try{u=l.navigator.sendBeacon(a.v.toString(),"")}catch{}!u&&l.Image&&(new Image().src=a.v,u=!0),u||(a.g=Dc(a.j,null),a.g.ea(a.v)),a.F=Date.now(),rr(a)}kc(i)}function ur(i){i.g&&(ji(i),i.g.cancel(),i.g=null)}function Tc(i){ur(i),i.u&&(l.clearTimeout(i.u),i.u=null),hr(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&l.clearTimeout(i.s),i.s=null)}function lr(i){if(!ic(i.h)&&!i.s){i.s=!0;var a=i.Ga;Xt||Va(),Zt||(Xt(),Zt=!0),vi.add(a,i),i.B=0}}function Dh(i,a){return sc(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=on(A(i.Ga,i,a),Cc(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;let w=new He(this,this.j,i),T=this.o;if(this.S&&(T?(T=f(T),_(T,this.S)):T=this.S),this.m!==null||this.O||(w.H=T,T=null),this.P)e:{for(var a=0,u=0;u<this.i.length;u++){t:{var h=this.i[u];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break t}h=void 0}if(h===void 0)break;if(a+=h,4096<a){a=u;break e}if(a===4096||u===this.i.length-1){a=u+1;break e}}a=1e3}else a=1e3;a=Ac(this,w,a),u=Me(this.I),z(u,"RID",i),z(u,"CVER",22),this.D&&z(u,"X-HTTP-Session-Id",this.D),gn(this,u),T&&(this.O?a="headers="+encodeURIComponent(String(gc(T)))+"&"+a:this.m&&Ui(u,this.m,T)),Fi(this.h,w),this.Ua&&z(u,"TYPE","init"),this.P?(z(u,"$req",a),z(u,"SID","null"),w.T=!0,Oi(w,u,null)):Oi(w,u,a),this.G=2}}else this.G==3&&(i?bc(this,i):this.i.length==0||ic(this.h)||bc(this))};function bc(i,a){var u;a?u=a.l:u=i.U++;let h=Me(i.I);z(h,"SID",i.K),z(h,"RID",u),z(h,"AID",i.T),gn(i,h),i.m&&i.o&&Ui(h,i.m,i.o),u=new He(i,i.j,u,i.B+1),i.m===null&&(u.H=i.o),a&&(i.i=a.D.concat(i.i)),a=Ac(i,u,1e3),u.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),Fi(i.h,u),Oi(u,h,a)}function gn(i,a){i.H&&ee(i.H,function(u,h){z(a,h,u)}),i.l&&cc({},function(u,h){z(a,h,u)})}function Ac(i,a,u){u=Math.min(i.i.length,u);var h=i.l?A(i.l.Na,i.l,i):null;e:{var w=i.i;let T=-1;for(;;){let R=["count="+u];T==-1?0<u?(T=w[0].g,R.push("ofs="+T)):T=0:R.push("ofs="+T);let j=!0;for(let ie=0;ie<u;ie++){let U=w[ie].g,ce=w[ie].map;if(U-=T,0>U)T=Math.max(0,w[ie].g-100),j=!1;else try{Ph(ce,R,"req"+U+"_")}catch{h&&h(ce)}}if(j){h=R.join("&");break e}}}return i=i.i.splice(0,u),a.D=i,h}function Sc(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;Xt||Va(),Zt||(Xt(),Zt=!0),vi.add(a,i),i.v=0}}function Bi(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=on(A(i.Fa,i),Cc(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Rc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=on(A(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,fe(10),ur(this),Rc(this))};function ji(i){i.A!=null&&(l.clearTimeout(i.A),i.A=null)}function Rc(i){i.g=new He(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=Me(i.qa);z(a,"RID","rpc"),z(a,"SID",i.K),z(a,"AID",i.T),z(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&z(a,"TO",i.ja),z(a,"TYPE","xmlhttp"),gn(i,a),i.m&&i.o&&Ui(a,i.m,i.o),i.L&&(i.g.I=i.L);var u=i.g;i=i.ia,u.L=1,u.v=or(Me(a)),u.m=null,u.P=!0,ec(u,i)}n.Za=function(){this.C!=null&&(this.C=null,ur(this),Bi(this),fe(19))};function hr(i){i.C!=null&&(l.clearTimeout(i.C),i.C=null)}function Pc(i,a){var u=null;if(i.g==a){hr(i),ji(i),i.g=null;var h=2}else if(Mi(i.h,a))u=a.D,oc(i.h,a),h=1;else return;if(i.G!=0){if(a.o)if(h==1){u=a.m?a.m.length:0,a=Date.now()-a.F;var w=i.B;h=er(),de(h,new Ja(h,u)),lr(i)}else Sc(i);else if(w=a.s,w==3||w==0&&0<a.X||!(h==1&&Dh(i,a)||h==2&&Bi(i)))switch(u&&0<u.length&&(a=i.h,a.i=a.i.concat(u)),w){case 1:ct(i,5);break;case 4:ct(i,10);break;case 3:ct(i,6);break;default:ct(i,2)}}}function Cc(i,a){let u=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(u*=2),u*a}function ct(i,a){if(i.j.info("Error code "+a),a==2){var u=A(i.fb,i),h=i.Xa;let w=!h;h=new at(h||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||ir(h,"https"),or(h),w?Ah(h.toString(),u):Sh(h.toString(),u)}else fe(2);i.G=0,i.l&&i.l.sa(a),kc(i),Tc(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),fe(2)):(this.j.info("Failed to ping google.com"),fe(1))};function kc(i){if(i.G=0,i.ka=[],i.l){let a=ac(i.h);(a.length!=0||i.i.length!=0)&&(D(i.ka,a),D(i.ka,i.i),i.h.i.length=0,F(i.i),i.i.length=0),i.l.ra()}}function Nc(i,a,u){var h=u instanceof at?Me(u):new at(u);if(h.g!="")a&&(h.g=a+"."+h.g),sr(h,h.s);else{var w=l.location;h=w.protocol,a=a?a+"."+w.hostname:w.hostname,w=+w.port;var T=new at(null);h&&ir(T,h),a&&(T.g=a),w&&sr(T,w),u&&(T.l=u),h=T}return u=i.D,a=i.ya,u&&a&&z(h,u,a),z(h,"VER",i.la),gn(i,h),h}function Dc(i,a,u){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new $(new dn({eb:u})):new $(i.pa),a.Ha(i.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xc(){}n=xc.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function dr(){}dr.prototype.g=function(i,a){return new ye(i,a)};function ye(i,a){ae.call(this),this.g=new Ec(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!H(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!H(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new Rt(this)}N(ye,ae),ye.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ye.prototype.close=function(){qi(this.g)},ye.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.u&&(u={},u.__data__=Pi(i),i=u);a.i.push(new mh(a.Ya++,i)),a.G==3&&lr(a)},ye.prototype.N=function(){this.g.l=null,delete this.j,qi(this.g),delete this.g,ye.aa.N.call(this)};function Oc(i){ki.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){e:{for(let u in a){i=u;break e}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}N(Oc,ki);function Vc(){Ni.call(this),this.status=1}N(Vc,Ni);function Rt(i){this.g=i}N(Rt,xc),Rt.prototype.ua=function(){de(this.g,"a")},Rt.prototype.ta=function(i){de(this.g,new Oc(i))},Rt.prototype.sa=function(i){de(this.g,new Vc)},Rt.prototype.ra=function(){de(this.g,"b")},dr.prototype.createWebChannel=dr.prototype.g,ye.prototype.send=ye.prototype.o,ye.prototype.open=ye.prototype.m,ye.prototype.close=ye.prototype.close,$s=$e.createWebChannelTransport=function(){return new dr},Gs=$e.getStatEventTarget=function(){return er()},zs=$e.Event=st,Yr=$e.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},tr.NO_ERROR=0,tr.TIMEOUT=8,tr.HTTP_ERROR=6,Vn=$e.ErrorCode=tr,Ya.COMPLETE="complete",js=$e.EventType=Ya,Ka.EventType=rn,rn.OPEN="a",rn.CLOSE="b",rn.ERROR="c",rn.MESSAGE="d",ae.prototype.listen=ae.prototype.K,Vt=$e.WebChannel=Ka,$p=$e.FetchXmlHttpFactory=dn,$.prototype.listenOnce=$.prototype.L,$.prototype.getLastError=$.prototype.Ka,$.prototype.getLastErrorCode=$.prototype.Ba,$.prototype.getStatus=$.prototype.Z,$.prototype.getResponseJson=$.prototype.Oa,$.prototype.getResponseText=$.prototype.oa,$.prototype.send=$.prototype.ea,$.prototype.setWithCredentials=$.prototype.Ha,Bs=$e.XhrIo=$}).apply(typeof Jr<"u"?Jr:typeof self<"u"?self:typeof window<"u"?window:{});var ll="@firebase/firestore";var se=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};se.UNAUTHENTICATED=new se(null),se.GOOGLE_CREDENTIALS=new se("google-credentials-uid"),se.FIRST_PARTY=new se("first-party-uid"),se.MOCK_USER=new se("mock-user");var Jt="10.14.0";var Et=new Je("@firebase/firestore");function Ln(){return Et.logLevel}function x(n,...e){if(Et.logLevel<=O.DEBUG){let t=e.map(ra);Et.debug(`Firestore (${Jt}): ${n}`,...t)}}function _i(n,...e){if(Et.logLevel<=O.ERROR){let t=e.map(ra);Et.error(`Firestore (${Jt}): ${n}`,...t)}}function Qs(n,...e){if(Et.logLevel<=O.WARN){let t=e.map(ra);Et.warn(`Firestore (${Jt}): ${n}`,...t)}}function ra(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function q(n="Unexpected state"){let e=`FIRESTORE (${Jt}) INTERNAL ASSERTION FAILED: `+n;throw _i(e),new Error(e)}function ge(n,e){n||q()}function _e(n,e){return n}var C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},V=class extends ve{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var wt=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var ni=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Js=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(se.UNAUTHENTICATED))}shutdown(){}},Ys=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},Xs=class{constructor(e){this.t=e,this.currentUser=se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ge(this.o===void 0);let r=this.i,s=d=>this.i!==r?(r=this.i,t(d)):Promise.resolve(),o=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new wt,e.enqueueRetryable(()=>s(this.currentUser))};let c=()=>{let d=o;e.enqueueRetryable(async()=>{await d.promise,await s(this.currentUser)})},l=d=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit(d=>l(d)),setTimeout(()=>{if(!this.auth){let d=this.t.getImmediate({optional:!0});d?l(d):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new wt)}},0),c()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ge(typeof r.accessToken=="string"),new ni(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return ge(e===null||typeof e=="string"),new se(e)}},Zs=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=se.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},eo=class{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Zs(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(se.FIRST_PARTY))}shutdown(){}invalidateToken(){}},to=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},no=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ge(this.o===void 0);let r=o=>{o.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);let c=o.token!==this.R;return this.R=o.token,x("FirebaseAppCheckTokenProvider",`Received ${c?"new":"existing"} token.`),c?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};let s=o=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){let o=this.A.getImmediate({optional:!0});o?s(o):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ge(typeof t.token=="string"),this.R=t.token,new to(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function G(n,e){return n<e?-1:n>e?1:0}function Ft(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}var Se=class n{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new n(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var Q=class n{constructor(e){this.timestamp=e}static fromTimestamp(e){return new n(e)}static min(){return new n(new Se(0,0))}static max(){return new n(new Se(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var ri=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&q(),r===void 0?r=e.length-t:r>e.length-t&&q(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let s=0;s<r;s++){let o=e.get(s),c=t.get(s);if(o<c)return-1;if(o>c)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},pe=class n extends ri{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new V(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new n(t)}static emptyPath(){return new n([])}},Kp=/^[_a-zA-Z][_a-zA-Z0-9]*$/,xe=class n extends ri{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return Kp.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new n(["__name__"])}static fromServerFormat(e){let t=[],r="",s=0,o=()=>{if(r.length===0)throw new V(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},c=!1;for(;s<e.length;){let l=e[s];if(l==="\\"){if(s+1===e.length)throw new V(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let d=e[s+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new V(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=d,s+=2}else l==="`"?(c=!c,s++):l!=="."||c?(r+=l,s++):(o(),s++)}if(o(),c)throw new V(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var M=class n{constructor(e){this.path=e}static fromPath(e){return new n(pe.fromString(e))}static fromName(e){return new n(pe.fromString(e).popFirst(5))}static empty(){return new n(pe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&pe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return pe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new pe(e.slice()))}};var ro=class{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}};ro.UNKNOWN_ID=-1;function Hp(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=Q.fromTimestamp(r===1e9?new Se(t+1,0):new Se(t,r));return new Tt(s,M.empty(),e)}function Wp(n){return new Tt(n.readTime,n.key,-1)}var Tt=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(Q.min(),M.empty(),-1)}static max(){return new n(Q.max(),M.empty(),-1)}};function Qp(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(n.documentKey,e.documentKey),t!==0?t:G(n.largestBatchId,e.largestBatchId))}var io=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};var S=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&q(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let s=0,o=0,c=!1;e.forEach(l=>{++s,l.next(()=>{++o,c&&o===s&&t()},d=>r(d))}),c=!0,o===s&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(s=>s?n.resolve(s):r());return t}static forEach(e,t){let r=[];return e.forEach((s,o)=>{r.push(t.call(this,s,o))}),this.waitFor(r)}static mapArray(e,t){return new n((r,s)=>{let o=e.length,c=new Array(o),l=0;for(let d=0;d<o;d++){let p=d;t(e[p]).next(E=>{c[p]=E,++l,l===o&&r(c)},E=>s(E))}})}static doWhile(e,t){return new n((r,s)=>{let o=()=>{e()===!0?t().next(()=>{o()},s):r()};o()})}};function Jp(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Cl(n){return n.name==="IndexedDbTransactionError"}var ii=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};ii.oe=-1;function ia(n){return n==null}function si(n){return n===0&&1/n==-1/0}var Yp=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],B_=[...Yp,"documentOverlays"],Xp=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Zp=Xp,em=[...Zp,"indexConfiguration","indexState","indexEntries"];var j_=[...em,"globals"];function hl(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function sa(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function tm(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var Ee=class n{constructor(e,t){this.comparator=e,this.root=t||Oe.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Oe.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Oe.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Mt(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Mt(this.root,e,this.comparator,!1)}getReverseIterator(){return new Mt(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Mt(this.root,e,this.comparator,!0)}},Mt=class{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Oe=class n{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??n.RED,this.left=s??n.EMPTY,this.right=o??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new n(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this,o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return n.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw q();let e=this.left.check();if(e!==this.right.check())throw q();return e+(this.isRed()?0:1)}};Oe.EMPTY=null,Oe.RED=!0,Oe.BLACK=!1;Oe.EMPTY=new class{constructor(){this.size=0}get key(){throw q()}get value(){throw q()}get color(){throw q()}get left(){throw q()}get right(){throw q()}copy(e,t,r,s,o){return this}insert(e,t,r){return new Oe(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var me=class n{constructor(e){this.comparator=e,this.data=new Ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new oi(this.data.getIterator())}getIteratorFrom(e){return new oi(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},oi=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var yt=class n{constructor(e){this.fields=e,e.sort(xe.comparator)}static empty(){return new n([])}unionWith(e){let t=new me(xe.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ft(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var so=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var bt=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new so("Invalid base64 string: "+o):o}}(e);return new n(t)}static fromUint8Array(e){let t=function(s){let o="";for(let c=0;c<s.length;++c)o+=String.fromCharCode(s[c]);return o}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};bt.EMPTY_BYTE_STRING=new bt("");var nm=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nt(n){if(ge(!!n),typeof n=="string"){let e=0,t=nm.exec(n);if(ge(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Y(n.seconds),nanos:Y(n.nanos)}}function Y(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ut(n){return typeof n=="string"?bt.fromBase64String(n):bt.fromUint8Array(n)}function oa(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function kl(n){let e=n.mapValue.fields.__previous_value__;return oa(e)?kl(e):e}function ai(n){let e=nt(n.mapValue.fields.__local_write_time__.timestampValue);return new Se(e.seconds,e.nanos)}var oo=class n{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new n("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var Xr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?oa(n)?4:Dl(n)?9007199254740991:Nl(n)?10:11:q()}function Ve(n,e){if(n===e)return!0;let t=qt(n);if(t!==qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ai(n).isEqual(ai(e));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;let c=nt(s.timestampValue),l=nt(o.timestampValue);return c.seconds===l.seconds&&c.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,o){return Ut(s.bytesValue).isEqual(Ut(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,o){return Y(s.geoPointValue.latitude)===Y(o.geoPointValue.latitude)&&Y(s.geoPointValue.longitude)===Y(o.geoPointValue.longitude)}(n,e);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return Y(s.integerValue)===Y(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){let c=Y(s.doubleValue),l=Y(o.doubleValue);return c===l?si(c)===si(l):isNaN(c)&&isNaN(l)}return!1}(n,e);case 9:return Ft(n.arrayValue.values||[],e.arrayValue.values||[],Ve);case 10:case 11:return function(s,o){let c=s.mapValue.fields||{},l=o.mapValue.fields||{};if(hl(c)!==hl(l))return!1;for(let d in c)if(c.hasOwnProperty(d)&&(l[d]===void 0||!Ve(c[d],l[d])))return!1;return!0}(n,e);default:return q()}}function zn(n,e){return(n.values||[]).find(t=>Ve(t,e))!==void 0}function Bt(n,e){if(n===e)return 0;let t=qt(n),r=qt(e);if(t!==r)return G(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(n.booleanValue,e.booleanValue);case 2:return function(o,c){let l=Y(o.integerValue||o.doubleValue),d=Y(c.integerValue||c.doubleValue);return l<d?-1:l>d?1:l===d?0:isNaN(l)?isNaN(d)?0:-1:1}(n,e);case 3:return dl(n.timestampValue,e.timestampValue);case 4:return dl(ai(n),ai(e));case 5:return G(n.stringValue,e.stringValue);case 6:return function(o,c){let l=Ut(o),d=Ut(c);return l.compareTo(d)}(n.bytesValue,e.bytesValue);case 7:return function(o,c){let l=o.split("/"),d=c.split("/");for(let p=0;p<l.length&&p<d.length;p++){let E=G(l[p],d[p]);if(E!==0)return E}return G(l.length,d.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,c){let l=G(Y(o.latitude),Y(c.latitude));return l!==0?l:G(Y(o.longitude),Y(c.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return fl(n.arrayValue,e.arrayValue);case 10:return function(o,c){var l,d,p,E;let b=o.fields||{},A=c.fields||{},k=(l=b.value)===null||l===void 0?void 0:l.arrayValue,N=(d=A.value)===null||d===void 0?void 0:d.arrayValue,F=G(((p=k?.values)===null||p===void 0?void 0:p.length)||0,((E=N?.values)===null||E===void 0?void 0:E.length)||0);return F!==0?F:fl(k,N)}(n.mapValue,e.mapValue);case 11:return function(o,c){if(o===Xr.mapValue&&c===Xr.mapValue)return 0;if(o===Xr.mapValue)return 1;if(c===Xr.mapValue)return-1;let l=o.fields||{},d=Object.keys(l),p=c.fields||{},E=Object.keys(p);d.sort(),E.sort();for(let b=0;b<d.length&&b<E.length;++b){let A=G(d[b],E[b]);if(A!==0)return A;let k=Bt(l[d[b]],p[E[b]]);if(k!==0)return k}return G(d.length,E.length)}(n.mapValue,e.mapValue);default:throw q()}}function dl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return G(n,e);let t=nt(n),r=nt(e),s=G(t.seconds,r.seconds);return s!==0?s:G(t.nanos,r.nanos)}function fl(n,e){let t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){let o=Bt(t[s],r[s]);if(o)return o}return G(t.length,r.length)}function jt(n){return ao(n)}function ao(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=nt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ut(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return M.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(let o of t.values||[])s?s=!1:r+=",",r+=ao(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),s="{",o=!0;for(let c of r)o?o=!1:s+=",",s+=`${c}:${ao(t.fields[c])}`;return s+"}"}(n.mapValue):q()}function co(n){return!!n&&"integerValue"in n}function aa(n){return!!n&&"arrayValue"in n}function Ks(n){return!!n&&"mapValue"in n}function Nl(n){var e,t;return((t=(((e=n?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Fn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return sa(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Fn(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Fn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Dl(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var tt=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Ks(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fn(t)}setAll(e){let t=xe.emptyPath(),r={},s=[];e.forEach((c,l)=>{if(!t.isImmediateParentOf(l)){let d=this.getFieldsMap(t);this.applyChanges(d,r,s),r={},s=[],t=l.popLast()}c?r[l.lastSegment()]=Fn(c):s.push(l.lastSegment())});let o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){let t=this.field(e.popLast());Ks(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ve(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Ks(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){sa(t,(s,o)=>e[s]=o);for(let s of r)delete e[s]}clone(){return new n(Fn(this.value))}};var zt=class n{constructor(e,t,r,s,o,c,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=c,this.documentState=l}static newInvalidDocument(e){return new n(e,0,Q.min(),Q.min(),Q.min(),tt.empty(),0)}static newFoundDocument(e,t,r,s){return new n(e,1,t,Q.min(),r,s,0)}static newNoDocument(e,t){return new n(e,2,t,Q.min(),Q.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,Q.min(),Q.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Gt=class{constructor(e,t){this.position=e,this.inclusive=t}};function pl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){let o=e[s],c=n.position[s];if(o.field.isKeyField()?r=M.comparator(M.fromName(c.referenceValue),t.key):r=Bt(c,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function ml(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ve(n.position[t],e.position[t]))return!1;return!0}var $t=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function rm(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var ci=class{},re=class n extends ci{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new lo(e,t,r):t==="array-contains"?new po(e,r):t==="in"?new mo(e,r):t==="not-in"?new go(e,r):t==="array-contains-any"?new _o(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ho(e,r):new fo(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Bt(t,this.value)):t!==null&&qt(this.value)===qt(t)&&this.matchesComparison(Bt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return q()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},rt=class n extends ci{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new n(e,t)}matches(e){return xl(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function xl(n){return n.op==="and"}function Ol(n){return im(n)&&xl(n)}function im(n){for(let e of n.filters)if(e instanceof rt)return!1;return!0}function uo(n){if(n instanceof re)return n.field.canonicalString()+n.op.toString()+jt(n.value);if(Ol(n))return n.filters.map(e=>uo(e)).join(",");{let e=n.filters.map(t=>uo(t)).join(",");return`${n.op}(${e})`}}function Vl(n,e){return n instanceof re?function(r,s){return s instanceof re&&r.op===s.op&&r.field.isEqual(s.field)&&Ve(r.value,s.value)}(n,e):n instanceof rt?function(r,s){return s instanceof rt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,c,l)=>o&&Vl(c,s.filters[l]),!0):!1}(n,e):void q()}function Ll(n){return n instanceof re?function(t){return`${t.field.canonicalString()} ${t.op} ${jt(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(Ll).join(" ,")+"}"}(n):"Filter"}var lo=class extends re{constructor(e,t,r){super(e,t,r),this.key=M.fromName(r.referenceValue)}matches(e){let t=M.comparator(e.key,this.key);return this.matchesComparison(t)}},ho=class extends re{constructor(e,t){super(e,"in",t),this.keys=Ml("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},fo=class extends re{constructor(e,t){super(e,"not-in",t),this.keys=Ml("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Ml(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>M.fromName(r.referenceValue))}var po=class extends re{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return aa(t)&&zn(t.arrayValue,this.value)}},mo=class extends re{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&zn(this.value.arrayValue,t)}},go=class extends re{constructor(e,t){super(e,"not-in",t)}matches(e){if(zn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!zn(this.value.arrayValue,t)}},_o=class extends re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!aa(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>zn(this.value.arrayValue,r))}};var yo=class{constructor(e,t=null,r=[],s=[],o=null,c=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=c,this.endAt=l,this.ue=null}};function gl(n,e=null,t=[],r=[],s=null,o=null,c=null){return new yo(n,e,t,r,s,o,c)}function ca(n){let e=_e(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>uo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),ia(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>jt(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>jt(r)).join(",")),e.ue=t}return e.ue}function ua(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!rm(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Vl(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ml(n.startAt,e.startAt)&&ml(n.endAt,e.endAt)}var Gn=class{constructor(e,t=null,r=[],s=[],o=null,c="F",l=null,d=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=c,this.startAt=l,this.endAt=d,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function sm(n,e,t,r,s,o,c,l){return new Gn(n,e,t,r,s,o,c,l)}function _l(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function om(n){return n.collectionGroup!==null}function Un(n){let e=_e(n);if(e.ce===null){e.ce=[];let t=new Set;for(let o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(c){let l=new me(xe.comparator);return c.filters.forEach(d=>{d.getFlattenedFilters().forEach(p=>{p.isInequality()&&(l=l.add(p.field))})}),l})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new $t(o,r))}),t.has(xe.keyField().canonicalString())||e.ce.push(new $t(xe.keyField(),r))}return e.ce}function It(n){let e=_e(n);return e.le||(e.le=am(e,Un(n))),e.le}function am(n,e){if(n.limitType==="F")return gl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{let o=s.dir==="desc"?"asc":"desc";return new $t(s.field,o)});let t=n.endAt?new Gt(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Gt(n.startAt.position,n.startAt.inclusive):null;return gl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function vo(n,e,t){return new Gn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Fl(n,e){return ua(It(n),It(e))&&n.limitType===e.limitType}function Ul(n){return`${ca(It(n))}|lt:${n.limitType}`}function Mn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Ll(s)).join(", ")}]`),ia(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(c){return`${c.field.canonicalString()} (${c.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>jt(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>jt(s)).join(",")),`Target(${r})`}(It(n))}; limitType=${n.limitType})`}function la(n,e){return e.isFoundDocument()&&function(r,s){let o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,s){for(let o of Un(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,s){for(let o of r.filters)if(!o.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(c,l,d){let p=pl(c,l,d);return c.inclusive?p<=0:p<0}(r.startAt,Un(r),s)||r.endAt&&!function(c,l,d){let p=pl(c,l,d);return c.inclusive?p>=0:p>0}(r.endAt,Un(r),s))}(n,e)}function cm(n){return(e,t)=>{let r=!1;for(let s of Un(n)){let o=um(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function um(n,e,t){let r=n.field.isKeyField()?M.comparator(e.key,t.key):function(o,c,l){let d=c.data.field(o),p=l.data.field(o);return d!==null&&p!==null?Bt(d,p):q()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return q()}}var it=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){sa(this.inner,(t,r)=>{for(let[s,o]of r)e(s,o)})}isEmpty(){return tm(this.inner)}size(){return this.innerSize}};var lm=new Ee(M.comparator);function wo(){return lm}var ql=new Ee(M.comparator);function Zr(...n){let e=ql;for(let t of n)e=e.insert(t.key,t);return e}function hm(n){let e=ql;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function vt(){return qn()}function Bl(){return qn()}function qn(){return new it(n=>n.toString(),(n,e)=>n.isEqual(e))}var G_=new Ee(M.comparator),dm=new me(M.comparator);function we(...n){let e=dm;for(let t of n)e=e.add(t);return e}var fm=new me(G);function pm(){return fm}function mm(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:si(e)?"-0":e}}function gm(n){return{integerValue:""+n}}var Kt=class{constructor(){this._=void 0}};function _m(n,e,t){return n instanceof $n?function(s,o){let c={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&oa(o)&&(o=kl(o)),o&&(c.fields.__previous_value__=o),{mapValue:c}}(t,e):n instanceof Ht?jl(n,e):n instanceof Wt?zl(n,e):function(s,o){let c=vm(s,o),l=yl(c)+yl(s.Pe);return co(c)&&co(s.Pe)?gm(l):mm(s.serializer,l)}(n,e)}function ym(n,e,t){return n instanceof Ht?jl(n,e):n instanceof Wt?zl(n,e):t}function vm(n,e){return n instanceof Kn?function(r){return co(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}var $n=class extends Kt{},Ht=class extends Kt{constructor(e){super(),this.elements=e}};function jl(n,e){let t=Gl(e);for(let r of n.elements)t.some(s=>Ve(s,r))||t.push(r);return{arrayValue:{values:t}}}var Wt=class extends Kt{constructor(e){super(),this.elements=e}};function zl(n,e){let t=Gl(e);for(let r of n.elements)t=t.filter(s=>!Ve(s,r));return{arrayValue:{values:t}}}var Kn=class extends Kt{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function yl(n){return Y(n.integerValue||n.doubleValue)}function Gl(n){return aa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function wm(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Ht&&s instanceof Ht||r instanceof Wt&&s instanceof Wt?Ft(r.elements,s.elements,Ve):r instanceof Kn&&s instanceof Kn?Ve(r.Pe,s.Pe):r instanceof $n&&s instanceof $n}(n.transform,e.transform)}var Bn=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function ti(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Hn=class{};function $l(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Io(n.key,Bn.none()):new Wn(n.key,n.data,Bn.none());{let t=n.data,r=tt.empty(),s=new me(xe.comparator);for(let o of e.fields)if(!s.has(o)){let c=t.field(o);c===null&&o.length>1&&(o=o.popLast(),c=t.field(o)),c===null?r.delete(o):r.set(o,c),s=s.add(o)}return new Qt(n.key,r,new yt(s.toArray()),Bn.none())}}function Im(n,e,t){n instanceof Wn?function(s,o,c){let l=s.value.clone(),d=wl(s.fieldTransforms,o,c.transformResults);l.setAll(d),o.convertToFoundDocument(c.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Qt?function(s,o,c){if(!ti(s.precondition,o))return void o.convertToUnknownDocument(c.version);let l=wl(s.fieldTransforms,o,c.transformResults),d=o.data;d.setAll(Kl(s)),d.setAll(l),o.convertToFoundDocument(c.version,d).setHasCommittedMutations()}(n,e,t):function(s,o,c){o.convertToNoDocument(c.version).setHasCommittedMutations()}(0,e,t)}function jn(n,e,t,r){return n instanceof Wn?function(o,c,l,d){if(!ti(o.precondition,c))return l;let p=o.value.clone(),E=Il(o.fieldTransforms,d,c);return p.setAll(E),c.convertToFoundDocument(c.version,p).setHasLocalMutations(),null}(n,e,t,r):n instanceof Qt?function(o,c,l,d){if(!ti(o.precondition,c))return l;let p=Il(o.fieldTransforms,d,c),E=c.data;return E.setAll(Kl(o)),E.setAll(p),c.convertToFoundDocument(c.version,E).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(b=>b.field))}(n,e,t,r):function(o,c,l){return ti(o.precondition,c)?(c.convertToNoDocument(c.version).setHasLocalMutations(),null):l}(n,e,t)}function vl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ft(r,s,(o,c)=>wm(o,c))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Wn=class extends Hn{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}},Qt=class extends Hn{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}};function Kl(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function wl(n,e,t){let r=new Map;ge(n.length===t.length);for(let s=0;s<t.length;s++){let o=n[s],c=o.transform,l=e.data.field(o.field);r.set(o.field,ym(c,l,t[s]))}return r}function Il(n,e,t){let r=new Map;for(let s of n){let o=s.transform,c=t.data.field(s.field);r.set(s.field,_m(o,c,e))}return r}var Io=class extends Hn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}};var Eo=class{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){let o=this.mutations[s];o.key.isEqual(e.key)&&Im(o,e,r[s])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=jn(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=jn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Bl();return this.mutations.forEach(s=>{let o=e.get(s.key),c=o.overlayedDocument,l=this.applyToLocalView(c,o.mutatedFields);l=t.has(s.key)?null:l;let d=$l(c,l);d!==null&&r.set(s.key,d),c.isValidDocument()||c.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),we())}isEqual(e){return this.batchId===e.batchId&&Ft(this.mutations,e.mutations,(t,r)=>vl(t,r))&&Ft(this.baseMutations,e.baseMutations,(t,r)=>vl(t,r))}};var To=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var W,L;function Em(n){if(n===void 0)return _i("GRPC error has no .code"),C.UNKNOWN;switch(n){case W.OK:return C.OK;case W.CANCELLED:return C.CANCELLED;case W.UNKNOWN:return C.UNKNOWN;case W.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case W.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case W.INTERNAL:return C.INTERNAL;case W.UNAVAILABLE:return C.UNAVAILABLE;case W.UNAUTHENTICATED:return C.UNAUTHENTICATED;case W.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case W.NOT_FOUND:return C.NOT_FOUND;case W.ALREADY_EXISTS:return C.ALREADY_EXISTS;case W.PERMISSION_DENIED:return C.PERMISSION_DENIED;case W.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case W.ABORTED:return C.ABORTED;case W.OUT_OF_RANGE:return C.OUT_OF_RANGE;case W.UNIMPLEMENTED:return C.UNIMPLEMENTED;case W.DATA_LOSS:return C.DATA_LOSS;default:return q()}}(L=W||(W={}))[L.OK=0]="OK",L[L.CANCELLED=1]="CANCELLED",L[L.UNKNOWN=2]="UNKNOWN",L[L.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",L[L.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",L[L.NOT_FOUND=5]="NOT_FOUND",L[L.ALREADY_EXISTS=6]="ALREADY_EXISTS",L[L.PERMISSION_DENIED=7]="PERMISSION_DENIED",L[L.UNAUTHENTICATED=16]="UNAUTHENTICATED",L[L.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",L[L.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",L[L.ABORTED=10]="ABORTED",L[L.OUT_OF_RANGE=11]="OUT_OF_RANGE",L[L.UNIMPLEMENTED=12]="UNIMPLEMENTED",L[L.INTERNAL=13]="INTERNAL",L[L.UNAVAILABLE=14]="UNAVAILABLE",L[L.DATA_LOSS=15]="DATA_LOSS";var $_=new qs([4294967295,4294967295],0);var bo=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function El(n){return ge(!!n),Q.fromTimestamp(function(t){let r=nt(t);return new Se(r.seconds,r.nanos)}(n))}function Tl(n,e){let t=function(s){return new pe(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Tm(n){let e=pe.fromString(n);return ge(Rm(e)),e}function bm(n){let e=Tm(n);return e.length===4?pe.emptyPath():Am(e)}function Am(n){return ge(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Sm(n){let e=bm(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,s=null;if(r>0){ge(r===1);let E=t.from[0];E.allDescendants?s=E.collectionId:e=e.child(E.collectionId)}let o=[];t.where&&(o=function(b){let A=Hl(b);return A instanceof rt&&Ol(A)?A.getFilters():[A]}(t.where));let c=[];t.orderBy&&(c=function(b){return b.map(A=>function(N){return new $t(Lt(N.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(A))}(t.orderBy));let l=null;t.limit&&(l=function(b){let A;return A=typeof b=="object"?b.value:b,ia(A)?null:A}(t.limit));let d=null;t.startAt&&(d=function(b){let A=!!b.before,k=b.values||[];return new Gt(k,A)}(t.startAt));let p=null;return t.endAt&&(p=function(b){let A=!b.before,k=b.values||[];return new Gt(k,A)}(t.endAt)),sm(e,s,c,o,l,"F",d,p)}function Hl(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Lt(t.unaryFilter.field);return re.create(r,"==",{doubleValue:NaN});case"IS_NULL":let s=Lt(t.unaryFilter.field);return re.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let o=Lt(t.unaryFilter.field);return re.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let c=Lt(t.unaryFilter.field);return re.create(c,"!=",{nullValue:"NULL_VALUE"});default:return q()}}(n):n.fieldFilter!==void 0?function(t){return re.create(Lt(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return q()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(r=>Hl(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return q()}}(t.compositeFilter.op))}(n):q()}function Lt(n){return xe.fromServerFormat(n.fieldPath)}function Rm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var Ao=class{constructor(e){this.ct=e}};function Pm(n){let e=Sm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?vo(e,e.limit,"L"):e}var ui=class{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(Y(e.integerValue));else if("doubleValue"in e){let r=Y(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),si(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=nt(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Ut(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?Dl(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Nl(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):q()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){let r=e.fields||{};this.dt(t,55);for(let s of Object.keys(r))this.Vt(s,t),this.Tt(r[s],t)}wt(e,t){var r,s;let o=e.fields||{};this.dt(t,53);let c="value",l=((s=(r=o[c].arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.length)||0;this.dt(t,15),t.At(Y(l)),this.Vt(c,t),this.Tt(o[c],t)}bt(e,t){let r=e.values||[];this.dt(t,50);for(let s of r)this.Tt(s,t)}yt(e,t){this.dt(t,37),M.fromName(e).path.forEach(r=>{this.dt(t,60),this.Dt(r,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}};ui.vt=new ui;var So=class{constructor(){this.un=new Ro}addToCollectionParentIndex(e,t){return this.un.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(Tt.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(Tt.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}},Ro=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new me(pe.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){let t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new me(pe.comparator)).toArray()}};var K_=new Uint8Array(0);var De=class n{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};De.DEFAULT_COLLECTION_PERCENTILE=10,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,De.DEFAULT=new De(41943040,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),De.DISABLED=new De(-1,0,0);var Qn=class n{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new n(0)}static kn(){return new n(-1)}};var Po=class{constructor(){this.changes=new it(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,zt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Co=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var ko=class{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&jn(r.mutation,s,yt.empty(),Se.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,we()).next(()=>r))}getLocalViewOfDocuments(e,t,r=we()){let s=vt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(o=>{let c=Zr();return o.forEach((l,d)=>{c=c.insert(l,d.overlayedDocument)}),c}))}getOverlayedDocuments(e,t){let r=vt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,we()))}populateOverlays(e,t,r){let s=[];return r.forEach(o=>{t.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(e,s).next(o=>{o.forEach((c,l)=>{t.set(c,l)})})}computeViews(e,t,r,s){let o=wo(),c=qn(),l=function(){return qn()}();return t.forEach((d,p)=>{let E=r.get(p.key);s.has(p.key)&&(E===void 0||E.mutation instanceof Qt)?o=o.insert(p.key,p):E!==void 0?(c.set(p.key,E.mutation.getFieldMask()),jn(E.mutation,p,E.mutation.getFieldMask(),Se.now())):c.set(p.key,yt.empty())}),this.recalculateAndSaveOverlays(e,o).next(d=>(d.forEach((p,E)=>c.set(p,E)),t.forEach((p,E)=>{var b;return l.set(p,new Co(E,(b=c.get(p))!==null&&b!==void 0?b:null))}),l))}recalculateAndSaveOverlays(e,t){let r=qn(),s=new Ee((c,l)=>c-l),o=we();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(c=>{for(let l of c)l.keys().forEach(d=>{let p=t.get(d);if(p===null)return;let E=r.get(d)||yt.empty();E=l.applyToLocalView(p,E),r.set(d,E);let b=(s.get(l.batchId)||we()).add(d);s=s.insert(l.batchId,b)})}).next(()=>{let c=[],l=s.getReverseIterator();for(;l.hasNext();){let d=l.getNext(),p=d.key,E=d.value,b=Bl();E.forEach(A=>{if(!o.has(A)){let k=$l(t.get(A),r.get(A));k!==null&&b.set(A,k),o=o.add(A)}}),c.push(this.documentOverlayCache.saveOverlays(e,p,b))}return S.waitFor(c)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(c){return M.isDocumentKey(c.path)&&c.collectionGroup===null&&c.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):om(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(o=>{let c=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):S.resolve(vt()),l=-1,d=o;return c.next(p=>S.forEach(p,(E,b)=>(l<b.largestBatchId&&(l=b.largestBatchId),o.get(E)?S.resolve():this.remoteDocumentCache.getEntry(e,E).next(A=>{d=d.insert(E,A)}))).next(()=>this.populateOverlays(e,p,o)).next(()=>this.computeViews(e,d,p,we())).next(E=>({batchId:l,changes:hm(E)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(r=>{let s=Zr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){let o=t.collectionGroup,c=Zr();return this.indexManager.getCollectionParents(e,o).next(l=>S.forEach(l,d=>{let p=function(b,A){return new Gn(A,null,b.explicitOrderBy.slice(),b.filters.slice(),b.limit,b.limitType,b.startAt,b.endAt)}(t,d.child(o));return this.getDocumentsMatchingCollectionQuery(e,p,r,s).next(E=>{E.forEach((b,A)=>{c=c.insert(b,A)})})}).next(()=>c))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(c=>(o=c,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s))).next(c=>{o.forEach((d,p)=>{let E=p.getKey();c.get(E)===null&&(c=c.insert(E,zt.newInvalidDocument(E)))});let l=Zr();return c.forEach((d,p)=>{let E=o.get(d);E!==void 0&&jn(E.mutation,p,yt.empty(),Se.now()),la(t,p)&&(l=l.insert(d,p))}),l})}};var No=class{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return S.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:El(s.createTime)}}(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:Pm(s.bundledQuery),readTime:El(s.readTime)}}(t)),S.resolve()}};var Do=class{constructor(){this.overlays=new Ee(M.comparator),this.Ir=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){let r=vt();return S.forEach(t,s=>this.getOverlay(e,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,o)=>{this.ht(e,t,o)}),S.resolve()}removeOverlaysForBatchId(e,t,r){let s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){let s=vt(),o=t.length+1,c=new M(t.child("")),l=this.overlays.getIteratorFrom(c);for(;l.hasNext();){let d=l.getNext().value,p=d.getKey();if(!t.isPrefixOf(p.path))break;p.path.length===o&&d.largestBatchId>r&&s.set(d.getKey(),d)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new Ee((p,E)=>p-E),c=this.overlays.getIterator();for(;c.hasNext();){let p=c.getNext().value;if(p.getKey().getCollectionGroup()===t&&p.largestBatchId>r){let E=o.get(p.largestBatchId);E===null&&(E=vt(),o=o.insert(p.largestBatchId,E)),E.set(p.getKey(),p)}}let l=vt(),d=o.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((p,E)=>l.set(p,E)),!(l.size()>=s)););return S.resolve(l)}ht(e,t,r){let s=this.overlays.get(r.key);if(s!==null){let c=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,c)}this.overlays=this.overlays.insert(r.key,new To(t,r));let o=this.Ir.get(t);o===void 0&&(o=we(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}};var xo=class{constructor(){this.sessionToken=bt.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}};var Jn=class{constructor(){this.Tr=new me(J.Er),this.dr=new me(J.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){let r=new J(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new J(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){let t=new M(new pe([])),r=new J(t,e),s=new J(t,e+1),o=[];return this.dr.forEachInRange([r,s],c=>{this.Vr(c),o.push(c.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){let t=new M(new pe([])),r=new J(t,e),s=new J(t,e+1),o=we();return this.dr.forEachInRange([r,s],c=>{o=o.add(c.key)}),o}containsKey(e){let t=new J(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},J=class{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return M.comparator(e.key,t.key)||G(e.wr,t.wr)}static Ar(e,t){return G(e.wr,t.wr)||M.comparator(e.key,t.key)}};var Oo=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new me(J.Er)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){let o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let c=new Eo(o,t,r,s);this.mutationQueue.push(c);for(let l of s)this.br=this.br.add(new J(l.key,o)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return S.resolve(c)}lookupMutationBatch(e,t){return S.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,s=this.vr(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new J(t,0),s=new J(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],c=>{let l=this.Dr(c.wr);o.push(l)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new me(G);return t.forEach(s=>{let o=new J(s,0),c=new J(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,c],l=>{r=r.add(l.wr)})}),S.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,s=r.length+1,o=r;M.isDocumentKey(o)||(o=o.child(""));let c=new J(new M(o),0),l=new me(G);return this.br.forEachWhile(d=>{let p=d.key.path;return!!r.isPrefixOf(p)&&(p.length===s&&(l=l.add(d.wr)),!0)},c),S.resolve(this.Cr(l))}Cr(e){let t=[];return e.forEach(r=>{let s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ge(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return S.forEach(t.mutations,s=>{let o=new J(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){let r=new J(t,0),s=this.br.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){let t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Vo=class{constructor(e){this.Mr=e,this.docs=function(){return new Ee(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,s=this.docs.get(r),o=s?s.size:0,c=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:c}),this.size+=c-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():zt.newInvalidDocument(t))}getEntries(e,t){let r=wo();return t.forEach(s=>{let o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():zt.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=wo(),c=t.path,l=new M(c.child("")),d=this.docs.getIteratorFrom(l);for(;d.hasNext();){let{key:p,value:{document:E}}=d.getNext();if(!c.isPrefixOf(p.path))break;p.path.length>c.length+1||Qp(Wp(E),r)<=0||(s.has(E.key)||la(t,E))&&(o=o.insert(E.key,E.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(e,t,r,s){q()}Or(e,t){return S.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Lo(this)}getSize(e){return S.resolve(this.size)}},Lo=class extends Po{constructor(e){super(),this.cr=e}applyChanges(e){let t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),S.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}};var Mo=class{constructor(e){this.persistence=e,this.Nr=new it(t=>ca(t),ua),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Jn,this.targetCount=0,this.kr=Qn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),S.resolve()}Kn(e){this.Nr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.kr=new Qn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.Kn(t),S.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0,o=[];return this.Nr.forEach((c,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.Nr.delete(c),o.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){let r=this.Nr.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);let s=this.persistence.referenceDelegate,o=[];return s&&t.forEach(c=>{o.push(s.markPotentiallyOrphaned(e,c))}),S.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){let r=this.Br.yr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.Br.containsKey(t))}};var Fo=class{constructor(e,t){this.qr={},this.overlays={},this.Qr=new ii(0),this.Kr=!1,this.Kr=!0,this.$r=new xo,this.referenceDelegate=e(this),this.Ur=new Mo(this),this.indexManager=new So,this.remoteDocumentCache=function(s){return new Vo(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Ao(t),this.Gr=new No(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Do,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Oo(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);let s=new Uo(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(e,t){return S.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}},Uo=class extends io{constructor(e){super(),this.currentSequenceNumber=e}},qo=class n{constructor(e){this.persistence=e,this.Jr=new Jn,this.Yr=null}static Zr(e){return new n(e)}get Xr(){if(this.Yr)return this.Yr;throw q()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),S.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Xr,r=>{let s=M.fromPath(r);return this.ei(e,s).next(o=>{o||t.removeEntry(s,Q.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return S.or([()=>S.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}};var Bo=class n{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=we(),s=we();for(let o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new n(e,t.fromCache,r,s)}};var jo=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var zo=class{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Kc()?8:Jp(te())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){let o={result:null};return this.Yi(e,t).next(c=>{o.result=c}).next(()=>{if(!o.result)return this.Zi(e,t,s,r).next(c=>{o.result=c})}).next(()=>{if(o.result)return;let c=new jo;return this.Xi(e,t,c).next(l=>{if(o.result=l,this.zi)return this.es(e,t,c,l.size)})}).next(()=>o.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(Ln()<=O.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Mn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),S.resolve()):(Ln()<=O.DEBUG&&x("QueryEngine","Query:",Mn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Ln()<=O.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Mn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,It(t))):S.resolve())}Yi(e,t){if(_l(t))return S.resolve(null);let r=It(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=vo(t,null,"F"),r=It(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{let c=we(...o);return this.Ji.getDocuments(e,c).next(l=>this.indexManager.getMinOffset(e,r).next(d=>{let p=this.ts(t,l);return this.ns(t,p,c,d.readTime)?this.Yi(e,vo(t,null,"F")):this.rs(e,p,t,d)}))})))}Zi(e,t,r,s){return _l(t)||s.isEqual(Q.min())?S.resolve(null):this.Ji.getDocuments(e,r).next(o=>{let c=this.ts(t,o);return this.ns(t,c,r,s)?S.resolve(null):(Ln()<=O.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Mn(t)),this.rs(e,c,t,Hp(s,-1)).next(l=>l))})}ts(e,t){let r=new me(cm(e));return t.forEach((s,o)=>{la(e,o)&&(r=r.add(o))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(e,t,r){return Ln()<=O.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Mn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Tt.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(o=>(t.forEach(c=>{o=o.insert(c.key,c)}),o))}};var Go=class{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new Ee(G),this._s=new it(o=>ca(o),ua),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ko(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}};function Cm(n,e,t,r){return new Go(n,e,t,r)}async function km(n,e){let t=_e(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{let c=[],l=[],d=we();for(let p of s){c.push(p.batchId);for(let E of p.mutations)d=d.add(E.key)}for(let p of o){l.push(p.batchId);for(let E of p.mutations)d=d.add(E.key)}return t.localDocuments.getDocuments(r,d).next(p=>({hs:p,removedBatchIds:c,addedBatchIds:l}))})})}var li=class{constructor(){this.activeTargetIds=pm()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var $o=class{constructor(){this.so=new li,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new li,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Ko=class{_o(e){}shutdown(){}};var hi=class{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){x("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.ho)e(0)}lo(){x("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var ei=null;function Hs(){return ei===null?ei=function(){return 268435456+Math.round(2147483648*Math.random())}():ei++,"0x"+ei.toString(16)}var Nm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Ho=class{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}};var he="WebChannelConnection",Wo=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(t,r,s,o,c){let l=Hs(),d=this.xo(t,r.toUriEncodedString());x("RestConnection",`Sending RPC '${t}' ${l}:`,d,s);let p={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(p,o,c),this.No(t,d,p,s).then(E=>(x("RestConnection",`Received RPC '${t}' ${l}: `,E),E),E=>{throw Qs("RestConnection",`RPC '${t}' ${l} failed with error: `,E,"url: ",d,"request:",s),E})}Lo(t,r,s,o,c,l){return this.Mo(t,r,s,o,c)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Jt}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,c)=>t[c]=o),s&&s.headers.forEach((o,c)=>t[c]=o)}xo(t,r){let s=Nm[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){let o=Hs();return new Promise((c,l)=>{let d=new Bs;d.setWithCredentials(!0),d.listenOnce(js.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Vn.NO_ERROR:let E=d.getResponseJson();x(he,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(E)),c(E);break;case Vn.TIMEOUT:x(he,`RPC '${e}' ${o} timed out`),l(new V(C.DEADLINE_EXCEEDED,"Request time out"));break;case Vn.HTTP_ERROR:let b=d.getStatus();if(x(he,`RPC '${e}' ${o} failed with status:`,b,"response text:",d.getResponseText()),b>0){let A=d.getResponseJson();Array.isArray(A)&&(A=A[0]);let k=A?.error;if(k&&k.status&&k.message){let N=function(D){let Z=D.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(Z)>=0?Z:C.UNKNOWN}(k.status);l(new V(N,k.message))}else l(new V(C.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new V(C.UNAVAILABLE,"Connection failed."));break;default:q()}}finally{x(he,`RPC '${e}' ${o} completed.`)}});let p=JSON.stringify(s);x(he,`RPC '${e}' ${o} sending request:`,s),d.send(t,"POST",p,r,15)})}Bo(e,t,r){let s=Hs(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],c=$s(),l=Gs(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},p=this.longPollingOptions.timeoutSeconds;p!==void 0&&(d.longPollingTimeout=Math.round(1e3*p)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Oo(d.initMessageHeaders,t,r),d.encodeInitMessageHeaders=!0;let E=o.join("");x(he,`Creating RPC '${e}' stream ${s}: ${E}`,d);let b=c.createWebChannel(E,d),A=!1,k=!1,N=new Ho({Io:D=>{k?x(he,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(A||(x(he,`Opening RPC '${e}' stream ${s} transport.`),b.open(),A=!0),x(he,`RPC '${e}' stream ${s} sending:`,D),b.send(D))},To:()=>b.close()}),F=(D,Z,H)=>{D.listen(Z,K=>{try{H(K)}catch(X){setTimeout(()=>{throw X},0)}})};return F(b,Vt.EventType.OPEN,()=>{k||(x(he,`RPC '${e}' stream ${s} transport opened.`),N.yo())}),F(b,Vt.EventType.CLOSE,()=>{k||(k=!0,x(he,`RPC '${e}' stream ${s} transport closed`),N.So())}),F(b,Vt.EventType.ERROR,D=>{k||(k=!0,Qs(he,`RPC '${e}' stream ${s} transport errored:`,D),N.So(new V(C.UNAVAILABLE,"The operation could not be completed")))}),F(b,Vt.EventType.MESSAGE,D=>{var Z;if(!k){let H=D.data[0];ge(!!H);let K=H,X=K.error||((Z=K[0])===null||Z===void 0?void 0:Z.error);if(X){x(he,`RPC '${e}' stream ${s} received error:`,X);let Re=X.status,ee=function(g){let _=W[g];if(_!==void 0)return Em(_)}(Re),v=X.message;ee===void 0&&(ee=C.INTERNAL,v="Unknown error status: "+Re+" with message "+X.message),k=!0,N.So(new V(ee,v)),b.close()}else x(he,`RPC '${e}' stream ${s} received:`,H),N.bo(H)}}),F(l,zs.STAT_EVENT,D=>{D.stat===Yr.PROXY?x(he,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===Yr.NOPROXY&&x(he,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{N.wo()},0),N}};function Ws(){return typeof document<"u"?document:null}function Wl(n){return new bo(n,!0)}var Qo=class{constructor(e,t,r=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();let t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}};var Jo=class extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new V(C.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Mo(e,Tl(t,r),s,o,c)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(C.UNKNOWN,o.toString())})}Lo(e,t,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([c,l])=>this.connection.Lo(e,Tl(t,r),s,c,l,o)).catch(c=>{throw c.name==="FirebaseError"?(c.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new V(C.UNKNOWN,c.toString())})}terminate(){this.y_=!0,this.connection.terminate()}},Yo=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(_i(t),this.D_=!1):x("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}};var Xo=class{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(c=>{r.enqueueAndForget(async()=>{Jl(this)&&(x("RemoteStore","Restarting streams for network reachability change."),await async function(d){let p=_e(d);p.L_.add(4),await ha(p),p.q_.set("Unknown"),p.L_.delete(4),await Ql(p)}(this))})}),this.q_=new Yo(r,s)}};async function Ql(n){if(Jl(n))for(let e of n.B_)await e(!0)}async function ha(n){for(let e of n.B_)await e(!1)}function Jl(n){return _e(n).L_.size===0}async function Dm(n,e){let t=_e(n);e?(t.L_.delete(2),await Ql(t)):e||(t.L_.add(2),await ha(t),t.q_.set("Unknown"))}var Zo=class n{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(c=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){let c=Date.now()+r,l=new n(e,t,c,s,o);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};var ea=class{constructor(){this.queries=bl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){let s=_e(t),o=s.queries;s.queries=bl(),o.forEach((c,l)=>{for(let d of l.j_)d.onError(r)})})(this,new V(C.ABORTED,"Firestore shutting down"))}};function bl(){return new it(n=>Ul(n),Fl)}function xm(n){n.Y_.forEach(e=>{e.next()})}var Al,Sl;(Sl=Al||(Al={})).ea="default",Sl.Cache="cache";var ta=class{constructor(e,t,r,s,o,c){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=c,this.Ca={},this.Fa=new it(l=>Ul(l),Fl),this.Ma=new Map,this.xa=new Set,this.Oa=new Ee(M.comparator),this.Na=new Map,this.La=new Jn,this.Ba={},this.ka=new Map,this.qa=Qn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}};function Rl(n,e,t){let r=_e(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let s=[];r.Fa.forEach((o,c)=>{let l=c.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(c,l){let d=_e(c);d.onlineState=l;let p=!1;d.queries.forEach((E,b)=>{for(let A of b.j_)A.Z_(l)&&(p=!0)}),p&&xm(d)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Om(n,e,t){let r=_e(n),s=[],o=[],c=[];r.Fa.isEmpty()||(r.Fa.forEach((l,d)=>{c.push(r.Ka(d,e,t).then(p=>{var E;if((p||t)&&r.isPrimaryClient){let b=p?!p.fromCache:(E=t?.targetChanges.get(d.targetId))===null||E===void 0?void 0:E.current;r.sharedClientState.updateQueryState(d.targetId,b?"current":"not-current")}if(p){s.push(p);let b=Bo.Wi(d.targetId,p);o.push(b)}}))}),await Promise.all(c),r.Ca.d_(s),await async function(d,p){let E=_e(d);try{await E.persistence.runTransaction("notifyLocalViewChanges","readwrite",b=>S.forEach(p,A=>S.forEach(A.$i,k=>E.persistence.referenceDelegate.addReference(b,A.targetId,k)).next(()=>S.forEach(A.Ui,k=>E.persistence.referenceDelegate.removeReference(b,A.targetId,k)))))}catch(b){if(!Cl(b))throw b;x("LocalStore","Failed to update sequence numbers: "+b)}for(let b of p){let A=b.targetId;if(!b.fromCache){let k=E.os.get(A),N=k.snapshotVersion,F=k.withLastLimboFreeSnapshotVersion(N);E.os=E.os.insert(A,F)}}}(r.localStore,o))}async function Vm(n,e){let t=_e(n);if(!t.currentUser.isEqual(e)){x("SyncEngine","User change. New user:",e.toKey());let r=await km(t.localStore,e);t.currentUser=e,function(o,c){o.ka.forEach(l=>{l.forEach(d=>{d.reject(new V(C.CANCELLED,c))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Om(t,r.hs)}}var di=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Wl(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Cm(this.persistence,new zo,e.initialUser,this.serializer)}Ga(e){return new Fo(qo.Zr,this.serializer)}Wa(e){return new $o}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};di.provider={build:()=>new di};var fi=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Rl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Vm.bind(null,this.syncEngine),await Dm(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ea}()}createDatastore(e){let t=Wl(e.databaseInfo.databaseId),r=function(o){return new Wo(o)}(e.databaseInfo);return function(o,c,l,d){return new Jo(o,c,l,d)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,o,c,l){return new Xo(r,s,o,c,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Rl(this.syncEngine,t,0),function(){return hi.D()?new hi:new Ko}())}createSyncEngine(e,t){return function(s,o,c,l,d,p,E){let b=new ta(s,o,c,l,d,p);return E&&(b.Qa=!0),b}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){let o=_e(s);x("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await ha(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};fi.provider={build:()=>new fi};function Lm(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Pl=new Map;function Mm(n,e,t,r){if(e===!0&&r===!0)throw new V(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Fm(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":q()}function Um(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Fm(n);throw new V(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}var pi=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Mm("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Lm((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new V(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},mi=class{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pi({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pi(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Js;switch(r.type){case"firstParty":return new eo(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Pl.get(t);r&&(x("ComponentProvider","Removing Datastore"),Pl.delete(t),r.terminate())}(this),Promise.resolve()}};function qm(n,e,t,r={}){var s;let o=(n=Um(n,mi))._getSettings(),c=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==c&&Qs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:c,ssl:!1})),r.mockUserToken){let l,d;if(typeof r.mockUserToken=="string")l=r.mockUserToken,d=se.MOCK_USER;else{l=qc(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);let p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new V(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new se(p)}n._authCredentials=new Ys(new ni(l,d))}}var gi=class{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Qo(this,"async_queue_retry"),this.Vu=()=>{let r=Ws();r&&x("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;let t=Ws();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;let t=Ws();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});let t=new wt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Cl(e))throw e;x("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){let t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;let s=function(c){let l=c.message||"";return c.stack&&(l=c.stack.includes(c.message)?c.stack:c.message+`
`+c.stack),l}(r);throw _i("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);let s=Zo.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&q()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(let t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){let t=this.Tu.indexOf(e);this.Tu.splice(t,1)}};var na=class extends mi{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new gi,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new gi(e),this._firestoreClient=void 0,await e}}};function Yl(n,e){let t=typeof n=="object"?n:vr(),r=typeof n=="string"?n:e||"(default)",s=vn(t,"firestore").getImmediate({identifier:r});if(!s._initialized){let o=Uc("firestore");o&&qm(s,...o)}return s}var Q_=new RegExp("[~\\*/\\[\\]]");(function(e,t=!0){(function(s){Jt=s})(Ze),Xe(new Ie("firestore",(r,{instanceIdentifier:s,options:o})=>{let c=r.getProvider("app").getImmediate(),l=new na(new Xs(r.getProvider("auth-internal")),new no(r.getProvider("app-check-internal")),function(p,E){if(!Object.prototype.hasOwnProperty.apply(p.options,["projectId"]))throw new V(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new oo(p.options.projectId,E)}(c,s),c);return o=Object.assign({useFetchStreams:t},o),l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),be(ll,"4.7.3",e),be(ll,"4.7.3","esm2017")})();var Bm={apiKey:"AIzaSyDPBrfoqBwcazXXtteV0AM9T9klwYLigfs",authDomain:"salesblanket.firebaseapp.com",projectId:"salesblanket",storageBucket:"salesblanket.firebasestorage.app",messagingSenderId:"70376660372",appId:"1:70376660372:web:6c4292246d100ebd118381"},Xl=ds(Bm),ny=Us(Xl),ry=Yl(Xl);var yi=class{constructor(){this.routes={"":"landing",landing:!1,login:!1,404:!1,unauthorized:!1,dashboard:!0,"daily-view":!0,contacts:!0,addresses:!0,map:!0,appointments:!0,tasks:!0,calendar:!0,settings:!0,leads:!0,"canvasser-management":!0,"inspector-management":!0},this.currentPath="",this.handleRoute=this.handleRoute.bind(this),window.addEventListener("hashchange",this.handleRoute),this.handleRoute()}async handleRoute(){let e=window.location.hash.slice(1)||"landing";if(e===this.currentPath){console.log(`Already on route: ${e}, skipping render`);return}console.log(`Navigating to route: ${e}`);let t=document.getElementById("route-content");if(!t){console.error("Error: 'route-content' container not found.");return}if(!this.routes.hasOwnProperty(e)){console.error("Route not found:",e),window.location.hash="404";return}for(this.currentPath=e;t.firstChild;)t.removeChild(t.firstChild);let r=e==="404"?"not-found-view":`${e}-view`;console.log(`Attempting to create component: ${r}`);try{let s=document.createElement(r);t.appendChild(s)}catch(s){console.error(`Failed to create element for route: ${e}`,s),window.location.hash="404"}}};var da=class extends HTMLElement{constructor(){super(),this.initialized=!1}connectedCallback(){this.initialized||(this.initialized=!0,this.checkAuthState())}checkAuthState(){firebase.auth().onAuthStateChanged(async e=>{let t=window.location.hash.slice(1)||"landing";console.log("Current route:",t);let r=["landing","login","404","unauthorized"],s=["dashboard","daily-view","contacts","addresses","map","appointments","tasks","calendar","settings"];if(!e){console.log("No user signed in"),r.includes(t)||(window.location.hash="landing");return}console.log("User signed in:",e.uid);try{let o=firebase.firestore().collection("users").doc(e.uid),c=await o.get();if(!c.exists)await o.set({uid:e.uid,email:e.email,displayName:e.displayName||"",photoURL:e.photoURL||"",role:"canvasser",createdAt:firebase.firestore.FieldValue.serverTimestamp(),firstName:"",lastName:"",mobilePhone:"",textNotifications:!1,status:"active",swagPoints:0,lastActive:firebase.firestore.FieldValue.serverTimestamp(),completedProfile:!1}),window.location.hash="daily-view";else{let l=c.data();console.log("User data:",l),await o.update({lastActive:firebase.firestore.FieldValue.serverTimestamp()}),r.includes(t)&&(window.location.hash="daily-view")}}catch(o){console.error("Error handling user data:",o),window.location.hash="daily-view"}})}};customElements.define("app-root",da);var B=(n,e)=>{customElements.get(n)||(customElements.define(n,e),console.log(`Registered component: ${n}`))};var fa=class extends HTMLElement{constructor(){super(),this.map=null,this.markers=new Map,this.geocoder=null}async connectedCallback(){await this.initializeMap(),this.setupMapListeners()}async initializeMap(){try{await this.loadGoogleMapsScript(),this.map=new google.maps.Map(this,{center:{lat:39.8283,lng:-98.5795},zoom:4,mapTypeControl:!1,streetViewControl:!1}),this.geocoder=new google.maps.Geocoder,await this.loadSavedAddresses()}catch(e){console.error("Map initialization error:",e)}}loadGoogleMapsScript(){return new Promise((e,t)=>{if(window.google?.maps){e();return}let r=document.createElement("script");r.src=`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places,geometry`,r.defer=!0,r.async=!0,r.onload=e,r.onerror=t,document.head.appendChild(r)})}async loadSavedAddresses(){let e=firebase.auth().currentUser;if(e)try{(await firebase.firestore().collection("addresses").where("userId","==",e.uid).get()).forEach(r=>{let s=r.data();this.addMarker({id:r.id,position:{lat:s.latitude,lng:s.longitude},status:s.status,address:s.address})})}catch(t){console.error("Error loading addresses:",t)}}setupMapListeners(){console.log("Map listeners initialized")}enableAddressCreation(){this.map.setOptions({draggableCursor:"crosshair"});let e=this.map.addListener("click",async t=>{try{let r=t.latLng,s=await this.reverseGeocode(r);await this.saveNewAddress({address:s,latitude:r.lat(),longitude:r.lng()}),google.maps.event.removeListener(e),this.map.setOptions({draggableCursor:null})}catch(r){console.error("Error creating address:",r)}})}async reverseGeocode(e){return new Promise((t,r)=>{this.geocoder.geocode({location:e},(s,o)=>{o==="OK"&&s[0]?t(s[0].formatted_address):r(new Error("Geocoding failed"))})})}async saveNewAddress(e){try{let t=firebase.auth().currentUser;if(!t)throw new Error("User not authenticated");return(await firebase.firestore().collection("addresses").add({...e,userId:t.uid,status:"pending",createdAt:firebase.firestore.FieldValue.serverTimestamp()})).id}catch(t){throw console.error("Error saving address:",t),t}}showRoutePlanner(){console.log("Route planner to be implemented")}toggleTerritoryView(){console.log("Territory view to be implemented")}disconnectedCallback(){this.markers.forEach(e=>e.setMap(null)),this.markers.clear()}};B("map-component",fa);var pa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `,this.setupEventListeners()}setupEventListeners(){this.querySelector("#new-address").addEventListener("click",()=>{this.querySelector("#main-map").enableAddressCreation()}),this.querySelector("#route-planner").addEventListener("click",()=>{this.querySelector("#main-map").showRoutePlanner()}),this.querySelector("#territory-view").addEventListener("click",()=>{this.querySelector("#main-map").toggleTerritoryView()})}};B("map-view",pa);var ma=class extends HTMLElement{constructor(){super(),console.log("HomeView constructor called")}connectedCallback(){console.log("HomeView connected to the DOM");let e=document.getElementById("debug");e&&(e.textContent="HomeView loaded"),this.innerHTML=`
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
        `}};customElements.get("dashboard-view")||customElements.define("dashboard-view",ga);var _a=class extends HTMLElement{connectedCallback(){this.render(),this.setupSidebarNavigation()}render(){this.innerHTML=`
            <div class="settings-container">
                <div class="settings-header">
                    <h1>Settings</h1>
                </div>
                
                <div class="settings-layout">
                    <div class="settings-sidebar">
                        <button class="sidebar-button" data-section="employee">
                            <span class="material-icons">badge</span>
                            Employee Data
                        </button>
                        <button class="sidebar-button" data-section="preferences" disabled>
                            <span class="material-icons">settings</span>
                            Preferences
                        </button>
                        <button class="sidebar-button" data-section="notifications" disabled>
                            <span class="material-icons">notifications</span>
                            Notifications
                        </button>
                    </div>

                    <div class="settings-content">
                        <!-- Content will be loaded here when sidebar option is clicked -->
                    </div>
                </div>
            </div>
        `}setupSidebarNavigation(){let e=this.querySelectorAll(".sidebar-button");e.forEach(t=>{t.disabled||t.addEventListener("click",()=>{e.forEach(s=>s.classList.remove("active")),t.classList.add("active");let r=t.dataset.section;this.loadSection(r)})})}loadSection(e){let t=this.querySelector(".settings-content");switch(e){case"employee":t.innerHTML=this.getEmployeeFormHTML(),this.setupEmployeeForm();break;case"preferences":break;case"notifications":break;default:t.innerHTML="<p>Select an option from the sidebar</p>"}}getEmployeeFormHTML(){return`
            <h2>Employee Information</h2>
            <form id="employee-form" class="employee-form">
                <div class="form-group">
                    <label for="email">Email (Company)</label>
                    <input type="email" id="email" readonly>
                </div>
                
                <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input type="text" id="firstName" required>
                </div>
                
                <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input type="text" id="lastName" required>
                </div>
                
                <div class="form-group">
                    <label for="mobilePhone">Mobile Phone *</label>
                    <input type="tel" id="mobilePhone" required>
                </div>
                
                <div class="form-group checkbox">
                    <label>
                        <input type="checkbox" id="textNotifications">
                        Receive Text Notifications
                    </label>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary" disabled>Save Changes</button>
                </div>
            </form>
        `}setupEmployeeForm(){let e=this.querySelector("#employee-form"),t=e.querySelector('button[type="submit"]'),r=e.querySelectorAll("input[required]");firebase.auth().onAuthStateChanged(s=>{if(s){let o=this.querySelector("#email");o.value=s.email,this.loadEmployeeData(s.uid)}}),r.forEach(s=>{s.addEventListener("input",()=>{let o=Array.from(r).every(c=>c.value.trim()!=="");t.disabled=!o})}),e.addEventListener("submit",async s=>{s.preventDefault(),e.checkValidity()&&await this.saveEmployeeData()})}};customElements.define("settings-view",_a);var ya=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `}};B("appointments-view",ya);var va=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `,this.setupEventListeners()}setupEventListeners(){}};B("tasks-view",va);var wa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `,this.setupEventListeners()}setupEventListeners(){}};B("calendar-view",wa);var Ia=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `,this.setupEventListeners(),this.fetchContacts()}setupEventListeners(){this.querySelector(".add-button").addEventListener("click",()=>{this.showAddContactModal()})}async fetchContacts(){let e=firebase.auth().currentUser;if(!e)return;let t=firebase.firestore().collection("contacts"),r=(await e.getIdTokenResult()).claims.admin,s=t.where("userId","==",e.uid);r&&(s=t);let c=(await s.get()).docs.map(l=>({id:l.id,...l.data()}));this.renderContacts(c)}renderContacts(e){let t=this.querySelector(".contacts-table");t.innerHTML=e.length?`
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
        `,document.body.appendChild(e),e.querySelector(".close").addEventListener("click",()=>e.remove()),e.querySelector("#add-contact-form").addEventListener("submit",async t=>{t.preventDefault();let r=new FormData(t.target);await firebase.firestore().collection("contacts").add({firstName:r.get("firstName"),lastName:r.get("lastName"),email:r.get("email"),userId:firebase.auth().currentUser.uid,createdAt:firebase.firestore.FieldValue.serverTimestamp()}),e.remove(),this.fetchContacts()})}};B("contacts-view",Ia);var Ea=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `}};B("addresses-view",Ea);var Ta=class extends HTMLElement{connectedCallback(){this.loadUserData()}async loadUserData(){let e=firebase.auth().currentUser;if(e)try{let r=(await firebase.firestore().collection("users").doc(e.uid).get()).data();this.render(r)}catch(t){console.error("Error loading user data:",t)}}render(e={}){this.innerHTML=`
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
        `}};B("daily-view",Ta);var ba=class extends HTMLElement{constructor(){super(),this.map=null,this.leadData=null}connectedCallback(){console.log("LeadsView connected"),this.render(),this.loadGoogleMapsScript().then(()=>this.loadLeadData()).catch(e=>console.error("Error initializing leads view:",e))}render(){this.innerHTML=`
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
        `}loadGoogleMapsScript(){return new Promise((e,t)=>{if(window.google?.maps){e();return}let r=document.createElement("script");r.src=`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`,r.async=!0,r.defer=!0,r.onload=e,r.onerror=t,document.head.appendChild(r)})}async loadLeadData(){try{let e=firebase.auth().currentUser;if(!e)return;let s=(await firebase.firestore().collection("leads").where("userId","==",e.uid).get()).docs.map(o=>({id:o.id,...o.data()}));this.renderLeads(s)}catch(e){console.error("Error loading leads:",e)}}renderLeads(e){let t=this.querySelector(".leads-list");if(!e.length){t.innerHTML='<p class="no-leads">No leads available</p>';return}t.innerHTML=e.map(r=>`
            <div class="lead-card" data-id="${r.id}">
                <h3>${r.address||"Unnamed Lead"}</h3>
                <p>${r.status||"New"}</p>
                <div class="lead-actions">
                    <button class="view-lead" data-id="${r.id}">
                        <span class="material-icons">visibility</span>
                    </button>
                </div>
            </div>
        `).join(""),this.setupLeadCardListeners()}setupLeadCardListeners(){this.querySelectorAll(".view-lead").forEach(t=>{t.addEventListener("click",r=>{let s=r.currentTarget.dataset.id;window.location.hash=`leads/${s}`})})}};B("leads-view",ba);var Aa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `}};B("landing-view",Aa);var Sa=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `,this.setupLoginHandler()}setupLoginHandler(){let e=this.querySelector("#google-signin-btn");e&&e.addEventListener("click",async()=>{try{let t=new firebase.auth.GoogleAuthProvider;await firebase.auth().signInWithPopup(t)}catch(t){console.error("Google Sign-In Error:",t),alert("Failed to log in. Please make sure to use your company email.")}})}};B("login-view",Sa);var Ra=class extends HTMLElement{connectedCallback(){this.innerHTML=`
            <div class="not-found-page">
                <h1>404</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        `}};B("not-found-view",Ra);var Pa=class extends HTMLElement{connectedCallback(){console.log("UnauthorizedView connected"),this.innerHTML=`
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
        `}};B("unauthorized-view",Pa);var Ca=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `}};B("canvasser-management-view",Ca);var ka=class extends HTMLElement{connectedCallback(){this.innerHTML=`
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
        `}};B("inspector-management-view",ka);var Na=class extends HTMLElement{connectedCallback(){this.render()}render(){this.innerHTML=`
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
        `}};customElements.define("footer-bar",Na);var Da=class extends HTMLElement{constructor(){super(),this.user=null}connectedCallback(){this.render()}async checkProfileStatus(e){try{let t=await firebase.firestore().collection("users").doc(e).get();if(t.exists){let r=t.data();return!r.firstName||!r.lastName||!r.mobilePhone}return!0}catch(t){return console.error("Error checking profile status:",t),!1}}render(){this.innerHTML=`
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
                    <span class="material-icons">menu_book</span>
                </button>
                <button id="signout-btn" class="signout-button">Sign Out</button>
            `,this.setupNotifications(),this.setupButtons()})}setupNotifications(){let e=this.querySelector(".notification-icon"),t=this.querySelector(".notification-dropdown");if(e&&t){e.addEventListener("click",s=>{s.stopPropagation(),t.classList.toggle("show")});let r=this.querySelector(".notification-item");r&&r.addEventListener("click",()=>{window.location.hash="settings",t.classList.remove("show")}),document.addEventListener("click",s=>{!t.contains(s.target)&&!e.contains(s.target)&&t.classList.remove("show")})}}setupButtons(){this.querySelector("#signout-btn")?.addEventListener("click",()=>{firebase.auth().signOut()}),this.querySelector("#settings-btn")?.addEventListener("click",()=>{window.location.hash="settings"})}};customElements.define("header-bar",Da);var xa=class extends HTMLElement{connectedCallback(){firebase.auth().onAuthStateChanged(e=>{e?this.fetchUserData(e.uid).then(t=>{this.user=t,console.log("Rendering nav menu. User role:",this.user?.role),this.render()}):this.innerHTML=""})}async fetchUserData(e){let t=await firebase.firestore().collection("users").doc(e).get();return t.exists?t.data():null}render(){let e=this.user?.role==="pending";console.log("Rendering nav menu. User role:",this.user?.role),this.innerHTML=`
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
                </div>
            </nav>
        `,console.log("Nav menu rendered successfully"),this.setupNavigationEvents()}setupNavigationEvents(){this.querySelectorAll(".nav-button").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.route;window.location.hash=t})}),this.querySelectorAll(".sub-management-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.route;window.location.hash=t})})}};customElements.define("nav-menu",xa);var Oa=class extends HTMLElement{constructor(){super(),this.handleKeyPress=this.handleKeyPress.bind(this)}connectedCallback(){this.render(),document.addEventListener("keydown",this.handleKeyPress)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyPress)}handleKeyPress(e){e.key==="Escape"&&this.close()}close(){this.remove()}getVersionHistory(){return`
SalesBlanket Version History
===========================

Version 1.0.1 (December 20, 2024)
--------------------------------
\u2022 Fixed authentication flow to direct to daily-view
\u2022 Added daily-view button to navigation menu
\u2022 Corrected routes organization and imports
\u2022 Added profile completion notification
\u2022 Implemented proper routing for authenticated/public pages

Version 1.0.0 (December 19, 2024)
--------------------------------
\u2022 Initial release
\u2022 Basic authentication system
\u2022 User role management
\u2022 Navigation structure
\u2022 Core application framework

Future Updates Planned
---------------------
\u2022 Role system restructuring (Setter/Closer)
\u2022 Territory management
\u2022 Task automation system
\u2022 GHL Integration
\u2022 Advanced reporting`}render(){this.innerHTML=`
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
        `,this.querySelector(".terminal-close").addEventListener("click",()=>this.close())}};customElements.define("version-modal",Oa);document.addEventListener("DOMContentLoaded",()=>{console.log("App initializing..."),new yi,document.getElementById("route-content")||console.error("route-content element missing"),document.querySelector("nav-menu")||console.error("nav-menu element missing")});window.addEventListener("error",n=>{console.error("Global error:",n.error);let e=document.getElementById("debug");e&&(e.textContent=`Error: ${n.error.message}`,e.style.backgroundColor="red",e.style.color="white")});})();
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
