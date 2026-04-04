#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const versionMdPath = path.join(process.cwd(), 'version.md');

if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found in the current directory.');
  process.exit(1);
}

if (!fs.existsSync(versionMdPath)) {
  console.error('Error: version.md not found in the current directory.');
  process.exit(1);
}

const packageJson = require(packageJsonPath);
const version = packageJson.version;

if (!version) {
  console.error('Error: "version" field not found in package.json.');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`\n=== 自动生成更新日志模板 (当前版本: V${version}) ===\n`);

rl.question('请输入变更类型 (feat/fix/docs/ui/chore/refactor/remove/test) [默认: feat]: ', (typeInput) => {
  const type = typeInput.trim() || 'feat';
  
  rl.question('请输入作用域 (如 i18n/components/pages/config 等) [可选]: ', (scopeInput) => {
    const scope = scopeInput.trim() ? `(${scopeInput.trim()})` : '';
    
    rl.question('请输入简短的提交说明 (1句话，将作为标题): ', (descInput) => {
      if (!descInput.trim()) {
        console.error('错误: 说明不能为空');
        rl.close();
        process.exit(1);
      }
      
      const desc = descInput.trim();
      const title = `V${version} ${type}${scope}: ${desc}`;
      
      const template = `
${title}

类型: ${type}

范围: ${scopeInput.trim() || '未指定'}

说明:
(在此处详细描述本次更新的背景和目的)

实现细节:

1. **(细节标题1)**
   - (细节说明)

文件变更:
修改文件:
- \`文件名\` (变更说明)

改进效果:
- (列出改进效果)

影响范围:
- (列出影响范围，是否兼容等)

---
`;

      try {
        let content = fs.readFileSync(versionMdPath, 'utf8');
        
        const insertMarker = '---\n';
        let count = 0;
        let insertionPoint = -1;
        let index = content.indexOf(insertMarker);
        
        while (index !== -1) {
            count++;
            if (count === 3) {
                insertionPoint = index + insertMarker.length;
                break;
            }
            index = content.indexOf(insertMarker, index + insertMarker.length);
        }
        
        if (insertionPoint !== -1) {
          
          const newContent = content.slice(0, insertionPoint) + template + content.slice(insertionPoint);
          
          fs.writeFileSync(versionMdPath, newContent, 'utf8');
          console.log('\n✅ 模板已成功插入到 version.md 顶部！');
          console.log('请打开 version.md 并填写具体的更新细节内容。');
        } else {
          console.error('\n❌ 无法在 version.md 中找到合适的插入点。请确保文件保留了头部的分割线 "---"。');
        }
      } catch (err) {
        console.error('\n❌ 处理 version.md 时出错:', err);
      }
      
      rl.close();
    });
  });
});
