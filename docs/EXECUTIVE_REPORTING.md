# Executive Weekly Reporting

This guide explains how to set up automated weekly executive reports using Rollup and Away.

> 📋 **See an example**: Check out a [sample executive report](EXAMPLE_REPORT.md) to see what the output looks like.

## Overview

The Executive Weekly Report feature generates comprehensive, high-level summaries of your repository's activity designed for executives, senior leadership, and engineering teams. Reports are generated automatically every week and include:

- **Executive Summary**: High-level overview of project health, accomplishments, and risks
- **Key Metrics & Trends**: Quantitative analysis of velocity, deliverables, and patterns
- **Features & Changes**: Detailed breakdown of shipped features, enhancements, and fixes
- **Strategic Implications**: Long-term impact analysis and architectural considerations
- **Engineering Team Updates**: Detailed technical updates for the engineering organization
- **Recommendations & Next Steps**: Actionable guidance prioritized by impact and urgency

## Quick Start

### Prerequisites

1. A GitHub repository with the Rollup and Away action installed
2. A GitHub Personal Access Token (PAT) or GitHub App configured
3. GitHub Issues or Projects tracking your work

### Setup Instructions

1. **Configure Your Repository**

   Ensure you have a `ROLLUP_PAT_TOKEN` secret configured in your repository settings with appropriate permissions:
   - `repo` (full control of private repositories)
   - `read:org` (read organization data)
   - `read:project` (read project data)

2. **Enable the Workflow**

   The workflow is already configured in `.github/workflows/executive-weekly.yaml` and will run automatically every Monday at 9:00 AM UTC.

3. **Customize Settings (Optional)**

   Edit `.github/workflows/executive-weekly.yaml` to customize:

   ```yaml
   env:
     URL: https://github.com/your-org/your-repo/issues
     TIMEFRAME: lastWeek  # or lastTwoWeeks, lastMonth
   ```

4. **Manual Testing**

   Test the workflow manually:
   - Go to Actions → Weekly Executive Report
   - Click "Run workflow"
   - Optionally specify a custom URL or timeframe

## Template Customization

### Modify the Template

The executive report template is located at:
```
templates/default/executive-weekly.md.vto
```

You can customize:
- Section order
- Number of updates to include (`numUpdates`)
- Which fields to track (e.g., 'Status', 'Priority', 'Trending')
- Add or remove sections

Example modifications:

```vto
{{- set numUpdates = 5 -}}  {{! Increase updates per issue !}}
{{- set title = "Weekly Product Report" -}}  {{! Custom title !}}

{{! Add a custom section !}}
## Customer Impact
{{ await memory.summarize("customer_impact") }}
```

### Customize AI Prompts

AI prompts are located in `.github/prompts/default/`:
- `executive_summary.prompt.yaml`
- `metrics_and_trends.prompt.yaml`
- `features_and_changes.prompt.yaml`
- `strategic_implications.prompt.yaml`
- `engineering_updates.prompt.yaml`
- `recommendations.prompt.yaml`

You can modify:
- The system prompt (role/persona)
- The user prompt (instructions)
- Model parameters (temperature, max_tokens)
- The AI model used

Example customization:

```yaml
name: Executive Summary
model: openai/gpt-4.1
modelParameters:
  temperature: 0.5  # Lower temperature for more consistent output
messages:
  - role: system
    content: >
      You are writing for a technical executive audience at [Your Company].
      Focus on [specific priorities].
```

## Workflow Customization

### Change the Schedule

Edit the `cron` schedule in `.github/workflows/executive-weekly.yaml`:

```yaml
schedule:
  # Every Friday at 4:00 PM UTC
  - cron: '0 16 * * 5'
  
  # Every other Monday at 9:00 AM UTC
  - cron: '0 9 */14 * 1'
  
  # First Monday of each month at 10:00 AM UTC
  - cron: '0 10 1-7 * 1'
```

### Change Report Destinations

Modify the `targets` in the Push step:

```yaml
targets: |
  # Save to repository
  repo-file: https://github.com/your-org/your-repo/tree/main/reports/executive
  
  # Post as issue
  issue: https://github.com/your-org/your-repo/issues
  
  # Post to specific discussion
  discussion: https://github.com/your-org/your-repo/discussions/123
  
  # Add as issue comment
  issue-comment: https://github.com/your-org/your-repo/issues/456
```

### Use with GitHub Projects

Point the URL to a GitHub Project view:

```yaml
env:
  URL: https://github.com/orgs/your-org/projects/1/views/2
```

