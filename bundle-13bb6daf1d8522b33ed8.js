!function(e){var t={};function n(u){if(t[u])return t[u].exports;var r=t[u]={i:u,l:!1,exports:{}};return e[u].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,u){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:u})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var u=Object.create(null);if(n.r(u),Object.defineProperty(u,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(u,r,function(t){return e[t]}.bind(null,r));return u},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=["+","-","*","/"];t.default=function(e){for(var t=0;t<u.length;t++)if(u[t]===e)return!0;return!1}},function(e,t,n){"use strict";var u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(2),(new(u(n(3)).default)).init()},function(e,t,n){},function(e,t,n){"use strict";var u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(4)),i=u(n(5)),o=u(n(6)),l=u(n(0)),f=u(n(7)),s=u(n(8)),c=u(n(9)),a=u(n(10)),d=u(n(16)),p=function(){function e(){var e=this;this.calculate=function(){var t=e.expression;if(t){var n=(0,a.default)(t),u=(0,d.default)(n);if(window.isNaN(u)||u===1/0||u===-1/0)return e.inputOut.classList.add(c.default.className),void(e.inputOut.textContent=c.default.message);e.inputOut.classList.remove(c.default.className),e.inputOut.textContent=(0,o.default)(u.toFixed(7))}},this.clear=function(){e.input.textContent="",e.expression="",e.inputOut.textContent=""},this.print=function(t){e.expression+=t;var n=e.expression[e.expression.length-2];(0,l.default)(n)&&t&&(0,l.default)(t)&&(e.expression=e.expression.slice(0,-2)+t),e.input.textContent=(0,f.default)(e.expression,"*","x")},this.onKeyDown=function(t){var n=t.key;if(s.default.find((function(e){return e===n}))){if("Enter"===n)return void e.calculate();e.print(n)}},this.onBtnClick=function(t){var n=(0,r.default)(t);e.hiddenInput.focus(),"="!==n?"C"!==n?e.print(n):e.clear():e.calculate()},this.input=document.querySelector(".calc__input_in"),this.inputOut=document.querySelector(".calc__input_out"),this.hiddenInput=document.querySelector(".calc__hidden-input"),this.expression=""}return e.prototype.init=function(){var e=this;[].slice.call(document.querySelectorAll(".calc__btn")).forEach((function(t){t.addEventListener("click",(function(){return e.onBtnClick(t)}))})),this.hiddenInput.addEventListener("keydown",this.onKeyDown),window.addEventListener("load",(function(){(0,i.default)()||e.hiddenInput.focus()})),document.addEventListener("click",(function(){return e.hiddenInput.focus()}))},e}();t.default=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e.textContent}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function e(t){var n=t[t.length-1],u=t[t.length-2];return"0"===n&&"."===u?e(t.substring(0,t.length-2)):"0"===n&&"."!==u?e(t.substring(0,t.length-1)):t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){return e.split(t).join(n)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=["0","1","2","3","4","5","6","7","8","9","+","-","*","/",",",")","(","Enter"]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={className:"calc__input_error",message:"Please enter the correct expression"}},function(e,t,n){"use strict";var u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(11),i=u(n(12)),o=u(n(13));function l(e){return"+"===e.value||"-"===e.value||"*"===e.value||"/"===e.value?i.default[e.value]:1}function f(e){return e.slice(-1)[0]}function s(e,t){var n=e.pop()||null,u=e.pop()||null;e.push(new r.ASTNode(t,u,n))}t.default=function(e){var t=[],n=[];for((0,o.default)(e).forEach((function(e){if("NUM"===e.type)t.push(new r.ASTNode(e,null,null));else if("OP"===e.type){for(;f(n)&&"OP"===f(n).type&&l(e)<=l(f(n));)s(t,n.pop());n.push(e)}else if("LPAREN"===e.type)n.push(e);else if("RPAREN"===e.type){for(;f(n)&&"LPAREN"!==f(n).type;)s(t,n.pop());n.pop()}}));f(n);)s(t,n.pop());return t.pop()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ASTNode=void 0;var u=function(e,t,n){this.token=e?e.value:void 0,this.left=t,this.right=n};t.ASTNode=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={"*":2,"/":2,"+":1,"-":1}},function(e,t,n){"use strict";var u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(14),i=u(n(15)),o=u(n(0));t.default=function(e){for(var t=[],n="",u=0;u<e.length;u++){n+=e[u];var l=e[u+1];0===u&&"-"===n&&(t.push(new r.Token("NUM","0")),t.push(new r.Token("OP",n)),n=""),(0,i.default)(n)&&!(0,i.default)(l)&&(t.push(new r.Token("NUM",n)),n=""),"("!==n&&")"!==n||(t.push(new r.Token("("===n?"LPAREN":"RPAREN","("===n?"(":")")),n=""),(0,o.default)(n)&&!(0,o.default)(l)&&(t.push(new r.Token("OP",n)),n="")}return t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Token=void 0;var u=function(e,t){this.type=e,this.value=t};t.Token=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return!Number.isNaN(parseFloat(e))&&Number.isFinite(Number(e))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function e(t){if(t){var n=t.token,u=t.left,r=t.right;if(!u&&!r)return Number(n);if(u&&r){if("+"===n)return e(u)+e(r);if("-"===n)return e(u)-e(r);if("*"===n)return e(u)*e(r);if("/"===n)return e(u)/e(r)}return NaN}return NaN}}]);