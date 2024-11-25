import { createContext, ReactElement } from 'react';
import { createConfiguration, DefaultApi } from '../types/generated';

const configuration = createConfiguration();
const apiInstance = new DefaultApi(configuration);

export const AxiosContext = createContext(apiInstance);

export function AxiosApiProvider({ children }: { children: ReactElement }) {
  return (
    <AxiosContext.Provider value={apiInstance}>
      {children}
    </AxiosContext.Provider>
  );
}
// const api = new Axios
