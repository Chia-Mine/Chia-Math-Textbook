import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mathematics of Chia',
  tagline: 'A web textbook for the mathematics behind the Chia blockchain',
  favicon: 'img/favicon.svg',

  url: 'https://example.com',
  baseUrl: '/',

  organizationName: 'chia-math-textbook',
  projectName: 'mathematics-of-chia',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/chia-math-textbook/mathematics-of-chia/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Mathematics of Chia',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'textbookSidebar',
          position: 'left',
          label: 'Textbook',
        },
        {
          href: 'https://www.chia.net/',
          label: 'Chia Network',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Textbook',
          items: [
            {
              label: 'Start Reading',
              to: '/docs/00-preface/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Chia Network',
              href: 'https://www.chia.net/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mathematics of Chia contributors.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
