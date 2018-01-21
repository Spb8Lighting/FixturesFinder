const	SelectContent = {
        Default : [{id:'any',text:'Any'},{id:'intensity',text:'Intensity'},{id:'intensity fine',text:'Intensity Fine'},{id:'strobe',text:'Strobe'},{id:'shutter',text:'Shutter'},{id:'pan',text:'Pan'},{id:'pan fine',text:'Pan Fine'},{id:'pan rot',text:'Pan Rot'},{id:'tilt',text:'Tilt'},{id:'tilt fine',text:'Tilt Fine'},{id:'tilt rot',text:'Tilt Rot'},{id:'pt speed',text:'PT Speed'},{id:'color',text:'Color'},{id:'color macro',text:'Color Macro'},{id:'red',text:'Red'},{id:'red fine',text:'Red Fine'},{id:'green',text:'Green'},{id:'green fine',text:'Green Fine'},{id:'blue',text:'Blue'},{id:'blue fine',text:'Blue Fine'},{id:'white',text:'White'},{id:'white fine',text:'White Fine'},{id:'amber',text:'Amber'},{id:'amber fine',text:'Amber Fine'},{id:'uv',text:'UV'},{id:'uv fine',text:'UV Fine'},{id:'cyan',text:'Cyan'},{id:'cyan fine',text:'Cyan Fine'},{id:'magenta',text:'Magenta'},{id:'magenta fine',text:'Magenta Fine'},{id:'yellow',text:'Yellow'},{id:'yellow fine',text:'Yellow Fine'},{id:'ctc',text:'CTC'},{id:'ctc fine',text:'CTC Fine'},{id:'cto',text:'CTO'},{id:'cto fine',text:'CTO Fine'},{id:'gobo',text:'Gobo'},{id:'gobo rot',text:'Gobo Rot'},{id:'prism',text:'Prism'},{id:'prism rot',text:'Prism Rot'},{id:'zoom',text:'Zoom'},{id:'focus',text:'Focus'},{id:'frost',text:'Frost'},{id:'iris',text:'Iris'},{id:'macro',text:'Macro'},{id:'chase',text:'Chase'},{id:'fx',text:'FX'},{id:'ctrl',text:'Ctrl'}],
        Actual : '',
        Full = [{id:'any',text:'Any'},{id:'access',text:'Access'},{id:'address',text:'Address'},{id:'adjust dn',text:'Adjust Dn'},{id:'adjust up',text:'Adjust Up'},{id:'adv blue high',text:'Adv Blue High'},{id:'adv blue low',text:'Adv Blue Low'},{id:'adv blue mid',text:'Adv Blue Mid'},{id:'adv green high',text:'Adv Green High'},{id:'adv green low',text:'Adv Green Low'},{id:'adv green mid',text:'Adv Green Mid'},{id:'adv red high',text:'Adv Red High'},{id:'adv red low',text:'Adv Red Low'},{id:'adv red mid',text:'Adv Red Mid'},{id:'advance col',text:'Advance Col'},{id:'age',text:'Age'},{id:'align ctrl',text:'Align Ctrl'},{id:'alpha',text:'Alpha'},{id:'amber',text:'Amber'},{id:'amber fine',text:'Amber Fine'},{id:'amberc',text:'AmberC'},{id:'ambience',text:'Ambience'},{id:'ambient',text:'Ambient'},{id:'anchor x',text:'Anchor X'},{id:'anchor y',text:'Anchor Y'},{id:'anchor z',text:'Anchor Z'},{id:'angle',text:'Angle'},{id:'anim',text:'Anim'},{id:'anim 1',text:'Anim 1'},{id:'anim 1 fnc',text:'Anim 1 Fnc'},{id:'anim 1 rot',text:'Anim 1 Rot'},{id:'anim 1 rot fine',text:'Anim 1 Rot Fine'},{id:'anim 2',text:'Anim 2'},{id:'anim 2 fnc',text:'Anim 2 Fnc'},{id:'anim 2 rot',text:'Anim 2 Rot'},{id:'anim 2 rot fine',text:'Anim 2 Rot Fine'},{id:'anim ctrl 1',text:'Anim Ctrl 1'},{id:'anim ctrl 2',text:'Anim Ctrl 2'},{id:'anim fine',text:'Anim Fine'},{id:'anim fnc',text:'Anim Fnc'},{id:'anim ind',text:'Anim Ind'},{id:'anim index',text:'Anim Index'},{id:'anim macro',text:'Anim Macro'},{id:'anim mode',text:'Anim Mode'},{id:'anim phase',text:'Anim Phase'},{id:'anim rot',text:'Anim Rot'},{id:'anim rot 1',text:'Anim Rot 1'},{id:'anim rot 2',text:'Anim Rot 2'},{id:'anim rot fine',text:'Anim Rot Fine'},{id:'anim speed',text:'Anim Speed'},{id:'animated star',text:'Animated Star'},{id:'animation',text:'Animation'},{id:'anti aliasing',text:'Anti Aliasing'},{id:'artnet in',text:'ArtNet In'},{id:'aspect',text:'Aspect'},{id:'aspect fine',text:'Aspect Fine'},{id:'aspect mode',text:'Aspect Mode'},{id:'aspect ratio',text:'Aspect Ratio'},{id:'aspect ratio fine',text:'Aspect Ratio Fine'},{id:'atmosphere',text:'Atmosphere'},{id:'audio',text:'Audio'},{id:'audio file',text:'Audio File'},{id:'audio fine',text:'Audio Fine'},{id:'audio fnc',text:'Audio Fnc'},{id:'audio gain',text:'Audio Gain'},{id:'audio in',text:'Audio In'},{id:'audio l',text:'Audio L'},{id:'audio library',text:'Audio Library'},{id:'audio out',text:'Audio Out'},{id:'audio pan',text:'Audio Pan'},{id:'audio pan fine',text:'Audio Pan Fine'},{id:'audio r',text:'Audio R'},{id:'audio sync',text:'Audio Sync'},{id:'audio volume',text:'Audio Volume'},{id:'audio wav',text:'Audio Wav'},{id:'auto',text:'Auto'},{id:'auto fade',text:'Auto Fade'},{id:'auto focus',text:'Auto Focus'},{id:'auto focus adj',text:'Auto Focus Adj'}]
    }
