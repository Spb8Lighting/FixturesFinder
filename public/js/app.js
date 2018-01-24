const electron=require("electron"),config=require("../../config"),remote=electron.remote,ipcRenderer=electron.ipcRenderer,Icon={max:'<svg viewBox="0 0 20 20">\n    <path d="M 1 1 V19 H19 V1 H1 z M19 19 H1 V4 H19 V19 z" />\n</svg>',min:'<svg viewBox="0 0 20 20">\n    <path d="M7 1 V11 H19 V1 H7 z  M19 11 H7 V3 H19 V11 z"/>\n    <path d="M12 12 L12 19 L1 19 L1 9 L6 9 L6 9 L1 9 L1 19 L12 19 L12 19z" />\n    <rect x="1" y="9" width="4.5" height="2" />\n</svg>'},$btn={min:document.getElementById("min-btn"),max:document.getElementById("max-btn"),close:document.getElementById("close-btn")},$aLink=document.querySelectorAll("aside a"),$h1=document.querySelector("h1>span"),$MainContent=document.getElementById("maincontent");let AddSelectListener=(Selector,callback=!1)=>{Selector.addEventListener("change",()=>{Selector.setAttribute("data-option",Selector.querySelector("option:checked").getAttribute("value")),Selector.blur(),"function"==typeof callback&&callback()})};$btn.min.addEventListener("click",e=>{e.preventDefault(),remote.getCurrentWindow().minimize()}),$btn.max.addEventListener("click",e=>{e.preventDefault();let window=remote.getCurrentWindow();window.isMaximized()?(window.unmaximize(),$btn.max.innerHTML=Icon.max):(window.maximize(),$btn.max.innerHTML=Icon.min)}),$btn.close.addEventListener("click",e=>{e.preventDefault();let window=remote.getCurrentWindow();Table.Close(),window.close()}),$aLink.forEach(elem=>{elem.addEventListener("click",e=>{e.preventDefault();let PageName=elem.getAttribute("href");$aLink.forEach(elem=>{elem.getAttribute("href")==PageName?elem.classList.add("active"):elem.classList.remove("active")}),document.querySelectorAll("#maincontent>div").forEach(elem=>{elem.getAttribute("id")==PageName?elem.classList.remove("hide"):elem.classList.add("hide")}),$h1.innerHTML=`Fixtures Finder/${PageName} - v${config.Version}`,document.activeElement&&document.activeElement.blur()})});const sqlite3=require("sqlite3").verbose(),db=new sqlite3.Database("./public/db/db.sqlite3",err=>{if(err)return console.error(err.message)});let DBSearch,DBOption,DBAdmin,Table={Options:{Initialize:(callback=!1)=>(db.serialize(()=>{Table.Options.Create();let sql=`SELECT COUNT(*) AS \`count\` FROM \`${config.Database.Options}\``;db.get(sql,(err,row)=>{if(err)return console.error(err.message);row.count>1?(Table.Options.Delete(),Table.Options.Create(),Table.Options.Fill()):0==row.count&&Table.Options.Fill()}),Table.Options.Get(callback)}),this),Create:()=>{let sql=`CREATE TABLE IF NOT EXISTS \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\` TEXT, \`${config.Form.Option.DisplayMode}\` TEXT, \`${config.Form.Option.ParameterList}\` TEXT )`;return db.run(sql),this},Delete:()=>{let sql=`DROP TABLE \`${config.Database.Options}\``;return db.run(sql),this},Reset:()=>{Table.Options.Update.All({SearchMode:config.Form.Option.SearchMode_OrderExact,DisplayMode:config.Form.Option.DisplayMode_Full,ParameterList:config.Form.Option.ParameterList_Common})},Fill:()=>{let sql=`INSERT INTO \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\`) VALUES ($SearchMode, $DisplayMode, $ParameterList)`,param={$SearchMode:config.Form.Option.SearchMode_OrderExact,$DisplayMode:config.Form.Option.DisplayMode_Full,$ParameterList:config.Form.Option.ParameterList_Common};return db.run(sql,param),this},Get:(callback=!1)=>{let sql=`SELECT \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\` FROM \`${config.Database.Options}\``;return db.get(sql,(err,data)=>{if(err)return console.error(err.message);DBOption=data,DMXChannelMax.CheckDisplay(),SelectOptions.CheckOptions(),RunOption.Reselect(),"function"==typeof callback&&callback()}),this},Update:{Run:(sql,param)=>(db.run(sql,param,err=>{if(err)return console.error(err.message);console.info(sql,param,DBOption),Table.Options.Get(),console.info(DBOption)}),this),All:data=>{let sql=`UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode, \`${config.Form.Option.DisplayMode}\` = $DisplayMode, \`${config.Form.Option.ParameterList}\` = $ParameterList`,param={$SearchMode:data.SearchMode,$DisplayMode:data.DisplayMode,$ParameterList:data.ParameterList};return Table.Options.Update.Run(sql,param),this},SearchMode:data=>{let sql=`UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode`,param={$SearchMode:data.SearchMode};return Table.Options.Update.Run(sql,param),this},DisplayMode:data=>{let sql=`UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.DisplayMode}\` = $DisplayMode`,param={$DisplayMode:data.DisplayMode};return Table.Options.Update.Run(sql,param),this},ParameterList:data=>{let sql=`UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.ParameterList}\` = $ParameterList`,param={$ParameterList:data.ParameterList};return Table.Options.Update.Run(sql,param),this}}},Close:()=>(db.close(err=>{if(err)return console.error(err.message)}),this)},SelectOptions={Options:"",CheckOptions:()=>{switch(DBOption[config.Form.Option.ParameterList]){case config.Form.Option.ParameterList_Common:SelectOptions.SetRestricted();break;case config.Form.Option.ParameterList_Full:SelectOptions.SetFull();break;default:SelectOptions.SetRestricted()}return this},SetRestricted:()=>(SelectOptions.Options=[{id:"any",text:"Any"},{id:"intensity",text:"Intensity"},{id:"intensity fine",text:"Intensity Fine"},{id:"strobe",text:"Strobe"},{id:"shutter",text:"Shutter"},{id:"pan",text:"Pan"},{id:"pan fine",text:"Pan Fine"},{id:"pan rot",text:"Pan Rot"},{id:"tilt",text:"Tilt"},{id:"tilt fine",text:"Tilt Fine"},{id:"tilt rot",text:"Tilt Rot"},{id:"pt speed",text:"PT Speed"},{id:"color",text:"Color"},{id:"color macro",text:"Color Macro"},{id:"red",text:"Red"},{id:"red fine",text:"Red Fine"},{id:"green",text:"Green"},{id:"green fine",text:"Green Fine"},{id:"blue",text:"Blue"},{id:"blue fine",text:"Blue Fine"},{id:"white",text:"White"},{id:"white fine",text:"White Fine"},{id:"amber",text:"Amber"},{id:"amber fine",text:"Amber Fine"},{id:"uv",text:"UV"},{id:"uv fine",text:"UV Fine"},{id:"cyan",text:"Cyan"},{id:"cyan fine",text:"Cyan Fine"},{id:"magenta",text:"Magenta"},{id:"magenta fine",text:"Magenta Fine"},{id:"yellow",text:"Yellow"},{id:"yellow fine",text:"Yellow Fine"},{id:"ctc",text:"CTC"},{id:"ctc fine",text:"CTC Fine"},{id:"cto",text:"CTO"},{id:"cto fine",text:"CTO Fine"},{id:"gobo",text:"Gobo"},{id:"gobo rot",text:"Gobo Rot"},{id:"prism",text:"Prism"},{id:"prism rot",text:"Prism Rot"},{id:"zoom",text:"Zoom"},{id:"focus",text:"Focus"},{id:"frost",text:"Frost"},{id:"iris",text:"Iris"},{id:"macro",text:"Macro"},{id:"chase",text:"Chase"},{id:"fx",text:"FX"},{id:"ctrl",text:"Ctrl"}],this),SetFull:()=>(SelectOptions.Options=[{id:"any",text:"Any"},{id:"access",text:"Access"},{id:"address",text:"Address"},{id:"adjust dn",text:"Adjust Dn"},{id:"adjust up",text:"Adjust Up"},{id:"adv blue high",text:"Adv Blue High"},{id:"adv blue low",text:"Adv Blue Low"},{id:"adv blue mid",text:"Adv Blue Mid"},{id:"adv green high",text:"Adv Green High"},{id:"adv green low",text:"Adv Green Low"},{id:"adv green mid",text:"Adv Green Mid"},{id:"adv red high",text:"Adv Red High"},{id:"adv red low",text:"Adv Red Low"},{id:"adv red mid",text:"Adv Red Mid"},{id:"advance col",text:"Advance Col"},{id:"age",text:"Age"},{id:"align ctrl",text:"Align Ctrl"},{id:"alpha",text:"Alpha"},{id:"amber",text:"Amber"},{id:"amber fine",text:"Amber Fine"},{id:"amberc",text:"AmberC"},{id:"ambience",text:"Ambience"},{id:"ambient",text:"Ambient"},{id:"anchor x",text:"Anchor X"},{id:"anchor y",text:"Anchor Y"},{id:"anchor z",text:"Anchor Z"},{id:"angle",text:"Angle"},{id:"anim",text:"Anim"},{id:"anim 1",text:"Anim 1"},{id:"anim 1 fnc",text:"Anim 1 Fnc"},{id:"anim 1 rot",text:"Anim 1 Rot"},{id:"anim 1 rot fine",text:"Anim 1 Rot Fine"},{id:"anim 2",text:"Anim 2"},{id:"anim 2 fnc",text:"Anim 2 Fnc"},{id:"anim 2 rot",text:"Anim 2 Rot"},{id:"anim 2 rot fine",text:"Anim 2 Rot Fine"},{id:"anim ctrl 1",text:"Anim Ctrl 1"},{id:"anim ctrl 2",text:"Anim Ctrl 2"},{id:"anim fine",text:"Anim Fine"},{id:"anim fnc",text:"Anim Fnc"},{id:"anim ind",text:"Anim Ind"},{id:"anim index",text:"Anim Index"},{id:"anim macro",text:"Anim Macro"},{id:"anim mode",text:"Anim Mode"},{id:"anim phase",text:"Anim Phase"},{id:"anim rot",text:"Anim Rot"},{id:"anim rot 1",text:"Anim Rot 1"},{id:"anim rot 2",text:"Anim Rot 2"},{id:"anim rot fine",text:"Anim Rot Fine"},{id:"anim speed",text:"Anim Speed"},{id:"animated star",text:"Animated Star"},{id:"animation",text:"Animation"},{id:"anti aliasing",text:"Anti Aliasing"},{id:"artnet in",text:"ArtNet In"},{id:"aspect",text:"Aspect"},{id:"aspect fine",text:"Aspect Fine"},{id:"aspect mode",text:"Aspect Mode"},{id:"aspect ratio",text:"Aspect Ratio"},{id:"aspect ratio fine",text:"Aspect Ratio Fine"},{id:"atmosphere",text:"Atmosphere"},{id:"audio",text:"Audio"},{id:"audio file",text:"Audio File"},{id:"audio fine",text:"Audio Fine"},{id:"audio fnc",text:"Audio Fnc"},{id:"audio gain",text:"Audio Gain"},{id:"audio in",text:"Audio In"},{id:"audio l",text:"Audio L"},{id:"audio library",text:"Audio Library"},{id:"audio out",text:"Audio Out"},{id:"audio pan",text:"Audio Pan"},{id:"audio pan fine",text:"Audio Pan Fine"},{id:"audio r",text:"Audio R"},{id:"audio sync",text:"Audio Sync"},{id:"audio volume",text:"Audio Volume"},{id:"audio wav",text:"Audio Wav"},{id:"auto",text:"Auto"},{id:"auto fade",text:"Auto Fade"},{id:"auto focus",text:"Auto Focus"},{id:"auto focus adj",text:"Auto Focus Adj"}],this)},$SearchSel={Form:document.getElementById(config.Form.Search.Form),DMXChannelCount:document.getElementById(config.Form.Search.DMXChannelCount),DMXChannelCount_Btn_Add:document.getElementById(config.Form.Search.DMXChannelCount_Btn_Add),DMXChannelCount_Btn_Rem:document.getElementById(config.Form.Search.DMXChannelCount_Btn_Rem),FieldSet:document.getElementById(config.Form.Search.DMXChannelCount).closest("fieldset"),DMXChannelCount_Max:document.getElementById(config.Form.Search.DMXChannelCount_Max).closest("div"),DMXChannelCount_Max_Label:document.querySelector('label[for="'+config.Form.Search.DMXChannelCount_Max+'"]'),Manufacturer:document.getElementById(config.Form.Search.Manufacturer),FixtureName:document.getElementById(config.Form.Search.FixtureName),Button:{Reset:document.getElementById(config.Form.Search.Form+config.Form.Button.Reset),QuickSearch:document.getElementById(config.Form.Search.Form+config.Form.Button.Submit)}},DMXChannelSearch={DMXChannelCount:0,Reset:()=>{let event=new Event("change"),select=document.getElementById(`${config.Form.Search.BaseName_Channel}1`);select.value=config.Default.Any.toLowerCase(),$SearchSel.DMXChannelCount.value="001",select.dispatchEvent(event),$SearchSel.DMXChannelCount.dispatchEvent(event),$SearchSel.Button.Reset.blur()},Format:val=>("000"+val).substr(-3),Set:val=>((val=parseInt(val))>=1&&val<=512?(this.DMXChannelCount=val,$SearchSel.DMXChannelCount.value=DMXChannelSearch.Format(val)):$SearchSel.DMXChannelCount.value=DMXChannelSearch.Format(this.DMXChannelCount),this),AdjustChannelSearch:(event=!1)=>{event&&(event.preventDefault(),$SearchSel.DMXChannelCount.blur());let Result=parseInt($SearchSel.DMXChannelCount.value)-this.DMXChannelCount;if($SearchSel.DMXChannelCount.value=this.DMXChannelCount,0!=Result&&Result>0)for(let i=0;i<Result;i++)DMXChannelSearch.AddChannelSearch(event);else{if(!(0!=Result&&Result<0))return DMXChannelSearch.Set(this.DMXChannelCount);for(let i=Result;i<0;i++)DMXChannelSearch.RemChannelSearch(event)}},AddChannelSearch:(event=!1)=>{event&&(event.preventDefault(),$SearchSel.DMXChannelCount_Btn_Add.blur());let ChannelNumber=parseInt($SearchSel.DMXChannelCount.value)+1;if(!(ChannelNumber>=1&&ChannelNumber<=512))return this;ipcRenderer.send("ChannelTemplate",{Channel:ChannelNumber,ChannelType:""}),DMXChannelSearch.Set(ChannelNumber)},RemChannelSearch:(event=!1)=>{event&&(event.preventDefault(),$SearchSel.DMXChannelCount_Btn_Rem.blur());let str=parseInt($SearchSel.DMXChannelCount.value)-1;if(!(str>=1&&str<=512))return this;{let ChildToRemove=document.getElementById(config.Form.Search.BaseName_Channel+parseInt($SearchSel.DMXChannelCount.value));if(ChildToRemove)ChildToRemove.closest("div.channelfield.flex-container").remove();DMXChannelSearch.Set(str)}}},DMXChannelMax={CheckDisplay:()=>{switch(DBOption[config.Form.Option.SearchMode]){case config.Form.Option.SearchMode_OrderExact:case config.Form.Option.SearchMode_UnOrderExact:DMXChannelMax.Hide();break;default:DMXChannelMax.Show()}},Show:()=>($SearchSel.DMXChannelCount_Max_Label.classList.remove("hide"),$SearchSel.DMXChannelCount_Max.classList.remove("hide"),this),Hide:()=>($SearchSel.DMXChannelCount_Max_Label.classList.add("hide"),$SearchSel.DMXChannelCount_Max.classList.add("hide"),this)};$SearchSel.Form.addEventListener("submit change",e=>{e.preventDefault()}),$SearchSel.Button.Reset.addEventListener("click",DMXChannelSearch.Reset),$SearchSel.DMXChannelCount.addEventListener("click",$SearchSel.DMXChannelCount.select),$SearchSel.DMXChannelCount.addEventListener("change",DMXChannelSearch.AdjustChannelSearch),$SearchSel.DMXChannelCount_Btn_Add.addEventListener("click",DMXChannelSearch.AddChannelSearch),$SearchSel.DMXChannelCount_Btn_Rem.addEventListener("click",DMXChannelSearch.RemChannelSearch),AddSelectListener($SearchSel.Manufacturer),AddSelectListener($SearchSel.FixtureName),ipcRenderer.on("ChannelTemplate",(e,data)=>{$SearchSel.FieldSet.insertAdjacentHTML("beforeend",data.template);let Select=document.getElementById(data.selector);for(let i=0,len=SelectOptions.Options.length;i<len;i++){let option=document.createElement("option");option.value=SelectOptions.Options[i].id,option.text=SelectOptions.Options[i].text,Select.add(option)}AddSelectListener(Select)});let $OptionsSel={ResetButton:document.getElementById(config.Form.Option.Form+config.Form.Button.Reset),Form:document.getElementById(config.Form.Option.Form),SearchMode:document.getElementById(config.Form.Option.SearchMode),DisplayMode:document.getElementById(config.Form.Option.DisplayMode),ParameterList:document.getElementById(config.Form.Option.ParameterList)},RunOption={Reset:event=>(event.preventDefault(),Table.Options.Reset(),$OptionsSel.ResetButton.blur(),this),Update:{All:event=>{event.preventDefault();let data={SearchMode:$OptionsSel.SearchMode.value,DisplayMode:$OptionsSel.DisplayMode.value,ParameterList:$OptionsSel.ParameterList.value};return Table.Options.Update.All(data),this},SearchMode:()=>(Table.Options.Update.SearchMode({SearchMode:$OptionsSel.SearchMode.value}),this),DisplayMode:()=>(Table.Options.Update.DisplayMode({DisplayMode:$OptionsSel.DisplayMode.value}),this),ParameterList:()=>(Table.Options.Update.ParameterList({ParameterList:$OptionsSel.ParameterList.value}),this)},Reselect:()=>($OptionsSel.SearchMode.querySelector('option[value="'+DBOption.SearchMode+'"]').selected=!0,$OptionsSel.SearchMode.setAttribute("data-option",DBOption.SearchMode),$OptionsSel.DisplayMode.querySelector('option[value="'+DBOption.DisplayMode+'"]').selected=!0,$OptionsSel.DisplayMode.setAttribute("data-option",DBOption.DisplayMode),$OptionsSel.ParameterList.querySelector('option[value="'+DBOption.ParameterList+'"]').selected=!0,$OptionsSel.ParameterList.setAttribute("data-option",DBOption.ParameterList),this)};$OptionsSel.Form.addEventListener("submit change",RunOption.Update.All),$OptionsSel.ResetButton.addEventListener("click",RunOption.Reset),AddSelectListener($OptionsSel.SearchMode,RunOption.Update.SearchMode),AddSelectListener($OptionsSel.DisplayMode,RunOption.Update.DisplayMode),AddSelectListener($OptionsSel.ParameterList,RunOption.Update.ParameterList),Table.Options.Initialize(DMXChannelSearch.AddChannelSearch);