// TODO(agent): CLI flags support
if (process.argv.includes('--help')) {
  console.log('Usage: node hello-world.js');
  console.log('Options:');
  console.log('  --help    Show Node.js usage information');
  process.exit(0);
}

console.log('Hello World!');
