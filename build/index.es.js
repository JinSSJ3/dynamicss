function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

var DynamiCSS;
(function (DynamiCSS) {
    function insertStyleSheet(dynamicSheet) {
        var result_id = "";
        if (typeof window === "undefined") {
            return "";
        }
        if (!dynamicSheet) {
            return "";
        }
        //if already exists
        if (document.getElementById(dynamicSheet.id)) {
            return dynamicSheet.id;
        }
        result_id = dynamicSheet.id;
        var styleSheet = document.createElement("style");
        styleSheet.id = result_id;
        styleSheet.setAttribute("type", "text/css");
        var contetRaw = toRawStyleSheet(dynamicSheet.sheetRules || []);
        console.log("DynamiCSS insertStyleSheet toRawStyleSheet =>contetRaw", contetRaw);
        styleSheet.textContent = contetRaw;
        try {
            document.head.appendChild(styleSheet);
        }
        catch (error) {
            return "";
        }
        return result_id;
    }
    DynamiCSS.insertStyleSheet = insertStyleSheet;
    function editStyleSheet(id, sheetRules) {
        var result_id = "";
        if (typeof window === "undefined") {
            return "";
        }
        if (!id || !sheetRules) {
            return "";
        }
        //if dont exists yet
        if (!document.getElementById(id)) {
            return "";
        }
        result_id = id;
        var styleSheet = document.createElement("style");
        styleSheet.id = result_id;
        styleSheet.setAttribute("type", "text/css");
        styleSheet.textContent = toRawStyleSheet(sheetRules);
        try {
            document.head.appendChild(styleSheet);
        }
        catch (error) {
            return "";
        }
        return result_id;
    }
    DynamiCSS.editStyleSheet = editStyleSheet;
    function removeStyleSheet(id) {
        var result_id = "";
        var htmlObject = document.getElementById(id);
        if (htmlObject) {
            document.head.removeChild(htmlObject);
        }
        return result_id;
    }
    DynamiCSS.removeStyleSheet = removeStyleSheet;
})(DynamiCSS || (DynamiCSS = {}));
/**
 * Determines whether a character is upperCase or not
 * @param str a character
 * @returns true if str contains a string character
 */
function isUpper(character) {
    if (!character)
        return false;
    return !/[a-z]/.test(character) && /[A-Z]/.test(character);
}
/**
 * Converts a rule with uppercase to a hyphen-lowercase version
 * @param rule the rule
 * @returns
 */
function fromUpperCaseToHyphen(ruleLabel) {
    var result = "";
    var charUpper = ' ';
    var isupper = false;
    for (var i = 0; i < ruleLabel.length; i++) {
        var currentChar = ruleLabel[i];
        if (isUpper(currentChar)) {
            charUpper = currentChar;
            isupper = true;
            break;
        }
    }
    //add hyphen
    if (isupper) {
        var parts = ruleLabel.split(charUpper);
        result = parts[0] + "-" + charUpper.toLowerCase() + parts[1];
    }
    else {
        result = ruleLabel;
    }
    return result;
}
/**
 *
 * @param ruleLabel the rule
 * @returns true if the rule label corresponds to a pseudo class
 */
function isPseudo(ruleLabel) {
    if (!ruleLabel)
        return false;
    return ruleLabel.includes(":");
}
function toRawStyleSheet(sheetRules) {
    if (!sheetRules) {
        return "";
    }
    console.log("Dynamicss sheetRules", sheetRules);
    // const sheetRules: DynamicSheetRule[] = sheet.sheetRules;
    var rawStyleSheet = "";
    var nestedPseudos = [];
    for (var j = 0; j < sheetRules.length; j++) {
        var currentRule = sheetRules[j];
        console.log("Dynamicss currentRule j=" + j, currentRule);
        var currnetRawRule = "";
        currnetRawRule += "." + currentRule.className + "{\n";
        //list of labels for rules
        var ruleskeys = Object.keys(currentRule.rules);
        console.log("Dynamicss ruleskeys j=" + j, ruleskeys);
        for (var i = 0; i < ruleskeys.length; i++) {
            var currentKey = ruleskeys[i];
            console.log("Dynamicss currentKey j=" + j + " i=" + i, currentKey);
            var styleLabel = fromUpperCaseToHyphen(currentKey);
            //if a pseudo class found, separate it
            if (isPseudo(styleLabel)) {
                console.log("Dynamicss isPseudo true j=" + j + " i=" + i, styleLabel);
                var pseudoClassName = currentRule.className + styleLabel;
                nestedPseudos.push({ className: pseudoClassName, rules: currentRule.rules[styleLabel] });
            }
            else {
                var styleRule = currentRule.rules[currentKey];
                console.log("Dynamicss currnetRawRule", currentRule.rules, currentKey, styleRule);
                currnetRawRule += "\t" + styleLabel + " : " + styleRule + ";\n";
            }
        }
        currnetRawRule += "}\n";
        rawStyleSheet += currnetRawRule;
    }
    //nested pseudos
    console.log("Dynamicss nestedPseudos", nestedPseudos);
    for (var p = 0; p < nestedPseudos.length; p++) {
        var currnetRawRule = "";
        var currentRule = nestedPseudos[p];
        var ruleskeys = Object.keys(currentRule.rules);
        currnetRawRule += "." + currentRule.className + "{\n";
        for (var i = 0; i < ruleskeys.length; i++) {
            var currentKey = ruleskeys[i];
            var styleLabel = fromUpperCaseToHyphen(currentKey);
            var styleRule = currentRule.rules[currentKey];
            currnetRawRule += "\t" + styleLabel + " : " + styleRule + ";\n";
        }
        currnetRawRule += "}\n";
        rawStyleSheet += currnetRawRule;
    }
    return rawStyleSheet;
}

export { DynamiCSS };
//# sourceMappingURL=index.es.js.map
