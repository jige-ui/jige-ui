import css from 'sass:./paginator.scss';
import { PaginatorCore } from 'jige-core';
import { createMemo, createSignal, Match, Show, Switch } from 'solid-js';
import { isNumber, mountStyle } from 'solid-tiny-utils';
import { dataIf } from '~/common/dataset';
import { isDef } from '~/common/types';
import IconFluentChevronDoubleLeft16Filled from '~icons/fluent/chevron-double-left-16-filled';
import IconFluentChevronDoubleRight16Filled from '~icons/fluent/chevron-double-right-16-filled';
import IconFluentChevronLeft24Regular from '~icons/fluent/chevron-left-24-regular';
import IconFluentChevronRight24Regular from '~icons/fluent/chevron-right-24-regular';
import IconFluentMoreHorizontal24Filled from '~icons/fluent/more-horizontal-24-filled';

function Pager(props: {
  page: number;
  currPage: number;
  onPageClick: (page: number) => void;
}) {
  const isCurrent = createMemo(() => props.page === props.currPage);

  return (
    <div
      class="jg-paginator-pager"
      data-checked={dataIf(isCurrent())}
      onClick={() => {
        !isCurrent() && props.onPageClick(props.page);
      }}
    >
      {props.page}
    </div>
  );
}

function PageArrow(props: {
  isLeft: boolean;
  onPageClick: (page: number) => void;
}) {
  const [state] = PaginatorCore.useContext();

  const disabled = createMemo(() => {
    if (props.isLeft) {
      return state.currPage === 1;
    }
    return state.currPage === state.totalPages;
  });

  return (
    <div
      class="jg-paginator-pager"
      data-disabled={dataIf(disabled())}
      onClick={() => {
        if (props.isLeft) {
          props.onPageClick(state.currPage - 1);
        } else {
          props.onPageClick(state.currPage + 1);
        }
      }}
      style={{
        color: 'var(--jg-fg3)',
      }}
    >
      <Show fallback={<IconFluentChevronRight24Regular />} when={props.isLeft}>
        <IconFluentChevronLeft24Regular />
      </Show>
    </div>
  );
}

function PagerBlank(props: {
  onPageClick: (page: number) => void;
  left: boolean;
  currPage: number;
}) {
  const [isHover, setIsHover] = createSignal(false);

  return (
    <div
      class="jg-paginator-pager-blank"
      onClick={() => {
        props.onPageClick(props.left ? props.currPage - 2 : props.currPage + 2);
      }}
      onKeyDown={() => {}}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Switch>
        <Match when={isHover()}>
          <Show
            fallback={<IconFluentChevronDoubleRight16Filled />}
            when={props.left}
          >
            <IconFluentChevronDoubleLeft16Filled />
          </Show>
        </Match>
        <Match when={!isHover()}>
          <IconFluentMoreHorizontal24Filled />
        </Match>
      </Switch>
    </div>
  );
}

export function Paginator(props: {
  currPage: number;
  total?: number;
  pageSize?: number;
  totalPage?: number;
  onPageClick: (page: number) => void;
  hideOnSinglePage?: boolean;
  disabled?: boolean;
}) {
  mountStyle(css, 'jige-ui-paginator');
  const shouldHide = createMemo(() => {
    const total = props.total;
    const pageSize = props.pageSize;
    const totalPage = props.totalPage;

    if (isDef(totalPage)) {
      return totalPage <= 1;
    }

    if (isDef(total) && isDef(pageSize)) {
      return total < pageSize;
    }

    return true;
  });

  const opacity = createMemo(() => {
    if (shouldHide()) {
      return 0;
    }
    if (props.disabled) {
      return 0.6;
    }
    return 1;
  });
  return (
    <div
      class="jg-paginator"
      style={{
        opacity: opacity(),
        'pointer-events': props.disabled ? 'none' : 'auto',
      }}
    >
      <PaginatorCore {...props}>
        <PageArrow isLeft onPageClick={props.onPageClick} />
        <PaginatorCore.Pager>
          {(page) => {
            return (
              <Show
                fallback={
                  <PagerBlank
                    currPage={props.currPage}
                    left={page === 'space-left'}
                    onPageClick={props.onPageClick}
                  />
                }
                when={isNumber(page)}
              >
                <Pager page={page as number} {...props} />
              </Show>
            );
          }}
        </PaginatorCore.Pager>
        <PageArrow isLeft={false} onPageClick={props.onPageClick} />
      </PaginatorCore>
    </div>
  );
}