This will pull data from your project board including custom fields like Status, Priority, etc.

## Update Detection

The workflow uses update detection strategies to find the latest updates in issues:

```yaml
update_detection: |
  lastWeek(Summary)
  lastWeek(Update)
  lastWeek("Executive Summary")
  lastWeek("Weekly Update")
  skip()
```

This looks for:
1. Markdown headers with "Summary" from the last week
2. Markdown headers with "Update" from the last week
3. Quoted text "Executive Summary" from the last week
4. Quoted text "Weekly Update" from the last week
5. If none found, skip the issue

Customize this to match your team's conventions:

```yaml
update_detection: |
  lastWeek(## Status)
  lastWeek(### Progress)
  lastTwoWeeks()  # Fallback to any comment from last 2 weeks
```

## Integration with Slack

To send notifications or share reports via Slack, configure Slack integration:

1. Add `SLACK_TOKEN` secret to your repository
2. Modify the render step:

```yaml
- name: Render Executive Report
  uses: ./actions/render
  env:
    SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}
    SLACK_ENTERPRISE_DOMAIN: "yourcompany.com"
```

## Best Practices

### 1. Consistent Update Format

Encourage your team to use consistent headers in issue comments:

```markdown
## Weekly Update

- Shipped: Feature X is now in production
- In Progress: Working on Performance optimization
- Blocked: Waiting for API access from Team Y
```

### 2. Rich Context

Include links, metrics, and demos in your updates:

```markdown
## Summary

Shipped the new dashboard [preview](https://...) with 40% faster load times.
See [PR #123](https://...) for implementation details.
```

### 3. Review Before Sharing

The reports are AI-generated drafts. Always:
- Review for accuracy
- Check that sensitive information is not included
- Verify links and references
- Add human context where needed

### 4. Iterate on Prompts

The AI prompts can be tuned to your organization's needs:
- Start with the defaults
- Review a few weeks of reports
- Adjust prompts to improve output quality
- Share feedback with your team

## Troubleshooting

### Report is Empty

**Issue**: The generated report says "No content in memory to summarize."

**Solutions**:
- Verify the URL points to valid issues/projects
- Check that issues have comments matching the update detection pattern
- Ensure the timeframe captures recent activity
- Test with manual workflow trigger using a known-good URL

### Authentication Errors

**Issue**: 401 or 403 errors when running the workflow.

**Solutions**:
- Verify `ROLLUP_PAT_TOKEN` is configured in repository secrets
- Ensure the token has required permissions (repo, read:org, read:project)
- Check token expiration date
- For GitHub Apps, verify app installation and permissions

### Rate Limiting

**Issue**: Errors about API rate limits.

**Solutions**:
- Use a GitHub App instead of PAT for higher rate limits
- Reduce the number of issues being processed
- Spread out workflow runs (don't run multiple reports simultaneously)

### AI Model Errors

**Issue**: Content filter errors or model timeouts.

**Solutions**:
- Review input for potentially flagged content
- Reduce `truncate_tokens` if hitting token limits
- Try a different model (e.g., `gpt-4o-mini` for faster responses)
- Check GitHub Models marketplace for available models

## Examples

### Bi-weekly Report for Multiple Teams

```yaml
name: 'Bi-weekly Multi-Team Report'
on:
  schedule:
    - cron: '0 9 */14 * 1'  # Every other Monday

jobs:
  team-alpha-report:
    steps:
      # ... render with URL pointing to Team Alpha's project
  
  team-beta-report:
    steps:
      # ... render with URL pointing to Team Beta's project
```

### Monthly Strategic Review

```yaml
# Use the executive-weekly template but with monthly timeframe
env:
  TIMEFRAME: lastMonth
  URL: https://github.com/orgs/company/projects/1

with:
  title: 'Monthly Strategic Review - %B %Y'
  title_date: 'First'
```

### Custom Report for Product Launches

Create a new template `templates/default/product-launch.md.vto`:

```vto
# Product Launch Report - {{ today }}

## Launch Readiness
{{ await memory.summarize("launch_readiness") }}

## Customer Feedback
{{ await memory.summarize("customer_feedback") }}

## Metrics
{{ await memory.summarize("launch_metrics") }}
```

## Support

For questions or issues:
- Review [GitHub Discussions](https://github.com/github/rollup-and-away/discussions)
- Open an [Issue](https://github.com/github/rollup-and-away/issues)
- See the main [README](../README.md) for general usage

## Contributing

Improvements to the executive reporting feature are welcome! Please see [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.
