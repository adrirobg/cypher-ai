# Git Workflow para Refactorización EKP v2

## Estrategia de Branching

### Estructura de Ramas

```
master
  └── feature/nombre-de-la-feature
  └── fix/descripcion-del-fix
  └── docs/descripcion-de-docs
```

### Convenciones de Nombres

- **Rama principal**: `master`
- **Ramas de desarrollo**:
  - `feature/descripcion-de-la-feature`
  - `fix/descripcion-del-fix`
  - `docs/descripcion-de-docs`
  - `chore/descripcion-de-tarea`

## Workflow de Trabajo

### 1. Inicio de una Nueva Tarea

```bash
# Asegúrate de estar en master y actualizado
git checkout master
git pull origin master

# Crea una nueva rama para tu tarea
git checkout -b <tipo>/<descripcion-corta>
# Ejemplo: git checkout -b feature/add-new-command
# Ejemplo: git checkout -b fix/bug-in-task-engine
```

### 2. Desarrollo y Commits

```bash
# Durante el trabajo, haz commits atómicos y descriptivos
git add .
git commit -m "tipo: descripción concisa del cambio"

# Ejemplo: git commit -m "feat: implementar nuevo comando 'explore'"
# Ejemplo: git commit -m "fix: corregir error de parseo en TaskEngine"
```

### 3. Convenciones de Commits

#### Formato
```
tipo: descripción breve

Cuerpo opcional explicando:
- Qué cambios se hicieron
- Por qué se hicieron
- Impacto en el sistema

Refs: #task-id (si aplica)
```

#### Tipos de Commit
- `feat`: Nueva funcionalidad
- `refactor`: Refactorización de código existente
- `docs`: Documentación
- `test`: Añadir o modificar tests
- `fix`: Corrección de bugs
- `chore`: Tareas de mantenimiento

#### Ejemplos
```bash
feat: implementar nuevo comando 'explore'
refactor: migrar comando context a nuevo paradigma
docs: actualizar README con nueva estructura
```

### 3. Sincronización con Master

```bash
# Mantén tu rama actualizada con master frecuentemente
git checkout <tu-rama>
git pull origin master
```

### 4. Finalización de la Tarea y Merge

```bash
# Cuando tu tarea esté completa y lista para integrar
git checkout master
git pull origin master
git merge --no-ff <tu-rama>

# O, si trabajas en equipo, crea un Pull Request (PR)
# gh pr create --base master --head <tu-rama>
```

## Manejo de Situaciones Especiales

### Hotfixes

```bash
# Para corregir un bug crítico en producción
git checkout master
git pull origin master
git checkout -b hotfix/descripcion-del-bug
# ... corrige el bug ...
git commit -m "fix: corrige bug crítico"
git checkout master
git merge --no-ff hotfix/descripcion-del-bug
```

### Experimentos

```bash
# Para probar ideas sin comprometer la rama principal
git checkout master
git checkout -b exp/nueva-idea
# ... experimentar ...
# Si funciona, puedes mergear a una rama de feature; si no, simplemente eliminar la rama
```

## Mejores Prácticas

1. **Commits Atómicos**: Cada commit debe ser una unidad funcional completa y con un mensaje claro.
2. **Push Frecuente**: Haz push a tu rama remota al menos una vez al día.
3. **No Reescribir Historia Pública**: Una vez que los commits han sido pushed a una rama compartida, evita reescribir su historia (e.g., con `rebase -i`).
4. **Documentar Decisiones**: Usa mensajes de commit descriptivos para explicar el "por qué" de los cambios.
5. **Tests Primero**: Siempre que sea posible, escribe tests antes de implementar o refactorizar código.

## Comandos Útiles

```bash
# Ver estructura de ramas
git log --graph --pretty=oneline --abbrev-commit --all

# Ver cambios entre ramas
git diff <rama-1>..<rama-2>

# Limpiar ramas locales mergeadas
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```