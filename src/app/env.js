export const envList = window.envList

export const getCurrentEnv = () => {
  const envSn = window.getEnv()
  const currentEnv = envList.find((item) => item.value === envSn)
  return currentEnv
}

export const changeEnv = (env) => {
  setEnv(env)
}
