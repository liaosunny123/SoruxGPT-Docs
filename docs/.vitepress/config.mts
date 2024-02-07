import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SoruxGPT Document",
  description: "SoruxGPT 官网文档描述网站",
  base: "/SoruxGPT-Docs/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '使用教程', link: '/concepts' },
      { text: '联系我们', link: '/contacts' }
    ],

    sidebar: [
      {
        text: '基础说明',
        items: [
          { text: '基本概念', link: '/concepts' },
          { text: '许可证说明', link: '/license' },
        ]
      },
      {
        text: '搭建说明',
        items: [
          { text: '面板搭建', link: '/panel_build' },
          { text: '节点搭建', link: '/node_build' },
        ]
      },
      {
        text: '注意事项',
        items: [
          { text: '常见问题', link: '/faq' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liaosunny123/Sorux-GPT-Panel' }
    ]
  }
})
