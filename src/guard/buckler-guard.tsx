import React, { ReactNode } from 'react'

export function BucklerGuard(props: BaseProps<ReactNode>): JSX.Element
export function BucklerGuard(props: AuthProps<ReactNode>): JSX.Element
export function BucklerGuard(props: RBACProps<ReactNode>): JSX.Element

export function BucklerGuard(props: SingleProps<ReactNode>): JSX.Element {
  const { showForRole, showIf, fallback = null, RBAC, userRoles, children } = props

  if (RBAC) return <>{showForRole === userRoles ? children : null}</>
  if (showIf) return <>{children}</>

  return <>{fallback}</>
}
