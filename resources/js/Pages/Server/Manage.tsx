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
  const modifyModal = useDisclosure();

  const [unsuspend, setUnsuspend] = React.useState({
    id: 0,
    node: 0,
  });
  const [modify, setModify] = React.useState(Number);
  type UnsuspendType = {
    id: number;
    node: number;
  };
  const handleUnsuspendOpen = (unsuspend: UnsuspendType) => {
    setUnsuspend(unsuspend);
    setData('id', unsuspend.id);
    unsuspendModal.onOpen();
  };
  const handleModifyOpen = (modify: number) => {
    setModify(modify);
    modifyModal.onOpen();
  };
  const { data, setData, post, processing, errors } = useForm({
    id: 0,
  });
  const { data2, setData2, post2, processing2, errors2 }: any = useForm({
    id: 0,
  });
  const { errors: any } = usePage().props;
  function submitUnsuspend(e: any) {
    e.preventDefault();
    post('/server/unsuspend');
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
                          onPress={() => handleModifyOpen(item.attributes.id)}
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
                        <Button color="danger" variant="ghost">
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
        isOpen={modifyModal.isOpen}
        onClose={modifyModal.onClose}
        backdrop="blur"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>Modify</p>
              </ModalHeader>
              <ModalBody>
                <p>{modify}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  關閉
                </Button>
                <Button color="primary" type="submit">
                  購買
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </AppLayout>
  );
}
