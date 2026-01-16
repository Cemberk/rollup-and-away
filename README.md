# Rollup and Away

Rollup and Away is an automated reporting assistant that can gather GitHub data from Issues, Discussions, Project Views (and more!) and template it into draft reports. Designed for project managers and team leads who want to reduce repetitive reporting work while preserving essential human judgment.

Built with TypeScript for GitHub Actions workflows, although a CLI is available for testing.

**Features:**
- Declarative templates that define what to pull without worrying about extraction details
- GitHub Projects integration, to plug into existing PM workflows
- **Executive Weekly Reports** - Automated comprehensive reports designed for executives and engineering teams with strategic insights, metrics, and long-term implications ([see guide](docs/EXECUTIVE_REPORTING.md))
- Update detection using strategies such as searching for Markdown Headers, HTML comments, fenced HTML blocks, or bolded text
- Custom AI prompts / models for summarization ([supports Models from the GitHub Marketplace](https://github.com/marketplace/models))
- Transparent context window visibility for debugging and corrections
- Ability to send Slack DMs to Issues assignees / Discussion authors. Useful for reminding assignees to add updates.

**Limitations:**
- As the tool is in Beta, it lacks tests and exhaustive API documentation
- Generates drafts that require human review. As with all AI summaries, the output will not be perfect.
- The Slack DM feature will only work in some Slack workspaces, even with a working token. This is because detecting Slack users depends on the assumption the Slack email stem is identical to the GitHub username.

**Current Status:** Active beta development, used in production by internal GitHub teams.

**Goals:** This project aims to eliminate repetitive copy-paste work in status reporting without trying to remove the tasks that require human judgment. It's designed to be portable and flexible, unlike the bespoke one-off solutions which usually fill this niche.

## Background

This project grew out of a few reporting experiments by @amyryanmanny on the TPM Flex / Synapse Team. From my experience writing reporting automations, this is the exact tool I wish I had when I started.

### What People Say

Our Dogfooders who have used Rollup and Away report saving 30+ minutes per week on routine reports, and 1.5+ hours on comprehensive weekly reviews. Even in cases where the time saved is negligible, they say it results in a higher quality report. The automation is also portable, making handoffs easier.

### Roadmap

Roadmap and Milestones coming soon to this repo, as we open source the tool, and migrate our existing project tracking issues.

See [Issues](https://github.com/github/rollup-and-away/issues) to open an issue.

## Usage

### Quick Start: Executive Weekly Reports

To set up automated weekly executive reports that include strategic insights, metrics analysis, and comprehensive summaries:

**📋 [5-Minute Quick Start Guide →](QUICKSTART.md)**

Or follow these steps:

1. Copy `.github/workflows/executive-weekly.yaml` to your repository
2. Configure a `ROLLUP_PAT_TOKEN` secret with appropriate permissions
3. Customize the workflow to point to your Issues or Projects
4. The workflow will run every Monday, or trigger it manually for testing

For detailed setup instructions, customization options, and best practices, see the [Executive Reporting Guide](docs/EXECUTIVE_REPORTING.md).

### General Usage

For detailed instructions and examples to set up the Actions in your repo (no IDE required), check out the [complete setup guide](https://github.com/github/rollup-and-away/discussions/2).

### Requirements

- Bun
- Node
- Some GitHub Actions environment, and a GitHub API token

### Contributing

We welcome PRs! Please read the [Contribution / Dev Guide](https://github.com/github/rollup-and-away/blob/main/CONTRIBUTING.md) before submitting changes.

Have ideas for improving Rollup and Away? [Submit a feature request](https://github.com/github/rollup-and-away/issues/new).

## License

This project is licensed under the terms of the MIT open source license. Please refer to the [LICENSE](./LICENSE) file for the full terms.

## Maintainers

See [CODEOWNERS](./CODEOWNERS) for the current maintainer list.

## Support

- **📚 Documentation**: Browse [discussions](https://github.com/github/rollup-and-away/discussions) for tips and examples.
- **📋 Bug Reports**: Document [issues](https://github.com/github/rollup-and-away/issues).

## Acknowledgements

Thanks to all the Dogfooders who provided (and continue to provide) feedback during development, and shared their time savings results.
