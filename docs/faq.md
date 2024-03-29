---
outline: deep
---

# 常见问题

## 为什么我更新后无法前端无法显示更改？

如果你使用的是 宝塔等程序，或者也出现了类似的状况，请尝试进行以下操作：

1. 删除你的 nginx 缓存，我们拿宝塔举例：

```bash
rm -rf /www/server/nginx/proxy_*
```

2. 重启 nginx 

## 为什么我给用户新增节点后访问节点提示 "WebCode 无效"？

用户需要通过一次退出登录来刷新许可证，如果你修改了某个用户的使用权限，他需要在 SoruxGPT 面板退出后才能生效。

## 为什么我新增节点后访问提示 "Code为500，且无状态信息"？

请检查你的节点配置中的面板请求地址。这可能是因为你面板并没有使用 TLS 证书（开启HTTPS），而你的节点配置里面填写的是 https://xxx。

## 为什么我点击跳转后经过了一次 URL 地址的转换，并且提示 "WebCode 无效"？

这是因为你的 client_tag 和实际域名不一致。例如，你申请节点的证书是 node.com，而你在面板内新增的节点地址是 a.node.com。