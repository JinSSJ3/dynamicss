<p align="center">
 <img align="center" height="128" src="https://user-images.githubusercontent.com/43678736/127270540-76b8863f-f664-4274-ab5c-41135f23d7dd.png" alt="Unlimited React components logologo">
</p>

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JinSSJ3/react-drop-zone-responsive/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@dynamicss/dynamicss.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)](https://www.npmjs.com/package/@dynamicss/dynamicss)
[![install size](https://packagephobia.com/badge?p=@dynamicss/dynamicss)](https://packagephobia.com/result?p=@dynamicss/dynamicss)
[![Build Status](https://www.travis-ci.com/JinSSJ3/dynamicss.svg?branch=master)](https://www.travis-ci.com/JinSSJ3/dynamicss)
[![Coverage Status](https://coveralls.io/repos/github/JinSSJ3/dynamicss/badge.svg?branch=master&t=NYfAAW)](https://coveralls.io/github/JinSSJ3/dynamicss?branch=master)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/JinSSJ3/dynamicss.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JinSSJ3/dynamicss/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/unlimited-react-components/react-drop-zone.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/unlimited-react-components/react-drop-zone/context:javascript)
[![Known Vulnerabilities](https://snyk.io/test/github/jinSSJ3/dynamicss/badge.svg)](https://snyk.io/test/github/jinssj3/dynamicss)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Description

With DinamiCSS you can manage CSS style sheets dynamically

## Installation

DinamiCSS is available as an [npm package](https://www.npmjs.com/package/dinamicss).

```sh
// with npm
npm i @dynamicss/dynamicss
```

## Main Features:

- Insert style sheets from javascript files.
- Edit stylesheets at run-time.
- Remove style sheet.
- Check whether a style sheet has already been inserted into the DOM
- Create a DynamicSheet object rpresentation

## Usage (basic example)

Here is a quick example to get you started, **it's all you need**:

Interactive and live demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dynamicss-react-h5zie)

## DynamiCSS Types:

| Name               | Description                                               | Attributes                                                      |
| ------------------ | --------------------------------------------------------- | --------------------------------------------------------------- |
| `DynamicSheet`     | Object that represents a css style sheet                  | `id`: string;                                                   |
|                    |                                                           | `content?`: string;                                             |
|                    |                                                           | `sheetRules?`: DynamicSheetRule[];                              |
| `DynamicSheetRule` | Object that represents a set of css rules for a classname | `className`: string;                                            |
|                    |                                                           | `rules`: DynamicStyle \| DynamicPseudoNested \| DynamicHyphens; |

## DynamiCSS namespace Functions:

| Function                                                                      | Description                                                                    |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `function insertStyleSheet(dynamicSheet: DynamicSheet): string`               | Inserts the stylesheet into the DOM                                            |
| `function editStyleSheet(id: string, sheetRules: DynamicSheetRule[]): string` | Edits an existing stylesheet in the DOM                                        |
| `function removeStyleSheet(id: string): string`                               | Removes an existing stylesheet in the DOM                                      |
| `function existStyleSheet(id: string): boolean`                               | Returns true if a match is found with the given id                             |
| `function makeStyleSheet(styleSheet: DynamicSheet): DynamicSheet`             | Returns the same DynamicSheet object (probably useless, but helps in JS) |

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
