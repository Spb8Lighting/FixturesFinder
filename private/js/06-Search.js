let SelectOptions = {
    Options: false,
    Restricted: false,
    Full: false,
    /**
    * List Parameters
    * @returns {void}
    */
    Initialize: () => {
        SelectOptions.Full = SelectOptions.SetFull()
        SelectOptions.Restricted = SelectOptions.SetRestricted()
        SelectOptions.Options = SelectOptions.Restricted
    },
    /**
    * Based on DBOption, set the "Select Options"
    * @returns {void}
    */
    CheckOptions: () => {
        let TMPSelectOptions = 0
        switch (DBOption[config.Form.Option.ParameterList]) {
            case config.Form.Option.ParameterList_Full:
                TMPSelectOptions = SelectOptions.Full
                break
            case config.Form.Option.ParameterList_Common:
            default:
                TMPSelectOptions = SelectOptions.Restricted
                break
        }
        if (TMPSelectOptions.length != SelectOptions.Options.length) {
            SelectOptions.Options = TMPSelectOptions
            let SelectDMXChannel = document.querySelectorAll(`select[name^="${config.Form.Search.BaseName_Channel}"]`)
            if (SelectDMXChannel) {
                SelectDMXChannel.forEach(Select => Select.closest('div').remove())
                DMXChannelSearch.DMXChannelCount = 0
                DMXChannelSearch.Initialize()
            }
        }
        return this
    },
    /**
     * Set Restricted option values
     * @returns {void}
     */
    SetRestricted: () => {
        let TMPDBSearchParameter = DBSearchParameter
        TMPDBSearchParameter.sort((a, b) => {
            return a.order - b.order
        })
        return TMPDBSearchParameter.filter(el => el.order !== null)
    },
    /**
     * Set Full option values
     * @returns {void}
     */
    SetFull: () => {
        return DBSearchParameter
    }
},
    /**
     * Attach a listener to input
     * @param {Object} Selector
     */
    AddInputListener = (Selector) => {
        Selector.addEventListener('click', Selector.select, { passive: true })
        Selector.addEventListener('change', () => {
            $SearchSel.Form.dispatchEvent(new Event('change'))
            Selector.blur()
        }, { passive: true })
    },
    /**
     * Attach a listener for CSS coloring on new Select
     * @param {Object} Selector
     */
    AddSelectListener = (Selector, callback = false) => {
        Selector.addEventListener('change', () => {
            // Set the attribute data-option to allow background coloring
            let DataOptionValue = Selector.querySelector('option:checked').value
            Selector.setAttribute('data-option', DataOptionValue)
            Selector.closest('div').setAttribute('data-option', DataOptionValue)
            // Set some Selectors to allow to add or remove additionnal input for slot
            let DIVContainer = Selector.parentNode
                , SearchInput = DIVContainer.querySelector('input')
                , SelectorValue = Selector.value.toLowerCase()
            // Check if the DMX Channel is a Wheel
            if (config.Regex.Slot.test(SelectorValue)) {
                let SlotInfo = SelectorValue.match(config.Regex.Slot)
                    , SlotInfoName = SlotInfo[1]
                    , SlotNumber = (!SlotInfo[2]) ? 1 : SlotInfo[2]
                    , Basename_Wheel = false
                switch (SlotInfoName) {
                    case 'color':
                        Basename_Wheel = config.Form.Search.BaseName_Wheel_Color
                        break
                    case 'animation':
                        Basename_Wheel = config.Form.Search.BaseName_Wheel_Anim
                        break
                    case 'gobo':
                        Basename_Wheel = config.Form.Search.BaseName_Wheel_Gobo
                        break
                }
                // If Input for Slot already exists, remove it, else add the class to the DIV for next input
                if (SearchInput) {
                    DIVContainer.removeChild(SearchInput)
                } else {
                    DIVContainer.classList.add(SlotClass)
                }
                let InputSlodID = config.Form.Search.BaseName_Wheel + Basename_Wheel + SlotNumber
                data = ipcRenderer.sendSync('ChannelTemplateSlot', { Channel: InputSlodID })
                DIVContainer.insertAdjacentHTML('beforeend', data.template)
                AddInputListener(document.getElementById(InputSlodID))
            } else {
                // If there was an input in the DIV, remove it and remove the associated class
                if (SearchInput) {
                    DIVContainer.removeChild(SearchInput)
                    DIVContainer.classList.remove(SlotClass)
                }
            }
            Selector.blur()
            if (typeof callback === 'function') {
                callback()
            }
        }, { passive: true })
    },
    $SearchSel = {
        Status: {
            SearchInitialize: false
        },
        Timer: {
            Form: false,
            LastSearch: false,
            Adjust: false
        },
        Form: document.getElementById(config.Form.Search.Form),
        DMXChannelCount: document.getElementById(config.Form.Search.DMXChannelCount),
        DMXChannelCount_Btn_Add: document.getElementById(config.Form.Search.DMXChannelCount_Btn_Add),
        DMXChannelCount_Btn_Rem: document.getElementById(config.Form.Search.DMXChannelCount_Btn_Rem),
        FieldSet: document.getElementById(config.Form.Search.DMXChannelCount).closest('fieldset'),
        DMXChannelCount_Max: document.getElementById(config.Form.Search.DMXChannelCount_Max),
        DMXChannelCount_Max_Div: document.getElementById(config.Form.Search.DMXChannelCount_Max).closest('div'),
        DMXChannelCount_Max_Label: document.querySelector('label[for="' + config.Form.Search.DMXChannelCount_Max + '"]'),
        Manufacturer: document.getElementById(config.Form.Search.Manufacturer),
        FixtureName: document.getElementById(config.Form.Search.FixtureName),
        Button: {
            Reset: document.getElementById(config.Form.Search.Form + config.Form.Button.Reset),
            QuickSearch: document.getElementById(config.Form.Search.Form + config.Form.Button.Submit)
        }
    },
    DMXChannelSearch = {
        DMXChannelCount: 0,
        /**
         * Initialize the form with last search content
         */
        Initialize: () => {
            clearTimeout($SearchSel.Timer.LastSearch['DBSearch'])
            if (DBLastSearch === undefined) {
                $SearchSel.Timer.LastSearch['DBSearch'] = setTimeout(DMXChannelSearch.Initialize, 50)
            } else {
                // Restore previous search
                let event = new Event('change')
                    , ManufacturerOption = $SearchSel.Manufacturer.querySelector('option[value="' + DBLastSearch[config.Form.Search.Manufacturer].toLowerCase() + '"]')
                    , FixtureNameOption = $SearchSel.FixtureName.querySelector('option[value="' + DBLastSearch[config.Form.Search.FixtureName].toLowerCase() + '"]')

                // Restore previous DMX Channel Count then adjust the number of select to be displayed
                $SearchSel.DMXChannelCount.value = DBLastSearch[config.Form.Search.DMXChannelCount]
                DMXChannelSearch.AdjustChannelSearch()

                // Set Manufacturer
                if (DBLastSearch[config.Form.Search.Manufacturer] != config.Default.All.toLowerCase() && ManufacturerOption) {
                    ManufacturerOption.selected = true
                    $SearchSel.Manufacturer.dispatchEvent(event)
                }

                // Set FixtureName
                if (DBLastSearch[config.Form.Search.FixtureName] != config.Default.All.toLowerCase() && FixtureNameOption) {
                    FixtureNameOption.selected = true
                    $SearchSel.FixtureName.dispatchEvent(event)
                }

                //Reselect previous searchs values of DMX Channel
                DMXChannelSearch.Reselect()
            }
        },
        /**
         * Parse saved data and set the value
         * @param {Object} Data
         * @param {string} Default
         * @param {function} Callback
         */
        ParseSave: (Data, Default, Callback) => {
            for (let i = 0; i < Data.length; i++) {
                let obj = Data[i]
                for (let key in obj) {
                    if (obj[key].toLowerCase() != Default.toLowerCase()) {
                        Callback(key, obj[key])
                    }
                }
            }
        },
        /**
         * Restore Previous Search
         */
        Reselect: () => {
            clearTimeout($SearchSel.Timer.LastSearch['reselect'])
            if (!$SearchSel.Status.SearchInitialize) {
                $SearchSel.Timer.LastSearch['reselect'] = setTimeout(DMXChannelSearch.Reselect, 50)
            } else {
                DMXChannelSearch.ParseSave(DBLastSearch[config.Form.Search.DMXChart_Channel], config.Default.Any, DMXChannelSearch.SetSelect)
                DMXChannelSearch.ParseSave(DBLastSearch[config.Form.Search.DMXChart_Slot], config.Default.Infinity, DMXChannelSearch.SetInput)
            }
        },
        /**
         * Set Input value
         * @param {int} id
         * @param {string} value
         */
        SetInput: (id, value) => {
            clearTimeout($SearchSel.Timer[id])
            let input = document.getElementById(config.Form.Search.BaseName_Wheel + id)
            if (input == null) {
                $SearchSel.Timer[id] = setTimeout(() => DMXChannelSearch.SetInput(id, value), 50)
            } else {
                input.value = value.toLowerCase()
                input.dispatchEvent(new Event('change'))
            }
        },
        /**
         * Set Select value
         * @param {int} id
         * @param {string} value
         */
        SetSelect: (id, value) => {
            clearTimeout($SearchSel.Timer[id])
            let select = document.getElementById(config.Form.Search.BaseName_Channel + id)
                , NbOption = select.querySelectorAll('option').length
            if (NbOption != (SelectOptions.Options.length + 1)) {
                $SearchSel.Timer[id] = setTimeout(() => DMXChannelSearch.SetSelect(id, value), 50)
            } else {
                let OptionToSelect = select.querySelector('option[value="' + value.toLowerCase() + '"]')
                if (OptionToSelect) {
                    OptionToSelect.selected = true
                    select.dispatchEvent(new Event('change'))
                } else {
                    let ActivePage = document.querySelector('aside a.active')
                        , DIVParent = select.closest('div')
                        , ErrorNotification = new Notification('Parameter display', {
                            body: `#${id} DMX Channel used "${value}" parameter which is not available with this option.
                        
                        Click this notification to restore previous option`
                        })
                    //Redirect to the Search Page if not already the case
                    if (ActivePage.href.toLowerCase() != config.Page.Search.toLowerCase()) {
                        document.querySelector(`a[href="${config.Page.Search}"]`).dispatchEvent(new Event('click'))
                    }
                    DIVParent.classList.add('error')
                    ErrorNotification.onclick = () => {
                        DBOption.ParameterList = (DBOption.ParameterList == config.Form.Option.ParameterList_Common) ? config.Form.Option.ParameterList_Full : config.Form.Option.ParameterList_Common
                        RunOption.Reselect()
                        RunOption.Update.ParameterList()
                        DIVParent.classList.remove('error')
                        ErrorNotification.close()
                    }
                    ErrorNotification.onclose = () => DIVParent.classList.remove('error')
                    $SearchSel.Timer[id] = setTimeout(() => DIVParent.classList.remove('error'), 5000)
                }
            }
        },
        /**
         * Reset the DMX Count value to 1
         * @returns {void}
         */
        Reset: () => {
            let event = new Event('change')
                , select = document.getElementById(`${config.Form.Search.BaseName_Channel}1`)
            // Set the First Channel to "any"
            select.value = config.Default.Any.toLowerCase()
            // Reset to 1 the number of channels
            $SearchSel.DMXChannelCount.value = '001'

            // Reset Manufacturer
            $SearchSel.Manufacturer.querySelector('option[value="' + config.Default.All.toLowerCase() + '"]').selected = true
            // Reset Fixture Name
            $SearchSel.FixtureName.querySelector('option[value="' + config.Default.All.toLowerCase() + '"]').selected = true

            //Fire change event on elements
            select.dispatchEvent(event)
            $SearchSel.DMXChannelCount.dispatchEvent(event)
            $SearchSel.Manufacturer.dispatchEvent(event)
            $SearchSel.FixtureName.dispatchEvent(event)
            $SearchSel.Form.dispatchEvent(event)
            $SearchSel.Button.Reset.blur()
        },
        /**
         * Set value on 3 digits by adding 0 in front of the value
         * @param {int} val
         * @returns {string}
         */
        Format: val => ('000' + val).substr(-3),
        /**
        * Set DMX Channel Count Value
        * @param {int|string} val
        * @returns {void}
        */
        Set: val => {
            val = parseInt(val)
            // If value set is inside the DMX range value (1-512)
            if (val >= 1 && val <= 512) {
                DMXChannelSearch.DMXChannelCount = val
                $SearchSel.DMXChannelCount.value = DMXChannelSearch.Format(val)
            } else {
                $SearchSel.DMXChannelCount.value = DMXChannelSearch.Format(DMXChannelSearch.DMXChannelCount)
            }
            return this
        },
        /**
        * Adjust the number of DMX Select in the form
        * @param {Object} [event=false]
        * @returns {void}
        */
        AdjustChannelSearch: (event = false) => {
            clearTimeout($SearchSel.Timer.Adjust)
            if (SelectOptions.Options.length == 0) {
                $SearchSel.Timer.Adjust = setTimeout(DMXChannelSearch.AdjustChannelSearch, 50)
            } else {
                $SearchSel.Status.SearchInitialize = false
                if (event && typeof event !== 'function') {
                    $SearchSel.DMXChannelCount.blur()
                }
                let Result = parseInt($SearchSel.DMXChannelCount.value) - DMXChannelSearch.DMXChannelCount
                $SearchSel.DMXChannelCount.value = DMXChannelSearch.DMXChannelCount
                if (Result != 0 && Result > 0) {             // Positive Result
                    for (let i = 0; i < Result; i++) {
                        DMXChannelSearch.AddChannelSearch(event)
                    }
                    $SearchSel.Status.SearchInitialize = true
                } else if (Result != 0 && Result < 0) {      // Negative Result
                    for (let i = Result; i < 0; i++) {
                        DMXChannelSearch.RemChannelSearch(event)
                    }
                    $SearchSel.Status.SearchInitialize = true
                } else {
                    $SearchSel.Status.SearchInitialize = true
                    return DMXChannelSearch.Set(DMXChannelSearch.DMXChannelCount)
                }
            }
        },
        AddChannelOptions: Select => {
            while (Select.hasChildNodes()) {
                Select.removeChild(Select.lastChild)
            }
            // Add first "Any option"
            let option = document.createElement('option')
            option.value = config.Default.Any.toLowerCase()
            option.text = config.Default.Any
            Select.add(option)
            // Add other options
            for (let i = 0; i < SelectOptions.Options.length; i++) {
                option = document.createElement('option')
                option.value = SelectOptions.Options[i].value.toLowerCase()
                option.text = SelectOptions.Options[i].value
                Select.add(option)
            }
        },
        /**
        * Add 1 DMX Select in the form
        * @param {Object} [event=false]
        * @returns {void}
        */
        AddChannelSearch: (event = false) => {
            if (event && typeof event !== 'function') {
                $SearchSel.DMXChannelCount_Btn_Add.blur()
            }
            let ChannelNumber = parseInt($SearchSel.DMXChannelCount.value) + 1
            // If value set is inside the DMX range value (1-512)
            if (ChannelNumber >= 1 && ChannelNumber <= 512) {
                DMXChannelSearch.Set(ChannelNumber)
                let data = ipcRenderer.sendSync('ChannelTemplate', { Channel: ChannelNumber })
                // Add a new DMX Channel Search
                $SearchSel.FieldSet.insertAdjacentHTML('beforeend', data.template)
                let Select = document.getElementById(data.selector)
                DMXChannelSearch.AddChannelOptions(Select)
                AddSelectListener(Select)
                if (event && typeof event !== 'function') {
                    $SearchSel.Form.dispatchEvent(new Event('change'))
                }
            } else {
                return this
            }
        },
        /**
         * Remove 1 DMX Select in the form
         * @param {Object} [event=false]
         * @returns {void}
         */
        RemChannelSearch: (event = false) => {
            if (event && typeof event !== 'function') {
                $SearchSel.DMXChannelCount_Btn_Rem.blur()
            }
            let str = parseInt($SearchSel.DMXChannelCount.value) - 1
            // If value set is inside the DMX range value (1>512)
            if (str >= 1 && str <= 512) {
                let ChildToRemove = document.getElementById(config.Form.Search.BaseName_Channel + parseInt($SearchSel.DMXChannelCount.value))
                if (ChildToRemove) {
                    let ParentToRemove = ChildToRemove.closest('div.channelfield.flex-container')
                    ParentToRemove.remove()
                }
                DMXChannelSearch.Set(str)
                if (event && typeof event !== 'function') {
                    $SearchSel.Form.dispatchEvent(new Event('change'))
                }
            } else {
                return this
            }
        },
        Update: {
            /**
             * Parse the selectors and return an array with the keys/values without the basename
             * @param {Object} Selectors
             * @param {string} Basename
             * @returns {array}
             */
            ParseForm: (Selectors, Basename) => {
                let Table = []
                Selectors.forEach(select => {
                    Table.push({
                        [select.getAttribute('name').replace(Basename, '')]: select.value
                    })
                })
                return Table
            },
            /**
             * Prepare data for a "LastSearch" Update All
             * @returns {void}
             */
            All: () => {
                let Selectors = {
                    SelectDMXChannel: document.querySelectorAll(`select[name^="${config.Form.Search.BaseName_Channel}"]`),
                    InputDMXSlot: document.querySelectorAll(`input[name^="${config.Form.Search.BaseName_Wheel}"]`)
                },
                    data = {
                        DMXChannelCount: $SearchSel.DMXChannelCount.value,
                        DMXChannelCount_Max: $SearchSel.DMXChannelCount_Max.value,
                        Manufacturer: $SearchSel.Manufacturer.value,
                        FixtureName: $SearchSel.FixtureName.value,
                        DMXChart_Channel: DMXChannelSearch.Update.ParseForm(Selectors.SelectDMXChannel, config.Form.Search.BaseName_Channel),
                        DMXChart_Slot: DMXChannelSearch.Update.ParseForm(Selectors.InputDMXSlot, config.Form.Search.BaseName_Wheel)
                    }
                Table.LastSearch.Update.All(data)
                return this
            }
        }
    },
    DMXChannelMax = {
        /**
        * Following the DBOption status, will adjust the display status "Max DMX Channel"
        * @returns {void}
        */
        CheckDisplay: () => {
            switch (DBOption[config.Form.Option.SearchMode]) {
                case config.Form.Option.SearchMode_OrderExact:
                case config.Form.Option.SearchMode_UnOrderExact:
                    DMXChannelMax.Hide()
                    break
                default:
                    DMXChannelMax.Show()
                    break
            }
        },
        /**
        * Show the "Max DMX Channel"
        * @returns {void}
        */
        Show: () => {
            $SearchSel.DMXChannelCount_Max_Label.classList.remove('hide')
            $SearchSel.DMXChannelCount_Max_Div.classList.remove('hide')
            return this
        },
        /**
        * Hide the "Max DMX Channel"
        * @returns {void}
        */
        Hide: () => {
            $SearchSel.DMXChannelCount_Max_Label.classList.add('hide')
            $SearchSel.DMXChannelCount_Max_Div.classList.add('hide')
            return this
        }
    }

/* Getters */
$SearchSel.Form.addEventListener('change', e => {
    clearTimeout($SearchSel.Timer.Form)
    $SearchSel.Timer.Form = setTimeout(DMXChannelSearch.Update.All, 50)
}, { passive: true })

/* Buttons */
// Reset
$SearchSel.Button.Reset.addEventListener('click', DMXChannelSearch.Reset, { passive: true })

/* DMX Channel Count */
$SearchSel.DMXChannelCount.addEventListener('click', $SearchSel.DMXChannelCount.select, { passive: true })
$SearchSel.DMXChannelCount.addEventListener('change', DMXChannelSearch.AdjustChannelSearch, { passive: true })

// Button +
$SearchSel.DMXChannelCount_Btn_Add.addEventListener('click', DMXChannelSearch.AddChannelSearch, { passive: true })
// Button -
$SearchSel.DMXChannelCount_Btn_Rem.addEventListener('click', DMXChannelSearch.RemChannelSearch, { passive: true })

/* Other Criteria */

// Manufacturer
AddSelectListener($SearchSel.Manufacturer)

//Fixture Name
AddSelectListener($SearchSel.FixtureName)