import React from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Badge} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {Checkbox} from "@nextui-org/react";
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';
import {Input} from "@nextui-org/react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { TransitionGroup } from 'react-transition-group';
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react';
import { useForm } from '@inertiajs/react'
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
export default function Create(props) {

    const form = useForm({
        name: '',
        cpu: '',
        ram: '',
        disk: '',
        databases: '',
        backups: '',
    });
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('server.create'));
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
                    <div
                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex justify-around p-5 flex-row flex-wrap">

                        <div className="w-80
                transition-all duration-100
                ease-out hover:w-full">

                            <Card className="w-full">
                                <form onSubmit={onSubmit}>
                                <CardHeader className="flex gap-3">
                                    <Breadcrumbs>
                                        <BreadcrumbItem>SHDactyl</BreadcrumbItem>
                                        <BreadcrumbItem>Dashboard</BreadcrumbItem>
                                        <BreadcrumbItem>Server</BreadcrumbItem>
                                        <BreadcrumbItem>Create</BreadcrumbItem>
                                    </Breadcrumbs>
                                </CardHeader>
                                <Divider/>
                                <CardBody>
                                    <Input
                                        type="text"
                                        label="伺服器名稱"
                                        id="name"
                                        value={form.data.name}
                                        onChange={e => form.setData('name', e.currentTarget.value)}
                                        placeholder="我的超酷伺服器"
                                        isRequired
                                    />
                                </CardBody>
                                <Divider/>
                                    <CardBody>
                                        <Select
                                            label="節點"
                                            placeholder="Node-TW01"
                                            isRequired
                                            >

                                            {props.nodes.map(node => (
                                                <SelectItem key={node} value={node}>
                                                    {node}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </CardBody>
                                    <Divider/>
                                <CardBody>
                                    <Input
                                        type="number"
                                        label="處理器"
                                        id="cpu"
                                        value={form.data.cpu}
                                        onChange={e => form.setData('cpu', e.currentTarget.value)}
                                        placeholder="50"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">%</span>
                                            </div>
                                        }
                                        isRequired
                                    />
                                </CardBody>
                                <Divider/>
                                <CardBody>
                                    <Input
                                        type="number"
                                        label="記憶體"
                                        id="ram"
                                        value={form.data.ram}
                                        onChange={e => form.setData('ram', e.currentTarget.value)}
                                        placeholder="1024"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">MB</span>
                                            </div>
                                        }
                                        isRequired
                                    />
                                </CardBody>
                                <Divider/>
                                <CardBody>
                                    <Input
                                        type="number"
                                        label="儲存空間"
                                        id="disk"
                                        value={form.data.id}
                                        onChange={e => form.setData('id', e.currentTarget.value)}
                                        placeholder="2048"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">MB</span>
                                            </div>
                                        }
                                        isRequired
                                    />
                                </CardBody>
                                <Divider/>
                                <CardBody>
                                    <Input
                                        type="number"
                                        label="資料庫"
                                        id="databases"
                                        value={form.data.databases}
                                        onChange={e => form.setData('databases', e.currentTarget.value)}
                                        placeholder="0"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">個</span>
                                            </div>
                                        }
                                        isRequired
                                    />
                                </CardBody>
                                <Divider/>
                                <CardBody>
                                    <Input
                                        type="number"
                                        label="備份欄位"
                                        id="backups"
                                        value={form.data.backups}
                                        onChange={e => form.setData('backups', e.currentTarget.value)}
                                        placeholder="0"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">個</span>
                                            </div>
                                        }
                                        isRequired
                                    />
                                </CardBody>
                                <Divider/>
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
