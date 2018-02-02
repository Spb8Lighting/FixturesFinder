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
                            Table.SearchParameter.Fill()
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
            //Following list will come later from fixture ingestion
            let ParamDMX = [
                { order: '', value: 'Access' }
                , { order: '', value: 'Address' }
                , { order: '', value: 'Adjust Dn' }
                , { order: '', value: 'Adjust Up' }
                , { order: '', value: 'Adv Blue High' }
                , { order: '', value: 'Adv Blue Low' }
                , { order: '', value: 'Adv Blue Mid' }
                , { order: '', value: 'Adv Green High' }
                , { order: '', value: 'Adv Green Low' }
                , { order: '', value: 'Adv Green Mid' }
                , { order: '', value: 'Adv Red High' }
                , { order: '', value: 'Adv Red Low' }
                , { order: '', value: 'Adv Red Mid' }
                , { order: '', value: 'Advance Col' }
                , { order: '', value: 'Age' }
                , { order: '', value: 'Align Ctrl' }
                , { order: '', value: 'Alpha' }
                , { order: 22, value: 'Amber' }
                , { order: 23, value: 'Amber Fine' }
                , { order: '', value: 'AmberC' }
                , { order: '', value: 'Ambience' }
                , { order: '', value: 'Ambient' }
                , { order: '', value: 'Anchor X' }
                , { order: '', value: 'Anchor Y' }
                , { order: '', value: 'Anchor Z' }
                , { order: '', value: 'Angle' }
                , { order: '', value: 'Anim' }
                , { order: '', value: 'Anim 1' }
                , { order: '', value: 'Anim 1 Fnc' }
                , { order: '', value: 'Anim 1 Rot' }
                , { order: '', value: 'Anim 1 Rot Fine' }
                , { order: '', value: 'Anim 2' }
                , { order: '', value: 'Anim 2 Fnc' }
                , { order: '', value: 'Anim 2 Rot' }
                , { order: '', value: 'Anim 2 Rot Fine' }
                , { order: '', value: 'Anim Ctrl 1' }
                , { order: '', value: 'Anim Ctrl 2' }
                , { order: '', value: 'Anim Fine' }
                , { order: '', value: 'Anim Fnc' }
                , { order: '', value: 'Anim Ind' }
                , { order: '', value: 'Anim Index' }
                , { order: '', value: 'Anim Macro' }
                , { order: '', value: 'Anim Mode' }
                , { order: '', value: 'Anim Phase' }
                , { order: '', value: 'Anim Rot' }
                , { order: '', value: 'Anim Rot 1' }
                , { order: '', value: 'Anim Rot 2' }
                , { order: '', value: 'Anim Rot Fine' }
                , { order: '', value: 'Anim Speed' }
                , { order: '', value: 'Animated Star' }
                , { order: '', value: 'Animation' }
                , { order: '', value: 'Anti Aliasing' }
                , { order: '', value: 'ArtNet In' }
                , { order: '', value: 'Aspect' }
                , { order: '', value: 'Aspect Fine' }
                , { order: '', value: 'Aspect Mode' }
                , { order: '', value: 'Aspect Ratio' }
                , { order: '', value: 'Aspect Ratio Fine' }
                , { order: '', value: 'Atmosphere' }
                , { order: '', value: 'Audio' }
                , { order: '', value: 'Audio File' }
                , { order: '', value: 'Audio Fine' }
                , { order: '', value: 'Audio Fnc' }
                , { order: '', value: 'Audio Gain' }
                , { order: '', value: 'Audio In' }
                , { order: '', value: 'Audio L' }
                , { order: '', value: 'Audio Library' }
                , { order: '', value: 'Audio Out' }
                , { order: '', value: 'Audio Pan' }
                , { order: '', value: 'Audio Pan Fine' }
                , { order: '', value: 'Audio R' }
                , { order: '', value: 'Audio Sync' }
                , { order: '', value: 'Audio Volume' }
                , { order: '', value: 'Audio Wav' }
                , { order: '', value: 'Auto' }
                , { order: '', value: 'Auto Fade' }
                , { order: '', value: 'Auto Focus' }
                , { order: '', value: 'Auto Focus Adj' }
                , { order: '', value: 'Auto Focus Adjust' }
                , { order: '', value: 'Auto Focus Fine' }
                , { order: '', value: 'Auto Pilot' }
                , { order: '', value: 'Auto Speed' }
                , { order: '', value: 'AutoFocus' }
                , { order: '', value: 'AutoFocus Adj' }
                , { order: '', value: 'Aux' }
                , { order: '', value: 'Aux 1' }
                , { order: '', value: 'Aux 2' }
                , { order: '', value: 'Aux 3' }
                , { order: '', value: 'Aux1' }
                , { order: '', value: 'Aux2' }
                , { order: '', value: 'AV Fader' }
                , { order: '', value: 'B Str Dur' }
                , { order: '', value: 'B Strobe' }
                , { order: '', value: 'Back' }
                , { order: '', value: 'Balance' }
                , { order: '', value: 'Ballast' }
                , { order: '', value: 'Bank' }
                , { order: '', value: 'Barn 1' }
                , { order: '', value: 'Barn 1 Fine' }
                , { order: '', value: 'Barn 2' }
                , { order: '', value: 'Barn 2 Fine' }
                , { order: '', value: 'Barn 3' }
                , { order: '', value: 'Barn 3 Fine' }
                , { order: '', value: 'Barn 4' }
                , { order: '', value: 'Barn 4 Fine' }
                , { order: '', value: 'Barn Rot' }
                , { order: '', value: 'Barn Rot Fine' }
                , { order: '', value: 'Beam' }
                , { order: '', value: 'Beam Fnc' }
                , { order: '', value: 'Beam Mode' }
                , { order: '', value: 'Beam Shaper' }
                , { order: '', value: 'Beam Speed' }
                , { order: '', value: 'Beam Twister' }
                , { order: '', value: 'Beam Twister Fine' }
                , { order: '', value: 'Beat' }
                , { order: '', value: 'BeatBridge' }
                , { order: '', value: 'Begin Frm' }
                , { order: '', value: 'Begin Frm Fine' }
                , { order: '', value: 'BG Alpha' }
                , { order: '', value: 'BG Blue' }
                , { order: '', value: 'BG Color' }
                , { order: '', value: 'BG Color 1' }
                , { order: '', value: 'BG Color 2' }
                , { order: '', value: 'BG Dimmer' }
                , { order: '', value: 'BG Dimmer Fine' }
                , { order: '', value: 'BG Green' }
                , { order: '', value: 'BG Red' }
                , { order: '', value: 'BG Strobe' }
                , { order: '', value: 'Bk Color' }
                , { order: '', value: 'Bkg Blue' }
                , { order: '', value: 'Bkg Green' }
                , { order: '', value: 'Bkg Red' }
                , { order: '', value: 'Black Move' }
                , { order: '', value: 'Blackout' }
                , { order: '', value: 'Blank' }
                , { order: '', value: 'Blanking' }
                , { order: '', value: 'Blend' }
                , { order: '', value: 'Blend Mode' }
                , { order: '', value: 'Blend Preset' }
                , { order: '', value: 'Blend Preset Group' }
                , { order: '', value: 'Blend Preset Param' }
                , { order: '', value: 'Block' }
                , { order: 18, value: 'Blue' }
                , { order: '', value: 'Blue 1' }
                , { order: '', value: 'Blue 2' }
                , { order: 19, value: 'Blue Fine' }
                , { order: '', value: 'Blue Laser' }
                , { order: '', value: 'Blue Shift' }
                , { order: '', value: 'Blue Tone' }
                , { order: '', value: 'BlueC' }
                , { order: '', value: 'Blur' }
                , { order: '', value: 'Blur Aera' }
                , { order: '', value: 'Blur Radius' }
                , { order: '', value: 'Bot Limit' }
                , { order: '', value: 'BPM' }
                , { order: '', value: 'Brand 1' }
                , { order: '', value: 'Brand 2' }
                , { order: '', value: 'Brightness' }
                , { order: '', value: 'Brightness 1' }
                , { order: '', value: 'Brightness 2' }
                , { order: '', value: 'Buffer' }
                , { order: '', value: 'Bus' }
                , { order: '', value: 'Bypass' }
                , { order: '', value: 'C1' }
                , { order: '', value: 'C1 Fine' }
                , { order: '', value: 'C2' }
                , { order: '', value: 'C2 Fine' }
                , { order: '', value: 'C3' }
                , { order: '', value: 'C3 Fine' }
                , { order: '', value: 'C4' }
                , { order: '', value: 'C4 Fine' }
                , { order: '', value: 'Cal' }
                , { order: '', value: 'Calibration' }
                , { order: '', value: 'Cam Effects' }
                , { order: '', value: 'Cam Focus' }
                , { order: '', value: 'Cam Focus Fine' }
                , { order: '', value: 'Cam IR' }
                , { order: '', value: 'Cam Orient' }
                , { order: '', value: 'Cam Shutter' }
                , { order: '', value: 'Cam WB' }
                , { order: '', value: 'Cam Zoom' }
                , { order: '', value: 'Cam Zoom Fine' }
                , { order: '', value: 'Camera CTB' }
                , { order: '', value: 'Camera CTC' }
                , { order: '', value: 'Camera CTO' }
                , { order: '', value: 'Camera Effects' }
                , { order: '', value: 'Camera Focus' }
                , { order: '', value: 'Camera Focus Fine' }
                , { order: '', value: 'Camera IR' }
                , { order: '', value: 'Camera Orient' }
                , { order: '', value: 'Camera Shutter' }
                , { order: '', value: 'Camera WB' }
                , { order: '', value: 'Camera X' }
                , { order: '', value: 'Camera X Fine' }
                , { order: '', value: 'Camera Y' }
                , { order: '', value: 'Camera Y Fine' }
                , { order: '', value: 'Camera Z' }
                , { order: '', value: 'Camera Z Fine' }
                , { order: '', value: 'Camera Zoom' }
                , { order: '', value: 'Camera Zoom Fine' }
                , { order: '', value: 'Capture Presets' }
                , { order: '', value: 'Cat 1' }
                , { order: '', value: 'Cat 2' }
                , { order: '', value: 'CCT' }
                , { order: '', value: 'Character' }
                , { order: 45, value: 'Chase' }
                , { order: '', value: 'Chase 1' }
                , { order: '', value: 'Chase 1 Col' }
                , { order: '', value: 'Chase 1 Fade' }
                , { order: '', value: 'Chase 1 Lvl' }
                , { order: '', value: 'Chase 1 Spd' }
                , { order: '', value: 'Chase 2' }
                , { order: '', value: 'Chase 2 Col' }
                , { order: '', value: 'Chase 2 Fade' }
                , { order: '', value: 'Chase 2 Lvl' }
                , { order: '', value: 'Chase 2 Spd' }
                , { order: '', value: 'Chase Fade' }
                , { order: '', value: 'Chase Fnc' }
                , { order: '', value: 'Chase Intensity' }
                , { order: '', value: 'Chase Prog' }
                , { order: '', value: 'Chase Range' }
                , { order: '', value: 'Chase Spd' }
                , { order: '', value: 'Chase Speed' }
                , { order: '', value: 'Chksm' }
                , { order: '', value: 'Chroma' }
                , { order: '', value: 'Clear' }
                , { order: '', value: 'Clge Blend' }
                , { order: '', value: 'Clge Cell' }
                , { order: '', value: 'Clge Config' }
                , { order: '', value: 'Clip' }
                , { order: '', value: 'Clip Page' }
                , { order: '', value: 'Clipping' }
                , { order: '', value: 'Clump' }
                , { order: '', value: 'CMY' }
                , { order: '', value: 'CMY Fnc' }
                , { order: '', value: 'CMY Macro' }
                , { order: '', value: 'CMY Speed' }
                , { order: '', value: 'Col Mix' }
                , { order: '', value: 'Col Preset' }
                , { order: '', value: 'Col Preset Int' }
                , { order: '', value: 'Cold' }
                , { order: '', value: 'Cold White' }
                , { order: '', value: 'Collage' }
                , { order: 12, value: 'Color' }
                , { order: '', value: 'Color 1' }
                , { order: '', value: 'Color 1 Fine' }
                , { order: '', value: 'Color 1 Fnc' }
                , { order: '', value: 'Color 2' }
                , { order: '', value: 'Color 2 Fine' }
                , { order: '', value: 'Color 2 Fnc' }
                , { order: '', value: 'Color 2 Rot' }
                , { order: '', value: 'Color 2 Rot Fine' }
                , { order: '', value: 'Color 3' }
                , { order: '', value: 'Color 3 Fnc' }
                , { order: '', value: 'Color 4' }
                , { order: '', value: 'Color 5' }
                , { order: '', value: 'Color 6' }
                , { order: '', value: 'Color 7' }
                , { order: '', value: 'Color 8' }
                , { order: '', value: 'Color Change 1' }
                , { order: '', value: 'Color Change 2' }
                , { order: '', value: 'Color Chase' }
                , { order: '', value: 'Color Chase Speed' }
                , { order: '', value: 'Color Close' }
                , { order: '', value: 'Color Corr' }
                , { order: '', value: 'Color Ctrl' }
                , { order: '', value: 'Color Cycle' }
                , { order: '', value: 'Color Effects' }
                , { order: '', value: 'Color Fade' }
                , { order: '', value: 'Color Fan' }
                , { order: '', value: 'Color Fine' }
                , { order: '', value: 'Color Fnc' }
                , { order: '', value: 'Color FX' }
                , { order: '', value: 'Color FX1' }
                , { order: '', value: 'Color FX2' }
                , { order: '', value: 'Color FX3' }
                , { order: '', value: 'Color FX4' }
                , { order: '', value: 'Color FX5' }
                , { order: '', value: 'Color Intensity' }
                , { order: '', value: 'Color Left' }
                , { order: '', value: 'Color Level' }
                , { order: 13, value: 'Color Macro' }
                , { order: '', value: 'Color Macro 1' }
                , { order: '', value: 'Color Macro 2' }
                , { order: '', value: 'Color Macro Ctrl' }
                , { order: '', value: 'Color Macro Spd' }
                , { order: '', value: 'Color Macro Speed' }
                , { order: '', value: 'Color Mode' }
                , { order: '', value: 'Color Open' }
                , { order: '', value: 'Color Preset' }
                , { order: '', value: 'Color Rainbow' }
                , { order: '', value: 'Color Range' }
                , { order: '', value: 'Color Right' }
                , { order: '', value: 'Color Rot' }
                , { order: '', value: 'Color Scroll' }
                , { order: '', value: 'Color Shake' }
                , { order: '', value: 'Color Shk' }
                , { order: '', value: 'Color Speed' }
                , { order: '', value: 'Color Speed Fine' }
                , { order: '', value: 'Color Step' }
                , { order: '', value: 'Color Time' }
                , { order: '', value: 'Color X' }
                , { order: '', value: 'Color Y' }
                , { order: '', value: 'ColorWave' }
                , { order: '', value: 'ColorWave Speed' }
                , { order: '', value: 'Columns' }
                , { order: '', value: 'Contrast' }
                , { order: '', value: 'Contrast 1' }
                , { order: '', value: 'Contrast 2' }
                , { order: '', value: 'Cool' }
                , { order: '', value: 'Cool Fine' }
                , { order: '', value: 'Cool White' }
                , { order: '', value: 'Copy' }
                , { order: '', value: 'CPF' }
                , { order: '', value: 'Crossfade' }
                , { order: '', value: 'Crossfader A-B' }
                , { order: '', value: 'CT' }
                , { order: '', value: 'CTB' }
                , { order: 32, value: 'CTC' }
                , { order: '', value: 'CTC 1' }
                , { order: '', value: 'CTC 2' }
                , { order: '', value: 'CTC Ctrl' }
                , { order: 33, value: 'CTC Fine' }
                , { order: 34, value: 'CTO' }
                , { order: 35, value: 'CTO Fine' }
                , { order: 47, value: 'Ctrl' }
                , { order: '', value: 'Ctrl 1' }
                , { order: '', value: 'Ctrl 2' }
                , { order: '', value: 'Ctrl Fnc' }
                , { order: '', value: 'Ctrl Mode' }
                , { order: '', value: 'Ctrl R' }
                , { order: '', value: 'Cue' }
                , { order: '', value: 'Cue A' }
                , { order: '', value: 'Cue A1' }
                , { order: '', value: 'Cue A2' }
                , { order: '', value: 'Cue A3' }
                , { order: '', value: 'Cue A4' }
                , { order: '', value: 'Cue A5' }
                , { order: '', value: 'Cue A6' }
                , { order: '', value: 'Cue AB' }
                , { order: '', value: 'Cue B' }
                , { order: '', value: 'Cue B Page' }
                , { order: '', value: 'Cue B Speed' }
                , { order: '', value: 'Cue B1' }
                , { order: '', value: 'Cue B2' }
                , { order: '', value: 'Cue B3' }
                , { order: '', value: 'Cue B4' }
                , { order: '', value: 'Cue B5' }
                , { order: '', value: 'Cue B6' }
                , { order: '', value: 'Cue Fine' }
                , { order: '', value: 'Cue Fnc' }
                , { order: '', value: 'Cue Page' }
                , { order: '', value: 'Cue Speed' }
                , { order: '', value: 'Cuelist' }
                , { order: '', value: 'Cuelist Ctrl' }
                , { order: '', value: 'Curve' }
                , { order: 26, value: 'Cyan' }
                , { order: '', value: 'Cyan Brightness' }
                , { order: 27, value: 'Cyan Fine' }
                , { order: '', value: 'Cyan Fnc' }
                , { order: '', value: 'Cyan Spd' }
                , { order: '', value: 'CyanC' }
                , { order: '', value: 'Cycle' }
                , { order: '', value: 'Dashboard Dial 1' }
                , { order: '', value: 'Dashboard Dial 2' }
                , { order: '', value: 'Dashboard Dial 3' }
                , { order: '', value: 'Dashboard Dial 4' }
                , { order: '', value: 'Dashboard Dial 5' }
                , { order: '', value: 'Dashboard Dial 6' }
                , { order: '', value: 'Dashboard Dial 7' }
                , { order: '', value: 'Dashboard Dial 8' }
                , { order: '', value: 'De-interlace' }
                , { order: '', value: 'Decay' }
                , { order: '', value: 'Delay' }
                , { order: '', value: 'Density' }
                , { order: '', value: 'Detail' }
                , { order: '', value: 'Diffuser' }
                , { order: '', value: 'Diffuser Rot' }
                , { order: '', value: 'Dim Fnc' }
                , { order: '', value: 'Dim Macro' }
                , { order: '', value: 'Dim Macro Speed' }
                , { order: '', value: 'Dim Macro XFade' }
                , { order: '', value: 'Dim Speed' }
                , { order: '', value: 'Dimmer' }
                , { order: '', value: 'Dimmer Curve' }
                , { order: '', value: 'Dimmer Fine' }
                , { order: '', value: 'Dimmer Fnc' }
                , { order: '', value: 'Dimmer FX' }
                , { order: '', value: 'Dimmer Macro' }
                , { order: '', value: 'Dimmer Speed' }
                , { order: '', value: 'Direction' }
                , { order: '', value: 'Direction Fine' }
                , { order: '', value: 'Display' }
                , { order: '', value: 'Distortion' }
                , { order: '', value: 'Div' }
                , { order: '', value: 'Document Sel' }
                , { order: '', value: 'Dolly' }
                , { order: '', value: 'Dolly Fine' }
                , { order: '', value: 'Dot' }
                , { order: '', value: 'Dot Rot' }
                , { order: '', value: 'Dot Scan' }
                , { order: '', value: 'Down' }
                , { order: '', value: 'Draw' }
                , { order: '', value: 'Draw Mode' }
                , { order: '', value: 'Draw Speed' }
                , { order: '', value: 'Dual 1' }
                , { order: '', value: 'Dual 2' }
                , { order: '', value: 'Dual 3' }
                , { order: '', value: 'Dual 4' }
                , { order: '', value: 'Dual 5' }
                , { order: '', value: 'Duration' }
                , { order: '', value: 'Duty Cycle' }
                , { order: '', value: 'Dynamic Macro' }
                , { order: '', value: 'Edge' }
                , { order: '', value: 'Edge B' }
                , { order: '', value: 'Edge B Curve' }
                , { order: '', value: 'Edge B Curve Fine' }
                , { order: '', value: 'Edge B Fine' }
                , { order: '', value: 'Edge Bottom' }
                , { order: '', value: 'Edge Hor' }
                , { order: '', value: 'Edge Hor Fine' }
                , { order: '', value: 'Edge L' }
                , { order: '', value: 'Edge L Curve' }
                , { order: '', value: 'Edge L Curve Fine' }
                , { order: '', value: 'Edge L Fine' }
                , { order: '', value: 'Edge Left' }
                , { order: '', value: 'Edge R' }
                , { order: '', value: 'Edge R Curve' }
                , { order: '', value: 'Edge R Curve Fine' }
                , { order: '', value: 'Edge R Fine' }
                , { order: '', value: 'Edge Right' }
                , { order: '', value: 'Edge T' }
                , { order: '', value: 'Edge T Curve' }
                , { order: '', value: 'Edge T Curve Fine' }
                , { order: '', value: 'Edge T Fine' }
                , { order: '', value: 'Edge Top' }
                , { order: '', value: 'Edge Ver' }
                , { order: '', value: 'Edge Ver Fine' }
                , { order: '', value: 'Edge1' }
                , { order: '', value: 'Edge2' }
                , { order: '', value: 'Edge3' }
                , { order: '', value: 'Edge4' }
                , { order: '', value: 'Effect' }
                , { order: '', value: 'Effect 1' }
                , { order: '', value: 'Effect 1 Fade' }
                , { order: '', value: 'Effect 1 Intensity' }
                , { order: '', value: 'Effect 1 Speed' }
                , { order: '', value: 'Effect 10' }
                , { order: '', value: 'Effect 11' }
                , { order: '', value: 'Effect 12' }
                , { order: '', value: 'Effect 13' }
                , { order: '', value: 'Effect 14' }
                , { order: '', value: 'Effect 15' }
                , { order: '', value: 'Effect 16' }
                , { order: '', value: 'Effect 17' }
                , { order: '', value: 'Effect 18' }
                , { order: '', value: 'Effect 19' }
                , { order: '', value: 'Effect 2' }
                , { order: '', value: 'Effect 2 Fade' }
                , { order: '', value: 'Effect 2 Intensity' }
                , { order: '', value: 'Effect 2 Speed' }
                , { order: '', value: 'Effect 20' }
                , { order: '', value: 'Effect 21' }
                , { order: '', value: 'Effect 3' }
                , { order: '', value: 'Effect 4' }
                , { order: '', value: 'Effect 5' }
                , { order: '', value: 'Effect 6' }
                , { order: '', value: 'Effect 7' }
                , { order: '', value: 'Effect 8' }
                , { order: '', value: 'Effect 9' }
                , { order: '', value: 'Effect Rot' }
                , { order: '', value: 'Effect Speed' }
                , { order: '', value: 'Effects' }
                , { order: '', value: 'Effects 1' }
                , { order: '', value: 'Effects 1 Rot' }
                , { order: '', value: 'Effects 2' }
                , { order: '', value: 'Effects 2 Rot' }
                , { order: '', value: 'Effects Fine' }
                , { order: '', value: 'Effects Fnc' }
                , { order: '', value: 'Effects Pos' }
                , { order: '', value: 'Effects Rot' }
                , { order: '', value: 'Effects Rot Fine' }
                , { order: '', value: 'Effects Rot Fnc' }
                , { order: '', value: 'Effects Shake' }
                , { order: '', value: 'Effects Shk' }
                , { order: '', value: 'Effects Speed' }
                , { order: '', value: 'Engine Mode' }
                , { order: '', value: 'Execute' }
                , { order: '', value: 'Exposure' }
                , { order: '', value: 'Ext 1' }
                , { order: '', value: 'Ext 2' }
                , { order: '', value: 'Ext 3' }
                , { order: '', value: 'Ext 4' }
                , { order: '', value: 'Ext 5' }
                , { order: '', value: 'Ext 6' }
                , { order: '', value: 'Ext 7' }
                , { order: '', value: 'Ext 8' }
                , { order: '', value: 'Eye X' }
                , { order: '', value: 'Eye X Fine' }
                , { order: '', value: 'Eye Y' }
                , { order: '', value: 'Eye Y Fine' }
                , { order: '', value: 'Eye Z' }
                , { order: '', value: 'Eye Z Fine' }
                , { order: '', value: 'Fade' }
                , { order: '', value: 'Fade 1' }
                , { order: '', value: 'Fade 2' }
                , { order: '', value: 'Fade 3' }
                , { order: '', value: 'Fade 4' }
                , { order: '', value: 'Fade A/B' }
                , { order: '', value: 'Fade A/B Fine' }
                , { order: '', value: 'Fade Blue' }
                , { order: '', value: 'Fade Fnc' }
                , { order: '', value: 'Fade Green' }
                , { order: '', value: 'Fade In' }
                , { order: '', value: 'Fade Mode' }
                , { order: '', value: 'Fade Out' }
                , { order: '', value: 'Fade Prog' }
                , { order: '', value: 'Fade Red' }
                , { order: '', value: 'Fade Time' }
                , { order: '', value: 'Fade Time 1' }
                , { order: '', value: 'Fade Time 2' }
                , { order: '', value: 'Fade White' }
                , { order: '', value: 'Fader' }
                , { order: '', value: 'Fan' }
                , { order: '', value: 'Far' }
                , { order: '', value: 'Far Fine' }
                , { order: '', value: 'Feather' }
                , { order: '', value: 'FG Color' }
                , { order: '', value: 'FG Dimmer' }
                , { order: '', value: 'FG Strobe' }
                , { order: '', value: 'File' }
                , { order: '', value: 'Flakes' }
                , { order: '', value: 'Flash' }
                , { order: '', value: 'Flash Duration' }
                , { order: '', value: 'Flash Intensity' }
                , { order: '', value: 'Flash Rate' }
                , { order: '', value: 'Flow' }
                , { order: '', value: 'Flower' }
                , { order: '', value: 'Fnc' }
                , { order: 41, value: 'Focus' }
                , { order: '', value: 'Focus Ctrl' }
                , { order: '', value: 'Focus Fine' }
                , { order: '', value: 'Focus Fnc' }
                , { order: '', value: 'Focus Speed' }
                , { order: '', value: 'Focus Time' }
                , { order: '', value: 'Focus X' }
                , { order: '', value: 'Focus X Fine' }
                , { order: '', value: 'Focus Y' }
                , { order: '', value: 'Focus Y Fine' }
                , { order: '', value: 'Focus Z' }
                , { order: '', value: 'Focus Z Fine' }
                , { order: '', value: 'Fog' }
                , { order: '', value: 'Fog 1' }
                , { order: '', value: 'Fog 2' }
                , { order: '', value: 'Fog 3' }
                , { order: '', value: 'Fog Ctrl' }
                , { order: '', value: 'Fog Fnc' }
                , { order: '', value: 'Fog Interval' }
                , { order: '', value: 'Fog Time' }
                , { order: '', value: 'Folder' }
                , { order: '', value: 'FollowSpt' }
                , { order: '', value: 'Fountain' }
                , { order: '', value: 'FOV' }
                , { order: '', value: 'FOV Fine' }
                , { order: '', value: 'FPS' }
                , { order: '', value: 'Frame' }
                , { order: '', value: 'Frame Blending' }
                , { order: '', value: 'Frame Fine' }
                , { order: '', value: 'Framing 1a' }
                , { order: '', value: 'Framing 1b' }
                , { order: '', value: 'Framing 2a' }
                , { order: '', value: 'Framing 2b' }
                , { order: '', value: 'Framing 3a' }
                , { order: '', value: 'Framing 3b' }
                , { order: '', value: 'Framing 4a' }
                , { order: '', value: 'Framing 4b' }
                , { order: '', value: 'Framing Rot' }
                , { order: '', value: 'Freeze' }
                , { order: '', value: 'Fresnel' }
                , { order: '', value: 'Frm' }
                , { order: '', value: 'Frm 1' }
                , { order: '', value: 'Frm 1 Fine' }
                , { order: '', value: 'Frm 1 Rot' }
                , { order: '', value: 'Frm 1 Rot Fine' }
                , { order: '', value: 'Frm 1a' }
                , { order: '', value: 'Frm 1a Fine' }
                , { order: '', value: 'Frm 1b' }
                , { order: '', value: 'Frm 1b Fine' }
                , { order: '', value: 'Frm 1x' }
                , { order: '', value: 'Frm 1y' }
                , { order: '', value: 'Frm 2' }
                , { order: '', value: 'Frm 2 Fine' }
                , { order: '', value: 'Frm 2 Rot' }
                , { order: '', value: 'Frm 2 Rot Fine' }
                , { order: '', value: 'Frm 2a' }
                , { order: '', value: 'Frm 2a Fine' }
                , { order: '', value: 'Frm 2b' }
                , { order: '', value: 'Frm 2b Fine' }
                , { order: '', value: 'Frm 2x' }
                , { order: '', value: 'Frm 2y' }
                , { order: '', value: 'Frm 3' }
                , { order: '', value: 'Frm 3 Fine' }
                , { order: '', value: 'Frm 3 Rot' }
                , { order: '', value: 'Frm 3 Rot Fine' }
                , { order: '', value: 'Frm 3a' }
                , { order: '', value: 'Frm 3a Fine' }
                , { order: '', value: 'Frm 3b' }
                , { order: '', value: 'Frm 3b Fine' }
                , { order: '', value: 'Frm 3x' }
                , { order: '', value: 'Frm 3y' }
                , { order: '', value: 'Frm 4' }
                , { order: '', value: 'Frm 4 Fine' }
                , { order: '', value: 'Frm 4 Rot' }
                , { order: '', value: 'Frm 4 Rot Fine' }
                , { order: '', value: 'Frm 4a' }
                , { order: '', value: 'Frm 4a Fine' }
                , { order: '', value: 'Frm 4b' }
                , { order: '', value: 'Frm 4b Fine' }
                , { order: '', value: 'Frm 4x' }
                , { order: '', value: 'Frm 4y' }
                , { order: '', value: 'Frm B' }
                , { order: '', value: 'Frm B Fade' }
                , { order: '', value: 'Frm B Fine' }
                , { order: '', value: 'Frm B Rot' }
                , { order: '', value: 'Frm B Rot Fine' }
                , { order: '', value: 'Frm BLx' }
                , { order: '', value: 'Frm BLx Fine' }
                , { order: '', value: 'Frm BLy' }
                , { order: '', value: 'Frm BLy Fine' }
                , { order: '', value: 'Frm Bot' }
                , { order: '', value: 'Frm Bot Fine' }
                , { order: '', value: 'Frm BRx' }
                , { order: '', value: 'Frm BRx Fine' }
                , { order: '', value: 'Frm BRy' }
                , { order: '', value: 'Frm BRy Fine' }
                , { order: '', value: 'Frm Fine' }
                , { order: '', value: 'Frm L' }
                , { order: '', value: 'Frm L Fade' }
                , { order: '', value: 'Frm L Fine' }
                , { order: '', value: 'Frm L Rot' }
                , { order: '', value: 'Frm L Rot Fine' }
                , { order: '', value: 'Frm Left' }
                , { order: '', value: 'Frm Left Fine' }
                , { order: '', value: 'Frm Macro' }
                , { order: '', value: 'Frm Macro Size' }
                , { order: '', value: 'Frm Macro Speed' }
                , { order: '', value: 'Frm Preset' }
                , { order: '', value: 'Frm R' }
                , { order: '', value: 'Frm R Fade' }
                , { order: '', value: 'Frm R Fine' }
                , { order: '', value: 'Frm R Rot' }
                , { order: '', value: 'Frm R Rot Fine' }
                , { order: '', value: 'Frm Right' }
                , { order: '', value: 'Frm Right Fine' }
                , { order: '', value: 'Frm Rot' }
                , { order: '', value: 'Frm Rot Fine' }
                , { order: '', value: 'Frm Speed' }
                , { order: '', value: 'Frm T' }
                , { order: '', value: 'Frm T Fade' }
                , { order: '', value: 'Frm T Fine' }
                , { order: '', value: 'Frm T Rot' }
                , { order: '', value: 'Frm T Rot Fine' }
                , { order: '', value: 'Frm TLx' }
                , { order: '', value: 'Frm TLx Fine' }
                , { order: '', value: 'Frm TLy' }
                , { order: '', value: 'Frm TLy Fine' }
                , { order: '', value: 'Frm Top' }
                , { order: '', value: 'Frm Top Fine' }
                , { order: '', value: 'Frm TRx' }
                , { order: '', value: 'Frm TRx Fine' }
                , { order: '', value: 'Frm TRy' }
                , { order: '', value: 'Frm TRy Fine' }
                , { order: '', value: 'Front Film' }
                , { order: '', value: 'Front Film Fine' }
                , { order: 42, value: 'Frost' }
                , { order: '', value: 'Frost 1' }
                , { order: '', value: 'Frost 2' }
                , { order: '', value: 'Frost 3' }
                , { order: '', value: 'Frost Fine' }
                , { order: '', value: 'Frost Speed' }
                , { order: '', value: 'Function' }
                , { order: 46, value: 'FX' }
                , { order: '', value: 'FX 1' }
                , { order: '', value: 'FX 1 Ctrl' }
                , { order: '', value: 'FX 1 Rot' }
                , { order: '', value: 'FX 2' }
                , { order: '', value: 'FX 2 Ctrl' }
                , { order: '', value: 'FX 2 Rot' }
                , { order: '', value: 'FX 3' }
                , { order: '', value: 'FX 4' }
                , { order: '', value: 'FX 5' }
                , { order: '', value: 'FX 6' }
                , { order: '', value: 'FX 7' }
                , { order: '', value: 'FX 8' }
                , { order: '', value: 'FX 9' }
                , { order: '', value: 'FX Bank' }
                , { order: '', value: 'FX BG' }
                , { order: '', value: 'FX BG Dim' }
                , { order: '', value: 'FX BG Strobe' }
                , { order: '', value: 'FX Blue' }
                , { order: '', value: 'FX Color' }
                , { order: '', value: 'FX Ctrl' }
                , { order: '', value: 'FX Depth' }
                , { order: '', value: 'FX Dim' }
                , { order: '', value: 'FX Dir' }
                , { order: '', value: 'FX Fade' }
                , { order: '', value: 'FX Fnc' }
                , { order: '', value: 'FX Green' }
                , { order: '', value: 'FX Grouping' }
                , { order: '', value: 'FX Index' }
                , { order: '', value: 'FX Level' }
                , { order: '', value: 'FX Library' }
                , { order: '', value: 'FX Macro' }
                , { order: '', value: 'FX Noise' }
                , { order: '', value: 'FX Off' }
                , { order: '', value: 'FX Offset' }
                , { order: '', value: 'FX Page' }
                , { order: '', value: 'FX Par 1' }
                , { order: '', value: 'FX Par 2' }
                , { order: '', value: 'FX Par 3' }
                , { order: '', value: 'FX Par1' }
                , { order: '', value: 'FX Par1 Fine' }
                , { order: '', value: 'FX Par2' }
                , { order: '', value: 'FX Par2 Fine' }
                , { order: '', value: 'FX Par3' }
                , { order: '', value: 'FX Par3 Fine' }
                , { order: '', value: 'FX Par4' }
                , { order: '', value: 'FX Par4 Fine' }
                , { order: '', value: 'FX Par5' }
                , { order: '', value: 'FX Par6' }
                , { order: '', value: 'FX Param 1' }
                , { order: '', value: 'FX Param 2' }
                , { order: '', value: 'FX Param 3' }
                , { order: '', value: 'FX Pixel Size' }
                , { order: '', value: 'FX Pixels' }
                , { order: '', value: 'FX Red' }
                , { order: '', value: 'FX Restart' }
                , { order: '', value: 'FX Rot' }
                , { order: '', value: 'FX Rot1' }
                , { order: '', value: 'FX Rot2' }
                , { order: '', value: 'FX Scan' }
                , { order: '', value: 'FX Scratch' }
                , { order: '', value: 'FX Select' }
                , { order: '', value: 'FX Sepia' }
                , { order: '', value: 'FX Seq Step' }
                , { order: '', value: 'FX Sequence' }
                , { order: '', value: 'FX Size' }
                , { order: '', value: 'FX Speed' }
                , { order: '', value: 'FX Speed 1' }
                , { order: '', value: 'FX Speed 2' }
                , { order: '', value: 'FX Speed Assign' }
                , { order: '', value: 'FX Speed Fine' }
                , { order: '', value: 'FX Strobe' }
                , { order: '', value: 'FX Sync' }
                , { order: '', value: 'FX Trigger' }
                , { order: '', value: 'FX Vignette' }
                , { order: '', value: 'FX White' }
                , { order: '', value: 'FX XF Preset' }
                , { order: '', value: 'FX XF Preset Group' }
                , { order: '', value: 'FX XF Preset Param' }
                , { order: '', value: 'FX XFade' }
                , { order: '', value: 'FX1' }
                , { order: '', value: 'FX1 Ctrl' }
                , { order: '', value: 'FX1 Level' }
                , { order: '', value: 'FX1 Par 1' }
                , { order: '', value: 'FX1 Par 2' }
                , { order: '', value: 'FX1 Par 3' }
                , { order: '', value: 'FX1 Par1' }
                , { order: '', value: 'FX1 Par1 Fine' }
                , { order: '', value: 'FX1 Par10' }
                , { order: '', value: 'FX1 Par11' }
                , { order: '', value: 'FX1 Par12' }
                , { order: '', value: 'FX1 Par13' }
                , { order: '', value: 'FX1 Par14' }
                , { order: '', value: 'FX1 Par15' }
                , { order: '', value: 'FX1 Par16' }
                , { order: '', value: 'FX1 Par2' }
                , { order: '', value: 'FX1 Par2 Fine' }
                , { order: '', value: 'FX1 Par3' }
                , { order: '', value: 'FX1 Par3 Fine' }
                , { order: '', value: 'FX1 Par4' }
                , { order: '', value: 'FX1 Par4 Fine' }
                , { order: '', value: 'FX1 Par5' }
                , { order: '', value: 'FX1 Par5 Fine' }
                , { order: '', value: 'FX1 Par6' }
                , { order: '', value: 'FX1 Par6 Fine' }
                , { order: '', value: 'FX1 Par7' }
                , { order: '', value: 'FX1 Par7 Fine' }
                , { order: '', value: 'FX1 Par8' }
                , { order: '', value: 'FX1 Par8 Fine' }
                , { order: '', value: 'FX1 Par9' }
                , { order: '', value: 'FX1 Par9 Fine' }
                , { order: '', value: 'FX1 Rot' }
                , { order: '', value: 'FX1 Spd' }
                , { order: '', value: 'FX1Lev2Beat' }
                , { order: '', value: 'FX1P1toBeat' }
                , { order: '', value: 'FX1P2toBeat' }
                , { order: '', value: 'FX1P3toBeat' }
                , { order: '', value: 'FX2' }
                , { order: '', value: 'FX2 Ctrl' }
                , { order: '', value: 'FX2 Level' }
                , { order: '', value: 'FX2 Par 1' }
                , { order: '', value: 'FX2 Par 2' }
                , { order: '', value: 'FX2 Par 3' }
                , { order: '', value: 'FX2 Par1' }
                , { order: '', value: 'FX2 Par1 Fine' }
                , { order: '', value: 'FX2 Par10' }
                , { order: '', value: 'FX2 Par11' }
                , { order: '', value: 'FX2 Par12' }
                , { order: '', value: 'FX2 Par13' }
                , { order: '', value: 'FX2 Par14' }
                , { order: '', value: 'FX2 Par15' }
                , { order: '', value: 'FX2 Par16' }
                , { order: '', value: 'FX2 Par2' }
                , { order: '', value: 'FX2 Par2 Fine' }
                , { order: '', value: 'FX2 Par3' }
                , { order: '', value: 'FX2 Par3 Fine' }
                , { order: '', value: 'FX2 Par4' }
                , { order: '', value: 'FX2 Par4 Fine' }
                , { order: '', value: 'FX2 Par5' }
                , { order: '', value: 'FX2 Par5 Fine' }
                , { order: '', value: 'FX2 Par6' }
                , { order: '', value: 'FX2 Par6 Fine' }
                , { order: '', value: 'FX2 Par7' }
                , { order: '', value: 'FX2 Par7 Fine' }
                , { order: '', value: 'FX2 Par8' }
                , { order: '', value: 'FX2 Par8 Fine' }
                , { order: '', value: 'FX2 Par9' }
                , { order: '', value: 'FX2 Par9 Fine' }
                , { order: '', value: 'FX2 Rot' }
                , { order: '', value: 'FX2 Spd' }
                , { order: '', value: 'FX2Lev2Beat' }
                , { order: '', value: 'FX2P1toBeat' }
                , { order: '', value: 'FX2P2toBeat' }
                , { order: '', value: 'FX2P3toBeat' }
                , { order: '', value: 'FX3' }
                , { order: '', value: 'FX3 Par1' }
                , { order: '', value: 'FX3 Par1 Fine' }
                , { order: '', value: 'FX3 Par2' }
                , { order: '', value: 'FX3 Par2 Fine' }
                , { order: '', value: 'FX3 Par3' }
                , { order: '', value: 'FX3 Par3 Fine' }
                , { order: '', value: 'FX3 Par4' }
                , { order: '', value: 'FX3 Par4 Fine' }
                , { order: '', value: 'FX3 Par5' }
                , { order: '', value: 'FX3 Par5 Fine' }
                , { order: '', value: 'FX3 Par6' }
                , { order: '', value: 'FX3 Par6 Fine' }
                , { order: '', value: 'FX3 Par7' }
                , { order: '', value: 'FX3 Par7 Fine' }
                , { order: '', value: 'FX3 Par8' }
                , { order: '', value: 'FX3 Par8 Fine' }
                , { order: '', value: 'FX3 Par9' }
                , { order: '', value: 'FX3 Par9 Fine' }
                , { order: '', value: 'FX3 Rot' }
                , { order: '', value: 'FX4' }
                , { order: '', value: 'FX4 Par1' }
                , { order: '', value: 'FX4 Par1 Fine' }
                , { order: '', value: 'FX4 Par2' }
                , { order: '', value: 'FX4 Par2 Fine' }
                , { order: '', value: 'FX4 Par3' }
                , { order: '', value: 'FX4 Par3 Fine' }
                , { order: '', value: 'FX4 Par4' }
                , { order: '', value: 'FX4 Par4 Fine' }
                , { order: '', value: 'FX4 Rot' }
                , { order: '', value: 'FX5' }
                , { order: '', value: 'FX5 Par1' }
                , { order: '', value: 'FX5 Par2' }
                , { order: '', value: 'FX5 Par3' }
                , { order: '', value: 'FX5 Rot' }
                , { order: '', value: 'FX6 Rot' }
                , { order: '', value: 'FX7 Rot' }
                , { order: '', value: 'FX8 Rot' }
                , { order: '', value: 'FX9 Rot' }
                , { order: '', value: 'G Str Dur' }
                , { order: '', value: 'G Strobe' }
                , { order: '', value: 'Gain' }
                , { order: '', value: 'Gamma' }
                , { order: '', value: 'Gamma Col' }
                , { order: '', value: 'Gel' }
                , { order: '', value: 'Gel 1' }
                , { order: '', value: 'Gel 1 Fnc' }
                , { order: '', value: 'Gel 2' }
                , { order: '', value: 'Gel 2 Fnc' }
                , { order: '', value: 'Generator' }
                , { order: '', value: 'Generator Level' }
                , { order: '', value: 'Generator Par1' }
                , { order: '', value: 'Generator Par2' }
                , { order: '', value: 'Generator Par3' }
                , { order: '', value: 'Generator Par4' }
                , { order: '', value: 'Generator Par5' }
                , { order: '', value: 'Generator Par6' }
                , { order: '', value: 'Generator Par7' }
                , { order: '', value: 'Generator Par8' }
                , { order: '', value: 'Generator Par9' }
                , { order: '', value: 'GO' }
                , { order: 36, value: 'Gobo' }
                , { order: '', value: 'Gobo 1' }
                , { order: '', value: 'Gobo 1 Fine' }
                , { order: '', value: 'Gobo 1 Fnc' }
                , { order: '', value: 'Gobo 1 Fnc Fine' }
                , { order: '', value: 'Gobo 1 Ind' }
                , { order: '', value: 'Gobo 1 Ind Fine' }
                , { order: '', value: 'Gobo 1 Rot' }
                , { order: '', value: 'Gobo 1 Rot Fine' }
                , { order: '', value: 'Gobo 1 Rot Fnc' }
                , { order: '', value: 'Gobo 1 Rot/Index' }
                , { order: '', value: 'Gobo 1 Shake' }
                , { order: '', value: 'Gobo 1 Shk' }
                , { order: '', value: 'Gobo 1 Speed' }
                , { order: '', value: 'Gobo 2' }
                , { order: '', value: 'Gobo 2 Fine' }
                , { order: '', value: 'Gobo 2 Fnc' }
                , { order: '', value: 'Gobo 2 Fnc Fine' }
                , { order: '', value: 'Gobo 2 Ind' }
                , { order: '', value: 'Gobo 2 Ind Fine' }
                , { order: '', value: 'Gobo 2 Orient' }
                , { order: '', value: 'Gobo 2 Rot' }
                , { order: '', value: 'Gobo 2 Rot Fine' }
                , { order: '', value: 'Gobo 2 Rot Fnc' }
                , { order: '', value: 'Gobo 2 Rot/Index' }
                , { order: '', value: 'Gobo 2 Shake' }
                , { order: '', value: 'Gobo 2 Shk' }
                , { order: '', value: 'Gobo 3' }
                , { order: '', value: 'Gobo 3 Ind' }
                , { order: '', value: 'Gobo 3 Ind Fine' }
                , { order: '', value: 'Gobo 3 Rot' }
                , { order: '', value: 'Gobo 3 Rot Fine' }
                , { order: '', value: 'Gobo 3 Speed' }
                , { order: '', value: 'Gobo Bank' }
                , { order: '', value: 'Gobo Fine' }
                , { order: '', value: 'Gobo Fnc' }
                , { order: '', value: 'Gobo Ind' }
                , { order: '', value: 'Gobo Ind Fine' }
                , { order: '', value: 'Gobo Left' }
                , { order: '', value: 'Gobo Macro' }
                , { order: '', value: 'Gobo Mod' }
                , { order: '', value: 'Gobo Mode' }
                , { order: '', value: 'Gobo Right' }
                , { order: 37, value: 'Gobo Rot' }
                , { order: '', value: 'Gobo Rot Fine' }
                , { order: '', value: 'Gobo Rot Fnc' }
                , { order: '', value: 'Gobo Scale' }
                , { order: '', value: 'Gobo Scale Fine' }
                , { order: '', value: 'Gobo Shake' }
                , { order: '', value: 'Gobo Shk' }
                , { order: '', value: 'Gobo Shk Ampl' }
                , { order: '', value: 'Gobo Speed' }
                , { order: '', value: 'Gobo Time' }
                , { order: '', value: 'Gobo/Color' }
                , { order: '', value: 'Gobo/Color Fnc' }
                , { order: '', value: 'GoTo' }
                , { order: '', value: 'Grad' }
                , { order: '', value: 'Grad Fnc' }
                , { order: '', value: 'Grad Off X' }
                , { order: '', value: 'Grad Off Y' }
                , { order: '', value: 'Gradient Blue' }
                , { order: '', value: 'Gradient Green' }
                , { order: '', value: 'Gradient Red' }
                , { order: '', value: 'Graphics' }
                , { order: '', value: 'Gray' }
                , { order: 16, value: 'Green' }
                , { order: '', value: 'Green 1' }
                , { order: '', value: 'Green 2' }
                , { order: 17, value: 'Green Fine' }
                , { order: '', value: 'Green Laser' }
                , { order: '', value: 'Green Shift' }
                , { order: '', value: 'Green Tone' }
                , { order: '', value: 'GreenC' }
                , { order: '', value: 'Grid' }
                , { order: '', value: 'Group' }
                , { order: '', value: 'Groups' }
                , { order: '', value: 'Haze' }
                , { order: '', value: 'Head' }
                , { order: '', value: 'Head 1' }
                , { order: '', value: 'Head 1 Fine' }
                , { order: '', value: 'Head 2' }
                , { order: '', value: 'Head 2 Fine' }
                , { order: '', value: 'Head Fine' }
                , { order: '', value: 'Head Rot' }
                , { order: '', value: 'Head Rot Fine' }
                , { order: '', value: 'Head Speed' }
                , { order: '', value: 'Heavy Frost' }
                , { order: '', value: 'Height' }
                , { order: '', value: 'Height Fine' }
                , { order: '', value: 'Hot Spot' }
                , { order: '', value: 'Hotspot' }
                , { order: '', value: 'Hue' }
                , { order: '', value: 'Hue Fine' }
                , { order: '', value: 'ID' }
                , { order: '', value: 'Image' }
                , { order: '', value: 'Image Library' }
                , { order: '', value: 'Image Rot' }
                , { order: '', value: 'Image Speed' }
                , { order: '', value: 'Image XF Preset' }
                , { order: '', value: 'Image XF Preset Group' }
                , { order: '', value: 'Image XF Preset Param' }
                , { order: '', value: 'In Frm' }
                , { order: '', value: 'In Frm Fine' }
                , { order: '', value: 'Index' }
                , { order: '', value: 'Index Fine' }
                , { order: '', value: 'Indigo' }
                , { order: '', value: 'Indigo Dim' }
                , { order: '', value: 'Indigo Fnc' }
                , { order: '', value: 'IndigoC' }
                , { order: '', value: 'Info 1' }
                , { order: '', value: 'Info 2' }
                , { order: '', value: 'Info 3' }
                , { order: '', value: 'Input' }
                , { order: '', value: 'Input Fnc' }
                , { order: '', value: 'Int Fan' }
                , { order: 1, value: 'Intensity' }
                , { order: '', value: 'Intensity 01' }
                , { order: '', value: 'Intensity 02' }
                , { order: '', value: 'Intensity 03' }
                , { order: '', value: 'Intensity 04' }
                , { order: '', value: 'Intensity 05' }
                , { order: '', value: 'Intensity 1' }
                , { order: '', value: 'Intensity 1 Fine' }
                , { order: '', value: 'Intensity 2' }
                , { order: '', value: 'Intensity 2 Fine' }
                , { order: '', value: 'Intensity 3' }
                , { order: '', value: 'Intensity 4' }
                , { order: 2, value: 'Intensity Fine' }
                , { order: '', value: 'Intensity LED' }
                , { order: '', value: 'Intensity Max' }
                , { order: '', value: 'Intensity Min' }
                , { order: '', value: 'Intensity Speed' }
                , { order: '', value: 'Intensity Speed Fine' }
                , { order: '', value: 'Interval' }
                , { order: 43, value: 'Iris' }
                , { order: '', value: 'Iris Fine' }
                , { order: '', value: 'Iris Fnc' }
                , { order: '', value: 'Iris FX' }
                , { order: '', value: 'Iris Macro' }
                , { order: '', value: 'Iris Speed' }
                , { order: '', value: 'Kaleido' }
                , { order: '', value: 'Kaleido Speed' }
                , { order: '', value: 'Key Mode' }
                , { order: '', value: 'Kstn' }
                , { order: '', value: 'Kstn 1x' }
                , { order: '', value: 'Kstn 1x Fine' }
                , { order: '', value: 'Kstn 1y' }
                , { order: '', value: 'Kstn 1y Fine' }
                , { order: '', value: 'Kstn 2x' }
                , { order: '', value: 'Kstn 2x Fine' }
                , { order: '', value: 'Kstn 2y' }
                , { order: '', value: 'Kstn 2y Fine' }
                , { order: '', value: 'Kstn 3x' }
                , { order: '', value: 'Kstn 3x Fine' }
                , { order: '', value: 'Kstn 3y' }
                , { order: '', value: 'Kstn 3y Fine' }
                , { order: '', value: 'Kstn 4x' }
                , { order: '', value: 'Kstn 4x Fine' }
                , { order: '', value: 'Kstn 4y' }
                , { order: '', value: 'Kstn 4y Fine' }
                , { order: '', value: 'Kstn B' }
                , { order: '', value: 'Kstn B Fine' }
                , { order: '', value: 'Kstn B Pos' }
                , { order: '', value: 'Kstn B Pos Fine' }
                , { order: '', value: 'Kstn B Rot' }
                , { order: '', value: 'Kstn B Rot Fine' }
                , { order: '', value: 'Kstn Bot' }
                , { order: '', value: 'Kstn L' }
                , { order: '', value: 'Kstn L Fine' }
                , { order: '', value: 'Kstn L Pos' }
                , { order: '', value: 'Kstn L Pos Fine' }
                , { order: '', value: 'Kstn L Rot' }
                , { order: '', value: 'Kstn L Rot Fine' }
                , { order: '', value: 'Kstn Left' }
                , { order: '', value: 'Kstn Lin X' }
                , { order: '', value: 'Kstn Lin X Fine' }
                , { order: '', value: 'Kstn Lin Y' }
                , { order: '', value: 'Kstn Lin Y Fine' }
                , { order: '', value: 'Kstn Mode' }
                , { order: '', value: 'Kstn R' }
                , { order: '', value: 'Kstn R Fine' }
                , { order: '', value: 'Kstn R Pos' }
                , { order: '', value: 'Kstn R Pos Fine' }
                , { order: '', value: 'Kstn R Rot' }
                , { order: '', value: 'Kstn R Rot Fine' }
                , { order: '', value: 'Kstn Right' }
                , { order: '', value: 'Kstn Rot' }
                , { order: '', value: 'Kstn Rot Fine' }
                , { order: '', value: 'Kstn T' }
                , { order: '', value: 'Kstn T Fine' }
                , { order: '', value: 'Kstn T Pos' }
                , { order: '', value: 'Kstn T Pos Fine' }
                , { order: '', value: 'Kstn T Rot' }
                , { order: '', value: 'Kstn T Rot Fine' }
                , { order: '', value: 'Kstn Top' }
                , { order: '', value: 'Kstn X' }
                , { order: '', value: 'Kstn X Fine' }
                , { order: '', value: 'Kstn X Ratio' }
                , { order: '', value: 'Kstn X1' }
                , { order: '', value: 'Kstn X2' }
                , { order: '', value: 'Kstn X3' }
                , { order: '', value: 'Kstn X4' }
                , { order: '', value: 'Kstn Y' }
                , { order: '', value: 'Kstn Y Fine' }
                , { order: '', value: 'Kstn Y Ratio' }
                , { order: '', value: 'Kstn Y1' }
                , { order: '', value: 'Kstn Y2' }
                , { order: '', value: 'Kstn Y3' }
                , { order: '', value: 'Kstn Y4' }
                , { order: '', value: 'Lambency' }
                , { order: '', value: 'Lamp' }
                , { order: '', value: 'Lamp Ctrl' }
                , { order: '', value: 'Lamp Power' }
                , { order: '', value: 'Laser' }
                , { order: '', value: 'Laser Color' }
                , { order: '', value: 'Laser Rot' }
                , { order: '', value: 'Laser Strobe' }
                , { order: '', value: 'Layer' }
                , { order: '', value: 'Layer A' }
                , { order: '', value: 'Layer A Mix' }
                , { order: '', value: 'Layer A Opa' }
                , { order: '', value: 'Layer A Sub' }
                , { order: '', value: 'Layer B' }
                , { order: '', value: 'Layer B Mix' }
                , { order: '', value: 'Layer B Opa' }
                , { order: '', value: 'Layer B Sub' }
                , { order: '', value: 'Layer Mode' }
                , { order: '', value: 'LED Dim' }
                , { order: '', value: 'LED Fnc' }
                , { order: '', value: 'LED Freq' }
                , { order: '', value: 'LED FX' }
                , { order: '', value: 'LED Intensity' }
                , { order: '', value: 'LED Rot' }
                , { order: '', value: 'LED Speed' }
                , { order: '', value: 'LED Strobe' }
                , { order: '', value: 'Lens' }
                , { order: '', value: 'Lens 1' }
                , { order: '', value: 'Lens 2' }
                , { order: '', value: 'Lens Fine' }
                , { order: '', value: 'Lens Rot' }
                , { order: '', value: 'Lens Rot Fine' }
                , { order: '', value: 'Lens Shift' }
                , { order: '', value: 'Lens Speed' }
                , { order: '', value: 'Letters' }
                , { order: '', value: 'Level' }
                , { order: '', value: 'Lib 1 Fnc' }
                , { order: '', value: 'Lib 2 Fnc' }
                , { order: '', value: 'Library' }
                , { order: '', value: 'Library 1' }
                , { order: '', value: 'Library 2' }
                , { order: '', value: 'Lift' }
                , { order: '', value: 'Lift Ctrl' }
                , { order: '', value: 'Lift Fine' }
                , { order: '', value: 'Lift Speed' }
                , { order: '', value: 'Light Frost' }
                , { order: '', value: 'Lighting' }
                , { order: '', value: 'Lightness' }
                , { order: '', value: 'Lime' }
                , { order: '', value: 'Lime Fine' }
                , { order: '', value: 'LimeC' }
                , { order: '', value: 'Line Scan' }
                , { order: '', value: 'LiteSrce 1' }
                , { order: '', value: 'LiteSrce 2' }
                , { order: '', value: 'Live' }
                , { order: '', value: 'Live Input Select' }
                , { order: '', value: 'Live Mask' }
                , { order: '', value: 'Look' }
                , { order: '', value: 'LSG' }
                , { order: '', value: 'LuCr Center' }
                , { order: '', value: 'LuCr Smooth' }
                , { order: '', value: 'LuCr Width' }
                , { order: '', value: 'Luma Blue' }
                , { order: '', value: 'Luma Clip' }
                , { order: '', value: 'Luma Fill' }
                , { order: '', value: 'Luma Gain' }
                , { order: '', value: 'Luma Green' }
                , { order: '', value: 'Luma Invert' }
                , { order: '', value: 'Luma Red' }
                , { order: 44, value: 'Macro' }
                , { order: '', value: 'Macro 1' }
                , { order: '', value: 'Macro 2' }
                , { order: '', value: 'Macro Fade' }
                , { order: '', value: 'Macro Fnc' }
                , { order: '', value: 'Macro Framing' }
                , { order: '', value: 'Macro Offset' }
                , { order: '', value: 'Macro Restart' }
                , { order: '', value: 'Macro Spd' }
                , { order: '', value: 'Macro Speed' }
                , { order: '', value: 'Macro XFade' }
                , { order: 28, value: 'Magenta' }
                , { order: '', value: 'Magenta Brightness' }
                , { order: 29, value: 'Magenta Fine' }
                , { order: '', value: 'Magenta Fnc' }
                , { order: '', value: 'Magenta Spd' }
                , { order: '', value: 'Map Select A' }
                , { order: '', value: 'Map Select B' }
                , { order: '', value: 'Mapping' }
                , { order: '', value: 'Marker B' }
                , { order: '', value: 'Marker L' }
                , { order: '', value: 'Marker R' }
                , { order: '', value: 'Marker T' }
                , { order: '', value: 'Mask' }
                , { order: '', value: 'Mask Aspect' }
                , { order: '', value: 'Mask Bank' }
                , { order: '', value: 'Mask Blur' }
                , { order: '', value: 'Mask Center' }
                , { order: '', value: 'Mask Frost' }
                , { order: '', value: 'Mask Index' }
                , { order: '', value: 'Mask Lvl' }
                , { order: '', value: 'Mask Mode' }
                , { order: '', value: 'Mask Rot' }
                , { order: '', value: 'Mask Rot Fine' }
                , { order: '', value: 'Mask Scale' }
                , { order: '', value: 'Mask Scale Fine' }
                , { order: '', value: 'Mask Size' }
                , { order: '', value: 'Mask Smooth' }
                , { order: '', value: 'Mask Width' }
                , { order: '', value: 'Mask X' }
                , { order: '', value: 'Mask X Fine' }
                , { order: '', value: 'Mask Y' }
                , { order: '', value: 'Mask Y Fine' }
                , { order: '', value: 'Master 1' }
                , { order: '', value: 'Master 1 Fine' }
                , { order: '', value: 'Master 2' }
                , { order: '', value: 'Master 2 Fine' }
                , { order: '', value: 'Master 3' }
                , { order: '', value: 'Master 3 Fine' }
                , { order: '', value: 'Master 4' }
                , { order: '', value: 'Master 4 Fine' }
                , { order: '', value: 'Master 5' }
                , { order: '', value: 'Master 5 Fine' }
                , { order: '', value: 'Master Direction' }
                , { order: '', value: 'Master Speed' }
                , { order: '', value: 'Matrix' }
                , { order: '', value: 'Maxedia Out' }
                , { order: '', value: 'Med Frost' }
                , { order: '', value: 'Media' }
                , { order: '', value: 'Media Directory' }
                , { order: '', value: 'Media File' }
                , { order: '', value: 'Media Group' }
                , { order: '', value: 'Media Item' }
                , { order: '', value: 'Media Library' }
                , { order: '', value: 'Merging' }
                , { order: '', value: 'Mint' }
                , { order: '', value: 'Mint Fine' }
                , { order: '', value: 'MintC' }
                , { order: '', value: 'Mirror' }
                , { order: '', value: 'Mirror 1/2 + 4/5 Rot' }
                , { order: '', value: 'Mirror 2/3 + 5/6 Rot' }
                , { order: '', value: 'Mirror 3/4 + 6/1 Rot' }
                , { order: '', value: 'Mirror Rot' }
                , { order: '', value: 'Mirror Rot Fine' }
                , { order: '', value: 'Mirror Swivel' }
                , { order: '', value: 'Mix 1' }
                , { order: '', value: 'Mix 10' }
                , { order: '', value: 'Mix 11' }
                , { order: '', value: 'Mix 12' }
                , { order: '', value: 'Mix 13' }
                , { order: '', value: 'Mix 14' }
                , { order: '', value: 'Mix 15' }
                , { order: '', value: 'Mix 16' }
                , { order: '', value: 'Mix 17' }
                , { order: '', value: 'Mix 18' }
                , { order: '', value: 'Mix 19' }
                , { order: '', value: 'Mix 2' }
                , { order: '', value: 'Mix 20' }
                , { order: '', value: 'Mix 21' }
                , { order: '', value: 'Mix 22' }
                , { order: '', value: 'Mix 23' }
                , { order: '', value: 'Mix 24' }
                , { order: '', value: 'Mix 3' }
                , { order: '', value: 'Mix 4' }
                , { order: '', value: 'Mix 5' }
                , { order: '', value: 'Mix 6' }
                , { order: '', value: 'Mix 7' }
                , { order: '', value: 'Mix 8' }
                , { order: '', value: 'Mix 9' }
                , { order: '', value: 'Mix Level' }
                , { order: '', value: 'Mix Mode' }
                , { order: '', value: 'Mix Morph' }
                , { order: '', value: 'Mix Select' }
                , { order: '', value: 'Mixer A Page' }
                , { order: '', value: 'Mixer A Select' }
                , { order: '', value: 'Mixer B Page' }
                , { order: '', value: 'Mixer B Select' }
                , { order: '', value: 'Mixer Mode' }
                , { order: '', value: 'Mode' }
                , { order: '', value: 'Module' }
                , { order: '', value: 'Motor' }
                , { order: '', value: 'Motor Fine' }
                , { order: '', value: 'Motor FWD' }
                , { order: '', value: 'Motor REV' }
                , { order: '', value: 'Motor Speed' }
                , { order: '', value: 'Move' }
                , { order: '', value: 'Move Down' }
                , { order: '', value: 'Move Speed' }
                , { order: '', value: 'Move Up' }
                , { order: '', value: 'Movement' }
                , { order: '', value: 'Movement Fine' }
                , { order: '', value: 'Movie' }
                , { order: '', value: 'Movie Cue' }
                , { order: '', value: 'Movie Fnc' }
                , { order: '', value: 'Movie In' }
                , { order: '', value: 'Movie Offset' }
                , { order: '', value: 'Movie Out' }
                , { order: '', value: 'Movie Range' }
                , { order: '', value: 'Movie Rate' }
                , { order: '', value: 'MSpeed' }
                , { order: '', value: 'MTC Frm' }
                , { order: '', value: 'MTC Hour' }
                , { order: '', value: 'MTC Min' }
                , { order: '', value: 'MTC Sec' }
                , { order: '', value: 'ND' }
                , { order: '', value: 'Near' }
                , { order: '', value: 'Near Fine' }
                , { order: '', value: 'Negative' }
                , { order: '', value: 'Number' }
                , { order: '', value: 'Object' }
                , { order: '', value: 'Object 1' }
                , { order: '', value: 'Object 2' }
                , { order: '', value: 'Object 3' }
                , { order: '', value: 'Object 4' }
                , { order: '', value: 'Object File' }
                , { order: '', value: 'Object Folder' }
                , { order: '', value: 'Object Library' }
                , { order: '', value: 'Object XFade Angle' }
                , { order: '', value: 'Object XFade Fnc' }
                , { order: '', value: 'Object XFade Time' }
                , { order: '', value: 'Offset' }
                , { order: '', value: 'Offset X' }
                , { order: '', value: 'Offset X Fine' }
                , { order: '', value: 'Offset Y' }
                , { order: '', value: 'Offset Y Fine' }
                , { order: '', value: 'Opacity' }
                , { order: '', value: 'OpaqueA' }
                , { order: '', value: 'OpaqueB' }
                , { order: '', value: 'Orange' }
                , { order: '', value: 'OrangeC' }
                , { order: '', value: 'Orbit X' }
                , { order: '', value: 'Orbit X Fine' }
                , { order: '', value: 'Orbit Y' }
                , { order: '', value: 'Orbit Y Fine' }
                , { order: '', value: 'Orientation' }
                , { order: '', value: 'Out Frm' }
                , { order: '', value: 'Out Frm Fine' }
                , { order: '', value: 'Output' }
                , { order: '', value: 'Output A/B' }
                , { order: '', value: 'Output Text 1' }
                , { order: '', value: 'Output Text 2' }
                , { order: '', value: 'Output Texture 2-A' }
                , { order: '', value: 'Oval' }
                , { order: '', value: 'Oval Rot' }
                , { order: '', value: 'Ovalizer' }
                , { order: '', value: 'Page' }
                , { order: 5, value: 'Pan' }
                , { order: '', value: 'Pan 1' }
                , { order: '', value: 'Pan 1 Fine' }
                , { order: '', value: 'Pan 1+4' }
                , { order: '', value: 'Pan 2' }
                , { order: '', value: 'Pan 2+5' }
                , { order: '', value: 'Pan 3+6' }
                , { order: '', value: 'Pan Ampl' }
                , { order: '', value: 'Pan Far' }
                , { order: 6, value: 'Pan Fine' }
                , { order: '', value: 'Pan Freq' }
                , { order: '', value: 'Pan Jiggle' }
                , { order: '', value: 'Pan Max' }
                , { order: '', value: 'Pan Min' }
                , { order: '', value: 'Pan Mode' }
                , { order: 7, value: 'Pan Rot' }
                , { order: '', value: 'Pan Speed' }
                , { order: '', value: 'Pan Time' }
                , { order: '', value: 'Par 1' }
                , { order: '', value: 'Par 10' }
                , { order: '', value: 'Par 11' }
                , { order: '', value: 'Par 12' }
                , { order: '', value: 'Par 13' }
                , { order: '', value: 'Par 14' }
                , { order: '', value: 'Par 15' }
                , { order: '', value: 'Par 16' }
                , { order: '', value: 'Par 2' }
                , { order: '', value: 'Par 3' }
                , { order: '', value: 'Par 4' }
                , { order: '', value: 'Par 5' }
                , { order: '', value: 'Par 6' }
                , { order: '', value: 'Par 7' }
                , { order: '', value: 'Par 8' }
                , { order: '', value: 'Par 9' }
                , { order: '', value: 'Param Mix' }
                , { order: '', value: 'Path' }
                , { order: '', value: 'Patt 1 Speed' }
                , { order: '', value: 'Patt 2 Speed' }
                , { order: '', value: 'Patt BG Col' }
                , { order: '', value: 'Patt Col' }
                , { order: '', value: 'Pattern' }
                , { order: '', value: 'Pattern 1' }
                , { order: '', value: 'Pattern 1 Color' }
                , { order: '', value: 'Pattern 1 Draw Speed' }
                , { order: '', value: 'Pattern 1 Extend' }
                , { order: '', value: 'Pattern 1 Move' }
                , { order: '', value: 'Pattern 1 Rot XY' }
                , { order: '', value: 'Pattern 1 Rot Z' }
                , { order: '', value: 'Pattern 1 Size' }
                , { order: '', value: 'Pattern 1 Speed' }
                , { order: '', value: 'Pattern 1 Zoom' }
                , { order: '', value: 'Pattern 2' }
                , { order: '', value: 'Pattern 2 Color' }
                , { order: '', value: 'Pattern 2 Draw Speed' }
                , { order: '', value: 'Pattern 2 Extend' }
                , { order: '', value: 'Pattern 2 Move' }
                , { order: '', value: 'Pattern 2 Move Mode' }
                , { order: '', value: 'Pattern 2 Rot XY' }
                , { order: '', value: 'Pattern 2 Rot Z' }
                , { order: '', value: 'Pattern 2 Size' }
                , { order: '', value: 'Pattern 2 Zoom' }
                , { order: '', value: 'Pattern BG Dim' }
                , { order: '', value: 'Pattern Blue' }
                , { order: '', value: 'Pattern Dim' }
                , { order: '', value: 'Pattern Fade' }
                , { order: '', value: 'Pattern Fnc' }
                , { order: '', value: 'Pattern FX' }
                , { order: '', value: 'Pattern Green' }
                , { order: '', value: 'Pattern Group' }
                , { order: '', value: 'Pattern Ind' }
                , { order: '', value: 'Pattern Move' }
                , { order: '', value: 'Pattern Offset' }
                , { order: '', value: 'Pattern Pos' }
                , { order: '', value: 'Pattern Red' }
                , { order: '', value: 'Pattern Rot' }
                , { order: '', value: 'Pattern Rot Offset' }
                , { order: '', value: 'Pattern Size' }
                , { order: '', value: 'Pattern Spd' }
                , { order: '', value: 'Pattern Speed' }
                , { order: '', value: 'Pattern White' }
                , { order: '', value: 'Pattern X' }
                , { order: '', value: 'Pattern XFade' }
                , { order: '', value: 'Pattern Y' }
                , { order: '', value: 'Patterns' }
                , { order: '', value: 'Pause' }
                , { order: '', value: 'Pause Drk' }
                , { order: '', value: 'Pb Button' }
                , { order: '', value: 'Pb Button Page' }
                , { order: '', value: 'Persp Fnc' }
                , { order: '', value: 'Perspective' }
                , { order: '', value: 'Picasso' }
                , { order: '', value: 'Pitch' }
                , { order: '', value: 'Pitch Fine' }
                , { order: '', value: 'Pixel' }
                , { order: '', value: 'Pixel 1' }
                , { order: '', value: 'Pixel 10' }
                , { order: '', value: 'Pixel 2' }
                , { order: '', value: 'Pixel 3' }
                , { order: '', value: 'Pixel 4' }
                , { order: '', value: 'Pixel 5' }
                , { order: '', value: 'Pixel 6' }
                , { order: '', value: 'Pixel 7' }
                , { order: '', value: 'Pixel 8' }
                , { order: '', value: 'Pixel 9' }
                , { order: '', value: 'Pixel Fade' }
                , { order: '', value: 'Pixel Rot' }
                , { order: '', value: 'Pixel Speed' }
                , { order: '', value: 'PixelMap Preset' }
                , { order: '', value: 'PixMap Ctrl' }
                , { order: '', value: 'PixMap Level' }
                , { order: '', value: 'PixMap Sel' }
                , { order: '', value: 'Pl Min Green' }
                , { order: '', value: 'Play' }
                , { order: '', value: 'Play A' }
                , { order: '', value: 'Play B' }
                , { order: '', value: 'Play Fnc' }
                , { order: '', value: 'Play Mode' }
                , { order: '', value: 'Play Speed' }
                , { order: '', value: 'Play Speed Fnc' }
                , { order: '', value: 'Playback' }
                , { order: '', value: 'Player Ctrl' }
                , { order: '', value: 'Playhead' }
                , { order: '', value: 'Plugin Speed' }
                , { order: '', value: 'Point' }
                , { order: '', value: 'Point Speed' }
                , { order: '', value: 'Points' }
                , { order: '', value: 'Pos' }
                , { order: '', value: 'Pos Fine' }
                , { order: '', value: 'Position' }
                , { order: '', value: 'Position Fine' }
                , { order: '', value: 'Pre Heat' }
                , { order: '', value: 'Preset' }
                , { order: '', value: 'Preset 1' }
                , { order: '', value: 'Preset 2' }
                , { order: '', value: 'Preset 3' }
                , { order: '', value: 'Preset 4' }
                , { order: '', value: 'Preset Ctrl' }
                , { order: '', value: 'Preset Page' }
                , { order: '', value: 'Presets' }
                , { order: 38, value: 'Prism' }
                , { order: '', value: 'Prism 1' }
                , { order: '', value: 'Prism 1 Fnc' }
                , { order: '', value: 'Prism 1 Rot' }
                , { order: '', value: 'Prism 1 Rot Fine' }
                , { order: '', value: 'Prism 2' }
                , { order: '', value: 'Prism 2 Rot' }
                , { order: '', value: 'Prism 2 Rot Fine' }
                , { order: '', value: 'Prism 3' }
                , { order: '', value: 'Prism 3 Rot' }
                , { order: '', value: 'Prism 4' }
                , { order: '', value: 'Prism 4 Rot' }
                , { order: '', value: 'Prism Deviation' }
                , { order: '', value: 'Prism Fine' }
                , { order: '', value: 'Prism Fnc' }
                , { order: '', value: 'Prism Ind' }
                , { order: '', value: 'Prism Ind Fine' }
                , { order: '', value: 'Prism Macro' }
                , { order: '', value: 'Prism Move' }
                , { order: 39, value: 'Prism Rot' }
                , { order: '', value: 'Prism Rot Fine' }
                , { order: '', value: 'Prism Rot Fnc' }
                , { order: '', value: 'Prism Size' }
                , { order: '', value: 'Prism Speed' }
                , { order: '', value: 'Prism Zoom' }
                , { order: '', value: 'Profile' }
                , { order: '', value: 'Prog Speed' }
                , { order: '', value: 'Program' }
                , { order: '', value: 'Program 1' }
                , { order: '', value: 'Program 2' }
                , { order: '', value: 'Program Speed' }
                , { order: '', value: 'Programs' }
                , { order: '', value: 'Programs 1' }
                , { order: '', value: 'Programs 2' }
                , { order: '', value: 'Programs Speed' }
                , { order: '', value: 'Projector' }
                , { order: '', value: 'PT Ctrl' }
                , { order: '', value: 'PT Fnc' }
                , { order: '', value: 'PT Freq' }
                , { order: '', value: 'PT Macro' }
                , { order: '', value: 'PT Macro 1' }
                , { order: '', value: 'PT Macro 2' }
                , { order: '', value: 'PT Macro Spd' }
                , { order: '', value: 'PT Macro Speed' }
                , { order: '', value: 'PT Macro XFade' }
                , { order: '', value: 'PT Rot' }
                , { order: 11, value: 'PT Speed' }
                , { order: '', value: 'Pump' }
                , { order: '', value: 'Pwr' }
                , { order: '', value: 'R Str Dur' }
                , { order: '', value: 'R Strobe' }
                , { order: '', value: 'Radius' }
                , { order: '', value: 'Rainbow' }
                , { order: '', value: 'Range' }
                , { order: '', value: 'Rate' }
                , { order: '', value: 'Rate Fine' }
                , { order: '', value: 'Ray 1 Rot' }
                , { order: '', value: 'Ray 2 Rot' }
                , { order: '', value: 'Ray 3 Rot' }
                , { order: '', value: 'Ray 4 Rot' }
                , { order: '', value: 'Ray Fnc' }
                , { order: '', value: 'Ray Rot' }
                , { order: '', value: 'Rear Film' }
                , { order: '', value: 'Rear Film Fine' }
                , { order: 14, value: 'Red' }
                , { order: '', value: 'Red 1' }
                , { order: '', value: 'Red 2' }
                , { order: '', value: 'Red 3' }
                , { order: 15, value: 'Red Fine' }
                , { order: '', value: 'Red Laser' }
                , { order: '', value: 'Red Shift' }
                , { order: '', value: 'Red Tone' }
                , { order: '', value: 'RedC' }
                , { order: '', value: 'RedOrange' }
                , { order: '', value: 'Refl Rot' }
                , { order: '', value: 'Reg Map Sel' }
                , { order: '', value: 'Region Mapper' }
                , { order: '', value: 'Relay' }
                , { order: '', value: 'Release' }
                , { order: '', value: 'Remove' }
                , { order: '', value: 'Render' }
                , { order: '', value: 'Repeat' }
                , { order: '', value: 'Reset' }
                , { order: '', value: 'Resync' }
                , { order: '', value: 'Reticle' }
                , { order: '', value: 'Rewind Drk' }
                , { order: '', value: 'RGB Amount' }
                , { order: '', value: 'RGB Angle' }
                , { order: '', value: 'RGB Fnc' }
                , { order: '', value: 'RGB FX' }
                , { order: '', value: 'RGB Intensity' }
                , { order: '', value: 'RGB Macro' }
                , { order: '', value: 'RGB Out' }
                , { order: '', value: 'Ripple' }
                , { order: '', value: 'Ripple Speed' }
                , { order: '', value: 'Roll' }
                , { order: '', value: 'Roll Fine' }
                , { order: '', value: 'Rot' }
                , { order: '', value: 'Rot Angle' }
                , { order: '', value: 'Rot Fine' }
                , { order: '', value: 'Rot Fnc' }
                , { order: '', value: 'Rot Mode' }
                , { order: '', value: 'Rot Size' }
                , { order: '', value: 'Rot Speed' }
                , { order: '', value: 'Rot X' }
                , { order: '', value: 'Rot X Fine' }
                , { order: '', value: 'Rot Y' }
                , { order: '', value: 'Rot Y Fine' }
                , { order: '', value: 'Rot Z' }
                , { order: '', value: 'Rot Z Fine' }
                , { order: '', value: 'Rotate' }
                , { order: '', value: 'Rotate Fine' }
                , { order: '', value: 'Rotate LED' }
                , { order: '', value: 'Rotation' }
                , { order: '', value: 'Rotation Fine' }
                , { order: '', value: 'Rows' }
                , { order: '', value: 'Rsrvd' }
                , { order: '', value: 'Rsrvd 1' }
                , { order: '', value: 'Rsrvd 10' }
                , { order: '', value: 'Rsrvd 11' }
                , { order: '', value: 'Rsrvd 12' }
                , { order: '', value: 'Rsrvd 13' }
                , { order: '', value: 'Rsrvd 14' }
                , { order: '', value: 'Rsrvd 2' }
                , { order: '', value: 'Rsrvd 3' }
                , { order: '', value: 'Rsrvd 4' }
                , { order: '', value: 'Rsrvd 5' }
                , { order: '', value: 'Rsrvd 6' }
                , { order: '', value: 'Rsrvd 7' }
                , { order: '', value: 'Rsrvd 8' }
                , { order: '', value: 'Rsrvd 9' }
                , { order: '', value: 'Sat' }
                , { order: '', value: 'Sat Fine' }
                , { order: '', value: 'Saturation' }
                , { order: '', value: 'Saturation 1' }
                , { order: '', value: 'Saturation 2' }
                , { order: '', value: 'Scale' }
                , { order: '', value: 'Scale 1 Dim X' }
                , { order: '', value: 'Scale 1 Dim Y' }
                , { order: '', value: 'Scale 1 Off X' }
                , { order: '', value: 'Scale 1 Off Y' }
                , { order: '', value: 'Scale 2 Dim X' }
                , { order: '', value: 'Scale 2 Dim Y' }
                , { order: '', value: 'Scale 2 Off X' }
                , { order: '', value: 'Scale 2 Off Y' }
                , { order: '', value: 'Scale Fine' }
                , { order: '', value: 'Scan' }
                , { order: '', value: 'Scan Rate' }
                , { order: '', value: 'Scan Speed' }
                , { order: '', value: 'Scanner' }
                , { order: '', value: 'Scatter' }
                , { order: '', value: 'Scatter Fine' }
                , { order: '', value: 'Scene' }
                , { order: '', value: 'Screen' }
                , { order: '', value: 'Screen Ctrl' }
                , { order: '', value: 'Screen Preset' }
                , { order: '', value: 'Script Ampl' }
                , { order: '', value: 'Script Speed' }
                , { order: '', value: 'Scroll' }
                , { order: '', value: 'Scroll Fine' }
                , { order: '', value: 'Scroller' }
                , { order: '', value: 'Scroller 1' }
                , { order: '', value: 'Scroller 1 Fine' }
                , { order: '', value: 'Scroller 1 Speed' }
                , { order: '', value: 'Scroller 2' }
                , { order: '', value: 'Scroller 2 Fine' }
                , { order: '', value: 'Scroller 2 Speed' }
                , { order: '', value: 'Scroller Fine' }
                , { order: '', value: 'Scroller Speed' }
                , { order: '', value: 'Select Deck' }
                , { order: '', value: 'Sensitivity' }
                , { order: '', value: 'Sequence' }
                , { order: '', value: 'SftEdge B' }
                , { order: '', value: 'SftEdge B Curve' }
                , { order: '', value: 'SftEdge L' }
                , { order: '', value: 'SftEdge L Curve' }
                , { order: '', value: 'SftEdge R' }
                , { order: '', value: 'SftEdge R Curve' }
                , { order: '', value: 'SftEdge T' }
                , { order: '', value: 'SftEdge T Curve' }
                , { order: '', value: 'Shadow' }
                , { order: '', value: 'Shake' }
                , { order: '', value: 'Shake Spd' }
                , { order: '', value: 'Shape' }
                , { order: '', value: 'Shape Fine' }
                , { order: '', value: 'Shape Library' }
                , { order: '', value: 'Shape Rot' }
                , { order: '', value: 'Shape Rot Fine' }
                , { order: '', value: 'Shape Speed' }
                , { order: '', value: 'Shaper' }
                , { order: '', value: 'Shaper 1' }
                , { order: '', value: 'Shaper 2' }
                , { order: '', value: 'Shaper Fine' }
                , { order: '', value: 'Shaper Rot' }
                , { order: '', value: 'Shaper Rot Fine' }
                , { order: '', value: 'Shaper Size' }
                , { order: '', value: 'Shaper Size Fine' }
                , { order: '', value: 'Sharpness' }
                , { order: '', value: 'Shift' }
                , { order: '', value: 'Show' }
                , { order: '', value: 'Show Hs' }
                , { order: '', value: 'Show Os' }
                , { order: '', value: 'Show Ts' }
                , { order: '', value: 'Shtr Damp' }
                , { order: 4, value: 'Shutter' }
                , { order: '', value: 'Shutter 1' }
                , { order: '', value: 'Shutter 2' }
                , { order: '', value: 'Shutter 3' }
                , { order: '', value: 'Shutter 4' }
                , { order: '', value: 'Shutter Fnc' }
                , { order: '', value: 'Shutter Speed' }
                , { order: '', value: 'Shutter X' }
                , { order: '', value: 'Shutter X Fine' }
                , { order: '', value: 'Shutter Y' }
                , { order: '', value: 'Shutter Y Fine' }
                , { order: '', value: 'Signal' }
                , { order: '', value: 'Single' }
                , { order: '', value: 'Size' }
                , { order: '', value: 'Size Fine' }
                , { order: '', value: 'Size Mode' }
                , { order: '', value: 'Skip' }
                , { order: '', value: 'Skip A' }
                , { order: '', value: 'Skip B' }
                , { order: '', value: 'Slide' }
                , { order: '', value: 'Slide Group' }
                , { order: '', value: 'Smoothing' }
                , { order: '', value: 'Soft Edge' }
                , { order: '', value: 'SoftEdge Curve' }
                , { order: '', value: 'SoftEdge Width' }
                , { order: '', value: 'Solo' }
                , { order: '', value: 'Sound' }
                , { order: '', value: 'Source' }
                , { order: '', value: 'Source Type' }
                , { order: '', value: 'Special' }
                , { order: '', value: 'Speed' }
                , { order: '', value: 'Speed 1' }
                , { order: '', value: 'Speed 2' }
                , { order: '', value: 'Speed A' }
                , { order: '', value: 'Speed B' }
                , { order: '', value: 'Speed Eff 1' }
                , { order: '', value: 'Speed Eff 2' }
                , { order: '', value: 'Speed Eff 3' }
                , { order: '', value: 'Speed Eff 4' }
                , { order: '', value: 'Speed Text' }
                , { order: '', value: 'Spin' }
                , { order: '', value: 'SquashX' }
                , { order: '', value: 'SquashX Fine' }
                , { order: '', value: 'SquashY' }
                , { order: '', value: 'SquashY Fine' }
                , { order: '', value: 'Src' }
                , { order: '', value: 'Stars Speed' }
                , { order: '', value: 'Static Macro' }
                , { order: '', value: 'Step' }
                , { order: '', value: 'Strech' }
                , { order: 3, value: 'Strobe' }
                , { order: '', value: 'Strobe 1' }
                , { order: '', value: 'Strobe 2' }
                , { order: '', value: 'Strobe 3' }
                , { order: '', value: 'Strobe Blue' }
                , { order: '', value: 'Strobe Dur' }
                , { order: '', value: 'Strobe Fnc' }
                , { order: '', value: 'Strobe FX' }
                , { order: '', value: 'Strobe Green' }
                , { order: '', value: 'Strobe LED' }
                , { order: '', value: 'Strobe Red' }
                , { order: '', value: 'Strobe Speed' }
                , { order: '', value: 'Strobe White' }
                , { order: '', value: 'Sub A' }
                , { order: '', value: 'Sub B' }
                , { order: '', value: 'Sustain' }
                , { order: '', value: 'Sweep' }
                , { order: '', value: 'Symbol' }
                , { order: '', value: 'Symbol Fnc' }
                , { order: '', value: 'Symmetry' }
                , { order: '', value: 'Sync' }
                , { order: '', value: 'Sync Fnc' }
                , { order: '', value: 'Sync Offset' }
                , { order: '', value: 'Sync Stream' }
                , { order: '', value: 'Syncro' }
                , { order: '', value: 'Tap' }
                , { order: '', value: 'Target X' }
                , { order: '', value: 'Target X Fine' }
                , { order: '', value: 'Target Y' }
                , { order: '', value: 'Target Y Fine' }
                , { order: '', value: 'Target Z' }
                , { order: '', value: 'Target Z Fine' }
                , { order: '', value: 'TBar' }
                , { order: '', value: 'TC Flywheel' }
                , { order: '', value: 'TC Frm' }
                , { order: '', value: 'TC Hour' }
                , { order: '', value: 'TC Min' }
                , { order: '', value: 'TC Sec' }
                , { order: '', value: 'TC Shift' }
                , { order: '', value: 'TC Shift Fine' }
                , { order: '', value: 'TC Start Cs' }
                , { order: '', value: 'TC Start Hh' }
                , { order: '', value: 'TC Start Mm' }
                , { order: '', value: 'TC Start Ss' }
                , { order: '', value: 'Test' }
                , { order: '', value: 'Text' }
                , { order: '', value: 'Text Playmode' }
                , { order: '', value: 'Text Bookmark' }
                , { order: '', value: 'Text Direction' }
                , { order: '', value: 'Text Fade' }
                , { order: '', value: 'Text Fade Speed' }
                , { order: '', value: 'Text Mode' }
                , { order: '', value: 'Text Playmode' }
                , { order: '', value: 'Text Show' }
                , { order: '', value: 'Text Speed' }
                , { order: '', value: 'Text State' }
                , { order: '', value: 'Texture' }
                , { order: '', value: 'Texture Folder' }
                , { order: '', value: 'Texture XFade Fnc' }
                , { order: '', value: 'Texture XFade Time' }
                , { order: '', value: 'Tile' }
                , { order: '', value: 'Tile Mode' }
                , { order: '', value: 'Tile Overlap' }
                , { order: 8, value: 'Tilt' }
                , { order: '', value: 'Tilt 1' }
                , { order: '', value: 'Tilt 1 Fine' }
                , { order: '', value: 'Tilt 1 Rot' }
                , { order: '', value: 'Tilt 1 Spd' }
                , { order: '', value: 'Tilt 1+4' }
                , { order: '', value: 'Tilt 2' }
                , { order: '', value: 'Tilt 2 Fine' }
                , { order: '', value: 'Tilt 2 Rot' }
                , { order: '', value: 'Tilt 2 Spd' }
                , { order: '', value: 'Tilt 2+5' }
                , { order: '', value: 'Tilt 3' }
                , { order: '', value: 'Tilt 3+6' }
                , { order: '', value: 'Tilt 4' }
                , { order: '', value: 'Tilt Ampl' }
                , { order: '', value: 'Tilt Far' }
                , { order: 9, value: 'Tilt Fine' }
                , { order: '', value: 'Tilt Freq' }
                , { order: '', value: 'Tilt Jiggle' }
                , { order: '', value: 'Tilt Max' }
                , { order: '', value: 'Tilt Min' }
                , { order: '', value: 'Tilt Mode' }
                , { order: '', value: 'Tilt Offset' }
                , { order: 10, value: 'Tilt Rot' }
                , { order: '', value: 'Tilt Speed' }
                , { order: '', value: 'Tilt Speed CCW' }
                , { order: '', value: 'Tilt Speed CW' }
                , { order: '', value: 'Tilt Time' }
                , { order: '', value: 'Time' }
                , { order: '', value: 'Timecode' }
                , { order: '', value: 'Timecode Shift' }
                , { order: '', value: 'Timecode Shift Fine' }
                , { order: '', value: 'Timeline' }
                , { order: '', value: 'Tint' }
                , { order: '', value: 'Tint Fine' }
                , { order: '', value: 'Tolerance' }
                , { order: '', value: 'Toon' }
                , { order: '', value: 'Top Limit' }
                , { order: '', value: 'Track' }
                , { order: '', value: 'Trail' }
                , { order: '', value: 'Trails' }
                , { order: '', value: 'Trans Blend Mode' }
                , { order: '', value: 'Trans Time' }
                , { order: '', value: 'Transition' }
                , { order: '', value: 'Transition Blend Mode' }
                , { order: '', value: 'Transition Time' }
                , { order: '', value: 'Transition Timing' }
                , { order: '', value: 'Transmitter' }
                , { order: '', value: 'Transp Color' }
                , { order: '', value: 'Transparency' }
                , { order: '', value: 'Trigger' }
                , { order: '', value: 'Trigger 1' }
                , { order: '', value: 'Trigger 10' }
                , { order: '', value: 'Trigger 11' }
                , { order: '', value: 'Trigger 12' }
                , { order: '', value: 'Trigger 13' }
                , { order: '', value: 'Trigger 14' }
                , { order: '', value: 'Trigger 15' }
                , { order: '', value: 'Trigger 16' }
                , { order: '', value: 'Trigger 17' }
                , { order: '', value: 'Trigger 18' }
                , { order: '', value: 'Trigger 19' }
                , { order: '', value: 'Trigger 2' }
                , { order: '', value: 'Trigger 20' }
                , { order: '', value: 'Trigger 21' }
                , { order: '', value: 'Trigger 3' }
                , { order: '', value: 'Trigger 4' }
                , { order: '', value: 'Trigger 5' }
                , { order: '', value: 'Trigger 6' }
                , { order: '', value: 'Trigger 7' }
                , { order: '', value: 'Trigger 8' }
                , { order: '', value: 'Trigger 9' }
                , { order: '', value: 'Trigger Clip' }
                , { order: '', value: 'TV Mix' }
                , { order: '', value: 'TV Mono' }
                , { order: '', value: 'TVs Build' }
                , { order: '', value: 'Twinkle' }
                , { order: '', value: 'Up' }
                , { order: '', value: 'User Presets' }
                , { order: '', value: 'User Prog' }
                , { order: 24, value: 'UV' }
                , { order: '', value: 'UV 1' }
                , { order: '', value: 'UV 2' }
                , { order: '', value: 'UV 3' }
                , { order: 25, value: 'UV Fine' }
                , { order: '', value: 'UV Strobe' }
                , { order: '', value: 'Value' }
                , { order: '', value: 'Vector Mode' }
                , { order: '', value: 'Video' }
                , { order: '', value: 'Video Ctrl' }
                , { order: '', value: 'Video IN' }
                , { order: '', value: 'Video Input' }
                , { order: '', value: 'Video Map' }
                , { order: '', value: 'Video Map Enable' }
                , { order: '', value: 'Video Map Mixmode' }
                , { order: '', value: 'Video Map Select' }
                , { order: '', value: 'Video1 Ctrl' }
                , { order: '', value: 'View' }
                , { order: '', value: 'View X' }
                , { order: '', value: 'View X Fine' }
                , { order: '', value: 'View Y' }
                , { order: '', value: 'View Y Fine' }
                , { order: '', value: 'View Z' }
                , { order: '', value: 'View Z Fine' }
                , { order: '', value: 'Vignette' }
                , { order: '', value: 'Vis BG' }
                , { order: '', value: 'Vis Ctrl' }
                , { order: '', value: 'Volume' }
                , { order: '', value: 'Vwpnt Mode' }
                , { order: '', value: 'VX' }
                , { order: '', value: 'VX Par' }
                , { order: '', value: 'VX Par Fine' }
                , { order: '', value: 'VX Par1' }
                , { order: '', value: 'VX Par2' }
                , { order: '', value: 'W Str Dur' }
                , { order: '', value: 'W Strobe' }
                , { order: '', value: 'Warm' }
                , { order: '', value: 'Warm 1' }
                , { order: '', value: 'Warm 2' }
                , { order: '', value: 'Warm Fine' }
                , { order: '', value: 'Warm White' }
                , { order: '', value: 'Warp' }
                , { order: '', value: 'Warp A' }
                , { order: '', value: 'Warp B' }
                , { order: '', value: 'Warp Mix' }
                , { order: '', value: 'Warp Mode' }
                , { order: '', value: 'Warping' }
                , { order: '', value: 'Warping Par' }
                , { order: '', value: 'Warping Par Fine' }
                , { order: '', value: 'Wave' }
                , { order: '', value: 'Wave Fnc' }
                , { order: '', value: 'Wave Rot' }
                , { order: '', value: 'Wave Size' }
                , { order: '', value: 'Wave Spd' }
                , { order: '', value: 'Wave X' }
                , { order: '', value: 'Wave Y' }
                , { order: '', value: 'Waves' }
                , { order: '', value: 'WB' }
                , { order: '', value: 'WB Ctrl' }
                , { order: '', value: 'Weight' }
                , { order: '', value: 'Weight Fine' }
                , { order: 20, value: 'White' }
                , { order: '', value: 'White 1' }
                , { order: '', value: 'White 1 Fine' }
                , { order: '', value: 'White 2' }
                , { order: '', value: 'White 2 Fine' }
                , { order: '', value: 'White 3' }
                , { order: '', value: 'White 3 Fine' }
                , { order: '', value: 'White 4' }
                , { order: '', value: 'White 4 Fine' }
                , { order: '', value: 'White Balance' }
                , { order: '', value: 'White Ctrl' }
                , { order: '', value: 'White Ctrl Fine' }
                , { order: 21, value: 'White Fine' }
                , { order: '', value: 'White Fnc' }
                , { order: '', value: 'White FX' }
                , { order: '', value: 'White Peak' }
                , { order: '', value: 'WhiteC' }
                , { order: '', value: 'Width' }
                , { order: '', value: 'Width B' }
                , { order: '', value: 'Width Fine' }
                , { order: '', value: 'Width L' }
                , { order: '', value: 'Width R' }
                , { order: '', value: 'Width T' }
                , { order: '', value: 'Wipe' }
                , { order: '', value: 'X' }
                , { order: '', value: 'X Fade' }
                , { order: '', value: 'X Fine' }
                , { order: '', value: 'X Key' }
                , { order: '', value: 'X Linearity' }
                , { order: '', value: 'X Linearity Fine' }
                , { order: '', value: 'X Mode' }
                , { order: '', value: 'X Offset' }
                , { order: '', value: 'X Offset Fine' }
                , { order: '', value: 'X Persp' }
                , { order: '', value: 'X Persp Fine' }
                , { order: '', value: 'X Pos' }
                , { order: '', value: 'X Pos Fine' }
                , { order: '', value: 'X Pos Pre' }
                , { order: '', value: 'X Pos Speed' }
                , { order: '', value: 'X Rot' }
                , { order: '', value: 'X Rot Fine' }
                , { order: '', value: 'X Rot Pivot' }
                , { order: '', value: 'X Rot Pivot Fine' }
                , { order: '', value: 'X Rot Speed' }
                , { order: '', value: 'X Scale' }
                , { order: '', value: 'X Scale Fine' }
                , { order: '', value: 'X Scan' }
                , { order: '', value: 'X Scl Pivot' }
                , { order: '', value: 'X Scl Pivot Fine' }
                , { order: '', value: 'X Size' }
                , { order: '', value: 'X Size Fine' }
                , { order: '', value: 'X Size Pre' }
                , { order: '', value: 'X Speed' }
                , { order: '', value: 'X Speed Fine' }
                , { order: '', value: 'X Spin' }
                , { order: '', value: 'X Spread' }
                , { order: '', value: 'X Target' }
                , { order: '', value: 'X Target Fine' }
                , { order: '', value: 'X-Pos' }
                , { order: '', value: 'X-Pos Fine' }
                , { order: '', value: 'X1' }
                , { order: '', value: 'X1 Fine' }
                , { order: '', value: 'X2' }
                , { order: '', value: 'X2 Fine' }
                , { order: '', value: 'XFade' }
                , { order: '', value: 'XFade 1' }
                , { order: '', value: 'XFade 2' }
                , { order: '', value: 'XFade Angle' }
                , { order: '', value: 'XFade Cmd' }
                , { order: '', value: 'XFade Fine' }
                , { order: '', value: 'XFade Fnc' }
                , { order: '', value: 'XFade Frost' }
                , { order: '', value: 'XFade Mode' }
                , { order: '', value: 'XFade Speed' }
                , { order: '', value: 'XFade Time' }
                , { order: '', value: 'XFade Time Fine' }
                , { order: '', value: 'XSpeed' }
                , { order: '', value: 'XY Invert' }
                , { order: '', value: 'XY Scale' }
                , { order: '', value: 'XY Scale Pre' }
                , { order: '', value: 'Y' }
                , { order: '', value: 'Y Fine' }
                , { order: '', value: 'Y Key' }
                , { order: '', value: 'Y Linearity' }
                , { order: '', value: 'Y Linearity Fine' }
                , { order: '', value: 'Y Mode' }
                , { order: '', value: 'Y Offset' }
                , { order: '', value: 'Y Offset Fine' }
                , { order: '', value: 'Y Persp' }
                , { order: '', value: 'Y Persp Fine' }
                , { order: '', value: 'Y Pos' }
                , { order: '', value: 'Y Pos 1' }
                , { order: '', value: 'Y Pos 1 Fine' }
                , { order: '', value: 'Y Pos 2' }
                , { order: '', value: 'Y Pos 2 Fine' }
                , { order: '', value: 'Y Pos Fine' }
                , { order: '', value: 'Y Pos Pre' }
                , { order: '', value: 'Y Pos Speed' }
                , { order: '', value: 'Y Rot' }
                , { order: '', value: 'Y Rot Fine' }
                , { order: '', value: 'Y Rot Pivot' }
                , { order: '', value: 'Y Rot Pivot Fine' }
                , { order: '', value: 'Y Rot Speed' }
                , { order: '', value: 'Y Scale' }
                , { order: '', value: 'Y Scale Fine' }
                , { order: '', value: 'Y Scan' }
                , { order: '', value: 'Y Scl Pivot' }
                , { order: '', value: 'Y Scl Pivot Fine' }
                , { order: '', value: 'Y Size' }
                , { order: '', value: 'Y Size Fine' }
                , { order: '', value: 'Y Size Pre' }
                , { order: '', value: 'Y Speed' }
                , { order: '', value: 'Y Speed Fine' }
                , { order: '', value: 'Y Spin' }
                , { order: '', value: 'Y Spread' }
                , { order: '', value: 'Y Target' }
                , { order: '', value: 'Y Target Fine' }
                , { order: '', value: 'Y-Pos' }
                , { order: '', value: 'Y-Pos 1' }
                , { order: '', value: 'Y-Pos 1 Fine' }
                , { order: '', value: 'Y-Pos 2' }
                , { order: '', value: 'Y-Pos 2 Fine' }
                , { order: '', value: 'Y-Pos Fine' }
                , { order: '', value: 'Y1' }
                , { order: '', value: 'Y1 Fine' }
                , { order: '', value: 'Y1 Speed' }
                , { order: '', value: 'Y2' }
                , { order: '', value: 'Y2 Fine' }
                , { order: '', value: 'Y2 Speed' }
                , { order: '', value: 'Yaw' }
                , { order: '', value: 'Yaw Fine' }
                , { order: 30, value: 'Yellow' }
                , { order: 31, value: 'Yellow Fine' }
                , { order: '', value: 'Yellow Fnc' }
                , { order: '', value: 'Yellow Spd' }
                , { order: '', value: 'Z' }
                , { order: '', value: 'Z Fine' }
                , { order: '', value: 'Z Key' }
                , { order: '', value: 'Z Mode' }
                , { order: '', value: 'Z Pos' }
                , { order: '', value: 'Z Pos Fine' }
                , { order: '', value: 'Z Rot' }
                , { order: '', value: 'Z Rot Fine' }
                , { order: '', value: 'Z Rot Pivot' }
                , { order: '', value: 'Z Rot Pivot Fine' }
                , { order: '', value: 'Z Rot Speed' }
                , { order: '', value: 'Z Scale' }
                , { order: '', value: 'Z Scale Fine' }
                , { order: '', value: 'Z Scl Pivot' }
                , { order: '', value: 'Z Scl Pivot Fine' }
                , { order: '', value: 'Z Speed' }
                , { order: '', value: 'Z Speed Fine' }
                , { order: '', value: 'Z Spin' }
                , { order: '', value: 'Z Target' }
                , { order: '', value: 'Z Target Fine' }
                , { order: '', value: 'Z1' }
                , { order: '', value: 'Z2' }
                , { order: '', value: 'Zap' }
                , { order: 40, value: 'Zoom' }
                , { order: '', value: 'Zoom 1' }
                , { order: '', value: 'Zoom 2' }
                , { order: '', value: 'Zoom 3' }
                , { order: '', value: 'Zoom 4' }
                , { order: '', value: 'Zoom 5' }
                , { order: '', value: 'Zoom Bypass' }
                , { order: '', value: 'Zoom Fine' }
                , { order: '', value: 'Zoom Fnc' }
                , { order: '', value: 'Zoom FX' }
                , { order: '', value: 'Zoom Left' }
                , { order: '', value: 'Zoom Right' }
                , { order: '', value: 'Zoom Shk' }
                , { order: '', value: 'Zoom Speed' }
                , { order: '', value: 'Zoom Time' }
            ]
            data = ParamDMX
            //data.map(el => `(${el.order}, '${el.value}')`).join(',') //($name parameter)
            //let placeholders = data.map(() => `(?1, ?2)`).join(', ') //($name parameter)
            let placeholders = data.map(el => `(${(el.order) ? el.order : null}, '${el.value}')`).join(', ')

            let sql = `INSERT OR IGNORE INTO \`${config.Database.SearchParameter}\` ( \`${config.Form.Search.SearchParameter_order}\`, \`${config.Form.Search.SearchParameter_value}\`) VALUES ${placeholders}`
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