import Image from "next/image";
import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px 0',
      }}
    >
      <div
        style={{
          height: '208px',
          width: 'min(90vw, 416px)',
          position: 'relative',
        }}
      >
        <Image
          src="/images/logo/unihome-cms-logo.png"
        alt="UniHome CMS"
          fill
          sizes="(max-width: 768px) 90vw, 416px"
        style={{
          objectFit: 'contain',
          display: 'block',
        }}
        />
      </div>
    </div>
  );
};
