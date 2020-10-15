/*
 * Copyright (c) 2020 iTAC Software AG, Germany. All Rights Reserved.
 *
 * This software is protected by copyright. Under no circumstances may any part of this file in any form be copied,
 * printed, edited or otherwise distributed, be stored in a retrieval system, or be translated into another language
 * without the written permission of iTAC Software AG.
 *
 */

/*
Change index:

 * Name                    Date            Customer        Function                		Comment
    Faouzi Ben Mabrouk      2020-05-22      Roche CESR      cfRocheCESR             	Initial version : provided by the project team
    Sami Akkari             2020-05-24      Roche CESR      cfffUploadProcessData   	Implement the cfffUploadProcessData
    Radhoine Jmal           2020-06-03      Roche CESR      cffcCheckUser           	Check UserId: 
                                                                                        	- mdataGetUserData: Get userId from tokenId
                                                                                        	- mdataGetUserGroupData Get usergroup
                                                                                    	Registers user at the station:
                                                                                        	- regRegisterUser
                                                                                    	Unregisters user from the station:
                                                                                        	- regUnregisterUser
	Sami Akkari             2020-06-05      Roche CESR      cfffUploadProcessData   	Add Measure object for handling measures
	Sami Akkari             2020-06-17      Roche CESR      cfpCameraIn/cffcCameraOut   Add cfpCameraIn cffcCameraOut
	Sami Akkari             2020-06-17      Roche CESR      cffcPing   					Add cffcPing
	Sami Akkari             2020-06-17      Roche CESR      cfpEcho   					Add cfpEcho
	Faouzi Ben Mabrouk      2020-06-17      Roche CESR      cfpIEIn 					Add cfpIEIn
	Faouzi Ben Mabrouk      2020-06-17      Roche CESR      cffcIEOut 					Add cffcIEOut
	Radhoine Jmal           2020-06-17      Roche CESR      cffcCheckUser               Add requestType for checking inactivity(auto-logout)
	Faouzi Ben Mabrouk      2020-06-18      Roche CESR      parsePrefix               	Update parsePrefix to manage multiple entries
	Faouzi Ben Mabrouk      2020-06-18      Roche CESR      cffcIEOut 					Update cffcIEOut to record multiple entries
	Sami Akkari             2020-06-18      Roche CESR      cfpEcho/cfpCameraIn			Handle input as JSON
	Sami Akkari             2020-06-18      Roche CESR      cffcProcessMagazine   		Add cffcProcessMagazine
	Sami Akkari             2020-06-19      Roche CESR      cffcLogin/outMagazines   	Add cffcLoginMagazines, cffcLogoutMgazines
	Sami Akkari             2020-06-19      Roche CESR      cfIEIn   					Handle input as JSON
    Faouzi Ben Mabrouk      2020-06-19      Roche CESR      cffcIEOut 					Update cffcIEOut to record multiple entries - fix
    Faouzi Ben Mabrouk      2020-06-22      Roche CESR      cffcGetSerialNumber			Add cffcGetSerialNumber
    Radhoine Jmal           2020-06-23      Roche CESR      cffcLoadUnloadPlates        Add cffcLoadUnloadPlates (+ function: SoltCalc)
    Radhoine Jmal           2020-06-23      Roche CESR      cffcWayDecision             Add cffcWayDecision
    Sami Akkari             2020-06-24      Roche CESR      cfpUnloadChamber   			Add cfpUnloadChamber
    Radhoine Jmal           2020-06-23      Roche CESR      cffcRequestSpecialPlate     Add cffcRequestSpecialPlate
    Sami Akkari             2020-06-29      Roche CESR      cfpSetup           			Add cfpSetup
    Radhoine Jmal           2020-07-06      Roche CESR      cffcCheckUser               Remove auto-logOut
    Radhoine Jmal           2020-08-05      Roche CESR      cffcLoadUnloadPlates        Add shipActivateShippingLotAtKap API to assign lots to a station
                                                                                        Get sysdate and append the attribute
    Radhoine Jmal           2020-08-06      Roche CESR      cffcStorageLoad             Add API to get serial number for shipping Lot
    Abderraouf Bouyahi      2020-09-03      Roche CESR      cfpSwitchChamber            Add cfpSwitchChamber
    Abderraouf Bouyahi      2020-09-03      Roche CESR      cffcAllowOpen               Add cffcAllowOpen
    Sami Akkari             2020-09-03      Roche CESR      cfpSetup/cffcPing           Make cfpSetup I/O dynamic + add cffcPing
    Sami Akkari             2020-09-03      Roche CESR      FSCF115-117                 Change timestamp conversion
    Radhoine Jmal           2020-09-04      Roche CESR      cffcMachineIn               - Remove input: recipeData 
                                                                                        - Include the cameraIn call 
    Radhoine Jmal           2020-09-04      Roche CESR      cfpIEIn                     - Add input: Priority / remove PlateCount
    Abderraouf Bouyahi      2020-09-03      Roche CESR      cffcSetupConfirmation       Update cffcSetupConfirmation:Added new input variable successful
                                                                                        Changing API FLOW 
    Sami Akkari             2020-09-07      Roche CESR      cffcMachineOut              Add KLS cycle time calculation from load/unload chamber 
    Radhoine Jmal           2020-09-07      Roche CESR      cffcWayDecision             - Add direction of plate and type of side 
    Abderraouf Bouyahi      2020-09-18      Roche CESR      cffcHandleIST               Add cffcHandleIST         
    Radhoine Jmal           2020-09-24      Roche CESR      cffcMachineIn               - Add Get attribute for topic and type of plate 
    Radhoine Jmal           2020-09-28      Roche CESR      cffcSetupConformation       - Add ConfigGetValues API and configUpdateValues 
                                                                                          to change the state of stataion(Not available)
                                                            cffcMachineOut              - Add ConfigGetValues API and configUpdateValues 
                                                                                          to change the state of stataion(Available)
	Radhoine Jmal           2020-09-28      Roche CESR      cffcWayDecision             - Add ConfigGetValues API to identify plate direction     
    Faouzi Ben Mabrouk      2020-10-08      Roche CESR      configuration mode          - Add Config flag for individual function (prod / test:dummy)   
    Faouzi Ben Mabrouk      2020-10-08      Roche CESR      cfpParameterViolation       - Update cfpParameterViolation(payLoad) using payLoad
    Radhoine Jmal           2020-10-09      Roche CESR      cffcRequestCalibrationData  - Add cffcRequestCalibrationData
    Radhoine Jmal           2020-10-09      Roche CESR      cffcStorageLoad             - Add cffcStorageLoad
    Radhoine Jmal           2020-10-12      Roche CESR      cffcSetupConfirmation       - Update cffcSetupConfirmation (Add config parameter)
    Radhoine Jmal           2020-10-12      Roche CESR      cffcCheckUser               - Update cffcCheckUser: Add unregister user without password  
    Faouzi Ben Mabrouk      2020-10-13      Roche CESR      cffcLoadChamberConfirmation - Refactor cffcLoadChamberConfirmation - Load PlateId into the slotID 
    Faouzi Ben Mabrouk      2020-10-13      Roche CESR      cffcUnloadChamberConfirmation   - Refactor cffcUnloadChamberConfirmation - Unload PlateId from the slotID 
    Faouzi Ben Mabrouk      2020-10-13      Roche CESR      cffcGetSerialNumber	        - Update cffcGetSerialNumber to manage substructID.
    Radhoine Jmal           2020-10-13      Roche CESR      cffcStorageLoad             - (By Aziz) Update cffcStorageLoad / cffcStorageLoadConfirmation / cffcStorageUnloadConfirmation
    Faouzi Ben Mabrouk      2020-10-13      Roche CESR      cffcGetSerialNumber         - Add configuration function to get param from station config
    Radhoine Jmal           2020-10-13      Roche CESR      cffcStorageLoadConfirmation  - Update cffcStorageLoadConfirmation (unloadTimestamp)
    Faouzi Ben Mabrouk      2020-10-14      Roche CESR      cffcPing                    - Update to use dynamic topic
    Faouzi Ben Mabrouk      2020-10-14      Roche CESR      cfpSetup                    - Update cfpSetup (JSON parsing)
    Radhoine Jmal           2020-10-13      Roche CESR      cffcStorageLoadConfirmation  - change mlGetStorageData: add imsAPi: STORAGE_GROUP_NUMBER
*/

/* eslint-disable no-undef*/
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(com.itac.mes.api.custom);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(com.itac.mes.core.domain.mig.exception);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(com.itac.mes.imsapi.domain.container);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(com.itac.mes.imsapi.service);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(com.itac.util.constants.imsapi);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(com.itac.util.date);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(java.lang);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(java.text);
// noinspection JSUnresolvedVariable, JSUnresolvedFunction
importPackage(java.util);
/* eslint-enable no-undef*/

var APPTYPE = "Customer";
var APPID = "Customer";
var CLUSTER = "itacnotebk763test";
//var CLUSTER = "CESRDev";

var prod_cffcAllowOpen = true;
var prod_cffcCameraOut = true;
var prod_cffcCheckUser = true;
var prod_cffcGetSerialNumber = true;
var prod_cffcHandleIST = true;
var prod_cffcIEOut = true;
var prod_cffcLoadChamberConfirmation = true;
var prod_cffcLoadUnloadPlates = true;
var prod_cffcLoginMagazines = true;
var prod_cffcLogoutMagazines = true;
var prod_cffcMachineIn = true;
var prod_cffcMachineOut = true;
var prod_cffcPing = true;
var prod_cffcProcessMagazine = true;
var prod_cffcRequestCalibrationData = true;
var prod_cffcRequestSpecialPlate = true;
var prod_cffcSetupConfirmation = true;
var prod_cffcStorageLoad = true;
var prod_cffcStorageLoadConfirmation = true;
var prod_cffcStorageUnloadConfirmation = true;
var prod_cffcUnloadChamberConfirmation = true;
var prod_cffcUploadMachineConditionOrMessages = true;
var prod_cffcWayDecision = true;
var prod_cfffUploadProcessData = true;

/**
 * @param {number} returnValue
 * @param {string} errorString
 * @param {string[]} [outArgs]
 * @returns {Result_customFunctionCommon}
 */
function generateReturn(returnValue, errorString, outArgs) {
    var result = new Result_customFunctionCommon();
    result.return_value = returnValue;
    result.errorString = errorString;
    result.outArgs = outArgs || [];
    return result;
}

/**
 * @param {IArguments} inputs
 * @param {number} expectedNumberOfParams
 * @returns {boolean}
 */
function checkForNullAndPipes(inputs, expectedNumberOfParams) {
    i;
    var allParamsContainPipe = true;
    for (var i = 0; i < expectedNumberOfParams; i++) {
        if (!inputs[i]) {
            throw "Some parameters are not set!";
        }

        // eslint-disable-next-line no-bitwise
        allParamsContainPipe &= String(inputs[i]).indexOf("|") !== -1;
    }

    return allParamsContainPipe;
}
/**
 * @param {string} stationNumber
 * @param {string} magazineNumber
 * @param {number} direction
 */
function SoltCalc(stationNumber, magazineNumber, direction) {
    var expectedNumberOfParams = 3;
    try {
        checkForNullAndPipes(arguments, expectedNumberOfParams);
    } catch (e) {
        // eslint-disable-next-line no-magic-numbers
        return generateReturn(-1001, e.toString());
    }
    if (!stationNumber || !magazineNumber || !direction) {
        // eslint-disable-next-line no-magic-numbers
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    //---------------attribGetAttributeValues-------------------------
    var objectType = 2;
    var objectNumber = magazineNumber;
    var objectDetail = "-1";
    var attributeCodeArray = ["MENGE"];
    var allMergeLevel = 0;
    var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
    var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
        imsApiSessionContext,
        stationNumber, // String
        objectType, // int
        objectNumber, // String
        objectDetail, // String
        attributeCodeArray, // String[]
        allMergeLevel, // int
        attributeResultKeys // String[]
    );
    var return_value = result_attribGetAttributeValues.return_value;
    if (return_value != 0) {
        return generateError(-1002, "Fehler in MES API attribGetAttributeValues");
    }
    if (direction == 0 || direction == 3 || direction == 4) {
        var Menge = result_attribGetAttributeValues.attributeResultValues[1] - 1;
    } else {
        var Menge = result_attribGetAttributeValues.attributeResultValues[1] + 1;
    }
    //-------------------attribAppendAttributeValues------------------------
    var objectType = 2;
    var objectNumber = magazineNumber;
    var objectDetail = "-1";
    var bookDate = -1;
    var allowOverWrite = 1;
    var attributeUploadKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
    var attributeUploadValues = ["MENGE", Menge, 0];
    var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
        imsApiSessionContext,
        stationNumber, // String
        objectType, // int
        objectNumber, // String
        objectDetail, // String
        bookDate, // long
        allowOverWrite, // int
        attributeUploadKeys, // String[]
        attributeUploadValues // String[]
    );
    var return_value = result_attribAppendAttributeValues.return_value;
    if (return_value != 0) {
        return generateError(-1002, "Fehler in MES API attribAppendAttributeValues");
    }
    var remainingPlates = Menge;

    return generateReturn(0, "", [remainingPlates]);
}
/**
 * @param {number} errorCode
 * @param {string} methodName
 * @returns {Result_customFunctionCommon}
 */
function generateError(errorCode, methodName) {
    var errorText = getErrorText(errorCode);
    var errorString = "Fehler in MES API " + methodName + " : " + errorCode + " '" + errorText + "'";

    // eslint-disable-next-line no-magic-numbers
    return generateReturn(-1002, errorString);
}
/**
 * @param {number} errorCode
 * @returns {string}
 */
function getErrorText(errorCode) {
    var result_imsapiGetErrorText = imsApiService.imsapiGetErrorText(imsApiSessionContext, errorCode);
    if (result_imsapiGetErrorText.return_value === ItacMesErrorCodeIMSApi.COMMON_SERVER_ERROR.getReturnValue()) {
        return ItacMesErrorCodeIMSApi.COMMON_SERVER_ERROR.getErrorString();
    }
    return String(result_imsapiGetErrorText.errorString);
}

/**
 * @param {IArguments} inputs
 * @param {string[]} prefixes - has to be in correct order, meaning the same order if parameters had no prefixes.
 * @returns {object}
 */
function parsePrefixes(inputs, prefixes) {
    var prefixesMap = {};

    var allParamsContainPipe = true;

    for (var i = 0; i < inputs.length; i++) {
        allParamsContainPipe &= String(inputs[i]).indexOf("|") !== -1;
    }

    if (allParamsContainPipe) {
        for (var _i = 0; _i < inputs.length; _i++) {
            var parsed = inputs[_i].split("|");
            var prefix = parsed[0];
            if (prefixesMap[prefix] == undefined) {
                prefixesMap[prefix] = parsed.slice(1).join("|");
            } else {
                if (!Array.isArray(prefixesMap[prefix])) {
                    prefixesMap[prefix] = prefixesMap[prefix].split();
                    prefixesMap[prefix].push(parsed.slice(1).join("|"));
                } else {
                    prefixesMap[prefix].push(parsed.slice(1).join("|"));
                }
            }
        }
    } else {
        for (var _i2 = 0; _i2 < prefixes.length; _i2++) {
            prefixesMap[prefixes[_i2]] = inputs[_i2];
        }
    }

    return prefixesMap;
}

function dateMsToStr(milliseconds) {
    var date = new Date(milliseconds);
    var year = parseInt(date.getFullYear());
    var month = parseInt(date.getMonth()) + 1;
    var day = parseInt(date.getDate());
    var hour = parseInt(date.getHours());
    var minute = parseInt(date.getMinutes());
    var second = parseInt(date.getSeconds());
    var a =
        "" +
        year.toString() +
        "-" +
        month.toString() +
        "-" +
        day.toString() +
        " " +
        hour.toString() +
        ":" +
        minute.toString() +
        ":" +
        second.toString();

    return a;
}

