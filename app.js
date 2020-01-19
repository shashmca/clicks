const fs = require('fs');

// Defining some variables to keep intermediate processed data
let acceptedLimit = 10,
  tempObj = {},
  hash = {},
  outputArr = [],
  grouped = [];


// Read the data from the file
let data = fs.readFileSync('./assets/clicks.json', 'utf8');
if (data) {
  data = JSON.parse(data);
}

// Sort the data based on ip and amount
let sortedArr = data.sort((a, b) => {
  if (a.ip === b.ip) {
    return b.amount - a.amount;
  }
  return a.ip > b.ip ? 1 : -1;
})

// Eleminate the occurences if more than 10
sortedArr.forEach(function (element) {
  let name = element.ip;
  if (tempObj[name]) {
    tempObj[name].push(element);
  } else {
    tempObj[name] = [element];
  }
});

for (let key in tempObj) {
  if (tempObj[key].length <= acceptedLimit) {
    grouped = grouped.concat(tempObj[key])
  }
}

// Check if for same ip there are multiple clicks in an hour period
grouped.forEach(function (item) {
  let key = item.ip + '___' + (new Date(item.timestamp)).getHours();
  if (!hash[key]) {
    hash[key] = key;
    outputArr.push(item);
  }
});

// write down the output in file
fs.writeFile("resultset.json", JSON.stringify(outputArr), function (err) {
  if (err) {
    return console.log(err);
  }
});

// exported variables can be reused for testing 
module.exports = {
  data,
  tempObj,
  hash,
  grouped,
  outputArr
}