/**
 * supper simple paginator
 *
 * thanks for the idea from Hexo
 */

import context from "./context";
import { Pager } from "./pager";
import { Root } from "./root";

export const PaginatorCore = Object.assign(Root, {
  Pager,
  useContext: context.useContext,
});
