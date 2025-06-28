import { claude } from '@instantlyeasy/claude-code-sdk-ts';

async function testClaudeSDK() {
  console.log('🧪 Probando Claude Code SDK...\n');
  
  try {
    // Prueba simple
    const result = await claude()
      .allowTools('Bash')
      .skipPermissions()
      .query('Por favor ejecuta: echo "Hola desde Claude SDK"')
      .asText();
    
    console.log('Resultado:', result);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  }
}

testClaudeSDK();