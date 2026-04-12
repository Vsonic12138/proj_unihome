const fs = require('fs');

const content = fs.readFileSync('public/images/logo/logo-2.svg', 'utf8');
const match = content.match(/href="(data:image\/png;base64,[^"]+)"/);

if (!match) {
  console.error('Failed to extract base64');
  process.exit(1);
}

const base64Str = match[1].replace(/\s+/g, '');

// Logo 组件：横向排布，左侧图标 + 右侧橙色文字
// 用于登录页和导航展开时的顶部 logo
const logoCode = `import React from 'react';

const logoData = '${base64Str}';

export const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
        userSelect: 'none',
        padding: '4px 0',
      }}
    >
      <img
        src={logoData}
        alt="UniHome"
        style={{
          height: '32px',
          width: 'auto',
          objectFit: 'contain',
          flexShrink: 0,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: '#F97316',
            lineHeight: '1.1',
          }}
        >
          UniHome
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#F97316',
            lineHeight: '1',
            textTransform: 'uppercase' as const,
            opacity: 0.8,
          }}
        >
          CMS
        </span>
      </div>
    </div>
  );
};
`;

// Icon 组件：仅显示图标，用于面包屑/侧边栏收起
// width: auto 保持图片比例，不强制正方形
const iconCode = `import React from 'react';

const logoData = '${base64Str}';

export const Icon: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={logoData}
        alt="UniHome"
        style={{
          height: '28px',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};
`;

fs.writeFileSync('src/payload/admin/Logo.tsx', logoCode);
fs.writeFileSync('src/payload/admin/Icon.tsx', iconCode);
console.log('Done: horizontal logo row layout + fixed icon.');
