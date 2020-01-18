const fs = require("fs");
const DEFAULT_VERSION = "0.0.1"; // 默认最小版本号
const { packageJsonPath } = require("project-base-path");
const version = {
  PACKAGE_PATH: packageJsonPath,
  read() {
    if (!this.PACKAGE_PATH) throw "'package.json' is not found.";
    let origin = fs.readFileSync(this.PACKAGE_PATH, { encoding: "utf8" });
    try {
      return JSON.parse(origin);
    } catch (e) {
      throw `'package.json' check json is fail`;
    }
  },
  write(packageJson, miniify) {
    let output = miniify ? JSON.stringify(packageJson) : JSON.stringify(packageJson, null, 2);
    try {
      fs.writeFileSync(this.PACKAGE_PATH, output, { encoding: "utf8" });
    } catch (error) {
      console.error(error);
    }
  },
  /** 获取当前版本号 */
  get current() {
    let packageJson = this.read();
    if (packageJson.version) return packageJson.version;
    else return null;
  },
  get next() {
    let version = this.current;
    if (!version) return DEFAULT_VERSION;
    version = version.split(".").map(c => parseInt(c));
    for (let n = version.length - 1, ad = 0; n >= 0; n--) {
      if (version[n] + ad + 1 > 9) {
        if (n == 0) {
          version[n] = version[n] + ad + 1;
        } else {
          ad = version[n] + ad - 9;
          version[n] = 0;
        }
      } else {
        version[n] = version[n] + ad + 1;
        ad = 0;
        break;
      }
    }
    return version.join(".");
  },
  update(miniify = false) {
    let packageJson = this.read();
    if (!packageJson) return;
    packageJson.version = this.next;
    this.write(packageJson, miniify);
    return this.current;
  }
};
module.exports = { version };
