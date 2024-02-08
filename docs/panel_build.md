# 面板搭建

本节主要是适用于面板的搭建。

## 开始

请自行学习：

- 如何暴露你的本地服务到公网
- 如何暴露为你的公网服务绑定域名

:::tip

请注意，如果你不会搭建，可以使用 宝塔 面板。你可以在 宝塔 的 网站/其他项目 中一键暴露服务到公网、绑定域名和申请 TLS。

:::

## 搭建

- 新建一个目录用于存放 SoruxGPT

```bash
cd ~ # 切换到根目录
mkdir SoruxGPT 
cd SoruxGPT # 切换到 SoruxGPT 目录
mkdir data # 存放你的数据，挂载到容器内
```

- 编辑 docker-compose.yml

在 `SoruxGPT` 目录下新建文件 `docker-compose.yml`

```yaml
version: "3.9"
services:
  redis:
    container_name: "SoruxGPT-Redis"
    image: redis
    restart: unless-stopped
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 10s
      timeout: 5s
      retries: 3
  jaeger:
    container_name: "SoruxGPT-Jaeger"
    image: jaegertracing/all-in-one
    environment:
      - COLLECTOR_OTLP_ENABLED=true
    # 如果你不需要使用链路追踪，请注释这些端口
    #ports:
    #  - "16686:16686"
    #  - "14268:14268"
    #  - "14250:14250"
    #  - "6831:6831"
    healthcheck:
      test: [ "CMD-SHELL", "wget --spider -q http://localhost:16686/search || exit 1" ]
      interval: 10s
      timeout: 5s
      retries: 3
  sorux-gpt:
    container_name: "SoruxGPT"
    image: "epicmo/soruxgpt_community:latest"
    ports:
      - "5700:8080"
    env_file:
      - .env.docker.compose
    volumes:
      - "./data:/sorux/gpt/data"
    depends_on:
      redis:
        condition: service_healthy
      jaeger:
        condition: service_healthy
volumes:
  share-volume:
```

:::tip

jaeger 你可以理解为一个日志在线查看软件，如果你不需要，可以不用管

:::

- 新建配置文件

在 `SoruxGPT` 目录下，新建 `.env.docker.compose` 文件：

```bash
# Configure Log settings
# Optional values：DEBUG, INFO, WARN, ERROR, FATAL, TRACE, default as INFO
LOG_LEVEL=INFO
# Configure log redirect to file, for conveniently collect log file
# Optional values: enable, disable, default as disable
LOG_REDIRECT_TO_FILE=disable
# Configure log output dir, default as /var/log/sorux/gpt, have effect, when LogRedirectToFile is equal to enable
LOG_PATH=/var/log/sorux/gpt
# Configure the trace with state
LOGGER_WITH_TRACE_STATE=enable
# Otel settings
LOGGER_WITH_TRACE_STATE=disable
OTEL_SAMPLER=0.01
TracingEndPoint=jaeger:4318
# Configure backend running port
BINDING_BACKEND_PORT=5700
REDIS_ADDR=redis:6379
```

- 运行容器

```bash
docker-compose up -d
```

此时，你可以通过 `docker ps` 查看容器状态，此时容器组应该被运行了，恭喜你搭建成功。

:::tip
初始账号为：admin，初始密码为：admin
:::