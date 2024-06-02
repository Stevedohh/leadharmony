import React from 'react';
import {
  Button,
  Input, Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spacer
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Stream } from './StreamsTable';


type StreamModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: (data: any) => void;
  onOpenChange: () => void;
  data?: Stream;
}

export const StreamModal = ({ isLoading, isOpen, onOpenChange, onSubmit, data }: StreamModalProps) => {
  const { register, handleSubmit, reset } = useForm({
    values: data
  });

  return (
    <Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
      <ModalContent>
        { (onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Stream</ModalHeader>
            <form onSubmit={ handleSubmit((data) => {
              onSubmit(data);
              reset();
            }) }>
              <ModalBody>
                <Input
                  required
                  label="Stream name"
                  labelPlacement="outside"
                  placeholder=" "
                  size="sm"
                  variant="bordered"
                  { ...register('name', { required: true }) }
                />
                <Spacer />
                <div className="flex flex-1 flex-col gap-3">
                  <h4>
                    Partner program settings
                  </h4>
                  <Select
                    items={ [ { key: 'TrafficLight', label: 'Traffic Light' }, { key: 'DrCash', label: 'dr.cash' } ] }
                    size="sm"
                    label="Partner program"
                    labelPlacement="outside"
                    placeholder=" "
                    className="max-w"
                    variant="bordered"
                    required
                    { ...register('partner', { required: true }) }
                  >
                    { (item) => <SelectItem key={ item.key }>{ item.label }</SelectItem> }
                  </Select>
                  <Input
                    required
                    label="API token"
                    labelPlacement="outside"
                    placeholder=" "
                    size="sm"
                    variant="bordered"
                    { ...register('apiToken', { required: true }) }
                  />
                  <Input
                    required
                    label="Stream id"
                    labelPlacement="outside"
                    placeholder=" "
                    size="sm"
                    variant="bordered"
                    { ...register('streamId', { required: true }) }
                  />
                  <Input
                    required
                    label="Offer id"
                    labelPlacement="outside"
                    placeholder=" "
                    size="sm"
                    variant="bordered"
                    { ...register('offerId', { required: true }) }
                  />
                </div>
                <Spacer />
                <div className="flex flex-1 flex-col gap-3">
                  <h4>
                    Notifications
                  </h4>
                  <Input
                    required
                    label="Slack channel id"
                    labelPlacement="outside"
                    placeholder=" "
                    size="sm"
                    variant="bordered"
                    { ...register('slackChannelId', { required: true }) }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={ onClose }>
                  Close
                </Button>
                <Button type="submit" isLoading={ isLoading }>
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </>
        ) }
      </ModalContent>
    </Modal>
  );
};
