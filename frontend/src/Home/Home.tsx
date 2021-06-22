import { FC, useState } from 'react';
import { Button, Typography, Flexbox, TextField } from '@hiiretail/synergy-ui';
import axios from 'axios';
import * as Sentry from "@sentry/react";

const api = axios.create({
  baseURL: '/api',
  headers: {
    'sentry-trace': Sentry.getCurrentHub()?.getScope()?.getSpan()?.toTraceparent(),
  }
});

export const getLotteryResult = async (guess: string): Promise<string> => {
  const request = await api.get('/lottery', {
    params: { guess }
  });
  return request.data.response;
};

export const Home: FC = () => {
  const [result, setResult] = useState<null | string>(null);

  return (
    <Flexbox container
             direction="column"
             gutter={4}
             alignContent='center'
             style={{ margin: '5rem 1rem' }}>
      <Typography variant="header2" textAlign='center'>Guess the number</Typography>
      <form onSubmit={(e) => {
        e.preventDefault();
        getLotteryResult(new FormData(e.target as HTMLFormElement).get('guess') as string).then(setResult);
      }}>
        <Flexbox container direction="column" alignItems='center'>
          <TextField
            label='Your guess'
            name="guess"
            type='number'
            width={250}
          />
          {result &&
          <Typography variant="header4"
                      textAlign='center'
                      style={{ margin: '1rem 0' }}>
            {result}
          </Typography>}
          <Button type='submit' style={{ margin: '1rem 0' }}>guess</Button>
        </Flexbox>
      </form>
    </Flexbox>
  );
};
