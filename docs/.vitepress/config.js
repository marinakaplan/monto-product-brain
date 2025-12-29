import { defineConfig } from 'vitepress'

export default defineConfig({
  ignoreDeadLinks: true,
  base: '/monto-product-brain/',
  title: 'Product Brain',
  description: 'Monto AI-Powered Product Knowledge Base',
  
  // Clean URLs
  cleanUrls: true,
  
  // Head tags
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#7B59FF' }],
    ['meta', { property: 'og:title', content: 'Monto Product Brain' }],
    ['meta', { property: 'og:description', content: 'AI-Powered Product Knowledge Base' }],
  ],
  
  // Theme config
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Product Brain',
    
    // Navigation bar
    nav: [
      { text: 'Dashboard', link: '/' },
      { 
        text: 'Platforms',
        items: [
          { text: 'User Platform', link: '/user-platform/' },
          { text: 'Backoffice', link: '/backoffice/' },
        ]
      },
      { text: 'Analysis', link: '/analysis/' },
      { text: 'Suggestions', link: '/suggestions/' }
    ],
    
    // Sidebar
    sidebar: {
      '/user-platform/': [
        {
          text: 'User Platform',
          items: [
            { text: 'Overview', link: '/user-platform/' },
            { 
              text: 'Personas',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/user-platform/personas/' },
                { text: 'Solo Supplier', link: '/user-platform/personas/solo-supplier' },
                { text: 'Supplier Admin', link: '/user-platform/personas/supplier-admin' },
                { text: 'Occasional User', link: '/user-platform/personas/occasional-user' }
              ]
            },
            { 
              text: 'User Flows',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/user-platform/flows/' },
                { text: 'Invoice Submission', link: '/user-platform/flows/invoice-submission' },
                { text: 'Exception Resolution', link: '/user-platform/flows/exception-resolution' }
              ]
            },
            { 
              text: 'Inventory',
              collapsed: true,
              items: [
                { text: 'Pages', link: '/user-platform/inventory/pages' },
                { text: 'Components', link: '/user-platform/inventory/components' },
                { text: 'APIs', link: '/user-platform/inventory/apis' }
              ]
            }
          ]
        }
      ],
      
      '/backoffice/': [
        {
          text: 'Backoffice',
          items: [
            { text: 'Overview', link: '/backoffice/' },
            { 
              text: 'Personas',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/backoffice/personas/' },
                { text: 'BO Agent', link: '/backoffice/personas/bo-agent' },
                { text: 'BO Manager', link: '/backoffice/personas/bo-manager' }
              ]
            },
            { 
              text: 'User Flows',
              collapsed: false,
              items: [
                { text: 'Overview', link: '/backoffice/flows/' },
                { text: 'Daily Review', link: '/backoffice/flows/daily-review' },
                { text: 'Exception Management', link: '/backoffice/flows/exception-management' }
              ]
            },
            { 
              text: 'Inventory',
              collapsed: true,
              items: [
                { text: 'Pages', link: '/backoffice/inventory/pages' },
                { text: 'Components', link: '/backoffice/inventory/components' },
                { text: 'APIs', link: '/backoffice/inventory/apis' }
              ]
            }
          ]
        }
      ],
      
      '/analysis/': [
        {
          text: 'Analysis',
          items: [
            { text: 'Overview', link: '/analysis/' },
            { text: 'Edge Cases', link: '/analysis/edge-cases' },
            { text: 'Gap Analysis', link: '/analysis/gaps' }
          ]
        }
      ],
      
      '/suggestions/': [
        {
          text: 'Suggestions',
          items: [
            { text: 'Overview', link: '/suggestions/' },
            { text: 'Quick Wins', link: '/suggestions/quick-wins' },
            { text: 'Improvements', link: '/suggestions/improvements' },
            { text: 'New Features', link: '/suggestions/features' }
          ]
        }
      ]
    },
    
    // Search
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },
    
    // Footer
    footer: {
      message: 'Auto-updated by AI Agents',
      copyright: 'Monto © 2024'
    },
    
    // Last updated
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    
    // Edit link (optional - remove if you don't want this)
    // editLink: {
    //   pattern: 'https://github.com/your-org/monto-product-brain/edit/main/docs/:path',
    //   text: 'Edit this page'
    // },
    
    // Outline
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    
    // Doc footer
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    
    // Return to top
    returnToTopLabel: 'Back to top',
    
    // Dark mode switch label
    darkModeSwitchLabel: 'Theme',
    darkModeSwitchTitle: 'Switch theme'
  },
  
  // Markdown config
  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
