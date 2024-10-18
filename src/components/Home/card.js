import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className={`rounded-lg border bg-white text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 ${props.className || ''}`}>
    {children}
  </div>
)

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className={`flex flex-col space-y-1.5 p-6 ${props.className || ''}`}>
    {children}
  </div>
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => (
  <h3 {...props} className={`text-lg font-semibold leading-none tracking-tight ${props.className || ''}`}>
    {children}
  </h3>
)

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props} className={`p-6 pt-0 ${props.className || ''}`}>
    {children}
  </div>
)