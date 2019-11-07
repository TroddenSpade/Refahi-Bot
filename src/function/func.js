const rq = require("request-promise");

const {
  __get_w33k_1nf0,
  __calc_cr3d1t,
  __t0uchB0dy,
  __get_cr3d1t,
  __get_start_w33k,
  __get_start_Ajx,
  __get_c$rf,
  __getJ_S3$$ion
} = require("./get");

var conf1g = require("./config/config");

function g3n_params(data) {
  let params = "";
  for (let i = 0; i < data.length; i += 2) {
    let first =
      `userWeekReserves%5B${i}%5D.selected=true&` +
      `userWeekReserves%5B${i}%5D.programId=${data[i].programId}&` +
      `userWeekReserves%5B${i}%5D.mealTypeId=2&` +
      `userWeekReserves%5B${i}%5D.programDateTime=${data[i].time}&` +
      `userWeekReserves%5B${i}%5D.selfId=1&` +
      `userWeekReserves%5B${i}%5D.foodTypeId=${data[i].foodTypeId}&` +
      `userWeekReserves%5B${i}%5D.selectedCount=1&`;
    let last =
      `userWeekReserves%5B${i + 1}%5D.programId=${data[i + 1].programId}&` +
      `userWeekReserves%5B${i + 1}%5D.mealTypeId=2&` +
      `userWeekReserves%5B${i + 1}%5D.programDateTime=${data[i + 1].time}&` +
      `userWeekReserves%5B${i + 1}%5D.selfId=1&` +
      `userWeekReserves%5B${i + 1}%5D.foodTypeId=${data[i + 1].foodTypeId}&`;

    params = params + first + last;
  }

  return params;
}

async function post_r3s3rv3(data) {
  let url =
    conf1g.url.r3s3rv3r0s3 +
    `?weekStartDateTime=${data.weekStartDateTime}&remainCredit=${__calc_cr3d1t(
      data
    )}&method%3AdoReserve=Submit&selfChangeReserveId=&weekStartDateTimeAjx=${
      data.weekStartDateTimeAjx
    }&selectedSelfDefId=1&` +
    g3n_params(data.data) +
    `_csrf=${data._csrf}`;

  var options = {
    method: "GET",
    url: url,
    headers: {
      "cache-control": "no-cache",
      Cookie: data.J_S3$$ion,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return await rq(options).then(body => {
    return body;
  });
}

async function post_n3xtw33k(data) {
  var options = {
    method: "POST",
    url: conf1g.url.r3s3rv3r0s3,
    headers: {
      "cache-control": "no-cache",
      Cookie: data.J_S3$$ion,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      weekStartDateTime: data.weekStartDateTime,
      "method:showNextWeek": "Submit",
      selfChangeReserveId: "",
      weekStartDateTimeAjx: data.weekStartDateTimeAjx,
      selectedSelfDefId: "1",
      _csrf: data._csrf
    }
  };

  return await rq(options).then(body => {
    return {
      weekStartDateTime: __get_start_w33k(body),
      weekStartDateTimeAjx: __get_start_Ajx(body),
      _csrf: __get_c$rf(body),
      J_S3$$ion: data.J_S3$$ion,
      credit: __get_cr3d1t(body),
      data: __get_w33k_1nf0(body)
    };
  });
}

async function get_pan3lR0S3(J_S3$$ion) {
  var options = {
    method: "GET",
    url: conf1g.url.pan3l_r0s3,
    headers: {
      "cache-control": "no-cache",
      Cookie: J_S3$$ion,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return await rq(options).then(body => {
    return {
      weekStartDateTime: __get_start_w33k(body),
      weekStartDateTimeAjx: __get_start_Ajx(body),
      _csrf: __get_c$rf(body),
      J_S3$$ion: J_S3$$ion
    };
  });
}

// function get_R0S3__(data) {
//   var options = {
//     method: "GET",
//     url: conf1g.url.r0s3_level_1,
//     headers: {
//       "cache-control": "no-cache",
//       Cookie: data,
//       "Accept-Encoding": "gzip, deflate",
//       "Cache-Control": "no-cache",
//       Accept: "*/*",
//       "User-Agent": "__hahaholo__",
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//   };

//   request(options, function(error, response, body) {
//     if (error) return { error: error };
//   });
// }

async function post_Js3c(data, user) {
  var options = {
    method: "POST",
    url: conf1g.url.j_sec,
    headers: {
      "cache-control": "no-cache",
      Cookie: data.J_S3$$ion,
      "Accept-Encoding": "gzip, deflate",
      "Cache-Control": "no-cache",
      Accept: "*/*",
      "User-Agent": "__hahaholo__",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      username: user.name,
      password: user.pass,
      _csrf: data.c$rf,
      login: "%D9%88%D8%B1%D9%88%D8%AF"
    },
    resolveWithFullResponse: true,
    simple: false
  };

  return await rq(options).then(response => {
    return __getJ_S3$$ion(response);
  });
}

async function get_1n1t1al_JS3$_c$rf() {
  var options = {
    method: "GET",
    url: conf1g.url.r0s3_level_1,
    headers: {
      "User-Agent": "__hahaholo__"
    },
    resolveWithFullResponse: true
  };

  return await rq(options).then(response => {
    return {
      J_S3$$ion: __getJ_S3$$ion(response),
      c$rf: __get_c$rf(response.body)
    };
  });
}

module.exports.d0_da_g3t = async function(user) {
  let J$_C$ = await get_1n1t1al_JS3$_c$rf();
  let J_S3$$ion = await post_Js3c(J$_C$, user);
  let cur_w33k_time = await get_pan3lR0S3(J_S3$$ion);
  let w33k_info = await post_n3xtw33k(cur_w33k_time);
  let r3sp0ns3 = await post_r3s3rv3(w33k_info);

  if (r3sp0ns3.search("successMessages") > 0) return "Successfully done";

  return "an Error has Occurred !";
};
