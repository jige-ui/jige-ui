import { Root } from './Root'
import { Footer } from './Footer'
import { Body } from './Body'
import { Row } from './Row'
import { Cell } from './Cell'
import { Column } from './Column'
import { Header } from './Header'

export const Table = Object.assign(Root, {
  Header,
  Body,
  Footer,
  Row,
  Cell,
  Column,
})
