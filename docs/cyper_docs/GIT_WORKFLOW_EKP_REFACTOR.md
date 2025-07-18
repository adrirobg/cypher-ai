# Git Workflow para Refactorización EKP v2

## Estrategia de Branching

### Estructura de Ramas

```
master
  └── feature/ekp-v2-refactor              # Rama principal de refactorización
        ├── ekp-v2/phase-1-foundation      # Fase 1: Fundación (2 días)
        ├── ekp-v2/phase-2-core-commands   # Fase 2: Comandos núcleo (3 días)
        ├── ekp-v2/phase-3-patterns        # Fase 3: Patrones (2 días)
        └── ekp-v2/phase-4-migration       # Fase 4: Migración (3 días)
```

### Convenciones de Nombres

- **Rama principal**: `feature/ekp-v2-refactor`
- **Sub-ramas**: `ekp-v2/phase-X-descripcion`
- **Hotfixes**: `ekp-v2/hotfix-descripcion`
- **Experimentos**: `ekp-v2/exp-descripcion`

## Workflow de Trabajo

### 1. Inicio de Refactorización

```bash
# Crear rama principal desde master
git checkout master
git pull origin master
git checkout -b feature/ekp-v2-refactor

# Crear primera sub-rama de fase
git checkout -b ekp-v2/phase-1-foundation
```

### 2. Trabajo en Cada Fase

```bash
# Al iniciar una fase
git checkout feature/ekp-v2-refactor
git pull origin master  # Mantener sincronizado
git checkout -b ekp-v2/phase-X-nombre

# Durante el trabajo
git add .
git commit -m "[PHASE X] feat: descripción concisa"

# Al completar la fase
git checkout feature/ekp-v2-refactor
git merge --no-ff ekp-v2/phase-X-nombre
git push origin feature/ekp-v2-refactor
```

### 3. Convenciones de Commits

#### Formato
```
[PHASE X] tipo: descripción breve

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
[PHASE 1] feat: crear estructura base prompts/ y patterns/
[PHASE 1] feat: implementar comando 'cypher plan' como primer teacher
[PHASE 2] refactor: migrar comando context a nuevo paradigma
[PHASE 3] docs: añadir patrón react-component.md
```

### 4. Sincronización con Master

```bash
# Semanalmente o cuando haya cambios importantes en master
git checkout feature/ekp-v2-refactor
git fetch origin
git merge origin/master  # o rebase si prefieres historial limpio
git push origin feature/ekp-v2-refactor
```

### 5. Validación y Checkpoints

#### Por Fase
- [ ] Tests pasando
- [ ] Documentación actualizada
- [ ] Revisión de código (self-review)
- [ ] Smoke test de funcionalidad

#### Checkpoints Principales
1. **Post-Fase 1**: Validar que el comando `plan` funciona correctamente
2. **Post-Fase 2**: Validar que todos los comandos core están migrados
3. **Post-Fase 3**: Validar que los patrones son útiles y reutilizables
4. **Post-Fase 4**: Validar compatibilidad completa y limpieza

### 6. Merge Final a Master

```bash
# Cuando todo el roadmap esté completo
git checkout master
git pull origin master
git merge --no-ff feature/ekp-v2-refactor

# O crear PR para revisión si trabajas en equipo
gh pr create --base master --head feature/ekp-v2-refactor
```

## Manejo de Situaciones Especiales

### Hotfixes Durante Refactorización

```bash
# Si encuentras un bug crítico
git checkout feature/ekp-v2-refactor
git checkout -b ekp-v2/hotfix-descripcion
# ... fix ...
git checkout feature/ekp-v2-refactor
git merge --no-ff ekp-v2/hotfix-descripcion
```

### Experimentos

```bash
# Para probar ideas sin comprometer la rama principal
git checkout feature/ekp-v2-refactor
git checkout -b ekp-v2/exp-nueva-idea
# ... experimentar ...
# Si funciona, merge; si no, simplemente eliminar la rama
```

### Rollback de Fase

```bash
# Si una fase introduce problemas
git checkout feature/ekp-v2-refactor
git revert -m 1 <merge-commit-de-la-fase>
```

## Mejores Prácticas

1. **Commits Atómicos**: Cada commit debe ser una unidad funcional completa
2. **Push Frecuente**: Push al menos una vez al día a origin
3. **No Reescribir Historia**: Una vez pushed, no hacer rebase o amend
4. **Documentar Decisiones**: Usar commit messages descriptivos
5. **Tests Primero**: Escribir tests antes de refactorizar cuando sea posible

## Timeline Estimado

- **Fase 1**: 2 días (Fundación)
- **Fase 2**: 3 días (Comandos Core)
- **Fase 3**: 2 días (Patrones)
- **Fase 4**: 3 días (Migración)
- **Buffer**: 2 días (Validación y pulido)
- **Total**: ~12 días

## Comandos Útiles

```bash
# Ver estructura de ramas
git log --graph --pretty=oneline --abbrev-commit --all

# Ver cambios entre ramas
git diff master..feature/ekp-v2-refactor

# Limpiar ramas locales mergeadas
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```