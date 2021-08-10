import { DynamicSheet, DynamicSheetRule } from "./DynamicStyle/DynamicStyle";
export declare namespace DynamiCSS {
    function insertStyleSheet(dynamicSheet: DynamicSheet): string;
    function editStyleSheet(id: string, sheetRules: DynamicSheetRule[]): string;
    function removeStyleSheet(id: string): string;
    function existStyleSheet(id: string): boolean;
}
export declare function makeRawRuleLabel(className: string): string;
export declare function toRawStyleSheet(sheetRules: DynamicSheetRule[]): string;
