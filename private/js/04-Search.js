const	$Elem = {
    DMXChannelCount : document.getElementById(config.SearchForm.DMXChannelCount),
    DMXChannelCount_Btn_Add : document.getElementById(config.SearchForm.DMXChannelCount_Btn_Add),
    DMXChannelCount_Btn_Rem : document.getElementById(config.SearchForm.DMXChannelCount_Btn_Rem)
}
,   FieldSetChannelContent = $Elem.DMXChannelCount.closest('fieldset')
,   SelectContent = {
        Default : [{id:'any',text:'Any'},{id:'intensity',text:'Intensity'},{id:'intensity fine',text:'Intensity Fine'},{id:'strobe',text:'Strobe'},{id:'shutter',text:'Shutter'},{id:'pan',text:'Pan'},{id:'pan fine',text:'Pan Fine'},{id:'pan rot',text:'Pan Rot'},{id:'tilt',text:'Tilt'},{id:'tilt fine',text:'Tilt Fine'},{id:'tilt rot',text:'Tilt Rot'},{id:'pt speed',text:'PT Speed'},{id:'color',text:'Color'},{id:'color macro',text:'Color Macro'},{id:'red',text:'Red'},{id:'red fine',text:'Red Fine'},{id:'green',text:'Green'},{id:'green fine',text:'Green Fine'},{id:'blue',text:'Blue'},{id:'blue fine',text:'Blue Fine'},{id:'white',text:'White'},{id:'white fine',text:'White Fine'},{id:'amber',text:'Amber'},{id:'amber fine',text:'Amber Fine'},{id:'uv',text:'UV'},{id:'uv fine',text:'UV Fine'},{id:'cyan',text:'Cyan'},{id:'cyan fine',text:'Cyan Fine'},{id:'magenta',text:'Magenta'},{id:'magenta fine',text:'Magenta Fine'},{id:'yellow',text:'Yellow'},{id:'yellow fine',text:'Yellow Fine'},{id:'ctc',text:'CTC'},{id:'ctc fine',text:'CTC Fine'},{id:'cto',text:'CTO'},{id:'cto fine',text:'CTO Fine'},{id:'gobo',text:'Gobo'},{id:'gobo rot',text:'Gobo Rot'},{id:'prism',text:'Prism'},{id:'prism rot',text:'Prism Rot'},{id:'zoom',text:'Zoom'},{id:'focus',text:'Focus'},{id:'frost',text:'Frost'},{id:'iris',text:'Iris'},{id:'macro',text:'Macro'},{id:'chase',text:'Chase'},{id:'fx',text:'FX'},{id:'ctrl',text:'Ctrl'}],
        Actual : '',
        Full = [{id:'any',text:'Any'},{id:'access',text:'Access'},{id:'address',text:'Address'},{id:'adjust dn',text:'Adjust Dn'},{id:'adjust up',text:'Adjust Up'},{id:'adv blue high',text:'Adv Blue High'},{id:'adv blue low',text:'Adv Blue Low'},{id:'adv blue mid',text:'Adv Blue Mid'},{id:'adv green high',text:'Adv Green High'},{id:'adv green low',text:'Adv Green Low'},{id:'adv green mid',text:'Adv Green Mid'},{id:'adv red high',text:'Adv Red High'},{id:'adv red low',text:'Adv Red Low'},{id:'adv red mid',text:'Adv Red Mid'},{id:'advance col',text:'Advance Col'},{id:'age',text:'Age'},{id:'align ctrl',text:'Align Ctrl'},{id:'alpha',text:'Alpha'},{id:'amber',text:'Amber'},{id:'amber fine',text:'Amber Fine'},{id:'amberc',text:'AmberC'},{id:'ambience',text:'Ambience'},{id:'ambient',text:'Ambient'},{id:'anchor x',text:'Anchor X'},{id:'anchor y',text:'Anchor Y'},{id:'anchor z',text:'Anchor Z'},{id:'angle',text:'Angle'},{id:'anim',text:'Anim'},{id:'anim 1',text:'Anim 1'},{id:'anim 1 fnc',text:'Anim 1 Fnc'},{id:'anim 1 rot',text:'Anim 1 Rot'},{id:'anim 1 rot fine',text:'Anim 1 Rot Fine'},{id:'anim 2',text:'Anim 2'},{id:'anim 2 fnc',text:'Anim 2 Fnc'},{id:'anim 2 rot',text:'Anim 2 Rot'},{id:'anim 2 rot fine',text:'Anim 2 Rot Fine'},{id:'anim ctrl 1',text:'Anim Ctrl 1'},{id:'anim ctrl 2',text:'Anim Ctrl 2'},{id:'anim fine',text:'Anim Fine'},{id:'anim fnc',text:'Anim Fnc'},{id:'anim ind',text:'Anim Ind'},{id:'anim index',text:'Anim Index'},{id:'anim macro',text:'Anim Macro'},{id:'anim mode',text:'Anim Mode'},{id:'anim phase',text:'Anim Phase'},{id:'anim rot',text:'Anim Rot'},{id:'anim rot 1',text:'Anim Rot 1'},{id:'anim rot 2',text:'Anim Rot 2'},{id:'anim rot fine',text:'Anim Rot Fine'},{id:'anim speed',text:'Anim Speed'},{id:'animated star',text:'Animated Star'},{id:'animation',text:'Animation'},{id:'anti aliasing',text:'Anti Aliasing'},{id:'artnet in',text:'ArtNet In'},{id:'aspect',text:'Aspect'},{id:'aspect fine',text:'Aspect Fine'},{id:'aspect mode',text:'Aspect Mode'},{id:'aspect ratio',text:'Aspect Ratio'},{id:'aspect ratio fine',text:'Aspect Ratio Fine'},{id:'atmosphere',text:'Atmosphere'},{id:'audio',text:'Audio'},{id:'audio file',text:'Audio File'},{id:'audio fine',text:'Audio Fine'},{id:'audio fnc',text:'Audio Fnc'},{id:'audio gain',text:'Audio Gain'},{id:'audio in',text:'Audio In'},{id:'audio l',text:'Audio L'},{id:'audio library',text:'Audio Library'},{id:'audio out',text:'Audio Out'},{id:'audio pan',text:'Audio Pan'},{id:'audio pan fine',text:'Audio Pan Fine'},{id:'audio r',text:'Audio R'},{id:'audio sync',text:'Audio Sync'},{id:'audio volume',text:'Audio Volume'},{id:'audio wav',text:'Audio Wav'},{id:'auto',text:'Auto'},{id:'auto fade',text:'Auto Fade'},{id:'auto focus',text:'Auto Focus'},{id:'auto focus adj',text:'Auto Focus Adj'},{id:'auto focus adjust',text:'Auto Focus Adjust'},{id:'auto focus fine',text:'Auto Focus Fine'},{id:'auto pilot',text:'Auto Pilot'},{id:'auto speed',text:'Auto Speed'},{id:'autofocus',text:'AutoFocus'},{id:'autofocus adj',text:'AutoFocus Adj'},{id:'aux',text:'Aux'},{id:'aux 1',text:'Aux 1'},{id:'aux 2',text:'Aux 2'},{id:'aux 3',text:'Aux 3'},{id:'aux1',text:'Aux1'},{id:'aux2',text:'Aux2'},{id:'av fader',text:'AV Fader'},{id:'b str dur',text:'B Str Dur'},{id:'b strobe',text:'B Strobe'},{id:'back',text:'Back'},{id:'balance',text:'Balance'},{id:'ballast',text:'Ballast'},{id:'bank',text:'Bank'},{id:'barn 1',text:'Barn 1'},{id:'barn 1 fine',text:'Barn 1 Fine'},{id:'barn 2',text:'Barn 2'},{id:'barn 2 fine',text:'Barn 2 Fine'},{id:'barn 3',text:'Barn 3'},{id:'barn 3 fine',text:'Barn 3 Fine'},{id:'barn 4',text:'Barn 4'},{id:'barn 4 fine',text:'Barn 4 Fine'},{id:'barn rot',text:'Barn Rot'},{id:'barn rot fine',text:'Barn Rot Fine'},{id:'beam',text:'Beam'},{id:'beam fnc',text:'Beam Fnc'},{id:'beam mode',text:'Beam Mode'},{id:'beam shaper',text:'Beam Shaper'},{id:'beam speed',text:'Beam Speed'},{id:'beam twister',text:'Beam Twister'},{id:'beam twister fine',text:'Beam Twister Fine'},{id:'beat',text:'Beat'},{id:'beatbridge',text:'BeatBridge'},{id:'begin frm',text:'Begin Frm'},{id:'begin frm fine',text:'Begin Frm Fine'},{id:'bg alpha',text:'BG Alpha'},{id:'bg blue',text:'BG Blue'},{id:'bg color',text:'BG Color'},{id:'bg color 1',text:'BG Color 1'},{id:'bg color 2',text:'BG Color 2'},{id:'bg dimmer',text:'BG Dimmer'},{id:'bg dimmer fine',text:'BG Dimmer Fine'},{id:'bg green',text:'BG Green'},{id:'bg red',text:'BG Red'},{id:'bg strobe',text:'BG Strobe'},{id:'bk color',text:'Bk Color'},{id:'bkg blue',text:'Bkg Blue'},{id:'bkg green',text:'Bkg Green'},{id:'bkg red',text:'Bkg Red'},{id:'black move',text:'Black Move'},{id:'blackout',text:'Blackout'},{id:'blank',text:'Blank'},{id:'blanking',text:'Blanking'},{id:'blend',text:'Blend'},{id:'blend mode',text:'Blend Mode'},{id:'blend preset',text:'Blend Preset'},{id:'blend preset group',text:'Blend Preset Group'},{id:'blend preset param',text:'Blend Preset Param'},{id:'block',text:'Block'},{id:'blue',text:'Blue'},{id:'blue 1',text:'Blue 1'},{id:'blue 2',text:'Blue 2'},{id:'blue fine',text:'Blue Fine'},{id:'blue laser',text:'Blue Laser'},{id:'blue shift',text:'Blue Shift'},{id:'blue tone',text:'Blue Tone'},{id:'bluec',text:'BlueC'},{id:'blur',text:'Blur'},{id:'blur aera',text:'Blur Aera'},{id:'blur radius',text:'Blur Radius'},{id:'bot limit',text:'Bot Limit'},{id:'bpm',text:'BPM'},{id:'brand 1',text:'Brand 1'},{id:'brand 2',text:'Brand 2'},{id:'brightness',text:'Brightness'},{id:'brightness 1',text:'Brightness 1'},{id:'brightness 2',text:'Brightness 2'},{id:'buffer',text:'Buffer'},{id:'bus',text:'Bus'},{id:'bypass',text:'Bypass'},{id:'c1',text:'C1'},{id:'c1 fine',text:'C1 Fine'},{id:'c2',text:'C2'},{id:'c2 fine',text:'C2 Fine'},{id:'c3',text:'C3'},{id:'c3 fine',text:'C3 Fine'},{id:'c4',text:'C4'},{id:'c4 fine',text:'C4 Fine'},{id:'cal',text:'Cal'},{id:'calibration',text:'Calibration'},{id:'cam effects',text:'Cam Effects'},{id:'cam focus',text:'Cam Focus'},{id:'cam focus fine',text:'Cam Focus Fine'},{id:'cam ir',text:'Cam IR'},{id:'cam orient',text:'Cam Orient'},{id:'cam shutter',text:'Cam Shutter'},{id:'cam wb',text:'Cam WB'},{id:'cam zoom',text:'Cam Zoom'},{id:'cam zoom fine',text:'Cam Zoom Fine'},{id:'camera ctb',text:'Camera CTB'},{id:'camera ctc',text:'Camera CTC'},{id:'camera cto',text:'Camera CTO'},{id:'camera effects',text:'Camera Effects'},{id:'camera focus',text:'Camera Focus'},{id:'camera focus fine',text:'Camera Focus Fine'},{id:'camera ir',text:'Camera IR'},{id:'camera orient',text:'Camera Orient'},{id:'camera shutter',text:'Camera Shutter'},{id:'camera wb',text:'Camera WB'},{id:'camera x',text:'Camera X'},{id:'camera x fine',text:'Camera X Fine'},{id:'camera y',text:'Camera Y'},{id:'camera y fine',text:'Camera Y Fine'},{id:'camera z',text:'Camera Z'},{id:'camera z fine',text:'Camera Z Fine'},{id:'camera zoom',text:'Camera Zoom'},{id:'camera zoom fine',text:'Camera Zoom Fine'},{id:'capture presets',text:'Capture Presets'},{id:'cat 1',text:'Cat 1'},{id:'cat 2',text:'Cat 2'},{id:'cct',text:'CCT'},{id:'character',text:'Character'},{id:'chase',text:'Chase'},{id:'chase 1',text:'Chase 1'},{id:'chase 1 col',text:'Chase 1 Col'},{id:'chase 1 fade',text:'Chase 1 Fade'},{id:'chase 1 lvl',text:'Chase 1 Lvl'},{id:'chase 1 spd',text:'Chase 1 Spd'},{id:'chase 2',text:'Chase 2'},{id:'chase 2 col',text:'Chase 2 Col'},{id:'chase 2 fade',text:'Chase 2 Fade'},{id:'chase 2 lvl',text:'Chase 2 Lvl'},{id:'chase 2 spd',text:'Chase 2 Spd'},{id:'chase fade',text:'Chase Fade'},{id:'chase fnc',text:'Chase Fnc'},{id:'chase intensity',text:'Chase Intensity'},{id:'chase prog',text:'Chase Prog'},{id:'chase range',text:'Chase Range'},{id:'chase spd',text:'Chase Spd'},{id:'chase speed',text:'Chase Speed'},{id:'chksm',text:'Chksm'},{id:'chroma',text:'Chroma'},{id:'clear',text:'Clear'},{id:'clge blend',text:'Clge Blend'},{id:'clge cell',text:'Clge Cell'},{id:'clge config',text:'Clge Config'},{id:'clip',text:'Clip'},{id:'clip page',text:'Clip Page'},{id:'clipping',text:'Clipping'},{id:'clump',text:'Clump'},{id:'cmy',text:'CMY'},{id:'cmy fnc',text:'CMY Fnc'},{id:'cmy macro',text:'CMY Macro'},{id:'cmy speed',text:'CMY Speed'},{id:'col mix',text:'Col Mix'},{id:'col preset',text:'Col Preset'},{id:'col preset int',text:'Col Preset Int'},{id:'cold',text:'Cold'},{id:'cold white',text:'Cold White'},{id:'collage',text:'Collage'},{id:'color',text:'Color'},{id:'color 1',text:'Color 1'},{id:'color 1 fine',text:'Color 1 Fine'},{id:'color 1 fnc',text:'Color 1 Fnc'},{id:'color 2',text:'Color 2'},{id:'color 2 fine',text:'Color 2 Fine'},{id:'color 2 fnc',text:'Color 2 Fnc'},{id:'color 2 rot',text:'Color 2 Rot'},{id:'color 2 rot fine',text:'Color 2 Rot Fine'},{id:'color 3',text:'Color 3'},{id:'color 3 fnc',text:'Color 3 Fnc'},{id:'color 4',text:'Color 4'},{id:'color 5',text:'Color 5'},{id:'color 6',text:'Color 6'},{id:'color 7',text:'Color 7'},{id:'color 8',text:'Color 8'},{id:'color change 1',text:'Color Change 1'},{id:'color change 2',text:'Color Change 2'},{id:'color chase',text:'Color Chase'},{id:'color chase speed',text:'Color Chase Speed'},{id:'color close',text:'Color Close'},{id:'color corr',text:'Color Corr'},{id:'color ctrl',text:'Color Ctrl'},{id:'color cycle',text:'Color Cycle'},{id:'color effects',text:'Color Effects'},{id:'color fade',text:'Color Fade'},{id:'color fan',text:'Color Fan'},{id:'color fine',text:'Color Fine'},{id:'color fnc',text:'Color Fnc'},{id:'color fx',text:'Color FX'},{id:'color fx1',text:'Color FX1'},{id:'color fx2',text:'Color FX2'},{id:'color fx3',text:'Color FX3'},{id:'color fx4',text:'Color FX4'},{id:'color fx5',text:'Color FX5'},{id:'color intensity',text:'Color Intensity'},{id:'color left',text:'Color Left'},{id:'color level',text:'Color Level'},{id:'color macro',text:'Color Macro'},{id:'color macro 1',text:'Color Macro 1'},{id:'color macro 2',text:'Color Macro 2'},{id:'color macro ctrl',text:'Color Macro Ctrl'},{id:'color macro spd',text:'Color Macro Spd'},{id:'color macro speed',text:'Color Macro Speed'},{id:'color mode',text:'Color Mode'}]
    }