/**
 * Custom function cffcCameraOut
 *
 * @function cffcCameraOut
 * @author Sami Akkari
 *
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - serialNumber
 * @param {string} inputArg3 - pictureNumber
 * @param {string} inputArg4 - processName
 * @param {string} inputArg5 - linkLocal
 * @param {string} inputArg6 - lingGlobal
 * @param {string} inputArg7 - cycleTime
 * @param {string} inputArg8 - result
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcCameraOut(inputArg1, inputArg2, inputArg3, inputArg4, inputArg5, inputArg6, inputArg7, inputArg8) {
    if (prod_cffcCameraOut) {
        var expectedNumberOfParams = 5;
        try {
            checkForNullAndPipes(arguments, expectedNumberOfParams);
        } catch (e) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, e.toString());
        }

        var inputs = parsePrefixes(arguments, ["ST", "SN", "PN", "PNA", "LL", "LG", "CT", "RC"]);

        var stationNumber = inputs.ST;
        var serialNumber = inputs.SN;
        var pictureNumber = inputs.PN;
        var processName = inputs.PNA;
        var linkLocal = inputs.LL;
        var linkGlobal = inputs.LG;
        var cycleTime = inputs.CT;
        var result = inputs.RC;

        if (
            !stationNumber ||
            !serialNumber ||
            !pictureNumber ||
            !processName ||
            (linkGlobal && linkLocal) ||
            (!linkGlobal && !linkLocal)
        ) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }

        if (!cycleTime || cycleTime == "") {
            cycleTime = 0;
        }

        if (result && result != 0) {
            return generateReturn(-1, "Transaction not OK");
        }

        //------------------trGetStationSetting----------------------
        var stationSettingResultKeys = [ImsApiKey.PROCESS_LAYER];

        var result_trGetStationSetting = imsApiService.trGetStationSetting(
            imsApiSessionContext,
            stationNumber, // String
            stationSettingResultKeys // String[]
        );
        var return_value = result_trGetStationSetting.return_value;
        if (return_value != 0) {
        }
        var stationSettingResultValues = result_trGetStationSetting.stationSettingResultValues;
        var processLayer = stationSettingResultValues[0];

        //------------------trUploadResultDataAndRecipe----------------------
        var recipeVersionId = "-1";
        var serialNumberRef = serialNumber;
        var serialNumberRefPos = "-1";
        var serialNumberState = 0;
        var duplicateSerialNumber = 0;
        var bookDate = -1;
        var recipeVersionMode = -1;
        var resultUploadKeys = [
            ImsApiKey.ERROR_CODE,
            ImsApiKey.MEASURE_FAIL_CODE,
            ImsApiKey.MEASURE_NAME,
            ImsApiKey.MEASURE_VALUE,
            ImsApiKey.UNIT
        ];
        var resultUploadValues = [
            0,
            0,
            "processName",
            processName,
            "",
            0,
            0,
            "pictureNumber",
            pictureNumber,
            "",
            0,
            0,
            "result",
            result,
            ""
        ];

        var result_trUploadResultDataAndRecipe = imsApiService.trUploadResultDataAndRecipe(
            imsApiSessionContext,
            stationNumber, // String
            processLayer, // int
            recipeVersionId, // int
            serialNumberRef, // String
            serialNumberRefPos, // String
            serialNumberState, // int
            duplicateSerialNumber, // int
            bookDate, // long
            cycleTime, // float
            recipeVersionMode, // int
            resultUploadKeys, // String[]
            resultUploadValues // String[]
        );
        var return_value = result_trUploadResultDataAndRecipe.return_value;
        if (return_value != 0) {
            return generateReturn(-1, "Transaction not OK");
        }

        return generateReturn(0, "");
    } else {
        return generateReturn(0, "");
    }
}

function updateUserAttribute(stationNumber, userId, password, tokenID) {
    var objectrequestType = 7;
    var objectNumber = stationNumber;
    var objectDetail = -1;
    var bookDate = -1;
    var allowOverWrite = 1;
    var attributeUploadKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
    var attributeUploadValues = ["USER_INFO", userId + "|" + password + "|" + tokenID, 0];
    var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
        imsApiSessionContext,
        stationNumber, // String
        objectrequestType, // int
        objectNumber, // String
        objectDetail, // String
        bookDate, // long
        allowOverWrite, // int
        attributeUploadKeys, // String[]
        attributeUploadValues // String[]
    );
    var return_value = result_attribAppendAttributeValues.return_value;
    if (return_value != 0) {
        return generateError(-1002, "Fehler in MES API attribAppendAttributeValues");
    }
}

/**
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - tokenID
 * @param {string} inputArg3 - userId
 * @param {string} inputArg4 - password
 * @param {string} inputArg5 - requestType
 * @returns {Result_customFunctionCommon}
 */
// eslint-disable-next-line no-shadow
function cffcCheckUser(stationNumber, tokenID, userId, password, requestType) {
    if (prod_cffcCheckUser) {
        if (!stationNumber || !requestType) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "invalid input");
        }
        if (!tokenID) {
            if (userId && password) {
                //-----------mdataGetUserGroupData
                var mdataGetUserGroupDataFilter = new Array(new KeyValue("USER_NAME", userId));
                var mdataGetUserGroupDataKeys = new Array("USER_GROUP_NAME");
                var result_mdataGetUserGroupData = imsApiService.mdataGetUserGroupData(
                    imsApiSessionContext,
                    stationNumber,
                    mdataGetUserGroupDataFilter,
                    mdataGetUserGroupDataKeys
                );
                if (result_mdataGetUserGroupData.return_value !== 0) {
                    return generateError(-1002, "Fehler in MES API mdataGetUserGroupData");
                }
                var UserGroup = new Array();
                for (var i = 0; i < result_mdataGetUserGroupData.mdataGetUserGroupDataValues.length; i++) {
                    UserGroup.push(result_mdataGetUserGroupData.mdataGetUserGroupDataValues[i]);
                }
            }
            if (requestType == 1) {
                //regRegisterUser
                var result_regRegisterUser = imsApiService.regRegisterUser(
                    imsApiSessionContext,
                    stationNumber,
                    userId,
                    password,
                    01
                );
                if (result_regRegisterUser.return_value == -106) {
                    return generateReturn(1, "This user has already logged into the station");
                }
                if (result_regRegisterUser.return_value == -107) {
                    return generateReturn(1, "Another user is already logged into the station");
                }
                if (result_regRegisterUser.return_value !== 0) {
                    return generateReturn(1, "User/password-combination or token invalid");
                }
                //------------------------attribAppendAttributeValues--------------------------
                updateUserAttribute(stationNumber, userId, password, tokenID);
            }
        } else {
            //mdataGetUserData
            var mdataGetUserDataFilter = new Array(new KeyValue("USER_TOKEN", tokenID));
            var mdataGetUserDataKeys = new Array("USER_NAME");
            var result_mdataGetUserData = imsApiService.mdataGetUserData(
                imsApiSessionContext,
                stationNumber,
                mdataGetUserDataFilter,
                mdataGetUserDataKeys
            );
            if (result_mdataGetUserData.return_value !== 0) {
                if (userId && password) {
                    //mdataGetUserGroupData
                    var mdataGetUserGroupDataFilter = new Array(new KeyValue("USER_NAME", userId));
                    var mdataGetUserGroupDataKeys = new Array("USER_GROUP_NAME");
                    var result_mdataGetUserGroupData = imsApiService.mdataGetUserGroupData(
                        imsApiSessionContext,
                        stationNumber,
                        mdataGetUserGroupDataFilter,
                        mdataGetUserGroupDataKeys
                    );
                    if (result_mdataGetUserGroupData.return_value !== 0) {
                        return generateError(-1002, "Fehler in MES API mdataGetUserGroupData");
                    }
                    var UserGroup = new Array();
                    for (var i = 0; i < result_mdataGetUserGroupData.mdataGetUserGroupDataValues.length; i++) {
                        UserGroup.push(result_mdataGetUserGroupData.mdataGetUserGroupDataValues[i]);
                    }
                    if (requestType == 1) {
                        //regRegisterUser
                        var result_regRegisterUser = imsApiService.regRegisterUser(
                            imsApiSessionContext,
                            stationNumber,
                            userId,
                            password,
                            01
                        );
                        if (result_regRegisterUser.return_value == -106) {
                            return generateReturn(1, "This user has already logged into the station");
                        }
                        if (result_regRegisterUser.return_value == -107) {
                            return generateReturn(1, "Another user is already logged into the station");
                        }
                        if (result_regRegisterUser.return_value !== 0) {
                            return generateReturn(1, "User/password-combination or token invalid");
                        }
                        //------------------------attribAppendAttributeValues--------------------------
                        updateUserAttribute(stationNumber, userId, password, tokenID);
                    }
                } else {
                    return generateReturn(1, "User/password-combination or token invalid");
                }
            } else {
                var userId = result_mdataGetUserData.mdataGetUserDataValues[0];
                //mdataGetUserGroupData
                var mdataGetUserGroupDataFilter = new Array(new KeyValue("USER_NAME", userId));
                var mdataGetUserGroupDataKeys = new Array("USER_GROUP_NAME");
                var result_mdataGetUserGroupData = imsApiService.mdataGetUserGroupData(
                    imsApiSessionContext,
                    stationNumber,
                    mdataGetUserGroupDataFilter,
                    mdataGetUserGroupDataKeys
                );
                if (result_mdataGetUserGroupData.return_value !== 0) {
                    return generateError(-1002, "Fehler in MES API mdataGetUserGroupData");
                }
                var UserGroup = new Array();
                for (var i = 0; i < result_mdataGetUserGroupData.mdataGetUserGroupDataValues.length; i++) {
                    UserGroup.push(result_mdataGetUserGroupData.mdataGetUserGroupDataValues[i]);
                }
                if (requestType == 1) {
                    var result_regRegisterUser = imsApiService.regRegisterUser(
                        imsApiSessionContext,
                        stationNumber,
                        null,
                        tokenID,
                        01
                    );
                    if (result_regRegisterUser.return_value == -106) {
                        return generateReturn(1, "This user has already logged into the station");
                    }
                    if (result_regRegisterUser.return_value == -107) {
                        return generateReturn(1, "Another user is already logged into the station");
                    }
                    if (result_regRegisterUser.return_value !== 0) {
                        return generateReturn(1, "User/password-combination or token invalid");
                    }
                    //------------------------attribAppendAttributeValues--------------------------
                    updateUserAttribute(stationNumber, "", "", tokenID);
                }
            }
        }

        if (requestType == 0) {
            var objectrequestType = 7;
            var objectNumber = stationNumber;
            var objectDetail = -1;
            var attributeCodeArray = ["USER_INFO"];
            var allMergeLevel = 0;
            var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
            var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
                imsApiSessionContext,
                stationNumber, // String
                objectrequestType, // int
                objectNumber, // String
                objectDetail, // String
                attributeCodeArray, // String[]
                allMergeLevel, // int
                attributeResultKeys // String[]
            );
            var return_value = result_attribGetAttributeValues.return_value;
            if (return_value != 0) {
                return generateError(-1002, "Fehler in MES API attribGetAttributeValues");
            }
            var userInfo = "" + result_attribGetAttributeValues.attributeResultValues[1];

            userName = userInfo.split("|")[0];
            password = userInfo.split("|")[1];
            tokenID = userInfo.split("|")[2];
            if (tokenID != "null") {
                userName = "";
                password = tokenID;
            }
            //--------------------regUnregisterUser--------------------
            var result_regUnregisterUser = imsApiService.regUnregisterUser(
                imsApiSessionContext,
                stationNumber, // --> String
                userName, // --> String
                password, // --> String
                "01" // --> String
            );

            var return_value = result_regUnregisterUser.return_value;
            if (return_value == -104) {
                return generateReturn(1, "No user has logged into the station");
            }
            if (return_value == -107) {
                return generateReturn(1, "Another user is already logged into the station");
            }
            if (return_value !== 0) {
                return generateReturn(1, "User/password-combination or token invalid");
            }

            updateUserAttribute(stationNumber, "", "", "");
            userId = userName;
            UserGroup = [];
        }
        return generateReturn(0, "", [userId, UserGroup[0]]);
    } else {
        return generateReturn(0, "", ["userID", "userGroup"]);
    }
}
function getParamValueFromStationConfigMap(stationNumber, parameterName, key) {
    var result = null;

    var configContext = [
        new KeyValue("CONFIG_APPID", APPID),
        new KeyValue("CONFIG_APPTYPE", APPTYPE),
        new KeyValue("CONFIG_CLUSTER", CLUSTER),
        new KeyValue("CONFIG_STATION", stationNumber)
    ];
    var parameterFilter = new Array(new KeyValue("PARAMETER_NAME", parameterName));
    var parameterResultKeys = [];
    var resultKeys = [ImsApiKey.CONFIG_KEY, ImsApiKey.CONFIG_VALUE];
    var result_configGetValues = imsApiService.configGetValues(
        imsApiSessionContext,
        (options = []), // KeyValue[]
        configContext, // KeyValue[]
        parameterFilter, // KeyValue[]
        parameterResultKeys, // String[]
        resultKeys // String[]
    );
    var return_value = result_configGetValues.return_value;
    if (return_value != 0) {
        return result;
    }
    var resultValues = result_configGetValues.resultValues;

    //logHandler.logMessage("#### len = " + resultValues.length);
    for (var i = 0; i < resultValues.length / 2; i++) {
        var key_ = resultValues[i * 2];
        var val_ = resultValues[i * 2 + 1];
        if (key_ == key) result = val_;
    }

    return result;
}

/**
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - amount
 * @returns {Result_customFunctionCommon}
 */
function cffcGetSerialNumber(inputArg1, inputArg2) {
    if (prod_cffcGetSerialNumber) {
        var expectedNumberOfParams = 2;
        try {
            checkForNullAndPipes(arguments, expectedNumberOfParams);
            var stationNumber = inputArg1;
            var amount = parseInt(inputArg2);

            if (!stationNumber || !amount) {
                // eslint-disable-next-line no-magic-numbers
                return generateReturn(-1001, "invalid input");
            }

            var serialNumbersOut = [];
            var serialNumberRef = "";

            // Api flow
            var stationSettingResultKeys = ["WORKORDER_NUMBER", "PROCESS_LAYER", "PART_NUMBER"];
            var result_trGetStationSetting = imsApiService.trGetStationSetting(
                imsApiSessionContext,
                stationNumber, // --> String
                stationSettingResultKeys // --> String[]
            );
            var return_value = result_trGetStationSetting.return_value;
            if (return_value != 0) {
                return generateReturn(-1002, "Fehler in MES API trGetStationSetting : " + return_value);
            }
            var stationSettingResultValues = result_trGetStationSetting.stationSettingResultValues;
            var workOrderNumber = stationSettingResultValues[0];
            var processLayer = stationSettingResultValues[1];
            var partNumber = stationSettingResultValues[2];

            var result_trGetNextSerialNumber = imsApiService.trGetNextSerialNumber(
                imsApiSessionContext,
                stationNumber, // --> String
                workOrderNumber, // --> String (mandatory to get WO text 1)
                partNumber,
                amount // --> int
            );
            var return_value = result_trGetNextSerialNumber.return_value;
            if (return_value != 0) {
                return generateReturn(-1002, "Fehler in MES API trGetNextSerialNumber : " + return_value);
            }

            var serialNumberArray = result_trGetNextSerialNumber.serialNumberArray;

            var serialNumberRef = "001" + serialNumberArray[0].serialNumber;
            serialNumbersOut.push(serialNumberRef);
            var serialNumberRefPos = "0";

            var snrArray = new Array();

            for (var i = 0; i < serialNumberArray.length; i++) {
                var snrData = new SerialNumberData();
                snrData.serialNumber = "002" + serialNumberArray[i].serialNumber;
                snrData.serialNumberPos = "" + i + 1;
                snrData.serialNumberOld = "";
                snrArray.push(snrData);
                serialNumbersOut.push(snrData.serialNumber);
            }

            var bomVersion = "-1";
            var serialNumberRefPos = "0";
            var activateWorkOrder = 1;
            var result_trAssignSerialNumberForProductOrWorkOrder = imsApiService.trAssignSerialNumberForProductOrWorkOrder(
                imsApiSessionContext,
                stationNumber, // --> String
                workOrderNumber, // --> String
                partNumber, // --> String
                bomVersion, // --> String
                serialNumberRef, // --> String
                serialNumberRefPos, // --> String
                processLayer, // --> int
                snrArray, // --> SerialNumberData[]
                activateWorkOrder // --> int
            );
            var return_value = result_trAssignSerialNumberForProductOrWorkOrder.return_value;
            if (return_value != 0) {
                return generateReturn(
                    -1002,
                    "Fehler in MES API trAssignSerialNumberForProductOrWorkOrder : " + return_value
                );
            }

            var PMU_Station = getParamValueFromStationConfigMap(stationNumber, "Customer.Laser.PmuStation", "PMU");

            if (PMU_Station) {
                // * This section for the upload of the buffered measures on the PMU station
                //--------------------------------trGetStationSetting---------------------------------
                var stationSettingResultKeys = ["WORKORDER_NUMBER", "PROCESS_LAYER", "PART_NUMBER"];
                var result_trGetStationSetting = imsApiService.trGetStationSetting(
                    imsApiSessionContext,
                    PMU_Station, // --> String
                    stationSettingResultKeys // --> String[]
                );
                var return_value = result_trGetStationSetting.return_value;
                if (return_value != 0) {
                    return generateReturn(-1002, "Fehler in MES API trGetStationSetting : " + return_value);
                }
                var stationSettingResultValues = result_trGetStationSetting.stationSettingResultValues;
                var workOrderNumber = stationSettingResultValues[0];
                var processLayer = stationSettingResultValues[1];
                var partNumber = stationSettingResultValues[2];

                //--------------------------------attribGetAttributeValues---------------------------------
                var objectType = 7;
                var objectNumber = stationNumber;
                var objectDetail = "-1";
                var attributeCodeArray = ["PMU_MEAS"];
                var allMergeLevel = 1;
                var attributeResultKeys = [ImsApiKey.ERROR_CODE, ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE];
                var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
                    imsApiSessionContext,
                    PMU_Station, // String
                    objectType, // int
                    objectNumber, // String
                    objectDetail, // String
                    attributeCodeArray, // String[]
                    allMergeLevel, // int
                    attributeResultKeys // String[]
                );
                var return_value = result_attribGetAttributeValues.return_value;
                if (return_value != 0) {
                    return generateReturn(-1002, "Fehler in MES API attribGetAttributeValues : " + return_value);
                }
                var attributeResultValues = result_attribGetAttributeValues.attributeResultValues;
                var measurementData = "" + attributeResultValues[2];

                //--------------------------------trUploadResultDataAndRecipe---------------------------------
                var measureValues = [];
                if (!(measurementData == undefined || measurementData == null || measurementData == "")) {
                    var mv = measurementData.split("|");

                    for (var i = 0; i < mv.length; i = i + 2) {
                        measureValues.push("0", "0", "" + mv[i], "" + mv[i + 1]);
                    }

                    var stationNumber = stationNumber;
                    var processLayer = processLayer;
                    var recipeVersionId = "-1";
                    var serialNumberRef = serialNumberRef;
                    var serialNumberRefPos = "-1";
                    var serialNumberState = 0;
                    var duplicateSerialNumber = 1;
                    var bookDate = -1;
                    var cycleTime = 0;
                    var recipeVersionMode = "-1";
                    var resultUploadKeys = ["ERROR_CODE", "MEASURE_FAIL_CODE", "MEASURE_NAME", "MEASURE_VALUE"];
                    var resultUploadValues = measureValues;

                    var result_trUploadResultDataAndRecipe = imsApiService.trUploadResultDataAndRecipe(
                        imsApiSessionContext,
                        PMU_Station, // String
                        processLayer, // int
                        recipeVersionId, // int
                        serialNumberRef, // String
                        serialNumberRefPos, // String
                        serialNumberState, // int
                        duplicateSerialNumber, // int
                        bookDate, // long
                        cycleTime, // float
                        recipeVersionMode, // int
                        resultUploadKeys, // String[]
                        resultUploadValues // String[]
                    );
                    var return_value = result_trUploadResultDataAndRecipe.return_value;
                    if (return_value != 0) {
                        return generateReturn(-1002, "Fehler in MES API trUploadResultDataAndRecipe : " + return_value);
                    }
                }
            }
            return generateReturn(0, "", serialNumbersOut);
        } catch (e) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, e.toString());
        }
    } else {
        return generateReturn(0, "", [
            [
                "snr01",
                "snr02",
                "snr03",
                "snr04",
                "snr05",
                "snr06",
                "snr07",
                "snr08",
                "snr09",
                "snr10",
                "snr11",
                "snr12",
                "snr13"
            ],
            13
        ]);
    }

    return generateReturn(0, "", [serialNumbersOut, amount]);
}

