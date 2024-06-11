import {
  Button,
  useDisclosure
} from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { StreamModal } from './stream/StreamModal';
import { StreamsTable } from './stream/StreamsTable';
import { config } from './config';

export const App = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const { mutate: createStream, isPending } = useMutation({
    mutationFn: (data) => axios.post(`${config.apiUrl}/stream`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'streams' ] });
      onClose();
    }
  });

  const onSubmit = (data: any) => {
    createStream(data);
  };

  return (
    <div className="h-screen flex flex-col gap-5 max-w-[1200px] pt-5 ml-auto mr-auto">
      <h1 className="text-3xl font-bold">Streams</h1>
      <div className="ml-auto">
        <Button onPress={ onOpen } color="default" variant="ghost">
          Create Stream
        </Button>
      </div>
      <StreamModal
        isOpen={ isOpen }
        onOpenChange={ onOpenChange }
        onSubmit={ onSubmit }
        isLoading={ isPending }
      />
      <StreamsTable />
    </div>
  );
};
