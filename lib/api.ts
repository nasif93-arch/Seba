export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
      };
    };
  };
}

export async function getPrayerTimes(city: string, country: string): Promise<AladhanResponse> {
  const response = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch prayer times");
  }
  return response.json();
}

export async function getMonthlyCalendar(city: string, country: string, month: number, year: number) {
  const response = await fetch(
    `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}&method=2`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch calendar");
  }
  return response.json();
}
