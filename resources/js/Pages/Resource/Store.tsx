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
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    node: '',
    egg: NaN,
    cpu: NaN,
    ram: NaN,
    disk: NaN,
    databases: NaN,
    backups: NaN,
    ports: NaN,
  });
  const { errors: any } = usePage().props;
  function submit(e: any) {
    e.preventDefault();
    post('/server/create');
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
                    <p className="text-tiny text-white/60">每購買 1 %</p>
                    <p className="text-tiny text-green-400 font-semibold">
                      $ {props.store.cpu.price.toFixed(2)}
                      {props.store.cpu.sale ? (
                        <p className="inline-block">
                          &nbsp;
                          <p className="text-red-600 inline-block">
                            *&nbsp;
                            {props.store.cpu.sale_percent * 100}%
                          </p>{' '}
                          ={' '}
                          {(
                            props.store.cpu.price * props.store.cpu.sale_percent
                          ).toFixed(2)}
                        </p>
                      ) : null}
                      &nbsp;SDC
                    </p>
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
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
                    <p className="text-tiny text-white/60">每購買 1 MB</p>
                    <p className="text-tiny text-green-400 font-semibold">
                      $ {props.store.ram.price.toFixed(2)}
                      {props.store.ram.sale ? (
                        <p className="inline-block">
                          &nbsp;
                          <p className="text-red-600 inline-block">
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
                    </p>
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
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
                    <p className="text-tiny text-white/60">每購買 1 MB</p>
                    <p className="text-tiny text-green-400 font-semibold">
                      $ {props.store.disk.price.toFixed(2)}
                      {props.store.disk.sale ? (
                        <p className="inline-block">
                          &nbsp;
                          <p className="text-red-600 inline-block">
                            *&nbsp;
                            {props.store.disk.sale_percent * 100}%
                          </p>{' '}
                          ={' '}
                          {(
                            props.store.disk.price *
                            props.store.disk.sale_percent
                          ).toFixed(2)}
                        </p>
                      ) : null}
                      &nbsp;SDC
                    </p>
                  </div>
                </div>
                <Button
                  radius="full"
                  size="sm"
                  className="border-solid border-2 border-sky-500 hover:bg-blue-600 transition-all duration-150 ease-in-out"
                >
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>購買
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
