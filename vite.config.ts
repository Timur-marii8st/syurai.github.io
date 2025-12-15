import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // или '@vitejs/plugin-react', оставьте как есть у вас

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1' // Принудительно используем IPv4 (часто решает проблему прав)
  }
})