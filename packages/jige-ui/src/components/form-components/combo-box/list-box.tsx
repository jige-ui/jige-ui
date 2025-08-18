import { dataIf, FloatingUiCore } from 'jige-core';
import { createWatch } from 'solid-tiny-utils';
import { RootContext } from '~/components/root/context';
import { Listbox as LB } from '../../listbox';
import { context } from './context';

export function ListBox(props: { size: 'small' | 'medium' | 'large' }) {
  const [rootState] = RootContext.useContext();
  const [state, actions] = context.useContext();

  const [floatState, floatActs] = FloatingUiCore.useContext();

  const calcOffset = (scrollTop: number) => {
    if (state.valueIndex === -1) {
      return 0;
    }
    const totalHeight = state.valueIndex * state.listItemHeight;
    const toTop = totalHeight - scrollTop + state.listItemHeight;
    return -toTop - 8;
  };

  const calcOriginY = (scrollTop: number) => {
    if (state.valueIndex === -1) {
      return 0;
    }
    const totalHeight = state.valueIndex * state.listItemHeight;
    return totalHeight - scrollTop;
  };

  createWatch(
    () => [floatState.status] as const,
    ([s]) => {
      if (s === 'opening') {
        console.log('s');

        actions.setState('isCalculating', true);
        const height = state.refTrigger?.clientHeight || 20;
        const width = state.refTrigger?.clientWidth || 200;
        actions.setState('listItemHeight', height + 4);
        actions.setState('listItemWidth', width + 2);
        if (!state.editable) {
          const totalHeight = state.valueIndex * state.listItemHeight;
          const floatHeight = floatState.refContent?.clientHeight || 0;
          const scrollTop = Math.max(
            0,
            totalHeight - floatHeight / 2 + state.listItemHeight / 2
          );
          actions.setState('offset', calcOffset(scrollTop));
          actions.setState('originY', calcOriginY(scrollTop));
          actions.setState('scrollTop', scrollTop);
        }

        actions.setState('isCalculating', false);
      }

      if (s === 'closed' && state.editable) {
        actions.setState('editableValue', state.valueLabel);
      }
    }
  );

  return (
    <FloatingUiCore.Content
      class="jg-combo-box-list"
      data-large={dataIf(props.size === 'large')}
      data-medium={dataIf(props.size === 'medium')}
      data-small={dataIf(props.size === 'small')}
      style={{
        '--jg-combo-box-list-transform-origin': `center ${state.originY - floatState.middlewareData.shift.y}px`,
        width: `${state.listItemWidth}px`,
        opacity: state.isCalculating ? 0 : 1,
      }}
      zindex={rootState.zIndexConfig.popover}
    >
      <LB
        class="jg-combo-box-scrollarea"
        fallback={
          <div class="jg-combo-box-empty">
            {state.editable ? '没有匹配的选项' : '没有选项'}
          </div>
        }
        itemClass="jg-combo-box-item"
        items={state.realOptions}
        onSelect={(item) => {
          actions.setState('value', item.value);
          floatActs.setOpen(false);
        }}
        preventFocus={state.editable}
        rootHeight={240}
        rowHeight={state.listItemHeight}
        scrollTop={state.scrollTop + floatState.middlewareData.shift.y}
        scrollToSelected={false}
        selectIndex={state.realOptionIndex}
        selectTrigger="click"
      >
        {(item) => <div class="jg-combo-box-item-inner">{item.label}</div>}
      </LB>
    </FloatingUiCore.Content>
  );
}
