# Session Resume Command

## Uso
```
/session-resume [archivo-sesion]
```

## Prompt para Claude

---

**LEE Y COMPRENDE PROFUNDAMENTE:**

Necesito que recuperes el contexto de la sesión compactada. No es solo leer información - es reconstruir completamente nuestro estado mental compartido.

### 1. Lee el archivo de sesión

```bash
# Si no especifiqué archivo, busca el más reciente
ls -lt cypher/cdd/sessions/*.md | head -1

# Lee con intención de comprender, no solo procesar
cat cypher/cdd/sessions/[archivo].md
```

### 2. Mientras lees, reflexiona sobre:

- ¿En qué fase de la tarea estabamos?
- ¿Qué archivos concretos íbamos a crear primero?
- ¿Qué código específico habíamos diseñado? (clases, funciones)

### 3. Verifica el estado actual

```bash
# Confirma que los artefactos mencionados aún existen
ls -la [archivos creados según la sesión]

# Revisa si hubo cambios desde entonces
git status
git log --oneline -5
```

### 4. Reconstruye nuestro modelo mental compartido

No me des un resumen frío. Recupera:
- El entusiasmo del descubrimiento
- La lógica detrás de cada insight
- El momentum que teníamos
- La claridad de visión que alcanzamos

**Específicamente, asegúrate de recordar**:
- ¿Qué fase del roadmap íbamos a implementar?
- ¿Qué archivos concretos íbamos a crear primero?
- ¿Qué código específico habíamos diseñado? (clases, funciones)
- ¿Cuál era el primer comando ejemplo?

### 5. Cuando hayas internalizado todo, responde así:

"He recuperado completamente nuestro contexto. Estábamos [qué hacíamos] porque [por qué era importante]. El insight clave fue [descubrimiento principal]. Habíamos decidido [decisiones] por [razones]. El siguiente paso natural es [qué sigue]. ¿Retomamos desde ahí?"

**IMPORTANTE**: No finjas comprensión. Si algo no está claro en la sesión compactada, pregúntame. La continuidad real requiere comprensión real.

---