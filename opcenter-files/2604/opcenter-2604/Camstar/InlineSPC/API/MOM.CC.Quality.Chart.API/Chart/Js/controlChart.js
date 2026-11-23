module.exports = function (callback,data,settingsData) {
    let siemensColors = {
        SiemensSnow: "#FFFFFF",
        PLBlack4: '#1E1E1E',
        SIEMENS_NATURAL_BLUE_DARK: "#006487",
        SIEMENS_BLUE_DARK: "#005F87",
        SIEMENS_STATUS_RED_DARK: "#DC0000",
        SIEMENS_STATUS_GREEN_DARK: "#0A9B00",
        SIEMENS_STATUS_GREEN_LIGHT: "#28E632",
        SiemensYellowDark: "#FFB900",
        SiemensBlue9: "#0F789B",
        SiemensBlueLight: "#50BED7",
        PL_BLACK_22: '#D2D2D2',
        SiemensBlue13: "#3296B9",
        PL_BLACK_19: '#B4B4B4',
        violationZone: 'red'
    };
    let chartSeriesColors = {
        Histogram: {
            Bin: siemensColors.SiemensBlue13,
            ToleranceLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            Xbb: siemensColors.SIEMENS_STATUS_GREEN_DARK,
            StandardDeviation: siemensColors.SIEMENS_NATURAL_BLUE_DARK
        },
        ControlChart: {
            ControlLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            WarningLimit: siemensColors.SiemensYellowDark,
            ToleranceLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            xbarProcess: siemensColors.SIEMENS_STATUS_GREEN_DARK,
            ProcessViolation: siemensColors.SIEMENS_STATUS_RED_DARK,
            xbarX: siemensColors.SiemensBlue9,
            Sr: siemensColors.SiemensBlue9,
            Marker: siemensColors.SIEMENS_STATUS_RED_DARK,
            InfoMarker: siemensColors.SiemensBlueLight,
            YellowMarker: siemensColors.SiemensYellowDark
        },
        SingleValueChart: {
            ControlLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            WarningLimit: siemensColors.SiemensYellowDark,
            ToleranceLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            Measurement: siemensColors.SiemensBlue9,
            xbp: siemensColors.SIEMENS_STATUS_GREEN_DARK,
            Marker: siemensColors.SIEMENS_STATUS_RED_DARK,
            YellowMarker: siemensColors.SiemensYellowDark
        },
        AttrControlChart: {
            ControlLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            WarningLimit: siemensColors.SiemensYellowDark,
            ToleranceLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            main: siemensColors.SiemensBlue9,
            Marker: siemensColors.SIEMENS_STATUS_RED_DARK,
            ProcessMeanValue: siemensColors.SIEMENS_STATUS_GREEN_DARK,
            localMeanValue: siemensColors.SIEMENS_STATUS_GREEN_LIGHT
        },
        ProbabilityPlot:
        {
            mainSeries: siemensColors.SiemensBlue9,
            slope: siemensColors.PLBlack4,
            ToleranceLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            StandardDeviation: siemensColors.SIEMENS_NATURAL_BLUE_DARK
        },
        Pareto:
        {
            DefectsCount: siemensColors.SIEMENS_BLUE_DARK,
            DefectsCounthover: siemensColors.SIEMENS_NATURAL_BLUE_DARK
        },
        CUSumChart:
        {
            CUSumLow: siemensColors.SiemensBlueLight,
            CUSumHigh: siemensColors.SIEMENS_BLUE_DARK,
            CUSumControlLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            CUSumMeanValue: siemensColors.SIEMENS_STATUS_GREEN_DARK
        },
        CUCountChart: {
            controlLimit: siemensColors.SIEMENS_STATUS_RED_DARK,
            meanValue: siemensColors.SIEMENS_STATUS_GREEN_DARK,
            mainSeries: siemensColors.SiemensBlue9
        }
    };
    let chartTypes = {
        xb_s: 1,
        mxb_ms: 2,
        xb_R: 3,
        mxb_mR: 4,
        x_ms: 5,
        x_mR: 6,
        xb: 7,
        s: 8,
        r: 9,
        hist_S: 10,
        //Histogram by Tolerance
        hist_T: 11,
        svc: 12,
        ms: 13,
        mR: 14,
        med: 15,
        med_R: 16,
        cu_Sum: 17,
        mxb: 18
    };
    let titleStyle = {
        fontSize: '15.5pt',
        color: siemensColors.PLBlack4
    };
    let axiesStyle = {
        fontSize: '7.5pt',
        color: siemensColors.PLBlack4
    };
    let axiesTitleStyle = {
        fontSize: '12.5pt',
        color: siemensColors.PLBlack4
    };
    let seriesIds = {
        singleValueChart: {
            ucl: 'ucl',
            lcl: 'lcl',
            uwl: 'uwl',
            lwl: 'lwl',
            utl: 'utl',
            ltl: 'ltl',
            xbp: 'xbp',
            measurement: 'measurements__1',
            flagSeries: 'flagSeries'
        },
        HistogramChart: {
            Classes: 'classes'
        },
        controlChart: {
            ucl1: 'ucl_1',
            lcl1: 'lcl_1',
            uwl1: 'uwl_1',
            lwl1: 'lwl_1',
            xbp1: 'xbp_1',
            series1: 'series__1',

            ucl2: 'ucl_2',
            lcl2: 'lcl_2',
            uwl2: 'uwl_2',
            lwl2: 'lwl_2',
            xbp2: 'xbp_2',
            series2: 'series__2',

            boxplot: 'boxplot', // this is for custom icon for boxplot
            boxplot_main: 'boxplot_main', // shouldn't be documented 
            toolChanged: 'tool_changed',
            measurement: 'measurement',
            flagSeries: 'flagSeries',
            SPCZoneA: 'SPC_ZONE_A',
            SPCZoneB1: 'SPC_ZONE_B1',
            SPCZoneB2: 'SPC_ZONE_B2',
            SPCZoneC1: 'SPC_ZONE_C1',
            SPCZoneC2: 'SPC_ZONE_C2'
        },
        visControlChart: {
            nonConformanceRate: 'nonConformanceRate',
            numberOfDefects: 'numberOfDefects',
            upperControlLimitOfControlChart1: 'ucl_vis'
        },
        cuSumChart: {
            cuSumLow: 'cuSumLow',
            cuSumHigh: 'cuSumHigh',
            cuSumUCL: 'cuSumUCL',
            cuSumLCL: 'cuSumLCL',
            cuSumCL: 'cuSumCL'
        },
        cuCountChart: {
            cuCount: 'cuCount',
            lcl: 'ucl',
            ucl: 'lcl',
            xbp: 'xbp'
        },
        AtributiveControlChart: {
            atributiveflagSeries: 'attrFlagSeries'
        }
    };
    let myData = JSON.parse(data);//{ "subgroups": [{ "referenceID": "0", "subgroupNumber": 0, "calculatedS": 0.07071067811866028, "calculatedR": 0.09999999999999987, "calculatedXb": 1.15, "calculatedMin": 1.1, "calculatedMax": 1.2, "statuses": [{ "category": "InvolvedByOther_1", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "InvolvedByOther_2", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "upperToleranceLimitAbs": 2.0, "lowerToleranceLimitAbs": 0.0, "upperControlLimit1Abs": 1.6, "lowerControlLimit1Abs": 0.4, "upperWarnLimit1Abs": 1.2, "lowerWarnLimit1Abs": 0.8, "upperControlLimit2Abs": 0.8, "lowerControlLimit2Abs": 0.1, "upperWarnLimit2Abs": 0.6, "lowerWarnLimit2Abs": 0.2, "calculatedProcessMeanValue1": 1.0, "calculatedProcessMeanValue2": 0.45, "processSigma": 0.5639804486777792, "initialSortNumber": 0, "boxPlot": [1.1, 1.1, 1.15, 1.2, 1.2], "cuSumHigh": null, "cuSumLow": null, "measurementStart": 0, "calculatedEWMA": null, "customInfo": null }, { "referenceID": "2", "subgroupNumber": 1, "calculatedS": 0.070710678118654, "calculatedR": 0.10000000000000009, "calculatedXb": 1.25, "calculatedMin": 1.2, "calculatedMax": 1.3, "statuses": [{ "category": "InvolvedByOther_1", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "InvolvedByOther_2", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "upperToleranceLimitAbs": 2.0, "lowerToleranceLimitAbs": 0.0, "upperControlLimit1Abs": 1.6, "lowerControlLimit1Abs": 0.4, "upperWarnLimit1Abs": 1.2, "lowerWarnLimit1Abs": 0.8, "upperControlLimit2Abs": 0.8, "lowerControlLimit2Abs": 0.1, "upperWarnLimit2Abs": 0.6, "lowerWarnLimit2Abs": 0.2, "calculatedProcessMeanValue1": 1.0, "calculatedProcessMeanValue2": 0.45, "processSigma": 0.5639804486777792, "initialSortNumber": 1, "boxPlot": [1.2, 1.2, 1.25, 1.3, 1.3], "cuSumHigh": null, "cuSumLow": null, "measurementStart": 0, "calculatedEWMA": null, "customInfo": null }, { "referenceID": "4", "subgroupNumber": 2, "calculatedS": 0.070710678118654, "calculatedR": 0.09999999999999998, "calculatedXb": 0.8500000000000001, "calculatedMin": 0.8, "calculatedMax": 0.9, "statuses": [{ "category": "Eliminated", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "upperToleranceLimitAbs": 2.0, "lowerToleranceLimitAbs": 0.0, "upperControlLimit1Abs": 1.6, "lowerControlLimit1Abs": 0.4, "upperWarnLimit1Abs": 1.2, "lowerWarnLimit1Abs": 0.8, "upperControlLimit2Abs": 0.8, "lowerControlLimit2Abs": 0.1, "upperWarnLimit2Abs": 0.6, "lowerWarnLimit2Abs": 0.2, "calculatedProcessMeanValue1": 1.0, "calculatedProcessMeanValue2": 0.45, "processSigma": 0.5639804486777792, "initialSortNumber": 2, "boxPlot": [0.8, 0.8, 0.8500000000000001, 0.9, 0.9], "cuSumHigh": null, "cuSumLow": null, "measurementStart": 0, "calculatedEWMA": null, "customInfo": null }, { "referenceID": "6", "subgroupNumber": 3, "calculatedS": 0.0, "calculatedR": 0.0, "calculatedXb": 1.1, "calculatedMin": 1.1, "calculatedMax": 1.1, "statuses": [{ "category": "RunHigh_1", "viewedPoints": 3, "points": 3, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "ProcessViolation_1", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "ProcessViolation_2", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "RunLow_2", "viewedPoints": 3, "points": 3, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "upperToleranceLimitAbs": 2.0, "lowerToleranceLimitAbs": 0.0, "upperControlLimit1Abs": 1.6, "lowerControlLimit1Abs": 0.4, "upperWarnLimit1Abs": 1.2, "lowerWarnLimit1Abs": 0.8, "upperControlLimit2Abs": 0.8, "lowerControlLimit2Abs": 0.1, "upperWarnLimit2Abs": 0.6, "lowerWarnLimit2Abs": 0.2, "calculatedProcessMeanValue1": 1.0, "calculatedProcessMeanValue2": 0.45, "processSigma": 0.5639804486777792, "initialSortNumber": 3, "boxPlot": [1.1, 1.1, 1.1, 1.1, 1.1], "cuSumHigh": null, "cuSumLow": null, "measurementStart": 0, "calculatedEWMA": null, "customInfo": null }], "measurements": [{ "referenceID": "0", "measuredValue": 1.1, "transformedMeasuredValue": 0.04139268515822508, "valueTimestamp": null, "statuses": [], "sequenceID": 1, "subgroupNumber": 0, "containerNo": null, "customInfo": [] }, { "referenceID": "1", "measuredValue": 1.2, "transformedMeasuredValue": 0.07918124604762482, "valueTimestamp": null, "statuses": [], "sequenceID": 2, "subgroupNumber": 0, "containerNo": null, "customInfo": [] }, { "referenceID": "2", "measuredValue": 1.3, "transformedMeasuredValue": 0.11394335230683679, "valueTimestamp": null, "statuses": [], "sequenceID": 3, "subgroupNumber": 1, "containerNo": null, "customInfo": [] }, { "referenceID": "3", "measuredValue": 1.2, "transformedMeasuredValue": 0.07918124604762482, "valueTimestamp": null, "statuses": [], "sequenceID": 4, "subgroupNumber": 1, "containerNo": null, "customInfo": [] }, { "referenceID": "4", "measuredValue": 0.8, "transformedMeasuredValue": -0.09691001300805639, "valueTimestamp": null, "statuses": [{ "category": "Eliminated", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "sequenceID": 5, "subgroupNumber": 2, "containerNo": null, "customInfo": [] }, { "referenceID": "5", "measuredValue": 0.9, "transformedMeasuredValue": -0.045757490560675115, "valueTimestamp": null, "statuses": [{ "category": "Eliminated", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "sequenceID": 6, "subgroupNumber": 2, "containerNo": null, "customInfo": [] }, { "referenceID": "6", "measuredValue": 1.1, "transformedMeasuredValue": 0.04139268515822508, "valueTimestamp": null, "statuses": [{ "category": "RunHigh_1", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "ProcessViolation_1", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "ProcessViolation_2", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "RunLow_2", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "sequenceID": 7, "subgroupNumber": 3, "containerNo": null, "customInfo": [] }, { "referenceID": "7", "measuredValue": 1.1, "transformedMeasuredValue": 0.04139268515822508, "valueTimestamp": null, "statuses": [{ "category": "RunHigh_1", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "ProcessViolation_1", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "ProcessViolation_2", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }, { "category": "RunLow_2", "viewedPoints": null, "points": null, "lowerPercentage": null, "upperPercentage": null, "zone": null, "direction": null, "area": null, "alternate": null }], "sequenceID": 8, "subgroupNumber": 3, "containerNo": null, "customInfo": [] }], "messages": [{ "level": "Warning", "messageShort": "CHI² test not possible", "messageLong": "Add more measurements to your request. CHI² test requires more the 50 measurements.", "code": 2016, "value": "The count is less than 50" }], "result": { "histogramClassesByS": [{ "count": 0, "percentage": 0.0, "lowerBorder": 0.7727956546007876 }, { "count": 0, "percentage": 0.0, "lowerBorder": 0.9303440594271393 }, { "count": 5, "percentage": 83.33333333333334, "lowerBorder": 1.0878924642534908 }, { "count": 1, "percentage": 16.666666666666664, "lowerBorder": 1.2454408690798424 }, { "count": 0, "percentage": 0.0, "lowerBorder": 1.402989273906194 }, { "count": 0, "percentage": 0.0, "lowerBorder": 1.5605376787325456 }], "histogramClassesByTolerances": [{ "count": 0, "percentage": 0.0, "lowerBorder": -0.6666666666666666 }, { "count": 0, "percentage": 0.0, "lowerBorder": 0.0 }, { "count": 6, "percentage": 100.0, "lowerBorder": 0.6666666666666666 }, { "count": 0, "percentage": 0.0, "lowerBorder": 1.3333333333333333 }, { "count": 0, "percentage": 0.0, "lowerBorder": 2.0 }], "bellCurvePointsS": [{ "xValue": 0.7727956546007876, "yValue": 5.78946382283401E-14 }, { "xValue": 0.7917014631799498, "yValue": 1.5240180778488382E-12 }, { "xValue": 0.8106072717591121, "yValue": 3.4157692681179015E-11 }, { "xValue": 0.8295130803382743, "yValue": 6.518288359679752E-10 }, { "xValue": 0.8484188889174366, "yValue": 1.0590714128890587E-08 }, { "xValue": 0.8673246974965988, "yValue": 1.4650874758340923E-07 }, { "xValue": 0.886230506075761, "yValue": 1.7256332500208806E-06 }, { "xValue": 0.9051363146549233, "yValue": 1.7305337706872657E-05 }, { "xValue": 0.9240421232340855, "yValue": 0.00014776047936164351 }, { "xValue": 0.9429479318132478, "yValue": 0.0010741950282726071 }, { "xValue": 0.96185374039241, "yValue": 0.006648973754546297 }, { "xValue": 0.9807595489715722, "yValue": 0.03504069677432547 }, { "xValue": 0.9996653575507345, "yValue": 0.15723074861065153 }, { "xValue": 1.0185711661298966, "yValue": 0.6006878740798168 }, { "xValue": 1.0374769747090589, "yValue": 1.9539204664689622 }, { "xValue": 1.056382783288221, "yValue": 5.4114236199064445 }, { "xValue": 1.0752885918673833, "yValue": 12.760356795132479 }, { "xValue": 1.0941944004465456, "yValue": 25.618915252188863 }, { "xValue": 1.1131002090257078, "yValue": 43.793059798422696 }, { "xValue": 1.13200601760487, "yValue": 63.73771315697342 }, { "xValue": 1.1509118261840323, "yValue": 78.983122427885 }, { "xValue": 1.1698176347631946, "yValue": 83.33333333333334 }, { "xValue": 1.1887234433423568, "yValue": 74.86000354149772 }, { "xValue": 1.207629251921519, "yValue": 57.2568651918948 }, { "xValue": 1.2265350605006813, "yValue": 37.286526204217694 }, { "xValue": 1.2454408690798435, "yValue": 20.673924017471307 }, { "xValue": 1.2643466776590058, "yValue": 9.759791534264712 }, { "xValue": 1.283252486238168, "yValue": 3.9228779918659065 }, { "xValue": 1.3021582948173303, "yValue": 1.342504328931465 }, { "xValue": 1.3210641033964925, "yValue": 0.3911769196997749 }, { "xValue": 1.3399699119756547, "yValue": 0.09704594298314144 }, { "xValue": 1.358875720554817, "yValue": 0.020498787825537837 }, { "xValue": 1.3777815291339792, "yValue": 0.0036865965320223753 }, { "xValue": 1.3966873377131415, "yValue": 0.0005645074452996192 }, { "xValue": 1.4155931462923037, "yValue": 7.359704414935834E-05 }, { "xValue": 1.434498954871466, "yValue": 8.169541897627283E-06 }, { "xValue": 1.4534047634506282, "yValue": 7.72114432749125E-07 }, { "xValue": 1.4723105720297904, "yValue": 6.213156183046628E-08 }, { "xValue": 1.4912163806089527, "yValue": 4.256861350828877E-09 }, { "xValue": 1.510122189188115, "yValue": 2.483209570914624E-10 }, { "xValue": 1.5290279977672772, "yValue": 1.2333430074034444E-11 }, { "xValue": 1.5479338063464394, "yValue": 5.215560797770636E-13 }, { "xValue": 1.5668396149256016, "yValue": 1.8778667957597164E-14 }, { "xValue": 1.5857454235047639, "yValue": 5.756721074226064E-16 }, { "xValue": 1.6046512320839261, "yValue": 1.50256139387538E-17 }, { "xValue": 1.6235570406630884, "yValue": 3.3391497699552785E-19 }, { "xValue": 1.6424628492422506, "yValue": 6.318095782510865E-21 }, { "xValue": 1.6613686578214129, "yValue": 1.0178485126349629E-22 }, { "xValue": 1.680274466400575, "yValue": 1.396132770818632E-24 }, { "xValue": 1.6991802749797373, "yValue": 1.6304854594250468E-26 }, { "xValue": 1.7180860835588996, "yValue": 1.6212641261310426E-28 }], "bellCurvePointsTolerances": [{ "xValue": -0.6666666666666666, "yValue": 0.0 }, { "xValue": -0.6, "yValue": 1.3343621177344962E-303 }, { "xValue": -0.5333333333333333, "yValue": 5.111951948873629E-281 }, { "xValue": -0.4666666666666667, "yValue": 2.650396553111521E-259 }, { "xValue": -0.4, "yValue": 1.8597132675456073E-238 }, { "xValue": -0.33333333333333337, "yValue": 1.766005927663767E-218 }, { "xValue": -0.2666666666666667, "yValue": 2.2696001981851924E-199 }, { "xValue": -0.20000000000000007, "yValue": 3.947458751962923E-181 }, { "xValue": -0.13333333333333341, "yValue": 9.291736316563344E-164 }, { "xValue": -0.06666666666666675, "yValue": 2.9599691800479714E-147 }, { "xValue": -8.326672684688674E-17, "yValue": 1.2761112507481044E-131 }, { "xValue": 0.06666666666666658, "yValue": 7.445620940186437E-117 }, { "xValue": 0.13333333333333325, "yValue": 5.879282698340053E-103 }, { "xValue": 0.1999999999999999, "yValue": 6.282880511327895E-90 }, { "xValue": 0.26666666666666655, "yValue": 9.086660323590418E-78 }, { "xValue": 0.3333333333333332, "yValue": 1.778528476145744E-66 }, { "xValue": 0.39999999999999986, "yValue": 4.711165801595136E-56 }, { "xValue": 0.4666666666666665, "yValue": 1.6889118802369516E-46 }, { "xValue": 0.5333333333333332, "yValue": 8.194012624039824E-38 }, { "xValue": 0.5999999999999999, "yValue": 5.380186160046939E-30 }, { "xValue": 0.6666666666666665, "yValue": 4.780892883903266E-23 }, { "xValue": 0.7333333333333332, "yValue": 5.749522264309489E-17 }, { "xValue": 0.7999999999999998, "yValue": 9.357622968858686E-12 }, { "xValue": 0.8666666666666665, "yValue": 2.0611536224412515E-07 }, { "xValue": 0.9333333333333331, "yValue": 0.0006144212353332964 }, { "xValue": 0.9999999999999998, "yValue": 0.24787521766672904 }, { "xValue": 1.0666666666666664, "yValue": 13.533528323662841 }, { "xValue": 1.133333333333333, "yValue": 99.999999999999 }, { "xValue": 1.1999999999999997, "yValue": 100.0 }, { "xValue": 1.2666666666666664, "yValue": 13.533528323663244 }, { "xValue": 1.333333333333333, "yValue": 0.24787521766674156 }, { "xValue": 1.3999999999999997, "yValue": 0.0006144212353333401 }, { "xValue": 1.4666666666666663, "yValue": 2.0611536224414418E-07 }, { "xValue": 1.533333333333333, "yValue": 9.357622968859716E-12 }, { "xValue": 1.5999999999999996, "yValue": 5.749522264310265E-17 }, { "xValue": 1.6666666666666663, "yValue": 4.7808928839039795E-23 }, { "xValue": 1.733333333333333, "yValue": 5.380186160047857E-30 }, { "xValue": 1.7999999999999996, "yValue": 8.194012624041338E-38 }, { "xValue": 1.8666666666666663, "yValue": 1.688911880237312E-46 }, { "xValue": 1.933333333333333, "yValue": 4.7111658015962065E-56 }, { "xValue": 1.9999999999999996, "yValue": 1.7785284761461486E-66 }, { "xValue": 2.0666666666666664, "yValue": 9.086660323591708E-78 }, { "xValue": 2.1333333333333333, "yValue": 6.282880511328788E-90 }, { "xValue": 2.2, "yValue": 5.879282698340053E-103 }, { "xValue": 2.266666666666667, "yValue": 7.445620940186013E-117 }, { "xValue": 2.333333333333334, "yValue": 1.2761112507477416E-131 }, { "xValue": 2.400000000000001, "yValue": 2.9599691800467933E-147 }, { "xValue": 2.4666666666666677, "yValue": 9.291736316559648E-164 }, { "xValue": 2.5333333333333345, "yValue": 3.94745875196023E-181 }, { "xValue": 2.6000000000000014, "yValue": 2.269600198183516E-199 }, { "xValue": 2.6666666666666683, "yValue": 1.7660059276619602E-218 }], "igcCalculation": false, "probabilityPlot": { "measurements": [{ "value": 1.1, "yCoordinate": 34.62497974491256, "xCoordinate": 1.1 }, { "value": 1.1, "yCoordinate": 42.17796183893372, "xCoordinate": 1.1 }, { "value": 1.1, "yCoordinate": 47.54089122640337, "xCoordinate": 1.1 }, { "value": 1.2, "yCoordinate": 52.45910877359663, "xCoordinate": 1.2 }, { "value": 1.2, "yCoordinate": 57.82203816106628, "xCoordinate": 1.2 }, { "value": 1.3, "yCoordinate": 65.37502025508743, "xCoordinate": 1.3 }], "yAxis": [{ "value": 0.0, "name": null }, { "value": 0.0, "name": null }, { "value": 3.510946297538803, "name": "0,01" }, { "value": 11.368472177747863, "name": "0,1" }, { "value": 20.91518334301292, "name": "1" }, { "value": 20.91518334301292, "name": "1" }, { "value": 29.434856998202303, "name": "5" }, { "value": 33.978390543716145, "name": "10" }, { "value": 39.48179103306521, "name": "20" }, { "value": 43.4499766202165, "name": "30" }, { "value": 50.00000126258344, "name": "50" }, { "value": 50.00000126258344, "name": "50" }, { "value": 53.16166584783228, "name": "60" }, { "value": 56.5500233797835, "name": "70" }, { "value": 60.51820896693479, "name": "80" }, { "value": 70.56514300179771, "name": "95" }, { "value": 79.08481665698707, "name": "99" }, { "value": 79.08481665698707, "name": "99" }, { "value": 88.63152782225234, "name": "99,9" }, { "value": 96.48905370245959, "name": "99,99" }], "xMinValue": -0.125, "xMaxValue": 2.125, "resultLineY1": 0.0, "resultLineY2": 100.0, "resultLineX1": 0.7604715817919502, "resultLineX2": 1.5728617515413834, "xAxisIsLogarithmic": false, "correlationCoefficient": 0.9119952243617928, "gradient": 123.09356233451616, "intercept": -93.60915605693553, "showProbabilityPlotTolerances": true, "showProbabilityPlotSLines": true, "currentUpperToleranceLimitAbs": 2.0, "currentLowerToleranceLimitAbs": 0.0, "p99": 1.4029892739061942, "p0_13": 0.9303440594271393, "shiftValues": 0.0 }, "letianceAnalysis": null, "listOfCalculations": [{ "inStandardDeviationRange": 2.0, "inStandardDeviationRangePercentage": 33.33333333333333, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 2.0, "inSigmaRangePercentage": 33.33333333333333, "lowerStandardDeviation": 1.1075860148567849, "upperStandardDeviation": 1.2257473184765486 }, { "inStandardDeviationRange": 3.0, "inStandardDeviationRangePercentage": 50.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 5.0, "inSigmaRangePercentage": 83.33333333333333, "lowerStandardDeviation": 1.048505363046903, "upperStandardDeviation": 1.2848279702864305 }, { "inStandardDeviationRange": 1.0, "inStandardDeviationRangePercentage": 16.666666666666664, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 6.0, "inSigmaRangePercentage": 100.0, "lowerStandardDeviation": 0.9894247112370211, "upperStandardDeviation": 1.3439086220963123 }, { "inStandardDeviationRange": 0.0, "inStandardDeviationRangePercentage": 0.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 6.0, "inSigmaRangePercentage": 100.0, "lowerStandardDeviation": 0.9303440594271393, "upperStandardDeviation": 1.4029892739061942 }, { "inStandardDeviationRange": 0.0, "inStandardDeviationRangePercentage": 0.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 6.0, "inSigmaRangePercentage": 100.0, "lowerStandardDeviation": 0.8712634076172574, "upperStandardDeviation": 1.462069925716076 }, { "inStandardDeviationRange": 0.0, "inStandardDeviationRangePercentage": 0.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 6.0, "inSigmaRangePercentage": 100.0, "lowerStandardDeviation": 0.8121827558073754, "upperStandardDeviation": 1.5211505775259582 }, { "inStandardDeviationRange": 0.0, "inStandardDeviationRangePercentage": 0.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 0.0, "inSigmaRangePercentage": 0.0, "lowerStandardDeviation": 0.7531021039974936, "upperStandardDeviation": 1.58023122933584 }, { "inStandardDeviationRange": 0.0, "inStandardDeviationRangePercentage": 0.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 0.0, "inSigmaRangePercentage": 0.0, "lowerStandardDeviation": 0.6940214521876117, "upperStandardDeviation": 1.639311881145722 }, { "inStandardDeviationRange": 0.0, "inStandardDeviationRangePercentage": 0.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 0.0, "inSigmaRangePercentage": 0.0, "lowerStandardDeviation": 0.6349408003777298, "upperStandardDeviation": 1.6983925329556038 }, { "inStandardDeviationRange": 0.0, "inStandardDeviationRangePercentage": 0.0, "countOfGreaterStandardDeviation": 0.0, "countOfGreaterStandardDeviationPercentage": 0.0, "countOfGreaterNegativeStandardDeviation": 0.0, "countOfGreaterNegativeStandardDeviationPercentage": 0.0, "countOfGreaterPositiveStandardDeviation": 0.0, "countOfGreaterPositiveStandardDeviationPercentage": 0.0, "inSigmaRange": 0.0, "inSigmaRangePercentage": 0.0, "lowerStandardDeviation": 0.575860148567848, "upperStandardDeviation": 1.7574731847654856 }], "distributionValuesModels": null, "processValues": { "calculatedSb": 0.04714045207910476, "calculatedRb": 0.06666666666666665, "calculatedXbb": 1.1666666666666667, "calculatedMin": 1.1, "calculatedMax": 1.3, "cp": 5.642005007087272, "cpk": 4.7016708392393936, "processIsUnderControl": false, "processIsCapable": false, "countOfValidValues": 6, "countOfValidValuesInPercent": 75.0, "sigmaEstimated": 0.05908065180988188, "processSigma": 0.0, "countOfValuesLessThanLowerTolerance": 0.0, "countOfValuesLargerThanUpperTolerance": 0.0, "countOfValuesLessThanLowerToleranceInPercent": 0.0, "countOfValuesLargerThanUpperToleranceInPercent": 0.0, "countOfValuesOutOfTolerance": 0.0, "range": 0.19999999999999996, "maxXb": 1.25, "minXb": 1.1, "probabilityOfValuesLargerThanUpperToleranceInPercent": 0.0, "probabilityOfValuesLessThanLowerToleranceInPercent": 0.0, "meanModification": 0.0, "p99": 1.4029892739061942, "p0_13": 0.9303440594271393 }, "chi2Test": { "classWidthForChi": 0.0, "sumOfChi": 0.0, "limitValueForChi": 0.0, "classCountForChi": 0, "chiLow": 1, "chiTestOk": false }, "tTest": { "tTestOk": false, "tTestCriticalValue": 0.0, "tTestCalculatedValue": 0.0 }, "zTest": { "zTestOk": false, "zTestCriticalValue": 0.0, "zTestCalculatedValue": 0.0 }, "fTest": { "fTestOk": false, "fTestCriticalValue": 0.0, "fTestCalculatedValue": 0.0, "fTestCriticalValueBottom": 0.0, "fTestCriticalValueTop": 0.0 }, "uTest": { "uTestOk": false, "uTestCriticalValue": 0.0, "uTestCalculatedValue": 0.0 }, "shapiroWilkTest": { "shapiroWilkTestOk": false, "shapiroWilkTestCriticalValue": 0.0, "shapiroWilkTestCalculatedValue": 0.0 }, "kolmogorowTest": { "kolmogorowTestOk": false, "kolmogorowTestCriticalValue": 0.0, "kolmogorowTestCalculatedValue": 0.0, "kolmogorowTestValueTable": null }, "minimumNumberOfMeasurements": { "minimumNumberOfMeasurements": 0, "minimumNumberOfSubgroups": 0 }, "cumulatedSumValues": { "upperControlLimit": 0.32659863237109854, "lowerControlLimit": -0.32659863237109854, "allowableSlack": 0.04082482904638732, "maxCumulatedSumHigh": 0.0, "minCumulatedSumLow": 0.0 }, "controlLimits": { "currentUpperControlLimit1Abs": null, "currentLowerControlLimit1Abs": null, "currentUpperWarnLimit1Abs": null, "currentLowerWarnLimit1Abs": null, "currentUpperControlLimit2Abs": null, "currentLowerControlLimit2Abs": null, "currentUpperWarnLimit2Abs": null, "currentLowerWarnLimit2Abs": null, "currentProcessMeanValue1": null, "currentProcessMeanValue2": null } }, "specifications": { "distributionType": null, "controlChartType": "xb_s", "limitationType": null, "averageMovingMeanType": null, "evaluationType": null, "capabilityStudyType": null, "controlLimitCalculationType": "Xbb", "limit": null, "currentNominalValue": 1.0, "currentUpperToleranceLimitAbs": 2.0, "currentLowerToleranceLimitAbs": 0.0, "defectRate": null, "probabilityOfAction": null, "cL_L_Percent": null, "cL_U_Percent": null, "wL_L_Percent": null, "wL_U_Percent": null, "confidenceInterval": 4, "controlLimits": { "currentUpperControlLimit1Abs": 1.6, "currentLowerControlLimit1Abs": 0.4, "currentUpperWarnLimit1Abs": 1.2, "currentLowerWarnLimit1Abs": 0.8, "currentUpperControlLimit2Abs": 0.8, "currentLowerControlLimit2Abs": 0.1, "currentUpperWarnLimit2Abs": 0.6, "currentLowerWarnLimit2Abs": 0.2, "currentProcessMeanValue1": 1.0, "currentProcessMeanValue2": 0.45 }, "weightingFactor": null, "subsetSize": null, "movingMeanWeighting": null, "calculateCUSumChart": false, "target": null, "type": 0, "subgroupSize": 2 } };
    let parsedSettingsData = JSON.parse(settingsData);
    let Highcharts = {
        uiLocale: {
            en: {
                "Chi2Test": "Chi² Test",
                "Eliminated": "Sample eliminated",
                "EliminatedByCalculation": "Sample is automatically eliminated",
                "USL": "Upper Specification Limit",
                "LSL": "Lower Specification Limit",
                //violations
                "UCL_1": "Upper CL (CC1)",
                "LCL_1": "Lower CL (CC1)",
                "UWL_1": "Upper WL (CC1)",
                "LWL_1": "Lower WL (CC1)",
                "Specification": "Specification",
                "TrendUp_1": "Trend up (CC1)",
                "TrendDown_1": "Trend down (CC1)",
                "RunHigh_1": "Run up (CC1)",
                "RunLow_1": "Run down (CC1)",
                "MiddleThird": "Middlethird",
                "ProcessViolation_1": "Process violation in CC1",
                "Zone": "Generic Zone",
                "ZoneRule01": "Zone Rule #1",
                "ZoneRule02": "Zone Rule #2",
                "ZoneRule03": "Zone Rule #3",
                "ZoneRule04": "Zone Rule #4",
                "ZoneRule05": "Zone Rule #5",
                "ZoneRule06": "Zone Rule #6",
                "ZoneRule07": "Zone Rule #7",
                "ZoneRule08": "Zone Rule #8",
                "ZoneRule09": "Zone Rule #9",
                "ZoneRule10": "Zone Rule #10",
                "AboveZone": "Above Zone",
                "BelowZone": "Below Zone",

                "Changed": "Values have been changed",
                "Outlier": "Sample contains outlier",
                "UCL_2": "Upper CL (CC2)",
                "LCL_2": "Lower CL (CC2)",
                "UWL_2": "Upper WL (CC2)",
                "LWL_2": "Lower WL (CC2)",
                "TrendUp_2": "Trend up (CC2)",
                "TrendDown_2": "Trend down (CC2)",
                "RunHigh_2": "Run up (CC2)",
                "RunLow_2": "Run down (CC2)",
                "ProcessViolation_2": "Process violation in CC2",
                "ToolChanged": "Tool change",
                "Hist_tt_Count": "Count",
                "Hist_ND": "d",
                "Hist_currentLowerToleranceLimitAbs": "LT",
                "Hist_currentUpperToleranceLimitAbs": "UT",
                "Hist_Xbb": "xbb",
                "Hist_ChartTitle": "HISTOGRAM",
                "Hist_yAxisTitle": "%",
                "Hist_BellCurve": "Bell Curve",
                "SVC_xAxisTitle": "Sort number",
                "SVC_yAxisTitle": "Measurements",
                "xbp_1": "Process Mean Value (xbP1)",
                "xbp_2": "Process Mean Value (xbP2)",
                "UTL_1": "Upper TL (CC1)",
                "UTL_2": "Upper TL (CC2)",
                "LTL_1": "Lower TL (CC1)",
                "LTL_2": "Lower TL (CC2)",
                "decimalDelimiter": ".",
                "NonConformanceRate": "Non Conformance Rate",
                "DefectiveParts": "Defective Parts",
                "processMeanValue": "process Mean Value",
                "localMeanValue": "xbb",
                "HIST_Confidance_Interval": "s^ND",
                "usl_sv": "Upper tolerance violation",
                "lsl_sv": "Lower tolerance violation",

                //series Names names
                "svc": "Single Value",
                "xb": "xb",
                "mxb": "mxb",
                "ewma": "ewma",
                "mr": "mR",
                "ms": "ms",
                "s": "s",
                "r": "R",
                "x": "x",
                "med": "Median",
                "measurements": "Measurements",

                "x_axis_subgroups": "Subgroups",

                //chart names
                "xb_chart": "XB Chart",
                "xb_s_chart": "xb/s Chart",
                "mxb_ms_chart": "mxb/mS Chart",
                "xb_r_chart": "xb/r Chart",
                "mxb_mr_chart": "mxb/mR Chart",
                "x_ms_chart": "x/ms Chart",
                "x_mr_chart": "x/mr Chart",
                "s_chart": "S Chart",
                "r_chart": "R Chart",
                "svc_chart": "Single Value Chart",
                "pNet_chart": "Probability Plot",
                "pNet_xAxisTitle": "Measurement",
                "ms_chart": "S Chart",
                "mr_chart": "R Chart",
                "med_chart": "Median Chart",
                "med_r_chart": "Median/R Chart",

                // Boxplot            
                "bPlot_low": "Min",
                "bPlot_high": "Max",
                "bPlot_median": "Median",
                "bPlot_q1": "Q1",
                "bPlot_q3": "Q3",
                "bPlot_series": "Boxplot",
                "eliminated": "Eliminated",
                "Defect_Pareto_xAxis": "Defect",
                "Defect_Pareto_yAxis": "Count",
                "Pareto_chart_title": "Defect Pareto",
                "Defect_Pareto_percent_Tooltip_Caption": 'Percentage',
                "Defect_Pareto_count_Tooltip_Caption": 'Count',
                "Defect_Pareto_class_Tooltip_Caption": "Type",
                "Defect_Pareto_ID_Tooltip_Caption": "Defect ID",

                // CUSum
                "cuSum": "S",
                "cuSumLow": "SL",
                "CUSumHigh": "SH",
                "CUSumUCL": "UCL",
                "CUSumLCL": "LCL",
                "CUSumCL": "CL",
                "CUSum_chart": "Cumulative Sum Chart",

                "cuCount_chart": "Cumulative Count Chart",
                "cuCount": "Cumulative Count",
                "Annotation": "Annotation",
                "Attachment": "Attachment"

            }
        }
    };
    let settings = {
        chartType: chartTypes.xb_s, // default XB Chart
        locale: 'en',
        data: myData, // JSON Array with subgroup
        chartTitle: parsedSettingsData.chartTitle || getLocalizedText('XB' + '_chart', 'en'),
        xAxisTitle: getLocalizedText('x_axis_subgroups', 'en'),
        decimalPlaces: 4,
        height: parsedSettingsData.chartHight || 720,
        width: parsedSettingsData.chartWidth || 1800,
        backgroundColor: undefined,
        series1yAxisMinValue: undefined,
        series1yAxisMaxValue: undefined,
        series2yAxisMinValue: undefined,
        series2yAxisMaxValue: undefined,
        series1Name:'Series1',
        meanValueSeries1Name: undefined,
        drawSPCZones: true,
        hiddenSeries: [],
        /* Series 2 Settings */
        series2Name: 'Series2',
        meanValueSeries2Name: undefined,
        isSeries2Visible: true,
        xAxisCustomInfoLabel: false,
        boxplot: false,
        showMeasurements: false,
        series: getDefaultSeriesColors(),
        yAxisUnit: getDefaultyAxisUnitObj(),
    };
    let movingMeanWeightings = {
        Uniformly: 1,
        Exponentially: 2
    };
    let input = {
        series1: [], UCL1: [], LCL1: [], UWL1: [], LWL1: [], xbP1: [],
        series2: [], LCL2: [], UCL2: [], LWL2: [], UWL2: [], xbP2: [],
        flagSeries: [], customInfo: [], subgroups: [], boxplot: [], median: [], measurements: [], flagremarks: [], flagAttachment: [], flagNonConformance: [],
        zoneA: [], zoneB1: [], zoneB2: [], zoneC1: [], zoneC2: [],
    };
    let option = function () {
        prepareData(input);
        let seriesData = prepareSeries(input);
        return prepareChartOptions(seriesData, input);

    }
    function prepareChartOptions(seriesData, input) {
        let options =
        {
            scale: 1,
            b64:true,
            options:
            {
                chart: {
                    backgroundColor: settings.backgroundColor,
                    type: 'line',
                    height: settings.height,
                    width: settings.width,
                    animation: false,
                    style: {
                        fontFamily: 'Segoe UI,Open Sans,Arial,Helvetica,sans-serif'
                    },
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'vertical',
                    x: 0,
                    y: 100
                },
                plotOptions: {
                    boxplot: {
                        color: 'grey',
                        fillColor: '#E1DCDC12',
                        lineWidth: 1,
                        medianColor: '#0C5DA5',
                        medianWidth: 2
                    },
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                title: {
                    text: settings.chartTitle,
                    style: titleStyle
                },
                xAxis: {
                    title: {
                        text: settings.xAxisTitle,
                        style: axiesTitleStyle
                    },
                    lineColor: siemensColors.PL_BLACK_22,
                    lineWidth: 1,
                    gridLineColor: siemensColors.PL_BLACK_22,
                    labels: {
                        rotation: -90,
                        formatter: function () {
                            return input.subgroups[this.value];
                        },
                        style: axiesStyle
                    }

                
                },
                yAxis: yAxisLabels(),
                series: seriesData
            }
           
        };

        return options;
    }
    function prepareData(dataInput) {
        const movingMeanWeightingType = getMovingMeanWeightingType();
        processSubgroups(dataInput, movingMeanWeightingType);
        processMeasurements(dataInput);
    }

    function getMovingMeanWeightingType() {
        if (!settings.data?.specifications) {
            return undefined;
        }
        return parseMovingMeanWeighting(settings.data.specifications.movingMeanWeighting);
    }

    function processSubgroups(dataInput, movingMeanWeightingType) {
        if (!settings.data?.subgroups) {
            return;
        }

        settings.data.subgroups.forEach((item, index) => {
            extractSubgroupData(item, index, dataInput, movingMeanWeightingType);
        });
    }

    function processMeasurements(dataInput) {
        if (!shouldProcessMeasurements()) {
            return;
        }

        const subgroupSize = getSubgroupSize();

        if (isXBOrMedChart()) {
            processXBOrMedMeasurements(dataInput, subgroupSize);
        } else if (isMXBChart()) {
            processMXBMeasurements(dataInput, subgroupSize);
        }
    }

    function shouldProcessMeasurements() {
        return settings.data?.measurements &&
            settings.showMeasurements === true;
    }

    function getSubgroupSize() {
        return settings.data?.specifications?.subgroupSize > 0
            ? settings.data.specifications.subgroupSize
            : 1;
    }

    function isXBOrMedChart() {
        return settings.chartType === chartTypes.xb ||
            settings.chartType === chartTypes.med;
    }

    function isMXBChart() {
        return settings.chartType === chartTypes.mxb_ms ||
            settings.chartType === chartTypes.mxb_mR;
    }

    function processXBOrMedMeasurements(dataInput, subgroupSize) {
        settings.data.measurements.forEach((measurement, j) => {
            dataInput.measurements.push([
                parseInt(j / subgroupSize),
                measurement.measuredValue
            ]);
        });
    }

    function processMXBMeasurements(dataInput, subgroupSize) {
        const measurements = settings.data.measurements;
        const maxLength = (settings.data.subgroups.length - 1) * subgroupSize;

        for (let i = 0; i < measurements.length; i++) {
            for (let k = 0; k < subgroupSize &&
                measurements[i + k] &&
                dataInput.measurements.length < maxLength; k++) {

                dataInput.measurements.push([
                    i + subgroupSize - 1,
                    measurements[i + k].measuredValue
                ]);
            }
        }
    }//NOSONAR
    function prepareSeries(inputData) {
        let seriesData = [
            {
                id: seriesIds.controlChart.ucl1,
                name: getLocalizedText('UCL_1', settings.locale),
                data: inputData.UCL1,
                yAxis: 0,
                color: settings.series.color.controlLimit || chartSeriesColors.ControlChart.ControlLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                showInLegend: shouldDisplaySeries(inputData.UCL1),
                visible: shouldDisplaySeries(inputData.UCL1, seriesIds.controlChart.ucl1),
                index: 0
            },
            {
                id: seriesIds.controlChart.uwl1,
                name: getLocalizedText('UWL_1', settings.locale),
                data: inputData.UWL1,
                yAxis: 0,
                color: settings.series.color.warningLimit || chartSeriesColors.ControlChart.WarningLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                showInLegend: shouldDisplaySeries(inputData.UWL1),
                visible: shouldDisplaySeries(inputData.UWL1, seriesIds.controlChart.uwl1),
                index: 1
            },
            {
                id: seriesIds.controlChart.series1,
                name: settings.series1Name,
                data: inputData.series1,
                yAxis: 0,
                color: settings.series.color.series1 || chartSeriesColors.ControlChart.xbarX,
                // showInNavigator: true,  // to display xAxis series in range selector for highstock chart
                showInLegend: false,
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 4
                },
                index: 2,
                zoneAxis: 'x',
                zones: prepareColoredZone("involvedbyother_1")
            },
            {
                id: seriesIds.controlChart.xbp1,
                name: settings.meanValueSeries1Name || getLocalizedText('xbp_1', settings.locale), //Highcharts.uiLocale[settings.locale].xbp_1,
                data: inputData.xbP1,
                yAxis: 0,
                color: settings.series.color.processMeanValue || chartSeriesColors.ControlChart.xbarProcess,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                showInLegend: shouldDisplaySeries(inputData.xbP1),
                visible: shouldDisplaySeries(inputData.xbP1, seriesIds.controlChart.xbp1),
                index: 3
            },
            {
                id: seriesIds.controlChart.lwl1,
                name: getLocalizedText('LWL_1', settings.locale), // Highcharts.uiLocale[settings.locale].LWL_1,
                data: inputData.LWL1,
                yAxis: 0,
                color: settings.series.color.warningLimit || chartSeriesColors.ControlChart.WarningLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                showInLegend: shouldDisplaySeries(inputData.LWL1),
                visible: shouldDisplaySeries(inputData.LWL1, seriesIds.controlChart.lwl1),
                index: 4
            },
            {
                id: seriesIds.controlChart.lcl1,
                name: getLocalizedText('LCL_1', settings.locale), // Highcharts.uiLocale[settings.locale].LCL_1,
                data: inputData.LCL1,
                yAxis: 0,
                color: settings.series.color.controlLimit || chartSeriesColors.ControlChart.ControlLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                showInLegend: shouldDisplaySeries(inputData.LCL1),
                visible: shouldDisplaySeries(inputData.LCL1, seriesIds.controlChart.lcl1),
                index: 5
            },
            {
                id: seriesIds.controlChart.ucl2,
                name: getLocalizedText('UCL_2', settings.locale), //  Highcharts.uiLocale[settings.locale].UCL_2,
                data: inputData.UCL2,
                yAxis: settings.isSeries2Visible ? 1 : 0,
                color: settings.series.color.controlLimit || chartSeriesColors.ControlChart.ControlLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                visible: settings.isSeries2Visible && shouldDisplaySeries(inputData.UCL2, seriesIds.controlChart.ucl2),
                showInLegend: settings.isSeries2Visible && shouldDisplaySeries(inputData.UCL2),
                index: 6
            },
            {
                id: seriesIds.controlChart.uwl2,
                name: getLocalizedText('UWL_2', settings.locale), // Highcharts.uiLocale[settings.locale].UWL_2,
                data: inputData.UWL2,
                yAxis: settings.isSeries2Visible ? 1 : 0,
                color: settings.series.color.warningLimit || chartSeriesColors.ControlChart.WarningLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                visible: settings.isSeries2Visible && shouldDisplaySeries(inputData.UWL2, seriesIds.controlChart.uwl2),
                showInLegend: settings.isSeries2Visible && shouldDisplaySeries(inputData.UWL2),
                index: 7
            },
            {
                id: seriesIds.controlChart.series2,
                name: settings.series2Name,
                data: inputData.series2,
                yAxis: settings.isSeries2Visible ? 1 : 0,
                visible: settings.isSeries2Visible,
                showInLegend: false,
                color: settings.series.color.series2 || chartSeriesColors.ControlChart.Sr,
                step: false,
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 4
                },
                index: 8,
                zoneAxis: 'x',
                zones: prepareColoredZone("involvedbyother_2")
            },
            {
                id: seriesIds.controlChart.xbp2,
                name: settings.meanValueSeries2Name || getLocalizedText('xbp_2', settings.locale), // Highcharts.uiLocale[settings.locale].xbp_2,
                data: inputData.xbP2,
                yAxis: settings.isSeries2Visible ? 1 : 0,
                color: settings.series.color.processMeanValue || chartSeriesColors.ControlChart.xbarProcess,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                visible: settings.isSeries2Visible && shouldDisplaySeries(inputData.xbP2, seriesIds.controlChart.xbp2),
                showInLegend: settings.isSeries2Visible && shouldDisplaySeries(inputData.xbP2),
                index: 9
            },
            {
                id: seriesIds.controlChart.lwl2,
                name: getLocalizedText('LWL_2', settings.locale), // Highcharts.uiLocale[settings.locale].LWL_2,
                data: inputData.LWL2,
                yAxis: settings.isSeries2Visible ? 1 : 0,
                color: settings.series.color.warningLimit || chartSeriesColors.ControlChart.WarningLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                visible: settings.isSeries2Visible && shouldDisplaySeries(inputData.LWL2, seriesIds.controlChart.lwl2),
                showInLegend: settings.isSeries2Visible && shouldDisplaySeries(inputData.LWL2),
                index: 10
            },
            {
                id: seriesIds.controlChart.lcl2,
                name: getLocalizedText('LCL_2', settings.locale),
                data: inputData.LCL2,
                yAxis: settings.isSeries2Visible ? 1 : 0,
                color: settings.series.color.controlLimit || chartSeriesColors.ControlChart.ControlLimit,
                step: 'left',
                tooltip: {
                    valueDecimals: settings.decimalPlaces
                },
                marker: {
                    enabled: false
                },
                lineWidth: 1.2,
                visible: settings.isSeries2Visible && shouldDisplaySeries(inputData.LCL2, seriesIds.controlChart.lcl2),
                showInLegend: settings.isSeries2Visible && shouldDisplaySeries(inputData.LCL2),
                index: 11
            },
            {
                id: seriesIds.controlChart.flagSeries,
                name: seriesIds.controlChart.flagSeries,
                type: 'flags',
                data: inputData.flagSeries,
                onSeries: settings.series1Name,
                showInLegend: false,
                useHTML: true,
                dataLabels: {
                    useHTML: true,
                },
                lineWidth: 1,
                lineColor: '#005F87',
                stackDistance: 10
            }
        ];

        if (settings.boxplot === true) {
            seriesData.push({
                linkedTo: 'boxplot',
                name: getLocalizedText('bPlot_series', settings.locale) + '_orig',
                data: inputData.boxplot,
                type: 'boxplot',
                id: seriesIds.controlChart.boxplot_main,
                showInLegend: false
            }, { // dummy series to show box icon and linked to boxplot series; as boxplot legend icon is not customizeable
                name: getLocalizedText('bPlot_series', settings.locale),
                id: seriesIds.controlChart.boxplot, // for custom icon in legend
                data: null,
                type: 'scatter',
                marker: {
                    enabled: true,
                    lineColor: 'grey',
                    symbol: 'box',
                    lineWidth: 2,
                    radius: 5
                },
                visible: shouldDisplaySeries(inputData.boxplot, seriesIds.controlChart.boxplot)
            }
            );
        }
        if (settings.drawSPCZones === true) {
            seriesData.push(
                {
                    id: seriesIds.controlChart.SPCZoneA,
                    name: '± Sigma',
                    type: 'arearange',
                    data: inputData.zoneA,
                    zIndex: -1,
                    fillOpacity: 0.4
                },
                {
                    id: seriesIds.controlChart.SPCZoneB1,
                    name: '± 2Sigma',
                    type: 'arearange',
                    data: inputData.zoneB1,
                    zIndex: -1,
                    fillOpacity: 0.4,
                    color: '#BDF5B1'

                },
                {
                    id: seriesIds.controlChart.SPCZoneC1,
                    name: '± 2Sigma',
                    type: 'arearange',
                    data: inputData.zoneC1,
                    zIndex: -1,
                    fillOpacity: 0.4,
                    color: '#BDF5B1',
                    showInLegend: false,
                    linkedTo: seriesIds.controlChart.SPCZoneB1
                },
                {
                    id: seriesIds.controlChart.SPCZoneB2,
                    name: '± 3Sigma',
                    type: 'arearange',
                    data: inputData.zoneB2,
                    zIndex: -1,
                    fillOpacity: 0.4,
                    color: '#B3B6F2',
                },
                {
                    id: seriesIds.controlChart.SPCZoneC2,
                    name: '± 3Sigma',
                    type: 'arearange',
                    data: inputData.zoneC2,
                    zIndex: -1,
                    fillOpacity: 0.4,
                    color: '#B3B6F2',
                    showInLegend: false,
                    linkedTo: seriesIds.controlChart.SPCZoneB2
                }
            )

        }

        if (displayMeasurements()) {
            seriesData.push({
                name: getLocalizedText('measurements', settings.locale),
                data: inputData.measurements,
                type: 'scatter',
                id: seriesIds.controlChart.measurement,
                showInLegend: true,
                marker: {
                    enabled: true,
                    symbol: 'cross',
                    // fillColor: 'grey',
                    lineWidth: 2,
                    radius: 3,
                    lineColor: 'grey'
                }
            });
        }
        return seriesData;
    }
    function extractSubgroupData(subgroup, index, inputData, movingMeanWeightingType) {
        let output = calculateLimits(subgroup, movingMeanWeightingType),

            statuses = subgroup.statuses,
            violationData = getViolation(statuses),
            newstatuses = violationData.newstatuses,
            violations = violationData.violations,
            customInfo = subgroup.customInfo || [],
            subgroupNumber = subgroup.subgroupNumber >= index ? subgroup.subgroupNumber : index;

        if (settings.xAxisCustomInfoLabel === true) {    // for xAxis
            if (subgroup.customInfo) {
                inputData.subgroups.push(getCustomxAxisLabel(subgroup.customInfo));
            } else { inputData.subgroups.push(null); } //show empty, if no corresponding custominfo is given
        } else
            inputData.subgroups.push(subgroupNumber);

        addSeries1Data(newstatuses, inputData, output, violations, index);

        inputData.customInfo.push(customInfo); // for tooltip

        if (settings.boxplot === true) {
            if (!isNullOrUndefined(output.seriesVal1)) {
                inputData.boxplot.push(output.boxplot);
            } else {
                inputData.boxplot.push(null);
            }
        }

        addSeries2Data(newstatuses, inputData, output, violations, index);
        buildSpcZones(inputData, subgroup, settings.data.result.processValues.sigmaEstimated);
    }
    function calculateLimits(inputData, movingMeanWeightingType) {
        let output = {};

        if (inputData) {
            switch (settings.chartType) {
                case chartTypes.s:
                case chartTypes.r:
                case chartTypes.ms:
                case chartTypes.mR:
                    output.ucl1 = roundFloat(inputData.upperControlLimit2Abs, true);
                    output.lcl1 = roundFloat(inputData.lowerControlLimit2Abs, true);
                    output.uwl1 = roundFloat(inputData.upperWarnLimit2Abs, true);
                    output.lwl1 = roundFloat(inputData.lowerWarnLimit2Abs, true);
                    output.xbp1 = roundFloat(inputData.calculatedProcessMeanValue2, true);
                    output.seriesVal1 = settings.chartType === chartTypes.s || settings.chartType === chartTypes.ms ? roundFloat(inputData.calculatedS, true) : roundFloat(inputData.calculatedR, true);
                    break;
                case chartTypes.xb_s:
                case chartTypes.mxb_ms:
                case chartTypes.x_ms:
                case chartTypes.xb_R:
                case chartTypes.mxb_mR:
                case chartTypes.x_mR:
                case chartTypes.cu_Sum:
                case chartTypes.med_R:
                case chartTypes.mxb:
                    output.ucl1 = roundFloat(inputData.upperControlLimit1Abs, true);
                    output.lcl1 = roundFloat(inputData.lowerControlLimit1Abs, true);
                    output.uwl1 = roundFloat(inputData.upperWarnLimit1Abs, true);
                    output.lwl1 = roundFloat(inputData.lowerWarnLimit1Abs, true);
                    output.xbp1 = roundFloat(inputData.calculatedProcessMeanValue1, true);
                    output.seriesVal1 = movingMeanWeightingType === movingMeanWeightings.Exponentially ? roundFloat(inputData.calculatedEWMA, true) : roundFloat(inputData.calculatedXb, true);
                    output.ucl2 = roundFloat(inputData.upperControlLimit2Abs, true);
                    output.lcl2 = roundFloat(inputData.lowerControlLimit2Abs, true);
                    output.uwl2 = roundFloat(inputData.upperWarnLimit2Abs, true);
                    output.lwl2 = roundFloat(inputData.lowerWarnLimit2Abs, true);
                    output.xbp2 = roundFloat(inputData.calculatedProcessMeanValue2, true);
                    output.seriesVal2 = settings.chartType === chartTypes.xb_s || settings.chartType === chartTypes.mxb_ms || settings.chartType === chartTypes.x_ms ? roundFloat(inputData.calculatedS, true) : roundFloat(inputData.calculatedR, true);
                    break;
                case chartTypes.med:
                case chartTypes.xb:
                    output.ucl1 = roundFloat(inputData.upperControlLimit1Abs, true);
                    output.uwl1 = roundFloat(inputData.upperWarnLimit1Abs, true);
                    output.seriesVal1 = roundFloat(inputData.calculatedXb, true);
                    output.xbp1 = roundFloat(inputData.calculatedProcessMeanValue1, true);
                    output.lwl1 = roundFloat(inputData.lowerWarnLimit1Abs, true);
                    output.lcl1 = roundFloat(inputData.lowerControlLimit1Abs, true);
                    break;
                default: // XB chart type
                    output.ucl1 = roundFloat(inputData.upperControlLimit1Abs, true);
                    output.lcl1 = roundFloat(inputData.lowerControlLimit1Abs, true);
                    output.uwl1 = roundFloat(inputData.upperWarnLimit1Abs, true);
                    output.lwl1 = roundFloat(inputData.lowerWarnLimit1Abs, true);
                    output.xbp1 = roundFloat(inputData.calculatedProcessMeanValue1, true);
                    output.seriesVal1 = roundFloat(inputData.calculatedXb, true);
            }

            if (settings.boxplot === true) {
                output.boxplot = [];
                inputData.boxPlot.forEach(function (d, i) {
                    output.boxplot.push(roundFloat(d));
                });
            }
        }
        return output;
    }
    function roundFloat(inputFloat, decimalPlaces, nullReturn) {
        let precision = parseInt(decimalPlaces);
        if (isNaN(precision) || isNullOrUndefined(precision))
            precision = 0;
        if (!isNaN(parseFloat(inputFloat)) && precision != 0) {
            return parseFloat(parseFloat(inputFloat.toString()).toFixed(precision)).toFixed(precision);
        } else if (!isNaN(parseFloat(inputFloat)) && !isNullOrUndefined(precision))
            return parseFloat(inputFloat);

        if (nullReturn === true)
            return null

        return inputFloat;
    }
    function getLocalizedText(key, locale) {
        let text = '';

        if (key && locale && Highcharts.uiLocale[locale]) {
            let matchedKey = Object.keys(Highcharts.uiLocale[locale]).filter(function (k) {
                return k.toLowerCase() === key.toLowerCase();
            });
            if (matchedKey.length > 0) {
                text = Highcharts.uiLocale[locale][matchedKey[0]];
            }
        } else {
            console.log('Text not found for key ' + key + ' and locale ' + locale);
        }
        return text;
    }
    function isNullOrUndefined(inputData) {
        return inputData === null || inputData === undefined;
    }
    function getCustomxAxisLabel(customInfo) {
        if (customInfo && customInfo.filter) {
            let xAxisObj = customInfo.filter(function (k) { return k.xAxisLabel === true; });
            if (xAxisObj && xAxisObj.length > 0 && xAxisObj[0].value)
                return xAxisObj[0].value;
        }
        return '';
    }
    function getDefaultSeriesColors() {
        let obj =
        {
            color: {
                series1: chartSeriesColors["ControlChart"]["xbarX"],
                series2: chartSeriesColors.ControlChart.Sr,
                controlLimit: chartSeriesColors.ControlChart.ControlLimit,
                warningLimit: chartSeriesColors.ControlChart.WarningLimit,
                processMeanValue: chartSeriesColors.ControlChart.xbarProcess
            }
        };
        return obj;
    }
    function getViolation(statuses) {
        let returnData = { newstatuses: [], violations: [] };

        if (statuses && statuses.length > 0 && typeof statuses === 'object') {
            statuses.forEach(function (s) {
                if (s.category) {
                    if (s.category.toLowerCase() !== 'processviolation_1' && s.category.toLowerCase() !== 'processviolation_2')
                        returnData.violations.push(getLocalizedText(s.category, settings.locale));

                    returnData.newstatuses.push(s.category.toLowerCase());
                }
            });
        }

        return returnData;
    }
    function parseMovingMeanWeighting(movingMeanWeighting) {
        if (movingMeanWeighting && typeof movingMeanWeighting === 'string') {
            for (let key in movingMeanWeightings) {
                if (key.toLowerCase() === movingMeanWeighting.toLowerCase())
                    return movingMeanWeightings[key];
            }
        } else {
            console.warn("Invalid MovingMeanWeighting in parameter, valid values can be one from these -> Uniformly, Exponentially ");
            return -1;
        }
        return -1;
    }
    function displayMeasurements() {
        let isVisible = (settings.showMeasurements === true && (settings.chartType === chartTypes.xb || settings.chartType === chartTypes.med || settings.chartType === chartTypes.mxb_ms || settings.chartType === chartTypes.mxb_mR));

        return isVisible;
    }
    function prepareColoredZone(status) {
        let zone = [];
        let violationZones = [];
        let subgroupSize = settings.data && settings.data.specifications && settings.data.specifications.subgroupSize > 0 ? settings.data.specifications.subgroupSize : 1;
        let interval;
        let violatedSubgroupsNumber = [];
        switch (settings.chartType) {

            case chartTypes.mxb_ms:
            case chartTypes.mxb_mR:
                interval = [[0, subgroupSize - 1]];
                zone = (getColoredSeriesZone(interval, siemensColors.SiemensBlueLight));
                break;
        }
        //Disply violated samples and values in a different color 
        if (settings.data && settings.data.subgroups) {
            
            settings.data.subgroups.forEach(function (subgroup) {
                let statuses = subgroup.statuses;
                let newstatuses = [];
                if (statuses && statuses.length > 0) {
                    for (let i = 0; i < statuses.length; i++)
                        newstatuses.push(statuses[i].category.toLowerCase());
                    if (newstatuses.indexOf(status) > -1) {
                        violatedSubgroupsNumber.push(roundFloat(subgroup.subgroupNumber));
                    }
                }
            });

        }
        interval = getSequence(violatedSubgroupsNumber)
        violationZones = getColoredSeriesZone(interval, siemensColors.violationZone);
        violationZones.forEach(function (violationZone) {
            zone.push(violationZone);

        });
        return zone;


    }
    function addSeries1Data(statuses, inputData, output, violations, index) {
        let series1Val = output.seriesVal1;
        if (statuses && statuses.length > 0 && typeof statuses === 'object') {
            if (statuses.indexOf("processviolation_1") > -1) {// to draw red triangle
                inputData.series1.push({
                    marker: {
                        fillColor: chartSeriesColors.ControlChart.Marker,
                        lineWidth: 3,
                        lineColor: chartSeriesColors.ControlChart.Marker,
                        symbol: 'triangle'
                    },
                    name: 'violation' + index,
                    y: series1Val,
                    violations: violations  //to get in tooltip and in click event
                });
            } else if (statuses.indexOf("outlier") > -1) {
                inputData.series1.push({
                    marker: {
                        fillColor: chartSeriesColors.ControlChart.YellowMarker,
                        lineWidth: 3,
                        lineColor: chartSeriesColors.ControlChart.YellowMarker,
                        symbol: 'triangle'
                    },
                    name: 'outlier',
                    y: series1Val,
                    violations: violations
                });
            } else if (statuses.indexOf("eliminated") > -1) {
                inputData.series1.push({
                    marker: {
                        fillColor: chartSeriesColors.ControlChart.Marker,
                        lineWidth: 3,
                        lineColor: chartSeriesColors.ControlChart.Marker,
                        symbol: 'cross'
                    },
                    name: 'eliminated',
                    y: series1Val,
                    violations: violations
                });
            } else
                inputData.series1.push(series1Val);

            if (statuses.indexOf("toolchanged") > -1) {

                inputData.flagSeries.push({
                    y: series1Val,
                    x: index,
                    title: svgRepository.ToolChanged,
                    text: getLocalizedText('ToolChanged', settings.locale),
                });
            }
            if (statuses.indexOf("remark") > -1) {
                inputData.flagSeries.push({
                    y: series1Val,
                    x: index,
                    title: svgRepository.Remark,
                    text: getCustomRemarks(settings, index)
                });
            }
            if (statuses.indexOf("attachment") > -1) {
                inputData.flagSeries.push({
                    y: series1Val,
                    x: index,
                    title: svgRepository.Attachment,
                    text: getLocalizedText('Attachment', settings.locale),

                });
            }
            if (statuses.indexOf("nonconformance") > -1) {
                inputData.flagSeries.push({
                    y: series1Val,
                    x: index,
                    title: svgRepository.NonConformance,
                    text: getLocalizedText('NonConformance', settings.locale),

                });
            }
        } else {
            inputData.series1.push(series1Val);
            if (statuses && typeof statuses !== 'object') // if statuses are given in wrong format e.g. as string but not as object
                console.error('Violations statuses are not valid array of object. It should be an array of objects with defined format. Please consult doco.');
        }

        inputData.UCL1.push(output.ucl1);
        inputData.LCL1.push(output.lcl1);
        inputData.UWL1.push(output.uwl1);
        iinputDataput.LWL1.push(output.lwl1);
        inputData.xbP1.push(output.xbp1);
    }
    function addSeries2Data(statuses, inputData, output, violations, index) {
        if (settings.isSeries2Visible) {
            if (statuses.indexOf("processviolation_2") > -1)
                inputData.series2.push({
                    marker: {
                        fillColor: chartSeriesColors.ControlChart.Marker,
                        lineWidth: 3,
                        lineColor: chartSeriesColors.ControlChart.Marker,
                        symbol: 'triangle'
                    },
                    name: 'violation' + index,
                    y: output.seriesVal2,
                    violations: violations
                });
            else
                inputData.series2.push(output.seriesVal2);

            inputData.LCL2.push(output.lcl2);
            inputData.UCL2.push(output.ucl2);
            inputData.LWL2.push(output.lwl2);
            inputData.UWL2.push(output.uwl2);
            inputData.xbP2.push(output.xbp2);
        }
    }
    function buildSpcZones(inputData, subgroup, processSigmaSpecified) {
        if (inputData && subgroup && subgroup.calculatedProcessMeanValue1 && (subgroup.processSigma || processSigmaSpecified) && settings.drawSPCZones) {
            let mean = subgroup.calculatedProcessMeanValue1;
            let sigma;
            if (subgroup.processSigma) {
                sigma = subgroup.processSigma;
            }
            else {
                sigma = processSigmaSpecified;
            }

            inputData.zoneA.push([calculateMeanSigma(mean, -sigma, 1), calculateMeanSigma(mean, sigma, 1)]);
            inputData.zoneB1.push([calculateMeanSigma(mean, sigma, 1), calculateMeanSigma(mean, sigma, 2)]);
            inputData.zoneB2.push([calculateMeanSigma(mean, sigma, 2), calculateMeanSigma(mean, sigma, 3)]);
            inputData.zoneC1.push([calculateMeanSigma(mean, -sigma, 1), calculateMeanSigma(mean, -sigma, 2)]);
            inputData.zoneC2.push([calculateMeanSigma(mean, -sigma, 2), calculateMeanSigma(mean, -sigma, 3)]);
        } else {
            inputData.zoneA.push([null, null]);
            inputData.zoneB1.push([null, null]);
            inputData.zoneB2.push([null, null]);
            inputData.zoneC1.push([null, null]);
            inputData.zoneC2.push([null, null]);

        }
    }
    function calculateMeanSigma(mean, sigma, factor) {

        return (mean + (sigma * factor))

    }
    function shouldDisplaySeries(series, hiddenSeriesId) {
        let notNullSeries = [];
        if (series && series.filter) {
            notNullSeries = series.filter(function (k) {
                if (k !== null && k !== undefined)
                    return k.toString();
            });
        }
        let nonullableSeries = notNullSeries.length > 0;
        let isVisibleSeries = settings.hiddenSeries.indexOf(hiddenSeriesId) < 0;

        return nonullableSeries && isVisibleSeries;
    }
    function getSequence(violatedSubgroupsNumber) {
        let tempSeq = [];
        let interval = [];
        //TODO: here should be check added against violatedSubgroupsNumber for null or it's type should be checked against array
        if (violatedSubgroupsNumber.length > 0)
            tempSeq.push(violatedSubgroupsNumber[0]);
        for (let i = 1; i < violatedSubgroupsNumber.length; i++) {
            if (Math.abs(violatedSubgroupsNumber[i + 1] - violatedSubgroupsNumber[i]) == 1)
                tempSeq.push(violatedSubgroupsNumber[i])
            else {
                tempSeq.push(violatedSubgroupsNumber[i]);
                interval.push([Math.min.apply(null, tempSeq), Math.max.apply(null, tempSeq)]);
                tempSeq = [];
            }
        }

        return interval;
    }
    function getColoredSeriesZone(interval, color) {
        let zone = [];

        for (let i = 0; i < interval.length; i++) {
            zone.push({ value: interval[i][0] }, { value: interval[i][1], color: color });
        }

        return zone;

    }
    function yAxisLabels() {
        let unit = settings.yAxisUnit && isNullOrUndefined(settings.yAxisUnit.text) ? '' : settings.yAxisUnit.text;
        let yAxis = [
            {
                min: settings.series1yAxisMinValue,
                max: settings.series1yAxisMaxValue,
                opposite: false,
                lineWidth: 2,
                labels: {
                    // rotation: -90, // settings.xAxisLabelsRotation,
                    formatter: function () {
                        return roundFloat(this.value, settings.decimalPlaces);
                    },
                    style: axiesStyle
                },
                title: {
                    text: settings.yAxisSeries1Title,
                    style: axiesTitleStyle
                },
                lineColor: siemensColors.PL_BLACK_22,
            }
        ];

        if (settings.isSeries2Visible) {
            yAxis[0].height = '52%';
            yAxis.push({
                min: settings.series2yAxisMinValue,
                max: settings.series2yAxisMaxValue,
                labels: {
                    // align: 'right',
                    // x: -8
                    formatter: function () {
                        return roundFloat(this.value, settings.decimalPlaces);
                    },
                    style: axiesStyle
                },
                title: {
                    text: settings.yAxisSeries2Title,
                    style: axiesTitleStyle
                },
                opposite: false,
                top: '53%',
                height: '46%',
                offset: 0,
                lineWidth: 2,
                lineColor: siemensColors.PL_BLACK_22
            });
        }

        yAxis.push(
            {// to show units of chart
                opposite: false,
                title: {
                    reserveSpace: false,
                    text: unit,
                    align: 'high',
                    rotation: 0,
                    x: settings.yAxisUnit.x,
                    y: settings.yAxisUnit.y,
                    style: {
                        fontSize: settings.yAxisUnit.fontSize,
                        color: siemensColors.PLBlack4
                    }
                }
            });
        return yAxis;
    }
    function getDefaultyAxisUnitObj() {
        let obj = {
            text: '',
            x: 60,
            y: undefined,
            fontSize: undefined
        };
        return obj;
    }

    callback(null, option());
}
