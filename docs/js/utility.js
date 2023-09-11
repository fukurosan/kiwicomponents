/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * kiwicomponents version 0.4.2
 * An SDK for web browsers.
 * Copyright (c) 2023 Henrik Olofsson
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).kiwicomponents={})}(this,(function(e){"use strict";const t=e=>{const t=document.createElement("kiwi-window");if(e.minimizable&&t.setAttribute("useminimizable",e.minimizable),e.maximizable&&t.setAttribute("usemaximizable",e.maximizable),e.closeButton&&t.setAttribute("useclosebutton",e.closebutton),e.draggable&&t.setAttribute("usedraggable",e.draggable),e.resizable&&t.setAttribute("useresizable",e.resizable),e.centered&&t.setAttribute("usecentered",e.centered),e.autosize&&t.setAttribute("useautosize",e.autosize),e.modality&&t.setAttribute("modality",e.modality),e.scale&&t.setAttribute("scale",e.scale),e.title&&t.setAttribute("title",e.title),e.icon&&t.setAttribute("icon",e.icon),e.footer&&t.setAttribute("footer","true"),e.noanimation&&t.setAttribute("noanimation",e.noanimation),e.body&&("string"==typeof e.body?t.innerHTML=e.body:e.body instanceof HTMLElement?t.appendChild(e.body):t.appendChild(e.body())),e.footer){const i=document.createElement("div");i.classList.add("kiwi-windowmanager-general-footer"),i.setAttribute("slot","footer"),"string"==typeof e.footer?i.innerHTML=e.footer:e.footer instanceof HTMLElement?i.appendChild(e.footer):i.appendChild(e.footer()),t.appendChild(i)}if(e.header){const i=document.createElement("div");i.classList.add("kiwi-windowmanager-general-header"),i.setAttribute("slot","footer"),"string"==typeof e.header?i.innerHTML=e.header:e.header instanceof HTMLElement?i.appendChild(e.header):i.appendChild(e.header()),t.appendChild(i)}let i=document.querySelector("#kiwi-window-container");if(!i){i=document.createElement("div"),i.setAttribute("id","kiwi-window-container");const e=document.createElement("style");e.innerHTML='.kiwi-windowmanager-generic-message,.kiwi-windowmanager-generic-title{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:var(--kiwi-neutral-color-900, #111827);line-height:1.2em;font-style:normal;text-transform:none;margin:0}.kiwi-windowmanager-generic-title{font-family:var(--kiwi-font-family-heading, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-weight:700}.kiwi-windowmanager-generic-message{font-family:var(--kiwi-font-family-body, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-weight:400}.kiwi-windowmanager-generic-title{font-size:1.375rem}@media screen and (max-width: 768px){.kiwi-windowmanager-generic-title{font-size:1.1875rem}}.kiwi-windowmanager-generic-message{font-size:1rem}.kiwi-windowmanager-general-header{width:100%;height:100%}.kiwi-windowmanager-general-footer{width:100%;height:100%;display:flex;align-items:center}.kiwi-windowmanager-generic-title{font-weight:600}.kiwi-windowmanager-generic-title:empty{display:none}.kiwi-windowmanager-generic-message{color:var(--kiwi-with-light-color-faded, #4b5563)}.kiwi-windowmanager-generic-content{display:flex;flex-direction:column;gap:1rem;align-items:center;justify-content:center;max-width:500px;box-sizing:border-box;text-align:center}.kiwi-windowmanager-generic-content *{box-sizing:border-box}.kiwi-windowmanager-generic-buttons{display:flex;flex-direction:row;gap:.5rem;width:100%}.kiwi-windowmanager-spinner-content{gap:2rem;padding:.5rem}.kiwi-windowmanager-alert-buttons{margin-top:.5rem}.kiwi-windowmanager-alert-content-icon{width:4.5rem;height:4.5rem;margin-bottom:.5rem}.kiwi-windowmanager-alert-content-icon svg{border-radius:50%;stroke-width:0;stroke:none}.kiwi-windowmanager-alert-content-icon svg path{transform:scale(0.9);transform-origin:center}.kiwi-windowmanager-alert-content-icon svg.success{fill:var(--kiwi-success-color-700, #15803d);background-color:var(--kiwi-success-color-200, #bbf7d0)}.kiwi-windowmanager-alert-content-icon svg.error{fill:var(--kiwi-error-color-700, #b91c1c);background-color:var(--kiwi-error-color-200, #fecaca)}.kiwi-windowmanager-alert-content-icon svg.question{fill:var(--kiwi-info-color-700, #1d4ed8);background-color:var(--kiwi-info-color-200, #bfdbfe)}.kiwi-windowmanager-alert-content-icon svg.warning{fill:var(--kiwi-warning-color-700, #a16207);background-color:var(--kiwi-warning-color-200, #fef08a)}',i.appendChild(e);const t=new MutationObserver((()=>{const e=new Set;Array.from(i.children).map((t=>e.add(t.tagName))),1===e.size&&(t.disconnect(),i.remove())}));t.observe(i,{childList:!0}),document.body.appendChild(i)}return i.appendChild(t),t};class i{constructor(){this.threadQueue=[],this.numberOfRunningThreads=0,this.maxThreads=Math.max(navigator.hardwareConcurrency-1,1),this.metaData=new WeakMap,this.MAXIMUM_IDLE_TIME_MS=6e4,this.registeredFns=[]}getMaxThreadCount(){return this.maxThreads}setMaxThreadCount(e){this.maxThreads=e}getMaxThreadIdleTime(){return this.MAXIMUM_IDLE_TIME_MS}setMaxThreadIdleTime(e){this.MAXIMUM_IDLE_TIME_MS=e}getNumberOfQueuedJobs(){return this.threadQueue.length}getNumberOfRunningJobs(){return this.numberOfRunningThreads}hasNext(){return!!this.threadQueue.length}createInlineWorker(e,t){const i=e.toString(),n=`\n\t\t${t}\n\n\t\tfunction execute(${i.substring(i.indexOf("(")+1,i.indexOf(")"))}) {\n\t\t\t${i.substring(i.indexOf("{")+1,i.lastIndexOf("}"))}\n\t\t}\n\t\t\tself.onmessage = async (params) => {\n\t\t\t\tlet result = []\n\t\t\t\tfor(let i = 0; i < params.data.length; i++) {\n\t\t\t\t\tresult.push(execute(...params.data[i]))\n\t\t\t\t}\n\t\t\t\tfor(let i = 0; i < params.data.length; i++)\n\t\t\t\tif(result[i] instanceof Promise) {\n\t\t\t\t\tresult[i] = await result[i]\n\t\t\t\t}\n\t\t\t\tpostMessage(result)\n\t\t}\n\t`;return new Worker(URL.createObjectURL(new Blob([n],{type:"text/javascript"})))}terminate(e){if(this.metaData.has(e)){const t=this.metaData.get(e);t.terminationTimeout&&clearTimeout(t.terminationTimeout),t.freeThreads.forEach((e=>{e.terminate()})),this.metaData.delete(e)}this.threadQueue.filter((t=>t[1]===e)).forEach((e=>e[0].reject("Thread was terminated."))),this.threadQueue=this.threadQueue.filter((t=>t[1]!==e))}getDependencyString(e,t=""){if(e._kiwicomponents?.dependencyString&&(t+=`${e._kiwicomponents.dependencyString}\n\t\t\t\n\t\t\t`),e._kiwicomponents?.dependencies){const i=e._kiwicomponents.dependencies;Object.keys(i).forEach((e=>{const n=i[e];t+=`var ${e} = ${n.toString?n.toString():n}\n\t\t\t\t\n\t\t\t\t`,t=this.getDependencyString(n,t)}))}return t}getMetaData(e){return this.metaData.has(e)||(this.metaData.set(e,{pendingTasks:0,terminationTimeout:void 0,dependencyString:this.getDependencyString(e),freeThreads:[]}),this.registeredFns.push(e)),this.metaData.get(e)}warmup(e,t){const i=this.getMetaData(e),n=i.freeThreads,r=t||Math.max(0,this.maxThreads-n.length);for(let t=0;t<r;t++)n.push(this.createInlineWorker(e,i.dependencyString))}terminateAllThreads(){let e;for(;e=this.registeredFns.pop();)this.terminate(e)}async run(e,...t){const i=this.getMetaData(e);let n,r;i.terminationTimeout&&(clearTimeout(i.terminationTimeout),delete i.terminationTimeout),i.pendingTasks++;const a=new Promise(((e,t)=>{n=e,r=t}));return this.threadQueue.push([{resolve:n,reject:r},e,[...t]]),this.numberOfRunningThreads!==this.maxThreads&&this.executeQueueLoop(),a}async executeQueueLoop(){for(;this.hasNext();){const e=this.threadQueue.splice(0,1)[0],t=e[0].resolve,i=e[0].reject,n=e[1],r=e[2],a=this.metaData.get(n).freeThreads;a.length||a.push(this.createInlineWorker(n,this.metaData.get(n).dependencyString));const s=a.splice(0,1)[0];this.numberOfRunningThreads++;try{await this.executeWorker(s,...r).then((e=>{this.handleThreadCompleted(n,s),t(e)})).catch((e=>{this.handleThreadCompleted(n,s),i(e)}))}catch(e){console.error(e)}this.numberOfRunningThreads--}}executeWorker(e,...t){return new Promise(((i,n)=>{e.onmessage=e=>{i(e.data)},e.onerror=n,e.postMessage(t)}))}handleThreadCompleted(e,t){const i=this.metaData.get(e);i&&(i.freeThreads.push(t),i.pendingTasks--,i.pendingTasks||this.MAXIMUM_IDLE_TIME_MS&&(i.terminationTimeout=setTimeout((()=>{this.terminate(e),this.registeredFns=this.registeredFns.filter((t=>t!==e))}),this.MAXIMUM_IDLE_TIME_MS)))}}class n{constructor(){this.states=new Map,this.shouldDebug=!1,this.listeners=new Map,this.middleware={set:[],get:[]}}addMiddleware(e,t){"get"===e?this.middleware.get.push(t):"set"===e&&this.middleware.set.push(t)}removeMiddleware(e,t){"get"===e?this.middleware.get=this.middleware.get.filter((e=>e!==t)):"set"===e&&(this.middleware.set=this.middleware.set.filter((e=>e!==t)))}getTrace(){return(new Error).stack}addListener(e,t){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t)}removeListener(e,t){this.listeners.has(e)&&this.listeners.set(e,this.listeners.get(e).filter((e=>e!==t)))}setState(e,t,i={}){const n=this.states.get(e);this.states.set(e,this.middleware.set.reduce(((e,t)=>t(e)),t)),!1!==i.emit&&this.listeners.has(e)&&this.listeners.get(e).forEach((e=>e({oldValue:n,newValue:t}))),this.listeners.has(e)&&this.shouldDebug&&console.debug("State updated "+(!1===i.emit?"with no emit":""),{key:e,value:t,trace:this.getTrace()})}getState(e){return this.middleware.get.reduce(((e,t)=>t(e)),this.states.get(e))}clearState(e){this.states.delete(e)}forceUpdate(e=null){(e?[e]:this.listAllKeys()).forEach((e=>{if(this.listeners.has(e)){const t=this.states.get(e);this.listeners.get(e).forEach((e=>e({oldValue:void 0,newValue:t})))}})),this.shouldDebug&&console.debug(`State forcefully updated for ${e||"all keys"}`,{key:e,trace:this.getTrace()})}setDebug(e){this.shouldDebug=e}listAllKeys(){return Array.from(this.states.keys())}listAllState(){return Array.from(this.states.entries())}clearAllState(){this.states.clear()}}class r{constructor(){this.stateManager=new n}addMiddleware(e,t){this.stateManager.addMiddleware(e,t)}removeMiddleware(e,t){this.stateManager.removeMiddleware(e,t)}addListener(e,t){this.stateManager.addListener(e,t)}removeListener(e,t){this.stateManager.removeListener(e,t)}setState(e,t,i={}){this.stateManager.setState(e,t,i)}getState(e){return this.stateManager.getState(e)}clearState(e){this.stateManager.clearState(e)}forceUpdate(e=null){this.stateManager.forceUpdate(e)}setDebug(e){this.stateManager.setDebug(e)}listAllKeys(){return this.stateManager.listAllKeys()}listAllState(){return this.stateManager.listAllState()}clearAllState(){this.stateManager.clearAllState()}reset(){this.stateManager=new n}}e.alert=(e={})=>{const{title:i,message:n,buttonText:r,type:a,icon:s}=e,o=document.createElement("div"),d=document.createElement("div");if(d.classList.add("kiwi-windowmanager-alert-content-icon"),s){const e=document.createElement("img");e.setAttribute("src",s),d.appendChild(e)}else{let e;e="success"===a?"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='success'><path d='M64,0.3M87.2,44.5c-0.9-0.9-2.3-0.9-3.2,0L55.2,73.2L41.4,59.5c-0.9-0.9-2.3-0.9-3.2,0l-4.8,4.8c-0.9,0.9-0.9,2.3,0,3.2l15.3,15.3c0,0,0,0,0,0l3.3,3.3l0.8,0.8l0,0l0.7,0.7c0.9,0.9,2.3,0.9,3.2,0L92,52.5c0.9-0.9,0.9-2.3,0-3.2L87.2,44.5z'/></svg>":"question"===a?"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='question'><path d='M64,0.3M60.8,32.2c-14.5,0-19.1,13.3-19.2,25.5h9.6c-0.2-8.8,0.7-15.9,9.6-15.9c6.4,0,9.6,2.7,9.6,9.6c0,4.4-3.4,6.6-6.4,9.6c-6.2,6-5.7,10.4-6,18.7h8.4c0.3-7.5,0.2-7.3,6.4-13.9c4.2-4.1,7.1-8.2,7.1-14.5C80,41.2,74.6,32.2,60.8,32.2z M64.1,86.3c-3.6,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.6,0,6.4-2.9,6.4-6.4C70.5,89.1,67.6,86.3,64.1,86.3z'/></svg>":"error"===a?"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='error'><path d='M64,0.3M85.9,48.1L81,43.3c-0.9-0.9-2.3-0.9-3.2,0L64,57L50.2,43.3c-0.9-0.9-2.3-0.9-3.2,0l-4.9,4.8c-0.9,0.9-0.9,2.3,0,3.2L55.9,65L42.1,78.8c-0.9,0.9-0.9,2.3,0,3.2l4.9,4.8c0.9,0.9,2.3,0.9,3.2,0L64,73.1l13.8,13.7c0.9,0.9,2.3,0.9,3.2,0l4.9-4.8c0.9-0.9,0.9-2.3,0-3.2L72.1,65l13.8-13.7C86.8,50.4,86.8,49,85.9,48.1z'/></svg>":"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128' class='warning'><path d='M64,32.2c-4.4,0-8,3.3-8,7.3v24.8c0,4.1,3.6,7.3,8,7.3s8-3.3,8-7.3V39.5C72,35.4,68.4,32.2,64,32.2zM64,81.2c-4.4,0-8,3.3-8,7.3s3.6,7.3,8,7.3s8-3.3,8-7.3S68.4,81.2,64,81.2z'/></svg>",d.innerHTML=e}if(o.appendChild(d),i){const e=document.createElement("div");e.classList.add("kiwi-windowmanager-generic-title"),e.appendChild(document.createTextNode(i)),o.appendChild(e)}if(n){const e=document.createElement("div");e.classList.add("kiwi-windowmanager-generic-message"),e.classList.add("kiwi-windowmanager-alert-body"),"string"==typeof n?e.appendChild(document.createTextNode(n)):n instanceof HTMLElement?e.appendChild(n):"function"==typeof n&&e.appendChild(n()),o.appendChild(e)}const l=document.createElement("div");l.classList.add("kiwi-windowmanager-generic-buttons"),l.classList.add("kiwi-windowmanager-alert-buttons");const c=document.createElement("kiwi-button");c.appendChild(document.createTextNode(r||"Close")),l.appendChild(c),o.appendChild(l),o.classList.add("kiwi-windowmanager-generic-content");const u=t({body:o,scale:"large",modality:"disabled",autosize:!0,centered:!0});return{dialog:u,closeButtonListener:new Promise((e=>{c.addEventListener("click",(()=>{u.close(),e()}))}))}},e.confirm=(e={})=>{const{message:i,title:n,cancelLabel:r,confirmLabel:a}=e,s=document.createElement("div"),o=document.createElement("div");if(n){const e=document.createElement("div");e.appendChild(document.createTextNode(n||"Please Confirm")),e.classList.add("kiwi-windowmanager-generic-title"),s.appendChild(e)}if(i){const e=document.createElement("div");e.classList.add("kiwi-windowmanager-generic-message"),"string"==typeof i?e.appendChild(document.createTextNode(i)):i instanceof HTMLElement?e.appendChild(i):"function"==typeof i&&e.appendChild(i()),s.appendChild(e)}o.classList.add("kiwi-windowmanager-generic-buttons");const d=document.createElement("kiwi-button");d.innerText=r||"Cancel",d.setAttribute("type","neutral"),d.setAttribute("fill","light");const l=document.createElement("kiwi-button");l.innerText=a||"Confirm",l.setAttribute("type","primary"),o.appendChild(d),o.appendChild(l),s.appendChild(o),s.classList.add("kiwi-windowmanager-generic-content");const c=t({body:s,scale:"large",modality:"disabled",autosize:!0,centered:!0});return new Promise((e=>{d.addEventListener("click",(()=>{c.close(),e(!1)})),l.addEventListener("click",(()=>{c.close(),e(!0)}))}))},e.enableGlobalTooltips=()=>{new MutationObserver((e=>{const t=e.reduce(((e,t)=>(t.addedNodes.forEach((t=>{t instanceof HTMLElement&&t.hasAttribute("kiwi-tooltip")&&e.push(t)})),e)),[]);if(t.length){let e=document.querySelector("#kiwi-tooltip-container");if(!e){e=document.createElement("div"),e.setAttribute("id","kiwi-tooltip-container");const t=new MutationObserver((()=>{0===e.children.length&&(t.disconnect(),e.remove())}));t.observe(e,{childList:!0}),document.body.appendChild(e)}t.forEach((t=>{const i=document.createElement("kiwi-tooltip");i.appendChild(document.createTextNode(t.getAttribute("kiwi-tooltip"))),t.hasAttribute("kiwi-tooltip-position")&&i.setAttribute("position",t.getAttribute("kiwi-tooltip-position")),t.hasAttribute("kiwi-tooltip-delay")&&i.setAttribute("delay",t.getAttribute("kiwi-tooltip-delay")),t.hasAttribute("kiwi-tooltip-padding")&&i.setAttribute("padding",t.getAttribute("kiwi-tooltip-padding")),t.hasAttribute("kiwi-tooltip-noanimation")&&i.setAttribute("noanimation",t.getAttribute("kiwi-tooltip-noanimation")),i.targetElement=t,e.appendChild(i)}))}})).observe(document.documentElement,{subtree:!0,childList:!0})},e.getStateManager=()=>{if(window._kiwi?.stateManager)return window._kiwi.stateManager;const e=new r;return window._kiwi||(window._kiwi={}),window._kiwi.stateManager=e,e},e.getThreadPlanner=()=>{class e{constructor(){this.threadPlanner=new i}runThread(e,...t){return this.threadPlanner.run(e,[...t]).then((e=>e[0]))}runManyInThread(e,...t){return this.threadPlanner.run(e,...t)}warmupThreads(e,t=null){this.threadPlanner.warmup(e,t)}terminateThreads(e){this.threadPlanner.terminate(e)}terminateAllThreads(){this.threadPlanner.terminateAllThreads()}getMaxThreadCount(){return this.threadPlanner.getMaxThreadCount()}setMaxThreadCount(e){return this.threadPlanner.setMaxThreadCount(e)}getMaxThreadIdleTime(){return this.threadPlanner.getMaxThreadIdleTime()}setMaxThreadIdleTime(e){return this.threadPlanner.setMaxThreadIdleTime(e)}getNumberOfRunningJobs(){return this.threadPlanner.getNumberOfRunningJobs()}getNumberOfQueuedJobs(){return this.threadPlanner.getNumberOfQueuedJobs()}enableGlobalThreadPlanner(){const e=this;Function.prototype.runThread=function(...t){return e.runThread(this,...t)},Function.prototype.runManyInThread=function(...t){return e.runManyInThread(this,...t)},Function.prototype.warmupThreads=function(t){e.warmupThreads(this,t)},Function.prototype.terminateThreads=function(){e.terminate(this)}}}return Function.prototype.kiwiThreadPlanner||(Function.prototype.kiwiThreadPlanner=new e),Function.prototype.kiwiThreadPlanner},e.openDrawer=e=>{const t=document.createElement("kiwi-drawer");!1===e.closeIcon&&t.setAttribute("nocloseicon",e.closeIcon),e.backdrop&&t.setAttribute("usebackdrop",e.backdrop),e.direction&&t.setAttribute("direction",e.direction),e.subtitle&&t.setAttribute("subtitle",e.subtitle),e.title&&t.setAttribute("title",e.title),e.type&&t.setAttribute("type",e.type),e.body&&("string"==typeof e.body?t.innerHTML=e.body:e.body instanceof HTMLElement?t.appendChild(e.body):t.appendChild(e.body())),t.addEventListener("open",(e=>{!1===e.detail&&t.remove()}));let i=document.querySelector("#kiwi-drawer-container");if(!i){i=document.createElement("div"),i.setAttribute("id","kiwi-drawer-container");const e=new MutationObserver((()=>{0===i.children.length&&(e.disconnect(),i.remove())}));e.observe(i,{childList:!0}),document.body.appendChild(i)}return i.appendChild(t),setTimeout((()=>{t.setAttribute("open","")}),10),t},e.openWindow=t,e.prompt=(e={})=>{const{message:i,formOrInputAttributes:n,cancelLabel:r,confirmLabel:a}=e,s=document.createElement("div"),o=document.createElement("div");if(i){const e=document.createElement("div");e.appendChild(document.createTextNode(i)),e.classList.add("kiwi-windowmanager-generic-title"),s.appendChild(e)}let d;if(n instanceof HTMLFormElement&&"FORM"===n.tagName)d=n;else if("string"==typeof n)d=(new DOMParser).parseFromString(n,"text/html").body.children[0];else{const e=document.createElement("input");"object"==typeof n&&null!==n&&Object.keys(n).forEach((t=>{e.setAttribute(t,n[t])})),d=document.createElement("form"),d.appendChild(e)}d.style.width="100%",s.appendChild(d),s.appendChild(o),s.classList.add("kiwi-windowmanager-generic-content"),s.classList.add("kiwi-windowmanager-generic-message"),o.classList.add("kiwi-windowmanager-generic-buttons");const l=document.createElement("kiwi-button");l.innerText=r||"Cancel",l.setAttribute("type","neutral"),l.setAttribute("fill","light");const c=document.createElement("kiwi-button");c.innerText=a||"Confirm",c.setAttribute("type","primary"),o.appendChild(l),o.appendChild(c);const u=t({body:s,scale:"large",modality:"disabled",autosize:!0,centered:!0});return new Promise((e=>{l.addEventListener("click",(()=>{u.close(),e(null)})),c.addEventListener("click",(()=>{if(d.reportValidity())if(n instanceof HTMLElement||"string"==typeof n){const t=Array.from(new FormData(d).entries()).reduce(((e,t)=>(e[t[0]]?(!Array.isArray(e[t[0]])&&(e[t[0]]=[e[t[0]]]),e[t[0]].push(t[1])):e[t[0]]=t[1],e)),{});u.close(),e(t)}else d.reportValidity()&&(u.close(),e(d.children[0].value))}))}))},e.showSpinner=(e={})=>{const{message:i}=e,n=document.createElement("div"),r=document.createElement("kiwi-spinner");r.setAttribute("size","100px"),r.setAttribute("usebackground","");const a=document.createElement("div");a.classList.add("kiwi-windowmanager-generic-title"),n.appendChild(r),n.appendChild(a),n.classList.add("kiwi-windowmanager-spinner-content"),n.classList.add("kiwi-windowmanager-generic-content");const s=e=>{a.innerHTML="","string"==typeof e?a.appendChild(document.createTextNode(e)):e instanceof HTMLElement?a.appendChild(e):"function"==typeof e&&a.appendChild(e())};s(i);const o=t({body:n,scale:"large",modality:"disabled",autosize:!0,centered:!0});return{close:()=>o.close(),dialog:o,updateMessage:e=>{s(e)}}},e.showToast=e=>{const t=document.createElement("kiwi-toast");e.title&&t.setAttribute("title",e.title),e.icon&&t.setAttribute("icon",e.icon),e.subtitle&&t.setAttribute("subtitle",e.subtitle),e.timeout&&t.setAttribute("timeout",e.timeout),e.type&&t.setAttribute("type",e.type),e.noanimation&&t.setAttribute("noanimation",e.noanimation),e.closeMode&&t.setAttribute("closemode",e.closeMode),e.html&&("string"==typeof e.html?t.innerHTML=e.html:e.html instanceof HTMLElement?t.appendChild(e.html):t.appendChild(e.html()));let i=document.querySelector(`kiwi-toast-container${e.top?"[top]":":not([top])"}${e.right?"[right]":":not([right])"}${e.bottom?"[bottom]":":not([bottom])"}${e.left?"[left]":":not([left])"}`);if(!i){i=document.createElement("kiwi-toast-container"),e.top&&i.setAttribute("top",""),e.right&&i.setAttribute("right",""),e.bottom&&i.setAttribute("bottom",""),e.left&&i.setAttribute("left","");const t=new MutationObserver((()=>{0===i.children.length&&(t.disconnect(),i.remove())}));t.observe(i,{childList:!0}),document.documentElement.appendChild(i)}return e.clearExisting&&i.querySelectorAll("kiwi-toast").forEach((e=>e.delete())),i.appendChild(t),t},Object.defineProperty(e,"__esModule",{value:!0})}));
