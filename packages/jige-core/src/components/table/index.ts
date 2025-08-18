import { Cell } from './cell';
import { Column, TableHeader } from './header';
import { Row } from './row';
import Root from './table';
import { TableBody } from './table-body';

export const TableCore = Object.assign(Root, {
  Body: TableBody,
  Header: TableHeader,
  Row,
  Cell,
  Column,
});
