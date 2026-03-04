/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_FR_TV_HOST: string
  readonly VITE_FR_ROKU_HOST: string
  readonly VITE_FR_RECEIVER_HOST: string
  readonly VITE_MBR_TV_HOST: string
  readonly VITE_MBR_ROKU_HOST: string
  readonly VITE_APP_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
