/**
 * Playwright Web 应用测试工具函数
 */

/**
 * 等待条件为真，超时则抛出错误
 * @param {Function} condition - 返回 boolean 的函数
 * @param {number} timeout - 超时时间（毫秒）
 * @param {number} interval - 检查间隔（毫秒）
 */
async function waitForCondition(condition, timeout = 5000, interval = 100) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error("在超时时间内条件未满足");
}

/**
 * 捕获浏览器 console 日志
 * @param {Page} page - Playwright page 对象
 * @returns {Array} console 消息数组
 */
function captureConsoleLogs(page) {
  const logs = [];
  page.on("console", (msg) => {
    logs.push({
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString(),
    });
  });
  return logs;
}

/**
 * 获取自动命名的截图
 * @param {Page} page - Playwright page 对象
 * @param {string} name - 截图基础名称
 */
async function captureScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `${name}-${timestamp}.png`;
  await page.screenshot({ path: filename, fullPage: true });
  console.log(`截图已保存: ${filename}`);
  return filename;
}

module.exports = {
  waitForCondition,
  captureConsoleLogs,
  captureScreenshot,
};
