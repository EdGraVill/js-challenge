(this["webpackJsonpjs-challenge"]=this["webpackJsonpjs-challenge"]||[]).push([[1],{104:function(n,e,t){var r={"./bs-BS.json":[127,18],"./de-DE.json":[128,19],"./en-EN.json":[129,20],"./en-US.json":[130,21],"./es-ES.json":[131,22],"./fr-FR.json":[132,23],"./ja-JA.json":[133,24],"./ko-KR.json":[134,25],"./nl-NL.json":[135,26],"./pt-BR.json":[136,27],"./ru-RU.json":[137,28],"./th-TH.json":[138,29],"./tr-TR.json":[139,30],"./ua-UA.json":[140,31],"./vi-VI.json":[141,32],"./zh-CN.json":[142,33],"./zh-TW.json":[143,34]};function o(n){if(!t.o(r,n))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=r[n],o=e[0];return t.e(e[1]).then((function(){return t.t(o,3)}))}o.keys=function(){return Object.keys(r)},o.id=104,n.exports=o},106:function(n,e,t){var r={"./bs-BS.svg":[145,4],"./de-DE.svg":[146,5],"./en-EN.svg":[147,6],"./en-US.svg":[148,7],"./es-ES.svg":[149,8],"./fr-FR.svg":[150,9],"./ja-JA.svg":[151,10],"./ko-KR.svg":[152,11],"./no-flag.svg":[144,0],"./pt-BR.svg":[153,12],"./ru-RU.svg":[154,13],"./tr-TR.svg":[155,14],"./ua-UA.svg":[156,15],"./vi-VI.svg":[157,16],"./zh-CN.svg":[158,17]};function o(n){if(!t.o(r,n))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=r[n],o=e[0];return t.e(e[1]).then((function(){return t.t(o,7)}))}o.keys=function(){return Object.keys(r)},o.id=106,n.exports=o},109:function(n,e,t){"use strict";t.r(e);var r=t(0),o=t.n(r),a=t(9),c=t.n(a),u=t(4),i=t(2),l=t(6),s=t(1),f=t(15),d=t.n(f),m=t(5);function g(){var n=Object(i.a)(['\n  /**\n  * prism.js default theme for JavaScript, CSS and HTML\n  * Based on dabblet (http://dabblet.com)\n  * @author Lea Verou\n  */\n  code[class*="language-"],\n  pre[class*="language-"] {\n    color: #ABB2BF;\n    background: none;\n    font-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n  }\n\n  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,\n  code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {\n    text-shadow: none;\n    background: #383e49;\n  }\n\n  pre[class*="language-"]::selection, pre[class*="language-"] ::selection,\n  code[class*="language-"]::selection, code[class*="language-"] ::selection {\n    text-shadow: none;\n    background: #9aa2b1;\n  }\n\n  @media print {\n    code[class*="language-"],\n    pre[class*="language-"] {\n      text-shadow: none;\n    }\n  }\n  /* Code blocks */\n  pre[class*="language-"] {\n    padding: 1em;\n    margin: .5em 0;\n    overflow: auto;\n  }\n\n  :not(pre) > code[class*="language-"],\n  pre[class*="language-"] {\n    background: #282c34;\n  }\n\n  /* Inline code */\n  :not(pre) > code[class*="language-"] {\n    padding: .1em;\n    border-radius: .3em;\n    white-space: normal;\n  }\n\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n    color: #5C6370;\n  }\n\n  .token.punctuation {\n    color: #abb2bf;\n  }\n\n  .token.selector,\n  .token.tag {\n    color: #e06c75;\n  }\n\n  .token.property,\n  .token.boolean,\n  .token.number,\n  .token.constant,\n  .token.symbol,\n  .token.attr-name,\n  .token.deleted {\n    color: #d19a66;\n  }\n\n  .token.string,\n  .token.char,\n  .token.attr-value,\n  .token.builtin,\n  .token.inserted {\n    color: #98c379;\n  }\n\n  .token.operator,\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n    color: #56b6c2;\n  }\n\n  .token.atrule,\n  .token.keyword {\n    color: #c678dd;\n  }\n\n  .token.function {\n    color: #61afef;\n  }\n\n  .token.regex,\n  .token.important,\n  .token.variable {\n    color: #c678dd;\n  }\n\n  .token.important,\n  .token.bold {\n    font-weight: bold;\n  }\n\n  .token.italic {\n    font-style: italic;\n  }\n\n  .token.entity {\n    cursor: help;\n  }\n\n  .token.parameter {\n    color: #E06C75;\n  }\n\n  pre.line-numbers {\n    position: relative;\n    padding-left: 3.8em;\n    counter-reset: linenumber;\n  }\n\n  pre.line-numbers > code {\n    position: relative;\n  }\n\n  .line-numbers .line-numbers-rows {\n    position: absolute;\n    pointer-events: none;\n    top: 0;\n    font-size: 100%;\n    left: -3.8em;\n    width: 3em; /* works for line-numbers below 1000 lines */\n    letter-spacing: -1px;\n    border-right: 0;\n\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n  }\n\n  .line-numbers-rows > span {\n    pointer-events: none;\n    display: block;\n    counter-increment: linenumber;\n  }\n\n  .line-numbers-rows > span:before {\n    content: counter(linenumber);\n    color: #5C6370;\n    display: block;\n    padding-right: 0.8em;\n    text-align: right;\n  }\n']);return g=function(){return n},n}var b=Object(s.b)(g()),p=t(23),v=t.n(p);function h(){var n=Object(i.a)(["\n    color: #E5C07B;\n    white-space: pre-wrap;\n    ","\n    background-color: ",";\n    border-radius: 1rem;\n    box-sizing: border-box;\n    font-family: ",";\n    margin: 0 auto;\n    padding: 1.25rem 2rem;\n    width: 600px;\n\n    &::selection, & *::selection {\n      background-color: ",";\n    }\n\n    @media screen and (max-width: 600px) {\n      border-radius: 0; \n    }\n  "]);return h=function(){return n},n}function _(){var n=Object(i.a)(["\n  ","\n"]);return _=function(){return n},n}function j(){var n=Object(i.a)(["\n  margin: 1.5rem 0;\n  overflow-x: auto;\n  width: 100%;\n"]);return j=function(){return n},n}var O=s.c.div(j()),w=s.c.div(_(),(function(n){var e=n.theme,t=e.colors,r=e.fonts;return Object(s.b)(h(),b,t.codeBackground,r.code,"".concat(t.codeSelected,"60"))})),E=function(n){var e=n.code,t=n.language,o=v.a.highlight(e,v.a.languages[t],t);return r.createElement(O,null,r.createElement(w,{dangerouslySetInnerHTML:{__html:o}}))},k=t(40);function x(){var n=Object(i.a)(["\n    background-color: ",";\n    border: 0;\n    border-radius: 5px;\n    color: white;\n    cursor: pointer;\n    font-family: ",";\n    font-size: 1.2rem;\n    padding: .5rem 1rem;\n    line-height: 1.7rem;\n    margin: .5rem 1rem;\n    user-select: none;\n    width: 100%;\n\n    & > p {\n      margin: 0;\n      padding: 0;\n    }\n\n    & code {\n      background-color: #FFFFFF20;\n      font-family: ",";\n      padding: .3rem .5rem;\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    &:hover {\n      filter: brightness(1.15);\n    }\n  "]);return x=function(){return n},n}function y(){var n=Object(i.a)(["\n  ","\n"]);return y=function(){return n},n}var C=s.c.button(y(),(function(n){var e=n.isCorrect,t=n.selected,r=n.theme,o=r.colors,a=r.fonts;return Object(s.b)(x(),e?o.right:t?o.wrong:o.primary,a.titles,a.code)})),S=function(n){var e=n.selected,t=n.isCorrect,o=Object(k.a)(n,["selected","isCorrect"]);return r.createElement(C,Object.assign({},o,{isCorrect:t,selected:e}))};function R(){var n=Object(i.a)(["\n    background-color: ",";\n    border: 1px solid ",";\n    border-radius: 5px;\n    color: ",";\n    cursor: pointer;\n    font-family: ",";\n    font-size: 1.2rem;\n    font-weight: bold;\n    padding: .5rem 1rem;\n    line-height: 1.7rem;\n    margin: .5rem 1rem;\n    user-select: none;\n    width: 100%;\n\n    & > p {\n      margin: 0;\n      padding: 0;\n    }\n\n    & code {\n      background-color: #FFFFFF20;\n      font-family: ",";\n      padding: .3rem .5rem;\n    }\n\n    &:focus {\n      outline: none;\n    }\n\n    &:hover {\n      background-color: ",";\n    }\n\n    &:disabled {\n      background-color: ",";\n      border: 1px solid ",";\n      color: ",";\n      cursor: default;\n    }\n  "]);return R=function(){return n},n}function M(){var n=Object(i.a)(["\n  ","\n"]);return M=function(){return n},n}var D=s.c.button(M(),(function(n){var e=n.theme,t=e.colors,r=e.fonts;return Object(s.b)(R(),t.transparent,t.primary,t.primary,r.titles,r.code,"".concat(t.primary,"15"),"".concat(t.disabled,"15"),t.disabled,t.disabled)})),A=function(n){return r.createElement(D,n)},T=t(8);function z(){var n=Object(i.a)(["\n    font-family: ",";\n    font-size: 1.5rem;\n    text-align: center;\n    width: 90%;\n  "]);return z=function(){return n},n}function U(){var n=Object(i.a)(["\n  ","\n"]);return U=function(){return n},n}function B(){var n=Object(i.a)(["\n    font-family: ",";\n    font-size: 1.1rem;\n    margin: 0 0 5rem;\n    width: 90%;\n\n    & p {\n      line-height: 2rem;\n      text-align: justify;\n    }\n\n    & code {\n      background-color: ",";\n      color: ",";\n      font-family: ",";\n      font-size: 1.1rem;\n      padding: .2rem .4rem;\n    }\n  "]);return B=function(){return n},n}function I(){var n=Object(i.a)(["\n  ","\n"]);return I=function(){return n},n}var P=new d.a,N=s.c.aside(I(),(function(n){var e=n.theme,t=e.colors,r=e.fonts;return Object(s.b)(B(),r.titles,t.inlineCodeBackground,t.inlineCodeColor,r.code)})),F=s.c.h3(U(),(function(n){var e=n.theme.fonts;return Object(s.b)(z(),e.titles)})),L=r.forwardRef((function(n,e){var t=n.explanation.reduce((function(n,e){return"".concat(n).concat(P.render(e))}),""),o=Object(T.a)();return r.createElement(r.Fragment,null,r.createElement(F,null,o("question.explanation")),r.createElement(N,{dangerouslySetInnerHTML:{__html:t},ref:e}))}));function q(){var n=Object(i.a)(["\n  align-items: center;\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-around;\n  margin: .5rem 0;\n  max-width: 600px;\n  width: 95%;\n"]);return q=function(){return n},n}function J(){var n=Object(i.a)(["\n  align-items: center;\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-around;\n  margin: .5rem 0;\n  max-width: 600px;\n  width: 95%;\n"]);return J=function(){return n},n}function K(){var n=Object(i.a)(["\n    font-family: ",";\n    font-size: 1.5rem;\n    margin: 0;\n    max-width: 600px;\n    padding: 0;\n    text-align: center;\n    width: 90%;\n  "]);return K=function(){return n},n}function W(){var n=Object(i.a)(["\n  ","\n"]);return W=function(){return n},n}function H(){var n=Object(i.a)(["\n  align-items: center;\n  display: flex;\n  flex-flow: column nowrap;\n  margin: 0 auto;\n  max-width: 800px;\n"]);return H=function(){return n},n}var V=new d.a,$=s.c.article(H()),Q=s.c.h2(W(),(function(n){var e=n.theme.fonts;return Object(s.b)(K(),e.titles)})),G=s.c.div(J()),X=s.c.div(q()),Y=function(n){var e,t=n.goTo,o=n.questionIx,a=Object(u.a)(n.safeAnswersHook,2),c=a[0],i=a[1],s=n.secureQuestion,f=n.reset,d=s.getAnswer,g=s.options,b=s.problem,p=s.question,v=r.useState(null),h=Object(u.a)(v,2),_=h[0],j=h[1],O=r.useState(null),w=Object(u.a)(O,2),k=w[0],x=w[1],y=r.useRef(null),C=Object(T.a)();return r.useEffect((function(){setTimeout((function(){y.current&&y.current.scrollIntoView({behavior:"smooth"})}),500)})),r.useEffect((function(){j(null),x(null),i(Object(l.b)())}),[s,i]),r.useEffect((function(){var n=c.find((function(n){var e=Object(u.a)(n,1)[0];return s.id===e}));n&&null!==n[1]&&(j(n[1]),x(d(n[1])))}),[s,c,d]),r.createElement($,null,r.createElement(Q,null,p),r.createElement(E,{code:b,language:"javascript"}),r.createElement(G,null,g.map((function(n,e){return r.createElement(S,{dangerouslySetInnerHTML:{__html:V.render(n)},isCorrect:(null===k||void 0===k?void 0:k.rightAnswer)===e,key:n,onClick:(t=e,function(){Object(m.c)(c)?f():null===_&&(j(t),x(d(t)),i(Object(l.b)()))}),selected:_===e});var t}))),r.createElement(X,null,r.createElement(A,{disabled:0===o,onClick:t(o-1)},C("question.previous")),r.createElement(A,{disabled:null===(null===(e=c.find((function(n){var e=Object(u.a)(n,1)[0];return s.id===e})))||void 0===e?void 0:e[1]),onClick:t(o+1)},C("question.next"))),k&&r.createElement(L,{explanation:k.explanation,ref:y}))};function Z(){var n=Object(i.a)(["\n      background-color: ",";\n      border-color: ",";\n      color: ",";\n      cursor: pointer;\n      font-weight: bold;\n    "]);return Z=function(){return n},n}function nn(){var n=Object(i.a)(["\n  ","\n  ","\n\n  &:focus {\n    outline: none;\n  }\n"]);return nn=function(){return n},n}function en(){var n=Object(i.a)(["\n  ","\n"]);return en=function(){return n},n}function tn(){var n=Object(i.a)(["\n    align-items: center;\n    border: 2px solid #777;\n    border-radius: 1.75rem;\n    color: #777;\n    display: flex;\n    font-family: ",";\n    font-size: 1.1rem;\n    justify-content: center;\n    margin: 0 .3rem;\n    padding: 0;\n    min-width: 2.5rem;\n    height: 2.5rem;\n\n    @media screen and (max-width: 480px) {\n      font-size: .8rem;\n      height: 1.3rem;\n      min-width: 1.3rem;\n      margin: 0 .2rem;\n    }\n  "]);return tn=function(){return n},n}function rn(){var n=Object(i.a)(["\n  ","\n"]);return rn=function(){return n},n}function on(){var n=Object(i.a)(["\n  align-items: center;\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: center;\n  margin: 0 0 1rem;\n  width: 100%;\n"]);return on=function(){return n},n}var an=s.c.div(on()),cn=Object(s.b)(rn(),(function(n){var e=n.theme.fonts;return Object(s.b)(tn(),e.titles)})),un=s.c.div(en(),cn),ln=s.c.button(nn(),cn,(function(n){var e=n.isSelected,t=n.status,r=n.theme.colors,o=e?r.primaryDark:r.gray;return null!==t&&(o="".concat(t?r.right:r.wrong,"50")),Object(s.b)(Z(),e?r.primary:r.transparent,o,e?"white":r.gray)})),sn=function(n){var e=n.currentQuestion,t=n.goTo,o=n.safeAnswers;return r.createElement(an,null,Array(10).fill(null).map((function(n,a){var c=0===a||null!==o[a-1][1],u=a===e,i=o[a][2];return c?r.createElement(ln,{key:a,isSelected:u,onClick:t(a),status:i},a+1):r.createElement(un,{key:a},a+1)})),10===o.filter((function(n){var e=Object(u.a)(n,2);e[0];return null!==e[1]})).length&&r.createElement(ln,{isSelected:10===e,onClick:t(10),status:null},r.createElement("span",{style:{padding:"0 .5rem"}},"Sumary")))},fn=t(24);function dn(){var n=Object(i.a)(["\n    font-family: ",";\n    font-size: 2rem;\n    margin: 0;\n    max-width: 600px;\n    padding: 0;\n    text-align: center;\n    width: 90%;\n  "]);return dn=function(){return n},n}function mn(){var n=Object(i.a)(["\n  ","\n"]);return mn=function(){return n},n}function gn(){var n=Object(i.a)(["\n    font-family: ",";\n    font-size: 1.1rem;\n    line-height: 2rem;\n    margin: 0 0 5rem;\n    text-align: center;\n    width: 90%;\n  "]);return gn=function(){return n},n}function bn(){var n=Object(i.a)(["\n  ","\n"]);return bn=function(){return n},n}function pn(){var n=Object(i.a)(["\n  margin: 2rem;\n  max-width: 400px;\n  width: 90%;\n"]);return pn=function(){return n},n}function vn(){var n=Object(i.a)(["\n  align-items: center;\n  display: flex;\n  flex-flow: column nowrap;\n  margin: 0 auto;\n  max-width: 800px;\n"]);return vn=function(){return n},n}var hn=s.c.article(vn()),_n=s.c.div(pn()),jn=s.c.p(bn(),(function(n){var e=n.theme.fonts;return Object(s.b)(gn(),e.titles)})),On=s.c.h2(mn(),(function(n){var e=n.theme.fonts;return Object(s.b)(dn(),e.titles)})),wn=function(n){var e=n.safeAnswers.filter((function(n){var e=Object(u.a)(n,3);e[0],e[1];return e[2]})).length,t=Object(T.a)(),o=function(){var n=r.useRef(null),e=r.useState(null),t=Object(u.a)(e,2),o=t[0],a=t[1],c=r.useContext(m.a);r.useEffect((function(){n.current&&null===o&&a(new fn.Chart(n.current.getContext("2d"),{type:"pie",data:{labels:["Wrong","Right"],datasets:[{data:[10,0],backgroundColor:[m.e[c.theme].colors.inlineCodeBackground,m.e[c.theme].colors.right]}]},options:{responsive:!0,legend:{display:!1},tooltips:{enabled:!1},hover:{mode:void 0}}}))}),[o,c.theme]);var i=r.useCallback((function(n){o&&(o.data.datasets[0].data=[10-n,n],o.update())}),[o]);return[r.createElement("canvas",{ref:n}),i,o||new fn.Chart(document.createElement("canvas").getContext("2d"),{})]}(),a=Object(u.a)(o,2),c=a[0],i=a[1];return r.useEffect((function(){i(e)})),r.createElement(hn,null,r.createElement(On,null,t("summary.title")),r.createElement(_n,null,c),r.createElement(jn,null,e,t("summary.body")))};function En(){var n=Object(i.a)(["\n    font-family: ",";\n    font-size: 2rem;\n    margin: 0;\n  "]);return En=function(){return n},n}function kn(){var n=Object(i.a)(["\n  ","\n"]);return kn=function(){return n},n}var xn=s.c.h1(kn(),(function(n){var e=n.theme.fonts;return Object(s.b)(En(),e.titles)})),yn=function(){return r.createElement(xn,null,"JS Challenge")};function Cn(){var n=Object(i.a)(["\n    align-items: center;\n    background-color: ",";\n    box-sizing: border-box;\n    display: flex;\n    flex-flow: row nowrap;\n    height: 6rem;\n    justify-content: space-between;\n    padding: 0 5vw;\n  "]);return Cn=function(){return n},n}function Sn(){var n=Object(i.a)(["\n  ","\n"]);return Sn=function(){return n},n}var Rn=s.c.div(Sn(),(function(n){var e=n.theme.colors;return Object(s.b)(Cn(),e.background)})),Mn=function(){return r.createElement(Rn,null,r.createElement("div",null),r.createElement(yn,null,"JS Challenge"),r.createElement("div",null))},Dn=t(7),An=t.n(Dn),Tn=t(39),zn=[{name:"English",locale:"en-US"},{name:"Bosanski",locale:"bs-BS"},{name:"Deutsch",locale:"de-DE"},{name:"English",locale:"en-EN"},{name:"Espa\xf1ol",locale:"es-ES"},{name:"Fran\xe7ais",locale:"fr-FR"},{name:"\u65e5\u672c\u8a9e",locale:"ja-JA"},{name:"\ud55c\uad6d\uc5b4",locale:"ko-KR"},{name:"Nederlands",locale:"nl-NL"},{name:"Portugu\xeas Brasil",locale:"pt-BR"},{name:"\u0420\u0443\u0441\u0441\u043a\u0438\u0439",locale:"ru-RU"},{name:"\u0e44\u0e17\u0e22",locale:"th-TH"},{name:"T\xfcrk\xe7e",locale:"tr-TR"},{name:"\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430 \u043c\u043e\u0432\u0430",locale:"ua-UA"},{name:"Ti\u1ebfng Vi\u1ec7t",locale:"vi-VI"},{name:"\u7b80\u4f53\u4e2d\u6587",locale:"zh-CN"},{name:"\u7e41\u9ad4\u4e2d\u6587",locale:"zh-TW"}];function Un(){var n=Object(i.a)(["\n  height: 1.5rem;\n  padding-right: .5rem;\n"]);return Un=function(){return n},n}function Bn(){var n=Object(i.a)(["\n    align-items: center;\n    display: flex;\n    font-family: ",";\n    flex-flow: row nowrap;\n  "]);return Bn=function(){return n},n}function In(){var n=Object(i.a)(["\n  ","\n"]);return In=function(){return n},n}function Pn(){var n=Object(i.a)(["\n  width: 10rem;\n"]);return Pn=function(){return n},n}function Nn(){var n=Object(i.a)(["\n    background-color: ",";\n    box-sizing: border-box;\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: flex-end;\n    padding: .5rem;\n    width: 100%;\n  "]);return Nn=function(){return n},n}function Fn(){var n=Object(i.a)(["\n  ","\n"]);return Fn=function(){return n},n}var Ln=s.c.div(Fn(),(function(n){var e=n.theme.colors;return Object(s.b)(Nn(),e.background)})),qn=s.c.div(Pn()),Jn=s.c.div(In(),(function(n){var e=n.theme.fonts;return Object(s.b)(Bn(),e.titles)})),Kn=s.c.img(Un()),Wn=function(){var n=r.useContext(m.a),e=n.language,o=n.setSetting,a=r.useState([]),c=Object(u.a)(a,2),i=c[0],l=c[1];if(r.useEffect((function(){var n=zn.map((function(n){return n.locale}));n.length!==i.length&&function(n){var e;return An.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,An.a.awrap(Promise.all(n.map((function(n){var e,r,o,a;return An.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return c.prev=0,c.next=3,An.a.awrap(t(106)("./".concat(n,".svg")));case 3:return e=c.sent,r=e.default,c.abrupt("return",r);case 8:return c.prev=8,c.t0=c.catch(0),c.next=12,An.a.awrap(t.e(0).then(t.t.bind(null,144,7)));case 12:return o=c.sent,a=o.default,c.abrupt("return",a);case 15:case"end":return c.stop()}}),null,null,[[0,8]])}))));case 2:return e=r.sent,r.abrupt("return",e);case 4:case"end":return r.stop()}}))}(n).then((function(n){l(n)}))}),[i]),!i.length)return r.createElement("div",null,"Loading...");var s=zn.map((function(n,e){var t=n.name,o=n.locale;return{label:r.createElement(Jn,null,r.createElement(Kn,{src:i[e]})," ",t),value:o}})),f=s.find((function(n){return n.value===e}));return r.createElement(Ln,null,r.createElement(qn,null,r.createElement(Tn.a,{defaultValue:f,name:"language",options:s,onChange:function(n){return o({setting:"language",value:n.value})},menuPlacement:"auto"})))};function Hn(){var n=Object(i.a)(["\n    background-color: ",";\n    box-sizing: border-box;\n    min-height: calc(100vh - 6rem);\n    width: 100%;\n  "]);return Hn=function(){return n},n}function Vn(){var n=Object(i.a)(["\n  ","\n"]);return Vn=function(){return n},n}var $n=s.c.main(Vn(),(function(n){var e=n.theme.colors;return Object(s.b)(Hn(),e.background)})),Qn=function(){var n=r.useState([]),e=Object(u.a)(n,2),t=e[0],o=e[1],a=r.useState(0),c=Object(u.a)(a,2),i=c[0],s=c[1],f=r.useState([]),d=Object(u.a)(f,2),g=d[0],b=d[1],p=r.useRef(null),v=r.useContext(m.a).language,h=r.useState(v),_=Object(u.a)(h,2),j=_[0],O=_[1],w=Object(T.a)(),E=r.useCallback((function(){b([]),o([])}),[b]),k=function(n){return function(){Object(m.c)(g)?E():s(n)}};return r.useEffect((function(){t.length&&v===j||(O(v),b([]),Object(l.a)(v).then((function(n){o(n),s(0),b(Object(l.b)())})))}),[t,b,v,j]),r.useEffect((function(){var n;t.length&&i>0&&null===(null===(n=Object(l.b)()[i-1])||void 0===n?void 0:n[1])&&(console.error("CHEATER!"),E())}),[i,E,t]),r.useEffect((function(){t.length&&b(Object(l.b)())}),[i,t.length,b]),!t.length||g.length<10?r.createElement("p",null,w("questions.loading")):r.createElement(r.Fragment,null,r.createElement(Mn,null),r.createElement($n,{ref:p},r.createElement(sn,{currentQuestion:i,goTo:k,safeAnswers:g}),10===i?r.createElement(wn,{safeAnswers:g}):r.createElement(Y,{goTo:k,questionIx:i,safeAnswersHook:f,secureQuestion:t[i],reset:E}),r.createElement(Wn,null)))};c.a.render(o.a.createElement(m.b,null,o.a.createElement(Qn,null)),document.getElementById("root"))},41:function(n,e,t){n.exports=t(109)},49:function(n,e,t){var r={"./bs-BS.json":[110,35],"./de-DE.json":[111,36],"./en-EN.json":[112,37],"./en-US.json":[113,38],"./es-ES.json":[114,39],"./fr-FR.json":[115,40],"./ja-JA.json":[116,41],"./ko-KR.json":[117,42],"./nl-NL.json":[118,43],"./pt-BR.json":[119,44],"./ru-RU.json":[120,45],"./th-TH.json":[121,46],"./tr-TR.json":[122,47],"./ua-UA.json":[123,48],"./vi-VI.json":[124,49],"./zh-CN.json":[125,50],"./zh-TW.json":[126,51]};function o(n){if(!t.o(r,n))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=r[n],o=e[0];return t.e(e[1]).then((function(){return t.t(o,3)}))}o.keys=function(){return Object.keys(r)},o.id=49,n.exports=o},5:function(n,e,t){"use strict";t.d(e,"d",(function(){return l})),t.d(e,"c",(function(){return s})),t.d(e,"e",(function(){return f})),t.d(e,"a",(function(){return m})),t.d(e,"b",(function(){return g}));var r=t(11),o=t(21),a=t(4),c=t(0),u=t(6),i=t(1),l=function(n,e,t){var r=Math.floor(Math.random()*(e-n+1)+n);if("undefined"===typeof t||t instanceof Array&&!t.length)return r;if("number"===typeof t){for(;r===t;)r=Math.floor(Math.random()*(e-n+1)+n);return r}if(t instanceof Array&&"number"===typeof t[0]){for(;-1!==t.indexOf(r);)r=Math.floor(Math.random()*(e-n+1)+n);return r}throw new Error("Invalid operation:\n\n".concat(JSON.stringify({min:n,max:e,ignore:t},void 0,2)))},s=function(n){return!Object(u.b)().length||JSON.stringify(n)!==JSON.stringify(Object(u.b)())},f={light:{colors:{primary:"#6264a7",primaryDark:"#4E5085",right:"#008272",wrong:"#a4373a",transparent:"transparent",gray:"#777777",codeBackground:"#282c34",codeSelected:"#677696",inlineCodeBackground:"#DDDDDD",inlineCodeColor:"#282c34",background:"#ecf0f1",disabled:"#CCCCCC"},fonts:{code:"Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",titles:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}},d={language:localStorage.getItem("language")||"en-US",theme:"light",setSetting:function(){}},m=c.createContext(d),g=function(n){var e=n.children,t=c.useState(d),u=Object(a.a)(t,2),l=u[0],s=u[1];return c.createElement(m.Provider,{value:Object(o.a)({},l,{setSetting:function(n){var e=n.setting,t=n.value,a=Object(o.a)({},l,Object(r.a)({},e,t));"language"===e&&localStorage.setItem("language",t),s(a)}})},c.createElement(i.a,{theme:f[l.theme]},e))}},6:function(n,e,t){"use strict";t.d(e,"b",(function(){return l}));var r=t(7),o=t.n(r),a=t(4),c=t(5),u=function(){var n=localStorage.getItem("taken")||"[]";return JSON.parse(n)},i=function(n){var e=n.answer,t=n.explanation,r=n.id,o=n.options,c=n.problem,i=n.question;return{getAnswer:function(n){var o=u(),c=o.findIndex((function(n){var e=Object(a.a)(n,1)[0];return r===e}));return o[c][1]=n,o[c][2]=n===e,localStorage.setItem("taken",JSON.stringify(o)),{rightAnswer:e,explanation:t}},id:r,options:o,problem:c,question:i}};e.a=function n(e){var r,l,s,f,d;return o.a.async((function(m){for(;;)switch(m.prev=m.next){case 0:return r=(r=u()).filter((function(n){var e=Object(a.a)(n,2);e[0];return null!==e[1]})),m.next=4,o.a.awrap(t(49)("./".concat(e,".json")));case 4:return l=m.sent,s=l.default,r.length+10>=s.length&&(r=r.slice(Math.floor(.3*r.length))),f=Array(10).fill(null).map((function(){var n=Object(c.d)(0,s.length,r.map((function(n){return Object(a.a)(n,1)[0]})));return r.push([n,null,null]),s[n]})),localStorage.setItem("taken",JSON.stringify(r)),m.prev=9,m.abrupt("return",f.map(i));case 13:return m.prev=13,m.t0=m.catch(9),m.next=17,o.a.awrap(n(e));case 17:return d=m.sent,m.abrupt("return",d);case 19:case"end":return m.stop()}}),null,null,[[9,13]])};var l=function(){return u().reverse().slice(0,10).reverse()}},8:function(module,__webpack_exports__,__webpack_require__){"use strict";var _home_runner_work_js_challenge_js_challenge_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__),_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5);__webpack_exports__.a=function(){var _React$useState=react__WEBPACK_IMPORTED_MODULE_1__.useState(null),_React$useState2=Object(_home_runner_work_js_challenge_js_challenge_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_React$useState,2),locale=_React$useState2[0],setLocale=_React$useState2[1],_React$useContext=react__WEBPACK_IMPORTED_MODULE_1__.useContext(_util__WEBPACK_IMPORTED_MODULE_2__.a),language=_React$useContext.language;return react__WEBPACK_IMPORTED_MODULE_1__.useEffect((function(){__webpack_require__(104)("./".concat(language,".json")).then((function(n){var e=n.default;setLocale(e)}))}),[language]),function(token){return locale?eval("locale.".concat(token)):""}}}},[[41,2,3]]]);
//# sourceMappingURL=main.8a4534d9.chunk.js.map