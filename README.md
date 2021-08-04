<p align="center">
 <img align="center" height="100" src="https://user-images.githubusercontent.com/43678736/127270540-76b8863f-f664-4274-ab5c-41135f23d7dd.png" alt="Unlimited React components logologo">
</p>

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JinSSJ3/react-drop-zone-responsive/blob/HEAD/LICENSE) ![npm latest package](https://img.shields.io/badge/npm%40LTS-1.1.x-cyan) [![npm latest package](https://img.shields.io/badge/npm%40latest-1.1.2-magenta)](https://www.npmjs.com/package/@unlimited-react-components/react-drop-zone) [![dependencies](https://david-dm.org/unlimited-react-components/react-drop-zone.svg)](https://david-dm.org/unlimited-react-components/react-drop-zone) [![tests](https://api.travis-ci.org/unlimited-react-components/react-drop-zone.svg?branch=master)](https://travis-ci.org/github/unlimited-react-components/react-drop-zone) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=mui-org/material-ui)](https://dependabot.com)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/unlimited-react-components/react-drop-zone.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/unlimited-react-components/react-drop-zone/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/unlimited-react-components/react-drop-zone.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/unlimited-react-components/react-drop-zone/context:javascript) [![Known Vulnerabilities](https://snyk.io/test/github/unlimited-react-components/react-drop-zone/badge.svg)](https://snyk.io/test/github/unlimited-react-components/react-drop-zone)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

## Description

With DinamiCSS you can manage CSS style sheets dynamically


## Installation

DinamiCSS is available as an [npm package](https://www.npmjs.com/package/dinamicss).

```sh
// with npm
npm i dynamicss
```

## Main Features:

- Insert style sheets from javascript files.
- Edit stylesheets at run-time.
- Remove style sheet.
## Usage (basic example)

Here is a quick example to get you started, **it's all you need**:
 
Interactive and live demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-drop-zone-demo1-o7izp)


In this example we are telling the drop zone:

## Dynamic Types:
| Name | Description | Attributes |
| - | - | - |
| `DynamicSheet` | Object that represents a css style sheet | `id`: string;   |
|  |  | `content?`: string; |
| | |`sheetRules?`: DynamicSheetRule[];|
| `DynamicSheetRule` | Object that represents a set of css rules for a classname |   `className`: string;|
| | | `rules`: DynamicStyle \| DynamicPseudoNested \| DynamicHyphens;|

## Functions:
## `function insertStyleSheet(dynamicSheet: DynamicSheet): string;`
- Allows to insert a new stylesheet, if already exists one with the given id, it wont do anything, just returns the id
## `function editStyleSheet(id: string, sheetRules: DynamicSheetRule[]): string;`

## `function removeStyleSheet(id: string): string;`


| Name | Description | Default |
| - | - | - |
| `insertStyleSheet()` | Object that contains the main styles for the component. | themeColor:#ff6c37, backgroundImage:"https://www.postman.com/assets/use-cases-by-role.svg" |



## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
