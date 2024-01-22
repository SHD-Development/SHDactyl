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

export default function Create(props: any) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    node: '',
    cpu: NaN,
    ram: NaN,
    disk: NaN,
    databases: NaN,
    backups: NaN,
  });

  function submit(e: any) {
    e.preventDefault();
    post('/dashboard/server/create');
  }

  return (
    <AppLayout
      title="Create Server"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          創建伺服器
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
                <form onSubmit={submit}>
                  <CardHeader className="flex gap-3">
                    <Breadcrumbs>
                      <BreadcrumbItem>SHDactyl</BreadcrumbItem>
                      <BreadcrumbItem>Dashboard</BreadcrumbItem>
                      <BreadcrumbItem>Server</BreadcrumbItem>
                      <BreadcrumbItem>Create</BreadcrumbItem>
                    </Breadcrumbs>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Input
                      type="text"
                      label="伺服器名稱"
                      id="name"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      placeholder="我的超酷伺服器"
                      isRequired
                    />
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <Select
                      label="節點"
                      placeholder="Node-TW01"
                      onChange={e => {
                        const selectedNode = e.target.value;
                        setData('node', props.nodes[selectedNode]);
                      }}
                      isRequired
                    >
                      {Object.entries(props.nodes).map(([node, value]) => (
                        <SelectItem key={node} value={value as number}>
                          {node}
                        </SelectItem>
                      ))}
                    </Select>
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <Input
                      type="number"
                      label="處理器"
                      id="cpu"
                      value={String(data.cpu)}
                      onChange={e => setData('cpu', Number(e.target.value))}
                      placeholder="50"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">%</span>
                        </div>
                      }
                      isRequired
                    />
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <Input
                      type="number"
                      label="記憶體"
                      id="ram"
                      value={String(data.ram)}
                      onChange={e => setData('ram', Number(e.target.value))}
                      placeholder="1024"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            MB
                          </span>
                        </div>
                      }
                      isRequired
                    />
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <Input
                      type="number"
                      label="儲存空間"
                      id="disk"
                      value={String(data.disk)}
                      onChange={e => setData('disk', Number(e.target.value))}
                      placeholder="2048"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            MB
                          </span>
                        </div>
                      }
                      isRequired
                    />
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <Input
                      type="number"
                      label="資料庫"
                      id="databases"
                      value={String(data.databases)}
                      onChange={e =>
                        setData('databases', Number(e.target.value))
                      }
                      placeholder="0"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            個
                          </span>
                        </div>
                      }
                      isRequired
                    />
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <Input
                      type="number"
                      label="備份欄位"
                      id="backups"
                      value={String(data.backups)}
                      onChange={e => setData('backups', Number(e.target.value))}
                      placeholder="0"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            個
                          </span>
                        </div>
                      }
                      isRequired
                    />
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex flex-col justify-center">
                    {/*<Chip color="secondary" size="lg">您的伺服器需要在 年 月 日 續約</Chip>*/}
                    {/*<br/>*/}
                    <Button type="submit" color="success">
                      創建
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