/**
 * @param {string} inputArg1 - serialNumber
 * @param {string} inputArg2 - sensorPosition
 * @param {string} inputArg3 - stationNumber
 * @param {string} inputArg4 - cycleTime
 * @param {string} inputArg5 - processName
 * @param {string} inputArg6 - reportedPlateAmount
 * @param {string} inputArg7 - measurementValue
 * @param {string} inputArg8 - reportValue
 * @param {string} inputArg9 - errorCode
 * @returns {Result_customFunctionCommon}
 */
function cffcIEOut(inputArg1, inputArg2, inputArg3, inputArg4, inputArg5, inputArg6, inputArg7, inputArg8, inputArg9) {
    // // TODO: implement after specification is ready
    if (prod_cffcIEOut) {
        var expectedNumberOfParams = 6;
        try {
            checkForNullAndPipes(arguments, expectedNumberOfParams);
        } catch (e) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, e.toString());
        }
        var inputs = parsePrefixes(arguments, ["SN", "SP", "ST", "CT", "PNA", "RP", "MV", "RV", "EC"]);
        var serialNumber = inputs.SN;
        var sensorPosition = inputs.SP;
        var stationNumber = inputs.ST;
        var cycleTime = inputs.CT;
        var processName = inputs.PNA;
        var reportedPlateAmount = inputs.RP;
        //! Optional multiple - to be implemented
        var measurementValue = inputs.MV;
        var reportValue = inputs.RV;
        var errorCode = inputs.EC;
        if (!serialNumber || !sensorPosition || !stationNumber || !cycleTime || !processName || !reportedPlateAmount) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        //------------------trGetStationSetting----------------------
        var stationSettingResultKeys = [ImsApiKey.PROCESS_LAYER];
        var result_trGetStationSetting = imsApiService.trGetStationSetting(
            imsApiSessionContext,
            stationNumber, // String
            stationSettingResultKeys // String[]
        );
        var return_value = result_trGetStationSetting.return_value;
        if (return_value != 0) {
            return generateReturn(-1, "Transaction not OK");
        }
        var stationSettingResultValues = result_trGetStationSetting.stationSettingResultValues;
        var processLayer = stationSettingResultValues[0];
        //------------------trUploadResultDataAndRecipe----------------------
        var recipeVersionId = "-1";
        var serialNumberRef = serialNumber;
        var serialNumberRefPos = "-1";
        var serialNumberState = 0;
        var duplicateSerialNumber = 0;
        var bookDate = -1;
        var recipeVersionMode = -1;
        var resultUploadKeys = [
            ImsApiKey.ERROR_CODE,
            ImsApiKey.MEASURE_FAIL_CODE,
            ImsApiKey.MEASURE_NAME,
            ImsApiKey.MEASURE_VALUE,
            ImsApiKey.UNIT
        ];
        // single entries (PNA, RP --> Mandatory)
        var resultUploadValues = [
            0,
            0,
            "processName",
            processName,
            "",
            0,
            0,
            "reportedPlateAmount",
            reportedPlateAmount,
            ""
        ];
        // multiple entries (MV --> Optional)
        if (Array.isArray(measurementValue)) {
            for (var i = 0; i < measurementValue.length; i++) {
                var mesName = measurementValue[i].split("|")[0] ? measurementValue[i].split("|")[0] : "";
                var mesValue = measurementValue[i].split("|")[1] ? measurementValue[i].split("|")[1] : "";
                var mesUnit = measurementValue[i].split("|")[2] ? measurementValue[i].split("|")[2] : "";
                resultUploadValues.push(0, 0, mesName, mesValue, mesUnit);
            }
        } else {
            var mesName = measurementValue.split("|")[0] ? measurementValue.split("|")[0] : "";
            var mesValue = measurementValue.split("|")[1] ? measurementValue.split("|")[1] : "";
            var mesUnit = measurementValue.split("|")[2] ? measurementValue.split("|")[2] : "";
            resultUploadValues.push(0, 0, mesName, mesValue, mesUnit);
        }
        var result_trUploadResultDataAndRecipe = imsApiService.trUploadResultDataAndRecipe(
            imsApiSessionContext,
            stationNumber, // String
            processLayer, // int
            recipeVersionId, // int
            serialNumberRef, // String
            serialNumberRefPos, // String
            serialNumberState, // int
            duplicateSerialNumber, // int
            bookDate, // long
            cycleTime, // float
            recipeVersionMode, // int
            resultUploadKeys, // String[]
            resultUploadValues // String[]
        );
        var return_value = result_trUploadResultDataAndRecipe.return_value;
        if (return_value != 0) {
            return generateReturn(-1, "Transaction not OK");
        }
    } else {
        return generateReturn(0, "");
    }
}

function getSubstractIdFromSnr(snr) {
    var ref = snr;
    return snr;
    ref = "001" + ref.slice(3);
    return ref;
}

function getFirstSnrPosition(stationNumber, snr) {
    var first;
    return snr;
    var result_trGetSerialNumberBySerialNumberRef = imsApiService.trGetSerialNumberBySerialNumberRef(
        imsApiSessionContext,
        stationNumber, // String
        (serialNumberRef = snr), // String
        (serialNumberRefPos = "-1") // String
    );
    var return_value = result_trGetSerialNumberBySerialNumberRef.return_value;
    if (return_value != 0 && return_value != -203) {
        return "-1";
    }
    var serialNumberArray = result_trGetSerialNumberBySerialNumberRef.serialNumberArray;
    first = serialNumberArray[0].serialNumber;

    return first;
}

/**
 * @author Faouzi Ben Mabrouk
 * @since 9.50.00
 * @version 1.0
 *
 * @param {string} stationNumber
 * @param {string} serialNumber
 * @param {string} position
 * @param {number} loadTimeStamp
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcLoadChamberConfirmation(stationNumber, serialNumber, position, loadTimeStamp) {
    if (prod_cffcLoadChamberConfirmation) {
        if (!serialNumber || !stationNumber || !position || !loadTimeStamp) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparameter");
        }
        //loadTimeStamp = parseInt(loadTimeStamp) * 1000;

        //--------------------------------------------------------------------------------------------------
        var firstSnr = getFirstSnrPosition(stationNumber, serialNumber);
        var substractId = getSubstractIdFromSnr(serialNumber);
        var assignSerialNumberToCarrierKeys = ["ERROR_CODE", "SERIAL_NUMBER", "SERIAL_NUMBER_POS"];
        var assignSerialNumberToCarrierValues = [0, firstSnr, "-1"];

        var result_equAssignSerialNumberToCarrier = imsApiService.equAssignSerialNumberToCarrier(
            imsApiSessionContext,
            stationNumber, // String
            (equipmentNumber = stationNumber), // String
            (equipmentIndex = 0), // String
            (setState = 0), // int
            assignSerialNumberToCarrierKeys, // String[]
            assignSerialNumberToCarrierValues // String[]
        );
        var return_value = result_equAssignSerialNumberToCarrier.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API equAssignSerialNumberToCarrier");
        }

        var attributeUploadKeys = ["ATTRIBUTE_CODE", "ATTRIBUTE_VALUE"];
        var attributeUploadValues = ["SLOT", position];
        var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
            imsApiSessionContext,
            stationNumber, // String
            (objectType = 0), // int
            (objectNumber = firstSnr), // String
            (objectDetail = "-1"), // String
            (bookDate = -1), // long
            (allowOverWrite = 0), // int
            attributeUploadKeys, // String[]
            attributeUploadValues // String[]
        );
        var return_value = result_attribAppendAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribAppendAttributeValues");
        }
        var attributeResultValues = result_attribAppendAttributeValues.attributeResultValues;

        var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
            imsApiSessionContext,
            stationNumber,
            0,
            substractId,
            "-1",
            -1,
            1,
            [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE],
            ["EINLAGER_DATUM", loadTimeStamp, 0]
        );
        var return_value = result_attribAppendAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribAppendAttributeValues");
        }
        return generateReturn(0, "");
        //--------------------------------------------------------------------------------------------------
    } else {
        return generateReturn(0, "");
    }
}

/**
 * @param {string} stationNumber
 * @param {string} magazineNumber
 * @param {string} direction
 * @param {number} serialNumber
 * @param {number} slotId
 * @param {number} timestamp
 * @param {number} plateState
 * @returns {Result_customFunctionCommon}
 */
function cffcLoadUnloadPlates(stationNumber, magazineNumber, direction, serialNumber, slotId, timestamp, plateState) {
    if (prod_cffcLoadUnloadPlates) {
        var expectedNumberOfParams = 4;
        var remainingPlates = "";
        if (!stationNumber || !magazineNumber || !direction || !serialNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        if (timestamp) {
            timestamp = parseInt(timestamp) * 1000;
        } else {
            timestamp = -1;
        }
        //---------------shipGetSerialNumberDataForShippingLot--------------
        var serialNumberResultKeys = [ImsApiKey.SERIAL_NUMBER];
        var result_shipGetSerialNumberDataForShippingLot = imsApiService.shipGetSerialNumberDataForShippingLot(
            imsApiSessionContext,
            stationNumber, // String
            magazineNumber, // String
            serialNumberResultKeys // String[]
        );
        var return_value = result_shipGetSerialNumberDataForShippingLot.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API shipGetSerialNumberDataForShippingLot");
        }
        var refSerialNumbers = result_shipGetSerialNumberDataForShippingLot.serialNumberResultValues;
        if (direction == 0) {
            //---------------attribGetAttributeValues-------------------------
            var objectType = 0;
            var objectNumber = refSerialNumbers[slotId - 1];
            var objectDetail = "-1";
            var attributeCodeArray = ["POS_IN_MAGAZIN"];
            var allMergeLevel = 0;
            var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
            var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
                imsApiSessionContext,
                stationNumber, // String
                objectType, // int
                objectNumber, // String
                objectDetail, // String
                attributeCodeArray, // String[]
                allMergeLevel, // int
                attributeResultKeys // String[]
            );
            var return_value = result_attribGetAttributeValues.return_value;
            if (return_value != 0) {
                return generateError(-1002, "Fehler in MES API attribGetAttributeValues");
            }
            if (result_attribGetAttributeValues.attributeResultValues[1] == slotId) {
                //---------------attribRemoveAttributeValue-------------------------
                var objectType = 0;
                var objectNumber = refSerialNumbers[slotId - 1];
                var objectDetail = "-1";
                var attributeCode = "-1";
                var attributeValueKey = ["POS_IN_MAGAZIN"];
                var result_attribRemoveAttributeValue = imsApiService.attribRemoveAttributeValue(
                    imsApiSessionContext,
                    stationNumber, // String
                    objectType, // int
                    objectNumber, // String
                    objectDetail, // String
                    attributeCode, // String
                    attributeValueKey // String
                );
                var return_value = result_attribRemoveAttributeValue.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API attribRemoveAttributeValue");
                }
                //---------------attribRemoveAttributeValue-------------------------
                var objectType = 0;
                var objectNumber = refSerialNumbers[slotId - 1];
                var objectDetail = "-1";
                var attributeCode = "-1";
                var attributeValueKey = ["EINLAGER_DATUM"];
                var result_attribRemoveAttributeValue = imsApiService.attribRemoveAttributeValue(
                    imsApiSessionContext,
                    stationNumber, // String
                    objectType, // int
                    objectNumber, // String
                    objectDetail, // String
                    attributeCode, // String
                    attributeValueKey // String
                );
                var return_value = result_attribRemoveAttributeValue.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API attribRemoveAttributeValue");
                }
                //--------------------shipRemoveSerialNumberFromShippingLot---------------------
                var serialNumberPos = "-1";
                var bookDate = timestamp;
                var result_shipRemoveSerialNumberFromShippingLot = imsApiService.shipRemoveSerialNumberFromShippingLot(
                    imsApiSessionContext,
                    stationNumber, // String
                    magazineNumber, // String
                    serialNumber, // String
                    serialNumberPos, // String
                    bookDate // long
                );
                var return_value = result_shipRemoveSerialNumberFromShippingLot.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API attribRemoveAttributeValue");
                }
                if (refSerialNumbers.length == 1) {
                    return generateError(1, "Magazin leer. Neues benötigt");
                } else {
                    SoltCalc(stationNumber, magazineNumber, direction);
                }
            } else {
                return generateError(-2000, "Seriennummer und Magazinposition passen nicht zusammen");
            }
        } else if (direction == 1) {
            if (refSerialNumbers.length > slotId) {
                //-------------------attribAppendAttributeValues------------------------
                var objectType = 0;
                var objectNumber = serialNumber;
                var objectDetail = "-1";
                var bookDate = timestamp;
                var allowOverWrite = 1;
                var attributeUploadKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
                var attributeUploadValues = ["POS_IN_MAGAZIN", slotId, 0];
                var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
                    imsApiSessionContext,
                    stationNumber, // String
                    objectType, // int
                    objectNumber, // String
                    objectDetail, // String
                    bookDate, // long
                    allowOverWrite, // int
                    attributeUploadKeys, // String[]
                    attributeUploadValues // String[]
                );
                var return_value = result_attribAppendAttributeValues.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API attribAppendAttributeValues");
                }
                //-------------------mdataGetCalendarData------------------------
                var calendarDataResultKeys = ["CURRENT_TIME_MILLIS"];
                var result_mdataGetCalendarData = imsApiService.mdataGetCalendarData(
                    imsApiSessionContext,
                    stationNumber,
                    calendarDataResultKeys
                );
                if (result_mdataGetCalendarData.return_value !== 0) {
                    return generateError(result_mdataGetCalendarData.return_value, "mdataGetCalendarData");
                }
                var sysdate = Number(result_mdataGetCalendarData.calendarDataResultValues[0]);
                //-------------------attribAppendAttributeValues------------------------
                var objectType = 0;
                var objectNumber = serialNumber;
                var objectDetail = "-1";
                var bookDate = timestamp;
                var allowOverWrite = 1;
                var attributeUploadKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
                var attributeUploadValues = ["EINLAGER_DATUM", sysdate, 0];
                var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
                    imsApiSessionContext,
                    stationNumber, // String
                    objectType, // int
                    objectNumber, // String
                    objectDetail, // String
                    bookDate, // long
                    allowOverWrite, // int
                    attributeUploadKeys, // String[]
                    attributeUploadValues // String[]
                );
                var return_value = result_attribAppendAttributeValues.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API attribAppendAttributeValues");
                }
                //-------------------shipActivateShippingLotAtKap---------------------
                var result_shipActivateShippingLotAtKap = imsApiService.shipActivateShippingLotAtKap(
                    imsApiSessionContext,
                    stationNumber, // String
                    magazineNumber // String
                );
                var return_value = result_shipActivateShippingLotAtKap.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API shipActivateShippingLotAtKap");
                }
                //-------------------shipAddSerialNumberToShippingLot---------------------
                var lotNumber = magazineNumber;
                var serialNumberPos = -1;
                var bookDate = -1;
                var result_shipAddSerialNumberToShippingLot = imsApiService.shipAddSerialNumberToShippingLot(
                    imsApiSessionContext,
                    stationNumber, // String
                    lotNumber, // String
                    serialNumber, // String
                    serialNumberPos, // int
                    bookDate // long
                );
                var return_value = result_shipAddSerialNumberToShippingLot.return_value;
                if (return_value < 0) {
                    return generateError(-1002, "Fehler in MES API shipAddSerialNumberToShippingLot");
                }
                if (return_value == 405) {
                    return generateError(2, "Magazin voll. Neues benötigt");
                }
                if (return_value >= 0 && return_value != 405) {
                    SoltCalc(stationNumber, magazineNumber, direction);
                }
            } else {
                return generateError(-2001, "Seriennummer passt nicht auf angegebenen Slot");
            }
        } else if (direction == 2) {
            if (refSerialNumbers.length > slotId) {
                //-----------------------trGetNextProductionStep------------------------
                var serialNumberPos = -1;
                var functionMode = 0;
                var stateCheck = 0;
                var confirmFlag = 1;
                var productionStepResultKeys = [
                    ImsApiKey.STATION_NUMBER,
                    ImsApiKey.WORKSTEP_AVO,
                    ImsApiKey.PROCESS_LAYER
                ];
                var result_trGetNextProductionStep = imsApiService.trGetNextProductionStep(
                    imsApiSessionContext,
                    stationNumber, // String
                    serialNumber, // String
                    serialNumberPos, // String
                    functionMode, // int
                    stateCheck, // int
                    confirmFlag, // int
                    productionStepResultKeys // String[]
                );
                var return_value = result_trGetNextProductionStep.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API trGetNextProductionStep");
                }
                var nextStationNumber = result_trGetNextProductionStep.productionStepResultValues[0];
                var nextAVO = result_trGetNextProductionStep.productionStepResultValues[1];
                var processLayer = result_trGetNextProductionStep.productionStepResultValues[2];
                //----------------------trUploadState-----------------------
                var serialNumberRef = serialNumber;
                var serialNumberRefPos = -1;
                var serialNumberState = 2;
                var duplicateSerialNumber = 1;
                var bookDate = timestamp;
                var cycleTime = 0;
                var serialNumberUploadKeys = [
                    ImsApiKey.ATTRIBUTE_CODE,
                    ImsApiKey.ATTRIBUTE_VALUE,
                    ImsApiKey.ERROR_CODE
                ];
                var serialNumberUploadValues = [];
                var result_trUploadState = imsApiService.trUploadState(
                    imsApiSessionContext,
                    stationNumber, // String
                    processLayer, // int
                    serialNumberRef, // String
                    serialNumberRefPos, // String
                    serialNumberState, // int
                    duplicateSerialNumber, // int
                    bookDate, // long
                    cycleTime, // float
                    serialNumberUploadKeys, // String[]
                    serialNumberUploadValues // String[]
                );
                var return_value = result_trUploadState.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API trUploadState");
                }
                //------------------attribAppendAttributeValues----------------
                var objectType = 0;
                var objectNumber = serialNumber;
                var objectDetail = "-1";
                var bookDate = timestamp;
                var allowOverWrite = 1;
                var attributeUploadKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
                var attributeUploadValues = ["POS_IN_MAGAZIN", slotId, 0];
                var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
                    imsApiSessionContext,
                    stationNumber, // String
                    objectType, // int
                    objectNumber, // String
                    objectDetail, // String
                    bookDate, // long
                    allowOverWrite, // int
                    attributeUploadKeys, // String[]
                    attributeUploadValues // String[]
                );
                var return_value = result_attribAppendAttributeValues.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API attribAppendAttributeValues");
                }
                //-------------------mdataGetCalendarData------------------------
                var calendarDataResultKeys = ["CURRENT_TIME_MILLIS"];
                var result_mdataGetCalendarData = imsApiService.mdataGetCalendarData(
                    imsApiSessionContext,
                    stationNumber,
                    calendarDataResultKeys
                );
                if (result_mdataGetCalendarData.return_value !== 0) {
                    return generateError(result_mdataGetCalendarData.return_value, "mdataGetCalendarData");
                }
                var sysdate = Number(result_mdataGetCalendarData.calendarDataResultValues[0]);
                //------------------attribAppendAttributeValues----------------
                var objectType = 0;
                var objectNumber = serialNumber;
                var objectDetail = "-1";
                var bookDate = timestamp;
                var allowOverWrite = 1;
                var attributeUploadKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
                var attributeUploadValues = ["EINLAGER_DATUM", sysdate, 0];
                var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
                    imsApiSessionContext,
                    stationNumber, // String
                    objectType, // int
                    objectNumber, // String
                    objectDetail, // String
                    bookDate, // long
                    allowOverWrite, // int
                    attributeUploadKeys, // String[]
                    attributeUploadValues // String[]
                );
                var return_value = result_attribAppendAttributeValues.return_value;
                if (return_value != 0) {
                    return generateError(-1002, "Fehler in MES API attribAppendAttributeValues");
                }
                //-------------------shipAddSerialNumberToShippingLot---------------------
                var lotNumber = magazineNumber;
                var serialNumberPos = -1;
                var bookDate = timestamp;
                var result_shipAddSerialNumberToShippingLot = imsApiService.shipAddSerialNumberToShippingLot(
                    imsApiSessionContext,
                    stationNumber, // String
                    lotNumber, // String
                    serialNumber, // String
                    serialNumberPos, // int
                    bookDate // long
                );
                var return_value = result_shipAddSerialNumberToShippingLot.return_value;
                if (return_value < 0) {
                    return generateError(-1002, "Fehler in MES API shipAddSerialNumberToShippingLot");
                }
                if (return_value == 405) {
                    return generateError(2, "Magazin voll. Neues benötigt");
                }
                if (return_value >= 0 && return_value != 405) {
                    SoltCalc(stationNumber, magazineNumber, direction);
                }
            } else {
                return generateError(-2001, "Seriennummer passt nicht auf angegebenen Slot");
            }
        } else if (direction == 3) {
            //-----------------------trGetNextProductionStep------------------------
            var serialNumberPos = -1;
            var functionMode = 0;
            var stateCheck = 0;
            var confirmFlag = 1;
            var productionStepResultKeys = [ImsApiKey.STATION_NUMBER, ImsApiKey.WORKSTEP_AVO];
            var result_trGetNextProductionStep = imsApiService.trGetNextProductionStep(
                imsApiSessionContext,
                stationNumber, // String
                serialNumber, // String
                serialNumberPos, // String
                functionMode, // int
                stateCheck, // int
                confirmFlag, // int
                productionStepResultKeys // String[]
            );
            var return_value = result_trGetNextProductionStep.return_value;
            if (return_value != 0) {
                return generateError(-1002, "Fehler in MES API trGetNextProductionStep");
            }
            var nextStationNumber = result_trGetNextProductionStep.productionStepResultValues[0];
            var nextAVO = result_trGetNextProductionStep.productionStepResultValues[1];
            //----------------------trUploadState-----------------------
            var processLayer = nextAVO;
            var serialNumberRef = serialNumber;
            var serialNumberRefPos = -1;
            var serialNumberState = 2;
            var duplicateSerialNumber = 1;
            var bookDate = timestamp;
            var cycleTime = 0;
            var serialNumberUploadKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
            var serialNumberUploadValues = [];
            var result_trUploadState = imsApiService.trUploadState(
                imsApiSessionContext,
                stationNumber, // String
                processLayer, // int
                serialNumberRef, // String
                serialNumberRefPos, // String
                serialNumberState, // int
                duplicateSerialNumber, // int
                bookDate, // long
                cycleTime, // float
                serialNumberUploadKeys, // String[]
                serialNumberUploadValues // String[]
            );
            var return_value = result_trUploadState.return_value;
            if (return_value != 0) {
                return generateError(-1002, "Fehler in MES API trUploadState");
            }
            SoltCalc(stationNumber, magazineNumber, direction);
        }
        return generateReturn(0, "", [remainingPlates]);
    } else {
        return generateReturn(0, "", [15]);
    }
}

