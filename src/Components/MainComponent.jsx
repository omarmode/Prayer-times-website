import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayersCard from "./PrayersCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/ar";
moment.locale("ar");
function MainComponent() {
  const [nextPrayersIndex, setnextPrayersIndex] = useState(3);

  const [Timings, setTimings] = useState("");
  const [City, setCity] = useState({
    displayName: "القاهره",
    apiName: "Cairo",
  });
  const [RemainingTime, setRemainingTime] = useState("");
  const [today, settoday] = useState("");
  const [timer, settimer] = useState(10);
  const availableCity = [
    {
      displayName: "القاهره",
      apiName: "Cairo",
    },
    {
      displayName: "اسيوط",
      apiName: "Assiut",
    },
    {
      displayName: "اسوان",
      apiName: "Aswan",
    },
    {
      displayName: "الغردقه",
      apiName: "Hurghada",
    },
    {
      displayName: "الاسكنداريه",
      apiName: " Alexandria",
    },
  ];
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const getTiming = async () => {
    const data = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${City.apiName}`
    );
    // console.log("data", data.data.data.timings);
    setTimings(data.data.data.timings);
  };
  useEffect(() => {
    getTiming();
  }, [City]);
  useEffect(() => {
    let interval = setInterval(() => {
      settimedowncount();
    }, 1000);
    const t = moment();
    settoday(t.format("MMM Do YYYY |h:mm"));
    console.log("this year", t.format("Y"));

    return () => {
      clearInterval(interval);
    };
  }, [Timings]);
  const settimedowncount = () => {
    const momnetnow = moment();
    let PrayerIndex = 2;
    if (
      momnetnow.isAfter(moment(Timings["Fajr"], "hh:mm")) &&
      momnetnow.isBefore(moment(Timings["Dhuhr"], "hh:mm"))
    ) {
      PrayerIndex = 1;
    } else if (
      momnetnow.isAfter(moment(Timings["Dhuhr"], "hh:mm")) &&
      momnetnow.isBefore(moment(Timings["Asr"], "hh:mm"))
    ) {
      PrayerIndex = 2;
    } else if (
      momnetnow.isAfter(moment(Timings["Asr"], "hh:mm")) &&
      momnetnow.isBefore(moment(Timings["Sunset"], "hh:mm"))
    ) {
      PrayerIndex = 3;
    } else if (
      momnetnow.isAfter(moment(Timings["Sunset"], "hh:mm")) &&
      momnetnow.isBefore(moment(Timings["Isha"], "hh:mm"))
    ) {
      PrayerIndex = 4;
    } else {
      PrayerIndex = 0;
    }
    setnextPrayersIndex(PrayerIndex);
    //now we can count the setup the countdown timer by getting the prayer is time
    const NextPrayersObject = prayersArray[PrayerIndex];
    const NextPrayerTimeing = Timings[NextPrayersObject.key];
    let remainingTime = moment(NextPrayerTimeing, "hh:mm").diff(momnetnow);
    const nextprayerTimingmoment = moment(NextPrayerTimeing, "hh:mm");
    if (remainingTime < 0) {
      const MidnightDiff = moment("23:59:59", "hh:mm:ss").diff(momnetnow);
      const fajrTomidnightDiff = nextprayerTimingmoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      console.log("time fajr is", fajrTomidnightDiff);
      const totalDiff = MidnightDiff + fajrTomidnightDiff;
      remainingTime = totalDiff;
    }
    const durationTime = moment.duration(remainingTime);
    setRemainingTime(
      `${durationTime.minutes()}:${durationTime.seconds()}: ${durationTime.hours()} `
    );
    console.log(
      "time is",
      durationTime.hours(),
      durationTime.minutes(),
      durationTime.seconds()
    );
    // console.log(remainingTime);
  };
  const handleChange = (event) => {
    const cityObject = availableCity.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log("the new ctiy is", event.target.value);
    setCity(cityObject);
    getTiming();
  };

  return (
    <>
      {/**Top Row */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{City.displayName}</h1>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            {/* <h3>{timer}</h3> */}
            <h2>متبقي حتي صلاه {prayersArray[nextPrayersIndex].displayName}</h2>
            <h1>{RemainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      {/**Top Row */}
      <Divider style={{ borderColor: "white", opacity: ".03" }} />
      {/**prayers cards  */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        flexWrap={"wrap"}
        style={{ marginTop: "40px" }}
      >
        <PrayersCard
          name={"الفجر"}
          time={Timings.Fajr}
          image={
            "https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
          }
        />
        <PrayersCard
          name={"الضهر"}
          time={Timings.Dhuhr}
          image={
            "https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
          }
        />
        <PrayersCard
          name={"العصر"}
          time={Timings.Asr}
          image={
            "https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
          }
        />
        <PrayersCard
          name={"المغرب"}
          time={Timings.Maghrib}
          image={
            "https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
          }
        />
        <PrayersCard
          name="العشاء"
          time={Timings.Isha}
          image={
            "https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
          }
        />
      </Stack>
      {/**prayers cards  */}
      <Stack direction="row" justifyContent="center">
        <FormControl style={{ width: "20%", borderColor: "white" }}>
          <InputLabel id="demo-simple-select-label">المدينه</InputLabel>
          <Select
            style={{ borderColor: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleChange}
          >
            {availableCity.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default MainComponent;
