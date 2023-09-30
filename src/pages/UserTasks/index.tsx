import { useState } from 'react';
import { Box } from '@mui/material';

import { Columns } from '../../components/Columns';
import type { ColumnType } from '../../components/Column';
import { PRIORITY_ENUM } from '../../entities';
import { MainWrapper } from '../../components';

export const UserTasks = () => {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: '1234',
      name: 'Backlog',

      tasks: [
        {
          name: '1234',
          description:
            "Brainstorming brings team members' diverse experience into play.",
          status: PRIORITY_ENUM.LOW,
          author: { id: '12', firstName: 'Oleg', secondName: 'Petrov' },
          executor: { id: '23', firstName: 'Ryan', secondName: 'Gosling' },
          id: '123',
        },
        {
          name: '2225',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: '12', firstName: 'Dmitry', secondName: 'Pupkin' },
          executor: { id: '23', firstName: 'Ryan', secondName: 'Gosling' },
          id: '1234',
        },
      ],
      color: '#8BC48A',
    },
    {
      id: '123321',
      name: 'In Work',
      tasks: [
        {
          name: '123',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.HIGH,
          author: { id: '12', firstName: 'Remy', secondName: 'Sharp' },
          executor: {
            id: '23',
            firstName: 'Travis',
            secondName: 'Howard',
          },
          id: '1',
        },
        {
          name: '222',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: '12', firstName: 'Cindy', secondName: 'Baker' },
          executor: {
            id: '23',
            firstName: 'Travis',
            secondName: 'Howard',
          },
          id: '12',
        },
      ],
      color: '#5030E5',
    },
    {
      id: '123',
      name: 'On Progress',
      tasks: [
        {
          name: '1234',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.LOW,
          author: { id: '12', firstName: 'Dmitry', secondName: 'Olegov' },
          executor: {
            id: '23',
            firstName: 'Travis',
            secondName: 'Howard',
          },
          id: '123',
        },
        {
          name: '2225',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.HOT,
          author: { id: '12', firstName: 'Dmitry', secondName: 'Olegov' },
          executor: { id: '12', firstName: 'Cindy', secondName: 'Baker' },
          id: '1234',
        },
      ],
      color: '#FFA500',
    },
    {
      id: '12345',
      name: 'QA',
      tasks: [
        {
          name: '1234',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.HIGH,
          author: { id: '12', firstName: 'Dmitry', secondName: 'Olegov' },
          executor: { id: '12', firstName: 'Cindy', secondName: 'Baker' },
          id: '123',
        },
        {
          name: '2225',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: '12', firstName: 'Cindy', secondName: 'Baker' },
          executor: { id: '12', firstName: 'Remy', secondName: 'Sharp' },
          id: '1234',
        },
      ],
      color: '#8BC48A',
    },
    {
      id: '123456',
      name: 'Done',
      tasks: [
        {
          name: '1234',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.LOW,
          author: { id: '12', firstName: 'Dmitry', secondName: 'Olegov' },
          executor: { id: '23', firstName: 'Ryan', secondName: 'Gosling' },
          id: '123',
        },
        {
          name: '2225',
          description:
            'Low fidelity wireframes include the most basic content and visuals.',
          status: PRIORITY_ENUM.HOT,
          author: { id: '12', firstName: 'Dmitry', secondName: 'Olegov' },
          executor: { id: '23', firstName: 'Ryan', secondName: 'Gosling' },
          id: '1234',
        },
      ],
      color: '#8BC48A',
    },
  ]);

  return (
    <MainWrapper>
      <Box>
        <Columns columns={columns} setColumns={setColumns} />
      </Box>
    </MainWrapper>
  );
};
