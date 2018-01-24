module.exports = {
	// Tool
		Version : 						'0.0.7',
	//Client Parameter
		HttpPort :						'8080',
	//Database Name
		Database : {
			Options :					'Options'
		},
	// Default Change
		ChangeRegex : {
			Channel :					'__CHANNEL__'
		},
	//Client Form Parameter
		Default : {
			All : 						'All',
			Any :						'Any',
			Infinity :					'∞'
		},
		Page : {
			Search : 					'Search',
			Options : 					'Options',
			Admin : 					'Admin'
		},
		Form : {
			Button : {
				Reset :					'reset',
				Submit :				'submit'
			},
			Search : {
				Form :							'SearchForm',
				Manufacturer :					'Manufacturer',
				FixtureName :					'FixtureName',
				DMXChannelCount :				'DMXChannelCount',
				DMXChannelCount_Btn_Add :		'DMXChannelCount_Add',
				DMXChannelCount_Btn_Rem :		'DMXChannelCount_Rem',
				DMXChannelCount_Max :			'DMXChannelCount_Max',
				DMXChannelCount_Max_Btn_Add :	'DMXChannelCount_Max_Add',
				DMXChannelCount_Max_Btn_Rem :	'DMXChannelCount_Max_Rem',
				BaseName_Channel :				'ch',
				BaseName_Wheel_Color :			'Color_Slot',
				BaseName_Wheel_Gobo :			'Gobo_Slot',
				BaseName_Wheel_Anim :			'Anim_Slot'
			},
			Option : {
				Form :						'OptionsForm',
				SearchMode :				'SearchMode',
				SearchMode_OrderExact :			'SearchMode_Order_Exact',
				SearchMode_OrderStart :			'SearchMode_Order_Start',
				SearchMode_UnOrderExact :		'SearchMode_UnOrder_Exact',
				SearchMode_UnOrderContain :		'SearchMode_UnOrder_Contain',
				DisplayMode :				'DisplayMode',
				DisplayMode_Full :				'DisplayMode_Full',
				DisplayMode_Simple :			'DisplayMode_Simple',
				ParameterList :				'ParameterList',
				ParameterList_Common :			'ParameterList_Common',
				ParameterList_Full :			'ParameterList_Full'
			},
			Admin : {
				Form :						'AdminForm',
				IngestAllLibraries :		'IngestAllLibraries',
				IngestAccessories :			'IngestAccessories',
				IngestFixture :				'IngestFixture',
				UpdateFixtureAccessories :	'UpdateFixtureAccessories',
				ComputeFixtureChangelog :	'ComputeFixtureChangelog',
				ExtractFixtureParameters :	'ExtractFixtureParameters',
				ComputeFFStats :			'ComputeFFStats',
				IngestFixturePresets :		'IngestFixturePresets',
				RenewSitemap :				'RenewSitemap',
				CacheCleanAll :				'CacheCleanAll',
				CacheFFChangelog :			'CacheFFChangelog',
				CacheLibraryChangelog :		'CacheLibraryChangelog',
				CacheFixtureList :			'CacheFixtureList',
				CacheFixture :				'CacheFixture',
				CacheSearch :				'CacheSearch',
				Password :					'Password'
			}
		},
		//Fixture Library Releases Message
		FixtureLibraryReleases : {
			'2014-07-14' :				'm-pc/2014-07-14-FixtureLibrary/',
			'2014-09-10' :				'm-pc/2014-09-10-FixtureLibrary/',
			'2014-11-01' :				'm-pc/2014-11-01-FixtureLibrary/',
			'2014-11-14' :				'm-pc/2014-11-14-FixtureLibrary/',
			'2015-02-23' :				'm-pc/2015-02-23-FixtureLibrary/',
			'2015-05-24' :				'm-pc/2015-05-24-FixtureLibrary/',
			'2015-06-20' :				'm-pc/2015-06-20-FixtureLibrary/',
			'2015-10-01' :				'm-pc/2015-10-01-FixtureLibrary/',
			'2015-12-17' :				'm-pc/2015-12-17-FixtureLibrary/',
			'2016-03-01' :				'm-pc/2016-03-01-FixtureLibrary/',
			'2016-07-11' :				'm-pc/2016-07-11-FixtureLibrary/',
			'2016-08-24' :				'm-pc/2016-08-24-FixtureLibrary/',
			'2016-10-17' :				'm-pc/2016-10-17-FixtureLibrary/',
			'2017-01-26' :				'm-pc/2017-01-26-FixtureLibrary/',
			'2017-04-06' :				'm-pc/2017-04-06-FixtureLibrary/',
			'2017-07-13' :				'm-pc/2017-07-13-FixtureLibrary/',
			'2017-09-17' :				'm-pc/2017-09-17-FixtureLibrary/',
			'2017-11-28' :				'm-pc/2017-11-28-FixtureLibrary/'
		},
		//Error Message
		ErrorMessage : {
			XMLExtensionInUpperCase :	'XML Extension file is in UPPERCASE: ',
			XMLFilenameNotSameCase :	'XML Filename has not the same Fixture folder name (case included): ',
			UnwantedXMLFileThere :		'This XML File is not expected to exists here: '
		},
	//Server Parameter
		SiteName : 				'Fixture Finder @nline',
	//Folders
		FolderMiddlewares : 	'middlewares',
		FolderRouters : 			'site_routers',
		FolderViews : 				'views',
		FolderDist : 					'dist',
		FolderPrivate : 			'private'
}
