import{z as l,r as a}from"./app.8c5ac7b9.js";function r(t){let[s,e]=l(t.isOpen,t.defaultOpen||!1,t.onOpenChange);const n=a.exports.useCallback(()=>{e(!0)},[e]),o=a.exports.useCallback(()=>{e(!1)},[e]),c=a.exports.useCallback(()=>{e(!s)},[e,s]);return{isOpen:s,setOpen:e,open:n,close:o,toggle:c}}export{r as $};