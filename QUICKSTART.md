# 🚀 Quick Start: Executive Weekly Reports

This repository includes an automated executive reporting system that generates comprehensive weekly summaries for leadership and engineering teams.

## What You Get

Every week (or on-demand), the system generates a report with:

✅ **Executive Summary** - High-level overview for leadership  
📊 **Metrics & Trends** - Quantitative analysis and patterns  
🎯 **Features & Changes** - What shipped this week  
🎓 **Strategic Implications** - Long-term impact analysis  
👥 **Engineering Updates** - Detailed technical updates  
💡 **Recommendations** - Actionable next steps

[See an example report →](docs/EXAMPLE_REPORT.md)

## Setup (5 minutes)

### 1. Configure Secrets

Add a GitHub Personal Access Token to your repository secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `ROLLUP_PAT_TOKEN`
4. Value: Your GitHub PAT with these permissions:
   - ✅ `repo` (full repository access)
   - ✅ `read:org` (read organization data)
   - ✅ `read:project` (read project data)

[How to create a PAT →](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

### 2. Customize the Workflow

Edit `.github/workflows/executive-weekly.yaml`:

```yaml
env:
  # Point to your issues or project board
  URL: https://github.com/your-org/your-repo/issues
  # Or use a GitHub Project
  # URL: https://github.com/orgs/your-org/projects/1/views/2
```

### 3. Test It

1. Go to **Actions** → **Test Executive Report**
2. Click **Run workflow**
3. Review the output

### 4. Enable Scheduled Reports

The workflow runs automatically every **Monday at 9:00 AM UTC**.

To change the schedule, edit the `cron` expression in the workflow file:

```yaml
schedule:
  - cron: '0 9 * * 1'  # Monday at 9 AM UTC
```

[Cron expression helper →](https://crontab.guru)

## What Happens Next

Once configured, the workflow will:

1. **Collect** updates from your issues/projects
2. **Analyze** using AI to extract insights
3. **Generate** a comprehensive report
4. **Publish** to:
   - Repository file: `/reports/executive/`
   - New GitHub issue for discussion

## Customization

### Change Report Destination

Edit the `targets` in the workflow:

```yaml
targets: |
  repo-file: https://github.com/your-org/your-repo/tree/main/reports
  issue: https://github.com/your-org/your-repo/issues
  discussion: https://github.com/your-org/your-repo/discussions/123
```

### Customize Report Sections

Edit `templates/default/executive-weekly.md.vto` to:
- Add or remove sections
- Change section order
- Adjust which fields to track

### Tune AI Prompts

Customize AI behavior in `.github/prompts/default/`:
- Adjust for your company's communication style
- Focus on specific priorities
- Change output format

[Full customization guide →](docs/EXECUTIVE_REPORTING.md)

## Best Practices

### For Teams

1. **Use consistent update formats** in issue comments:
   ```markdown
   ## Weekly Update
   - Shipped: Feature X
   - In Progress: Feature Y
   - Blocked: Waiting on Team Z
   ```

2. **Include rich context**:
   - Link to PRs, demos, and documentation
   - Add metrics when available
   - Tag relevant people with @mentions

3. **Review before sharing**:
   - AI summaries are drafts - always review
   - Add human context and judgment
   - Verify sensitive information is not included

### For Customization

1. Start with defaults, iterate based on output
2. Review 2-3 reports before making major prompt changes
3. Test changes with manual workflow runs
4. Keep a changelog of prompt modifications

## Troubleshooting

### "No content in memory"

**Problem**: Report is empty or says no content found.

**Solutions**:
- Verify URL points to valid issues/projects with recent activity
- Check update detection patterns match your team's comment format
- Increase timeframe (e.g., `lastTwoWeeks` instead of `lastWeek`)

### Authentication errors

**Problem**: 401/403 errors when running workflow.

**Solutions**:
- Verify `ROLLUP_PAT_TOKEN` is configured correctly
- Check token has required permissions
- Ensure token hasn't expired

### Rate limiting

**Problem**: Hitting GitHub API rate limits.

**Solutions**:
- Use GitHub App authentication instead of PAT (higher limits)
- Reduce number of issues being processed
- Spread out workflow runs

## Support

📚 [Full Documentation](docs/EXECUTIVE_REPORTING.md)  
💬 [Discussions](https://github.com/github/rollup-and-away/discussions)  
🐛 [Report Issues](https://github.com/github/rollup-and-away/issues)  
📖 [Main README](README.md)

## Example Output

Here's what a typical executive report looks like:

```markdown
# Executive Weekly Report - 2026-01-13

## Executive Summary
The team demonstrated strong momentum with 3 major features shipped...

## Key Metrics & Trends
- Features Shipped: 3 major, 7 enhancements
- Issues Closed: 24 (vs 18 opened)
- Velocity: +15% week-over-week
...
```

[View full example →](docs/EXAMPLE_REPORT.md)

---

**Ready to get started?** Follow the [Setup](#setup-5-minutes) steps above! 🎉
