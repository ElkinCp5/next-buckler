import React from 'react'
import { Utils } from '../utils'

interface RolesNextAuth {
  status: string
  hasUser: boolean
  isLoading: boolean
  isAuth: boolean
  roles: Array<string>
}

interface Session {
  data?: {
    user?: any
    roles?: Array<string>
  }
  status: string
  [key: string]: any
}

export const getRolesNextAuth = (
  roleBaseName: string,
  rolAnonymous: string,
  rolNone: string,
  session: Session
): RolesNextAuth => {
  const { data, status } = session
  let roles: Array<string> = [rolAnonymous]
  const states = {
    hasUser: !!data?.user,
    isAuth: status === 'authenticated',
    isLoading: status === 'loading',
    status,
  }

  if (!Utils.isArray(data?.roles)) {
    return {
      ...states,
      roles,
    }
  }

  roles = React.useMemo(() => {
    return roles.filter((value: string) => value.includes(roleBaseName))
  }, [roleBaseName, roles])

  if (!Utils.isArray(roles)) {
    return {
      ...states,
      roles: [rolNone],
    }
  }

  return {
    ...states,
    roles: roles.filter((value: string) => value !== rolAnonymous),
  }
}
