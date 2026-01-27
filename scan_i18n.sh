#!/bin/bash

echo "正在扫描可见文本..."
rg -n --type-add 'tsx:*.tsx' -t tsx -g 'src/**/*.tsx' -e '>\s*[^<{][^<]*\S[^<]*\s*<' src > visible_text_results.txt

echo "正在扫描 UI 属性..."
rg -n --type-add 'tsx:*.tsx' -t tsx -g 'src/**/*.tsx' -e "(aria-label|title|placeholder|alt|label)=([\"'][^\"']*[\"'])" src > ui_attributes_results.txt

echo "正在扫描字符串常量..."
rg -n --type-add 'ts:*.ts' --type-add 'tsx:*.tsx' -t ts -t tsx -g 'src/**/*.{ts,tsx}' -e "([\"'][^\"']{2,}[\"'])" src > string_constants_results.txt

echo "扫描完成！结果已保存到 visible_text_results.txt, ui_attributes_results.txt, string_constants_results.txt"
