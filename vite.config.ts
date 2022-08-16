import { defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";
const pathSrc = resolve(__dirname, "src");

export default defineConfig({
  plugins: [ vue({ reactivityTransform: true })],
  resolve: {
    extensions: [".vue", ".ts", ".js"],
    alias: {
      "~/": `${pathSrc}/`,
      "@": resolve(__dirname, "./src"),
    } ,
  },
})
