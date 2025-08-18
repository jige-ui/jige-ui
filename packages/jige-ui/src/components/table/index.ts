import { Body } from './body';
import { Cell } from './cell';
import { Column } from './column';
import { Footer } from './footer';
import { Header } from './header';
import { Root } from './root';
import { Row } from './row';

export const Table = Object.assign(Root, {
  Header,
  Body,
  Footer,
  Row,
  Cell,
  Column,
});
