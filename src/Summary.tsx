import * as React from 'react'
import { Chart } from 'chart.js';
import styled from 'styled-components';

const Container = styled.article`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  max-width: 800px;
`;

const ChartContainer = styled.div`
  margin: 2rem;
  max-width: 400px;
  width: 90%;
`;

const Text = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.1rem;
  line-height: 2rem;
  margin: 0 0 5rem;
  text-align: center;
  width: 90%;
`;

const Title = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
  margin: 0;
  max-width: 600px;
  padding: 0;
  text-align: center;
  width: 90%;
`;

interface SummaryProps {
  safeAnswers: Answer[];
}

const useChart = (): [React.FunctionComponentElement<any>, (right: number) => void, Chart] => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = React.useState<Chart | null>(null);

  React.useEffect(() => {
    if (canvasRef.current && chart === null) {
      setChart(new Chart(canvasRef.current.getContext('2d')!, {
        type: 'pie',
        data: {
          labels: ['Wrong', 'Right'],
          datasets: [{
            data: [10, 0],
            backgroundColor: [
              '#dedede',
              '#008272',
            ],
          }],
        },
        options: {
          responsive: true,
          legend: {
             display: false
          },
          tooltips: {
             enabled: false
          },
          hover: {
            mode: undefined,
          },
        },
      }));
    }
  }, [chart]);

  const updateData = React.useCallback((right: number) => {
    if (chart) {
      chart.data.datasets![0].data! = [10 - right, right];
      chart.update();
    }
  }, [chart]);

  const Canvas = <canvas ref={canvasRef} />;

  return [
    Canvas,
    updateData,
    chart || new Chart(document.createElement('canvas').getContext('2d')!, {}),
  ];
}

const Summary: React.FC<SummaryProps> = ({ safeAnswers }) => {
  const goods = safeAnswers.filter(([_1, _2, isRight]) => isRight).length;

  const [Canvas, updateData] = useChart();

  React.useEffect(() => {
    updateData(goods);
  });

  return (
    <Container>
      <Title>Your'e awesome!</Title>
      <ChartContainer>
        {Canvas}
      </ChartContainer>
      <Text>{goods}/10 - You can go to specific question and see the explanation</Text>
    </Container>
  );
};

export default Summary
