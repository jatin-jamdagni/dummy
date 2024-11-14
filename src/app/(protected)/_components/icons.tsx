 import { LucideProps } from 'lucide-react'
 import dynamic from 'next/dynamic'
 import dynamicIconImports from 'lucide-react/dynamicIconImports';


export const Icons = {
  logo: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  // Dynamically import other icons
  menu: dynamic(dynamicIconImports['menu']),
  close: dynamic(dynamicIconImports['x']),
  user: dynamic(dynamicIconImports['user']),
  settings: dynamic(dynamicIconImports['settings']),
  logout: dynamic( dynamicIconImports['log-out']),
  chevronDown: dynamic( dynamicIconImports['chevron-down']),
}