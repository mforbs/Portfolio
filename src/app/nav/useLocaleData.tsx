import moment from "moment-timezone";
import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect } from "react";

const locale_config = {
  lat: 51.5085,
  lon: -0.1257,
  city: "London",
};

export interface LocaleData {
  temperature: number;
  weatherCode: WeatherCode;
  timezone?: string;
  city: string;
}

export enum WeatherCode {
  Unknown = "Unknown",
  Clear = "Clear",
  Cloudy = "Cloudy",
  Foggy = "Foggy",
  Drizzle = "Drizzle",
  Rain = "Rain",
  FreezingRain = "FreezingRain",
  Snow = "Snow",
  Thunderstorm = "Thunderstorm",
}

export const mapWmoCodeToWeatherCode = (wmoCode: number): WeatherCode => {
  if ([0, 1, 2].includes(wmoCode)) return WeatherCode.Clear;
  if ([3].includes(wmoCode)) return WeatherCode.Cloudy;
  if ([45, 48].includes(wmoCode)) return WeatherCode.Foggy;
  if ([51, 53, 55, 56, 57].includes(wmoCode)) return WeatherCode.Drizzle;
  if ([61, 63, 65, 80, 81, 82].includes(wmoCode)) return WeatherCode.Rain;
  if ([66, 67, 68].includes(wmoCode)) return WeatherCode.FreezingRain;
  if ([71, 73, 75, 77, 78, 84, 85, 86, 87].includes(wmoCode))
    return WeatherCode.Snow;
  if ([95, 96, 99].includes(wmoCode)) return WeatherCode.Thunderstorm;

  return WeatherCode.Unknown;
};

const url = "https://api.open-meteo.com/v1/forecast";

const params = {
  latitude: locale_config.lat,
  longitude: locale_config.lon,
  hourly: ["temperature_2m", "weather_code"],
  timezone: "auto",
  forecast_days: 1,
};

const useLocaleData = () => {
  const [localeData, setLocaleData] = useState<LocaleData | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchlocaleData = async () => {
      try {
        setIsLoading(true);
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        if (!response) {
          throw new Error("No response from weather API");
        }

        const hourly = response.hourly()!;
        const timezone = response.timezone();

        const localDate = moment().tz(timezone!);
        var hours = localDate.hours();

        const localeData = {
          temperature: Math.round(hourly.variables(0)?.values(hours)!),
          weatherCode: mapWmoCodeToWeatherCode(
            hourly.variables(1)!.values(hours)!,
          ),
          timezone,
          city: locale_config.city,
        } as LocaleData;

        setLocaleData(localeData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchlocaleData();
  }, []);

  return { localeData, isLoading, error };
};

export default useLocaleData;
