import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@nextui-org/react';
import { Pencil, Trash2 } from 'lucide-react';
import { StreamModal } from './StreamModal';
import { deferUntilNextTick } from '@leadharmony/ui-utils';
import { config } from '../config';

export type Stream = {
  id: number
  name: string
  partner: string
  apiToken: string
  streamId: string
  offerId: string
  slackChannelId: string
}

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'partner',
    label: 'Partner Program'
  },
  {
    key: 'apiToken',
    label: 'ApiToken'
  },
  {
    key: 'streamId',
    label: 'StreamId'
  },
  {
    key: 'offerId',
    label: 'OfferId'
  },
  {
    key: 'slackChannelId',
    label: 'SlackChannelId'
  },
  {
    key: 'action',
    label: 'Action'
  }
];

export const StreamsTable = () => {
  const [ selectedStream, setSelectedStream ] = useState<Stream>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { data, isLoading} = useQuery({
    queryKey: [ 'streams' ],
    queryFn: () => axios.get<Stream[]>(`${ config.apiUrl }/stream`).then((res) => res.data)
  });

  const { mutate: updateStream, isPending } = useMutation({
    mutationFn: (data: Partial<Stream>) => axios.put(`${ config.apiUrl }/stream/${ data.id }`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'streams' ] });
      onClose();
    }
  });

  const { mutate: deleteStream } = useMutation({
    mutationFn: (id: number) => axios.delete(`${ config.apiUrl }/stream/${ id }`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'streams' ] });
      onClose();
    }
  });

  const onSubmit = (data: Stream) => {
    updateStream(data);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const onEditClick = (stream: Stream) => {
    setSelectedStream(stream);
    deferUntilNextTick(() => {
      onOpen();
    });
  };

  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={ columns }>
          { (column) => <TableColumn
            key={ column.key }
            className={ column.key === 'action' ? 'text-center' : '' }
          >
            { column.label }
          </TableColumn>
          }
        </TableHeader>
        <TableBody items={ data }>
          { (item) => (
            <TableRow key={ item.id }>
              { (columnKey) => columnKey === 'action' ?
                <TableCell>
                  <div className="relative flex items-center justify-center gap-2">
                    <Button isIconOnly size="sm" onClick={ () => onEditClick(item) }>
                      <Pencil size="16" />
                    </Button>
                    <Button isIconOnly color="danger" size="sm" onClick={ () => deleteStream(item.id) }>
                      <Trash2 size="20" />
                    </Button>
                  </div>
                </TableCell> :
                <TableCell>{ getKeyValue(item, columnKey) }</TableCell>
              }
            </TableRow>
          ) }
        </TableBody>
      </Table>
      <StreamModal
        isOpen={ isOpen }
        onOpenChange={ onOpenChange }
        onSubmit={ onSubmit }
        isLoading={ isPending }
        data={ selectedStream }
      />
    </>
  );
};
