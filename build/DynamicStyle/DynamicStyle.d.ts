import * as CSS from 'csstype';
/**
 * Extend the CSS.Properties
 */
export declare type DynamicStyle = CSS.Properties<number | string> | {};
export declare type DynamicPseudos = CSS.Pseudos;
export declare type DynamicHyphens = CSS.PropertiesHyphen;
/**
 * Making cleaner types and interfaces
 */
export interface DynamicSheet {
    id: string;
    raw?: string;
    sheetRules?: DynamicSheetRule[];
}
/**
 * A complete rule
 *
 * e.g.
 *      "list-item": {
 *          border: "4px solid white",
 *          "border-radius": "4px",
 *      }
 */
export interface DynamicSheetRule {
    className: string;
    rules: DynamicStyle | DynamicPseudoNested | DynamicHyphens;
}
export declare type DynamicPseudoNested = {
    [t in DynamicPseudos]?: DynamicStyle | DynamicHyphens;
};
export declare const sheetExample: DynamicSheet;
