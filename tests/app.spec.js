const fs = require('fs');
const app = require('../app.js')

describe('Testing the solution', () => {
  test('More than 10 clicks of same ip are excluded', () => {
    let tempObj = {};
    app.outputArr.forEach((element, index) => {
      let name = element.ip;
      if (tempObj[name]) {
        tempObj[name].push(element);
      } else {
        tempObj[name] = [element];
      }
    });
    for (let key in tempObj) {
      expect(tempObj[key].length).toBeLessThan(10)
    }
  });
})