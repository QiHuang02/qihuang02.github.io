import{_ as p,c as u,a as e,f as l,b as a,d as s,e as i,r as d,o as f}from"./app-DDaaE2rL.js";const c={},b={class:"vp-file-tree"},g={class:"tree-node folder"},h={class:"tree-node folder"},y={class:"tree-node folder"},x={class:"tree-node folder"},q={class:"tree-node file"},v={class:"tree-node folder"},S={class:"tree-node file"},H={class:"tree-node folder"},Q={class:"tree-node file"},_={class:"tree-node folder"},j={class:"tree-node file"},k={class:"tree-node file"},E={class:"tree-node folder"},J={class:"tree-node folder"},B={class:"tree-node folder"},P={class:"tree-node file"},T={class:"tree-node file"},C={class:"tree-node folder"},U={class:"tree-node file"},V={class:"tree-node folder"},w={class:"tree-node file"},K={class:"tree-node folder"},N={class:"tree-node file"},A={class:"tree-node folder"},z={class:"tree-node file"},D={class:"hint-container note"};function M(R,t){const m=d("Plot"),o=d("VPIcon"),n=d("FileTreeItem"),r=d("RouteLink");return f(),u("div",null,[t[38]||(t[38]=e("div",{class:"hint-container important"},[e("p",{class:"hint-container-title"},"重要"),e("p",null,"本笔记基于"),e("ul",null,[e("li",null,"Minecraft 1.21.1"),e("li",null,"KubeJS 2101.7.0"),e("li",null,"ProbeJS 7.4.0")])],-1)),t[39]||(t[39]=e("h2",{id:"代码编译器",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#代码编译器"},[e("span",null,"代码编译器")])],-1)),e("p",null,[t[1]||(t[1]=l("  在进行我的世界的魔改之前我们得需要一个代码编辑器来帮助我们写代码，当然你也可以使用Windows自带的记事本")),a(m,null,{default:s(()=>t[0]||(t[0]=[l("(我勒个记事本编程大佬)")])),_:1}),t[2]||(t[2]=l("，但是记事本没有代码提示能力，所以我推荐使用 ")),t[3]||(t[3]=e("a",{href:"https://code.visualstudio.com/",target:"_blank",rel:"noopener noreferrer"},[e("strong",null,"Visual Studio Code")],-1)),t[4]||(t[4]=l(" （简称为 VSC ）这是一个对 ")),t[5]||(t[5]=e("strong",null,"TS/JS",-1)),t[6]||(t[6]=l(" 具有良好支持的代码编辑器。"))]),t[40]||(t[40]=i('<h2 id="probejs" tabindex="-1"><a class="header-anchor" href="#probejs"><span>ProbeJS</span></a></h2><p>  ProbeJS 对于 KubeJS 是一个重要的附属模组，它通过扫描游戏中加载过的类来生成 TypeScript 文件。这些文件可以帮助我们快速查找方法和字段，并为方法、函数和事件处理程序提供文档。</p><p>  要使用 ProbeJS，首先需要在安装了 ProbeJS 和 KubeJS 的情况下启动游戏，进入一个世界，然后运行命令 <code>/probejs dump</code>。过一段时间后 ProbeJS 将会生成该 modpack 的所有类型文件。</p><p>  接下来需要在 Visual Studio Code 中打开你的 modpack 的文件夹，并打开 kubejs 文件夹。然后为你的 VSC 安装 <a href="https://marketplace.visualstudio.com/items?itemName=Prunoideae.probejs" target="_blank" rel="noopener noreferrer">ProbeJS</a> 插件，然后开始愉快的 KubeJS 魔改之旅。</p><div class="hint-container note"><p class="hint-container-title">注</p><p>如果你发现在 VSC 中 ProbeJS 没有为你提供补全，起尝试按下键盘上的 <code>F1</code> 然后选择 <code>TypeScript:重启 TS 服务器</code> 选项来重启 TS 服务器。</p></div><h2 id="文件结构" tabindex="-1"><a class="header-anchor" href="#文件结构"><span>文件结构</span></a></h2><p>  在首次打开装有 KubeJS 的游戏时，你会发现在游戏目录下会自动生成一个名为 kubejs 的文件夹，在其下有这么几个文件夹：</p>',7)),e("div",b,[e("ul",null,[a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",g,[a(o,{name:"vscode-icons:default-folder"}),t[7]||(t[7]=e("span",{class:"name"},"kubejs",-1))]),e("ul",null,[a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",h,[a(o,{name:"vscode-icons:folder-type-asset"}),t[8]||(t[8]=e("span",{class:"name"},"assets",-1))]),e("ul",null,[a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",y,[a(o,{name:"vscode-icons:default-folder"}),t[9]||(t[9]=e("span",{class:"name"},"<namespace>",-1)),t[10]||(t[10]=e("span",{class:"comment"},"# <namespace>及其以下文件夹不会自动生成",-1))]),e("ul",null,[a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",x,[a(o,{name:"vscode-icons:default-folder"}),t[11]||(t[11]=e("span",{class:"name"},"textures",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",q,[a(o,{name:"vscode-icons:file-type-image"}),t[12]||(t[12]=e("span",{class:"name"},"xxx.png",-1))])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",v,[a(o,{name:"vscode-icons:folder-type-locale"}),t[13]||(t[13]=e("span",{class:"name"},"lang",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",S,[a(o,{name:"vscode-icons:file-type-json"}),t[14]||(t[14]=e("span",{class:"name"},"zh_cn.json",-1))])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",H,[a(o,{name:"vscode-icons:default-folder"}),t[15]||(t[15]=e("span",{class:"name"},"sounds",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",Q,[a(o,{name:"vscode-icons:file-type-audio"}),t[16]||(t[16]=e("span",{class:"name"},"xxx.ogg",-1))])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",_,[a(o,{name:"vscode-icons:folder-type-model"}),t[17]||(t[17]=e("span",{class:"name"},"models",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",j,[a(o,{name:"vscode-icons:file-type-json"}),t[18]||(t[18]=e("span",{class:"name"},"xxx.json",-1))])]),_:1})])]),_:1}),a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",k,[a(o,{name:"vscode-icons:default-file"}),t[19]||(t[19]=e("span",{class:"name"},"……",-1))])]),_:1})])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",E,[a(o,{name:"vscode-icons:folder-type-db"}),t[20]||(t[20]=e("span",{class:"name"},"data",-1))]),e("ul",null,[a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",J,[a(o,{name:"vscode-icons:default-folder"}),t[21]||(t[21]=e("span",{class:"name"},"<namespace>",-1)),t[22]||(t[22]=e("span",{class:"comment"},"# <namespace>及其以下文件夹不会自动生成",-1))]),e("ul",null,[a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",B,[a(o,{name:"vscode-icons:default-folder"}),t[23]||(t[23]=e("span",{class:"name"},"tags",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",P,[a(o,{name:"vscode-icons:file-type-json"}),t[24]||(t[24]=e("span",{class:"name"},"xxx.json",-1))])]),_:1})])]),_:1}),a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",T,[a(o,{name:"vscode-icons:default-file"}),t[25]||(t[25]=e("span",{class:"name"},"……",-1))])]),_:1})])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",C,[a(o,{name:"vscode-icons:folder-type-config"}),t[26]||(t[26]=e("span",{class:"name"},"config",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",U,[a(o,{name:"vscode-icons:file-type-json"}),t[27]||(t[27]=e("span",{class:"name"},"xxx.json",-1))])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",V,[a(o,{name:"vscode-icons:default-folder"}),t[28]||(t[28]=e("span",{class:"name"},"client_scripts",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",w,[a(o,{name:"vscode-icons:file-type-js"}),t[29]||(t[29]=e("span",{class:"name"},"xxx.js",-1))])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",K,[a(o,{name:"vscode-icons:default-folder"}),t[30]||(t[30]=e("span",{class:"name"},"server_scripts",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",N,[a(o,{name:"vscode-icons:file-type-js"}),t[31]||(t[31]=e("span",{class:"name"},"xxx.js",-1))])]),_:1})])]),_:1}),a(n,{type:"folder",expanded:!0,empty:!1},{default:s(()=>[e("span",A,[a(o,{name:"vscode-icons:default-folder"}),t[32]||(t[32]=e("span",{class:"name"},"startup_scripts",-1))]),e("ul",null,[a(n,{type:"file",expanded:!1,empty:!0},{default:s(()=>[e("span",z,[a(o,{name:"vscode-icons:file-type-js"}),t[33]||(t[33]=e("span",{class:"name"},"xxx.js",-1))])]),_:1})])]),_:1})])]),_:1})])]),e("div",D,[t[37]||(t[37]=i('<p class="hint-container-title">注</p><p><code>/assets/&lt;namespace&gt;/</code> 路径用于存放各种游戏资源文件，例如纹理、本地化文件、音频、模型等等，其中 <code>&lt;namespace&gt;</code> 为命名空间。详细请查看 <a href="https://zh.minecraft.wiki/w/%E8%B5%84%E6%BA%90%E5%8C%85#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84" target="_blank" rel="noopener noreferrer">我的世界Wiki</a>。</p><p><code>/data/&lt;namespace&gt;/</code> 路径用于存放各种游戏数据文件，例如标签、战利品表等等，其中 <code>&lt;namespace&gt;</code> 为命名空间。详细请查看 <a href="https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E5%8C%85#%E6%96%87%E4%BB%B6%E5%A4%B9%E7%BB%93%E6%9E%84" target="_blank" rel="noopener noreferrer">我的世界Wiki</a>。</p>',3)),e("p",null,[t[35]||(t[35]=l("对于命名空间请看")),a(r,{to:"/notes/minecraft/misc/Resource_location.html#namespace-%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4"},{default:s(()=>t[34]||(t[34]=[l("这里")])),_:1}),t[36]||(t[36]=l("。"))])])])}const I=p(c,[["render",M],["__file","index.html.vue"]]),F=JSON.parse('{"path":"/notes/minecraft/kubejs/","title":"前言","lang":"zh-CN","frontmatter":{"title":"前言","createTime":"2024/09/26 00:10:10","permalink":"/notes/minecraft/kubejs/","description":"重要 本笔记基于 Minecraft 1.21.1 KubeJS 2101.7.0 ProbeJS 7.4.0 代码编译器 在进行我的世界的魔改之前我们得需要一个代码编辑器来帮助我们写代码，当然你也可以使用Windows自带的记事本，但是记事本没有代码提示能力，所以我推荐使用 Visual Studio Code （简称为 VSC ）这是一个对 TS/...","head":[["meta",{"property":"og:url","content":"https://qihuang02.cn/notes/minecraft/kubejs/"}],["meta",{"property":"og:site_name","content":"QiHuang02的笔记本"}],["meta",{"property":"og:title","content":"前言"}],["meta",{"property":"og:description","content":"重要 本笔记基于 Minecraft 1.21.1 KubeJS 2101.7.0 ProbeJS 7.4.0 代码编译器 在进行我的世界的魔改之前我们得需要一个代码编辑器来帮助我们写代码，当然你也可以使用Windows自带的记事本，但是记事本没有代码提示能力，所以我推荐使用 Visual Studio Code （简称为 VSC ）这是一个对 TS/..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-15T08:48:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-15T08:48:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前言\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-15T08:48:32.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":2.01,"words":604},"git":{"updatedTime":1731660512000,"contributors":[{"name":"QiHuang02","username":"QiHuang02","email":"2830447227@qq.com","commits":15,"avatar":"https://avatars.githubusercontent.com/QiHuang02?v=4","url":"https://github.com/QiHuang02"}],"changelog":[{"hash":"910144bc06e77d831ea317bb68ff8a29a66c7f8e","date":1727234358000,"email":"2830447227@qq.com","author":"QiHuang02","message":"1.基于template修改一些配置。2.添加第一个笔记 KubeJS","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/910144bc06e77d831ea317bb68ff8a29a66c7f8e"},{"hash":"41e8a425bdc29ca8d7ced3058b5b61eb4a9c33d0","date":1727280045000,"email":"2830447227@qq.com","author":"QiHuang02","message":"添加基本事件列表","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/41e8a425bdc29ca8d7ced3058b5b61eb4a9c33d0"},{"hash":"7367e46d7814750970c53ce832be99cf78917bf3","date":1727281011000,"email":"2830447227@qq.com","author":"QiHuang02","message":"修复上传之后大小写不敏感问题","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/7367e46d7814750970c53ce832be99cf78917bf3"},{"hash":"6f8062aa7fa03fee27b12f78353919e705967af8","date":1727355366000,"email":"2830447227@qq.com","author":"QiHuang02","message":"1.将notes的配置抽离出来;2.不在使用自动的siderbar，而是自己配置目录.","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/6f8062aa7fa03fee27b12f78353919e705967af8"},{"hash":"c9ca5439bc0454f1d9b32dff25b27a40ebf97e9a","date":1727364338000,"email":"2830447227@qq.com","author":"QiHuang02","message":"将 前言.md -&gt; README.md","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/c9ca5439bc0454f1d9b32dff25b27a40ebf97e9a"},{"hash":"a6595fa68647e742ef8a2a22c5e91e81f7ea16a7","date":1727404930000,"email":"2830447227@qq.com","author":"QiHuang02","message":"1.启用markdown power插件的plot功能；2.修改‘KubeJS &amp; 前言’笔记的描述","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/a6595fa68647e742ef8a2a22c5e91e81f7ea16a7"},{"hash":"4348b30676bf8b1e5fca25bcc7bec389ba5b09a5","date":1727405931000,"email":"2830447227@qq.com","author":"QiHuang02","message":"将‘KubeJS &amp; 前言 #文件结构’改为文件树格式","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/4348b30676bf8b1e5fca25bcc7bec389ba5b09a5"},{"hash":"11b0c0eaa7eca16fc6b28f2947310bd37dabe89e","date":1727414149000,"email":"2830447227@qq.com","author":"QiHuang02","message":"修改描述","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/11b0c0eaa7eca16fc6b28f2947310bd37dabe89e"},{"hash":"6996239d73a803187cc6063485304613c836de26","date":1727500516000,"email":"2830447227@qq.com","author":"QiHuang02","message":"修复 sidebar","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/6996239d73a803187cc6063485304613c836de26"},{"hash":"41aa69ad35cdcbf4c6d89179e210edff840408c9","date":1727528693000,"email":"2830447227@qq.com","author":"QiHuang02","message":"添加本地图标","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/41aa69ad35cdcbf4c6d89179e210edff840408c9"},{"hash":"68536650001df849138d332165d484385bb39c2d","date":1727622185000,"email":"2830447227@qq.com","author":"QiHuang02","message":"修复premalink导致的404","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/68536650001df849138d332165d484385bb39c2d"},{"hash":"0e593d3f55435b810b2c2646525571fcf003bfce","date":1727968087000,"email":"2830447227@qq.com","author":"QiHuang02","message":"修改一些描述","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/0e593d3f55435b810b2c2646525571fcf003bfce"},{"hash":"8f04802a85a2c4014601aae3cee5e79e9e2817cb","date":1731260486000,"email":"2830447227@qq.com","author":"QiHuang02","message":"修改笔记源文件的目录结构：1、将原<code v-pre>/kubejs/</code>文件夹中内容移动至<code v-pre>/minecraft/kubejs/</code>文件夹下；2、将原<code v-pre>/kubejs/misc/</code>文件夹中内容移动至<code v-pre>/minecraft/misc/</code>文件夹下","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/8f04802a85a2c4014601aae3cee5e79e9e2817cb"},{"hash":"26f0c9f491050f96e47e123f05e1852c91ef5dbf","date":1731583641000,"email":"2830447227@qq.com","author":"QiHuang02","message":"修复站内跳转链接","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/26f0c9f491050f96e47e123f05e1852c91ef5dbf"},{"hash":"157f3e0661abfb3e08d2557dce6abf1ef3928960","date":1731660512000,"email":"2830447227@qq.com","author":"QiHuang02","message":"1、修改一些描述 2、更正站内跳转链接","commitUrl":"https://github.com/QiHuang02/qihuang02.github.io/commit/157f3e0661abfb3e08d2557dce6abf1ef3928960"}]},"autoDesc":true,"filePathRelative":"notes/minecraft/kubejs/前言.md","bulletin":false}');export{I as comp,F as data};