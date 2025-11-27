# 🔄 CI/CD - Integración y Despliegue Continuo

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Estado:** Activo

---

## 📑 Índice

1. [Introducción](#1-introducción)
2. [Arquitectura CI/CD](#2-arquitectura-cicd)
3. [Workflow de CI](#3-workflow-de-ci)
4. [Workflow de Despliegue](#4-workflow-de-despliegue)
5. [Configuración de Entornos](#5-configuración-de-entornos)
6. [Comandos de Desarrollo](#6-comandos-de-desarrollo)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Introducción

### 1.1 Propósito

Este documento describe la configuración de Integración Continua (CI) y Despliegue Continuo (CD) para la Plataforma de Citas Médicas utilizando GitHub Actions.

### 1.2 Objetivos

- Automatizar validación de código en cada commit
- Ejecutar tests automáticamente
- Detectar problemas de calidad tempranamente
- Automatizar despliegue a producción

### 1.3 Herramientas

| Herramienta | Propósito |
|-------------|-----------|
| GitHub Actions | Plataforma CI/CD |
| ESLint | Análisis estático de código |
| Jest | Ejecución de tests |
| Node.js | Runtime |

---

## 2. Arquitectura CI/CD

### 2.1 Pipeline Overview

```
┌─────────────────────────────────────────────────────────┐
│                     CI Pipeline                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Push/PR  ──►  Checkout  ──►  Install  ──►  Lint      │
│                                                          │
│        └──►  Test  ──►  Build  ──►  Report             │
│                                                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    CD Pipeline                           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Main Branch  ──►  Build  ──►  Deploy Staging         │
│                                                          │
│        └──►  Deploy Production  (manual approval)       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Triggers

| Evento | Pipeline | Branches |
|--------|----------|----------|
| Push | CI | Todas |
| Pull Request | CI | main, develop |
| Merge to main | CI + CD | main |
| Manual | CD | main |

---

## 3. Workflow de CI

### 3.1 Archivo de Configuración

**Ubicación:** `.github/workflows/ci.yml`

### 3.2 Descripción de Jobs

#### Job: lint

**Propósito:** Validar calidad y estilo del código

**Pasos:**
1. Checkout del código
2. Setup de Node.js
3. Instalar dependencias
4. Ejecutar ESLint

#### Job: test

**Propósito:** Ejecutar tests automatizados

**Pasos:**
1. Checkout del código
2. Setup de Node.js
3. Instalar dependencias
4. Ejecutar Jest

#### Job: build

**Propósito:** Verificar que el proyecto compila

**Pasos:**
1. Checkout del código
2. Setup de Node.js
3. Instalar dependencias
4. Build del proyecto

### 3.3 Matrix Strategy

El workflow utiliza matrix para probar en múltiples versiones de Node.js:

- Node.js 18.x (LTS)
- Node.js 20.x (Current)

---

## 4. Workflow de Despliegue

### 4.1 Archivo de Configuración

**Ubicación:** `.github/workflows/deploy.yml`

### 4.2 Estrategia de Despliegue

| Entorno | Trigger | Aprobación |
|---------|---------|------------|
| Staging | Automático (push to main) | No |
| Producción | Manual | Requerida |

### 4.3 Plataforma de Hosting

**Vercel:**
- Despliegue automático conectado a GitHub
- Preview deployments para PRs
- Producción en `main` branch

### 4.4 Configuración de Vercel

El archivo `vercel.json` en la raíz del proyecto configura:
- Build settings
- Routing
- Functions serverless

---

## 5. Configuración de Entornos

### 5.1 Variables de Entorno

#### Desarrollo (Local)

```bash
# .env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/medical-dev
JWT_SECRET=dev-secret-key
```

#### Producción

Las variables se configuran en la plataforma de hosting (Vercel):
- `NODE_ENV=production`
- `MONGODB_URI` (MongoDB Atlas connection string)
- `JWT_SECRET` (clave segura)

### 5.2 Secrets de GitHub

| Secret | Propósito | Dónde configurar |
|--------|-----------|------------------|
| `VERCEL_TOKEN` | Deploy a Vercel | Settings > Secrets |
| `MONGODB_URI` | Conexión a DB | Settings > Secrets |

**Nota:** Los secrets se configuran en: `Repository Settings > Secrets and variables > Actions`

---

## 6. Comandos de Desarrollo

### 6.1 Backend

```bash
# Navegar al backend
cd backend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con hot-reload)
npm run dev

# Ejecutar en modo producción
npm start

# Cargar datos de prueba
npm run seed

# Ejecutar linter
npm run lint

# Ejecutar tests
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

### 6.2 Frontend

```bash
# El frontend es HTML/CSS/JS estático
# Se sirve desde el backend o desde un servidor estático

# Opción 1: Servir con Python
cd web
python -m http.server 8080

# Opción 2: Servir con Node (http-server)
npx http-server web -p 8080

# Opción 3: Live Server de VS Code
# Click derecho en index.html > Open with Live Server
```

### 6.3 Scripts de Package.json

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node src/utils/seed.js",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 7. Troubleshooting

### 7.1 Problemas Comunes de CI

#### Error: "npm ci failed"

**Causa:** `package-lock.json` desactualizado o corrupto

**Solución:**
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: update package-lock.json"
```

#### Error: "ESLint errors"

**Causa:** Código no cumple reglas de linting

**Solución:**
```bash
# Ver errores
npm run lint

# Auto-fix lo posible
npm run lint:fix

# Corregir manualmente el resto
```

#### Error: "Tests failed"

**Causa:** Tests no pasan

**Solución:**
```bash
# Ejecutar tests localmente
npm test

# Ver detalles de fallos
npm test -- --verbose

# Ejecutar test específico
npm test -- --testNamePattern="nombre del test"
```

### 7.2 Problemas de Despliegue

#### Error: "Build failed on Vercel"

**Posibles causas:**
1. Variables de entorno no configuradas
2. Dependencias incompatibles
3. Error en el código

**Solución:**
1. Verificar logs de build en Vercel
2. Verificar variables de entorno
3. Probar build localmente

#### Error: "MongoDB connection failed"

**Causa:** Connection string incorrecta o IP no whitelisted

**Solución:**
1. Verificar `MONGODB_URI` en variables de entorno
2. Verificar Network Access en MongoDB Atlas
3. Añadir IP de Vercel a whitelist (o `0.0.0.0/0` para desarrollo)

### 7.3 Verificación Local

Antes de hacer push, ejecutar:

```bash
# En el directorio backend
npm run lint          # Verificar linting
npm test             # Ejecutar tests
npm start            # Verificar que arranca
```

---

## Enlaces Relacionados

### Issues del Proyecto

- Issue #23: Workflow CI
- Issue #24: Workflow tests
- Issue #25: Automatización de movimientos en Project

### Documentación

- [03_ARQUITECTURA.md](03_ARQUITECTURA.md) - Arquitectura del sistema
- [04_PLAN_PRUEBAS.md](04_PLAN_PRUEBAS.md) - Plan de pruebas

### Recursos Externos

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [ESLint Documentation](https://eslint.org/docs)
- [Jest Documentation](https://jestjs.io/docs)

---

## Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | Nov 2025 | Bons | Versión inicial |

---

**Nota:** Este documento asume que los workflows `.github/workflows/ci.yml` y `.github/workflows/deploy.yml` están configurados en el repositorio.
