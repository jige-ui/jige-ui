function BigTitle() {
  return (
    <div class="pt-5 px-2 pb-2 w-full flex flex-col gap-2 items-center justify-center">
      <h1 class="text-4xl font-bold c-fg1">
        The powerful ui library for SolidJS
      </h1>
      <p class="text-lg text-fg3 text-center max-w-2xl">
        Explore the features and components of Jige UI. A comprehensive,
        accessible, and customizable component library built specifically for
        SolidJS.
      </p>
      <div class="mt-8 flex gap-4">
        <a
          class="px-6 py-3 bg-fg1 text-t-bg1 rounded-lg font-medium hover:opacity-90 transition-opacity"
          href="/components/button"
        >
          View Components
        </a>
        <a
          class="px-6 py-3 border border-t-border rounded-lg font-medium hover:bg-t-bg3 transition-colors"
          href="/installation"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <div class="space-y-12">
      <BigTitle />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="p-6 bg-t-bg2 rounded-lg border border-t-border">
          <h3 class="text-xl font-semibold mb-3 text-fg1">🚀 Fast & Modern</h3>
          <p class="text-fg3">
            Built with SolidJS for maximum performance and developer experience.
          </p>
        </div>

        <div class="p-6 bg-t-bg2 rounded-lg border border-t-border">
          <h3 class="text-xl font-semibold mb-3 text-fg1">♿ Accessible</h3>
          <p class="text-fg3">
            ARIA compliant components that work great with screen readers and
            keyboard navigation.
          </p>
        </div>

        <div class="p-6 bg-t-bg2 rounded-lg border border-t-border">
          <h3 class="text-xl font-semibold mb-3 text-fg1">🎨 Customizable</h3>
          <p class="text-fg3">
            Easily theme and customize components to match your design system.
          </p>
        </div>
      </div>

      <div class="prose prose-lg max-w-none">
        <h2 class="text-2xl font-bold text-fg1 mb-4">Quick Start</h2>
        <p class="text-fg3 mb-4">
          Get started with Jige UI in just a few steps:
        </p>

        <div class="bg-t-bg2 rounded-lg p-4 mb-6">
          <code class="text-sm">npm install jige-ui</code>
        </div>

        <p class="text-fg3">
          Then import and use components in your SolidJS application. Check out
          the
          <a class="text-fg-link hover:underline" href="/components/button">
            {' '}
            components section
          </a>
          to see all available components with examples and API documentation.
        </p>
      </div>
    </div>
  );
}
