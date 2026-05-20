import React from "react";
import { WeatherCode } from "../../useLocaleData";
import {
  WiCloud,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSleet,
  WiSnow,
  WiSprinkle,
  WiThunderstorm,
} from "react-icons/wi";
import { GrStatusUnknown } from "react-icons/gr";
import styles from "./weatherIcon.module.scss";

interface WeatherIconProps {
  weatherCode: WeatherCode;
}

export default function WeatherIcon(props: WeatherIconProps) {
  const { weatherCode } = props;

  const getIcon = (code: string) => {
    switch (code) {
      case WeatherCode.Unknown:
        return <GrStatusUnknown size={24} className={styles.weatherIcon} />;
      case WeatherCode.Clear:
        return <WiDaySunny size={24} className={styles.weatherIcon} />;
      case WeatherCode.Cloudy:
        return <WiCloud size={24} className={styles.weatherIcon} />;
      case WeatherCode.Foggy:
        return <WiFog size={24} className={styles.weatherIcon} />;
      case WeatherCode.Drizzle:
        return <WiSprinkle size={24} className={styles.weatherIcon} />;
      case WeatherCode.Rain:
        return <WiRain size={24} className={styles.weatherIcon} />;
      case WeatherCode.FreezingRain:
        return <WiSleet size={24} className={styles.weatherIcon} />;
      case WeatherCode.Snow:
        return <WiSnow size={24} className={styles.weatherIcon} />;
      case WeatherCode.Thunderstorm:
        return <WiThunderstorm size={24} className={styles.weatherIcon} />;
    }
  };

  return getIcon(weatherCode);
}
