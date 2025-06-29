import { decode } from './src/commands/decode';

async function testDecode() {
  try {
    console.log('=== Testing decode() - List all tasks ===');
    await decode();
    
    console.log('\n=== Testing decode("2.1") - Show specific task ===');
    await decode('2.1');
    
    console.log('\n=== Testing decode("invalid") - Non-existent task ===');
    await decode('invalid-id');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testDecode();