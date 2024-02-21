(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{O:()=>L});var t,n,r,o={authorization:"5535a833-4ea2-4146-a052-14fe6658fadc","Content-Type":"application/json"},c="https://nomoreparties.co/v1/wff-cohort-6",u=function(e){if(e.ok)return e.json();throw new Error("Ошибка: ".concat(e.status))};function i(e){return fetch(c+e,{headers:o}).then(u)}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s),e.addEventListener("click",d)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&document.querySelector(".popup_is-opened").classList.remove("popup_is-opened")}function d(e){!e.target.closest(".popup__close")&&e.target.closest(".popup__content")||l(document.querySelector(".popup_is-opened"))}function p(e){document.querySelector(".button__text").textContent=e?"Сохранение...":"Сохранение"}var f=document.querySelector(".places__list");function _(e,u,i,l){var s=L.querySelector(".card").cloneNode(!0),d=s.querySelector(".card__delete-button"),p=s.querySelector(".card__image"),f=s.querySelector(".card__title"),_=s.querySelector(".card__like-button");return p.src=e.link,f.textContent=e.name,p.alt="На этой картинке "+e.name,function(e,t,n){n.style.display=e===t?"":"none"}(i,e.owner._id,d),d.addEventListener("click",(function(){!function(e,r,o){a(e),t=r,n=o}(l,e._id,s)})),_.addEventListener("click",(function(){!function(e,n,u){r=u,t=e,function(e){var n,u,i=r.querySelector(".card__like-button"),a=r.querySelector(".card__like-counter"),l=i.classList.contains("card__like-button_is-active");(n=t,u=l?"DELETE":"PUT",fetch(c+"/cards/likes/"+n,{method:u,headers:o}).then((function(e){if(e.ok)return e.json();throw new Error("Ошибка: ".concat(e.status))}))).then((function(t){t.likes.map((function(e){return e._id})).includes(e)?i.classList.add("card__like-button_is-active"):i.classList.remove("card__like-button_is-active"),a.textContent=t.likes.length})).catch((function(e){return console.error("Ошибка при обновлении лайка:",e)}))}(n)}(e._id,i,s)})),p.addEventListener("click",(function(){u(e.link,e.name)})),e.likes.map((function(e){return e._id})).includes(i)?_.classList.add("card__like-button_is-active"):_.classList.remove("card__like-button_is-active"),s}var y=document.querySelector(".popup_type_image"),v=document.querySelector(".popup__image"),m=document.querySelector(".popup__caption");function h(e,t){v.src=e,m.textContent=t,v.alt=t,a(y)}var S={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",errorActive:"popup__input-error_active"},b=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorActive),r.textContent=""};function q(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.inactiveButtonClass):t.classList.add(n.inactiveButtonClass)}function E(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){b(e,n,t)})),e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass)}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var k,L=document.querySelector("#card-template").content,C=document.querySelector(".popup_type_edit"),A=document.querySelector(".profile__edit-button"),w=document.querySelector(".popup_type_new-card"),x=document.querySelector(".profile__add-button");A.addEventListener("click",(function(){a(C),E(C,S)})),x.addEventListener("click",(function(){a(w),E(w,S)}));var O=document.querySelector('[name="edit_profile"]'),j=O.querySelector(".popup__input_type_name"),T=O.querySelector(".popup__input_type_description"),B=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),D=document.querySelector(".popup_type_delete"),I=document.querySelector('[name="delete-card"]'),M=document.querySelector(".popup_type_avatar"),N=document.querySelector('[name="new-avatar"]');O.addEventListener("submit",(function(e){var t,n;e.preventDefault(),p(!0),("/users/me",t=B.textContent=j.value,n=P.textContent=T.value,fetch(c+"/users/me",{method:"PATCH",headers:o,body:JSON.stringify({name:t,about:n})}).then(u).catch((function(e){return console.log(e)}))).finally((function(){p(!1)})),l(C)})),A.addEventListener("click",(function(){j.value=B.textContent,T.value=P.textContent})),I.addEventListener("click",(function(){!function(e,t){var r;n.remove(),r="".concat(e),fetch(c+"/cards/"+r,{method:"DELETE",headers:o}).then(u).catch((function(e){return console.log(e)})),l(t)}(t,D)}));var J,H=document.querySelector('[name="new-place"]'),U=H.querySelector(".popup__input_type_card-name"),V=H.querySelector(".popup__input_type_url");H.addEventListener("submit",(function(e){var t,n;e.preventDefault(),p(!0),("/cards",t=U.value,n=V.value,fetch(c+"/cards",{method:"POST",headers:o,body:JSON.stringify({name:t,link:n})}).then(u).catch((function(e){return console.log(e)}))).then((function(e){var t=_(e);f.prepend(t),U.value="",V.value="",l(w)})).catch((function(e){return console.log(e)})).finally((function(){p(!1)}))})),J=S,Array.from(document.querySelectorAll(J.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);q(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?b(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorActive)}(e,t,t.validationMessage,n)}(e,o,t),q(n,r,t)}))}))}(e,J)}));var z=document.querySelector(".profile__image"),$=N.querySelector(".popup__input_type_url");z.addEventListener("click",(function(e){e.target===z&&a(M)})),N.addEventListener("submit",(function(e){var t;e.preventDefault(),(t=$.value,fetch(c+"/users/me/avatar",{method:"PATCH",headers:o,body:JSON.stringify({avatar:t})}).then(u).catch((function(e){return console.log(e)}))).then((function(e){console.log(e),z.style.backgroundImage="url(".concat(e.avatar,")"),l(M)})).catch((function(e){return console.error(e)})).finally((function(){p(!1)}))})),Promise.all([i("/users/me"),i("/cards")]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];console.log(u),k=c._id,z.style.backgroundImage="url(".concat(c.avatar,")"),t=c,B.textContent=t.name,P.textContent=t.about,function(e,t,n){var r=new Map;e.forEach((function(e){!function(e){f.append(e)}(_(e,h,t,n)),r.set(e._id,e.likes.length)})),document.querySelectorAll(".card__like-counter").forEach((function(t,n){var o=e[n]._id,c=r.get(o);t.textContent=c}))}(u,k,D)})).catch((function(e){return console.error("Произошла ошибка:",e)}))})();