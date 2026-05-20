"use client";

import { LocaleData, WeatherCode } from "../useLocaleData";
import { useEffect, useState } from "react";
import moment, { Moment } from "moment-timezone";
import WeatherIcon from "./WeatherIcon/weatherIcon";
import styles from "./localeDataDisplay.module.scss";
import Spinner from "@/app/shared/spinner/spinner";

interface LocaleDataDisplayProps {
  data?: LocaleData;
  isLoading: boolean;
  error: string | null;
}

export default function LocaleDataDisplay(props: LocaleDataDisplayProps) {
  const { data, isLoading, error } = props;

  const [currentTime, setCurrentTime] = useState<Moment | undefined>();

  useEffect(() => {
    if (!data) {
      return;
    }

    const interval = setInterval(() => {
      const localTime = moment().tz(data.timezone!);
      setCurrentTime(localTime);
    }, 100);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className={styles.localDataContainer}>
      {!currentTime ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.dataRow}>
            <span
              className={`dm-serif contrast ${styles.localeText} ${styles.bigTime}`}
            >
              {currentTime?.format("HH:mm")}
            </span>
            <span
              className={`dm-serif contrast ${styles.localeText} ${styles.smallTime}`}
            >
              {`.${currentTime?.format("ss")}`}
            </span>
          </div>
          <div className={`${styles.dataRow} ${styles.secondRow} contrast`}>
            <span className={`dm-serif ${styles.localeText}`}>
              {data?.city}
            </span>
            <WeatherIcon
              weatherCode={data?.weatherCode ?? WeatherCode.Unknown}
            />
            <span
              className={`dm-serif ${styles.localeText}`}
            >{`${data?.temperature}°c`}</span>
          </div>
        </>
      )}
    </div>
  );
}
