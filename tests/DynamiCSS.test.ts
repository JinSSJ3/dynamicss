import { screen } from '@testing-library/dom'
import "@testing-library/jest-dom";
import { DynamicSheetRule, DynamiCSS } from '../src'
import { makeRawRuleLabel, toRawStyleSheet } from '../src/DynamiCSS';

const notNullSheet1 = {
  id: "style-test-id",
  sheetRules: [
    {
      className: "style-test",
      rules: {
        backgroundColor: "teal"
      }
    }
  ]
};
const classNameSpaces = "material-button material-button-root using-dynamicss";
const notNullsheetRules: DynamicSheetRule[] = [{
  className: "style-test",
  rules: {
    backgroundColor: "salmon",
    ":hover": {
      cursor: "pointer"
    }
  },
}];

test('check jest-dom is working', () => {
  document.body.innerHTML = `
  <div data-testid="dynamic-style-background" class="style-test"> 
    <span data-testid="not-empty">
      <span data-testid="empty">
      </span>
    </span>
    <div data-testid="visible">
      Visible Example
    </div>
  </div>
  `
  expect(screen.queryByTestId('dynamic-style-background')).toBeInTheDocument();

});

test('return empty string when dynamicSheet is not sent', () => {
  const resultId = DynamiCSS.insertStyleSheet(null);
  expect(resultId).toEqual("");
});

describe('check insertStyleSheet function', () => {
  document.body.innerHTML = `
  <div data-testid="dynamic-style-background" class="style-test"> 
    <span data-testid="not-empty">
      <span data-testid="empty">
      </span>
    </span>
    <div data-testid="visible">
      Visible Example
    </div>
  </div>
   
  `;
  const resultId = DynamiCSS.insertStyleSheet(notNullSheet1);

  it("must return the given id in the object when success", () => {
    expect(resultId).toEqual("style-test-id");
  });
  it("backgroun color in the div must be \"teal\"", () => {
    expect(screen.queryByTestId('dynamic-style-background')).toHaveStyle("background-color:teal");

  });

});
/* test('return empty string when no document is loaded', () => {
  const result = DynamiCSS.insertStyleSheet(notNullSheet1);
  expect(result).toEqual("");
}); */



describe("check editStyleSheet function", () => {
  document.body.innerHTML = `
  <div data-testid="dynamic-style-background" class="style-test"> 
    <span data-testid="not-empty">
      <span data-testid="empty">
      </span> 
    </span>
    <div data-testid="visible">
      Visible Example
    </div>
  </div>
   
  `;
  const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);

  it("must return empty string if id is null", () => {
    const result = DynamiCSS.editStyleSheet(null, notNullsheetRules);
    expect(result).toEqual("");
  });
  it("must return empty string if sheetRules object is null", () => {
    const result = DynamiCSS.editStyleSheet(insertedId, null);

    expect(result).toEqual("");
  });
  it("must return empty string if id is not found", () => {
    const result = DynamiCSS.editStyleSheet("insertedId", notNullsheetRules);

    expect(result).toEqual("");
  });

  it("backgroun color in the div must be \"salmon\"", () => {
    DynamiCSS.editStyleSheet(insertedId, notNullsheetRules);
    expect(screen.queryByTestId('dynamic-style-background')).toHaveStyle("background-color : salmon");

  });
});

describe("check removeStyleSheet function", () => {


  it("must return the same id sent as parameter on sucess", () => {
    const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);
    const result = DynamiCSS.removeStyleSheet(insertedId);
    expect(result).toEqual(insertedId);
  });

  it("must return empty string if id is null", () => {
    const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);
    const result = DynamiCSS.removeStyleSheet(null);
    expect(result).toEqual("");
  });

});
describe("check removeStyleSheet function", () => {


  it("must return the same id sent as parameter on sucess", () => {
    const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);
    const result = DynamiCSS.removeStyleSheet(insertedId);
    expect(result).toEqual(insertedId);
  });

  it("must return empty string if id is null", () => {
    const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);
    const result = DynamiCSS.removeStyleSheet(null);
    expect(result).toEqual("");
  });

});


describe("check toRawStyleSheet function", () => {
  it("must return empty string if sheetRules object is null", () => {
    const result = toRawStyleSheet(null);
    expect(result).toEqual("");
  });
  it("must return an specific string representation for the rules", () => {
    const result = toRawStyleSheet(notNullsheetRules);
    const strsResponseRulesExpected = ".style-test{\n\tbackground-color : salmon;\n}\n.style-test:hover{\n\tcursor : pointer;\n}\n";

    expect(result).toEqual(strsResponseRulesExpected);
  });
});

describe("check existStyleSheet function", () => {

  it("must return false if id is null", () => {
    const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);
    const result = DynamiCSS.existStyleSheet(null);
    expect(result).toEqual(false);
  });
  it("must return false if the stylesheet is not on the DOM", () => {
    const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);
    const result = DynamiCSS.existStyleSheet("other id");
    expect(result).toEqual(false);
  });
  it("must return true if the stylesheet is on the DOM", () => {
    const insertedId = DynamiCSS.insertStyleSheet(notNullSheet1);
    const result = DynamiCSS.existStyleSheet(insertedId);
    expect(result).toEqual(true);
  });


});

describe("check makeStyleSheet function", () => {

  it("must return null if styleSheet is null", () => {
    const insertedsheet = DynamiCSS.makeStyleSheet(notNullSheet1);
    expect(insertedsheet).toEqual(notNullSheet1);
  });
  it("must return false if the stylesheet is not on the DOM", () => {
    const insertedsheet = DynamiCSS.makeStyleSheet(null);
    expect(insertedsheet).toEqual(null);
  });
});

describe("check makeRawRuleLabel function", () => {

  it("must return an specific string concatenated with '.' when label is separated by spaces", () => {
    const resultLabel = makeRawRuleLabel(classNameSpaces);
    const expectedLabel = ".material-button.material-button-root.using-dynamicss{\n";
    expect(resultLabel).toEqual(expectedLabel);
  });

});