"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Donation } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface Props {
  donationCount: number;
  newsCount: number;
  userCount: number;
  enrichedTopDonators: any;
  weeklyDonationList: any;
  totalDonaton: number;
}

const Analytics = ({
  donationCount,
  newsCount,
  userCount,
  enrichedTopDonators,
  weeklyDonationList,
  totalDonaton,
}: Props) => {
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    const transformedData = weeklyDonationList.map((donation: Donation) => {
      const month = new Date(donation.createAt).toLocaleString("default", {
        weekday: "long",
      });

      return { name: month, value1: donation.price };
    });

    setDonationData(transformedData);
  }, []);
  console.log(donationData, "donationData");

  const list = [
    { title: "Total Donations", value: `${totalDonaton} $` },
    { title: "Today's Donation", value: donationCount },
    { title: "Total News", value: newsCount },
    { title: "Total Users", value: userCount },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, Scrapper!</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {list.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <MoreHorizontal className="h-4 w-4" />
            </CardHeader>
            <CardBody>
              <div className="flex items-center space-x-2 mb-2">
                {item?.value}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h4>Donation Analytics</h4>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value1" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>PRICE</TableColumn>
            </TableHeader>
            <TableBody>
              {enrichedTopDonators.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.user?.name}</TableCell>
                  <TableCell>{item?.user?.email}</TableCell>
                  <TableCell>{item?._sum?.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
