import {
  callMaybeContextChild,
  combineStyle,
  ModalCore,
  undefinedOr,
} from 'jige-core';
import { createSignal, Show } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { createWatch } from 'solid-tiny-utils';
import { RootContext } from '../root/context';
import { context } from './context';
import { Footer } from './footer';
import { Header } from './header';

function calcOrigin(triggerRef: HTMLElement, contentRef: HTMLElement) {
  contentRef.style.animationName = 'none';
  const triggerRect = triggerRef.getBoundingClientRect();
  const contentRect = contentRef.getBoundingClientRect();
  contentRef.style.animationName = '';

  const getCenter = (rect: DOMRect) => ({
    x: rect.left + (rect.right - rect.left) / 2,
    y: rect.top + (rect.bottom - rect.top) / 2,
  });

  const centerTrigger = getCenter(triggerRect);
  const centerContent = getCenter(contentRect);

  const originX = centerTrigger.x - centerContent.x + contentRect.width / 2;
  const originY = centerTrigger.y - centerContent.y + contentRect.height / 2;

  return [originX, originY];
}

export function Content(props: {
  children: Parameters<typeof ModalCore.Content>['0']['children'];
  dynamicTransformOrigin?: boolean;
  style?: string | JSX.CSSProperties;
  zIndex?: number;
  width?: string;
  title?: string;
  header?: JSX.Element;
  hideClose?: boolean;
  footer?: JSX.Element;
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}) {
  const [state, actions] = context.useContext();
  const [rs] = RootContext.useContext();
  return (
    <ModalCore.Portal>
      <ModalCore.Mask
        class="jg-modal-mask"
        style={{
          'z-index': undefinedOr(props.zIndex, rs.zIndexConfig.modal),
        }}
      />
      <ModalCore.Content
        class="jg-modal-content-wrapper"
        style={{
          'z-index': undefinedOr(props.zIndex, rs.zIndexConfig.modal),
        }}
      >
        {(stat, acts, staticData) => {
          const [transformOrigin, setTransformOrigin] = createSignal('');
          createWatch(
            () => stat.status,
            (status) => {
              if (
                status === 'opened' ||
                status === 'closed' ||
                props.dynamicTransformOrigin === false
              ) {
                setTransformOrigin('center center');
                return;
              }
              const { triggerRef, contentRef } = state;

              if (!(triggerRef?.isConnected && contentRef)) {
                setTransformOrigin('center center');
                return;
              }
              const [originX, originY] = calcOrigin(triggerRef, contentRef);
              setTransformOrigin(`${originX}px ${originY}px`);
            }
          );

          return (
            <div
              class="jg-modal-content"
              data-modal-status={stat.status}
              ref={(el) => {
                actions.setState('contentRef', el);
              }}
              style={combineStyle(
                {
                  'transform-origin': transformOrigin(),
                  width: props.width || '520px',
                  top: '100px',
                  position: 'relative',
                },
                props.style
              )}
            >
              <Show when={props.header !== null}>
                <Header hideClose={props.hideClose} label={props.title}>
                  {props.header}
                </Header>
              </Show>
              {callMaybeContextChild([stat, acts, staticData], props.children)}
              <Show when={props.footer !== null}>
                <Footer
                  cancelText={props.cancelText}
                  okText={props.okText}
                  onCancel={props.onCancel}
                  onOk={props.onOk}
                >
                  {props.footer}
                </Footer>
              </Show>
            </div>
          );
        }}
      </ModalCore.Content>
    </ModalCore.Portal>
  );
}
