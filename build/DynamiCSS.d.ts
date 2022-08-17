import { DynamicSheet, DynamicSheetRule } from "./DynamicStyle/DynamicStyle";
export declare namespace DynamiCSS {
    /**
     * Inserts a stylesheet into the DOM.
     * When an error occurs returns an empty string
     * @param dynamicSheet a dyncamic sheet
     * @return the id of the stylesheet in string format
     */
    function insertStyleSheet(dynamicSheet: DynamicSheet): string;
    /**
     *
     * @param id the id of he style sheet
     * @param sheetRules the set of rules
     * @returns an empty string or the id
     */
    function editStyleSheet(id: string, sheetRules: DynamicSheetRule[]): string;
    /**
     * Given an id in string format, checks into the DOM whether there is a style
     * with the given id. If true, this function will remove the stylesheet and return the id.
     * If not present, will return an empty string
     * @param id the id of the stylesheet to remove if exists
     * @returns the id or an empty string
     */
    function removeStyleSheet(id: string): string;
    /**
     * Given an id in string format, checks into the DOM whether there is a style
     * with the given id exists and returna boolean result
     * @param id the id of the stylesheet to check if exists
     * @returns true if the stylesheet was found
     */
    function existStyleSheet(id: string): boolean;
    /**
     * Creates a stylesheet given a stylesheet
     * @param styleSheet astylesheet
     * @returns the new stylesheet object
     */
    function makeStyleSheet(styleSheet: DynamicSheet): DynamicSheet;
}
/**
 *
 * @param className
 * @returns
 */
export declare function makeRawRuleLabel(className: string): string;
/**
 *
 * @param sheetRules
 * @returns
 */
export declare function toRawStyleSheet(sheetRules: DynamicSheetRule[]): string;
