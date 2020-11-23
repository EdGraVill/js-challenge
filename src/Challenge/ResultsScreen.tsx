import * as React from 'react';
import { Congratulations, HistoryChart, Results, ResultsControls } from '../UI';

export default function ResultsScreen() {
  return (
    <>
      <Congratulations />
      <Results />
      <ResultsControls />
      <HistoryChart />
    </>
  );
}
