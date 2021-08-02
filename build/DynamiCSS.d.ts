import { DynamicSheet, DynamicSheetRule } from "./DynamicStyle/DynamicStyle";
export declare namespace DynamiCSS {
    function insertStyleSheet(dynamicSheet: DynamicSheet): string;
    function editStyleSheet(id: string, sheetRules: DynamicSheetRule[]): string;
    function removeStyleSheet(id: string): string;
}