/**
 * Custom function cffcLoginMagazines
 *
 * @function cffcLoginMagazines
 * @author Sami Akkari
 *
 * @param {string} stationNumber
 * @param {string} magazineNumber
 * @param {number} position
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcLoginMagazines(stationNumber, magazineNumber, position) {
    // //? Is position needed here ?
    if (prod_cffcLoginMagazines) {
        var expectedNumberOfParams = 3;
        // try {
        //     checkForNullAndPipes(arguments, expectedNumberOfParams);
        // } catch (e) {
        //     // eslint-disable-next-line no-magic-numbers
        //     return generateReturn(-1001, e.toString());
        // }
        // if (!stationNumber || !magazineNumber) {
        //     // eslint-disable-next-line no-magic-numbers
        //     return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        // }
        //------------------attribGetAttributeValues----------------------
        var objectType = 2;
        var objectNumber = magazineNumber;
        var objectDetail = "-1";
        var attributeCodeArray = ["MATERIAL"];
        var allMergeLevel = 1;
        var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber, // String
            objectType, // int
            objectNumber, // String
            objectDetail, // String
            attributeCodeArray, // String[]
            allMergeLevel, // int
            attributeResultKeys // String[]
        );
        var return_value = result_attribGetAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
        }
        var attributeResultValues = result_attribGetAttributeValues.attributeResultValues;
        var magazinMaterial = attributeResultValues[1];
        //------------------trGetStationSetting----------------------
        var stationSettingResultKeys = ["PART_NUMBER"];
        var result_trGetStationSetting = imsApiService.trGetStationSetting(
            imsApiSessionContext,
            stationNumber, // String
            stationSettingResultKeys // String[]
        );
        var return_value = result_trGetStationSetting.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API trGetStationSetting");
        }
        var stationSettingResultValues = result_trGetStationSetting.stationSettingResultValues;
        var workorderMaterial = stationSettingResultValues[0];
        if (magazinMaterial != workorderMaterial || magazinMaterial == "") {
            return generateReturn(-1001, "Magazin pass nicht zum Auftrag");
        }
        //------------------shipActivateShippingLotAtKap----------------------
        var lotNumber = magazineNumber;
        var result_shipActivateShippingLotAtKap = imsApiService.shipActivateShippingLotAtKap(
            imsApiSessionContext,
            stationNumber, // String
            lotNumber // String
        );
        var return_value = result_shipActivateShippingLotAtKap.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API shipActivateShippingLotAtKap");
        }
        //------------------shipGetSerialNumberDataForShippingLot----------------------
        var lotNumber = magazineNumber;
        var serialNumberResultKeys = [ImsApiKey.SERIAL_NUMBER];
        var result_shipGetSerialNumberDataForShippingLot = imsApiService.shipGetSerialNumberDataForShippingLot(
            imsApiSessionContext,
            stationNumber, // String
            lotNumber, // String
            serialNumberResultKeys // String[]
        );
        var return_value = result_shipGetSerialNumberDataForShippingLot.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API shipGetSerialNumberDataForShippingLot");
        }
        var serialNumberResultValues = result_shipGetSerialNumberDataForShippingLot.serialNumberResultValues;
        var serialNumbers = [];
        for (var i = 0; i < serialNumberResultValues.length; i++) {
            serialNumbers.push(serialNumberResultValues[i]);
        }
        //------------------attribGetAttributeValues----------------------
        var objectType = 7;
        var objectNumber = stationNumber;
        var objectDetail = "-1";
        var attributeCodeArray = ["LAGERORTE"];
        var allMergeLevel = 1;
        var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber, // String
            objectType, // int
            objectNumber, // String
            objectDetail, // String
            attributeCodeArray, // String[]
            allMergeLevel, // int
            attributeResultKeys // String[]
        );
        var return_value = result_attribGetAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
        }
        var attributeResultValues = result_attribGetAttributeValues.attributeResultValues;
        var magazinLocation = attributeResultValues[1];
        //------------------mlSetMaterialBinLocation----------------------
        var materialBinNumber = magazineNumber;
        var bookDate = -1;
        var binLocation = magazinLocation;
        var binLocationBarcode = "-1";
        var transactionType = 0;
        var result_mlSetMaterialBinLocation = imsApiService.mlSetMaterialBinLocation(
            imsApiSessionContext,
            stationNumber, // String
            materialBinNumber, // String
            bookDate, // long
            binLocation, // String
            binLocationBarcode, // String
            transactionType // int
        );
        var return_value = result_mlSetMaterialBinLocation.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API mlSetMaterialBinLocation");
        }
        var firstSlot;
        if (serialNumbers.length == 0) {
            firstSlot = 0;
        } else {
            //------------------trGetNextProductionStep----------------------
            var checkMultiBoard = 1;
            var serialNumber = serialNumbers[0];
            var serialNumberPos = "-1";
            var functionMode = 0;
            var stateCheck = 0;
            var confirmFlag = 0;
            var productionStepResultKeys = ["STATION_NUMBER", "WORKSTEP_AVO"];
            var result_trGetNextProductionStep = imsApiService.trGetNextProductionStep(
                imsApiSessionContext,
                stationNumber, // String
                serialNumber, // String
                serialNumberPos, // String
                functionMode, // int
                stateCheck, // int
                confirmFlag, // int
                productionStepResultKeys // String[]
            );
            var return_value = result_trGetNextProductionStep.return_value;
            if (return_value != 0) {
                return generateError(return_value, "Fehler in MES API trGetNextProductionStep");
            }
            var productionStepResultValues = result_trGetNextProductionStep.productionStepResultValues;
            var nextStationNumber = productionStepResultValues[0];
            var processLayer = productionStepResultValues[1];
            if (nextStationNumber == stationNumber) {
                //------------------trCheckSerialNumberState----------------------
                var checkMultiBoard = 1;
                var serialNumber = serialNumbers[0];
                var serialNumberPos = "-1";
                var serialNumberStateResultKeys = ["ERROR_CODE", "SERIAL_NUMBER_STATE"];
                var result_trCheckSerialNumberState = imsApiService.trCheckSerialNumberState(
                    imsApiSessionContext,
                    stationNumber, // String
                    processLayer, // int
                    checkMultiBoard, // int
                    serialNumber, // String
                    serialNumberPos, // String
                    serialNumberStateResultKeys // String[]
                );
                var return_value = result_trCheckSerialNumberState.return_value;
                if (return_value != 0 || result_trCheckSerialNumberState.serialNumberStateResultValues[0]) {
                    return generateError(return_value, "Fehler in MES API trCheckSerialNumberState");
                }
                var serialNumberStateResultValues = result_trCheckSerialNumberState.serialNumberStateResultValues;
            }
            firstSlot = 30 - serialNumbers.length + 1;
        }
        return generateReturn(0, "", [firstSlot]);
    } else {
        return generateReturn(0, "", [13]);
    }
}

/**
 * Custom function cffcLogoutMagazines
 *
 * @function cffcLogoutMagazines
 * @author Sami Akkari
 *
 * @param {string} stationNumber
 * @param {string} magazineNumber
 * @param {number} position
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcLogoutMagazines(stationNumber, magazineNumber, position) {
    if (prod_cffcLogoutMagazines) {
        var expectedNumberOfParams = 3;
        // try {
        //     checkForNullAndPipes(arguments, expectedNumberOfParams);
        // } catch (e) {
        //     // eslint-disable-next-line no-magic-numbers
        //     return generateReturn(-1001, e.toString());
        // }
        if (!stationNumber || !magazineNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        //------------------shipDeactivateShippingLotAtKap----------------------
        var lotNumber = magazineNumber;
        var result_shipDeactivateShippingLotAtKap = imsApiService.shipDeactivateShippingLotAtKap(
            imsApiSessionContext,
            stationNumber, // String
            lotNumber // String
        );
        var return_value = result_shipDeactivateShippingLotAtKap.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API shipDeactivateShippingLotAtKap");
        }
        //------------------mlSetMaterialBinLocation----------------------
        var materialBinNumber = magazineNumber;
        var bookDate = -1;
        var binLocation = "TransitZoneHalle";
        var binLocationBarcode = "-1";
        var transactionType = 0;
        var result_mlSetMaterialBinLocation = imsApiService.mlSetMaterialBinLocation(
            imsApiSessionContext,
            stationNumber, // String
            materialBinNumber, // String
            bookDate, // long
            binLocation, // String
            binLocationBarcode, // String
            transactionType // int
        );
        var return_value = result_mlSetMaterialBinLocation.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API mlSetMaterialBinLocation");
        }
        return generateReturn(0, "");
    } else {
        return generateReturn(0, "");
    }
}

/**
 * Custom function cffcRequestCalibrationData
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - sensor
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcRequestCalibrationData(stationNumber, sensor) {
    if (prod_cffcRequestCalibrationData) {
        if (!stationNumber || !sensor) {
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        var rh_ref = 40;
        var rh_cur = 33.6;
        var temp_ref = 39;
        var temp_cur = 37;
        var results = [rh_ref, rh_cur, temp_ref, temp_cur];
        return generateReturn(0, "", results);
    } else {
        return generateReturn(0, "", [40, 33.6, 39, 37]);
    }
}

/**
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - serialNumber
 * @returns {Result_customFunctionCommon}
 */
