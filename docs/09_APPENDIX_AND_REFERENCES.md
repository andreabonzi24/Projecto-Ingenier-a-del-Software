# 09 📚 APÉNDICE Y REFERENCIAS

**Última actualización:** 01 de Noviembre de 2025  
**Versión:** 2.2

---

## 📋 Tabla de Contenidos

1. [Glosario de Términos](#glosario-de-términos)
2. [Referencias Externas](#referencias-externas)
3. [Herramientas Utilizadas](#herramientas-utilizadas)
4. [FAQ Técnico](#faq-técnico)
5. [Material Auxiliar](#material-auxiliar)

---

## 🔤 Glosario de Términos

### A
- **API:** Application Programming Interface - Interfaz de programación de aplicaciones
- **Auth:** Authentication - Autenticación
- **ARIA:** Accessible Rich Internet Applications - Estándar para accesibilidad web

### B
- **Backend:** Parte del sistema que ejecuta en el servidor
- **Bcrypt:** Algoritmo de hash para contraseñas
- **Bearer Token:** Tipo de token de autenticación enviado en el header Authorization

### C
- **CORS:** Cross-Origin Resource Sharing - Compartición de recursos entre orígenes
- **CRUD:** Create, Read, Update, Delete - Operaciones básicas de datos
- **CSP:** Content Security Policy - Política de seguridad de contenido

### D
- **Dashboard:** Panel de control personalizado por rol
- **DevTools:** Herramientas de desarrollo del navegador
- **DOM:** Document Object Model - Modelo de objetos del documento

### E
- **E2E:** End-to-End Testing - Pruebas de extremo a extremo
- **Express:** Framework web minimalista para Node.js

### F
- **Frontend:** Parte del sistema que ejecuta en el navegador del cliente

### H
- **Hash:** Función criptográfica de una sola vía
- **Helmet.js:** Middleware de seguridad para Express

### J
- **JWT:** JSON Web Token - Token de autenticación basado en JSON
- **JSON:** JavaScript Object Notation - Formato de intercambio de datos

### M
- **Middleware:** Software que actúa como puente entre aplicaciones

### N
- **Node.js:** Runtime de JavaScript en el servidor
- **npm:** Node Package Manager - Gestor de paquetes de Node

### O
- **ORM:** Object-Relational Mapping - Mapeo objeto-relacional

### P
- **PWA:** Progressive Web App - Aplicación web progresiva

### R
- **REST:** Representational State Transfer - Arquitectura de API
- **Rate Limiting:** Limitación de tasa de peticiones

### S
- **SPA:** Single Page Application - Aplicación de página única
- **SSL/TLS:** Secure Sockets Layer / Transport Layer Security - Protocolos de seguridad

### T
- **Tailwind CSS:** Framework de CSS utility-first
- **Token:** Cadena que representa la identidad y permisos del usuario

### W
- **WCAG:** Web Content Accessibility Guidelines - Guías de accesibilidad web

### X
- **XSS:** Cross-Site Scripting - Tipo de vulnerabilidad de seguridad web

---

## 🔗 Referencias Externas

### Documentación Oficial

- **Node.js:** https://nodejs.org/docs
- **Express.js:** https://expressjs.com/guide
- **MongoDB:** https://docs.mongodb.com
- **Tailwind CSS:** https://tailwindcss.com/docs
- **MDN Web Docs:** https://developer.mozilla.org

### Herramientas

- **JWT.io:** https://jwt.io - Debugger de tokens JWT
- **Postman:** https://www.postman.com - Testing de API
- **Can I Use:** https://caniuse.com - Compatibilidad de navegadores

### Seguridad

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Bcrypt NPM:** https://www.npmjs.com/package/bcryptjs
- **Helmet.js:** https://helmetjs.github.io

### Accesibilidad

- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **axe DevTools:** https://www.deque.com/axe/devtools/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/

---

## 🛠️ Herramientas Utilizadas

### Desarrollo

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **npm** | 9+ | Gestor de paquetes |
| **VS Code** | Latest | Editor de código |
| **Git** | 2.40+ | Control de versiones |

### Testing

| Herramienta | Propósito |
|-------------|-----------|
| **Postman** | Testing de API |
| **cURL** | Peticiones HTTP desde terminal |
| **Chrome DevTools** | Debugging frontend |
| **Lighthouse** | Auditoría de rendimiento |

### Deployment

| Herramienta | Propósito |
|-------------|-----------|
| **Vercel** | Hosting y deployment |
| **GitHub** | Repositorio de código |
| **GitHub Actions** | CI/CD (futuro) |

---

## ❓ FAQ Técnico

### ¿Cómo cambio el puerto del servidor?

Edita el archivo :
```env
PORT=8080
```

O usa una variable de entorno temporal:
```bash
PORT=8080 npm start
```

### ¿Cómo regenero el JWT_SECRET?

```bash
openssl rand -base64 32
```

Copia el resultado y actualiza :
```env
JWT_SECRET=tu_nuevo_secret_aqui
```

### ¿Cómo limpio los datos de prueba?

```bash
cd backend
rm -f data/*.json
npm start  # El sistema regenerará archivos vacíos
```

### ¿Cómo debugeo errores de CORS?

1. Verifica que  en  coincida con tu URL
2. Revisa que el backend esté usando el middleware 
3. En el navegador, abre DevTools → Console para ver errores específicos

### ¿Cómo actualizo Tailwind CSS?

```bash
npm update tailwindcss
npx tailwindcss -o web/css/tailwind.min.css --minify
```

### ¿Cómo añado un nuevo endpoint?

1. Crea el controller en 
2. Crea las rutas en 
3. Registra las rutas en 
4. Actualiza la documentación

### ¿Cómo pruebo que el JWT funciona?

```bash
# 1. Login y guardar token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria.lopez@example.test","password":"Paciente123!"}' \
  | jq -r '.data.token')

# 2. Usar token en petición protegida
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📄 Material Auxiliar

### Estructura de un Token JWT

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "user-001",
    "role": "paciente",
    "iat": 1698758400,
    "exp": 1699363200
  },
  "signature": "..."
}
```

### Formato de Respuesta de API

**Éxito:**
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

### Estados de una Cita

| Estado | Descripción |
|--------|-------------|
| `programada` | Cita confirmada y pendiente |
| `completada` | Cita realizada exitosamente |
| `cancelada` | Cita cancelada por paciente/médico |
| `no_asistio` | Paciente no asistió |

### Códigos de Estado HTTP Usados

| Código | Significado | Uso en la API |
|--------|-------------|---------------|
| 200 | OK | Operación exitosa |
| 201 | Created | Recurso creado |
| 400 | Bad Request | Datos inválidos |
| 401 | Unauthorized | Token faltante/inválido |
| 403 | Forbidden | Sin permisos |
| 404 | Not Found | Recurso no existe |
| 500 | Internal Server Error | Error del servidor |

---

## 📞 Soporte

### Encontrar Información

- **Para usuarios:** Ver 
- **Para desarrolladores backend:** Ver 
- **Para desarrolladores frontend:** Ver 
- **Para QA:** Ver 

### Reportar Problemas

1. Verificar en  si es un problema conocido
2. Revisar FAQ en este documento
3. Crear issue en GitHub con:
   - Descripción del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Capturas de pantalla (si aplica)

---

**Última actualización:** 01 de Noviembre de 2025  
**Versión del apéndice:** 1.0


