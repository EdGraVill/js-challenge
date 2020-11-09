import { format } from 'date-fns';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionsActions, questionSelector, startTimeSelector } from '../QuestionsEngine';
import { localeSelector } from '../store';
import translations from '../translations';
import { capitalize } from '../util';

const timer = (startTimeString: string, endTimeString: string, locale: string) => {
  const startTime = new Date(startTimeString);
  const endTime = new Date(endTimeString);

  let distance = endTime.getTime() - startTime.getTime();
  distance = distance < 0 ? 0 : distance;

  if (distance >= 24 * 60 * 60 * 1000) {
    const word = distance >= 48 * 60 * 60 * 1000
      ? translations[locale].days
      : translations[locale].day;
    
    return format(distance, `D ${word}, HH:mm:ss`);
  } else if (distance >= 60 * 60 * 1000) {
    return format(distance, 'HH:mm:ss');
  }

  return format(distance, 'mm:ss');
}

const Controls: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector(localeSelector);
  const startTime = useSelector(startTimeSelector);
  const question = useSelector(questionSelector);
  const [time, setTime] = React.useState(
    question.result
      ? timer(question.result.started, question.result.finished, locale)
      : timer(startTime || new Date().toISOString(), new Date().toISOString(), locale),
  );

  React.useEffect(() => {
    if (startTime && !question.result) {
      setTime(timer(startTime, new Date().toUTCString(), locale));

      const interval = setInterval(() => {
        setTime(timer(startTime, new Date().toUTCString(), locale));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [startTime, locale, question]);

  React.useEffect(() => {
    if (question.result) {
      setTime(timer(question.result.started, question.result.finished, locale));
    }
  }, [question, locale]);

  const onPrev = React.useCallback(() => {
    dispatch(questionsActions.goPrevQuestion());
  }, [dispatch]);

  const onNext = React.useCallback(() => {
    dispatch(questionsActions.goNextQuestion());
  }, [dispatch]);
  
  return (
    <div>
      <button onClick={onPrev}>{capitalize(translations[locale].previous)}</button>
      <div>{time}</div>
      <button onClick={onNext}>{capitalize(translations[locale].next)}</button>
    </div>
  );
};

export default Controls;
