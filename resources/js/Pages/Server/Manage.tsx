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

export default function Manage(props: any) {
  const unsuspendModal = useDisclosure();
  const removeModal = useDisclosure();

  const modifyModal = useDisclosure();

  const [unsuspend, setUnsuspend] = React.useState({
    id: 0,
    node: 0,
  });
  const [remove, setRemove] = React.useState({
    id: 0,
  });
  const [modify, setModify] = React.useState({
    id: 0,
  });
  type UnsuspendType = {
    id: number;
    node: number;
  };
  type RemoveType = {
    id: number;
  };
  type ModifyType = {
    id: number;
  };
  const handleUnsuspendOpen = (unsuspend: UnsuspendType) => {
    setUnsuspend(unsuspend);
    setData1('id', unsuspend.id);
    unsuspendModal.onOpen();
  };
  const handleRemoveOpen = (remove: RemoveType) => {
    setRemove(remove);
    setData2('id', remove.id);
    removeModal.onOpen();
  };
  const handleModifyOpen = (modify: ModifyType) => {
    setModify(modify);
    setData3('id', modify.id);
    modifyModal.onOpen();
  };
  const {
    data: data1,
    setData: setData1,
    post: post1,
    processing: processing1,
    errors: errors1,
  } = useForm({
    id: 0,
  });

  const {
    data: data2,
    setData: setData2,
    delete: delete2,
    processing: processing2,
    errors: errors2,
  } = useForm({
    id: 0,
  });
  const {
    data: data3,
    setData: setData3,
    patch: patch3,
    processing: processing3,
    errors: errors3,
  } = useForm({
    id: 0,
    cpu: NaN,
    ram: NaN,
    disk: NaN,
    databases: NaN,
    backups: NaN,
    ports: NaN,
  });
  const { errors: any } = usePage().props;
  function submitUnsuspend(e: any) {
    e.preventDefault();
    post1('/server/unsuspend');
  }
  function submitRemove(e: any) {
    e.preventDefault();
    delete2('/server/delete');
  }
  function submitModify(e: any) {
    e.preventDefault();
    patch3('/server/modify');
  }
  return (
    <AppLayout
      title="Manage Server"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          管理伺服器
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex justify-around p-5 flex-row flex-wrap">
            <div
              className="w-80
                transition-all duration-100
                ease-out hover:w-full"
            >
              <Card className="w-full">
                <CardHeader className="flex gap-3">
                  <Breadcrumbs>
                    <BreadcrumbItem>SHDactyl</BreadcrumbItem>
                    <BreadcrumbItem>Dashboard</BreadcrumbItem>
                    <BreadcrumbItem>Server</BreadcrumbItem>
                    <BreadcrumbItem>Manage</BreadcrumbItem>
                  </Breadcrumbs>
                </CardHeader>
                {props.data.length === 0 && (
                  <div>
                    <Divider />
                    <CardBody className="justify-center items-center">
                      <p className="text-red-600 font-semibold">
                        目前沒有伺服器
                      </p>
                      <Link href="/dashboard/server/create">
                        <p className="text-gray-400 underline">創建一個？</p>
                      </Link>
                    </CardBody>
                  </div>
                )}
                {props.data.map((item: any) => (
                  <div>
                    <Divider />
                    <CardBody>
                      <div className="flex flex-nowrap flex-row items-center">
                        <Chip
                          color={
                            item.attributes.suspended ? 'danger' : 'success'
                          }
                          variant="dot"
                        >
                          {item.attributes.id}
                        </Chip>
                        &nbsp;&nbsp;
                        <Chip radius="sm" color="default">
                          {item.attributes.name}
                        </Chip>
                        &nbsp;&nbsp;
                        <div className="h-7 p-2 rounded-full bg-gray-600 flex justify-center items-center border-solid border-2 border-gray-800">
                          <i className="fa-solid fa-microchip"></i>&nbsp;
                          {item.attributes.limits.cpu}%
                        </div>
                        &nbsp;&nbsp;
                        <div className="h-7 p-2 rounded-full bg-gray-600 flex justify-center items-center border-solid border-2 border-gray-800">
                          <i className="fa-solid fa-memory"></i>&nbsp;
                          {item.attributes.limits.memory}&nbsp;MiB
                        </div>
                        &nbsp;&nbsp;
                        <div className="h-7 p-2 rounded-full bg-gray-600 flex justify-center items-center border-solid border-2 border-gray-800">
                          <i className="fa-solid fa-hard-drive"></i>&nbsp;
                          {item.attributes.limits.disk}&nbsp;MiB
                        </div>
                        &nbsp;&nbsp;
                        <div className="h-7 p-2 rounded-full bg-gray-600 flex justify-center items-center border-solid border-2 border-gray-800">
                          <i className="fa-solid fa-database"></i>&nbsp;
                          {item.attributes.feature_limits.databases}&nbsp;個
                        </div>
                        &nbsp;&nbsp;
                        <div className="h-7 p-2 rounded-full bg-gray-600 flex justify-center items-center border-solid border-2 border-gray-800">
                          <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp;
                          {item.attributes.feature_limits.backups}&nbsp;個
                        </div>
                        &nbsp;&nbsp;
                        <div className="h-7 p-2 rounded-full bg-gray-600 flex justify-center items-center border-solid border-2 border-gray-800">
                          <i className="fa-solid fa-network-wired"></i>&nbsp;
                          {item.attributes.feature_limits.allocations}&nbsp;個
                        </div>
                        &nbsp;&nbsp;
                        <Link
                          href={
                            '/external/panel/server.' +
                            item.attributes.identifier
                          }
                        >
                          <Button color="primary" variant="faded">
                            管理
                          </Button>
                        </Link>
                        &nbsp;&nbsp;
                        <Button
                          color="primary"
                          variant="shadow"
                          onPress={() =>
                            handleModifyOpen({ id: item.attributes.id })
                          }
                        >
                          編輯
                        </Button>
                        {item.attributes.suspended === true && (
                          <>
                            &nbsp;&nbsp;
                            <Button
                              color="warning"
                              variant="flat"
                              onPress={() =>
                                handleUnsuspendOpen({
                                  id: item.attributes.id,
                                  node: item.attributes.node,
                                })
                              }
                            >
                              續約
                            </Button>
                          </>
                        )}
                        &nbsp;&nbsp;
                        <Button
                          color="danger"
                          variant="ghost"
                          onPress={() =>
                            handleRemoveOpen({
                              id: item.attributes.id,
                            })
                          }
                        >
                          刪除
                        </Button>
                      </div>
                    </CardBody>
                  </div>
                ))}

                <Divider />
                <CardFooter className="flex flex-col justify-center">
                  <Link href="/external/panel">
                    <Button type="button" color="secondary">
                      進入面板
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={unsuspendModal.isOpen}
        onClose={unsuspendModal.onClose}
        backdrop="blur"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>續約伺服器</p>
              </ModalHeader>
              <ModalBody>
                <p>伺服器識別碼：{unsuspend.id}</p>
                <p className="text-green-400 font-semibold">
                  續約費用：$&nbsp;{props.fee.unsuspend.toFixed(2)}&nbsp;*&nbsp;
                  {props.fee.node[unsuspend.node].toFixed(2)}
                  &nbsp;=&nbsp;
                  {(
                    props.fee.unsuspend * props.fee.node[unsuspend.node]
                  ).toFixed(2)}
                  &nbsp;SDC
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  關閉
                </Button>
                <form onSubmit={submitUnsuspend}>
                  <Button color="primary" type="submit">
                    續約
                  </Button>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={removeModal.isOpen}
        onClose={removeModal.onClose}
        backdrop="blur"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>刪除伺服器</p>
              </ModalHeader>
              <ModalBody>
                <p>伺服器識別碼：{remove.id}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  關閉
                </Button>
                <form onSubmit={submitRemove}>
                  <Button color="danger" type="submit">
                    刪除
                  </Button>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={modifyModal.isOpen}
        onClose={modifyModal.onClose}
        backdrop="blur"
      >
        <ModalContent>
          {onClose => (
            <>
              <form onSubmit={submitModify}>
                <ModalHeader className="flex flex-col gap-1">
                  <p>編輯伺服器</p>
                </ModalHeader>
                <ModalBody>
                  <p>伺服器識別碼：{modify.id}</p>

                  <Input
                    type="number"
                    label="處理器"
                    id="cpu"
                    value={String(data3.cpu)}
                    onChange={e => setData3('cpu', Number(e.target.value))}
                    placeholder="0"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    }
                    isRequired
                  />
                  {errors3.cpu && (
                    <p className="text-red-600 mx-3 mb-3">{errors3.cpu}</p>
                  )}
                  <Input
                    type="number"
                    label="記憶體"
                    id="ram"
                    value={String(data3.ram)}
                    onChange={e => setData3('ram', Number(e.target.value))}
                    placeholder="0"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">MiB</span>
                      </div>
                    }
                    isRequired
                  />
                  {errors3.ram && (
                    <p className="text-red-600 mx-3 mb-3">{errors3.ram}</p>
                  )}
                  <Input
                    type="number"
                    label="硬碟"
                    id="disk"
                    value={String(data3.disk)}
                    onChange={e => setData3('disk', Number(e.target.value))}
                    placeholder="0"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">MiB</span>
                      </div>
                    }
                    isRequired
                  />
                  {errors3.disk && (
                    <p className="text-red-600 mx-3 mb-3">{errors3.disk}</p>
                  )}
                  <Input
                    type="number"
                    label="資料庫"
                    id="databases"
                    value={String(data3.databases)}
                    onChange={e =>
                      setData3('databases', Number(e.target.value))
                    }
                    placeholder="0"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">個</span>
                      </div>
                    }
                    isRequired
                  />
                  {errors3.databases && (
                    <p className="text-red-600 mx-3 mb-3">
                      {errors3.databases}
                    </p>
                  )}
                  <Input
                    type="number"
                    label="備份欄位"
                    id="backups"
                    value={String(data3.backups)}
                    onChange={e => setData3('backups', Number(e.target.value))}
                    placeholder="0"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">個</span>
                      </div>
                    }
                    isRequired
                  />
                  {errors3.backups && (
                    <p className="text-red-600 mx-3 mb-3">{errors3.backups}</p>
                  )}
                  <Input
                    type="number"
                    label="額外端口"
                    id="ports"
                    value={String(data3.ports)}
                    onChange={e => setData3('ports', Number(e.target.value))}
                    placeholder="0"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">個</span>
                      </div>
                    }
                    isRequired
                  />
                  {errors3.ports && (
                    <p className="text-red-600 mx-3 mb-3">{errors3.ports}</p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    關閉
                  </Button>
                  <Button color="primary" type="submit">
                    編輯
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
