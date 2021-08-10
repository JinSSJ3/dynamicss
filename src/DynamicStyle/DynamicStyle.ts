import * as CSS from 'csstype';

/**
 * Extend the CSS.Properties
 */
export type DynamicStyle = CSS.Properties<number | string> | {};
export type DynamicPseudos = CSS.Pseudos;
export type DynamicHyphens = CSS.PropertiesHyphen;
/**
 * Making cleaner types and interfaces
 */
export interface DynamicSheet {
    //an id to identify the style sheet
    id: string;
    //raw content after parsing keys and adding "{", "}", ":" and ";"
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

export type DynamicPseudoNested = {
    /**
    * Type to allow nesting pseudo classes:
    * e.g.   ":hover", "::after", "::before", and so on
    * For each Pseudo => t => Rule
    */
    [t in DynamicPseudos]?: DynamicStyle | DynamicHyphens;
}

export const sheetExample: DynamicSheet = {
    id: "idForStyeSheet",
    sheetRules: [
        {
            className: "nav-bar-complete",
            rules: {
                border: "4px solid white",
                "border-radius": "4px",
                backgroundColor: "beige",
                ":hover": {
                    "background-color": "cornflowerblue",
                    borderRadius: "2px",
                },
            }
        }
    ]

}