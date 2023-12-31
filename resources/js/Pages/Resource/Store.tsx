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
export default function Store(props) {
    const [value, setValue] = useState("")


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
                    <div
                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg flex justify-around p-5 flex-row flex-wrap">


                            <Card className="w-64">
                                <form onSubmit={handleSubmit}>
                                    <CardHeader className="flex gap-3">
                                        <Breadcrumbs>
                                            <BreadcrumbItem>SHDactyl</BreadcrumbItem>
                                            <BreadcrumbItem>Dashboard</BreadcrumbItem>
                                            <BreadcrumbItem>Resource</BreadcrumbItem>
                                            <BreadcrumbItem>Store</BreadcrumbItem>
                                            <BreadcrumbItem>CPU</BreadcrumbItem>
                                        </Breadcrumbs>
                                    </CardHeader>
                                    <Divider/>
                                    <CardBody>
                                        <Input
                                            type="number"
                                            label="要購買的處理器"
                                            name="cpu"
                                            placeholder="0"
                                            value={value}
                                            endContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">%</span>
                                                </div>
                                            }
                                            isRequired
                                        />
                                    </CardBody>
                                    <Divider/>
                                    <CardFooter className="flex flex-col justify-center">
                                        <Chip color="primary">總價：{value * 5}</Chip>
                                        <br/>
                                        <Button color="success">
                                            創建
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
