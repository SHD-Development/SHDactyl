import{S as rt}from"./SectionTitle.b3941bec.js";import{R as p,r as u,a as Q,F as ot,e as lt,f as le,j as h,g as at}from"./app.8c5ac7b9.js";import{c as it}from"./index.0579b088.js";import{l as Z,s as B,a as N,u as k,b as fe,D as b,X as T,o as w,c as pe,y as L,p as ut,f as $e,T as st,d as Se,S as xe,C as ct,e as q,t as ne}from"./transition.01cd7a0f.js";var ye;let A=(ye=p.useId)!=null?ye:function(){let e=Z(),[t,n]=p.useState(e?()=>B.nextId():null);return N(()=>{t===null&&n(B.nextId())},[t]),t!=null?""+t:void 0};function Le(e){return B.isServer?null:e instanceof Node?e.ownerDocument:e!=null&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let ae=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var F=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(F||{}),Pe=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(Pe||{}),dt=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(dt||{});function ft(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(ae)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}var De=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(De||{});function pt(e,t=0){var n;return e===((n=Le(e))==null?void 0:n.body)?!1:k(t,{[0](){return e.matches(ae)},[1](){let r=e;for(;r!==null;){if(r.matches(ae))return!0;r=r.parentElement}return!1}})}var mt=(e=>(e[e.Keyboard=0]="Keyboard",e[e.Mouse=1]="Mouse",e))(mt||{});typeof window<"u"&&typeof document<"u"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0));function C(e){e==null||e.focus({preventScroll:!0})}let gt=["textarea","input"].join(",");function vt(e){var t,n;return(n=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,gt))!=null?n:!1}function ht(e,t=n=>n){return e.slice().sort((n,r)=>{let l=t(n),a=t(r);if(l===null||a===null)return 0;let o=l.compareDocumentPosition(a);return o&Node.DOCUMENT_POSITION_FOLLOWING?-1:o&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function X(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:l=[]}={}){let a=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,o=Array.isArray(e)?n?ht(e):e:ft(e);l.length>0&&o.length>1&&(o=o.filter(m=>!l.includes(m))),r=r!=null?r:a.activeElement;let i=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),s=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,o.indexOf(r))-1;if(t&4)return Math.max(0,o.indexOf(r))+1;if(t&8)return o.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),c=t&32?{preventScroll:!0}:{},d=0,f=o.length,E;do{if(d>=f||d+f<=0)return 0;let m=s+d;if(t&16)m=(m+f)%f;else{if(m<0)return 3;if(m>=f)return 1}E=o[m],E==null||E.focus(c),d+=i}while(E!==a.activeElement);return t&6&&vt(E)&&E.select(),2}function K(e,t,n){let r=fe(t);u.exports.useEffect(()=>{function l(a){r.current(a)}return document.addEventListener(e,l,n),()=>document.removeEventListener(e,l,n)},[e,n])}function Fe(e,t,n){let r=fe(t);u.exports.useEffect(()=>{function l(a){r.current(a)}return window.addEventListener(e,l,n),()=>window.removeEventListener(e,l,n)},[e,n])}function wt(e,t,n=!0){let r=u.exports.useRef(!1);u.exports.useEffect(()=>{requestAnimationFrame(()=>{r.current=n})},[n]);function l(o,i){if(!r.current||o.defaultPrevented)return;let s=i(o);if(s===null||!s.getRootNode().contains(s)||!s.isConnected)return;let c=function d(f){return typeof f=="function"?d(f()):Array.isArray(f)||f instanceof Set?f:[f]}(e);for(let d of c){if(d===null)continue;let f=d instanceof HTMLElement?d:d.current;if(f!=null&&f.contains(s)||o.composed&&o.composedPath().includes(f))return}return!pt(s,De.Loose)&&s.tabIndex!==-1&&o.preventDefault(),t(o,s)}let a=u.exports.useRef(null);K("pointerdown",o=>{var i,s;r.current&&(a.current=((s=(i=o.composedPath)==null?void 0:i.call(o))==null?void 0:s[0])||o.target)},!0),K("mousedown",o=>{var i,s;r.current&&(a.current=((s=(i=o.composedPath)==null?void 0:i.call(o))==null?void 0:s[0])||o.target)},!0),K("click",o=>{a.current&&(l(o,()=>a.current),a.current=null)},!0),K("touchend",o=>l(o,()=>o.target instanceof HTMLElement?o.target:null),!0),Fe("blur",o=>l(o,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function Et(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(t==null?void 0:t.getAttribute("disabled"))==="";return r&&xt(n)?!1:r}function xt(e){if(!e)return!1;let t=e.previousElementSibling;for(;t!==null;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}let yt="div";var z=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(z||{});function bt(e,t){let{features:n=1,...r}=e,l={ref:t,"aria-hidden":(n&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(n&4)===4&&(n&2)!==2&&{display:"none"}}};return T({ourProps:l,theirProps:r,slot:{},defaultTag:yt,name:"Hidden"})}let ie=b(bt);var Me=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(Me||{});function me(e,t){let n=u.exports.useRef([]),r=w(e);u.exports.useEffect(()=>{let l=[...n.current];for(let[a,o]of t.entries())if(n.current[a]!==o){let i=r(t,l);return n.current=t,i}},[r,...t])}function Tt(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function j(...e){return u.exports.useMemo(()=>Le(...e),[...e])}var H=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(H||{});function $t(){let e=u.exports.useRef(0);return Fe("keydown",t=>{t.key==="Tab"&&(e.current=t.shiftKey?1:0)},!0),e}function Ce(e,t,n,r){let l=fe(n);u.exports.useEffect(()=>{e=e!=null?e:window;function a(o){l.current(o)}return e.addEventListener(t,a,r),()=>e.removeEventListener(t,a,r)},[e,t,r])}function St(e){function t(){document.readyState!=="loading"&&(e(),document.removeEventListener("DOMContentLoaded",t))}typeof window<"u"&&typeof document<"u"&&(document.addEventListener("DOMContentLoaded",t),t())}function Ne(e){let t=w(e),n=u.exports.useRef(!1);u.exports.useEffect(()=>(n.current=!1,()=>{n.current=!0,pe(()=>{n.current&&t()})}),[t])}function Re(e){if(!e)return new Set;if(typeof e=="function")return new Set(e());let t=new Set;for(let n of e.current)n.current instanceof HTMLElement&&t.add(n.current);return t}let Lt="div";var ke=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(ke||{});function Pt(e,t){let n=u.exports.useRef(null),r=L(n,t),{initialFocus:l,containers:a,features:o=30,...i}=e;Z()||(o=1);let s=j(n);Mt({ownerDocument:s},Boolean(o&16));let c=Ct({ownerDocument:s,container:n,initialFocus:l},Boolean(o&2));Nt({ownerDocument:s,container:n,containers:a,previousActiveElement:c},Boolean(o&8));let d=$t(),f=w(g=>{let $=n.current;!$||(P=>P())(()=>{k(d.current,{[H.Forwards]:()=>{X($,F.First,{skipElements:[g.relatedTarget]})},[H.Backwards]:()=>{X($,F.Last,{skipElements:[g.relatedTarget]})}})})}),E=ut(),m=u.exports.useRef(!1),ee={ref:r,onKeyDown(g){g.key=="Tab"&&(m.current=!0,E.requestAnimationFrame(()=>{m.current=!1}))},onBlur(g){let $=Re(a);n.current instanceof HTMLElement&&$.add(n.current);let P=g.relatedTarget;P instanceof HTMLElement&&P.dataset.headlessuiFocusGuard!=="true"&&(Ae($,P)||(m.current?X(n.current,k(d.current,{[H.Forwards]:()=>F.Next,[H.Backwards]:()=>F.Previous})|F.WrapAround,{relativeTo:g.target}):g.target instanceof HTMLElement&&C(g.target)))}};return Q(ot,{children:[Boolean(o&4)&&p.createElement(ie,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:f,features:z.Focusable}),T({ourProps:ee,theirProps:i,defaultTag:Lt,name:"FocusTrap"}),Boolean(o&4)&&p.createElement(ie,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:f,features:z.Focusable})]})}let Dt=b(Pt),O=Object.assign(Dt,{features:ke}),D=[];St(()=>{function e(t){t.target instanceof HTMLElement&&t.target!==document.body&&D[0]!==t.target&&(D.unshift(t.target),D=D.filter(n=>n!=null&&n.isConnected),D.splice(10))}window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0})});function Ft(e=!0){let t=u.exports.useRef(D.slice());return me(([n],[r])=>{r===!0&&n===!1&&pe(()=>{t.current.splice(0)}),r===!1&&n===!0&&(t.current=D.slice())},[e,D,t]),w(()=>{var n;return(n=t.current.find(r=>r!=null&&r.isConnected))!=null?n:null})}function Mt({ownerDocument:e},t){let n=Ft(t);me(()=>{t||(e==null?void 0:e.activeElement)===(e==null?void 0:e.body)&&C(n())},[t]),Ne(()=>{t&&C(n())})}function Ct({ownerDocument:e,container:t,initialFocus:n},r){let l=u.exports.useRef(null),a=$e();return me(()=>{if(!r)return;let o=t.current;o&&pe(()=>{if(!a.current)return;let i=e==null?void 0:e.activeElement;if(n!=null&&n.current){if((n==null?void 0:n.current)===i){l.current=i;return}}else if(o.contains(i)){l.current=i;return}n!=null&&n.current?C(n.current):X(o,F.First)===Pe.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),l.current=e==null?void 0:e.activeElement})},[r]),l}function Nt({ownerDocument:e,container:t,containers:n,previousActiveElement:r},l){let a=$e();Ce(e==null?void 0:e.defaultView,"focus",o=>{if(!l||!a.current)return;let i=Re(n);t.current instanceof HTMLElement&&i.add(t.current);let s=r.current;if(!s)return;let c=o.target;c&&c instanceof HTMLElement?Ae(i,c)?(r.current=c,C(c)):(o.preventDefault(),o.stopPropagation(),C(s)):C(r.current)},!0)}function Ae(e,t){for(let n of e)if(n.contains(t))return!0;return!1}let Oe=u.exports.createContext(!1);function Rt(){return u.exports.useContext(Oe)}function ue(e){return p.createElement(Oe.Provider,{value:e.force},e.children)}function kt(e){let t=Rt(),n=u.exports.useContext(Ie),r=j(e),[l,a]=u.exports.useState(()=>{if(!t&&n!==null||B.isServer)return null;let o=r==null?void 0:r.getElementById("headlessui-portal-root");if(o)return o;if(r===null)return null;let i=r.createElement("div");return i.setAttribute("id","headlessui-portal-root"),r.body.appendChild(i)});return u.exports.useEffect(()=>{l!==null&&(r!=null&&r.body.contains(l)||r==null||r.body.appendChild(l))},[l,r]),u.exports.useEffect(()=>{t||n!==null&&a(n.current)},[n,a,t]),l}let At=u.exports.Fragment;function Ot(e,t){let n=e,r=u.exports.useRef(null),l=L(st(d=>{r.current=d}),t),a=j(r),o=kt(r),[i]=u.exports.useState(()=>{var d;return B.isServer?null:(d=a==null?void 0:a.createElement("div"))!=null?d:null}),s=u.exports.useContext(se),c=Z();return N(()=>{!o||!i||o.contains(i)||(i.setAttribute("data-headlessui-portal",""),o.appendChild(i))},[o,i]),N(()=>{if(i&&s)return s.register(i)},[s,i]),Ne(()=>{var d;!o||!i||(i instanceof Node&&o.contains(i)&&o.removeChild(i),o.childNodes.length<=0&&((d=o.parentElement)==null||d.removeChild(o)))}),c?!o||!i?null:lt.exports.createPortal(T({ourProps:{ref:l},theirProps:n,defaultTag:At,name:"Portal"}),i):null}let It=u.exports.Fragment,Ie=u.exports.createContext(null);function Ht(e,t){let{target:n,...r}=e,l={ref:L(t)};return p.createElement(Ie.Provider,{value:n},T({ourProps:l,theirProps:r,defaultTag:It,name:"Popover.Group"}))}let se=u.exports.createContext(null);function Bt(){let e=u.exports.useContext(se),t=u.exports.useRef([]),n=w(a=>(t.current.push(a),e&&e.register(a),()=>r(a))),r=w(a=>{let o=t.current.indexOf(a);o!==-1&&t.current.splice(o,1),e&&e.unregister(a)}),l=u.exports.useMemo(()=>({register:n,unregister:r,portals:t}),[n,r,t]);return[t,u.exports.useMemo(()=>function({children:a}){return p.createElement(se.Provider,{value:l},a)},[l])]}let jt=b(Ot),_t=b(Ht),ce=Object.assign(jt,{Group:_t}),He=u.exports.createContext(null);function Be(){let e=u.exports.useContext(He);if(e===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,Be),t}return e}function Ut(){let[e,t]=u.exports.useState([]);return[e.length>0?e.join(" "):void 0,u.exports.useMemo(()=>function(n){let r=w(a=>(t(o=>[...o,a]),()=>t(o=>{let i=o.slice(),s=i.indexOf(a);return s!==-1&&i.splice(s,1),i}))),l=u.exports.useMemo(()=>({register:r,slot:n.slot,name:n.name,props:n.props}),[r,n.slot,n.name,n.props]);return p.createElement(He.Provider,{value:l},n.children)},[t])]}let Wt="p";function Vt(e,t){let n=A(),{id:r=`headlessui-description-${n}`,...l}=e,a=Be(),o=L(t);N(()=>a.register(r),[r,a.register]);let i={ref:o,...a.props,id:r};return T({ourProps:i,theirProps:l,slot:a.slot||{},defaultTag:Wt,name:a.name||"Description"})}let Yt=b(Vt),Gt=Object.assign(Yt,{}),ge=u.exports.createContext(()=>{});ge.displayName="StackContext";var de=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(de||{});function qt(){return u.exports.useContext(ge)}function Kt({children:e,onUpdate:t,type:n,element:r,enabled:l}){let a=qt(),o=w((...i)=>{t==null||t(...i),a(...i)});return N(()=>{let i=l===void 0||l===!0;return i&&o(0,n,r),()=>{i&&o(1,n,r)}},[o,n,r,l]),p.createElement(ge.Provider,{value:o},e)}function Xt(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}const zt=typeof Object.is=="function"?Object.is:Xt,{useState:Jt,useEffect:Qt,useLayoutEffect:Zt,useDebugValue:en}=le;function tn(e,t,n){const r=t(),[{inst:l},a]=Jt({inst:{value:r,getSnapshot:t}});return Zt(()=>{l.value=r,l.getSnapshot=t,re(l)&&a({inst:l})},[e,r,t]),Qt(()=>(re(l)&&a({inst:l}),e(()=>{re(l)&&a({inst:l})})),[e]),en(r),r}function re(e){const t=e.getSnapshot,n=e.value;try{const r=t();return!zt(n,r)}catch{return!0}}function nn(e,t,n){return t()}const rn=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",on=!rn,ln=on?nn:tn,an="useSyncExternalStore"in le?(e=>e.useSyncExternalStore)(le):ln;function un(e){return an(e.subscribe,e.getSnapshot,e.getSnapshot)}function sn(e,t){let n=e(),r=new Set;return{getSnapshot(){return n},subscribe(l){return r.add(l),()=>r.delete(l)},dispatch(l,...a){let o=t[l].call(n,...a);o&&(n=o,r.forEach(i=>i()))}}}function cn(){let e;return{before({doc:t}){var n;let r=t.documentElement;e=((n=t.defaultView)!=null?n:window).innerWidth-r.clientWidth},after({doc:t,d:n}){let r=t.documentElement,l=r.clientWidth-r.offsetWidth,a=e-l;n.style(r,"paddingRight",`${a}px`)}}}function dn(){if(!Tt())return{};let e;return{before(){e=window.pageYOffset},after({doc:t,d:n,meta:r}){function l(a){return r.containers.flatMap(o=>o()).some(o=>o.contains(a))}n.microTask(()=>{if(window.getComputedStyle(t.documentElement).scrollBehavior!=="auto"){let o=Se();o.style(t.documentElement,"scroll-behavior","auto"),n.add(()=>n.microTask(()=>o.dispose()))}n.style(t.body,"marginTop",`-${e}px`),window.scrollTo(0,0);let a=null;n.addEventListener(t,"click",o=>{if(o.target instanceof HTMLElement)try{let i=o.target.closest("a");if(!i)return;let{hash:s}=new URL(i.href),c=t.querySelector(s);c&&!l(c)&&(a=c)}catch{}},!0),n.addEventListener(t,"touchmove",o=>{o.target instanceof HTMLElement&&!l(o.target)&&o.preventDefault()},{passive:!1}),n.add(()=>{window.scrollTo(0,window.pageYOffset+e),a&&a.isConnected&&(a.scrollIntoView({block:"nearest"}),a=null)})})}}}function fn(){return{before({doc:e,d:t}){t.style(e.documentElement,"overflow","hidden")}}}function pn(e){let t={};for(let n of e)Object.assign(t,n(t));return t}let M=sn(()=>new Map,{PUSH(e,t){var n;let r=(n=this.get(e))!=null?n:{doc:e,count:0,d:Se(),meta:new Set};return r.count++,r.meta.add(t),this.set(e,r),this},POP(e,t){let n=this.get(e);return n&&(n.count--,n.meta.delete(t)),this},SCROLL_PREVENT({doc:e,d:t,meta:n}){let r={doc:e,d:t,meta:pn(n)},l=[dn(),cn(),fn()];l.forEach(({before:a})=>a==null?void 0:a(r)),l.forEach(({after:a})=>a==null?void 0:a(r))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});M.subscribe(()=>{let e=M.getSnapshot(),t=new Map;for(let[n]of e)t.set(n,n.documentElement.style.overflow);for(let n of e.values()){let r=t.get(n.doc)==="hidden",l=n.count!==0;(l&&!r||!l&&r)&&M.dispatch(n.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",n),n.count===0&&M.dispatch("TEARDOWN",n)}});function mn(e,t,n){let r=un(M),l=e?r.get(e):void 0,a=l?l.count>0:!1;return N(()=>{if(!(!e||!t))return M.dispatch("PUSH",e,n),()=>M.dispatch("POP",e,n)},[t,e]),a}let oe=new Map,I=new Map;function be(e,t=!0){N(()=>{var n;if(!t)return;let r=typeof e=="function"?e():e.current;if(!r)return;function l(){var o;if(!r)return;let i=(o=I.get(r))!=null?o:1;if(i===1?I.delete(r):I.set(r,i-1),i!==1)return;let s=oe.get(r);s&&(s["aria-hidden"]===null?r.removeAttribute("aria-hidden"):r.setAttribute("aria-hidden",s["aria-hidden"]),r.inert=s.inert,oe.delete(r))}let a=(n=I.get(r))!=null?n:0;return I.set(r,a+1),a!==0||(oe.set(r,{"aria-hidden":r.getAttribute("aria-hidden"),inert:r.inert}),r.setAttribute("aria-hidden","true"),r.inert=!0),l},[e,t])}function gn({defaultContainers:e=[],portals:t,mainTreeNodeRef:n}={}){var r;let l=u.exports.useRef((r=n==null?void 0:n.current)!=null?r:null),a=j(l),o=w(()=>{var i;let s=[];for(let c of e)c!==null&&(c instanceof HTMLElement?s.push(c):"current"in c&&c.current instanceof HTMLElement&&s.push(c.current));if(t!=null&&t.current)for(let c of t.current)s.push(c);for(let c of(i=a==null?void 0:a.querySelectorAll("html > *, body > *"))!=null?i:[])c!==document.body&&c!==document.head&&c instanceof HTMLElement&&c.id!=="headlessui-portal-root"&&(c.contains(l.current)||s.some(d=>c.contains(d))||s.push(c));return s});return{resolveContainers:o,contains:w(i=>o().some(s=>s.contains(i))),mainTreeNodeRef:l,MainTreeNode:u.exports.useMemo(()=>function(){return n!=null?null:h(ie,{features:z.Hidden,ref:l})},[l,n])}}var vn=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(vn||{}),hn=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(hn||{});let wn={[0](e,t){return e.titleId===t.id?e:{...e,titleId:t.id}}},J=u.exports.createContext(null);J.displayName="DialogContext";function _(e){let t=u.exports.useContext(J);if(t===null){let n=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,_),n}return t}function En(e,t,n=()=>[document.body]){mn(e,t,r=>{var l;return{containers:[...(l=r.containers)!=null?l:[],n]}})}function xn(e,t){return k(t.type,wn,e,t)}let yn="div",bn=xe.RenderStrategy|xe.Static;function Tn(e,t){var n;let r=A(),{id:l=`headlessui-dialog-${r}`,open:a,onClose:o,initialFocus:i,__demoMode:s=!1,...c}=e,[d,f]=u.exports.useState(0),E=ct();a===void 0&&E!==null&&(a=(E&q.Open)===q.Open);let m=u.exports.useRef(null),ee=L(m,t),g=j(m),$=e.hasOwnProperty("open")||E!==null,P=e.hasOwnProperty("onClose");if(!$&&!P)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!$)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!P)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(typeof a!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${a}`);if(typeof o!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${o}`);let x=a?0:1,[U,_e]=u.exports.useReducer(xn,{titleId:null,descriptionId:null,panelRef:u.exports.createRef()}),R=w(()=>o(!1)),ve=w(v=>_e({type:0,id:v})),W=Z()?s?!1:x===0:!1,V=d>1,he=u.exports.useContext(J)!==null,[Ue,We]=Bt(),{resolveContainers:te,mainTreeNodeRef:Y,MainTreeNode:Ve}=gn({portals:Ue,defaultContainers:[(n=U.panelRef.current)!=null?n:m.current]}),Ye=V?"parent":"leaf",we=E!==null?(E&q.Closing)===q.Closing:!1,Ge=(()=>he||we?!1:W)(),qe=u.exports.useCallback(()=>{var v,S;return(S=Array.from((v=g==null?void 0:g.querySelectorAll("body > *"))!=null?v:[]).find(y=>y.id==="headlessui-portal-root"?!1:y.contains(Y.current)&&y instanceof HTMLElement))!=null?S:null},[Y]);be(qe,Ge);let Ke=(()=>V?!0:W)(),Xe=u.exports.useCallback(()=>{var v,S;return(S=Array.from((v=g==null?void 0:g.querySelectorAll("[data-headlessui-portal]"))!=null?v:[]).find(y=>y.contains(Y.current)&&y instanceof HTMLElement))!=null?S:null},[Y]);be(Xe,Ke);let ze=(()=>!(!W||V))();wt(te,R,ze);let Je=(()=>!(V||x!==0))();Ce(g==null?void 0:g.defaultView,"keydown",v=>{Je&&(v.defaultPrevented||v.key===Me.Escape&&(v.preventDefault(),v.stopPropagation(),R()))});let Qe=(()=>!(we||x!==0||he))();En(g,Qe,te),u.exports.useEffect(()=>{if(x!==0||!m.current)return;let v=new ResizeObserver(S=>{for(let y of S){let G=y.target.getBoundingClientRect();G.x===0&&G.y===0&&G.width===0&&G.height===0&&R()}});return v.observe(m.current),()=>v.disconnect()},[x,m,R]);let[Ze,et]=Ut(),tt=u.exports.useMemo(()=>[{dialogState:x,close:R,setTitleId:ve},U],[x,U,R,ve]),Ee=u.exports.useMemo(()=>({open:x===0}),[x]),nt={ref:ee,id:l,role:"dialog","aria-modal":x===0?!0:void 0,"aria-labelledby":U.titleId,"aria-describedby":Ze};return p.createElement(Kt,{type:"Dialog",enabled:x===0,element:m,onUpdate:w((v,S)=>{S==="Dialog"&&k(v,{[de.Add]:()=>f(y=>y+1),[de.Remove]:()=>f(y=>y-1)})})},p.createElement(ue,{force:!0},p.createElement(ce,null,p.createElement(J.Provider,{value:tt},p.createElement(ce.Group,{target:m},p.createElement(ue,{force:!1},p.createElement(et,{slot:Ee,name:"Dialog.Description"},p.createElement(O,{initialFocus:i,containers:te,features:W?k(Ye,{parent:O.features.RestoreFocus,leaf:O.features.All&~O.features.FocusLock}):O.features.None},p.createElement(We,null,T({ourProps:nt,theirProps:c,slot:Ee,defaultTag:yn,features:bn,visible:x===0,name:"Dialog"}))))))))),p.createElement(Ve,null))}let $n="div";function Sn(e,t){let n=A(),{id:r=`headlessui-dialog-overlay-${n}`,...l}=e,[{dialogState:a,close:o}]=_("Dialog.Overlay"),i=L(t),s=w(d=>{if(d.target===d.currentTarget){if(Et(d.currentTarget))return d.preventDefault();d.preventDefault(),d.stopPropagation(),o()}}),c=u.exports.useMemo(()=>({open:a===0}),[a]);return T({ourProps:{ref:i,id:r,"aria-hidden":!0,onClick:s},theirProps:l,slot:c,defaultTag:$n,name:"Dialog.Overlay"})}let Ln="div";function Pn(e,t){let n=A(),{id:r=`headlessui-dialog-backdrop-${n}`,...l}=e,[{dialogState:a},o]=_("Dialog.Backdrop"),i=L(t);u.exports.useEffect(()=>{if(o.panelRef.current===null)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")},[o.panelRef]);let s=u.exports.useMemo(()=>({open:a===0}),[a]);return h(ue,{force:!0,children:h(ce,{children:T({ourProps:{ref:i,id:r,"aria-hidden":!0},theirProps:l,slot:s,defaultTag:Ln,name:"Dialog.Backdrop"})})})}let Dn="div";function Fn(e,t){let n=A(),{id:r=`headlessui-dialog-panel-${n}`,...l}=e,[{dialogState:a},o]=_("Dialog.Panel"),i=L(t,o.panelRef),s=u.exports.useMemo(()=>({open:a===0}),[a]),c=w(d=>{d.stopPropagation()});return T({ourProps:{ref:i,id:r,onClick:c},theirProps:l,slot:s,defaultTag:Dn,name:"Dialog.Panel"})}let Mn="h2";function Cn(e,t){let n=A(),{id:r=`headlessui-dialog-title-${n}`,...l}=e,[{dialogState:a,setTitleId:o}]=_("Dialog.Title"),i=L(t);u.exports.useEffect(()=>(o(r),()=>o(null)),[r,o]);let s=u.exports.useMemo(()=>({open:a===0}),[a]);return T({ourProps:{ref:i,id:r},theirProps:l,slot:s,defaultTag:Mn,name:"Dialog.Title"})}let Nn=b(Tn),Rn=b(Pn),kn=b(Fn),An=b(Sn),On=b(Cn),Te=Object.assign(Nn,{Backdrop:Rn,Panel:kn,Overlay:An,Title:On,Description:Gt});function Un({title:e,description:t,children:n}){return Q("div",{className:"md:grid md:grid-cols-3 md:gap-6",children:[h(rt,{title:e,description:t}),h("div",{className:"mt-5 md:mt-0 md:col-span-2",children:h("div",{className:"px-4 py-5 sm:p-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg",children:n})})]})}function In({isOpen:e,onClose:t,maxWidth:n="2xl",children:r}){const l={sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"}[n];return typeof window>"u"?null:at.createPortal(h(ne.Root,{show:e,as:p.Fragment,children:h(Te,{as:"div",static:!0,className:"fixed z-10 inset-0 overflow-y-auto",open:e,onClose:t,children:Q("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[h(ne.Child,{as:p.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:h(Te.Overlay,{className:"fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity"})}),h("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200B"}),h(ne.Child,{as:p.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:h("div",{className:it("inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full",l),children:r})})]})})}),document.body)}je.Content=function({title:t,children:n}){return Q("div",{className:"px-6 py-4",children:[h("div",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:t}),h("div",{className:"mt-4 text-sm text-gray-600 dark:text-gray-400",children:n})]})};je.Footer=function({children:t}){return h("div",{className:"px-6 py-4 bg-gray-100 dark:bg-gray-800 text-right",children:t})};function je({children:e,...t}){return h(In,{...t,children:e})}export{Un as A,je as D,In as M};