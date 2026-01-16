# AI Prompts for Executive Reporting

This directory contains AI prompts used by the Executive Weekly Report feature.

## Available Prompts

### Executive Summary (`executive_summary.prompt.yaml`)
Generates a high-level executive summary focused on:
- Overall project health and momentum
- Major accomplishments and deliverables
- Critical blockers or risks
- Resource allocation insights

**Audience**: C-level executives, VPs, senior leadership

### Metrics and Trends (`metrics_and_trends.prompt.yaml`)
Analyzes quantitative metrics and identifies patterns:
- Key performance indicators (features shipped, issues closed, velocity)
- Week-over-week changes
- Emerging patterns (positive or concerning)
- Resource utilization patterns

**Audience**: Leadership and engineering management

### Features and Changes (`features_and_changes.prompt.yaml`)
Highlights deliverables organized by:
- New features with business value
- Enhancements and improvements
- Bug fixes and technical improvements

**Audience**: Product managers, engineering teams, stakeholders

### Strategic Implications (`strategic_implications.prompt.yaml`)
Analyzes long-term impact:
- Strategic advancement from current work
- Technical debt and architecture decisions
- Risks, dependencies, and opportunities

**Audience**: Leadership, technical architects, strategy teams

### Engineering Updates (`engineering_updates.prompt.yaml`)
Provides detailed technical updates:
- Active initiatives and progress
- Technical achievements and challenges
- Developer experience improvements

**Audience**: Engineering teams, technical leadership

### Recommendations (`recommendations.prompt.yaml`)
Generates actionable next steps:
- Immediate actions requiring decisions
- Short-term priorities (1-4 weeks)
- Strategic considerations

**Audience**: Leadership, project managers, engineering management

## Customizing Prompts

### Basic Customization

Each prompt file follows this structure:

```yaml
name: Prompt Name
description: What this prompt does
model: openai/gpt-4.1
modelParameters:
  temperature: 0.7
  # max_tokens: 4096
messages:
  - role: system
    content: >
      System message defining the AI's role and expertise
  - role: user
    content: |
      Instructions for the AI with placeholders like {{input}}
```

### Common Customizations

1. **Change the AI Model**
   ```yaml
   model: openai/gpt-4o-mini  # Faster, cheaper
   model: openai/gpt-4.1      # Default, balanced
   ```

2. **Adjust Temperature** (creativity vs consistency)
   ```yaml
   modelParameters:
     temperature: 0.3  # More consistent, factual
     temperature: 0.7  # Balanced (default)
     temperature: 0.9  # More creative, varied
   ```

3. **Customize System Role**
   ```yaml
   messages:
     - role: system
       content: >
         You are a strategic advisor for [Your Company] writing for
         [specific audience]. Focus on [specific priorities].
   ```

4. **Modify Instructions**
   
   Edit the `user` message content to change:
   - Section structure
   - Focus areas
   - Output format
   - Specific requirements

### Example: Company-Specific Customization

```yaml
name: Executive Summary
model: openai/gpt-4.1
modelParameters:
  temperature: 0.5  # More consistent for executives
messages:
  - role: system
    content: >
      You are writing for ACME Corp's executive team. Our leadership
      values data-driven insights, clear ROI, and customer impact.
      Keep technical jargon minimal.
  - role: user
    content: |
      Create a 3-paragraph executive summary.
      
      Required sections:
      - Customer Impact: How does this benefit our users?
      - Business Metrics: Revenue, growth, efficiency gains
      - Strategic Alignment: How this advances our mission
      
      <updates>
      {{input}}
      </updates>
```

### Testing Prompt Changes

1. Make your changes to the prompt file
2. Commit the changes
3. Run the test workflow manually:
   ```
   Actions → Test Executive Report → Run workflow
   ```
4. Review the output
5. Iterate as needed

### Best Practices

1. **Start with defaults**: Use the provided prompts as-is initially
2. **Iterate based on output**: Review several reports before making changes
3. **Keep placeholders**: The `{{input}}` placeholder is required
4. **Test thoroughly**: Generate multiple reports to ensure consistency
5. **Document changes**: Add comments explaining your customizations
6. **Version control**: Keep prompt files in git to track what works

### Troubleshooting

**Output is too generic**
- Lower the temperature (e.g., 0.5)
- Add more specific instructions in the user message
- Provide examples of desired output format

**Output is too technical**
- Strengthen the system message about target audience
- Explicitly instruct to "avoid technical jargon"
- Ask for business impact over technical details

**Output is incomplete**
- Check if hitting token limits (add max_tokens parameter)
- Simplify instructions to focus on key points
- Split into multiple prompts if trying to do too much

**Inconsistent format**
- Lower temperature for more consistency
- Provide explicit structure in instructions (use "##" for sections)
- Include example output format

## Available Models

Check the [GitHub Models Marketplace](https://github.com/marketplace/models) for available models. Common options:

- `openai/gpt-4.1` - Recommended default, good balance
- `openai/gpt-4o-mini` - Faster and cheaper, good for simple tasks
- `meta-llama/Meta-Llama-3.1-405B-Instruct` - Open source alternative
- `anthropic/claude-3.5-sonnet` - Good for detailed analysis

## Support

- [Main Documentation](../EXECUTIVE_REPORTING.md)
- [GitHub Discussions](https://github.com/github/rollup-and-away/discussions)
- [Report Issues](https://github.com/github/rollup-and-away/issues)
