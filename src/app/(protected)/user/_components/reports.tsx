import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const requests = [
  { id: 1, type: "PICKUP", status: "PENDING", date: "2023-06-01" },
  { id: 2, type: "SCANNING", status: "IN_PROGRESS", date: "2023-06-02" },
  { id: 3, type: "RETRIEVAL", status: "COMPLETED", date: "2023-06-03" },
  { id: 4, type: "SHREDDING", status: "PENDING", date: "2023-06-04" },
];

export const Reports = () => {
  return (
    <div>
      <div className=" flex justify-between items-start py-4 ">
        <h2 className="text-2xl font-semibold mb-4">Your Requests</h2>
        <Button variant="outline" asChild>
          <Link href={"/user/request"} className="text-green-500">
            Create Request
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
