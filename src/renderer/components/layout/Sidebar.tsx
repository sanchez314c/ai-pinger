import React from 'react';
import { ModelControls } from '../models/ModelControls';
import { ModelList } from '../models/ModelList';

interface SidebarProps {
  width?: number;
}

export function Sidebar({ width }: SidebarProps) {
  return (
    <aside
      className="sidebar no-drag"
      style={width ? { width: `${width}px`, minWidth: `${width}px` } : undefined}
    >
      {/* Section label */}
      <div className="sidebar-section-title">Models</div>

      {/* Model controls — search, select all, clear */}
      <ModelControls />

      {/* Model list — scrollable */}
      <ModelList />
    </aside>
  );
}
