"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[735],{5683:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"tutorial-harmonyos/arkts-page","title":"ArkTs","description":"- \u58f0\u660e\u5f0fUI","source":"@site/docs/tutorial-harmonyos/arkts-page.md","sourceDirName":"tutorial-harmonyos","slug":"/tutorial-harmonyos/arkts-page","permalink":"/docs/tutorial-harmonyos/arkts-page","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"\u9e3f\u8499(HarmonyOS)\u4ecb\u7ecd","permalink":"/docs/tutorial-harmonyos/create-a-page"},"next":{"title":"react","permalink":"/docs/category/react"}}');var i=t(6070),r=t(1140);const l={},c="ArkTs",a={},o=[{value:"\u57fa\u7840\u7ec4\u4ef6",id:"\u57fa\u7840\u7ec4\u4ef6",level:3},{value:"\u5feb\u901f\u683c\u5f0f\u4ee3\u7801  Ctrl+Alt+l",id:"\u5feb\u901f\u683c\u5f0f\u4ee3\u7801--ctrlaltl",level:3},{value:"\u7ffb\u8bd1\u63d2\u4ef6 Shift+Alt+o",id:"\u7ffb\u8bd1\u63d2\u4ef6-shiftalto",level:3}];function d(e){const n={code:"code",h1:"h1",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"arkts",children:"ArkTs"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u58f0\u660e\u5f0fUI"}),"\n",(0,i.jsx)(n.li,{children:"\u72b6\u6001\u7ba1\u7406"}),"\n",(0,i.jsx)(n.li,{children:".."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"@Entry               // \u6807\u8bb0\u5f53\u524d\u7ec4\u4ef6\u662f\u5165\u53e3\u7ec4\u4ef6\n@Component           // \u6807\u8bb0\u81ea\u5b9a\u4e49\u7ec4\u4ef6\nstruct Index {       // \u81ea\u5b9a\u4e49\u7ec4\u4ef6\uff1a\u53ef\u590d\u7528\u7684UI\u5355\u5143\n  @State message: string = 'Hello World'   // \u6807\u8bb0\u8be5\u53d8\u91cf\u662f\u72b6\u6001\u53d8\u91cf\uff0c\u503c\u53d8\u5316\u65f6\u4f1a\u89e6\u53d1UI \u66f4\u65b0\n\n  build() {   // UI \u63cf\u8ff0\uff1a\u5176\u5185\u90e8\u4ee5\u58f0\u660e\u5f0f\u65b9\u5f0f\u63cf\u8ff0UI\u7ed3\u6784\n    Row() {   // \u5185\u7f6e\u7ec4\u4ef6 ArkUI\n      Column() {    // \u5bb9\u5668\u7ec4\u4ef6\uff1a \u7528\u6765\u5b8c\u6210\u9875\u9762\u5e03\u5c40\n        Text(this.message)   // \u57fa\u7840\u7ec4\u4ef6\n          .fontSize(50)      // \u5c5e\u6027\u65b9\u6cd5\uff1a\u8bbe\u7f6e\u7ec4\u4ef6\u7684\u6837\u5f0f\n          .fontWeight(FontWeight.Bold)\n          .onClick(()=>{    // \u4e8b\u4ef6\u65b9\u6cd5\uff1a\u8bbe\u7f6e\u7ec4\u4ef6\u7684\u4e8b\u4ef6\u7684\u56de\u8c03\n            // ...\u5904\u7406\u4e8b\u4ef6\n          })\n      }\n    }\n  }\n}\n\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\u57fa\u7840\u7ec4\u4ef6",children:"\u57fa\u7840\u7ec4\u4ef6"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Image:\u56fe\u7247\u663e\u793a\u7ec4\u4ef6"}),"\n",(0,i.jsx)(n.p,{children:"1.\u58f0\u660eImage\u7ec4\u4ef6\u5e76\u8bbe\u7f6e\u56fe\u7247\u6e90"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"1715242002622",src:t(219).A+"",width:"1378",height:"631"})}),"\n",(0,i.jsx)(n.p,{children:"2.\u6dfb\u52a0\u56fe\u7247\u5c5e\u6027"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"1715242035211",src:t(5143).A+"",width:"576",height:"147"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Text\uff1a\u6587\u672c\u663e\u793a\u7ec4\u4ef6"}),"\n",(0,i.jsx)(n.p,{children:"1.\u58f0\u660eText\u7ec4\u4ef6\u5e76\u8bbe\u7f6e\u6587\u672c\u5185\u5bb9"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"1715243412304",src:t(7058).A+"",width:"968",height:"467"})}),"\n",(0,i.jsx)(n.p,{children:"2.\u6dfb\u52a0\u6587\u672c\u5c5e\u6027"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"1715243459168",src:t(4943).A+"",width:"464",height:"152"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"TextInput\uff1a\u6587\u672c\u8f93\u5165\u6846"}),"\n",(0,i.jsx)(n.p,{children:"1.\u58f0\u660eTextInput\u7ec4\u4ef6\uff1a"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"1715244131780",src:t(5437).A+"",width:"880",height:"202"})}),"\n",(0,i.jsx)(n.p,{children:"2.\u6dfb\u52a0\u5c5e\u6027\u548c\u4e8b\u4ef6\uff1a"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"1715244733359",src:t(3219).A+"",width:"976",height:"218"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\u5feb\u901f\u683c\u5f0f\u4ee3\u7801--ctrlaltl",children:"\u5feb\u901f\u683c\u5f0f\u4ee3\u7801  Ctrl+Alt+l"}),"\n",(0,i.jsx)(n.h3,{id:"\u7ffb\u8bd1\u63d2\u4ef6-shiftalto",children:"\u7ffb\u8bd1\u63d2\u4ef6 Shift+Alt+o"})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},219:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/1715242002622-604c97f158d77646876f6685d2374de3.png"},5143:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/1715242035211-cb6e457384642d36ba246cfff72099e0.png"},7058:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/1715243412304-ee887b3408975bba98af8000458be263.png"},4943:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/1715243459168-eb2f69ed3e57e770b4192b81580f0ebd.png"},5437:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/1715244131780-c7fd8eb401e1e1e221c6b8e7859760ee.png"},3219:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/1715244733359-43c08425cc1e5861902e4ca7e8d187d0.png"},1140:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>c});var s=t(758);const i={},r=s.createContext(i);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);