let DMXChannelSearch = {
    DMXChannelCount : 1,
    Reset : () => {
        this.DMXChannelCount = 1
        $Elem.DMXChannelCount.value = '001'
        return this
    },
    // Set the DMXChannelCount
    Set : str => {
        str = parseInt(str)
        // If value set is inside the DMX range value (1-512)
        if(str > 0 && str <= 512) {
            this.DMXChannelCount = str
            $Elem.DMXChannelCount.value = ('000' + str).substr(-3)
        } else {
            $Elem.DMXChannelCount.value = this.DMXChannelCount
        }
        return this
    },
    // Add a channel select
    AddChannelSearch : () => {
        let str = parseInt($Elem.DMXChannelCount.value) + 1
        // If value set is inside the DMX range value (1-512)
        if(str > 0 && str < 512) {
            ipcRenderer.send('ChannelTemplate', {Channel : str, ChannelType : ''})
            DMXChannelSearch.Set(str)
        } else {
            return this
        }
    },
    // Remove a channel select
    RemChannelSearch : () => {
        let str = parseInt($Elem.DMXChannelCount.value) - 1
        // If value set is inside the DMX range value (1>512)
        if(str > 0 && str < 512) {
            let ChildToRemove = document.getElementById(config.SearchForm.BaseName_Channel + (str + 1))
            ,   ParentToRemove = ChildToRemove.closest('div.channelfield.flex-container')
            ParentToRemove.remove()
            DMXChannelSearch.Set(str)
        } else {
            return this
        }
    }
}

//ipcRenderer.send('pageChange', {page : elem.getAttribute('href')})		// Request new page content
$Elem.DMXChannelCount_Btn_Add.addEventListener('click', e => {
    e.preventDefault()
    DMXChannelSearch.AddChannelSearch()
})
$Elem.DMXChannelCount_Btn_Rem.addEventListener('click', e => {
    e.preventDefault()
    DMXChannelSearch.RemChannelSearch()
})

ipcRenderer.on('ChannelTemplate', (e, data) => {
    FieldSetChannelContent.insertAdjacentHTML('beforeend', data.template)
})