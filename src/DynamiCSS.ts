import { DynamicSheet, DynamicSheetRule } from "./DynamicStyle/DynamicStyle";

export namespace DynamiCSS {

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
        const contetRaw: string = toRawStyleSheet(dynamicSheet.sheetRules || []);
        console.log("DynamiCSS insertStyleSheet toRawStyleSheet =>contetRaw", contetRaw);
        styleSheet.textContent = contetRaw;
        try {
            document.head.appendChild(styleSheet);
        } catch (error: any) {
            return "";
        }
        return result_id;
    }
    export function editStyleSheet(id: string, sheetRules: DynamicSheetRule[]): string {
        let result_id = "";
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
        var styleSheet: HTMLStyleElement = document.createElement("style");
        styleSheet.id = result_id;
        styleSheet.setAttribute("type", "text/css");
        styleSheet.textContent = toRawStyleSheet(sheetRules);
        try {
            document.head.appendChild(styleSheet);
        } catch (error: any) {
            return "";
        }
        return result_id;
    }
    export function removeStyleSheet(id: string): string {
        let result_id = "";
        const htmlObject = document.getElementById(id);
        if (htmlObject) {
            document.head.removeChild(htmlObject);
        }

        return result_id;
    }
}

/**
 * Determines whether a character is upperCase or not
 * @param str a character
 * @returns true if str contains a string character
 */
function isUpper(character: string): boolean {
    if (!character) return false;
    return !/[a-z]/.test(character) && /[A-Z]/.test(character);
}
/**
 * Converts a rule with uppercase to a hyphen-lowercase version
 * @param rule the rule
 * @returns 
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
 * 
 * @param ruleLabel the rule
 * @returns true if the rule label corresponds to a pseudo class
 */
function isPseudo(ruleLabel: string): boolean {
    if (!ruleLabel) return false;
    return ruleLabel.includes(":");
}

function toRawStyleSheet(sheetRules: DynamicSheetRule[]): string {
    if (!sheetRules) {
        return "";
    }
    console.log("Dynamicss sheetRules", sheetRules);
    // const sheetRules: DynamicSheetRule[] = sheet.sheetRules;
    let rawStyleSheet: string = "";
    let nestedPseudos: DynamicSheetRule[] = [];

    for (let j = 0; j < sheetRules.length; j++) {

        const currentRule: DynamicSheetRule = sheetRules[j];
        console.log(`Dynamicss currentRule j=${j}`, currentRule);

        let currnetRawRule: string = "";
        currnetRawRule += `.${currentRule.className}{\n`;
        //list of labels for rules
        const ruleskeys: string[] = Object.keys(currentRule.rules);
        console.log(`Dynamicss ruleskeys j=${j}`, ruleskeys);

        for (let i = 0; i < ruleskeys.length; i++) {
            const currentKey = ruleskeys[i];
            console.log(`Dynamicss currentKey j=${j} i=${i}`, currentKey);

            const styleLabel: string = fromUpperCaseToHyphen(currentKey);
            //if a pseudo class found, separate it
            if (isPseudo(styleLabel)) {
                console.log(`Dynamicss isPseudo true j=${j} i=${i}`, styleLabel);

                const pseudoClassName: string = currentRule.className + styleLabel;
                nestedPseudos.push({ className: pseudoClassName, rules: (currentRule as any).rules[styleLabel] });
            } else {
                const styleRule: string = (currentRule.rules as any)[currentKey];
                console.log("Dynamicss currnetRawRule", currentRule.rules, currentKey, styleRule);
                currnetRawRule += `\t${styleLabel} : ${styleRule};\n`;
            }

        }
        currnetRawRule += `}\n`;

        rawStyleSheet += currnetRawRule;
    }
    //nested pseudos

    console.log(`Dynamicss nestedPseudos`, nestedPseudos);

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