function cffcMachineIn(stationNumber, serialNumber) {
    if (prod_cffcMachineIn) {
        if (!serialNumber || !stationNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparameter");
        }

        var result_trGetStationSetting = imsApiService.trGetStationSetting(imsApiSessionContext, stationNumber, [
            ImsApiKey.WORKORDER_NUMBER,
            ImsApiKey.PART_NUMBER,
            ImsApiKey.PROCESS_LAYER,
            ImsApiKey.WORKSTEP_NUMBER
        ]);

        if (result_trGetStationSetting.return_value != 0) {
            return generateError(result_trGetStationSetting.return_value, "trGetStationSetting");
        }

        var workOrderNumber = result_trGetStationSetting.stationSettingResultValues[0];
        var articleNumber = result_trGetStationSetting.stationSettingResultValues[1];
        var processLayer = Number(result_trGetStationSetting.stationSettingResultValues[2]);
        var processName = result_trGetStationSetting.stationSettingResultValues[3];

        var result_trCheckSerialNumberState = imsApiService.trCheckSerialNumberState(
            imsApiSessionContext,
            stationNumber,
            processLayer,
            2,
            serialNumber,
            "-1",
            [ImsApiKey.BOOKING_VALID, ImsApiKey.ERROR_CODE, ImsApiKey.IN_PROCESS]
        );

        if (result_trCheckSerialNumberState.return_value == 240) {
            return generateReturn(1, "ErrorMessage:forward plate without processing");
        }

        if (result_trCheckSerialNumberState.return_value != 0) {
            return generateError(result_trCheckSerialNumberState.return_value, "trCheckSerialNumberState");
        }

        var result_trGetSerialNumberInfo = imsApiService.trGetSerialNumberInfo(
            imsApiSessionContext,
            stationNumber,
            serialNumber,
            "-1",
            [ImsApiKey.WORKORDER_NUMBER]
        );

        if (result_trGetSerialNumberInfo.return_value !== 0) {
            return generateError(result_mlUpdateStorage.return_value, "result_trGetSerialNumberInfo");
        }
        var workorderNumber = String(result_trGetSerialNumberInfo.serialNumberResultValues[0]);
        var res = workorderNumber.split("_");
        if (res[1] == "Vordruck") {
            specialState = 1;
        } else {
            specialState = 0;
        }

        var result_trUploadState = imsApiService.trUploadState(
            imsApiSessionContext,
            stationNumber,
            processLayer,
            serialNumber,
            "-1",
            3,
            1,
            -1,
            0,
            [ImsApiKey.ERROR_CODE, ImsApiKey.SERIAL_NUMBER, ImsApiKey.SERIAL_NUMBER_STATE],
            [0, serialNumber, 3]
        );

        if (result_trUploadState.return_value !== 0) {
            return generateError(result_trUploadState.return_value, "trUploadState");
        }

        var result_setupCheck = imsApiService.setupCheck(
            imsApiSessionContext,
            stationNumber,
            serialNumber,
            "-1",
            "-1",
            processLayer,
            1,
            0
        );

        if (result_setupCheck.return_value != 0 && result_setupCheck.return_value != 604) {
            return generateReturn(-1, "ErrorMessage: “Setup is not valid”");
        }

        var result_equCheckEquipmentData = imsApiService.equCheckEquipmentData(
            imsApiSessionContext,
            stationNumber,
            "-1",
            "-1",
            "-1",
            processLayer,
            1,
            [ImsApiKey.EQUIPMENT_NUMBER, ImsApiKey.EQUIPMENT_STATE, ImsApiKey.EQUIPMENT_CHECKSTATE]
        );

        if (result_equCheckEquipmentData.return_value == -2) {
            return generateReturn(-2, "ErrorMessage: “Setup equipement is not valid”");
        }

        if (result_equCheckEquipmentData.return_value == 3) {
            return generateReturn(3, "Warning:equipment usage limit reached");
        }

        if (result_equCheckEquipmentData.return_value != 0) {
            return generateError(result_equCheckEquipmentData.return_value, "equCheckEquipmentData");
        }

        var result_mdaGetRecipeData = imsApiService.mdaGetRecipeData(
            imsApiSessionContext,
            stationNumber,
            "-1",
            -1,
            "-1",
            "PROGRAM_NAME",
            -1.0,
            "-1",
            "T",
            1,
            [new KeyValue("PART_NUMBER", articleNumber)],
            ["NOMINAL"]
        );

        if (result_mdaGetRecipeData.return_value != 0) {
            return generateReturn(1, "ErrorMessage:“invalid recipe data”");
        }

        var programName = result_mdaGetRecipeData.recipeResultValues[0];

        //-------------------attribGetAttributeValues--------------
        var objectType = 0;
        var objectNumber = serialNumber;
        var objectDetail = -1;
        var attributeCodeArray = ["TYP"];
        var allMergeLevel = 1;
        var attributeResultKeys = ["ATTRIBUTE_CODE", "ATTRIBUTE_VALUE"];
        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber, // String
            objectType, // int
            objectNumber, // String
            objectDetail, // String
            attributeCodeArray, // String[]
            allMergeLevel, // int
            attributeResultKeys // String[]
        );
        var return_value = result_attribGetAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
        }
        var plateType = result_attribGetAttributeValues.attributeResultValues[1];

        var result_mdataGetWorkplanData = imsApiService.mdataGetWorkplanData(
            imsApiSessionContext,
            stationNumber,
            [new KeyValue("SERIAL_NUMBER", serialNumber), new KeyValue("WORKORDER_NUMBER", workOrderNumber)],
            ["CYCLE_TIME_MACHINE"]
        );

        if (result_mdataGetWorkplanData.return_value != 0) {
            return generateError(result_mdataGetWorkplanData.return_value, "mdataGetWorkplanData");
        }

        var cycleTime = result_mdataGetWorkplanData.workplanDataResultValues[0];

        var result_trGetSerialNumberForWorkOrderAndWorkstep = imsApiService.trGetSerialNumberForWorkOrderAndWorkstep(
            imsApiSessionContext,
            stationNumber,
            processLayer,
            workOrderNumber,
            0,
            0,
            0,
            0,
            100,
            1,
            0,
            ["BOOK_DATE", "SERIAL_NUMBER", "SERIAL_NUMBER_STATE"]
        );

        if (result_trGetSerialNumberForWorkOrderAndWorkstep.return_value != 0) {
            return generateError(
                result_trGetSerialNumberForWorkOrderAndWorkstep.return_value,
                "trGetSerialNumberForWorkOrderAndWorkstep"
            );
        }

        var firstPlate = result_trGetSerialNumberForWorkOrderAndWorkstep.serialNumberResultValues[0];
        firstPlate = Math.round(firstPlate / 1000);
        var actualPlate = firstPlate;

        var lastPlate = Math.round(
            (cycleTime * (result_trGetSerialNumberForWorkOrderAndWorkstep.serialNumberResultValues.length / 3)) / 1000
        );

        var result_shipGetLotFromSerialNumber = imsApiService.shipGetLotFromSerialNumber(
            imsApiSessionContext,
            stationNumber,
            serialNumber,
            "-1",
            ["SHIPPING_LOT_NUMBER"]
        );

        if (result_shipGetLotFromSerialNumber.return_value != 0) {
            return generateError(result_shipGetLotFromSerialNumber.return_value, "shipGetLotFromSerialNumber");
        }

        var magazineNumber = result_shipGetLotFromSerialNumber.lotResultValues[0];

        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber,
            7,
            stationNumber,
            "-1",
            ["LAGERORTE"],
            0,
            ["ATTRIBUTE_CODE", "ATTRIBUTE_VALUE", "ERROR_CODE"]
        );

        var errorCode = result_attribGetAttributeValues.return_value;

        if (errorCode == 5) {
            errorCode = result_attribGetAttributeValues.attributeResultValues[2] /* ERROR_CODE */;
        }

        if (errorCode != 0) {
            return generateError(errorCode, "attribGetAttributeValues");
        }

        attribValue = String(result_attribGetAttributeValues.attributeResultValues[1]);
        /*
      var result_mlGetStorageData = imsApiService.mlGetStorageData(
          imsApiSessionContext,
          stationNumber,
          [
              new KeyValue("MAX_ROWS", 100),
              new KeyValue("STORAGE_CELL_STATE", "F"),
              new KeyValue("STORAGE_NUMBER", attribValue)
          ],
          [],
          [],
          ["STORAGE_NUMBER"],
          []
      );

      if (result_mlGetStorageData.return_value != 0) {
          return generateError(result_mlGetStorageData.return_value, "mlGetStorageData");
      }
      */
        var slotID = attribValue;

        var result_trGetProductQuantity = imsApiService.trGetProductQuantity(
            imsApiSessionContext,
            stationNumber,
            processLayer,
            0,
            [],
            [new KeyValue("WORKORDER_NUMBER", workOrderNumber)],
            ["QUANTITY_WORKORDER_TOTAL", "QUANTITY_FAIL", "QUANTITY_PASS", "QUANTITY_SCRAP"]
        );

        if (result_trGetProductQuantity.return_value != 0) {
            return generateError(result_trGetProductQuantity.return_value, "trGetProductQuantity");
        }

        var total = Number(result_trGetProductQuantity.productQuantityResultValues[0]);
        var pass = Number(result_trGetProductQuantity.productQuantityResultValues[2]);
        var fail = Number(result_trGetProductQuantity.productQuantityResultValues[1]);
        var scrapp = Number(result_trGetProductQuantity.productQuantityResultValues[3]);

        var processedPlates = pass + fail + scrapp;
        var remainingPlates = total - processedPlates;
        //--------------------------mdaGetRecipeData-----------------
        var result_mdaGetRecipeData = imsApiService.mdaGetRecipeData(
            imsApiSessionContext,
            stationNumber,
            "-1",
            -1,
            "-1",
            "VERSION",
            -1.0,
            "-1",
            "U",
            1,
            [new KeyValue("PART_NUMBER", articleNumber), new KeyValue("STATION_NUMBER", stationNumber)],
            ["NOMINAL"]
        );

        if (
            result_mdaGetRecipeData.return_value != 0 &&
            result_mdaGetRecipeData.return_value != -701 &&
            result_mdaGetRecipeData.return_value != -706
        ) {
            return generateReturn(1, "ErrorMessage:“invalid recipe data”");
        }

        var version = result_mdaGetRecipeData.recipeResultValues[0];
        if (result_mdaGetRecipeData.return_value == -701 || result_mdaGetRecipeData.return_value == -706) {
            var version = "";
        }
        if (isAllowedStation(stationNumber, "STATION_TYPE", "CAMERA")) {
            var payLoad =
                '{"stationNumber" : " ' +
                stationNumber +
                ' ","serialNumber" : "' +
                serialNumber +
                '", "processName" : " ' +
                processName +
                ' ", "version" : " ' +
                version +
                ' ", "workOrderNumber" : " ' +
                workOrderNumber +
                ' ", "articleNumber" : " ' +
                articleNumber +
                ' ", "specialState" : " ' +
                specialState +
                ' "}';

            //-------------------attribGetAttributeValues--------------
            var objectType = 7;
            var objectNumber = stationNumber;
            var objectDetail = -1;
            var attributeCodeArray = ["TOPIC"];
            var allMergeLevel = 1;
            var attributeResultKeys = ["ATTRIBUTE_CODE", "ATTRIBUTE_VALUE"];
            var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
                imsApiSessionContext,
                stationNumber, // String
                objectType, // int
                objectNumber, // String
                objectDetail, // String
                attributeCodeArray, // String[]
                allMergeLevel, // int
                attributeResultKeys // String[]
            );
            var return_value = result_attribGetAttributeValues.return_value;
            if (return_value != 0) {
                return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
            }
            var topic = result_attribGetAttributeValues.attributeResultValues[1];
            var message = payLoad;
            var result_msgPublish = imsApiService.msgPublish(
                imsApiSessionContext,
                topic, // String
                message // String
            );
            var return_value = result_msgPublish.return_value;
            if (return_value != 0) {
                return generateReturn(-1002, "Fehler in MES API msgPublish");
            }
            var msgId = result_msgPublish.msgId;

            return generateReturn(0, "", [articleNumber, workOrderNumber, processedPlates, remainingPlates]);
        }
        return generateReturn(0, "", [
            articleNumber,
            workOrderNumber,
            programName,
            firstPlate,
            actualPlate,
            lastPlate,
            slotID,
            processedPlates,
            remainingPlates,
            plateType
        ]);
    } else {
        return generateReturn(0, "", ["55", "500", "RocheTest", "1_2", "1_3", "1_4", "1_1", 10, 20, 0]);
    }
}

/**
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - serialNumber
 * @param {string} inputArg3 - serialNumberAndResult
 * @param {string} inputArg4 - slodID
 * @param {string} inputArg5 - cycleTime
 * @param {string} inputArg6 - failCode
 * @param {string} inputArg7 - measurementData
 * @param {string} inputArg8 - information
 * @returns {Result_customFunctionCommon}
 */
function cffcMachineOut(
    stationNumber,
    serialNumber,
    serialNumberAndResult,
    slodID,
    cycleTime,
    failCode,
    measurementData,
    information
) {
    if (prod_cffcMachineOut) {
        // TODO: implement after specification is ready

        if (!cycleTime || !stationNumber || !serialNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparameter");
        }

        // logHandler.logMessage("fail code: " + failCode );

        var result_trGetStationSetting = imsApiService.trGetStationSetting(
            imsApiSessionContext,
            stationNumber, // String
            [ImsApiKey.PROCESS_LAYER, ImsApiKey.PART_NUMBER, ImsApiKey.WORKORDER_NUMBER]
        );

        if (result_trGetStationSetting.return_value !== 0) {
            return generateError(result_trGetStationSetting.return_value, "trGetStationSetting");
        }

        var processLayer = Number(result_trGetStationSetting.stationSettingResultValues[0]);
        var workOrderNumber = result_trGetStationSetting.stationSettingResultValues[2];
        var partNumber = result_trGetStationSetting.stationSettingResultValues[1];

        if (serialNumber != "" && isAllowedStation(stationNumber, "STATION_TYPE", "LASER")) {
            var result_trAssignSerialNumberForProductOrWorkOrder = imsApiService.trAssignSerialNumberForProductOrWorkOrder(
                imsApiSessionContext,
                stationNumber, // --> String
                workOrderNumber, // --> String
                "-1", // --> String
                "-1", // --> String
                serialNumber, // --> String
                "-1", // --> String
                processLayer, // --> int
                [], // --> SerialNumberData[]
                0 // --> int
            );

            if ([0, -206, -205].indexOf(result_trAssignSerialNumberForProductOrWorkOrder.return_value) == -1) {
                return generateError(
                    result_trAssignSerialNumberForProductOrWorkOrder.return_value,
                    "trAssignSerialNumberForProductOrWorkOrder"
                );
            }
        } else {
            logHandler.logMessage("station should not assign SN.");
        }

        if (isAllowedStation(stationNumber, "STATION_TYPE", "PMU")) {
            var objectType = 7;
            var objectNumber = stationNumber;
            var objectDetail = "-1";
            var bookDate = -1;
            var allowOverWrite = 1;
            var attributeUploadKeys = [ImsApiKey.ERROR_CODE, ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE];
            var attributeUploadValues = [0, "PMU_MEAS", measurementData];

            var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
                imsApiSessionContext,
                stationNumber, // String
                objectType, // int
                objectNumber, // String
                objectDetail, // String
                bookDate, // long
                allowOverWrite, // int
                attributeUploadKeys, // String[]
                attributeUploadValues // String[]
            );

            var return_value = result_attribAppendAttributeValues.return_value;
            if (return_value != 0) {
                return generateError(result_trGetSerialNumberUploadInfo.return_value, "attribAppendAttributeValues");
            }
        }

        if ((cycleTime == 0 || cycleTime == "-1") && !isAllowedStation(stationNumber, "STATION_TYPE", "KLS")) {
            var result_trGetSerialNumberUploadInfo = imsApiService.trGetSerialNumberUploadInfo(
                imsApiSessionContext,
                stationNumber,
                -1,
                serialNumber,
                "-1",
                0,
                [ImsApiKey.BOOK_DATE]
            );

            if (result_trGetSerialNumberUploadInfo.return_value !== 0) {
                return generateError(result_trGetSerialNumberUploadInfo.return_value, "trGetSerialNumberUploadInfo");
            }

            var startTime = Number(result_trGetSerialNumberUploadInfo.uploadInfoResultValues[0]);

            logHandler.logMessage("parsed book date:" + startTime);

            if (startTime == 0) {
                return generateReturn(-1002, "Serial Number is not booked on previous station");
            }

            var result_mdataGetCalendarData = imsApiService.mdataGetCalendarData(imsApiSessionContext, stationNumber, [
                "CURRENT_TIME_MILLIS"
            ]);

            if (result_mdataGetCalendarData.return_value !== 0) {
                return generateError(result_mdataGetCalendarData.return_value, "mdataGetCalendarData");
            }

            var currentTime = Number(result_mdataGetCalendarData.calendarDataResultValues[0]);

            cycleTime = currentTime - startTime;
        }

        if ((cycleTime == 0 || cycleTime == "-1") && isAllowedStation(stationNumber, "STATION_TYPE", "KLS")) {
            var objectType = 0;
            var objectNumber = serialNumber;
            var objectDetail = "-1";
            var attributeCodeArray = ["ANFANGSDATUM", "ENDDATUM"];
            var allMergeLevel = 1;
            var attributeResultKeys = [ImsApiKey.ERROR_CODE, ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE];
            var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
                imsApiSessionContext,
                stationNumber, // String
                objectType, // int
                objectNumber, // String
                objectDetail, // String
                attributeCodeArray, // String[]
                allMergeLevel, // int
                attributeResultKeys // String[]
            );
            var return_value = result_attribGetAttributeValues.return_value;
            if (return_value != 0) {
                return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
            }
            var attributeResultValues = result_attribGetAttributeValues.attributeResultValues;
            cycleTime = parseInt(attributeResultValues[5]) - parseInt(attributeResultValues[2]);
            logHandler.logMessage("KLS cycle time = " + cycleTime);
        }

        var measureValues = [];

        if (!(measurementData == undefined || measurementData == null || measurementData == "")) {
            var mv = measurementData.split("|");

            for (var i = 0; i < mv.length; i = i + 2) {
                measureValues.push("0", "0", "" + mv[i], "" + mv[i + 1]);
            }
        }

        var failCodes = [];

        if (!(failCode == undefined || failCode == null || failCode == "")) {
            var fc = failCode.split("|");

            for (var i = 0; i < fc.length; i++) {
                failCodes.push("0", "" + fc[i]);
            }
        }

        var sns = [];

        if (!(serialNumberAndResult == undefined || serialNumberAndResult == null || serialNumberAndResult == "")) {
            var sn = serialNumberAndResult.split("|");

            for (var i = 0; i < sn.length; i = i + 2) {
                sns.push("" + sn[i], "" + sn[i + 1]);
            }
        }

        for (var i = 0; i < sns.length; i = i + 2) {
            var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
                imsApiSessionContext,
                stationNumber,
                0,
                "" + sns[i],
                "-1",
                -1,
                1,
                ["ATTRIBUTE_CODE", "ATTRIBUTE_VALUE", "ERROR_CODE"],
                ["STATE", sns[i + 1], "0"]
            );

            var errorCode = result_attribAppendAttributeValues.return_value;

            if (errorCode == 5) {
                errorCode = result_attribAppendAttributeValues.attributeResultValues[2];
            }

            if (errorCode !== 0) {
                return generateError(errorCode, "attribAppendAttributeValues");
            }
        }

        var serialNumberState = 0;

        if (failCodes.length != 0) {
            serialNumberState = 1;
        }

        if (!isAllowedStation(stationNumber, "STATION_TYPE", "PMU")) {
            var result_trUploadFailureAndResultData = imsApiService.trUploadFailureAndResultData(
                imsApiSessionContext,
                stationNumber,
                processLayer,
                serialNumber,
                "-1",
                serialNumberState,
                0,
                Number(cycleTime),
                -1,
                ["ERROR_CODE", "MEASURE_FAIL_CODE", "MEASURE_NAME", "MEASURE_VALUE"],
                measureValues,
                ["ERROR_CODE", "FAILURE_TYPE_CODE"],
                failCodes,
                [],
                []
            );

            if (result_trUploadFailureAndResultData.return_value != 0) {
                return generateError(result_trUploadFailureAndResultData.return_value, "trUploadFailureAndResultData");
            }
        }

        var result_trGetProductQuantity = imsApiService.trGetProductQuantity(
            imsApiSessionContext,
            stationNumber,
            -1,
            1,
            [],
            [new KeyValue("WORKORDER_NUMBER", workOrderNumber + "_PP")],
            ["QUANTITY_WORKORDER_FINISHED", "QUANTITY_WORKORDER_TOTAL", "WORKORDER_NUMBER"]
        );

        if (result_trGetProductQuantity.return_value != 0) {
            return generateError(result_trGetProductQuantity.return_value, "trGetProductQuantity");
        }

        var finished = Number(result_trGetProductQuantity.productQuantityResultValues[0]);
        var total = Number(result_trGetProductQuantity.productQuantityResultValues[2]);

        //----------------------configGetValues------------------
        /*  this API makes it possible to update/adjust values for delected configuration paramaters,
        only the parameter values of a specific context can be updated.
    */
        updateConfigForWayDecision(stationNumber, "0");
        return generateReturn(0, "", [finished, total]);
    } else {
        return generateReturn(0, "", [57, 120]);
    }
}

