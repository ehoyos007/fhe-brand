/**
 * @fhe/brand · icon path registry
 * Verbatim from _bundle-source/icons.jsx. Add icons here, not in icon.tsx.
 */
import * as React from "react";

export const iconPaths = {
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  shieldcheck: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6l8-3z" />
      <path d="M9 12.2l2 2L15 10" />
    </>
  ),
  heartbeat: (
    <>
      <path d="M3 12h3l2-4 3 8 2-5 2 1h6" />
    </>
  ),
  check: (
    <>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5L16 9.5" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  minus: (
    <>
      <path d="M5 12h14" />
    </>
  ),
  x: (
    <>
      <path d="M6 6l12 12M18 6l-12 12" />
    </>
  ),
  "x-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8.2v.1" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l9.5 17H2.5L12 3z" />
      <path d="M12 10v4M12 17v.1" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h3l1.5 4-2 1c1 2.5 3 4.5 5.5 5.5l1-2 4 1.5V17a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </>
  ),
  "phone-incoming": (
    <>
      <path d="M5 4h3l1.5 4-2 1c1 2.5 3 4.5 5.5 5.5l1-2 4 1.5V17a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" />
      <path d="M15 9V4M15 9h5M15 9l5-5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M3 19a6 6 0 0 1 12 0" />
      <path d="M16 8a3 3 0 1 1 0 6" />
      <path d="M16 14a6 6 0 0 1 5 5" />
    </>
  ),
  "user-plus": (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M19 8v6M16 11h6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v12M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </>
  ),
  filter: (
    <>
      <path d="M4 5h16l-6 8v6l-4-2v-4L4 5z" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9h14v-9" />
    </>
  ),
  pill: (
    <>
      <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)" />
      <path d="M8.5 7.5l8 8" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 4v6a4 4 0 0 0 8 0V4" />
      <circle cx="18" cy="14" r="2.5" />
      <path d="M10 14v3a4 4 0 0 0 8 0v-.5" />
    </>
  ),
  piggy: (
    <>
      <path d="M12 5c4 0 7 2.5 7 6v3l2 1v3h-3l-1 2h-3v-2h-4v2H7l-1-2H4v-4l1.5-1A6 6 0 0 1 12 5z" />
      <circle cx="14.5" cy="11.5" r="0.6" fill="currentColor" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  star: (
    <>
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6L3.2 9.5l6.1-.9L12 3z" />
    </>
  ),
  bookmark: (
    <>
      <path d="M6 3h12v18l-6-4-6 4V3z" />
    </>
  ),
  chevron: (
    <>
      <path d="M9 6l6 6-6 6" />
    </>
  ),
  "chev-down": (
    <>
      <path d="M6 9l6 6 6-6" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  "doc-search": (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
      <path d="M14 3v5h5" />
      <circle cx="12" cy="14" r="2.5" />
      <path d="M14 16l2 2" />
    </>
  ),
  "id-card": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.5" />
      <path d="M14 11h4M14 14h3" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4M5 4h12l-2 4 2 4H5" />
    </>
  ),
  refresh: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5.5L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-14 5.5L4 16" />
      <path d="M4 20v-4h4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 4l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" />
      <path d="M19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 4l9 5-9 5-9-5 9-5z" />
      <path d="M3 14l9 5 9-5" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 13l3-7h12l3 7" />
      <path d="M3 13v6h18v-6" />
      <path d="M3 13h5l1 2h6l1-2h5" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="4" cy="18" r="1" fill="currentColor" />
    </>
  ),

  // -- Grid CRM nav set (added for fhe-grid-stream sidebar) ----------------
  cart: (
    <>
      <path d="M3 4h2l2.4 11.4a1.5 1.5 0 0 0 1.5 1.2h7.7a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.5" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17" cy="20" r="1.2" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
      <path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3" />
      <path d="M12 13v4M9 20h6M10 20v-1.5a2 2 0 0 1 4 0V20" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 13l4-4" />
      <circle cx="12" cy="13" r="1.2" fill="currentColor" />
    </>
  ),
  "message-plus": (
    <>
      <path d="M21 11.5a7.5 7.5 0 0 1-10.7 6.8L4 20l1.7-5A7.5 7.5 0 1 1 21 11.5z" />
      <path d="M12 8v6M9 11h6" />
    </>
  ),
  headset: (
    <>
      <path d="M5 14v-2a7 7 0 0 1 14 0v2" />
      <rect x="3.5" y="13" width="3.5" height="6" rx="1.5" />
      <rect x="17" y="13" width="3.5" height="6" rx="1.5" />
      <path d="M19 19a3 3 0 0 1-3 3h-2" />
    </>
  ),
  "user-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 18.5a6 6 0 0 1 11 0" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4a1.5 1.5 0 0 0 1.5 1.5H8l9 4.5V5L8 9.5H5.5A1.5 1.5 0 0 0 4 11" />
      <path d="M8 15.5V9.5M20 9.5a3 3 0 0 1 0 5" />
    </>
  ),
  tag: (
    <>
      <path d="M4 4h7.5L20 12.5a2 2 0 0 1 0 2.8l-4.7 4.7a2 2 0 0 1-2.8 0L4 11.5V4z" />
      <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  wrench: (
    <>
      <path d="M15 5.5a4 4 0 0 0-5.3 4.7L4 16l4 4 5.8-5.7A4 4 0 0 0 18.5 9l-2.6 2.6-2.4-.5-.5-2.4L15 5.5z" />
    </>
  ),
  bug: (
    <>
      <rect x="8" y="8" width="8" height="11" rx="4" />
      <path d="M9 6.5a3 3 0 0 1 6 0" />
      <path d="M8 12H4M16 12h4M8 16H4.5M16 16h3.5M9 9L6.5 6.5M15 9l2.5-2.5" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 16a6 6 0 1 1 6 0c-.6.5-1 1.2-1 2v.5h-4V18c0-.8-.4-1.5-1-2z" />
      <path d="M10 21h4" />
    </>
  ),
  "chat-dot": (
    <>
      <path d="M21 11.5a7.5 7.5 0 0 1-10.7 6.8L4 20l1.7-5A7.5 7.5 0 1 1 21 11.5z" />
      <circle cx="8.5" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r="0.8" fill="currentColor" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="5" width="14" height="16" rx="2" />
      <rect x="9" y="3" width="6" height="4" rx="1.2" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  ticket: (
    <>
      <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
      <path d="M14 6v2M14 11v2M14 16v0" />
    </>
  ),
  "bar-chart": (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <rect x="7" y="12" width="3" height="5" rx="0.8" />
      <rect x="12.5" y="8" width="3" height="9" rx="0.8" />
      <rect x="18" y="5" width="3" height="12" rx="0.8" />
    </>
  ),
  graduation: (
    <>
      <path d="M12 4L2 9l10 5 10-5-10-5z" />
      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
      <path d="M22 9v5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 4h10a2 2 0 0 1 2 2v11a3 3 0 0 0 3 3H8a2 2 0 0 1-2-2V6a2 2 0 0 0-4 0v1h4" />
      <path d="M10 9h6M10 13h6" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </>
  ),
  sigma: (
    <>
      <path d="M17 5H6l6 7-6 7h11" />
    </>
  ),
  send: (
    <>
      <path d="M21 4L3 11l7 3 3 7 8-17z" />
      <path d="M10 14l4-4" />
    </>
  ),
} as const;

export type IconName = keyof typeof iconPaths;

export const iconNames = Object.keys(iconPaths) as IconName[];
