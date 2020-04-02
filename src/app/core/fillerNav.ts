export class FillerNav {
    constructor() {
        return new Object({
            routes: [
                { name: 'Início', isActive: true, path: 'home' },
                { name: 'Perfil', isActive: false, path: 'profile' },
                { name: 'My Issues', isActive: false, path: 'my-stuff' },
            ]
        });
    }
}