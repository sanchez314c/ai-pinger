import React, { useEffect, useRef } from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
}

export function Modal({ title, children, onClose }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 11, 14, 0.94)',
        backdropFilter: 'blur(10px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 200ms ease',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(145deg, #141518, #18191c)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '14px',
          width: '100%',
          maxWidth: '520px',
          margin: '0 16px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.15), 0 16px 32px rgba(0,0,0,0.2), 0 32px 64px rgba(0,0,0,0.25)',
        }}
      >
        {/* Inner highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px',
            borderBottom: '1px solid #1e1e24',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#f4f4f7', margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              color: '#5c5c6a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ef4444';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.color = '#5c5c6a';
            }}
          >
            &#x2715;
          </button>
        </div>
        <div style={{ padding: '20px 28px' }}>{children}</div>
      </div>
    </div>
  );
}
