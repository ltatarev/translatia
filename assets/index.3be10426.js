var C=Object.defineProperty,P=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var D=(t,e,r)=>e in t?C(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,l=(t,e)=>{for(var r in e||(e={}))w.call(e,r)&&D(t,r,e[r]);if(x)for(var r of x(e))k.call(e,r)&&D(t,r,e[r]);return t},d=(t,e)=>P(t,O(e));import{c as v,a as z,_ as p,b as g,R as A,j as a,d as m,r as f,u as F,e as N,P as M,f as j,g as B,h as $,p as K,i as q,k as G,l as H,m as J,n as Q,o as V}from"./vendor.ae6f5131.js";const W=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}};W();const I="subtitles",X=v("ADD_ORIGINAL_SUBTITLES"),E=v("ADD_UPDATED_SUBTITLES"),T=v("UPLOAD_FILE"),Y={metadata:{currentLine:0,totalLines:0,fileName:"",shortFileName:""},originalSubtitles:[],updatedSubtitles:[]},Z=z(Y,t=>{t.addCase(X,(e,r)=>d(l({},e),{originalSubtitles:r.payload,metadata:d(l({},e.metadata),{totalLines:p.size(r.payload)})})).addCase(E,(e,r)=>d(l({},e),{updatedSubtitles:[...e.updatedSubtitles,r.payload],metadata:d(l({},e.metadata),{currentLine:p.size([...e.updatedSubtitles,r.payload])})})).addCase(T,(e,r)=>d(l({},e),{originalSubtitles:r.payload.subtitle,metadata:d(l({},e.metadata),{fileName:r.payload.name,shortFileName:p.truncate(r.payload.name,{length:50}),currentLine:0,totalLines:p.size(r.payload.subtitle)})}))}),b=t=>t[I],ee=g([b],t=>t.metadata),te=g([b],t=>t.originalSubtitles),re=g([b],t=>!p.isEmpty(t.originalSubtitles));g([b],t=>t.updatedSubtitles);var se="/translatia/assets/return.7091aeed.svg",ae="/translatia/assets/tab.01825178.svg";function L(){return a("div",{children:m("p",{className:"editor__helper-footer",children:[a("b",{children:"TAB"}),"\xA0",a("img",{alt:"tab",src:ae}),"\xA0 for new line \u2002\u2002",a("b",{children:"RETURN"}),"\xA0",a("img",{alt:"return",src:se}),"\xA0 for next line"]})})}L.propTypes={};L.defaultProps={};var ne=A.memo(L);function oe(t){const e=t.split(`
\r
`);return p.reduce(e,(r,o)=>{const[s,n,i]=o.split(`
`);return r.push({counter:s.trim(),time:n.trim(),subtitle:i.trim()}),r},[])}function ie(){const[t,e]=f.exports.useState(""),r=F(),o=N(te),{shortFileName:s,totalLines:n,currentLine:i}=N(ee),h=f.exports.useMemo(()=>oe(o),[o]),_=f.exports.useCallback(c=>e(c.target.value),[]);function S(c){const{key:u}=c;u==="Tab"&&(c.preventDefault(),e(y=>`${y}
`)),u==="Enter"&&(c.preventDefault(),r(E(d(l({},h[i]),{subtitle:p.isEmpty(t)?h[i].subtitle:t}))),e(""))}return m("div",{children:[m("div",{className:"editor__title-row",children:[a("p",{className:"editor__title",children:s}),m("p",{className:"editor__lines",children:[i+1," / ",n," lines"]})]}),m("div",{className:"editor__container",children:[a("p",{className:"editor__current-line",children:h[i].subtitle}),a("textarea",{id:"editor__current-input",name:"subtitleInput",placeholder:"Type translation here...",rows:"1",value:t,onChange:_,onKeyDown:S})]}),a(ne,{})]})}function R({onFileUploaded:t}){const[e,r]=f.exports.useState(!1),[o,s]=f.exports.useState(null),n=f.exports.useCallback(S=>{r(!0),S.forEach(c=>{const u=new FileReader;u.onabort=p.noop(),u.onerror=()=>s("File reading has failed"),u.onload=()=>{const y=u.result;return r(!1),t(c.name,y)},u.readAsText(c)})},[t]),{getRootProps:i,getInputProps:h,isDragActive:_}=j({onDrop:n});return e?a("div",{className:"file-uploader__container",children:a("p",{children:"loading..."})}):m("div",{className:"file-uploader__container",children:[a("h3",{children:"Upload your file"}),m("div",d(l({},i()),{className:"dropzone__container",children:[a("input",l({},h())),_?a("p",{className:"dropzone__paragraph",children:"Drop the files here ..."}):a("p",{className:"dropzone__paragraph",children:"Drop some files here, or click to select files."})]})),!!o&&a("p",{children:o})]})}R.propTypes={onFileUploaded:M.func.isRequired};function le(){const t=F(),e=f.exports.useCallback((o,s)=>{t(T({name:o,subtitle:s}))},[t]),r=N(re);return m("div",{children:[!r&&a(R,{onFileUploaded:e}),r&&a(ie,{})]})}const de={key:"main",storage:G};B.exports.createLogger();const ce=[],ue=$({[I]:Z}),pe=K(de,ue),U=q({reducer:pe,middleware:ce}),me=H(U);console.log("\u2728 hello traveler \u{1F387}");J.render(a(A.StrictMode,{children:a(Q,{store:U,children:a(V,{persistor:me,children:a(le,{})})})}),document.getElementById("root"));