function isAllowedStation(stationNumber, code, value) {
    var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
        imsApiSessionContext,
        stationNumber,
        7,
        stationNumber,
        "-1",
        [code],
        0,
        ["ATTRIBUTE_CODE", "ATTRIBUTE_VALUE", "ERROR_CODE"]
    );

    if (
        result_attribGetAttributeValues.return_value == 0 &&
        String(result_attribGetAttributeValues.attributeResultValues[1]) == String(value)
    ) {
        return true;
    }

    return false;
}

/**
 * Custom function cffcProcessMagazine
 *
 * @function cffcProcessMagazine
 * @author Sami Akkari
 *
 * @param {string} stationNumber
 * @param {number} magazineNumber
 * @param {number} position
 * @param {number} slotId
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcProcessMagazine(stationNumber, magazineNumber, position, slotId) {
    if (prod_cffcProcessMagazine) {
        var expectedNumberOfParams = 4;
        try {
            checkForNullAndPipes(arguments, expectedNumberOfParams);
        } catch (e) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, e.toString());
        }

        if (!stationNumber || !magazineNumber || !position || !slotId) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }

        //------------------attribGetAttributeValues----------------------
        var objectType = 7;
        var objectNumber = stationNumber;
        var objectDetail = "-1";
        var attributeCodeArray = ["LAGER_SLOT" + position];
        var allMergeLevel = 1;
        var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];

        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber, // String
            objectType, // int
            objectNumber, // String
            objectDetail, // String
            attributeCodeArray, // String[]
            allMergeLevel, // int
            attributeResultKeys // String[]
        );
        var return_value = result_attribGetAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
        }
        var attributeResultValues = result_attribGetAttributeValues.attributeResultValues;
        var currentMagazine = attributeResultValues[1];

        if (currentMagazine != magazineNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "MagazineNumber does not match the registered magazine on the station");
        }

        //------------------shipGetSerialNumberDataForShippingLot----------------------
        var lotNumber = magazineNumber;
        var serialNumberResultKeys = [ImsApiKey.SERIAL_NUMBER];

        var result_shipGetSerialNumberDataForShippingLot = imsApiService.shipGetSerialNumberDataForShippingLot(
            imsApiSessionContext,
            stationNumber, // String
            lotNumber, // String
            serialNumberResultKeys // String[]
        );

        var return_value = result_shipGetSerialNumberDataForShippingLot.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API shipGetSerialNumberDataForShippingLot");
        }
        var serialNumberResultValues = result_shipGetSerialNumberDataForShippingLot.serialNumberResultValues;

        var serialNumbers = [];
        for (var i = 0; i < serialNumberResultValues.length; i++) {
            serialNumbers.push(serialNumberResultValues[i]);
        }

        var slotFlag = false;

        for (var i = 0; i < serialNumbers.length; i++) {
            //------------------attribGetAttributeValues----------------------
            var objectType = 0;
            var objectNumber = serialNumbers[i];
            var objectDetail = "-1";
            var attributeCodeArray = ["POS_IN_MAGAZIN"];
            var allMergeLevel = 1;
            var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];

            var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
                imsApiSessionContext,
                stationNumber, // String
                objectType, // int
                objectNumber, // String
                objectDetail, // String
                attributeCodeArray, // String[]
                allMergeLevel, // int
                attributeResultKeys // String[]
            );
            var return_value = result_attribGetAttributeValues.return_value;
            if (return_value != 0) {
                return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
            }
            var attributeResultValues = result_attribGetAttributeValues.attributeResultValues;
            var currentSlot = attributeResultValues[1];

            if (slotId == currentSlot) {
                slotFlag = true;
                break;
            }
        }
        if (slotFlag == false) {
            return generateError(-1, "Slot locked by iTAC  magazine has to be removed");
        }

        var results = [slotId];
        return generateReturn(0, "", results);
    } else {
        var results = [21];
        return generateReturn(0, "", results);
    }
}

/**
 * @param {string} stationNumber
 * @param {number} plateType
 * @returns {Result_customFunctionCommon}
 */
function cffcRequestSpecialPlate(stationNumber, plateType) {
    if (prod_cffcRequestSpecialPlate) {
        // TODO: implement after specification is ready
        if (!stationNumber || !plateType) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        if (plateType != 1 && plateType != 2 && plateType != 3) {
            return generateReturn(-1001, "invalid input");
        }
        return generateReturn(0, "All OK.");
    } else {
        return generateReturn(0, "All OK.");
    }
}

/**
 * @param {string} stationNumber - stationNumber
 * @param {string} successful - successful
 * @param {string} partChamber - partChamber
 *
 * @author Abderraouf Bouyahi
 * @returns {Result_customFunctionCommon}
 */

//! The API Flow has changed
function cffcSetupConfirmation(stationNumber, successful, partChamber) {
    if (prod_cffcSetupConfirmation) {
        if (!stationNumber || !successful) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparameter");
        }
        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber,
            // eslint-disable-next-line no-magic-numbers
            7,
            stationNumber,
            "-1",
            ["KAMMER1_GERUESTET", "KAMMER2_GERUESTET"],

            0,
            [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE]
        );

        if (result_attribGetAttributeValues.return_value !== 0 || partChamber == "" || !partChamber) {
            result_attribAppendAttributeValues = attribAppendAttribute(
                stationNumber,
                "KAMMER1_GERUESTET",
                "STATION_GERUESTET",
                successful
            );

            if (result_attribAppendAttributeValues.return_value !== 0) {
                return generateReturn(-1002, "Fehlerhafte Daten an das MES übertragen");
            }
            result_attribAppendAttributeValues = attribAppendAttribute(
                stationNumber,
                "KAMMER2_GERUESTET",
                "STATION_GERUESTET",
                successful
            );

            if (result_attribAppendAttributeValues.return_value !== 0) {
                return generateReturn(-1002, "Fehlerhafte Daten an das MES übertragen");
            }
        }
        var kammer1 = String(result_attribGetAttributeValues.attributeResultValues[1]);
        var kammer2 = String(result_attribGetAttributeValues.attributeResultValues[4]);
        var tempVar = partChamber === "1" ? "KAMMER1_GERUESTET" : "KAMMER2_GERUESTET";

        result_attribAppendAttributeValues = attribAppendAttribute(
            stationNumber,
            tempVar,
            "STATION_GERUESTET",
            successful
        );

        if (result_attribAppendAttributeValues.return_value !== 0) {
            return generateReturn(-1002, "Fehlerhafte Daten an das MES übertragen");
        }

        if (partChamber === "1") {
            if (kammer2 == "true") {
                result_attribAppendAttributeValues = attribAppendAttribute(
                    stationNumber,
                    tempVar,
                    "STATION_GERUESTET",
                    successful
                );

                if (result_attribAppendAttributeValues.return_value !== 0) {
                    return generateReturn(-1002, "Fehlerhafte Daten an das MES übertragen");
                }
            }

            if (kammer1 == "true") {
                result_attribAppendAttributeValues = attribAppendAttribute(
                    stationNumber,
                    tempVar,
                    "STATION_GERUESTET",
                    successful
                );

                if (result_attribAppendAttributeValues.return_value !== 0) {
                    return generateReturn(-1002, "Fehlerhafte Daten an das MES übertragen");
                }

                return generateReturn(0, ""); // @Ro uf to be validated
            }
        }

        updateConfigForWayDecision(stationNumber, 1);
        return generateReturn(0, "");
    } else {
        return generateReturn(0, "");
    }
}
//----------------------configGetValues------------------
/*  this API makes it possible to update/adjust values for delected configuration paramaters,
        only the parameter values of a specific context can be updated.
    */
/**
 * @param {string} stationNumber
 * @param {string} stationState
 */
function updateConfigForWayDecision(stationNumber, stationState) {
    if (!stationNumber || !stationState) {
        // eslint-disable-next-line no-magic-numbers
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }
    var options = [];
    //! In the configuration client, it's necessary to identify the CONFIG_APPTYPE/CLUSTER/HOST and the PARAMATER_NAME or PARAMATER_ID
    var configContext = new Array(new KeyValue("CONFIG_APPTYPE", APPTYPE), new KeyValue("CONFIG_CLUSTER", CLUSTER));
    var parameterFilter = new Array(new KeyValue("PARAMETER_ID", "1576"));
    var parameterResultKeys = [];
    var resultKeys = [ImsApiKey.CONFIG_KEY, ImsApiKey.CONFIG_VALUE];
    var result_configGetValues = imsApiService.configGetValues(
        imsApiSessionContext,
        options, // KeyValue[]
        configContext, // KeyValue[]
        parameterFilter, // KeyValue[]
        parameterResultKeys, // String[]
        resultKeys // String[]
    );
    var return_value = result_configGetValues.return_value;
    if (return_value != 0) {
        return generateError(-1002, "Fehler in MES API configGetValues");
    }
    var resultValues = result_configGetValues.resultValues;
    var uploadValues = [];
    for (var i = 0; i < result_configGetValues.resultValues.length / 2; i++) {
        if (result_configGetValues.resultValues[i * 2] == stationNumber) {
            var val = result_configGetValues.resultValues[i * 2 + 1].split("|");
            //val[1]= 1;  // Station not available
            result_configGetValues.resultValues[i * 2 + 1] = val[0] + val[1] + "|" + stationState;
        }
        uploadValues.push(
            result_configGetValues.resultValues[i * 2],
            result_configGetValues.resultValues[i * 2 + 1],
            "1576"
        );
        logHandler.logMessage("Upvalues1 " + uploadValues);
    }
    //--------------configUpdateValues-----------------
    var options = [];
    var configContext = new Array(new KeyValue("CONFIG_APPTYPE", APPTYPE), new KeyValue("CONFIG_CLUSTER", CLUSTER));
    var uploadKeys = ["CONFIG_KEY", "CONFIG_VALUE", "PARAMETER_ID"];
    var resultKeys = [];
    var result_configUpdateValues = imsApiService.configUpdateValues(
        imsApiSessionContext,
        options, // KeyValue[]
        configContext, // KeyValue[]
        uploadKeys, // String[]
        uploadValues, // String[]
        resultKeys // String[]
    );
    var return_value = result_configUpdateValues.return_value;
    if (return_value != 0) {
        return generateError(-1002, "Fehler in MES API configUpdateValues");
    }
    var resultValues = result_configUpdateValues.resultValues;
}

/*
/function cffcSetupConfirmation(stationNumber, partChamber) {
    if (!stationNumber || partChamber == null) {
        // eslint-disable-next-line no-magic-numbers
        return generateReturn(-1001, "Ungültige Inputparameter");
    }

    if (!partChamber) {
        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber,
            // eslint-disable-next-line no-magic-numbers
            7,
            stationNumber,
            "-1",
            ["KAMMER1_GERUESTET", "KAMMER2_GERUESTET"],

            0,
            [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE]
        );

        if (result_attribGetAttributeValues.return_value !== 0) {
            logHandler.logMessage("###1 attribAppendAttribute");
            return attribAppendAttribute();
        }
        var kammer1 = String(result_attribGetAttributeValues.attributeResultValues[1]);
        var kammer2 = String(result_attribGetAttributeValues.attributeResultValues[4]);
        var attributeCode = String(result_attribGetAttributeValues.attributeResultValues[0]);
        var tempVar = partChamber === "1" ? "KAMMER1_GERUESTET" : "KAMMER2_GERUESTET";

        logHandler.logMessage("###2 attribAppendAttribute");
        var result_attribAppendAttributeValues = attribAppendAttribute(stationNumber, attributeCode, tempVar);
        if (result_attribAppendAttributeValues.return_value !== 0) {
            return result_attribAppendAttributeValues;
        }
        if (partChamber === "1") {
            if (kammer2.toLowerCase() === "true") {
                logHandler.logMessage("###3 attribAppendAttribute");
                return attribAppendAttribute(stationNumber, attributeCode);
            }
            return generateReturn(0, "");
        }
        if (kammer1.toLowerCase() === "true") {
            logHandler.logMessage("###4 attribAppendAttribute");
            return attribAppendAttribute(stationNumber, attributeCode);
        }
        return generateReturn(0, "");
    }
    logHandler.logMessage("###5 attribAppendAttribute");
    return attribAppendAttribute(stationNumber, "");
}
*/
/**
 * @param stationNumber
 * @param attributeCode
 * @param attribClassName
 * @param successful
 */
function attribAppendAttribute(stationNumber, attributeCode, attribClassName, successful) {
    var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
        imsApiSessionContext,
        stationNumber,
        // eslint-disable-next-line no-magic-numbers
        7,
        stationNumber,
        "-1",
        -1,
        1,
        [ImsApiKey.ATTRIBUTE_CLASS_NAME, ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE],

        [attribClassName ? attribClassName : "STATION_GERUESTET", attributeCode, successful, ""]
    );

    if (result_attribAppendAttributeValues.return_value !== 0) {
        return generateError(
            result_attribAppendAttributeValues.attributeResultValues[3],
            "attribAppendAttributeValues"
        );
    }
    return generateReturn(0, "");
}

/**
 * Custom function cffcStorageLoad
 *
 * @function cffcStorageLoad
 * @author Konrad Łącki
 *
 * @param {string} stationNumber - stationNumber
 * @param {string} carrierNumber - magazineNumber
 *
 * @returns {Result_customFunctionCommon}
 *
 * @throws 0 - success
 * @throws -1 - Magazine is not intended for this station
 * @throws -1001 - Invalid input parameter
 */
function cffcStorageLoad(stationNumber, carrierNumber) {
    if (prod_cffcStorageLoad) {
        if (!carrierNumber || !stationNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparameter");
        }
        var incorrectMagazine = generateReturn(-1, "Magazin ist nicht für diese Station vorgesehen");
        var lotNumber = carrierNumber;
        var serialNumberResultKeys = [ImsApiKey.SERIAL_NUMBER];
        var result_shipGetSerialNumberDataForShippingLot = imsApiService.shipGetSerialNumberDataForShippingLot(
            imsApiSessionContext,
            stationNumber, // String
            lotNumber, // String
            serialNumberResultKeys // String[]
        );
        var return_value = result_shipGetSerialNumberDataForShippingLot.return_value;
        if (return_value != 0) {
            return generateError(
                result_shipGetSerialNumberDataForShippingLot.return_value,
                "shipGetSerialNumberDataForShippingLot"
            );
        }
        var serialNumberList = result_shipGetSerialNumberDataForShippingLot.serialNumberResultValues;
        if (serialNumberList.length == 0) {
            return generateReturn(1, "Magazin ist nicht für diese Station vorgesehen");
        }
        var serialNumber = String(serialNumberList[0]);
        var result_trGetNextProductionStep = imsApiService.trGetNextProductionStep(
            imsApiSessionContext,
            stationNumber,
            serialNumber,
            "-1",
            0,
            0,
            0,
            [ImsApiKey.STATION_NUMBER]
        );
        if (result_trGetNextProductionStep.return_value !== 0) {
            return generateError(result_trGetNextProductionStep.return_value, "trGetNextProductionStep");
        }
        var nextStationNumber = String(result_trGetNextProductionStep.productionStepResultValues[0]);

        if (nextStationNumber !== stationNumber) {
            return incorrectMagazine;
        }

        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber,
            // eslint-disable-next-line no-magic-numbers
            7,
            stationNumber,
            "-1",
            ["LAGERORTE"],
            0,
            [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE]
        );

        if (result_attribGetAttributeValues.return_value !== 0) {
            return generateError(result_attribGetAttributeValues.return_value, "attribGetAttributeValues");
        }

        var attributeLagerorte = String(result_attribGetAttributeValues.attributeResultValues[1]);

        var result_mlGetStorageData = imsApiService.mlGetStorageData(
            imsApiSessionContext,
            stationNumber,
            [
                new KeyValue(ImsApiKey.MAX_ROWS, "100"),
                new KeyValue(ImsApiKey.STORAGE_STATE, "F"),
                new KeyValue(ImsApiKey.STORAGE_GROUP_NUMBER, attributeLagerorte)
            ],

            [],
            [],
            [ImsApiKey.STORAGE_NUMBER],
            []
        );
        if (result_mlGetStorageData.return_value !== 0) {
            return generateError(result_mlGetStorageData.return_value, "mlGetStorageData");
        }
        var slotID = result_mlGetStorageData.storageResultValues.map(function (pos) {
            return String(pos);
        });

        var result_mlUpdateStorage = imsApiService.mlUpdateStorage(
            imsApiSessionContext,
            stationNumber,
            [ImsApiKey.ERROR_CODE, ImsApiKey.STORAGE_STATE, ImsApiKey.STORAGE_NUMBER],

            [0, "R", slotID[0]],
            [ImsApiKey.ERROR_CODE, ImsApiKey.REFERENCE],

            []
        );
        if (result_mlUpdateStorage.return_value !== 0) {
            return generateError(result_mlUpdateStorage.return_value, "mlUpdateStorage");
        }
        return generateReturn(0, "", [slotID[0]]);
    } else {
        return generateReturn(0, "", [5]);
    }
}

