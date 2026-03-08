#  Automated Chrome Extension Deployment

Automated pipeline for publishing a Chrome extension to the Chrome Web Store via GitHub Actions.

## Why

1. Only a few developers have access to the Chrome Web Store
2. Deployment involves many manual steps and is error-prone
3. No clear history of releases

## Result

### Before
1. Ask someone with access to deploy
2. Build the correct commit locally
3. Log in to Chrome Web Store (retrieve credentials + 2FA)
4. Upload the build
5. Submit for review
6. Monitor review status
7. Repeat the same process for PROD

Total time to deploy = Up to 24 hrs waiting for help + 5-10 min manual work


### After
1. Create a new release with the correct tag
2. Select the target commit
3. Publish the release

Total time to deploy = 30 sec

### Benefits
1. Anyone can deploy
2. Safety checks for consistent releases
3. At least 90% reduction in deployment time
4. Minimum manual steps and errors
5. Clear track of who deployed what at when
6. Submission status via GitHub Actions
7. Automatic cleanup if the process fails
8. Slack notifications

### What NOT supported
Anything requires manual confirmation like rollback, update metadata, etc.
This is limited by the CWS API.

## How to Deploy

### Beta

1. Go to **Release** -> **Draft a new release**
2. Create a new tag: `beta-v1.0.1`, version must match the manifest version
3. Choose the target commit
4. Publish the release

### Production

1. Go to **Release** -> **Draft a new release**
2. Create a new tag: `v1.0.1`, version must match the manifest version
3. Choose the target commit
4. Publish the release

> **Safety checks:** 
> 1. The tag version must match the version in the code — so you can't accidentally deploy a mismatched version
> 2. Prod is blocked unless a matching beta release already exists — you always have to go through beta first
> 3. Both beta and prod tags must point to the same commit — so prod is guaranteed to deploy the same code that was tested in beta
> 4. A release must exist — you can't just push a tag from the command line and trigger a deployment
> 5. If anything fails, the release and tag are automatically cleaned up

## Workflow Sequence Diagrams

### Beta Workflow

![Beta Workflow](docs/beta-workflow.png)

### Production Workflow

![Production Workflow](docs/prod-workflow.png)

## GitHub Secrets Required

| Secret | Purpose |
|--------|---------|
| `CHROME_EXTENSION_ID_PROD` / `_BETA` | Extension IDs |
| `CI_GOOGLE_CLIENT_ID` | OAuth client ID |
| `CI_GOOGLE_CLIENT_SECRET` | OAuth client secret |
| `CI_GOOGLE_REFRESH_TOKEN` | OAuth refresh token for CWS API |
| `SLACK_WEBHOOK_URL` | Slack notifications |
