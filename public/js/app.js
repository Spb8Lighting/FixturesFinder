const electron = require('electron')
    , config = require('../../config')
    , remote = electron.remote
    , ipcRenderer = electron.ipcRenderer
    , RunMode = (process.env.NODE_ENV !== undefined) ? false : true
    , Icon = {
        max: `<svg viewBox="0 0 20 20">
    <path d="M 1 1 V19 H19 V1 H1 z M19 19 H1 V4 H19 V19 z" />
</svg>`,
        min: `<svg viewBox="0 0 20 20">
    <path d="M7 1 V11 H19 V1 H7 z  M19 11 H7 V3 H19 V11 z"/>
    <path d="M12 12 L12 19 L1 19 L1 9 L6 9 L6 9 L1 9 L1 19 L12 19 L12 19z" />
    <rect x="1" y="9" width="4.5" height="2" />
</svg>`
    }
    , $btn = {
        min: document.getElementById('min-btn'),
        max: document.getElementById('max-btn'),
        close: document.getElementById('close-btn')
    }
    , $aLink = document.querySelectorAll('aside a')
    , $h1 = document.querySelector('h1>span')
    , $MainContent = document.getElementById('maincontent')
    , SlotClass = 'wheelfield'

ipcRenderer.on('ModalTemplate', (e, data) => {
    document.body.insertAdjacentHTML('beforeend', data.template)
})
$btn.min.addEventListener('click', () => {
    let window = remote.getCurrentWindow()
    window.minimize()
}, {passive: true})

$btn.max.addEventListener('click', () => {
    let window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
        window.maximize()
        $btn.max.innerHTML = Icon.min
    } else {
        window.unmaximize()
        $btn.max.innerHTML = Icon.max
    }
}, {passive: true})

$btn.close.addEventListener('click', () => {
    let window = remote.getCurrentWindow()
    Table.Close()
    window.close()
}, {passive: true})
let AllDivs = document.querySelectorAll('#maincontent>div')

$aLink.forEach(elem => {
    elem.addEventListener('click', e => {
        e.preventDefault()
        let PageName = elem.getAttribute('href')
        $aLink.forEach(elem => {                                                // Remove .active on links
            if (elem.getAttribute('href') == PageName) {
                elem.classList.add('active')
            } else {
                elem.classList.remove('active')
            }
        })
        AllDivs.forEach(elem => {            // Show only the wanted content
            if (elem.getAttribute('id') == PageName) {
                elem.classList.remove('hide')
            } else {
                elem.classList.add('hide')
            }
        })
        $h1.innerHTML = `Fixtures Finder/${PageName} - v${config.Version}`      // Update Title
        elem.blur()                 // Remove :active on link
    }, { passive: false })
})
const sqlite3 = require('sqlite3').verbose()
const dblocation = process.env.NODE_ENV ? `${__dirname}/../../db.sqlite3` : `${__dirname}/../../../db.sqlite3`
    , db = new sqlite3.Database(dblocation, err => {
        if (err) {
            return console.error(err.message)
        } else {
            //console.info('Database Option connection alive')
        }
    })
/* Define Return Object */
let DBSearch
    , DBSearchParameter
    , DBLastSearch
    , DBOption
    , DBAdmin

