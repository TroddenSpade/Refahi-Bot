const fs = require("fs");

function __getJ_S3$$ion(r3s) {
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
    b0dy.search(`this, 'userWeekReserves.selectedCount${index}', '`) + 42;
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
  return {
    programId: b0dy.substring(proID + 134, proID + 140),
    time: b0dy.substring(time + 140, time + 153),
    foodTypeId: b0dy.substring(type + 135, type + 138),
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
  return 30;
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
