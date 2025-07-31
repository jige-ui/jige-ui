import { Body } from './Body'
import { Cell } from './Cell'
import { Column } from './Column'
import { Footer } from './Footer'
import { Header } from './Header'
import { Root } from './Root'
import { Row } from './Row'

export const Table = Object.assign(Root, {
  Header,
  Body,
  Footer,
  Row,
  Cell,
  Column,
})
