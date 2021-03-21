export class Constants {
    static readonly defaultPattern = {
        imgs: {
            vistoPic: 'moderator-male.svg',
            profileDefault: 'profile-default.jfif',
            logo: 'logo.png',
            homeIssues: 'home.png',
            myIssues: 'my-issues.png',
            configs: 'configs.svg'
        },
        routesPath: {
            issues: {
                list: 'issues',
                add: 'issues/add',
                details: 'issues/details/'
            }
        },
        nestPath: {
            issues: {
                store: 'issues/store',
                getWithPagination: 'issues/list',
                getDetailsById: 'issues/detail',
                getPollDetailById: 'issues/detail/poll'
            }
        }
    };
}