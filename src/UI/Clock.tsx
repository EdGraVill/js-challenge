import { format } from 'date-fns';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { localeSelector } from '../store';
import translations from '../translations';

const Time = styled.div`
  font-family: 'Display';
  font-size: 1.5rem;
  font-weight: 100;
  margin: 0 3rem;
  letter-spacing: 0.1rem;
`;

const timer = (locale: string, startTimeString: string, endTimeString?: string) => {
  const startTime = new Date(startTimeString);
  const endTime = endTimeString ? new Date(endTimeString) : new Date();

  let distance = endTime.getTime() - startTime.getTime();
  distance = distance < 0 ? 0 : distance;

  if (distance >= 24 * 60 * 60 * 1000) {
    const word = distance >= 48 * 60 * 60 * 1000 ? translations[locale].days : translations[locale].day;

    return format(distance, `D ${word}, HH:mm:ss`);
  } else if (distance >= 60 * 60 * 1000) {
    return format(distance, 'HH:mm:ss');
  }

  return format(distance, 'mm:ss');
};

interface Props {
  endTime?: string;
  startTime: string;
}

export default function Clock({ startTime, endTime }: Props) {
  const locale = useSelector(localeSelector);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [time, setTime] = React.useState(endTime ? timer(locale, startTime, endTime) : timer(locale, startTime!));

  React.useEffect(() => {
    let interval: number | undefined;

    if (!endTime) {
      interval = setInterval(() => {
        setTime(timer(locale, startTime, new Date().toISOString()));
      }, 1000);
    } else {
      setTime(timer(locale, startTime, endTime));

      if (interval) {
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [endTime, locale, startTime]);

  return <Time>{time}</Time>;
}
