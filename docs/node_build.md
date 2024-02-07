---
outline: deep
---

# 节点搭建

本节主要是说明如何搭建节点。

:::tip

未来版本即将支持自动部署节点。

:::

## 搭建教程

- 选择一个目录

```bash
cd ~
mkdir node
cd node
mkdir config
```

- 新建 Docker-Compose 配置：

```yaml
version: '3'
services:
  cockroachai:
    image: epicmo/soruxgpt_node:latest
    restart: always
    ports:
      - "9000:9000"
    volumes:
      - ./config:/app/config
    environment:
      ASSET_PREFIX: https://oaistatic-cdn.closeai.biz
```

- 新建配置文件：

在 `config` 目录下，新建 `config.yaml`

```yaml
OAUTH_URL: "https://{SoruxGPT 域名}/api/oauth?client_tag={代理这个节点的域名}"
LOGIN_CALLBACK: "https://{SoruxGPT 域名}/login"
ADMIN_PASSWORD: "{管理员密码}"
AUDIT_LIMIT_URL: "https://{SoruxGPT 域名}/api/audit?client_tag={代理这个节点的域名}"

cool:
  autoMigrate: true

# sqlite数据库配置
database:
  default:
    type: "sqlite" # 数据库类型
    name: "./config/cool.sqlite" # 数据库名称,对于sqlite来说就是数据库文件名
    extra: busy_timeout=5000 # 扩展参数 如 busy_timeout=5000&journal_mode=ALL
    createdAt: "create_time" # 创建时间字段名称
    updatedAt: "update_time" # 更新时间字段名称
    # debug : true # 开启调试模式,启用后将在控制台打印相关sql语句
```

:::tip

- SoruxGPT 域名：你的面板域名，他应该是类似于 `panel.ai.com` 这个样子的。
- 代理这个节点的域名：这个节点所在的域名，他应该是类似于 `node.ai.com` 这个样子的。
- 管理员密码：这个节点的管理员密码，他应该是你的密码

:::

- 运行程序

```bash
docker-compose up -d
```

此时，输入 `docker ps` ，如果发现容器正在运行，恭喜你搭建成功！

## 后续工作

- 绑定域名：请为你的容器绑定一个域名，并且使用 TLS 证书，对于这个例子，你可以通过 `https://node.ai.com` 访问你的程序
- 绑定节点：请在 SoruxGPT 中的 节点管理/新建节点中，新建你的节点。请注意，节点链接填写为 `node.ai.com` 而不是带有 `https/http` 前缀。

:::tip

你必须填写其中的节点描述信息，我们认为对一个节点进行适当的描述是恰当的。

:::