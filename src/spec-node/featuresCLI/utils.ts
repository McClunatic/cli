export const staticProvisionParams = {
    workspaceMountConsistency: 'cached' as 'cached',
    defaultUserEnvProbe: 'loginInteractiveShell' as 'loginInteractiveShell',
    logFormat: 'text' as 'text',
    removeExistingContainer: false,
    buildNoCache: false,
    expectExistingContainer: false,
    postCreateEnabled: true,
    skipNonBlocking: false,
    prebuild: false,
    additionalMounts: [],
    updateRemoteUserUIDDefault: 'on' as 'on',
    additionalCacheFroms: [],
    dockerPath: undefined,
    dockerComposePath: undefined,
    containerDataFolder: undefined,
    containerSystemDataFolder: undefined,
    configFile: undefined,
    overrideConfigFile: undefined,
    persistedFolder: undefined,
    terminalDimensions: undefined,
    useBuildKit: 'auto' as 'auto',
    buildxPlatform: undefined,
    buildxPush: false,
    buildxOutput: undefined,
    buildxCacheTo: undefined,
    skipPostAttach: false,
};

export const staticExecParams = {
    'user-data-folder': undefined,
    'docker-path': undefined,
    'docker-compose-path': undefined,
    'container-data-folder': undefined,
    'container-system-data-folder': undefined,
    'id-label': undefined,
    'config': undefined,
    'override-config': undefined,
    'terminal-rows': undefined,
    'terminal-columns': undefined,
    'container-id': undefined,
    'mount-workspace-git-root': true,
    'log-level': 'info' as 'info',
    'log-format': 'text' as 'text',
    'default-user-env-probe': 'loginInteractiveShell' as 'loginInteractiveShell',
};

export interface LaunchResult {
    disposables?: (() => Promise<unknown> | undefined)[];
    containerId: string;
    remoteUser?: string;
    remoteWorkspaceFolder?: string | undefined;
    finishBackgroundTasks?: () => Promise<void>;
    containerHost?: string;
    containerPort?: any;
}

// dev-container-features-test-lib
export const testLibraryScript = `
#!/bin/sh
SCRIPT_FOLDER="$(cd "$(dirname $0)" && pwd)"
USERNAME=\${1:-root}

if [ -z $HOME ]; then
    HOME="/root"
fi

FAILED=""

echoStderr()
{
    echo "$@" 1>&2
}

check() {
    LABEL=$1
    shift
    printf "\n\n"
    printf "🔄 Testing '$LABEL'\n"
    printf '\\033[37m'
    if "$@"; then
        printf "\n\n"
        echo "✅  Passed '$LABEL'!"
        return 0
    else
        printf "\n\n"
        echoStderr "❌ $LABEL check failed."
        FAILED="$FAILED $LABEL"
        return 1
    fi
}

checkMultiple() {
    PASSED=0
    LABEL="$1"
    printf "\n\n"
    printf "🔄 Testing '$LABEL'.\n"
    shift; MINIMUMPASSED=$1
    shift; EXPRESSION="$1"
    while [ "$EXPRESSION" != "" ]; do
        if $EXPRESSION; then ((PASSED++)); fi
        shift; EXPRESSION=$1
    done
    if [ $PASSED -ge $MINIMUMPASSED ]; then
        printf "\n\n"
        echo "✅ Passed!"
        return 0
    else
        printf "\n\n"
        echoStderr "❌ '$LABEL' check failed."
        FAILED="$FAILED $LABEL"
        return 1
    fi
}

reportResults() {
    if [ -n "$FAILED" ]; then
        printf "\n\n"
        echoStderr "💥  Failed tests: **$FAILED**"
        exit 1
    else
        printf "\n\n"
        printf "Test Passed!\n"
        exit 0
    fi
}`;
