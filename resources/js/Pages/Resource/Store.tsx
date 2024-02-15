import React from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from '@nextui-org/react';
import { Badge } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { Button, ButtonGroup } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
import { Input } from '@nextui-org/react';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { TransitionGroup } from 'react-transition-group';
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Select, SelectSection, SelectItem } from '@nextui-org/react';

export default function Store(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resource, setResource] = React.useState('');

  const handleOpen = (resource: string) => {
    setResource(resource);
    onOpen();
  };
  const { data, setData, post, processing, errors } = useForm({
    quantity: 0,
  });
  const { errors: any } = usePage().props;
  function handleSubmit(e: any) {
    e.preventDefault();
    post('/resource/store/buy/' + resource);
  }
  return (
    <AppLayout
      title="Resource Store"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          資源商店
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex justify-around p-5 flex-row flex-wrap">
            <Card
              isFooterBlurred
              className="w-80 h-72 col-span-12 sm:col-span-7 bg-gradient-to-br from-red-600 to-blue-600 my-3"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  CPU
                </p>
                <h4 className="text-white/90 font-semibold text-xl">處理器</h4>
                {props.store.cpu.sale ? (
                  <Chip size="sm" color="danger" className="animate-pulse">
                    <i className="fa-solid fa-sack-dollar"></i>&nbsp; 特價&nbsp;
                    {props.store.cpu.sale_percent * 100}%
                  </Chip>
                ) : null}
              </CardHeader>
              <div className="z-0 w-full h-full object-cover flex justify-center items-center">
                <i className="fa-solid fa-microchip text-[20rem] rotate-[25deg] text-gray-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"></i>
              </div>

              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">每購買 1%</p>
                    {props.store.cpu.sale === false ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $ {props.store.cpu.price.toFixed(2)} SDC
                      </p>
                    ) : null}
                    {props.store.cpu.sale ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $&nbsp;
                        <p className="inline-block font-semibold text-red-600 line-through">
                          {props.store.cpu.price.toFixed(2)}
                        </p>
                        &nbsp;
                        {(
                          props.store.cpu.price * props.store.cpu.sale_percent
                        ).toFixed(2)}
                        &nbsp;SDC
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  onPress={() => handleOpen('cpu')}
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>

            <Card
              isFooterBlurred
              className="w-80 h-72 col-span-12 sm:col-span-7 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 my-3"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Ram
                </p>
                <h4 className="text-white/90 font-semibold text-xl">記憶體</h4>
                {props.store.ram.sale ? (
                  <Chip size="sm" color="danger" className="animate-pulse">
                    <i className="fa-solid fa-sack-dollar"></i>&nbsp; 特價&nbsp;
                    {props.store.ram.sale_percent * 100}%
                  </Chip>
                ) : null}
              </CardHeader>
              <div className="z-0 w-full h-full object-cover flex justify-center items-center">
                <i className="fa-solid fa-memory text-[20rem] rotate-[25deg] text-gray-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"></i>
              </div>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">每購買 1 MiB</p>
                    {props.store.ram.sale === false ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $ {props.store.ram.price.toFixed(2)} SDC
                      </p>
                    ) : null}
                    {props.store.ram.sale ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $&nbsp;
                        <p className="inline-block font-semibold text-red-600 line-through">
                          {props.store.ram.price.toFixed(2)}
                        </p>
                        &nbsp;
                        {(
                          props.store.ram.price * props.store.ram.sale_percent
                        ).toFixed(2)}
                        &nbsp;SDC
                      </p>
                    ) : null}
                    {/* <p className="text-tiny text-green-400 font-semibold">
                      $ {props.store.ram.price.toFixed(2)}
                      {props.store.ram.sale ? (
                        <p className="inline-block font-semibold">
                          &nbsp;
                          <p className="text-red-600 inline-block font-semibold">
                            *&nbsp;
                            {props.store.ram.sale_percent * 100}%
                          </p>{' '}
                          ={' '}
                          {(
                            props.store.ram.price * props.store.ram.sale_percent
                          ).toFixed(2)}
                        </p>
                      ) : null}
                      &nbsp;SDC
                    </p> */}
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  onPress={() => handleOpen('ram')}
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="w-80 h-72 col-span-12 sm:col-span-7 bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% my-3"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Disk
                </p>
                <h4 className="text-white/90 font-semibold text-xl">
                  儲存空間
                </h4>
                {props.store.disk.sale ? (
                  <Chip size="sm" color="danger" className="animate-pulse">
                    <i className="fa-solid fa-sack-dollar"></i>&nbsp; 特價&nbsp;
                    {props.store.disk.sale_percent * 100}%
                  </Chip>
                ) : null}
              </CardHeader>
              <div className="z-0 w-full h-full object-cover flex justify-center items-center">
                <i className="fa-solid fa-hard-drive text-[20rem] rotate-[25deg] text-gray-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"></i>
              </div>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">每購買 1 MiB</p>
                    {props.store.disk.sale === false ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $ {props.store.disk.price.toFixed(2)} SDC
                      </p>
                    ) : null}
                    {props.store.disk.sale ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $&nbsp;
                        <p className="inline-block font-semibold text-red-600 line-through">
                          {props.store.disk.price.toFixed(2)}
                        </p>
                        &nbsp;
                        {(
                          props.store.disk.price * props.store.disk.sale_percent
                        ).toFixed(2)}
                        &nbsp;SDC
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  onPress={() => handleOpen('disk')}
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="w-80 h-72 col-span-12 sm:col-span-7 bg-gradient-to-br from-yellow-500 from-10% via-green-500 via-30% to-blue-500 to-90% my-3"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Databases
                </p>
                <h4 className="text-white/90 font-semibold text-xl">資料庫</h4>
                {props.store.databases.sale ? (
                  <Chip size="sm" color="danger" className="animate-pulse">
                    <i className="fa-solid fa-sack-dollar"></i>&nbsp; 特價&nbsp;
                    {props.store.databases.sale_percent * 100}%
                  </Chip>
                ) : null}
              </CardHeader>
              <div className="z-0 w-full h-full object-cover flex justify-center items-center">
                <i className="fa-solid fa-database text-[20rem] rotate-[25deg] text-gray-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"></i>
              </div>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">每購買 1 個</p>
                    {props.store.databases.sale === false ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $ {props.store.databases.price.toFixed(2)} SDC
                      </p>
                    ) : null}
                    {props.store.databases.sale ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $&nbsp;
                        <p className="inline-block font-semibold text-red-600 line-through">
                          {props.store.databases.price.toFixed(2)}
                        </p>
                        &nbsp;
                        {(
                          props.store.databases.price *
                          props.store.databases.sale_percent
                        ).toFixed(2)}
                        &nbsp;SDC
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  onPress={() => handleOpen('databases')}
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="w-80 h-72 col-span-12 sm:col-span-7 bg-gradient-to-br from-green-400 from-10% via-indigo-500 via-30% to-red-300 to-90% my-3"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Backups
                </p>
                <h4 className="text-white/90 font-semibold text-xl">
                  備份欄位
                </h4>
                {props.store.backups.sale ? (
                  <Chip size="sm" color="danger" className="animate-pulse">
                    <i className="fa-solid fa-sack-dollar"></i>&nbsp; 特價&nbsp;
                    {props.store.backups.sale_percent * 100}%
                  </Chip>
                ) : null}
              </CardHeader>
              <div className="z-0 w-full h-full object-cover flex justify-center items-center">
                <i className="fa-solid fa-cloud-arrow-up text-[20rem] rotate-[25deg] text-gray-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"></i>
              </div>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">每購買 1 個</p>
                    {props.store.backups.sale === false ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $ {props.store.backups.price.toFixed(2)} SDC
                      </p>
                    ) : null}
                    {props.store.backups.sale ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $&nbsp;
                        <p className="inline-block font-semibold text-red-600 line-through">
                          {props.store.backups.price.toFixed(2)}
                        </p>
                        &nbsp;
                        {(
                          props.store.backups.price *
                          props.store.backups.sale_percent
                        ).toFixed(2)}
                        &nbsp;SDC
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  onPress={() => handleOpen('backups')}
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="w-80 h-72 col-span-12 sm:col-span-7 bg-gradient-to-br from-blue-600 from-10% via-indigo-300 via-30% to-yellow-400 to-90% my-3"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Ports
                </p>
                <h4 className="text-white/90 font-semibold text-xl">
                  額外端口
                </h4>
                {props.store.ports.sale ? (
                  <Chip size="sm" color="danger" className="animate-pulse">
                    <i className="fa-solid fa-sack-dollar"></i>&nbsp; 特價&nbsp;
                    {props.store.ports.sale_percent * 100}%
                  </Chip>
                ) : null}
              </CardHeader>
              <div className="z-0 w-full h-full object-cover flex justify-center items-center">
                <i className="fa-solid fa-network-wired text-[20rem] rotate-[25deg] text-gray-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"></i>
              </div>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">每購買 1 個</p>
                    {props.store.ports.sale === false ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $ {props.store.ports.price.toFixed(2)} SDC
                      </p>
                    ) : null}
                    {props.store.ports.sale ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $&nbsp;
                        <p className="inline-block font-semibold text-red-600 line-through">
                          {props.store.ports.price.toFixed(2)}
                        </p>
                        &nbsp;
                        {(
                          props.store.ports.price *
                          props.store.ports.sale_percent
                        ).toFixed(2)}
                        &nbsp;SDC
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  onPress={() => handleOpen('ports')}
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>
            <Card
              isFooterBlurred
              className="w-80 h-72 col-span-12 sm:col-span-7 bg-gradient-to-br from-orange-600 from-10% via-green-300 via-30% to-indigo-400 to-90% my-3"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Servers
                </p>
                <h4 className="text-white/90 font-semibold text-xl">
                  伺服器欄位
                </h4>
                {props.store.servers.sale ? (
                  <Chip size="sm" color="danger" className="animate-pulse">
                    <i className="fa-solid fa-sack-dollar"></i>&nbsp; 特價&nbsp;
                    {props.store.servers.sale_percent * 100}%
                  </Chip>
                ) : null}
              </CardHeader>
              <div className="z-0 w-full h-full object-cover flex justify-center items-center">
                <i className="fa-solid fa-window-restore text-[20rem] rotate-[25deg] text-gray-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"></i>
              </div>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">每購買 1 臺</p>
                    {props.store.servers.sale === false ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $ {props.store.servers.price.toFixed(2)} SDC
                      </p>
                    ) : null}
                    {props.store.servers.sale ? (
                      <p className="text-tiny text-green-400 font-semibold">
                        $&nbsp;
                        <p className="inline-block font-semibold text-red-600 line-through">
                          {props.store.servers.price.toFixed(2)}
                        </p>
                        &nbsp;
                        {(
                          props.store.servers.price *
                          props.store.servers.sale_percent
                        ).toFixed(2)}
                        &nbsp;SDC
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  onPress={() => handleOpen('servers')}
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>
                  購買
                  {resource === 'cpu' && <p className="inline-block">處理器</p>}
                  {resource === 'ram' && <p className="inline-block">記憶體</p>}
                  {resource === 'disk' && (
                    <p className="inline-block">儲存空間</p>
                  )}
                  {resource === 'databases' && (
                    <p className="inline-block">資料庫</p>
                  )}
                  {resource === 'backups' && (
                    <p className="inline-block">備份欄位</p>
                  )}
                  {resource === 'ports' && (
                    <p className="inline-block">額外端口</p>
                  )}
                  {resource === 'servers' && (
                    <p className="inline-block">伺服器欄位</p>
                  )}
                </p>
              </ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <Input
                    type="number"
                    label="數量"
                    id="quantity"
                    placeholder="0"
                    onChange={e => setData('quantity', Number(e.target.value))}
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          {resource === 'cpu' && (
                            <p className="inline-block">%</p>
                          )}
                          {resource === 'ram' && (
                            <p className="inline-block">MiB</p>
                          )}
                          {resource === 'disk' && (
                            <p className="inline-block">MiB</p>
                          )}
                          {resource === 'databases' && (
                            <p className="inline-block">個</p>
                          )}
                          {resource === 'backups' && (
                            <p className="inline-block">個</p>
                          )}
                          {resource === 'ports' && (
                            <p className="inline-block">個</p>
                          )}
                          {resource === 'servers' && (
                            <p className="inline-block">臺</p>
                          )}
                        </span>
                      </div>
                    }
                  />
                  <p className="text-green-400">
                    $&nbsp;
                    {resource === 'cpu' && (
                      <p className="inline-block">
                        {props.store.cpu.price.toFixed(2)}&nbsp;
                      </p>
                    )}
                    {resource === 'cpu' && props.store.cpu.sale === true && (
                      <p className="inline-block text-red-600">
                        *&nbsp;{props.store.cpu.sale_percent * 100}
                        %&nbsp;
                      </p>
                    )}
                    {resource === 'cpu' && (
                      <p className="inline-block">
                        *&nbsp;{data.quantity}&nbsp;=&nbsp;
                        {(
                          props.store.cpu.price *
                          data.quantity *
                          (props.store.cpu.sale
                            ? props.store.cpu.sale_percent
                            : 1)
                        ).toFixed(2)}
                        &nbsp;
                      </p>
                    )}
                    {resource === 'ram' && (
                      <p className="inline-block">
                        {props.store.ram.price.toFixed(2)}&nbsp;
                      </p>
                    )}
                    {resource === 'ram' && props.store.ram.sale === true && (
                      <p className="inline-block text-red-600">
                        *&nbsp;{props.store.ram.sale_percent * 100}
                        %&nbsp;
                      </p>
                    )}
                    {resource === 'ram' && (
                      <p className="inline-block">
                        *&nbsp;{data.quantity}&nbsp;=&nbsp;
                        {(
                          props.store.ram.price *
                          data.quantity *
                          (props.store.ram.sale
                            ? props.store.ram.sale_percent
                            : 1)
                        ).toFixed(2)}
                        &nbsp;
                      </p>
                    )}
                    {resource === 'disk' && (
                      <p className="inline-block">
                        {props.store.disk.price.toFixed(2)}&nbsp;
                      </p>
                    )}
                    {resource === 'disk' && props.store.disk.sale === true && (
                      <p className="inline-block text-red-600">
                        *&nbsp;{props.store.disk.sale_percent * 100}
                        %&nbsp;
                      </p>
                    )}
                    {resource === 'disk' && (
                      <p className="inline-block">
                        *&nbsp;{data.quantity}&nbsp;=&nbsp;
                        {(
                          props.store.disk.price *
                          data.quantity *
                          (props.store.disk.sale
                            ? props.store.disk.sale_percent
                            : 1)
                        ).toFixed(2)}
                        &nbsp;
                      </p>
                    )}
                    {resource === 'databases' && (
                      <p className="inline-block">
                        {props.store.databases.price.toFixed(2)}&nbsp;
                      </p>
                    )}
                    {resource === 'databases' &&
                      props.store.databases.sale === true && (
                        <p className="inline-block text-red-600">
                          *&nbsp;{props.store.databases.sale_percent * 100}
                          %&nbsp;
                        </p>
                      )}
                    {resource === 'databases' && (
                      <p className="inline-block">
                        *&nbsp;{data.quantity}&nbsp;=&nbsp;
                        {(
                          props.store.databases.price *
                          data.quantity *
                          (props.store.databases.sale
                            ? props.store.databases.sale_percent
                            : 1)
                        ).toFixed(2)}
                        &nbsp;
                      </p>
                    )}
                    {resource === 'backups' && (
                      <p className="inline-block">
                        {props.store.backups.price.toFixed(2)}&nbsp;
                      </p>
                    )}
                    {resource === 'backups' &&
                      props.store.backups.sale === true && (
                        <p className="inline-block text-red-600">
                          *&nbsp;{props.store.backups.sale_percent * 100}
                          %&nbsp;
                        </p>
                      )}
                    {resource === 'backups' && (
                      <p className="inline-block">
                        *&nbsp;{data.quantity}&nbsp;=&nbsp;
                        {(
                          props.store.backups.price *
                          data.quantity *
                          (props.store.backups.sale
                            ? props.store.backups.sale_percent
                            : 1)
                        ).toFixed(2)}
                        &nbsp;
                      </p>
                    )}
                    {resource === 'ports' && (
                      <p className="inline-block">
                        {props.store.ports.price.toFixed(2)}&nbsp;
                      </p>
                    )}
                    {resource === 'ports' &&
                      props.store.ports.sale === true && (
                        <p className="inline-block text-red-600">
                          *&nbsp;{props.store.ports.sale_percent * 100}
                          %&nbsp;
                        </p>
                      )}
                    {resource === 'ports' && (
                      <p className="inline-block">
                        *&nbsp;{data.quantity}&nbsp;=&nbsp;
                        {(
                          props.store.ports.price *
                          data.quantity *
                          (props.store.ports.sale
                            ? props.store.ports.sale_percent
                            : 1)
                        ).toFixed(2)}
                        &nbsp;
                      </p>
                    )}
                    {resource === 'servers' && (
                      <p className="inline-block">
                        {props.store.servers.price.toFixed(2)}&nbsp;
                      </p>
                    )}
                    {resource === 'servers' &&
                      props.store.servers.sale === true && (
                        <p className="inline-block text-red-600">
                          *&nbsp;{props.store.servers.sale_percent * 100}
                          %&nbsp;
                        </p>
                      )}
                    {resource === 'servers' && (
                      <p className="inline-block">
                        *&nbsp;{data.quantity}&nbsp;=&nbsp;
                        {(
                          props.store.servers.price *
                          data.quantity *
                          (props.store.servers.sale
                            ? props.store.servers.sale_percent
                            : 1)
                        ).toFixed(2)}
                        &nbsp;
                      </p>
                    )}
                    SDC
                  </p>
                  {errors.quantity && (
                    <p className="text-red-600">{errors.quantity}</p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    關閉
                  </Button>
                  <Button color="primary" type="submit">
                    購買
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </AppLayout>
  );
}
