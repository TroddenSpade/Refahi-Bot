const request = require("request");
const rq = require("request-promise-native");

const {
  __get_w33k_1nf0,
  __t0uchB0dy,
  __get_cr3d1t,
  __get_start_w33k,
  __get_start_Ajx,
  __get_c$rf,
  __getJ_S3$$ion,
  __getP
} = require("./get");

var conf1g = require("./config/config");

function d0_de_math(data, user, credit) {
  let params = "";
  let m, k;
  for (let i = 0; i < data.length; i += 2) {
    let day = "";
    if (user.days[i / 2]) {
      if (
        __getP(data[i].name, user.priority) >=
        __getP(data[i + 1].name, user.priority)
      ) {
        m = i;
        k = i + 1;
        credit -= parseInt(data[i].price);
      } else {
        m = i + 1;
        k = i;
        credit -= parseInt(data[i + 1].price);
      }
      day =
        `userWeekReserves%5B${m}%5D.selected=true&` +
        `userWeekReserves%5B${m}%5D.programId=${data[m].programId}&` +
        `userWeekReserves%5B${m}%5D.mealTypeId=2&` +
        `userWeekReserves%5B${m}%5D.programDateTime=${data[m].time}&` +
        `userWeekReserves%5B${m}%5D.selfId=${user.self}&` +
        `userWeekReserves%5B${m}%5D.foodTypeId=${data[m].foodTypeId}&` +
        `userWeekReserves%5B${m}%5D.selectedCount=1&` +
        `userWeekReserves%5B${k}%5D.programId=${data[k].programId}&` +
        `userWeekReserves%5B${k}%5D.mealTypeId=2&` +
        `userWeekReserves%5B${k}%5D.programDateTime=${data[k].time}&` +
        `userWeekReserves%5B${k}%5D.selfId=${user.self}&` +
        `userWeekReserves%5B${k}%5D.foodTypeId=${data[k].foodTypeId}&`;
    } else {
      day =
        `userWeekReserves%5B${i}%5D.selected=false&` +
        `userWeekReserves%5B${i}%5D.selectedCount=0&` +
        `userWeekReserves%5B${i}%5D.programId=${data[i].programId}&` +
        `userWeekReserves%5B${i}%5D.mealTypeId=2&` +
        `userWeekReserves%5B${i}%5D.programDateTime=${data[i].time}&` +
        `userWeekReserves%5B${i}%5D.selfId=${user.self}&` +
        `userWeekReserves%5B${i}%5D.foodTypeId=${data[i].foodTypeId}&` +
        `userWeekReserves%5B${i + 1}%5D.selected=false&` +
        `userWeekReserves%5B${i + 1}%5D.selectedCount=0&` +
        `userWeekReserves%5B${i + 1}%5D.programId=${data[i + 1].programId}&` +
        `userWeekReserves%5B${i + 1}%5D.mealTypeId=2&` +
        `userWeekReserves%5B${i + 1}%5D.programDateTime=${data[i + 1].time}&` +
        `userWeekReserves%5B${i + 1}%5D.selfId=${user.self}&` +
        `userWeekReserves%5B${i + 1}%5D.foodTypeId=${data[i + 1].foodTypeId}&`;
    }

    params = params + day;
  }
  return {
    params,
    credit
  };
}

async function post_r3s3rv3(data, user) {
  let res = d0_de_math(data.data, user, parseInt(data.credit));
  let url =
    conf1g.url.r3s3rv3r0s3 +
    `?weekStartDateTime=${data.weekStartDateTime}&remainCredit=${res.credit}&method%3AdoReserve=Submit&selfChangeReserveId=&weekStartDateTimeAjx=${data.weekStartDateTimeAjx}&selectedSelfDefId=${user.self}&` +
    res.params +
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
    // __t0uchB0dy(body);
    return { body, credit: res.credit };
  });
}

async function post_n3xtw33k(data, self) {
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
      selectedSelfDefId: self,
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

// function post_lastw33k(data){
//   var options = {
//     method: "POST",
//     url: conf1g.url.r3s3rv3r0s3,
//     headers: {
//       "cache-control": "no-cache",
//       Cookie: data.J_S3$$ion,
//       "Accept-Encoding": "gzip, deflate",
//       "Cache-Control": "no-cache",
//       Accept: "*/*",
//       "User-Agent": "__hahaholo__",
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     form: {
//       weekStartDateTime: data.weekStartDateTime,
//       "method:showNextWeek": "Submit",
//       selfChangeReserveId: "",
//       weekStartDateTimeAjx: data.weekStartDateTimeAjx,
//       selectedSelfDefId: "1",
//       _csrf: data._csrf
//     }
//   };

//   return await rq(options).then(body => {
//     return {
//       weekStartDateTime: __get_start_w33k(body),
//       weekStartDateTimeAjx: __get_start_Ajx(body),
//       _csrf: __get_c$rf(body),
//       J_S3$$ion: data.J_S3$$ion,
//       credit: __get_cr3d1t(body),
//       data: __get_w33k_1nf0(body)
//     };
//   });
// }

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

async function post_Js3c(data, user, cb) {
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
  let w33k_info = await post_n3xtw33k(cur_w33k_time, user.self);
  let r3sp0ns3 = await post_r3s3rv3(w33k_info, user);

  if (r3sp0ns3.body.indexOf("successMessages") > 0)
    return {
      msg: "Successfully done"
    };
  else if (r3sp0ns3.body.indexOf("errorMessages") > 0) {
    let err = r3sp0ns3.body.indexOf("errorMessages") + 128;
    let i = 0;
    while (r3sp0ns3.body.charAt(err + i) != "<") {
      i++;
    }
    return {
      msg: r3sp0ns3.body.substring(err, err + i)
    };
  }
  return {
    err: "unknown Error !"
  };
};
