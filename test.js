const { version } = require("./index");
// - case 1 : 获取当前版本号
console.log("current version:", version.current);

// - case 2 : 获取下一版本号
console.log("next version:", version.next);

// - case 3 : 更新版本号
console.log("注意: 测试更新版本号会更新package.json 中版本号,测试完后要恢复");
version.update(); // 参数 miniify => 是否压缩json
console.log("updated version:", version.current);