let $SearchSel = {
    Form :                      document.getElementById(config.Form.Search.Form),
    DMXChannelCount :           document.getElementById(config.Form.Search.DMXChannelCount),
    DMXChannelCount_Btn_Add :   document.getElementById(config.Form.Search.DMXChannelCount_Btn_Add),
    DMXChannelCount_Btn_Rem :   document.getElementById(config.Form.Search.DMXChannelCount_Btn_Rem),
    FieldSet :                  document.getElementById(config.Form.Search.DMXChannelCount).closest('fieldset'),
}

let DMXChannelSearch = {
    DMXChannelCount : 0,
    /**
     * Reset the DMX Count value to 1
     * @returns {void}
     */
    Reset : () => {
        this.DMXChannelCount = 1
        $SearchSel.DMXChannelCount.value = '001'
        return this
    },
    /**
     * Set value on 3 digits by adding 0 in front of the value
     * @param {int} val
     * @returns {string}
     */
    Format : val => ('000' + val).substr(-3),
     /**
     * Set DMX Channel Count Value
     * @param {int|string} val
     * @returns {void}
     */
    Set : val => {
        val = parseInt(val)
        // If value set is inside the DMX range value (1-512)
        if(val >= 1 && val <= 512) {
            this.DMXChannelCount = val
            $SearchSel.DMXChannelCount.value = DMXChannelSearch.Format(val)
        } else {
            $SearchSel.DMXChannelCount.value = DMXChannelSearch.Format(this.DMXChannelCount)
        }
        return this
    },
     /**
     * Adjust the number of DMX Select in the form
     * @returns {void}
     */
    AdjustChannelSearch : () => {
        let Result = parseInt($SearchSel.DMXChannelCount.value) - this.DMXChannelCount
        $SearchSel.DMXChannelCount.value = this.DMXChannelCount
        if(Result != 0 && Result > 0) {             // Positive Result
            for(let i = 0 ; i < Result ; i++) {
                DMXChannelSearch.AddChannelSearch()
            }
        } else if(Result != 0 && Result < 0) {      // Negative Result
            for(let i = Result ; i < 0 ; i++) {
                DMXChannelSearch.RemChannelSearch()
            }
        } else {
            return DMXChannelSearch.Set(this.DMXChannelCount)
        }
    },
     /**
     * Add 1 DMX Select in the form
     * @returns {void}
     */
    AddChannelSearch : () => {
        let str = parseInt($SearchSel.DMXChannelCount.value) + 1
        // If value set is inside the DMX range value (1-512)
        if(str >= 1 && str <= 512) {
            ipcRenderer.send('ChannelTemplate', {Channel : str, ChannelType : ''})
            DMXChannelSearch.Set(str)
        } else {
            return this
        }
    },
     /**
     * Remove 1 DMX Select in the form
     * @returns {void}
     */
    RemChannelSearch : () => {
        let str = parseInt($SearchSel.DMXChannelCount.value) - 1
        // If value set is inside the DMX range value (1>512)
        if(str >= 1 && str <= 512) {
            let ChildToRemove = document.getElementById(config.Form.Search.BaseName_Channel +  parseInt($SearchSel.DMXChannelCount.value))
            if(ChildToRemove) {
                let ParentToRemove = ChildToRemove.closest('div.channelfield.flex-container')
                ParentToRemove.remove()
            }
            DMXChannelSearch.Set(str)
        } else {
            return this
        }
    }
}

/* Initialize */
    DMXChannelSearch.AddChannelSearch()

/* Getters */
$SearchSel.Form.addEventListener('submit', e => {
    e.preventDefault()
})

/* DMX Channel Count */
$SearchSel.DMXChannelCount.addEventListener('click', () => {
    $SearchSel.DMXChannelCount.select()
})
$SearchSel.DMXChannelCount.addEventListener('change', e => {
    e.preventDefault()
    DMXChannelSearch.AdjustChannelSearch()
    $SearchSel.DMXChannelCount.blur()
})

// Button +
$SearchSel.DMXChannelCount_Btn_Add.addEventListener('click', e => {
    e.preventDefault()
    DMXChannelSearch.AddChannelSearch()
})
// Button -
$SearchSel.DMXChannelCount_Btn_Rem.addEventListener('click', e => {
    e.preventDefault()
    DMXChannelSearch.RemChannelSearch()
})

/* Setters */
ipcRenderer.on('ChannelTemplate', (e, data) => {
    $SearchSel.FieldSet.insertAdjacentHTML('beforeend', data.template)
})