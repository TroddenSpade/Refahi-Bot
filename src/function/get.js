const fs = require("fs");

function __getJ_S3$$ion(r3s) {
  if (r3s.headers["set-cookie"] === undefined) {
    return null;
  }
  return r3s.headers["set-cookie"][0].substring(0, 43);
}

function __get_c$rf(b0dy) {
  let start = b0dy.search("'X-CSRF-TOKEN' : '") + 18;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === "'") break;
  }
  return b0dy.substring(start, i);
}

function __get_start_Ajx(b0dy) {
  let start = b0dy.search('name="weekStartDateTimeAjx" value="') + 35;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === '"') break;
  }
  return b0dy.substring(start, i);
}

function __get_start_w33k(b0dy) {
  let start = b0dy.search('name="weekStartDateTime" value="') + 32;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === '"') break;
  }
  return b0dy.substring(start, i);
}

function __get_cr3d1t(b0dy) {
  let start = b0dy.search('name="remainCredit" value="') + 27;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === '"') break;
  }
  return b0dy.substring(start, i);
}

function __t0uchB0dy(b0dy) {
  fs.writeFile("./index.html", b0dy, function(err) {
    if (err) {
      return console.log(err);
    }

    // console.log("b0dy t0ch3d !");
  });
}

function __get_pr1ce(b0dy, index) {
  let start =
    b0dy.search(`this, 'userWeekReserves.selectedCount${index}', '`) +
    42 +
    index / 10;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === "'") break;
  }
  return b0dy.substring(start, i);
}

function __get_data(b0dy, index) {
  let time = b0dy.indexOf(`userWeekReserves[${index}].programDateTime"`);
  let proID = b0dy.indexOf(`userWeekReserves[${index}].programId"`);
  let type = b0dy.indexOf(`userWeekReserves[${index}].foodTypeId"`);
  let price = b0dy.indexOf(`this, 'userWeekReserves.selectedCount${index}', '`);
  let time_last = 38;
  let proID_last = 32;
  let type_last = 33;
  let price_last = 43;
  while (b0dy.charAt(time + time_last) != '"') time_last++;
  while (b0dy.charAt(proID + proID_last) != '"') proID_last++;
  while (b0dy.charAt(type + type_last) != '"') type_last++;
  while (b0dy.charAt(price + price_last) != '"') price_last++;

  return {
    programId: b0dy.substring(proID + proID_last + 1, proID + proID_last + 7),
    time: b0dy.substring(time + time_last + 1, time + time_last + 14),
    foodTypeId: b0dy.substring(type + type_last + 1, type + type_last + 4),
    price: __get_pr1ce(b0dy, index),
    name: __get_F00d_nam3(b0dy, index)
  };
}

function __get_w33k_1nf0(b0dy) {
  let i = 0;
  let arr = [];
  while (b0dy.includes(`id="hiddenSelectedCount${i}"`)) {
    arr.push(__get_data(b0dy, i));
    i++;
  }

  return arr;
}

function __get_F00d_nam3(b0dy, index) {
  let start = b0dy.indexOf(`xstooltip_hide('foodPriceTooltip${index}');`) + 136;
  let i;
  for (i = start; ; i++) {
    if (b0dy.charAt(i) === "\r") break;
  }
  return b0dy.substring(start, i);
}

function __getP(name, priority) {
  for (let i = 0; i < priority.length; i++) {
    if (name.includes(priority[i])) {
      return i;
    }
  }
  return 100;
}

module.exports = {
  __get_w33k_1nf0,
  __get_data,
  __get_pr1ce,
  __t0uchB0dy,
  __get_start_w33k,
  __get_start_Ajx,
  __get_c$rf,
  __getJ_S3$$ion,
  __get_cr3d1t,
  __getP
};
