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

const { form_creator } = require("./func");

test("adds 1 + 2 to equal 3", () => {
  expect(
    form_creator(
      4,
      6,
      [
        {
          programId: "183836",
          time: "1578083400000",
          foodTypeId: "617",
          price: "17000",
          name:
            "2-2 | خوراک جوجه کباب + گوجه کبابی + خیارشور + کاهو + 2 عدد نان"
        },
        {
          programId: "183948",
          time: "1578083400000",
          foodTypeId: "598",
          price: "17000",
          name: "2 | چلو خورشت آلو اسفناج + ماست"
        },
        {
          programId: "183964",
          time: "1578169800000",
          foodTypeId: "598",
          price: "17000",
          name:
            "2 | کتلت گوشت + سیب زمینی سرخ شده + خیار شور + گوجه + کاهو + سس کچاپ + 2 عدد نان"
        },
        {
          programId: "183852",
          time: "1578169800000",
          foodTypeId: "599",
          price: "20000",
          name: "1 | زرشک پلو با مرغ ترش + رب انار تکنفره + ماست"
        },
        {
          programId: "183868",
          time: "1578256200000",
          foodTypeId: "618",
          price: "12000",
          name: "3-2 | ماکارونی + سس کچاپ + ماست"
        },
        {
          programId: "183932",
          time: "1578256200000",
          foodTypeId: "622",
          price: "12000",
          name:
            "3-2-2 | بسته میوه ( 3 عدد میوه مختلف فصل + یک بسته بیسکوییت ساقه طلایی )"
        },
        {
          programId: "183980",
          time: "1578256200000",
          foodTypeId: "597",
          price: "12000",
          name: "3 | استانبولی پلو + ماست"
        },
        {
          programId: "183900",
          time: "1578342600000",
          foodTypeId: "616",
          price: "20000",
          name: "1-2 | ته چین مرغ + سوپ"
        },
        {
          programId: "183996",
          time: "1578342600000",
          foodTypeId: "599",
          price: "20000",
          name: "1 | چلو کباب کوبیده + گوجه + لیمو یا نارنج + کره 10 گرمی"
        },
        {
          programId: "183916",
          time: "1578429000000",
          foodTypeId: "597",
          price: "12000",
          name: "3 | عدسی + پوره سیب زمینی + میوه + 2 عدد نان"
        },
        {
          programId: '"18388',
          time: '"157842900000',
          foodTypeId: '"59',
          price: "",
          name: " 2 | باقالی پلو با گوشت چرخ کرده + ماست"
        }
      ],
      {
        name: "9728103",
        pass: "3720840727",
        days: [true, true, true, true, true],
        priority: [
          "سبزی پلو با ماهی",
          "چلو خورشت کرفس",
          "باقالی پلو با مرغ",
          "خوراک کشک بادمجان",
          "دلمه فلفل یا دلمه بادمجان",
          "عدس پلو با گوشت چرخ کرده",
          "چلو کوکو سبزی",
          "کوکو سیب زمینی",
          "استانبولی",
          "کباب ترکی"
        ],
        self: "1"
      }
    )
  ).toBe("");
});
