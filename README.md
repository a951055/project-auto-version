# project-base-path

> `description` 项目内任意子目录获取项目basePath和指定文件绝对路径

---
### usage

```
const { version } = require("package-auto-version");

// - case 1 : 获取当前版本号
console.log("current version:", version.current);f

// - case 2 : 获取下一版本号
console.log("next version:", version.next);

// - case 3 : 更新版本号
console.log("注意: 测试更新版本号会更新package.json 中版本号,测试完后要恢复");
version.update(); // 参数 miniify => 是否压缩json
console.log("updated version:", version.current);

```

---
### test
> exec `yarn test`