let Table = {
    /**
     * "LastSearch" Table getters and setters
     */
    SearchParameter: {
        /**
        * Create the "SearchParameter" Table and insert default values
        * @returns {void}
        */
        Initialize: (callback = false) => {
            db.serialize(() => {
                /* Create and fill the Database for Options */
                Table.SearchParameter.Create()
                let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.SearchParameter}\``
                db.get(sql, (err, row) => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        if (row.count == 0) {
                            Table.SearchParameter.Fill(require('../../temporary-until-ingestion.ParameterDMX'))
                        }
                        /* After check of Database, initialize interface */
                        Table.SearchParameter.Get(callback)
                    }
                })
            })
            return this
        },
        /**
        * Create "SearchParameter" Table
        * @returns {void}
        */
        Create: () => {
            let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.SearchParameter}\` ( \`${config.Form.Search.SearchParameter_order}\` INTEGER, \`${config.Form.Search.SearchParameter_value}\` TEXT UNIQUE)`
            db.run(sql)
            return this
        },
        /**
        * Empty "SearchParameter" Table
        * @returns {void}
        */
        Delete: () => {
            let sql = `DROP TABLE \`${config.Database.SearchParameter}\``
            db.run(sql)
            return this
        },
        /**
        * Restore "SearchParameter" Table to default (empty)
        */
        Reset: () => {
            Table.SearchParameter.Delete()
            Table.SearchParameter.Create()
        },
        /**
        * Fill "SearchParameter"
        * @returns {void}
        */
        Fill: (data = false) => {
            let placeholders = data.map(el => `(${(el.order) ? el.order : null}, '${el.value}')`).join(', ')
                , sql = `INSERT OR IGNORE INTO \`${config.Database.SearchParameter}\` ( \`${config.Form.Search.SearchParameter_order}\`, \`${config.Form.Search.SearchParameter_value}\`) VALUES ${placeholders}`
            db.run(sql)
            return this
        },
        /**
        * Get options from "LastSearch Table"
        */
        Get: (callback = false) => {
            let sql = `SELECT \`rowid\`, \`${config.Form.Search.SearchParameter_order}\`, \`${config.Form.Search.SearchParameter_value}\` FROM \`${config.Database.SearchParameter}\` ORDER BY \`${config.Form.Search.SearchParameter_value}\``

            db.all(sql, (err, datas) => {
                if (err) {
                    return console.error(err.message)
                } else {
                    DBSearchParameter = datas
                    SelectOptions.Initialize()
                    if (typeof callback === 'function') {
                        callback()
                    }
                }
            })
        }
    },
    /**
     * "LastSearch" Table getters and setters
     */
    LastSearch: {
        /**
        * Create the "LastSearch" Table and insert default values
        * @returns {void}
        */
        Initialize: (callback = false) => {
            db.serialize(() => {
                /* Create and fill the Database for Options */
                Table.LastSearch.Create()
                let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.LastSearch}\``
                db.get(sql, (err, row) => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        if (row.count > 1) {
                            Table.LastSearch.Delete()
                            Table.LastSearch.Create()
                            Table.LastSearch.Fill()
                        } else if (row.count == 0) {
                            Table.LastSearch.Fill()
                        }
                        /* After check of Database, initialize interface */
                        Table.LastSearch.Get(callback)
                    }
                })
            })
            return this
        },
        /**
        * Create "LastSearch" Table
        * @returns {void}
        */
        Create: () => {
            let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.LastSearch}\` ( \`${config.Form.Search.DMXChannelCount}\` INTEGER, \`${config.Form.Search.DMXChannelCount_Max}\` INTEGER, \`${config.Form.Search.Manufacturer}\` TEXT, \`${config.Form.Search.FixtureName}\` TEXT, \`${config.Form.Search.DMXChart_Channel}\` TEXT, \`${config.Form.Search.DMXChart_Slot}\` TEXT )`
            db.run(sql)
            return this
        },
        /**
        * Empty "LastSearch" Table
        * @returns {void}
        */
        Delete: () => {
            let sql = `DROP TABLE \`${config.Database.LastSearch}\``
            db.run(sql)
            return this
        },
        /**
        * Restore "LastSearch" Table to default (empty)
        */
        Reset: () => {
            Table.LastSearch.Delete()
            Table.LastSearch.Create()
        },
        /**
        * Fill with default "LastSearch"
        * @returns {void}
        */
        Fill: () => {
            /* Reset the options to its default */
            let sql = `INSERT INTO \`${config.Database.LastSearch}\` ( \`${config.Form.Search.DMXChannelCount}\`, \`${config.Form.Search.DMXChannelCount_Max}\`, \`${config.Form.Search.Manufacturer}\`, \`${config.Form.Search.FixtureName}\`, \`${config.Form.Search.DMXChart_Channel}\`, \`${config.Form.Search.DMXChart_Slot}\`) VALUES ($DMXChannelCount, $DMXChannelCount_Max, $Manufacturer, $FixtureName, $DMXChart_Channel, $DMXChart_Slot)`
                , param = {
                    $DMXChannelCount: 1,
                    $DMXChannelCount_Max: 0,
                    $Manufacturer: config.Default.All.toLowerCase(),
                    $FixtureName: config.Default.All.toLowerCase(),
                    $DMXChart_Channel: JSON.stringify([{ 1: config.Default.Any.toLowerCase() }]),
                    $DMXChart_Slot: JSON.stringify([{}])
                }
            db.run(sql, param)
            return this
        },
        /**
        * Get options from "LastSearch Table"
        */
        Get: (callback = false) => {
            let sql = `SELECT \`${config.Form.Search.DMXChannelCount}\`, \`${config.Form.Search.DMXChannelCount_Max}\`, \`${config.Form.Search.Manufacturer}\`, \`${config.Form.Search.FixtureName}\`, \`${config.Form.Search.DMXChart_Channel}\`, \`${config.Form.Search.DMXChart_Slot}\` FROM \`${config.Database.LastSearch}\``

            db.get(sql, (err, data) => {
                if (err) {
                    return console.error(err.message)
                } else {
                    DBLastSearch = data
                    DBLastSearch[config.Form.Search.DMXChart_Channel] = JSON.parse(DBLastSearch[config.Form.Search.DMXChart_Channel])
                    DBLastSearch[config.Form.Search.DMXChart_Slot] = JSON.parse(DBLastSearch[config.Form.Search.DMXChart_Slot])
                    if (typeof callback === 'function') {
                        callback()
                    }
                }
            })
        },
        Update: {
            /**
           * Run Update SQL in "LastSearch Table"
           * @param {string} sql
           * @param {{ DMXChannelCount: Int, DMXChannelCount_Max: Int, Manufacturer : String, FixtureName : String, DMXChart_Channel : Object, DMXChart_Slot : Object }} param
           */
            Run: (sql, param) => {
                db.run(sql, param, err => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        Table.LastSearch.Get()
                    }
                })
            },
            /**
           * Update All in "LastSearch Table"
           * @param {{ DMXChannelCount: Int, DMXChannelCount_Max: Int, Manufacturer : String, FixtureName : String, DMXChart_Channel : Object, DMXChart_Slot : Object }} data
           */
            All: data => {
                let sql = `UPDATE \`${config.Database.LastSearch}\` SET \`${config.Form.Search.DMXChannelCount}\` = $DMXChannelCount, \`${config.Form.Search.DMXChannelCount_Max}\` = $DMXChannelCount_Max, \`${config.Form.Search.Manufacturer}\` = $Manufacturer, \`${config.Form.Search.FixtureName}\` = $FixtureName, \`${config.Form.Search.DMXChart_Channel}\` = $DMXChart_Channel, \`${config.Form.Search.DMXChart_Slot}\` = $DMXChart_Slot`
                    , param = {
                        $DMXChannelCount: parseInt(data.DMXChannelCount),
                        $DMXChannelCount_Max: parseInt(data.DMXChannelCount_Max),
                        $Manufacturer: data.Manufacturer.toLowerCase(),
                        $FixtureName: data.FixtureName.toLowerCase(),
                        $DMXChart_Channel: JSON.stringify(data.DMXChart_Channel),
                        $DMXChart_Slot: JSON.stringify(data.DMXChart_Slot)
                    }
                Table.LastSearch.Update.Run(sql, param)
            }
        }
    },
    /**
    * "Options" Table getters and setters
    */
    Options: {
        /**
        * Create the "Options" Table and insert default values
        * @returns {void}
        */
        Initialize: (callback = false) => {
            db.serialize(() => {
                /* Create and fill the Database for Options */
                Table.Options.Create()
                let sql = `SELECT COUNT(*) AS \`count\` FROM \`${config.Database.Options}\``
                db.get(sql, (err, row) => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        if (row.count > 1) {
                            Table.Options.Delete()
                            Table.Options.Create()
                            Table.Options.Fill()
                        } else if (row.count == 0) {
                            Table.Options.Fill()
                            //ipcRenderer.send('ModalTemplate', { Reboot : true, Modal : `${config.productName} needs to be reloaded, please wait ...` })
                        }
                        /* After check of Database, initialize interface */
                        Table.Options.Get(callback)
                    }
                })
            })
            return this
        },
        /**
        * Create "Options" Table
        * @returns {void}
        */
        Create: () => {
            let sql = `CREATE TABLE IF NOT EXISTS \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\` TEXT, \`${config.Form.Option.DisplayMode}\` TEXT, \`${config.Form.Option.ParameterList}\` TEXT )`
            db.run(sql)
            return this
        },
        /**
        * Empty "Options" Table
        * @returns {void}
        */
        Delete: () => {
            let sql = `DROP TABLE \`${config.Database.Options}\``
            db.run(sql)
            return this
        },
        /**
        * Restore defaults Options in "Options" Table
        */
        Reset: () => {
            Table.Options.Update.All({
                SearchMode: config.Form.Option.SearchMode_OrderExact,
                DisplayMode: config.Form.Option.DisplayMode_Full,
                ParameterList: config.Form.Option.ParameterList_Common
            })
        },
        /**
        * Fill with default "Options Table"
        * @returns {void}
        */
        Fill: () => {
            /* Reset the options to its default */
            let sql = `INSERT INTO \`${config.Database.Options}\` ( \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\`) VALUES ($SearchMode, $DisplayMode, $ParameterList)`
                , param = {
                    $SearchMode: config.Form.Option.SearchMode_OrderExact,
                    $DisplayMode: config.Form.Option.DisplayMode_Full,
                    $ParameterList: config.Form.Option.ParameterList_Common
                }
            db.run(sql, param)
            return this
        },
        /**
        * Get options from "Options Table"
        * @returns {void}
        */
        Get: (callback = false) => {
            let sql = `SELECT \`${config.Form.Option.SearchMode}\`, \`${config.Form.Option.DisplayMode}\`, \`${config.Form.Option.ParameterList}\` FROM \`${config.Database.Options}\``

            db.get(sql, (err, data) => {
                if (err) {
                    return console.error(err.message)
                } else {
                    DBOption = data
                    DMXChannelMax.CheckDisplay()
                    SelectOptions.CheckOptions()
                    RunOption.Reselect()
                    if (typeof callback === 'function') {
                        callback()
                    }
                }
            })
            return this
        },
        Update: {
            /**
           * Run Update SQL in "Options Table"
           * @param {string} sql
           * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} param
           * @returns {void}
           */
            Run: (sql, param) => {
                db.run(sql, param, err => {
                    if (err) {
                        return console.error(err.message)
                    } else {
                        Table.Options.Get()
                    }
                })
                return this
            },
            /**
           * Update All in "Options Table"
           * @param {{ SearchMode: String, DisplayMode: String, ParameterList : String }} data
           * @returns {void}
           */
            All: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode, \`${config.Form.Option.DisplayMode}\` = $DisplayMode, \`${config.Form.Option.ParameterList}\` = $ParameterList`
                    , param = {
                        $SearchMode: data.SearchMode,
                        $DisplayMode: data.DisplayMode,
                        $ParameterList: data.ParameterList
                    }
                Table.Options.Update.Run(sql, param)
                return this
            },
            /**
            * Update SearchMode in "Options Table"
            * @param {{ SearchMode: String }} data
            * @returns {void}
            */
            SearchMode: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.SearchMode}\` = $SearchMode`
                    , param = {
                        $SearchMode: data.SearchMode,
                    }
                Table.Options.Update.Run(sql, param)
                return this
            },
            /**
            * Update DisplayMode in "Options Table"
            * @param {{ DisplayMode: String }} data
            * @returns {void}
            */
            DisplayMode: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.DisplayMode}\` = $DisplayMode`
                    , param = {
                        $DisplayMode: data.DisplayMode,
                    }
                Table.Options.Update.Run(sql, param)
                return this
            },
            /**
            * Update ParameterList in "Options Table"
            * @param {{ ParameterList: String }} data
            * @returns {void}
            */
            ParameterList: data => {
                let sql = `UPDATE \`${config.Database.Options}\` SET \`${config.Form.Option.ParameterList}\` = $ParameterList`
                    , param = {
                        $ParameterList: data.ParameterList,
                    }
                Table.Options.Update.Run(sql, param)
                return this
            }
        }
    },
    /**
    * Close Database
    * @returns {void}
    */
    Close: () => {
        db.close(err => {
            if (err) {
                return console.error(err.message)
            } else {
                //console.info('Database connection closed')
            }
        })
        return this
    }
}
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
        let TMPSelectOptions = false
        switch (DBOption[config.Form.Option.ParameterList]) {
            case config.Form.Option.ParameterList_Full:
                TMPSelectOptions = SelectOptions.Full
                break
            case config.Form.Option.ParameterList_Common:
            default:
                TMPSelectOptions = SelectOptions.Restricted
                break
        }
        if (TMPSelectOptions != SelectOptions.Options) {
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
            Selector.setAttribute('data-option', Selector.querySelector('option:checked').getAttribute('value'))
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
            // Restore previous search
            $SearchSel.DMXChannelCount.value = DBLastSearch[config.Form.Search.DMXChannelCount]
            DMXChannelSearch.AdjustChannelSearch()
            let ManufacturerOption = $SearchSel.Manufacturer.querySelector('option[value="' + DBLastSearch[config.Form.Search.Manufacturer].toLowerCase() + '"]')
            if (DBLastSearch[config.Form.Search.Manufacturer] != config.Default.All.toLowerCase() && ManufacturerOption) {
                ManufacturerOption.selected = true
            }
            let FixtureNameOption = $SearchSel.FixtureName.querySelector('option[value="' + DBLastSearch[config.Form.Search.FixtureName].toLowerCase() + '"]')
            if (DBLastSearch[config.Form.Search.FixtureName] != config.Default.All.toLowerCase() && FixtureNameOption) {
                FixtureNameOption.selected = true
            }
            DMXChannelSearch.Reselect()
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
            clearTimeout($SearchSel.Timer.LastSearch)
            if (!$SearchSel.Status.SearchInitialize) {
                $SearchSel.Timer.LastSearch = setTimeout(DMXChannelSearch.Reselect, 50)
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
                    if(ActivePage.href.toLowerCase() != config.Page.Search.toLowerCase()) {
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
let $OptionsSel = {
    ResetButton: document.getElementById(config.Form.Option.Form + config.Form.Button.Reset),
    Form: document.getElementById(config.Form.Option.Form),
    SearchMode: document.getElementById(config.Form.Option.SearchMode),
    DisplayMode: document.getElementById(config.Form.Option.DisplayMode),
    ParameterList: document.getElementById(config.Form.Option.ParameterList)
}
let RunOption = {
    /**
     * Reset the DMX Count value to 1
     * @returns {void}
     */
    Reset: () => {
        Table.Options.Reset()
        $OptionsSel.ResetButton.blur()
        return this
    },
    Update: {
        /**
         * Prepare data for a "Options Table" Update All
         * @returns {void}
         */
        All: () => {
            let data = {
                SearchMode: $OptionsSel.SearchMode.value,
                DisplayMode: $OptionsSel.DisplayMode.value,
                ParameterList: $OptionsSel.ParameterList.value
            }
            Table.Options.Update.All(data)
            return this
        },
        /**
         * Prepare data to update SearchMode in "Options Table"
         * @returns {void}
         */
        SearchMode: () => {
            Table.Options.Update.SearchMode({ SearchMode: $OptionsSel.SearchMode.value })
            return this
        },
        /**
         * Prepare data to update DisplayMode in "Options Table"
         * @returns {void}
         */
        DisplayMode: () => {
            Table.Options.Update.DisplayMode({ DisplayMode: $OptionsSel.DisplayMode.value })
            return this
        },
        /**
        * Prepare data to update ParameterList in "Options Table"
        * @returns {void}
        */
        ParameterList: () => {
            Table.Options.Update.ParameterList({ ParameterList: $OptionsSel.ParameterList.value })
            return this
        }
    },
    /**
     * Select the options based on DB Content
     * @returns {void}
     */
    Reselect: () => {
        $OptionsSel.SearchMode.querySelector('option[value="' + DBOption.SearchMode + '"]').selected = true
        $OptionsSel.SearchMode.setAttribute('data-option', DBOption.SearchMode)
        $OptionsSel.DisplayMode.querySelector('option[value="' + DBOption.DisplayMode + '"]').selected = true
        $OptionsSel.DisplayMode.setAttribute('data-option', DBOption.DisplayMode)
        $OptionsSel.ParameterList.querySelector('option[value="' + DBOption.ParameterList + '"]').selected = true
        $OptionsSel.ParameterList.setAttribute('data-option', DBOption.ParameterList)
        return this
    }
}

$OptionsSel.Form.addEventListener('change', RunOption.Update.All, {passive: true})
$OptionsSel.ResetButton.addEventListener('click', RunOption.Reset, {passive: true})

/* Other Criteria */

// Search Mode
AddSelectListener($OptionsSel.SearchMode, RunOption.Update.SearchMode)

// Display Mode
AddSelectListener($OptionsSel.DisplayMode, RunOption.Update.DisplayMode)

// Parameter List
AddSelectListener($OptionsSel.ParameterList, RunOption.Update.ParameterList)
//Table.SearchParameter.Fill(ParamDMX)
/* Initialize the page content*/
Table.SearchParameter.Initialize(
    Table.Options.Initialize(
        Table.LastSearch.Initialize(
            DMXChannelSearch.Initialize
        )
    )
)


