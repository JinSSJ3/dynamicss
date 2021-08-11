'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

exports.DynamiCSS = void 0;
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
        var contetRaw = toRawStyleSheet(dynamicSheet.sheetRules || []) + dynamicSheet.raw || "";
        styleSheet.textContent = contetRaw;
        var appendResult = document.head.appendChild(styleSheet);
        if (!appendResult) {
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
        var styleSheet = document.getElementById(id);
        if (!styleSheet) {
            return "";
        }
        /*  result_id = id;
         //var styleSheet: HTMLStyleElement = document.createElement("style");
         styleSheet.id = result_id;
         styleSheet.setAttribute("type", "text/css"); */
        styleSheet.textContent = toRawStyleSheet(sheetRules);
        return result_id;
    }
    DynamiCSS.editStyleSheet = editStyleSheet;
    function removeStyleSheet(id) {
        var result_id = "";
        if (!id) {
            return "";
        }
        var htmlObject = document.getElementById(id);
        if (htmlObject) {
            document.head.removeChild(htmlObject);
            result_id = id;
        }
        return result_id;
    }
    DynamiCSS.removeStyleSheet = removeStyleSheet;
    function existStyleSheet(id) {
        if (!id) {
            return false;
        }
        var htmlObject = document.getElementById(id);
        if (htmlObject) {
            return true;
        }
        return false;
    }
    DynamiCSS.existStyleSheet = existStyleSheet;
    function makeStyleSheet(styleSheet) {
        if (!styleSheet) {
            return null;
        }
        return styleSheet;
    }
    DynamiCSS.makeStyleSheet = makeStyleSheet;
})(exports.DynamiCSS || (exports.DynamiCSS = {}));
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
function makeRawRuleLabel(className) {
    var result = "";
    var splitedClassName = className.trim().split(" ");
    //is composed classname?
    if (splitedClassName.length > 1) {
        for (var i = 0; i < splitedClassName.length; i++) {
            result += "." + splitedClassName[i];
        }
        result += "{\n";
    }
    else {
        result += "." + className + "{\n";
    }
    return result;
}
function toRawStyleSheet(sheetRules) {
    if (!sheetRules) {
        return "";
    }
    var rawStyleSheet = "";
    var nestedPseudos = [];
    for (var j = 0; j < sheetRules.length; j++) {
        var currentRule = sheetRules[j];
        var currnetRawRule = "";
        // currnetRawRule += `.${currentRule.className}{\n`;
        currnetRawRule += makeRawRuleLabel(currentRule.className);
        //list of labels for rules
        var ruleskeys = Object.keys(currentRule.rules);
        for (var i = 0; i < ruleskeys.length; i++) {
            var currentKey = ruleskeys[i];
            var styleLabel = fromUpperCaseToHyphen(currentKey);
            //if a pseudo class found, separate it
            if (isPseudo(styleLabel)) {
                var pseudoClassName = currentRule.className + styleLabel;
                nestedPseudos.push({ className: pseudoClassName, rules: currentRule.rules[styleLabel] });
            }
            else {
                var styleRule = currentRule.rules[currentKey];
                currnetRawRule += "\t" + styleLabel + " : " + styleRule + ";\n";
            }
        }
        currnetRawRule += "}\n";
        rawStyleSheet += currnetRawRule;
    }
    //nested pseudos
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
//# sourceMappingURL=index.js.map
