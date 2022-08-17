import { DynamicSheet, DynamicSheetRule } from "./DynamicStyle/DynamicStyle";

export namespace DynamiCSS {
    /**
     * Inserts a stylesheet into the DOM.
     * When an error occurs returns an empty string
     * @param dynamicSheet a dyncamic sheet
     * @return the id of the stylesheet in string format
     */
    export function insertStyleSheet(dynamicSheet: DynamicSheet): string {
        let result_id = "";
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
        var styleSheet: HTMLStyleElement = document.createElement("style");
        styleSheet.id = result_id;
        styleSheet.setAttribute("type", "text/css");
        const contetRaw: string = toRawStyleSheet(dynamicSheet.sheetRules || []) + dynamicSheet.raw || "";
        styleSheet.textContent = contetRaw;
        const appendResult: HTMLStyleElement = document.head.appendChild(styleSheet);
        if (!appendResult) {
            return "";
        }

        return result_id;
    }
    /**
     * 
     * @param id the id of he style sheet
     * @param sheetRules the set of rules
     * @returns an empty string or the id
     */
    export function editStyleSheet(id: string, sheetRules: DynamicSheetRule[]): string {
        let result_id = "";
        if (typeof window === "undefined") {
            return "";
        }
        if (!id || !sheetRules) {
            return "";
        }
        //if dont exists yet
        var styleSheet: HTMLElement =document.getElementById(id);
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
    /**
     * Given an id in string format, checks into the DOM whether there is a style
     * with the given id. If true, this function will remove the stylesheet and return the id.
     * If not present, will return an empty string
     * @param id the id of the stylesheet to remove if exists
     * @returns the id or an empty string
     */
    export function removeStyleSheet(id: string): string {
        let result_id = "";
        if (!id) {
            return "";
        }
        const htmlObject: HTMLElement = document.getElementById(id);
        if (htmlObject) {
            document.head.removeChild(htmlObject);
            result_id = id;
        }

        return result_id;
    }
    /**
     * Given an id in string format, checks into the DOM whether there is a style
     * with the given id exists and returna boolean result
     * @param id the id of the stylesheet to check if exists
     * @returns true if the stylesheet was found
     */
    export function existStyleSheet(id: string): boolean {
        if (!id) {
            return false;
        }
        const htmlObject: HTMLElement = document.getElementById(id);
        if (htmlObject) {
            return true;
        }
        return false;
    }
    /**
     * Creates a stylesheet given a stylesheet
     * @param styleSheet astylesheet
     * @returns the new stylesheet object
     */
    export function makeStyleSheet(styleSheet: DynamicSheet): DynamicSheet {
        if (!styleSheet) {
            return null;
        }
        return styleSheet;
    }
}

/**
 * Determines whether a character is upperCase or not
 * @param character a character
 * @returns true if str contains a string character
 */
function isUpper(character: string): boolean {
    if (!character) return false;
    return !/[a-z]/.test(character) && /[A-Z]/.test(character);
}
/**
 * Converts a rule with uppercase to a hyphen-lowercase version
 * @param ruleLabel the rule
 * @returns a hyphen-lowercase label
 */
function fromUpperCaseToHyphen(ruleLabel: string): string {
    let result = "";
    let charUpper = ' ';
    let isupper: boolean = false;
    for (let i = 0; i < ruleLabel.length; i++) {
        const currentChar = ruleLabel[i];
        if (isUpper(currentChar)) {
            charUpper = currentChar;
            isupper = true;
            break;
        }
    }
    //add hyphen
    if (isupper) {
        const parts: string[] = ruleLabel.split(charUpper);
        result = `${parts[0]}-${charUpper.toLowerCase()}${parts[1]}`;
    } else {
        result = ruleLabel;
    }
    return result;
}
/**
 * Checks if the label contains the ":" character
 * @param ruleLabel the rule
 * @returns true if the rule label corresponds to a pseudo class
 */
function isPseudo(ruleLabel: string): boolean {
    if (!ruleLabel) return false;
    return ruleLabel.includes(":");
}

/**
 * 
 * @param className 
 * @returns 
 */
export function makeRawRuleLabel(className: string): string {
    let result = "";
    const splitedClassName: string[] = className.trim().split(" ");
    //is composed classname?
    if (splitedClassName.length > 1) {
        for (let i = 0; i < splitedClassName.length; i++) {
            result += `.${splitedClassName[i]}`;
        }
        result += `{\n`;
    } else {
        result += `.${className}{\n`;
    }

    return result;
}
/**
 * 
 * @param sheetRules 
 * @returns 
 */
export function toRawStyleSheet(sheetRules: DynamicSheetRule[]): string {
    if (!sheetRules) {
        return "";
    }
    let rawStyleSheet: string = "";
    let nestedPseudos: DynamicSheetRule[] = [];

    for (let j = 0; j < sheetRules.length; j++) {

        const currentRule: DynamicSheetRule = sheetRules[j];

        let currnetRawRule: string = "";
        // currnetRawRule += `.${currentRule.className}{\n`;
        currnetRawRule += makeRawRuleLabel(currentRule.className);

        //list of labels for rules
        const ruleskeys: string[] = Object.keys(currentRule.rules);

        for (let i = 0; i < ruleskeys.length; i++) {
            const currentKey = ruleskeys[i];

            const styleLabel: string = fromUpperCaseToHyphen(currentKey);
            //if a pseudo class found, separate it
            if (isPseudo(styleLabel)) {

                const pseudoClassName: string = currentRule.className + styleLabel;
                nestedPseudos.push({ className: pseudoClassName, rules: (currentRule as any).rules[styleLabel] });
            } else {
                const styleRule: string = (currentRule.rules as any)[currentKey];
                currnetRawRule += `\t${styleLabel} : ${styleRule};\n`;
            }

        }
        currnetRawRule += `}\n`;

        rawStyleSheet += currnetRawRule;
    }
    //nested pseudos


    for (let p = 0; p < nestedPseudos.length; p++) {
        let currnetRawRule: string = "";
        const currentRule: DynamicSheetRule = nestedPseudos[p];
        const ruleskeys: string[] = Object.keys(currentRule.rules);
        currnetRawRule += `.${currentRule.className}{\n`;
        for (let i = 0; i < ruleskeys.length; i++) {
            const currentKey = ruleskeys[i];
            const styleLabel: string = fromUpperCaseToHyphen(currentKey);
            const styleRule: string = (currentRule.rules as any)[currentKey];
            currnetRawRule += `\t${styleLabel} : ${styleRule};\n`;
        }
        currnetRawRule += `}\n`;
        rawStyleSheet += currnetRawRule;
    }
    return rawStyleSheet;
}