/**
 * @param {string} stationNumber
 * @param {string} magazineNumber
 * @param {string} position
 * @param {number} loadTimestamp
 * @returns {Result_customFunctionCommon}
 */
function cffcStorageLoadConfirmation(stationNumber, magazineNumber, position, loadTimestamp) {
    if (prod_cffcStorageLoadConfirmation) {
        if (!magazineNumber || !stationNumber || !position || !loadTimestamp) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparameter");
        }
        loadTimestamp = parseInt(loadTimestamp);

        var result_mlSetMaterialBinLocation = imsApiService.mlSetMaterialBinLocation(
            imsApiSessionContext,
            stationNumber,
            magazineNumber,
            loadTimestamp,
            position,
            "-1",
            // eslint-disable-next-line no-magic-numbers
            160
        ); // Stock in store - positive correction
        if (result_mlSetMaterialBinLocation.return_value !== 0) {
            return generateError(result_mlSetMaterialBinLocation.return_value, "mlSetMaterialBinLocation");
        }

        var result_mlUpdateStorage = imsApiService.mlUpdateStorage(
            imsApiSessionContext,
            stationNumber,
            [ImsApiKey.ERROR_CODE, ImsApiKey.STORAGE_STATE, ImsApiKey.STORAGE_NUMBER],

            [0, "O", position],
            [ImsApiKey.ERROR_CODE, ImsApiKey.REFERENCE],

            []
        );
        if (result_mlUpdateStorage.return_value !== 0) {
            return generateError(result_mlUpdateStorage.return_value, "mlUpdateStorage");
        }

        var result_shipGetSerialNumberDataForShippingLot = imsApiService.shipGetSerialNumberDataForShippingLot(
            imsApiSessionContext,
            stationNumber,
            magazineNumber,
            [ImsApiKey.SERIAL_NUMBER]
        );
        if (result_shipGetSerialNumberDataForShippingLot.return_value !== 0) {
            return generateError(
                result_shipGetSerialNumberDataForShippingLot.return_value,
                "shipGetSerialNumberDataForShippingLot"
            );
        }
        var refSerialNumbers = result_shipGetSerialNumberDataForShippingLot.serialNumberResultValues.map(function (
            value
        ) {
            return String(value);
        });

        // TODO: some ambiguities in this implementation, verify with author

        var result_trGetNextProductionStep = imsApiService.trGetNextProductionStep(
            imsApiSessionContext,
            stationNumber,
            refSerialNumbers[0],
            "-1",
            0,
            0,
            1,
            [ImsApiKey.WORKSTEP_AVO]
        );
        if (result_trGetNextProductionStep.return_value !== 0) {
            return generateError(result_trGetNextProductionStep.return_value, "trGetNextProductionStep");
        }

        var nextWorkstep = parseInt(String(result_trGetNextProductionStep.productionStepResultValues[0]), 10);

        for (var i = 0, maxLoopCounter1 = refSerialNumbers.length; i < maxLoopCounter1; i++) {
            /* eslint-disable no-magic-numbers */
            //Process Layaer set to 2 for testing purpose To be reviewed.
            var result_trUploadState = imsApiService.trUploadState(
                imsApiSessionContext,
                stationNumber,
                2,
                refSerialNumbers[i],
                "-1",
                3,
                1,
                -1,
                0,
                [ImsApiKey.ERROR_CODE, ImsApiKey.SERIAL_NUMBER, ImsApiKey.SERIAL_NUMBER_STATE],
                [0, refSerialNumbers[i], 3]
            );
            /* eslint-enable no-magic-numbers */
            if (result_trUploadState.return_value !== 0) {
                return generateError(result_trUploadState.return_value, "trUploadState");
            }
        }
        return generateReturn(0, "");
    } else {
        return generateReturn(0, "");
    }
}

/**
 * @param {string} stationNumber
 * @param {string} magazineNumber
 * @param {string} slotId
 * @param {number} unloadTimestamp
 * @returns {Result_customFunctionCommon}
 */
function cffcStorageUnloadConfirmation(stationNumber, magazineNumber, slotId, unloadTimestamp) {
    if (prod_cffcStorageUnloadConfirmation) {
        var expectedNumberOfParams = 4;
        try {
            checkForNullAndPipes(arguments, expectedNumberOfParams);
        } catch (e) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, e.toString());
        }

        if (!magazineNumber || !stationNumber || !slotId || !unloadTimestamp) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparamete");
        }

        unloadTimestamp = parseInt(unloadTimestamp);

        var result_mlSetMaterialBinLocation = imsApiService.mlSetMaterialBinLocation(
            imsApiSessionContext,
            stationNumber,
            magazineNumber,
            unloadTimestamp,
            slotId,
            "-1",
            // eslint-disable-next-line no-magic-numbers
            165
        ); // Stock in store - negative correction
        if (result_mlSetMaterialBinLocation.return_value !== 0) {
            return generateError(result_mlSetMaterialBinLocation.return_value, "mlSetMaterialBinLocation");
        }

        var result_mlUpdateStorage = imsApiService.mlUpdateStorage(
            imsApiSessionContext,
            stationNumber,
            [ImsApiKey.ERROR_CODE, ImsApiKey.STORAGE_STATE, ImsApiKey.STORAGE_NUMBER],

            [0, "F", slotId],
            [ImsApiKey.ERROR_CODE, ImsApiKey.REFERENCE],

            []
        );

        var errodCode = result_mlUpdateStorage.return_value;
        if (errodCode !== 0) {
            errodCode = result_mlUpdateStorage.storageUpdateResultValues[0];
            return generateError(errodCode, "mlUpdateStorage");
        }
        //Replacement to get the serial numbers
        var result_shipGetSerialNumberDataForShippingLot = imsApiService.shipGetSerialNumberDataForShippingLot(
            imsApiSessionContext,
            stationNumber,
            magazineNumber,
            [ImsApiKey.SERIAL_NUMBER]
        );
        if (result_shipGetSerialNumberDataForShippingLot.return_value !== 0) {
            return generateError(
                result_shipGetSerialNumberDataForShippingLot.return_value,
                "shipGetSerialNumberDataForShippingLot"
            );
        }
        var refSerialNumbers = result_shipGetSerialNumberDataForShippingLot.serialNumberResultValues.map(function (
            value
        ) {
            return String(value);
        });
        //var result_shipGetChildLotsForParentLot = imsApiService.shipGetChildLotsForParentLot(imsApiSessionContext, stationNumber, magazineNumber, [
        //  ImsApiKey.MATERIAL_BIN_NUMBER,
        //]);
        //if (result_shipGetChildLotsForParentLot.return_value !== 0) {
        //  return generateError(result_shipGetChildLotsForParentLot.return_value, "shipGetChildLotsForParentLot");
        //}
        //
        //var refSerialNumbers = result_shipGetChildLotsForParentLot.childLotResultValues.map(function (value) {
        //  return String(value);
        //});

        for (var i = 0, maxLoopCounter1 = refSerialNumbers.length; i < maxLoopCounter1; i++) {
            var result_trGetSerialNumberUploadInfo = imsApiService.trGetSerialNumberUploadInfo(
                imsApiSessionContext,
                stationNumber,
                -1,
                refSerialNumbers[i],
                "-1",
                0,
                [ImsApiKey.PROCESS_LAYER]
            );
            if (result_trGetSerialNumberUploadInfo.return_value !== 0) {
                return generateError(result_trGetSerialNumberUploadInfo.return_value, "trGetSerialNumberUploadInfo");
            }

            var currentProcessLayer = parseInt(
                String(result_trGetSerialNumberUploadInfo.uploadInfoResultValues[0]),
                10
            );

            /* eslint-disable no-magic-numbers */
            var result_trUploadState = imsApiService.trUploadState(
                imsApiSessionContext,
                stationNumber,
                currentProcessLayer,
                refSerialNumbers[i],
                "-1",
                0,
                1,
                -1,
                0,
                [ImsApiKey.ERROR_CODE, ImsApiKey.SERIAL_NUMBER, ImsApiKey.SERIAL_NUMBER_STATE],
                [0, refSerialNumbers[i], 0]
            );
            /* eslint-enable no-magic-numbers */
            if (result_trUploadState.return_value !== 0) {
                return generateError(result_trUploadState.return_value, "trUploadState");
            }
        }
        return generateReturn(0, "");
    } else {
        return generateReturn(0, "");
    }
}

/**
 * @param {string} stationNumber
 * @param {string} serialNumber
 * @param {number} position
 * @param {number} unloadTimeStamp
 * @returns {Result_customFunctionCommon}
 */
function cffcUnloadChamberConfirmation(stationNumber, serialNumber, position, unloadTimeStamp) {
    if (prod_cffcUnloadChamberConfirmation) {
        if (!serialNumber || !stationNumber || !position || !unloadTimeStamp) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Ungültige Inputparameter");
        }

        //unloadTimeStamp = parseInt(unloadTimeStamp) * 1000;
        //--------------------------------------------------------------------------------------------------
        var substarctId = getSubstractIdFromSnr(serialNumber);
        var firstSnr = getFirstSnrPosition(stationNumber, serialNumber);

        var attributeFilters = [new KeyValue("DATE_FROM", -1)];
        var objectResultKeys = ["SERIAL_NUMBER"];
        var result_attribGetObjectsForAttributeValues = imsApiService.attribGetObjectsForAttributeValues(
            imsApiSessionContext,
            stationNumber, // String
            (objectType = 0), // int
            (attributeCode = "SLOT"), // String
            (attributeValue = position), // String
            (maxRows = -1), // int
            attributeFilters, // KeyValue[]
            objectResultKeys // String[]
        );
        var return_value = result_attribGetObjectsForAttributeValues.return_value;
        if (return_value != 0) {
            return generateReturn(-1001, "Fehler in MES API Fehler in MES API");
        }
        var objectResultValues = result_attribGetObjectsForAttributeValues.objectResultValues;
        var foundSnr = objectResultValues[0];
        if (foundSnr != firstSnr) {
            return generateReturn(20, "Calibration plate has to be removed manually");
        }

        var removeSerialNumberFromCarrierKeys = ["ERROR_CODE", "SERIAL_NUMBER", "SERIAL_NUMBER_POS"];
        var removeSerialNumberFromCarrierValues = [0, firstSnr, "-1"];

        var result_equRemoveSerialNumberFromCarrier = imsApiService.equRemoveSerialNumberFromCarrier(
            imsApiSessionContext,
            stationNumber, // String
            (equipmentNumber = stationNumber), // String
            (equipmentIndex = 0), // String
            removeSerialNumberFromCarrierKeys, // String[]
            removeSerialNumberFromCarrierValues // String[]
        );
        var return_value = result_equRemoveSerialNumberFromCarrier.return_value;
        if (return_value != 0) {
            return generateReturn(-1001, "Fehler in MES API Fehler in MES API");
        }
        var removeSerialNumberFromCarrierResultValues =
            result_equRemoveSerialNumberFromCarrier.removeSerialNumberFromCarrierResultValues;

        var result_attribRemoveAttributeValue = imsApiService.attribRemoveAttributeValue(
            imsApiSessionContext,
            stationNumber, // String
            (objectType = 0), // int
            (objectNumber = firstSnr), // String
            (objectDetail = "-1"), // String
            (attributeCode = "SLOT"), // String
            (attributeValueKey = "-1") // String
        );
        var return_value = result_attribRemoveAttributeValue.return_value;
        if (return_value != 0) {
            return generateReturn(-1001, "Fehler in MES API Fehler in MES API");
        }

        var result_attribAppendAttributeValues = imsApiService.attribAppendAttributeValues(
            imsApiSessionContext,
            stationNumber,
            0,
            substarctId,
            "-1",
            -1,
            1,
            [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE],
            ["ENTLADEN_DATUM", unloadTimeStamp, 0]
        );
        var return_value = result_attribAppendAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribAppendAttributeValues");
        }
        //--------------------------------------------------------------------------------------------------
        return generateReturn(0, "");
    } else {
        return generateReturn(0, "");
    }
}

/**
 * @param stationNumber - stationNumber
 * @param timestamp - timestamp
 * @param topic - topic
 * @param data - data
 * @param equipmentNumber - equipmentNumber
 * @param userID - userID
 * @returns {Result_customFunctionCommon}
 */
function cffcUploadMachineConditionOrMessages(
    stationNumber,
    timeStampMachineCondition,
    timeStampMachineMessage,
    machineCondition,
    machineMessage,
    userID
) {
    if (!stationNumber) {
        // eslint-disable-next-line no-magic-numbers
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    if (!machineCondition && !machineMessage) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }
    var condition;
    var message; //<ERROR/INFO>|<Message>
    var timestamp;

    if (machineCondition) {
        condition = machineCondition;
        if (!timeStampMachineCondition) {
            timestamp = -1;
        } else {
            timestamp = parseInt(timeStampMachineCondition);
        }
        var result_mdcUploadStationCondition = imsApiService.mdcUploadStationCondition(
            imsApiSessionContext,
            stationNumber,
            [ImsApiKey.BOOKING_TARGET, ImsApiKey.CONDITION_CODE, ImsApiKey.ERROR_CODE, ImsApiKey.DATE_FROM],

            [2, condition, 0, timestamp]
        );

        var errorcode = result_mdcUploadStationCondition.return_value;

        if (errorcode == 5) {
            errorcode = result_mdcUploadStationCondition.stationConditionResultValues[2];
        }

        if (errorcode !== 0) {
            return generateError(errorcode, "mdcUploadStationCondition");
        }
    }

    if (machineMessage) {
        message = machineMessage;
        if (!timeStampMachineMessage) {
            timestamp = -1;
        } else {
            timestamp = parseInt(timeStampMachineMessage);
        }
        var result_mdcUploadStationCondition = imsApiService.mdcUploadStationCondition(
            imsApiSessionContext,
            stationNumber,
            [ImsApiKey.BOOKING_TARGET, ImsApiKey.CONDITION_CODE, ImsApiKey.ERROR_CODE, ImsApiKey.DATE_FROM],

            [2, message, 0, timestamp]
        );

        var errorcode = result_mdcUploadStationCondition.return_value;

        if (errorcode == 5) {
            errorcode = result_mdcUploadStationCondition.stationConditionResultValues[2];
        }

        if (errorcode !== 0) {
            return generateError(errorcode, "mdcUploadStationCondition");
        }
    }

    return generateReturn(0, "");
}

/**
 * Custom function cfffUploadProcessData
 *
 * @function cfffUploadProcessData
 * @author Sami Akkari
 *
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - processData
 *
 * @returns {Result_customFunctionCommon}
 */
function cfffUploadProcessData() {
    if (prod_cfffUploadProcessData) {
        var inArgs = [].slice.call(arguments);
        var stationNumber = inArgs[0];
        var data = inArgs.slice(1, inArgs.length);

        if (!stationNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }

        var processData = [];
        var numberOfKeys = 3; // measure name, measure value and unit

        for (var i = 0; i < data.length / numberOfKeys; i++) {
            processData.push(
                new Measure(
                    data[i * numberOfKeys],
                    "",
                    data[i * numberOfKeys + 1],
                    "",
                    "",
                    "",
                    data[i * numberOfKeys + 2]
                )
            );
        }
        logHandler.logMessage("+++++++++");
        logHandler.logMessage(processData);
        if (processData.length == 0) {
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }

        //------------------trUploadStationResult----------------------
        var partNumber = "-1";
        var bomVersion = -1;
        var bomIndex = "-1";
        var bomVersionErp = "-1";
        var workOrderNumber = "-1";
        var bookDate = -1;
        var serialUnitTrace = 0;
        var stationResultUploadKeys = [
            ImsApiKey.ERROR_CODE,
            ImsApiKey.MEASURE_FAIL_CODE,
            ImsApiKey.MEASURE_NAME,
            ImsApiKey.MEASURE_VALUE,
            ImsApiKey.UNIT
        ];
        var stationResultUploadValues = [];

        for (var i = 0; i < processData.length; i++) {
            stationResultUploadValues.push(
                0,
                0,
                processData[i].MEASURE_NAME,
                processData[i].MEASURE_VALUE,
                processData[i].MEASURE_UNIT
            );
        }

        var result_trUploadStationResult = imsApiService.trUploadStationResult(
            imsApiSessionContext,
            stationNumber, // String
            partNumber, // String
            bomVersion, // int
            bomIndex, // String
            bomVersionErp, // String
            workOrderNumber, // String
            bookDate, // long
            serialUnitTrace, // int
            stationResultUploadKeys, // String[]
            stationResultUploadValues // String[]
        );
        var return_value = result_trUploadStationResult.return_value;
        if (return_value !== 0) {
            return generateError(return_value, "Fehler in MES API trUploadStationResult");
        }
        return generateReturn(0, "");
    } else {
        return generateReturn(0, "");
    }
}

/**
 * @param {string} inputArg1 - stationNumber
 * @param {number} inputArg2 - serialNumber
 * @returns {Result_customFunctionCommon}
 */
