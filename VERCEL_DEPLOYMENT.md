# 🚀 Guía de Despliegue en Vercel

## ✅ Configuración Completada

### 1️⃣ Estructura del Proyecto

```
/workspace/
├── backend/
│   ├── src/
│   │   └── server.js          ✅ Configurado para Vercel
│   └── package.json            ✅ Scripts correctos
├── web/                        ✅ Frontend estático
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── ...
└── vercel.json                 ✅ Configuración de despliegue
```

### 2️⃣ Archivos Modificados/Creados

#### ✅ `/workspace/vercel.json`
- **Backend**: Se ejecuta como función serverless con `@vercel/node`
- **Frontend**: Se sirve como contenido estático desde `/web`
- **Rutas API**: `/api/*` → `backend/src/server.js`
- **Rutas Frontend**: Todas las demás → `/web/`

#### ✅ `/workspace/backend/src/server.js`
- ✅ Usa `process.env.PORT || 3000`
- ✅ Exporta `module.exports = app`
- ✅ Solo inicia `app.listen()` en local (no en Vercel)

#### ✅ `/workspace/backend/package.json`
- ✅ Script `"start": "node src/server.js"`
- ✅ Script `"dev": "nodemon src/server.js"`

---

## 🔧 Variables de Entorno en Vercel

Debes configurar estas variables en el dashboard de Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes:

| Variable | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `mi_clave_ultrasecreta_123` |
| `MONGODB_URI` | `mongodb+srv://Vercel-Admin-BaseCitasMedicas:jdHrmNjKBftMix4n@basecitasmedicas.uuqwbak.mongodb.net/?retryWrites=true&w=majority` |

---

## 📦 Cómo Desplegar

### Opción 1: Desde la Terminal

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Desplegar
vercel

# O desplegar a producción directamente
vercel --prod
```

### Opción 2: Desde GitHub (Recomendado)

1. **Conecta tu repositorio con Vercel:**
   - Ve a https://vercel.com/new
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración

2. **Configura las variables de entorno** (ver tabla arriba)

3. **Despliega:**
   - Cada push a `main` desplegará automáticamente
   - Cada PR creará un preview deployment

---

## 🧪 Verificar el Despliegue

Una vez desplegado, verifica:

1. **API Health Check:**
   ```
   https://tu-proyecto.vercel.app/api/health
   ```
   Debe responder:
   ```json
   {
     "success": true,
     "message": "API funcionando correctamente",
     "timestamp": "2025-11-01T...",
     "environment": "production"
   }
   ```

2. **API Root:**
   ```
   https://tu-proyecto.vercel.app/api
   ```

3. **Frontend:**
   ```
   https://tu-proyecto.vercel.app/
   ```

---

## 🔍 Solución de Problemas

### ❌ Error 404: NOT_FOUND

**Causa:** Rutas mal configuradas en `vercel.json`

**Solución:** ✅ Ya está corregido en el nuevo `vercel.json`

### ❌ Error 500: Internal Server Error

**Causa:** Variables de entorno no configuradas

**Solución:** Verifica que todas las variables estén en Vercel Dashboard

### ❌ MongoDB Connection Error

**Causa:** `MONGODB_URI` incorrecta o MongoDB Atlas bloqueando IPs

**Solución:**
1. Verifica la cadena de conexión
2. En MongoDB Atlas → Network Access → Allow access from anywhere (`0.0.0.0/0`)

---

## 📝 Notas Importantes

1. **Funciones Serverless**: El backend se ejecuta como función serverless, no como servidor tradicional
2. **Timeout**: Las funciones serverless en Vercel tienen un timeout de 10s (gratis) o 60s (pro)
3. **Cold Starts**: La primera petición puede tardar más (función dormida)
4. **Logs**: Ver logs en Vercel Dashboard → Deployments → [tu deployment] → Logs

---

## ✨ Endpoints Disponibles

### API (Backend)
- `GET /api` - Información de la API
- `GET /api/health` - Health check
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil del usuario (requiere token)

### Frontend (Páginas)
- `/` - Landing page
- `/login` - Página de login
- `/register` - Página de registro
- `/patient-dashboard` - Dashboard de paciente
- `/doctor-dashboard` - Dashboard de doctor
- `/administrator-dashboard` - Dashboard de administrador

---

## 🎉 ¡Listo para Producción!

Tu proyecto está correctamente configurado para Vercel. Solo necesitas:

1. ✅ Hacer commit de los cambios
2. ✅ Push a GitHub
3. ✅ Conectar con Vercel
4. ✅ Configurar variables de entorno
5. ✅ Desplegar

---

**Última actualización:** 2025-11-01  
**Estado:** ✅ Configuración completada y verificada
