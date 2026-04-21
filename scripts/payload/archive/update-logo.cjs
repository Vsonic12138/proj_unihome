const fs = require('fs');
const content = fs.readFileSync('public/images/logo/logo-2.svg', 'utf8');
const match = content.match(/href=\"(data:image\/png;base64,[^\"]+)\"/);
if (match) {
  const base64Str = match[1];
  
  const logoCode = `import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img
        src="${base64Str}"
        alt="Company Logo"
        style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
      />
      <span 
        style={{ 
          fontSize: '22px', 
          fontWeight: 700, 
          color: 'inherit', 
          letterSpacing: '0.05em',
          borderLeft: '2px solid #eaeaea',
          paddingLeft: '12px',
          lineHeight: '1.2'
        }}
      >
        CMS
      </span>
    </div>
  );
};`;

  fs.writeFileSync('src/payload/admin/Logo.tsx', logoCode);

  const iconCode = `import React from 'react';

export const Icon: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '36px', width: '36px' }}>
      <img
        src="${base64Str}"
        alt="Company Icon"
        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
      />
    </div>
  );
};`;

  fs.writeFileSync('src/payload/admin/Icon.tsx', iconCode);
  console.log('Successfully updated Logo and Icon with base64 img!');
} else {
  console.log('Failed to extract base64 from svg');
}