function cffcWayDecision(stationNumber, serialNumber) {
    if (prod_cffcWayDecision) {
        // TODO: implement after specification is ready
        if (!stationNumber || !serialNumber) {
            // eslint-disable-next-line no-magic-numbers
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        var resultval = [];
        var NextStation = [];
        //-------------------attribGetAttributeValues--------------
        var objectType = 0;
        var objectNumber = serialNumber;
        var objectDetail = -1;
        var attributeCodeArray = ["TYP"];
        var allMergeLevel = 1;
        var attributeResultKeys = ["ATTRIBUTE_CODE", "ATTRIBUTE_VALUE"];
        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber, // String
            objectType, // int
            objectNumber, // String
            objectDetail, // String
            attributeCodeArray, // String[]
            allMergeLevel, // int
            attributeResultKeys // String[]
        );
        var return_value = result_attribGetAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(return_value, "Fehler in MES API attribGetAttributeValues");
        }
        var plateType = result_attribGetAttributeValues.attributeResultValues[1];
        if (plateType == "PrePrint") {
            return generateReturn(1, "PrePrint Plate: Einlagern im Mini-Loader");
        }
        //---------------trGetNextProductionStep--------------
        var serialNumberPos = "-1";
        var functionMode = 0;
        var stateCheck = 0;
        var confirmFlag = 0;
        var productionStepResultKeys = [ImsApiKey.PROCESS_LAYER, ImsApiKey.STATION_NUMBER];
        var result_trGetNextProductionStep = imsApiService.trGetNextProductionStep(
            imsApiSessionContext,
            stationNumber, // String
            serialNumber, // String
            serialNumberPos, // String
            functionMode, // int
            stateCheck, // int
            confirmFlag, // int
            productionStepResultKeys // String[]
        );
        var return_value = result_trGetNextProductionStep.return_value;
        if (return_value != 0) {
            return generateError(-1002, "Fehler in MES API trGetNextProductionStep");
        }
        var processLayer = result_trGetNextProductionStep.productionStepResultValues[0];
        if (result_trGetNextProductionStep.productionStepResultValues.length == 0) {
            return generateReturn(1, "Einlagern im Mini-Loader");
        }
        if (processLayer == 0) {
            var Side = 11;
            var message1 = "Top";
        } else if (processLayer == 1) {
            var Side = 13;
            var message1 = "Bottom";
        }
        //----------------configGetValues----------------------
        var options = [];
        //! In the configuration client, it's necessary to identify the CONFIG_APPTYPE/CLUSTER/HOST and the PARAMATER_NAME or ID
        var configContext = new Array(
            new KeyValue("CONFIG_APPTYPE", "Internal"),
            new KeyValue("CONFIG_CLUSTER", "ZiedB"),
            new KeyValue("CONFIG_HOST", "itacnotebk451.itac.intra")
        );
        var parameterFilter = new Array(new KeyValue("PARAMETER_ID", "2464"));
        var parameterResultKeys = [];
        var resultKeys = [ImsApiKey.CONFIG_KEY, ImsApiKey.CONFIG_VALUE];
        var result_configGetValues = imsApiService.configGetValues(
            imsApiSessionContext,
            options, // KeyValue[]
            configContext, // KeyValue[]
            parameterFilter, // KeyValue[]
            parameterResultKeys, // String[]
            resultKeys // String[]
        );
        var return_value = result_configGetValues.return_value;
        if (return_value != 0) {
            return generateError(-1002, "Fehler in MES API configGetValues");
        }
        var resultValues = result_configGetValues.resultValues;
        for (var i = 0; i < result_configGetValues.resultValues.length / 2; i++) {
            for (var j = 0; j < result_trGetNextProductionStep.productionStepResultValues.length / 2; j++) {
                if (
                    result_configGetValues.resultValues[i * 2] ==
                    result_trGetNextProductionStep.productionStepResultValues[2 * j + 1]
                ) {
                    var val = result_configGetValues.resultValues[i * 2 + 1].split("|");
                    if (val[3] == 0) {
                        // Station available
                        var path = val[0] + val[1];
                    } else {
                        // station not available
                        return generateReturn(1, "Einlagern im Mini-Loader");
                    }
                }
            }
        }

        if (path == 12) {
            var message = "Left";
        } else if (path == 14) {
            var message = "Right";
        }

        var errorString = "path: " + message + " , Side: " + message1;
        var Way = "path: " + path + " , Side: " + Side;
        return generateReturn(0, errorString, [Way]);
    } else {
        return generateReturn(0, "", [11]);
    }
}

/**
 * Custom function cfpCameraIn
 *
 * @function cfpCameraIn
 * @author Sami Akkari
 *
 * @param {string} stationNumber
 * @param {number} serialNumber
 * @param {string} processName
 * @param {number} version
 * @param {string} workOrderNumber
 * @param {string} articleNumber
 * @param {string} specialState
 * @returns {Result_customFunctionCommon}
 */
function cfpCameraIn(payLoad) {
    if (!payLoad) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var payLoadData;

    try {
        payLoadData = JSON.parse(payLoad);
    } catch (e) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    if (
        !payLoadData.stationNumber ||
        !payLoadData.serialNumber ||
        !payLoadData.processName ||
        !payLoadData.version ||
        !payLoadData.workOrderNumber ||
        !payLoadData.articleNumber ||
        !payLoadData.specialState
    ) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var stationNumber = payLoadData.stationNumber;
    var serialNumber = payLoadData.serialNumber;
    var processName = payLoadData.processName;
    var version = payLoadData.version;
    var workOrderNumber = payLoadData.workOrderNumber;
    var articleNumber = payLoadData.articleNumber;
    var specialState = payLoadData.specialState;

    var results = [stationNumber, serialNumber, processName, version, workOrderNumber, articleNumber, specialState];
    return generateReturn(0, "", results);
}

/**
 * Custom function cfpEcho
 *
 * @function cfpEcho
 * @author Sami Akkari
 *
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - reportedCallId
 *
 * @returns {Result_customFunctionCommon}
 */
function cfpEcho(reportedCallId) {
    var results = [reportedCallId];
    return generateReturn(0, "", results);
}

/**
 * Custom function cffcPing
 *
 * @function cffcPing
 * @author Sami Akkari
 *
 * @param {string} topic
 * @param {number} callID
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcPing(topic, callID) {
    // msgPublish
    var result_msgPublish = imsApiService.msgPublish(imsApiSessionContext, topic, callID);
    var return_value = result_msgPublish.return_value;

    if (return_value !== 0) {
        return generateReturn(return_value, "Fehler in MES API msgPublish");
    }

    return generateReturn(0, "", [callID]);
}

/**
 * @function cfpParameterViolation
 * @since 1.0.0
 * @author Faouzi Ben Mabrouk
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - violationMessage
 * @returns {Result_customFunctionCommon}
 */
function cfpParameterViolation(payLoad) {
    if (!payLoad) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var payLoadData;

    try {
        payLoadData = JSON.parse(payLoad);
    } catch (e) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    if (!payLoadData.stationNumber || !payLoadData.violationMessage) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }
    var stationNumber = payLoadData.stationNumber;
    var violationMessage = payLoadData.violationMessage;
    return generateReturn(0, "", [violationMessage]);
}

/**
 * @param {string} stationNumber
 * @param {number} magazineNumber
 * @param {number} position
 * @returns {Result_customFunctionCommon}
 */
function cfpSelectMagazine(stationNumber, magazineNumber, position) {
    // TODO: implement after specification is ready

    var expectedNumberOfParams = 3;
    try {
        checkForNullAndPipes(arguments, expectedNumberOfParams);
    } catch (e) {
        // eslint-disable-next-line no-magic-numbers
        return generateReturn(-1001, e.toString());
    }

    return generateReturn(0, "");
}

/**
 * Custom function cfpSetup
 *
 * @function cfpSetup
 * @author   Sami Akkari
 * @since    9.50.00
 * @version  1.2
 *
 * @param {string} payLoad -  JSON string containing all data
 *
 * @returns {Result_customFunctionCommon}
 * @throws -1001 - Fehlerhafte Daten an das MES übertragen
 */
function cfpSetup(payLoad) {
    if (!payLoad) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var payLoadData;
    try {
        payLoadData = JSON.parse(payLoad);
    } catch (e) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    //Collectall the keys in the JSON
    var keys = [];
    for (var k in payLoadData) keys.push(k);

    //Apply checks on JSON key/value
    var results = [];
    for (var i = 0; i < keys.length; i++) {
        if (!payLoadData[keys[i]]) {
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        results.push(JSON.stringify(payLoadData[keys[i]]).replace("", "")); //to be checked
    }

    return generateReturn(0, "", results);
}

/**
 * @param {string} payLoad
 * @returns {Result_customFunctionCommon}
 */
function cfpStorageUnload(payLoad) {
    // TODO: implement after specification is ready
    if (!payLoad) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var payLoadData;

    try {
        payLoadData = JSON.parse(payLoad);
    } catch (e) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    if (!payLoadData.slotId || !payLoadData.carrierNumber) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    // var stationNumber = payLoadData.stationNumber;
    var slotId = payLoadData.slotId;
    var carrierNumber = payLoadData.carrierNumber;

    // for (param of payLoadData) {
    //     results.push(param);
    // }

    var results = [slotId, carrierNumber];
    return generateReturn(0, "", results);
}

/**
 * Custom function cfpUnloadChamber
 *
 * @function cfpUnloadChamber
 * @author Sami Akkari
 *
 * @param {string} stationNumber
 * @param {string} serialNumber
 * @param {number} slotId
 * @param {number} plateType
 *
 * @returns {Result_customFunctionCommon}
 */
function cfpUnloadChamber(payLoad) {
    if (!payLoad) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var payLoadData;

    try {
        payLoadData = JSON.parse(payLoad);
    } catch (e) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    if (!payLoadData.serialNumber || !payLoadData.slotId || !payLoadData.plateType) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    // var stationNumber = payLoadData.stationNumber;
    var serialNumber = payLoadData.serialNumber;
    var slotId = payLoadData.slotId;
    var plateType = payLoadData.plateType;

    var results = [serialNumber, slotId, plateType];
    return generateReturn(0, "", results);
}

/**
 * Custom function cffcAllowOpen
 *
 * @function cffcAllowOpen
 * @author Abderraouf Bouyahi
 *
 * @param {string} stationNumber
 *
 * @returns {Result_customFunctionCommon}
 */
function cffcAllowOpen(stationNumber) {
    if (prod_cffcAllowOpen) {
        if (!stationNumber) {
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        var objectType = 7;
        var objectNumber = stationNumber;
        var objectDetail = "-1";
        var attributeCodeArray = ["PROTECTION"];
        var allMergeLevel = 0;
        var attributeResultKeys = [ImsApiKey.ATTRIBUTE_CODE, ImsApiKey.ATTRIBUTE_VALUE, ImsApiKey.ERROR_CODE];
        var result_attribGetAttributeValues = imsApiService.attribGetAttributeValues(
            imsApiSessionContext,
            stationNumber, // --> String
            objectType, // --> int
            objectNumber, // --> String
            objectDetail, // --> String
            attributeCodeArray, // --> String[]
            allMergeLevel, // --> int
            attributeResultKeys // --> String[]
        );
        var return_value = result_attribGetAttributeValues.return_value;
        if (return_value != 0) {
            return generateError(-1002, "Fehler in MES API attribGetAttributeValues");
        }
        var product = result_attribGetAttributeValues.attributeResultValues[1];

        var results = [product];
        return generateReturn(0, "", results);
    } else {
        return generateReturn(0, "", [0]);
    }
}
/**
 * Custom function cfpSwitchChamber
 *
 * @function cfpSwitchChamber
 * @author Abderraouf Bouyahi
 *
 * @param {string} stationNumber
 * @param {string} serialNumber
 * @param {string} slotIDFrom
 * @param {string} slotIDTarget
 *
 * @returns {Result_customFunctionCommon}
 */
function cfpSwitchChamber(payLoad) {
    if (!payLoad) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var payLoadData;

    try {
        payLoadData = JSON.parse(payLoad);
    } catch (e) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    if (
        !payLoadData.stationNumber ||
        !payLoadData.serialNumber ||
        !payLoadData.slotIDFrom ||
        !payLoadData.slotIDTarget
    ) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var stationNumber = payLoadData.stationNumber;
    var serialNumber = payLoadData.serialNumber;
    var slotIDFrom = payLoadData.slotIDFrom;
    var slotIDTarget = payLoadData.slotIDTarget;

    var results = [stationNumber, serialNumber, slotIDFrom, slotIDTarget];
    return generateReturn(0, "", results);
}

/**
 * Custom function cfpSwitchChamber
 *
 * @function cffcHandleIST
 * @author Abderraouf Bouyahi
 *
 * @param {string} stationNumber
 * @param {string} serialNumber
 *
 * @returns {Result_customFunctionCommon}
 */

function cffcHandleIST(stationNumber, serialNumber) {
    if (prod_cffcHandleIST) {
        if (!stationNumber || !serialNumber) {
            return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
        }
        var results = cffcMachineIn(stationNumber, serialNumber);
        var return_value = results.return_value;
        if (return_value == 0) {
            return generateError(-1002, "Fehler in cffcMachineIn");
        }
        var slotID = results.outArgs[6];
        var processedPlates = results.outArgs[7];
        var remainingPlates = results.outArgs[8];
        var results = [slotID, processedPlates, remainingPlates];
        ///var results = [slotID, processedPlates, remainingPlates];
        var result_trGetSerialNumberInfo = imsApiService.trGetSerialNumberInfo(
            imsApiSessionContext,
            stationNumber,
            serialNumber,
            "-1",
            [ImsApiKey.WORKORDER_NUMBER]
        );
        if (result_trGetSerialNumberInfo.return_value !== 0) {
            return generateError(result_mlUpdateStorage.return_value, "result_trGetSerialNumberInfo");
        }
        var workorderNumber = String(result_trGetSerialNumberInfo.serialNumberResultValues[0]);
        var res = workorderNumber.split("_");
        if (res[1] == "Vordruck") {
            var result = cffcWayDecision(stationNumber, serialNumber);
            if (result.return_value == 0) {
                return generateError(-1002, "Fehler in cffcWayDecision");
            }
            var result = cffcMachineOut(stationNumber, serialNumber, "", "", 0, "", "", "");
            if (result.return_value == 0) {
                return generateError(-1002, "Fehler in cffcMachineOut");
            }
            return generateReturn(1, "forward plate to MiniLoader", results);
        }
        var result_trGetSerialNumberUploadInfo = imsApiService.trGetSerialNumberUploadInfo(
            imsApiSessionContext,
            stationNumber,
            -1,
            serialNumber,
            "-1",
            0,
            [ImsApiKey.STATION_NUMBER]
        );
        if (result_trGetSerialNumberUploadInfo.return_value !== 0) {
            return generateError(result_trGetSerialNumberUploadInfo.return_value, "trGetSerialNumberUploadInfo");
        }
        var STATION_NUMBER = result_trGetSerialNumberUploadInfo.uploadInfoResultValues[0];
        if (isAllowedStation(STATION_NUMBER, "STATION_TYPE", "KLS")) {
            var result = cffcWayDecision(stationNumber, serialNumber);
            if (result.return_value == 0) {
                return generateError(-1002, "Fehler in cffcWayDecision");
            }
            var result = cffcMachineOut(stationNumber, serialNumber, "", "", 0, "", "", "");
            if (result.return_value == 0) {
                return generateError(-1002, "Fehler in cffcMachineOut");
            }
            return generateReturn(0, "forward plate forward plate to SPU MiniLoader", results);
        } else return generateReturn(1003, "Invalid input");
    } else {
        return generateReturn(0, "forward plate forward plate to SPU MiniLoader", [12, 23, 97]);
    }
}

/**
 * @param {string} inputArg1 - stationNumber
 * @param {string} inputArg2 - processName
 * @param {string} inputArg3 - version
 * @param {string} inputArg4 - workOrderNumber
 * @param {string} inputArg5 - articleNumber
 * @param {number} inputArg6 - toleranceName
 * @param {string} inputArg7 - toleranceLowerValue
 * @param {string} inputArg8 - toleranceUpperValue
 * @param {string} inputArg9 - toleranceUnit
 * @param {string} inputArg10 - priority
 * @returns {Result_customFunctionCommon}
 */

function cfpIEIn(payLoad) {
    if (!payLoad) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var payLoadData;

    try {
        payLoadData = JSON.parse(payLoad);
    } catch (e) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    if (
        !payLoadData.stationNumber ||
        !payLoadData.processName ||
        !payLoadData.version ||
        !payLoadData.workOrderNumber ||
        !payLoadData.articleNumber ||
        !payLoadData.toleranceName ||
        !payLoadData.toleranceLowerValue ||
        !payLoadData.toleranceUpperValue ||
        !payLoadData.toleranceUnit ||
        !payLoadData.priority
    ) {
        return generateReturn(-1001, "Fehlerhafte Daten an das MES übertragen");
    }

    var stationNumber = payLoadData.stationNumber;
    var processName = payLoadData.processName;
    var version = payLoadData.version;
    var workOrderNumber = payLoadData.workOrderNumber;
    var articleNumber = payLoadData.articleNumber;
    var toleranceName = payLoadData.toleranceName;
    var toleranceLowerValue = payLoadData.toleranceLowerValue;
    var toleranceUpperValue = payLoadData.toleranceUpperValue;
    var toleranceUnit = payLoadData.toleranceUnit;
    var priority = payLoadData.priority;

    var results = [
        stationNumber,
        processName,
        version,
        workOrderNumber,
        articleNumber,
        toleranceName,
        toleranceLowerValue,
        toleranceUpperValue,
        toleranceUnit,
        priority
    ];
    return generateReturn(0, "", results);
}

function Measure(name, type, value, nominal, lowerlimit, upperlimit, unit) {
    this.MEASURE_NAME = name;
    this.MEASURE_TYPE = type;
    this.MEASURE_VALUE = value;
    this.MEASURE_NOMINAL = nominal;
    this.MEASURE_LOWERLIMIT = lowerlimit;
    this.MEASURE_UPPERLIMIT = upperlimit;
    this.MEASURE_UNIT = unit;
}
