const ROLE_HOME = {
  student: '/student',
  faculty: '/faculty/dashboard',
  coordinator: '/coordinator/dashboard',
  sysadmin: '/admin/dashboard',
  admin: '/admin/dashboard',
}

export const getRoleHome = (role) => ROLE_HOME[role?.toLowerCase()] ?? '/login'