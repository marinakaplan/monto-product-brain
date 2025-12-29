import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const anthropic = new Anthropic();

// Configuration
const PLATFORMS = {
  'user-platform': {
    path: './temp/user-platform',
    docsPath: './docs/user-platform'
  },
  'backoffice': {
    path: './temp/backoffice',
    docsPath: './docs/backoffice'
  }
};

// Get file list from a directory
function getFiles(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const files = [];
  
  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!['node_modules', '.git', 'dist', '.next', '.vitepress'].includes(item)) {
          walk(fullPath);
        }
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

// Read key files for context
function readKeyFiles(platformPath) {
  const keyPatterns = [
    'src/pages',
    'src/app',
    'src/routes',
    'src/components/ui',
    'app/'
  ];
  
  const files = getFiles(platformPath);
  const keyFiles = files.filter(f => 
    keyPatterns.some(pattern => f.includes(pattern))
  ).slice(0, 50); // Limit to 50 files
  
  let content = '';
  for (const file of keyFiles) {
    const relativePath = path.relative(platformPath, file);
    const fileContent = fs.readFileSync(file, 'utf-8');
    content += `\n--- ${relativePath} ---\n${fileContent.slice(0, 2000)}\n`;
  }
  
  return content;
}

// Extract inventory using Claude
async function extractInventory(platformName, platformPath) {
  console.log(`📥 Extracting ${platformName}...`);
  
  const files = getFiles(platformPath);
  const structure = files.map(f => path.relative(platformPath, f)).join('\n');
  const keyFilesContent = readKeyFiles(platformPath);
  
  const prompt = `You are the Extractor Agent for Monto's Product Brain.

CONTEXT:
- Monto is a B2B fintech for AI-powered invoice automation
- Platform: ${platformName}
- ${platformName === 'user-platform' ? 'Customer-facing app for suppliers' : 'Internal operations platform'}

FILE STRUCTURE:
${structure.slice(0, 5000)}

KEY FILES CONTENT:
${keyFilesContent.slice(0, 15000)}

EXTRACT AND OUTPUT IN MARKDOWN:

# ${platformName === 'user-platform' ? 'User Platform' : 'Backoffice'} Inventory

## Pages

| Route | Page Name | Purpose | Key Components |
|-------|-----------|---------|----------------|
[Extract from the file structure and content]

## Components

| Component | Purpose | Location |
|-----------|---------|----------|
[List significant components found]

## User Actions

| Action | Location | Description |
|--------|----------|-------------|
[List actions users can take]

## APIs/Data Fetching

| Endpoint/Query | Purpose | Used In |
|----------------|---------|---------|
[List API calls, data fetching]

---

::: info 🤖 Auto-Generated
Extracted from codebase on ${new Date().toISOString().split('T')[0]}
:::`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }]
  });

  return response.content[0].text;
}

// Main extraction function
async function main() {
  const platformArg = process.env.PLATFORM || 'both';
  
  console.log('🧠 Product Brain Extraction Starting...\n');
  
  const platformsToExtract = platformArg === 'both' 
    ? Object.keys(PLATFORMS)
    : [platformArg];
  
  for (const platformName of platformsToExtract) {
    const config = PLATFORMS[platformName];
    
    if (!fs.existsSync(config.path)) {
      console.log(`⚠️ ${platformName} not found at ${config.path}, skipping...`);
      continue;
    }
    
    try {
      // Extract inventory
      const inventory = await extractInventory(platformName, config.path);
      
      // Ensure directory exists
      const inventoryDir = path.join(config.docsPath, 'inventory');
      fs.mkdirSync(inventoryDir, { recursive: true });
      
      // Save inventory
      const inventoryPath = path.join(inventoryDir, 'index.md');
      fs.writeFileSync(inventoryPath, inventory);
      console.log(`✅ Saved inventory to ${inventoryPath}`);
      
    } catch (error) {
      console.error(`❌ Error extracting ${platformName}:`, error.message);
    }
  }
  
  console.log('\n🎉 Extraction complete!');
}

main().catch(console.error);
