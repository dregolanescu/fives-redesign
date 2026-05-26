import React from 'react'

/** Full FIVE'S logo – shown on the login page */
export default function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <img
        src="/logo_website_fives_grey.svg"
        alt="FIVE'S Production"
        style={{ width: 180, height: 'auto' }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#78716c',
        }}
      >
        Admin Panel
      </span>
    </div>
  )
}
