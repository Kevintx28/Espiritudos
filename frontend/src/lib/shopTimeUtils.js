import { useEffect, useState } from 'react';

const LIMA_TIME_ZONE = 'America/Lima';
const RESET_HOUR = 19;

function getLimaParts(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: LIMA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date).reduce((result, part) => {
    if (part.type !== 'literal') result[part.type] = Number(part.value);
    return result;
  }, {});
  return parts;
}

function limaLocalToDate(parts) {
  const guess = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  const offsetParts = getLimaParts(new Date(guess));
  const localAsUtc = Date.UTC(offsetParts.year, offsetParts.month - 1, offsetParts.day, offsetParts.hour, offsetParts.minute, offsetParts.second);
  const offsetMinutes = (localAsUtc - guess) / 60000;
  return new Date(guess - offsetMinutes * 60000);
}

export function getNextFortniteShopReset(now = new Date()) {
  const lima = getLimaParts(now);
  const reset = { ...lima, hour: RESET_HOUR, minute: 0, second: 0 };
  const resetDate = limaLocalToDate(reset);
  if (resetDate.getTime() <= now.getTime()) {
    const tomorrow = new Date(Date.UTC(lima.year, lima.month - 1, lima.day + 1));
    const tomorrowParts = getLimaParts(tomorrow);
    return limaLocalToDate({ ...tomorrowParts, hour: RESET_HOUR, minute: 0, second: 0 });
  }
  return resetDate;
}

export function getTimeRemaining(target, now = new Date()) {
  const milliseconds = Math.max(0, new Date(target).getTime() - new Date(now).getTime());
  const totalSeconds = Math.floor(milliseconds / 1000);
  return {
    milliseconds,
    totalSeconds,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

export function formatCountdown(remaining, includeDays = false) {
  const pad = (value) => String(value).padStart(2, '0');
  if (includeDays) return `${remaining.days}d ${pad(remaining.hours)}h ${pad(remaining.minutes)}m`;
  return `${pad(remaining.hours)} : ${pad(remaining.minutes)} : ${pad(remaining.seconds)}`;
}

export function formatCompactCountdown(remaining) {
  if (!remaining) return '';
  if (remaining.days > 0) return `${remaining.days}d ${remaining.hours}h`;
  if (remaining.hours > 0) return `${remaining.hours}h ${remaining.minutes}m`;
  return `${remaining.minutes}m`;
}

export function formatLimaDate(date) {
  return new Intl.DateTimeFormat('es-PE', {
    timeZone: LIMA_TIME_ZONE,
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date(date));
}

export function getFortniteItemCountdown(item, now = new Date(), nextReset = getNextFortniteShopReset(now)) {
  const individualEnd = item?.endDate || item?.availableUntil || item?.shopEndDate || item?.outDate;
  const endDate = individualEnd ? new Date(individualEnd) : null;
  if (endDate && !Number.isNaN(endDate.getTime()) && endDate.getTime() > new Date(now).getTime()) {
    return { hasIndividualEnd: true, endDate, remaining: getTimeRemaining(endDate, now) };
  }
  return { hasIndividualEnd: false, endDate: null, remaining: getTimeRemaining(nextReset, now) };
}

export function useFortniteShopClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);
  const nextReset = getNextFortniteShopReset(now);
  const remaining = getTimeRemaining(nextReset, now);
  return { now, nextReset, remaining, justReset: remaining.totalSeconds === 0 };
}

export { LIMA_TIME_ZONE };
