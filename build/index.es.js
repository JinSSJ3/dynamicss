function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

var DynamiCSS;
(function (DynamiCSS) {
    /**
     * Inserts a stylesheet into the DOM.
     * When an error occurs returns an empty string
     * @param dynamicSheet a dyncamic sheet
     * @return the id of the stylesheet in string format
     */
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
    /**
     *
     * @param id the id of he style sheet
     * @param sheetRules the set of rules
     * @returns an empty string or the id
     */
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
    /**
     * Given an id in string format, checks into the DOM whether there is a style
     * with the given id. If true, this function will remove the stylesheet and return the id.
     * If not present, will return an empty string
     * @param id the id of the stylesheet to remove if exists
     * @returns the id or an empty string
     */
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
    /**
     * Given an id in string format, checks into the DOM whether there is a style
     * with the given id exists and returna boolean result
     * @param id the id of the stylesheet to check if exists
     * @returns true if the stylesheet was found
     */
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
    /**
     * Creates a stylesheet given a stylesheet
     * @param styleSheet astylesheet
     * @returns the new stylesheet object
     */
    function makeStyleSheet(styleSheet) {
        if (!styleSheet) {
            return null;
        }
        return styleSheet;
    }
    DynamiCSS.makeStyleSheet = makeStyleSheet;
})(DynamiCSS || (DynamiCSS = {}));
/**
 * Determines whether a character is upperCase or not
 * @param character a character
 * @returns true if str contains a string character
 */
function isUpper(character) {
    if (!character)
        return false;
    return !/[a-z]/.test(character) && /[A-Z]/.test(character);
}
/**
 * Converts a rule with uppercase to a hyphen-lowercase version
 * @param ruleLabel the rule
 * @returns a hyphen-lowercase label
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
        result = "".concat(parts[0], "-").concat(charUpper.toLowerCase()).concat(parts[1]);
    }
    else {
        result = ruleLabel;
    }
    return result;
}
/**
 * Checks if the label contains the ":" character
 * @param ruleLabel the rule
 * @returns true if the rule label corresponds to a pseudo class
 */
function isPseudo(ruleLabel) {
    if (!ruleLabel)
        return false;
    return ruleLabel.includes(":");
}
/**
 *
 * @param className
 * @returns
 */
function makeRawRuleLabel(className) {
    var result = "";
    var splitedClassName = className.trim().split(" ");
    //is composed classname?
    if (splitedClassName.length > 1) {
        for (var i = 0; i < splitedClassName.length; i++) {
            result += ".".concat(splitedClassName[i]);
        }
        result += "{\n";
    }
    else {
        result += ".".concat(className, "{\n");
    }
    return result;
}
/**
 *
 * @param sheetRules
 * @returns
 */
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
                currnetRawRule += "\t".concat(styleLabel, " : ").concat(styleRule, ";\n");
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
        currnetRawRule += ".".concat(currentRule.className, "{\n");
        for (var i = 0; i < ruleskeys.length; i++) {
            var currentKey = ruleskeys[i];
            var styleLabel = fromUpperCaseToHyphen(currentKey);
            var styleRule = currentRule.rules[currentKey];
            currnetRawRule += "\t".concat(styleLabel, " : ").concat(styleRule, ";\n");
        }
        currnetRawRule += "}\n";
        rawStyleSheet += currnetRawRule;
    }
    return rawStyleSheet;
}

export { DynamiCSS };
//# sourceMappingURL=index.es.js.map
