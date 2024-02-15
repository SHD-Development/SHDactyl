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
  function handleSubmit(e: any) {
    if (!checkboxChecked) {
      e.preventDefault();
      Toast.fire({
        icon: 'warning',
        title: '請同意重設密碼須知',
      });
      return;
    }
    e.preventDefault();
    router.post('/reset/password');
  }
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          主頁
        </h2>
      )}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex justify-center flex-col py-5">
            <div className="flex justify-around px-5 flex-row flex-wrap">
              <Card className="w-60 p-3 mt-3">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <p className="text-tiny uppercase font-bold">代幣</p>
                      <small className="text-default-500">Coins</small>
                      <h3 className="font-bold text-large">
                        $ {props.auth.user.coins} SDC
                      </h3>
                    </div>
                  </div>
                  <i className="fa-solid fa-coins fa-2xl"></i>
                </CardHeader>
              </Card>
              <Card className="w-60 p-3 mt-3">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <p className="text-tiny uppercase font-bold">處理器</p>
                      <small className="text-default-500">CPU</small>
                      <h3 className="font-bold text-large">
                        {props.total.cpu} / {props.auth.user.cpu}%
                      </h3>
                    </div>
                  </div>
                  <i className="fa-solid fa-microchip fa-2xl"></i>
                </CardHeader>
              </Card>
              <Card className="w-60 p-3 mt-3">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <p className="text-tiny uppercase font-bold">記憶體</p>
                      <small className="text-default-500">Ram</small>
                      <h3 className="font-bold text-large">
                        {props.total.ram} / {props.auth.user.ram} MiB
                      </h3>
                    </div>
                  </div>
                  <i className="fa-solid fa-memory fa-2xl"></i>
                </CardHeader>
              </Card>
              <Card className="w-60 p-3 mt-3">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <p className="text-tiny uppercase font-bold">儲存空間</p>
                      <small className="text-default-500">Disk</small>
                      <h3 className="font-bold text-large">
                        {props.total.disk} / {props.auth.user.disk} MiB
                      </h3>
                    </div>
                  </div>
                  <i className="fa-solid fa-hard-drive fa-2xl"></i>
                </CardHeader>
              </Card>
            </div>
            <br />
            <div className="flex justify-center items-center">
              <Card className="max-w-[400px] mt-10 flex justify-center items-center">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="shdcloud logo"
                    height={40}
                    radius="sm"
                    src="https://cdn.discordapp.com/attachments/1120284155578691676/1185889959710838875/shd-cloud-logo.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">帳號 / 面板資訊</p>
                    <Link href="https://panel.shdcloud.xyz">
                      <p className="text-small text-default-500">
                        panel.shdcloud.xyz
                      </p>
                    </Link>
                  </div>
                  <Button
                    isIconOnly
                    color="secondary"
                    aria-label="More"
                    className="ml-3"
                    onPress={modal2.onOpen}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </Button>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>帳號名稱：{props.auth.user.discord_id}</p>
                  <p>
                    身分：
                    <Chip
                      startContent={<i className="fa-solid fa-check"></i>}
                      variant="faded"
                      color="success"
                    >
                      User
                    </Chip>
                    &nbsp;
                    {props.data.attributes.root_admin === true && (
                      <Chip
                        startContent={
                          <i className="fa-solid fa-shield-halved"></i>
                        }
                        variant="faded"
                        color="secondary"
                      >
                        Admin
                      </Chip>
                    )}
                  </p>
                </CardBody>
                <Divider />
                <CardBody>
                  <div className="flex justify-center">
                    {/* justify-around */}
                    {/* <Button color="primary" variant="shadow">
                      同步資料
                    </Button> */}
                    <Button
                      color="danger"
                      onPress={modal1.onOpen}
                      variant="shadow"
                    >
                      重設密碼
                    </Button>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://panel.shdcloud.xyz"
                  >
                    開啟面板
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <Modal
              backdrop="opaque"
              isOpen={modal1.isOpen}
              onClose={modal1.onClose}
              radius="lg"
              classNames={{
                body: 'py-6',
                backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
                base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
                header: 'border-b-[1px] border-[#292f46]',
                footer: 'border-t-[1px] border-[#292f46]',
                closeButton: 'hover:bg-white/5 active:bg-white/10',
              }}
            >
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  確定要重設密碼？
                </ModalHeader>
                <ModalBody>
                  <p>
                    當您重設密碼後，我們會先顯示密碼給您後將密碼加密並且同步至面板。
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Checkbox onChange={() => setCheckboxChecked(prev => !prev)}>
                    我明白密碼僅會顯示一次，忘記密碼需要再次重設。
                  </Checkbox>
                  <form onSubmit={handleSubmit}>
                    <Button
                      type="submit"
                      className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                      onPress={modal1.onClose}
                    >
                      確認
                    </Button>
                  </form>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Modal
              isOpen={modal2.isOpen}
              onClose={modal2.onClose}
              backdrop="blur"
              scrollBehavior="inside"
            >
              <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                  資源詳情
                </ModalHeader>
                <ModalBody>
                  <div className="flex justify-center items-center flex-col">
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              代幣
                            </p>
                            <small className="text-default-500">Coins</small>
                            <h3 className="font-bold text-large">
                              $ {props.auth.user.coins} SDC
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-coins fa-2xl"></i>
                      </CardHeader>
                    </Card>
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              處理器
                            </p>
                            <small className="text-default-500">CPU</small>
                            <h3 className="font-bold text-large">
                              {props.total.cpu} / {props.auth.user.cpu}%
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-microchip fa-2xl"></i>
                      </CardHeader>
                    </Card>
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              記憶體
                            </p>
                            <small className="text-default-500">Ram</small>
                            <h3 className="font-bold text-large">
                              {props.total.ram} / {props.auth.user.ram} MiB
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-memory fa-2xl"></i>
                      </CardHeader>
                    </Card>
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              儲存空間
                            </p>
                            <small className="text-default-500">Disk</small>
                            <h3 className="font-bold text-large">
                              {props.total.disk} / {props.auth.user.disk} MiB
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-hard-drive fa-2xl"></i>
                      </CardHeader>
                    </Card>
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              資料庫
                            </p>
                            <small className="text-default-500">
                              Databases
                            </small>
                            <h3 className="font-bold text-large">
                              {props.total.databases} /{' '}
                              {props.auth.user.databases} 個
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-database fa-2xl"></i>
                      </CardHeader>
                    </Card>
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              備份欄位
                            </p>
                            <small className="text-default-500">Backups</small>
                            <h3 className="font-bold text-large">
                              {props.total.backups} / {props.auth.user.backups}{' '}
                              個
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-cloud-arrow-up fa-2xl"></i>
                      </CardHeader>
                    </Card>
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              額外端口
                            </p>
                            <small className="text-default-500">Ports</small>
                            <h3 className="font-bold text-large">
                              {props.total.ports} / {props.auth.user.ports} 個
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-network-wired fa-2xl"></i>
                      </CardHeader>
                    </Card>
                    <Card className="w-60 p-3 mt-3">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <p className="text-tiny uppercase font-bold">
                              伺服器欄位
                            </p>
                            <small className="text-default-500">Servers</small>
                            <h3 className="font-bold text-large">
                              {props.total.servers} / {props.auth.user.servers}{' '}
                              臺
                            </h3>
                          </div>
                        </div>
                        <i className="fa-solid fa-window-restore fa-2xl"></i>
                      </CardHeader>
                    </Card>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="default"
                    variant="light"
                    onPress={modal2.onClose}
                  >
                    關閉
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/*Panel Id:{ props.data.attributes.id }*/}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
