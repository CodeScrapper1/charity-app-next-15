"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  User,
  Pagination,
  Image,
} from "@nextui-org/react";
import CreateUpdateNew from "./CreateUpdateNew";
import { Edit2, Plus, Search, Trash } from "lucide-react";
import { News } from "@prisma/client";
import DeleteNews from "./DeleteNews";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "IMAGE", uid: "image", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DESCRIPTION", uid: "description", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export default function NewsTable({ news }: { news: News[] }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Set<any>>(new Set([]));

  const [sortDescriptor, setSortDescriptor] = React.useState<
    { column: string; direction: string } | any
  >({
    column: "age",
    direction: "ascending",
  });
  const rowsPerPage = 5;
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredNews = [...news];

    if (hasSearchFilter) {
      filteredNews = filteredNews.filter((user) =>
        user.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredNews;
  }, [news, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((blog: any, columnKey: any) => {
    const cellValue = blog[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: blog.avatar }}
            description={blog.email}
            name={cellValue}
          >
            {blog.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {blog.team}
            </p>
          </div>
        );
      case "image":
        return (
          <div className="">
            <Image src={cellValue} alt="" width={200} />
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <CreateUpdateNew
              trigger={
                <span className="flex items-center bg-yellow-500 px-4 justify-center h-full w-full text-white">
                  <Edit2 size={18} />
                </span>
              }
              title="Edit News"
              item={blog}
            />
            <DeleteNews
              trigger={
                <span className="flex items-center bg-red-500 px-4 justify-center h-full w-full text-white">
                  <Trash size={18} />
                </span>
              }
              title="Delete News"
              id={blog?.id}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <CreateUpdateNew
            trigger={
              <span className="flex items-center gap-2 bg-primary-400 px-4 h-full text-white">
                Add News <Plus size={18} />
              </span>
            }
            title="Create News"
          />
        </div>
      </div>
    );
  }, [filterValue, news.length, onSearchChange, hasSearchFilter]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.has("all")
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={(value: any) => setSelectedKeys(value)}
      onSortChange={(value: any) => setSortDescriptor(value)}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
