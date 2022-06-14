# Install new libs

-   run `yarn <lib_name>`
-   run `npx pod-install ios`

# Build Android

-   Inside the project root, run the following commands'
-   Increment version code in android/app/build.gradle
-   run `cd android && ./gradlew bundleRelease && cd ..`

# Build IOS

-   Coming soon...

# Code Push

You need to have appcenter-cli and logged in. Run once one time.

-   `npm install -g appcenter-cli`
-   `appcenter login`

### About TARGET_VERSION:

Inferring the TARGET_VERSION of this release by using the version name that is specified in the project's Info.plist (for iOS) and build.gradle (for Android) files.

current version: 1.0.51

## IOS Steps Deploy

-   run `appcenter apps set-current Onbank/Onbank-IOS`
-   run `appcenter codepush release-react -d "Production" -t <TARGET_VERSION> -m --description <DESCRIPTION>`

## Android Steps Deploy

-   run `appcenter apps set-current Onbank/Onbank-Android`
-   run `appcenter codepush release-react -d "Production" -t <TARGET_VERSION> -m --description <DESCRIPTION>`
