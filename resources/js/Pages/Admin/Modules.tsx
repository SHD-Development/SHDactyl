import React from 'react';
import Welcome from '@/Components/Welcome';
import AdminLayout from '@/Layouts/AdminLayout';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  BreadcrumbItem,
  Breadcrumbs,
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

export default function Modules(props: any) {
  return (
    <AdminLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          系統模組
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex justify-around p-5 flex-row flex-wrap">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <Image
                  alt="shdcloud logo"
                  height={40}
                  radius="sm"
                  src="https://cdn.discordapp.com/attachments/1120284155578691676/1185889959710838875/shd-cloud-logo.png"
                  width={40}
                />
                <div className="flex flex-col">
                  <Breadcrumbs>
                    <BreadcrumbItem>SHDactyl</BreadcrumbItem>
                    <BreadcrumbItem>Admin</BreadcrumbItem>
                    <BreadcrumbItem>Modules</BreadcrumbItem>
                  </Breadcrumbs>
                  <p className="text-md">系統模組</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="inline">
                  OAuth：
                  {props.oauth && (
                    <p className="font-semibold text-green-500">已啟用</p>
                  )}
                  {!props.oauth && (
                    <p className="font-semibold text-red-500">未啟用</p>
                  )}
                </div>
              </CardBody>
              <Divider />
              <CardBody>
                <div className="inline">
                  Pusher：
                  {props.pusher && (
                    <p className="font-semibold text-green-500">已啟用</p>
                  )}
                  {!props.pusher && (
                    <p className="font-semibold text-red-500">未啟用</p>
                  )}
                </div>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-around">
                <Button color="success" variant="shadow">
                  啟用所有模組
                </Button>
                <Button color="danger" variant="shadow">
                  禁用所有模組
                </Button>
              </CardFooter>
            </Card>

            {/*Panel Id:{ props.data.attributes.id }*/}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
