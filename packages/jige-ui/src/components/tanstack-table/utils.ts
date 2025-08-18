import type { Header, HeaderGroup } from '@tanstack/solid-table';

/** Transforms the header to get rid of unnecessary empty cells */
export function getMergeHeaderGroups<T>(
  headerGroups: HeaderGroup<T>[]
): HeaderGroup<T>[] {
  if (headerGroups.length === 1) {
    return headerGroups;
  }
  const columnsIds = new Set();

  return headerGroups.map((group, depth, { length: fullDepth }) => ({
    ...group,
    headers: group.headers
      .filter((header) => !columnsIds.has(header.column.id)) // Ignore already merged columns
      .map((header): Header<T, unknown> => {
        columnsIds.add(header.column.id);
        return header.isPlaceholder
          ? {
              ...header,
              // If the cell is placeholder(empty), then there will be no subgroup below it,
              // and this means that you can merge it with all lower cells in the column header
              isPlaceholder: false,
              rowSpan: fullDepth - depth,
            }
          : { ...header, rowSpan: 1 };
      }),
  }));
}
