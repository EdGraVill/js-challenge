import * as React from 'react';
import { useSelector } from 'react-redux';
import { format, Locale } from 'date-fns';
import * as locales from 'date-fns/locale';
import Chart from 'chart.js';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import { Entry, historySelector } from '../QuestionsEngine';
import { localeSelector } from '../store';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  width: 100%;
`;

const Canvas = styled.canvas`
  max-width: 800px;
  width: 90%;
`;

function renderChart(
  ctx: HTMLCanvasElement | CanvasRenderingContext2D,
  data: Entry[],
  locale: string,
  theme: DefaultTheme,
) {
  const displayData: Chart.ChartData = {
    datasets: [
      {
        data: data.map(({ results, sessionDetails }) => ({
          y: results.filter(({ right, selected }) => selected === right).length,
          x: new Date(sessionDetails.started),
        })),
        backgroundColor: `${theme.colors.optionRight}28`,
        borderColor: theme.colors.optionRight,
        pointBackgroundColor: theme.colors.optionRight,
      },
    ],
    labels: data.map(({ sessionDetails }) =>
      format(new Date(sessionDetails.started), 'Pp', { locale: (locales as { [locale: string]: Locale })[locale] }),
    ),
  };

  const chart = new Chart(ctx, {
    data: displayData,
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMax: 10,
              suggestedMin: 0,
            },
          },
        ],
      },
    },
    type: 'line',
  });

  return chart;
}

export default function HistoryChart() {
  const history = useSelector(historySelector);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const locale = useSelector(localeSelector);
  const theme = useTheme();

  React.useEffect(() => {
    if (canvasRef.current) {
      renderChart(
        canvasRef.current,
        history
          .reverse()
          .filter((_, ix) => ix < 10)
          .reverse(),
        locale
          .split('-')
          .map((_, ix) => (ix === 1 ? _.toUpperCase() : _))
          .join(''),
        theme,
      );
    }
  }, [canvasRef, history]);

  return (
    <Container>
      <Canvas ref={canvasRef} />
    </Container>
  );
}
