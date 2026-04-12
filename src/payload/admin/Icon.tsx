import Image from "next/image";
import React from 'react';

export const Icon: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        width: '32px',
        position: 'relative',
      }}
    >
      <Image
        src="/images/logo/logo-2.svg"
        alt="UniHome CMS"
        fill
        unoptimized
        sizes="32px"
        style={{
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};
