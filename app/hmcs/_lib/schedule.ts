// /hmcs/_lib/schedule.ts
const TIME_ZONE = "America/Hermosillo";

const SCHEDULE: Record<number, [number, number] | null> = {
    0: null,
    1: [8, 18],
    2: [8, 18],
    3: [8, 18],
    4: [8, 18],
    5: [8, 18],
    6: null,
};

const WEEKDAYS: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

function getLocalTime(date: Date) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: TIME_ZONE,
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
    }).formatToParts(date);

    const get = (type: string) => parts.find((p) => p.type === type)!.value;

    return {
        day: WEEKDAYS[get("weekday")],
        time: Number(get("hour")) + Number(get("minute")) / 60,
    };
}

export function isRestaurantOpen(now = new Date()): boolean {
    const { day, time } = getLocalTime(now);
    const hours = SCHEDULE[day];
    if (!hours) return false;
    const [open, close] = hours;
    return time >= open && time < close;
}