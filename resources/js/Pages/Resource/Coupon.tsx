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
import { useState } from 'react';
import { Input, BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { useForm } from '@inertiajs/react';

export default function Dashboard(props: any) {
  const modal1 = useDisclosure();
  const modal2 = useDisclosure();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
  const { data, setData, post, processing, errors } = useForm({
    coupon: '',
  });
  const { errors: any } = usePage().props;
  function submit(e: any) {
    e.preventDefault();
    post('/resource/coupon/redeem');
  }
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  return (
    <AppLayout
      title="Coupon"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          兌換代碼
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex justify-center items-center flex-col py-5">
            <div
              className="w-80
                transition-all duration-100
                ease-out hover:w-1/2"
            >
              <Card className="w-full">
                <form onSubmit={submit}>
                  <CardHeader className="flex gap-3">
                    <Breadcrumbs>
                      <BreadcrumbItem>SHDactyl</BreadcrumbItem>
                      <BreadcrumbItem>Dashboard</BreadcrumbItem>
                      <BreadcrumbItem>Resource</BreadcrumbItem>
                      <BreadcrumbItem>Coupon</BreadcrumbItem>
                    </Breadcrumbs>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Input
                      type="text"
                      variant="faded"
                      label="Coupon"
                      id="coupon"
                      value={data.coupon}
                      onChange={e => setData('coupon', e.target.value)}
                      placeholder="輸入兌換代碼"
                    />
                  </CardBody>
                  {errors.coupon && (
                    <p className="text-red-600 mx-2 mb-3">{errors.coupon}</p>
                  )}
                  <CardFooter className="flex flex-col justify-center">
                    <Button type="submit" color="success">
                      創建
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>

            {/*Panel Id:{ props.data.attributes.id }*/}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
