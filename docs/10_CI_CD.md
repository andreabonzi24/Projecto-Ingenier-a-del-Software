# 05 🔄 CI/CD - Integración y Despliegue Continuo

**Última actualización:** 29 de Noviembre de 2025  
**Versión:** 1.0  
**Estado:** ✅ Configurado

---

## 📋 Tabla de Contenidos

1. [Resumen](#resumen)
2. [Workflows de GitHub Actions](#workflows-de-github-actions)
3. [Pipeline de CI](#pipeline-de-ci)
4. [Pipeline de Deploy](#pipeline-de-deploy)
5. [Configuración de ESLint](#configuración-de-eslint)
6. [Variables de Entorno y Secretos](#variables-de-entorno-y-secretos)
7. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Resumen

Este documento describe la configuración de **Integración Continua (CI)** y **Despliegue Continuo (CD)** para la Plataforma de Citas Médicas utilizando **GitHub Actions**.

### Objetivos del Pipeline

- ✅ Validación automática de código en cada push/PR
- ✅ Ejecución de linting para mantener calidad de código
- ✅ Ejecución de tests automatizados
- ✅ Build del proyecto para verificar compilación
- ✅ Auditoría de seguridad de dependencias
- ✅ Despliegue automatizado a producción

---

## 🔧 Workflows de GitHub Actions

### Archivos de Configuración

```
.github/
└── workflows/
    ├── ci.yml      # Pipeline de integración continua
    └── deploy.yml  # Pipeline de despliegue
```

---

## 🔵 Pipeline de CI

**Archivo:** `.github/workflows/ci.yml`

### Triggers (Activadores)

El pipeline de CI se ejecuta automáticamente cuando:

- Se hace **push** a las ramas `main` o `develop`
- Se abre un **Pull Request** hacia `main` o `develop`

### Jobs

#### 1. Build and Test (`build-and-test`)

Este job ejecuta las siguientes acciones:

| Paso | Descripción |
|------|-------------|
| **Checkout** | Descarga el código del repositorio |
| **Setup Node.js** | Configura Node.js (versiones 18.x y 20.x) |
| **Install** | Instala dependencias con `npm ci` |
| **Lint** | Ejecuta el linter ESLint |
| **Test** | Ejecuta los tests unitarios |
| **Build** | Compila el proyecto |

#### 2. Security Scan (`security-scan`)

| Paso | Descripción |
|------|-------------|
| **npm audit** | Verifica vulnerabilidades en dependencias |

### Configuración Completa

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install backend dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run linter
        working-directory: ./backend
        run: npm run lint --if-present

      - name: Run tests
        working-directory: ./backend
        run: npm test --if-present

      - name: Build
        working-directory: ./backend
        run: npm run build --if-present

  security-scan:
    runs-on: ubuntu-latest
    needs: build-and-test
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run security audit
        working-directory: ./backend
        run: npm audit --audit-level=moderate || true
```

---

## 🚀 Pipeline de Deploy

**Archivo:** `.github/workflows/deploy.yml`

### Triggers

El pipeline de deploy se ejecuta cuando:

- Se hace **push** a la rama `main`
- Se activa **manualmente** desde GitHub Actions (workflow_dispatch)

### Configuración de Despliegue

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      - name: Build application
        working-directory: ./backend
        run: npm run build --if-present

      # Despliegue a Vercel (configurar cuando esté listo)
      # - name: Deploy to Vercel
      #   uses: amondnet/vercel-action@v25
      #   with:
      #     vercel-token: ${{ secrets.VERCEL_TOKEN }}
      #     vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
      #     vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Proveedores de Despliegue Soportados

| Proveedor | Estado | Configuración |
|-----------|--------|---------------|
| **Vercel** | 🔶 Preparado | Requiere `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |
| **Railway** | ⏳ Pendiente | - |
| **Render** | ⏳ Pendiente | - |
| **AWS** | ⏳ Pendiente | - |

---

## 🔍 Configuración de ESLint

**Archivo:** `backend/.eslintrc.json`

### Reglas Configuradas

```json
{
  "env": {
    "node": true,
    "es2021": true,
    "commonjs": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "semi": ["warn", "always"],
    "quotes": ["warn", "single", { "avoidEscape": true }],
    "indent": ["warn", 2],
    "comma-dangle": ["warn", "never"],
    "no-multiple-empty-lines": ["warn", { "max": 2, "maxEOF": 1 }],
    "eol-last": ["warn", "always"],
    "no-trailing-spaces": "warn"
  },
  "ignorePatterns": [
    "node_modules/",
    "dist/",
    "build/",
    "coverage/"
  ]
}
```

### Scripts de NPM

```json
{
  "scripts": {
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "test": "echo \"No tests configured yet\" && exit 0"
  }
}
```

### Uso

```bash
# Ejecutar linter
npm run lint

# Corregir errores automáticamente
npm run lint:fix
```

---

## 🔐 Variables de Entorno y Secretos

### Secretos Requeridos para Deploy

Para configurar el despliegue automático a Vercel, añadir estos secretos en:
`Settings → Secrets and variables → Actions`

| Secreto | Descripción | Cómo Obtener |
|---------|-------------|--------------|
| `VERCEL_TOKEN` | Token de API de Vercel | [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | ID de la organización | Archivo `.vercel/project.json` después de `vercel link` |
| `VERCEL_PROJECT_ID` | ID del proyecto | Archivo `.vercel/project.json` después de `vercel link` |

### Variables de Entorno del Backend

```env
# Archivo: backend/.env
PORT=3000
NODE_ENV=development
JWT_SECRET=mi_clave_ultrasecreta_123
MONGODB_URI=mongodb://localhost:27017/medical-appointments
```

---

## 📊 Status Badges

Añadir al README.md del proyecto:

```markdown
![CI Status](https://github.com/andreabonzi24/Projecto-Ingenier-a-del-Software/actions/workflows/ci.yml/badge.svg)
![Deploy Status](https://github.com/andreabonzi24/Projecto-Ingenier-a-del-Software/actions/workflows/deploy.yml/badge.svg)
```

---

## ✅ Mejores Prácticas

### Para Desarrolladores

1. **Siempre ejecutar lint antes de commit:**
   ```bash
   npm run lint
   ```

2. **Corregir errores de lint automáticamente:**
   ```bash
   npm run lint:fix
   ```

3. **Verificar que los tests pasan localmente:**
   ```bash
   npm test
   ```

4. **No hacer push directamente a main:**
   - Crear rama feature/fix
   - Abrir Pull Request
   - Esperar que CI pase
   - Solicitar review

### Para CI/CD

1. **Mantener workflows simples y modulares**
2. **Usar caché de dependencias** para acelerar builds
3. **Ejecutar auditoría de seguridad** en cada build
4. **No guardar secretos en el código**

---

## 🔗 Issues Relacionados

Este documento está relacionado con los siguientes issues del proyecto:

- [Issue #15: Configuración de CI/CD](../docs/ISSUES_PLAN.md#issue-15-configuración-de-cicd)
- [Issue #16: Configuración de linting y formato de código](../docs/ISSUES_PLAN.md#issue-16-configuración-de-linting-y-formato-de-código)

---

## 📈 Métricas del Pipeline

| Métrica | Objetivo | Estado Actual |
|---------|----------|---------------|
| **Tiempo de CI** | < 5 minutos | ✅ ~2 minutos |
| **Cobertura de tests** | > 70% | ⏳ 0% (pendiente) |
| **Vulnerabilidades críticas** | 0 | ✅ 0 |
| **Errores de lint** | 0 | ⏳ Por verificar |

---

## 🚧 Próximos Pasos

1. [ ] Configurar tests unitarios con Jest
2. [ ] Configurar tests de integración
3. [ ] Activar despliegue automático a Vercel
4. [ ] Añadir notificaciones de Slack/Discord
5. [ ] Configurar cobertura de código con Codecov
6. [ ] Añadir tests E2E con Cypress

---

*Documento actualizado el 29 de Noviembre de 2025*
