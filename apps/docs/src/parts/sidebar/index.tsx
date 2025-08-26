import { useLocation } from '@solidjs/router';
import { Scrollbar } from 'jige-ui';
import { For } from 'solid-js';

export interface SideLink {
  title: string;
  href: string;
  status?: 'new' | 'updated' | 'unreleased';
}

export interface SideSection {
  title: string;
  links: SideLink[];
}

export function Sidebar(props: { sections: SideSection[] }) {
  const location = useLocation();

  const isActive = (href: string) => {
    return (
      location.pathname === href ||
      (href !== '/' && location.pathname.startsWith(href))
    );
  };

  const getStatusClasses = (status: string) => {
    if (status === 'new') {
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    }
    if (status === 'updated') {
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
    return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
  };

  return (
    <aside class="bg-t-bg2 border-r border-t-border w-64 h-full">
      <Scrollbar>
        <div class="p-4">
          <nav class="space-y-6">
            <For each={props.sections}>
              {(section) => (
                <div>
                  <h3 class="text-sm font-semibold text-fg2 uppercase tracking-wide mb-3">
                    {section.title}
                  </h3>
                  <ul class="space-y-1">
                    <For each={section.links}>
                      {(link) => (
                        <li>
                          <a
                            class={`
                            block px-3 py-2 text-sm rounded-md transition-colors duration-200
                            hover:bg-t-bg3 hover:text-fg1
                            ${
                              isActive(link.href)
                                ? 'bg-t-bg3 text-fg1 font-medium'
                                : 'text-fg3'
                            }
                          `}
                            href={link.href}
                          >
                            <div class="flex items-center justify-between">
                              <span>{link.title}</span>
                              {link.status && (
                                <span
                                  class={`
                                  text-xs px-1.5 py-0.5 rounded-full font-medium
                                  ${getStatusClasses(link.status)}
                                `}
                                >
                                  {link.status}
                                </span>
                              )}
                            </div>
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              )}
            </For>
          </nav>
        </div>
      </Scrollbar>
    </aside>
  );
}

// Default sections for the documentation
export const defaultSections: SideSection[] = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Overview', href: '/' },
      { title: 'Installation', href: '/installation' },
      { title: 'Quick Start', href: '/quick-start' },
    ],
  },
  {
    title: 'Components',
    links: [
      { title: 'Button', href: '/components/button' },
      { title: 'Collapse', href: '/components/collapse' },
      { title: 'Dialog', href: '/components/dialog' },
      { title: 'Drawer', href: '/components/drawer' },
      { title: 'Form', href: '/components/form' },
      { title: 'Form Components', href: '/components/form-components' },
      { title: 'Listbox', href: '/components/listbox' },
      { title: 'Modal', href: '/components/modal' },
      { title: 'Paginator', href: '/components/paginator' },
      { title: 'Pop Confirm', href: '/components/pop-confirm' },
      { title: 'Popover', href: '/components/popover' },
      { title: 'Progress', href: '/components/progress' },
      { title: 'Scrollbar', href: '/components/scrollbar' },
      { title: 'Skeleton', href: '/components/skeleton' },
      { title: 'Spin', href: '/components/spin' },
      { title: 'Table', href: '/components/table' },
      { title: 'Tabs', href: '/components/tabs' },
      {
        title: 'TanStack Table',
        href: '/components/tanstack-table',
        status: 'new',
      },
      { title: 'Toast', href: '/components/toast' },
      { title: 'Tooltip', href: '/components/tooltip' },
    ],
  },
  {
    title: 'Advanced',
    links: [
      { title: 'Theming', href: '/theming' },
      { title: 'Customization', href: '/customization' },
      { title: 'TypeScript', href: '/typescript' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Migration Guide', href: '/migration' },
      { title: 'Contributing', href: '/contributing' },
      { title: 'About', href: '/about' },
    ],
  },
];
