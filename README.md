# Docker ACR Demo

一个演示如何使用 GitHub Actions 和 Dockerfile 构建镜像并推送到阿里云容器镜像服务 (ACR) 的示例项目。

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── docker-build-push.yml  # GitHub Actions 工作流
├── app.js                          # Node.js 应用主文件
├── package.json                    # 项目依赖配置
├── Dockerfile                      # Docker 镜像构建文件
├── .dockerignore                   # Docker 构建忽略文件
├── healthcheck.js                  # 健康检查脚本
└── README.md                       # 项目说明文档
```

## 功能特性

- 🚀 基于 Node.js 18 Alpine 的轻量级 Docker 镜像
- 🔒 非 root 用户运行，增强安全性
- 🏥 内置健康检查机制
- 📦 多架构支持 (linux/amd64, linux/arm64)
- 🔄 GitHub Actions 自动化 CI/CD
- ☁️ 自动推送到阿里云 ACR

## 快速开始

### 本地开发

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问应用：
- 主页：http://localhost:3000
- 健康检查：http://localhost:3000/health
- API 信息：http://localhost:3000/api/info

### Docker 构建

1. 构建镜像：
```bash
docker build -t docker-acr-demo .
```

2. 运行容器：
```bash
docker run -p 3000:3000 docker-acr-demo
```

## 阿里云 ACR 配置

### 1. 创建 ACR 实例

1. 登录阿里云控制台
2. 进入容器镜像服务 ACR
3. 创建个人版或企业版实例
4. 创建命名空间

### 2. 获取访问凭证

1. 在 ACR 控制台获取：
   - 登录服务器地址（如：registry.cn-hangzhou.aliyuncs.com）
   - 用户名
   - 密码

### 3. 配置 GitHub Secrets

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：

- `ACR_USERNAME`: ACR 用户名
- `ACR_PASSWORD`: ACR 密码

### 4. 修改工作流配置

编辑 `.github/workflows/docker-build-push.yml` 文件中的环境变量：

```yaml
env:
  ACR_REGISTRY: registry.cn-hangzhou.aliyuncs.com  # 替换为你的 ACR 地址
  ACR_NAMESPACE: hubmirrhub                        # 替换为你的命名空间
  IMAGE_NAME: docker-acr-demo                      # 镜像名称
```

## GitHub Actions 工作流

工作流会在以下情况触发：
- 推送到 `main` 或 `master` 分支
- 创建标签（如 `v1.0.0`）
- 创建 Pull Request
- **手动触发** - 在 GitHub Actions 页面手动运行

### 手动触发工作流

1. 进入 GitHub 仓库页面
2. 点击 **Actions** 标签页
3. 选择 **Build and Push Docker Image to ACR** 工作流
4. 点击 **Run workflow** 按钮
5. 选择运行参数：
   - **部署环境**: 选择 `staging` 或 `production`
6. 点击 **Run workflow** 开始执行

手动触发时，镜像将自动使用当前 commit SHA 作为标签（格式：`分支名-commit哈希`）。

### 工作流步骤

1. **代码检出** - 获取最新代码
2. **Node.js 环境设置** - 安装 Node.js 18
3. **依赖安装** - 安装 npm 依赖
4. **测试运行** - 执行测试用例
5. **Docker Buildx 设置** - 配置多架构构建
6. **ACR 登录** - 使用凭证登录阿里云 ACR
7. **元数据提取** - 生成镜像标签和标签
8. **镜像构建和推送** - 构建并推送到 ACR
9. **部署通知** - 显示构建结果

## 镜像标签策略

- `latest` - 主分支最新版本
- `v1.0.0` - 语义化版本标签
- `main-abc1234` - 分支名-提交哈希
- `pr-123` - Pull Request 编号

## API 端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/` | GET | 主页信息 |
| `/health` | GET | 健康检查 |
| `/api/info` | GET | 应用信息 |

## 环境变量

| 变量名 | 默认值 | 描述 |
|--------|--------|------|
| `PORT` | 3000 | 应用端口 |
| `NODE_ENV` | development | 运行环境 |

## 故障排除

### 常见问题

1. **ACR 登录失败**
   - 检查 GitHub Secrets 配置
   - 验证 ACR 凭证是否正确
   - 确认 ACR 实例状态正常

2. **镜像推送失败**
   - 检查命名空间是否存在
   - 验证镜像仓库权限
   - 查看 GitHub Actions 日志

3. **健康检查失败**
   - 确认应用正常启动
   - 检查端口配置
   - 查看容器日志

### 查看日志

```bash
# 查看容器日志
docker logs <container_id>

# 实时查看日志
docker logs -f <container_id>
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 相关链接

- [阿里云容器镜像服务 ACR](https://www.aliyun.com/product/acr)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Docker 官方文档](https://docs.docker.com/)
- [Node.js 官方网站](https://nodejs.org/)