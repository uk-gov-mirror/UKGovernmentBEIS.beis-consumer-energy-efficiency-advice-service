/**
 * The properties of this class must match the actual config
 * defined in user-site-server/src/main/resources/templates/index.html
 */
class Config {
    apiRoot: string;
    environment: string;
    buildTimestamp: string;
    buildGitCommit: string;
    buildJenkinsUrl: string;
    buildJenkinsNumber: string;
}

export default () => (window as any).CONFIG as Config;
