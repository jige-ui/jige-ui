import { debounce } from '@solid-primitives/scheduled';
import { esday } from 'esday';
import { For } from 'solid-js';
import { createWatch, isFn, list } from 'solid-tiny-utils';
import { dataIf } from '~/common/dataset';
import { dayes } from '~/common/dayes';
import type { MaybePromise } from '~/common/types';
import { NumberToChinese } from '../utils';
import { panelContext } from './context';

export function MonthPanel(props: {
  highlightMonths: string[] | ((visibleYear: number) => MaybePromise<string[]>);
}) {
  const [state, actions] = panelContext.useContext();
  const debounceSetHlMonths = debounce(async (y: number) => {
    const getHls = props.highlightMonths;
    if (isFn(getHls)) {
      const mons = await getHls(y);
      actions.setState('hlMonths', mons);
    } else {
      actions.setState('hlMonths', getHls);
    }
  }, 200);

  const isHl = (m: number) => {
    const inst = esday().year(state.currYear).month(m);

    return state.hlMonths.includes(inst.format('YYYY-MM'));
  };

  const checkMonth = (month: number) => {
    const year = state.currYear;
    const inst = esday().year(year).month(month);
    return inst >= state.fromInst && inst <= state.toInst;
  };

  createWatch(() => state.currYear, debounceSetHlMonths);
  return (
    <div class="jg-dp-month-panel">
      <For each={list(11)}>
        {(month) => (
          <div
            class="jg-dp-month-panel-month"
            classList={{
              'jg-dp-month-panel-month-hl': isHl(month),
            }}
            data-disabled={dataIf(!checkMonth(month))}
            data-selected={dataIf(
              dayes(state.value).month() === month &&
                dayes(state.value).year() === state.currYear
            )}
            onClick={() => {
              if (!checkMonth(month)) {
                return;
              }
              actions.setCurrMonth(month);
              actions.setActivePanel(state.defaultPanel);
              if (state.defaultPanel === 'month') {
                actions.setValue([
                  dayes([state.currYear, month, 1]).format('YYYY-MM-DD'),
                ]);
              }
            }}
            onKeyDown={() => {}}
          >
            {NumberToChinese(month + 1)}月
          </div>
        )}
      </For>
    </div>
  );
}
