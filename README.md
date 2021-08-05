<p align="center">
 <img align="center" height="128" src="https://user-images.githubusercontent.com/43678736/127270540-76b8863f-f664-4274-ab5c-41135f23d7dd.png" alt="Unlimited React components logologo">
</p> 

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JinSSJ3/react-drop-zone-responsive/blob/HEAD/LICENSE) ![npm latest package](https://img.shields.io/badge/npm%40LTS-1.0.2-cyan) [![npm latest package](https://img.shields.io/badge/npm%40latest-1.0.3-magenta)](https://www.npmjs.com/package/@unlimited-react-components/react-drop-zone) [![dependencies Status](https://status.david-dm.org/gh/jinssj3/dynamicss.svg)](https://david-dm.org/jinssj3/dynamicss)
[![Build Status](https://www.travis-ci.com/JinSSJ3/dynamicss.svg?branch=master)](https://www.travis-ci.com/JinSSJ3/dynamicss) [![Coverage Status](https://coveralls.io/repos/github/JinSSJ3/dynamicss/badge.svg?branch=master&t=NYfAAW)](https://coveralls.io/github/JinSSJ3/dynamicss?branch=master) [![Total alerts](https://img.shields.io/lgtm/alerts/g/JinSSJ3/dynamicss.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/JinSSJ3/dynamicss/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/unlimited-react-components/react-drop-zone.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/unlimited-react-components/react-drop-zone/context:javascript) [![Known Vulnerabilities](https://snyk.io/test/github/unlimited-react-components/react-drop-zone/badge.svg)](https://snyk.io/test/github/unlimited-react-components/react-drop-zone) 
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
## Usage (basic example)

Here is a quick example to get you started, **it's all you need**:
 
Interactive and live demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/dynamicss-react-h5zie)

## Dynamic Types:
| Name | Description | Attributes |
| - | - | - |
| `DynamicSheet` | Object that represents a css style sheet | `id`: string;   |
|  |  | `content?`: string; |
| | |`sheetRules?`: DynamicSheetRule[];|
| `DynamicSheetRule` | Object that represents a set of css rules for a classname |   `className`: string;|
| | | `rules`: DynamicStyle \| DynamicPseudoNested \| DynamicHyphens;|

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
