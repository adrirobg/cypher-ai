# Task Enrichment: Setup Project Infrastructure and Database Foundation

## Análisis de la Tarea
Crear estructura completa de proyecto full-stack con backend FastAPI siguiendo patrón controller-service-repository, base de datos SQLite optimizada con WAL mode y FTS5, y frontend React con TypeScript usando Vite como build tool.

## Tecnologías Identificadas
- **FastAPI**: `/tiangolo/fastapi`
- **SQLAlchemy 2.0**: `/sqlalchemy/sqlalchemy`
- **Pydantic v2**: `/pydantic/pydantic`
- **React 18+**: `/reactjs/react.dev`
- **Vite**: `/vitejs/vite`

## Código a Obtener de Context7
Para implementar cada componente, PRIMERO obtén código actualizado:
- Para **estructura proyecto FastAPI**: Context7 `/tiangolo/fastapi` topic: "project structure bigger applications" → Usa ese código
- Para **SQLAlchemy 2.0 base models**: Context7 `/sqlalchemy/sqlalchemy` topic: "declarative base mapped class" → Usa ese código
- Para **SQLite WAL y optimizaciones**: Context7 `/sqlalchemy/sqlalchemy` topic: "sqlite pragma wal journal mode" → Usa ese código
- Para **Pydantic BaseSettings v2**: Context7 `/pydantic/pydantic` topic: "settings management baseSettings" → Usa ese código
- Para **React TypeScript setup**: Context7 `/reactjs/react.dev` topic: "typescript quick start" → Usa ese código
- Para **Vite React config**: Context7 `/vitejs/vite` topic: "react typescript proxy backend" → Usa ese código

## Enfoque TDD
1. **Tests primero**
   - Test conexión base de datos con verificación WAL mode
   - Test endpoint /health de FastAPI
   - Test compilación TypeScript sin errores
   - Test comunicación frontend-backend vía proxy

2. **Implementación mínima**
   - Estructura directorios según Context7
   - FastAPI app con health endpoint
   - SQLAlchemy con pragmas SQLite
   - React básico con un componente

3. **Refactoring**
   - Extraer config a Pydantic Settings
   - Completar patrón repository
   - Añadir herramientas desarrollo

## Oportunidades de Paralelización
Después del setup inicial:
- **Agent A**: Backend completo (FastAPI + DB + tests)
- **Agent B**: Frontend completo (React + Vite)
- **Punto de sincronización**: Configurar proxy cuando ambos estén listos