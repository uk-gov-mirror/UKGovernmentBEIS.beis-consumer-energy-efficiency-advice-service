/**
 * The properties of this class must match the actual config
 * defined in user-site-server/src/main/resources/templates/index.html
 */
class Config {
    apiRoot: string;
    springProfiles: string;
    spaceName: string;
    phoneNumber: string;
    buildTimestamp: string;
    buildGitCommit: string;
    buildUrl: string;
    buildNumber: string;
    publicRootUrl: string;
    googleCloudPlatformApiKey: string;
}

export default () => (window as any).CONFIG as Config;
