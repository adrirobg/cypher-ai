# Cypher Distribution Cleanup Script
# This script prepares Cypher for clean distribution by removing development artifacts

Write-Host "🧹 Cypher Distribution Cleanup Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if we're on the correct branch
$currentBranch = git branch --show-current
Write-Host "`nCurrent branch: $currentBranch" -ForegroundColor Yellow

if ($currentBranch -ne "release/clean-distribution") {
    Write-Host "⚠️  WARNING: Not on release/clean-distribution branch!" -ForegroundColor Red
    $response = Read-Host "Continue anyway? (y/N)"
    if ($response -ne 'y') {
        Write-Host "Cleanup cancelled." -ForegroundColor Yellow
        exit
    }
}

Write-Host "`n📁 Removing root level development files..." -ForegroundColor Green
$rootFiles = @(
    "codebase-audit-results.md",
    "docs-audit-results.md", 
    "gemini-docs-audit-request.md",
    "git-integration-proposal.md",
    "CLAUDE.md",
    "GEMINI.md",
    "CLEANUP_CHECKLIST.md",
    "cleanup-for-distribution.ps1"
)

foreach ($file in $rootFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removed $file" -ForegroundColor Gray
    }
}

Write-Host "`n📁 Removing development directories..." -ForegroundColor Green
$dirsToRemove = @(
    ".claude",
    "references",
    "scripts",
    "taskmaster",
    "team",
    "example"
)

foreach ($dir in $dirsToRemove) {
    if (Test-Path $dir) {
        Remove-Item $dir -Recurse -Force
        Write-Host "  ✓ Removed $dir/" -ForegroundColor Gray
    }
}

Write-Host "`n📁 Cleaning docs directory..." -ForegroundColor Green
# Remove research and legacy docs
if (Test-Path "docs/research") {
    Remove-Item "docs/research" -Recurse -Force
    Write-Host "  ✓ Removed docs/research/" -ForegroundColor Gray
}
if (Test-Path "docs/taskmaster_docs") {
    Remove-Item "docs/taskmaster_docs" -Recurse -Force
    Write-Host "  ✓ Removed docs/taskmaster_docs/" -ForegroundColor Gray
}

# Remove phase documentation
$phaseFiles = @(
    "docs/phase2-implementation-review.md",
    "docs/phase3-commands-audit.md",
    "docs/phase3-migration-philosophy.md"
)
foreach ($file in $phaseFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removed $file" -ForegroundColor Gray
    }
}

Write-Host "`n📁 Cleaning docs/cyper_docs directory..." -ForegroundColor Green
$obsoleteDocs = @(
    "docs/cyper_docs/ROADMAP.md",
    "docs/cyper_docs/COLLABORATION_PLAN.md",
    "docs/cyper_docs/COMMAND_REFACTOR_TASKS.md",
    "docs/cyper_docs/EXECUTION_PATTERNS.md",
    "docs/cyper_docs/MANIFESTO.md",
    "docs/cyper_docs/GENESIS_PROTOCOL_AND_CRITIQUE.md",
    "docs/cyper_docs/AI_COLLABORATION_ESSENCE.md",
    "docs/cyper_docs/AI_COLLABORATION_FULL.md",
    "docs/cyper_docs/AI_COLLABORATION_OPTIMIZATION.md",
    "docs/cyper_docs/CONTEXTUAL_AI_TEAMS.md",
    "docs/cyper_docs/CONTEXTUAL_CLAUDE.md",
    "docs/cyper_docs/USING_GEMINI_AS_CLAUDE.md",
    "docs/cyper_docs/TECHNICAL_NOTES.md",
    "docs/cyper_docs/UI_STRATEGY.md"
)
foreach ($file in $obsoleteDocs) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removed $file" -ForegroundColor Gray
    }
}

Write-Host "`n📁 Cleaning cypher directory..." -ForegroundColor Green
# Remove CDD directory
if (Test-Path "cypher/cdd") {
    Remove-Item "cypher/cdd" -Recurse -Force
    Write-Host "  ✓ Removed cypher/cdd/" -ForegroundColor Gray
}

# Remove development knowledge files
$knowledgeFiles = @(
    "cypher/knowledge/evolution-log.md",
    "cypher/knowledge/metrics.json",
    "cypher/knowledge/claude-hooks-guide.md",
    "cypher/knowledge/cypher-hooks-proposal.md",
    "cypher/knowledge/cypher-vscode-gui-proposal.md"
)
foreach ($file in $knowledgeFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removed $file" -ForegroundColor Gray
    }
}

Write-Host "`n📁 Reorganizing essential documentation..." -ForegroundColor Green
# Create cypher-core directory
$cypherCoreDir = "docs/cypher-core"
if (-not (Test-Path $cypherCoreDir)) {
    New-Item -ItemType Directory -Path $cypherCoreDir | Out-Null
    Write-Host "  ✓ Created $cypherCoreDir/" -ForegroundColor Gray
}

# Move essential files (if they exist)
$essentialMoves = @{
    "docs/cyper_docs/MANIFESTO_v2.md" = "$cypherCoreDir/MANIFESTO_v2.md"
    "docs/research/THE_CYPHER_EVOLUTION.md" = "$cypherCoreDir/THE_CYPHER_EVOLUTION.md"
    "docs/cyper_docs/EKP_v2_Commands_as_Teachers_Roadmap.md" = "$cypherCoreDir/EKP_v2_Commands_as_Teachers_Roadmap.md"
    "docs/research/IA_Pensamiento_CoT_ToT_ReAct.md" = "$cypherCoreDir/IA_Pensamiento_CoT_ToT_ReAct.md"
    "docs/cyper_docs/INTERFACES.md" = "$cypherCoreDir/INTERFACES.md"
    "docs/cyper_docs/AI_ECOSYSTEM_PHILOSOPHY.md" = "$cypherCoreDir/AI_ECOSYSTEM_PHILOSOPHY.md"
}

foreach ($move in $essentialMoves.GetEnumerator()) {
    if (Test-Path $move.Key) {
        Move-Item -Path $move.Key -Destination $move.Value -Force
        Write-Host "  ✓ Moved to $($move.Value)" -ForegroundColor Gray
    }
}

Write-Host "`n✅ Cleanup complete!" -ForegroundColor Green
Write-Host "`n📋 Final verification:" -ForegroundColor Yellow

# Verify essential files exist
$essentialFiles = @(
    "README.md",
    "package.json",
    "tsconfig.json",
    "src",
    "cypher/prompts",
    "cypher/patterns",
    "cypher/tasks.json"
)

$allGood = $true
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $file MISSING!" -ForegroundColor Red
        $allGood = $false
    }
}

if ($allGood) {
    Write-Host "`n🎉 Cypher is ready for distribution!" -ForegroundColor Cyan
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Run 'npm run build' to verify build" -ForegroundColor Gray
    Write-Host "2. Test basic commands" -ForegroundColor Gray
    Write-Host "3. Commit changes with:" -ForegroundColor Gray
    Write-Host "   git add -A" -ForegroundColor White
    Write-Host "   git commit -m 'chore: Clean distribution - Remove development artifacts'" -ForegroundColor White
} else {
    Write-Host "`n⚠️  Some essential files are missing!" -ForegroundColor Red
}