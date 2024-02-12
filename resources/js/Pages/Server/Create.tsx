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
  const [selectedEgg, setSelectedEgg] = useState('');
  const eggs = props.eggs;
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
                  {errors.name && (
                    <p className="text-red-600 mx-3 mb-3">{errors.name}</p>
                  )}
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
                  {errors.node && (
                    <p className="text-red-600 mx-3 mb-3">{errors.node}</p>
                  )}
                  <Divider />
                  <CardBody>
                    <Select
                      label="類型"
                      placeholder="Purpur 插件"
                      isRequired
                      onChange={e => {
                        const selectedEgg: string = e.target.value;
                        setData('egg', Number(selectedEgg));
                      }}
                    >
                      {Object.entries(eggs).map(([category, items]) => (
                        <SelectSection title={category} key={category}>
                          {Object.entries(items as any).map(([id, item]) => (
                            <SelectItem value={id} key={id}>
                              {(item as any).name}
                            </SelectItem>
                          ))}
                        </SelectSection>
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
                  {errors.cpu && (
                    <p className="text-red-600 mx-3 mb-3">{errors.cpu}</p>
                  )}
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
                            MiB
                          </span>
                        </div>
                      }
                      isRequired
                    />
                  </CardBody>
                  {errors.ram && (
                    <p className="text-red-600 mx-3 mb-3">{errors.ram}</p>
                  )}
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
                            MiB
                          </span>
                        </div>
                      }
                      isRequired
                    />
                  </CardBody>
                  {errors.disk && (
                    <p className="text-red-600 mx-3 mb-3">{errors.disk}</p>
                  )}
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
                  {errors.databases && (
                    <p className="text-red-600 mx-3 mb-3">{errors.databases}</p>
                  )}
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
                  {errors.backups && (
                    <p className="text-red-600 mx-3 mb-3">{errors.backups}</p>
                  )}
                  <Divider />
                  <CardBody>
                    <Input
                      type="number"
                      label="額外端口"
                      id="ports"
                      value={String(data.ports)}
                      onChange={e => setData('ports', Number(e.target.value))}
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
                  {errors.ports && (
                    <p className="text-red-600 mx-3 mb-3">{errors.ports}</p>
                  )}
                  <Divider />

                  <CardFooter className="flex flex-col justify-center">
                    <Chip color="secondary" size="lg">
                      ${' '}
                      {(
                        props.fee.create *
                        props.fee.node[data.node] *
                        (props.fee.resource.cpu * data.cpu +
                          props.fee.resource.ram * data.ram +
                          props.fee.resource.disk * data.disk +
                          props.fee.resource.databases * data.databases +
                          props.fee.resource.backups * data.backups +
                          props.fee.resource.ports * data.ports)
                      ).toFixed(2)}{' '}
                      SDC
                    </Chip>
                    <br />
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
